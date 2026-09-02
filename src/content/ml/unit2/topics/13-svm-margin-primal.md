---
subject: ml
unit: 2
order: 13
slug: svm-margin-primal
title: SVM — Hyperplanes, Margin & the Primal Problem
summary: The three hyperplanes and their decision rules, the single compact constraint that combines them, the derivation of the margin width 2/||w||, and the primal optimization problem it leads to.
minutes: 12
tags: [svm, hyperplane, margin, decision-rule, width, primal, convex-quadratic]
---

# SVM — Hyperplanes, Margin & the Primal Problem

## Picking an optimal hyperplane

For linearly separable data there are **infinitely many** separating lines. SVM picks a specific one: the hyperplane that **maximises the margin** — the distance to the nearest point of either class.

> [!INTUITION]
> The justification, as the slides put it: **the larger the margin, the lower the generalization error of the classifier**. A boundary squeezed against the training points is fragile — a slightly different sample would move it. A boundary sitting in the widest available corridor has the most room to be wrong about where the true boundary lies and still classify correctly.
>
> This is a genuinely different design principle from everything earlier in the unit. The perceptron stops at the **first** boundary that separates the data; SVM asks which separating boundary is **best**, and answers geometrically.

---

## The three hyperplanes and their decision rules

The separating (median) hyperplane sits between two parallel **gutters** touching the nearest points of each class:

| | Condition |
|---|---|
| **Negative points** | $\mathbf{w}^T\mathbf{x}^- + b \leq -1$ |
| **Positive points** | $\mathbf{w}^T\mathbf{x}^+ + b \geq +1$ |
| **Median line** | $\mathbf{w}^T\mathbf{x} + b \geq 0$ (positive), $\mathbf{w}^T\mathbf{x} + b < 0$ (negative) |

### Combining into a single rule

> [!EXAM]
> **Define** $$y_i = \begin{cases} +1 & \text{for positive samples} \\ -1 & \text{for negative samples} \end{cases}$$
>
> Then **both** cases collapse into one condition:
>
> $$y_i(\mathbf{w}^T\mathbf{x}_i + b) \geq 1 \qquad\Longrightarrow\qquad \boxed{\,y_i(\mathbf{w}^T\mathbf{x}_i + b) - 1 \geq 0\,}$$

> [!DERIVE]
> **Check both cases.**
> - Positive point: $y_i = +1$, so the rule reads $\mathbf{w}^T\mathbf{x}_i + b \geq 1$ ✓
> - Negative point: $y_i = -1$, so it reads $-(\mathbf{w}^T\mathbf{x}_i + b) \geq 1$, i.e. $\mathbf{w}^T\mathbf{x}_i + b \leq -1$ ✓
>
> The label multiplication **flips the inequality for negatives**, which is exactly what merges two constraints into one.

> [!TRAP]
> Labels are $\{-1, +1\}$ here, **not** $\{0, 1\}$ as in the perceptron. The whole trick depends on the negative label being $-1$ so that multiplication reverses the sign; with 0 the constraint would collapse to $0 \geq 1$ and be unsatisfiable.
>
> Also note the choice of $\pm 1$ on the right-hand side is a **normalisation, not an assumption** — we are free to scale $\mathbf{w}$ and $b$ so that the nearest points sit exactly on $\pm 1$.

---

## Calculating the width of the canal

```
    class −1                    ┊         │         ┊              class +1
                                ┊         │         ┊
        o           o           ⊙         │         ⊗          x
                                ┊         │         ┊
            o                   ┊         │         ⊗      x        x
                                ┊         │         ┊
        o         o             ⊙         │         ┊          x
                                ┊         │         ┊
                       w·x+b = −1    w·x+b = 0   w·x+b = +1
                                ┊         │         ┊
                                ┊←───── margin ────→┊
                                ┊    =  2/‖w‖       ┊

   ⊙ ⊗  = the SUPPORT VECTORS — the only points touching the gutters.
          Move any other point and nothing changes; move one of these
          and the whole boundary moves.
```

