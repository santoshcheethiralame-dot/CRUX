---
subject: dbms
unit: 1
order: 20
slug: sql-overview-datatypes
title: SQL Overview & Data Types
summary: Where SQL came from, the four sub-languages DDL/DML/DCL/TCL, schema concepts, and the full range of attribute data types including CHAR versus VARCHAR and the large-object types BLOB and CLOB.
minutes: 12
tags: [SQL, SEQUEL, DDL, DML, DCL, TCL, data-types, char, varchar, BLOB, CLOB]
---

# SQL Overview & Data Types

## Where SQL came from

> [!NOTE]
> The SQL language is considered **one of the major reasons for the commercial success of relational databases**.
>
> **SQL actually comes from the word "SEQUEL"**, the original term used in the paper *"SEQUEL to SQUARE"* by **Chamberlin and Boyce**. **IBM could not copyright that term**, so they abbreviated it to **SQL** and copyrighted that. It is now popularly known as **Structured Query Language**.

The language has features for **data definition, data manipulation, transaction control, indexing, security specification (GRANT and REVOKE), active databases, and multimedia**.

> [!INTUITION]
> The naming story is a small piece of trivia, but the reason SQL succeeded is not. Before SQL you navigated a database — you followed pointers, record by record, in a fixed order. SQL let you **state what you wanted and leave the how to the system**.
>
> That is the practical payoff of everything in the previous topics: because relational algebra gives the system a set of provably equivalent rewrites, a **declarative** language becomes possible. **SQL is only viable because the algebra underneath it is well behaved.**

---

## The four types of database language

> [!EXAM]
> | Sub-language | Purpose |
> |---|---|
> | **DDL** — Data Definition Language | Statements used to **define the database structure or schema** |
> | **DML** — Data Manipulation Language | Statements for **managing data within schema objects** |
> | **DCL** — Data Control Language | Statements to **control access to the database** |
> | **TCL** — Transaction Control Language | Used to **run the changes made by DML statements** |
>
> The usual members: **DDL** — `CREATE`, `ALTER`, `DROP`, `TRUNCATE`; **DML** — `INSERT`, `SELECT`, `UPDATE`, `DELETE`; **DCL** — `GRANT`, `REVOKE`; **TCL** — `COMMIT`, `ROLLBACK`, `SAVEPOINT`.

> [!TRAP]
> The classification is a favourite MCQ. Two boundary cases catch people:
> - **`TRUNCATE` is DDL, not DML** — even though it removes rows, it is not row-by-row logged and cannot take a `WHERE`.
> - **`UPDATE` is DML, not DDL** — it changes *values*, never structure. Use `ALTER TABLE` for structure.

---

## Schema concepts in SQL

> [!NOTE]
> An **SQL schema** is:
> - **identified by a schema name**,
> - includes an **authorization identifier** and **descriptors for each element**,
> - contains schema elements such as **tables, constraints, views, domains** and other constraints.
>
> **Each statement in SQL ends with a semicolon.**

```sql
-- MySQL
CREATE SCHEMA Library;
-- identical to:
CREATE DATABASE Library;
```

> [!EXAM]
> **In MySQL, schema and database are the same thing.** The equivalent PostgreSQL/Oracle syntax carries an authorization clause:
> ```sql
> CREATE SCHEMA Library AUTHORIZATION 'Jsmith';
> ```

---

## Attribute data types

### The basic families

> [!NOTE]
> | Family | Types |
> |---|---|
> | **Numeric — integers** | `INTEGER`, `INT`, `SMALLINT` |
> | **Numeric — floating point** | `FLOAT`, `REAL`, `DOUBLE PRECISION` |
> | **Character string — fixed** | `CHAR(n)`, `CHARACTER(n)` |
> | **Character string — varying** | `VARCHAR(n)`, `CHAR VARYING(n)`, `CHARACTER VARYING(n)` |
> | **Bit string — fixed** | `BIT(n)` |
> | **Bit string — varying** | `BIT VARYING(n)` |
> | **Boolean** | values of `TRUE` or `FALSE` |
> | **DATE** | **ten positions**; components **YEAR, MONTH, DAY** in the form **YYYY-MM-DD** |
> | **TIMESTAMP** | includes the **DATE and TIME** fields, plus a **minimum of six positions for decimal fractions of seconds**; optional **`WITH TIME ZONE`** qualifier |
> | **INTERVAL** | specifies a **relative** value used to **increment or decrement** an absolute date, time or timestamp |
>
> `DATE`, `TIME`, `TIMESTAMP` and `INTERVAL` can be **cast or converted to string formats for comparison**.

### The standard types explained

> [!EXAM]
> - **`char(n)`** — a **fixed-length** character string of user-specified length $n$. Full form `character`.
> - **`varchar(n)`** — a **variable-length** character string with user-specified **maximum** length $n$. Full form `character varying`.
> - **`int`** — an integer; a **finite subset of the integers that is machine dependent**. Full form `integer`.
> - **`smallint`** — a small integer, a machine-dependent subset of `int`.
> - **`numeric(p, d)`** — a **fixed-point** number of **$p$ digits** (plus a sign), with **$d$ of them to the right of the decimal point**.
> - **`real`, `double precision`** — floating-point with machine-dependent precision.
> - **`float(n)`** — floating point with a precision of **at least $n$ digits**.
> - **`null`** — every type may include the special value `NULL`, indicating an **absent value that may exist but be unknown, or may not exist at all**.

