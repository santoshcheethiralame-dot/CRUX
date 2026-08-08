---
subject: dbms
unit: 1
order: 11
slug: er-key-attributes-null
title: Key Attributes, Null Values & Worked Diagrams
summary: Key attributes and the three refinements that trip students up, the three distinct meanings of null, and two fully worked ER diagrams that exercise every construct in the taxonomy.
minutes: 9
tags: [key-attribute, candidate-key, composite-key, null, not-applicable, worked-example, er-diagram]
---

# Key Attributes, Null Values & Worked Diagrams

## Key attributes

> [!NOTE]
> An attribute of an entity type for which **each entity must have a unique value** is a **key attribute** of that entity type. Examples: `SSN` of `Employee`, `SRN` of `Student`.

Three refinements the lecture stresses:

1. **A key attribute may be composite.** `VehicleTagNumber` is a key of the `CAR` entity type with components `(Number, State)` — a plate number alone is not unique across states.
2. **An entity type may have more than one key.** `CAR` may have two: `VehicleIdentificationNumber` (VIN) and `VehicleTagNumber (Number, State)`.
3. **Each key is underlined.**

> [!TRAP]
> Point 3 carries an explicit warning in the slides: **in an ER diagram every key is underlined, whereas in a relational schema only one "primary key" is underlined.** So an ER diagram may legitimately show **two underlined attributes** on the same entity — that means *two candidate keys*, not an error. When you later reduce ER to a relational schema you must **choose one** as the primary key.

> [!EXAM]
> One of the deck's own MCQs asks *"In an E-R diagram, how is a key attribute represented?"* The options offered are *underlined attribute in the oval* / *in the rectangle* / *in the diamond* / *underlined relationship set*.
>
> **The answer is the underlined attribute in the oval (ellipse)** — attributes are ellipses, and a key is one whose **name is underlined**. Note that the **printed answer key in the slide deck marks this question "B" (rectangle), which is wrong**; rectangles are entity sets, and an entity-set *name* is never underlined. Answer **oval**, and if the marks are disputed, the ER symbol table settles it.

> [!INTUITION]
> Notice the `CAR` example is doing two jobs at once. `VehicleTagNumber (Number, State)` shows that a key can be **composite**, and having `VIN` alongside it shows an entity can have **several keys**. Both matter later: composite keys survive into the relational schema as multi-column primary keys, and multiple candidate keys are exactly what you must choose between during **reduction to relational** — and what functional-dependency theory formalises in **Unit 3**.

---

## Null values

> [!NOTE]
> An attribute takes a **null value** when an entity **does not have a value for it**.

Null is genuinely ambiguous, and the three readings are separately examinable:

| Meaning | Reading |
|---|---|
| **Not applicable** | The value **does not exist** for this entity |
| **Missing** | The value **does exist**, but we **do not have that information** |
| **Not known / unknown** | We **do not know whether or not** the value actually exists |

A null `apartment number` could therefore mean: the address **does not include** an apartment number (*not applicable*); an apartment number **exists but is unknown** (*missing*); or **we do not know whether** an apartment number is part of the address at all (*unknown*).

The lecture's own trigger: in `Student → Name → {First_name, Middle_name, Last_name}` — **what if the student has no middle name?** The value is set to **NULL**.

> [!TRAP]
> "Null" is **not** zero, and **not** the empty string. It is the **absence of a value**, and the three readings above are semantically different situations collapsed into one marker. That collapse is why null behaves so awkwardly in SQL — comparisons against null yield *unknown* rather than true or false. You will meet the consequences in **Unit 2 (null values in SQL)**; here, just be able to state the **three meanings**.

> [!INTUITION]
> The middle-name example shows the *not applicable* case; a student whose phone number we simply never collected is *missing*; a legacy record where we cannot tell whether an apartment number was ever part of the address is *unknown*. Databases store the same `NULL` for all three — which is precisely the criticism levelled at null by relational theorists, and the reason careful designers sometimes add an explicit status column rather than rely on null to carry meaning.

---

## Two worked diagrams

### Example 1 — the full `Instructor` entity

Requirements: every instructor has a **unique ID**, plus **name, address, phone number, date of birth, age, and department**. An instructor belongs to **only one department** but may have **multiple phone numbers**. `Address` subdivides into **street, city, state, zip**, and `street` again into **street_no, street_name, apt_number**. `Name` subdivides into **first, middle, last**.

```
   First_name ┐                          City   State   Zip
  Middle_name ┼── Name ──┐                 \      |     /        ┌─ Apartment No
   Last_name  ┘          │                   Address ── Street ──┼─ Street Name
                         │                     │                 └─ Street No
                    ┌────┴──────┐              │
             ID ────│ Instructor│──────────────┘
                    └──┬─────┬──┘
             ╔═════════╧═╗  ┌┴──────────┐  ┌ ─ ─ ─ ┐
             ║ Phone_no  ║  │Date_of_   │    Age      Department
             ╚═══════════╝  │  Birth    │  └ ─ ─ ─ ┘
              multivalued   └───────────┘   derived
```

Every construct in the taxonomy appears exactly once:

| Construct | Where |
|---|---|
| **Key** (underlined) | `ID` |
| **Composite / compound** | `Name` → First, Middle, Last |
| **Composite with a hierarchy** | `Address` → Street → {Street No, Street Name, Apartment No} |
| **Multivalued** (double ellipse) | `Phone_no` |
| **Stored** | `Date_of_Birth` |
| **Derived** (dashed ellipse) | `Age` |
| **Simple, single-valued** | `Department` |

### Example 2 — Environmental Sensor

*You are designing a database for a Smart City Infrastructure Management System. Model the Environmental Sensor entity: each sensor must be uniquely identified; has a **Type** (temperature, humidity, pollution); is installed at a specific **Location**; collects **multiple Data readings**, each containing a **Date-Time** and a **Value**; and has a **Last Calibration Date**.*

```
                              ╔══════╗── Date-time
      Type    Location        ║ Data ║
        \       |             ╚══╤═══╝── Value
         \      |                │
        ┌──────────────────────────────┐
   ID ──│    ENVIRONMENTAL SENSOR      │── Last_Calibration_Date
        └──────────────────────────────┘
   (Sensor_ID, underlined)
```

> [!EXAM]
> The whole point of this exercise is the **`Data` attribute**. *"Collects multiple readings, each containing a date-time and a value"* means it is **multivalued** (double ellipse) **and composite** (two components) — therefore a **complex attribute**. Everything else is a plain simple attribute, and `Sensor_ID` is the underlined key.
>
> The phrase to listen for in any such question is **"multiple … each containing …"** — *multiple* gives you the double ellipse, *each containing* gives you the components.

> [!TRAP]
> A frequent wrong answer here is to make `Data` a **separate entity** related to the sensor. That is not wrong as a design — in fact it is what the reduction to relational will produce — but it is **not what the question asked**, which was to model `Data` as part of the **Environmental Sensor entity**. Read whether the question wants an attribute or an entity; the phrase *"model the X entity with the following details"* wants attributes.

---

**Next:** how entities connect — **relationships, roles & recursive relationships**.
