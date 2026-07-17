---
subject: dbms
unit: 3
order: 2
slug: functional-dependencies
title: Functional Dependencies
summary: The definition of a functional dependency X→Y, how FDs formalise keys (super/candidate/prime/non-prime), and why an FD cannot be inferred from a single relation state.
minutes: 11
tags: [functional-dependency, keys, prime-attribute, semantics]
---

# Functional Dependencies

A **functional dependency (FD)** `X → Y` (with X, Y ⊆ R) is a constraint: **for any two tuples t1, t2, if `t1[X] = t2[X]` then `t1[Y] = t2[Y]`**. We say X **functionally determines** Y, or Y is **functionally dependent** on X.

$$X \to Y \;\equiv\; \forall\, t_1, t_2:\; t_1[X] = t_2[X] \Rightarrow t_1[Y] = t_2[Y]$$

```text
SSN → ENAME                    -- an SSN determines exactly one employee name
PNUMBER → {PNAME, PLOCATION}
{SSN, PNUMBER} → HOURS          -- needs BOTH attributes together
```

> [!INTUITION]
> "X → Y" means **X pins down Y**: once you know the X-value, the Y-value is fixed — no two rows can share an X-value but differ on Y. It captures a real-world rule (one SSN = one person), not a property of one particular table.

## An FD is a property of *meaning*, not of one state

> [!EXAM]
> **You cannot prove an FD from a single relation state** (Elmasri Review 14.6) — a state that happens to satisfy `X → Y` doesn't guarantee it always will. You can only **rule an FD out**: if two tuples agree on X but differ on Y, the FD definitely does **not** hold. FDs come from the **semantics** of the attributes.

## FDs formalise keys

| Term | Definition |
|---|---|
| **Superkey** S | No two tuples share `t[S]` — uniquely identifies a row (may carry extra attributes). |
| **Candidate key** K | A **minimal** superkey — removing any attribute breaks uniqueness. |
| **Primary key** | One chosen candidate key; the others are **secondary keys**. |
| **Prime attribute** | An attribute that is a member of *some* candidate key. |
| **Non-prime attribute** | An attribute in *no* candidate key. |

> [!NOTE]
> If K is a (candidate) key of R, then `K → R` — the key functionally determines **every** attribute (no two tuples share a key value). Conversely, `X → Y` says nothing about whether `Y → X`.

**Example.** `STUDENT(SID, Email, Phone, Name)` with SID, Email, Phone all unique:
- Superkeys: {SID}, {Email}, {Phone}, {SID, Email}, {Email, Phone, Name}, … (any set containing a unique attribute).
- Candidate keys: {SID}, {Email}, {Phone} (minimal).
- Primary key: choose one, e.g. {SID}. Then SID, Email, Phone are **prime**; Name is **non-prime**.

## FD diagram notation
Each FD is drawn as a horizontal line: LHS (determinant) attributes connect with plain lines; RHS attributes connect with **arrows** pointing toward them. This visualises which attributes determine which.

---

**Next:** the different **kinds of functional dependency** — full, partial, transitive, trivial, multivalued.
