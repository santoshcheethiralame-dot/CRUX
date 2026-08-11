---
subject: ml
unit: 2
order: 11
slug: optimizers
title: Optimization — Batch, Stochastic & Mini-Batch
summary: What optimization means in deep learning and why it is indirect, the three gradient-descent variants with their full upside and downside lists, how to choose a batch size, and the exponentially weighted averages that the adaptive optimizers are built on.
minutes: 12
tags: [optimization, batch-gradient-descent, SGD, mini-batch, batch-size, EWMA, convergence]
---

# Optimization — Batch, Stochastic & Mini-Batch

## What optimization means here

> [!NOTE]
> **Optimization is a process of finding optimal parameters for the model, which significantly reduces the error function.**
>
> Optimization algorithms used for training deep models differ from traditional optimization algorithms in several ways. **In most machine learning scenarios we care about some performance measure, say $P$, but we optimise $P$ only indirectly by reducing a different cost function $J(\theta)$ in the hope that doing so will improve $P$.**

> [!INTUITION]
> That second paragraph is the most important sentence in the topic. The thing you actually want — **accuracy**, or F1, or a user's satisfaction — is typically **non-differentiable** (accuracy is a step count; nudging a weight usually changes it by exactly nothing). So we optimise a smooth **surrogate** instead and *hope* the two move together.
>
> They mostly do, but not always — which is why a model can show falling loss and flat accuracy, and why loss is a diagnostic rather than the goal.

**The five algorithms covered in this course:** Mini-batch gradient descent, Stochastic gradient descent, Gradient descent with momentum, RMSProp, Adam.

### Recap

> [!NOTE]
> Gradient descent **searched the hypothesis space of all possible weight vectors to find the best fit for all training examples.** Given a cost function $J(w)$ to minimise:
> 1. **Randomly initialize** the weight vectors.
> 2. **Calculate the loss and update the weight vectors in the direction of steepest descent.**
> 3. **Repeat till we converge at a minima.**

---

## Batch gradient descent

> [!NOTE]
> Calculates the error for **each example** in the training dataset, but **only updates the model after all training examples have been evaluated**.

**Upsides**
- Fewer updates ⇒ **more computationally efficient than stochastic gradient descent**.
- The decreased update frequency results in a **more stable error gradient** and may give **more stable convergence** on some problems.
- The separation of error calculation from the model update **lends the algorithm to parallel processing** implementations.

**Downsides**
- The more stable error gradient may result in **premature convergence** to a less optimal set of parameters.
- Updates at the end of the epoch require the added complexity of **accumulating prediction errors across all examples**.
- Commonly implemented so that it requires the **entire training dataset in memory**.
- Model updates, and in turn training speed, **may become very slow for large datasets**.

---

## Stochastic gradient descent (SGD)

> [!NOTE]
> Calculates the error and **updates the model for each example** in the training dataset.

**Upsides**
- Frequent updates **immediately give insight** into model performance and rate of improvement.
- **Simplest to understand and implement**, especially for beginners.
- Increased update frequency can result in **faster learning** on some problems.
- **The noisy update process can allow the model to avoid local minima** (e.g. premature convergence).

**Downsides**
- Updating so frequently is **more computationally expensive**, taking significantly longer on large datasets.
- Frequent updates give a **noisy gradient signal**, so parameters and error **jump around** (higher variance across epochs).
- The noisy descent makes it **hard for the algorithm to settle on a minimum**.

> [!TRAP]
> Notice the same property — **noise** — appears as an upside *and* a downside. It **escapes local minima**, and it **prevents settling**. Both statements are true and a good answer states both; the standard resolution is to **decay the learning rate** so the process is noisy early and calm late.

---

## Mini-batch gradient descent

> [!NOTE]
> Splits the training dataset into **small batches** used to calculate model error and update coefficients. It **seeks to find a balance between the robustness of stochastic gradient descent and the efficiency of batch gradient descent**. It is **the most common implementation of gradient descent used in the field of deep learning.**

**Upsides**
- Update frequency **higher than batch GD** ⇒ more robust convergence, **avoiding local minima**.
- Batched updates are **computationally more efficient than SGD**.
- Batching allows **the efficiency of not having all training data in memory**.

**Downsides**
- Requires configuring an **additional hyperparameter: mini-batch size**.
- Error information **must still be accumulated across the mini-batch**, as in batch GD.

### Choosing the batch size

> [!EXAM]
> - If there is a **small training set, batch gradient descent is preferred**.
> - Mini-batch size is a **hyperparameter — experiment with a range of values**.
> - Sizes are often tuned to the **computational architecture**: **a power of two that fits the memory of the GPU or CPU — 32, 64, 128, 256**, and so on.

---

## Convergence compared

> [!EXAM]
> - **Batch gradient descent takes small steps towards the minima and will converge to a minima.**
> - **Stochastic gradient descent is noisy and oscillates near the minima — it never actually converges to the minima.**

| | Batch | Mini-batch | Stochastic |
|---|---|---|---|
| Update after | **all** examples | a **batch** of $b$ | **each** example |
| Updates per epoch | 1 | $n/b$ | $n$ |
| Gradient quality | exact, low variance | good | **noisy**, high variance |
| Path to the minimum | smooth, direct | mildly noisy | strongly oscillating |
| Escapes local minima | poorly | reasonably | **well** |
| Memory | whole dataset | one batch | one example |

---

## Exponentially Weighted Averages (EWMA)

> [!NOTE]
> The **Exponentially Weighted Moving Average** is commonly used as a smoothing technique in time series. Because of several computational advantages (**fast, low-memory cost**), the EWMA is **behind the scenes of many optimization algorithms in deep learning, including Gradient Descent with Momentum, RMSprop and Adam.**

The temperature example: let $V_t$ be the estimated temperature, $V_{t-1}$ the previous estimate, $\theta_t$ the temperature on day $t$, and $\beta$ a hyperparameter:

$$V_t = \beta \, V_{t-1} + (1 - \beta)\, \theta_t$$

> [!EXAM]
> - **$\beta$ determines how important the previous value is (the trend), and $(1-\beta)$ how important the current value is.**
> - **$V_t$ is calculated by approximating over $\dfrac{1}{1-\beta}$ days.** So $\beta = 0.9$ averages over the **last 10 days**; $\beta = 0.5$ over the **last 2 days**.
> - **As $\beta$ increases the curve becomes smoother and has less noise.** However, with large $\beta$ the formula **adapts more slowly to changes in the data**, since high weight is given to older values.

> [!DERIVE]
> **Why $1/(1-\beta)$?** Unrolling the recursion:
> $$V_t = (1-\beta)\bigl[\theta_t + \beta\theta_{t-1} + \beta^2\theta_{t-2} + \beta^3\theta_{t-3} + \cdots\bigr]$$
> The weights form a **geometric series** decaying by a factor $\beta$ each step back. A term's weight has fallen to about $1/e$ of the newest one after roughly $1/(1-\beta)$ steps, which is the effective window length. For $\beta = 0.9$: $1/(1-0.9) = 10$.
>
> Note also the **memory advantage** that makes this practical — you keep **one number**, $V_{t-1}$, not a window of the last 10 values.

> [!INTUITION]
> EWMA is the single mechanism underneath all three adaptive optimizers, applied to different quantities:
> - **Momentum** takes the EWMA of the **gradient** → a smoothed *direction*.
> - **RMSProp** takes the EWMA of the **squared gradient** → a smoothed *magnitude*.
> - **Adam** takes **both**.
>
> Understand this one formula and the next topic is bookkeeping.

---

**Next:** the three algorithms built on EWMA — **momentum, RMSProp & Adam**.
