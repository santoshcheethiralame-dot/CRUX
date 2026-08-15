---
subject: dbms
unit: 2
order: 18
slug: users-roles-privileges
title: Users, Roles & Privileges
summary: Users versus roles and why the indirection matters, CREATE USER with the host part, GRANT and REVOKE syntax and scope, the three families of privilege, and roles granted to roles.
minutes: 11
tags: [sql, user, role, grant, revoke, privileges, access-control, dcl, host, grant-option]
---

# Users, Roles & Privileges

> [!NOTE]
> In SQL, **"role" and "user" are two distinct concepts** used for managing access and permissions within a database management system.

## Users

> [!EXAM]
> - A **user** is an **individual or entity that interacts with the database**.
> - Users are typically associated with **specific individuals or applications** that need to perform operations on the database.
> - Each user has a **unique username** and, in some database systems, **a password for authentication**.
> - Users are **granted permissions to perform specific actions** (e.g. `SELECT`, `INSERT`, `UPDATE`, `DELETE`) **on database objects** (e.g. tables, views).

## Roles

> [!EXAM]
> - A **role** is a **named group of users or other roles**.
> - Roles are used to **simplify and manage permissions and access control**. **Instead of granting permissions to individual users, you can assign permissions to roles.**
> - **Users are then added to roles, and they inherit the permissions associated with those roles.** This makes it easier to **manage and change permissions for multiple users at once**.
> - **Roles can also be nested** — you can have roles within roles, **creating a hierarchical permission structure**.

> [!NOTE]
> **How they are used together:**
> 1. **Create roles and assign specific permissions to them.** For example, a **"Readers"** role with only `SELECT` permissions, and a **"Writers"** role with `INSERT`, `UPDATE` and `DELETE` on certain tables.
> 2. **Add individual users to the roles they need** — UserA to "Readers", UserB to "Writers".
> 3. **Users inherit the permissions of the roles they belong to.**

> [!INTUITION]
> A role is **a layer of indirection between people and permissions**, and the payoff is entirely about change.
>
> Without roles, granting four privileges to forty analysts means **160 grants**, and revoking one privilege from all of them means finding 160 rows. Miss one and you have a security hole that nobody can see by looking at any single user.
>
> With roles, the same change is **one `GRANT` against the role**, and every member inherits it immediately. When an analyst leaves, you remove **one** membership rather than auditing their accumulated privileges.
>
> This is the same reason programs use named constants rather than repeating literals: **the value is stated in one place, so it can be changed in one place.**

## Creating users

> [!EXAM]
> ```sql
> CREATE USER 'username'@'host' IDENTIFIED BY 'password';
> ```
>
> - **`'username'`** — the account name.
> - **`'host'`** — **where the user can connect from:**
>   - **`'localhost'`** — only the local machine
>   - **`'%'`** — **any host**
>   - a specific IP or hostname is also possible
> - **`'password'`** — the login password for authentication.
>
> ```sql
> CREATE USER 'student'@'localhost' IDENTIFIED BY 'stud123';
> ```
>
> **To delete the created user:**
> ```sql
> DROP USER 'username'@'host';
> DROP USER 'student'@'localhost';
> ```

> [!TRAP]
> **In MySQL the account identity is the *pair* `username@host`, not the username alone.**
>
> `'student'@'localhost'` and `'student'@'%'` are **two different accounts** that may hold completely different privileges. A grant to one does nothing for the other — which is the classic cause of *"it works when I log in on the server but not from my laptop."*
>
> `'%'` is also the loosest possible setting: it permits connections **from anywhere**. It appears in tutorials for convenience and is a poor default in anything real.

## Granting privileges

> [!NOTE]
> MySQL provides **`GRANT` statements to give access rights to a user account**. **The SQL standard includes the privileges `SELECT`, `INSERT`, `UPDATE` and `DELETE`.**

> [!EXAM]
> ```sql
> GRANT privileges
> ON   database.table
> TO   'username'@'host';
> ```
>
> **Scope** — `database.table` may be:
>
> | Written as | Means |
> |---|---|
> | **`*.*`** | **all databases, all tables** |
> | **`mydb.*`** | **all tables in `mydb`** |
> | **`mydb.mytable`** | **one specific table** |
>
> ```sql
> GRANT ALL ON company TO student@localhost;
> ```

