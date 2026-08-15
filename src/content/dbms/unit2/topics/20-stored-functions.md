---
subject: dbms
unit: 2
order: 20
slug: stored-functions
title: Stored Functions (UDFs)
summary: User-defined functions — why business logic moves into the database, the CREATE FUNCTION syntax part by part, the DETERMINISTIC keyword and its default, and both worked examples called from inside a SELECT.
minutes: 11
tags: [sql, function, udf, user-defined-function, create-function, deterministic, return, business-logic]
---

# Stored Functions (UDFs)

## Why put logic in the database

> [!EXAM]
> - We have already seen several functions **built into** the SQL language. Developers can also **write their own functions and procedures, store them in the database, and invoke them from SQL statements**.
> - **Functions and procedures allow "business logic" to be stored in the database and executed from SQL statements.**
> - These can be defined either by the **procedural component of SQL** or by an **external programming language such as Java, C or C++**.
> - **Functions created by the user** in the system database or a user-defined database are known as **user-defined functions (UDFs)**. **UDFs accept parameters, perform actions, and return the result.**

> [!NOTE]
> **The stated benefits:**
> - They **simplify development by encapsulating complex business logic** and making it available for **reuse anywhere** based on need.
> - They make the code needed to query data **a lot easier to write**.
> - They **improve query readability and functionality**, and **allow other users to replicate the same procedure**.
> - Suppose we have a **complex computation that appears in a number of queries** — we can build a function that **encapsulates the formula** and use it in each query.

> [!INTUITION]
> The argument is exactly the argument for writing a function in any language — **do not repeat the formula** — with one extra consideration that is specific to databases.
>
> Logic in the database runs **where the data is**. A calculation applied to a million rows does not ship a million rows to the application to be processed and (perhaps) shipped back. This is the same "reduce data transfer" reasoning that reappears, more strongly, in the **stored procedures** topic.
>
> The counterweight, worth mentioning if an exam asks for drawbacks: logic in the database is **harder to version-control, test and debug** than application code, and it ties you to one vendor's procedural dialect.

## Syntax

```sql
CREATE FUNCTION schema_name.function_name (parameter_list)
RETURNS data_type AS
BEGIN
    statements
    RETURN value
END
```

> [!EXAM]
> | Part | Meaning |
> |---|---|
> | **`function_name`** | The name of the function to be created |
> | **`parameter1, parameter2, …`** | **Optional parameters**, declared in the `()` brackets. **A function can contain none, one, or more than one parameter** |
> | **`BEGIN` / `END`** | **`BEGIN` marks the beginning of the function; `END` marks its completion** |
> | **`RETURNS data_type`** | **We can return any type of value.** The type must be **specified after the `RETURNS` clause** |
> | **`RETURN value`** | **Once MySQL finds the `RETURN` statement during execution, execution of the function is terminated and the value is returned** |
>
> **A function in SQL Server always accepts parameters, either single or multiple, and returns a single value or table.**
>
> **To delete a function:**
> ```sql
> DROP FUNCTION IF EXISTS function_name;
> ```

## DETERMINISTIC

> [!EXAM]
> **The function can be either deterministic or non-deterministic**, which needs to be specified.
>
> - **DETERMINISTIC** — the function **returns the same value for the same values of parameters**.
> - **NON-DETERMINISTIC** — the function **returns a different value for the same values of parameters**.
>
> **Functions will be NON-DETERMINISTIC by default.**

> [!TRAP]
> **The default is the *unsafe* one, and this is a favourite one-mark question.** MySQL assumes NON-DETERMINISTIC unless you say otherwise — so a genuinely deterministic function must be **labelled explicitly**.
>
> The label is not decoration. The optimiser may **call a DETERMINISTIC function once and reuse the result**, where a non-deterministic one must be re-evaluated per row. Declaring it wrongly in the other direction — marking something DETERMINISTIC when it is not — produces **wrong answers**, because the cached value is reused when it should not be.

> [!INTUITION]
> The test is simply: **does anything outside the parameters affect the answer?**
>
> `no_of_years('1990-05-14')` reads `CURRENT_DATE()`, so strictly its answer changes over time — yet the deck marks it `deterministic`, and within a single query that is exactly the behaviour you want. `Dept_size(5)` reads the `EMPLOYEE` table, so its answer changes whenever employees are hired.
>
> Anything consulting the clock, a random source, or table data is a candidate for non-determinism. **Pure arithmetic on the parameters is the clear deterministic case.**

## Example 1 — classifying department size

```sql
CREATE FUNCTION Dept_size(deptno INT)
RETURNS VARCHAR(7)
BEGIN
    DECLARE No_of_emps INT;
    SELECT COUNT(*) INTO No_of_emps FROM EMPLOYEE WHERE Dno = deptno;
    IF     No_of_emps > 3 THEN RETURN 'HUGE';
    ELSEIF No_of_emps > 2 THEN RETURN 'LARGE';
    ELSEIF No_of_emps > 1 THEN RETURN 'MEDIUM';
    ELSE                       RETURN 'SMALL';
    END IF;
END
```

Called from an ordinary query:

```sql
SELECT Dname, Dnumber, Dept_size(Dnumber) FROM department;
```

> [!EXAM]
> Three constructs to note, each examinable:
>
> - **`DECLARE No_of_emps INT;`** — local variables must be declared at the top of the block, before any statements.
> - **`SELECT COUNT(*) INTO No_of_emps FROM …`** — the **`SELECT … INTO`** form assigns a query result **into a variable** rather than returning it to the client. This is how procedural SQL captures a value.
> - **`IF / ELSEIF / ELSE / END IF`** — note the spelling **`ELSEIF`** as one word, and that `END IF;` closes the construct.

> [!INTUITION]
> Compare this with the **`CASE` expression** topic — the ladder is the same shape, and the ordering rule is identical: `> 3` must be tested before `> 2`, or every large department is labelled `'MEDIUM'`.
>
> The difference is *where* each lives. `CASE` is an **expression inside one query**. A function is a **named, reusable object**, callable from any query, and able to run multiple statements and declare variables. Use `CASE` for logic local to a query; promote it to a function when several queries need it.

## Example 2 — computing an age

**Task:** Write a function to find the age of employees.

```sql
CREATE FUNCTION no_of_years(date1 DATE)
RETURNS INTEGER DETERMINISTIC
BEGIN
    DECLARE date2 DATE;
    SELECT CURRENT_DATE() INTO date2;
    RETURN YEAR(date2) - YEAR(date1);
END
```

```sql
SELECT Fname, no_of_years(Bdate) FROM employee;
```

> [!TRAP]
> This function computes **the difference in calendar years, not the age.**
>
> Someone born in December 2000, evaluated in January 2026, gets $2026 - 2000 = 26$ — although they are actually 25 and will not turn 26 for eleven months. **The month and day are never consulted.**
>
> It is a fair illustration of the syntax, and a reminder that a working function is not automatically a correct one. A real implementation would use `TIMESTAMPDIFF(YEAR, date1, CURRENT_DATE())`, which accounts for the birthday.

> [!EXAM]
> The key property both examples demonstrate: **a stored function can be called from inside a `SELECT` list, exactly like a built-in function.**
>
> This is the single sharpest difference from a **stored procedure**, which cannot be — and it is the first row of the comparison table in the next topic.

---

**Next:** the other kind of stored program — **stored procedures**.
