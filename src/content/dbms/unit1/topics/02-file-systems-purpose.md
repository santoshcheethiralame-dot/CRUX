---
subject: dbms
unit: 1
order: 2
slug: file-systems-purpose
title: File-Processing Problems & the Purpose of a DBMS
summary: The seven drawbacks of file-processing systems and how a DBMS solves each, the characteristics and advantages of database systems, and the OLTP vs OLAP usage modes.
minutes: 13
tags: [file-systems, purpose, advantages, integrity, OLTP, OLAP]
---

# File-Processing Problems & the Purpose of a DBMS

Before DBMSs, data lived in **file-processing systems** — permanent OS files, each manipulated by its own application program. Adding a feature meant writing new programs and new files. This had serious drawbacks.

## The seven problems with file-processing systems

> [!EXAM]
> This is a guaranteed list question. **Each "purpose of a DBMS" is the solution to one of these problems.**

| # | Problem | Explanation | DBMS solution |
|---|---|---|---|
| **1** | **Data redundancy & inconsistency** | The same data (e.g. a double-major student) is duplicated across files → wasted space + inconsistency when one copy changes | Central store → minimal redundancy, single point of change |
| **2** | **Difficulty accessing data** | Each new query needs a new program written | A powerful **query language** for ad-hoc retrieval |
| **3** | **Data isolation** | Data scattered across files in different formats is hard to combine | Unified, structured storage |
| **4** | **Integrity problems** | Constraints (e.g. "balance > 0") buried in code; adding one means editing every program | **Integrity constraints** declared in the schema, enforced automatically |
| **5** | **Atomicity problems** | A failure mid-operation (debit A, credit B) leaves data inconsistent | **Transactions** — all-or-nothing + automatic rollback |
| **6** | **Concurrent-access anomalies** | Two users updating the same data overwrite each other (lost update) | **Concurrency control** (transactions + **locking**) |
| **7** | **Security problems** | No central access control — everyone sees everything | **Access control** / permissions at the DB level |

> [!INTUITION]
> *Atomicity* (problem 5): transferring ₹5000 means *debit A* **and** *credit B* — both must happen or neither. In a file system the program could debit A then crash before crediting B, "losing" money. The DBMS guarantees the transaction is **atomic**.

## Characteristics of database systems

- **Self-describing** — stores **metadata** (the catalog) describing the structure, separate from the data.
- **Program-data independence** — data structure lives in the catalog, not hard-coded in programs.
- **Multiple views** — different users see different (virtual) parts of the database.
- **Sharing & multi-user transaction processing** — controlled concurrent access.

## Advantages of database systems

Controlling redundancy · sharing data · restricting unauthorised access · persistent storage for program objects · efficient **query processing** (storage structures + indexes) · **backup & recovery** · multiple user interfaces · representing complex relationships · enforcing **integrity constraints** · rules/triggers · reduced development time · economies of scale.

## Data integrity — four kinds

> [!NOTE]
> | Integrity | Rule | Example |
> |---|---|---|
> | **Entity** | Each entity is uniquely identifiable | Student ID is unique |
> | **Referential** | A reference must point to something that exists | Every enrolment refers to a valid student |
> | **Domain** | Values lie in their permitted set | Age is a valid number |
> | **User-defined** | Business rules hold | Discount price is logically correct |

## How databases are used — OLTP vs OLAP

> [!EXAM]
> Two modes of database use:
> - **OLTP (Online Transaction Processing)** — **many users, small** retrievals/updates; the everyday workload of banking, universities, airlines.
> - **OLAP (Online Analytical Processing) / Analytics** — processing data to **draw conclusions and build predictive models** (loan approval, targeted ads); uses **data mining** (AI + statistics).

**Applications:** enterprises (CRM, HR, finance — *Salesforce*), manufacturing (*Toyota JIT*), banking (*JPMorgan Chase*), web services (*Netflix*), document DBs (*MongoDB*), navigation (*Google Maps*).

---

**Next:** how the DBMS hides complexity — **data abstraction, schema & the three-schema architecture**.
