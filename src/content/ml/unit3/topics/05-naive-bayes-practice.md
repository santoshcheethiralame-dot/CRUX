---
subject: ml
unit: 3
order: 5
slug: naive-bayes-practice
title: Naïve Bayes in Practice — Smoothing & Text
summary: The zero-frequency problem, Laplace/m-estimate smoothing, log-space to avoid underflow, and text classification.
minutes: 13
tags: [laplace-smoothing, m-estimate, log-space, text-classification, TF-IDF]
---

# Naïve Bayes in Practice — Smoothing & Text

Two numerical problems can wreck a Naïve Bayes classifier. Both have standard fixes.

## Problem 1: the zero-frequency problem

If a feature value never appears with a class in training, its estimate is $P(a_i\mid v_j) = 0$ — and since Naïve Bayes **multiplies** the likelihoods, **one zero annihilates the entire product**, no matter how strong the other evidence.

### Fix: Laplace / m-estimate smoothing

The **m-estimate** adds $m$ "virtual" examples spread by a prior $p$:

$$P(a_i\mid v_j) = \frac{n_c + m\,p}{n + m}$$

- $n_c$ = count of examples with value $a_i$ in class $v_j$; $n$ = examples in class $v_j$;
- $m$ = virtual-example weight (often the number of possible values); $p$ = prior for the value (uniform $p = 1/m$).

The common special case is **add-1 (Laplace) smoothing**: add 1 to every count and the number of distinct values $k$ to the denominator:

$$P(a_i\mid v_j) = \frac{\text{count} + 1}{n + k}$$

> [!INTUITION]
> Smoothing says "no event is truly impossible — we just haven't seen it yet." It nudges every probability slightly off 0 (and off 1), so a single unseen value can't veto a whole prediction. This is essential for **text**, where most words never appear in most classes.

### Worked example — Loan default (with vs without smoothing)

Classify $X = \langle$HomeOwner=No, Married, Income=High$\rangle$. Priors $P(\text{Yes})=0.3,\ P(\text{No})=0.7$.

**Without smoothing**, the Yes class has $P(\text{Married}\mid\text{Yes}) = 0/3 = 0$ and $P(\text{High}\mid\text{Yes}) = 0/3 = 0$, so $P(\text{Yes})\,P(X\mid\text{Yes}) = 0$ — Yes is impossible purely from missing counts.

**With add-1 smoothing** ($k_{\text{home}}{=}2, k_{\text{marital}}{=}3, k_{\text{income}}{=}2$):

$$P(X\mid\text{Yes}) = \tfrac{3+1}{3+2}\cdot\tfrac{1+1}{3+3}\cdot\tfrac{0+1}{3+2} = 0.8\cdot\tfrac13\cdot0.2 \approx 0.0533,\quad 0.3\times0.0533 = 0.016$$
$$P(X\mid\text{No}) = \tfrac{4+1}{7+2}\cdot\tfrac{4+1}{7+3}\cdot\tfrac{4+1}{7+2} = \tfrac{25}{162},\quad 0.7\times\tfrac{25}{162} \approx 0.108$$

Normalized: $P(\text{No}\mid X) \approx \mathbf{0.871}$, $P(\text{Yes}\mid X)\approx 0.129$ → **No** (not a defaulter). Smoothing keeps Yes *possible* (non-zero) while still choosing No.

## Problem 2: numerical underflow

Multiplying many probabilities $<1$ drives the product toward $0$ until it rounds to exactly $0$.

> [!NOTE]
> **Fix: work in log space.** Logarithm is monotonic, so the $\arg\max$ is unchanged, and products become **sums**:
> $$v_{NB} = \arg\max_{v_j}\Big[\log P(v_j) + \sum_{i=1}^{n} \log P(a_i\mid v_j)\Big]$$
> Adding logs of moderate numbers never underflows. (Real implementations of Naïve Bayes, HMMs, etc. all run in log space.)

## Text classification

Naïve Bayes is a workhorse for spam filtering and sentiment. Each document is a bag of words; $P(\text{word}\mid\text{class})$ is the smoothed word frequency in that class.

**Example.** Classify *"A very close game"* as Sports / Not-Sports. With $P(\text{Sports})=0.6$ and add-1 smoothing over a 14-word vocabulary, multiplying the per-word likelihoods gives $P(\cdot\mid\text{Sports}) \approx 2.76\times10^{-5}$ vs $P(\cdot\mid\text{Not-Sports}) \approx 5.7\times10^{-6}$ → **Sports**.

**Common preprocessing:** stop-word removal, stemming (*election/elected* → one token), **n-grams** (word sequences), and **TF-IDF** weighting:

$$\text{TF} = \frac{\#\text{ word in doc}}{\#\text{ words in doc}}, \qquad \text{IDF} = \log\frac{\#\text{ documents}}{\#\text{ documents containing the word}}$$

> [!EXAM]
> Three reliable marks: (1) explain the **zero-frequency** problem and write the **Laplace** formula $\frac{c+1}{n+k}$; (2) state that **log-space** prevents underflow by turning products into sums; (3) a text-classification numerical with smoothing. Note: if two classes tie, Naïve Bayes may return either.

---

**Next:** the theoretically optimal classifier — **Bayes Optimal & Gibbs**.
