---
subject: ml
unit: 2
order: 13
slug: ensemble-bagging
title: Ensemble Learning & Bagging
summary: Combining weak learners, why ensembles reduce variance, bagging with bootstrap samples, and out-of-bag error.
minutes: 13
tags: [ensemble, weak-learner, bagging, bootstrap, OOB, variance]
---

# Ensemble Learning & Bagging

## The basic idea

Instead of one expensive **strong learner** (like SVM), build **many cheap weak learners** and **combine** them. A *weak learner* is easy to build with low predictive power — only slightly better than random (e.g. a **decision stump**: a tree with a single decision node, or a perceptron).

> [!INTUITION]
> Real-life ensembles: a **second/third medical opinion**, a **panel of judges**, a spam filter built from many simple checks (sender? all-caps? "win a prize"? image-only?). No single check is reliable, but together they're confident.

## Constructing diverse weak learners

For the ensemble to help, the learners must be **different** and their **errors independent & random**. Ways to get diversity:

- different **algorithms**, or different **hyperparameters**;
- **different subsets of the data** (resampling — *most popular*);
- different **features**.

Empirically **~100 learners** is usually plenty.

## Combining predictions

1. **Majority vote / mean** (simple).
2. **Weighted voting** — more trustworthy learners get more say.

## Why ensembles work — variance reduction

> [!DERIVE]
> For $n$ **independent** observations $Z_1,\dots,Z_n$ each with variance $\sigma^2$, the variance of their **mean** is
> $$\text{Var}(\bar Z) = \frac{\sigma^2}{n}.$$
> Averaging many learners **shrinks variance** by ~$n$ while keeping bias low → the goal of **low bias *and* low variance**.

**Confidence boost.** With $N$ models each of accuracy $A$, the chance **all** are wrong is $(1-A)^N$. For $A=0.7,\ N=10$: $(0.3)^{10} \approx 0.0000059$ — vanishingly small. So $P(\text{at least one correct}) = 1-(1-A)^N \approx 1$.

> [!NOTE]
> Weak learners like decision stumps barely overfit (no real capacity to), so combining them avoids overfitting *and* fixes high bias/variance. The cost is extra model complexity. More learners help — up to a point of diminishing returns.

## Bagging (Bootstrap Aggregating)

```
1. Create many BOOTSTRAP samples (sample WITH replacement,
   same size as the original → duplicates appear).
2. Train one base/weak model on each sample.
3. Models train IN PARALLEL (independent of each other).
4. Combine: majority VOTE (classification) or AVERAGE (regression).
```

> [!DERIVE]
> **Bootstrap coverage.** The chance a given record is *never* picked in $n$ draws is $\big(1-\tfrac1n\big)^n \to \tfrac1e \approx 0.368$. So each bootstrap sample contains about **63% of the data**; ~37% is left out.

## Out-of-Bag (OOB) error — free validation

Each bootstrap leaves ~37% **out-of-bag**. To score an instance: take the **majority vote of only the models that did *not* train on it**, compare to the truth, and aggregate over all instances.

> [!INTUITION]
> OOB error ≈ validation error **without holding out a separate validation set** — every point is "test data" for the trees that never saw it. A free, honest performance estimate.

> [!EXAM]
> Know: weak learner = decision stump; ensembles cut variance by $\sigma^2/n$; **bagging = parallel + bootstrap + vote/average**; the **63% / 37%** bootstrap split (from $(1-1/n)^n\to1/e$); and OOB error as built-in validation.

---

**Next:** training learners *sequentially* — **Boosting & Gradient Boosting**.
