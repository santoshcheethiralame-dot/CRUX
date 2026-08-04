---
subject: ml
unit: 1
order: 3
slug: generative-vs-discriminative
title: Generative vs Discriminative Models
summary: p(x,y) versus p(y|x), the 4-point worked probability example from the slides, Bayes' rule as the bridge, and which algorithms fall where.
minutes: 10
tags: [generative, discriminative, joint-probability, conditional-probability, bayes]
---

# Generative vs Discriminative Models

Every ML model can be sorted into one of two families by asking: **what probability distribution does it actually model?**

- A **discriminative model** makes predictions based on the **conditional probability** $p(y \mid x)$, and is used for classification or regression.
- A **generative model** models the **distribution of the dataset** — the **joint** probability $p(x, y)$ — and can return a probability for a given example.

The one-line slogan from the slides:

> **Discriminative models draw *boundaries in the data space*, while generative ones model *how data is placed throughout the space*.**

> [!INTUITION]
> Two students preparing for a language exam. The **discriminative** student learns only the differences: *"if the sentence has this ending it's Hindi, otherwise Kannada."* The **generative** student actually learns both languages — she can *tell them apart* (by asking which language would more likely produce this sentence) **and can also write new sentences in either**. Generative models know more; discriminative models are usually better at the one job you asked for.

---

## The worked example (know this cold)

Dataset of four points, input $x$, label $y$:

$$(x{=}1,\ y{=}0),\quad (x{=}1,\ y{=}0),\quad (x{=}2,\ y{=}0),\quad (x{=}2,\ y{=}1)$$

**The generative model learns the joint $p(x,y)$** — every cell divided by the total count 4:

| $p(x,y)$ | $y=0$ | $y=1$ |
|---|---|---|
| **$x=1$** | $\tfrac12$ | $0$ |
| **$x=2$** | $\tfrac14$ | $\tfrac14$ |

Note the four cells sum to **1** — it is a distribution over *everything*.

**The discriminative model learns the conditional $p(y \mid x)$** — each **row** normalised by that row's total:

| $p(y\mid x)$ | $y=0$ | $y=1$ |
|---|---|---|
| **$x=1$** | $1$ | $0$ |
| **$x=2$** | $\tfrac12$ | $\tfrac12$ |

Now **each row** sums to 1 — it is a distribution over labels *for a given* $x$.

**Reading it:** $p(y\mid x)$ is the natural distribution for classifying a given example $x$ into a class $y$ — which is exactly why algorithms that model it directly are called **discriminative**.

**The bridge:** generative algorithms model $p(x,y)$, which **can be transformed into $p(y\mid x)$ by applying Bayes' rule** and then used for classification:

$$p(y \mid x) = \frac{p(x, y)}{p(x)} = \frac{p(x\mid y)\,p(y)}{p(x)}$$

Check it on the table: $p(x{=}2) = \tfrac14+\tfrac14 = \tfrac12$, so $p(y{=}1\mid x{=}2) = \tfrac{1/4}{1/2} = \tfrac12$. ✔

**But** $p(x,y)$ can also be used for other purposes — for example to **generate** likely $(x,y)$ pairs. That extra capability is the whole point of the word *generative*.

> [!DERIVE]
> Going the other way is **impossible**: from $p(y\mid x)$ alone you cannot recover $p(x,y)$, because you'd also need $p(x)$ — and a discriminative model never learns it. That asymmetry is the exam answer to *"why is a generative model said to know more?"*

---

## Which is which

| **Discriminative models** | **Generative models** |
|---|---|
| Logistic Regression | Bayesian Network |
| Support Vector Machine | Hidden Markov Model (HMM) |
| **Decision Tree** | Autoregressive model |
| Random Forest | Generative Adversarial Network (GAN) |
| | *(also Naïve Bayes, GMM — Unit 3)* |

> [!EXAM]
> A 4–6 mark favourite: *"Differentiate generative and discriminative models with an example."* Structure your answer as: (1) the distribution each models — $p(x,y)$ vs $p(y\mid x)$; (2) the boundary-vs-placement slogan; (3) the 4-point table showing both; (4) Bayes' rule as the one-way bridge; (5) two algorithms from each column.

> [!TRAP]
> **Discriminative ≠ classification** and **generative ≠ unsupervised**. Both families are used for supervised classification here. The split is about *what is modelled*, not *what the model is used for*. Naïve Bayes (Unit 3) is a generative model doing supervised classification.

> [!NOTE]
> Practical trade-off worth a bonus mark: discriminative models generally give **better classification accuracy** when data is plentiful (they spend all their capacity on the boundary), while generative models cope better with **missing features, small data, and unlabelled data**, and can **synthesise new samples**.

---

**Next:** narrowing from "models in general" to the very first learning problem — learning a single **concept** from examples.