**Worked examples:**

```sql
-- read-only access on one table
GRANT SELECT ON school.students TO 'alice'@'localhost';

-- full access on a whole database
GRANT ALL PRIVILEGES ON school.* TO 'bob'@'localhost';

-- check what a user has
SHOW GRANTS FOR 'bob'@'localhost';
```

## The three families of privilege

> [!EXAM]
> | Family | Privileges |
> |---|---|
> | **Data privileges** | `SELECT`, `INSERT`, `UPDATE`, `DELETE` |
> | **Structure privileges** | `CREATE`, `ALTER`, `DROP`, `INDEX` |
> | **Administrative privileges** | **`GRANT OPTION`** — allows the user to **grant privileges to others**; **`SUPER`** — superuser permissions; **`ALL PRIVILEGES`** — shorthand for all available privileges |

> [!TRAP]
> **`GRANT OPTION` is qualitatively different from every other privilege**, and it is the one to flag in an exam answer.
>
> The others let a user *act on data*. `GRANT OPTION` lets them **hand out privileges to other users** — so it is not a permission to do a thing, it is a permission to **create permissions**. Give it away and you have delegated part of the access-control system itself, and privileges can now spread without you granting anything further.
>
> Note that **`GRANT ALL PRIVILEGES` includes it**, which is why the casual `GRANT ALL ON *.*` is so much broader than it looks.

> [!INTUITION]
> The three families map neatly onto **who should hold them**:
>
> - **Data privileges** — ordinary application users and analysts. This is the day-to-day layer.
> - **Structure privileges** — developers and migration scripts. `DROP` on a production database is a genuinely dangerous grant.
> - **Administrative privileges** — the DBA, and as few others as possible.
>
> The **principle of least privilege** is the standard rule: grant the narrowest scope that lets the job get done. Prefer `GRANT SELECT ON school.students` over `GRANT ALL ON *.*` even when the second is quicker to type — and use **views** (previous topic) to narrow access further than a table boundary allows.

## Revoking privileges

> [!EXAM]
> To revoke an authorization we use the **`REVOKE`** statement. **It takes a form almost identical to that of `GRANT`**, with `FROM` in place of `TO`:
>
> ```sql
> REVOKE privileges
> ON     database.table
> FROM   'username'@'localhost';
> ```
>
> ```sql
> REVOKE SELECT ON school.* FROM 'alice'@'localhost';
> ```

## Roles in SQL

> [!EXAM]
> **Any authorization that can be granted to a user can be granted to a role. Roles are granted to users just as authorizations are.**
>
> **Create a role:**
> ```sql
> CREATE ROLE Assistant_employee;
> ```
>
> **Grant privileges to the role, exactly as to a user:**
> ```sql
> GRANT SELECT ON courses TO Assistant_employee;
> ```
>
> **Grant the role to a user — or to another role:**
> ```sql
> GRANT rolename TO user_name;
> GRANT Assistant_employee TO 'alice'@'localhost';
> ```
>
> **Revoke privileges from a role:**
> ```sql
> REVOKE INSERT, UPDATE, DELETE ON database_name FROM role_name;
> ```
>
> **Remove roles:**
> ```sql
> DROP ROLE role_name [, role_name, ...];
> DROP ROLE role1, role2;
> ```

> [!INTUITION]
> Look at how uniform the syntax is: **`GRANT <thing> TO <recipient>`**, where the *thing* may be a privilege **or a role**, and the *recipient* may be a user **or a role**.
>
> That single uniformity is what makes nesting work. `GRANT Junior_analyst TO Senior_analyst` composes the two, and a user granted `Senior_analyst` inherits everything transitively — building the **hierarchical permission structure** the definition mentions, with no extra machinery.

> [!EXAM]
> These statements — `GRANT` and `REVOKE` — are **DCL (Data Control Language)**, the fourth family of SQL commands alongside **DDL** (`CREATE`, `ALTER`, `DROP`), **DML** (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) and **TCL** (`COMMIT`, `ROLLBACK`) from Unit 1.

---

**Next:** code that the database runs by itself — **triggers**.
