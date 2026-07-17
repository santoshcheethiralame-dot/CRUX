---
subject: ml
unit: 3
order: 3
slug: map-ml
title: MAP & ML Hypotheses
summary: The maximum-a-posteriori and maximum-likelihood hypotheses, brute-force MAP learning, and the cancer-test example.
minutes: 14
tags: [MAP, MLE, brute-force, version-space, cancer]
---

# MAP & ML Hypotheses

## The MAP hypothesis

Given candidate hypotheses $H$ and data $D$, the **Maximum A Posteriori (MAP)** hypothesis is the most probable one:

$$h_{MAP} = \arg\max_{h\in H} P(h\mid D) = \arg\max_{h\in H} \frac{P(D\mid h)P(h)}{P(D)} = \arg\max_{h\in H} P(D\mid h)\,P(h)$$

We drop $P(D)$ because it's **constant across hypotheses** (it doesn't depend on $h$). No other hypothesis is more probable given the data.

## The ML hypothesis

If every hypothesis is **equally probable a priori** ($P(h_i) = P(h_j)$ for all $i,j$), the prior drops out too, leaving the **Maximum Likelihood (ML)** hypothesis:

$$h_{ML} = \arg\max_{h\in H} P(D\mid h)$$

> [!INTUITION]
> **MAP vs ML.** ML asks "which hypothesis makes the data most likely?" MAP adds "...*and* is plausible to begin with?" — it weights the likelihood by the prior. **MAP = ML exactly when the prior is uniform.** ML is just MAP that has forgotten its prior.

## Brute-force MAP & a Bayesian justification of concept learning

Mitchell analyses concept learning probabilistically (§6.3). Assume: noise-free data, the target concept is in $H$, and a **uniform prior** $P(h) = 1/|H|$. Set the likelihood to encode *consistency*:

$$P(D\mid h) = \begin{cases} 1 & h \text{ is consistent with } D \\ 0 & \text{otherwise}\end{cases}$$

> [!DERIVE]
> By total probability, the evidence is $P(D) = \sum_{h_i} P(D\mid h_i)P(h_i) = \sum_{h_i\in VS} 1\cdot\frac{1}{|H|} = \dfrac{|VS_{H,D}|}{|H|}$, where $VS$ is the **version space**. Plugging into Bayes:
> $$P(h\mid D) = \begin{cases} \dfrac{1}{|VS_{H,D}|} & h \text{ consistent with } D \\ 0 & \text{inconsistent}\end{cases}$$

So **every consistent hypothesis is equally probable a posteriori** — which is precisely the version space. This gives a Bayesian justification for **Find-S** and **Candidate-Elimination**: under these assumptions, any consistent hypothesis *is* a MAP hypothesis.

> [!NOTE]
> The **Brute-Force MAP algorithm** — compute $P(h\mid D)$ for *every* $h\in H$ and return the max — is computationally infeasible for large $H$, but it's the **theoretical gold standard** other learners approximate.

## Worked example — the cancer test (Mitchell §6.2.1)

Priors and likelihoods:

| | Prior | $P(+\mid\cdot)$ |
|---|---|---|
| cancer | $0.008$ | $0.98$ |
| ¬cancer | $0.992$ | $0.03$ |

A patient tests **positive**. Compare the unnormalized posteriors:

$$P(+\mid\text{cancer})P(\text{cancer}) = 0.98\times0.008 = 0.00784$$
$$P(+\mid\neg\text{cancer})P(\neg\text{cancer}) = 0.03\times0.992 = 0.02976$$

Since $0.02976 > 0.00784$, **$h_{MAP} = \neg$cancer**. Normalizing:

$$P(\text{cancer}\mid+) = \frac{0.00784}{0.00784+0.02976} \approx \mathbf{0.21}, \qquad P(\neg\text{cancer}\mid+) \approx \mathbf{0.79}$$

> [!TRAP]
> A *positive* cancer test still yields only a **21%** chance of cancer — because the disease is rare (prior $0.008$). The test's accuracy can't overcome the tiny base rate from one test. (Mitchell Exercise 6.1 asks: a **second** independent positive test flips the decision — recompute with the first posterior as the new prior.)

> [!EXAM]
> Be able to: (1) write $h_{MAP}$ and $h_{ML}$ and state when they coincide (uniform prior); (2) run the cancer-style computation — *don't normalize until the end*, compare unnormalized $P(D\mid h)P(h)$ first; (3) explain the Bayesian justification of the version space ($P(h\mid D)=1/|VS|$ for consistent $h$).

---

**Next:** the most-used Bayesian classifier — **Naïve Bayes**.
