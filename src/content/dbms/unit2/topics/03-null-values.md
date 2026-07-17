---
subject: dbms
unit: 2
order: 3
slug: null-values
title: NULL Values & Three-Valued Logic
summary: How SQL handles unknown/missing data — NULL in arithmetic and comparisons, the TRUE/FALSE/UNKNOWN truth tables, IS NULL / IS UNKNOWN, and NULL under DISTINCT.
minutes: 11
tags: [sql, null, three-valued-logic, unknown, is-null]
---

# NULL Values & Three-Valued Logic

`NULL` is SQL's marker for a value that is **unknown**, **unavailable**, or **inapplicable**. It is *not* zero and *not* the empty string — it is the absence of a value, and it forces SQL into a **three-valued logic**.

## NULL in arithmetic

Any arithmetic expression involving NULL yields **NULL**.

```text
5 + NULL   →  NULL
NULL * 10  →  NULL
salary + bonus   →  NULL  if bonus is NULL
```

## NULL in comparisons

Any comparison with NULL yields a third truth value: **UNKNOWN** (neither TRUE nor FALSE).

```text
5 < NULL      →  UNKNOWN
NULL = NULL   →  UNKNOWN     -- a NULL is not even "equal" to itself!
```

## Three-valued logic

Boolean connectives extend to TRUE (T), FALSE (F), and UNKNOWN (U):

| AND | T | F | U |
|---|---|---|---|
| **T** | T | F | U |
| **F** | F | F | F |
| **U** | U | F | U |

| OR | T | F | U |
|---|---|---|---|
| **T** | T | T | T |
| **F** | T | F | U |
| **U** | T | U | U |

| NOT | |
|---|---|
| **T** | F |
| **F** | T |
| **U** | U |

> [!INTUITION]
> Think of UNKNOWN as "could be either." `F AND U = F` because *false-and-anything* is false; `T OR U = T` because *true-or-anything* is true. But `T AND U = U` and `F OR U = U` — the unknown operand decides the outcome, so the result stays unknown.

## WHERE and UNKNOWN

> [!EXAM]
> A `WHERE` clause **keeps a row only if the predicate is TRUE.** Rows for which it is **FALSE *or* UNKNOWN are discarded.** So `WHERE salary > 50000` silently drops every row whose salary is NULL.

## Testing for NULL

Because `= NULL` always gives UNKNOWN (never TRUE), you can never find nulls with `=`. Use the dedicated predicates:

```sql
SELECT name FROM instructor WHERE salary IS NULL;       -- correct
SELECT name FROM instructor WHERE salary IS NOT NULL;
-- WHERE salary = NULL  →  returns NOTHING (always UNKNOWN)
```

- `IS UNKNOWN` / `IS NOT UNKNOWN` test whether a whole predicate evaluated to unknown.

## NULL under DISTINCT and grouping

> [!TRAP]
> Here SQL **contradicts itself on purpose.** For *comparison*, two NULLs are **not equal** (UNKNOWN). But for `DISTINCT`, `GROUP BY`, `UNION`, and duplicate-elimination, two NULLs are treated as **the same value (equal)**. So `SELECT DISTINCT salary` collapses all NULL salaries into a **single** NULL row.

Worked example — table `T`:

| Col1 | Col2 |
|---|---|
| A | NULL |
| A | NULL |
| B | 10 |
| B | 10 |
| C | 20 |

```sql
SELECT DISTINCT Col1, Col2 FROM T;
```

| Col1 | Col2 |
|---|---|
| A | NULL |
| B | 10 |
| C | 20 |

> [!INTUITION]
> `('A', NULL)` appears **once**, even though two such rows existed — because DISTINCT must decide whether two tuples are "the same", and it does so by treating two NULLs as identical. This equality rule fires **only** for DISTINCT / `UNION` / `INTERSECT` / `EXCEPT`; in a `WHERE`/`ON` predicate, `NULL = NULL` is still **UNKNOWN**.

## Why nulls appear

Common reasons (Silberschatz Exercise 3.19): the value is **genuinely unknown** (we don't know an employee's phone), or **not applicable** (a `middle_name` for someone without one). Aggregate handling of NULL is covered in the next topic.

---

**Next:** summarising data with **aggregate functions**.
