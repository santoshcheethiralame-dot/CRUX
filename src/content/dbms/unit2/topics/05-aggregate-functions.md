---
subject: dbms
unit: 2
order: 5
slug: aggregate-functions
title: Aggregate Functions
summary: The five built-in aggregates, why MAX and MIN work on dates and strings, the COUNT(*) versus COUNT(DISTINCT col) distinction worked through with real numbers, and the one rule for how aggregates treat NULL.
minutes: 12
tags: [sql, aggregate, count, sum, max, min, avg, distinct, multiset, total-order, null]
---

# Aggregate Functions

> [!NOTE]
> **Aggregate functions are used to summarize information from multiple tuples into a single-tuple summary.** Grouping is used to create subgroups of tuples before summarization.

## The five built-in functions

> [!EXAM]
> | Function | Returns |
> |---|---|
> | **COUNT** | the **number of tuples or values** specified in a query |
> | **SUM** | the **sum** of a set (or multiset) of numeric values |
> | **MAX** | the **maximum** value from a set (or multiset) of numeric values |
> | **MIN** | the **minimum** value from a set (or multiset) of numeric values |
> | **AVG** | the **average** of a set (or multiset) of numeric values |

> [!NOTE]
> **A multiset is a collection similar to a set wherein the multiplicity of every value is greater than or equal to 1** — in other words, a set that can contain duplicate values.

The word "multiset" is doing real work in those definitions: it is what makes `SUM` and `AVG` count a repeated salary repeatedly.

```sql
SELECT SUM(Salary), MAX(Salary), MIN(Salary), AVG(Salary) FROM EMPLOYEE;
```

Combine with `AS` to make the output readable:

```sql
SELECT SUM(Salary) AS Total_Sal,  MAX(Salary) AS Highest_Sal,
       MIN(Salary) AS Lowest_Sal, AVG(Salary) AS Average_Sal
FROM   EMPLOYEE;
```

## MAX and MIN beyond numbers

> [!EXAM]
> **MAX and MIN can also be used with attributes that have non-numeric domains, if the domain values have a total ordering among one another.** **DATE, TIME, TIMESTAMP and alphanumeric strings** are examples of such non-numeric domains.
>
> **Total order** — for any two values in the domain, it can be determined that one appears before the other in the defined order.

> [!INTUITION]
> This is the cleanest example in the unit of a definition earning its keep. Ask *why* `SUM` and `AVG` are numbers-only while `MAX` and `MIN` are not:
>
> - `SUM` and `AVG` need **arithmetic** — you must be able to add two values and divide. "Monday + Tuesday" is meaningless.
> - `MAX` and `MIN` need only **comparison** — you must be able to say which of two values comes first. Dates compare fine. So do strings, alphabetically.
>
> **Total ordering is a strictly weaker requirement than arithmetic**, so strictly more datatypes satisfy it. `MAX(Bdate)` gives the youngest employee; `SUM(Bdate)` is nonsense.

## COUNT

```sql
SELECT COUNT(*) FROM EMPLOYEE;                     -- total employees
```

```sql
SELECT COUNT(*) FROM EMPLOYEE, DEPARTMENT          -- employees in 'Research'
WHERE  Dno = Dnumber AND Dname = 'Research';
```

> [!NOTE]
> In general, **`COUNT(*)` can be used to find the number of rows present in the result of the query.**

### COUNT with DISTINCT — worked with numbers

The deck runs both forms on the same column and explains the gap arithmetically.

```sql
SELECT COUNT(DISTINCT Salary) FROM EMPLOYEE;   -- returns 6
SELECT COUNT(Salary)          FROM EMPLOYEE;   -- returns 8
```

