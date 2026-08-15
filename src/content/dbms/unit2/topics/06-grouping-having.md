---
subject: dbms
unit: 2
order: 6
slug: grouping-having
title: Grouping — GROUP BY & HAVING
summary: Partitioning a relation into groups, the rule governing what may appear in SELECT, HAVING as the filter for groups, and the deck's fully worked demonstration of a query that looks right, runs, and answers the wrong question.
minutes: 14
tags: [sql, group-by, having, where, aggregate, grouping-attribute, null, order-of-execution]
---

# Grouping — GROUP BY & HAVING

## Why group

> [!NOTE]
> In many cases we want to apply aggregate functions to **subgroups of tuples** based on some attribute values — the average salary of employees **in each department**, or the number of employees **on each project**.
>
> In such cases we **partition the relation into non-overlapping subsets (groups) of tuples**.

> [!EXAM]
> The attributes used to partition a relation into groups are called **grouping attributes**. **All tuples that have the same values for all grouping attributes are placed in the same group.**
>
> **If NULLs exist in the grouping attribute, then a separate group is created for all tuples with a NULL value in the grouping attribute.**
>
> Aggregate functions can then be applied **independently to each group**.

> [!TRAP]
> That NULL rule is a genuine inconsistency worth noting explicitly. In a `WHERE` clause `NULL = NULL` is UNKNOWN, so NULLs never match each other — yet `GROUP BY` **gathers all the NULLs into one group**, treating them as equal.
>
> This is the same exception you met in **NULL Values**, where `DISTINCT` and the set operators also treat two NULLs as identical. The pattern: **when SQL is deduplicating or grouping, NULLs are equal; when it is comparing in a predicate, they are not.**

## GROUP BY

**Example:** For each department, retrieve the department number, the number of employees, and their average salary.

```sql
SELECT Dno, COUNT(*), AVG(Salary)
FROM   EMPLOYEE
GROUP BY Dno;
```

Here `Dno` is the grouping attribute. `EMPLOYEE` is partitioned so that **each group has tuples with the same value of `Dno`** — i.e. each group consists of employees who work for the same department — and `COUNT` and `AVG` are **applied to each group independently**.

> [!DERIVE]
> **The deck's illustration, with the actual EMPLOYEE rows.** Eight employees, grouped by `Dno`:
>
> | Fname | Lname | Salary | Dno |
> |---|---|---|---|
> | John | Smith | 30000 | 5 |
> | Franklin | Wong | 40000 | 5 |
> | Ramesh | Narayan | 38000 | 5 |
> | Joyce | English | 25000 | 5 |
> | Alicia | Zelaya | 25000 | 4 |
> | Jennifer | Wallace | 43000 | 4 |
> | Ahmad | Jabbar | 25000 | 4 |
> | James | Borg | 55000 | 1 |
>
> Three groups form, and the aggregates are applied to each independently:
>
> | Dno | COUNT(*) | AVG(Salary) |
> |---|---|---|
> | **5** | 4 | $\frac{30000+40000+38000+25000}{4} = 33250$ |
> | **4** | 3 | $\frac{25000+43000+25000}{3} = 31000$ |
> | **1** | 1 | $55000$ |
>
> Eight rows in, **three rows out** — one per distinct value of the grouping attribute. Keep these numbers; the WHERE-vs-HAVING trap later on this page resolves against exactly this data.

> [!EXAM]
> Two rules govern what may appear where:
>
> - The grouping attributes **should be present in the `SELECT` clause as well**, so their values appear in the result alongside the aggregated values.
> - **The `SELECT` clause must contain only the grouping attributes and aggregate functions applied to each group.**

> [!INTUITION]
> The second rule sounds like bureaucracy but it is forced by arithmetic. After grouping, **one row of output stands for many rows of input**.
>
> A grouping attribute is safe because it is *by construction* identical across the whole group — that is what defined the group. An aggregate is safe because it is a function *of* the whole group. But a plain non-grouping column like `Fname` has **many different values inside one group and one slot to print them in**. The question "which employee's name?" has no answer.
>
> So the rule is not a restriction SQL invented — it is the only thing that makes sense.

## GROUP BY with a join

**Example:** For each project, retrieve the project number, the project name, and the number of employees who work on that project.

```sql
SELECT Pnumber, Pname, COUNT(*)
FROM   PROJECT, WORKS_ON
WHERE  Pnumber = Pno
GROUP BY Pnumber, Pname;
```

> [!NOTE]
> In such statements, relations are **first joined** using the condition specified in the `WHERE` clause. **Grouping and aggregation are then performed on the result of this joining.**

Note that **two** attributes are grouped on. `Pnumber` alone determines the group; `Pname` is added only because the `SELECT` rule above requires every selected non-aggregate column to be a grouping attribute.

A three-table version, adding a filter:

```sql
SELECT Pnumber, Pname, COUNT(*)
FROM   PROJECT, WORKS_ON, EMPLOYEE
WHERE  Pnumber = Pno AND Dno = 5 AND Ssn = Essn
GROUP BY Pnumber, Pname;
```

## HAVING

