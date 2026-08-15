---
subject: dbms
unit: 2
order: 10
slug: set-comparison-any-all
title: Set Comparison — ANY, ALL & SOME
summary: The comp_op ANY/ALL/SOME family, both worked salary examples, the equivalences to IN and NOT IN and to MAX and MIN, and the scope rules for attribute names across levels of nesting.
minutes: 12
tags: [sql, any, all, some, set-comparison, nested-query, aliases, scope, tuple-variable]
---

# Set Comparison — ANY, ALL & SOME

## The operator family

> [!EXAM]
> In addition to `IN` and `NOT IN`, a number of other comparison operators can be used to **compare a single value to a set or multiset of values**. These operators are of the form
>
> $$\texttt{comp\_op } [\;\texttt{ANY} \mid \texttt{ALL} \mid \texttt{SOME}\;]$$
>
> where **`comp_op`** denotes `=`, `<>`, `>`, `>=`, `<`, `<=`.
>
> - **`comp_op ALL`** returns **True if applying `comp_op` between the single value and an element of the set is True for *every* element** of the set.
>   *Example: `1 < ALL (2,3)` evaluates as **True**, because 1 is less than both 2 and 3.*
> - **`comp_op SOME` (or `ANY`)** returns **True if the result is True for *at least one* element** in the set.

> [!NOTE]
> **`SOME` and `ANY` are synonyms.** They mean exactly the same thing; SQL provides both because different phrasings read more naturally in different questions.

## ALL — greater than everyone

**Example:** Retrieve the last and first names of all employees whose salary is **greater than the salary of all the employees in department 5**.

```sql
SELECT Lname, Fname FROM EMPLOYEE
WHERE  Salary > ALL ( SELECT Salary FROM EMPLOYEE WHERE Dno = 5 );
```

> [!DERIVE]
> **How it evaluates.**
>
> First the nested query runs, returning the salaries of everyone in department 5:
>
> $$(30000.00,\; 40000.00,\; 25000.00,\; 38000.00)$$
>
> The outer query effectively becomes
>
> ```sql
> SELECT Lname, Fname FROM EMPLOYEE
> WHERE Salary > ALL (30000.00, 40000.00, 25000.00, 38000.00);
> ```
>
> For every tuple in `EMPLOYEE`, the `WHERE` clause is **True only if that salary exceeds every one of the four values** — which is the same as exceeding the largest, 40000.
>
> **The same can be achieved using the `MAX` function.**

## SOME / ANY — greater than at least one

**Example:** Employees whose salary is greater than the salary of **at least one** employee in department 5.

```sql
SELECT Lname, Fname FROM EMPLOYEE
WHERE  Salary > SOME ( SELECT Salary FROM EMPLOYEE WHERE Dno = 5 );
```

> [!NOTE]
> **There are more employees who satisfy this condition than the previous example**, because `> SOME` (and `> ANY`) evaluates as True if the employee's salary is greater than **even one** value in the nested query output.
>
> **This example could be solved using the `MIN` function** instead.

> [!INTUITION]
> The two aggregate equivalences are the fastest way to keep the operators straight, and they are the answer to "rewrite this without ANY/ALL":
>
> $$x > \texttt{ALL}\,(S) \;\equiv\; x > \max(S)$$
> $$x > \texttt{SOME}\,(S) \;\equiv\; x > \min(S)$$
>
> Beating **everyone** means beating **the best**; beating **someone** means beating **the worst**. Note the crossover — `ALL` pairs with `MAX`, `SOME` pairs with `MIN` — which is exactly why it is worth writing down rather than re-deriving under exam pressure.
>
> Flip the comparison and the pairing flips too: $x < \texttt{ALL}(S) \equiv x < \min(S)$.

> [!TRAP]
> **The aggregate rewrite is not always equivalent — the empty-set case differs.**
>
> If the subquery returns **no rows**:
> - `x > ALL (empty)` is **True** — vacuously, since there is no counterexample.
> - `x > (SELECT MAX(...))` compares against **NULL**, giving UNKNOWN, so the row is **discarded**.
>
> Same question, opposite answers, purely because department 5 turned out to be empty. Prefer the `ALL` form when an empty result is possible and you want the vacuous-truth reading.