> [!DERIVE]
> **Why 8 and 6.** The deck highlights the repeats in the actual `Salary` column:
>
> $$30000,\; 40000,\; \mathbf{25000},\; 38000,\; 55000,\; 43000,\; \mathbf{25000},\; \mathbf{25000}$$
>
> The `Salary` column holds **8 values** in total, and among them **three copies of the same value** — 25000, appearing for Joyce English, Ahmed Jabbar and Alicia Zelaya.
>
> - `COUNT(Salary)` performs **no duplicate elimination** → **8**.
> - `COUNT(DISTINCT Salary)` specifies duplicate elimination. Of the three identical copies, **two are discarded and one is retained** → $8 - 2 = \mathbf{6}$.
>
> Note the subtraction: you discard $k-1$ copies of a value appearing $k$ times, not $k$. The value itself still counts once.

> [!EXAM]
> **SQL, by default, does not eliminate duplicates in the result of a query.** Duplicate retention can be specified explicitly using the **`ALL`** keyword; duplicate elimination must be explicitly specified using **`DISTINCT`**.

> [!TRAP]
> **`COUNT(*)` and `COUNT(column)` are different functions**, and the difference is not duplicates — it is NULLs.
>
> - **`COUNT(*)`** counts **rows**, whatever they contain.
> - **`COUNT(column)`** counts **non-NULL values** in that column.
>
> On a column with NULLs they return different numbers from the same table. Add `DISTINCT` and you get a third number. Three near-identical expressions, three answers — a favourite exam construction.

## Aggregates and NULL

> [!EXAM]
> **In general, when an aggregate function is applied to a collection of values, NULL values are discarded before the calculation.**
>
> **If the collection becomes empty because all the values are NULL, `COUNT` returns zero and other aggregate functions return NULL.**

**Example:** Find the average number of hours that employees work on each project.

```sql
SELECT Pno, AVG(Hours) AS avg_hours FROM WORKS_ON GROUP BY Pno;
```

> [!DERIVE]
> **The deck's worked case, project 20.** The `WORKS_ON` tuples for `Pno = 20`:
>
> | Essn | Pno | Hours |
> |---|---|---|
> | 333445555 | 20 | 10.0 |
> | 888665555 | 20 | **NULL** |
> | 987654321 | 20 | 15.0 |
>
> Three rows, **one of which is NULL**. When `AVG` is applied it **discards the NULL and considers the other two**:
>
> $$\text{AVG} = \frac{10 + 15}{2} = 12.5$$
>
> The critical detail is the **denominator**. It is **2, not 3** — the NULL is removed from the count as well as the sum. Treating NULL as zero would have given $25/3 = 8.33$, a different and wrong answer.

> [!INTUITION]
> Notice that `COUNT` returning **0** while the others return **NULL** on an all-NULL collection is consistent, not arbitrary.
>
> "How many known values are there?" has a definite answer even when there are none: **zero**. But "what is the average of no values?" has no answer at all — you would be dividing by zero — so SQL says **NULL**, meaning *undefined*.
>
> **COUNT answers a question about the collection; the others answer a question about the values in it.**

## Aggregates inside nested queries

> [!NOTE]
> Aggregate functions can also be used in **selection conditions involving nested queries**, including **correlated nested queries** placed in the `WHERE` clause of an outer query.

**Example:** Retrieve the names of all employees who have two or more dependents.

```sql
SELECT Lname, Fname FROM EMPLOYEE
WHERE (SELECT COUNT(*) FROM DEPENDENT WHERE Ssn = Essn) >= 2;
```

The correlated subquery **returns the count of dependents for every employee**, which is then checked against 2. This is a preview of the **correlated subqueries** topic — the inner query mentions `Ssn`, which belongs to the *outer* query's table, so it must be re-evaluated per employee.

> [!EXAM]
> SQL has two functions applied to Boolean values:
> - **`SOME`** returns True if **at least one** element in the collection is True.
> - **`ALL`** returns True if **all** the elements in the collection are True.
>
> These reappear as the set-comparison operators `> ALL`, `> SOME` in the nested-queries topics.

---

**Next:** applying these functions to subgroups rather than whole tables — **GROUP BY & HAVING**.
