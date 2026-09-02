---
subject: ml
unit: 2
order: 16
slug: kernels
title: Kernels & the Kernel Trick
summary: Mapping data to a higher-dimensional space, why the dual lets us skip the mapping entirely, the definition of a kernel function, the linear, polynomial and RBF kernels, and which to try first.
minutes: 11
tags: [kernel, kernel-trick, feature-space, polynomial-kernel, RBF, gaussian, non-linear, similarity]
---

# Kernels & the Kernel Trick

## The problem

Real data is usually **not linearly separable** — the ring-shaped dataset from the perceptron topic has no straight-line solution in two dimensions.

The classical fix: **map the data into a higher-dimensional space** where it *does* become linearly separable, using a transformation $\phi(\mathbf{x})$, then run a linear SVM there.

> [!INTUITION]
> Take points in 1-D at $x = -3, -1, 1, 3$ where the **inner** pair is one class and the **outer** pair another. No single point on the line separates them. Now map $x \mapsto (x, x^2)$: the classes sit at heights 1 and 9, and the **horizontal line $x^2 = 5$ separates them perfectly.**
>
> Nothing about the data changed — only the space it is described in. A curved boundary in the original space is a **flat** boundary in the mapped space.

The obvious objection: computing $\phi(\mathbf{x})$ explicitly is expensive, and for some useful mappings the target space is **infinite-dimensional**, so it cannot be computed at all.

---

## The kernel trick

```
   1-D — no single threshold separates these:

        o   o   o   x   x   x   x   o   o   o
        ─────────────────────────────────────────→  x

   lift with  φ(x) = (x, x²)  →  in 2-D a straight line now works:

     x²  │  o                                   o
         │      o                           o
         │          o                   o
         │ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─   ← separating line
         │              x           x
         │                  x   x
         └───────────────────────────────────────→  x

   The trick: we never actually compute φ(x). The dual only ever needs
   φ(xi)·φ(xj), and the kernel K(xi,xj) returns that number directly.
```

Recall the dual depends on the data **only through inner products $\mathbf{x}_i^T\mathbf{x}_j$**. After mapping, it would depend only on $\phi(\mathbf{x}_i)^T\phi(\mathbf{x}_j)$.

> [!EXAM]
> **The kernel trick:** replace the inner product with a **kernel function**
>
> $$K(\mathbf{x}_i, \mathbf{x}_j) = \phi(\mathbf{x}_i)^T \phi(\mathbf{x}_j)$$
>
> and compute $K$ **directly**, without ever evaluating $\phi$. The dual becomes
>
> $$\max_{\boldsymbol\alpha} \; \sum_{i}\alpha_i - \frac{1}{2}\sum_{i}\sum_{j}\alpha_i\alpha_j y_i y_j\, K(\mathbf{x}_i, \mathbf{x}_j)$$
>
> and prediction becomes $\text{sign}\bigl(\sum_{i \in SV}\alpha_i y_i K(\mathbf{x}_i, \mathbf{u}) + b\bigr)$.

> [!NOTE]
> **A kernel function is some function that corresponds to an inner product in some expanded feature space.**

> [!DERIVE]
> **A concrete demonstration.** Take $\mathbf{x} = (x_1, x_2)$, $\mathbf{z} = (z_1, z_2)$ and the polynomial kernel $K(\mathbf{x},\mathbf{z}) = (\mathbf{x}^T\mathbf{z})^2$. Expanding:
>
> $$(\mathbf{x}^T\mathbf{z})^2 = (x_1z_1 + x_2z_2)^2 = x_1^2z_1^2 + 2x_1x_2z_1z_2 + x_2^2z_2^2$$
>
> which is exactly the inner product $\phi(\mathbf{x})^T\phi(\mathbf{z})$ for
>
> $$\phi(\mathbf{x}) = \bigl(x_1^2,\; \sqrt{2}\,x_1x_2,\; x_2^2\bigr)$$
>
> **Count the work.** Via $\phi$: build two 3-D vectors, then take a 3-D dot product. Via $K$: one 2-D dot product, then **square it**. The kernel is cheaper — and the saving explodes as the degree grows, since $(\mathbf{x}^T\mathbf{z})^d$ in $n$ dimensions corresponds to a feature space of size $\binom{n+d-1}{d}$ while the kernel still costs one dot product and one power.

