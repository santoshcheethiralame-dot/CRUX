---
subject: ml
unit: 3
order: 4
slug: naive-bayes
title: The Naïve Bayes Classifier
summary: The conditional-independence assumption, the VMAP rule, parameter counting, and a full worked classification.
minutes: 16
tags: [naive-bayes, conditional-independence, VMAP, play-tennis]
---

# The Naïve Bayes Classifier

Naïve Bayes applies Bayes' theorem to classify an instance $x = \langle a_1, a_2, \dots, a_n\rangle$ into one of classes $V = \{v_1, v_2, \dots\}$. Despite a crude assumption, it rivals decision trees and neural nets on many tasks (notably text).

## The most-probable classification

We want the class with the highest posterior:

$$v_{MAP} = \arg\max_{v_j\in V} P(v_j\mid a_1,\dots,a_n) = \arg\max_{v_j\in V} \frac{P(a_1,\dots,a_n\mid v_j)\,P(v_j)}{P(a_1,\dots,a_n)}$$

The denominator is constant across classes, so drop it. The problem: $P(a_1,\dots,a_n\mid v_j)$ needs an astronomically large table. Enter the **"naïve" assumption**.

## The conditional-independence assumption

> [!NOTE]
> **Naïve assumption:** the attributes are **conditionally independent given the class**. Then the joint likelihood factorises:
> $$P(a_1,\dots,a_n\mid v_j) = \prod_{i=1}^{n} P(a_i\mid v_j)$$
> giving the **Naïve Bayes classifier**:
> $$\boxed{\,v_{NB} = \arg\max_{v_j\in V} P(v_j)\prod_{i=1}^{n} P(a_i\mid v_j)\,}$$

Both $P(v_j)$ and each $P(a_i\mid v_j)$ are just **frequency counts** over the training data — **no search, no iteration**. Learning = counting.

> [!INTUITION]
> The assumption is "naïve" because features are rarely *truly* independent (in text, "New" and "York" co-occur). Yet Naïve Bayes works remarkably well, because for *classification* we only need the right class to win the $\arg\max$ — the probability estimates can be poorly calibrated and still rank the correct class first.

## Why the assumption matters: parameter counting

| Model | Parameters | Growth |
|---|---|---|
| **Full joint** (dependent) | $k(v^n - 1) + (k-1)$ | **exponential** in $n$ |
| **Naïve Bayes** (independent) | $k\,n\,(v-1) + (k-1)$ | **linear** in $n$ |

($n$ attributes, $v$ values each, $k$ classes.) For $n{=}2, v{=}2, k{=}2$: full joint needs $2(4{-}1){+}1 = 7$; Naïve Bayes needs $2\cdot2\cdot1{+}1 = 5$. The gap explodes as $n$ grows — that's why the independence assumption makes the model **tractable** and resistant to the curse of dimensionality.

## Three flavours of Naïve Bayes

| Type | Use for | Assumes |
|---|---|---|
| **Gaussian** | continuous features | each feature $\sim$ normal per class |
| **Multinomial** | discrete counts (text word-counts) | counts per class |
| **Bernoulli** | binary features (word present/absent) | 0/1 per feature |

## Worked example — Play Tennis

From the 14-day dataset ($P(\text{Yes})=\tfrac{9}{14},\ P(\text{No})=\tfrac{5}{14}$), classify $x' = \langle$Outlook=Sunny, Temp=Cool, Humidity=High, Wind=Strong$\rangle$:

$$P(\text{Yes}\mid x') \propto \tfrac{9}{14}\cdot\underbrace{\tfrac{2}{9}}_{\text{Sunny}}\cdot\underbrace{\tfrac{3}{9}}_{\text{Cool}}\cdot\underbrace{\tfrac{3}{9}}_{\text{High}}\cdot\underbrace{\tfrac{3}{9}}_{\text{Strong}} \approx 0.0053$$
$$P(\text{No}\mid x') \propto \tfrac{5}{14}\cdot\underbrace{\tfrac{3}{5}}_{\text{Sunny}}\cdot\underbrace{\tfrac{1}{5}}_{\text{Cool}}\cdot\underbrace{\tfrac{4}{5}}_{\text{High}}\cdot\underbrace{\tfrac{3}{5}}_{\text{Strong}} \approx 0.0206$$

$0.0206 > 0.0053$ → predict **No**. (Normalize to get calibrated probabilities ≈ 0.20 / 0.80.)

> [!NOTE]
> Mitchell's Exercise 6.6 notes Naïve Bayes is exactly the **Bayesian belief network** with the class node as the single parent of every attribute node — making the conditional-independence structure explicit.

> [!EXAM]
> The standard 6–10 mark question hands you a table and asks you to classify a new instance. Steps: (1) priors $P(v_j)$ from class frequencies; (2) per-attribute likelihoods $P(a_i\mid v_j)$ by counting; (3) multiply $P(v_j)\prod_i P(a_i\mid v_j)$ for each class; (4) take the $\arg\max$. Watch for **zero counts** (next topic).

---

**Next:** the two things that *break* Naïve Bayes — **zero frequencies and underflow** — and text classification.
