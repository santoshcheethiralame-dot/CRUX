---
subject: dbms
unit: 1
order: 17
slug: ra-unary-operators
title: Relational Algebra — Select, Project & Rename
summary: What makes relational algebra a closed procedural language, the full operator list, and the three unary operators with their properties, worked examples and the assignment operator that chains them.
minutes: 12
tags: [relational-algebra, select, project, rename, sigma, pi, rho, assignment, closure]
---

# Relational Algebra — Select, Project & Rename

## What relational algebra is

> [!NOTE]
> **A procedural language** consisting of a set of operations, where **each operation takes one or two relations as input and produces a new relation as the result.**
>
> - The result of an operation is a **new relation**, formed from one or more input relations.
> - This property makes the algebra **"closed"** — **all objects in relational algebra are relations**.
> - These relations can be **further manipulated** using operations of the same algebra.
> - A sequence of operations forms a **relational algebra expression**, whose result is also a relation representing the answer to a query.

> [!INTUITION]
> **Closure is the whole reason the algebra works.** Every operation eats relations and produces a relation — so the output of one can be fed straight into the next, with no conversion and no special cases.
>
> It is the same idea as arithmetic: add two numbers and you get a number, so you can keep going. If projecting a table produced something that *wasn't* a table, you could never build up a query in stages.
>
> **Procedural** means you specify *how* to get the answer, step by step. That is the contrast with SQL, which is **declarative** — you say *what* you want and let the optimiser choose the steps.

### The operators

> [!EXAM]
> | | Operator | Symbol |
> |---|---|---|
> | **Unary** | Select | **σ** (sigma) |
> | | Project | **∏** (pi) |
> | | Rename | **ρ** (rho) |
> | **Binary** | Union | **∪** |
> | | Intersection | **∩** |
> | | Set difference | **−** |
> | | Cartesian product | **×** |
> | | Join | **⋈** |
>
> **Unary = one input relation. Binary = two.** That split is worth stating explicitly if a question asks you to classify the operators.

---

## Select (σ) — pick rows

> [!NOTE]
> The SELECT operation **chooses a subset of the tuples from a relation that satisfies a selection condition**. We can consider it a **filter that keeps only those tuples satisfying a qualifying condition**.
>
> **Notation:** $\sigma_p(r)$, where **$p$ is the selection predicate**.
>
> SELECT can be visualised as a **horizontal partition** of the relation into two sets of tuples — those that satisfy the condition and are selected, and those that do not and are filtered out.

**Comparisons allowed in the predicate:** $=,\ \neq,\ >,\ \geq,\ <,\ \leq$
**Connectives:** $\wedge$ (and), $\vee$ (or), $\neg$ (not)

### Worked examples — select

*Select the tuples of `instructor` where the instructor is in the Physics department:*
$$\sigma_{Dept\_Name = \text{“Physics”}}(Instructor)$$

*Employees who either work in department 4 and make over \$25,000, or work in department 5 and make over \$30,000:*
$$\sigma_{(Dno=4 \,\wedge\, Salary>25000)\,\vee\,(Dno=5 \,\wedge\, Salary>30000)}(EMPLOYEE)$$

*Instructors in Physics with salary greater than \$90,000:*
$$\sigma_{dept\_name=\text{“Physics”}\,\wedge\,salary > 90000}(instructor)$$

### Properties of select

> [!EXAM]
> - $\sigma$ produces a relation $S$ that has the **same schema (same attributes) as $R$** — it removes rows, never columns.
> - **SELECT is commutative**: $\sigma_{c_1}(\sigma_{c_2}(R)) = \sigma_{c_2}(\sigma_{c_1}(R))$.
> - Because of commutativity, **a cascade (sequence) of SELECTs may be applied in any order**, and can be collapsed into one:
> $$\sigma_{c_1}(\sigma_{c_2}(\dots\sigma_{c_n}(R))) = \sigma_{c_1 \wedge c_2 \wedge \dots \wedge c_n}(R)$$
> - **The number of tuples in the result is less than or equal to the number in $R$.**

> [!INTUITION]
> Commutativity is not a curiosity — it is **licence for the optimiser to reorder your filters**. Given `salary > 90000 ∧ dept = 'Physics'`, the system may apply whichever condition eliminates more rows first, and the answer is provably identical. Much of query optimisation is exactly this kind of legal rearrangement.

---

## Project (∏) — pick columns

> [!NOTE]
> A unary operation that **returns its argument relation with certain attributes left out**.
>
> **Notation:** $\prod_{A_1, A_2, \dots, A_k}(r)$
>
> - It **selects certain columns and discards the others**.
> - **Duplicate rows are removed from the result, since relations are sets.**
> - Visualised as a **vertical partition** of the relation.

### Worked examples — project

*Keep only id, name and salary of the instructor:*
$$\prod_{ID,\, name,\, salary}(instructor)$$

*Lname, Fname and Salary of employees:*
$$\prod_{Lname,\, Fname,\, Salary}(EMPLOYEE)$$

*Sex and Salary of employees:*
$$\prod_{Sex,\, Salary}(EMPLOYEE)$$

### Properties of project

