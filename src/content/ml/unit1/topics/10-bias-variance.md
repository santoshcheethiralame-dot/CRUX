---
subject: ml
unit: 1
order: 10
slug: bias-variance
title: Bias–Variance Decomposition
summary: Bias vs variance, the tradeoff, the error decomposition formula, and a full worked numerical.
minutes: 16
tags: [bias, variance, tradeoff, decomposition, overfitting]
---

# Bias–Variance Decomposition

This explains *why* models underfit or overfit, and it is a guaranteed exam topic — including a **numerical** decomposition.

## The two errors

- **Bias** — error from **wrong assumptions** in the model (too simple). It is the gap between the model's *average* prediction and the *true* value. High bias → the model can't even capture the training pattern → **underfitting**.
- **Variance** — how much the model's predictions **change when retrained** on a different dataset drawn from the same distribution. High variance → the model chases noise → **overfitting**.

> [!INTUITION]
> **Dartboard analogy.** Bias = how far the cluster of darts sits from the bullseye (systematic offset). Variance = how spread out the darts are (inconsistency). Ideal = **low bias + low variance** (tight cluster on the bullseye).

| | Low variance | High variance |
|---|---|---|
| **Low bias** | 🎯 ideal | overfit (centred but scattered) |
| **High bias** | underfit (tight but off-target) | worst (off-target *and* scattered) |

## Bias–variance in regression

Fit two models to noisy (Height, Weight) data:

- **Model 1 — a straight line.** Some training error, similar test error → **high bias, low variance** (underfit).
- **Model 2 — a wiggly curve through every point.** Zero training error, large test error → **low bias, high variance** (overfit).
- **Model 3 — a smooth curve tracking the true pattern.** Low bias *and* low variance (the goal).

| | Overfitting | Underfitting |
|---|---|---|
| Bias | Low | High |
| Variance | High | Low |
| Symptom | Memorises noise | Misses the pattern |

## Diagnosing from train/test error

Assume the optimal (Bayes) error ≈ 0 and train/test come from the same distribution:

- **High variance** ⇒ **low** training error but **high** test error (big train→test gap).
- **High bias** ⇒ **high** training error, with test error ≈ training error (small gap, both bad).

| Model | Train err | Test err | Diagnosis |
|---|---|---|---|
| 1 | 1% | 11% | **High variance** (big gap) |
| 2 | 15% | 16% | **High bias** (both high, small gap) |
| 3 | 15% | 30% | **High bias *and* high variance** |
| 4 | 0.5% | 1% | **Low bias, low variance** ✅ |

> [!TRAP]
> "High bias" is relative to the **achievable (Bayes) error**. If images are genuinely blurry so even a human gets 15% wrong, then Model 2's 15% training error is *not* high bias — it's near-optimal. Always benchmark against the irreducible error.

## The tradeoff

As **model complexity increases**: bias falls but variance rises. Total error is U-shaped — it drops while bias-reduction dominates, then climbs once variance takes over. The minimum is the **optimal complexity**.

```
error │ \                         /  Variance
      │  \  Total error          /
      │   \___            ______/
      │       \____  ____/   ← min = optimal complexity
      │   Bias²    \/
      └─────────────────────────── model complexity →
```

## The decomposition formula

For squared-error loss, expected test error at a point decomposes **exactly** into three terms:

$$\boxed{\ \text{Total Error} = \text{Bias}^2 + \text{Variance} + \sigma^2\ }$$

- $\text{Bias}(x) = \mathbb{E}[\hat f(x)] - f(x)$ — average prediction minus truth.
- $\text{Variance}(x) = \mathbb{E}\big[(\hat f(x) - \mathbb{E}[\hat f(x)])^2\big]$ — spread of predictions across datasets.
- $\sigma^2$ — **irreducible error** (noise); cannot be removed by *any* model.

Bias and variance are the **reducible** error (we trade one against the other to minimise their sum); $\sigma^2$ is the floor.

## Worked numerical (do this by hand)

True function $f(x) = 2x$, noise $\varepsilon \sim N(0,1)$ (so $\sigma^2 = 1$). We fit a **constant** model $\hat y = c$ on three noisy datasets, and the fitted constants come out:

$$\hat f_1(2) = 3.8,\quad \hat f_2(2) = 3.7,\quad \hat f_3(2) = 3.93$$

Evaluate at test point $x_0 = 2$, where the true value is $f(2) = 4$.

**Mean prediction:**
$$\bar f(2) = \tfrac{3.8 + 3.7 + 3.93}{3} = 3.81$$

**Bias:**
$$\text{Bias} = \bar f(2) - f(2) = 3.81 - 4 = -0.19,\qquad \text{Bias}^2 = 0.0361$$

**Variance:**
$$\text{Var} = \tfrac{1}{3}\big[(3.8-3.81)^2 + (3.7-3.81)^2 + (3.93-3.81)^2\big] = \tfrac{0.0001+0.0121+0.0144}{3} = 0.00887$$

**Irreducible error:** $\sigma^2 = 1$ (given by the noise distribution $N(0,1)$).

**Total expected error:**
$$0.0361 + 0.00887 + 1 = \mathbf{1.045}$$

> [!EXAM]
> Steps every time: (1) mean prediction $\bar f$, (2) $\text{Bias}=\bar f - f_{\text{true}}$ then square it, (3) variance = average squared deviation of predictions from $\bar f$, (4) add $\sigma^2$ from the noise variance. The constant model here has **high bias** (it can't track $2x$) but **tiny variance** — textbook underfitting.

---

**Next:** our first probabilistic classifier — **logistic regression**.
