---
subject: ml
unit: 2
order: 2
slug: perceptron
title: The Perceptron
summary: Rosenblatt's perceptron — learnable weights & bias, the decision rule, OR by hand, and the learning algorithm.
minutes: 13
tags: [perceptron, weights, bias, learning-rule, linear]
---

# The Perceptron

Frank Rosenblatt's **Perceptron (1958)** generalises the MP neuron with two crucial additions:

1. **Numerical weights** $w_i$ on each input — *and a mechanism to learn them* (plus the bias).
2. Inputs are **no longer limited to Boolean values** (real-valued inputs allowed).

## The model

Each input $x_i$ has a weight $w_i$; a special **bias** $w_0 = -\theta$ with $x_0 = 1$ absorbs the threshold. The neuron fires based on the sign of the weighted sum:

$$y = \begin{cases} 1 & \text{if } \mathbf{w}^T\mathbf{x} + b \ge 0 \\ 0 & \text{if } \mathbf{w}^T\mathbf{x} + b < 0 \end{cases} \qquad (b = w_0 = -\theta)$$

> [!INTUITION]
> **Restaurant decision.** Inputs = Service, Ambience, Taste; a foodie weights *Taste* highest. The **bias** is your *prior/prejudice*: a foodie has a very low threshold ($\theta = 0$, dines anywhere); a food critic has a high one ($\theta = 3$, only ≥4-star places). Learning = finding the weights and bias that match your past choices (the data).

## MP neuron vs Perceptron

| | MP Neuron | Perceptron |
|---|---|---|
| Inputs | Binary only | Real-valued |
| Weights | Fixed / none | **Learnable** |
| Threshold | Hand-coded | **Learnable** (as bias) |

**Shared:** both split the input space into two halves with a **linear** boundary, and output is binary.

## Worked example — OR by hand

For OR, we need weights satisfying one inequality per row of the truth table:

| $x_1$ | $x_2$ | OR | Constraint on $w_0 + w_1x_1 + w_2x_2$ |
|---|---|---|---|
| 0 | 0 | 0 | $w_0 < 0$ |
| 0 | 1 | 1 | $w_2 \ge -w_0$ |
| 1 | 0 | 1 | $w_1 \ge -w_0$ |
| 1 | 1 | 1 | $w_1 + w_2 \ge -w_0$ |

One solution: $w_0 = -1,\ w_1 = 1.1,\ w_2 = 1.1$ → boundary $-1 + 1.1x_1 + 1.1x_2 = 0$. (For AND a valid set is $w_0 = -0.8,\ w_1 = w_2 = 0.5$.)

## The Perceptron Learning Algorithm

Let **P** = inputs labelled $+1$ and **N** = inputs labelled $0$. Loop until every point is correctly classified:

```
Initialise w randomly.
Repeat until convergence:
   pick a misclassified example x:
      if x ∈ P but w·x < 0:   w ← w + x   (push boundary toward x)
      if x ∈ N but w·x ≥ 0:   w ← w − x   (push boundary away from x)
```

> [!INTUITION]
> The weight vector $\mathbf{w}$ is **normal** to the decision boundary. Adding a misclassified positive $\mathbf{x}$ rotates $\mathbf{w}$ *toward* it (shrinking the angle below 90°, so $\mathbf{w}\cdot\mathbf{x}$ becomes positive); subtracting a misclassified negative rotates it *away* (angle grows past 90°).

A perceptron is a **threshold linear unit** giving **linear decision surfaces** — it easily represents AND, OR, NAND, NOR.

> [!EXAM]
> The **Perceptron Convergence Theorem** guarantees this algorithm terminates **iff the data is linearly separable**. On non-separable data (e.g. XOR) it never converges — the motivation for the next topic.

## Perceptron rule vs Delta rule (Mitchell — know the difference)

Mitchell stresses **two distinct training rules**, and exams love the distinction:

| | **Perceptron rule** | **Delta rule** (LMS / Widrow–Hoff) |
|---|---|---|
| Trains on | the **thresholded** output (0/1) | the **unthresholded** linear output $o=\mathbf{w}\cdot\mathbf{x}$ |
| Method | mistake-driven correction | **gradient descent** on squared error $E=\tfrac12\sum(t-o)^2$ |
| Update | $\Delta w_i = \eta(t-o)x_i$ | $\Delta w_i = \eta(t-o)x_i$ over the *linear* unit |
| Convergence | only if data **linearly separable** (then exact) | converges **asymptotically** to least-squares fit **even if not separable** |

> [!INTUITION]
> The perceptron rule chases a *perfect* separator and gives up (loops forever) if none exists. The delta rule instead rolls downhill on a smooth error surface toward the **best-fit** weights — so it degrades gracefully on noisy, non-separable data. This gradient-descent idea is exactly what carries over to the **sigmoid neuron** and **backpropagation**. (Mitchell §4.4.)

---

**Next:** why a *single* perceptron fails on **XOR**, and how a *network* fixes it.
