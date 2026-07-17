---
subject: dbms
unit: 2
order: 1
slug: additional-sql-operations
title: Additional Basic SQL Operations
summary: The SELECT-FROM-WHERE block revisited — DISTINCT, arithmetic in SELECT, the WHERE predicate, ORDER BY, renaming with AS, and string matching with LIKE.
minutes: 11
tags: [sql, select, distinct, order-by, like, string-matching]
---

# Additional Basic SQL Operations

Unit 1 introduced SQL's data definition (DDL) and the basic query shape. Unit 2 begins by sharpening the everyday retrieval block before moving to the advanced features.

## The SELECT-FROM-WHERE block

```sql
SELECT  A1, A2, ..., An      -- projection: which columns
FROM    r1, r2, ..., rm      -- relations: Cartesian product if more than one
WHERE   P;                   -- selection: which rows
```

> [!INTUITION]
> Read it bottom-up, not top-down. **FROM** forms the working table (product of all listed relations), **WHERE** throws away rows that fail the predicate, and **SELECT** picks/derives the surviving columns. SQL's keyword order (SELECT first) is the *opposite* of its evaluation order.

- `SELECT *` returns every attribute of the FROM relations.
- The SELECT list may contain **arithmetic expressions**: `SELECT salary * 1.1 FROM instructor;` shows a 10% raise *in the result only* — the stored data is untouched.
- Keywords and identifiers are **case-insensitive**; string *literals* (`'Smith'`) are case-sensitive.

## DISTINCT — removing duplicates

SQL relations are **multisets**: duplicate rows are allowed by default (this is `ALL`). Use `DISTINCT` to force set semantics.

```sql
SELECT DISTINCT dept_name FROM instructor;   -- each department once
SELECT ALL      dept_name FROM instructor;   -- keep duplicates (default)
```

## The WHERE clause

A predicate built from comparison operators (`=, <>, <, >, <=, >=`) joined with **AND / OR / NOT**.

```sql
SELECT name FROM instructor
WHERE dept_name = 'Comp. Sci.' AND salary > 70000;

SELECT name FROM instructor
WHERE salary BETWEEN 90000 AND 100000;       -- inclusive range
```

## ORDER BY — sorting the result

```sql
SELECT * FROM instructor ORDER BY salary DESC;          -- highest first
SELECT * FROM instructor ORDER BY dept_name, salary DESC; -- dept asc, ties by salary desc
```

> [!EXAM]
> **ASC is the default** sort direction — `ORDER BY salary` is ascending. Multiple sort keys are applied left-to-right: the second key only breaks ties of the first.

## Renaming with AS

```sql
SELECT name AS instructor_name, salary/12 AS monthly_pay
FROM instructor AS T;        -- T is a tuple variable (alias) for instructor
```

The keyword `AS` is optional (`instructor T` works too). Renaming a *relation* creates a **tuple variable / correlation name** — indispensable for **self-joins** and **correlated subqueries** (later topics).

## String matching with LIKE

`LIKE` does pattern matching with two wildcards:

| Wildcard | Matches |
|---|---|
| `%` | any substring — **zero or more** characters |
| `_` | **exactly one** character |

```sql
SELECT name FROM course WHERE title LIKE 'Intro%';   -- begins with "Intro"
SELECT name FROM course WHERE title LIKE '%Comp%';   -- contains "Comp"
SELECT name FROM dept   WHERE dname LIKE '___';      -- exactly 3 characters
```

| Pattern | Meaning |
|---|---|
| `'Intro%'` | starts with "Intro" |
| `'%data%'` | contains "data" anywhere |
| `'_ _ _'` (three `_`) | exactly 3 characters |
| `'_ _ _%'` | at least 3 characters |

- Escape a literal `%` or `_` with `ESCAPE`: `LIKE 'ab\%' ESCAPE '\'`.
- Other handy string functions: `CONCAT`, `UPPER`, `LOWER`, `SUBSTRING`, `LENGTH`, `TRIM`.

> [!TRAP]
> Mixing up `%` and `_` is the classic LIKE error. `_` is **one** character, `%` is **any number** (including none). `LIKE '_'` matches single-character strings only.

> [!NOTE]
> `LIKE` is **case-sensitive** in most systems. For case-insensitive matching, normalise both sides: `WHERE lower(dname) LIKE '%sci%'` (Silberschatz Practice Exercise 3.6).

---

**Next:** combining query results with **set operations** — UNION, INTERSECT, EXCEPT.