> [!EXAM]
> **The `HAVING` clause is used to specify conditions for *groups of tuples*, whereas the `WHERE` clause is used to specify conditions for *individual tuples*.**
>
> `HAVING` provides a condition on the **summary information** regarding the group of tuples associated with each value of the grouping attributes. **Only the groups that satisfy the condition are retrieved.**

**Example:** For each project on which **more than two employees work**, retrieve the project number, name, and employee count.

```sql
SELECT Pnumber, Pname, COUNT(*)
FROM   PROJECT, WORKS_ON
WHERE  Pnumber = Pno
GROUP BY Pnumber, Pname
HAVING COUNT(*) > 2;
```

## WHERE vs HAVING

> [!EXAM]
> The deck's comparison table:
>
> | Aspect | WHERE | HAVING |
> |---|---|---|
> | **Purpose** | Filters **rows** before grouping/aggregation | Filters **groups / aggregated results** after `GROUP BY` |
> | **When is it applied** | Applied **before** grouping | Applied **after** grouping |
> | **Works on** | **Individual row values** (columns) | **Aggregated values** (like `SUM()`, `COUNT()`) |
> | **Use of aggregates** | **Cannot** use aggregate functions | **Can** use aggregate functions |
> | **Order of execution** | First `WHERE` is executed, then subsequent statements | `HAVING` is executed **after** `WHERE` has been applied |

## The trap: a query that runs and lies

This is the most valuable sequence in the deck. The stated task:

> *Retrieve the count of employees whose salary exceeds \$40,000 in each department, **but only for those departments where more than two employees work**.*

The natural attempt:

```sql
SELECT Dno, COUNT(*) FROM EMPLOYEE
WHERE  Salary > 40000
GROUP BY Dno
HAVING COUNT(*) > 2;
```

> [!TRAP]
> **At the outlook, this might seem like the correct query. Closer inspection reveals it is not.**
>
> Because `WHERE` runs first, the `HAVING` clause never sees the whole department — **it only ever sees the high earners**. So `COUNT(*) > 2` asks for *"departments with more than two employees **who each earn more than \$40,000**"*, not *"departments with more than two employees"*.
>
> The deck runs it: the output is **an empty relation**, because no department satisfies that stricter condition.
>
> The query has valid syntax, executes without error, and returns a plausible-looking result. **It simply answers a different question.**

### The correct query

The fix is to compute the department-size condition **on the unfiltered table**, in a separate subquery:

```sql
SELECT Dno, COUNT(*) FROM EMPLOYEE
WHERE  Salary > 40000
  AND  Dno IN ( SELECT Dno FROM EMPLOYEE
                GROUP BY Dno HAVING COUNT(*) > 2 )
GROUP BY Dno;
```

The deck's reading of the result: **there is only one employee with a salary greater than \$40,000 belonging to a department (department 4) with more than two employees.** All other departments either have two or fewer employees, or have nobody earning over \$40,000.

> [!DERIVE]
> **Check it against the eight rows from earlier on this page** — this is why both queries behave as they do.
>
> **Who earns over \$40,000?** Jennifer Wallace (43000, Dno 4) and James Borg (55000, Dno 1). **Two people.**
>
> **Which departments have more than two employees?** Dno 5 (four) and Dno 4 (three). **Not Dno 1**, which has one.
>
> **The correct query** intersects these: of the two high earners, only Jennifer is in a qualifying department. Result: **Dno 4, count 1.**
>
> **The incorrect query** filters to the two high earners *first*, then groups them — Dno 4 gets a group of size 1, Dno 1 a group of size 1. Neither survives `HAVING COUNT(*) > 2`, so the result is **empty**.
>
> Notice how close the two are: the incorrect version does not merely lose a row, it **loses the only correct answer** and reports nothing at all.

> [!INTUITION]
> The general principle is worth carrying out of this topic:
>
> **When two conditions must be evaluated against different populations, one `WHERE` and one `HAVING` cannot express it — because they are chained, not independent.**
>
> `WHERE` narrows the rows, and everything after it sees only the narrowed set. Here one condition is about *all* employees in the department and the other is about *high-earning* employees, so the second condition needs its own, separately-grouped subquery.
>
> The diagnostic question to ask of any `HAVING`: **"which rows is this counting — all of them, or only the ones `WHERE` let through?"**

> [!DERIVE]
> **The full order of execution**, which explains every result on this page:
>
> $$\textbf{FROM} \rightarrow \textbf{WHERE} \rightarrow \textbf{GROUP BY} \rightarrow \textbf{HAVING} \rightarrow \textbf{SELECT} \rightarrow \textbf{ORDER BY}$$
>
> Read off the consequences:
> - `WHERE` precedes `GROUP BY` → it **cannot** use aggregates, since no groups exist yet.
> - `HAVING` follows `GROUP BY` → it **can**, and it filters groups rather than rows.
> - `SELECT` runs late → a column alias defined there is generally **not** usable in `WHERE`.
> - `ORDER BY` runs last → it sorts the final result, and it *can* use `SELECT` aliases.

---

**Next:** combining tables properly — **join expressions**.
