---
subject: ml
unit: 2
order: 7
slug: activation-functions
title: Activation Functions
summary: Sigmoid, tanh, ReLU, Leaky ReLU and Softmax — equations, ranges, problems, and which to use where.
minutes: 12
tags: [sigmoid, tanh, relu, leaky-relu, softmax]
---

# Activation Functions

An **activation function** is a **non-linear** transformation applied to a neuron's pre-activation before passing it on. It decides whether (and how strongly) a neuron "fires."

> [!INTUITION]
> **Why must it be non-linear?** Stack only linear layers and the whole network collapses to a single linear map — a glorified linear-regression model. Non-linearity is what lets a network bend space and learn **complex patterns**.

## The five functions

### Sigmoid
$$\sigma(x) = \frac{1}{1 + e^{-x}}, \qquad \text{range } [0, 1]$$
Differentiable; output reads as a **probability**. Good for the **output layer of binary classification** (or shallow nets with 1 hidden layer). Suffers vanishing gradients in deep nets (derivative ≤ 0.25).

### tanh (hyperbolic tangent)
$$\tanh(x) = \frac{e^x - e^{-x}}{e^x + e^{-x}}, \qquad \text{range } [-1, 1]$$
Zero-centred (negatives → strongly negative, zero → near zero). Its derivative peaks at **1** (vs sigmoid's 0.25), so it's "like sigmoid but **better**." Good for **hidden layers**.

### ReLU (Rectified Linear Unit)
$$f(x) = \max(0, x) = \begin{cases} x & x > 0 \\ 0 & x \le 0\end{cases}, \qquad \text{range } [0, \infty)$$
The workhorse of deep networks — cheap and avoids sigmoid-style vanishing gradients.

> [!TRAP]
> **Dying ReLU:** every negative input maps to exactly 0, with **zero gradient** there. Such neurons can get stuck outputting 0 forever and stop learning.

### Leaky ReLU
$$f(x) = \begin{cases} x & x > 0 \\ a x & x \le 0\end{cases} = \max(ax, x), \qquad \text{range } (-\infty, \infty)$$
A small **leak** $a$ (typically **0.01**) gives negatives a tiny non-zero slope, so neurons never fully die. $a$ can even be **learned** as a parameter.

### Softmax
$$\text{Softmax}(z_i) = \frac{e^{z_i}}{\sum_j e^{z_j}}, \qquad \text{each in } [0,1],\ \textstyle\sum_i = 1$$
A generalisation of sigmoid to many classes (reduces to sigmoid when #classes = 2). Used in the **output layer for multi-class classification** — it turns raw scores into a probability distribution that **sums to 1**.

## Which activation to use?

| Scenario | Use |
|---|---|
| Binary classification (output) | **Sigmoid** |
| Hidden layers (deep nets) | **ReLU** |
| Dead neurons appearing | **Leaky ReLU** |
| Multi-class classification (output) | **Softmax** |
| Hidden layers (alt.) | **tanh** |

> [!EXAM]
> Know each **equation, range, and its one signature issue**: sigmoid → vanishing gradient; ReLU → dying ReLU; Leaky ReLU → fixes dying ReLU; softmax → outputs sum to 1. Rule of thumb: **ReLU in hidden layers, softmax/sigmoid at the output** — never sigmoid deep in a network.

---

**Next:** smarter ways to descend the loss surface — **optimization algorithms**.
