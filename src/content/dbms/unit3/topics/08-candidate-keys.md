---
subject: dbms
unit: 3
order: 8
slug: candidate-keys
title: Finding Candidate Keys & Counting Superkeys
summary: The essential-attributes method for finding candidate keys from FDs, the key-finding algorithm, and the 2^(n−x) formula for counting superkeys.
minutes: 11
tags: [candidate-key, superkey, essential-attributes, closure]
---

# Finding Candidate Keys & Counting Superkeys

## Essential attributes method

> [!NOTE]
> - **Essential attribute** = an attribute that appears on the **RHS of no FD**. Since nothing can determine it, it **must** be part of **every** candidate key.
> - **Non-essential attribute** = appears on some RHS; can be determined by others.

**Procedure:**
1. Collect all **essential** attributes E.
2. Compute `E⁺`.
   - If `E⁺ = R` → **E is the only candidate key**.
   - If `E⁺ ≠ R` → add non-essential attributes to E and test combinations; **multiple** candidate keys are possible.

> [!DERIVE]
> **R(A,B,C,D,E,F)**, F = {C→F, E→A, EC→D, A→B}.
> - Essential (never on a RHS): **C and E** (F,A,D,B all appear on some RHS).
> - `{C,E}⁺ = {C,E}` → `{C,E,F}` (C→F) → `{C,E,F,A}` (E→A) → `{C,E,F,A,D}` (EC→D) → `{C,E,F,A,D,B}` (A→B) = **R**.
> - So **CE is the only candidate key**.

## The key-finding algorithm
Start with K := R and peel attributes off while the rest still determine everything:
```text
K := R;
for each attribute A in K:
    if (K − A)⁺ contains all attributes of R:
        K := K − A;
```
This returns **one** key (which one depends on removal order).

## Counting superkeys

> [!EXAM]
> If R has **n** attributes and a **single** candidate key of size **x**, then every superkey must contain that key, and the remaining `n − x` attributes are each freely in or out:
> $$\#\text{superkeys} = 2^{\,n-x}$$
> *Example:* R(A,B,C,D,E,F), candidate key **CE** (x=2), n=6 ⟹ superkeys = `2^(6−2) = 16`.

> [!TRAP]
> The `2^(n−x)` shortcut assumes **one** candidate key. With multiple candidate keys you must use inclusion–exclusion (count supersets of each key, subtract double-counted overlaps) — don't blindly apply `2^(n−x)`.

## Quick practice
- R(A,B,C,D,E), F = {AB→C, C→D, B→E}: essential = **A, B** (never on RHS); `AB⁺ = {A,B,C,D,E} = R` ⟹ **CK = AB**, superkeys = `2^(5−2) = 8`.
- R(E,F,G,H,I,J,K,L,M,N) with FDs leaving **E,F,H** essential and `EFH⁺ = R` ⟹ CK = EFH, superkeys = `2^(10−3) = 128`.

---

**Next:** putting FDs to work — **normalization into 1NF and 2NF**.