> [!TRAP]
> The deck's own worked case for `numeric(3,1)`: it **allows 44.5 to be stored exactly, but neither 444.5 nor 0.32** can be. Count carefully — $p = 3$ is the **total** number of digits and $d = 1$ of them sits after the point, so the integer part gets only $p - d = 2$ digits.
>
> `444.5` needs three digits before the point; `0.32` needs two after it. Both overflow their allotment.

### CHAR vs VARCHAR

> [!EXAM]
> **`char` stores fixed-length strings.** For an attribute `A` of type `char(10)`:
> - storing `"Avi"` means **seven spaces are appended** to make it 10 characters long.
>
> For attribute `B` of type `varchar(10)`, storing `"Avi"` adds **no spaces**.

> [!INTUITION]
> The practical consequences follow directly. **`CHAR` wastes space** on short values but every row is the same width, so access is marginally faster and predictable. **`VARCHAR` stores only what you give it** plus a small length prefix.
>
> The rule of thumb: use **`CHAR` when the length really is fixed** — a two-letter state code, a fixed-format ID. Use **`VARCHAR` when it varies** — names, emails, addresses. The padding also bites in comparisons, since `'Avi'` and `'Avi       '` may or may not compare equal depending on the system.

### Large-object types

> [!NOTE]
> Many current-generation applications need to store attributes that are **large — kilobytes or megabytes** — such as a photograph, or **very large (many megabytes or even gigabytes)**, such as a high-resolution medical image or video clip.

```sql
book_review clob(10KB)
image       blob(10MB)
movie       blob(2GB)
```

- For result tuples containing large objects it is **inefficient or impractical to retrieve an entire large object into memory**.
- LOBs are **stored in a way that optimizes space and provides efficient access** within the database tablespaces.
- **Internal LOBs (BLOBs, CLOBs) provide transactional support** — commit, rollback and so on.

> [!EXAM]
> | | **BLOB** | **CLOB / TEXT** |
> |---|---|---|
> | Stands for | **Binary Long Object** | **Character Long Object** |
> | Holds | Files — **videos, images, gifs, audio** | **Long textual content** that does not fit in `VARCHAR` |
> | Treated as | **Binary strings** using the binary character set | **Character strings**, with a proper character set (e.g. `utf8mb4`) |
> | Sorting/comparison | Based on **raw numeric byte values** | Follows the **rules of the character set** |
> | Default values | **Cannot have** default values | **Cannot have** default values |
> | Indexing | — | **Must specify a prefix length** for index creation |
>
> **In MySQL, `TEXT` acts as the equivalent of `CLOB`.**
>
> Size tiers: **`TINYBLOB` up to 255 bytes**, **`BLOB` up to 65,535 bytes (~64 KB)**, then `MEDIUMBLOB` and `LONGBLOB`.

> [!TRAP]
> Both BLOB and CLOB **cannot have default values** — a small shared restriction that is easy to overlook and easy to ask about. The **binary vs character** distinction is the one that matters most: it decides how sorting and comparison behave.

---

## One example covering every data type

```sql
CREATE TABLE example (
  id                  INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  char_column         CHAR(50)      NOT NULL,
  varchar_column      VARCHAR(255)  NOT NULL,
  tinytext_column     TINYTEXT      NOT NULL,
  text_column         TEXT          NOT NULL,
  mediumtext_column   MEDIUMTEXT    NOT NULL,
  longtext_column     LONGTEXT      NOT NULL,
  binary_column       BINARY(20)    NOT NULL,
  varbinary_column    VARBINARY(20) NOT NULL,
  tinyblob_column     TINYBLOB      NOT NULL,
  blob_column         BLOB          NOT NULL,
  mediumblob_column   MEDIUMBLOB    NOT NULL,
  longblob_column     LONGBLOB      NOT NULL,
  enum_column         ENUM('value1','value2','value3') NOT NULL,
  set_column          SET('value1','value2','value3')  NOT NULL,
  bool_column         BOOLEAN       NOT NULL DEFAULT 0,
  date_column         DATE          NOT NULL,
  datetime_column     DATETIME      NOT NULL,
  timestamp_column    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
                                    ON UPDATE CURRENT_TIMESTAMP,
  time_column         TIME          NOT NULL,
  year_column         YEAR(4)       NOT NULL,
  float_column        FLOAT(10,6)   NOT NULL DEFAULT '0.000000',
  double_column       DOUBLE(10,6)  NOT NULL DEFAULT '0.000000'
);
```

> [!INTUITION]
> Two MySQL-specific niceties worth noticing in that listing. **`ENUM`** allows exactly one value from a fixed list and **`SET`** allows several — both are a way of writing a **domain constraint directly into the column type**, rather than adding a separate `CHECK`.
>
> And `timestamp_column` shows a genuinely useful idiom: **`DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`** gives you a column that records creation time and then maintains itself as a last-modified time, with no application code at all.

---

## Terminology reminder

> [!EXAM]
> SQL uses **table, row and column** for the relational model's **relation, tuple and attribute** respectively. Questions may use either vocabulary, sometimes in the same sentence.
>
> **`CREATE` is the main SQL command for data definition**, and **`CREATE TABLE` creates a new relation by giving it a name and specifying its attributes and initial constraints.**

---

**Next:** defining the tables themselves — **SQL DDL**.
