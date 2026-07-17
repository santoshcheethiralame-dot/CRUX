---
subject: dbms
unit: 2
order: 4
slug: aggregate-functions
title: Aggregate Functions
summary: COUNT, SUM, AVG, MAX and MIN — how they collapse a column to one value, the COUNT(*) vs COUNT(attr) distinction, how they treat NULL, and their use in nested queries.
minutes: 10
tags: [sql, aggregate, count, sum, avg, max, min]
---

# Aggregate Functions

An **aggregate function** takes a *collection* of values and returns a **single** value — the way SQL summarises a column.

| Function | Returns | Input |
|---|---|---|
| `COUNT` | number of values | any |
| `SUM` | total | numeric |
| `AVG` | average | numeric |
| `MAX` | largest | any ordered |
| `MIN` | smallest | any ordered |

```sql
SELECT AVG(salary) AS avg_salary FROM instructor WHERE dept_name='Comp. Sci.';
SELECT MAX(salary) FROM instructor;
SELECT COUNT(*)   FROM course;
```

Use **AS** to name the computed column, otherwise the header is the expression text.

## COUNT — three forms

```sql
COUNT(*)             -- counts ALL rows (including NULLs and duplicates)
COUNT(salary)        -- counts rows where salary IS NOT NULL
COUNT(DISTINCT dept_name)  -- counts distinct non-null departments
```

> [!EXAM]
> `COUNT(*)` vs `COUNT(attr)`: `COUNT(*)` counts **rows**; `COUNT(attr)` counts **non-NULL values** of that attribute. If a column has 10 rows with 3 nulls, `COUNT(*) = 10` but `COUNT(col) = 7`. `COUNT(DISTINCT ID)` counts unique non-null values.

## How aggregates treat NULL

> [!NOTE]
> Every aggregate **except `COUNT(*)` ignores NULL inputs.** Consequences for a column that is *entirely* NULL (or an empty group):
> - `SUM`, `AVG`, `MAX`, `MIN` → **NULL**
> - `COUNT(col)` → **0**
>
> So `AVG(salary)` is the average of the *non-null* salaries, not the count of all rows divided in — nulls are dropped before averaging.

> [!TRAP]
> Because nulls are dropped, `AVG(salary)` can differ from `SUM(salary)/COUNT(*)` whenever any salary is NULL (Silberschatz Exercise 3.30): `SUM`/`AVG` skip nulls, but `COUNT(*)` counts the null rows too. They only agree when the column has no nulls.

## Aggregates in nested queries

A bare aggregate (no grouping) returns one scalar value, so it can drive a comparison in an outer query — the classic "find the extreme" pattern:

```sql
-- Instructor(s) earning the maximum salary
SELECT name FROM instructor
WHERE salary = (SELECT MAX(salary) FROM instructor);
```

This finds **all** top earners even when several tie — something a single `ORDER BY ... LIMIT 1` would miss (Silberschatz Practice Exercise 3.1d).

> [!INTUITION]
> An aggregate without `GROUP BY` treats the **whole table as one group** and returns exactly one row. Add `GROUP BY` (next topic) and the same function runs **once per group** instead.

---

**Next:** partitioning rows with **GROUP BY and HAVING**.
