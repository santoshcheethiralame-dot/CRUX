---
subject: dbms
unit: 1
order: 19
slug: ra-joins-aggregates
title: Relational Algebra — Joins, Aggregate Functions & Grouping
summary: The natural join and how it improves on the Cartesian product, the five aggregate functions and the script-F operator, grouping with the grouping attribute on the left, and worked exercises with their answers.
minutes: 11
tags: [natural-join, join, aggregate-functions, count, sum, average, min, max, grouping, group-by]
---

# Joins, Aggregate Functions & Grouping

## The join operation (⋈)

The previous topic ended with the problem: a Cartesian product produces **every** combination, most of them meaningless, and you must add a SELECT to keep the related ones.

> [!NOTE]
> **A natural join performs a Cartesian product internally and automatically filters rows by matching columns with the same name and compatible data types**, thus ensuring there are **no redundancies in the results**.

> [!EXAM]
> So the two-step pattern
> $$EMP\_DEPENDENTS \leftarrow EMPLOYEE \times DEPENDENT$$
> $$ACTUAL\_DEPS \leftarrow \sigma_{SSN=ESSN}(EMP\_DEPENDENTS)$$
> collapses into **a single join**. The join is not a new capability — it is **product + select packaged together**, which is why it can be derived from the primitive operators rather than being one of them.

**Worked example from the deck:** *retrieve the details of managers (Fname, Name) and the name of the department they manage* — a join of `EMPLOYEE` with `DEPARTMENT` on the managing SSN.

> [!INTUITION]
> The word **natural** refers to the condition being **inferred** rather than written: match on **every attribute the two relations share by name**, and keep only one copy of each shared column in the result.
>
> Convenient, but be aware of the fragility — if someone later adds a same-named column to both tables (say `created_at`), the join condition **silently changes** and so does the answer. That is why explicit join conditions are usually preferred in production SQL.

---

## Aggregate functions

> [!NOTE]
> **Aggregate functions take a collection (a set or multiset) of values as input and return a single value.**
>
> **There are five aggregate functions:**
> 1. **AVERAGE**
> 2. **MINIMUM**
> 3. **MAXIMUM**
> 4. **SUM**
> 5. **COUNT**

> [!NOTE]
> **A type of request that cannot be expressed in basic relational algebra** is to specify mathematical aggregate functions on collections of values — such as retrieving the average or total salary of all employees, or the total number of employee tuples. These are used in **simple statistical queries that summarize information** from the database tuples.
>
> - **SUM, AVERAGE, MAXIMUM and MINIMUM** apply to collections of **numeric** values.
> - **COUNT** is used for **counting tuples or values**.
> - **COUNT just counts the number of rows, without removing duplicates.**

> [!TRAP]
> Note the phrase *"cannot be expressed in **basic** relational algebra"*. Aggregation is a genuine **extension** to the algebra, not something derivable from σ, ∏, ∪, − and ×. That is why it needs its own symbol.

### The ℱ operator

> [!EXAM]
> The **aggregate functional operation** is written **ℱ** (script F; the deck notes **ℱ or 𝑔 can be used**).
>
> | Expression | Retrieves |
> |---|---|
> | $\mathcal{F}_{\text{MAX Salary}}(EMPLOYEE)$ | the **maximum** salary |
> | $\mathcal{F}_{\text{MIN Salary}}(EMPLOYEE)$ | the **minimum** salary |
> | $\mathcal{F}_{\text{SUM Salary}}(EMPLOYEE)$ | the **sum** of salaries |
> | $\mathcal{F}_{\text{COUNT SSN, AVERAGE Salary}}(EMPLOYEE)$ | the **count** of employees **and** their **average** salary |

### The individual functions

| Function | Behaviour |
|---|---|
| **COUNT** | Counts the number of tuples. **Works on both numeric and non-numeric** data types. Example: $g_{count(*)}(E) = 4$ |
| **SUM** | Sum of all selected columns. **Works on numeric fields only.** |
| **AVERAGE** | Average of numeric values. **Returns the average of all non-NULL values.** Example: $g_{average(C)}(R) = 27/4 = 6.75$ |
| **MINIMUM** | Smallest value of all selected values of a column. Example: $g_{min(C)}(R) = 3$ |
| **MAXIMUM** | Largest value of all selected values. Example: $g_{max(C)}(R) = 10$ |

