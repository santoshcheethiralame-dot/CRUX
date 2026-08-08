---
subject: arvr
unit: 1
order: 5
slug: change-of-basis
title: Change of Coordinate Systems
summary: The transformation matrix M, the model-view matrix, the two kinds of basis change, and why the inverse runs the conversion backwards.
minutes: 12
tags: [change-of-basis, transformation-matrix, model-view, OpenGL, translation, rotation]
---

# Change of Coordinate Systems

## The problem

> In many applications, especially in graphics programming, it is often necessary to **transform vector representations from one basis to another**. This is crucial for correctly positioning and orienting objects in different coordinate systems.

You have a teapot vertex written in the teapot's own frame. The renderer needs it in the camera's frame. Nothing about the vertex changes — only the language it is described in.

## The transformation matrix

> **Transformation Matrix $M$:** converts a vector representation from one basis to another using
> $$\mathbf{u} = M\mathbf{v}$$

- **The inverse of $M$ allows transformation in the opposite direction**: $\mathbf v = M^{-1}\mathbf u$.

> [!INTUITION]
> $M$ is a **dictionary between two languages**, and $M^{-1}$ is the same dictionary read backwards. Because it is a dictionary and not an action, applying $M$ does not *move* anything — the geometry is untouched, only the description changes. (Confusingly, the *same* matrices are used in the next topics to genuinely move objects. The maths is identical; only the interpretation differs. This is the classic **"is it the object or the axes that moved?"** ambiguity, and it is worth being deliberate about which one a question means.)

## In OpenGL

> **Transformations occur through different frames, such as from the model (object) frame to the world frame and then to the camera (eye) frame. These transformations are managed using the model-view matrix.**

| Frame | What it is |
|---|---|
| **Model (object) frame** | **Local coordinates of an object** |
| **World frame** | **Global positioning of objects in a scene** |
| **Camera (eye) frame** | **Coordinates relative to the camera's viewpoint** |

$$\text{object} \xrightarrow{\ \text{model matrix}\ } \text{world} \xrightarrow{\ \text{view matrix}\ } \text{eye}$$

OpenGL's **model-view matrix** collapses both steps into a single matrix, so a vertex goes from object coordinates straight to eye coordinates in one multiply.

> [!NOTE]
> **Why fuse them?** Because a vertex is transformed millions of times per second, and matrix multiplication is **associative**: $(V \cdot M)\mathbf p = V(M\mathbf p)$. You may as well compute $VM$ **once per object** and then do a single matrix-vector product per vertex, rather than two. This is the same efficiency argument that reappears under **concatenation of transformations**.

## The two types of basis transformation

> - **Translation of basis** — shifting the origin.
> - **Rotation of basis** — changing the orientation of the basis vectors.

```
   TRANSLATION OF BASIS               ROTATION OF BASIS
   (origin moves, axes parallel)      (origin fixed, axes turn)

     ↑ v2      ↑ v2'                     ↑ v2    ↖ v2'
     │         │                         │      ↖
     │         │                         │    ↖   ↗ v1'
  P0 └──→ P0' └──→ v1'                P0 └────↗──────→ v1
        v1
```

Note that these are exactly the two operations an affine space supports on points and vectors respectively — **translation moves the origin (a point operation); rotation reorients the basis (a vector operation)**. A general change of frame is a combination of the two, which is why a single $4\times4$ homogeneous matrix (next topic but one) can capture both.

> [!TRAP]
> Changing the basis by rotating the axes **clockwise** is indistinguishable, numerically, from rotating the object **anticlockwise**. When a question says "rotate by $\theta$", check whether it is the **object frame** or the **global frame** that is being rotated — the resulting matrices are transposes of one another. Several MCQs in this course hinge on exactly that distinction ("…in the body frame" vs "…in the global frame").

## Worked idea

Suppose frame $B$ is frame $A$ translated by $\mathbf d$ and rotated by $R$. A point with representation $\mathbf p_A$ in $A$ has, in $B$:

$$\mathbf p_B = R^{-1}(\mathbf p_A - \mathbf d)$$

Read it right-to-left as a story: *undo the origin shift, then undo the rotation.* The inverse appears because you are expressing the point in the **new** frame, not moving the point into a new position — the two are opposites, which is exactly the ambiguity flagged above.

> [!EXAM]
> Whenever a problem mentions several frames, write the chain out explicitly before computing:
> $$\mathbf p_{\text{eye}} = V\,M\,\mathbf p_{\text{object}}$$
> and label which matrix is which. Most lost marks in this unit are bookkeeping errors — the wrong matrix applied in the wrong order — not arithmetic.

---

**Next:** the representational trick that lets translation join rotation and scaling inside a single matrix — homogeneous coordinates.
