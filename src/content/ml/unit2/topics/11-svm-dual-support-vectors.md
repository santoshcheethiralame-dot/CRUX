---
subject: ml
unit: 2
order: 11
slug: svm-dual-support-vectors
title: SVM Dual Problem & Support Vectors
summary: The SVM Lagrangian, why W is a sum of support vectors, solving by hand, and hard-margin's outlier sensitivity.
minutes: 14
tags: [SVM, dual, support-vectors, lagrangian, hard-margin]
---

# SVM Dual Problem & Support Vectors

## The SVM Lagrangian

Attach a multiplier $\alpha_i \ge 0$ to each margin constraint of the primal:

$$L(\mathbf{W}, b, \alpha) = \tfrac{1}{2}\lVert\mathbf{W}\rVert^2 - \sum_{i=1}^{m}\alpha_i\big[y_i(\mathbf{W}^T\mathbf{x}_i + b) - 1\big]$$

Setting $\dfrac{\partial L}{\partial \mathbf{W}} = 0$ gives the **key result**:

$$\boxed{\ \mathbf{W} = \sum_{i=1}^{m}\alpha_i\,y_i\,\mathbf{x}_i\ }$$

The weight vector is a **linear combination of the training points** — but only of *some* of them.

## Support vectors

By **complementary slackness** ($\alpha_i[\,y_i(\mathbf{W}^Tx_i+b)-1\,]=0$):

- Points **not on the gutter** → constraint slack → $\alpha_i = 0$ (they drop out of the sum).
- Points **on the gutter** → constraint binding → $\alpha_i \neq 0$.

> [!NOTE]
> The points with $\alpha_i \neq 0$ are the **SUPPORT VECTORS** — they alone define $\mathbf{W}$ and the hyperplane. Delete every other point and the boundary is unchanged. This is why SVM is *sparse*.

## Why solve the dual, not the primal?

Substituting $\mathbf{W} = \sum\alpha_i y_i x_i$ back yields a problem **only in the $\alpha$'s**, where training points appear **only inside dot products** $\mathbf{x}_i\cdot\mathbf{x}_j$:

- enables the **kernel trick** (replace the dot product — next topic),
- is **more efficient** to solve (e.g. the **SMO** algorithm).

## Solving an SVM by hand

**Way 1 — binding constraints:** plug the support vectors into $\mathbf{W}^Tx+b = \pm1$ and solve for $\mathbf{W}, b$ directly.

**Way 2 — Lagrange multipliers:**
1. Identify the support vectors by inspection (e.g. $s_1=(1,0),y{=}{-}1$; $s_2=(3,1),y{=}{+}1$; $s_3=(3,-1),y{=}{+}1$).
2. Write the constraint equations for the support vectors only (others have $\alpha=0$).
3. Solve for the multipliers and bias.
4. Compute $\mathbf{W} = \sum_i \alpha_i y_i \mathbf{x}_i$.
5. Report $\mathbf{W}$ and $b$.
6. Classify a query $U$: $Z = \mathbf{W}^TU + b$ → $Z\ge1$ positive, $Z\le-1$ negative.

*(e.g. a solved boundary might come out as $-6.94x_1 - 8.83x_2 + 7.79 = 0$.)*

## Hard-margin's weakness: outliers

> [!TRAP]
> **Hard-margin SVM insists every point is classified correctly.** A single noisy **outlier** can drag the boundary dramatically → **overfitting**. The fix is to *allow* a few violations → **Soft-Margin SVM** (next topic).

> [!EXAM]
> Core results to reproduce: the Lagrangian, $\mathbf{W}=\sum\alpha_i y_i x_i$, "support vectors are the points with $\alpha_i\ne0$ / on the gutter," and the dual's two advantages (**kernels** + only **dot products**). Numerical problems usually give you the support vectors — then it's Way 1 or Way 2.

---

**Next:** going non-linear with **kernels**, and tolerating noise with the **soft margin**.
