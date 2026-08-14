---
subject: dbms
unit: 1
order: 21
slug: sql-ddl
title: SQL DDL — CREATE, ALTER, DROP & TRUNCATE
summary: The DDL commands, creating tables including from an existing table, the ALTER variants, DESCRIBE, table comments, the DROP versus TRUNCATE comparison, and the COMPANY schema written out in full.
minutes: 12
tags: [DDL, create-table, alter-table, drop, truncate, describe, rename, schema-evolution, comments]
---

# SQL DDL — CREATE, ALTER, DROP & TRUNCATE

## What DDL does

> [!NOTE]
> The SQL DDL provides commands for **defining table schemas, deleting tables, and modifying table schemas**. DDL includes **CREATE, ALTER and DROP**, and is used to create, alter or drop **database objects (tables, views, users)**.
>
> | Command | Purpose |
> |---|---|
> | **CREATE** | to **create** objects in the database |
> | **ALTER** | **alters the structure** of the database |
> | **DROP** | **delete** objects from the database |

---

## CREATE TABLE

```sql
CREATE TABLE table_name (
  col_name1 datatype(),
  col_name2 datatype(),
  ...
  col_namen datatype()
);
```

### Creating a table from an existing table

```sql
CREATE TABLE new_table_name AS SELECT * FROM existing_table;

CREATE TABLE new_table_name LIKE existing_table;
```

> [!EXAM]
> The deck asks for the **difference between these two** — and it is a genuinely useful distinction:
>
> | | `AS SELECT * FROM` | `LIKE` |
> |---|---|---|
> | Copies the **structure** | ✓ | ✓ |
> | Copies the **data** | **✓ — rows are copied** | **✗ — empty table** |
> | Copies **keys, indexes, constraints** | **✗ — generally lost** | **✓ — preserved** |
>
> So `AS SELECT` gives you **the data without the constraints**; `LIKE` gives you **the constraints without the data**. Neither gives you both, which is exactly why the question is worth asking.

### The COMPANY schema

The deck writes out the whole schema — worth reading for the patterns rather than memorising:

```sql
CREATE TABLE department (
  Dname          varchar(15) NOT NULL,
  Dnumber        int(11)     NOT NULL,
  Mgr_ssn        char(9)     NOT NULL,
  Mgr_start_date date        DEFAULT NULL
);

CREATE TABLE employee (
  Fname     varchar(15)   NOT NULL,
  Minit     char(1)       DEFAULT NULL,
  Lname     varchar(15)   NOT NULL,
  Ssn       char(9)       NOT NULL,
  Bdate     date          DEFAULT NULL,
  Address   varchar(30)   DEFAULT NULL,
  Gender    char(1)       DEFAULT NULL,
  Salary    decimal(10,2) DEFAULT NULL,
  Super_ssn char(9)       DEFAULT NULL,
  Dno       int(11)       NOT NULL
);

CREATE TABLE works_on (
  Essn  char(9)      NOT NULL,
  Pno   int(11)      NOT NULL,
  Hours decimal(3,1) DEFAULT NULL
);
```

> [!INTUITION]
> Read the `NOT NULL` pattern and the ER diagram reappears. **Key attributes and foreign keys on the many-side are `NOT NULL`** — `Ssn`, `Dnumber`, `Dno`, `Essn`, `Pno` — because entity integrity forbids a null key and every employee must belong to a department.
>
> **Optional descriptive attributes carry `DEFAULT NULL`** — `Minit`, `Address`, `Salary`. The distinction is not arbitrary: it is the **participation constraints from the ER diagram, enforced in SQL**.
>
> Note also `works_on` — two `NOT NULL` foreign keys plus the descriptive attribute `Hours`. That is the M:N relationship relation from the mapping algorithm, exactly as predicted.

---

## ALTER TABLE

> [!EXAM]
> | Operation | Syntax |
> |---|---|
> | **ADD** | `ALTER TABLE table_name ADD col_name datatype();` |
> | **MODIFY** | `ALTER TABLE table_name MODIFY (fieldname datatype());` |
> | **DROP** | `ALTER TABLE table_name DROP column_name;` |
> | **RENAME table** | `RENAME TABLE table_name TO new_table_name;` |

