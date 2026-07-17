---
subject: dbms
unit: 2
order: 9
slug: case-expressions
title: The CASE Expression
summary: SQL's if/else (switch) expression — the searched and simple forms, top-down evaluation, and using CASE to bucket values or to pivot data.
minutes: 7
tags: [sql, case, conditional, switch]
---

# The CASE Expression

`CASE` returns a value chosen by conditions — SQL's **if/else / switch**. It is an *expression*, so it can appear anywhere a value can: in `SELECT`, `WHERE`, `ORDER BY`, even inside aggregates.

## Searched form

Each `WHEN` carries its own boolean condition:

```sql
SELECT emp_name, salary,
  CASE
    WHEN salary >= 80000 THEN 'High'
    WHEN salary >= 50000 THEN 'Medium'
    ELSE 'Low'
  END AS salary_band
FROM employee;
```

## Simple (switch) form

Compares one expression against a list of values:

```sql
SELECT name,
  CASE dept_no
    WHEN 1 THEN 'HR'
    WHEN 2 THEN 'Engineering'
    ELSE 'Other'
  END AS dept_name
FROM employee;
```

## Evaluation rules

> [!EXAM]
> Conditions are tested **top-to-bottom; the first matching `WHEN` wins** and the rest are skipped. If none match and there is **no `ELSE`, the result is `NULL`.** So order matters — put the most specific conditions first.

> [!INTUITION]
> Bucketing a continuous value (Silberschatz Practice Exercise 3.5 — turn `score` into grades F/C/B/A) is the textbook CASE use:
> ```sql
> SELECT ID,
>   CASE WHEN score < 40 THEN 'F'
>        WHEN score < 60 THEN 'C'
>        WHEN score < 80 THEN 'B'
>        ELSE 'A' END AS grade
> FROM marks;
> ```
> Because the first match wins, `score < 40` is checked before `score < 60`, so each row lands in exactly one band.

> [!NOTE]
> `CASE` also pivots data: wrap it in `SUM(CASE WHEN ... THEN 1 ELSE 0 END)` to count rows meeting a condition per group, turning rows into summary columns.

---

**Next:** queries that depend on the outer row — **correlated subqueries & EXISTS**.
