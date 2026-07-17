---
subject: ml
unit: 2
order: 8
slug: optimizers
title: Optimization Algorithms
summary: Batch/SGD/mini-batch GD, exponentially weighted averages, Momentum, RMSProp, Adam, and learning-rate decay.
minutes: 16
tags: [SGD, mini-batch, momentum, RMSProp, Adam, EWA]
---

# Optimization Algorithms

**Optimization** = finding the parameters that minimise the cost $J(\theta)$. We optimise $J$ as a *proxy* for the real performance measure $P$.

## How much data per update?

| Variant | Updates after… | Pros | Cons |
|---|---|---|---|
| **Batch GD** | the **whole** training set | stable gradient, parallelisable | needs all data in memory; slow; can converge **prematurely** |
| **SGD** | **every single** example | fast feedback, noise escapes local minima | noisy/high-variance; hard to settle at the minimum; costly per step |
| **Mini-batch GD** | each small **batch** | best of both — robust *and* efficient; no full data in memory | extra hyperparameter (batch size) |

**Mini-batch** is the standard in deep learning. Batch size is a hyperparameter, usually a power of 2 fitting GPU memory: **32, 64, 128, 256**.

> [!INTUITION]
> Convergence shape: **Batch GD** glides smoothly to the minimum; **SGD** zig-zags noisily around it (never quite settling, but dodging local minima); **mini-batch** is in between — noisy but directed.

## Exponentially Weighted Averages (EWA)

The smoothing trick behind Momentum, RMSProp and Adam. Given the current value $O_t$ and previous estimate $V_{t-1}$:

$$V_t = \beta V_{t-1} + (1-\beta)O_t$$

$V_t$ averages roughly the last $\frac{1}{1-\beta}$ steps — $\beta = 0.9 \Rightarrow$ ~10 steps, $\beta = 0.5 \Rightarrow$ ~2. **Large $\beta$** = smoother but slower to react; **small $\beta$** = responsive but noisier.

## Momentum

**Problem:** plain GD bounces across steep ravines, slowing progress. **Fix:** add *history* — step along the EWA of past gradients:

$$V_{dW} = \beta V_{dW} + (1-\beta)\,dW, \qquad W = W - \alpha\,V_{dW}$$

This **dampens oscillations** and powers through flat/noisy regions. (Downside: can overshoot or oscillate around the minimum.)

## RMSProp (Root Mean Square Propagation)

Adapts the learning rate **per parameter** using the EWA of **squared** gradients:

$$S_{dW} = \beta_2 S_{dW} + (1-\beta_2)\,dW^2, \qquad W = W - \alpha\,\frac{dW}{\sqrt{S_{dW}} + \epsilon}$$

> [!INTUITION]
> A direction with **small** $S_{dW}$ (gentle slope) gets a **bigger** step (divide by small); a direction with **large** $S_{dW}$ (steep, oscillating) gets **damped**. So it speeds up the slow axis and calms the jittery one. ($\epsilon$ prevents divide-by-zero.)

## Adam (Adaptive Moment Estimation)

**Adam = Momentum + RMSProp.** It keeps a 1st moment $V$ (mean of gradients) *and* a 2nd moment $S$ (mean of squared gradients):

$$V_{dW} = \beta_1 V_{dW} + (1-\beta_1)dW, \qquad S_{dW} = \beta_2 S_{dW} + (1-\beta_2)dW^2$$

**Bias correction** (moments start at 0, so early estimates are too small):

$$V^{\text{corr}}_{dW} = \frac{V_{dW}}{1-\beta_1^{\,t}}, \qquad S^{\text{corr}}_{dW} = \frac{S_{dW}}{1-\beta_2^{\,t}}, \qquad W = W - \alpha\,\frac{V^{\text{corr}}_{dW}}{\sqrt{S^{\text{corr}}_{dW}} + \epsilon}$$

| Hyperparameter | Meaning | Typical |
|---|---|---|
| $\alpha$ | learning rate | 0.001 |
| $\beta_1$ | decay for 1st moment | 0.9 |
| $\beta_2$ | decay for 2nd moment | 0.999 |
| $\epsilon$ | numerical safety | $10^{-8}$ |

**Pros:** adaptive per-parameter rates, momentum smoothing, bias correction, robust across architectures. **Cons:** memory-heavy (stores moments per parameter), sometimes worse than SGD+momentum, still needs tuning.

## Learning-rate decay

Shrink $\alpha$ as you near the minimum to stop noisy oscillation:

$$\alpha = \frac{1}{1 + \text{decay\_rate}\times\text{epoch}}\cdot\alpha_0$$

Variants: exponential decay $\alpha = \alpha_0 k^{\text{epoch}}$, step decay (halve every interval), and manual decay.

> [!EXAM]
> Be able to: rank the three GD variants on update frequency/noise; write the **EWA** update; explain **Momentum** (EWA of gradients) vs **RMSProp** (EWA of squared gradients); and state **Adam = Momentum + RMSProp + bias correction** with its default $\beta_1=0.9,\ \beta_2=0.999$.

---

**Next:** a different classifier entirely — **Support Vector Machines**.
