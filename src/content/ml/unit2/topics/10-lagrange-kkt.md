---
subject: ml
unit: 2
order: 10
slug: lagrange-kkt
title: Lagrange Multipliers & KKT Conditions
summary: Constrained optimization via Lagrange multipliers, a worked example, and the KKT conditions for inequalities.
minutes: 13
tags: [lagrange, KKT, constrained-optimization, complementary-slackness]
---

# Lagrange Multipliers & KKT Conditions

SVM's primal is a *constrained* optimization. Lagrange multipliers are the tool to solve it.

## The idea (equality constraint)

**Maximise** $f(\mathbf{X})$ subject to $g(\mathbf{X}) = 0$. Geometric insight:

- $\nabla g$ is always **orthogonal** to the constraint surface (moving along the surface can't change $g$, which stays 0).
- At the optimum $\mathbf{X}^*$, $\nabla f$ must **also** be orthogonal to the surface — otherwise you could slide along it and increase $f$.
- So $\nabla f$ and $\nabla g$ are **parallel**:

$$\nabla f(\mathbf{X}^*) = \lambda\,\nabla g(\mathbf{X}^*)$$

$\lambda$ is the **Lagrange multiplier**. Build the **Lagrangian** and set all partials to zero:

$$L(\mathbf{X}, \lambda) = f(\mathbf{X}) - \lambda g(\mathbf{X})$$

This gives $d{+}1$ equations in $d{+}1$ unknowns. *(Some texts write $+\lambda g$; equivalent.)*

## Worked example

Maximise $f = 1 - x_1^2 - x_2^2$ subject to $g = x_1 + x_2 - 1 = 0$:

$$L = 1 - x_1^2 - x_2^2 - \lambda(x_1 + x_2 - 1)$$

$$\frac{\partial L}{\partial x_1} = -2x_1 - \lambda = 0, \quad \frac{\partial L}{\partial x_2} = -2x_2 - \lambda = 0, \quad \frac{\partial L}{\partial \lambda} = -(x_1 + x_2 - 1) = 0$$

Solving: $x_1 = x_2 = \tfrac12,\ \lambda = -1$, giving $f^* = \tfrac12$. *(Unconstrained, the max would be 1 at the origin — the constraint pulls it down.)*

**Multiple constraints** → one multiplier each: $L = f - \lambda_1 g_1 - \dots - \lambda_k g_k$.

## Inequality constraints — two cases

For $g(\mathbf{X}) \ge 0$:

- **Constraint inactive** ($\mathbf{X}^*$ strictly inside $g>0$): the constraint doesn't bind → just solve $\nabla f = 0$, equivalent to $\lambda = 0$.
- **Constraint active** ($\mathbf{X}^*$ on $g=0$): like the equality case with $\lambda \ne 0$. Here $\nabla f$ points **opposite** to the feasible region, so $\nabla f = -\lambda\nabla g$ with $\lambda > 0$.

## KKT conditions

The **Karush–Kuhn–Tucker** conditions generalise Lagrange to inequalities — solve the Lagrangian *with* these:

| KKT condition | Name | Meaning |
|---|---|---|
| $g(\mathbf{X}) \ge 0$ | **Primal feasibility** | the constraint holds |
| $\lambda \ge 0$ | **Dual feasibility** | multiplier non-negative |
| $\lambda\,g(\mathbf{X}) = 0$ | **Complementary slackness** | either $\lambda=0$ *or* $g=0$ |
| $\nabla L = 0$ | **Stationarity** | optimum is a stationary point |

> [!INTUITION]
> **Complementary slackness** is the key for SVM: for each point, *either* it sits exactly on the margin ($g=0$, active) *or* its multiplier is zero ($\lambda=0$, irrelevant). Only the on-margin points "count" — they become the **support vectors** (next topic).

> [!EXAM]
> Be able to (1) set up and solve a small Lagrangian, and (2) list the **four KKT conditions** with names. Complementary slackness ($\lambda g = 0$) is the most-tested — it's *why* most training points have $\alpha_i = 0$ in SVM.

---

**Next:** applying this to SVM — the **dual problem & support vectors**.
