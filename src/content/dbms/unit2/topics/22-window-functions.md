---
subject: dbms
unit: 2
order: 22
slug: window-functions
title: Window Functions — OVER, PARTITION BY & Ranking
summary: Calculations across related rows without collapsing them, why that is different from GROUP BY, the OVER and PARTITION BY syntax, and the three ranking functions with the tie-handling that separates them.
minutes: 12
tags: [sql, window-function, over, partition-by, rank, dense-rank, row-number, ranking, aggregate]
---

# Window Functions — OVER, PARTITION BY & Ranking

## What a window function is

> [!EXAM]
> **In MySQL, a window function performs a calculation across a set of rows that are related to the current row, without collapsing rows into a single output (unlike `GROUP BY`).**
>
> Window functions let you do calculations across rows, but instead of grouping them like `SUM()` or `AVG()` normally does, they let you **keep every row and just add extra calculated values**.
>
> **How are they different from aggregate functions?** **While aggregate functions collapse rows into one result, window functions add new values without collapsing rows.**

> [!NOTE]
> The deck's side-by-side: on the same data,
>
> - using the aggregate function `AVG` with `GROUP BY`, we get **a single row for each department**;
> - using window functions, **all rows in the employee table are maintained**, along with the average salary of the department they belong to.

### The sample data

The whole deck runs on two small tables — `departments` (HR, Sales, Engineering) and `employees`:

| emp_id | emp_name | department | salary | hire_date |
|---|---|---|---|---|
| 101 | Alice | Sales | 5000 | 2020-01-15 |
| 102 | Bob | Sales | 7000 | 2019-03-12 |
| 103 | Charlie | Engineering | 9000 | 2018-06-01 |
| 104 | David | Engineering | 8000 | 2021-07-19 |
| 105 | Eva | HR | 6000 | 2020-09-30 |
| 106 | Frank | Sales | 7500 | 2022-02-11 |

> [!DERIVE]
> **The two queries, and their actual output.**
>
> ```sql
> SELECT department, AVG(salary) FROM employees GROUP BY department;
> ```
>
> | department | AVG(salary) |
> |---|---|
> | Sales | 6500.0000 |
> | Engineering | 8500.0000 |
> | HR | 6000.0000 |
>
> **3 rows** — the six employees are gone.
>
> ```sql
> SELECT emp_name, department, salary,
>        AVG(salary) OVER (PARTITION BY department) AS dept_avg_salary
> FROM employees;
> ```
>
> | emp_name | department | salary | dept_avg_salary |
> |---|---|---|---|
> | Charlie | Engineering | 9000 | 8500.0000 |
> | David | Engineering | 8000 | 8500.0000 |
> | Eva | HR | 6000 | 6000.0000 |
> | Alice | Sales | 5000 | 6500.0000 |
> | Bob | Sales | 7000 | 6500.0000 |
> | Frank | Sales | 7500 | 6500.0000 |
>
> **6 rows** — the same three averages, now repeated beside every employee they apply to. Nothing was lost, and one extra column was gained.

> [!INTUITION]
> This is the cleanest way to hold the distinction:
>
> | | `GROUP BY` | Window function |
> |---|---|---|
> | **Rows in** | 8 employees | 8 employees |
> | **Rows out** | **3** (one per department) | **8** (one per employee) |
> | **You get** | the summary | the summary **and** the detail |
>
> `GROUP BY` **destroys** the individual rows to produce the summary. A window function **computes the same summary and writes it alongside each row.**
>
> That is why the alternative is so painful: without window functions you must aggregate in a subquery and **join it back** to the detail — two passes and a join to get what `OVER()` does in one clause.

## Why they are required

> [!EXAM]
> Window functions **let you analyze data across rows without losing individual rows**. They are required when you want **both**:
> 1. **Detailed row-level data** (every employee, every order)
> 2. **Aggregates or comparisons across groups** (totals, averages, rankings)
>
> **Traditional `GROUP BY` only gives you summary rows, but window functions give you summary + detail in the same query.**
>
> **Common use cases:** Ranking & row numbers · Running totals & cumulative sums · Moving averages (trends) · Comparisons to group values · Percentiles & distribution · Lag & lead (previous/next row access).

