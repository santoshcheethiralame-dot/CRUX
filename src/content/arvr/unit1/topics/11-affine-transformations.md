---
subject: arvr
unit: 1
order: 11
slug: affine-transformations
title: Transformations in Affine Space
summary: What a transformation is, degrees of freedom, transforming a line, and the rigid vs non-rigid split with scaling and reflection.
minutes: 14
tags: [transformations, affine, rigid-body, scaling, reflection, degrees-of-freedom, rotation]
---

# Transformations in Affine Space

## Basics — transforming between frames

> When working with two frames, such as $(\mathbf v_1, \mathbf v_2, \mathbf v_3, P_0)$ and $(\mathbf u_1, \mathbf u_2, \mathbf u_3, Q_0)$, **the basis vectors and reference point of the second frame can be expressed in terms of the first.** This allows for smooth transformations between coordinate systems.

| Concept | Statement |
|---|---|
| **Frame transformation** | Basis vectors and reference points of one frame can be expressed in terms of another |
| **Matrix representation** | Transformations such as translation, rotation and scaling are **applied using matrices** |
| **Applications** | Computer graphics, **robotics**, and **physics simulations**, to map objects between coordinate systems |

## What a transformation is

> **A transformation is a function that maps a point or vector to another point or vector**, allowing geometric modifications such as translation, rotation and scaling.

$$\text{points: } Q = T(P) \qquad\qquad \text{vectors: } \mathbf v = R(\mathbf u)$$

- **In homogeneous coordinates, these transformations are efficiently applied using 4D matrix multiplication.**
- **Linear transformation matrix $C$:** defined as $\mathbf v = C\mathbf u$, where $C$ is a square matrix.
- **The linearity constraint ensures that transformations preserve linear combinations of points**, maintaining geometric consistency.

> [!INTUITION]
> "Preserves linear combinations" is the formal way of saying **straight lines stay straight and midpoints stay midpoints**. That is exactly what makes affine transformations safe to apply to a mesh: you can transform only the *vertices* and the edges between them come along correctly, without having to transform every point on every edge. A transformation that did not preserve linear combinations would bend your triangles, and rendering would have to work per-pixel instead of per-vertex.

## Degrees of freedom

> - **Vectors: 9 degrees of freedom.**
> - **Points: 12 degrees of freedom**, accounting for translation.

> [!DERIVE]
> Where the numbers come from. A general linear map on 3D vectors is a $3\times3$ matrix → $3\times3 = \mathbf{9}$ free entries. For points you additionally need a translation, which is a 3-vector → $9 + 3 = \mathbf{12}$.
>
> This is why an affine transformation in homogeneous form is
> $$\begin{bmatrix} a_{11} & a_{12} & a_{13} & d_x \\ a_{21} & a_{22} & a_{23} & d_y \\ a_{31} & a_{32} & a_{33} & d_z \\ 0 & 0 & 0 & 1\end{bmatrix}$$
> — **12 free values** in the top three rows, and a **fixed bottom row $[0\ 0\ 0\ 1]$**. The moment that bottom row is *not* $[0\ 0\ 0\ 1]$, the map is no longer affine — it is a projection.

## Types of affine transformation

### A. Transformation of a line

A line is written in parametric form:

$$P(\alpha) = P_0 + \alpha\,\mathbf d$$

where $P_0$ is a **point** and $\mathbf d$ is a **direction vector**. **The transformation is applied to both $P_0$ and $\mathbf d$.**

> [!TRAP]
> $P_0$ carries $w=1$ and $\mathbf d$ carries $w=0$, so the same matrix **translates the point and leaves the direction alone** — which is exactly right. A translated line should start somewhere new but still point the same way. This is the homogeneous type tag doing useful work; get it wrong and translating a line rotates it.

### B. Rotation

- **Rotation is more complex than translation as it requires more parameters.**
- A **2D rotation about the origin** by an angle $\theta$ is represented using trigonometric functions.
- **3D rotations:**
  - follow the **right-hand rule** for axis rotation;
  - **rotation about the $Z$-axis keeps $Z$-coordinates unchanged.**

$$R_z(\theta) = \begin{bmatrix}\cos\theta & -\sin\theta & 0\\ \sin\theta & \cos\theta & 0\\ 0&0&1\end{bmatrix}$$

Note the third row and column: $z$ passes through untouched, confirming the course's statement.

> [!NOTE]
> **Right-hand rule:** point your right thumb along the **positive axis**; your fingers curl in the direction of **positive rotation**. Rotation about $z$ therefore carries $+x$ toward $+y$.

### C. Rigid-body transformations (rotation & translation)

> - **Preserve object shape and volume.**
> - **Only affect location and orientation.**
> - **Cannot achieve all affine transformations.**

Rigid-body transformations are the ones that correspond to physically picking an object up and putting it somewhere else. Distances and angles inside the object are unchanged.

### D. Non-rigid-body transformations (scaling & reflection)

**Scaling:**

> - Can be **uniform** (equal in all directions) or **non-uniform** (different scale factors per axis).
> - Defined by a **fixed point**, a **scaling direction**, and a **scaling factor $\beta$**.

| Value of $\beta$ | Effect |
|---|---|
| $\beta > 1$ | **Object expands** |
| $0 < \beta < 1$ | **Object shrinks** |
| $\beta < 0$ | **Reflection occurs** |

> **Scaling has 6 degrees of freedom** (fixed point + 3 independent scaling factors).

> [!DERIVE]
> $6 = 3 + 3$: three coordinates to place the **fixed point**, plus **three independent scale factors** $(\beta_x, \beta_y, \beta_z)$. If the fixed point is forced to the origin — the usual default — scaling drops to just **3** degrees of freedom.

## The comparison

| | **Rigid body** | **Non-rigid body** |
|---|---|---|
| Operations | rotation, translation | scaling, reflection |
| Preserves shape & volume? | ✅ | ❌ |
| Preserves angles? | ✅ | only under **uniform** scaling |
| Preserves distances? | ✅ | ❌ |
| Affects | location and orientation only | size and/or handedness |
| Covers all affine transforms? | ❌ **cannot achieve all affine transformations** | — |

> [!TRAP]
> A **negative scale factor is a reflection**, and reflection **flips handedness** — a right-handed coordinate frame becomes left-handed. In practice this reverses the winding order of your triangles, so **backface culling silently discards the wrong faces** and the model appears inside-out. If a mirrored object renders as a hollow shell, a negative determinant is why.

> [!EXAM]
> *"Differentiate rigid-body and non-rigid-body transformations"* — give the operations in each class, the three preservation properties (shape/volume, angle, distance), and the closing line that **rigid-body transformations cannot express every affine transformation**, which is precisely why scaling and shear exist as separate categories.

---

**Next:** all of these written as $4\times4$ homogeneous matrices.
