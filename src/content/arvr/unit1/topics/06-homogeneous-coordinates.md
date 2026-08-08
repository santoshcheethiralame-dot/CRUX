---
subject: arvr
unit: 1
order: 6
slug: homogeneous-coordinates
title: Homogeneous Coordinate Systems
summary: The 4D representation of 3D points and vectors, why the fourth component distinguishes them, and why translation needs it.
minutes: 12
tags: [homogeneous-coordinates, 4D, column-matrix, translation, w-component]
---

# Homogeneous Coordinate Systems

## The idea

> **Homogeneous coordinates provide a 4D representation for both points and vectors in 3D space.**

> In 3D graphics and transformations, a point $P(x,y,z)$ is often represented using a **4D column matrix**. This allows for a unified approach to transformations such as translation, scaling and rotation. By extending both points and vectors to a 4D representation, it becomes possible to **apply transformation matrices consistently across different geometric entities**.

Three claims, and they are the examinable ones:

| Claim | Meaning |
|---|---|
| **4D representation** | Ensures a **unified transformation framework** for both points and vectors in 3D space |
| **Column matrix format** | A point $P(x,y,z)$ is represented using the basis $(\mathbf v_1,\mathbf v_2,\mathbf v_3, P_0)$ |
| **Transformation consistency** | Homogeneous coordinates enable **seamless application of transformation matrices to points and vectors alike** |

## The representation

Recall from the frames topic that in a frame $(\mathbf v_1, \mathbf v_2, \mathbf v_3, P_0)$:

$$\mathbf{u} = \alpha_1\mathbf v_1 + \alpha_2\mathbf v_2 + \alpha_3\mathbf v_3 + \mathbf{0}\cdot P_0 \qquad\text{(a vector — no origin term)}$$
$$Q = \beta_1\mathbf v_1 + \beta_2\mathbf v_2 + \beta_3\mathbf v_3 + \mathbf{1}\cdot P_0 \qquad\text{(a point — one origin term)}$$

Stack the four coefficients into a column and you get the homogeneous representation:

$$\mathbf{u} = \begin{bmatrix}\alpha_1\\ \alpha_2\\ \alpha_3\\ \mathbf{0}\end{bmatrix} \qquad\qquad Q = \begin{bmatrix}\beta_1\\ \beta_2\\ \beta_3\\ \mathbf{1}\end{bmatrix}$$

> [!INTUITION]
> **The fourth component is not a coordinate — it is a type tag.** $w = 1$ means "I am a point, I have a location, translate me." $w = 0$ means "I am a vector, I am only a direction, translation must not affect me."
>
> This is the type distinction from the very first topic, finally encoded in a number the hardware can act on. And it works automatically: apply a translation matrix to a $w=0$ column and the translation column gets multiplied by zero, leaving the direction untouched — exactly the correct behaviour, with no special-casing anywhere in the pipeline.

## Why translation forces this

In plain 3D, rotation and scaling are **linear** maps and can be written as $3\times3$ matrices. Translation cannot — it is not linear, because it does not fix the origin:

$$T(\mathbf 0) = \mathbf d \ne \mathbf 0$$

So in 3D you are stuck writing $\mathbf p' = A\mathbf p + \mathbf d$ — a multiply **and** an add, in two different forms that cannot be combined or composed cleanly.

Lift to 4D and translation becomes an ordinary matrix multiplication:

$$\begin{bmatrix}x'\\y'\\z'\\1\end{bmatrix} = \begin{bmatrix}1&0&0&d_x\\ 0&1&0&d_y\\ 0&0&1&d_z\\ 0&0&0&1\end{bmatrix}\begin{bmatrix}x\\y\\z\\1\end{bmatrix} = \begin{bmatrix}x+d_x\\ y+d_y\\ z+d_z\\ 1\end{bmatrix}$$

> [!DERIVE]
> Now apply that same matrix to a **vector** ($w=0$):
> $$\begin{bmatrix}1&0&0&d_x\\ 0&1&0&d_y\\ 0&0&1&d_z\\ 0&0&0&1\end{bmatrix}\begin{bmatrix}x\\y\\z\\0\end{bmatrix} = \begin{bmatrix}x\\ y\\ z\\ 0\end{bmatrix}$$
> **Unchanged** — the translation column is multiplied by $w=0$ and vanishes. The type tag does the work automatically. A surface normal never gets translated by accident.

## What this buys you

1. **Uniformity.** Every affine transformation — translate, rotate, scale, shear — is now a single $4\times4$ matrix of the same shape.
2. **Composability.** Because they are all matrices, a sequence of transformations is just a **product** of matrices, which can be precomputed once. (This is the *concatenation* topic.)
3. **Hardware.** GPUs implement a $4\times4$ matrix-vector multiply as a primitive operation. The entire fixed-function transform pipeline is that one operation, repeated.
4. **Projection.** Perspective projection is *not* affine, but it **is** expressible as a $4\times4$ homogeneous matrix followed by a divide by $w$ — which is why the same machinery carries all the way to the screen.

> [!NOTE]
> The general homogeneous point $(x, y, z, w)$ with $w \ne 0$ denotes the 3D point $(x/w,\ y/w,\ z/w)$ — so $(2,4,6,2)$ and $(1,2,3,1)$ are the **same point**. This *perspective divide* is dormant for affine transforms (which always leave $w=1$) and is exactly what perspective projection switches on. Points with $w = 0$ are "points at infinity" — which is another way of saying *pure directions*, consistent with the type-tag reading above.

> [!EXAM]
> Standard 4–5 marker: *"Why are homogeneous coordinates used in computer graphics?"* Three points, in this order: (1) translation is **not linear** in 3D and cannot be a $3\times3$ matrix; (2) in 4D **all affine transformations become matrix multiplications of a uniform size**, so they can be **concatenated into one matrix**; (3) the fourth component **distinguishes points ($w{=}1$) from vectors ($w{=}0$)**, so translation correctly ignores directions. Mentioning the perspective divide earns the extra mark.

---

**Next:** the philosophical counterweight to all this machinery — geometry that does not depend on coordinates at all.
