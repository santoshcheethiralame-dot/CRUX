---
subject: ml
unit: 3
order: 1
slug: bayesian-foundations
title: Bayesian Learning & Probability Foundations
summary: The probabilistic view of learning, plus the probability toolkit — conditional probability, total probability, independence and IID.
minutes: 13
tags: [bayesian, probability, conditional, total-probability, IID]
---

# Bayesian Learning & Probability Foundations

## The Bayesian view of learning

Bayesian learning treats learning as **probabilistic inference**: quantities of interest are governed by probability distributions, and we make **optimal decisions by combining those distributions with observed data**. Instead of a hard "yes/no," a Bayesian model reports *degrees of belief* — "there's an 80% chance of rain."

> [!NOTE]
> **Why study it** (Mitchell, Ch. 6): Bayesian methods are both (1) *practical* learning algorithms — Naïve Bayes and HMMs are among the most effective for many problems — and (2) a *lens* to analyse other algorithms. Mitchell shows that Find-S, Candidate-Elimination, decision trees, and neural networks can each be understood as computing (approximations to) probable hypotheses.

Uncertainty is unavoidable because data is **imperfect/incomplete** (we see only some instances) and **noisy/erroneous** (no perfect labels). Probability is the language for reasoning under that uncertainty.

## The probability toolkit

**Random variable** — assigns a numerical value to each outcome of a random experiment (denoted $X, Y, Z$).

**Conditional probability** — the probability of $A$ *given* $B$ has occurred:

$$P(A\mid B) = \frac{P(A \cap B)}{P(B)}$$

Knowing $B$ **shrinks the sample space** to outcomes consistent with $B$. *Example:* rolling a die, $P(2) = \tfrac16$, but $P(2 \mid \text{even}) = \tfrac13$ (space reduced to $\{2,4,6\}$).

**Addition rule:** $P(A \cup B) = P(A) + P(B) - P(A \cap B)$.

**Multiplication rule:**
- independent: $P(A \cap B) = P(A)\,P(B)$;
- dependent: $P(A \cap B) = P(A)\,P(B\mid A)$.

The **chain rule** generalises it: $P(A_1\cap\dots\cap A_n) = P(A_1)\,P(A_2\mid A_1)\cdots P(A_n\mid A_1\cap\dots\cap A_{n-1})$.

## Independence, mutual exclusivity, IID

| Concept | Definition |
|---|---|
| **Independent** | $P(B\mid A) = P(B)$ — $A$ doesn't change $B$'s probability |
| **Mutually exclusive** | $P(A\cap B) = 0$ — both can't happen (e.g. die even vs odd) |
| **Collectively exhaustive** | $P(A\cup B \cup \dots) = 1$ — they cover the whole sample space |

> [!INTUITION]
> **IID = Independent and Identically Distributed.** *Independent:* one sample doesn't influence another. *Identically distributed:* all samples come from the **same** distribution (coin flips). Most ML (SVMs, neural nets, Naïve Bayes) **assumes IID data** — but reality often violates it (time series, correlated sub-groups), which is exactly what **Markov models** (later in this unit) are built to handle.

## Total Probability Theorem

If $A_1,\dots,A_n$ are mutually exclusive and **exhaustive** (they partition the space), then for any event $B$:

$$\boxed{\,P(B) = \sum_{i=1}^{n} P(A_i)\,P(B\mid A_i)\,}$$

> [!DERIVE]
> Each $P(A_i)P(B\mid A_i) = P(B\cap A_i)$, and since the $A_i$ partition the space, $\sum_i P(B\cap A_i) = P\big(B\cap (A_1\cup\dots\cup A_n)\big) = P(B\cap S) = P(B)$. This is the denominator of Bayes' theorem.

**Worked example.** $P(\text{internet})=0.45,\ P(\text{no internet})=0.55$; $P(\text{on time}\mid\text{internet})=0.90,\ P(\text{on time}\mid\text{no internet})=0.45$:

$$P(\text{on time}) = 0.45(0.90) + 0.55(0.45) = \mathbf{0.6525}$$

> [!EXAM]
> Master conditional probability, the chain rule, and **total probability** — every Bayes-theorem question reduces the evidence $P(D)$ to a total-probability sum. Know the difference between *independent* ($P(A\cap B)=P(A)P(B)$) and *mutually exclusive* ($P(A\cap B)=0$) — students confuse them constantly.

---

**Next:** the centrepiece — **Bayes' Theorem**.
