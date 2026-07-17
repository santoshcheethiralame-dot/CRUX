---
subject: dbms
unit: 4
order: 2
slug: transactions-acid
title: Transactions & ACID Properties
summary: The transaction as an all-or-nothing unit of work, the read/write model, and the four ACID properties (Atomicity, Consistency, Isolation, Durability) with the fund-transfer example.
minutes: 12
tags: [transaction, acid, atomicity, isolation, durability, recovery]
---

# Transactions & ACID Properties

A **transaction** is a unit of program execution that **accesses (reads) and possibly updates (writes)** one or more data items. It is the **smallest unit of work that is either fully completed or fully rolled back** — no partial completion.

## The read/write model

- **read(X):** copy data item X from the database (disk) into a variable in the transaction's main-memory **buffer**.
- **write(X):** copy the variable's value back to data item X (may be buffered and flushed to disk later).

A transaction is delimited by **BEGIN TRANSACTION … END TRANSACTION**. The DBMS keeps **data buffers** (one per disk block); when full, a **buffer replacement policy** (commonly **LRU — Least Recently Used**) picks a victim block to evict.

**Canonical example — transfer \$50 from A to B:**
```text
1. read(A)   2. A := A − 50   3. write(A)   4. read(B)   5. B := B + 50   6. write(B)
```

## The ACID properties

| Property | Meaning | Fund-transfer illustration |
|---|---|---|
| **Atomicity** | all operations happen, or **none** ("all-or-none") | a crash after step 3 must not leave \$50 "lost" — the change is undone |
| **Consistency** | a transaction takes the DB from one **valid state to another** (constraints intact) | the sum `A + B` is unchanged |
| **Isolation** | concurrent transactions appear to run **one at a time**; intermediate results are hidden | another transaction reading between steps 3–6 must not see `A + B` too small |
| **Durability** | once **committed**, changes **persist** even after a crash | the completed transfer survives a power failure |

> [!EXAM]
> Who enforces what:
> - **Atomicity & Durability** → the **recovery system**, using the **log** (it records old values on disk; on failure it restores them, or re-applies committed changes).
> - **Isolation** → the **concurrency-control system**.
> - **Consistency** → the combination of atomicity + isolation + the application's own correctness.

> [!INTUITION]
> The **log** is the trick behind atomicity *and* durability: before a write, the DBMS records the old value. If the transaction dies, **undo** from the log; if it committed but the change hadn't reached disk, **redo** from the log. One mechanism, two guarantees.

## Transaction support in SQL

```sql
START TRANSACTION;                 -- (implicit in standard SQL)
UPDATE Employee SET Salary = Salary * 1.10 WHERE ssn = 111111100;
COMMIT;                            -- success → persist
-- ROLLBACK;                       -- failure → undo everything
```
- No explicit `BEGIN` is required, but **every transaction ends with `COMMIT` or `ROLLBACK`**.
- **Access mode:** `READ WRITE` (default — all DML) or `READ ONLY` (SELECT only).

---

**Next:** the lifecycle of a transaction — its **states**.
