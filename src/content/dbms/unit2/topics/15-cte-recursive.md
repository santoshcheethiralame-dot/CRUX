---
subject: dbms
unit: 2
order: 15
slug: cte-recursive
title: Recursive CTEs
summary: WITH RECURSIVE for hierarchical data — the anchor member and recursive member, why UNION ALL rather than UNION, the countdown examples traced iteration by iteration, and the organizational hierarchy query with its level counter.
minutes: 12
tags: [sql, recursive-cte, with-recursive, anchor-member, recursive-member, hierarchy, union-all, termination]
---

# Recursive CTEs

## Why recursion

> [!EXAM]
> - **A recursive CTE is one that references itself within that CTE.**
> - The recursive CTE is **useful when working with hierarchical data**, as the CTE **continues to execute until the query returns the entire hierarchy**.
> - A typical example is a table listing employees — as in the company database, where `EMPLOYEE` has a **recursive relationship representing the employee–supervisor relationship**.
> - **In SQL, recursive queries are typically implemented using CTEs with the `WITH RECURSIVE` clause.**

> [!INTUITION]
> The connection back to Unit 1 is direct. The **recursive relationship** on `EMPLOYEE` — `Super_ssn` pointing at another `Ssn` in the same table — is an ER-modelling construct you have already drawn.
>
> The trouble is that ordinary SQL cannot follow it to an unknown depth. One self-join reaches your manager; two reach your manager's manager. To reach **the whole chain up to the CEO** you would need as many joins as the hierarchy is deep — and you do not know that number when writing the query.
>
> **Recursion is what lets one query follow a chain of unknown length.** That is the entire reason the feature exists.

## Syntax

```sql
WITH RECURSIVE cte_name (column_list) AS (
    -- Anchor member: the initial query that forms the base case
    SELECT ...
    FROM ...
    WHERE ...

    UNION ALL

    -- Recursive member: the query that refers to the CTE itself
    SELECT ...
    FROM   cte_name          -- refer to the CTE within itself
    WHERE  ...
)
-- The final SELECT statement outside the CTE
SELECT ... FROM cte_name;
```

> [!EXAM]
> **The parts, as the deck defines them:**
>
> | Part | Role |
> |---|---|
> | **`cte_name`** | The name given to the CTE, used to **refer to it within itself** and in the final `SELECT` |
> | **`column_list`** | The list of columns to include in the CTE's result set |
> | **Anchor member** | **The initial query that forms the base case** of the recursion. It selects the **starting point(s)**. **It must not reference the CTE itself** |
> | **`UNION ALL`** | **Combines the results of the anchor member with those of the recursive member** |
> | **Recursive member** | **The query that refers to the CTE itself, creating the recursion.** It selects records **based on relationships established in previous iterations**, must reference the CTE by name, and **should include a termination condition to stop the recursion** |
> | **Final `SELECT`** | Retrieves the final result set from the CTE |

> [!EXAM]
> **Why `UNION ALL` and not `UNION`:** the deck states it is used **because it includes duplicate rows, which is often necessary in recursive queries.**

> [!TRAP]
> Two failure modes sit in that table, and both are examined:
>
> - **The anchor member must not reference the CTE.** If it did, there would be no base case — nothing to start from — and the definition would be circular.
> - **The recursive member must have a termination condition.** Without one (the `WHERE n < 5` below), the recursion never stops. Most systems impose a depth limit and abort with an error rather than hanging, but the query is still wrong.
>
> This is the same base-case/recursive-case discipline as any recursive function. **A recursion with no base case does not compile; a recursion with no termination does not finish.**

## Counting: the smallest possible examples

**Counting down from 5 to 1:**

```sql
WITH RECURSIVE Countdown (n) AS (
    SELECT 5                                    -- anchor member
    UNION ALL
    SELECT n - 1 FROM Countdown WHERE n > 1     -- recursive member
)
SELECT n FROM Countdown;
```

**Counting up from 1 to 5:**

```sql
WITH RECURSIVE cte(n) AS (
    SELECT 1                                    -- anchor part
    UNION ALL
    SELECT n + 1 FROM cte WHERE n < 5           -- recursive part
)
SELECT * FROM cte;
```

> [!DERIVE]
> **The execution flow, exactly as the deck traces it.**
>
> The database engine runs it **in an iterative fashion**:
>
> 1. **Run the anchor query first:** `SELECT 1`. This produces the first row: **1**.
> 2. **Apply the recursive part.** SQL **substitutes the current contents of `cte`** into `SELECT n + 1 FROM cte WHERE n < 5`. From (1), since $1 < 5$, it generates **2**, which is added to the result.
> 3. Repeat with the newly-produced row: from 2 it generates 3; from 3, 4; from 4, 5.
> 4. From 5, the condition $5 < 5$ is **false**, so **no new rows are produced** and the recursion stops.
>
> Final result: **1, 2, 3, 4, 5**.
>
> The stopping rule is the general one: **recursion ends when an iteration produces no new rows**, not when a counter is checked. The `WHERE` is what starves it.

> [!INTUITION]
> Notice the recursive member reads **`FROM cte`** but does **not** re-scan everything produced so far — each iteration is applied to **the rows the previous iteration just added**.
>
> That is why the countdown produces each number once rather than exploding. Think of it as a **queue**: the anchor seeds it, and each round consumes the newest batch and appends whatever it generates.

## The organizational hierarchy

**Example:** Extract the organizational hierarchy beginning with a specific employee — typically the CEO — and extending downward through the reporting structure.

```sql
WITH RECURSIVE orghierarchy AS (
    SELECT ssn, fname, lname, super_ssn, 1 AS level
    FROM   employee
    WHERE  super_ssn IS NULL                  -- anchor: the top of the tree

    UNION ALL

    SELECT e.ssn, e.fname, e.lname, e.super_ssn, OH.level + 1
    FROM   employee e
    JOIN   orghierarchy OH ON e.super_ssn = OH.ssn
)
SELECT * FROM orghierarchy;
```

> [!DERIVE]
> **Three design decisions, each worth a mark.**
>
> **1 — The anchor is `WHERE super_ssn IS NULL`.** The employee with no supervisor *is* the top of the hierarchy. Recall from **NULL Values** that this must be `IS NULL`, never `= NULL`.
>
> **2 — The join direction is `e.super_ssn = OH.ssn`.** Read it as: *bring in employee `e` if their supervisor is someone already in the hierarchy.* Each iteration adds **the next level down**.
>
> **3 — `OH.level + 1` is a depth counter.** The anchor sets `1`; every recursive step increments it. So each row is labelled with **how far down the tree it sits** — which is how you print an indented org chart, or restrict to the top three levels.

> [!TRAP]
> **There is no termination `WHERE` clause here — and it is still correct.**
>
> The recursion is bounded by the **data**: eventually you reach employees who supervise nobody, the join produces no new rows, and it stops. The explicit condition in the countdown examples was needed only because the numbers were generated, not looked up.
>
> The danger is **a cycle in the data** — if A reports to B and B reports to A, the recursion never runs out of new rows. A tree terminates naturally; a graph with cycles does not. Real hierarchy queries often carry a `level < 100` guard for exactly this reason.

> [!EXAM]
> **Anchor first, recursive second, `UNION ALL` between them.** The order is not stylistic — the anchor must be the first branch, since it is what seeds the recursion.

---

**Next:** conditional logic inside a query — **the CASE expression**.
