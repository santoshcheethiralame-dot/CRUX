---
subject: ml
unit: 2
order: 14
slug: lagrange-kkt
title: Lagrange Multipliers & KKT Conditions
summary: Why the gradients of objective and constraint must be parallel at a constrained optimum, the Lagrange equation and how to solve it, and the three extra KKT conditions that inequality constraints require.
minutes: 11
tags: [lagrange-multipliers, KKT, constrained-optimization, complementary-slackness, dual-feasibility, stationarity]
---

# Lagrange Multipliers & KKT Conditions

## The idea

We want to optimise $f(X)$ **subject to** a constraint $g(X) = 0$. The unconstrained answer ($\nabla f = 0$) is generally not allowed, because it may sit off the constraint surface.

> [!INTUITION]
> Walk along the constraint surface and watch $f$ change. You can keep improving **as long as $f$ has any component of its gradient pointing along your path**. You must stop exactly when $\nabla f$ has **no component along the surface** — that is, when $\nabla f$ is **perpendicular to the surface**.
>
> But $\nabla g$ is *also* perpendicular to the surface, by definition of a gradient. Two vectors perpendicular to the same surface must be **parallel**:
>
> $$\nabla f = \lambda \nabla g$$
>
> That is the whole of Lagrange multipliers. Everything else is bookkeeping.

---

## The Lagrange equation

$$L(X, \lambda) = f(X) - \lambda\, g(X)$$

Set **all** partial derivatives to zero — with respect to each component of $X$ **and** with respect to $\lambda$ — and solve the resulting system.

> [!EXAM]
> The slides state the count explicitly: for a problem in $D$ variables you get **$D + 1$ equations** ($D$ from $\partial L/\partial x_j = 0$, one from $\partial L/\partial\lambda = 0$) which must be solved simultaneously.
>
> Note that $\partial L/\partial\lambda = 0$ simply **regenerates the constraint** $g(X) = 0$ — which is how the method guarantees the solution actually lies on the surface.

> [!DERIVE]
> **Worked example.** Maximise $f(x,y) = xy$ subject to $x + y = 10$, i.e. $g = x + y - 10 = 0$.
>
> $$L = xy - \lambda(x + y - 10)$$
>
> $$\frac{\partial L}{\partial x} = y - \lambda = 0 \;\Rightarrow\; y = \lambda$$
> $$\frac{\partial L}{\partial y} = x - \lambda = 0 \;\Rightarrow\; x = \lambda$$
> $$\frac{\partial L}{\partial \lambda} = -(x + y - 10) = 0 \;\Rightarrow\; x + y = 10$$
>
> From the first two, $x = y$; substituting into the third gives $2x = 10$, so
> $$x = y = 5, \quad \lambda = 5, \quad f_{\max} = 25$$

---

## Inequality constraints — the KKT conditions

SVM's constraints are **inequalities** ($y_i(\mathbf{w}^T\mathbf{x}_i + b) - 1 \geq 0$), not equalities, which changes the picture: the optimum may lie **on** the boundary or **strictly inside** the feasible region.

> [!NOTE]
> We must solve the Lagrangian as before — **partial derivatives of $L$ w.r.t. $X$ as well as $\lambda$ must be set to 0 and the resulting $D+1$ equations solved** — **but with some additional constraints**:
>
> $$g(X) \geq 0$$
> $$\lambda \geq 0$$
> $$\lambda\, g(X) = 0$$
>
> These are the **Karush–Kuhn–Tucker (KKT) conditions**. *Multiple constraints are handled as discussed already, but with KKT conditions added.*

### What each condition means

> [!EXAM]
> The slides' own gloss, which is the answer to *"explain the KKT conditions"*:
>
> **$\lambda \geq 0$ — [DUAL FEASIBILITY]**
> *For points on the constraint surface, $\lambda > 0$; whereas for points above the surface, the constraint is inactive and $\lambda = 0$.*
>
> **$\lambda\,g(X) = 0$ — [COMPLEMENTARY SLACKNESS]**
> *For points on the constraint surface, $\lambda g(X) = 0$ because $g(X)$ is 0. For points above the constraint surface, $\lambda g(X) = 0$ because $\lambda = 0$ (the constraint is inactive).*

The four conditions as formally itemised:

| Condition | Statement |
|---|---|
| **Stationarity** | $\nabla_X L = 0$ — the gradient of the Lagrangian vanishes |
| **Primal feasibility** | $g(X) \geq 0$ — the original constraint holds |
| **Dual feasibility** | $\lambda \geq 0$ — multipliers are non-negative |
| **Complementary slackness** | $\lambda\, g(X) = 0$ — for each constraint, either $\lambda = 0$ **or** $g(X) = 0$ |

> [!INTUITION]
> **Complementary slackness is the condition that matters most**, because it forces an either/or on every constraint:
>
> - the point sits **on** the boundary ($g = 0$), and the constraint may push, so $\lambda$ can be positive; **or**
> - the point sits **strictly inside** ($g > 0$), the constraint is doing nothing, and $\lambda$ **must be zero**.
>
> **Never both positive.** In SVM this single rule is what creates support vectors: only points sitting *exactly* on the margin can have $\alpha_i > 0$; every other training point gets $\alpha_i = 0$ and **drops out of the solution entirely**.

> [!TRAP]
> **Why must $\lambda \geq 0$ for inequalities**, when $\lambda$ is unrestricted in sign for equality constraints? Because an inequality constraint can only push the solution **one way** — it blocks movement out of the feasible region but never pulls inward. A negative multiplier would represent a force in the impossible direction. This asymmetry is exactly why inequality-constrained problems need the extra conditions.

---

## Why this matters for SVM

The SVM primal is $\min \tfrac12\lVert\mathbf{w}\rVert^2$ subject to $m$ inequality constraints, one per training point. Building the Lagrangian with one multiplier $\alpha_i \geq 0$ per constraint:

$$L(\mathbf{w}, b, \boldsymbol\alpha) = \frac{1}{2}\lVert\mathbf{w}\rVert^2 - \sum_{i=1}^{m}\alpha_i\bigl[y_i(\mathbf{w}^T\mathbf{x}_i + b) - 1\bigr]$$

> [!EXAM]
> Two things to carry into the next topic:
> 1. **Stationarity** on this $L$ will produce $\mathbf{w} = \sum_i \alpha_i y_i \mathbf{x}_i$ and $\sum_i \alpha_i y_i = 0$ — the equations that define the dual.
> 2. **Complementary slackness** $\alpha_i[y_i(\mathbf{w}^T\mathbf{x}_i + b) - 1] = 0$ will identify the **support vectors** as precisely those points with $\alpha_i > 0$.

---

**Next:** solving that Lagrangian to get the dual — **the SVM dual problem & support vectors**.
