---
subject: dbms
unit: 2
order: 19
slug: triggers
title: Triggers
summary: The event-condition-action model, every part of the CREATE TRIGGER syntax including BEFORE versus AFTER and FOR EACH ROW, NEW and OLD, and all three worked triggers — validation, cascade emulation and delete backup.
minutes: 13
tags: [sql, trigger, event-condition-action, before, after, for-each-row, new, old, signal, cascade, integrity]
---

# Triggers

> [!EXAM]
> **A trigger is a statement that the system executes automatically as a side effect of a modification to the database.**
>
> **Defining a trigger involves:**
> 1. **Specifying when a trigger needs to be executed**, which consists of two components:
>    - **Event** — which causes the trigger to be **checked**
>    - **Condition** — which must be **satisfied** for trigger execution to proceed
> 2. **Specifying the action** to be taken when the trigger executes
>
> Once we enter a trigger into the database, **the system executes it whenever the specified event occurs and the corresponding condition is satisfied.**

> [!INTUITION]
> That definition is the classic **ECA model — Event, Condition, Action**, and naming the three parts is usually worth the marks on its own.
>
> The word doing the most work is **automatically**. A trigger is not called by anyone. Application code performs an ordinary `INSERT`, unaware that a trigger exists, and the database runs extra logic on its own initiative.
>
> That is exactly the strength (the rule cannot be bypassed by forgetting to call it) **and** exactly the danger (behaviour that no line of application code explains).

## Why triggers

> [!EXAM]
> - Triggers can be used to **implement certain integrity constraints that cannot be specified using the constraint mechanism of SQL**.
> - They are useful for **alerting humans or starting certain tasks automatically** when certain conditions are met.
> - **Triggers usually cannot perform updates outside the database**, though some systems provide built-in support for **sending email from triggers**.
> - Applications include **maintaining database consistency, monitoring database updates, and updating derived data automatically**.

> [!NOTE]
> The textbook's motivating scenario: a student takes a new course and a tuple is inserted into `TAKES`. We could design a trigger that **updates the `STUDENT` relation, adding the course's credits to the student's total credits, whenever a new tuple is inserted into `TAKES`.**

> [!INTUITION]
> Read the first bullet as defining the **boundary of the declarative constraint system** from Unit 1.
>
> `CHECK`, `NOT NULL`, `UNIQUE` and `FOREIGN KEY` can only express conditions about **one row of one table, right now**. They cannot say *"the new salary may not be lower than the old one"* (that needs the previous value) or *"total credits must stay under 24"* (that needs other rows).
>
> **A trigger is the escape hatch for rules that need history, or context from elsewhere.** The corollary matters too: if a plain `CHECK` constraint *can* express your rule, use it — it is declarative, cheaper and visible in the schema.

## Syntax

```sql
CREATE TRIGGER trigger_name
(AFTER | BEFORE) (INSERT | UPDATE | DELETE) ON table_name
FOR EACH ROW
BEGIN
   -- variable declarations
   -- trigger code
END;
```

> [!EXAM]
> **Line by line:**
>
> | Part | Meaning |
> |---|---|
> | **`CREATE TRIGGER trigger_name`** | Specifies **the name of the trigger** |
> | **`table_name`** | The relation the trigger must **check for modification** |
> | **`INSERT \| UPDATE \| DELETE`** | The **type of modification** to be checked |
> | **`AFTER \| BEFORE`** | **When** the trigger must be checked — before or after the relation undergoes modification |
> | **`FOR EACH ROW`** | Multiple tuples could be modified by a single SQL statement, so this specifies that **the trigger code explicitly iterates over each modified row** |
> | **`BEGIN … END`** | The **action** — declaring any variables used and specifying the SQL statements to execute. **Actions could include the execution of stored procedures.** |

