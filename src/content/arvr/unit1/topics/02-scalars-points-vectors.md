---
subject: arvr
unit: 1
order: 2
slug: scalars-points-vectors
title: Scalars, Points and Vectors
summary: The three primitive geometric types, the four vector operations, and why a point is not a vector.
minutes: 12
tags: [scalars, points, vectors, dot-product, cross-product, primitives]
---

# Scalars, Points and Vectors

## The setting

Geometric objects exist in three-dimensional space: **lines, polygons and polyhedra**. Beyond this there is also the possibility of objects existing in **higher dimensions**, where geometric properties extend beyond the familiar three-dimensional framework into more abstract mathematical territory.

To build any of them you need exactly three primitive types.

## Scalars

> **Scalars represent real and complex numbers.**

A scalar has **magnitude only** — no direction, no position. Scalars are what you multiply vectors by, what a dot product returns, and what a length is.

## Points

> **Points are defined by their location in three-dimensional space.** They serve as the basic building blocks of geometry, but **points alone are insufficient** to specify complete geometric constructs — additional components are needed to define shapes and structures.

A point has **position only**. It has no magnitude and no direction. This sounds like a technicality; it is the single most important idea in the unit, and the next topic is built on it.

## Vectors

> **Vectors represent both direction and magnitude**, making them essential for defining movement and orientation in space.

A vector has **magnitude and direction but no position** — the arrow from $(0,0)$ to $(1,1)$ and the arrow from $(5,5)$ to $(6,6)$ are *the same vector*.

### The four operations

| Operation | What it does | Result type |
|---|---|---|
| **Addition (head-to-tail rule)** | Combines vectors by placing the tail of one at the head of another | **vector** |
| **Scaling** | Adjusts the magnitude of a vector while **maintaining its direction** | **vector** |
| **Dot product (inner product)** | A **scalar** result that measures the **similarity** between two vectors | **scalar** |
| **Cross product (outer product)** | Produces a new vector **perpendicular to the original two**; used in 3D calculations | **vector** |

$$\mathbf{u}\cdot\mathbf{v} = \lVert\mathbf u\rVert\,\lVert\mathbf v\rVert\cos\theta \qquad\qquad \lVert\mathbf{u}\times\mathbf{v}\rVert = \lVert\mathbf u\rVert\,\lVert\mathbf v\rVert\sin\theta$$

> [!INTUITION]
> **The dot product answers "how aligned are these?"** — maximal when parallel, **zero when perpendicular**, negative when opposed. **The cross product answers "what is perpendicular to both?"** — zero when parallel, maximal when perpendicular.
>
> In graphics you use them constantly and for exactly these reasons: the dot product gives you **diffuse lighting** ($\mathbf n\cdot\mathbf l$ — how much a surface faces the light) and **backface culling**; the cross product gives you **surface normals** from two edges of a triangle, and the **axis of rotation** that carries one vector onto another.

> [!TRAP]
> Scaling by a **negative** number reverses the direction. The statement "scaling maintains direction" is the course's phrasing and holds for positive scalars; a negative factor is a **reflection**, which you will meet again under non-rigid-body transformations.

## The rule that everything hinges on

Points and vectors are **different types**, and the legal operations between them are restricted:

| Expression | Legal? | Result |
|---|---|---|
| vector $+$ vector | ✅ | **vector** |
| scalar $\times$ vector | ✅ | **vector** |
| **point $-$ point** | ✅ | **vector** (the displacement between them) |
| **point $+$ vector** | ✅ | **point** (the point, shifted) |
| **point $+$ point** | ❌ | **undefined** |

> [!INTUITION]
> Think about *places* and *journeys*. Two journeys combine into a journey. A place plus a journey lands you at another place. One place minus another is the journey between them. But **"Bengaluru plus Mysuru" is meaningless** — you cannot add two locations. There is no origin to add them relative to, and if you invented one, the answer would change when you moved it.
>
> That is the real test: **an operation is only geometrically meaningful if its answer does not change when you move the origin.** Point $+$ point fails that test; every other row passes.

> [!EXAM]
> A stock MCQ gives two points, e.g. $(4,2)$ and $(6,7)$, and asks for **"the sum of the two points"**. The tempting answer is $(10,9)$. The correct answer is **that the operation is not defined** — points cannot be added. You will meet the one legal exception (the **affine sum**, where the coefficients sum to 1) in a later topic.

## In code

Geometric objects are declared as **abstract data types**, so the type system enforces the table above:

```c
vector u, v;      /* direction + magnitude, no position */
point  p, q;      /* position only                      */
scalar a, b;      /* magnitude only                     */

q = p + a * v;    /* point + (scalar × vector) = point  ✅ */
v = q - p;        /* point - point = vector             ✅ */
/* q = p + q;        point + point                      ❌ */
```

---

**Next:** the three spaces these primitives live in — vector, affine and Euclidean.
