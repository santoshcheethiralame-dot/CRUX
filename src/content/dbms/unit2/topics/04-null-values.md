---
subject: dbms
unit: 2
order: 4
slug: null-values
title: NULL Values & Three-Valued Logic
summary: The three meanings SQL refuses to distinguish, why arithmetic and comparison both collapse to NULL and UNKNOWN, the full truth table for NOT/AND/OR, and the one place SQL treats two NULLs as equal.
minutes: 13
tags: [sql, null, three-valued-logic, unknown, is-null, is-unknown, distinct, outer-join]
---

# NULL Values & Three-Valued Logic

## Three meanings, one symbol

> [!EXAM]
> **Generally, NULL has one of three representations:**
>
> 1. **Unknown value** — the value **exists but is not known**, or it is not known whether or not the value exists. *Example: a person's date of birth is not known.*
> 2. **Unavailable or withheld value** — the value **exists but is purposely withheld**. *Example: a person might not want to disclose their date of birth.*
> 3. **Not applicable** — the attribute **does not apply to this tuple** or is undefined for it. *Example: `LastCollegeDegree` for a person who has no college degrees.*

> [!TRAP]
> **It is often not possible to determine the intended meaning of NULL. Hence SQL does not distinguish among the different meanings of NULL.**
>
> This is the root cause of everything awkward that follows. The three cases are logically quite different — "we don't know Ravi's birthday" and "Ravi has no degree" are not the same kind of statement — but SQL stores one symbol for all three and therefore cannot reason about them differently.
>
> The design lesson: if the distinction matters to your application, **encode it yourself** (a separate status column), because the database will not.

> [!NOTE]
> **In general, each individual NULL value is considered to be different from every other NULL value** in the various database records.
>
> NULL values present special problems in relational operations — including **arithmetic operations, comparison operations, and set operations**.

## NULL in arithmetic

> [!EXAM]
> **The result of an arithmetic operation (`+`, `-`, `*`, `/`) is NULL if any of the input values are NULL.**

```sql
SELECT Hours      FROM WORKS_ON;
SELECT Hours + 10 FROM WORKS_ON;   -- NULL + 10  ->  NULL
```

> [!INTUITION]
> The rule sounds harsh but it is the only defensible one. If you do not know how many hours someone worked, you do not know that number plus ten either. **NULL propagates because ignorance propagates.**
>
> This is why NULL is best read not as "zero" and not as "blank," but as **"I don't know."** Substitute that phrase into any expression and SQL's behaviour stops being surprising.

## NULL in comparisons — the third truth value

> [!EXAM]
> To handle comparisons involving NULL, a **third logical value UNKNOWN**, in addition to TRUE and FALSE, is used.
>
> - `(1 < NULL)` evaluates to **UNKNOWN**
> - `NOT(1 < NULL)` also evaluates to **UNKNOWN**
>
> **Any comparison operation involving NULL values results in UNKNOWN.**

> [!TRAP]
> Look hard at the second line. `NOT(UNKNOWN)` is **UNKNOWN**, not TRUE.
>
> In two-valued logic, if a condition is not true it must be false, so negating it flips the answer. With NULLs that reasoning fails: negating "I don't know" leaves you still not knowing. **The law of excluded middle does not hold in SQL.**

## The three-valued truth table

> [!EXAM]
> **(a) AND**
>
> | AND | TRUE | FALSE | UNKNOWN |
> |---|---|---|---|
> | **TRUE** | TRUE | FALSE | UNKNOWN |
> | **FALSE** | FALSE | FALSE | **FALSE** |
> | **UNKNOWN** | UNKNOWN | **FALSE** | UNKNOWN |
>
> **(b) OR**
>
> | OR | TRUE | FALSE | UNKNOWN |
> |---|---|---|---|
> | **TRUE** | TRUE | TRUE | **TRUE** |
> | **FALSE** | TRUE | FALSE | UNKNOWN |
> | **UNKNOWN** | **TRUE** | UNKNOWN | UNKNOWN |
>
> **(c) NOT**
>
> | NOT | |
> |---|---|
> | **TRUE** | FALSE |
> | **FALSE** | TRUE |
> | **UNKNOWN** | **UNKNOWN** |

