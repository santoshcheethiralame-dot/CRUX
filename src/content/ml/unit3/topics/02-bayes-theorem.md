---
subject: ml
unit: 3
order: 2
slug: bayes-theorem
title: Bayes' Theorem
summary: Prior, likelihood, evidence and posterior — the fire-alarm intuition and how Bayes drives classification.
minutes: 11
tags: [bayes-theorem, prior, likelihood, posterior, evidence]
---

# Bayes' Theorem

Bayes' theorem is the engine of this whole unit: it tells us how to **update a belief in a hypothesis $h$ after seeing data $D$**.

$$\boxed{\,P(h\mid D) = \frac{P(D\mid h)\,P(h)}{P(D)}\,} \qquad \textbf{Posterior} = \frac{\textbf{Likelihood}\times\textbf{Prior}}{\textbf{Evidence}}$$

| Term | Name | Meaning |
|---|---|---|
| $P(h)$ | **Prior** | belief in $h$ *before* seeing data |
| $P(D\mid h)$ | **Likelihood** | how well $h$ explains the data |
| $P(D)$ | **Evidence** | total probability of the data (a normaliser) |
| $P(h\mid D)$ | **Posterior** | updated belief in $h$ *after* the data |

## The fire-alarm intuition

You hear an alarm. **Hypothesis $h$:** there's a real fire. **Data $D$:** the alarm rings.

- **Prior** $P(h)$: fires are rare — say **1%** on any day.
- **Likelihood** $P(D\mid h)$: if there *is* a fire, the alarm almost surely rings — **99%**.
- **Evidence** $P(D)$: how often the alarm rings *at all* (fires, drills, burnt toast, faults) — say **5%**.
- **Posterior** $P(h\mid D) = \dfrac{0.99\times0.01}{0.05} \approx 0.20$.

> [!INTUITION]
> Even with a 99% reliable alarm, hearing it means only a **~20%** chance of real fire — because real fires are so rare (low prior) and false alarms so common (high evidence). **Bayesian inference depends strongly on the prior.** This is why ignoring base rates ("base-rate neglect") leads to badly wrong conclusions.

## The evidence as a total-probability sum

The denominator is usually expanded via total probability. If $E_1,\dots,E_n$ are mutually exclusive and exhaustive:

$$P(E_i\mid A) = \frac{P(A\mid E_i)\,P(E_i)}{\sum_{j} P(A\mid E_j)\,P(E_j)}$$

> [!NOTE]
> In practice we often **skip the denominator**: since $P(D)$ is the same for every hypothesis, comparing $P(D\mid h)P(h)$ across hypotheses is enough to find the *most probable* one. We only need $P(D)$ when we want a calibrated probability (then we **normalize** so the posteriors sum to 1 — Mitchell, Exercise 6.2 proves this normalization is valid).

## Using Bayes' theorem for classification

Two equivalent strategies:

1. **Most probable hypothesis** — pick the $h$ with the largest posterior $P(h\mid D)$, then use it to classify. (Leads to the **MAP hypothesis**, next topic.)
2. **Most probable classification** — directly pick the *class* with the largest posterior, averaging over hypotheses. (Leads to the **Bayes optimal classifier**.)

> [!EXAM]
> Write Bayes' theorem with all four terms named, and be able to compute a posterior from a word problem (medical test, spam, alarm). The classic trap: confusing $P(D\mid h)$ (likelihood) with $P(h\mid D)$ (posterior) — they are **not** equal, and the prior is what relates them.

---

**Next:** turning Bayes into a learning rule — the **MAP and ML hypotheses**.
