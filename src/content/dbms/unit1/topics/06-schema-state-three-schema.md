---
subject: dbms
unit: 1
order: 6
slug: schema-state-three-schema
title: Schema, State & the Three-Schema Architecture
summary: Schema versus instance with the programming analogy, the lifecycle of database states, the COMPANY schema and a sample state, and the ANSI/SPARC three-schema architecture with the two mappings that deliver data independence.
minutes: 10
tags: [schema, instance, state, snapshot, three-schema, ANSI-SPARC, mapping, view, external-schema]
---

# Schema, State & the Three-Schema Architecture

## Schema vs Instance (Database State)

Databases change over time as information is inserted, deleted and modified.

> [!NOTE]
> - **Database schema** — the **overall design** of the database.
> - **Instance / database state / snapshot** — the collection of information stored in the database **at a particular moment**; also called the *current set of occurrences or instances*.

The lecture's programming-language analogy is exact and worth quoting in an answer:

| Database concept | Programming analogue |
|---|---|
| **Database schema** | **Variable declarations** together with their **type definitions** |
| **Instance / state** | The **values of the variables** at a particular point in time in the program |

### How states come into being

> [!EXAM]
> The lifecycle is a favourite short question:
>
> 1. When we **define** a new database, we specify **only its schema** to the DBMS.
> 2. At that point the corresponding database state is the **empty state**, with no data.
> 3. We get the **initial state** when the database is first **populated or loaded** with initial data.
> 4. From then on, **every update operation yields another database state**.
> 5. At any point in time the database has **exactly one current state** — but **many states can correspond to a single schema**.

> [!TRAP]
> The distinction is described in the slides as *"very important"*, and the reason is the asymmetry: **in a given database state, each schema construct has its own current set of instances.** The schema is the **template**; the state is one **filling-in** of it.
>
> Confusing them is what makes students answer *"the schema changes when we insert a row"* — it does not. **Inserts change the state. Only `CREATE`/`ALTER`/`DROP` change the schema.**

### The COMPANY example

A simplified **COMPANY** relational database schema:

```
EMPLOYEE ( Ename , Ssn , Bdate , Address , Dnumber )
                    ^PK                     ^FK

DEPARTMENT ( Dname , Dnumber , Dmgr_ssn )
                     ^PK       ^FK
```

A **sample database state** for that schema:

| Ename | Ssn | Bdate | Address | Dnumber |
|---|---|---|---|---|
| Smith, John B. | 123456789 | 1965-01-09 | 731 Fondren, Houston, TX | 5 |
| Wong, Franklin T. | 333445555 | 1955-12-08 | 638 Voss, Houston, TX | 5 |
| Zelaya, Alicia J. | 999887777 | 1968-07-19 | 3321 Castle, Spring, TX | 4 |
| Wallace, Jennifer S. | 987654321 | 1941-06-20 | 291 Berry, Bellaire, TX | 4 |
| Narayan, Ramesh K. | 666884444 | 1962-09-15 | 975 Fire Oak, Humble, TX | 5 |
| English, Joyce A. | 453453453 | 1972-07-31 | 5631 Rice, Houston, TX | 5 |
| Jabbar, Ahmad V. | 987987987 | 1969-03-29 | 980 Dallas, Houston, TX | 4 |
| Borg, James E. | 888665555 | 1937-11-10 | 450 Stone, Houston, TX | 1 |

| Dname | Dnumber | Dmgr_ssn |
|---|---|---|
| Research | 5 | 333445555 |
| Administration | 4 | 987654321 |
| Headquarters | 1 | 888665555 |

> [!INTUITION]
> The two tables above are **one state**; the two boxed definitions are **the schema**. Delete every row and the schema is untouched — you are back to the empty state you had immediately after `CREATE TABLE`.
>
> Also read the **foreign keys** in the state: `Dmgr_ssn = 333445555` is Franklin Wong's SSN, and Wong's own `Dnumber` is 5 — so **the manager of Research is himself an employee of Research**. Referential integrity is what guarantees that manager SSN actually resolves to a real employee. This is the same COMPANY database used for the ER model later, so the names are worth recognising.

---

## The Three-Schema (ANSI/SPARC) Architecture

> [!NOTE]
> ```
>                        End Users
>                            |
>  EXTERNAL LEVEL      [External View] ... [External View]
>                            |
>                   External / Conceptual Mapping      => logical data independence
>                            |
>  CONCEPTUAL LEVEL     [ Conceptual Schema ]
>                            |
>                   Conceptual / Internal Mapping      => physical data independence
>                            |
>  INTERNAL LEVEL       [  Internal Schema  ]
>                            |
>                     [  Stored Database  ]
> ```

The three levels correspond to the three levels of abstraction — **external ≈ view**, **conceptual ≈ logical**, **internal ≈ physical** — but the architecture adds the thing that actually does the work: **the two mappings**.

> [!EXAM]
> The **mappings are the whole point** and are where marks are won:
>
> - The **external / conceptual mapping** is what delivers **logical data independence** — change the conceptual schema, redefine the mapping, and the external views still produce the same answers.
> - The **conceptual / internal mapping** is what delivers **physical data independence** — change how things are stored, redefine the mapping, and the conceptual schema is untouched.
>
> State the three levels, then state which mapping gives which independence. An answer with the levels but not the mappings is only half the question.

> [!NOTE]
> **How many of each schema can exist?** Ramakrishnan & Gehrke are precise about this and it is easily examined:
>
> Any given database has **exactly one conceptual schema and exactly one physical schema**, because there is just one set of stored relations — but it may have **several external schemas**, each tailored to a different group of users.
>
> Each external schema consists of one or more **views** and relations drawn from the conceptual schema. A **view** is conceptually a relation, but **its records are not stored** — they are **computed on demand** from a definition written in terms of the stored relations.

> [!INTUITION]
> Why not just store the view as well? Because that would be **redundant**, and redundancy invites inconsistency — R&G's example is a `Courseinfo` view carrying an `enrollment` count. If you stored it *and* the `Enrolled` relation, a new enrolment could be inserted without the stored count being incremented, and the two would disagree.
>
> This is exactly **drawback #1** from the file-processing topic reappearing one level up: **derive what you can, store only what you must.**

> [!TRAP]
> Do not equate "view level" with "user interface". A view is a **schema-level object** — a named, queryable relation defined by an expression over stored relations. The GUI is a different thing entirely, and it lives outside the database.

> [!EXAM]
> *"What is a view schema? How does it help with security and user customization?"* is one of the deck's review questions. Answer: an **external schema** made of **views**, each a relation **computed on demand** rather than stored. It aids **customization** by presenting each user group only the part of the database they need, and **security** by making the parts they should not see simply **absent from their schema** — a student granted only a `Courseinfo` view can never read faculty salaries, whatever query they write.

---

**Next:** how databases get designed and what the DBMS is made of — **the design process & DBMS internals**.
