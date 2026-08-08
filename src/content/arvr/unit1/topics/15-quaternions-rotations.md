---
subject: arvr
unit: 1
order: 15
slug: quaternions-rotations
title: Quaternions — 3D Rotation, Double Cover & Visualisation
summary: The axis-angle formula, the sandwich product, single vs double cover, composing and inverting rotations, and the standard exam recipes.
minutes: 16
tags: [quaternions, rotation, axis-angle, double-cover, slerp, conjugate, worked-examples]
---

# Quaternions — 3D Rotation, Double Cover & Visualisation

## Building a rotation quaternion

To rotate by angle $\theta$ about a **unit** axis $\hat{\mathbf u} = (u_x, u_y, u_z)$:

$$\boxed{\ q = \left(\cos\tfrac{\theta}{2},\ \ \hat{\mathbf u}\sin\tfrac{\theta}{2}\right) = \left(\cos\tfrac{\theta}{2},\ u_x\sin\tfrac{\theta}{2},\ u_y\sin\tfrac{\theta}{2},\ u_z\sin\tfrac{\theta}{2}\right)\ }$$

And backwards, to recover the axis and angle from $q = (w,x,y,z)$:

$$\theta = 2\arccos(w) \qquad\qquad \hat{\mathbf u} = \frac{(x,y,z)}{\sqrt{1-w^2}} = \frac{(x,y,z)}{\sin(\theta/2)}$$

> [!TRAP]
> **The half-angle is the single most common mistake in this unit.** It is $\cos(\theta/2)$, not $\cos\theta$ — and recovering the angle therefore needs the factor of 2: $\theta = 2\arccos(w)$.
>
> The half appears because the rotation formula applies $q$ **twice** (once on each side of the sandwich product below), so each application must contribute half the rotation. It is also the root of the double-cover property.

## Applying a rotation

A vector $\mathbf v$ is rotated by embedding it as a **pure quaternion** $(0, \mathbf v)$ and forming the sandwich product:

$$\mathbf v' = q\,\mathbf v\,q^{-1}$$

For a **unit** quaternion, the inverse is just the **conjugate**:

$$q^{-1} = \bar q = (w,\ -x,\ -y,\ -z)$$

> [!NOTE]
> **Composing rotations is just multiplication**, and it composes right-to-left exactly like matrices: applying $q_1$ then $q_2$ gives $q_2 q_1$. To find the rotation that carries orientation $q_1$ to orientation $q_2$:
> $$\Delta q = q_2\,q_1^{-1}$$
> This is the formula behind several exam questions below.

## Single cover vs double cover

> - **In single cover, each 3D rotation corresponds to a unique mathematical representation.** This is how **rotation matrices** work: for every rotation in 3D space there is exactly one matrix that represents it.
> - **However, quaternions do not work this way — they follow double cover instead.**
> - **In double cover, each 3D rotation can be represented by two different quaternions.** If $q$ represents a rotation, then $-q$ (its negation) **represents the exact same rotation**.
> - This happens because quaternions encode rotations in **four-dimensional space**, and in 4D two quaternions ($q$ and $-q$) can map to the same 3D rotation.

$$\boxed{\ q \ \text{and}\ -q\ \text{represent the same 3D rotation}\ }$$

> [!DERIVE]
> **Why, from the sandwich product.** Substitute $-q$:
> $$(-q)\,\mathbf v\,(-q)^{-1} = (-1)(-1)\,q\,\mathbf v\,q^{-1} = q\,\mathbf v\,q^{-1}$$
> The two minus signs cancel, so $-q$ acts identically to $q$. ✔
>
> **The half-angle view.** Rotating by $\theta$ and by $\theta + 360°$ are the same physical rotation, but the quaternion uses $\theta/2$ — so those two cases differ by $180°$ in the half-angle, which flips every component's sign. **Double cover is the half-angle's shadow.**

> [!INTUITION]
> Practically: **the sign of a quaternion is not observable in the orientation it produces.** Two headsets reporting $q$ and $-q$ are pointing exactly the same way.
>
> But the sign *does* matter for **interpolation**. Blending from $q_1$ to $q_2$ when the two have opposite signs takes the **long way round** — a 350° swing instead of a 10° one. Every real slerp implementation therefore checks whether $q_1\cdot q_2 < 0$ and negates one of them first. This is a classic AR/VR animation bug: an object that snaps almost the whole way around instead of nudging.

## Visualisation

> Quaternions are **essential for interpreting and managing rotations in augmented and virtual reality systems.** Their mathematical properties allow for **smooth, continuous rotations without the singularities or instability** associated with traditional matrix-based methods. In VR/AR applications, quaternions help **optimize performance and enhance realism**, and their visual representation aids in **debugging and refining motion controls**.

| Aspect | Statement |
|---|---|
| **Application in AR/VR** | Used for accurate and efficient rotational transformations |
| **4D visualization** | Rotations occur in **quaternion space, which extends beyond 3D intuition** |
| **Singularity avoidance** | **Prevents issues like gimbal lock**, ensuring stable and seamless rotations |

> [!NOTE]
> **Slerp** (spherical linear interpolation) is why quaternions dominate animation. Unit quaternions live on the surface of a 4D unit sphere, so interpolating *along that surface* gives **constant angular velocity** — a rotation that looks smooth and even. Linearly interpolating rotation matrices, by contrast, leaves the intermediate matrices non-orthogonal (they squash the object) and needs re-orthonormalisation every step.

---

## Exam recipes

### Recipe 1 — axis-angle → quaternion

