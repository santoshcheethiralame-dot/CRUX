---
subject: dbms
unit: 1
order: 13
slug: sql-ddl
title: SQL DDL — CREATE, ALTER, DROP & TRUNCATE
summary: Defining and changing the schema with CREATE TABLE, ALTER (add/modify/drop/rename), DROP and TRUNCATE — and the crucial DROP-vs-TRUNCATE distinction.
minutes: 12
tags: [sql, ddl, create-table, alter, drop, truncate]
---

# SQL DDL — CREATE, ALTER, DROP & TRUNCATE

The **DDL** defines and modifies the structure of the database: `CREATE`, `ALTER`, `DROP`, `TRUNCATE`, `RENAME`.

## CREATE TABLE

```sql
CREATE TABLE student (
    ID       INT PRIMARY KEY,
    name     VARCHAR(30) NOT NULL,
    tot_cred INT DEFAULT 0
);

-- Create from an existing table:
CREATE TABLE t2 AS SELECT * FROM t1;   -- copies structure + DATA
CREATE TABLE t2 LIKE t1;               -- copies structure ONLY (no data)
```

> [!TRAP]
> `CREATE TABLE … AS SELECT *` copies **structure and data**; `CREATE TABLE … LIKE` copies **structure only**. A common MCQ.

## ALTER TABLE — change the structure

```sql
ALTER TABLE student ADD email VARCHAR(50) AFTER name; -- add a column (AFTER positions it)
ALTER TABLE student ADD last_name VARCHAR(40) NOT NULL,  -- add several at once
                    ADD first_name VARCHAR(35) NULL;
ALTER TABLE student MODIFY name VARCHAR(40);          -- change a column's TYPE only
ALTER TABLE student CHANGE name full_name VARCHAR(40);-- RENAME + retype a column
ALTER TABLE student DROP COLUMN email;                -- remove a column
ALTER TABLE student RENAME TO learner;                -- rename the table
```

> [!NOTE]
> **MODIFY vs CHANGE:** `MODIFY col newtype` changes a column's **type** but keeps its name; `CHANGE oldname newname newtype` can **rename and retype** in one step (you must restate the type). `AFTER col` (or `FIRST`) controls the new column's **position**.

### Adding a foreign key to an existing table

The column must already exist before you attach a FK to it:

```sql
ALTER TABLE student ADD COLUMN dept_id INT NOT NULL;          -- 1) ensure the column exists
ALTER TABLE student
    ADD CONSTRAINT fk_dept FOREIGN KEY (dept_id)              -- 2) named FK constraint
    REFERENCES department(dept_id)
    ON DELETE CASCADE ON UPDATE CASCADE;
```
Naming the constraint (`CONSTRAINT fk_dept`) lets you drop it later by name and is required for multi-column foreign keys.

## Inspect & remove

```sql
DESCRIBE student;            -- basic structure
SHOW CREATE TABLE student;   -- full definition incl. constraints & indexes
DROP TABLE student;          -- removes DATA and STRUCTURE
DROP TABLE IF EXISTS a, b;   -- drop several at once; no error if one is missing
TRUNCATE TABLE student;      -- removes all ROWS, keeps STRUCTURE
RENAME TABLE student TO learner;
```

## DROP vs TRUNCATE

> [!EXAM]
> | Feature | **DROP** | **TRUNCATE** |
> |---|---|---|
> | Removes data | ✅ | ✅ |
> | Removes the **table structure** | ✅ (table deleted) | ❌ (structure remains) |
> | Constraints & indexes | deleted with the table | preserved |
> | AUTO_INCREMENT | N/A (table gone) | resets to 1 |
> | Use case | table no longer needed | empty the table, keep it |
>
> Both are **DDL** (auto-commit, hard to roll back). **`DELETE`** is **DML** — it can be **filtered with `WHERE`** and rolled back.

> [!NOTE]
> **Schema evolution** commands change the schema while the DB is operational, *without* recompiling. `DROP SCHEMA company CASCADE;` removes a schema and **all** its elements; with **`RESTRICT`**, a drop succeeds only if nothing references the object.

> [!INTUITION]
> Quick mnemonic: **DELETE** = surgical (rows, WHERE, undoable) · **TRUNCATE** = empty the table fast (keep the shell) · **DROP** = demolish the table entirely.

---

**Next:** enforcing data rules — **constraints & keys**.
