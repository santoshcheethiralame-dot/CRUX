---
subject: dbms
unit: 2
order: 11
slug: subqueries-from-clause
title: Subqueries in the FROM Clause
summary: Derived tables — the same question answered with GROUP BY/HAVING and with a subquery in FROM, why every derived table must be named, the MySQL versus Oracle difference, and the ROUND function.
minutes: 11
tags: [sql, derived-table, from-clause, subquery, alias, group-by, having, round, mysql, oracle]
---

# Subqueries in the FROM Clause

> [!EXAM]
> **SQL allows a subquery expression to be used in the `FROM` clause.**
>
> Since **a subquery returns a relation as a result, it can be inserted in a SELECT-FROM-WHERE expression at any place where a relation can appear.**

This is the cleanest statement of SQL's **closure** property: queries take relations in and give a relation out, so a query can be used wherever a table can. A subquery used this way is called a **derived table**.

## The same question, two ways

**Example:** Find the average employee salary of those departments **where the average salary is greater than \$32,000**.

### Way 1 — GROUP BY and HAVING

```sql
SELECT   Dno, ROUND(AVG(Salary), 2) AS avg_salary
FROM     EMPLOYEE
GROUP BY Dno
HAVING   AVG(Salary) > 32000;
```

> [!NOTE]
> **The `ROUND()` function** in MySQL rounds a number to a specified number of decimal places.
>
> **Syntax: `ROUND(X, D)`** — `X` is the number to be rounded, `D` (optional) is the number of decimal places. **If `D` is not provided, `X` is rounded to the nearest integer.**
>
> `ROUND(45.678, 2)` → **45.68**  ·  `ROUND(45.678)` → **46**

### Way 2 — a subquery in FROM

First extract the department averages, then filter the resulting relation with an ordinary `WHERE`:

```sql
SELECT Dno, avg_salary
FROM   ( SELECT Dno, ROUND(AVG(Salary), 2) FROM EMPLOYEE GROUP BY Dno )
       AS dept_avg_salary(Dno, avg_salary)
WHERE  avg_salary > 32000;
```

> [!DERIVE]
> **Reading it in three pieces, as the deck does.**
>
> **1 — The subquery**
> ```sql
> SELECT Dno, ROUND(AVG(Salary),2) FROM EMPLOYEE GROUP BY Dno
> ```
> returns department numbers with their average employee salaries, rounded to 2 decimal places.
>
> **2 — The naming clause**
> ```sql
> AS dept_avg_salary(Dno, avg_salary)
> ```
> specifies **the name of the result relation and of its attributes**. The result is named `dept_avg_salary` with attributes `Dno` and `avg_salary`.
>
> **3 — The outer query**
> `WHERE avg_salary > 32000` selects the tuples whose average exceeds 32000, and `SELECT Dno, avg_salary` projects the two columns.
>
> **The output:**
>
> | Dno | avg_salary |
> |---|---|
> | 1 | 55000.00 |
> | 5 | 33250.00 |
>
> **Department 4 is filtered out** — its average is 31000, below the threshold. Both forms of the query return this same two-row result, which is what makes them equivalent here.

> [!EXAM]
> **Failing to name the result will throw an error:**
>
> > **Error Code: 1248. Every derived table must have its own alias**
>
> This exact error message is worth memorising — it is a standard exam and viva question, and the fix is simply to append `AS some_name`.

> [!INTUITION]
> Why must a derived table be named when a subquery in `WHERE` need not be?
>
> Because of **what the two are for**. A subquery in `WHERE` produces a *value* to compare against — it is consumed immediately and never referred to again. A subquery in `FROM` produces a **table that the rest of the query must talk about**: qualify a column, join it to something else, mention it in `SELECT`. **A thing you must refer to needs a name.**
>
> The same logic explains why a `HAVING` clause is unnecessary in Way 2. The aggregate has already been computed *inside* the derived table, so by the time the outer query runs, `avg_salary` is just an ordinary column — and ordinary columns are filtered with `WHERE`.

> [!TRAP]
> Notice that the choice between the two ways is **not** the WHERE-vs-HAVING trap from the grouping topic. Here the two forms are genuinely equivalent because there is only **one** population being filtered.
>
> The derived table becomes *necessary* rather than optional when you need to filter on an aggregate **and then aggregate again** — as in the next example, and as in the corrected query from the grouping topic.

## Portability: MySQL vs Oracle

> [!EXAM]
> - **Nested subqueries in the `FROM` clause are supported by most but not all SQL implementations.**
> - **Some implementations, notably MySQL and PostgreSQL, require that each subquery relation in the `FROM` clause must be given a name.**
> - **Oracle allows a subquery result relation to be given a name but does not allow renaming the attributes of the relation.**

The deck prints the two dialects side by side:

```sql
-- MySQL: relation AND attributes may be renamed
SELECT Dno, avg_salary
FROM   ( SELECT Dno, ROUND(AVG(salary),2) FROM EMPLOYEE GROUP BY Dno )
       AS dept_avg_salary(Dno, avg_salary)
WHERE  avg_salary > 32000;
```

```sql
-- Oracle: relation may be named, attributes may not — so name the column inside
SELECT Dno, ROUND(AVG(salary),2) AS avg_salary
FROM   ( SELECT Dno, ROUND(AVG(salary),2) FROM EMPLOYEE GROUP BY Dno )
       AS dept_avg_salary
WHERE  avg_salary > 32000;
```

> [!INTUITION]
> The workaround shows the general escape route: **if you cannot rename a column from outside, rename it from inside** with an `AS` in the subquery's own `SELECT` list. That form works everywhere, which is why it is what you will normally see written.

## Aggregating an aggregate

**Example:** Find the **maximum of the total employee salaries of each department**, across all departments.

```sql
SELECT MAX(tot_salary)
FROM   ( SELECT Dno, SUM(Salary) FROM EMPLOYEE GROUP BY Dno )
       AS dept_total(Dno, tot_salary);
```

> [!TRAP]
> **This is a question that cannot be written with a single `GROUP BY`.** You are asked for two aggregations at different levels — a `SUM` **per department**, then a `MAX` **over those sums**.
>
> `SELECT MAX(SUM(Salary))` is illegal: **aggregate functions cannot be nested directly**, because the first aggregation must be materialised into rows before the second can be applied to them.
>
> The derived table is what provides that intermediate stage. **Whenever a question contains two aggregate words at different levels — "the highest total", "the average count", "the largest average" — reach for a subquery in `FROM` (or a CTE).**

---

**Next:** subqueries that must be re-run for every outer row — **correlated subqueries & EXISTS**.
