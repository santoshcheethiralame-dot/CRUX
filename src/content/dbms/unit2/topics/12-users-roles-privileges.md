---
subject: dbms
unit: 2
order: 12
slug: users-roles-privileges
title: Users, Roles & Privileges
summary: Database access control — creating users, the GRANT/REVOKE model and privilege scopes, and roles as named bundles of privileges that users inherit.
minutes: 10
tags: [sql, security, grant, revoke, roles, authorization]
---

# Users, Roles & Privileges

SQL manages access with two concepts:

- **User** — an individual or application that connects to the database. Has a unique username (and usually a password). Granted permissions on objects.
- **Role** — a **named group of privileges** (or of users/roles). Grant privileges to a role, add users to the role, and the users **inherit** the role's privileges. Roles can be **nested**.

> [!INTUITION]
> Roles answer "how do I manage permissions for 50 employees who all need the same access?" Instead of granting the same 6 privileges to each user, define a **Writers** role once, grant it those privileges, and add users to it. Change the role → everyone's access changes at once.

## Creating users

```sql
CREATE USER 'student'@'localhost' IDENTIFIED BY 'stud123';
DROP USER 'student'@'localhost';
```

The **host** part says where the user may connect from: `'localhost'` (local only), `'%'` (any host), or a specific IP/hostname.

## Granting privileges

```sql
GRANT privileges ON database.table TO 'username'@'host';

GRANT SELECT              ON school.students TO 'alice'@'localhost'; -- read-only, one table
GRANT ALL PRIVILEGES      ON school.*        TO 'bob'@'localhost';   -- everything, whole DB
SHOW GRANTS FOR 'alice'@'localhost';
```

**Scope** (`database.table`): `*.*` = all databases/tables · `mydb.*` = all tables in `mydb` · `mydb.mytable` = one table.

**Privilege categories:**

| Category | Privileges |
|---|---|
| Data | `SELECT`, `INSERT`, `UPDATE`, `DELETE` |
| Structure | `CREATE`, `ALTER`, `DROP`, `INDEX` |
| Administrative | `GRANT OPTION` (let the user grant to others), `SUPER`, `ALL PRIVILEGES` |

## Revoking privileges

`REVOKE` mirrors `GRANT`:

```sql
REVOKE SELECT ON school.* FROM 'alice'@'localhost';
```

## Roles

```sql
CREATE ROLE IF NOT EXISTS 'Assistant_employee';   -- IF NOT EXISTS avoids a duplicate-name error
CREATE ROLE 'MyAdmin', 'MyDeveloper';              -- create several at once
GRANT SELECT ON courses TO Assistant_employee;     -- privileges → role
GRANT CREATE, ALTER, DROP TO MyDeveloper;
GRANT Assistant_employee TO 'user'@'host';         -- role → user (user inherits SELECT)

REVOKE INSERT, UPDATE, DELETE ON db.* FROM role_name;
DROP ROLE role1, role2;
```

> [!NOTE]
> Adding **`WITH GRANT OPTION`** to a GRANT lets the recipient pass the privilege on to others: `GRANT SELECT, UPDATE ON *.* TO 'newuser'@'localhost' WITH GRANT OPTION;`. Without it, the user can use the privilege but not delegate it. `CREATE ROLE IF NOT EXISTS` makes role creation idempotent (re-running is harmless).

> [!EXAM]
> "Any authorization that can be granted to a user can be granted to a role; roles are granted to users just like privileges." The SQL standard data privileges are `SELECT`, `INSERT`, `UPDATE`, `DELETE`. The `GRANT OPTION` is what lets a recipient **pass a privilege on** to someone else.

> [!NOTE]
> Operating systems typically offer just **read** and **write** file permissions, yet databases offer many privilege types (Silberschatz Practice Exercise 4.11) — because a DBMS must control access at the granularity of **operations on specific tables, columns, and views**, not whole files.

---

**Next:** code that runs automatically on data changes — **triggers**.
