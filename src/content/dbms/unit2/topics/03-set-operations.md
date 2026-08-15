---
subject: dbms
unit: 2
order: 3
slug: set-operations
title: Set Operations — UNION, INTERSECT, EXCEPT
summary: The six set operators, the union-compatibility requirement, and the exact multiplicity arithmetic that separates the plain forms from the ALL forms — c1+c2, min(c1,c2) and max(c1-c2,0).
minutes: 12
tags: [sql, union, union-all, intersect, except, multiset, union-compatible, multiplicity]
---

# Set Operations — UNION, INTERSECT, EXCEPT

> [!NOTE]
> **SQL set operations are used to combine two or more SQL `SELECT` statements.**
>
> **Types of set operations:**
> 1. Union  2. Union All  3. Intersect  4. Intersect All  5. Except  6. Except All

The running example throughout is one relation:

**`student_course(name, course, grade)`** — records of grades obtained by students in various courses. One query pulls the **Physics** rows, another the **Mathematics** rows, and the set operators combine them.

### The data

| name | course | grade | | name | course | grade |
|---|---|---|---|---|---|---|
| Alex | Physics | **S** | | Alex | Mathematics | **S** |
| Bert | Physics | **S** | | Bert | Mathematics | **S** |
| Charles | Physics | **A** | | Charles | Mathematics | **A** |
| Dennis | Physics | **B** | | Dennis | Mathematics | **A** |
| Evans | Physics | **B** | | Evans | Mathematics | **A** |

Reduced to the grade column alone, which is all the set operations see:

$$\text{Physics} = \{S, S, A, B, B\} \qquad \text{Mathematics} = \{S, S, A, A, A\}$$

> [!EXAM]
> Tabulate the **multiplicities** before answering any question on this page — every result below falls straight out of them.
>
> | grade | $c_1$ (Physics) | $c_2$ (Mathematics) |
> |---|---|---|
> | **S** | 2 | 2 |
> | **A** | 1 | 3 |
> | **B** | 2 | 0 |

## The compatibility requirement

> [!EXAM]
> **The number of columns and the datatypes must be the same in both the tables on which the operation is being applied.**
>
> This applies to **every** operator on this page, not just `UNION`. Two results that fail it cannot be combined at all — the query is rejected.

This is the **union-compatibility** condition from relational algebra. Note what it does *not* require: the column **names** need not match. Position and type are what count, and the result takes its column names from the **first** `SELECT`.

## 1 — UNION

> [!NOTE]
> **It eliminates duplicate rows from its result set.**
>
> ```sql
> SELECT column_name FROM table1
> UNION
> SELECT column_name FROM table2;
> ```

```sql
SELECT grade FROM student_course WHERE course = 'Physics'
UNION
SELECT grade FROM student_course WHERE course = 'Mathematics';
```

Because grades repeat heavily, this returns just the **distinct** grades appearing in either course.

## 2 — UNION ALL

> [!EXAM]
> `UNION ALL` **returns the set without removing duplicates and without sorting the data.**
>
> **If a particular value is present $c_1$ times in the first relation and $c_2$ times in the second, the number of copies in the result is $c_1 + c_2$.**

> [!INTUITION]
> Every "ALL" variant on this page is defined by a **counting rule**, and the three rules are the whole content of the topic:
>
> $$\text{UNION ALL} \;\Rightarrow\; c_1 + c_2$$
> $$\text{INTERSECT ALL} \;\Rightarrow\; \min(c_1,\, c_2)$$
> $$\text{EXCEPT ALL} \;\Rightarrow\; \max(c_1 - c_2,\, 0)$$
>
> They are exactly the arithmetic you would use on **piles of objects**: put two piles together and you have the sum; take what both piles can supply and you have the smaller of the two; remove from the first pile as many as the second contains and you cannot go below zero.
>
> Memorise the three formulas as a group. Exam questions give you $c_1$ and $c_2$ and ask for the count.

### The DISTINCT interaction

The deck makes a point of running `UNION ALL` a second time, with `DISTINCT` inside each branch:

```sql
SELECT DISTINCT grade FROM student_course WHERE course = 'Physics'
UNION ALL
SELECT DISTINCT grade FROM student_course WHERE course = 'Mathematics';
```

> [!TRAP]
> The two `UNION ALL` results differ, and understanding why is the point of the slide.
>
> **`DISTINCT` eliminates duplicates *within each branch*, so each `SELECT` now produces no duplicates. But `UNION ALL` still does not eliminate duplicates *across* branches** — a grade appearing in both courses appears **twice** in the final result.
>
> So `DISTINCT` inside + `UNION ALL` outside is **not** the same as `UNION`. Deduplication has to happen at the level where the duplicates actually meet.

## 3 — INTERSECT

> [!NOTE]
> The `INTERSECT` operation **returns common rows from both the `SELECT` statements**. **It has no duplicates.**

