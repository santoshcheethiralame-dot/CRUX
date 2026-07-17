---
subject: dbms
unit: 3
order: 9
slug: first-second-normal-form
title: Normalization — 1NF & 2NF
summary: What normalization (and denormalization) means, First Normal Form (atomic values), and Second Normal Form (no partial dependency), with the EMP_PROJ decomposition.
minutes: 12
tags: [normalization, 1nf, 2nf, partial-dependency, denormalization]
---

# Normalization — 1NF & 2NF

**Normalization** decomposes "bad" relations — using their FDs and keys — to minimise **redundancy** and **insertion/deletion/modification anomalies**. A relation's **normal form** is the highest condition it satisfies. Goals: information preservation + minimum redundancy (+ lossless join + dependency preservation).

> [!NOTE]
> **Denormalization** is the *deliberate* reverse: store a join (a lower normal form) as a base relation to avoid costly joins. **Pros:** faster reads, simpler queries, good for analytics. **Cons:** expensive updates/inserts, inconsistency risk, more storage. It's an optimisation applied **after** normalizing — not "skipping" normalization.

## First Normal Form (1NF)

> [!NOTE]
> A relation is in **1NF** if every attribute's domain holds only **atomic (single, indivisible) values**. It **disallows** composite attributes, **multivalued** attributes, and **nested relations**. Most RDBMSs enforce 1NF by construction.

- **Fix a multivalued attribute** (`Dlocations = {Bellaire, Sugarland}`): make one **row per value** (introduces some redundancy).
- **Fix a nested relation** (`EMP_PROJ` with a nested `PROJS`): **split into two tables**, propagating the primary key.

> [!TRAP]
> The "repeat rows" fix for a multivalued attribute is what later **creates the redundancy** that 2NF/3NF must remove. The alternative — making a separate table for the multivalued attribute — is what avoids spurious **multivalued dependencies** down the line.

## Second Normal Form (2NF)

> [!EXAM]
> A relation is in **2NF** if it is in **1NF** *and* every **non-prime attribute is fully functionally dependent on the (whole) primary key** — i.e. **no partial dependencies**. The test only matters when the key is **composite**; a single-attribute key is automatically 2NF (given 1NF).

**Worked decomposition.** `EMP_PROJ(Ssn, Pnumber, Hours, Ename, Pname, Plocation)`, PK = {Ssn, Pnumber}:
- Partial dependencies: `Ssn → Ename`, `Pnumber → {Pname, Plocation}`. Full: `{Ssn,Pnumber} → Hours`.
- **2NF decomposition:**
```text
EP1(Ssn, Pnumber, Hours)        -- the full dependency
EP2(Ssn, Ename)                  -- Ssn → Ename
EP3(Pnumber, Pname, Plocation)   -- Pnumber → Pname, Plocation
```

> [!INTUITION]
> 2NF says **"every non-key attribute must depend on the *whole* key, not just part of it."** A partial dependency means a non-prime attribute is really about a *piece* of the key, so it belongs in its own smaller table keyed by that piece.

### Worked numerical
`R(P,Q,R,S,T)`, F = {PQ→R, S→T}. `PQS⁺ = R` ⟹ CK = **PQS** (prime: P,Q,S; non-prime: R,T). `PQ→R` and `S→T` are both **partial** (non-prime depends on part of PQS) → not 2NF. Decompose: `R1(P,Q,R)`, `R2(S,T)`, `R3(P,Q,S)` (key table).

---

**Next:** removing transitive dependencies — **Third Normal Form**.
