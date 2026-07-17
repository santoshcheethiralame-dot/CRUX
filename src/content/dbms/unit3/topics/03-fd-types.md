---
subject: dbms
unit: 3
order: 3
slug: fd-types
title: Types of Functional Dependency
summary: Full vs partial dependency, transitive dependency, trivial dependency, and multivalued dependency — the building blocks that define 2NF, 3NF, BCNF and 4NF.
minutes: 10
tags: [full-dependency, partial-dependency, transitive-dependency, trivial, mvd]
---

# Types of Functional Dependency

Each type of FD is tied to a normal form, so these definitions are the vocabulary for all of normalization.

## Full vs Partial dependency

> [!NOTE]
> - **Full functional dependency** `X → Y`: removing **any** attribute from X breaks the dependency. `{Ssn, Pnumber} → Hours` is full — neither `Ssn → Hours` nor `Pnumber → Hours` holds.
> - **Partial dependency** `X → Y`: *some* attribute can be removed from X and the FD still holds — i.e. a non-prime attribute depends on **part** of a key. `{Ssn, Pnumber} → Ename` is partial because `Ssn → Ename` alone holds.

> [!EXAM]
> **Partial dependency is the 2NF killer.** It can only occur when the key is **composite**. If a non-prime attribute is determined by *part* of a candidate key, the relation violates 2NF.

## Transitive dependency

> [!NOTE]
> A **transitive dependency** is `X → Z` derived from `X → Y` and `Y → Z`, where a non-prime attribute depends on **another non-prime attribute**. Example: `Ssn → Dmgr_ssn` is transitive via `Ssn → Dnumber` and `Dnumber → Dmgr_ssn`.

> [!EXAM]
> **Transitive dependency is the 3NF killer.** The dangerous pattern is **prime → non-prime → non-prime**. (If the middle attribute `Y` is itself a candidate key, there's no problem — e.g. `EMP(Ssn, Emp#, Salary)` with `Ssn → Emp# → Salary` and Emp# a key is fine.)

## Trivial dependency

`X → Y` is **trivial** if `Y ⊆ X` (a reflexive consequence — it conveys no real constraint). `ABC → BC` is trivial. Otherwise the FD is **nontrivial** (and `X → Y` with `X ∩ Y = ∅` is *completely* nontrivial).

## Multivalued dependency (MVD)

> [!NOTE]
> A **multivalued dependency** `X ↠ Y` holds when, for each X-value, the set of Y-values is **independent** of the remaining attributes `Z = R − (X ∪ Y)`. It models two *independent* multivalued facts in one table.

Example — `CAR_MODEL` with independent month and colour:
```text
CAR_MODEL ↠ MANUF_MONTH        CAR_MODEL ↠ COLOUR
```
A car model independently determines a set of manufacturing months **and** a set of colours; month and colour have nothing to do with each other, so every combination appears → redundancy. MVDs define **4NF** (covered later).

## Ruling out FDs from data
Given a `TEACH(Teacher, Course, Text)` instance, you can **rule out** an FD by finding a counterexample: if `Teacher → Course` had two rows with the same Teacher but different Course, the FD is impossible. Remember: data can **disprove** an FD but never **prove** one.

> [!TRAP]
> Quick decision table — does an FD hold in a given extension? For each candidate `X → Y`, check every pair of rows with equal X: if any pair differs on Y, the FD is **ruled out**. (Elmasri Exercise 14.26 is exactly this drill.)

---

**Next:** deriving new FDs — **Armstrong's inference rules**.
