---
subject: ml
unit: 1
order: 3
slug: concept-learning
title: Concept Learning, Hypothesis & Version Space
summary: Concept/feature/concept space, inductive bias, hypothesis space sizing, and version space.
minutes: 16
tags: [concept, hypothesis-space, inductive-bias, version-space]
---

# Concept Learning, Hypothesis & Version Space

This is the theoretical backbone of the unit — and a reliable source of **numerical counting questions** in the exam. Master the formulas.

## Concept

A **concept** defines what *belongs* to a category and what does not. *Example:* the concept "the letter A" — many different glyphs all map to the same idea of "A". Learning a concept = learning the rule that separates positive examples (members) from negative ones (non-members).

## Feature space (instance space)

The **feature space** $\mathcal{X}$ is the set of **all possible combinations of attribute values** used to describe examples. Each example is a **feature vector**.

*Example — describing the letter "A" with 5 binary features* (Has-Crossbar, Pointed-Top, Symmetrical, Two-Legs, Curved):

- `A` → [Yes, Yes, Yes, Yes, No]
- `Λ` → [No, Yes, Yes, Yes, No]
- `a` → [Yes, No, No, No, Yes]

> [!DERIVE]
> **Size of the feature space.** If there are $n$ features and each has 2 values, the number of distinct examples is
> $$m = 2^{n}.$$
> With $n=5$ binary features → $2^5 = 32$ possible feature vectors.

## Concept space

The **concept space** is the set of **all possible concepts** definable over the feature space — i.e. *every possible way to label every example as positive or negative*. A concept = a subset of the instance space (the examples it accepts).

> [!DERIVE]
> If the feature space has $m$ distinct examples, each can be labelled + or −, so the number of concepts is
> $$2^{m} = 2^{(2^{n})}.$$
> This is **doubly exponential** — astronomically large.

### Fruit-edibility example (carry this through the whole topic)

Two features: **Colour** ∈ {Red, Green}, **Shape** ∈ {Round, Long}. Feature space (size $2^2 = 4$):

| Code | Colour | Shape |
|---|---|---|
| RR | Red | Round |
| RL | Red | Long |
| GR | Green | Round |
| GL | Green | Long |

Each of the 4 examples is labelled edible (1) or inedible (0) → **$2^4 = 16$ possible concepts.** (Enumerate all 16 binary strings over RR,RL,GR,GL — from `0000` to `1111`.)

> Generally, for $d$ binary features the concept space has $2^{(2^d)}$ concepts.

## Inductive bias → hypothesis space

We cannot search a doubly-exponential concept space. So we **assume the target concept has a particular form**. That assumption *shrinks* the space we search — this restriction is the **inductive bias**, and the shrunken space is the **hypothesis space** $H$ (a subset of the concept space).

**The conjunctive hypothesis language.** We assume a concept is a **conjunction of attribute constraints**, where each attribute can be:

- a **specific value** (e.g. `Red`),
- `?` = *"any value is acceptable"*,
- `∅` = *"no value acceptable"* (if any attribute is ∅, the hypothesis rejects everything).

> [!DERIVE]
> **Size of the conjunctive hypothesis space.** With attributes having $k_1, k_2, \dots$ possible values, each attribute slot can take its values **plus `?`**, giving $(k_i + 1)$ choices. All-`∅` hypotheses are semantically identical (they all reject everything), so we collapse them to **one**:
> $$|H| = \Big[\textstyle\prod_i (k_i + 1)\Big] + 1.$$
> For the fruit example (2 attributes, 2 values each):
> $$|H| = (2+1)(2+1) + 1 = 9 + 1 = \mathbf{10}.$$

So inductive bias reduces the fruit space from **16 concepts → 10 hypotheses**. The 10 hypotheses:

$$\langle R,R\rangle,\langle R,L\rangle,\langle R,?\rangle,\langle G,R\rangle,\langle G,L\rangle,\langle G,?\rangle,\langle ?,R\rangle,\langle ?,L\rangle,\langle ?,?\rangle\ (\text{accept all}),\ \langle \emptyset\rangle\ (\text{reject all})$$

