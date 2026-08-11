---
subject: ml
unit: 2
order: 15
slug: svm-dual-support-vectors
title: The SVM Dual Problem & Support Vectors
summary: Differentiating the Lagrangian to eliminate w and b, the dual optimization problem with its constraints, why only support vectors survive, and the two reasons the dual is solved instead of the primal.
minutes: 12
tags: [dual, lagrangian, support-vectors, alpha, inner-product, complementary-slackness, kernel-trick]
---

# The SVM Dual Problem & Support Vectors

## Differentiating the Lagrangian

$$L(\mathbf{w}, b, \boldsymbol\alpha) = \frac{1}{2}\mathbf{w}^T\mathbf{w} - \sum_{i=1}^{m}\alpha_i\bigl[y_i(\mathbf{w}^T\mathbf{x}_i + b) - 1\bigr]$$

> [!DERIVE]
> **The vector derivative $\partial(\tfrac12\mathbf{w}^T\mathbf{w})/\partial\mathbf{w}$**, which the slides work out element by element:
>
> $$\frac{\partial \tfrac12 \mathbf{w}^T\mathbf{w}}{\partial \mathbf{w}} = \left[\frac{\partial \tfrac12(w_1^2 + \dots + w_m^2)}{\partial w_1}, \; \dots, \; \frac{\partial \tfrac12(w_1^2 + \dots + w_m^2)}{\partial w_m}\right]$$
> $$= \left[2\cdot\tfrac12 w_1, \; 2\cdot\tfrac12 w_2, \; \dots, \; 2\cdot\tfrac12 w_m\right] = 2\cdot\tfrac12\cdot\mathbf{w} = \mathbf{w}$$
>
> *"Similarly in other cases, we always differentiate a scalar function over a vector $\mathbf{w}$ here, which results in a vector of derivatives over each element $w_j$, $1 \leq j \leq m$."*
>
> This is where the $\tfrac12$ earns its place — it cancels the 2 from the power rule, leaving exactly $\mathbf{w}$.

Applying **stationarity** to both variables:

$$\frac{\partial L}{\partial \mathbf{w}} = \mathbf{w} - \sum_i \alpha_i y_i \mathbf{x}_i = 0 \;\;\Longrightarrow\;\; \boxed{\;\mathbf{w} = \sum_{i=1}^{m}\alpha_i y_i \mathbf{x}_i\;}$$

$$\frac{\partial L}{\partial b} = -\sum_i \alpha_i y_i = 0 \;\;\Longrightarrow\;\; \boxed{\;\sum_{i=1}^{m}\alpha_i y_i = 0\;}$$

> [!INTUITION]
> The first result is remarkable and worth pausing on: **$\mathbf{w}$ is a weighted sum of the training points themselves.** The learned boundary is not some abstract vector — it is literally built out of the data, each point contributing in proportion to its $\alpha_i$ and pulled in the direction of its own label.
>
> Substituting this back into $L$ **eliminates $\mathbf{w}$ and $b$ entirely**, leaving a problem in the $\alpha$'s alone. That substitution is what produces the dual.

---

## The dual optimization problem

> [!NOTE]
> **SVM-DUAL OPTIMIZATION PROBLEM**
>
> $$\max_{\boldsymbol\alpha} \; W(\alpha) = \sum_{i=1}^{m}\alpha_i \; - \; \frac{1}{2}\sum_{i=1}^{m}\sum_{j=1}^{m}\alpha_i\alpha_j\, y_i y_j\, \mathbf{x}_i^T\mathbf{x}_j$$
>
> **Subject to constraints**, for all $i = 1$ to $m$ (where $m$ is the number of training instances):
>
> | | Constraint |
> |---|---|
> | $C_1$ | $\alpha_i \geq 0$ |
> | $C_2$ | $\displaystyle\sum_{i=1}^{m}\alpha_i y_i = 0$ |
> | $C_3$ | $\mathbf{w}^T\mathbf{x}^+ + b = +1 \;\Rightarrow\; \Bigl[\sum_i \alpha_i y_i \,\mathbf{x}_i\cdot\mathbf{x}\Bigr] + b = +1$ |
> | $C_4$ | $\mathbf{w}^T\mathbf{x}^- + b = -1 \;\Rightarrow\; \Bigl[\sum_i \alpha_i y_i \,\mathbf{x}_i\cdot\mathbf{x}\Bigr] + b = -1$ |

