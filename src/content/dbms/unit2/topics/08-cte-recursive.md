---
subject: dbms
unit: 2
order: 8
slug: cte-recursive
title: Common Table Expressions & Recursion
summary: The WITH clause for naming temporary result sets, chaining multiple CTEs, and recursive CTEs (anchor + recursive member) for hierarchical data such as org charts.
minutes: 13
tags: [sql, cte, with-clause, recursive-query, hierarchy]
---

# Common Table Expressions & Recursion

A **Common Table Expression (CTE)** is a temporary, named result set that exists **only for the duration of one statement**. Defined with the `WITH` clause, it is a cleaner alternative to subqueries for complex queries.

```sql
WITH cte_name AS (
    SELECT ...            -- any valid query
)
SELECT * FROM cte_name;
```

Good for **simplifying complex queries**, **breaking down subqueries** into readable steps, and **recursive querying**.

```sql
-- Average salary per department, named for reuse
WITH AvgSalaryByDept AS (
    SELECT Department, AVG(Salary) AS AvgSalary
    FROM Employees GROUP BY Department
)
SELECT * FROM AvgSalaryByDept WHERE AvgSalary > 50000;
```

## Multiple CTEs

Separate several CTEs with commas — there is **one `WITH` keyword** per query level, not one per CTE.

```sql
WITH
  cte1 AS (SELECT department_id, AVG(salary) AS avg_salary
           FROM employees GROUP BY department_id),
  cte2 AS (SELECT department_id, COUNT(*) AS emp_count
           FROM employees GROUP BY department_id)
SELECT cte1.department_id, cte1.avg_salary, cte2.emp_count
FROM cte1 JOIN cte2 ON cte1.department_id = cte2.department_id;
```

> [!TRAP]
> `WITH cte1 AS (...) WITH cte2 AS (...)` is **wrong** — only one `WITH`. Correct: `WITH cte1 AS (...), cte2 AS (...)`. A CTE may reference **itself** (recursion), **earlier** CTEs in the same clause, and **outer** CTEs — but **not later** CTEs in the same clause.

## Recursive CTEs

A **recursive CTE references itself**, ideal for **hierarchical / graph data** (org charts, bill-of-materials, ancestor chains). Declared with `WITH RECURSIVE`, it has two parts joined by `UNION ALL`:

1. **Anchor member** — the base result; runs **once**.
2. **Recursive member** — references the CTE; runs **repeatedly**, feeding its output back in, until it produces **no new rows**.

```sql
-- Generate 1..5
WITH RECURSIVE cte(n) AS (
    SELECT 1                              -- anchor
    UNION ALL
    SELECT n + 1 FROM cte WHERE n < 5     -- recursive (stops at 5)
)
SELECT * FROM cte;            -- 1,2,3,4,5
```

```sql
-- Employee hierarchy starting from 'Alice', tracking depth
WITH RECURSIVE emp_hierarchy AS (
    SELECT emp_id, emp_name, manager_id, 1 AS level
    FROM employees WHERE emp_name = 'Alice'                  -- anchor
    UNION ALL
    SELECT e.emp_id, e.emp_name, e.manager_id, eh.level + 1
    FROM employees e JOIN emp_hierarchy eh ON e.manager_id = eh.emp_id  -- recursive
)
SELECT * FROM emp_hierarchy;
```

> [!INTUITION]
> The engine works in rounds: run the anchor → get the first rows → feed them into the recursive member → get the next layer → repeat. When a round adds **no new rows**, recursion stops. Each round walks one level deeper down the hierarchy.

### Worked example — COMPANY org hierarchy

Build the whole management tree from the `employee` table, where `superssn` is each employee's supervisor's SSN (the top boss has `superssn IS NULL`):

```sql
WITH RECURSIVE orghierarchy AS (
    -- Base case: the root(s) — employees with no supervisor (level 1)
    SELECT ssn, fname, lname, superssn, 1 AS level
    FROM employee
    WHERE superssn IS NULL
    UNION ALL
    -- Recursive case: each employee reporting to someone already in the tree
    SELECT e.ssn, e.fname, e.lname, e.superssn, OH.level + 1
    FROM employee e
    JOIN orghierarchy OH ON e.superssn = OH.ssn
)
SELECT * FROM orghierarchy;
```

| ssn | fname | superssn | level |
|---|---|---|---|
| 101 | John | NULL | 1 |
| 201 | Alice | 101 | 2 |
| 202 | Bob | 101 | 2 |
| 301 | Carol | 201 | 3 |

> [!EXAM]
> `superssn IS NULL` identifies the **root(s)**; each iteration finds the **subordinates** of employees already placed (`e.superssn = OH.ssn`); `level` tracks **depth**. **`UNION ALL` is mandatory** — plain `UNION` would de-duplicate and break the recursion.

## Defining columns & type rules

```sql
WITH cte(col1, col2) AS (SELECT 1, 2) ...            -- explicit names
WITH cte AS (SELECT 1 AS col1, 2 AS col2) ...        -- inferred from SELECT aliases
```

> [!NOTE]
> In a recursive CTE, **column types are fixed by the anchor** SELECT; the recursive part must match. Columns are **nullable by default**, and a type mismatch may be silently coerced (risking truncation). Force the type with `CAST` when the recursive expression differs:
> ```sql
> WITH RECURSIVE cte(n, str) AS (
>     SELECT 1, CAST('abc' AS CHAR(50))
>     UNION ALL
>     SELECT n+1, CAST(n+1 AS CHAR(50)) FROM cte WHERE n < 3
> ) SELECT * FROM cte;
> ```

> [!EXAM]
> A CTE lives for **one query** and is **not updatable** — contrast with a **view**, which persists in the schema and can be reused (see the Views topic).

---

**Next:** conditional logic inside queries — the **CASE expression**.