> [!INTUITION]
> You do not need to memorise 21 cells. Two rules generate the whole table:
>
> - **`FALSE AND anything = FALSE`** — one false conjunct sinks the whole conjunction, even if the other is unknown. You do not need to resolve the unknown to know the answer.
> - **`TRUE OR anything = TRUE`** — one true disjunct carries the whole disjunction for the same reason.
>
> Everywhere else, an UNKNOWN operand leaves the result UNKNOWN. These are the **absorbing elements**: FALSE absorbs AND, TRUE absorbs OR. Every other cell is just ordinary two-valued logic.

## How UNKNOWN behaves in a query

> [!EXAM]
> - **If the `WHERE` predicate evaluates to FALSE *or* UNKNOWN for a tuple, the tuple is not added to the result.**
> - When a **JOIN** condition is specified, **tuples with NULL values for the join attributes are not included in the result** — *unless it is an OUTER JOIN*.

> [!TRAP]
> **`WHERE` treats UNKNOWN exactly like FALSE — it keeps only rows that are definitely TRUE.**
>
> This produces the most-reported NULL surprise. Run `WHERE Salary > 50000` and then `WHERE Salary <= 50000`, and the two results **do not add up to the whole table**: every employee with a NULL salary is missing from both, because both comparisons returned UNKNOWN.
>
> The rows did not go anywhere. They simply failed to be *definitely* true either way.

## Testing for NULL: IS NULL

> [!NOTE]
> SQL uses the comparison operators **`IS`** and **`IS NOT`** to check whether an attribute value is NULL.

**Example:** Retrieve the names of all employees who do not have supervisors.

```sql
SELECT Fname, Lname FROM EMPLOYEE WHERE Super_ssn IS NULL;
```

> [!TRAP]
> **`WHERE Super_ssn = NULL` returns nothing at all** — not an error, just an empty result, which is far more dangerous.
>
> `= NULL` is a comparison, and every comparison with NULL yields UNKNOWN, and `WHERE` discards UNKNOWN. You **must** write `IS NULL`.

## Testing the comparison itself: IS UNKNOWN

> [!NOTE]
> SQL allows us to test whether the **result of a comparison** is UNKNOWN, rather than TRUE or FALSE, using the clauses **`IS UNKNOWN`** and **`IS NOT UNKNOWN`**.

**Example:** Retrieve the SSN and project numbers where the condition `Hours > 10` is unknown.

```sql
SELECT Essn, Pno FROM WORKS_ON WHERE Hours > 10 IS UNKNOWN;
```

**Only those tuples whose `Hours` attribute value is NULL** will return UNKNOWN on performing the comparison.

## The exception: NULL in DISTINCT and set operations

> [!EXAM]
> When a query uses `SELECT DISTINCT`, duplicate tuples are eliminated. For this purpose, values of corresponding attributes are **treated as identical if either both are non-NULL and equal in value, or both are NULL**.
>
> For example, the tuples **(`'A'`, NULL)** and **(`'A'`, NULL)** are **treated as identical**, and `DISTINCT` retains only one copy.
>
> **The same approach is used for the set operations `UNION`, `INTERSECT` and `EXCEPT`.**

> [!TRAP]
> **This is the one place SQL contradicts itself, and the deck flags it explicitly:**
>
> > *"Treatment of NULL above is different from the way NULL values are treated in predicates, where a comparison `NULL = NULL` would return UNKNOWN, rather than TRUE."*
>
> So the same two NULLs are **not equal** in a `WHERE` clause but **are the same** for duplicate elimination. There is no unifying principle — it is a pragmatic decision, because a `DISTINCT` that could not collapse repeated NULLs would be useless.
>
> Memorise it as an exception, because deriving it will lead you the wrong way.

---

**Next:** summarising many rows into one — **aggregate functions**.
