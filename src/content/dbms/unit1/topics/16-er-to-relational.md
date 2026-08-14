---
subject: dbms
unit: 1
order: 16
slug: er-to-relational
title: Reducing an ER Diagram to a Relational Schema
summary: The relational model's vocabulary and its five schema-based constraints, then the complete seven-step mapping algorithm worked on the COMPANY database, with the three options for 1:1 relationships.
minutes: 14
tags: [er-to-relational, mapping-algorithm, relational-model, superkey, candidate-key, foreign-key, referential-integrity]
---

# Reducing an ER Diagram to a Relational Schema

## The relational model in one page

> [!NOTE]
> The relational model represents the database as a **collection of relations**. Informally, **each relation resembles a table of values**, and each row represents a collection of related data values.
>
> The formal names, which are what exams use:
>
> | Informal | **Formal** |
> |---|---|
> | table | **relation** |
> | row | **tuple** |
> | column | **attribute** |

- The **schema of a relation** is written $R(A_1, A_2, \dots, A_n)$ — $R$ is the relation name, $A_1 \dots A_n$ its attributes. Example: `CUSTOMER(Cust-id, Cust-name, Address, Phone#)`.
- Each attribute has a **domain** — a set of valid values, with both a **logical definition** and a **format**. `USA_phone_numbers` might have format `(ddd)ddd-dddd`.
- A **relation state** $r$ of schema $R$ is a **set of tuples** $r = \{t_1, t_2, \dots, t_m\}$.

> [!EXAM]
> The pair of terms the slides flag explicitly:
>
> **Relational schema $R$ is also known as the INTENSION.**
> **Relational state $r$ is also known as the EXTENSION.**
>
> Same schema-vs-state idea met earlier, under two more names.

A **key** is a data item (or set of items) that uniquely identifies a row. When there is no natural one, a sequential number may be assigned — called an **artificial key** or **surrogate key**.

---

## Constraints

> [!NOTE]
> Constraints determine which values are permissible. **Three main types:**
>
> | Type | Meaning |
> |---|---|
> | **Inherent / implicit** | Comes from the **data model itself** — e.g. the relational model does not allow a **list** as a value |
> | **Schema-based / explicit** | Expressed **in the schema** using the model's facilities — e.g. a cardinality ratio |
> | **Application-based / semantic** | **Beyond the expressive power of the model**; must be enforced by **application programs** |

### The five schema-based constraints

> [!EXAM]
> **Domain · Key · Constraints on NULLs · Entity integrity · Referential integrity.** Learn them as a list of five — it is a standard question.

**1. Domain constraint** — every value in a tuple must be from the **domain of its attribute** (or null, if allowed).

**2. Key constraints** — three terms that build on each other:

> [!NOTE]
> - **Superkey** — a set of attributes $SK$ such that **no two tuples have the same value for $SK$**. Formally, for any distinct $t_1, t_2$: $t_1[SK] \neq t_2[SK]$.
> - **Key** — a **"minimal" superkey**: removing *any* attribute leaves a set that is **no longer a superkey**.
> - **Candidate key** — a schema may have **more than one key**; each is a candidate key. `CAR` has registration number, engine serial number and licence number.
> - **Primary key** — if there are several candidate keys, **one is chosen arbitrarily**. Its attributes are **underlined**.

> [!TRAP]
> **"A key is a superkey but not vice versa."** Every key is a superkey; most superkeys are not keys because they carry extra baggage.
>
> If `SSN` identifies an employee, then `{SSN, Name}` is still a superkey — but it is **not** a key, because you can drop `Name` and still identify uniquely. **Minimality is the whole difference.**

**3. Constraints on NULLs** — specifies whether nulls are permitted. If every student must have a name, `Name` is constrained **NOT NULL**.

**4. Entity integrity** — the **primary key cannot be null** in any tuple: $t[PK] \neq \text{null}$. The reason is immediate — **PK values are used to identify tuples**, and you cannot identify anything by an absence.

**5. Referential integrity** — a constraint **involving two relations**, the **referencing** and the **referenced**.

> [!NOTE]
> $FK$ in $R_1$ is a **foreign key** referencing $R_2$ if:
>
> 1. The attributes in $FK$ have the **same domain** as the primary key $PK$ of $R_2$;
> 2. A value of $FK$ in a tuple either **occurs as a $PK$ value of some tuple in $R_2$**, **or is NULL**.

> [!INTUITION]
> Rule 2 is the entire point: **a foreign key may point at something real, or at nothing at all — but never at something that does not exist.** That is what stops a database accumulating orphaned references, and it is why deleting a parent row forces a decision (`CASCADE`, `SET NULL`, or refuse).

---

## Why the mapping works at all

> [!NOTE]
> - **Both the E-R model and the relational model are abstract, logical representations of real-world organizations.**
> - **Due to shared design principles, an E-R design can be transformed into a relational design.**
> - For **each entity set and each relationship set**, there is a **unique relation schema** carrying the corresponding name.

---

## The seven-step mapping algorithm

> [!EXAM]
> Memorise the seven step **titles** in order — questions often just ask you to list them, and every full mapping question follows this sequence.
>
> 1. Mapping of **Regular/Strong Entity** Types
> 2. Mapping of **Weak Entity** Types
> 3. Mapping of **Binary 1:1** Relationship Types
> 4. Mapping of **Binary 1:N** Relationship Types
> 5. Mapping of **Binary M:N** Relationship Types
> 6. Mapping of **Multivalued Attributes**
> 7. Mapping of **N-ary** Relationship Types

Worked throughout on the **COMPANY** database.

### Step 1 — Strong entities

