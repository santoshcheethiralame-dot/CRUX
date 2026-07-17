---
subject: dbms
unit: 1
order: 3
slug: data-abstraction-schema
title: Data Abstraction, Schema & the Three-Schema Architecture
summary: The three levels of data abstraction, physical vs logical data independence, the difference between schema and instance/state, and the ANSI three-schema architecture.
minutes: 13
tags: [data-abstraction, three-schema, data-independence, schema, instance]
---

# Data Abstraction, Schema & the Three-Schema Architecture

A major purpose of a DBMS is to give users an **abstract view** of data, hiding complexity through levels of abstraction.

## The three levels of data abstraction

> [!NOTE]
> | Level | Describes | Audience |
> |---|---|---|
> | **Physical (internal)** | *How* data is **actually stored** (files, indexes) — the lowest level | Storage / system |
> | **Logical (conceptual)** | *What* data is stored and the **relationships** among it — the whole DB in simple structures | Designers / DBA |
> | **View (external)** | *Part* of the DB relevant to a **particular user** — the highest level | End users |

> [!INTUITION]
> A faculty member's **view** shows only their courses and enrolled students; a student's view shows only their courses and grades. Both sit on top of the same **logical** schema, which itself sits on a complex **physical** storage layout neither user needs to know about.

## Data independence

> [!EXAM]
> - **Physical data independence** — modify the **physical** schema (storage, indexes, file organisation) **without** changing the logical schema or applications.
> - **Logical data independence** — modify the **logical** schema (add/remove attributes, change tables) **without** changing the external schema or application programs.
>
> **Logical data independence is harder to achieve** than physical, because applications depend heavily on the logical structure.

## Schema vs Instance (State)

> [!NOTE]
> - **Schema** = the overall **design** of the database (≈ variable *declarations + types* in a program). Changes **rarely**.
> - **Instance / Database State / Snapshot** = the actual **data** at a particular moment (≈ the *values* of variables at runtime). Changes **frequently**.

> [!TRAP]
> When you **define** a new database you specify only the **schema** → the state is **empty**. Loading data gives the initial state; each update yields a new state. Many states can correspond to one schema — don't confuse the unchanging *schema* with the ever-changing *state*.

## The Three-Schema (ANSI/SPARC) Architecture

> [!NOTE]
> ```
> External level   →  External views (View 1, View 2, View 3)      [what each user sees]
>         ↕  external/conceptual mapping        ⇒ logical data independence
> Conceptual level →  Conceptual schema (entities, relationships)   [logical structure]
>         ↕  conceptual/internal mapping         ⇒ physical data independence
> Internal level   →  Internal schema (storage, indexes)            [physical storage]
>                  →  Stored database
> ```

The **mappings between levels** are exactly what provide data independence: the **external↔conceptual** mapping gives **logical** independence, and the **conceptual↔internal** mapping gives **physical** independence.

> [!EXAM]
> Three-schema architecture = **External / Conceptual / Internal** levels (≈ view / logical / physical). Its whole point is to **separate the user view from the storage**, enabling the two kinds of data independence.

---

**Next:** how databases are designed, structured and served — **design, architectures & users**.
