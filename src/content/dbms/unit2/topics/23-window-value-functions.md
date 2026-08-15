---
subject: dbms
unit: 2
order: 23
slug: window-value-functions
title: Window Value Functions & Practical Patterns
summary: LAG and LEAD for reaching into neighbouring rows with their offset and default arguments, then the five practical patterns from the Sales table — top-N per group, running totals, first-per-group, period comparison and ranking within a group.
minutes: 12
tags: [sql, lag, lead, window-function, running-total, top-n, offset, first-value, sales]
---

# Window Value Functions & Practical Patterns

## LAG — looking backwards

> [!EXAM]
> The **`LAG()`** function **lets you look at the value of a column from a *previous* row within the same partition**.
>
> - It is very useful for **comparing current row values with earlier ones** (salary growth, stock price change).
> - **You can specify how many rows back you want to look (default = 1 row).**
>
> ```sql
> LAG(column_name, offset, default_value)
> OVER ( PARTITION BY partition_column ORDER BY order_column )
> ```
>
> - **`column_name`** — the column you want to peek into
> - **`offset`** — how many rows to look (**default = 1**)
> - **`default_value`** — optional; **what to return if there is no row that far away (default = NULL)**

```sql
SELECT emp_name, department, salary,
       LAG(salary, 1) OVER (PARTITION BY department ORDER BY salary DESC) AS prev_salary
FROM   Employees;
```

> [!NOTE]
> **Use cases of `LAG()`:** compare current salary with the previous salary in the same department · track daily stock price changes by comparing today vs yesterday · **calculate differences, growth %, or trends row by row**.

## LEAD — looking forwards

> [!EXAM]
> The **`LEAD()`** function **lets you look at the value of a column from a *future* row within the same partition. It is the opposite of `LAG()`.**
>
> Useful for **comparing the current row with the next one** (predicting trends, seeing who comes after). The syntax and the three arguments are identical to `LAG()`.

> [!NOTE]
> **Use cases of `LEAD()`:** see what the next employee's salary is in the same department · calculate salary differences ahead of time (`LEAD(salary) - salary`) · compare today's stock price with tomorrow's · **identify transitions** (who replaces whom in a sequence).

> [!TRAP]
> The deck's `LEAD()` slide prints an example that actually calls **`LAG(salary,1)`** — the query is copied from the previous slide and the function name was not changed.
>
> The intended example is `LEAD(salary, 1) OVER (PARTITION BY department ORDER BY salary DESC)`. Worth noticing so you are not confused if you compare the two slides; write `LEAD` where `LEAD` is meant.

> [!INTUITION]
> `LAG` and `LEAD` are the same function pointing in opposite directions, and **`ORDER BY` is what defines which direction that is.**
>
> There is no inherent "previous row" in a relation — rows are unordered (see **WHERE, ORDER BY & String Operations**). The `ORDER BY` inside `OVER()` *manufactures* a sequence, and only then do "previous" and "next" mean anything.
>
> A consequence worth stating: **reverse the `ORDER BY` and `LAG` behaves like `LEAD`.** They are conveniences over the same mechanism.

> [!EXAM]
> **The boundary rows are where the `default_value` argument earns its keep.** The **first** row of each partition has no previous row, so `LAG` returns **NULL**; the **last** row has no next row, so `LEAD` returns NULL.
>
> Since NULL propagates through arithmetic, `salary - LAG(salary)` is NULL for the first employee in every department. Supplying a default — `LAG(salary, 1, 0)` — avoids that.

## The Sales table

The practical examples run on one table:

```sql
CREATE TABLE Sales (
    SaleID INT PRIMARY KEY, EmpID INT, EmpName VARCHAR(50),
    Department VARCHAR(50), CustomerID VARCHAR(10),
    SaleDate DATE, Month VARCHAR(10), Amount DECIMAL(10,2)
);
```

| SaleID | EmpID | EmpName | Department | CustomerID | SaleDate | Month | Amount |
|---|---|---|---|---|---|---|---|
| 1 | 101 | Alice | HR | C001 | 2023-01-05 | Jan | 1000 |
| 2 | 101 | Alice | HR | C002 | 2023-02-10 | Feb | 2000 |
| 3 | 101 | Alice | HR | C001 | 2023-03-15 | Mar | 1500 |
| 4 | 102 | Bob | HR | C003 | 2023-01-20 | Jan | 1200 |
| 5 | 102 | Bob | HR | C001 | 2023-02-25 | Feb | 1800 |
| 6 | 103 | Charlie | IT | C004 | 2023-01-10 | Jan | 7000 |
| 7 | 103 | Charlie | IT | C005 | 2023-02-18 | Feb | 7500 |
| 8 | 104 | David | IT | C006 | 2023-01-28 | Jan | 7200 |

## Pattern 1 — top N per group

**Retrieve the top 2 sales by each employee and rank them.**