The deck also covers, under ALTER: changing a **column's position** without losing data, changing a column's **default value**, **adding and dropping constraints**, and **dropping columns and default values**.

## DESCRIBE

```sql
DESCRIBE table_name;          -- lists basic description
SHOW CREATE TABLE table_name; -- complete information including constraints, index etc.
```

> [!TRAP]
> These two are not interchangeable. **`DESCRIBE` gives columns and types only.** **`SHOW CREATE TABLE` gives the full definition** — constraints, indexes, engine, and (as below) **comments**. If a question asks how to see a table's constraints, `DESCRIBE` is not the answer.

## Comments

> [!NOTE]
> Comments can be added to a table or column. They **serve as metadata, providing descriptions for database objects**, and `SHOW CREATE TABLE` displays them.

```sql
-- table level
CREATE TABLE users (
  id   INT PRIMARY KEY,
  name VARCHAR(255)
) COMMENT 'This table stores information about users.';
```

> [!INTUITION]
> Comments are stored **in the catalog**, alongside the schema itself — not in your source files. That is the self-describing nature from the very first topics doing something practical: the database can explain its own structure to whoever opens it next, with no external documentation to fall out of date.

---

## DROP vs TRUNCATE

> [!EXAM]
> | Feature | **DROP** | **TRUNCATE** |
> |---|---|---|
> | Removes data | **Yes** | **Yes** |
> | Removes **table structure** | **Yes — the table is deleted** | **No — the structure remains** |
> | `AUTO_INCREMENT` | N/A (table removed) | **Resets to 1** (in MySQL) |
> | Constraints & indexes | Removed with the table | Retained |
>
> Both are **DDL**. Contrast with **`DELETE`**, which is **DML**: it removes rows, can take a `WHERE`, is logged row by row, and does **not** reset the auto-increment counter.

> [!TRAP]
> The three-way distinction is a guaranteed question:
> - **`DELETE FROM t;`** — DML. Removes all **rows**, keeps the table, can be filtered, can be rolled back.
> - **`TRUNCATE TABLE t;`** — DDL. Removes all rows fast, keeps the **structure**, no `WHERE`, resets auto-increment.
> - **`DROP TABLE t;`** — DDL. Removes the **table itself**.
>
> Order them by how much they destroy: **DELETE < TRUNCATE < DROP.**

---

## Schema evolution and the DROP command

> [!NOTE]
> **Schema evolution commands** let a DBA **change the schema while the database is operational**, and **do not require recompilation of the database schema**. They can add or drop **tables, attributes, constraints and other schema elements**.
>
> Checks must be done by the DBMS to **ensure the changes do not affect the rest of the database and make it inconsistent**.

> [!NOTE]
> The **DROP command** can drop named schema elements — **tables, domains, types or constraints** — and a **whole schema** via `DROP SCHEMA`.
>
> **Two drop behaviour options: `CASCADE` and `RESTRICT`.**
>
> ```sql
> DROP SCHEMA COMPANY CASCADE;
> ```

> [!EXAM]
> - **`CASCADE`** — drop the schema **and everything in it** (all tables, domains and other elements).
> - **`RESTRICT`** — **refuse** to drop if the schema still contains elements.
>
> `RESTRICT` is the safe default in spirit: it stops you destroying more than you meant to.

> [!INTUITION]
> "Does not require recompilation" sounds unremarkable now but was the point of the whole design. In older systems, changing a record layout meant **recompiling every program that touched it**. Being able to `ALTER TABLE` on a live database is **physical and logical data independence** finally cashed out as something a DBA can type at 3am.

---

## The deck's Q&A

> [!EXAM]
> | Question | Answer |
> |---|---|
> | Difference between `CHAR(n)` and `VARCHAR(n)` | **`CHAR(n)` stores fixed-length strings, `VARCHAR(n)` stores variable-length** |
> | Format of the `DATE` data type | **YYYY-MM-DD** |
> | Key difference between BLOB and CLOB | **BLOB is for large binary objects, CLOB for large character data** |
> | Purpose of `ENUM` in MySQL | **Defining a list of possible values for a column** |

---

**Next:** the rules that keep the data valid — **SQL constraints & keys**.
