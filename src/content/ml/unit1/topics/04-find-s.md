---
subject: ml
unit: 1
order: 4
slug: find-s
title: The Find-S Algorithm
summary: Most-specific-hypothesis search from positive examples, the EnjoySport trace, and its limitations.
minutes: 12
tags: [find-s, concept-learning, hypothesis-search]
---

# The Find-S Algorithm

## What concept learning is

> **Concept learning** (Mitchell): *"the problem of searching through a predefined space of potential hypotheses for the hypothesis that best fits the training examples."*

Given positive and negative examples of a category, find the concept (target concept $c$) that best fits the data **and** generalises to new instances. Find-S is the simplest such search.

## The idea of Find-S

Find-S finds the **most specific hypothesis** in $H$ that is consistent with all the **positive** examples.

- It considers **only positive** examples (negatives are ignored).
- It starts at the **most specific** hypothesis and **generalises** only as much as needed each time a positive example isn't covered.
- "Specific → general" search: begin with $\langle\emptyset,\emptyset,\dots\rangle$ (rejects everything) and open it up minimally.

## Algorithm

```
1.  Initialise h to the most specific hypothesis in H:
        h = <∅, ∅, ..., ∅>
2.  For each POSITIVE training instance x:
        For each attribute constraint a_i in h:
            If a_i is satisfied by x:
                do nothing
            Else:
                replace a_i in h with the next more general
                constraint satisfied by x   (a specific value → ?)
3.  Output h
```

In words: for each positive example, wherever the current hypothesis disagrees with the example, **relax that attribute to `?`**.

## Worked trace — "EnjoySport" (Mogli's favourite sport)

Attributes: Sky, Temp, Humidity, Wind, Water, Forecast.

| Sky | Temp | Humidity | Wind | Water | Forecast | EnjoySport |
|---|---|---|---|---|---|---|
| Sunny | Warm | Normal | Strong | Warm | Same | **Yes** |
| Sunny | Warm | High | Strong | Warm | Same | **Yes** |
| Rainy | Cold | High | Strong | Warm | Change | No |
| Sunny | Warm | High | Strong | Cool | Same | **Yes** |

**Step 0** — initialise: $h = \langle \emptyset,\emptyset,\emptyset,\emptyset,\emptyset,\emptyset \rangle$

**Step 1** — first positive example. Every attribute generalises from ∅ to the example's value:
$$h = \langle \text{Sunny, Warm, Normal, Strong, Warm, Same} \rangle$$

**Step 2** — second positive example differs only in *Humidity* (Normal vs High) → relax Humidity to `?`:
$$h = \langle \text{Sunny, Warm, ?, Strong, Warm, Same} \rangle$$

**Step 3** — third example is **negative** → **ignored**.

**Step 4** — fourth example (3rd positive) differs only in *Water* (Warm vs Cool) → relax Water to `?`:
$$h = \langle \text{Sunny, Warm, ?, Strong, ?, Same} \rangle$$

**Final hypothesis:**
$$c = \langle \text{Sunny, Warm, ?, Strong, ?, Same} \rangle$$

*Prediction:* for $x = \langle$Sunny, Warm, High, Strong, Warm, Same$\rangle$, $h(x) = 1$ (**Yes**).

> [!INTUITION]
> Find-S only ever *loosens* constraints. It never re-tightens. So it walks monotonically up the generality lattice, stopping at the **tightest** description that still accepts every positive example.

## Points to ponder (often asked)

- Find-S assumes **everything is negative by default** and only generalises on positives.
- Is the final $c$ consistent with the negative example? **Yes** — *provided* (1) the true target concept is actually in $H$ (a conjunction), and (2) there are **no errors/noise** in the training data.
- Could we instead start from the most *general* hypothesis $\langle ?,?,\dots\rangle$ and **specialise** using negatives? Yes — combining both directions gives the **Candidate-Elimination** algorithm. *(Marked "not in syllabus" in the slides, but know the name.)*

## Limitations of Find-S

> [!TRAP]
> These four limitations are a frequent short-answer question:
> 1. **Can't tell if it found the only concept** — it outputs just *one* of possibly many consistent hypotheses.
> 2. **Ignores negative examples** — so an **inconsistent / noisy** training set can mislead it badly.
> 3. **No way to handle noise** — a single mislabelled positive over-generalises $h$ permanently.
> 4. **No backtracking** — it can't reconsider earlier choices to find a better hypothesis.

### Limitation mini-example

| a1 | a2 | a3 | value |
|---|---|---|---|
| Low | 1 | 0 | YES |
| Low | 0 | 0 | YES |
| Medium | 1 | 0 | NO |
| High | 1 | 1 | YES |

Trace on positives: $h_1=\langle\emptyset,\emptyset,\emptyset\rangle \to h_2=\langle\text{Low},1,0\rangle \to h_3=\langle\text{Low},?,0\rangle \to h_4=\langle ?,?,?\rangle$. The third (Medium) row is negative and ignored — but after the High-row positive, $h$ becomes $\langle ?,?,? \rangle$ (accept-all), which now also accepts the *negative* Medium row. Noise/structure that doesn't fit a conjunction breaks Find-S.

## Practice (work these by hand)

**P1.** Instance space with 4 attributes, each having 3 values, boolean target.

- **# concepts** $= 2^{(3^4)} = 2^{81}$.
- **# conjunctive hypotheses** $= (3{+}1)^4 + 1 = 256 + 1 = \mathbf{257}$.
- Find-S over the data ignores the negatives and yields, e.g., $h = [\text{Senior}, ?, \text{Fullstack}, ?]$.

**P2.** Subscription data → Find-S final hypothesis $h = \langle ?,\ \text{Laptop},\ \text{Yes},\ ? \rangle$ (every positive used a laptop on a trial; the other two attributes varied, so they relax to `?`).

> [!EXAM]
> A full Find-S question = (a) count concepts, (b) count hypotheses, (c) trace $h$ **after each example**, ignoring negatives. Always show the hypothesis at every step — method marks are awarded for the trace, not just the final answer.

---

**Next:** when one most-specific conjunction isn't expressive enough, we move to **decision trees**.