```sql
SELECT * FROM (
    SELECT *, RANK() OVER (PARTITION BY EmpID ORDER BY Amount DESC) AS SaleRank
    FROM Sales
) AS ranked
WHERE SaleRank <= 2;
```

> [!TRAP]
> **The subquery is not optional stylistic packaging — it is required.**
>
> A window function is computed in the **`SELECT`** stage, which runs *after* `WHERE` (recall the order of execution from **Grouping**). So `WHERE SaleRank <= 2` in the same query would reference a column that **does not exist yet**, and `WHERE RANK() OVER (…) <= 2` is outright illegal.
>
> **You cannot filter on a window function in the same query level.** Wrap it in a derived table (or a CTE) and filter in the outer query. This is the single most common window-function error and a reliable exam question.

> [!INTUITION]
> **"Top N per group" is the signature use of window functions**, because plain SQL handles it so badly.
>
> `ORDER BY Amount DESC LIMIT 2` gives the top 2 **overall**, not the top 2 *per employee*. Doing it per group without windows means a correlated subquery counting how many of an employee's sales beat the current one — hard to write and slow. With `RANK() OVER (PARTITION BY …)` it is two lines.
>
> Note also the choice of ranking function matters here: `RANK()` returns **three** rows if two sales tie for second, `ROW_NUMBER()` returns exactly two.

## Pattern 2 — running total

**Running total of sales per employee.**

```sql
SELECT EmpID, EmpName, Month, Amount,
       SUM(Amount) OVER (PARTITION BY EmpID ORDER BY SaleDate) AS RunningTotal
FROM   Sales;
```

> [!DERIVE]
> **Adding `ORDER BY` to an aggregate window changes its meaning entirely.**
>
> - `SUM(Amount) OVER (PARTITION BY EmpID)` — **no `ORDER BY`** — gives the **same grand total** on every one of that employee's rows.
> - `SUM(Amount) OVER (PARTITION BY EmpID ORDER BY SaleDate)` — **with `ORDER BY`** — gives a **cumulative** total: each row sums everything up to and including itself.
>
> Alice's rows become **1000 → 3000 → 4500** rather than 4500 three times.
>
> The reason is that an `ORDER BY` inside `OVER()` implies a default frame of *"from the start of the partition to the current row"*. **`ORDER BY` is the switch between a group total and a running total** — a one-clause difference with two entirely different answers.

## Pattern 3 — first row per group

**First sale of each customer.**

```sql
SELECT * FROM (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY CustomerID ORDER BY SaleDate) AS rn
    FROM Sales
) AS first_sales
WHERE rn = 1;
```

> [!EXAM]
> **`ROW_NUMBER()` is the right choice here, not `RANK()`.** You want **exactly one** row per customer; if two sales shared the earliest date, `RANK()` would return both and break the "one row per customer" guarantee.
>
> **Use `ROW_NUMBER()` when you need exactly N rows; use `RANK()` when ties genuinely deserve equal standing.**

Note that the partition is on **`CustomerID`**, not `EmpID` — the same template answers a different question purely by changing what you partition by.

## Pattern 4 — comparing with the previous period

**Compare current sale with previous sale.**

```sql
SELECT EmpID, EmpName, Month, Amount,
       LAG(Amount) OVER (PARTITION BY EmpID ORDER BY SaleDate) AS PrevAmount
FROM   Sales;
```

Alice's February row shows `PrevAmount` = 1000 (her January sale). Her **January row shows NULL** — there is no earlier sale to reach back to.

## Pattern 5 — ranking within a group

**Rank employees by sale amount within department.**

```sql
SELECT EmpID, EmpName, Department, Amount,
       RANK() OVER (PARTITION BY Department ORDER BY Amount DESC) AS RankInDept
FROM   Sales;
```

> [!TRAP]
> Read carefully what this ranks: it ranks **individual sales**, not employees. Alice appears **three times** with three different ranks, because `Sales` has one row per sale.
>
> To rank **employees** you must first aggregate to one row per employee — `GROUP BY EmpID` in a CTE — and then rank that. **The grain of the table decides what the ranking means**, and mismatching them is a subtle way to answer the wrong question.

> [!INTUITION]
> The five patterns are worth memorising as a set, because between them they cover almost every window-function question you will be asked:
>
> | Want | Reach for |
> |---|---|
> | **Top N per group** | `RANK()`/`ROW_NUMBER()` + outer filter |
> | **Running / cumulative total** | aggregate `OVER (… ORDER BY …)` |
> | **First / latest per group** | `ROW_NUMBER()` + `WHERE rn = 1` |
> | **Change vs previous period** | `LAG()` |
> | **Position within a group** | `RANK()`/`DENSE_RANK()` |
>
> And two rules govern all of them: **`PARTITION BY` chooses the group, `ORDER BY` chooses the sequence.**

---

**Next:** searching text properly — **full-text search in MySQL**.
