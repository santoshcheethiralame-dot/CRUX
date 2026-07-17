---
subject: dbms
unit: 2
order: 5
slug: grouping-having
title: Grouping — GROUP BY & HAVING
summary: Partitioning rows into groups for per-group aggregates, the rule that non-aggregated SELECT columns must be grouped, filtering groups with HAVING, and WHERE vs HAVING.
minutes: 11
tags: [sql, group-by, having, aggregate, query-evaluation]
---

# Grouping — GROUP BY & HAVING

`GROUP BY` partitions the rows into groups that share a value, then applies each aggregate **once per group** instead of once for the whole table.

```sql
SELECT dept_name, AVG(salary) AS avg_salary
FROM instructor
GROUP BY dept_name;          -- one output row per department
```

## The grouping rule

> [!EXAM]
> Every attribute in the `SELECT` list that is **not inside an aggregate** must appear in the `GROUP BY`. This is illegal:
> ```sql
> SELECT dept_name, ID, AVG(salary)   -- ID is neither grouped nor aggregated
> FROM instructor GROUP BY dept_name; -- ✗ which ID would it show?
> ```
> Each group produces **one** row, so every selected column must be either the grouping key or a value aggregated over the group.

## HAVING — filtering groups

`HAVING` is a `WHERE` for **groups**: it filters *after* grouping, so it may reference aggregate values.

```sql
SELECT dept_name, AVG(salary) AS avg_salary
FROM instructor
GROUP BY dept_name
HAVING AVG(salary) > 42000;     -- keep only departments averaging > 42k
```

## WHERE vs HAVING

|  | WHERE | HAVING |
|---|---|---|
| Filters | individual **rows** | **groups** |
| Runs | **before** GROUP BY | **after** GROUP BY |
| May use aggregates? | **No** | **Yes** |

> [!INTUITION]
> Use **WHERE** to decide *which rows enter a group*, and **HAVING** to decide *which groups survive*. Pushing a condition into WHERE (when it doesn't need an aggregate) is also faster — fewer rows get grouped.

```sql
-- Departments whose pre-2010 hires average over 42k
SELECT dept_name, AVG(salary)
FROM instructor
WHERE hire_year < 2010        -- row filter FIRST (no aggregate)
GROUP BY dept_name
HAVING AVG(salary) > 42000;   -- group filter AFTER
```

## Conceptual evaluation order

> [!NOTE]
> A full query is evaluated in this order — *not* the order it is written:
> $$\text{FROM} \rightarrow \text{WHERE} \rightarrow \text{GROUP BY} \rightarrow \text{HAVING} \rightarrow \text{SELECT} \rightarrow \text{ORDER BY}$$
> This is exactly Elmasri Review Question 7.2 ("conceptual order of executing the six clauses"). It explains why a column alias defined in SELECT usually can't be used in WHERE (WHERE runs first), but *can* be used in ORDER BY (which runs last).

## GROUP BY with joins

Grouping composes with joins — join first, then group the combined rows:

```sql
-- Number of sailors per rating who reserved a boat
SELECT rating, COUNT(*) AS num
FROM Sailors NATURAL JOIN Reserves
GROUP BY rating;
```

---

**Next:** combining tables with **join expressions**.
