---
subject: dbms
unit: 1
order: 10
slug: er-attributes
title: Attributes & the Attribute Taxonomy
summary: What attributes are, the value set and its formal power-set definition, and the full taxonomy — simple versus composite, single-valued versus multivalued, stored versus derived, and complex attributes with their notation.
minutes: 11
tags: [attribute, domain, value-set, simple, composite, multivalued, derived, complex, er-symbols]
---

# Attributes & the Attribute Taxonomy

## Attributes

> [!NOTE]
> **Attributes** are the **qualities or characteristics** of each entity. They signify the **type of information stored** for each entity, and **every entity possesses its own set of values** for them.

For example, two individual entities and their attribute values:

```
        Name = John Smith                     Name = Sunco Oil
        Address = 2311 Kirby,                 Headquarters = Houston
  e1 ●─ Houston, Texas 77001            c1 ●─
        Age = 55                              President = John Smith
        Home_phone = 713-749-2630
```

An entity's attributes provide values for **identification**. For instructors, the `ID` attribute stands out as a unique identifier — it prevents confusion when several instructors share the same name.

> [!NOTE]
> **How should the unique identifier be chosen?** The lecture raises a genuine design question: **government-issued IDs** were historically used, but they raise **security and privacy concerns**. Enterprises therefore **establish their own identifiers**. This is why a university issues an SRN rather than keying students on a national ID.

---

## Value set (domain)

> [!NOTE]
> For each attribute there is a set of permitted values, called the **domain** or **value set** of that attribute.

- If employee ages are allowed between 16 and 70, the value set of `Age` is the set of **integers between 16 and 70**.
- The value set of `Name` may be **strings of alphabetic characters separated by blanks**.

Formally, an attribute $A$ of entity set $E$ whose value set is $V$ is a **function from $E$ to the power set $P(V)$ of $V$**:

$$A : E \to P(V)$$

> [!INTUITION]
> Why the **power set** $P(V)$ rather than just $V$? Because the definition has to cover **every** attribute type at once:
>
> | Attribute is… | $A(e)$ returns |
> |---|---|
> | single-valued | a **singleton** set, $\{v\}$ |
> | multivalued | a set with **several** elements |
> | null / not applicable | the **empty** set, $\varnothing$ |
>
> Mapping into $P(V)$ instead of $V$ is exactly what lets one formula describe all three cases. That is a small piece of mathematical elegance worth quoting if a question asks for the formal definition.

---

## The attribute taxonomy

> [!NOTE]
> An attribute used in the E-R model can be characterised as:
> - **Simple / Composite**
> - **Single-valued / Multivalued**
> - **Stored / Derived**
> - **Complex attribute**
> - **Key attribute**

> [!TRAP]
> These are **independent axes, not one list of mutually exclusive labels.** A single attribute has a value on *each* axis — `Phone_no` is *simple*, *multivalued*, and *stored* all at once. Exam questions of the form *"identify the attribute types in…"* expect **all applicable labels**, not one.

### Simple vs Composite

| | Definition | Examples |
|---|---|---|
| **Simple (atomic)** | **Cannot be further subdivided** into components | `ID` of a student or instructor, roll number, phone number, email id |
| **Composite** | **Can be split into components** | `Address` → house number, street number, city, state, country, pin code. `Name` → first name, middle name, last name |

**The motivation, worked:** a university stores addresses for students, instructors and staff. A student's address is `"123 Main Street, Yeshwanthpur, Bangalore, 560063"` — all in one attribute. Now suppose we want to **group students by postal code to allot buses**. We cannot: **the postal code is not an attribute on its own**, it is buried inside `Address`.

> [!EXAM]
> The design rule the lecture states: **using a composite attribute is a good choice if a user will wish to refer to the entire attribute on some occasions, and to only a component of it on other occasions.** That sentence is the answer to *"when should an attribute be modelled as composite?"*

