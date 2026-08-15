---
subject: dbms
unit: 2
order: 13
slug: division-not-exists
title: Relational Division — "For All" Queries
summary: Why SQL has no FOR ALL quantifier, the double-negation trick that replaces it, and both of the deck's solutions to "employees who work on all projects of department 4" — the EXCEPT form and the doubly-nested NOT EXISTS form.
minutes: 13
tags: [sql, division, not-exists, except, universal-quantifier, double-negation, nesting]
---

# Relational Division — "For All" Queries

## The problem

Some questions ask about **every** member of a set:

- *Which employees work on **all** the projects controlled by department 4?*
- *Which students have taken **every** core course?*
- *Which suppliers stock **all** the parts we need?*

> [!TRAP]
> **SQL has no `FOR ALL` quantifier.** There is `EXISTS` (an existential quantifier, "there is at least one") but nothing that directly says "for every".
>
> This is the single most common reason a student writes a query that looks right and is not. There is no keyword to reach for — the universal condition must be **encoded**, and the encoding is not obvious.

> [!DERIVE]
> **The double-negation trick.** From predicate logic:
>
> $$\forall x\, P(x) \;\equiv\; \neg \exists x\, \neg P(x)$$
>
> Read it in words: *"$P$ holds for all $x$"* is the same as *"**there is no** $x$ for which $P$ **fails**."*
>
> Applied to our question:
>
> > *"This employee works on **all** department-4 projects"*
> > $\equiv$ *"**There is no** department-4 project that this employee does **not** work on."*
>
> And "there is no …" is exactly **`NOT EXISTS`**. That rewrite is the whole technique.
>
> This operation has a name in relational algebra: **division** ($\div$). "Employees who work on all department-4 projects" is `WORKS_ON` divided by the set of department-4 projects.

## Form 1 — NOT EXISTS over a set difference

**Example:** Retrieve the name of each employee who works on **all** the projects controlled by department number 4.

```sql
SELECT Fname, Lname FROM EMPLOYEE
WHERE  NOT EXISTS ( ( SELECT Pnumber FROM PROJECT   WHERE Dnum = 4 )
                    EXCEPT
                    ( SELECT Pno     FROM WORKS_ON  WHERE Ssn = Essn ) );
```

> [!DERIVE]
> **Reading it as the deck does.**
>
> **The first inner query**
> ```sql
> ( SELECT Pnumber FROM PROJECT WHERE Dnum = 4 )
> ```
> retrieves the project numbers of all projects controlled by department 4. **It is not correlated** with the outer query — the same set every time.
>
> **The second inner query**
> ```sql
> ( SELECT Pno FROM WORKS_ON WHERE Ssn = Essn )
> ```
> **is correlated**. For each `EMPLOYEE` tuple it retrieves the project numbers of all projects that employee works on.
>
> **The set difference** is then
>
> $$\{\text{projects of dept 4}\} \;-\; \{\text{projects this employee works on}\}$$
>
> which is **the set of department-4 projects that this employee does not work on**.
>
> **If the employee works on all of them, this difference is empty**, `NOT EXISTS` evaluates to True, and the employee is selected.
>
> **The answer on the company database:**
>
> | Fname | Lname |
> |---|---|
> | Ahmed | Jabbar |
> | Alicia | Zelaya |
>
> **Two employees out of eight.** Both forms of the query below return exactly this pair — which is the point of showing two forms.

> [!INTUITION]
> This form is worth preferring in an exam because it **reads like the logic**. Written out:
>
> > "Select the employee if there is **nothing left over** when you subtract the projects they do work on from the projects they must work on."
>
> The "nothing left over" is the universal condition, made concrete. If you can only remember one form, remember this one.

> [!TRAP]
> The two subqueries must be **union-compatible** for `EXCEPT` to be legal — same number of columns, same types. Here both return a single project-number column, so `Pnumber` and `Pno` line up despite the different names. **`EXCEPT` matches by position and type, never by name** (see **Set Operations**).
>
> Also note: since **MySQL lacks `EXCEPT`** in older versions, this exact query may not run there — which is part of why the second form below exists.

