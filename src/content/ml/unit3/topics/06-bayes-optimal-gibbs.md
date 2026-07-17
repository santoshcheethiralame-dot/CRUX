---
subject: ml
unit: 3
order: 6
slug: bayes-optimal-gibbs
title: Bayes Optimal Classifier & Gibbs Algorithm
summary: The most accurate possible classifier (averaging over all hypotheses), why it's impractical, and the Gibbs shortcut.
minutes: 11
tags: [bayes-optimal, gibbs, ensemble, posterior-weighted]
---

# Bayes Optimal Classifier & Gibbs Algorithm

## The Bayes optimal classifier

The MAP hypothesis is the most probable *hypothesis* — but the most probable *classification* of a new instance can differ. The **Bayes optimal classifier** asks each class to vote, weighted by **every** hypothesis's posterior:

$$\boxed{\,v_{OB} = \arg\max_{v_j\in V} \sum_{h_i\in H} P(v_j\mid h_i)\,P(h_i\mid D)\,}$$

> [!NOTE]
> No other classification method using the same hypothesis space and prior knowledge can outperform it **on average** — it achieves the lowest possible error. (Mitchell §6.7.)

> [!INTUITION]
> It's a **posterior-weighted ensemble**: each hypothesis votes for a class with strength proportional to how believable it is. Crucially, the winning class need not be the one preferred by the single best (MAP) hypothesis — a class can win by getting moderate support from *many* hypotheses.

### Worked example

| $h_i$ | $P(h_i\mid D)$ | $P(v_1\mid h_i)$ | $P(v_2\mid h_i)$ | $P(v_3\mid h_i)$ |
|---|---|---|---|---|
| $h_1$ | 0.4 | 0.5 | 0.3 | 0.2 |
| $h_2$ | 0.3 | 0.1 | 0.4 | 0.5 |
| $h_3$ | 0.2 | 0.5 | 0.4 | 0.1 |
| $h_4$ | 0.1 | 0.1 | 0.3 | 0.6 |

$$P(v_1) = 0.34,\quad P(v_2) = 0.35,\quad P(v_3) = 0.31 \;\Rightarrow\; \textbf{predict } v_2$$

> [!TRAP]
> **$v_2$ wins even though no single hypothesis ranks $v_2$ first!** ($h_1, h_3$ favour $v_1$; $h_2, h_4$ favour $v_3$.) Averaging over the posterior produces a consensus that none of the individual hypotheses would have chosen — that's the power (and the surprise) of the Bayes optimal classifier.

## Why it's impractical

To classify one instance you must evaluate **every** hypothesis in $H$ and weight by its posterior. For realistic hypothesis spaces $H$ is enormous, so this is **computationally infeasible** — it's a theoretical ideal, not an everyday algorithm.

## The Gibbs algorithm

A cheap stochastic approximation:

```
1. Choose ONE hypothesis h from H at random,
   drawn according to the posterior P(h | D).
2. Use that single h to classify the new instance.
```

> [!INTUITION]
> Instead of polling all hypotheses, Gibbs **samples one** in proportion to its belief. Surprisingly cheap — and surprisingly good.

> [!NOTE]
> **Mitchell's bound:** under the assumption that the target concept is drawn from the same prior, the **expected error of Gibbs is at most twice that of the Bayes optimal classifier**:
> $$E[\text{error}_{Gibbs}] \le 2\,E[\text{error}_{OB}].$$
> So a single posterior-sampled hypothesis is at most 2× worse than the unbeatable optimum — a remarkable guarantee for so little work.

> [!EXAM]
> Distinguish three things: **MAP** = single most-probable *hypothesis*; **Bayes optimal** = most-probable *classification* by averaging $\sum_i P(v_j\mid h_i)P(h_i\mid D)$ over all hypotheses (lowest possible error, but infeasible); **Gibbs** = pick one hypothesis at random by posterior (error $\le 2\times$ Bayes optimal). The worked-table computation is a frequent exam question.

---

**Next:** why minimizing squared error is secretly **maximum likelihood**.
