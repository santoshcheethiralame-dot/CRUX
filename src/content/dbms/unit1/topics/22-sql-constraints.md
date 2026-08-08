---
subject: dbms
unit: 1
order: 22
slug: sql-constraints
title: SQL Constraints & Keys
summary: The three relational integrity constraints, the column constraints (NOT NULL, DEFAULT, CHECK, PRIMARY KEY, UNIQUE, FOREIGN KEY), and the referential actions on DELETE/UPDATE.
minutes: 13
tags: [sql, constraints, primary-key, foreign-key, referential-integrity, check]
---

# SQL Constraints & Keys

> [!NOTE]
> **Constraints** are conditions checked **before** data is inserted/updated — only data satisfying them is stored. They can be declared in `CREATE TABLE` or added later with `ALTER TABLE`.

## The three basic relational constraints

> [!EXAM]
> | Constraint | Rule |
> |---|---|
> | **Key constraint** | A **primary key** value cannot be **duplicated** |
> | **Entity integrity** | A **primary key** value cannot be **NULL** |
> | **Referential integrity** | A **foreign key** must match an existing **primary key** value (or be NULL) |

## Column / table constraints

| Constraint | Meaning |
|---|---|
| **`NOT NULL`** | Value required (implicit for PK columns) |
| **`DEFAULT <value>`** | Value used if none is supplied (default default = NULL) |
| **`CHECK (condition)`** | Restrict values, e.g. `Dnumber INT CHECK (Dnumber > 0 AND Dnumber < 21)`; can also be a tuple-level check |
| **`PRIMARY KEY`** | One or more attributes uniquely identifying a row (= NOT NULL **+** UNIQUE) |
| **`UNIQUE`** | An alternate/secondary key (a **candidate key**); allows one NULL |
| **`FOREIGN KEY … REFERENCES`** | Referential integrity to a parent table's key |

## Foreign keys & referential actions

> [!NOTE]
> When the **parent** row is deleted/updated, the FK's **referential (triggered) action** decides what happens to the child rows:
> | Action | Effect on child rows |
> |---|---|
> | **NO ACTION** (default) | Reject — raise an error / roll back |
> | **CASCADE** | Propagate the delete/update to the child rows |
> | **SET NULL** | Set the child FK to NULL (FK columns must be nullable) |
> | **SET DEFAULT** | Set the child FK to its default value |

```sql
CREATE TABLE EMPLOYEE (
    Ssn       CHAR(9),
    Super_ssn CHAR(9),
    Dno       INT NOT NULL DEFAULT 1,
    CONSTRAINT EMPPK      PRIMARY KEY (Ssn),
    CONSTRAINT EMPSUPERFK FOREIGN KEY (Super_ssn) REFERENCES EMPLOYEE(Ssn)
        ON DELETE SET NULL    ON UPDATE CASCADE,
    CONSTRAINT EMPDEPTFK  FOREIGN KEY (Dno) REFERENCES DEPARTMENT(Dnumber)
        ON DELETE SET DEFAULT ON UPDATE CASCADE
);
```

> [!INTUITION]
> The **`CONSTRAINT <name>`** keyword *names* a constraint so it can be altered/dropped later. Note the **self-referencing** FK (`Super_ssn → Ssn`) — exactly the recursive employee–supervisor relationship from the ER model. **CASCADE** suits "relationship"/junction tables (delete the parent, delete its links).

> [!EXAM]
> **PRIMARY KEY = UNIQUE + NOT NULL** (and only one per table). **UNIQUE** marks a *candidate* key and permits one NULL. **FOREIGN KEY** enforces **referential integrity**; its default action on violation is to **reject** (NO ACTION).

> [!NOTE]
> The canonical **COMPANY** schema (Elmasri/Navathe): `EMPLOYEE(…, Ssn[PK], Super_ssn→EMPLOYEE, Dno→DEPARTMENT)`, `DEPARTMENT(Dname, Dnumber[PK], Mgr_ssn→EMPLOYEE)`, `WORKS_ON(Essn, Pno)[composite PK, both FKs]`, `DEPENDENT(Essn→EMPLOYEE, …)`. The FK arrows encode referential integrity across the whole schema.

---

**Next:** changing and querying the data — **SQL DML: INSERT, SELECT, UPDATE, DELETE**.
