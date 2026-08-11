---
subject: ml
unit: 2
order: 17
slug: soft-margin
title: Soft Margin SVM
summary: Why hard margin is sensitive to outliers, slack variables and the three ranges that classify each point, the relaxed constraint and penalised objective, and how the parameter C trades margin width against violations.
minutes: 10
tags: [soft-margin, slack-variables, xi, C-parameter, outliers, hinge-loss, regularization]
---

# Soft Margin SVM

## Why hard margin fails

> [!NOTE]
> **Hard margin SVM is sensitive to outliers and noise.**

Two distinct failures:

1. A single **mislabelled or noisy point** near the opposite class drags the boundary drastically, because the margin must accommodate it exactly.
2. If the data is **not linearly separable at all**, the constraints $y_i(\mathbf{w}^T\mathbf{x}_i + b) \geq 1$ are **mutually unsatisfiable** — there is **no solution whatsoever**.

> [!INTUITION]
> The second failure is the fatal one. Hard-margin SVM does not degrade gracefully on messy data; it simply has **no feasible point** and returns nothing. Since real data is essentially never perfectly separable, the soft margin is not an optional refinement — **it is what makes SVM usable at all**.
>
> There is also a bitter irony in the first failure. SVM's strength is that only the nearest points matter — but that makes it maximally sensitive to precisely the points **most likely to be mislabelled**, since a mislabelled point tends to sit deep in the wrong class's territory, right where it does most damage.

---

## Slack variables

> [!NOTE]
> - Instead of requiring all points to be classified correctly, SVM allows **some violations of the margin**.
> - These violations are controlled by **slack variables $\xi_i$, one for each data point.**

> [!EXAM]
> | Value | Meaning |
> |---|---|
> | $\xi_i = 0$ | Point is **correctly classified and outside the margin** |
> | $0 < \xi_i \leq 1$ | Point is **inside the margin but on the correct side** |
> | $\xi_i > 1$ | Point is **misclassified** |
>
> Note the boundary case: $\xi_i = 1$ places the point **exactly on the decision boundary**. Anything beyond that has crossed to the wrong side.

---

## The relaxed constraint

> [!NOTE]
> **Soft SVM relaxes the linear separability constraint by introducing slack variables in the constraint equations:**
>
> $$y_i(\vec{w}\cdot\vec{x}_i + b) \geq 1 - \xi_i$$
>
> - The left-hand side can be thought of as the **confidence of classification**.
> - **Confidence score $\geq 1$** suggests the classifier has **classified the point correctly**.
> - **Confidence score $< 1$** means the classifier **did not classify the point correctly**, incurring a **linear penalty of $\xi_i$**.

> [!TRAP]
> $\xi_i$ is not a free pass — it is a **budget item**. Each unit of slack is paid for in the objective function below. Without that penalty the optimiser would simply set every $\xi_i$ enormous, satisfy all constraints trivially, and learn nothing.

---

## The objective

$$\boxed{\;\min_{\mathbf{w}, b, \boldsymbol\xi} \;\; \frac{1}{2}\lVert\mathbf{w}\rVert^2 \;+\; C\sum_{i=1}^{m}\xi_i \qquad\text{s.t.}\quad y_i(\mathbf{w}^T\mathbf{x}_i + b) \geq 1 - \xi_i, \quad \xi_i \geq 0\;}$$

Two competing terms:

| Term | Wants |
|---|---|
| $\tfrac12\lVert\mathbf{w}\rVert^2$ | A **wide margin** (recall width $= 2/\lVert\mathbf{w}\rVert$) |
| $C\sum_i \xi_i$ | **Few and small violations** |

**$C$ is the regularization / penalty parameter** — the dial that sets the exchange rate between them.

> [!EXAM]
> | $C$ | Penalty on violations | Margin | Risk |
> |---|---|---|---|
> | **Large $C$** | **Heavy** — tries hard to classify everything correctly | **Narrow** | **Overfitting**; approaches hard margin as $C \to \infty$ |
> | **Small $C$** | **Cheap** — violations tolerated | **Wide** | **Underfitting**; more errors accepted |
>
> The one-line statement: **$C$ trades margin width against training errors.**

> [!INTUITION]
> Note which direction is which, because it is easy to invert. **Large $C$ = strict** (violations expensive), **small $C$ = lenient** (violations cheap). The mnemonic: **C for Cost** — a high cost of being wrong forces the model to contort itself to fit every point.
>
> And note that $C$ plays exactly the role a regularization parameter plays elsewhere in machine learning, just inverted: large $C$ = *weak* regularization, small $C$ = *strong* regularization.

---

## Effect on the dual

The dual is almost unchanged — the objective is identical, and the only difference is that $\alpha_i$ acquires an **upper bound**:

$$\max_{\boldsymbol\alpha} \sum_i \alpha_i - \frac12\sum_i\sum_j \alpha_i\alpha_j y_iy_j K(\mathbf{x}_i,\mathbf{x}_j) \qquad\text{s.t.}\quad \boxed{0 \leq \alpha_i \leq C}, \;\; \sum_i \alpha_i y_i = 0$$

> [!EXAM]
> This is called the **box constraint**. Its interpretation via complementary slackness classifies every training point:
>
> | $\alpha_i$ | Where the point lies |
> |---|---|
> | $\alpha_i = 0$ | **Outside** the margin, correctly classified — not a support vector |
> | $0 < \alpha_i < C$ | **Exactly on** the margin — a **free / unbounded** support vector |
> | $\alpha_i = C$ | **Inside** the margin or **misclassified** ($\xi_i > 0$) — a **bounded** support vector |

> [!INTUITION]
> The cap has an elegant reading: **no single point is allowed to matter more than $C$.** In hard margin an outlier could take an arbitrarily large $\alpha_i$ and dominate $\mathbf{w} = \sum_i \alpha_i y_i \mathbf{x}_i$ entirely. The box constraint **limits how much damage any one point can do** — which is precisely the robustness the soft margin was introduced to buy.

> [!TRAP]
> Slack variables solve a different problem from kernels, and questions sometimes conflate them:
> - **Kernels** handle data that is separable but **not linearly** so — a curved boundary exists.
> - **Soft margin** handles data where **no clean boundary exists at all** — overlapping classes, label noise.
>
> They are **routinely used together**: an RBF kernel with a tuned $C$ is the standard configuration, and $(C, \gamma)$ are the two hyperparameters normally grid-searched.

---

**Next:** combining many weak models instead of perfecting one — **ensemble learning**.
