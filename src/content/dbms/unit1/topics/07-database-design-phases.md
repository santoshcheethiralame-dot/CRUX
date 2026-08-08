---
subject: dbms
unit: 1
order: 7
slug: database-design-phases
title: The Database Design Process & DBMS Internals
summary: The design process from mini-world to internal schema with its two parallel tracks and the DBMS-independent boundary, the four design phases, and the DBMS component modules, catalog and system utilities.
minutes: 10
tags: [database-design, design-phases, conceptual-design, logical-design, physical-design, dbms-modules, catalog, utilities]
---

# The Database Design Process & DBMS Internals

## The database design process

> [!NOTE]
> ```
>                            [ MINIWORLD ]
>                                  |
>                  REQUIREMENTS COLLECTION AND ANALYSIS
>                       /                        \
>        Functional Requirements            Data Requirements
>                 |                                 |
>        FUNCTIONAL ANALYSIS                CONCEPTUAL DESIGN
>                 |                                 |
>   High-Level Transaction Spec        Conceptual Schema (high-level data model)
> - - - - - - - - | - - - - - - - - - - - - - - - - | - - - - -  DBMS-independent
>                 |                                 |             DBMS-specific
>                 |                    LOGICAL DESIGN (DATA MODEL MAPPING)
>                 |                                 |
>    APPLICATION PROGRAM DESIGN  <---- Logical (Conceptual) Schema
>                 |                    (in the data model of a specific DBMS)
>                 |                                 |
>                 |                         PHYSICAL DESIGN
>                 |                                 |
>      TRANSACTION IMPLEMENTATION  <-------- Internal Schema
>                 |
>        Application Programs
> ```

Read the diagram as **two parallel tracks that start together and rejoin at the end**:

| Track | Starts from | Produces |
|---|---|---|
| **Data** (right) | **Data requirements** | Conceptual schema → logical schema → **internal schema** |
| **Function** (left) | **Functional requirements** | High-level transaction specification → application program design → **application programs** |

> [!EXAM]
> Two details in this figure are examined and routinely missed:
>
> 1. **The dashed line.** Everything **above** it is **DBMS-independent**; everything **below** it is **DBMS-specific**. The line falls **between conceptual design and logical design** — so the **conceptual schema is DBMS-independent** and the **logical schema is expressed in the data model of a specific DBMS**.
> 2. **The cross-links.** The high-level transaction specification feeds **physical design** (you cannot choose indexes without knowing the queries), and the **logical schema** feeds application program design.

The four phases as usually listed:

| # | Phase | Activity |
|---|---|---|
| **1** | **Requirements collection & analysis** | Interact with users and domain experts to characterise the **data needs** and the **operations** to be performed |
| **2** | **Conceptual design** | Choose a **high-level data model** and translate requirements into a **conceptual schema** — this is where the **E-R model** is used. Includes **review and refinement** of the schema |
| **3** | **Logical design** (data model mapping) | Map the conceptual schema into the implementation data model — **relational**. This is where **reducing ER to a relational schema** happens |
| **4** | **Physical design** | Specify **file organisation, indexes and storage structures** for performance |

> [!INTUITION]
> The reason conceptual design is deliberately kept **DBMS-independent** is leverage: you get to argue about *what the university is* — do students have one major or many? does a course have to have an instructor? — **without anyone raising MySQL's limitations**. Mixing the two conversations is the classic way a design goes wrong, because implementation convenience quietly starts deciding what the business rules are.

> [!TRAP]
> "Logical design" here means **conceptual schema → relational schema**, *not* "logical level of abstraction". The word *logical* is doing double duty in this unit — as a **level of abstraction** and as a **design phase**. In the design-phase sense, its output is called the **logical (conceptual) schema in the data model of a specific DBMS**.

---

## What a DBMS is made of — component modules

> [!NOTE]
> ```
>   DBA Staff        Casual Users     Application Programmers   Parametric Users
>      |   \              |                    |                       |
>  DDL Stmts  Privileged  Interactive     Application Programs         |
>      |      Commands      Query              |                       |
>  DDL Compiler   |      Query Compiler    Precompiler                 |
>      :          |            |            /        \                 |
>      :          |      Query Optimizer  DML      Host Language       |
>      :          |            |        Compiler     Compiler          |
>      :          |            |            \        /                 |
>      :          |            |         Compiled Transactions  <------+
>      :          |            |                |
>      :          +------------+----------------+
>      :                       |
>      :        DBA Commands, Queries, and Transactions
>      v                       v
>  System Catalog  <....>  Runtime Database Processor  <-->  Stored Data Manager
>  / Data Dictionary            |            ^                      |
>                               |            :                      v
>                               v      Concurrency Control /   Stored Database
>                        Stored Database  Backup / Recovery
>                                          Subsystems
> ```

| Module | Job |
|---|---|
| **Stored Data Manager (SDM)** | Controls **access to DBMS information stored on disk** |
| **DDL compiler** | Processes **schema definitions** specified in the DDL and **stores the metadata in the catalog** |
| **Query compiler** | Handles **high-level queries** — parses and compiles a query, then calls the runtime processor for execution |
| **Query optimizer** | Rearranges and reorders operations, eliminates redundancies, and picks an efficient **execution plan** using catalog information |
| **Pre-compiler** | **Extracts DML commands** from an application program, handing the rest to the host-language compiler |
| **DML compiler** | Compiles the extracted DML into **compiled transactions** |
| **Runtime database processor** | **Executes** privileged commands, query plans and canned transactions |
| **Concurrency control / backup / recovery subsystems** | Keep the database consistent across concurrent access and failures |
| **System catalog / data dictionary** | Holds the **metadata** |

> [!INTUITION]
> Trace the **catalog's arrows** and the architecture explains itself. The **DDL compiler writes** to the catalog; the **query optimizer and DML compiler read** from it. That single asymmetry is the **self-describing nature** turned into a wiring diagram: schema definitions are compiled *once* into metadata, and every query afterwards is compiled *against* that metadata. It is also why a schema change can invalidate a cached query plan.

> [!TRAP]
> Note who reaches the runtime processor **without a compiler in between**: **parametric (naïve) users** go straight to **compiled transactions**. Their operations were compiled *in advance* — that is what "canned transaction" means, and it is why a booking screen is fast. **Casual users** pay the compile-and-optimise cost on every interactive query.

### Database system utilities

| Utility | Purpose |
|---|---|
| **Loading** | Load existing data files into the database; includes **data conversion tools** from an old format to the new database format |
| **Backup** | Back up the database periodically — **incremental or total** |
| **Database storage reorganisation** | Reorganise file structures and create **new access paths** to improve performance |
| **Performance monitoring** | Monitor database usage and provide **statistics to the DBA** |

> [!EXAM]
> *"What is the role of the storage manager in a DBMS? List any three components it manages"* appears in the deck's own review questions. Answer: the **stored data manager controls access to DBMS information on disk**, mediating between the runtime processor and the stored database, and works with the **system catalog**, the **data files**, and the **backup/recovery subsystem**; index files and buffers are the other standard answers.

---

**Next:** how the system is deployed and who uses it — **database architectures & users**.
