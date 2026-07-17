---
subject: dbms
unit: 2
order: 2
slug: set-operations
title: Set Operations — UNION, INTERSECT, EXCEPT
summary: Combining the results of two queries with union, intersection, and set difference; set vs multiset (ALL) semantics and the exact duplicate-counting rules.
minutes: 10
tags: [sql, set-operations, union, intersect, except, multiset]
---

# Set Operations — UNION, INTERSECT, EXCEPT

SQL provides three operators that combine the results of two queries. Both queries must be **union-compatible**: the same number of columns, with compatible types in matching positions.

| Operator | Returns rows in… | Duplicates |
|---|---|---|
| `UNION` | **A or B** | removed (set semantics) |
| `INTERSECT` | **A and B** | removed |
| `EXCEPT` (Oracle: `MINUS`) | **A but not B** | removed |

```sql
-- Courses offered in Fall 2017 OR Spring 2018
(SELECT course_id FROM section WHERE semester='Fall'   AND year=2017)
UNION
(SELECT course_id FROM section WHERE semester='Spring' AND year=2018);

-- Offered in Fall 2017 AND Spring 2018
... INTERSECT ...

-- Offered in Fall 2017 but NOT Spring 2018
... EXCEPT ...
```

> [!INTUITION]
> These are the SQL faces of relational algebra's $\cup$, $\cap$, and $-$. The big behavioural difference from raw `SELECT`: **set operators automatically eliminate duplicates** by default, whereas a plain `SELECT` keeps them.

## The ALL variants — keeping duplicates

Each operator has an `ALL` form that **preserves duplicates** using multiset arithmetic. If a tuple `t` occurs **c1** times in A and **c2** times in B:

| Operation | Occurrences of `t` in result |
|---|---|
| `A UNION ALL B` | $c_1 + c_2$ |
| `A INTERSECT ALL B` | $\min(c_1, c_2)$ |
| `A EXCEPT ALL B` | $\max(c_1 - c_2,\ 0)$ |

> [!EXAM]
> Memorise the three multiset counts — **sum, min, max(diff,0)** — they are a favourite objective question. Example: if `t` appears 5× in A and 2× in B, then `UNION ALL` → 7, `INTERSECT ALL` → 2, `EXCEPT ALL` → 3.

## MySQL note

> [!NOTE]
> MySQL supports `UNION` / `UNION ALL` natively. **`INTERSECT` and `EXCEPT` were only added in MySQL 8.0.31.** On older versions they are simulated:
> - intersection → `IN` or `EXISTS` with a subquery,
> - difference → `NOT IN` or `NOT EXISTS`.
> ```sql
> -- A INTERSECT B  ≈
> SELECT DISTINCT a.x FROM A a WHERE a.x IN (SELECT x FROM B);
> -- A EXCEPT B  ≈
> SELECT DISTINCT a.x FROM A a WHERE a.x NOT IN (SELECT x FROM B);
> ```

> [!TRAP]
> `UNION` sorts and de-duplicates, which costs time. If you *know* the inputs are disjoint (or duplicates are fine), `UNION ALL` is faster — it just concatenates.

---

**Next:** the three-valued logic of **NULL values**.
