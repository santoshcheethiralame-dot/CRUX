---
subject: dbms
unit: 2
order: 12
slug: correlated-subqueries-exists
title: Correlated Subqueries & EXISTS
summary: What makes a subquery correlated and why that changes how it is evaluated, the rule that IN and equality nesting can always be flattened to a single block, and EXISTS and NOT EXISTS as the tests for emptiness.
minutes: 12
tags: [sql, correlated-subquery, exists, not-exists, unique, flattening, join-equivalence]
---

# Correlated Subqueries & EXISTS

## What makes a subquery correlated

> [!EXAM]
> A **correlated nested query** is a nested query in which **the `WHERE` clause references attributes of a relation declared in the outer query**.
>
> **A correlated nested query is evaluated once for each tuple (or combination of tuples) of the relation in the outer query.**

**Example:** Retrieve the name of each employee who has a dependent **of the same gender as the employee**.

```sql
SELECT E.Fname, E.Lname
FROM   EMPLOYEE AS E
WHERE  E.Ssn IN ( SELECT D.Essn FROM DEPENDENT AS D
                  WHERE E.Gender = D.Gender );
```

The reference to **`E.Gender`** — a column of the *outer* query's table — is what makes this correlated.

> [!NOTE]
> **How it works:** for each `EMPLOYEE` tuple, the nested query is evaluated, and the `Essn` values of all `DEPENDENT` tuples **with the same Gender as that EMPLOYEE tuple** are retrieved. If the `Ssn` value of the `EMPLOYEE` tuple is in that result, the tuple is selected.

> [!INTUITION]
> This is the dividing line between the two kinds of subquery, and the whole difference follows from **whether the inner query mentions an outer column**:
>
> | | Non-correlated | Correlated |
> |---|---|---|
> | **References outer columns?** | No | **Yes** |
> | **Evaluated** | **Once**, before the outer query | **Once per outer row** |
> | **Reasoning model** | Substitute its result as a constant | A **nested loop** |
>
> A non-correlated subquery is a **constant**; a correlated one is a **function of the current row**. That is why you can hand-evaluate the first by substitution (as in the Smith example) but must trace the second row by row.
>
> It also explains the cost. A correlated subquery is conceptually a nested loop — outer rows × inner scan — so it can be far more expensive. (Real optimisers often rewrite it into a join; the *semantics* remain the loop.)

## Flattening: correlation is not always necessary

> [!EXAM]
> **In general, a query written with nested SELECT-FROM-WHERE blocks and using the `=` or `IN` comparison operators can always be expressed as a single block query.**

The correlated query above is equivalent to a plain join:

```sql
SELECT E.Fname, E.Lname
FROM   EMPLOYEE AS E, DEPENDENT AS D
WHERE  E.Ssn = D.Essn AND E.Gender = D.Gender;
```

> [!TRAP]
> Read the guarantee precisely: it covers nesting that uses **`=` or `IN`**. It is **not** a claim that *every* nested query can be flattened.
>
> Nesting with **`NOT IN`**, **`NOT EXISTS`**, or a **universal condition** ("works on *all* projects") generally **cannot** be rewritten as a single flat block — which is exactly why the next topic exists.
>
> There is also a subtle difference even when flattening is legal: **a join can produce duplicates that the `IN` version would not.** If an employee had two same-gender dependents, the join returns that employee **twice**; `IN` tests membership once and returns them once. Add `DISTINCT` to the join form when this matters.

## EXISTS and NOT EXISTS

> [!EXAM]
> **`EXISTS` and `UNIQUE` are Boolean functions that can be used in the `WHERE` clause.**
>
> The **`EXISTS`** function is used to **check whether the result of a nested query is empty (contains no tuples) or not**:
> - **True** if the nested query result contains **at least one tuple**
> - **False** if the nested query result contains **no tuples**
>
> **`NOT EXISTS`** returns **True if there are no tuples** in the result, and **False if there is at least one**.
>
> **`EXISTS` and `NOT EXISTS` are typically used in conjunction with a correlated nested query.**

> [!INTUITION]
> That last line is not a coincidence — it is a near-necessity. A **non**-correlated `EXISTS` is useless: the inner query gives the same answer for every outer row, so the whole `WHERE` clause is either True for all rows or False for all rows.
>
> `EXISTS` only earns its keep when the inner query **changes per outer row**, which means it must reference an outer column. **EXISTS and correlation are natural partners.**

### EXISTS — same example, different tool

```sql
SELECT E.Fname, E.Lname FROM EMPLOYEE AS E
WHERE  EXISTS ( SELECT * FROM DEPENDENT AS D
                WHERE E.Ssn = D.Essn AND E.Gender = D.Gender );
```

For each `EMPLOYEE` tuple the nested query returns all `DEPENDENT` tuples with the same `Essn` and `Gender`. **If at least one tuple exists in the result, the `EMPLOYEE` tuple is selected.**

> [!NOTE]
> Note the **`SELECT *`** inside. With `EXISTS`, *what* the subquery selects is irrelevant — only **whether it returns any rows** matters. `SELECT *`, `SELECT 1`, `SELECT Essn` all behave identically.

### NOT EXISTS — finding absence

**Example:** Retrieve the names of employees who have **no dependents**.

```sql
SELECT Fname, Lname FROM EMPLOYEE
WHERE  NOT EXISTS ( SELECT * FROM DEPENDENT WHERE Ssn = Essn );
```

For each `EMPLOYEE` tuple the correlated nested query selects all `DEPENDENT` tuples whose `Essn` matches the employee's `Ssn`. **If the result is empty (i.e. no dependents), the `EMPLOYEE` tuple is selected**, as the `WHERE` condition evaluates to True.

> [!TRAP]
> **`NOT EXISTS` is NULL-safe; `NOT IN` is not.** This is the practical reason to prefer it.
>
> `NOT IN` on a subquery containing a NULL returns **no rows at all** (see **Nested Subqueries**), because the comparison chain collapses to UNKNOWN. `NOT EXISTS` asks only *"did the subquery produce rows?"* — a question with a definite yes/no answer regardless of what is inside those rows.
>
> Same intent, silently different behaviour on real data. When the column may be nullable, **write `NOT EXISTS`.**

### Combining two EXISTS

**Example:** List the names of **managers who have at least one dependent**.

```sql
SELECT Fname, Lname FROM EMPLOYEE
WHERE  EXISTS ( SELECT * FROM DEPENDENT  WHERE Ssn = Essn )
  AND  EXISTS ( SELECT * FROM DEPARTMENT WHERE Ssn = Mgr_ssn );
```

The first nested query selects the `DEPENDENT` tuples related to the employee; the second selects the `DEPARTMENT` tuples **managed by** that employee. **The `EMPLOYEE` tuple is selected only if both nested queries return at least one tuple each** — one condition encoding "has a dependent", the other encoding "is a manager".

> [!INTUITION]
> This is the pattern to recognise for any question of the form *"who satisfies several independent existence conditions?"*
>
> Doing it with joins instead would require joining `EMPLOYEE` to both `DEPENDENT` and `DEPARTMENT`, which **multiplies rows**: a manager of one department with three dependents appears three times. Chained `EXISTS` clauses are **filters, not multipliers** — they test each employee once and never change the row count.

---

**Next:** the queries that genuinely need `NOT EXISTS` — **relational division**.
