---
subject: dbms
unit: 2
order: 2
slug: where-order-string-ops
title: WHERE, ORDER BY & String Operations
summary: The row filter and its logical connectives, sorting with ASC and DESC and the default nobody states, then LIKE pattern matching with the percent and underscore wildcards and the ESCAPE clause.
minutes: 11
tags: [sql, where, order-by, asc, desc, like, wildcard, escape, pattern-matching]
---

# WHERE, ORDER BY & String Operations

## The WHERE clause

> [!NOTE]
> The `WHERE` clause **specifies conditions that the result must satisfy** — it is the **row filter**. It corresponds to the **selection predicate** of relational algebra.

**Example:** Find all employees in department no 5.

```sql
SELECT Fname, Dno FROM EMPLOYEE WHERE Dno = 5;
```

> [!EXAM]
> **SQL allows the use of the logical connectives `AND`, `OR` and `NOT`.**
>
> The operands of the logical connectives can be expressions involving the comparison operators:
>
> **`<` · `<=` · `>` · `>=` · `=` · `<>`**
>
> and **comparisons can be applied to the results of arithmetic expressions**.

Note that SQL's "not equal to" is **`<>`**, not `!=` (though most implementations accept both).

**Example:** Find all employees in department no 5 with salary less than \$70,000.

```sql
SELECT Fname, Salary FROM EMPLOYEE
WHERE  Dno = 5 AND Salary < 70000;
```

> [!TRAP]
> Everything on this page assumes the compared values **are not NULL**. The moment a NULL enters a comparison, the result is neither TRUE nor FALSE but **UNKNOWN**, and the row silently disappears from the result.
>
> That is a large enough subject to get its own topic — see **NULL Values & Three-Valued Logic**. Keep it in mind here: a `WHERE` clause is not a two-valued filter in real data.

## ORDER BY

> [!NOTE]
> The main function of the `ORDER BY` clause is to **sort the result in either ascending or descending order**. Sorting the result **requires** an `ORDER BY` clause.
>
> - **`ASC`** — sorting results in **ascending** order
> - **`DESC`** — sorting results in **descending** order
>
> **If we do not place either "ASC or DESC" at the end of the query, the data is sorted in ascending order by default.**

```sql
-- highest paid first
SELECT Fname, Lname, Salary FROM EMPLOYEE ORDER BY Salary DESC;

-- lowest paid first (ASC is the default, so it could be omitted)
SELECT Fname, Lname, Salary FROM EMPLOYEE ORDER BY Salary ASC;
```

The deck notes `ORDER BY` **can be used with SQL aggregate functions, the `HAVING` clause, or the `GROUP BY` clause** — it is applied last, to whatever the query finally produces.

> [!EXAM]
> **`ASC` is the default.** This is a favourite one-mark question, and it is easy to get wrong precisely because almost nobody writes `ASC` explicitly.

> [!TRAP]
> Without `ORDER BY`, **the order of rows in a result is not guaranteed** — not even to be stable between two runs of the same query.
>
> Rows often *appear* to come back in insertion order or primary-key order, which teaches the dangerous habit of relying on it. The DBMS is free to change plan, use an index, or parallelise, and the order changes with it.
>
> If order matters, say so. There is no "natural" order in a relation.

> [!INTUITION]
> Sorting is genuinely expensive — roughly $O(n \log n)$ on the result size, and on a large result it may have to spill to disk. `ORDER BY` is therefore the one clause you should drop when you do not actually need it, and the one to look at first when a query is slow.
>
> The reason it is applied *last* also matters: sorting happens on the **final result**, after filtering and grouping have already cut the data down. Sorting first would be wasted work.

## String operations

> [!NOTE]
> SQL includes a **string-matching operator for comparisons on character strings**. The operator **`LIKE`** uses patterns described using **two special characters**:
>
> | Wildcard | Matches |
> |---|---|
> | **percent `%`** | **any substring** (including the empty one) |
> | **underscore `_`** | **any single character** |

**Example:** Retrieve all employees whose address is in Houston, Texas.

```sql
SELECT Fname, Lname FROM EMPLOYEE
WHERE  Address LIKE '%Houston,TX%';
```

The `%` on both sides means *"Houston,TX appearing anywhere in the address"* — there may be a house number before it and a postcode after it.

**Example:** Find all employees who were born during the 1960s.

```sql
SELECT Fname, Lname, Bdate FROM EMPLOYEE
WHERE  Bdate LIKE '196_______';
```

> [!INTUITION]
> That second query is the clean illustration of why the **two wildcards are not interchangeable**.
>
> `Bdate` is a fixed-width date string. `'196'` pins the decade, and each `_` after it reserves **exactly one** character position — so the pattern matches strings of that exact length beginning with 196.
>
> Writing `'196%'` instead would also match `1960s-era` free text, or a longer malformed value. **`%` says "anything, any length"; `_` says "exactly one character, I don't care which."** Use `_` whenever the position and width are known — it is the more precise instrument.

### The ESCAPE clause

What if you want to search for a literal `%` — say, the string `"100%"`? Written naively, the `%` would be read as the wildcard and match everything.

> [!EXAM]
> **Match the string "100%" as** `LIKE '100 \%' ESCAPE '\'` — here we use **backslash (`\`) as an escape character**.
>
> The character named in `ESCAPE` cancels the special meaning of the wildcard that follows it, so `\%` means *a literal percent sign*.

> [!TRAP]
> `LIKE` is a **character-by-character pattern match, not a search**. It has no notion of words, relevance, or ranking, and a leading `%` usually prevents an index from being used at all — which is why it degrades badly on large text.
>
> This is precisely the gap that the last topic of the unit, **Full-Text Search**, exists to fill: `MATCH … AGAINST` uses a dedicated FULLTEXT index, detects word boundaries (so "cat" does not match "concatenate"), and ranks results by relevance. `LIKE` does none of those.

---

**Next:** combining whole query results rather than filtering one — **set operations**.
