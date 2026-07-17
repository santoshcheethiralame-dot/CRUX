---
subject: dbms
unit: 2
order: 14
slug: functions-procedures
title: Functions & Stored Procedures
summary: Storing business logic in the database — user-defined functions (RETURNS, DETERMINISTIC), stored procedures with IN/OUT/INOUT parameters and control flow, and how functions differ from procedures.
minutes: 13
tags: [sql, function, stored-procedure, in-out-inout, udf]
---

# Functions & Stored Procedures

Both let you store **business logic** in the database and call it from SQL. They can be written in SQL's procedural language (PSM) or an external language (Java/C/C++). User-written functions are **User-Defined Functions (UDFs)**.

## Functions

A function **accepts parameters and returns a single value** (or a table). Ideal for a formula reused across many queries.

```sql
CREATE FUNCTION function_name (parameter_list)
RETURNS data_type [DETERMINISTIC]
BEGIN
    -- statements
    RETURN value;
END;

DROP FUNCTION IF EXISTS function_name;     -- delete
```

- **RETURNS** declares the return type; hitting `RETURN` ends the function and yields the value.
- **DETERMINISTIC** — same inputs always give the same output. **Functions are NON-DETERMINISTIC by default**, so mark pure functions explicitly.

```sql
-- Bucket a department by headcount
CREATE FUNCTION Dept_size(deptno INT)
RETURNS VARCHAR(7)
BEGIN
    DECLARE No_of_emps INT;
    SELECT COUNT(*) INTO No_of_emps FROM EMPLOYEE WHERE Dno = deptno;
    IF     No_of_emps > 3 THEN RETURN 'HUGE';
    ELSEIF No_of_emps > 2 THEN RETURN 'LARGE';
    ELSEIF No_of_emps > 1 THEN RETURN 'MEDIUM';
    ELSE                       RETURN 'SMALL';
    END IF;
END;
-- SELECT Dname, Dnumber, Dept_size(Dnumber) FROM department;
```

```sql
-- A deterministic helper: age in whole years
CREATE FUNCTION no_of_years(date1 DATE)
RETURNS INTEGER DETERMINISTIC
BEGIN
    DECLARE date2 DATE;
    SELECT current_date() INTO date2;
    RETURN year(date2) - year(date1);
END;
```

## Stored procedures

A **stored procedure** is a collection of **pre-compiled SQL statements** stored in the database — a subroutine invoked from triggers, other procedures, or apps. Unlike a function it **need not return a value** and is **called**, not used inside an expression.

```sql
DELIMITER &&
CREATE PROCEDURE procedure_name ([IN | OUT | INOUT] param datatype, ...)
BEGIN
    -- declaration + executable sections
END &&
DELIMITER ;

CALL procedure_name(args);
DROP PROCEDURE IF EXISTS procedure_name;
```

**Why procedures?** share one program across applications (stored server-side), **cut client-server data transfer**, extend views with complex derived data, and check constraints beyond triggers/assertions.

### Parameter modes

| Mode | Direction | Notes |
|---|---|---|
| **IN** | input (default) | caller passes a value; the procedure can't change the caller's variable |
| **OUT** | output | procedure sets it and returns it; its initial value is invisible inside |
| **INOUT** | both | caller passes in, procedure modifies, new value returns |

```sql
-- OUT: return the maximum mark to the caller
DELIMITER &&
CREATE PROCEDURE display_max_mark (OUT highestmark INT)
BEGIN
    SELECT MAX(marks) INTO highestmark FROM student;
END&&
DELIMITER ;
-- CALL display_max_mark(@m);  SELECT @m;
```

### Control flow

Procedures support `IF/ELSEIF/ELSE`, `WHILE`, `REPEAT`, `CASE`, and loops:

```sql
CREATE PROCEDURE StudentMarksWithLoop()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE marks INT;
    DECLARE student_name VARCHAR(25);
    WHILE done = 0 DO
        SELECT marks, student_name INTO marks, student_name
        FROM student WHERE done = 0 LIMIT 1;
        IF marks >= 50 THEN
            SELECT CONCAT(student_name, ' passed') AS Result;
        ELSE
            SELECT CONCAT(student_name, ' failed') AS Result;
        END IF;
        SET done = 1;
    END WHILE;
END //
```

## Function vs Procedure

| | Stored Procedure | Function |
|---|---|---|
| Return | optional (via OUT params / result sets) | **must return** one value (or table) |
| Invocation | `CALL proc(...)`, standalone | used **inside an expression** (SELECT/WHERE) |
| Parameters | IN, OUT, INOUT | IN only |
| Can call the other? | can call functions | **cannot** call a procedure |
| Typical use | multi-step DML, business transactions | computed values inside queries |

> [!EXAM]
> Key distinctions: a **function returns exactly one value and is used in an expression**; a **procedure is `CALL`ed, can have `OUT`/`INOUT` parameters, and need not return anything**. A procedure can call a function, but a function cannot call a procedure.

> [!NOTE]
> SQL allows **overloading** — several procedures (or functions) with the same name, distinguished by their number/type of arguments (Silberschatz §5.2).

---

**Next:** calculations across related rows — **window functions**.
