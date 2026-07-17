---
subject: dbms
unit: 2
order: 15
slug: window-functions
title: Window Functions
summary: Calculations across a window of rows without collapsing them — OVER with PARTITION BY and ORDER BY, the ranking functions (ROW_NUMBER/RANK/DENSE_RANK/NTILE), value functions (LAG/LEAD/FIRST_VALUE), and running-total / top-N use cases.
minutes: 14
tags: [sql, window-function, over, partition-by, rank, lag-lead]
---

# Window Functions

A **window function** computes across a set of rows **related to the current row** (the *window*) **without collapsing rows** — unlike `GROUP BY`, every input row stays in the output, with the computed value attached.

```sql
SELECT col1,
       window_function(col2) OVER ([PARTITION BY p] [ORDER BY o] [frame]) AS new_col
FROM table_name;
```

- **`OVER()`** — defines the window (mandatory for window-only functions).
- **`PARTITION BY`** — splits rows into groups; the function restarts per group. Omitted ⇒ the whole result is one window.
- **`ORDER BY`** (inside `OVER`) — orders rows within each partition; drives ranking and running totals.
- **frame** — e.g. `ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING` for moving windows.

> [!INTUITION]
> `GROUP BY` **collapses** each group to one summary row; a window function **keeps every row** and adds the summary alongside. That's why you can show each employee's salary *and* their department average on the same line — impossible with plain `GROUP BY`.

> [!NOTE]
> Windowing runs **after** FROM/WHERE/GROUP BY/HAVING but **before** ORDER BY/LIMIT/DISTINCT, and window functions may appear **only in `SELECT` and `ORDER BY`** — never in `WHERE`. To filter on a window result, wrap the query in a subquery/CTE and filter outside.

## Ranking functions (OVER mandatory)

| Function | Behaviour on ties |
|---|---|
| **`ROW_NUMBER()`** | unique 1, 2, 3… — **no ties** |
| **`RANK()`** | ties share a rank, **next rank skips** (1, 1, **3**) |
| **`DENSE_RANK()`** | ties share a rank, **no gap** (1, 1, **2**) |
| **`NTILE(n)`** | splits rows into **n** roughly equal buckets, numbered 1..n |

```sql
RANK()       OVER (PARTITION BY department ORDER BY salary DESC)
DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC)
ROW_NUMBER() OVER (ORDER BY salary DESC)
NTILE(4)     OVER (ORDER BY salary DESC)        -- quartiles
```

> [!EXAM]
> **`RANK` vs `DENSE_RANK`:** after two rows tie at rank 1, `RANK` gives the next row **3** (it skips 2), while `DENSE_RANK` gives it **2** (no gap). `ROW_NUMBER` never ties — it assigns distinct numbers even to equal values.

## Aggregate window functions

The ordinary aggregates gain an `OVER` clause:

```sql
AVG(salary) OVER (PARTITION BY department)                  -- dept average on every row
SUM(salary) OVER (PARTITION BY department ORDER BY salary)  -- running total within dept
```

## Value functions (OVER mandatory)

| Function | Returns |
|---|---|
| **`LAG(col, offset, default)`** | value from the **previous** row |
| **`LEAD(col, offset, default)`** | value from the **next** row |
| **`FIRST_VALUE(col)`** / **`LAST_VALUE(col)`** | first / last value in the frame |

```sql
LAG(salary, 1, 0) OVER (PARTITION BY department ORDER BY salary DESC) AS prev_salary
LEAD(salary)      OVER (ORDER BY emp_id)                              AS next_salary
salary - LAG(salary) OVER (ORDER BY emp_id)                          AS salary_change
```

`offset` (default 1) is how many rows back/ahead; `default` is returned when there is no such row (otherwise NULL).

## Practical use cases

- **Running / cumulative total** — `SUM(Sales) OVER (ORDER BY Date)`.
- **Top-N per group** — rank within a partition in a CTE, then filter `WHERE rank <= 3`:
  ```sql
  WITH Ranked AS (
    SELECT Name, Department, Salary,
           RANK() OVER (PARTITION BY Department ORDER BY Salary DESC) AS r
    FROM employee)
  SELECT Name, Department, Salary FROM Ranked WHERE r <= 3;
  ```
- **Moving average** — `AVG(salary) OVER (ORDER BY salary ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING)`.
- **Compare to group average** — `salary - AVG(salary) OVER (PARTITION BY department)`.
- **Previous / next neighbour** (supervisor–supervisee) — `LAG`/`LEAD` over an ordering.

> [!TRAP]
> Common pitfalls: forgetting `PARTITION BY` (the whole table becomes one window), and trying to use a window function in `WHERE` (illegal — window functions are computed after WHERE; push the filter to an outer query).

---

**Next:** relevance-ranked text search — **full-text search**.
