---
subject: arvr
unit: 1
order: 3
slug: vector-affine-euclidean-spaces
title: Vector, Affine and Euclidean Spaces
summary: The three-space hierarchy — what each one adds, the properties of a linear space, and why affine spaces are the right home for graphics.
minutes: 13
tags: [vector-space, affine-space, euclidean-space, closure, associativity, commutativity]
---

# Vector, Affine and Euclidean Spaces

Three spaces, each strictly richer than the last. **Know what each one *adds*** — that is the whole examinable content.

```
   VECTOR SPACE          scalars + vectors
        │                 can scale and add directions
        │  + points
        ▼
   AFFINE SPACE          adds POINTS (position)
        │                 can now talk about "where", not just "which way"
        │  + a distance measure
        ▼
   EUCLIDEAN SPACE       adds DISTANCE and SIZE
                          can now measure lengths and angles
```

---

## 1. Vector spaces

> **A vector space contains both scalars and vectors**, providing a mathematical framework for performing operations while satisfying specific properties.

**The two operations:**

- **Scalar–vector multiplication** — scaling a vector by a scalar value.
- **Vector–vector addition** — combining two vectors to produce a resultant vector.

**Properties of linear spaces** (learn these three by name):

| Property | Statement |
|---|---|
| **Closure** | The sum of two vectors, **or** the product of a scalar and a vector, **remains within the space**. |
| **Associativity** | The **grouping** of vector addition does not affect the result: $(\mathbf u + \mathbf v) + \mathbf w = \mathbf u + (\mathbf v + \mathbf w)$. |
| **Commutativity** | The **order** of vector addition does not change the outcome: $\mathbf u + \mathbf v = \mathbf v + \mathbf u$. |

> [!TRAP]
> Do not mix up the last two. **Associativity is about brackets; commutativity is about order.** A very common exam slip. (Matrix multiplication, which you meet shortly, is **associative but not commutative** — which is exactly why the *order* of transformations matters while the *bracketing* does not.)

**What a vector space cannot do:** it has no notion of **location**. Every vector is anchored at nothing in particular. You can say "3 metres north-east" but you cannot say "here".

---

## 2. Affine spaces

> **An affine space extends vector spaces by including points**, allowing a more flexible representation of geometric structures.

**The two new operations:**

- **Vector–point addition** — produces a **new point** by shifting an existing point in the direction of a vector.
- **Point–point subtraction** — produces a **vector** representing the **displacement** between two points.

**Key characteristic:**

> **Abstract definitions:** affine spaces are defined **independently of any specific coordinate system or representation**.

> [!INTUITION]
> An affine space is a vector space that has finally admitted **"where"** exists — but has deliberately refused to nominate a special place called the origin. That refusal is a feature. Geometry that does not depend on where you put the origin is geometry that stays true when the camera moves, which is precisely the property an AR system needs.

> [!NOTE]
> **Why graphics lives in affine space.** Rendering needs points (vertex positions), vectors (normals, directions) and the operations between them — but it must *not* depend on a privileged origin, because every object, the world and the camera each carry their own. Affine space is the smallest structure that supports all of that. Euclidean space is used on top when you actually need to measure.

---

## 3. Euclidean spaces

> **A Euclidean space extends vector spaces by incorporating distance and size measurements**, making it fundamental for defining geometric concepts. It provides a framework for **measuring lengths, angles, and distances between points**.

- **Line segment length** — determines the distance between two points using Euclidean distance formulas.

$$d(P,Q) = \lVert Q - P\rVert = \sqrt{(x_Q-x_P)^2 + (y_Q-y_P)^2 + (z_Q-z_P)^2}$$

Note how this is built from the affine operation: $Q - P$ is **point minus point**, which gives a **vector**, and the Euclidean structure is what lets you take that vector's **length**.

> [!INTUITION]
> The three spaces answer three escalating questions:
> - **Vector space:** *which way, and how much?*
> - **Affine space:** *…and where?*
> - **Euclidean space:** *…and how far apart, at what angle?*

---

## The comparison table

| | **Vector space** | **Affine space** | **Euclidean space** |
|---|---|---|---|
| Contains | scalars, vectors | scalars, vectors, **points** | scalars, vectors, points |
| Key operations | scalar×vector, vector+vector | **+ vector+point, point−point** | **+ distance, angle** |
| Has an origin? | yes (the zero vector) | **not privileged** | depends on the chosen frame |
| Can express *position*? | ❌ | ✅ | ✅ |
| Can measure *length*? | ❌ | ❌ | ✅ |
| Used in graphics for | directions, normals, offsets | object/world/camera geometry | lighting, distance culling, collision |

> [!EXAM]
> *"Differentiate vector, affine and Euclidean spaces"* is a reliable 5-marker. Answer with the hierarchy diagram, then one line per space naming **what it adds**, then the three linear-space properties by name. Finish with the one-line reason graphics uses affine space: **it supports points without privileging an origin**.

---

**Next:** how we actually pin numbers onto these abstract objects — coordinate systems and frames.
