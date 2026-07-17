---
subject: dbms
unit: 4
order: 5
slug: isolation-levels
title: Isolation Levels
summary: The four SQL isolation levels (READ UNCOMMITTED → SERIALIZABLE), the three anomalies they permit (dirty read, non-repeatable read, phantom), and the phantom problem.
minutes: 10
tags: [isolation-levels, serializable, phantom, dirty-read, sql]
---

# Isolation Levels

**Isolation levels** let you trade consistency for concurrency. A lower level allows more interleaving (faster) but permits more anomalies.

```sql
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
```

## The four levels and the three anomalies

| Level | Dirty read | Non-repeatable read | Phantom |
|---|---|---|---|
| **READ UNCOMMITTED** | ✅ possible | ✅ | ✅ |
| **READ COMMITTED** | ❌ | ✅ | ✅ |
| **REPEATABLE READ** | ❌ | ❌ | ✅ |
| **SERIALIZABLE** | ❌ | ❌ | ❌ |

- **Dirty read** — reading another transaction's **uncommitted** update.
- **Non-repeatable read** — re-reading a **row** returns a different value (it was updated in between).
- **Phantom** — re-running a `WHERE`-query returns a **new row** that another transaction **inserted**.

> [!EXAM]
> **SERIALIZABLE** is the strongest (avoids all three) and is the SQL standard **default**, though many systems default to **READ COMMITTED** for performance. The ordering of strictness: `READ UNCOMMITTED ⊂ READ COMMITTED ⊂ REPEATABLE READ ⊂ SERIALIZABLE`.

## The phantom problem

> [!INTUITION]
> A **phantom** is specifically about **inserted (or deleted) rows**, not changed values. T1 runs `SELECT … WHERE dept = 'CS'` and gets 5 rows; T2 inserts a 6th CS row and commits; T1 re-runs the query and now sees 6 — a "phantom" appeared. Because the new row didn't exist when T1 started, **row-level locks can't prevent it** (there was no row to lock) — you need predicate/index locking or SERIALIZABLE.

> [!TRAP]
> Non-repeatable read vs phantom: a **non-repeatable read** is an *existing row's value changing*; a **phantom** is a *new row appearing* in a range query. REPEATABLE READ stops the former but not the latter.

## In practice
```sql
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;  -- fastest, allows dirty reads
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;      -- safest, full isolation
```
Use the **weakest level that is still correct** for the application: analytics dashboards tolerate READ COMMITTED; financial transfers demand SERIALIZABLE.

---

**Next:** the theory of correct interleavings — **schedules & conflict serializability**.
