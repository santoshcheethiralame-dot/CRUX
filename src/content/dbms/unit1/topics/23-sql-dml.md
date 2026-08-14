---
subject: dbms
unit: 1
order: 23
slug: sql-dml
title: SQL DML — INSERT, SELECT, UPDATE & DELETE
summary: The four DML commands with worked examples on the COMPANY database — both forms of INSERT plus INSERT-from-SELECT, the SELECT clause as projection, UPDATE with the MySQL derived-table workaround, and DELETE with its referential consequences.
minutes: 12
tags: [DML, insert, select, update, delete, where-clause, derived-table, referential-action]
---

# SQL DML — INSERT, SELECT, UPDATE & DELETE

> [!NOTE]
> **DML commands change the data present in the SQL database.** We can easily **access, store, modify, update and delete** existing records using them.
>
> **The four DML commands: SELECT, INSERT, UPDATE, DELETE.**

> [!INTUITION]
> Notice the split against the previous two topics. **DDL changes the *shape* of the database; DML changes what is *in* it.** In schema-versus-state language, **DDL changes the schema, DML changes the state** — which is exactly the distinction from the very start of the unit, now expressed as two families of commands.

---

## INSERT

> [!NOTE]
> In its simplest form, INSERT **adds a single tuple (row) to a relation**. We must specify the **relation name and a list of values**. **There are two forms.**

### Form 1 — positional

> [!NOTE]
> **The values should be listed in the same order in which the corresponding attributes were specified in the `CREATE TABLE` command.**

```sql
INSERT INTO table_name VALUES (value1, value2, ...);

INSERT INTO EMPLOYEE
VALUES ('Richard', 'K', 'Marini', '653298653', '1962-12-30',
        '98 Oak Forest, Katy, TX', 'M', 37000, '653298653', 4);
```

### Form 2 — named attributes

> [!NOTE]
> Form 2 allows the user to **specify explicit attribute names** corresponding to the values provided.
>
> - Useful **if a relation has many attributes but only a few are assigned values** in the new tuple.
> - **However, the values must include all attributes with `NOT NULL` specification and no default value.**
> - **Attributes with NULL allowed or DEFAULT values are the ones that can be left out.**

```sql
INSERT INTO table_name (attribute1, attribute2, ...) VALUES (value1, value2, ...);
```

The deck's example: *enter a tuple for a new EMPLOYEE for whom we know only the Fname, Lname, Dno and Ssn.*

> [!EXAM]
> **Form 2 is safer and is what you should write in practice.** Form 1 depends on column order, so it silently breaks the moment someone runs `ALTER TABLE ... ADD COLUMN`. Naming the attributes makes the statement immune to schema changes.
>
> The rule for what may be omitted is worth quoting exactly: **you may leave out only attributes that allow NULL or have a DEFAULT.** Anything `NOT NULL` without a default must be supplied.

### INSERT with a query

> [!NOTE]
> A variation **inserts multiple tuples in conjunction with creating a relation and loading it with the result of a query.**

```sql
CREATE TABLE WORKS_ON_INFO (
  Emp_name       VARCHAR(15),
  Proj_name      VARCHAR(15),
  Hours_per_week DECIMAL(3,1)
);

INSERT INTO WORKS_ON_INFO (Emp_name, Proj_name, Hours_per_week)
  SELECT E.Lname, P.Pname, W.Hours
  FROM   PROJECT P, WORKS_ON W, EMPLOYEE E
  WHERE  P.Pnumber = W.Pno AND W.Essn = E.Ssn;
```

> [!NOTE]
> **Another variation — backing up a table.** The condition is that **the schema of both the backup table and the original must be the same**, and **the backup table needs to be created beforehand**.
>
> ```sql
> INSERT INTO WORKS_ON_INFO_Backup (SELECT * FROM WORKS_ON_INFO);
> ```

> [!INTUITION]
> Look at that `WHERE` clause: `P.Pnumber = W.Pno AND W.Essn = E.Ssn`. That is a **Cartesian product being filtered down to the matching combinations** — precisely the pattern from the relational algebra topic, where `EMPLOYEE × DEPENDENT` was made meaningful by `σ(SSN = ESSN)`.
>
> Written this way it is an **implicit join**. Modern style would use explicit `JOIN ... ON`, but the semantics are identical, and seeing the algebra behind the syntax is the point.

---

## SELECT

> [!NOTE]
> - **The `SELECT` clause lists the attributes desired in the result of a query.**
> - **It corresponds to the projection operation of relational algebra.**
> - **The `FROM` clause specifies the table (relation) name.**

```sql
SELECT Fname, Lname
FROM   EMPLOYEE;
```

> [!TRAP]
> **`SELECT` corresponds to projection (∏), but it is not identical to it.** Relational algebra's ∏ **always removes duplicates**, because relations are sets. SQL's `SELECT` **keeps duplicates** unless you write `DISTINCT`.
>
> SQL works with **multisets (bags)**, not pure sets — a deliberate departure from the theory, because de-duplicating every result would be expensive and is often not wanted.

*(The full treatment of `SELECT` — joins, subqueries, grouping — is Unit 2.)*

---

## UPDATE

