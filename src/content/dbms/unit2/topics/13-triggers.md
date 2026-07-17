---
subject: dbms
unit: 2
order: 13
slug: triggers
title: Triggers
summary: Statements the DBMS runs automatically on data changes — the event-condition-action model, CREATE TRIGGER syntax, BEFORE/AFTER timing, FOR EACH ROW with NEW/OLD, and worked validation/cascade/backup examples.
minutes: 14
tags: [sql, trigger, before-after, new-old, event-condition-action]
---

# Triggers

A **trigger** is a statement the system executes **automatically as a side effect** of a database modification.

## Event–Condition–Action

Defining a trigger means specifying three things:

1. **Event** — the modification that *checks* the trigger: `INSERT`, `UPDATE`, or `DELETE`.
2. **Condition** — a test that must hold for the action to run.
3. **Action** — what executes when the condition holds.

**Why triggers?** They can enforce **integrity constraints not expressible** with ordinary SQL constraints, **alert** users or **auto-start tasks**, and **maintain derived data** (e.g. add a course's credits to a student's total whenever a `TAKES` row is inserted — Silberschatz §5.3). Triggers usually **cannot act outside the database**.

## Syntax

```sql
CREATE TRIGGER trigger_name
{AFTER | BEFORE} {INSERT | UPDATE | DELETE} ON table_name
FOR EACH ROW
BEGIN
    -- variable declarations + trigger code
END;
```

- **BEFORE / AFTER** — fire before or after the modification.
- **`FOR EACH ROW`** — a **row-level** trigger; the body runs **once per affected row** (one statement may touch many rows).
- **`NEW`** — the new row's values (INSERT/UPDATE). **`OLD`** — the old row's values (UPDATE/DELETE).

> [!INTUITION]
> **BEFORE** triggers are for **validating or fixing** a row *before* it lands (you can reject it or rewrite `NEW`). **AFTER** triggers are for **reacting** to a change that has already happened (logging, cascading, maintaining totals).

## Worked examples

Sample schema: `Student_sample(SRN, name)`, `Marks_sample(SRN, Course, Marks)`, `Marks_history(SRN, Course, Marks)` (a backup table).

**1 — Validate input (reject bad data) with BEFORE INSERT:**

```sql
DELIMITER //
CREATE TRIGGER CheckMarks
BEFORE INSERT ON Marks_sample
FOR EACH ROW
BEGIN
    IF NEW.marks < 0 OR NEW.marks > 100 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid marks: Marks must be between 0 and 100';
    END IF;
END;//
DELIMITER ;
```

Inserting marks `101` is **rejected** (BEFORE ⇒ the bad row never enters). `SIGNAL SQLSTATE '45000'` raises a user-defined error.

> [!TRAP]
> Inserting `NULL` marks **passes** this trigger: `NULL < 0` and `NULL > 100` both evaluate to **UNKNOWN**, so the `IF` condition is not TRUE and no error is raised. Three-valued logic strikes again — guard with `NEW.marks IS NULL` if nulls should be blocked.

**2 — Emulate `ON UPDATE CASCADE`:**

```sql
DELIMITER //
CREATE TRIGGER update_marks_on_cascade
BEFORE UPDATE ON Student_sample
FOR EACH ROW
BEGIN
    SET FOREIGN_KEY_CHECKS = 0;
    UPDATE Marks_sample SET SRN = NEW.SRN WHERE SRN = OLD.SRN;
    SET FOREIGN_KEY_CHECKS = 1;
END;//
DELIMITER ;
```

Changing a student's `SRN` cascades to all their `Marks_sample` rows. `FOREIGN_KEY_CHECKS = 0/1` temporarily suspends FK checking during the update.

**3 — Archive deleted rows with BEFORE DELETE:**

```sql
DELIMITER //
CREATE TRIGGER backup_marks_info
BEFORE DELETE ON Marks_sample
FOR EACH ROW
BEGIN
    INSERT INTO Marks_history
    SELECT * FROM Marks_sample WHERE SRN = OLD.SRN AND COURSE = OLD.COURSE;
END //
DELIMITER ;
```

Each deleted row is copied into `Marks_history` first — the standard audit/archive pattern.

**4 — A BEFORE trigger that *rewrites* NEW (on the COMPANY `EMPLOYEE` table):**

```sql
DELIMITER //
CREATE TRIGGER SALARY_VIOLATION
BEFORE INSERT ON EMPLOYEE
FOR EACH ROW
BEGIN
    IF NEW.SALARY > 40000 THEN SET NEW.SALARY = 25000; END IF;
END //
DELIMITER ;
```

> [!INTUITION]
> Unlike the validate-and-reject pattern, this BEFORE trigger **silently corrects** the row: assigning to `NEW.SALARY` changes the value that actually gets stored. Only a **BEFORE** trigger can modify `NEW` — by AFTER, the row is already written.

A trigger can also **call a stored procedure** to enforce a rule (e.g. an employee may not out-earn their supervisor):

```sql
DELIMITER $$
CREATE TRIGGER SALARY_CHECK BEFORE INSERT ON EMPLOYEE FOR EACH ROW
BEGIN
    IF NEW.salary > (SELECT salary FROM employee WHERE ssn = NEW.superssn) THEN
        CALL inform_supervisor(NEW.superssn, NEW.salary);   -- procedure raises SIGNAL
    END IF;
END$$
DELIMITER ;
```

> [!NOTE]
> `DELIMITER //` temporarily changes the statement terminator so the `;` *inside* the trigger body isn't read as the end of `CREATE TRIGGER`; `DELIMITER ;` restores it. Triggers vs assertions (Elmasri Review 7.4e): an **assertion** is a passive constraint that must always hold; a **trigger** is an active program that *fires* on an event.

---

**Next:** reusable stored logic — **functions & procedures**.
