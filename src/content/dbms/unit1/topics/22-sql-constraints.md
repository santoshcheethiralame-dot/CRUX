---
subject: dbms
unit: 1
order: 22
slug: sql-constraints
title: SQL Constraints & Keys
summary: Superkey, candidate key and primary key with the CAR example, entity and referential integrity, and how each is written in SQL — NOT NULL, DEFAULT, PRIMARY KEY, UNIQUE, FOREIGN KEY with all four referential actions, CHECK, and named constraints.
minutes: 13
tags: [constraints, superkey, candidate-key, primary-key, unique, foreign-key, referential-action, cascade, check, not-null]
---

# SQL Constraints & Keys

## The motivating scenario

> [!NOTE]
> *You are designing a database for a hospital management system. A patient's age was recorded in the **height** column, leading to incorrect medical records. Two patients with the **same name** have had their records **mixed up**, which is highly dangerous and potentially life-threatening.*
>
> **How can we design the database to prevent such data entry errors?** *(Hint: enforcing certain "rules")*

> [!INTUITION]
> The scenario names exactly two failures, and they map onto exactly two constraints:
>
> - age written into the height column → a **domain constraint** would have rejected it
> - two patients confused by name → a **key constraint** would have forced a unique identifier
>
> That is the entire argument for constraints in one story: **rules the database enforces cannot be forgotten by the person typing.** Validation in application code is optional and gets bypassed; a constraint does not.

---

## Keys

> [!NOTE]
> In a relation, **no two tuples can be identical across all attributes**, and each tuple must have a set of attributes with unique values to ensure **distinct identification**.

### Superkey

> [!NOTE]
> A **superkey** is **a set of one or more attributes that, taken collectively, allow us to uniquely identify a tuple** in the relation.
>
> Formally, $SK$ is a superkey of $R$ if **no two tuples in any valid relation state have the same value for $SK$** — for any distinct $t_1, t_2$: $t_1[SK] \neq t_2[SK]$. **This condition must hold in any valid state.**

For `instructor`, **`ID` is a superkey**. **`name` is not**, because several instructors might share a name.

### From superkey to candidate key

> [!EXAM]
> Given `Instructor(ID, name, dept_name, salary)`:
> - `{ID}` is a superkey.
> - **Is `{ID, name}` also a superkey? Yes.**
> - **A superkey may contain extraneous attributes.** If $SK$ is a superkey, **so is any superset of $SK$**.
> - We are often interested in superkeys **for which no proper subset is a superkey**. Such **minimal superkeys are called candidate keys**.

**The CAR example:** `Car(State, Reg#, SerialNo, Make, Model, Year)`
- `SerialNo` is unique for the car → a candidate key
- `{State, Reg#}` together are also unique → also a candidate key

> **A relation schema may have more than one minimal superkey. In this case, each of them is called a candidate key.**

### Primary key

> [!NOTE]
> If a relation has several candidate keys, **one is chosen arbitrarily to be the primary key**, and its attributes are **underlined**.
>
> - The primary key value **uniquely identifies each tuple** and **provides the tuple identity**.
> - It is **also used to reference the tuple from another tuple**.
> - **General rule: choose as primary key the smallest of the candidate keys** (in terms of size) — **not always applicable; the choice is sometimes subjective**.
> - It is **customary to list the primary key attributes before the other attributes**.

> [!EXAM]
> **Primary keys must be chosen with care.**
> - A person's **name is insufficient** — many people share a name.
> - In our country the **Aadhaar number** would be a candidate key.
> - **The primary key should be chosen such that its attribute values are never, or very rarely, changed.** The **address** field should not be part of a primary key, since it is likely to change.
>
> A **composite** example: `classroom(building, room_number, capacity)` — **neither attribute alone identifies a classroom, but together they do**.

> [!TRAP]
> **Superkey ⊇ candidate key ⊇ primary key.** Every candidate key is a superkey; only the minimal ones are candidate keys; exactly one of those is chosen as primary. Being asked *"is {ID, name} a key?"* has the answer **"it is a superkey but not a candidate key"** — the qualifier is what earns the mark.

