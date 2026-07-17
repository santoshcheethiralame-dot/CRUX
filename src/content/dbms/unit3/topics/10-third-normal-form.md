---
subject: dbms
unit: 3
order: 10
slug: third-normal-form
title: Third Normal Form (3NF)
summary: 3NF by primary key (no transitive dependency) and the general definition (X superkey or A prime), the EMP_DEPT decomposition, and the "nothing but the key" mnemonic.
minutes: 11
tags: [3nf, transitive-dependency, general-definition, normalization]
---

# Third Normal Form (3NF)

## 3NF by primary key

> [!NOTE]
> A relation is in **3NF** if it is in **2NF** *and* **no non-prime attribute is transitively dependent on the primary key** — i.e. no `key → (non-prime) → (non-prime)` chain.

**Worked decomposition.** `EMP_DEPT(Ename, Ssn, Bdate, Address, Dnumber, Dname, Dmgr_ssn)`, PK = Ssn:
- `Ssn → Dnumber` and `Dnumber → {Dname, Dmgr_ssn}` ⟹ `Ssn → Dmgr_ssn` is **transitive** (Dnumber is not a key).
- **3NF decomposition:**
```text
ED1(Ssn, Ename, Bdate, Address, Dnumber)   -- employee facts
ED2(Dnumber, Dname, Dmgr_ssn)              -- department facts
```

> [!INTUITION]
> The classic mnemonic: a non-key attribute must depend on **"the key, the whole key, and nothing but the key"** — 1NF (a key at all), 2NF (the *whole* key, no partial deps), 3NF (*nothing but* the key, no transitive deps via other non-key attributes).

## The general definition (for multiple candidate keys)

> [!EXAM]
> **General 3NF:** whenever `X → A` holds, **either (a) X is a superkey, or (b) A is a prime attribute.**
> - Condition (a) failing with a **prime → non-prime** FD catches a **2NF** violation (partial dependency).
> - A **non-prime → non-prime** FD catches a **3NF** (transitive) violation.
>
> *Alternative phrasing:* every non-prime attribute is **fully** and **non-transitively** dependent on every key. (This automatically subsumes 2NF.)

> [!TRAP]
> The "**A is prime**" escape clause (b) is exactly what lets some 3NF relations through that BCNF will later reject. A transitive chain ending in a **prime** attribute (`prime → non-prime → prime`) is **allowed** by 3NF — only `prime → non-prime → non-prime` is forbidden.

## Worked numericals

> [!DERIVE]
> **R(X,Y,Z)**, F = {X→Y, Y→Z}. `X⁺ = R` ⟹ CK = X. In 2NF (single-attr key). But `Y→Z`: Y is not a key and Z is non-prime ⟹ **transitive, violates 3NF**. Decompose: `R1(X,Y)`, `R2(Y,Z)`.
>
> **R(P,Q,R,S,T,U,V,W,X,Y)**, F = {PQ→R, PS→VW, QS→TU, P→X, W→Y}, CK = PQS. Several partial deps fail 2NF; note `W→Y` is **non-prime→non-prime** (a 3NF, not 2NF, concern). Full decomposition yields R1(P,Q,R), R2(P,S,V,W), R3(Q,S,T,U), R4(P,X), R5(W,Y), R6(P,Q,S).

---

**Next:** the stronger form — **Boyce-Codd Normal Form (BCNF)**.
