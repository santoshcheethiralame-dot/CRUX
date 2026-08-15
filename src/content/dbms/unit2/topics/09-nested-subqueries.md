---
subject: dbms
unit: 2
order: 9
slug: nested-subqueries
title: Nested Subqueries — IN & NOT IN
summary: What a nested query is and where it may appear, set membership with IN and NOT IN, the worked Smith example including the empty subquery result, and treating a single-row single-column result as a scalar.
minutes: 12
tags: [sql, nested-query, subquery, in, not-in, set-membership, scalar-subquery, tuple-comparison]
---

# Nested Subqueries — IN & NOT IN

> [!EXAM]
> A **nested query** can be defined as a **complete SELECT-FROM-WHERE block within another SQL query**. The other query is called the **outer query**.
>
> Nested queries are used to **fetch existing values in the database that can be used by the outer query for comparison**.
>
> They can appear in the **`WHERE` clause, `FROM` clause, `SELECT` clause, and other SQL clauses as needed.**

## IN and NOT IN

> [!NOTE]
> SQL provides a comparison operator **`IN`**, which **checks if a value is present in a set (or multiset) of values**. It returns **True if the value is present** in the set and **False otherwise**. It essentially **checks for set membership**.
>
> The **`NOT IN`** operator returns **True if the value is not present** in the set, and False otherwise.

## A worked example

**Example:** Retrieve the project numbers of projects that have an employee with the last name `'Smith'` involved **either as a manager or as a worker**.

```sql
SELECT DISTINCT Pnumber
FROM   PROJECT
WHERE  Pnumber IN
       ( SELECT Pnumber FROM PROJECT, DEPARTMENT, EMPLOYEE
         WHERE Dnum = Dnumber AND Mgr_ssn = Ssn AND Lname = 'Smith' )
   OR  Pnumber IN
       ( SELECT Pno FROM WORKS_ON, EMPLOYEE
         WHERE Essn = Ssn AND Lname = 'Smith' );
```

> [!DERIVE]
> **Evaluating it, subquery by subquery.**
>
> **First subquery** — projects handled by departments whose *manager's* last name is 'Smith':
>
> ```sql
> SELECT Pnumber FROM PROJECT, DEPARTMENT, EMPLOYEE
> WHERE Dnum = Dnumber AND Mgr_ssn = Ssn AND Lname = 'Smith'
> ```
>
> On executing it we obtain **an empty set** — **because there is no manager whose last name is 'Smith'.** The deck proves it by listing the managers alongside: **Wong, Borg, Wallace**. John Smith is an employee, but he manages nothing.
>
> **Second subquery** — projects that employees named 'Smith' *work on*:
>
> ```sql
> SELECT Pno FROM WORKS_ON, EMPLOYEE WHERE Essn = Ssn AND Lname = 'Smith'
> ```
>
> This returns **(1, 2)**.
>
> **Plugging both results into the outer query** gives the equivalent:
>
> ```sql
> SELECT DISTINCT Pnumber FROM PROJECT
> WHERE Pnumber IN ()  OR  Pnumber IN (1, 2);
> ```
>
> The first branch is unsatisfiable for every row; the second selects projects 1 and 2. **Final answer: {1, 2}.**

> [!INTUITION]
> The empty first subquery is not a wasted slide — it teaches the evaluation model.
>
> **A non-correlated subquery is evaluated once, up front, and its result is substituted in** like a constant. That is why you can reason about the query by literally replacing each subquery with its output, as above.
>
> Hold on to this, because the very next behaviour — **correlated** subqueries — breaks it. There the inner query mentions a column from the outer query, so it *cannot* be evaluated once; it must be re-run per outer row.

> [!TRAP]
> `Pnumber IN ()` is **False**, not an error and not True. An empty set has no members, so nothing is a member of it.
>
> Compare `NOT IN ()`, which is **True** for every row — vacuously, since there is nothing to be excluded by. Empty subquery results flip the meaning of a query rather than breaking it, which is why they are hard to spot.

> [!TRAP]
> **`NOT IN` with a NULL in the subquery result returns no rows at all.**
>
> `x NOT IN (1, 2, NULL)` expands to `x <> 1 AND x <> 2 AND x <> NULL`. That last comparison is **UNKNOWN**, and from the truth table `TRUE AND UNKNOWN = UNKNOWN` — so the whole predicate is never TRUE and `WHERE` discards every row.
>
> This is the single most notorious NULL bug in SQL. `IN` is unaffected (one TRUE carries an OR), so the query works fine until a NULL appears in the inner result. **Prefer `NOT EXISTS` when the subquery column is nullable** — see the correlated-subqueries topic.

## Scalar subqueries

> [!NOTE]
> In general, **a nested query returns a table (relation) which is a set or multiset of tuples**.
>
> However, there are scenarios where a nested query returns a table with **a single attribute and a single tuple**. In such cases we can **treat the result as a scalar** — a single value — and apply operations applicable to singular values.
>
> The **equality operator `=` is not applicable when one of the operands is a set of values** (which is usually what a nested query returns). **When a nested query returns a single value, we can use `=` instead of `IN`.**

```sql
-- IN works whatever the subquery returns
SELECT Fname FROM EMPLOYEE WHERE Salary IN (SELECT MAX(Salary) FROM EMPLOYEE);

-- = works only because MAX returns exactly one value
SELECT Fname FROM EMPLOYEE WHERE Salary = (SELECT MAX(Salary) FROM EMPLOYEE);
```

> [!TRAP]
> **`=` with a subquery is a runtime gamble.** If the subquery ever returns more than one row, the query **fails with an error** — and it will typically pass testing on small data and fail in production once a second row appears.
>
> Aggregates like `MAX`, `MIN`, `COUNT` without `GROUP BY` are safe: they are guaranteed to return exactly one row. Anything else, prefer **`IN`**, which is defined for any number of rows.

## Tuple comparison

> [!EXAM]
> **SQL allows the use of tuples of values in comparisons by placing them within parentheses.**

**Example:** Retrieve the SSN of all employees who work on any of the same **(project, hours)** combination that employee 'John Smith' (`Ssn = '123456789'`) works on.

```sql
SELECT DISTINCT Essn FROM WORKS_ON
WHERE  (Pno, Hours) IN
       ( SELECT Pno, Hours FROM WORKS_ON WHERE Essn = '123456789' );
```

> [!NOTE]
> The `IN` operator **compares the subtuple of values in parentheses `(Pno, Hours)` within each tuple in `WORKS_ON` with the set of type-compatible tuples produced by the nested query.**

> [!INTUITION]
> The parentheses are load-bearing, and the alternative shows why.
>
> Without tuple comparison you would have to write `Pno IN (…) AND Hours IN (…)` — but that is **a genuinely different question**. It matches an employee who works on project 3 (like John) *and* works 20 hours (like John) — **even if those are two separate assignments** and no single row of theirs matches a single row of John's.
>
> **`(a, b) IN (…)` demands that the pair match together, in one row.** Two independent `IN` tests do not.

---

**Next:** comparing one value against a whole set — **ANY, ALL & SOME**.
