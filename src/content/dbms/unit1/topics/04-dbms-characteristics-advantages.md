---
subject: dbms
unit: 1
order: 4
slug: dbms-characteristics-advantages
title: Characteristics, Advantages & Data Integrity
summary: The four defining characteristics of the database approach, the full list of advantages including the organisational ones, the four kinds of data integrity, and the scenario-to-problem mapping the lecture drills.
minutes: 9
tags: [characteristics, self-describing, metadata, advantages, integrity, entity-integrity, referential-integrity, case-studies]
---

# Characteristics, Advantages & Data Integrity

## Characteristics of database systems

> [!NOTE]
> | Characteristic | Meaning |
> |---|---|
> | **Self-describing nature** | The database system holds not only the database but a **complete definition/description of its structure and constraints** — the **metadata**, stored in the DBMS catalog |
> | **Insulation between programs and data** (data abstraction) | The **structure of the data files is stored in the catalog, separately from the access programs** — this is **program–data independence** |
> | **Support for multiple views** | Different users need different perspectives. A **view** may be a **subset** of the database, or may contain **virtual data derived from the stored files but not itself stored** |
> | **Sharing of data & multi-user transaction processing** | Multiple users access the database at once; the DBMS ensures changes are effected **in a controlled manner** so results are correct |

> [!EXAM]
> These four are asked as a set (*"characteristics of the database approach"*). The phrases that earn the marks are **self-describing**, **metadata / catalog**, **program–data independence**, **virtual data not explicitly stored**, and **controlled concurrent access**.

> [!INTUITION]
> The four characteristics are not a random list — they are the **drawbacks-fixes generalised into properties**. Self-description fixes the buried-structure problem; insulation fixes the program-rewriting problem; views fix the everyone-sees-everything problem; controlled sharing fixes the concurrency problem.
>
> If you can only remember one, remember **self-describing**, because the other three are built on top of it: **you can only insulate programs from a structure that has been written down somewhere.**

---

## Advantages of database systems

| Advantage | Note |
|---|---|
| **Controlling redundancy** in data storage | The central fix for problem #1 |
| **Sharing of data** among multiple users | |
| **Restricting unauthorised access** | Problem #7 |
| **Providing persistent storage for program objects** | e.g. object-oriented DBMSs make program objects persistent |
| **Storage structures and search techniques** for efficient query processing | Indexes, access paths |
| **Backup and recovery** | |
| **Multiple interfaces** to different classes of users | Ties to the four user types |
| **Representing complex relationships** among data | |
| **Enforcing integrity constraints** | Problem #4 |
| **Drawing inferences and actions** from stored data using **deductive and active rules and triggers** | Triggers appear in Unit 2 |
| Potential for **enforcing standards** | |
| **Reduced application development time** | |
| **Flexibility to change data structures** | Data independence |
| **Availability of current information** | |
| **Economies of scale** | One system, many applications |

> [!INTUITION]
> The last four are **organisational** rather than technical, and they are the ones students skip. They are also the honest reason enterprises adopt a DBMS: *standards*, *faster development*, *flexibility* and *economies of scale* are budget arguments, not engineering ones. A question asking *"why would an organisation invest in a DBMS?"* is inviting exactly these.

> [!TRAP]
> **"Providing persistent storage for program objects"** is the advantage most often misread. It does not mean "the database saves your data" — every database does that. It means an **object-oriented DBMS can make an in-memory program object persist directly**, removing the conversion code you would otherwise write to flatten an object into a file and rebuild it on load.

---

## Identify the problem — the lecture's own case studies

> [!EXAM]
> The deck drills scenario → problem-name matching, and this format transfers straight into exams. The four worked cases:
>
> | Scenario | Problem type |
> |---|---|
> | Two customers withdraw from the same account simultaneously; lacking concurrency control the account is **overdrawn** | **Concurrent access anomalies** |
> | Each department keeps **its own spreadsheet** of customers; addresses and contacts **differ between copies** | **Data redundancy and inconsistency** |
> | Inventory and orders are **separate systems**; inventory is not updated in real time from sales, so the business **oversells** | **Data isolation** |
> | Grades are entered manually and **typed incorrectly**, with no automatic check — but a value like `'x'` **could be rejected by a constraint** | **Integrity problems** |

> [!TRAP]
> Case 3 is the one that catches people. Overselling *sounds* like a concurrency bug, but the lecture classifies it as **data isolation** — two systems holding related data that are **not integrated**, so neither can see the other's state. The tell is *"separate systems"*, not *"at the same time"*.
>
> **Look for the phrase that names the cause, not the phrase that names the damage.**

---

## Data integrity — four kinds

> [!NOTE]
> | Integrity | Rule | Example |
> |---|---|---|
> | **Entity** | Every entity is **uniquely identifiable** — the primary key must exist and not be null | Student ID is unique and always present |
> | **Referential** | A reference must point at something that **exists** | Every enrolment refers to a valid student |
> | **Domain** | Values lie within their **permitted set** | `Age` is an integer in $[16, 70]$; a grade must be a valid grade |
> | **User-defined** | **Business rules** hold | A department's research-fund balance stays above 0 |

> [!INTUITION]
> Map these onto the drawbacks and the design becomes obvious: **domain** and **user-defined** integrity are the declarative replacement for rules that used to be buried in program code; **entity** and **referential** integrity are the guarantees that make relationships between tables meaningful at all.
>
> You will implement all four in SQL later in this unit as `PRIMARY KEY`, `FOREIGN KEY`, data types, and `CHECK`.

> [!EXAM]
> Be able to name the kind from a violation:
> - Two students share the same SRN → **entity integrity**
> - An enrolment names a course that was deleted → **referential integrity**
> - `Age = 'abc'` or `Age = 300` → **domain integrity**
> - A fund balance goes negative → **user-defined integrity**

---

**Next:** how the DBMS hides complexity — **data abstraction & data independence**.