## The equivalences to IN and NOT IN

> [!EXAM]
> - **`= SOME` (or `= ANY`) is equivalent to the `IN` operator.**
> - **`<> ALL` is equivalent to the `NOT IN` operator.**

> [!DERIVE]
> Both follow directly from the definitions:
>
> **`= SOME`** means *"equals at least one element of $S$"* — which is precisely what **membership** means. Hence `IN`.
>
> **`<> ALL`** means *"differs from every element of $S$"* — i.e. equals none of them, which is **non-membership**. Hence `NOT IN`.
>
> The pairing that does **not** work is the tempting one: **`<> SOME` is not `NOT IN`.** `x <> SOME (1,2)` is True whenever $x$ differs from *at least one* of them, so $x = 1$ satisfies it (since $1 \neq 2$). It is True for almost everything and means nothing useful.

> [!TRAP]
> Because `<> ALL` **is** `NOT IN`, it inherits `NOT IN`'s NULL bug exactly: if $S$ contains a NULL, the comparison chain yields UNKNOWN and **no rows are returned**. The rewrite is faithful — including the pitfall.

## Levels of nesting and name scope

> [!NOTE]
> In general, we can have **several levels of nested queries**. Ambiguity among attribute names arises if attributes belonging to the relation in the `FROM` clause of the **outer** query and the relation in the `FROM` clause of the **nested** query have the same name.

> [!EXAM]
> **The rule is that a reference to an unqualified attribute refers to the relation declared in the innermost query.**

For the query *"retrieve the project numbers of all projects either managed by an employee named 'Smith' or worked on by an employee named 'Smith'"*, `PROJECT` is referenced in **both** the outer and the inner query. The attributes `Pnumber` and `Dnum` written unqualified inside the nested query therefore **correspond to the `PROJECT` relation of the nested query, not the one in the outer query.**

### Reaching outward with an alias

> [!EXAM]
> **To refer to an attribute of a relation specified in the outer query, we specify and refer to an alias for that relation.**

**Example:** Retrieve the first and last names of employees who have a dependent **with the same name and same sex as themselves**.

```sql
SELECT E.Fname, E.Lname
FROM   EMPLOYEE AS E
WHERE  E.Ssn IN ( SELECT Essn FROM DEPENDENT
                  WHERE Dependent_name = E.Fname AND Sex = E.Sex );
```

> [!NOTE]
> Here **`E` is the alias for the relation `EMPLOYEE`**. There are two attributes named `Sex` — one in `EMPLOYEE` and one in `DEPENDENT`.
>
> **We must qualify `E.Sex` because it refers to the `Sex` attribute of the `EMPLOYEE` relation from the outer query**, and not to the `Sex` attribute of `DEPENDENT`.
>
> Any **unqualified** reference to `Sex` in the nested query would refer to **`DEPENDENT`**. However, we would **not** have to qualify an attribute such as `Ssn`, because `DEPENDENT` has no attribute called `Ssn` — so there is no ambiguity.

> [!EXAM]
> **It is generally advisable to create tuple variables (aliases) for all the tables referenced in an SQL query, to avoid potential errors and ambiguities.**

> [!INTUITION]
> The scope rule is exactly **lexical scoping** from programming languages: an unqualified name binds to **the innermost declaration**, and to reach an outer one you must name it explicitly.
>
> That analogy also explains why the advice above matters so much. An unqualified name that *happens* to be unambiguous today binds silently to the inner table **the day someone adds a same-named column** — and the query keeps running, with a different meaning. Qualifying everything makes the binding explicit and immune to schema drift.
>
> Note also what this section has quietly introduced: the moment the inner query references `E.Sex` from the outer query, it **can no longer be evaluated once in advance**. That is a **correlated** subquery, and it is the next-but-one topic.

---

**Next:** subqueries used as tables rather than as conditions — **subqueries in the FROM clause**.
