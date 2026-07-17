---
subject: dbms
unit: 2
order: 7
slug: nested-subqueries
title: Nested Subqueries
summary: Subqueries in WHERE and FROM — set membership with IN/NOT IN, scalar and tuple comparisons, the ANY/SOME/ALL set-comparison operators, and the name-scope rule across nesting levels.
minutes: 14
tags: [sql, subquery, nested-query, in, any, all, some]
---

# Nested Subqueries

A **nested query** (subquery) is a complete `SELECT-FROM-WHERE` block placed inside another query, the **outer query**. Subqueries can appear in `WHERE`, `FROM`, `SELECT`, and `HAVING`. They let the outer query compare against values computed from the database.

## Set membership — IN / NOT IN

`IN` tests whether a value belongs to the set returned by the subquery; `NOT IN` is its negation.

```sql
-- Projects that an employee named 'Smith' works on, as manager OR worker
SELECT DISTINCT Pnumber FROM PROJECT
WHERE Pnumber IN (SELECT Pnumber FROM PROJECT, DEPARTMENT, EMPLOYEE
                  WHERE Dnum=Dnumber AND Mgr_ssn=Ssn AND Lname='Smith')
   OR Pnumber IN (SELECT Pno FROM WORKS_ON, EMPLOYEE
                  WHERE Essn=Ssn AND Lname='Smith');
```

## Scalar subqueries and tuple comparison

- If a subquery returns a **single row with a single column**, treat it as a **scalar** and compare with `=`, `<`, etc. (As in the `= (SELECT MAX(...))` pattern.)
- SQL also allows comparing **tuples** by parenthesising them:

```sql
-- Employees on the same (project, hours) combination as employee 123456789
SELECT DISTINCT Essn FROM WORKS_ON
WHERE (Pno, Hours) IN (SELECT Pno, Hours FROM WORKS_ON WHERE Essn='123456789');
```

## Set-comparison operators — ANY / SOME / ALL

Form: `value comp_op {ANY | SOME | ALL} (subquery)`, where `comp_op` ∈ `{=, <>, >, >=, <, <=}`.

- **`comp_op ALL`** → TRUE if the comparison holds against **every** element of the set.
- **`comp_op SOME`** (≡ `ANY`) → TRUE if it holds against **at least one** element.

```sql
-- Salary greater than ALL of department 5  (i.e. greater than the MAX of dept 5)
SELECT Lname, Fname FROM EMPLOYEE
WHERE Salary > ALL (SELECT Salary FROM EMPLOYEE WHERE Dno=5);

-- Salary greater than SOME employee in department 5  (greater than the MIN)
SELECT Lname, Fname FROM EMPLOYEE
WHERE Salary > SOME (SELECT Salary FROM EMPLOYEE WHERE Dno=5);
```

> [!EXAM]
> Two equivalences worth memorising (Silberschatz Exercise 3.20 asks you to prove the second):
> - **`= SOME` ≡ `= ANY` ≡ `IN`**
> - **`<> ALL` ≡ `NOT IN`**
>
> And against an aggregate: `> ALL (...)` ≡ `> MAX(...)`, `> SOME (...)` ≡ `> MIN(...)`.

## Subqueries in the FROM clause

A subquery returns a relation, so it can sit anywhere a relation can — including `FROM`. **It must be given an alias.**

```sql
-- Departments whose average salary exceeds 42000
SELECT dept_name, avg_salary
FROM (SELECT dept_name, AVG(salary) AS avg_salary
      FROM instructor GROUP BY dept_name) AS dept_avg   -- alias REQUIRED
WHERE avg_salary > 42000;
```

> [!INTUITION]
> A FROM-subquery lets you compute an aggregate and then filter on it **without HAVING** — the inner query builds the per-group averages as a derived table, and the outer query treats it like any ordinary table.

## Name scope across nesting levels

> [!TRAP]
> When inner and outer queries reference same-named attributes, an **unqualified name refers to the innermost** query that declares it. To reach an outer relation's attribute from inside the subquery, give that relation an **alias** and qualify it (`E.Sex`). Best practice: alias **every** table to remove all ambiguity.

---

**Next:** named, reusable subqueries — **Common Table Expressions**.
