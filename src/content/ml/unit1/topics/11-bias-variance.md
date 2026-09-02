---
subject: ml
unit: 1
order: 11
slug: bias-variance
title: Bias & Variance
summary: Definitions, the dartboard 2×2, regression and classification illustrations, the train/test error diagnostic table, Bayes error, and the complexity trade-off curve.
minutes: 18
tags: [bias, variance, overfitting, underfitting, tradeoff, bayes-error, diagnosis]
---

# Bias & Variance

## The two definitions

> **Bias** — *in statistics, the bias is the difference between an **estimator's expected value** and the **true value of the parameter being estimated**.*

> **Variance** — *in machine learning, variance is the amount by which the **performance of a predictive model changes when it is trained on a different dataset from the same distribution**.*

In plain terms:
- **Bias** = how wrong you are *on average* — error from **wrong assumptions**, from a model too simple to represent the truth.
- **Variance** = how much your answer *jumps around* when the training data changes — error from **sensitivity to the particular sample**.

## The dartboard

```
                     Low Variance           High Variance
                  ┌─────────────────────┬─────────────────────┐
     High Bias    │  tight cluster,     │  scattered AND      │
                  │  far off-centre     │  off-centre         │
                  │  (underfit)         │  (worst of both)    │
                  ├─────────────────────┼─────────────────────┤
     Low  Bias    │  tight cluster ON   │  scattered AROUND   │
                  │  the bullseye       │  the bullseye       │
                  │  << THE GOAL >>     │  (overfit)          │
                  └─────────────────────┴─────────────────────┘
```

> [!INTUITION]
> **Bias is where the group of darts is centred; variance is how spread out they are.** A high-bias/low-variance model is *reliably wrong* — reproducible, useless. A low-bias/high-variance model is *right on average but never in practice* — every retraining gives a different answer. The bullseye needs both to be small.

---

## In regression

Take a dataset (Height vs Weight) whose **true underlying pattern** is a smooth saturating curve. Split into **blue = training points** and **green = test points**. Compare two models:

| | **Model 1 — a straight line** | **Model 2 — a squiggly line through every training point** |
|---|---|---|
| Error on the **training set** | some error | **0 error** |
| Error on the **test set** | some error, **similar to the training set** | some error, **unlike how it did on the training set** |
| Verdict | **high bias, low variance** — it yields **similar errors for different datasets** from the same distribution | **low bias, high variance** — it yields **vastly different errors for different datasets** from the same distribution |

*"The 2nd model did a great job at fitting the training set, but a terrible job at fitting the test set."*

A **third model** — a smooth curve that follows the true trend without chasing individual points — has **low bias and low variance**: it does well on the blue points *and* the green points.

## In classification

Determining a decision boundary between two classes, three candidates:

| Model | Boundary | Diagnosis |
|---|---|---|
| **Model 1** | a straight line | **high bias — underfit** |
| **Model 2** | a smooth curve | **a fair balance — just right** ✅ |
| **Model 3** | a highly contorted boundary wrapping around individual points | **high variance — overfit** |

### And you can have both at once

Consider a boundary that is **mostly a straight line but with two odd little loops in the middle**. Since it is **primarily a linear classifier it is not fitting the quadratic-like shape very well** (high bias), **but having too much flexibility in the middle, it is overfitting in that area** (high variance). **In higher-dimensional inputs this is realistic — high bias in some regions and high variance in others.**

---

## Overfitting and underfitting, restated

| | **Overfitting** | **Underfitting** |
|---|---|---|
| What happens | The model **captures the noise along with the data pattern** | The model **fails to even capture the pattern** of the data |
| Symptom | Fits the training data well but **fails on the testing set** | Poor on both training and testing |
| Bias / variance | **Low bias, high variance** | **High bias, low variance** |

---

## Diagnosing it numerically (the key table)

In 2-D you can plot the data and *see* the bias and variance. **In higher-dimensional data this is not possible** — e.g. a cat classifier with hundreds of features cannot be plotted. So we diagnose from **two numbers**:

