---
subject: dbms
unit: 2
order: 16
slug: case-expressions
title: The CASE Expression
summary: Conditional logic inside a query — the syntax and the NULL-when-no-ELSE rule, why order of WHEN clauses matters, all three of the deck's worked classification queries, and combining CASE with GROUP BY and with a CTE.
minutes: 11
tags: [sql, case, when, then, else, conditional, derived-column, null, group-by]
---

# The CASE Expression

> [!EXAM]
> The `CASE` statement in SQL is a **versatile conditional expression that enables us to incorporate conditional logic directly within our queries**. It allows you to **return specific results based on certain conditions**, enabling dynamic query outputs.
>
> - It is commonly used to **create new columns based on conditional logic, provide custom values, or control query outputs** based on certain conditions.
> - **If no condition is true then the `ELSE` part will be executed. If there is no `ELSE` part then it returns NULL.**

## Syntax

```sql
CASE
    WHEN condition THEN result1
    WHEN condition THEN result2
    ...
    ELSE result
END
```

> [!TRAP]
> **A missing `ELSE` does not raise an error — it silently produces NULL.**
>
> This is the most-examined fact about `CASE`, and the most common real bug. Every row that matches no `WHEN` gets NULL, and NULL then propagates through any arithmetic that touches it (see **NULL Values**).
>
> **Write an `ELSE` unless you genuinely want NULL for unmatched rows**, even if it is only `ELSE 'Unknown'`.

## Example 1 — salary levels

**Task:** Display the first name and salary of each employee, along with a derived column categorising them into `'High'`, `'Medium'` or `'Low'`:
- Salary ≥ 55000 → `'High'`
- Salary ≥ 40000 → `'Medium'`
- else → `'Low'`

```sql
SELECT Fname, Salary,
    CASE
        WHEN Salary >= 55000 THEN 'High'
        WHEN Salary >= 40000 THEN 'Medium'
        ELSE 'Low'
    END AS Salary_Level
FROM employee;
```

> [!EXAM]
> **The `CASE` statement checks conditions sequentially, so once a condition is true it returns that result and stops checking further conditions.**
>
> - If salary ≥ 55000 → `'High'`
> - If salary ≥ 40000 **(but < 55000)** → `'Medium'`
> - Otherwise (salary < 40000) → `'Low'`

> [!INTUITION]
> The parenthesis in the middle line is where the whole idea lives. The second `WHEN` is written as `Salary >= 40000` — with **no upper bound** — yet it correctly excludes the high earners.
>
> It does so **because it is second**. Anyone at 60000 already matched the first condition and left. The remaining rows are, by construction, below 55000.
>
> **The order of `WHEN` clauses is part of the logic, not a formatting choice.** Reverse these two lines and everyone earning over 55000 is labelled `'Medium'`, because `60000 >= 40000` is true and it now gets tested first — a query that runs perfectly and classifies everyone wrong.
>
> The rule that follows: **write overlapping conditions from most restrictive to least.**

## Example 2 — bonus status

**Task:** Add a column `Bonus_Status`:
- Salary ≥ 50,000 → `'Eligible for 20% Bonus'`
- Salary between 40,000 and 49,999 → `'Eligible for 10% Bonus'`
- Salary < 40,000 → `'No Bonus'`

```sql
SELECT
    Fname, Salary,
    CASE
        WHEN Salary >= 50000 THEN 'Eligible for 20% Bonus'
        WHEN Salary >= 40000 THEN 'Eligible for 10% Bonus'
        ELSE 'No Bonus'
    END AS Bonus_Status
FROM employee;
```

Note how the stated range **"between 40,000 and 49,999"** becomes the single test `Salary >= 40000` — the upper bound is already handled by the preceding `WHEN`.

## Example 3 — CASE over an aggregate

**Task:** Display each employee's first name, the number of projects they work on, and a `Workload_Status`:
- 3 or more projects → `Overloaded`
- 2 projects → `Normal Load`
- 1 or 0 projects → `Light Load`

```sql
SELECT
    e.Fname, COUNT(w.Pno) AS Project_Count,
    CASE
        WHEN COUNT(w.Pno) >= 3 THEN 'Overloaded'
        WHEN COUNT(w.Pno) = 2  THEN 'Normal Load'
        ELSE 'Light Load'
    END AS Workload_Status
FROM   employee e
LEFT JOIN works_on w ON e.Ssn = w.Essn
GROUP BY e.Fname;
```

> [!EXAM]
> Two details in this query are each worth a mark:
>
> - **`LEFT JOIN`, not an inner join.** The spec says *"1 or 0 projects → Light Load"*, so employees on **no** project must appear. An inner join would drop them entirely and the `'Light Load'` category would be under-populated.
> - **`COUNT(w.Pno)`, not `COUNT(*)`.** For an employee with no projects, the left join produces one NULL-padded row. **`COUNT(*)` would count that row as 1; `COUNT(w.Pno)` counts non-NULL values and correctly returns 0.**
>
> This is precisely the `COUNT(*)` vs `COUNT(column)` distinction from **Aggregate Functions**, and here it changes the answer.

> [!TRAP]
> `CASE` appears in the `SELECT` clause, which is **evaluated after `GROUP BY`** (see the order of execution in **Grouping**). That is why `COUNT(w.Pno)` may legally appear inside it — the groups already exist.
>
> The same `CASE` in a `WHERE` clause could **not** use an aggregate, for the same reason `WHERE` never can.

## CASE with a CTE

The deck rewrites Example 3 **using a CTE to show how `CASE` can be combined with a CTE for better readability**:

```sql
WITH Project_Counts AS (
    SELECT e.Fname, COUNT(w.Pno) AS Proj_Count
    FROM   employee e LEFT JOIN works_on w ON e.Ssn = w.Essn
    GROUP BY e.Fname
)
SELECT Fname, Proj_Count,
    CASE
        WHEN Proj_Count >= 3 THEN 'Overloaded'
        WHEN Proj_Count = 2  THEN 'Normal Load'
        ELSE 'Light Load'
    END AS Workload_Status
FROM Project_Counts;
```

> [!INTUITION]
> Compare the two versions and the benefit is concrete rather than aesthetic: **`COUNT(w.Pno)` is written once instead of three times.**
>
> In the first version the same aggregate appears in the `SELECT` list and in both `WHEN` conditions. Change the counting rule and you must change it in three places consistently. The CTE computes it once, names it `Proj_Count`, and the `CASE` reads like the specification it came from.
>
> This is the **"a CTE is a local variable for a table"** argument from the previous topic, applied at the level of a single column.

> [!EXAM]
> **Two forms of CASE exist**, and the deck's syntax slide shows the first:
>
> - **Simple CASE** — `CASE expr WHEN value THEN … END`, comparing one expression against values for equality.
> - **Searched CASE** — `CASE WHEN condition THEN … END`, where each branch is a full boolean condition.
>
> **All three worked examples use the searched form**, because they test ranges (`>=`) rather than equality. The searched form is strictly more general — anything the simple form can do, it can do too.

---

**Next:** storing a query in the database under a name — **views**.