> [!DERIVE]
> The margin is the distance between the two gutters, measured along the **unit normal** $\hat{\mathbf{w}} = \mathbf{w}/\lVert\mathbf{w}\rVert$:
>
> $$\text{Width} = \hat{\mathbf{w}}\cdot\mathbf{x}^+ - \hat{\mathbf{w}}\cdot\mathbf{x}^-$$
>
> From the gutter equations, taking points that lie **on** them:
> $$\mathbf{w}^T\mathbf{x}^+ + b = 1 \;\Rightarrow\; \mathbf{w}^T\mathbf{x}^+ = 1 - b$$
> $$\mathbf{w}^T\mathbf{x}^- + b = -1 \;\Rightarrow\; \mathbf{w}^T\mathbf{x}^- = -1 - b$$
>
> **Divide both sides by $\lVert\mathbf{w}\rVert$:**
> $$\hat{\mathbf{w}}\cdot\mathbf{x}^+ = \frac{1-b}{\lVert\mathbf{w}\rVert} \qquad\qquad \hat{\mathbf{w}}\cdot\mathbf{x}^- = \frac{-1-b}{\lVert\mathbf{w}\rVert}$$
>
> Subtract:
> $$\text{Width} = \frac{1-b}{\lVert\mathbf{w}\rVert} - \left(\frac{-1-b}{\lVert\mathbf{w}\rVert}\right) = \frac{1 - b + 1 + b}{\lVert\mathbf{w}\rVert}$$
>
> $$\boxed{\;\text{Width} = \frac{2}{\lVert\mathbf{w}\rVert}\;}$$

> [!EXAM]
> This derivation is a standard full-mark question. The three moves that matter: **project onto the unit normal $\hat{\mathbf{w}}$**, **substitute the two gutter equations**, and **watch $b$ cancel**. That cancellation is the punchline — the width depends **only on $\lVert\mathbf{w}\rVert$**, not on where the boundary sits.

> [!INTUITION]
> Why does $\lVert\mathbf{w}\rVert$ control the width? Because we **fixed** the gutters at $\pm 1$. With that value pinned, the only way to push the gutters further apart in space is to make $\mathbf{w}$ **shorter** — a gentler gradient has to travel further to climb from $-1$ to $+1$. **Maximising the margin and shrinking the weight vector are literally the same operation.**

---

## The primal problem

> [!NOTE]
> $$\text{Maximize } f(\mathbf{w}, b) = \frac{2}{\lVert\mathbf{w}\rVert}$$
> $$\text{subject to } \quad y_i(\mathbf{w}^T\mathbf{x}_i + b) - 1 \geq 0, \quad i = 1 \dots m$$
> where $m$ is the number of training instances.

### Reformulating

The chain of equivalences stated on the slide:

- **Maximize** $2/\lVert W\rVert$
- **is the same as minimize** $\lVert W\rVert / 2$
- **same as Minimize** $\tfrac{1}{2}\lVert W\rVert^2$

$$\boxed{\;\min \tfrac{1}{2}\lVert W\rVert^2 \quad \text{subject to} \quad y_i(\mathbf{w}^T\mathbf{x}_i + b) \geq 1, \; i = 1 \dots m\;}$$

> [!EXAM]
> **Why square the norm?** $\lVert\mathbf{w}\rVert = \sqrt{\sum w_j^2}$ contains a square root, which is **not differentiable at the origin** and awkward to optimise. Squaring removes it, and the $\tfrac12$ makes the derivative come out as exactly $\mathbf{w}$ with no stray constant. Crucially, squaring is a **monotonic** transform on non-negative values, so **the minimiser is unchanged**.

> [!NOTE]
> **Convex** (linear constraints) **Quadratic** (objective function) **Optimization: a standard problem!** It can be solved by the **Lagrangian multiplier method**.

> [!INTUITION]
> "Convex quadratic" is not a throwaway label — it is a **guarantee**. A convex problem has **no local minima distinct from the global one**, so unlike neural-network training there is no initialisation to worry about, no learning rate to tune, and no risk of landing in a bad optimum. Solve it once and you have **the** answer.
>
> That reliability is the classical case for SVMs, and the reason they dominated before deep learning: the optimisation is a *solved* problem rather than an art.

---

**Next:** the machinery for optimising under constraints — **Lagrange multipliers & KKT conditions**.
