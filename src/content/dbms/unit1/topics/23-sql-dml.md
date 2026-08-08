---
subject: dbms
unit: 1
order: 23
slug: sql-dml
title: SQL DML — INSERT, SELECT, UPDATE & DELETE
summary: Modifying data with INSERT, UPDATE and DELETE, the structure of a basic SELECT query, and how the SELECT-FROM-WHERE clauses map directly onto relational algebra.
minutes: 12
tags: [sql, dml, insert, select, update, delete]
---

# SQL DML — INSERT, SELECT, UPDATE & DELETE

The **DML** manipulates the data inside the tables: `INSERT`, `SELECT`, `UPDATE`, `DELETE`.

## INSERT — add rows

```sql
INSERT INTO student (ID, name, tot_cred) VALUES (1, 'Avi', 20);
INSERT INTO student VALUES (2, 'Bob', 30);        -- all columns, in order
INSERT INTO archive SELECT * FROM student;        -- bulk insert from a query
```

## SELECT — the structure of an SQL query

```sql
SELECT  name, salary           -- columns to return   (projection ∏)
FROM    instructor             -- the source relation(s)
WHERE   dept_name = 'Physics'  -- row filter           (selection σ)
  AND   salary > 90000;
```

> [!EXAM]
> The **SELECT–FROM–WHERE** structure maps **directly** onto relational algebra:
> - **`SELECT` clause** = **Project (∏)** — the columns
> - **`FROM` clause** = the relation(s) (and any **Cartesian product / join**)
> - **`WHERE` clause** = **Select (σ)** — the row condition
>
> So `SELECT name FROM instructor WHERE dept_name='Physics'` ≡ **∏_name( σ_{dept_name='Physics'}(instructor) )**.

> [!TRAP]
> Don't confuse SQL's keyword **`SELECT`** (which picks **columns** → relational *project* ∏) with relational algebra's **`σ` select** (which picks **rows**). They sound alike but do opposite things — `WHERE` is the algebra's σ.

## UPDATE — modify existing rows

```sql
UPDATE employee
SET    salary = salary * 1.10      -- give a 10% raise
WHERE  Dno = 5;                    -- to department 5 only
```

## DELETE — remove rows

```sql
DELETE FROM employee WHERE Ssn = '123456789';   -- delete one row
DELETE FROM employee;                            -- omit WHERE → deletes ALL rows
```

> [!INTUITION]
> **DELETE vs TRUNCATE vs DROP** (a favourite comparison): **DELETE** removes selected **rows** (DML, `WHERE`-filtered, rollback-able); **TRUNCATE** removes **all rows** but keeps the table (DDL, fast); **DROP** removes the **whole table** including its structure.

> [!EXAM]
> A `DELETE` or `UPDATE` **without a `WHERE` clause** affects **every row** in the table — a classic, costly mistake. Always scope modifications with `WHERE` unless you really mean "all".

---

**You've finished DBMS Unit 1.** The arc: *understand the system* (data, DBMS, file-system problems, abstraction & architecture) → *design conceptually* (the E-R model) → *map to tables* (ER → relational) → *query formally* (relational algebra) → *query practically* (SQL DDL, constraints & DML). Hit the **quizzes** and **flashcards** to lock it in.
