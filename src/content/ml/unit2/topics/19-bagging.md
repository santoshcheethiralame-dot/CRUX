---
subject: ml
unit: 2
order: 19
slug: bagging
title: Bagging & Out-of-Bag Error
summary: Bootstrap aggregating step by step, the derivation of the 63%/37% split, the out-of-bag set as a free validation set and how its error is computed, and why bagging reduces variance.
minutes: 11
tags: [bagging, bootstrap, aggregation, out-of-bag, OOB, variance-reduction, resampling]
---

# Bagging & Out-of-Bag Error

**Bagging = Bootstrap AGGregatING.**

## The algorithm

> [!NOTE]
> - **Multiple subsets (bootstrap samples) are created from the original dataset, selecting observations with replacement.** These samples are usually **of the same size** as the original ($\Rightarrow$ **duplicates will be introduced**; ~no preprocessing required).
> - A **base model (weak model) is created on each of these subsets.**
> - **The models could be run in parallel and are independent of each other.**
> - The **final predictions are determined by combining the predictions from all the models (voting or averaging) — Aggregation.**

> [!EXAM]
> Three properties define bagging and each contrasts with boosting:
> 1. **Sampling with replacement**, same size as the original
> 2. **Models are independent and run in parallel**
> 3. **Equal-weight voting or averaging**

> [!INTUITION]
> Sampling **with replacement** is the crucial detail. Without it, every "subset" of full size would just be the original dataset reshuffled — identical training sets, identical models, **zero diversity**. Replacement lets some points appear two or three times and others not at all, so each sample is genuinely different. **The duplicates are not a flaw; they are the mechanism.**

---

## The 63% / 37% result

> [!NOTE]
> It has been shown that when we create a dataset as described above we would have close to **63% of data from the original dataset**, and about **37% of the original data is not selected**, for a sufficiently large sample size.

> [!DERIVE]
> Let $n$ be the number of datapoints in the original dataset.
>
> **One draw:** the probability that a specific record $x$ is **not** picked is
> $$1 - \frac{1}{n}$$
>
> **All $n$ draws:** *why to the power of $n$? **$n$ times we draw from the sample with replacement**.* Since draws are independent,
> $$P(x \text{ not selected at all}) = \left(1 - \frac{1}{n}\right)^{n}$$
>
> **The limit.** Using $\lim_{n\to\infty}(1 + a/n)^n = e^{a}$ with $a = -1$:
> $$\left(1 - \frac{1}{n}\right)^{n} \;\longrightarrow\; e^{-1} = \frac{1}{e} \approx 0.368$$
>
> So about **36.8% of the data is left out** and about **63.2% is in the bag**.

Convergence is fast — even at $n = 100$ the value is already $0.366$.

> [!TRAP]
> The 63% refers to the count of **distinct original records** appearing, not the sample size. The bootstrap sample still has **$n$ rows** — it simply contains roughly $0.63n$ *unique* records, with the remainder made up of duplicates.

---

## The out-of-bag set

> [!NOTE]
> When bootstrap aggregating is performed, **two independent sets are created**. One set, the **bootstrap sample**, is the data chosen to be **"in-the-bag"** by sampling with replacement. The **out-of-bag set is all data not chosen** in the sampling process.
>
> The OOB sets can be aggregated into one dataset, but **each sample is only considered out-of-bag for the models that do not include it in their bootstrap sample.**

### Calculating out-of-bag error

> [!EXAM]
> Since each out-of-bag set is **not used to train the model, it is a good test for the performance of the model**. The general calculation:
>
> 1. **Find all models that are not trained by the OOB instance.**
> 2. **Take the majority vote of these models' result for the OOB instance, compared to the true value** of the OOB instance.
> 3. **Compile the OOB error for all instances in the OOB dataset.**

> [!INTUITION]
> OOB error is essentially **free cross-validation**. Ordinary $k$-fold validation requires holding data out and training $k$ separate times; bagging generates a valid held-out set **as a side effect** of the resampling it was doing anyway.
>
> Each instance is scored only by the ~37% of models that never saw it — so the estimate is honest, costs **no extra training**, and lets you use **all** your data for training. This is a real practical advantage of bagged methods over most other model families.

---

## How many learners, and what bagging buys

> [!NOTE]
> - Most research has shown that about **100 learners are good enough**.
> - **Bagging performance improvements increase with more trees.**
> - The **maximum improvement is reached around ~50 trees** (for the plotted problem — things could differ with perceptrons or another problem).
> - In bagging we combine the outputs of multiple classifiers trained on different samples of the training data. **This helps in reducing overall variance. Due to the reduction in variance, normally unstable classifiers can be made robust with the help of bagging.**

> [!EXAM]
> **Bagging reduces variance, not bias.** Each model is trained on the same *kind* of data with the same algorithm, so the systematic error (bias) is unchanged — but averaging cancels the random, sample-specific part of the error.
>
> The consequence for model choice: bagging works best on **low-bias, high-variance** learners — deep unpruned decision trees are ideal, which is exactly why random forest exists. Bagging a high-bias model like a decision stump helps very little, because there is little variance to average away.

> [!TRAP]
> Note the tension with the previous topic, which recommended **weak** learners generally. For **bagging** specifically you want learners that are **unstable** (high variance) rather than weak — fully grown trees, not stumps. **Boosting** is the method that wants genuinely weak learners. Getting this backwards is a common exam error.

> [!INTUITION]
> Why does averaging reduce variance? For $N$ **independent** estimates each with variance $\sigma^2$, the variance of their mean is $\sigma^2/N$. Perfect independence is unattainable — the samples overlap by construction — so the reduction is partial, which is why returns flatten out around 50 trees rather than improving forever.

---

**Next:** learners trained sequentially, each fixing the last one's mistakes — **boosting**.
