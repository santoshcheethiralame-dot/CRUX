---
subject: ml
unit: 1
order: 8
slug: overfitting-pruning
title: Overfitting & Pruning
summary: Formal overfitting, train/validation/test split, reduced-error pruning and rule post-pruning.
minutes: 14
tags: [overfitting, pruning, reduced-error, rule-post-pruning]
---

# Overfitting & Pruning

## What overfitting is

**Overfitting** = the model becomes **too specific to the training set**, capturing its *noise* rather than the true pattern. Symptom: **great on training data, poor on test data.**

Causes:

- **Noise** in the data (mislabelled or erroneous examples),
- **Too small** a training set (not representative),
- A **biased** training set (doesn't reflect the true distribution).

ID3 overfits because it keeps splitting until every training example is perfectly classified — growing branches that exist only to memorise noisy points.

### Formal definition (memorise)

> [!NOTE]
> Given a hypothesis space $H$, a hypothesis $h \in H$ **overfits** the training data if there exists an alternative $h' \in H$ such that:
> $$\text{error}_{\text{train}}(h) < \text{error}_{\text{train}}(h') \quad\text{but}\quad \text{error}_{\mathcal{D}}(h) > \text{error}_{\mathcal{D}}(h')$$
> i.e. $h$ does **better on the training set** but **worse over the entire distribution** $\mathcal{D}$ than $h'$ does.

The tell-tale graph: as **tree depth** grows, **training error** falls monotonically, but **validation error** falls then *rises* — a U-shape. The bottom of the U is where to stop; past it you are overfitting.

> [!INTUITION]
> A test instance $\langle$Sunny, High, **Normal**, Strong$\rangle$ with true label **No** gets routed by the Play-Tennis tree to Outlook=Sunny → Humidity=Normal → **Yes** → wrong. The tree learned "Sunny+Normal⇒Yes" from data that happened to contain no counterexample. More depth ≠ more truth.

## The three-way data split

To detect and fix overfitting we split the labelled data into **three** disjoint sets:

| Set | Purpose |
|---|---|
| **Training** | Fit the tree / model parameters. |
| **Validation** | Used to **prune** / tune — decide *when* the model is overfitting. |
| **Test** | A final, untouched, **unbiased** estimate of accuracy on future data. |

## Avoiding overfitting

Two broad strategies:

- **Pre-pruning (early termination / early stopping)** — stop growing the tree *before* it perfectly fits the data. Halt when the gain of a split falls below a threshold, or a max depth / min samples is reached. *Risk:* hard to know the right stopping point in advance (a weak split now might enable a strong one later).
- **Post-pruning** — grow the **full** tree, then **cut it back**. Generally **more effective**, precisely because we don't have to guess when to stop.

> **Pruning** = replace a subtree with a leaf labelled by the **majority class** of the training examples under it. This generalises the tree.

## Method I — Reduced-Error Pruning

Uses the **validation set** to decide what to cut.

```
Repeat until further pruning hurts validation accuracy:
  1. For each decision node, tentatively prune it
     (remove its subtree, make it a leaf = majority class).
  2. Measure validation accuracy of the pruned tree.
  3. Greedily keep the prune that most improves
     (or does not worsen) validation accuracy.
```

- Nodes are removed **only if** the pruned tree is **no worse** on the validation set.
- Pruning proceeds **iteratively**, each round removing the node whose removal helps most.
- Stop when any further pruning *decreases* validation accuracy.

> [!INTUITION]
> When pruning begins the tree is largest and (often) worst on validation. As you snip noisy subtrees, the tree shrinks **and** validation accuracy rises — until you start cutting genuinely useful structure, at which point accuracy drops and you stop (revert the last cut).

*Pros:* simple, fast. *Con:* needs a separate validation set, which is wasteful when data is scarce.

## Method II — Rule Post-Pruning

More fine-grained: prune *rules*, not whole subtrees.

```
1. Convert the tree to rules — one rule per root-to-leaf path:
      IF (A1 ∧ A2 ∧ ... ) THEN class
2. For each rule, remove any precondition whose removal
   does NOT worsen the rule's estimated accuracy (on validation).
3. Sort the pruned rules by estimated accuracy.
4. Classify new instances using the rules in that order.
```

The advantage: different paths sharing an attribute can be pruned **independently** (a subtree prune is all-or-nothing; a rule prune is per-condition). C4.5 uses this.

*Example.* The rule `IF ¬windy ∧ hot ∧ sunny THEN bad` might drop its `hot` precondition if accuracy doesn't fall, becoming `IF ¬windy ∧ sunny THEN bad` — a simpler, more general rule. After pruning, rules are ordered by accuracy/coverage (e.g. `IF overcast THEN good` first).

## Choosing the right tree size

- Stop early **or** post-prune (post-pruning usually wins).
- Use a **separate validation set** to evaluate prunes.
- Apply a **statistical test** to judge whether expanding/pruning a node helps beyond the training set.
- **Minimum Description Length (MDL)** — balance tree complexity against training error in a single cost function. *(Mentioned as out-of-syllabus depth, but know the name.)*

> [!EXAM]
> Compare the two methods: **reduced-error pruning** removes whole subtrees using validation accuracy; **rule post-pruning** converts to rules and removes individual preconditions. Both rely on a validation set held out from training. State that **post-pruning > pre-pruning** because we can't reliably know when to stop growing.

---

**Next:** extending ID3 to **continuous and missing attributes**.
