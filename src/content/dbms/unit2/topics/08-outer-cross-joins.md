---
subject: dbms
unit: 2
order: 8
slug: outer-cross-joins
title: Outer & Cross Joins
summary: Why outer joins exist at all, the left/right/full variants and their NULL padding, MySQL's missing FULL OUTER JOIN and the UNION workaround, and cross join as the bare Cartesian product.
minutes: 12
tags: [sql, outer-join, left-outer, right-outer, full-outer, cross-join, cartesian-product, null-padding, union]
---

# Outer & Cross Joins

## Why outer joins exist

> [!EXAM]
> An outer join is **an extension of the join operation that avoids loss of information** in certain cases.
>
> It **computes the join and then adds tuples from one relation that do not match tuples in the other relation** to the result of the join.
>
> **Even though the records from both tables are matched or not, the matching and non-matching records will be considered an output** of the outer join.
>
> **Three types:** Left Outer Join · Right Outer Join · Full Outer Join

> [!NOTE]
> The deck draws the three as Venn diagrams over two overlapping circles, `table1` and `table2`, with the **shaded region showing what the join returns**:
>
> | | Shaded |
> |---|---|
> | **LEFT JOIN** | **all of `table1`**, including the overlap — `table2`'s non-overlapping part is left white |
> | **RIGHT JOIN** | **all of `table2`**, including the overlap — `table1`'s non-overlapping part is left white |
> | **FULL OUTER JOIN** | **both circles entirely** |
>
> An **inner** join, by contrast, would shade only the lens where the two circles overlap.

> [!TRAP]
> The Venn picture is a good memory aid and a slightly misleading model, so do not lean on it too hard.
>
> Circles suggest **sets of rows being selected**. A join does something more than select — it **pairs rows and concatenates them**, and one left row matching three right rows produces **three output rows**. A Venn diagram cannot show that multiplication.
>
> Read the diagram as *"which side's non-matching rows are kept"* — which is exactly what it gets right — and not as a model of how many rows come out.

> [!INTUITION]
> The phrase **"avoids loss of information"** is the entire justification, and it is worth making concrete.
>
> An inner join answers *"which employees have a department?"* If an employee has no department — a new hire, an unassigned contractor — that row **matches nothing and disappears**. Count the result and you undercount your employees, silently.
>
> An outer join answers the more useful question: *"list all employees, **and** their department if they have one."*
>
> The tell in exam wording is **"all X, along with their Y (if any)"**, or any question asking you to **find the rows that have no match**. Both require an outer join.

## LEFT OUTER JOIN

> [!NOTE]
> In a `LEFT OUTER JOIN`, **every tuple in the left table must appear in the result. If it does not have a matching tuple, it is padded with NULL values for the attributes of the right table.**
>
> We get **all the records from the left table**, but **only those records from the right table which have a corresponding key in the left table**.
>
> ```sql
> SELECT TableName1.columnName1, TableName2.columnName2
> FROM   TableName1
> LEFT OUTER JOIN TableName2
>   ON   TableName1.ColumnName = TableName2.ColumnName;
> ```

```sql
SELECT e.Employee_ID, e.Employee_Name, e.Employee_Salary,
       d.DepartmentID, d.Department_Name
FROM   employee e
LEFT OUTER JOIN department d ON e.Employee_ID = d.Employee_ID;
```

Every employee appears. Those without a matching department row get **NULL** in `DepartmentID` and `Department_Name`.

> [!EXAM]
> **NULL padding is the mechanism.** An outer join manufactures NULLs that were never in the data — they mean *"no matching row existed,"* which is the third sense of NULL from the **NULL Values** topic: **not applicable**.
>
> Recall too that the NULL topic stated the exception explicitly: *when a JOIN condition is specified, tuples with NULL values for the join attributes are not included in the result* — **unless it is an OUTER JOIN**.

## RIGHT OUTER JOIN

> [!NOTE]
> In a `RIGHT OUTER JOIN`, **every tuple in the right table must appear in the result**; unmatched ones are **padded with NULL values for the attributes of the left table**. **Right outer join is the reverse of the left outer join.**

```sql
SELECT e.Employee_ID, e.Employee_Name, e.Employee_Salary,
       d.DepartmentID, d.Department_Name
FROM   employee e
RIGHT OUTER JOIN department d ON e.Employee_ID = d.Employee_ID;
```