*"An object is rotated by $\theta$ about the unit axis $(u_x,u_y,u_z)$. Represent this as a quaternion $(w,x,y,z)$."*

1. Half the angle: $\theta/2$.
2. $w = \cos(\theta/2)$.
3. $(x,y,z) = (u_x, u_y, u_z)\sin(\theta/2)$.
4. **Check** $w^2+x^2+y^2+z^2 = 1$.

> [!TRAP]
> One MCQ in the course gives the axis $(0.80, 0.53, 0.26)$ and states a rotation of **40°**, offering $(0.40, 0.73, 0.48, 0.23)$ among the options. Those numbers do **not** come from 40°: with $\theta = 40°$ you get $w = \cos 20° = 0.94$ and $(x,y,z) = (0.27, 0.18, 0.09)$.
>
> The option $(0.40, 0.73, 0.48, 0.23)$ corresponds to **$\theta \approx 133°$** — check it: $\cos 66.5° = 0.40$ ✔ and $0.80 \times \sin 66.5° = 0.73$ ✔, $0.53 \times 0.917 = 0.48$ ✔, $0.26\times0.917 = 0.24$ ✔.
>
> So the **stem's angle is inconsistent with the intended answer.** You can still pick the right option by structure — it is the only one whose components appear in the order $(w,\ 0.80k,\ 0.53k,\ 0.26k)$ — but be aware the arithmetic in that question does not check out.

### Recipe 2 — quaternion → axis and angle

*"Given the quaternion in $(x,y,z,w)$ form $(0.17, 0.30, 0.02, 0.94)$, compute the axis and angle of rotation."*

1. Identify the scalar: the form is $(x,y,z,w)$, so $w = 0.94$.
2. $\theta = 2\arccos(0.94) = 2 \times 19.95° = \mathbf{39.9° \approx 40°}$
3. $\sin(\theta/2) = \sqrt{1-0.94^2} = \sqrt{0.1164} = 0.341$
4. $\hat{\mathbf u} = (0.17, 0.30, 0.02)/0.341 = \mathbf{(0.50,\ 0.88,\ 0.06)}$
5. Check $\lVert\hat{\mathbf u}\rVert \approx 1$ ✔

> [!TRAP]
> In the course's version of this question, **options (a) and (b) are printed identically** and neither the axis nor the stated angle (80°) matches the computation above. Trust the method: **$\theta = 2\arccos(w)$**, axis $= (x,y,z)/\sin(\theta/2)$. Show your working and you keep the marks regardless of the option list.

### Recipe 3 — the rotation between two orientations

*"A rigid body has orientation $q_1 = (0.94, 0.17, 0.17, 0.24)$. What rotation transforms it to $q_2 = (0.65, 0.60, 0.25, 0.40)$?"*

Use $\Delta q = q_2\,q_1^{-1}$, with $q_1^{-1} = \bar q_1 = (0.94, -0.17, -0.17, -0.24)$.

The Hamilton product $(w_1,x_1,y_1,z_1)(w_2,x_2,y_2,z_2)$ is:

$$w = w_1w_2 - x_1x_2 - y_1y_2 - z_1z_2$$
$$x = w_1x_2 + x_1w_2 + y_1z_2 - z_1y_2$$
$$y = w_1y_2 - x_1z_2 + y_1w_2 + z_1x_2$$
$$z = w_1z_2 + x_1y_2 - y_1x_2 + z_1w_2$$

Substituting:

- $w = (0.65)(0.94) - (0.60)(-0.17) - (0.25)(-0.17) - (0.40)(-0.24) = 0.611 + 0.102 + 0.043 + 0.096 = \mathbf{0.85}$
- $x = (0.65)(-0.17) + (0.60)(0.94) + (0.25)(-0.24) - (0.40)(-0.17) = -0.111 + 0.564 - 0.060 + 0.068 = \mathbf{0.46}$
- $y = (0.65)(-0.17) - (0.60)(-0.24) + (0.25)(0.94) + (0.40)(-0.17) = -0.111 + 0.144 + 0.235 - 0.068 = \mathbf{0.20}$
- $z = (0.65)(-0.24) + (0.60)(-0.17) - (0.25)(-0.17) + (0.40)(0.94) = -0.156 - 0.102 + 0.043 + 0.376 = \mathbf{0.16}$

$$\Delta q = (0.85,\ 0.46,\ 0.20,\ 0.16)$$

This one **does** verify against the course's answer key exactly.

### Recipe 4 — the identity check

*"Given $q = (0.40, 0.73, 0.48, 0.23)$, what is $r = q\,q^{-1}$?"*

By definition, any quantity times its own inverse is the **identity**:

$$r = (1,\ 0,\ 0,\ 0)$$

The identity quaternion is $w=1$ with zero vector part — a rotation of $\theta = 2\arccos(1) = 0°$. **No computation is needed**; recognising the structure is the entire question.

> [!EXAM]
> Across every quaternion problem, four checks catch nearly all errors:
> 1. **Is the quaternion unit length?** ($w^2+x^2+y^2+z^2 = 1$)
> 2. **Which component is $w$?** Read the stem's stated ordering.
> 3. **Did you halve the angle** going in, and **double it** coming out?
> 4. **Does $w$ near 1 mean a small rotation?** If your answer says $w = 0.99$ and $\theta = 160°$, something is wrong.

---

**End of Unit 1.** The through-line: represent geometry so that it does not depend on an arbitrary origin (affine spaces, coordinate-free geometry), make every transformation a single uniform matrix so they compose cheaply (homogeneous coordinates, concatenation), and represent orientation in a form that never degenerates (quaternions). Unit 2 puts this machinery to work in an actual graphics API.