> [!EXAM]
> - The project operation **removes duplicate tuples**, because the result **must be a set** and **mathematical sets do not allow duplicate elements**.
> - $|\prod(R)| \leq |R|$.
> - **If the attribute list includes a key of $R$, the number of tuples in the result equals the number in $R$.**

> [!TRAP]
> That last property is the one to understand rather than memorise. **Duplicates can only appear if you throw away what made the rows distinct.**
>
> $\prod_{Sex, Salary}(EMPLOYEE)$ may well collapse rows — two employees can share a sex and a salary. But $\prod_{Ssn, Salary}$ cannot, because `Ssn` is a key and no two rows share it.
>
> **Keep a key and you keep every row.**

> [!INTUITION]
> Note the asymmetry with SQL: relational algebra's ∏ **always** eliminates duplicates, whereas SQL's `SELECT` **keeps** them unless you write `DISTINCT`. SQL departed from the pure theory here for practical reasons — de-duplicating is expensive, and sometimes you genuinely want the repeats.

---

## Composing operations

> [!NOTE]
> Because the result of any operation is a relation, **operations can be composed into a relational algebra expression** — instead of giving a relation name as the argument, you give **an expression that evaluates to a relation**.

*Find the names of all instructors in the Physics department:*
$$\prod_{name}\bigl(\sigma_{dept\_name=\text{“Physics”}}(instructor)\bigr)$$

There are **two ways to write a multi-step query**:

**1. A single nested expression:**
$$\prod_{Fname,\, Lname,\, Salary}\bigl(\sigma_{DNo=5}(Employee)\bigr)$$

**2. A sequence of named intermediate results:**
$$DEP5\_EMPS \leftarrow \sigma_{DNO=5}(Employee)$$
$$RESULT \leftarrow \prod_{Fname,\, Lname,\, Salary}(DEP5\_EMPS)$$

> [!TRAP]
> **Read nested expressions from the inside out.** In $\prod_{name}(\sigma_{\dots}(instructor))$ the **σ runs first**, then ∏ acts on its result. Writing the operators in the order they appear left-to-right is a common way to get the answer backwards.
>
> There is also a practical reason to prefer σ inside: **filter rows before carrying columns forward**, so less data moves through the rest of the query.

---

## The assignment operator (←)

> [!NOTE]
> It is convenient to write an expression by **assigning parts of it to temporary relation variables**. The assignment operation is denoted **←** and **works like assignment in a programming language**.
>
> A query becomes **a series of assignments followed by an expression whose value is displayed as the result**.

---

## Rename (ρ)

> [!NOTE]
> The results of relational-algebra expressions **do not have a name we can use to refer to them**. The **rename operator ρ (rho)** is provided for that purpose.
>
> $$\rho_x(E) \quad\text{returns the result of expression } E \text{ under the name } x$$

> [!EXAM]
> **Three forms**, and questions do distinguish them:
>
> | Form | Changes |
> |---|---|
> | $\rho_{S(B_1, B_2, \dots, B_n)}(R)$ | **both** the relation name to $S$ **and** the attribute names to $B_1 \dots B_n$ |
> | $\rho_S(R)$ | the **relation name only** |
> | $\rho_{(B_1, B_2, \dots, B_n)}(R)$ | the **attribute names only** |
>
> **Alternate notation for renaming just a few attributes:** $\rho_{OldName \to NewName}(r)$
>
> Example: $\rho_{Father \to Parent}(Paternity)$ renames the attribute `Father` to `Parent`.
> With two or more attributes, **ordering is meaningful**: $\rho_{Branch,\, Salary \to Location,\, Pay}(Employee)$.

> [!INTUITION]
> Rename looks like housekeeping but it is **structurally necessary** in two places.
>
> First, **self-joins**: to relate `Employee` to itself (an employee and their supervisor) you need two differently-named copies, or you cannot say which side you mean.
>
> Second, **union compatibility**: set operations require the two relations to line up, and renaming is how you make them match.

---

## Practice questions from the deck

> [!EXAM]
> **1.** `Employees(EmployeeID, Name, Department, Salary, JoiningYear)` — names and departments of employees who joined before 2020, without showing EmployeeID and Salary:
> $$\prod_{Name,\, Department,\, JoiningYear}\bigl(\sigma_{JoiningYear < 2020}(Employees)\bigr)$$
>
> **2.** `Customers(CustomerID, FirstName, LastName, City, PurchaseAmount)` — rename `City` to `Location`:
> $$\rho_{City \to Location}(Customers)$$
>
> **3.** `Products(ProductID, ProductName, Category, Price, StockQuantity)` — ProductName and Price of Electronics products with more than 10 in stock:
> $$\prod_{ProductName,\, Price}\bigl(\sigma_{Category = \text{'Electronics'} \,\wedge\, StockQuantity > 10}(Products)\bigr)$$

> [!TRAP]
> Look closely at answer 1 — the deck keeps **`JoiningYear` in the projection** even though the question only asked for names and departments. Strictly, the question asks for two columns, so $\prod_{Name, Department}$ would be the tighter answer. **Reproduce the deck's version if the marks follow the deck**, but understand that projecting the filtered column is optional, not required.

---

**Next:** combining two relations — **set operations**.
