---
subject: ml
unit: 2
order: 12
slug: kernels-soft-margin
title: Kernels & Soft-Margin SVM
summary: The kernel trick, linear/polynomial/RBF kernels, and soft-margin SVM with slack variables and the C parameter.
minutes: 14
tags: [kernel-trick, RBF, polynomial, soft-margin, slack, regularization-C]
---

# Kernels & Soft-Margin SVM

## The kernel trick

**Problem:** the data isn't linearly separable in its original space. **Solution:** map it to a **higher-dimensional** space where it *is* separable.

*Example:* XOR is inseparable in $[x_1, x_2]$, but mapping to a space including $x_1x_2$ makes it separable (positives have $x_1x_2=-1$, negatives $+1$; the separator is $x_1x_2=0$).

But computing an explicit mapping is expensive — mapping 3D → 9D costs $O(n^2)$. The **kernel trick** sidesteps this:

> [!INTUITION]
> Recall the dual uses training points **only inside dot products**. A **kernel** $K(\mathbf{x}_i, \mathbf{x}_j)$ returns the dot product *as if* the points were lifted to the high-dimensional space — **without ever going there**. Cost drops to $O(n)$. A kernel is essentially a **similarity measure** between two vectors.

The dual with a kernel:

$$\max_{\alpha}\ \sum_i \alpha_i - \tfrac{1}{2}\sum_i\sum_j \alpha_i\alpha_j\,y_iy_j\,K(\mathbf{x}_i, \mathbf{x}_j)$$

## Common kernels

| Kernel | $K(\mathbf{x}, \mathbf{x}')$ | When to use |
|---|---|---|
| **Linear** | $\mathbf{x}\cdot\mathbf{x}'$ | linearly separable; many features (e.g. text) |
| **Polynomial** | $(\mathbf{x}\cdot\mathbf{x}' + c)^d$ | curved boundaries; degree $d$ controls complexity |
| **Gaussian / RBF** | $e^{-\gamma\lVert\mathbf{x}-\mathbf{x}'\rVert^2}$ | very flexible; depends only on **distance** |

- **Polynomial:** degree 1 (no constant) = linear; higher degree → more complex boundary but **risk of overfitting**.
- **RBF:** $\gamma$ controls reach of one example — **low $\gamma$** = far/smooth influence, **high $\gamma$** = close/wiggly influence.

> [!EXAM]
> **Recommended default: try the RBF kernel first** — it usually works well. Know all three formulas; remember polynomial **degree** and RBF **$\gamma$** both trade smoothness against overfitting.

## Soft-Margin SVM

Hard margin is too strict for noisy/overlapping data. Soft margin allows controlled violations via **slack variables** $\xi_i \ge 0$ (one per point):

| $\xi_i$ | Meaning |
|---|---|
| $\xi_i = 0$ | correctly classified, outside the margin |
| $0 < \xi_i < 1$ | inside the margin, but correct side |
| $\xi_i > 1$ | **misclassified** |

**Objective** and **constraints:**

$$\min_{\mathbf{W}, b, \xi}\ \tfrac{1}{2}\lVert\mathbf{W}\rVert^2 + C\sum_{i=1}^{m}\xi_i \qquad \text{s.t. } y_i(\mathbf{W}^T\mathbf{x}_i + b) \ge 1 - \xi_i$$

The left side $y_i(\mathbf{W}^Tx_i+b)$ is the **confidence**: $\ge 1$ is comfortably correct; $<1$ incurs a linear penalty $\xi_i$ (points further on the wrong side pay more).

### The regularization parameter C

> [!TRAP]
> **C trades margin width against violations:**
> - **Small C** → mistakes cheap → **wider margin**, tolerant of errors (more "soft").
> - **Large C** → mistakes expensive → **narrow margin**, avoids misclassification (approaches **hard** margin) → can **overfit**.
>
> So as $C \uparrow$ margin $\downarrow$ (→ hard SVM); as $C \downarrow$ margin $\uparrow$ (→ soft SVM). $C$ is a hyperparameter to tune.

> [!EXAM]
> Define slack $\xi_i$ (the three regimes), write the soft objective $\tfrac12\lVert W\rVert^2 + C\sum\xi_i$, and explain the effect of **C**. Pair it with hard-margin's outlier sensitivity from the previous topic.

---

**Next:** combining many weak models — **Ensemble Learning & Bagging**.