---

## The kernel functions

> [!NOTE]
> Types listed: **Polynomial, Gaussian RBF, Sigmoid, Linear, Hyperbolic Tangent, Graph, String, Tree.**

The three that matter for this unit:

### Linear kernel

$$K(\mathbf{x}_i, \mathbf{x}_j) = \mathbf{x}_i^T\mathbf{x}_j$$

No mapping at all — this is ordinary linear SVM. Use it when the data is already linearly separable or when features are very numerous (text).

### Polynomial kernel

$$K(\mathbf{x}_i, \mathbf{x}_j) = (\mathbf{x}_i^T\mathbf{x}_j + c)^d$$

$d$ is the **degree**; $c$ shifts the balance between higher- and lower-order terms. Higher $d$ means a more flexible boundary and more risk of overfitting.

### Gaussian / RBF kernel

$$K(\mathbf{x}_i, \mathbf{x}_j) = \exp\left(-\frac{\lVert\mathbf{x}_i - \mathbf{x}_j\rVert^2}{2\sigma^2}\right) \quad\text{or equivalently}\quad \exp\bigl(-\gamma\lVert\mathbf{x}_i - \mathbf{x}_j\rVert^2\bigr)$$

> [!NOTE]
> - **Sometimes polynomial kernels are not sophisticated enough to work.**
> - **That's when Gaussian kernels come to the rescue.**
>
> The figure shows a **polynomial kernel (degree = 3, C = 100) failing** to separate a ring-shaped dataset that RBF handles.

> [!INTUITION]
> RBF is best read as a **similarity score**: it equals 1 when $\mathbf{x}_i = \mathbf{x}_j$ and decays smoothly toward 0 as they separate. Its implicit feature space is **infinite-dimensional** (expand the exponential as a power series and every degree appears), which is why it can shape essentially any boundary — and why it could never be computed explicitly.
>
> $\gamma$ controls the reach of each support vector's influence. **Large $\gamma$** = narrow, spiky influence = wiggly boundary = **overfitting**. **Small $\gamma$** = broad influence = smooth boundary = **underfitting**.

---

## Which kernel to use?

> [!EXAM]
> - **The recommended approach is to try an RBF kernel first, because it usually works well.**
> - However, it is **good to try the other types of kernels if you have enough time**.
> - **A kernel is a measure of the similarity between two vectors, so that is where domain knowledge of the problem at hand may have the biggest impact.**

| Kernel | Try when |
|---|---|
| **Linear** | Data already linearly separable; very high-dimensional features (text); need speed and interpretability |
| **Polynomial** | Feature *interactions* are known to matter; moderate non-linearity |
| **RBF** | **Default** — non-linear boundary of unknown shape |

> [!TRAP]
> Do not read "RBF first" as "RBF always". The final bullet is the deeper point: **a kernel encodes what you believe similarity means for your data.** A string kernel for text, a graph kernel for molecules — these embed genuine domain knowledge that no general-purpose kernel can supply.
>
> Also note that a **valid** kernel must correspond to *some* inner product — formally it must satisfy **Mercer's condition** (its kernel matrix must be positive semi-definite). You cannot simply invent any similarity function and expect the optimisation to remain convex.

> [!INTUITION]
> There is a satisfying parallel with the first half of this unit. The **hidden layer** of a neural network and the **kernel** of an SVM solve the *same* problem — re-representing input in a space where a linear decision suffices.
>
> The difference is who does the choosing. A neural network **learns** its representation from data. An SVM has the representation **specified in advance** by your choice of kernel, then solves a convex problem exactly. Learned-but-hard versus chosen-but-easy — that trade-off is essentially why deep learning displaced kernel methods once data and compute became plentiful.

---

**Next:** what happens when no boundary separates the data at all — **soft margin SVM**.
