---
subject: dbms
unit: 3
order: 11
slug: bcnf
title: Boyce-Codd Normal Form (BCNF)
summary: BCNF (every determinant is a superkey), why it is stronger than 3NF, the canonical 3NF-but-not-BCNF TEACH example, and the decomposition algorithm.
minutes: 12
tags: [bcnf, superkey, decomposition, teach-example]
---

# Boyce-Codd Normal Form (BCNF)

> [!NOTE]
> A relation is in **BCNF** if **whenever an FD `X → A` holds, X is a superkey of R**. It removes 3NF's "A is prime" escape clause — for BCNF the determinant **must** be a superkey, no exceptions.

## The strict hierarchy

$$1\text{NF} \supset 2\text{NF} \supset 3\text{NF} \supset \text{BCNF}$$

Every BCNF relation is in 3NF, but **some 3NF relations are not in BCNF** — precisely when there's an FD `X → A` with **X not a superkey and A a prime attribute**.

> [!EXAM]
> **3NF vs BCNF in one line:** 3NF allows `X → A` if X is a superkey **OR** A is prime; BCNF allows it **only** if X is a superkey. So the *only* relations that are 3NF-but-not-BCNF have a non-superkey determinant of a prime attribute.

## The canonical example — TEACH (3NF but not BCNF)

`TEACH(Student, Course, Instructor)` with FDs:
```text
fd1: {Student, Course} → Instructor
fd2: Instructor → Course
```
- Candidate key = **{Student, Course}**; prime attrs = Student, Course; non-prime = Instructor.
- `fd2: Instructor → Course` — **Instructor is not a superkey**, but **Course is prime**, so 3NF is satisfied (escape clause b). BCNF is **violated** (Instructor isn't a superkey).
- Hence TEACH is **3NF but not BCNF**.

## BCNF decomposition algorithm

> [!NOTE]
> For a violating FD `X → A` in R, decompose into:
> $$R_1 = (R - A) \qquad R_2 = (X \cup A)$$
> If either piece is still not in BCNF, repeat.

**Applied to TEACH** (violating FD `Instructor → Course`):
```text
R1 = TEACH − Course      = (Student, Instructor)
R2 = Instructor ∪ Course = (Instructor, Course)
```
This is the decomposition `D3` — both pieces are in BCNF.

> [!TRAP]
> **BCNF can cost you a functional dependency.** All BCNF decompositions of TEACH **lose fd1** `{Student,Course}→Instructor` — it can't be checked within either piece. You may sacrifice **dependency preservation** for BCNF, but you must **never** sacrifice the **lossless join** (next topic). FDs are guaranteed preservable only **up to 3NF**.

> [!INTUITION]
> **Why does a 2-attribute relation matter here?** Any relation with exactly two attributes is **always in BCNF** regardless of its FDs (Elmasri 14.22, Silberschatz 7.36) — there's no way to have a non-superkey determinant of the *other* lone attribute. A handy fact and a common MCQ.

## Worked numerical
`R(A,B,C,D,E)`, F = {A→BC, C→DE}. CK = A. `A→BC` (A is the key ✓). `C→DE` — **C is not a superkey** ⟹ BCNF violated. Decompose: `R1(A,B,C)`, `R2(C,D,E)` — both BCNF.

---

**Next:** the two properties every decomposition needs — **lossless join & dependency preservation**.