---

## The integrity constraints

### Entity integrity

> [!NOTE]
> **The primary key attributes PK of each relation cannot have null values in any tuple**: $t[PK] \neq \text{null}$.
>
> This is because **primary key values are used to identify individual tuples**. **If PK has several attributes, null is not allowed in any of them.**
>
> Note: **other attributes may also be constrained to disallow nulls, even though they are not part of the primary key.**

### Foreign key and referential integrity

> [!NOTE]
> A **foreign-key constraint** from attribute(s) $A$ of $r_1$ to the primary key $B$ of $r_2$ states that **the value of $A$ for each tuple in $r_1$ must also be the value of $B$ for some tuple in $r_2$**.
>
> - $r_1$ is the **referencing relation**; $r_2$ is the **referenced relation**.
> - **In a foreign-key constraint, the referenced attribute(s) must be the primary key of the referenced relation.**

Example: `Instructor(ID, name, Dept_name, Salary)` and `Department(Dept_name, building, budget)` — `Dept_name` in `instructor` is a foreign key referencing `department`, where it is the primary key.

> [!EXAM]
> **Referential integrity is the more general case.** It **relaxes the requirement that the referenced attributes form the primary key**.
>
> **Foreign-key constraints are a special case of referential integrity constraints**, where the referenced attributes *do* form the primary key. And in practice: **database systems today typically support foreign-key constraints, but not referential integrity constraints where the referenced attribute is not a primary key.**

The full statement: the value in $FK$ of $R_1$ can be either **a value of an existing primary key in $R_2$**, **or a null**. Additionally, **the FK in $R_1$ should not be a part of its own primary key.**

---

## Writing constraints in SQL

> [!NOTE]
> **Constraints are the conditions and restrictions applied on the database.** Before inserting data we check some condition; **only if it holds is the data inserted**. Constraints can be specified **when the table is created with `CREATE TABLE`, or after, with `ALTER TABLE`**.

> [!EXAM]
> **The relational model has three basic constraint types supported in SQL:**
>
> | Constraint | Rule |
> |---|---|
> | **Key constraint** | A primary key value **cannot be duplicated** |
> | **Entity integrity** | A primary key value **cannot be null** |
> | **Referential integrity** | A foreign key **must have a value already present as a primary key, or may be null** |

### NOT NULL and DEFAULT

```sql
Dnumber INT NOT NULL
Dlocation VARCHAR(15) NOT NULL DEFAULT 'Banglore'
```

> [!NOTE]
> - **`NOT NULL`** may be specified if NULL is not permitted. It is **always implicitly specified for the attributes of the primary key**, but can be specified for any other attribute too.
> - **`DEFAULT <value>`** is included in any new tuple **if an explicit value is not provided**.
> - **If no default clause is specified, the default default value is NULL** for attributes without `NOT NULL`.

> [!TRAP]
> That last sentence explains the `NOT NULL` insert failure from earlier in the unit. Omit a column and it takes its default; with no `DEFAULT` declared, that default **is NULL**; and `NOT NULL` then rejects it. **`NOT NULL` with no `DEFAULT` makes a column mandatory in every INSERT.**

### PRIMARY KEY and UNIQUE

```sql
Dnumber INT PRIMARY KEY;
Dname VARCHAR(15) UNIQUE;
```

> [!EXAM]
> **`UNIQUE` specifies alternate (secondary) keys — called CANDIDATE keys in the relational model.** So the theory maps directly onto syntax: **one candidate key becomes `PRIMARY KEY`; the others become `UNIQUE`.**
>
> And the practical difference: **`PRIMARY KEY` = `UNIQUE` + `NOT NULL`**. A `UNIQUE` column still permits nulls.

### FOREIGN KEY and referential actions

