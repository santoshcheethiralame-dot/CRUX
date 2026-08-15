---
subject: dbms
unit: 2
order: 14
slug: cte-with-clause
title: Common Table Expressions — the WITH Clause
summary: CTEs as named temporary result sets, the basic and multi-CTE syntax, the max-hours and department-total examples worked through, and how a CTE differs from a derived table and from a nested subquery.
minutes: 12
tags: [sql, cte, with-clause, temporary-relation, readability, derived-table, chaining]
---

# Common Table Expressions — the WITH Clause

> [!EXAM]
> A **Common Table Expression (CTE)** in SQL is a **temporary result set that is defined and used within the execution scope of a `SELECT`, `INSERT`, `UPDATE` or `DELETE` statement**.
>
> **CTEs are defined using the `WITH` clause and can be referenced multiple times within the main SQL query.**
>
> They are useful for:
> - **Simplifying complex queries**
> - **Breaking down subqueries**
> - **Recursive querying**

> [!NOTE]
> The textbook phrasing: **the `WITH` clause provides a way of defining a temporary relation whose definition is available only to the query in which the `WITH` clause occurs.**

## Syntax

```sql
WITH cte_name AS (
    SELECT ...          -- query1: any query returning a result set
)
SELECT ... FROM cte_name;   -- query2: the outer query, using the CTE like a table
```

> [!NOTE]
> - **`cte_name`** is the name of the CTE.
> - **`query1`** is a valid SQL query returning a result set, **treated as a virtual table** within the main query.
> - **`query2`** is the outer query, which **uses the CTE like a table**.

**Multiple CTEs are separated by commas:**

```sql
WITH cte1 AS ( ... ),
     cte2 AS ( ... )
SELECT ... FROM cte1 JOIN cte2;
```

## Basic examples

**Example 1 — a simple filter:**

```sql
WITH cte_emp AS (
    SELECT ssn, fname, dno, salary
    FROM   Employee
    WHERE  salary > 50000        -- filter applied here
)
SELECT fname FROM cte_emp;
```

**Example 2 — employees earning above the average salary:**

```sql
WITH avg_salary AS (
    SELECT AVG(salary) AS avg_sal FROM Employee
)
SELECT fname, dno, salary
FROM   Employee, avg_salary
WHERE  Employee.salary > avg_salary.avg_sal;
```

The same thing **without** `WITH`:

```sql
SELECT fname, dno, salary FROM employee
WHERE  salary > (SELECT AVG(salary) FROM employee);
```

**Example 3 — two CTEs joined together:**

```sql
WITH cte_emp AS (
    SELECT ssn, fname, dno, salary FROM Employee WHERE salary > 40000
),
cte_dept AS (
    SELECT dnumber, dname FROM department
)
SELECT e.fname, e.salary, d.dname
FROM   cte_emp e JOIN cte_dept d ON e.dno = d.dnumber;
```

## A worked example: the maximum-hours employee

**Example:** Find the SSN of the employee who works the **highest number of hours** on a particular project, displaying the project number and hours as well.

```sql
WITH max_work(max_hours) AS
     ( SELECT MAX(Hours) FROM WORKS_ON )
SELECT Essn, Pno, Hours
FROM   WORKS_ON, max_work
WHERE  Hours = max_hours;
```

> [!DERIVE]
> The `WITH` clause defines the temporary relation `max_work` — **a single-tuple, single-attribute relation** holding the maximum hours any employee works.
>
> That relation is then **joined** with `WORKS_ON` on the condition that `Hours` matches `max_hours`. All tuples in `WORKS_ON` with the maximum value of `Hours` get selected (here there is only one), and their `Essn`, `Pno` and `Hours` are retrieved.
>
> Note the shape: **a one-row relation joined to a big one acts as a filter.** Because every row is compared against the single `max_hours` value, the join behaves exactly like a `WHERE` condition.

The same result **without** the `WITH` clause:

```sql
SELECT Essn, Pno, Hours FROM WORKS_ON
WHERE  Hours = (SELECT MAX(Hours) FROM WORKS_ON);
```

> [!EXAM]
> The deck's justification for preferring the CTE:
>
> - **Using nested subqueries would have made the query harder to read and understand.**
> - **The `WITH` clause makes the query logic clearer.**
> - **It also permits this temporary relation to be used in multiple places within a query.**

> [!INTUITION]
> That third point is the one with real substance, and it is the honest reason to reach for a CTE.
>
> Readability is a matter of taste. But a nested subquery used in **three** places must be **written out three times** — three copies to keep in sync, and (in principle) three evaluations. A CTE is **written once and referenced by name**.
>
> A CTE is, in effect, **a local variable for a table**. The argument for it is the same as the argument for not repeating a magic number in code.

## Chaining CTEs

**Example:** Find all departments where the **total salary is greater than the average of the total salary at all departments**.

```sql
WITH dept_total(Dno, tot_salary) AS
     ( SELECT Dno, SUM(Salary) FROM EMPLOYEE GROUP BY Dno ),
     dept_total_avg(avg_tot_salary) AS
     ( SELECT AVG(tot_salary) FROM dept_total )
SELECT Dname, Dnumber
FROM   dept_total, dept_total_avg, DEPARTMENT
WHERE  tot_salary > avg_tot_salary AND Dnumber = Dno;
```

> [!DERIVE]
> **Step 1** — `dept_total` retrieves the department number and **total salary for each department**.
>
> **Step 2** — `dept_total_avg` retrieves **the average of those totals**, by **making use of `dept_total` which was defined previously**.
>
> **Step 3** — `dept_total` and `dept_total_avg` are joined on the condition `tot_salary > avg_tot_salary`.
>
> **Step 4** — the result is joined with `DEPARTMENT` **to obtain the department name**, which is not available in the result of the previous join.

> [!EXAM]
> **A CTE can reference CTEs defined before it in the same `WITH` clause.** That is what makes step 2 possible, and it is the key property that separates chained CTEs from independent derived tables.
>
> The ordering is one-way: `dept_total_avg` may use `dept_total`, but not the reverse (unless the CTE is declared `RECURSIVE`).

> [!INTUITION]
> This query is the clearest argument for CTEs in the whole unit. It needs **two levels of aggregation** — a `SUM` per department, then an `AVG` of those sums — and then a join back to get the name.
>
> With nested subqueries you would be writing a subquery inside a subquery inside a `FROM` clause, read inside-out. With `WITH` you get a **numbered list of steps, read top to bottom**, each one named after what it holds.
>
> **CTEs turn a nested query into a sequence.** That is the whole pitch.

## CTE vs derived table vs nested subquery

> [!EXAM]
> | | Nested subquery (`WHERE`) | Derived table (`FROM`) | CTE (`WITH`) |
> |---|---|---|---|
> | **Produces** | a value or set to compare | a table | a named table |
> | **Named?** | no | **must** be aliased | named by definition |
> | **Reusable in the query?** | no | no — one use per definition | **yes**, referenceable multiple times |
> | **Can reference an earlier one?** | — | no | **yes** |
> | **Can be recursive?** | no | no | **yes**, with `RECURSIVE` |
> | **Reading order** | inside-out | inside-out | **top-to-bottom** |
>
> The comparison with **views** — the other named query object — is covered in the **Views** topic.

---

**Next:** the CTE that refers to itself — **recursive CTEs**.
