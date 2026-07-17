---
subject: ml
unit: 3
order: 7
slug: ml-least-squares
title: Maximum Likelihood & Least-Squared Error
summary: Why minimizing sum-of-squared-errors is exactly maximum-likelihood estimation under Gaussian noise.
minutes: 9
tags: [MLE, least-squares, gaussian-noise, regression]
---

# Maximum Likelihood & Least-Squared Error

Many learners — linear regression, polynomial curve fitting, neural networks — minimize the **sum of squared errors**. Mitchell (§6.4) shows this isn't arbitrary: **least-squares is maximum likelihood under a Gaussian-noise assumption.**

## The setup

Predict a continuous target. Assume each observed value is the true function plus independent Gaussian noise:

$$d_i = h(x_i) + e_i, \qquad e_i \sim \mathcal{N}(0, \sigma^2)$$

So given $h$, each $d_i$ is normally distributed with mean $h(x_i)$ and variance $\sigma^2$:

$$p(d_i\mid h) = \frac{1}{\sqrt{2\pi\sigma^2}}\,\exp\!\left[-\frac{(d_i - h(x_i))^2}{2\sigma^2}\right]$$

## The derivation

Assuming the data is independent, $p(D\mid h) = \prod_{i=1}^{m} p(d_i\mid h)$. The ML hypothesis maximizes this — and since $\log$ is monotonic, we maximize the **log-likelihood** instead:

$$h_{ML} = \arg\max_{h}\ \ln p(D\mid h) = \arg\max_{h}\ \sum_{i=1}^{m}\left[-\frac{(d_i - h(x_i))^2}{2\sigma^2} - \tfrac{1}{2}\ln(2\pi\sigma^2)\right]$$

> [!DERIVE]
> The constant $-\tfrac12\ln(2\pi\sigma^2)$ and the positive factor $\tfrac{1}{2\sigma^2}$ don't depend on $h$, so they drop out. Maximizing the remaining $-\sum(d_i - h(x_i))^2$ is the same as **minimizing** its negative:
> $$\boxed{\,h_{ML} = \arg\min_{h}\ \sum_{i=1}^{m}(d_i - h(x_i))^2\,}$$

## The takeaway

> [!INTUITION]
> **Maximum Likelihood hypothesis = Least-Squared-Error hypothesis** — *provided the noise is independent, zero-mean Gaussian*. This is why squared error is the default loss for regression: it's not a heuristic, it's the principled ML estimate under the most common noise model. (If the noise were, say, Laplacian, ML would instead minimize *absolute* error.)

> [!EXAM]
> Reproduce the four-step argument: (1) Gaussian noise → Gaussian $p(d_i\mid h)$; (2) independence → product likelihood; (3) take $\log$ → sum; (4) drop $h$-independent constants → minimizing $\sum(d_i-h(x_i))^2$. Conclude $h_{ML} = h_{LSE}$. State the key assumption (zero-mean Gaussian noise) explicitly — that's where the marks are.

---

**Next:** learning when some variables are *hidden* — the **EM algorithm**.