$C_1$ is **dual feasibility** from KKT; $C_2$ came from $\partial L/\partial b$; $C_3$ and $C_4$ are the gutter equations rewritten with $\mathbf{w}$ substituted — they are what you use to **recover $b$** once the $\alpha$'s are known.

> [!EXAM]
> **The single most important structural fact:** the dual depends on the data **only through the inner products $\mathbf{x}_i^T\mathbf{x}_j$**. The individual feature vectors never appear alone — only their pairwise dot products.
>
> That observation is the entire door through which the **kernel trick** walks in the next topic. If a question asks *"why is the dual formulation important?"*, this is the answer worth more than the speed argument.

---

## Support vectors

By **complementary slackness**, for every training point:

$$\alpha_i\bigl[y_i(\mathbf{w}^T\mathbf{x}_i + b) - 1\bigr] = 0$$

So for each point, **either** $\alpha_i = 0$, **or** $y_i(\mathbf{w}^T\mathbf{x}_i + b) = 1$ — meaning the point lies **exactly on a gutter**.

> [!NOTE]
> **Support vectors** are the training points with $\alpha_i > 0$. They lie precisely on the margin boundaries. **Only these determine $\mathbf{w}$ and $b$**; every other point has $\alpha_i = 0$ and contributes nothing to the sum $\mathbf{w} = \sum_i \alpha_i y_i \mathbf{x}_i$.

> [!INTUITION]
> The consequence is striking: **you could delete every non-support-vector from the training set and retrain, and get exactly the same classifier.** A dataset of a million points might be summarised by a few dozen support vectors.
>
> This gives SVM two practical properties. It is **memory-efficient at prediction time** — only support vectors need storing. And it is **robust to points far from the boundary** — moving a distant point does not shift the boundary at all, unlike logistic regression where every point contributes to the loss.
>
> The flip side is fragility of a different kind: since the solution rests entirely on the points **nearest** the boundary, a single mislabelled point sitting in the wrong place can dominate the result. That is the weakness soft margin exists to address.

> [!TRAP]
> **Support vectors are not "important points" chosen by a heuristic.** They fall out of the KKT conditions as a mathematical consequence — the optimisation *derives* which points matter. Nothing selects them in advance.

---

## Why solve the dual instead of the primal?

> [!EXAM]
> The two reasons, in the slides' own words:
>
> 1. **"There are some quadratic programming algorithms that can solve the dual faster than the primal, especially in high dimensions ($d \gg n$)."**
> 2. **"But, more importantly, the kernel trick!!!"**

> [!INTUITION]
> Take the dimension argument seriously, because it inverts what you might expect. The **primal** optimises over $\mathbf{w}$, which has **one variable per feature** — so a problem with 100,000 features has 100,000 unknowns. The **dual** optimises over $\boldsymbol\alpha$, which has **one variable per training example**.
>
> When features vastly outnumber examples ($d \gg n$) — text classification with bag-of-words is the classic case — the dual is a **far smaller problem**. And with kernels the feature space can be **infinite-dimensional**, at which point the primal is not merely slower but **impossible to write down**, while the dual stays finite at $m$ variables.

### Making a prediction

Once the $\alpha$'s are found, classify a new point $\mathbf{u}$ by

$$\text{sign}\left(\sum_{i \in SV} \alpha_i y_i (\mathbf{x}_i \cdot \mathbf{u}) + b\right)$$

> [!EXAM]
> Note the prediction rule **also depends only on inner products**, this time between the support vectors and the new point. So the kernel trick applies at **prediction** time as well as training time — you never need the explicit feature mapping anywhere.

---

**Next:** replacing that inner product to handle non-linear data — **kernels**.
