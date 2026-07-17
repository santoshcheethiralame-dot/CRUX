---
subject: dbms
unit: 2
order: 10
slug: correlated-subqueries-exists
title: Correlated Subqueries & EXISTS
summary: Subqueries that reference the outer row, the EXISTS / NOT EXISTS Boolean tests, and the division ("for all") pattern expressed with double NOT EXISTS or NOT EXISTS + EXCEPT.
minutes: 14
tags: [sql, correlated-subquery, exists, not-exists, division, for-all]
---

# Correlated Subqueries & EXISTS

## Correlated subqueries

A subquery is **correlated** when its `WHERE` clause references an attribute of a relation in the **outer** query. It is therefore **re-evaluated once for every outer row** (rather than once overall).

```sql
-- Employees who have a dependent of the same sex
SELECT E.Fname, E.Lname FROM EMPLOYEE AS E
WHERE E.Ssn IN (SELECT D.Essn FROM DEPENDENT AS D WHERE E.Gender = D.Gender);
```

> [!NOTE]
> Any query written with `=`/`IN` and a single level of nesting can be flattened into one join block:
> ```sql
> SELECT E.Fname, E.Lname FROM EMPLOYEE E, DEPENDENT D
> WHERE E.Ssn = D.Essn AND E.Gender = D.Gender;
> ```

### The canonical example — above the department average

```sql
-- Employees who earn more than the AVERAGE salary of their own department
SELECT last_name, salary, department_id
FROM employees outer
WHERE salary > (SELECT AVG(salary) FROM employees
                WHERE department_id = outer.department_id);   -- correlation!
```

The subquery references `outer.department_id`, so for **each** employee the database recomputes the average salary of **that employee's** department. A correlated subquery can also appear in the **SELECT** list:

```sql
SELECT employee_id, last_name,
       (SELECT ROUND(AVG(salary)) FROM employees
        WHERE department_id = e.department_id) AS dept_avg
FROM employees e;
```

> [!INTUITION]
> **Plain (nested) subquery vs correlated subquery:** a plain subquery (e.g. `salary > (SELECT AVG(salary) FROM employees)`) is **independent** — it runs **once** and feeds a value up. A correlated subquery is **driven by the outer row** — it runs **once per candidate row**, so it can give a *different* answer for each row (here, a different department average). The price is performance: many evaluations make it potentially slow.

## EXISTS / NOT EXISTS

Boolean operators used (almost always) with a correlated subquery:

- **`EXISTS (subquery)`** → TRUE if the subquery returns **at least one** row.
- **`NOT EXISTS (subquery)`** → TRUE if the subquery returns **no** rows.

```sql
-- Employees who have a same-sex dependent (EXISTS form)
SELECT E.Fname, E.Lname FROM EMPLOYEE AS E
WHERE EXISTS (SELECT * FROM DEPENDENT AS D
              WHERE E.Ssn = D.Essn AND E.Gender = D.Gender);

-- Employees with NO dependents
SELECT Fname, Lname FROM EMPLOYEE
WHERE NOT EXISTS (SELECT * FROM DEPENDENT WHERE Ssn = Essn);
```

> [!INTUITION]
> `EXISTS` cares only **whether a matching row exists**, not what it contains — that is why the body is usually `SELECT *`. It can stop at the first hit, so it is often efficient.

## The division / "for all" pattern

**Query:** *employees who work on **all** projects controlled by department 4.* SQL has no "for all" quantifier, so we rewrite **"works on all X"** as **"there is no X that the employee does not work on."**

**Way 1 — NOT EXISTS over a set difference (EXCEPT):**

```sql
SELECT Fname, Lname FROM EMPLOYEE
WHERE NOT EXISTS ((SELECT Pnumber FROM PROJECT  WHERE Dnum=4)   -- all dept-4 projects
                  EXCEPT
                  (SELECT Pno FROM WORKS_ON WHERE Ssn=Essn));   -- projects this emp does
```

If `(dept-4 projects) − (this employee's projects)` is **empty**, the employee works on all of them, `NOT EXISTS` is TRUE, and they are selected.

**Way 2 — double NOT EXISTS (no EXCEPT):**

```sql
SELECT Fname, Lname FROM EMPLOYEE
WHERE NOT EXISTS (
    SELECT * FROM WORKS_ON B
    WHERE B.Pno IN (SELECT Pnumber FROM PROJECT WHERE Dnum=4)
      AND NOT EXISTS (SELECT * FROM WORKS_ON C
                      WHERE C.Essn = Ssn AND C.Pno = B.Pno));
```

The inner block finds a dept-4 project the employee does **not** work on; the outer `NOT EXISTS` keeps the employee only if **no such project exists**.

> [!EXAM]
> Whenever a query says "**every**", "**all**", or "**for all**", it is relational **division** → express it with **double `NOT EXISTS`** (or `NOT EXISTS` + `EXCEPT`). This is the single most-tested advanced-SQL pattern — e.g. "straight-A students who got an A in *all* their courses" (Elmasri Exercise 7.6a) and "members who borrowed *every* McGraw-Hill book" (Silberschatz Exercise 3.21b).

> [!TRAP]
> Don't confuse the two senses: "students who do **not** have an A in **any** course" (Elmasri 7.6b) is a simple `NOT EXISTS` (no division), while "an A in **all** courses" needs the double-negation. *Any* → one NOT EXISTS; *all* → two.

---

**Next:** virtual tables — **views**.