> [!TRAP]
> Two easily-confused details sit right next to each other:
> - **COUNT does not remove duplicates** — it counts rows as they are.
> - **AVERAGE ignores NULLs** — it divides by the count of **non-null** values, not by the total row count.
>
> So `AVERAGE` and `SUM ÷ COUNT(*)` are **not** the same thing whenever nulls are present.

### Renaming aggregate results

*Find the sum, maximum, minimum and average of all employee salaries:*

$$\rho_{R(Total\_Sal,\, Highest\_Sal,\, Lowest\_Sal,\, Average\_Sal)}\; \mathcal{F}_{\text{SUM(Salary), MAX(Salary), MIN(Salary), AVG(Salary)}}(EMPLOYEE)$$

> [!INTUITION]
> Why bother with ρ here? Because an aggregate produces a column with **no sensible name of its own** — the result of `SUM(Salary)` is not `Salary`. Renaming gives the output columns meaningful headings, which matters as soon as the result feeds into another operation.

---

## Grouping

> [!NOTE]
> **In many cases aggregate functions can be applied to subgroups of data** — for example, calculating the average salary **for each department**.
>
> - Data is divided into **non-overlapping groups** based on specified attributes.
> - **Each group (partition) consists of the tuples that have the same value** of some attribute(s), called the **grouping attribute(s)**.
> - The function is then applied to **each group independently** to produce summary information about each group.
> - **SQL has a `GROUP BY` clause for this purpose.** The grouping attributes **should also appear in the SELECT clause**, so each aggregate value appears alongside the group it describes.

> [!EXAM]
> **The notation rule, stated explicitly in the deck:**
>
> > **Grouping attribute placed to the LEFT of the ℱ symbol; aggregate functions to the RIGHT.**
>
> $$_{DNO}\,\mathcal{F}_{\text{COUNT SSN, AVERAGE Salary}}(EMPLOYEE)$$
>
> This **groups employees by DNO** and computes the **count of employees and average salary per department**.

> [!INTUITION]
> Left-of-ℱ versus right-of-ℱ is the whole notation. **Nothing on the left** means *treat the entire relation as one group* — you get a single row back. **Something on the left** means *one row per distinct value of that attribute*.
>
> That is exactly the difference between `SELECT AVG(salary) FROM employee` and `SELECT dno, AVG(salary) FROM employee GROUP BY dno`.

---

## Worked exercises

> [!EXAM]
> **(a) Retrieve each department number, the number of employees in the department, and their average salary, renaming the resulting attributes.**
> $$\rho_{R(Dno,\, No\_of\_employees,\, Average\_sal)}\bigl(_{Dno}\,\mathcal{F}_{\text{COUNT Ssn, AVERAGE Salary}}(EMPLOYEE)\bigr)$$
>
> **(b) Department number, total number of employees, and average salary, for each department.**
> $$_{Dno}\,\mathcal{F}_{\text{COUNT Ssn, AVERAGE Salary}}(EMPLOYEE)$$
>
> **(c) Total number of employees and average salary across the entire company.**
> $$\mathcal{F}_{\text{COUNT Ssn, AVERAGE Salary}}(EMPLOYEE)$$

> [!TRAP]
> Compare (b) and (c) carefully — they differ **only** by the presence of $Dno$ on the left of ℱ. That single subscript is the difference between **per-department** figures and **one company-wide** figure. It is the most commonly dropped symbol in exam answers.
>
> And (a) differs from (b) only by the ρ wrapper supplying column names. Read the question for the words *"renaming the resulting attributes"* to know whether ρ is wanted.

---

## Where relational algebra has arrived

> [!INTUITION]
> The full toolkit, and what each is for:
>
> | Need | Operator |
> |---|---|
> | Pick **rows** | **σ** select |
> | Pick **columns** | **∏** project |
> | **Name** things | **ρ** rename |
> | Combine rows from two relations **vertically** | **∪ ∩ −** set operations |
> | Combine relations **horizontally** | **×** product, **⋈** join |
> | Answer **"for all"** | **÷** division |
> | **Summarise** | **ℱ** aggregate, with grouping |
>
> Every one of these has a direct SQL counterpart, which is the subject of the rest of the unit: σ → `WHERE`, ∏ → `SELECT`, ρ → `AS`, ⋈ → `JOIN`, ℱ → `COUNT/SUM/AVG`, grouping → `GROUP BY`.
>
> **Relational algebra is the theory SQL implements** — which is why the optimiser can rewrite your SQL freely: it translates it into algebra first, and the algebraic equivalences tell it what rewrites are safe.

---

**Next:** the language built on top of all this — **SQL overview & data types**.
