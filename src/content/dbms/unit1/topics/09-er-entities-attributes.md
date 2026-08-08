---
subject: dbms
unit: 1
order: 9
slug: er-entities-attributes
title: The E-R Model — Entities & Entity Sets
summary: Why ER diagrams are worth drawing, the COMPANY requirements description and how each phrase maps to an ER construct, entities with physical versus conceptual existence, and entity type versus entity set versus extension.
minutes: 9
tags: [er-model, entity, entity-set, entity-type, extension, miniworld, company-database]
---

# The E-R Model — Entities & Entity Sets

## Why the E-R model

> [!NOTE]
> The **Entity-Relationship (E-R) model** is a high-level **semantic / conceptual** data model. **E-R diagrams** give a **graphical representation of the database's logical structure**, using symbols to depict **entities, relationships and attributes**, making complex relationships easier to understand.

The four benefits the lecture states:

| Benefit | Detail |
|---|---|
| **Simplicity and clarity** | Which is why it is so widely used in database design |
| **Catches problems early** | Mapping entities, attributes and relationships **before implementation** helps identify potential **issues, redundancies or inconsistencies** |
| **Better structures** | Leading to more efficient, optimised designs and **reducing the need for costly modifications later** |
| **Documentation** | A comprehensive tool that **records the structure of the database** |

> [!INTUITION]
> The economic argument is the real one. A mistake caught on a whiteboard costs a marker; the same mistake caught after the schema is populated and five applications depend on it costs a migration. The ER diagram is cheap precisely because it is **not executable** — which is also why it can afford to be **DBMS-independent**, sitting above the dashed line in the design-phases diagram.

---

## The COMPANY database — the running description

The requirements the lecture models are worth knowing, because the ER examples throughout the unit come from them:

- The company is organised into **DEPARTMENTs**. Each department has a **name**, a **number**, and an **employee who manages** it; we keep the **start date** of the department manager. A department may have **several locations**.
- Each department **controls a number of PROJECTs**. Each project has a **unique name and number** and is located at a **single location**.
- The database stores each **EMPLOYEE**'s **social security number, address, salary, sex and birthdate**. Each employee **works for one department** but may **work on several projects**, and we track the **number of hours per week** each employee works on each project. We also track each employee's **direct supervisor**.
- Each employee may have a number of **DEPENDENTs**; for each dependent we keep **name, sex, birthdate, and relationship to the employee**.

> [!EXAM]
> Read that description again as a **modelling exercise**, because that is how it is used. Each phrase maps to a construct:
>
> | Phrase in the requirements | ER construct |
> |---|---|
> | *"has a name, number"* | **attributes** |
> | *"an employee who manages"* | a **relationship** |
> | *"start date of the manager"* | a **descriptive attribute** on that relationship |
> | *"several locations"* | a **multivalued attribute** |
> | *"works for one department"* | a **1:N relationship** |
> | *"may work on several projects"* | an **M:N relationship** |
> | *"hours per week on each project"* | a **descriptive attribute** on the M:N relationship |
> | *"direct supervisor"* | a **recursive relationship** |
> | *"DEPENDENTs"* | a **weak entity** |
>
> Learning to make that mapping — from a paragraph of English to a diagram — **is** the exam skill for this half of the unit.

---

## Entities

> [!NOTE]
> **Entity** is *the* basic concept of the ER model. Entities are **specific things or objects in the mini-world** that are represented in the database. Each entity has **attributes**.

| Kind of existence | Meaning | Examples |
|---|---|---|
| **Physical / concrete** | It exists as a thing you could touch | car, person, employee, house, book |
| **Conceptual / abstract** | It exists as an idea or arrangement | a company, a job, a university course, a project, a reservation |

Both kinds serve equally as **distinct objects** in the system.

**Unique identification:** unique property values identify each entity. A student's `student_id` value like `PES001` makes them distinct; a `course_id` attribute uniquely identifies each course.

> [!TRAP]
> Students routinely assume an entity must be a physical thing, and then fail to model **courses, projects, reservations, jobs and enrolments** as entities. The lecture is explicit that entities can be **concrete or abstract**, and **both types serve as distinct objects**. If it has identity and attributes, it is a candidate entity — whether or not you could drop it on your foot.

---

## Entity type vs entity set (extension)

> [!NOTE]
> - An **entity set** (or entity collection) is a **group of entities of the same kind**, sharing common attributes or properties.
> - The **entity type** is the **definition** — the name plus the list of attributes.
> - The **extension** is the **actual collection of entities** at a point in time.

```
  Entity Type Name:      EMPLOYEE                          COMPANY
                      Name, Age, Salary          Name, Headquarters, President
                   ┌───────────────────────┐  ┌────────────────────────────────┐
  Entity Set:      │ e1 (John Smith,55,80k)│  │ c1 (Sunco Oil, Houston,        │
  (Extension)      │ e2 (Fred Brown,40,30K)│  │      John Smith)               │
                   │ e3 (Judy Clark,25,20K)│  │ c2 (Fast Computer, Dallas,     │
                   │          ⋮            │  │      Bob King)                 │
                   └───────────────────────┘  └────────────────────────────────┘
```

So `E1` is *an entity* having *entity type* `Student`, and the set of all students is the *entity set*. For example, **`instructor`** represents all university instructors, and **`student`** represents all university students.

> [!TRAP]
> **"Extension" is asked directly** in the deck's MCQs: *"What does an extension of an entity set refer to?"* → **the actual collection of entities**, not the identifier and not the attribute list. Keep the trio straight:
>
> | Term | It is… |
> |---|---|
> | **Entity type** | the **definition** (name + attributes) — part of the **schema** |
> | **Entity set / extension** | the **current collection of entities** — part of the **state** |
> | **Entity** | **one member** of that collection |
>
> It is exactly the schema-vs-state distinction, applied to the ER model.

> [!INTUITION]
> Notice the entity-type/extension figure lists `EMPLOYEE` and `COMPANY` side by side, with **John Smith appearing in both** — as employee `e1` and as the president of company `c1`. Entity sets are **not required to be disjoint**: the same real-world person may appear in more than one entity set, or in the same one under different roles. This is what makes generalisation and specialisation necessary later, and it is the reason a `person` may be both an instructor and a student.

There are **two types of entity: strong and weak** — weak entities are covered together with keys in a later topic.

---

**Next:** what entities are described by — **attributes, keys & null values**.
