---
subject: dbms
unit: 2
order: 1
slug: additional-sql-operations
title: SELECT, FROM & DISTINCT
summary: The SELECT-FROM-WHERE block as the unit's foundation — what each clause corresponds to in relational algebra, why SQL keeps duplicates by default and what DISTINCT costs, arithmetic expressions inside SELECT, and renaming with AS.
minutes: 11
tags: [sql, select, from, distinct, multiset, arithmetic, as-clause, rename]
---

# SELECT, FROM & DISTINCT

Unit 1 introduced SQL's data definition (DDL) and the basic query shape. Unit 2 — **Advanced SQL** — begins by sharpening the everyday retrieval block, because every advanced feature later in the unit is built on top of it.

## The SELECT-FROM-WHERE structure

Every SQL query is fundamentally these three clauses:

```sql
SELECT   <attributes>     -- what columns come out
FROM     <relations>      -- which tables go in
WHERE    <condition>      -- which rows survive
```

> [!EXAM]
> Each clause maps onto a relational-algebra operator, and the deck states the correspondence explicitly:
>
> | SQL clause | Relational algebra | Job |
> |---|---|---|
> | **SELECT** | **Projection** $\Pi$ | Lists the attributes desired in the result |
> | **FROM** | **Cartesian product** $\times$ | Specifies the table/relation names |
> | **WHERE** | **Selection** $\sigma$ | Specifies the condition the result must satisfy |

> [!TRAP]
> The names are **crossed over**, and this is examined constantly.
>
> SQL's **SELECT** is algebra's **projection** (columns). SQL's **WHERE** is algebra's **selection** (rows).
>
> The word "select" means the opposite thing in the two languages. If you read SQL's `SELECT` as "selection," you will map every query backwards.

## Naming and case

> [!NOTE]
> **SQL names are case insensitive** — you may use upper- or lower-case letters:
>
> `Name` ≡ `NAME` ≡ `name`
>
> Some people use upper case wherever the textbook uses bold font.

## FROM: the tables going in

**Example:** Find the names of all employees.

```sql
SELECT Fname, Lname FROM EMPLOYEE;
```

When more than one relation appears in `FROM`, SQL forms their **Cartesian product** and the `WHERE` clause is what cuts it back down to the meaningful pairings.

**Example:** For every project located in `'Stafford'`, list the project number, the controlling department number, and the department manager's last name, address, and birth date.

```sql
SELECT Pnumber, Dnum, Lname, Address, Bdate
FROM   PROJECT, DEPARTMENT, EMPLOYEE
WHERE  Dnum = Dnumber
  AND  Mgr_ssn = Ssn
  AND  Plocation = 'Stafford';
```

> [!INTUITION]
> Read that `WHERE` clause as doing **two different jobs at once**, because it is:
>
> - `Dnum = Dnumber` and `Mgr_ssn = Ssn` are **join conditions** — they stitch the three tables together along their foreign keys.
> - `Plocation = 'Stafford'` is a genuine **filter** — an actual condition from the question.
>
> With three tables you need **two** join conditions to connect them; with $n$ tables you need $n-1$. If you write one too few, you get a partial Cartesian product and a wildly inflated answer — a very common silent error, because the query still runs.

## DISTINCT and SQL's multiset semantics

> [!EXAM]
> **SQL allows duplicates in relations as well as in query results.**
>
> **To force the elimination of duplicates, insert the keyword `DISTINCT` after `SELECT`.**

**Example:** Retrieve the name and address of all employees, displaying unique names.

```sql
SELECT DISTINCT Fname, Lname, Address
FROM   EMPLOYEE;
```

> [!TRAP]
> This is the single deepest difference between **SQL and the relational model**, and it underlies most of the surprises in this unit.
>
> A relation in the formal model is a **set** — duplicates cannot exist. An SQL table is a **multiset** (or *bag*) — duplicates are permitted and are the default.
>
> Everything downstream inherits this: `COUNT` counts duplicates, `UNION ALL` keeps them, `AVG` is skewed by them. Whenever an SQL result surprises you, ask first whether duplicates explain it.

> [!INTUITION]
> Why would SQL default to keeping duplicates when the theory says sets?
>
> Because **eliminating them is expensive**. To know a row is a duplicate the system must compare it against every row already produced — in practice a sort or a hash of the whole result. The designers made you **ask** for that cost rather than pay it silently on every query.
>
> So `DISTINCT` is not free decoration. On a large result it is often the most expensive thing in the query.

Note also that `DISTINCT` applies to the **whole selected row**, not to the first column. `SELECT DISTINCT Fname, Lname, Address` removes rows only where *all three* values repeat — two different employees both named "John Smith" at different addresses both survive.

## Arithmetic inside SELECT

> [!NOTE]
> The `SELECT` clause can contain **arithmetic expressions** involving the operators **`+`, `–`, `*`, `/`**, operating on **constants or attributes of tuples**.

```sql
SELECT Fname, Salary/2 FROM EMPLOYEE;
```

The query returns a relation **identical to EMPLOYEE except that the value of the `Salary` attribute is divided by 2**.

> [!TRAP]
> The **stored data is not modified**. A `SELECT` computes a new result relation; it never writes back to the table. Only `UPDATE` changes stored values.
>
> Students routinely lose marks by claiming this query "halves everyone's salary."

## Renaming with AS

> [!EXAM]
> SQL allows renaming relations and attributes using the `AS` clause:
>
> ```
> old-name AS new-name
> ```

Without it, the computed column above gets an ugly system-generated name like `salary/2`. With it:

```sql
SELECT Fname, Salary/2 AS monthly_salary FROM EMPLOYEE;
```

**Example:** Find the annual salary of employees.

```sql
SELECT Fname, Lname, Salary*12 AS Annual_Income FROM EMPLOYEE;
```

> [!NOTE]
> **The keyword `AS` is optional and may be omitted:**
>
> `instructor AS T` ≡ `instructor T`

> [!INTUITION]
> `AS` does two quite different jobs, and it is worth separating them now because both return later in the unit:
>
> - **Renaming a column** — cosmetic here, but *mandatory* the moment a derived table or CTE needs a name to be referenced by.
> - **Renaming a relation** (a *tuple variable* or *alias*, e.g. `EMPLOYEE AS E`) — this becomes essential for **self-joins** and for **correlated subqueries**, where the same table appears twice and you must say which copy you mean.
>
> The optional-keyword form `EMPLOYEE E` is what you will see most often in the join and subquery decks.

---

**Next:** the row filter itself, sorting, and pattern matching — **WHERE, ORDER BY & string operations**.
