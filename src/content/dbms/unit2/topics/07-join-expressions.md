---
subject: dbms
unit: 2
order: 7
slug: join-expressions
title: Join Expressions — Natural & Inner
summary: What a join actually is in terms of the Cartesian product, natural join's implicit equijoin on same-named columns and the risk that carries, and inner join with an explicit ON predicate.
minutes: 12
tags: [sql, join, natural-join, inner-join, equijoin, on-clause, cartesian-product]
---

# Join Expressions — Natural & Inner

> [!EXAM]
> - **Join operations take two relations and return as a result another relation.**
> - **A join operation is a Cartesian product that requires tuples in the two relations to match (under some conditions).**
> - It also **specifies the attributes that are present in the result** of the join.
> - Join operations are typically used as **subquery expressions in the `FROM` clause**.
>
> **Types of joins:** Natural join · Inner join · Outer join · Cross join

> [!INTUITION]
> The definition *"a Cartesian product that requires tuples to match"* is the one to hold on to, because it tells you what a join **costs** and what it **loses**.
>
> Conceptually every join starts by pairing every row of $R$ with every row of $S$ — all $|R| \times |S|$ combinations — and then throws away the pairs that fail the condition. (Real engines never do this literally; they use indexes and hash tables. But the *semantics* are defined this way.)
>
> Two consequences follow immediately. **Forget the condition and you get the full product** — this is why a missing join condition inflates results so catastrophically. And **rows that match nothing simply vanish**, which is exactly the loss that outer joins exist to prevent.

## Natural join

> [!NOTE]
> A **natural join** creates an **implicit join** by combining tables **based on columns with the same name and data type**.
>
> - In a `NATURAL JOIN` on relations $R$ and $S$, **no join condition is specified**.
> - An **implicit EQUIJOIN condition is created for each pair of attributes with the same name** from $R$ and $S$.
> - **Each such pair of attributes is included only once** in the resulting relation.
> - If the names of the join attributes are not the same in the base relations, it is possible to **rename** the attributes so that they match, and then apply `NATURAL JOIN`.

> [!EXAM]
> **Points to remember:**
> - There is **no need to specify the column names** for natural join.
> - The resultant table **always contains unique columns**.
> - It is possible to perform a natural join on **more than two tables**.
> - **Do not use the `ON` clause.**
>
> ```sql
> SELECT [column_names | *]
> FROM   table_name1
> NATURAL JOIN table_name2;
> ```

**Example:** List the employees along with their department names.

```sql
SELECT employee_name, employee_salary, Department_name
FROM   employee NATURAL JOIN Department;
```

Natural join chains across several tables:

```sql
SELECT CustName, CustID, amount, mobile, address
FROM   Borrower NATURAL JOIN loan NATURAL JOIN cust_info;
```

> [!TRAP]
> **Natural join is convenient and genuinely dangerous.** It joins on *every* pair of same-named columns, and it decides which those are by reading the schema — not by reading your intention.
>
> Two failure modes:
>
> - **An accidental extra match.** If both tables happen to carry a `Name` or a `Created_date` column, natural join silently adds it to the join condition and your result quietly shrinks to near-nothing.
> - **A schema change breaks a query that was never edited.** Add a column to one table that coincidentally matches a name in the other, and a working query starts returning wrong answers — with no error.
>
> This is why production code overwhelmingly prefers explicit `INNER JOIN … ON`. The join condition should be **stated**, not **inferred**.

## Inner join

> [!NOTE]
> **SQL Inner Join** combines records from two related tables and **selects the rows depending on the condition (the join predicate)**.
>
> - It **compares each row of the first table with each row of the second table** to find all pairs of rows that satisfy the join predicate.
> - When the join predicate is satisfied, **column values for each matched pair of rows of both tables are combined into a result row**.

> [!EXAM]
> - **The inner join is the default join** — even if the keyword `JOIN` is used instead of `INNER JOIN`, tables are joined using matching records of common columns by default.
> - It is **the most important and frequently used join in SQL**, and is **also referred to as an Equijoin**.

**Example:** Inner join on the employee and department tables.

```sql
SELECT e.Employee_ID, e.Employee_Name, e.Employee_Salary,
       d.DepartmentID, d.Department_Name
FROM   employee e
INNER JOIN department d ON e.Employee_ID = d.Employee_ID;
```

**Example:** The loan and borrower tables, using the bare `JOIN` keyword:

```sql
SELECT l.Loan_ID, l.Branch, l.Amount, b.CustID, b.CustName
FROM   Loan l JOIN Borrower b ON l.Loan_ID = b.Loan_ID;
```

## Natural vs inner — the exam comparison

> [!EXAM]
> | | NATURAL JOIN | INNER JOIN |
> |---|---|---|
> | **Join condition** | **Automatic** — finds same-named columns | **Explicit** — you must write `ON` |
> | **`ON` clause** | Must **not** be used | **Required** |
> | **Control** | None; inferred from the schema | Full control over the condition |
> | **Duplicate columns** | Matching columns appear **only once** | **All columns from both tables** appear |
> | **Also called** | — | The **default join**; **Equijoin** |

> [!INTUITION]
> The row about duplicate columns is the one students under-rate, and it has a practical consequence.
>
> After a natural join, the shared column exists **once** and is unqualified — you write `Employee_ID`. After an inner join it exists **twice**, so `SELECT *` shows it twice and referring to it bare is **ambiguous**; you must write `e.Employee_ID` or `d.Employee_ID`.
>
> That is the real reason inner-join examples are always written with table aliases (`employee e`, `department d`) while natural-join examples are not.

> [!TRAP]
> **"Inner join is also referred to as an equijoin" is a simplification the deck states and exams repeat, so give it back — but know the nuance.**
>
> Strictly, an **equijoin** is a join whose condition uses **only equality**. An inner join may use any predicate: `ON e.Salary > d.Budget_threshold` is a perfectly legal inner join and is *not* an equijoin (it is a *theta-join*).
>
> Equality is simply what almost every real join uses, because joins normally follow foreign keys. Answer as the deck does, and add the distinction if the question asks for precision.

---

**Next:** the joins that keep unmatched rows, and the one with no condition at all — **outer & cross joins**.