> [!TRAP]
> **`A LEFT JOIN B` and `B RIGHT JOIN A` return the same rows.** Right outer join adds no expressive power whatsoever — it is pure convenience.
>
> Which is why most style guides say **write every outer join as LEFT**: if all your joins preserve the left side, you can read a long `FROM` chain top-to-bottom knowing the first table is the one being preserved. Mixing directions in one query is how people lose track of which rows survive.

## FULL OUTER JOIN

> [!NOTE]
> With a full outer join we get **all the records from both tables** — all the records from the left table **as well as** the right table, matched or not.

> [!EXAM]
> **MySQL doesn't support `FULL OUTER JOIN` directly.**
>
> To implement it in MySQL we **execute two queries in a single query**: the first a `LEFT OUTER JOIN`, the second a `RIGHT OUTER JOIN`, **combined with the `UNION` operator**.

```sql
SELECT e.Employee_ID, e.Employee_Name, e.Employee_Salary,
       d.DepartmentID, d.Department_Name
FROM   department d LEFT OUTER JOIN employee e ON e.Employee_ID = d.Employee_ID
UNION
SELECT e.Employee_ID, e.Employee_Name, e.Employee_Salary,
       d.DepartmentID, d.Department_Name
FROM   department d RIGHT OUTER JOIN employee e ON e.Employee_ID = d.Employee_ID;
```

And on the loan/borrower pair:

```sql
SELECT l.Loan_ID, l.Branch, l.Amount, b.CustID, b.CustName
FROM   Loan l LEFT OUTER JOIN Borrower b ON l.Loan_ID = b.Loan_ID
UNION
SELECT l.Loan_ID, l.Branch, l.Amount, b.CustID, b.CustName
FROM   Loan l RIGHT OUTER JOIN Borrower b ON l.Loan_ID = b.Loan_ID;
```

> [!DERIVE]
> **Why `UNION` and not `UNION ALL`.**
>
> Let $M$ be the matched rows, $L$ the left-only rows, $R$ the right-only rows.
>
> - The `LEFT` half produces $M \cup L$.
> - The `RIGHT` half produces $M \cup R$.
> - `UNION ALL` would give $M + L + M + R$ — **every matched row twice**.
> - `UNION` eliminates duplicates, giving $M \cup L \cup R$ — exactly the full outer join.
>
> The duplicate elimination is not incidental tidiness; **it is what makes the workaround correct.** Using `UNION ALL` here is a real bug, and a good exam question.
>
> This also explains why the two halves must select **identical column lists in identical order** — `UNION` requires union-compatibility, from the **set operations** topic.

## CROSS JOIN

> [!EXAM]
> - **Cross join returns the Cartesian Product.**
> - **It does not use a join condition (`ON …`)**, so it doesn't care about matching columns.
> - **Rows returned = (Rows in Table A) × (Rows in Table B)**
>
> The deck's example: `loan` has **8 rows**, `borrower` has **7 rows**, so
>
> $$8 \times 7 = \mathbf{56} \text{ rows}$$
>
> ```sql
> SELECT * FROM loan CROSS JOIN borrower;
> ```

> [!TRAP]
> **The most common cross join is an accidental one.** Writing

> ```sql
> SELECT * FROM loan, borrower;   -- no WHERE!
> ```

> is a cross join — the comma-separated `FROM` list forms the Cartesian product, and only a `WHERE` condition cuts it back down.
>
> On toy tables you get 56 rows and notice. On two tables of 100,000 rows you get **10 billion**, and the query does not return. **If a query hangs or returns absurdly many rows, count your join conditions first** — with $n$ tables you need $n-1$.

> [!INTUITION]
> Deliberate cross joins are rare but real: generating every (student, exam-slot) pairing to find unfilled slots, or building a calendar by crossing dates with locations. The giveaway is that you genuinely want **every combination**, not the ones that already exist.

## The join family at a glance

> [!EXAM]
> | Join | Condition | Unmatched left rows | Unmatched right rows |
> |---|---|---|---|
> | **CROSS** | none | — (all rows paired with all) | — |
> | **INNER / NATURAL** | explicit `ON` / implicit | **dropped** | **dropped** |
> | **LEFT OUTER** | explicit `ON` | **kept**, right side NULL-padded | dropped |
> | **RIGHT OUTER** | explicit `ON` | dropped | **kept**, left side NULL-padded |
> | **FULL OUTER** | explicit `ON` | **kept** | **kept** |
>
> Read the table as a single spectrum: **cross keeps every pairing, inner keeps only matches, and the outer joins choose which side's non-matches are worth preserving.**

---

**Next:** queries inside queries — **nested subqueries**.
