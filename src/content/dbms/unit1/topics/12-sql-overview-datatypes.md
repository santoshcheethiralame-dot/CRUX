---
subject: dbms
unit: 1
order: 12
slug: sql-overview-datatypes
title: SQL Overview & Data Types
summary: The history and role of SQL, the four sub-languages (DDL/DML/DCL/TCL), and the SQL data types including CHAR vs VARCHAR and the large-object types BLOB and CLOB.
minutes: 12
tags: [sql, ddl, dml, data-types, char-varchar, blob-clob]
---

# SQL Overview & Data Types

## What is SQL?

> [!NOTE]
> **SQL** — originally **SEQUEL** ("Structured English Query Language", by **Chamberlin & Boyce** at IBM), now **Structured Query Language** — is the standard language for relational databases and a major reason for their commercial success. Every SQL statement ends with a **semicolon**.

## The four sub-languages

> [!EXAM]
> | Sub-language | Purpose | Commands |
> |---|---|---|
> | **DDL** (Data Definition) | Define the schema/structure | `CREATE, ALTER, DROP, TRUNCATE, RENAME` |
> | **DML** (Data Manipulation) | Manage the data | `INSERT, SELECT, UPDATE, DELETE` |
> | **DCL** (Data Control) | Control access | `GRANT, REVOKE` |
> | **TCL** (Transaction Control) | Commit/undo DML changes | `COMMIT, ROLLBACK, SAVEPOINT` |

> [!INTUITION]
> Map the relational terms to SQL: relational **relation / tuple / attribute** = SQL **table / row / column**. In **MySQL**, `CREATE SCHEMA` is the same as `CREATE DATABASE`.

## SQL data types

| Category | Types |
|---|---|
| **Numeric** | `INT`/`INTEGER`, `SMALLINT`, `FLOAT`/`REAL`, `DOUBLE PRECISION`, `NUMERIC(p,d)` (p total digits, d after the decimal point) |
| **Character** | `CHAR(n)` — **fixed** length (pads with spaces); `VARCHAR(n)` — **variable** length (no padding) |
| **Bit / Boolean** | `BIT(n)`, `BIT VARYING(n)`; `BOOLEAN` (TRUE / FALSE / NULL) |
| **Date / Time** | `DATE` (`YYYY-MM-DD`), `TIME`, `TIMESTAMP` (date + time + fractional seconds, optional time zone), `INTERVAL` (relative duration) |
| **Large Object** | `BLOB` (**Binary** LOB — images, audio, video) and `CLOB` (**Character** LOB — large text/documents) |
| **MySQL extras** | `ENUM('a','b','c')` (one value from a list), `SET`, `AUTO_INCREMENT` |

> [!EXAM]
> Three classic data-type discriminators:
> - **`CHAR(n)` vs `VARCHAR(n)`** — CHAR is **fixed-length** (stores "Avi" as `Avi` + 7 spaces in `CHAR(10)`); VARCHAR is **variable-length** (stores just "Avi").
> - **`BLOB` vs `CLOB`** — BLOB = large **binary** data; CLOB = large **character** data.
> - **`DATE` format = `YYYY-MM-DD`.**

> [!NOTE]
> `NUMERIC(p, d)` stores a fixed-point number with `p` digits total, `d` after the point. `NUMERIC(3,1)` can store `44.5` exactly, but **not** `444.5` (too many digits) or `0.32` (too many decimals).

---

**Next:** building and changing the schema — **SQL DDL: CREATE, ALTER, DROP, TRUNCATE**.