> [!NOTE]
> - The UPDATE command **modifies attribute values of one or more selected tuples**.
> - A **`WHERE` clause selects the tuples to be modified from a single relation**.
> - **An additional `SET` clause specifies the attributes to be modified and their new values.**
> - **Several tuples can be modified with a single UPDATE command.**
> - **Updating a primary key value may propagate to the foreign key values of tuples in other relations** if such a **referential triggered action** is specified.

**Example 1** — change the location and controlling department of project 10:

```sql
UPDATE PROJECT
SET    Plocation = 'Bellaire', Dnum = 5
WHERE  Pnumber = 10;
```

**Example 2** — give all employees in the Research department a 10% raise:

```sql
UPDATE EMPLOYEE
SET    Salary = Salary * 1.1
WHERE  Dno = 5;
```

### The MySQL restriction

**Example 3** — give a 5% raise to employees earning less than the average:

```sql
-- MySQL
UPDATE employee
SET    Salary = Salary * 1.05
WHERE  salary < (SELECT avg_sal
                 FROM (SELECT AVG(salary) AS avg_sal FROM employee) AS temp);
```

```sql
-- PostgreSQL / Oracle / SQL Server
UPDATE employee
SET    Salary = Salary * 1.05
WHERE  salary < (SELECT AVG(salary) FROM employee);
```

> [!EXAM]
> **Why the difference:** *"This does not work in MySQL, reason is it does not allow selecting from the same table you are updating (in the same query) without wrapping it in a derived table."*
>
> The fix is to wrap the subquery in **`(SELECT ...) AS temp`** — a **derived table**. MySQL materialises that inner result first, so it is no longer "reading the table it is writing".

> [!TRAP]
> Forgetting the `WHERE` clause on an `UPDATE` is the classic destructive accident: **every row in the table is modified**. `UPDATE EMPLOYEE SET Salary = Salary * 1.1;` gives the whole company a raise.
>
> The habit worth building: **write the `WHERE` first, test it with a `SELECT`, then convert it to an `UPDATE`.**

---

## DELETE

> [!NOTE]
> - The DELETE command **removes tuples from a relation**.
> - It includes a **`WHERE` clause to select the tuples to be deleted**.
> - **Tuples are explicitly deleted from only one table at a time.**
> - **However, the deletion may propagate to tuples in other relations if referential triggered actions are specified** in the referential integrity constraints of the DDL.
> - Depending on the condition, **zero, one, or several tuples can be deleted** by a single DELETE.

```sql
-- Example 1: delete the employee whose last name is Zelaya
DELETE FROM EMPLOYEE WHERE Lname = 'Zelaya';

-- Example 2: delete all employee records
DELETE FROM EMPLOYEE;
```

> [!EXAM]
> The deck notes Example 2 **"is similar to truncating the employee table"** — *similar*, not identical. The differences, which are exactly the DDL/DML split from the previous topic:
>
> | | `DELETE FROM t;` | `TRUNCATE TABLE t;` |
> |---|---|---|
> | Language | **DML** | **DDL** |
> | `WHERE` allowed | **Yes** | **No** |
> | Logged | **Row by row** | Not row by row — **much faster** |
> | `AUTO_INCREMENT` | **Not reset** | **Reset to 1** |
> | Fires referential actions | **Yes** | Generally **not permitted** if FKs reference the table |

> [!INTUITION]
> That last row is the one with real consequences. **`DELETE` respects `ON DELETE CASCADE`**, so removing an employee can remove their dependents automatically. **`TRUNCATE` bypasses that machinery entirely** — which is why most systems simply refuse to truncate a table that other tables reference.
>
> "Similar to truncating" is therefore true about the *visible outcome* and misleading about the *mechanism*.

---

## The deck's Q&A

> [!EXAM]
> | Question | Answer |
> |---|---|
> | Which clause specifies the attributes to display in the output? | **`SELECT`** |
> | Which DML operation removes data from a database? | **`DELETE`** |
> | In `SELECT name FROM instructor WHERE dept_name = 'History'`, what is `name`? | **A column in the `instructor` table** |
> | What is the purpose of DML? | **Querying the database** |

> [!TRAP]
> The last one is worth pausing on. The deck's answer is **"querying the database"** — but DML is really *manipulation* in general: `INSERT`, `UPDATE` and `DELETE` all modify rather than query. The distractor *"storing the data in the database"* is arguably defensible.
>
> **Answer as the deck does**, but understand that DML covers **all four** commands, not only retrieval.

---

## Where Unit 1 ends up

> [!INTUITION]
> The unit traces one continuous path, and it is worth seeing whole:
>
> **the mini-world → an ER diagram → a relational schema → relational algebra → SQL**
>
> - **ER** gave a vocabulary for describing the world — entities, relationships, attributes, keys.
> - The **mapping algorithm** turned that picture into tables mechanically.
> - **Relational algebra** supplied the operations, and the guarantee that many query forms are equivalent.
> - **SQL** is the practical language built on that algebra: `WHERE` is σ, `SELECT` is ∏, `JOIN` is ⋈, `GROUP BY` is ℱ.
>
> Every constraint you write in DDL traces back to a decision made on the ER diagram — **participation became `NOT NULL`, cardinality decided where the foreign key lives, and a multivalued attribute became its own table.** The syntax at the end is only the last step of a design that started with drawing boxes.

---

**End of Unit 1.**
