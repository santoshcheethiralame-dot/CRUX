---
subject: dbms
unit: 4
order: 1
slug: database-connectivity
title: Database Application Connectivity
summary: Connecting an application program to a database — JDBC/ODBC, the Python–MySQL connector pattern, parameterised queries, and commit/rollback from host code.
minutes: 8
tags: [connectivity, jdbc, odbc, python, mysql-connector]
---

# Database Application Connectivity

Most real database use happens **from inside application programs**, not the SQL shell. A transaction is initiated from a host language (Python, Java, C++) with **embedded database access** via a connectivity API.

## The connectivity APIs

- **JDBC** (Java Database Connectivity) and **ODBC** (Open Database Connectivity) are standard call-level interfaces that let a program connect to *any* compliant DBMS.
- Python uses a **DB-API** driver such as `mysql.connector`.

## The Python ↔ MySQL pattern

```python
import mysql.connector

conn = mysql.connector.connect(
    host="localhost", user="root", password="...", database="university")
cur = conn.cursor()

# Parameterised query — placeholders prevent SQL injection
cur.execute("INSERT INTO student (id, name) VALUES (%s, %s)", (101, "Riya"))
conn.commit()                       # persist the change

cur.execute("SELECT * FROM student WHERE id = %s", (101,))
rows = cur.fetchall()               # retrieve results

cur.close(); conn.close()
```

> [!NOTE]
> The lifecycle is **connect → cursor → execute → commit/rollback → fetch → close.** A **cursor** is the handle through which SQL is sent and result rows are read.

> [!EXAM]
> Use **parameterised queries** (`%s` placeholders with a values tuple), never string concatenation — this is the primary defence against **SQL injection**. Group related statements and `conn.commit()` on success or `conn.rollback()` on error, so the application's database work is **transactional**.

> [!INTUITION]
> The desktop "university app" in the lecture is just CRUD over this pattern: a GUI calls `execute()` for each Create/Read/Update/Delete, wrapped in commit/rollback so a half-finished operation never corrupts the database. Everything in this unit (transactions, isolation, locking) is about making *concurrent* such programs behave correctly.

---

**Next:** the unit of work itself — **transactions & the ACID properties**.