> [!TRAP]
> **`BEFORE` and `AFTER` are not stylistic alternatives — they determine what the trigger can do.**
>
> - **`BEFORE`** runs while the change is still pending, so it can **reject it** (as the validation example below does) or **modify the incoming values**.
> - **`AFTER`** runs once the change has been applied, so it **cannot prevent it** — but it can rely on the row actually existing, which is what you need for logging or for updating a derived total.
>
> Choose by asking: **do I need to veto this, or to react to it?**

## NEW and OLD

Trigger bodies refer to the row being modified through two pseudo-records:

> [!EXAM]
> | | Available in | Refers to |
> |---|---|---|
> | **`NEW.column`** | `INSERT`, `UPDATE` | The **incoming / updated** value |
> | **`OLD.column`** | `UPDATE`, `DELETE` | The **previous / deleted** value |
>
> There is no `OLD` on an insert (nothing existed before) and no `NEW` on a delete (nothing remains after). Both exist on an update — which is what makes "compare the old value with the new" possible.

## The sample database

Three tables are used for the examples:

- **`Student_sample(SRN, name)`** — student information, `SRN` being a unique identifier.
- **`Marks_sample(SRN, Course, Marks)`** — marks obtained by students in different courses.
- **`Marks_history(SRN, Course, Marks)`** — **a backup table storing information deleted from `Marks_sample`.** Initially empty.

## Example 1 — validating input

**Task:** Check whether the entered marks are valid whenever an entry is made in `Marks_sample`.

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

> [!NOTE]
> **How it works:** the keyword `BEFORE` specifies that trigger execution occurs **before the triggering operation is executed**. The action runs **for every row inserted** (`FOR EACH ROW`).
>
> If the `Marks` value is **less than 0 or greater than 100**, the trigger **raises an error, an appropriate message is displayed, and the tuple is not inserted** — because trigger execution occurs before insertion. If the condition is not satisfied, the tuple is inserted.
>
> Running `INSERT INTO Marks_sample VALUES (1,'C03',101);` → **the tuple does not get inserted**, as the marks value is greater than 100.

> [!DERIVE]
> **The before/after from the deck.** `Marks_sample` starts as:
>
> | SRN | Course | Marks |
> |---|---|---|
> | 1 | C01 | 98 |
> | 1 | C02 | 89 |
> | 2 | C01 | 100 |
> | 2 | C02 | 98 |
> | 2 | C03 | 80 |
> | 3 | C01 | 95 |
> | 3 | C02 | 98 |
>
> After the rejected insert the table is **byte-for-byte identical** — seven rows, no `(1, C03, 101)`. The error reported is:
>
> > **Error Code: 1644. Invalid marks: Marks must be between 0 and 100**
>
> Note the mismatch worth remembering: you write **`SQLSTATE '45000'`** in the trigger, but MySQL surfaces it to the client as **error 1644** (its generic code for a user-raised exception) carrying your `MESSAGE_TEXT`. The two numbers refer to the same event in two different error-numbering systems.
>
> Note also that `(2, C01, 100)` sits in the table quite legally — the check is `> 100`, so **100 is a valid mark** and the boundary is inclusive.

> [!TRAP]
> **The deck's own follow-up is the exam question:** running
>
> ```sql
> INSERT INTO Marks_sample VALUES (1,'C03',NULL);
> ```
>
> **inserts the tuple successfully.** The validation does not catch it.
>
> Why: the condition is `NEW.marks < 0 OR NEW.marks > 100`. With `NEW.marks` NULL, both comparisons are **UNKNOWN**, and from the truth table `UNKNOWN OR UNKNOWN = UNKNOWN` — so the `IF` does not fire and the NULL slips straight through.
>
> This is **three-valued logic breaking a validation check**, and it is the most instructive line in the deck. The fix is to test for it explicitly: `IF NEW.marks IS NULL OR NEW.marks < 0 OR NEW.marks > 100`.

