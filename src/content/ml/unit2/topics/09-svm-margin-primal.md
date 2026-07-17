---
subject: ml
unit: 2
order: 9
slug: svm-margin-primal
title: SVM — Maximal Margin & the Primal Problem
summary: Hyperplanes, the three parallel planes, the margin-width derivation, and the convex primal optimization.
minutes: 14
tags: [SVM, hyperplane, margin, primal, hard-margin]
---

# SVM — Maximal Margin & the Primal Problem

## The core idea

A **Support Vector Machine** is, by default, a **linear classifier**. Data is *linearly separable* if a **hyperplane** can split it:

- 2D → a **line**, 3D → a **plane**, $d$-D → a **$(d{-}1)$-dimensional hyperplane**.

Many lines can separate the data — **but which one?** SVM picks the one that makes the **"street" (margin) as wide as possible**. *(Vapnik, 1990s, at Bell Labs.)*

> [!INTUITION]
> Don't just separate the classes — separate them with the **widest possible gap**. A fat margin leaves the most room for error, so new points are less likely to fall on the wrong side → **lower generalization error**.

## The three parallel hyperplanes

All share the same normal vector $\mathbf{W}$ (general hyperplane: $\mathbf{W}^T\mathbf{x} + b = 0$):

| Plane | Equation |
|---|---|
| **Positive support plane** | $\mathbf{W}^T\mathbf{x} + b = +1$ |
| **Decision boundary** | $\mathbf{W}^T\mathbf{x} + b = 0$ |
| **Negative support plane** | $\mathbf{W}^T\mathbf{x} + b = -1$ |

**Decision rule.** For label $y_i \in \{+1, -1\}$:

$$\mathbf{W}^T\mathbf{x}_i + b \ge +1 \ (y_i=+1), \qquad \mathbf{W}^T\mathbf{x}_i + b \le -1 \ (y_i=-1)$$

which combine into the single **constraint**:

$$y_i(\mathbf{W}^T\mathbf{x}_i + b) \ge 1 \quad \forall i$$

**Classifying a new point $U$:** compute $\mathbf{W}^T U + b$ → $\ge +1$ positive, $\le -1$ negative; landing **in the gutter** ($-1 < \cdot < +1$) means low confidence.

## Width of the margin

Take a positive support vector $x_+$ ($\mathbf{W}^Tx_+ + b = +1$) and negative $x_-$ ($\mathbf{W}^Tx_- + b = -1$). The margin is the projection of $(x_+ - x_-)$ onto the unit normal $\mathbf{W}/\lVert\mathbf{W}\rVert$:

$$\text{Width} = \frac{2}{\lVert\mathbf{W}\rVert}$$

## The primal problem

**Maximise** $\dfrac{2}{\lVert\mathbf{W}\rVert}$ ⟺ **minimise** $\lVert\mathbf{W}\rVert$ ⟺ **minimise** $\tfrac{1}{2}\lVert\mathbf{W}\rVert^2$ (the $\tfrac12$ and square make the derivative clean):

$$\boxed{\ \min_{\mathbf{W}, b}\ \tfrac{1}{2}\lVert\mathbf{W}\rVert^2 \quad \text{s.t. } y_i(\mathbf{W}^T\mathbf{x}_i + b) \ge 1,\ i = 1\dots m\ }$$

This is a **convex quadratic optimization** with linear constraints — a single global optimum, solvable by **Lagrange multipliers** (next topic).

> [!EXAM]
> Memorise: the three planes ($\pm1$ and $0$), the combined constraint $y_i(\mathbf{W}^T\mathbf{x}_i+b)\ge1$, the margin $\frac{2}{\lVert W\rVert}$, and that maximising the margin ⟺ minimising $\tfrac12\lVert W\rVert^2$. This is the **Hard-Margin** SVM (no violations allowed).

---

**Next:** the optimization machinery — **Lagrange multipliers & KKT conditions**.