## The three types

> [!EXAM]
> | Type | Functions |
> |---|---|
> | **Aggregate functions with `OVER()`** | `SUM()`, `AVG()`, `MIN()`, `MAX()`, `COUNT()` — **applied over a partition/window instead of collapsing into one row** |
> | **Ranking functions** | `ROW_NUMBER()`, `RANK()`, `DENSE_RANK()` |
> | **Value functions** | `LEAD()`, `LAG()`, `FIRST_VALUE()`, `LAST_VALUE()` |

The value functions get their own topic next; aggregate and ranking functions are covered here.

## Syntax

```sql
SELECT column_name1, column_name2,
       window_function(column_name2)
       OVER ( [PARTITION BY column_name1] ) AS new_column
FROM   table_name;
```

> [!NOTE]
> **Key terms:** `window_function` = any aggregate or ranking function · `column_name2` = the column the window function is applied to · `new_column` = the name of the new column.

**The worked example:**

```sql
SELECT name, department, salary,
       AVG(salary) OVER (PARTITION BY department) AS dept_avg_salary
FROM   employees;
```

> [!DERIVE]
> **Reading it in three parts, as the deck does.**
>
> 1. **`OVER`** tells SQL **not to collapse rows like `GROUP BY`**, and instead calculate an aggregate **in a "window" while keeping all rows visible**.
> 2. **`PARTITION BY department`** creates **separate "mini-groups" (windows) for each department** — one window for Sales, one for Engineering, one for HR. **Within each window, calculations are done.**
> 3. **`AVG(salary)`** — inside each department, SQL calculates the average salary.
>
> Every employee row survives; each simply gains a column holding **their own department's** average.

> [!EXAM]
> **`OVER()` is what makes a function a window function.** `AVG(salary)` is an aggregate that collapses rows; `AVG(salary) OVER (…)` is a window function that does not. **The same function name behaves differently purely because of the `OVER` clause.**

> [!TRAP]
> **`PARTITION BY` is optional, and omitting it is meaningful rather than an error.** `AVG(salary) OVER ()` — with empty parentheses — treats **the entire result set as one window**, giving every row the company-wide average.
>
> Do not confuse `PARTITION BY` with `GROUP BY`. They both divide rows into groups, but **`GROUP BY` then collapses each group into one row and `PARTITION BY` does not.**

## Aggregate window functions

> [!NOTE]
> **Aggregate window functions calculate aggregates over a window of rows while retaining individual rows.** `SUM()` sums values within a window · `AVG()` averages within a window · `COUNT()` counts the rows within a window · `MAX()` and `MIN()` return the extremes in the window.

**Maximum salary in each department, shown against every employee:**

```sql
SELECT emp_ID, emp_name, Department, Salary,
       MAX(Salary) OVER (PARTITION BY Department) AS MaxDeptSalary
FROM   Employees;
```

**Count of employees in each department:**

```sql
SELECT Emp_ID, emp_name, Department, Salary,
       COUNT(*) OVER (PARTITION BY Department) AS DeptEmployeeCount
FROM   Employees;
```

> [!INTUITION]
> The reason this shape is so useful is **comparison against the group**. Once each row carries its department's average or maximum beside it, questions like *"who earns above their department average?"* or *"what fraction of the department maximum is this?"* become simple arithmetic on one row.
>
> With `GROUP BY` alone you cannot even ask — the individual salaries no longer exist in the result.

## Ranking window functions

> [!EXAM]
> **Ranking window functions assign a position (rank/number) to each row within a partition, usually based on an `ORDER BY` clause.**
>
> | Function | Ties | Gaps |
> |---|---|---|
> | **`RANK()`** | **Ties get the same rank** | **The next rank is skipped** |
> | **`DENSE_RANK()`** | **Ties get the same rank** | **No ranks are skipped** — consecutive |
> | **`ROW_NUMBER()`** | **No ties** — every row gets a distinct number | Always consecutive |