> [!NOTE]
> **Default operation: reject update on violation.** You may attach a **referential triggered action clause**, with options **`SET NULL`, `CASCADE`, and `SET DEFAULT`**. The action taken for `SET NULL` or `SET DEFAULT` **is the same for both `ON DELETE` and `ON UPDATE`**, and **`CASCADE` is suitable for "relationship" relations**.

```sql
FOREIGN KEY (foreign_key_columns)
  REFERENCES parent_table(parent_key_columns)
  ON UPDATE action
  ON DELETE action;
```

> [!EXAM]
> **The four ON DELETE actions:**
>
> | Action | Behaviour |
> |---|---|
> | **`NO ACTION`** | Raises an error and **rolls back** the delete on the parent row. **This is the default if you specify nothing.** |
> | **`CASCADE`** | **Deletes the child rows** corresponding to the deleted parent row |
> | **`SET NULL`** | Sets the child rows to NULL. **The foreign key columns must be nullable.** |
> | **`SET DEFAULT`** | Sets the child rows to their default values. **The foreign key columns must have default definitions.** (A nullable column defaults to NULL if none is specified.) |
>
> **`ON UPDATE` has the same four options**, behaving analogously when the parent's key value changes.

> [!TRAP]
> Note the **preconditions** attached to two of them — they are commonly asked and commonly missed:
> - **`SET NULL` requires the FK column to be nullable.** You cannot use it on a `NOT NULL` foreign key, or on one that is part of the primary key.
> - **`SET DEFAULT` requires a default to exist** on the FK column.
>
> This is why the choice of referential action is constrained by how you declared the column — the two decisions are not independent.

### CHECK

```sql
Dnumber INT NOT NULL CHECK (Dnumber > 0 AND Dnumber < 21);
```

> [!NOTE]
> Additional constraints **on individual tuples** are possible using `CHECK`. A **`CHECK` clause at the end of a `CREATE TABLE` statement applies to each tuple individually**:
>
> ```sql
> CHECK (Dept_create_date <= Mgr_start_date);
> ```

> [!INTUITION]
> `CHECK` is where **application-based (semantic) constraints** finally become **schema-based** ones. *"A manager cannot start before the department exists"* is a business rule, not something the relational model knows — but `CHECK` pulls it inside the database, where it cannot be bypassed.

### Naming constraints

> [!NOTE]
> Using the keyword **`CONSTRAINT`** names a constraint — **useful for later altering**.

```sql
CREATE TABLE EMPLOYEE ( ...,
  Dno INT NOT NULL DEFAULT 1,
  CONSTRAINT EMPPK PRIMARY KEY (Ssn),
  CONSTRAINT EMPSUPERFK
    FOREIGN KEY (Super_ssn) REFERENCES EMPLOYEE(Ssn)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT EMPDEPTFK
    FOREIGN KEY (Dno) REFERENCES DEPARTMENT(Dnumber)
    ON DELETE SET DEFAULT ON UPDATE CASCADE
);
```

> [!EXAM]
> Read this example closely — it demonstrates several things at once:
> - **`EMPSUPERFK` is a self-reference**: `EMPLOYEE.Super_ssn` references `EMPLOYEE.Ssn`. That is the **recursive SUPERVISION relationship** from the ER model, mapped to SQL.
> - Its action is **`ON DELETE SET NULL`** — delete a supervisor and their reports simply lose their supervisor, rather than being deleted themselves. `Super_ssn` is nullable, which is what permits this.
> - **`EMPDEPTFK` uses `ON DELETE SET DEFAULT`**, which works because `Dno` was declared **`DEFAULT 1`** — delete a department and its employees fall back to department 1.
>
> **Naming matters because an unnamed constraint gets a system-generated name**, which you then cannot easily reference in a later `ALTER TABLE ... DROP CONSTRAINT`.

---

## The deck's Q&A

> [!EXAM]
> - **What is a domain constraint?** → **A constraint that ensures valid data types for attributes.**
> - **Which integrity constraint ensures a value in one table exists in another?** → **Referential integrity.**

---

**Next:** putting data in and getting it out — **SQL DML**.
