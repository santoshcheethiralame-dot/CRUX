---
subject: dbms
unit: 2
order: 6
slug: join-expressions
title: Join Expressions
summary: Natural, inner, outer (left/right/full) and cross joins — how join type decides which non-matching rows survive and join condition decides how rows match, plus MySQL's missing FULL OUTER JOIN.
minutes: 13
tags: [sql, join, natural-join, outer-join, cross-join]
---

# Join Expressions

A **join** combines rows from two relations. Two independent choices define it:
- **Join type** — which *non-matching* rows are kept (inner vs the outer joins).
- **Join condition** — how rows are matched (`NATURAL`, `ON`, `USING`).

## Natural Join

Matches rows that are **equal on all attributes sharing the same name**, and keeps only **one copy** of each common column.

```sql
SELECT name, course_id FROM student NATURAL JOIN takes;   -- joins on ID
```

> [!TRAP]
> Natural join silently joins on **every** common column name. If two tables accidentally share an extra column (e.g. both `instructor` and `course` have `dept_name`), it adds an unwanted equality and **drops correct rows**. This is Silberschatz Practice Exercise 4.1's bug. Prefer `JOIN ... USING (ID)` to name exactly which columns to match, or an explicit `ON`.

## Inner Join

Keeps only matching rows; drops unmatched rows from both sides. `JOIN` alone means `INNER JOIN`.

```sql
SELECT * FROM student JOIN takes ON student.ID = takes.ID;   -- ON: any predicate
SELECT * FROM student JOIN takes USING (ID);                 -- USING: named common cols
```

`ON` allows any condition (ranges, inequalities); `USING (cols)` is like natural join but restricted to the listed columns.

## Outer Joins

Preserve rows that an inner join would discard, padding the missing side with **NULL**.

| Join | Keeps every row of… |
|---|---|
| `LEFT OUTER JOIN` | the **left** table |
| `RIGHT OUTER JOIN` | the **right** table |
| `FULL OUTER JOIN` | **both** tables |

```sql
-- Every student, even those with no enrolment (takes columns become NULL)
SELECT * FROM student LEFT OUTER JOIN takes ON student.ID = takes.ID;
```

> [!INTUITION]
> Outer joins answer "…**and also** show the ones with no match." A `LEFT JOIN` + `WHERE right.key IS NULL` is the standard idiom for **anti-joins** — "students who took *no* course" (Silberschatz Exercise 4.16): the unmatched rows are exactly the ones with NULLs on the right.

## MySQL and FULL OUTER JOIN

> [!EXAM]
> **MySQL does not support `FULL OUTER JOIN`.** Simulate it by unioning a LEFT and a RIGHT join:
> ```sql
> SELECT * FROM A LEFT  JOIN B ON A.id = B.id
> UNION
> SELECT * FROM A RIGHT JOIN B ON A.id = B.id;
> ```
> `UNION` (not `UNION ALL`) removes the duplicated matched rows.

## Cross Join

The **Cartesian product** — every row of A paired with every row of B, no condition.

```sql
SELECT * FROM teacher CROSS JOIN subject;   -- identical to: FROM teacher, subject
```

Result degree = $n + m$ columns; cardinality = $|A| \times |B|$. Almost always meant to be followed by a `WHERE`/`ON` that turns it into an inner join.

> [!NOTE]
> `FROM A, B WHERE A.id = B.id` (the comma form) is just a cross join plus a selection — exactly an inner join. The explicit `JOIN ... ON` syntax is preferred: it separates the *join* condition from the *filter* condition and is harder to get wrong.

---

**Next:** queries inside queries — **nested subqueries**.
