---
subject: dbms
unit: 2
order: 21
slug: functions-procedures
title: Stored Procedures
summary: Pre-compiled SQL stored in the database, the four circumstances that justify them, the IN/OUT/INOUT parameter modes each worked through with a call, control flow with WHILE and IF, and the full stored procedure versus function comparison.
minutes: 13
tags: [sql, stored-procedure, procedure, in, out, inout, call, delimiter, while, drop-procedure]
---

# Stored Procedures

> [!EXAM]
> - **A procedure (often called a stored procedure) is a collection of pre-compiled SQL statements stored inside the database.**
> - It is a **subroutine or a subprogram** in the regular computing language.
> - **A procedure always contains a name, parameter lists, and SQL statements.**
> - We can **invoke procedures by using triggers, other procedures, and applications such as Java, Python, PHP** etc.

## Syntax

```sql
DELIMITER &&
CREATE PROCEDURE procedure_name
    ( [IN | OUT | INOUT] parameter_name datatype [, parameter datatype] )
BEGIN
    Declaration_section
    Executable_section
END &&
DELIMITER ;
```

**To call it:**

```sql
CALL procedure_name ( parameter(s) );
```

> [!TRAP]
> **A procedure is invoked with `CALL`; it cannot appear inside a `SELECT`.** This is the practical consequence of the whole function-vs-procedure distinction, and the most common mistake.
>
> `SELECT get_merit_student();` is an error. `CALL get_merit_student();` is correct.

## When are they useful

> [!EXAM]
> **Stored procedures are useful in the following circumstances:**
> 1. **If a database program is needed by several applications**, it can be **stored at the server and invoked by any of the application programs**. This **reduces duplication of effort and improves software modularity**.
> 2. **Executing a program at the server can reduce data transfer and communication cost** between client and server in certain situations.
> 3. They can **enhance the modeling power provided by views**, by allowing **more complex types of derived data** to be made available to database users.
> 4. They can be used to **check for complex constraints that are beyond the specification power of assertions and triggers**.

> [!INTUITION]
> Point 2 is the one with the sharpest justification. Consider a task that reads 100,000 rows and returns a single number.
>
> - **In the application:** fetch 100,000 rows across the network, loop, return 1 number.
> - **In a procedure:** the loop runs **on the server**, and **1 number** crosses the network.
>
> The computation is identical; the data movement differs by five orders of magnitude. **Move the code to the data, not the data to the code** — the same principle behind pushing filters into `WHERE` rather than filtering in the application.
>
> Point 4 continues the escalation from the **triggers** topic: `CHECK` constraints handle one row; triggers handle rules needing history or other tables; procedures handle whatever is left.

## Procedure without parameters

**Task:** Display all records whose marks are greater than 70, and count all the table rows.

```sql
DELIMITER $$
CREATE PROCEDURE `get_merit_student`()
BEGIN
    SELECT * FROM student WHERE marks > 70;
    SELECT COUNT(student_code) AS Total_Student FROM student;
END$$
DELIMITER ;
```

```sql
CALL get_merit_student();
```

> [!NOTE]
> The deck also shows the form `CREATE DEFINER='root'@'localhost' PROCEDURE …`. The **`DEFINER`** clause records **which account's privileges the procedure runs with** — MySQL adds it automatically if omitted, using the account that created the procedure.

> [!EXAM]
> Note that this procedure produces **two result sets** from one call. A stored **function** could not do this — it returns exactly one value. **Returning multiple result sets is something only a procedure can do.**

## The three parameter modes

> [!EXAM]
> | Mode | Behaviour |
> |---|---|
> | **`IN`** | **The default mode.** Takes a parameter **as input**. The calling program **has to pass an argument**. **This parameter's value is always protected** (the caller's variable cannot be changed) |
> | **`OUT`** | Used to **pass a parameter as output**. Its value **can be changed inside the procedure**, and the **changed (new) value is passed back to the calling program**. **A procedure cannot access the OUT parameter's initial value when it starts** |
> | **`INOUT`** | **A combination of IN and OUT.** The calling program can **pass the argument**, the procedure can **modify it**, and then **passes the new value back** |

> [!INTUITION]
> If you have met **pass-by-value** and **pass-by-reference**, the mapping is exact:
>
> - **`IN`** is pass-by-value — the procedure gets a copy, and the caller's variable is untouched ("always protected").
> - **`OUT`** is a return channel — the procedure writes into it and the caller reads the result.
> - **`INOUT`** is pass-by-reference — read in, write back out, through the same slot.
>
> The odd-looking clause *"a procedure cannot access the OUT parameter's initial value when it starts"* is what distinguishes `OUT` from `INOUT`: an `OUT` parameter arrives **empty** (NULL), even if the caller's variable held something. That is precisely why `INOUT` exists.

### IN parameter

```sql
DELIMITER &&
CREATE PROCEDURE get_student (IN var1 INT)
BEGIN
    SELECT * FROM student_info LIMIT var1;
    SELECT COUNT(stud_code) AS Total_Student FROM student_info;
END &&
DELIMITER ;
```

