---
subject: dbms
unit: 1
order: 18
slug: ra-set-operations
title: Relational Algebra — Set Operations, Division & Cartesian Product
summary: Union compatibility and why it is required, union, intersection and difference with their algebraic properties, the division operation for "for all" queries, the Cartesian product and why it needs a filter, and equivalent queries.
minutes: 12
tags: [union, intersection, set-difference, union-compatible, division, cartesian-product, arity, equivalent-queries]
---

# Set Operations, Division & Cartesian Product

## Union compatibility

> [!NOTE]
> **Set operations are binary.** They can be applied only to relations that are **union compatible**. Two relations are union compatible if:
>
> 1. **Both relations have the same arity** (number of attributes), **and**
> 2. **The corresponding attribute domains must be compatible** — the 2nd column of $r$ should hold the same type of values as the 2nd column of $s$.

> [!EXAM]
> **Arity = the number of attributes in a relation.** The deck asks this directly as a fill-in-the-blank, and also asks for the phrase *"the two operand relations must be **type compatible**"*.

> [!INTUITION]
> Why insist on this? Because a set operation compares **whole rows**. To ask *"is this row also in the other relation?"* the rows must be **the same shape**, position by position. Comparing a 3-column row against a 5-column row is not a hard question — it is a meaningless one.
>
> Note the requirement is on **position and domain, not on names**. The slides raise this pointedly: *"What will be the first column name after union of Paternity and Maternity relation? Is it meaningful?"* The operation is legal, but the resulting column name is inherited from one side and may be misleading — which is exactly when you reach for **ρ** to rename first.

---

## Union (∪)

> [!NOTE]
> The result of $R \cup S$ is a relation that includes **all tuples that are either in $R$, or in $S$, or in both**. ($R$ and $S$ must be union compatible.) **Duplicate tuples are eliminated.**

*Find all courses taught in Fall 2017, or Spring 2018, or both:*

$$\prod_{course\_id}\bigl(\sigma_{semester=\text{“Fall”} \wedge year=2017}(section)\bigr) \;\cup\; \prod_{course\_id}\bigl(\sigma_{semester=\text{“Spring”} \wedge year=2018}(section)\bigr)$$

A second worked case: *retrieve the SSNs of all employees who **either** work in department 5 **or** directly supervise an employee who works in department 5* — compute `RESULT1` and `RESULT2` separately, then union them.

## Intersection (∩)

> [!NOTE]
> Allows us to find **tuples that are in both** input relations. **Notation:** $r \cap s$, with the same arity and compatibility requirements.

*Courses taught in **both** Fall 2017 and Spring 2018:*

$$\prod_{course\_id}\bigl(\sigma_{semester=\text{“Fall”} \wedge year=2017}(section)\bigr) \;\cap\; \prod_{course\_id}\bigl(\sigma_{semester=\text{“Spring”} \wedge year=2018}(section)\bigr)$$

## Set difference (−)

> [!NOTE]
> Allows us to find **tuples that are in one relation but not in another**. **Notation:** $r - s$. Must also be applied to compatible relations.

*Courses taught in Fall 2017 but **not** in Spring 2018:*

$$\prod_{course\_id}\bigl(\sigma_{semester=\text{“Fall”} \wedge year=2017}(section)\bigr) \;-\; \prod_{course\_id}\bigl(\sigma_{semester=\text{“Spring”} \wedge year=2018}(section)\bigr)$$

> [!TRAP]
> The deck deliberately runs **both directions** as separate examples — `STUDENT − INSTRUCTOR` and `INSTRUCTOR − STUDENT` — because they give **different answers**. Always check which relation the question puts first.

---

## Properties

> [!EXAM]
> - **Union and intersection are commutative:** $R \cup S = S \cup R$ and $R \cap S = S \cap R$.
> - **Both are associative**, so both can be treated as **n-ary operations applicable to any number of relations**:
> $$R \cup (S \cup T) = (R \cup S) \cup T \qquad (R \cap S) \cap T = R \cap (S \cap T)$$
> - **The minus operation is NOT commutative:** in general $R - S \neq S - R$.

> [!DERIVE]
> **Can intersection be written using only union and difference?** The deck poses this and answers yes:
>
> $$R \cap S = \bigl((R \cup S) - (R - S)\bigr) - (S - R)$$
>
> Read it as removing what is unique to each side: start with everything ($R \cup S$), strip out the part only in $R$, then strip out the part only in $S$ — what survives is in **both**.
>
> The practical significance: **intersection is not a primitive.** The truly essential operators are σ, ∏, ∪, −, × and ρ; ∩ and ⋈ are conveniences built from them.

---

## Division (÷)