The 6 "missing" concepts (e.g. *"edible if RL or GR but not RR or GL"*) cannot be written as a single conjunction — they are **excluded by the bias**.

> [!NOTE]
> This is a **restriction bias** (a.k.a. *language bias*): the *form* of the hypothesis language itself excludes some concepts. The target concept may therefore not even be expressible in $H$.

### Bigger counting example (do this by hand)

A data object has **6 attributes**: $a_1$ has **3 values**; $a_2 \dots a_6$ are **binary** (2 values).

- **Feature space size** = $3 \times 2 \times 2 \times 2 \times 2 \times 2 = 96$.
- **Concept space size** = $2^{96}$.
- **Hypothesis space (conjunctive)** = $(3+1)(2+1)(2+1)(2+1)(2+1)(2+1) + 1 = 4 \cdot 3^5 + 1 = 973$.

> [!EXAM]
> Two formulas score you the marks every time:
> - **# concepts** $= 2^{(\text{size of feature space})}$.
> - **# conjunctive hypotheses** $= \prod_i (k_i+1) + 1$.
> Read carefully whether they ask for concepts or hypotheses — students lose marks by mixing them up.

## The general-to-specific ordering (Mitchell)

Hypotheses are **partially ordered by generality**. Hypothesis $h_1$ is *more-general-than-or-equal-to* $h_2$ if every instance $h_2$ accepts, $h_1$ also accepts. This order has two extremes:

- **most general:** $\langle ?,?,\dots,?\rangle$ — accepts everything;
- **most specific:** $\langle\emptyset,\emptyset,\dots\rangle$ — rejects everything.

> [!NOTE]
> This ordering is the engine behind the algorithms: **Find-S** climbs from specific toward general; **Candidate-Elimination** maintains the version space as a band between a *specific boundary* $S$ and a *general boundary* $G$. (Mitchell, Ch. 2.)

> [!TRAP]
> **The futility of bias-free learning** (Mitchell). Take the *unbiased* hypothesis space — the full power set of instances. Then for **any** unseen instance, exactly **half** the version-space hypotheses label it positive and half negative, no matter what you've trained on. A bias-free learner therefore **cannot generalize at all**. Inductive bias is not a defect to remove — it is the very thing that makes generalization possible.

## Version space

Once we see **training data**, only some hypotheses remain *consistent* with it.

- A hypothesis $h$ is **consistent** with a training set $D$ if it classifies **every** example in $D$ correctly: $h(x) = c(x)$ for all $\langle x, c(x)\rangle \in D$.
- The **version space** is the set of all hypotheses in $H$ consistent with $D$:
$$VS_{H,D} = \{\, h \in H : h \text{ is consistent with } D \,\}.$$

Nesting (memorise this): **Concept space ⊇ Hypothesis space ⊇ Version space.**

### Worked example

Hypotheses $H$ as above; training data:

| Code | Colour | Shape | Edible? |
|---|---|---|---|
| RR | Red | Round | **Yes** (train) |
| RL | Red | Long | **No** (train) |
| GR | Green | Round | ? (unknown) |
| GL | Green | Long | ? (unknown) |

We need every $h$ that says RR→Yes and RL→No. Checking the 10 hypotheses, the survivors are:

$$VS = \{\ \langle R,R\rangle,\ \langle ?,R\rangle\ \}$$

Both accept RR (Round) and reject RL (Long); every other hypothesis fails one of the two training labels. Note both surviving hypotheses agree GR→Yes and GL→No, so they make a confident prediction on the unknowns *here* — but in general, when the version space holds disagreeing hypotheses, the prediction on new instances is ambiguous.

> [!TRAP]
> Consistency is checked **only against the training data**, not the unknown rows. A hypothesis stays in the version space as long as it gets the *seen* labels right.

---

**Next:** the **Find-S** algorithm — a concrete way to search this hypothesis space using only positive examples.
