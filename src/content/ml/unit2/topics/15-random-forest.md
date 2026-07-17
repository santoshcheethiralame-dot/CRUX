---
subject: ml
unit: 2
order: 15
slug: random-forest
title: Random Forest
summary: A forest of de-correlated trees — bootstrap + random features, OOB error, the proximity matrix, and advantages.
minutes: 13
tags: [random-forest, bagging, feature-subset, OOB, proximity-matrix]
---

# Random Forest

## What it is

A **Random Forest** is an **ensemble of many decision trees** (a bagging method) for **classification or regression**. Where a single decision tree gives one answer, a forest runs the input through **many trees and takes a majority vote** (or average).

It adds a twist to plain bagging: each tree uses not just a random *sample* but also a random *subset of features*.

## Working algorithm

```
1. Bootstrap: draw a random sample (with replacement) from the
   training data — keeping class distribution — for each tree.
2. Random features: at each tree (each split), pick R of the M
   features at random, with R < M.  Build the best split from those.
3. Grow each tree fully until the termination condition (leaves).
4. Predict: run the input through ALL trees → majority VOTE.
   (Compute OOB error along the way.)
```

> [!INTUITION]
> Why only $R < M$ features? If every tree could use all features, a few strong features would dominate and all trees would look alike (correlated errors). Forcing a **random feature subset** makes trees **diverse / de-correlated**, so averaging them actually cuts variance. This is the secret sauce over plain bagging.

## Out-of-bag (OOB) samples

Bootstrapping leaves ~$\tfrac13$ of observations unused per tree — the **OOB samples**. Predict each observation using only the trees where it was OOB, then compute **OOB classification error** (or OOB MSE for regression). This approximates validation error **without a separate validation set**.

## Classification example (students passing)

| Hours Studied | Sleep Hours | Pass |
|---|---|---|
| 3 | 7 | Yes |
| 5 | 5 | Yes |
| 1 | 5 | No |

Trees built on different bootstrap samples + feature subsets:
- **Tree 1** (Hours Studied): $\ge 3 \Rightarrow$ Yes
- **Tree 2** (Sleep Hours): $\ge 6 \Rightarrow$ Yes
- **Tree 3** (both): Hours $\ge 4 \Rightarrow$ Yes

New student *(3 hrs studied, 6 hrs sleep)*: Tree 1 → **Yes**, Tree 2 → **Yes**, Tree 3 → **No**. Majority vote = **Yes (Pass)**.

## Handling missing data — the proximity matrix

For a missing value, start with a guess, then refine it using how often samples land together.

1. **Initial guess** — categorical: the **most common value** among same-class rows; numeric: the **median**.
2. **Proximity matrix** — run all samples through the forest; every time two samples share a **leaf node** in a tree, increment their proximity; normalise by #trees.
3. **Refine** using proximities as weights:
   - categorical → **weighted frequency** (most-weighted value wins),
   - numeric → **weighted average**, e.g. $(0.1)(125) + (0.1)(180) + (0.8)(210) = \mathbf{198.5}$.
4. **Iterate** 2–3 until values stabilise.

> [!INTUITION]
> The proximity matrix is a similarity score: samples that keep ending up in the same leaves are "alike," so their values are the best guides for filling a gap.

## Advantages

> [!EXAM]
> Random Forest selling points (common short-answer):
> - **No pruning needed.**
> - **Accuracy + variable importance** generated automatically.
> - **Overfitting is not a problem** — each tree sees only a subset of data *and* features.
> - **Robust to outliers**, easy to tune, strong performance.
>
> Also remember: RF is a **bagging** method (parallel trees), its diversity comes from **bootstrap + random feature subset ($R<M$)**, and **OOB error** is its built-in validation.

---

🎉 **That completes Unit 2.** Reinforce with the **MCQ quiz** and **flashcards**, and bring the **PYQs** when ready.