Composite attributes may form a **hierarchy** — inside `Address`, the component `Street` divides further into `Street No`, `Street Name`, `Apartment No`:

```
                    City   State   Country   Postal_Code
                      \      |       /        /
   Apartment No ─┐            Address
   Street Name ──┼── Street ──/  |
   Street No ────┘               |
                              Student
```

### Single-valued vs Multivalued

| | Definition | Examples |
|---|---|---|
| **Single-valued** | Takes **only a single value** for each entity instance | Name of the instructor, age of the student |
| **Multivalued** | Takes **more than a single value** for each entity instance | Instructor's **phone numbers**, instructor's **mail ids** |

**The motivation:** an instructor may have **zero, one, or several** phone numbers, and different instructors may have **different numbers of them**. A single-valued attribute cannot express that.

> [!EXAM]
> **A multivalued attribute is drawn as a double ellipse.**
>
> ```
>    ╔═══════════╗          ┌──────┐
>    ║ Phone_no  ║          │  ID  │
>    ╚═════╤═════╝          └───┬──┘
>       multivalued           single-valued
>          └────┬───────────────┘
>          ┌────┴─────┐
>          │Instructor│
>          └──────────┘
> ```

### Stored vs Derived

**The motivation, worked.** Consider the schema `Instructor(ID, Name, Department, Date_of_Birth, Age)`. What is wrong with it?

**`Age` can be calculated from `Date_of_Birth`** — take the system's current date and subtract. So there is **no need to store it**.

| | Definition | Example |
|---|---|---|
| **Stored** | Actually stored in the database | `Date_of_Birth` |
| **Derived** | **Can be derived from other attributes** | `Age` |

> [!EXAM]
> **A derived attribute is drawn as a dashed ellipse.**
>
> ```
>    ┌──────────────┐        ┌ ─ ─ ─ ─ ┐
>    │Date_of_Birth │          Age
>    └───────┬──────┘        └ ─ ─┬─ ─ ┘
>         stored                derived
>            └────────┬──────────┘
>              ┌──────┴────┐
>              │ Instructor│
>              └───────────┘
> ```

> [!INTUITION]
> Storing `Age` is not merely redundant — it is **wrong within a day**. `Age` is a function of the stored value **and the current time**, so a stored copy starts decaying the moment it is written. Ramakrishnan & Gehrke flag exactly this as *"an example of poor design: you should never create a field such as `age`, whose value is constantly changing."*
>
> The general principle, which recurs throughout the unit: **store the invariant, derive the variable.**

### Complex attributes

> [!NOTE]
> Attributes formed by the **nesting of composite and multivalued attributes** are called **complex attributes**. They are rarely used.

**Example 1.** A `Student` relation has `PreviousDegrees`, storing all previous qualifications:

$$\{\text{PreviousDegrees}(\text{College},\ \text{Year},\ \text{Degree},\ \text{Field})\}$$

Multiple `PreviousDegrees` values can exist (**multivalued**), and each has four subcomponents (**composite**) — therefore it is **complex**.

**Example 2 — the notation, which is the examinable part.**

$$\text{Address\_EmPhone}(\{\text{Email}\},\ \{\text{Phone}\},\ \text{Address}\{\text{House},\ \text{number},\ \text{street},\ \text{City},\ \text{State}\})$$

> [!EXAM]
> **Read the notation like this:**
>
> | Symbol | Means |
> |---|---|
> | `{ ... }` **braces** | **multivalued** |
> | `( ... )` **parentheses** grouping components | **composite** |
> | the whole nested structure | **complex** |
>
> So in `Address_EmPhone`: `{Email}` and `{Phone}` are **multivalued**; `Address{House, number, street, City, State}` is **composite**; and `Address_EmPhone` as a whole is **complex**. This exact example is the lecture's own exercise — *"identify which are the different attribute types that make up this attribute"*.

---

**Next:** the fifth axis, plus the absence of a value — **key attributes & null values**.
