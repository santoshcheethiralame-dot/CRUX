---
subject: dbms
unit: 1
order: 5
slug: data-abstraction-schema
title: Data Abstraction & Data Independence
summary: Why abstraction exists at all, the three levels worked through a university database, and physical versus logical data independence with the consequences of losing each.
minutes: 10
tags: [data-abstraction, physical-level, logical-level, view-level, data-independence]
---

# Data Abstraction & Data Independence

## Why abstraction exists

The lecture builds the motivation as a chain, and it is worth following because the exam asks *"why is data abstraction needed?"*:

1. A DBMS must **retrieve data efficiently**.
2. That need for efficiency pushes developers to use **complex data structures** to represent data.
3. But many database users are **not computer trained** and cannot write complex queries.
4. So developers **hide that complexity** behind **several layers of data abstraction**, to simplify the user's interaction with the system.

> [!INTUITION]
> The tension is real and permanent: **what is fast for a machine is unreadable to a person.** B\+-trees, hash buckets and page layouts make retrieval fast; nobody wants to think in them to ask *"who is enrolled in CS564?"*. Abstraction is the negotiated settlement — the machine keeps its complicated structures, the user gets simple ones, and the **DBMS does the translation**. Every level you add is one more translation the system performs on your behalf.

---

## The three levels of data abstraction

> [!NOTE]
> | Level | Also called | Describes | Audience |
> |---|---|---|---|
> | **Physical** | Internal | **How** the data is **actually stored** in the computer — the **lowest** level of abstraction | Storage / system |
> | **Logical** | Conceptual | **What kind of data** is stored and **how different pieces are related** to each other. Describes the **entire database** in terms of a **small number of relatively simple structures** | Designers / DBA |
> | **View** | External | The **highest** level — displays only **part of the entire database**, the part an individual user needs; different users see different parts, per their needs and permissions | End users |

The two insulating claims that follow from this:

- Implementing simple **logical** structures may involve complex **physical** structures — but *the user at the logical level need not be aware of it*.
- A user working at the **view** level need not be aware of the **logical** implementation — for them it is simply an interface.

### Worked through the university database

The lecture uses three record types:

| Table | Attributes |
|---|---|
| **Department** | `Dept_ID`, `Dept_Name`, `Building` |
| **Course** | `Course_ID`, `Course_Name`, `Credits`, `Dept_ID` |
| **Student** | `SRN`, `Name`, `Dept_ID`, `Total_Credits` |

| Level | What it specifies here |
|---|---|
| **Physical** | How student records, course information and department data are **stored on the hard drive or in memory** |
| **Logical** | The **entities** — *Department*, *Student*, *Course* — their **attributes** (department name, student ID, course code), **and the relationships** between them: *"Students belong to Departments"*, *"Courses are taken by Students"* |
| **View** | A **faculty member** sees only the courses they teach and the students enrolled in them. A **student** sees only the courses they are registered for and their grades. Each is a simplified, customised perspective. |

> [!EXAM]
> *"Define the three levels of data abstraction and explain with an example from a university database"* is one of the deck's own review questions. Answer with the **three level names + what each describes + who it is for**, then give **exactly this university example** — physical = on disk, logical = entities/attributes/relationships, view = the faculty view versus the student view.

> [!TRAP]
> The **logical** level is *not* only "what data is stored". The definition includes **how different pieces of information are related to each other** — relationships are a logical-level concern. Omitting relationships is the standard way this definition is under-answered.

---

## Data independence

> [!NOTE]
> **Physical data independence** — the ability to **modify the physical schema without any alteration to the conceptual/logical schema**, typically done for **optimisation**.
>
> **Logical data independence** — the ability to **modify the logical schema without affecting the external schema or the application programs**. The user's view of the data is unaffected by changes to the conceptual view.

### What each kind of change absorbs

| | **Physical** changes it absorbs | **Logical** changes it absorbs |
|---|---|---|
| Examples | Changing the **storage size** of the server; moving from **sequential to random-access files**; using **new storage devices**; **modifying the data structures** used for storage; **altering indexes** or using alternative **file-organisation** techniques | **Insertion or deletion of attributes**; **altering table structures**, entities or relationships in the logical schema |

### What it costs you to lack them

The lecture frames both as before/after scenarios, and this is the shape an exam answer should take.

**Scenario A — the university migrates its storage system or optimises the storage layout.**

| Without physical data independence | With physical data independence |
|---|---|
| Minor storage changes or hardware upgrades could **break existing queries, applications and interfaces**. Every storage update needs **extensive modification of the application layer** → higher maintenance cost, longer development cycles. | DBAs make the change **without altering the logical schema**; users' queries and applications **keep working**. Easier maintenance, upgrades and performance tuning **without disrupting the application layer**. |

**Scenario B — the university reorganises departments and adds new attributes to the `Department` entity.**

| Without logical data independence | With logical data independence |
|---|---|
| Any change to the logical schema — adding/removing attributes, changing relationships — **propagates through every application** that uses the database. Developers must modify all affected code. Even minor data-model changes cause **widespread disruption and downtime**, and risk introducing errors. | Designers make the modification **without impacting existing application programs**. The system adapts easily to changing requirements and business rules **without application disruption**. |

> [!EXAM]
> *"What is the difference between physical and logical data independence? Give one example of each"* — asked verbatim in the deck. The compact answer:
>
> - **Physical**: change *how* data is stored (e.g. **add an index**, or switch **sequential → random access files**) without touching the logical schema.
> - **Logical**: change *what* is stored (e.g. **add an attribute to a table**) without touching the external schemas or applications.

> [!TRAP]
> **Logical data independence is harder to achieve than physical.** Applications are written directly against the logical structure — they name the tables and columns — so insulating them from logical change is genuinely difficult, and real systems achieve it only partially. Physical independence, by contrast, is nearly total in any modern relational DBMS.
>
> If a question asks which is harder, the answer is **logical**, and the reason is **application programs depend on the logical structure**.

> [!INTUITION]
> Here is the cleanest way to hold the pair. **Physical independence protects you from the machine changing underneath you. Logical independence protects you from the business changing above you.** The first is a technology problem and is solved; the second is a requirements problem and never fully is.

---

**Next:** the design versus the data in it, and the architecture that separates them — **schema, state & the three-schema architecture**.