```sql
SELECT grade FROM student_course WHERE course = 'Physics'
INTERSECT
SELECT grade FROM student_course WHERE course = 'Mathematics';
```

The grades earned in **both** Physics and Mathematics.

## 4 — INTERSECT ALL

> [!EXAM]
> `INTERSECT ALL` **helps retain duplicates.** If a value is present $c_1$ times in the first relation and $c_2$ times in the second, the number of copies in the result is $\min(c_1, c_2)$.

## 5 — EXCEPT

> [!NOTE]
> `EXCEPT` **displays the rows that are present in the first query but absent in the second query. It has no duplicates.**

```sql
SELECT grade FROM student_course WHERE course = 'Physics'
EXCEPT
SELECT grade FROM student_course WHERE course = 'Mathematics';
```

The deck then runs it **the other way round** — Mathematics `EXCEPT` Physics — and reports the result: **(Empty Set)**.

> [!TRAP]
> **`EXCEPT` is not commutative.** $A - B \neq B - A$, and the deck demonstrates it by getting a non-empty answer one way and an empty set the other.
>
> Contrast with `UNION` and `INTERSECT`, which **are** commutative. So of the three operators, only set difference cares about which query you write first — and "list the X that are not Y" questions are marked wrong if you swap them.
>
> The empty result here also has a readable meaning: every grade awarded in Mathematics was also awarded in Physics.

## 6 — EXCEPT ALL

> [!EXAM]
> `EXCEPT ALL` **helps retain duplicates.** If a value is present $c_1$ times in the first relation and $c_2$ times in the second, the number of copies in the result is
>
> $$\max(c_1 - c_2,\, 0)$$
>
> — i.e. **$c_1 - c_2$ if the difference is positive, else 0** (the value itself will not be present).

> [!INTUITION]
> The $\max(\cdot, 0)$ clamp is the part worth pausing on. Without it, a value appearing twice on the left and five times on the right would give $-3$ copies, which is meaningless.
>
> The clamp says: **you cannot remove more copies than were there to begin with.** Once the count hits zero the value simply drops out of the result.

## The six at a glance

> [!EXAM]
> | Operator | Duplicates | Result multiplicity |
> |---|---|---|
> | **UNION** | eliminated | value appears once |
> | **UNION ALL** | retained | $c_1 + c_2$ |
> | **INTERSECT** | eliminated | value appears once |
> | **INTERSECT ALL** | retained | $\min(c_1, c_2)$ |
> | **EXCEPT** | eliminated | value appears once |
> | **EXCEPT ALL** | retained | $\max(c_1 - c_2,\, 0)$ |
>
> All six require **the same number of columns and the same datatypes** on both sides.

> [!DERIVE]
> **Every output on the deck, computed from the multiplicity table.** Physics $= \{S{:}2,\, A{:}1,\, B{:}2\}$, Mathematics $= \{S{:}2,\, A{:}3,\, B{:}0\}$.
>
> | Operation | Per-grade count | Actual output |
> |---|---|---|
> | **UNION** | distinct values in either | **S, A, B** (3 rows) |
> | **UNION ALL** | S:4, A:4, B:2 | **S,S,A,B,B,S,S,A,A,A** (10 rows) |
> | **UNION ALL** *(DISTINCT inside each branch)* | S:2, A:2, B:1 | **S,A,B,S,A** (5 rows) |
> | **INTERSECT** | values in both | **S, A** — B is absent from Maths |
> | **INTERSECT ALL** | $\min$: S:2, A:1, B:0 | **S,S,A** (3 rows) |
> | **EXCEPT** (P−M) | values in P not in M | **B** |
> | **EXCEPT** (M−P) | none | **(Empty Set)** |
> | **EXCEPT ALL** (P−M) | $\max(c_1-c_2,0)$: S:0, A:0, B:2 | **B,B** |
> | **EXCEPT ALL** (M−P) | S:0, A:2, B:0 | **A,A** |
>
> Three things are worth reading off this table:
> - **`UNION ALL` returns 10 rows — every row of both inputs.** It never inspects the data at all.
> - **`EXCEPT ALL` in the two directions gives different values, not just different counts** — `B,B` one way and `A,A` the other. This is non-commutativity made concrete.
> - The **`INTERSECT ALL`** result keeps *two* S's but only *one* A, because Physics only had one A to contribute. $\min$ is doing visible work.

> [!TRAP]
> **MySQL does not implement `INTERSECT` and `EXCEPT` in older versions**, and the `ALL` variants are the least portable of all. `EXCEPT` is spelled **`MINUS`** in Oracle.
>
> Know the standard semantics for the exam — they are what is being tested — but expect to simulate them with `IN` / `NOT IN` or `EXISTS` / `NOT EXISTS` on a real MySQL install. You will see exactly that substitution in the **correlated subqueries** topic.

---

**Next:** the value that breaks two-valued logic — **NULL values**.