For each regular entity type $E$, create a relation $R$ with **all the simple attributes** of $E$. Choose one key of $E$ as the **primary key**. If that key is **composite**, all its simple components together form the primary key.

**Example:** `EMPLOYEE`, `DEPARTMENT`, `PROJECT` are created, with primary keys **SSN, DNUMBER and PNUMBER**.

### Step 2 — Weak entities

For each weak entity $W$ with owner $E$, create relation $R$ with all simple attributes of $W$, **plus the primary key of the owner as a foreign key**. The primary key of $R$ is **owner's key + partial key of $W$**.

**Example:** `DEPENDENT` is created. `SSN` of `EMPLOYEE` is included as a foreign key, **renamed ESSN**. The primary key is **{ESSN, DEPENDENT_NAME}**, because `DEPENDENT_NAME` is the partial key.

### Step 3 — Binary 1:1

> [!EXAM]
> **Three possible approaches** — this is the step most likely to be asked in detail:
>
> | Approach | What you do | When |
> |---|---|---|
> | **1. Foreign key (2 relations)** | Choose one relation $S$ and put $T$'s primary key in it as a foreign key | **Better to choose the entity type with total participation** in the role of $S$ |
> | **2. Merged relation (1 relation)** | Merge both entity types and the relationship into a **single** relation | **Appropriate when both participations are total** |
> | **3. Cross-reference / relationship relation (3 relations)** | Set up a **third** relation cross-referencing the two primary keys | — |
>
> **Example:** `MANAGES` is mapped by choosing **DEPARTMENT** as $S$, **because its participation in MANAGES is total** — every department has a manager.

> [!INTUITION]
> Why prefer the totally-participating side? Because the foreign key sitting there can be **NOT NULL**. Put it on the partial side instead and most rows carry a null — every employee who does not manage anything. **Choosing the total side is how you avoid a column that is mostly empty.**

### Step 4 — Binary 1:N

Identify the relation $S$ on the **N-side**. Include as a **foreign key in $S$** the primary key of the relation $T$ on the 1-side. Include any simple attributes of the relationship as attributes of $S$.

**Example:** For `WORKS_FOR`, put `DNUMBER` of `DEPARTMENT` into `EMPLOYEE` as a foreign key called **DNO**. Also applies to `CONTROLS` and `SUPERVISION`.

> [!TRAP]
> The foreign key goes on the **many** side, never the one side. A department would otherwise need a column holding many employee keys — which the relational model forbids outright, since **a list is not a legal attribute value** (that is the *inherent* constraint from earlier).
>
> The slides note a relationship relation could be used instead, but *"this is rarely done."*

### Step 5 — Binary M:N

Create a **new relation $S$** — a **relationship relation**. Include the primary keys of both participating relations as foreign keys; **their combination forms the primary key of $S$**. Include any simple attributes of the relationship.

**Example:** `WORKS_ON` is created. `PROJECT` and `EMPLOYEE` keys are included as foreign keys **renamed PNO and ESSN**, the relationship's attribute **HOURS** becomes a column, and the primary key is **{ESSN, PNO}**.

> [!EXAM]
> **M:N is the only relationship type that always needs a new relation.** 1:1 and 1:N are handled with a foreign key inside an existing relation. If a question asks *"which relationships require a separate table?"*, the answer is **M:N and n-ary**.

### Step 6 — Multivalued attributes

For each multivalued attribute $A$, create a **new relation $R$** containing $A$ plus the primary key $K$ of its owner as a **foreign key**. The primary key of $R$ is **{$A$, $K$} combined**. If $A$ is composite, include its simple components.

**Example:** `DEPT_LOCATIONS` is created. `DLOCATION` represents the multivalued `LOCATIONS` of `DEPARTMENT`, `DNUMBER` is the foreign key, and the primary key is **{DNUMBER, DLOCATION}**.

> [!INTUITION]
> This is **1NF being enforced**. A department with three locations cannot store `"Houston, Dallas, Austin"` in one cell, because that is a list. Splitting it into three rows of a side table is the only representation the relational model permits — which is why *every* multivalued attribute costs you a table.

### Step 7 — N-ary relationships

For each n-ary relationship ($n > 2$), create a new relation $S$ with the primary keys of **all** participating relations as foreign keys, plus any simple attributes of the relationship.

**Example:** `SUPPLY` maps to a relation whose primary key is the combination of **three** foreign keys — **{SNAME, PARTNO, PROJNAME}**.

---

## The summary you should be able to reproduce

> [!EXAM]
> | ER construct | Becomes in the relational model |
> |---|---|
> | Strong entity type | A **relation**, its key → primary key |
> | Weak entity type | A relation; PK = **owner's PK + partial key** |
> | **1:1** relationship | **Foreign key** in one relation (prefer the **total** side) — or merge, or a third relation |
> | **1:N** relationship | **Foreign key on the N-side** |
> | **M:N** relationship | **A new relation** with both keys as its combined PK |
> | **Multivalued attribute** | **A new relation**, PK = {attribute, owner's key} |
> | **n-ary** relationship | **A new relation** with all $n$ keys |
> | Simple attribute | A column |
> | **Derived attribute** | **Not stored** — computed by a procedure or function |

> [!EXAM]
> **The deck's own MCQ answers:**
> - First step in converting an ER diagram → **mapping strong entity sets**
> - Primary key for a weak entity set → **the combination of the weak entity's discriminator and the identifying entity's primary key**
> - Constraint added for a multivalued attribute's relation → **foreign key constraint**
> - A derived attribute is handled by → **a stored procedure or function** (it is *not* stored as a regular attribute)

---

**Next:** querying the tables we have just built — **relational algebra: unary operators**.
