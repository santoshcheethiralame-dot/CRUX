---
subject: arvr
unit: 1
order: 12
slug: homogeneous-transformations
title: Homogeneous Transformation Matrices
summary: Translation, scaling, the three rotation matrices, shear — written out in 4×4 form, with the orthogonality property of rotations.
minutes: 14
tags: [homogeneous, matrices, translation, scaling, rotation, shear, orthogonal]
---

# Homogeneous Transformation Matrices

Everything from the previous topic, now as $4\times4$ matrices you can multiply.

## Translation

> Moves a point $P$ to $P'$ by **adding a displacement vector $\mathbf d$**. Represented using a **translation matrix $T$**.

$$T(d_x,d_y,d_z) = \begin{bmatrix}1&0&0&d_x\\ 0&1&0&d_y\\ 0&0&1&d_z\\ 0&0&0&1\end{bmatrix} \qquad T^{-1} = T(-d_x,-d_y,-d_z)$$

## Scaling

> **Scaling matrices allow independent scaling along coordinate axes.** The **origin is usually the fixed point**, but transformations can be adjusted for **arbitrary fixed points**.

$$S(\beta_x,\beta_y,\beta_z) = \begin{bmatrix}\beta_x&0&0&0\\ 0&\beta_y&0&0\\ 0&0&\beta_z&0\\ 0&0&0&1\end{bmatrix} \qquad S^{-1} = S\!\left(\tfrac1{\beta_x},\tfrac1{\beta_y},\tfrac1{\beta_z}\right)$$

> [!NOTE]
> **Scaling about an arbitrary fixed point $F$** is the standard three-step sandwich: translate $F$ to the origin, scale, translate back.
> $$S_F = T(F)\;S(\beta)\;T(-F)$$
> The same pattern rotates about an arbitrary point, and reappears in the next topic for rotation about an arbitrary *axis*. **Whenever a transformation has a "fixed point" that is not the origin, expect this sandwich.**

## Rotation

> **Rotation matrices exist for X, Y and Z axes. Rotation matrices are orthogonal (inverse equals transpose).**

$$R_x(\theta) = \begin{bmatrix}1&0&0&0\\ 0&\cos\theta&-\sin\theta&0\\ 0&\sin\theta&\cos\theta&0\\ 0&0&0&1\end{bmatrix} \qquad R_y(\theta) = \begin{bmatrix}\cos\theta&0&\sin\theta&0\\ 0&1&0&0\\ -\sin\theta&0&\cos\theta&0\\ 0&0&0&1\end{bmatrix}$$

$$R_z(\theta) = \begin{bmatrix}\cos\theta&-\sin\theta&0&0\\ \sin\theta&\cos\theta&0&0\\ 0&0&1&0\\ 0&0&0&1\end{bmatrix}$$

> [!TRAP]
> **$R_y$ has its minus sign in the bottom-left, not the top-right** — the opposite of $R_x$ and $R_z$. This is not a misprint. Following the right-hand rule, rotation about $y$ carries $+z$ toward $+x$, which reverses the sign pattern. It is the single most common sign error in this unit; if a composite matrix comes out wrong, check $R_y$ first.
>
> Also note **the axis of rotation always shows up as a row and column of the identity** — $R_x$ has $[1,0,0]$ in the first row and column, $R_y$ in the second, $R_z$ in the third. Use this as a 2-second sanity check on any rotation matrix you write.

### Orthogonality

> **Rotation matrices are orthogonal — the inverse equals the transpose.**

$$R^{-1} = R^{\mathsf T} \qquad\text{equivalently}\qquad R\,R^{\mathsf T} = I$$

> [!INTUITION]
> Why this is true and why it matters. A rotation takes an orthonormal basis to an orthonormal basis, so the **columns of $R$ are mutually perpendicular unit vectors**. That is the definition of an orthogonal matrix, and it forces $R^{\mathsf T}R = I$.
>
> Practically it means **undoing a rotation is free** — no matrix inversion, just read the entries the other way round. In a headset that recomputes a view matrix every frame, that is a real saving. It also means $\det R = +1$, so rotations never flip handedness (unlike a negative scale).

## Shear

> **Defined using a shearing matrix, which skews an object along an axis.**

A shear along $x$ proportional to $y$ (the standard example — a rectangle leaning into a parallelogram):

$$H_{xy}(\text{cot}\,\phi) = \begin{bmatrix}1&\cot\phi&0&0\\ 0&1&0&0\\ 0&0&1&0\\ 0&0&0&1\end{bmatrix}$$

Each point's $x$ is displaced by an amount proportional to its $y$; points with $y=0$ do not move at all.

> [!NOTE]
> Shear is the transformation that shows affine ≠ rigid most clearly: **angles change, but straight lines, parallelism, and ratios along a line all survive**. It is also why "affine" is a strictly larger class than "rigid + scale" — you cannot build a shear out of rotations and axis scalings alone.

## Summary table

| Transformation | Matrix form | Inverse | Preserves |
|---|---|---|---|
| **Translation $T(\mathbf d)$** | identity + translation column | $T(-\mathbf d)$ | shape, size, orientation |
| **Scaling $S(\beta)$** | diagonal $\beta_x,\beta_y,\beta_z$ | $S(1/\beta)$ | shape only if **uniform** |
| **Rotation $R(\theta)$** | trig block on two axes | **$R^{\mathsf T}$** | shape, size, **angles**, handedness |
| **Shear $H$** | off-diagonal entry | negate the shear term | area/volume, parallelism — **not angles** |

> [!EXAM]
> Composite-matrix problems are the bread and butter of this unit — e.g. *"scale by 2, rotate about X by 20°, about Y by 30°, about Z by 45°, then translate by $(7,7,6)$; compute the homogeneous transformation matrix."* The method:
> 1. Write each matrix **separately** in $4\times4$ form.
> 2. Decide the **order** — with column vectors, the **first transformation applied sits rightmost**.
> 3. Multiply **right to left**, keeping the intermediate products.
>
> $$M = T(7,7,6)\;R_z(45°)\;R_y(30°)\;R_x(20°)\;S(2)$$
>
> Write that product line down before touching a single number — it is worth more marks than the arithmetic, and it is where most candidates go wrong.

---

**Next:** why that order matters, and how to rotate about an axis that is not $X$, $Y$ or $Z$.