## Form 2 — doubly-nested NOT EXISTS

The deck gives a second, `EXCEPT`-free solution to the same question:

```sql
SELECT Fname, Lname FROM EMPLOYEE
WHERE  NOT EXISTS
       ( SELECT * FROM WORKS_ON B
         WHERE ( B.Pno IN ( SELECT Pnumber FROM PROJECT WHERE Dnum = 4 )
                 AND NOT EXISTS
                     ( SELECT * FROM WORKS_ON C
                       WHERE C.Essn = Ssn AND C.Pno = B.Pno ) ) );
```

> [!NOTE]
> **The structure**, as the deck describes it: there is an outer query with **2 levels of nested subqueries**. The **outermost nested query is correlated** with the outer query. Inside it are two more subqueries — **one correlated** with the outermost nested query, and **one not**.

> [!DERIVE]
> **Working from the inside out.**
>
> **Innermost, non-correlated:**
> ```sql
> ( SELECT Pnumber FROM PROJECT WHERE Dnum = 4 )
> ```
> returns the project numbers of all projects controlled by department 4.
>
> **Innermost, correlated:**
> ```sql
> ( SELECT * FROM WORKS_ON C WHERE C.Essn = Ssn AND C.Pno = B.Pno )
> ```
> **Evaluated for every `WORKS_ON` tuple `B`** in the level above. For the current employee (`Ssn`, from the outermost query) and the current project (`B.Pno`), it selects the `WORKS_ON` rows where **this employee works on this project**.
>
> So `NOT EXISTS (…C…)` means: **"this employee does *not* work on project `B.Pno`."**
>
> **The outermost nested query** — evaluated for every `EMPLOYEE` tuple — therefore selects **the `WORKS_ON` tuples concerned with projects controlled by department 4 which the employee under consideration does not work on.**
>
> **The final `NOT EXISTS`:** if the employee works on **all** department-4 projects, there are **no such tuples**, the predicate evaluates to True, and the employee is selected.

> [!INTUITION]
> Both forms are the same double negation; they differ only in **how the "not worked on" set is computed**.
>
> - **Form 1** computes it with **set arithmetic** — subtract one set from the other and check for emptiness.
> - **Form 2** computes it **row by row** — walk candidate rows, and for each ask "does the employee work on this one?" with an inner `NOT EXISTS`.
>
> Form 2 is harder to read but uses **only `NOT EXISTS` and `IN`**, so it runs on any SQL implementation, including MySQL without `EXCEPT`.

> [!EXAM]
> **The reusable template for any "for all" question:**
>
> ```sql
> SELECT ... FROM Candidate c
> WHERE NOT EXISTS (
>     SELECT * FROM RequiredSet r          -- everything that must be covered
>     WHERE NOT EXISTS (
>         SELECT * FROM Link l             -- the association table
>         WHERE l.candidate = c.id AND l.required = r.id ) );
> ```
>
> Read as: *"select the candidate for which there is **no** required item that they have **no** link to."*
>
> **Two `NOT EXISTS`, nested.** Identify the three roles — candidate, required set, link — and the query writes itself.

> [!TRAP]
> A tempting wrong answer is to count instead:
>
> ```sql
> ... GROUP BY Ssn HAVING COUNT(*) = (SELECT COUNT(*) FROM PROJECT WHERE Dnum = 4)
> ```
>
> This **can** be made to work, but only if you first restrict `WORKS_ON` to department-4 projects **and** the data has no duplicate (employee, project) rows. Miss either condition and the counts match for the wrong reasons.
>
> The `NOT EXISTS` form needs no such assumptions, which is why it is the standard answer.

---

**Next:** naming intermediate results properly — **Common Table Expressions**.