> [!NOTE]
> The Division operation is **binary**: $R(Z) \div S(X)$, where **$X$ is a subset of $Z$**.
>
> Let **$Y = Z - X$** — the set of attributes of $R$ that are **not** attributes of $S$ — in the resultant relation $T$.
>
> The result is a relation $T(Y)$ that includes a tuple $t$ if tuples $t_R$ appear in $R$ with $t_R[Y] = t$ **and** $t_R[X] = t_S$ **for every tuple $t_S$ in $S$**.
>
> **For a tuple $t$ to appear in the result, its values must appear in $R$ in combination with EVERY tuple in $S$.**

> [!EXAM]
> **Division answers "for all" questions.** That is the one-line summary to reproduce:
>
> - *students who have taken **every** course offered by a department*
> - *suppliers who supply **all** parts*
> - the deck's own example: **dividing `SSN_PNOS` by `SMITH_PNOS`** — employees who work on **all** the projects Smith works on.
>
> Contrast with a join, which answers *"at least one"*. Whenever a question says **every** or **all**, division is the operator being tested.

> [!INTUITION]
> The name is apt, because it really does undo a product. If $T = R \div S$, then roughly $T \times S \subseteq R$ — $T$ holds exactly the $Y$-values that pair with **the complete set** of $S$-values inside $R$.
>
> The mental picture: group $R$ by its $Y$ attribute, and for each group ask *"does this group contain the whole of $S$?"* Only the groups that do survive.

---

## Cartesian product (×)

> [!NOTE]
> A **binary operation that combines every tuple of one relation with every tuple of another**, allowing information from two relations to be combined. Denoted $R \times S$.
>
> With **$n$ attributes in $R$** and **$m$ attributes in $S$**, the result $Q$ has **degree (arity) $n + m$**, ordered $Q(A_1, \dots, A_n, B_1, \dots, B_m)$, with **one tuple for each combination** of a tuple from $R$ and one from $S$.

The deck's worked instance: `Employee × Dependent` produces **56 rows and 15 columns**.

> [!EXAM]
> **Row count multiplies, column count adds.** If $|R| = 8$ and $|S| = 7$, then $|R \times S| = 8 \times 7 = 56$. Getting this backwards (adding rows) is the standard error.

### Why it usually needs a filter

> [!NOTE]
> **Generally, CROSS PRODUCT is not a meaningful operation** — it becomes meaningful when **followed by other operations**.
>
> **Not meaningful:**
> $$EMP\_DEPENDENTS \leftarrow EMPLOYEE \times DEPENDENT$$
> This contains **every combination** of employees and dependents, **whether or not they are actually related**.
>
> **Meaningful** — add a SELECT to keep only the related combinations:
> $$EMP\_DEPENDENTS \leftarrow EMPLOYEE \times DEPENDENT$$
> $$ACTUAL\_DEPS \leftarrow \sigma_{SSN = ESSN}(EMP\_DEPENDENTS)$$

> [!TRAP]
> The slides state the lesson explicitly: *"The issue with Cartesian Product is that it returns **all possible combinations** of rows from both tables. This results in **redundant and meaningless combinations** unless you filter them using a condition."*
>
> **A natural join, on the other hand, performs a Cartesian product internally and automatically filters rows by matching columns with the same name and compatible data types** — which is precisely why the join exists and why you rarely write × on its own.

---

## Equivalent queries

> [!NOTE]
> **There is more than one way to write a query in relational algebra.**
>
> *Find information about courses taught by instructors in the Physics department with salary greater than 90,000:*
>
> **Query 1:** $\sigma_{dept\_name=\text{“Physics”} \wedge salary > 90000}(instructor)$
> **Query 2:** $\sigma_{dept\_name=\text{“Physics”}}\bigl(\sigma_{salary > 90000}(instructor)\bigr)$
>
> **The two queries are not identical; they are however equivalent — they give the same result on the given database.**

> [!EXAM]
> The deck's fill-in-the-blank: *"Two queries that give the same result on any database but are written differently in relational algebra are called ______ queries."* → **equivalent**.

> [!INTUITION]
> Equivalence is the foundation of **query optimisation**. Because a query has many equivalent forms, the optimiser is free to pick the **cheapest** one — pushing selections down so filtering happens early, reordering joins, collapsing cascaded σ's into a single conjunction.
>
> The rules that license all this are exactly the algebraic properties above: commutativity, associativity, and the cascade rule for SELECT.

---

## The deck's fill-in-the-blanks

> [!EXAM]
> | Question | Answer |
> |---|---|
> | Notation for union | $r \cup s$ |
> | For $r \cup s$ to be valid, $r$ and $s$ must have the same … | **arity** (same number of attributes) |
> | In union, duplicate tuples are … | **eliminated** |
> | Notation for intersection | $r \cap s$ |
> | Notation for set-difference | $r - s$ |
> | The number of attributes in a relation is its … | **arity** |
> | Differently-written queries giving the same result are … | **equivalent** |
> | In UNION the two operand relations must be "type …" | **compatible** |

---

**Next:** the operation that makes the Cartesian product useful, plus summarising data — **joins, aggregates & grouping**.