### RANK()

```sql
SELECT emp_name, department, salary,
       RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rank_in_dept
FROM   Employees;
```

**Ties (equal values) get the same rank, and the next rank is skipped.** If two rows are tied at rank 1, **the next row will be rank 3 (not 2)**.

### DENSE_RANK()

```sql
SELECT emp_name, department, salary,
       DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dense_rank_in_dept
FROM   Employees;
```

**Ties get the same rank, and no ranks are skipped** — the deck notes that **Alice is now numbered 2 instead of 3** when compared with `RANK()`.

### ROW_NUMBER()

```sql
SELECT emp_name, department, salary,
       ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS row_num_in_dept
FROM   Employees;
```

**Assigns a unique sequential number to each row within a partition, starting at 1 for each partition.** Unlike `RANK()` or `DENSE_RANK()` there are **no ties — every row gets its own distinct number, even if values are equal.**

> [!DERIVE]
> **The three side by side on the deck's own output.** All three queries partition by department and order by salary descending, so only the **Sales** partition — which contains the tie — shows any difference:
>
> | emp_name | department | salary | `RANK()` | `DENSE_RANK()` | `ROW_NUMBER()` |
> |---|---|---|---|---|---|
> | Charlie | Engineering | 9000 | 1 | 1 | 1 |
> | David | Engineering | 8000 | 2 | 2 | 2 |
> | Eva | HR | 6000 | 1 | 1 | 1 |
> | Bob | Sales | 7000 | **1** | **1** | **1** |
> | Frank | Sales | 7000 | **1** | **1** | **2** |
> | Alice | Sales | 5000 | **3** | **2** | **3** |
>
> - Bob and Frank tie at 7000. `RANK()` and `DENSE_RANK()` both give them **1**; `ROW_NUMBER()` splits them into **1 and 2**.
> - Alice is the giveaway row: **3 under `RANK()`, 2 under `DENSE_RANK()`** — which is exactly the deck's note that *"Alice is now numbered 2 instead of 3 when rank was used."*
> - Note that **HR and Engineering restart at 1** — ranking is per partition.
>
> **The mnemonic:** `RANK` counts **rows** ahead of you; `DENSE_RANK` counts **distinct values** ahead of you; `ROW_NUMBER` just counts.

> [!TRAP]
> **The deck's data is inconsistent between slides, and the tie only exists on one of them.**
>
> The `employees` table printed on the sample-schema slide lists **Frank at 7500** — and the aggregate-window slide confirms it, since Sales averages 6500, which is $(5000 + 7000 + 7500)/3$.
>
> But all three ranking screenshots show **Frank at 7000**, tied with Bob. They were evidently captured before the salary was changed.
>
> This matters because **with Frank at 7500 there is no tie at all**, and the entire `RANK()` vs `DENSE_RANK()` distinction the slides are built to demonstrate would be invisible. Use **7000** when reproducing the ranking examples; use 7500 if you are checking the department averages.

> [!TRAP]
> **`ROW_NUMBER()` is non-deterministic across ties.** With two identical salaries, which one gets 1 and which gets 2 is **not defined** and may differ between runs.
>
> If it matters, add a tie-breaker to the ordering: `ORDER BY salary DESC, emp_id`. Answers that depend on an arbitrary choice are exactly what `RANK()` and `DENSE_RANK()` avoid — they give tied rows the same value on purpose.

> [!EXAM]
> **`ORDER BY` inside `OVER()` is not the same as the query's `ORDER BY`.** The one inside the window defines **the order used to compute the ranking**; the one at the end of the query defines **the order rows are displayed in**. A query can legitimately have both, with different columns.

---

**Next:** looking at neighbouring rows, and the practical patterns — **value functions & use cases**.