| | Model 1 | Model 2 | Model 3 | Model 4 |
|---|---|---|---|---|
| **Train set error** | 1% | 15% | 15% | 0.5% |
| **Test set error** | 11% | 16% | 30% | 1% |
| **Diagnosis** | **High Variance** | **High Bias** | **High Bias *and* High Variance** | **Low Bias and Low Variance** ✅ |

**The two rules that generate that table:**

> - **The training-set error tells you about bias.** High training error ⇒ high bias — the model can't even fit what it has seen.
> - **The *increase* in error from train to test tells you about variance.** A big gap ⇒ high variance.

Restated as the slides put it:

- **High variance** is identified if the model has **low training error and high test error**.
- **High bias** is identified if the model has **high training error, and the test error is almost similar to the training error**.

> [!TRAP]
> **This all assumes the base (human) error rate — the optimal or *Bayes error* — is 0.** If the Bayes error for the problem were **15%** (say, a dataset full of blurry images), then **Model 2 would NOT be classified as high bias** — it would be doing as well as anyone possibly could. Always ask "what is the irreducible error?" before calling 15% bad.
>
> It also assumes the **training and test sets are drawn from the same distribution**. If they aren't, a train–test gap says nothing about variance.

> [!EXAM]
> Given a table of train/test errors and asked to diagnose each row, write the two rules first, then apply them row by row, then add the Bayes-error caveat. That caveat is very often the difference between full marks and most marks.

**The learning-curve view.** Plot error against the number of training instances: at small $n$, training error is low and test error is high — the gap **is** the variance. As $n$ grows the two curves converge. **If they converge *above* your acceptable-error line, you are in the high-bias regime** and more data will not help — you need a bigger model.

---

## The bias–variance trade-off

```
  Error
    │ ╲                                        ╱
    │  ╲                                     ╱     TOTAL  =  Bias² + Variance
    │   ╲___                             ___╱
    │       ╲____                   ____╱
    │            ╲_____   ●   _____╱
    │                     ┊
    │ ╲___                ┊         ______        VARIANCE  rises with complexity
    │      ╲______        ┊   _____╱
    │             ╲_______┊__╱                    BIAS²     falls with complexity
    └─────────────────────┴────────────────────→  Model complexity
       too simple      optimum      too complex
```

Reading the curve, in the slides' four beats:

1. **Bias reduction** — as model complexity increases, **bias decreases** initially, leading to better performance.
2. **Variance increase** — with more complexity, **variance starts to rise**, but initially this increase is **slower than the decrease in bias**.
3. **Total error** — at first the total error **decreases**, because the reduction in bias outweighs the increase in variance.
4. **Optimal complexity** — eventually increased complexity leads to a **rapid rise in variance**, causing total error to increase. **The point where total error is minimised is the optimal model complexity.**

> [!NOTE]
> The formal decomposition (for squared-error regression) is
> $$\mathbb{E}\big[(y - \hat f(x))^2\big] \;=\; \underbrace{\text{Bias}^2[\hat f(x)]}_{\text{wrong assumptions}} \;+\; \underbrace{\text{Var}[\hat f(x)]}_{\text{sensitivity to sample}} \;+\; \underbrace{\sigma^2}_{\text{irreducible / Bayes error}}$$
> The third term is the floor: **no model can beat it**, which is precisely the "base error rate" caveat above.

## Where you've already met this

| Knob | Low complexity end (high bias) | High complexity end (high variance) |
|---|---|---|
| **Decision tree depth** | a stump | a fully grown, unpruned tree |
| **Pruning** | heavily pruned | unpruned |
| **$k$ in k-NN** | **$k$ very high** — labels everything the majority class | **$k$ very low** ($k$=1) — copies the nearest point, noise and all |
| **Polynomial degree** in logistic regression | linear boundary | high-order boundary wrapping each point |

> [!EXAM]
> A common 5-marker: *"With a diagram, explain the bias–variance trade-off, and relate it to overfitting/underfitting."* Draw the U-curve with **three** labelled curves (Bias², Variance, Total), mark the optimum, then give the overfitting/underfitting table and one concrete knob (tree depth or $k$).

---

**Next:** logistic regression — the first model in this unit with a genuine cost function and gradient descent.