```sql
CALL get_student(3);     -- returns 3 rows
CALL get_student(5);     -- returns 5 rows
```

The `IN` parameter `var1` **accepts a number from the user**; the body **returns only those rows supplied by the user**, plus the total number of rows.

### OUT parameter

```sql
DELIMITER &&
CREATE PROCEDURE `display_max_mark` (OUT highestmark INTEGER)
BEGIN
    SELECT MAX(marks) INTO highestmark FROM student;
END&&
DELIMITER ;
```

```sql
CALL display_max_mark(@output);
SELECT @output;
```

> [!EXAM]
> **The two-step call pattern is the exam-relevant detail.** You must pass a **session variable** (`@output`, written with `@`), and then **`SELECT` it separately** to see the value. The `CALL` itself displays nothing.
>
> `SELECT MAX(marks) INTO highestmark` is again the **`SELECT … INTO`** assignment form from the functions topic — here writing into the `OUT` parameter.

### INOUT parameter

```sql
DELIMITER &&
CREATE PROCEDURE `display_marks` (INOUT var1 INTEGER)
BEGIN
    SELECT marks INTO var1 FROM student WHERE stud_id = var1;
END&&
DELIMITER ;
```

```sql
SET @M = '3';
CALL display_marks(@M);
SELECT @M;
```

> [!DERIVE]
> **Trace what `var1` holds.** The deck's description: *"the body first fetches the marks from the table with the specified id and then stores it into the same variable `var1`. The `var1` first acts as the IN parameter and then the OUT parameter."*
>
> 1. On entry, `var1` = **3** — used as the **student id** in the `WHERE` clause. *(acting as IN)*
> 2. `SELECT marks INTO var1` **overwrites it** with that student's marks. *(acting as OUT)*
> 3. `SELECT @M` now shows **the marks**, not the 3 that went in.
>
> The same slot means two different things before and after the call, which is exactly what `INOUT` is. It is also why `INOUT` is easy to misuse — the caller's variable is silently destroyed.

## Control flow: WHILE and IF-ELSE

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
DELIMITER ;
```

> [!NOTE]
> The deck's own explanation: *"This WHILE loop continues to process students until the `done` flag is set to 1. Inside the loop, we retrieve the marks and `student_name` for one student at a time, check if they passed or failed, and then set the `done` flag to 1 to exit the loop after processing one student."*

> [!TRAP]
> **Read the last two lines together: `SET done = 1` is inside the loop, so the loop body runs exactly once.** Despite being written as a `WHILE`, this procedure processes **one student**, not all of them.
>
> The `WHERE done = 0` in the `SELECT` is also suspect — `done` is a local variable, not a column, so the condition is `0 = 0`, true for every row, and `LIMIT 1` simply takes an arbitrary one.
>
> Take the code as a demonstration of **`WHILE … DO … END WHILE`, `IF … ELSE … END IF`, `DECLARE … DEFAULT` and `CONCAT` syntax** — which is what it is examined on. Iterating properly over a result set requires a **cursor**, which this deck does not cover.

## Dropping and listing

> [!EXAM]
> ```sql
> DROP PROCEDURE [IF EXISTS] procedure_name;
> DROP PROCEDURE display_marks;
> ```
>
> **When the procedure is dropped, it is removed from the database server also.** Verify by listing procedures:
>
> ```sql
> SHOW PROCEDURE STATUS [LIKE 'pattern' | WHERE search_condition];
> SHOW PROCEDURE STATUS WHERE db = 'mystudentdb';
> ```

## Stored procedure vs function

> [!EXAM]
> | Stored Procedure | Function |
> |---|---|
> | **Supports `IN`, `OUT` and `INOUT` parameters** — input and output parameters | **Supports only input parameters, no output parameters** |
> | **Stored procedures can call functions** as needed | **The function cannot call a stored procedure** |
> | **There is no provision to call procedures from `SELECT`/`HAVING`/`WHERE` statements** | **You can call functions from a `SELECT` statement** |
> | **Transactions can be used** in stored procedures | **No transactions are allowed** |
> | **Can do exception handling** by inserting try/catch blocks | **No provision for explicit exception handling** |
> | **Need not return any value** | **Must return a result or value to the caller** |
> | **All database operations like insert, update, delete can be performed** | **Only `SELECT` is allowed** |

> [!INTUITION]
> The seven rows collapse to a single distinction:
>
> > **A function is an expression; a procedure is a program.**
>
> A function must behave like a value — it **must return** exactly one, may be **used wherever a value is legal** (including inside `SELECT`), and is therefore restricted to reading data so that evaluating it does not change the database mid-query.
>
> A procedure is a **command**. It may return nothing or several result sets, may **modify data**, manage **transactions**, and handle **exceptions** — and precisely because it can do all that, it may **not** be embedded in an expression. Imagine a `WHERE` clause calling something that deletes rows while the query is running.
>
> Derive all seven rows from that one sentence rather than memorising the table.

---

**Next:** calculations across rows that keep every row — **window functions**.
