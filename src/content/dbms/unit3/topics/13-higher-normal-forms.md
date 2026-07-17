---
subject: dbms
unit: 3
order: 13
slug: higher-normal-forms
title: Higher Normal Forms (4NF & 5NF)
summary: Multivalued dependencies and Fourth Normal Form, join dependencies and Fifth Normal Form (PJNF), how an MVD is a JD with n=2, and why these are rare in practice.
minutes: 10
tags: [4nf, 5nf, mvd, join-dependency, pjnf]
---

# Higher Normal Forms (4NF & 5NF)

BCNF handles all FD-based redundancy. Beyond it, redundancy can still arise from **multivalued** and **join** dependencies.

## Multivalued Dependency (MVD) & 4NF

> [!NOTE]
> An **MVD `X ↠ Y`** holds when, for each X-value, the set of Y-values is **independent** of the remaining attributes `Z = R − (X ∪ Y)`. Formally, if t1[X]=t2[X], then tuples exist with the Y- and Z-values swapped. An MVD is **trivial** if `Y ⊆ X` or `X ∪ Y = R`.

> [!EXAM]
> A relation is in **4NF** if, for every **nontrivial** MVD `X ↠ Y` in F⁺, **X is a superkey**. MVDs arise when two **independent multivalued attributes** are forced into one table (a consequence of the "expand the key" 1NF fix).

**Example.** `EMP(Ename, Pname, Dname)` with `Ename ↠ Pname` and `Ename ↠ Dname` (an employee's projects are independent of their dependents) stores every (project × dependent) combination redundantly. **4NF fix:** decompose into `EMP_PROJECTS(Ename, Pname)` and `EMP_DEPENDENTS(Ename, Dname)`.

> [!TRAP]
> The FD decomposition rule does **not** carry over to MVDs: `A ↠ BC` does **not** imply `A ↠ B` and `A ↠ C` in general (Silberschatz 7.40). MVD inference has its own rules.

## Join Dependency (JD) & 5NF

> [!NOTE]
> A **join dependency `JD(R1,…,Rn)`** holds if R decomposes **losslessly** into the n projections R1…Rn: `R = R1 ⋈ R2 ⋈ … ⋈ Rn`. An **MVD is the special case n = 2**.

> [!EXAM]
> A relation is in **5NF** (also **Project-Join Normal Form, PJNF**) if, for every nontrivial JD in F⁺, **every Ri is a superkey**. A JD captures the rare case where a relation must be split into **3 or more** pieces to be redundancy-free but can't be split into just 2.

## Why higher forms are rare

> [!INTUITION]
> Designers normally stop at **3NF / BCNF**. **4NF** is occasionally useful; **5NF** is mostly theoretical because **join dependencies are nearly impossible to detect** in practical schemas with hundreds of relations. Most commercial designs aim for **BCNF** (Elmasri Review 14.18).

> [!NOTE]
> The progression: 1NF (atomic) → 2NF (no partial FD) → 3NF (no transitive FD) → BCNF (every determinant a superkey) → 4NF (every MVD determinant a superkey) → 5NF (every JD component a superkey). Each is strictly stronger.

---

**Next:** how the DBMS actually runs a query — **query processing**.
