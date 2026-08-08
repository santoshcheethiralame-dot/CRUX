---
subject: arvr
unit: 1
order: 9
slug: geometric-adts-affine-sums
title: The Computer Science View — ADTs and Affine Sums
summary: Geometric objects as abstract data types, the legal operation table, and the affine sum — the one way to combine points legally.
minutes: 12
tags: [ADT, affine-sum, point-arithmetic, convex-combination, barycentric]
---

# The Computer Science View — ADTs and Affine Sums

## Geometric objects as abstract data types

> In programming, **scalars, points and vectors are treated as Abstract Data Types (ADTs)**, allowing a structured and flexible representation of geometric concepts. These objects can be declared programmatically and manipulated using mathematical operations to perform transformations. **By defining geometric objects as ADTs, code can maintain clarity and consistency when handling spatial calculations.**

```c
vector u, v;      /* geometric object declarations */
point  p, q;
scalar a, b;

q = p + a * v;    /* mathematical representation in code */
```

Three benefits the course names:

| Benefit | Meaning |
|---|---|
| **Geometric object declarations** | `vector u, v; point p, q; scalar a, b` — the *type* carries the geometric meaning |
| **Mathematical representation in code** | Equations like `q = p + a * v` enable transformations such as scaling and translation |
| **Abstraction benefits** | Using ADTs **simplifies geometric computations and improves code modularity** |

> [!INTUITION]
> The point of an ADT here is not convenience — it is **making illegal geometry unrepresentable**. If `point` and `vector` are genuinely distinct types, then `p + q` is a **compile error** rather than a silently wrong number. In a system where a plain `float[3]` is used for everything, the same bug renders a mesh subtly wrong and nobody finds out for a week.
>
> This is the homogeneous-coordinate $w$ tag again, expressed in the type system instead of in the fourth row.

## The rules of affine operations

> Geometric operations follow specific rules that define valid manipulations. **However, direct point–point addition is not allowed, as points represent absolute positions rather than directional quantities.**

| Operation | Legal? | Result |
|---|---|---|
| **Vector addition** — combines two vectors | ✅ | vector |
| **Scalar multiplication** — scales a vector, preserving direction | ✅ | vector |
| **Vector–point addition** — shifts a point by a vector to compute a new position | ✅ | point |
| **Point–point subtraction** — the displacement between two points | ✅ | vector |
| **Point–point addition** | ❌ | **not valid — points are positional entities, not directional ones** |

## The affine sum — the legal exception

There *is* one way to combine points meaningfully. The course writes it as:

$$P = \alpha_1 R + \alpha_2 Q$$

and the condition that makes it legal is

$$\boxed{\ \alpha_1 + \alpha_2 = 1\ }$$

> [!DERIVE]
> **Why does summing to 1 rescue it?** Rewrite the expression using only legal operations. Since $\alpha_1 = 1 - \alpha_2$:
> $$\alpha_1 R + \alpha_2 Q = (1-\alpha_2)R + \alpha_2 Q = R + \alpha_2(Q - R)$$
> Now read the right-hand side: $Q - R$ is **point − point = a vector**; $\alpha_2(Q-R)$ is **scalar × vector = a vector**; and $R + (\text{vector})$ is **point + vector = a point**. ✅
>
> Every step is legal. So the affine sum is not a new operation at all — it is **an abbreviation for "start at $R$ and travel a fraction $\alpha_2$ of the way toward $Q$"**. That is why the coefficients must sum to 1: it is what makes the disguise work.

**Special cases worth recognising instantly:**

| $\alpha_1, \alpha_2$ | Result |
|---|---|
| $1, 0$ | the point $R$ |
| $0, 1$ | the point $Q$ |
| $\tfrac12, \tfrac12$ | the **midpoint** of $RQ$ |
| both in $[0,1]$ | a point **on the segment** $RQ$ — a **convex combination** |
| one negative | a point on the **line** $RQ$ but **outside** the segment |

> [!EXAM]
> A standard numerical: *"Given $P = (0,1)$, $Q = (2,5)$ and $R = (0.5, 2)$ related by $R = \alpha_1 P + \alpha_2 Q$ with $\alpha_1 + \alpha_2 = 1$, find $\alpha_1$ and $\alpha_2$."*
>
> Solve componentwise using $\alpha_1 = 1 - \alpha_2$:
> - $x$: $0.5 = (1-\alpha_2)(0) + \alpha_2(2) = 2\alpha_2 \Rightarrow \alpha_2 = 0.25$
> - check with $y$: $(1-0.25)(1) + 0.25(5) = 0.75 + 1.25 = 2$ ✔
>
> **$\alpha_1 = 0.75$, $\alpha_2 = 0.25$.** Always verify with the second component — if it disagrees, $R$ is not on the line $PQ$ and the problem has no solution.

> [!NOTE]
> Generalised to three points this becomes **barycentric coordinates** $(\alpha_1, \alpha_2, \alpha_3)$ with $\sum\alpha_i = 1$ — the standard way of addressing a location inside a triangle. Every GPU uses it: **rasterisation interpolates colour, texture coordinates and depth across a triangle using exactly these weights**. The affine-sum condition you are proving here is the reason that interpolation is geometrically valid.

## Head-to-tail, one more time

The head-to-tail rule for vector addition and the affine sum are the same picture read two ways:

```
         Q                       Q
        ↗                       •
   Q−R ↗                       ╱  α2 = 0.25 of the way
      ↗                       •  ← P = 0.75R + 0.25Q
     R                       ╱
     •                      R

  vector view:            affine view:
  R + (Q−R) = Q           P = R + α2(Q−R)
```

---

**Next:** a geometric property built directly on affine sums — convexity, and the convex hull.