> [!NOTE]
> **`SIGNAL SQLSTATE '45000'`** is MySQL's way of **raising a user-defined error** from inside a trigger or procedure. `45000` is the generic "unhandled user-defined exception" state, and `SET MESSAGE_TEXT` supplies the message shown to the caller.
>
> **`DELIMITER //`** is not part of the trigger. It temporarily changes the statement terminator so that the semicolons **inside** `BEGIN … END` are not read as the end of the `CREATE TRIGGER` statement. `DELIMITER ;` restores it afterwards.

## Example 2 — emulating ON UPDATE CASCADE

**Task:** Implement a trigger that mimics the behaviour of `ON UPDATE CASCADE`.

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

> [!NOTE]
> The trigger **updates the `SRN` values of tuples in `Marks_sample` which are related to the tuples in `Student_sample` being modified.**
>
> Running `UPDATE Student_sample SET SRN = 5 WHERE name = 'Harry';` **automatically updates the `SRN` values of all tuples in `Marks_sample` related to Harry.**
>
> **`SET FOREIGN_KEY_CHECKS = 0` disables all foreign key checks** (so no error is raised on a violation). This is done **temporarily** to update `Marks_sample`, after which checks are re-enabled with `SET FOREIGN_KEY_CHECKS = 1`.

> [!DERIVE]
> **Why the checks must be disabled at all.** Note the exact use of `OLD` and `NEW` — `WHERE SRN = OLD.SRN` finds the child rows by the *previous* key, and `SET SRN = NEW.SRN` writes the *new* one.
>
> The trigger is `BEFORE UPDATE`, so at the moment it runs, `Student_sample` **still holds the old SRN**. Writing `NEW.SRN` into the child rows therefore points them at a parent that **does not exist yet** — a foreign key violation, transiently. Disabling the check lets that intermediate state pass; by the time the parent update completes, the references are valid again.

> [!TRAP]
> The deck notes what happens **without** this trigger (and without `ON UPDATE CASCADE` in the foreign-key constraint): updating the `SRN` of a student **who has related rows in `Marks_sample` would throw an error**, while updating one **with no related rows would not**.
>
> That is a rule failing inconsistently depending on the data — the exact situation `ON UPDATE CASCADE` exists to fix. **Prefer the declarative `ON UPDATE CASCADE` when it is available**; this trigger is a demonstration of the mechanism, not a recommendation.

## Example 3 — backing up deleted rows

**Task:** Store all tuples deleted from `Marks_sample` in the `Marks_history` table.

```sql
DELIMITER //
CREATE TRIGGER backup_marks_info
BEFORE DELETE ON Marks_sample
FOR EACH ROW
BEGIN
    INSERT INTO Marks_history
    SELECT * FROM Marks_sample
    WHERE SRN = OLD.SRN AND COURSE = OLD.COURSE;
END //
DELIMITER ;
```

Running `DELETE FROM Marks_sample WHERE SRN = 2;` moves the matching rows into `Marks_history`, which had been empty.

> [!EXAM]
> **`BEFORE DELETE` is essential here.** The trigger reads the row **out of `Marks_sample`** in order to copy it — so it must run **while the row still exists**. An `AFTER DELETE` version of this exact code would find nothing to select and would silently back up nothing.
>
> Note also `WHERE SRN = OLD.SRN AND COURSE = OLD.COURSE` — **both** columns, because `{SRN, Course}` is the composite key of `Marks_sample`. Matching on `SRN` alone would back up every course for that student on each delete.

> [!INTUITION]
> The three examples are a complete tour of what triggers are for, and are worth remembering as a set:
>
> | Example | Purpose | Trigger type |
> |---|---|---|
> | `CheckMarks` | **Enforce a constraint** SQL can't express | `BEFORE INSERT` |
> | `update_marks_on_cascade` | **Maintain referential consistency** | `BEFORE UPDATE` |
> | `backup_marks_info` | **Audit / archive** history | `BEFORE DELETE` |
>
> One per event, one per purpose — validate, propagate, record.

---

**Next:** reusable business logic that returns a value — **stored functions**.
