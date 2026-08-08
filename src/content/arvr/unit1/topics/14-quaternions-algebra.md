---
subject: arvr
unit: 1
order: 14
slug: quaternions-algebra
title: Quaternions — The Algebra
summary: From complex numbers to quaternions, the Hamilton relations (with a correction to the course notes), gimbal lock, and why AR/VR uses them.
minutes: 14
tags: [quaternions, complex-numbers, hamilton, gimbal-lock, imaginary-units]
---

# Quaternions — The Algebra

## Starting from complex numbers

> **A complex number is represented in the form $a+bi$**, where $a$ is the real part and $bi$ is the imaginary part. Complex numbers have a **geometric interpretation**, as they can be visualised as points or vectors in a **two-dimensional plane**, with the real and imaginary components corresponding to the $x$- and $y$-axes.

| Property | Meaning |
|---|---|
| **2D representation** | Complex numbers can be plotted as points or vectors in a coordinate plane |
| **Vector interpretation** | A combination of two unit-length vectors, allowing operations like **rotation and scaling** |
| **Applications** | Signal processing, quantum mechanics, and **computer graphics for transformations** |

> [!INTUITION]
> The key fact that makes the whole topic work: **multiplying by a unit complex number rotates the plane.** Since $e^{i\theta} = \cos\theta + i\sin\theta$, multiplying by $\cos\theta + i\sin\theta$ rotates any complex number by $\theta$ — and multiplying two of them **adds their angles**.
>
> That is why a course MCQ can ask you to combine $0.86 + 0.5i$ and $0.76 + 0.64i$: recognise $\cos 30° + i\sin 30°$ and $\cos 40° + i\sin 40°$, and the combined rotation is simply $30° + 40° = \mathbf{70°}$. No multiplication needed.
>
> Quaternions are the answer to *"what is the 3D version of that trick?"*

## Quaternions

> **Quaternions extend complex numbers to three-dimensional space**, providing a powerful mathematical framework:
> $$H = a + bi + cj + dk$$
> where $a,b,c,d$ are **real numbers** and $i,j,k$ are **imaginary units**. Quaternions offer a **compact and efficient way to handle 3D rotations**, making them widely used in computer graphics, robotics and physics simulations.

So a quaternion has **four components**: one **real (scalar)** part and **three imaginary (vector)** parts. It is often written

$$q = (w,\ x,\ y,\ z) \qquad\text{or}\qquad q = (w,\ \mathbf{v})$$

> [!TRAP]
> **Component order is not standardised, and this course uses both.** Some questions write $(w,x,y,z)$ (scalar first) and others write $(x,y,z,w)$ (scalar last). Always check the stem — a question that says *"given the quaternion in $(x,y,z,w)$ form $(0.17, 0.30, 0.02, 0.94)$"* is telling you $w = 0.94$, **not** $w = 0.17$. Getting this backwards changes every subsequent number.
>
> A reliable tell: for small rotations $w = \cos(\theta/2)$ is **close to 1**, so the component nearest 1 is usually the scalar.

## The multiplication rules

> - $i \cdot j = k$, $\quad j \cdot k = i$, $\quad k \cdot i = j$
> - **Rotations are done using unit quaternions**
> - **Quaternions are normalized to maintain unit length**
> - **Efficient in computational operations for 3D transformations**

> [!TRAP]
> **Correction to the course notes.** The booklet states $i\cdot i = j \cdot j = k \cdot k = \mathbf{0}$. **This is wrong.** Hamilton's defining relations are
> $$\boxed{\ i^2 = j^2 = k^2 = ijk = -1\ }$$
> The squares are $\mathbf{-1}$, exactly as for the ordinary imaginary unit — that is what makes $i, j, k$ *imaginary units* at all. If they squared to zero the algebra would collapse and no rotation could be represented. Quote the $-1$ version in an exam; it is the standard result in every textbook, including Angel & Shreiner.

The cyclic products follow the right-hand pattern, and are **anti-commutative**:

$$ij = k,\quad jk = i,\quad ki = j \qquad\qquad ji = -k,\quad kj = -i,\quad ik = -j$$

```
        i ───▶ j
        ▲      │        going WITH the arrows: product is POSITIVE (ij = k)
        │      ▼        going AGAINST them:    product is NEGATIVE (ji = −k)
        └───── k
```

> [!NOTE]
> **Quaternion multiplication is not commutative** ($ij = k$ but $ji = -k$) — and that is a feature, not a defect. **3D rotations do not commute either**: turning right then looking up leaves you facing somewhere different from looking up then turning right. An algebra that *did* commute could not possibly model 3D rotation correctly.

## Unit quaternions

Only **unit** quaternions represent rotations:

$$\lVert q\rVert = \sqrt{w^2+x^2+y^2+z^2} = 1$$

Hence the course's note that **quaternions are normalized to maintain unit length**. In a real system, repeated multiplication accumulates floating-point error and slowly drags $\lVert q\rVert$ away from 1, so implementations **re-normalise periodically** — a point that returns in Unit 3 under sensor fusion.

## Advantages

> - **Compact rotation representation** — allows smooth and efficient rotational transformations.
> - **Avoids gimbal lock** — overcomes the limitations of Euler angles, which can cause loss of rotational degrees of freedom.
> - **Applications** — animation, game development, and spacecraft navigation for stable and continuous rotations.

### Gimbal lock

> [!INTUITION]
> Euler angles describe orientation as three successive rotations (say yaw, then pitch, then roll). **When the middle rotation reaches ±90°, the first and third axes line up** — they now do the same thing, and you have lost a degree of freedom. No combination of the three angles can produce rotation in the direction you just lost, and to move smoothly through that configuration some angle must change infinitely fast.
>
> This is not a numerical bug; it is a genuine topological property of representing rotations with three numbers. **The only escape is to use more than three** — which is exactly what a quaternion's four components buy you.

### The cost comparison

| Representation | Numbers | Gimbal lock? | Interpolates smoothly? | Compose cost |
|---|---|---|---|---|
| **Euler angles** | 3 | **Yes** | poorly | cheap but ambiguous |
| **Rotation matrix** | 9 | No | badly (needs re-orthonormalisation) | 27 multiplies |
| **Quaternion** | **4** | **No** | **Yes — via slerp** | **16 multiplies** |

> [!EXAM]
> *"What are quaternions and why are they preferred over Euler angles in AR/VR?"* Answer in four beats: (1) the form $H = a+bi+cj+dk$ with the Hamilton relations $i^2=j^2=k^2=ijk=-1$; (2) **only unit quaternions represent rotations**; (3) they **avoid gimbal lock**, which costs Euler angles a degree of freedom at ±90°; (4) they are **compact (4 numbers vs 9)** and **interpolate smoothly (slerp)**, which matters because a headset updates orientation every frame.

---

**Next:** how a quaternion actually performs a rotation — and the double-cover property.
