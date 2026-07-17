---
subject: ml
unit: 2
order: 14
slug: boosting
title: Boosting & Gradient Boosting
summary: Sequential learning, bagging vs boosting, AdaBoost's reweighting, and Gradient Boost fitting residuals.
minutes: 12
tags: [boosting, AdaBoost, gradient-boost, residuals, sequential]
---

# Boosting & Gradient Boosting

## Boosting — learn from mistakes, sequentially

The key contrast with bagging: boosting trains models **sequentially**, each one focused on what the previous ones got **wrong**.

```
1. Fit an initial model.
2. Fit the next model to focus on where the current ensemble does POORLY.
3. Each new model corrects the combined ensemble's shortcomings.
4. Repeat; better models get more VOTING weight.
```

**Instance weights.** Every training point carries a weight = how important it is to classify it correctly. After each round:

- **misclassified** instances → **weight up** (next learner pays them more attention),
- **correctly classified** → **weight down**.

Weights are normalised to sum to 1, and can drive resampling so hard cases appear more often. The most popular such method is **AdaBoost**.

## Bagging vs Boosting

| Feature | Bagging | Boosting |
|---|---|---|
| Training | **Parallel** (independent) | **Sequential** (dependent) |
| Sampling | equal probability | **weighted** — misclassified appear more |
| Goal | reduce **variance** | reduce **bias** (and variance) |
| Example | Random Forest | AdaBoost, Gradient Boost |

> [!TRAP]
> Don't mix them up: **bagging = parallel + equal weights** (variance↓); **boosting = sequential + reweighting** (bias↓). This comparison is a near-guaranteed exam question.

## Gradient Boosting

Instead of reweighting points (AdaBoost), Gradient Boost fits each new learner to the **residuals** (errors) of the current ensemble.

| | AdaBoost | Gradient Boost |
|---|---|---|
| Corrects errors via | sample **weights** | **residuals** |
| Trees | stumps (typically) | deeper trees possible |

**Algorithm:**
1. **Initial prediction** — something simple, e.g. the **mean** of $y$.
2. **Residuals** — $\text{residual} = y - \hat y$.
3. **Fit a weak learner** (small tree) to the *residuals*.
4. **Update**: $\ \text{new pred} = \text{old pred} + \eta \times (\text{weak learner})$, with learning rate $\eta$.
5. **Repeat** 2–4.

### Worked example

| $x$ | $y$ |
|---|---|
| 1 | 2 |
| 2 | 3 |
| 3 | 4 |

**Step 1** — initial = mean $= \tfrac{2+3+4}{3} = 3$ → predictions $[3,3,3]$; residuals $[-1, 0, +1]$.

**Step 2–3** — fit a stump on $x$ to those residuals.

**Step 4** — update with $\eta = 0.5$:

| $x$ | $y$ | new prediction |
|---|---|---|
| 1 | 2 | 2.5 |
| 2 | 3 | 2.5 |
| 3 | 4 | 3.5 |

The errors shrink versus the initial flat model — and keep shrinking each round.

> [!EXAM]
> State the boosting loop and the weight-update direction (misclassified ↑). Nail the **bagging vs boosting** table. For Gradient Boost: **fit successive learners to residuals**, update with a learning rate $\eta$, contrast with AdaBoost (reweighting vs residuals).

---

**Next:** the most popular bagging method — the **Random Forest**.
