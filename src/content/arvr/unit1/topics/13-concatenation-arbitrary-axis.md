---
subject: arvr
unit: 1
order: 13
slug: concatenation-arbitrary-axis
title: Concatenation and Rotation About an Arbitrary Axis
summary: Combining transformations by matrix multiplication, why order matters but bracketing does not, and the five-step arbitrary-axis rotation.
minutes: 13
tags: [concatenation, matrix-multiplication, order, arbitrary-axis, composite-transformation]
---

# Concatenation and Rotation About an Arbitrary Axis

## Combining transformations

> **Multiple transformations can be applied in sequence using matrix multiplication:**
> - $q = CBAp$ → **most efficient order for a single-point transformation**
> - $M = CBA$, then $q = Mp$ → **for multiple points**

Read $q = CBAp$ **right to left**: apply $A$ first, then $B$, then $C$.

> [!DERIVE]
> **Why two different recipes?** Matrix multiplication is **associative**, so $C(B(Ap))$ and $(CBA)p$ give identical answers — but not at identical cost.
>
> - **One point:** matrix × vector is cheap ($\sim16$ multiplies for $4\times4$); matrix × matrix is expensive ($\sim64$). So do three cheap matrix-vector products: $C(B(Ap))$.
> - **$n$ points:** pay for the two matrix-matrix products **once** to build $M = CBA$, then do a single cheap product per point. Cost drops from $3n$ matrix-vector products to $2$ matrix-matrix plus $n$ matrix-vector.
>
> With a mesh of 50,000 vertices the second is dramatically faster. **This is precisely why OpenGL keeps a single model-view matrix** rather than applying the model and view transformations separately.

## Order matters

Matrix multiplication is **associative but not commutative**:

$$(CB)A = C(BA) \qquad\qquad AB \ne BA \quad \text{in general}$$

Bracketing is free; **order is not**.

> [!TRAP]
> **Rotate-then-translate is not translate-then-rotate.** Translating a point away from the origin and *then* rotating swings it around a wide arc; rotating first and then translating spins it in place and moves it. The matrices differ, the pictures differ, and exam questions exploit this constantly.
>
> ```
>   T then R                        R then T
>   (rotate about origin AFTER      (rotate in place, THEN move)
>    moving away → wide arc)
>
>      •──────→ •                      •──→ •
>              ╱                            ↻
>            ↻  ← swept around             stays put, then slides
> ```
>
> Whenever a question specifies transformations "in that order", write the product **before** computing, and remember: **with column vectors the first-applied transformation is rightmost.**

## Rotation about an arbitrary axis

> - **Rotation can be defined around a custom axis, using a unit vector $\mathbf u$ derived from two points.**
> - **The order of transformation matrices affects the result.**

The standard construction — the "sandwich" pattern again, now with alignment on both sides:

$$M \;=\; T^{-1}\,R_x^{-1}(\theta_x)\,R_y^{-1}(\theta_y)\;R_z(\theta)\;R_y(\theta_y)\,R_x(\theta_x)\,T$$

**The five steps, read right to left:**

| Step | Matrix | What it does |
|---|---|---|
| 1 | $T$ | **Translate** so a point on the axis moves to the **origin** |
| 2 | $R_x(\theta_x)$ | **Rotate about $x$** to bring the axis into the $xz$-plane |
| 3 | $R_y(\theta_y)$ | **Rotate about $y$** to align the axis with the **$z$-axis** |
| 4 | $R_z(\theta)$ | Perform the **actual rotation** — now trivial, about a principal axis |
| 5 | inverses, in reverse | **Undo** steps 3, 2, 1 to put everything back |

> [!INTUITION]
> The whole trick is: **you only know how to rotate about $x$, $y$ and $z$ — so move the problem until it becomes one of those.** Align the awkward axis with $z$, do the easy rotation, then put the world back exactly as you found it.
>
> It is the same three-move pattern as scaling about an arbitrary fixed point (*move to origin → do the simple thing → move back*), just with two alignment rotations instead of one translation. Once you recognise the pattern, you can derive any "about an arbitrary X" transformation without memorising it.

> [!NOTE]
> Deriving $\mathbf u$ **from two points**: if the axis runs through $P_1$ and $P_2$, then
> $$\mathbf u = \frac{P_2 - P_1}{\lVert P_2 - P_1\rVert}$$
> — **point − point gives a vector** (the affine rule from earlier), and dividing by its length normalises it. $P_1$ is the point you translate to the origin in step 1.

> [!TRAP]
> Inverting the composite requires reversing the order as well as inverting each factor:
> $$(CBA)^{-1} = A^{-1}B^{-1}C^{-1}$$
> Writing $(CBA)^{-1} = C^{-1}B^{-1}A^{-1}$ is a classic loss of marks. For rotations, remember each individual inverse is just a **transpose**.

## Worked pattern for exam questions

*"Given transformations in the following order, compute the homogeneous transformation matrix: (a) scale by 2, (b) rotate about X by 20°, (c) rotate about Y by 30°, (d) rotate about Z by 45°, (e) translate by $(7,7,6)$."*

**Step 1 — write the product, respecting right-to-left order:**

$$M = T(7,7,6)\;R_z(45°)\;R_y(30°)\;R_x(20°)\;S(2)$$

**Step 2 — write each factor as a $4\times4$ matrix** (from the previous topic).

**Step 3 — multiply right to left**, showing intermediate products.

**Step 4 — sanity-check the result:**

- the bottom row must still be $[0\ 0\ 0\ 1]$ (it is affine);
- the translation column should end up close to $(7,7,6)$ — translation is applied last, so it passes through unmodified;
- the upper-left $3\times3$ block should have determinant $= 2^3 = 8$ (three axes each scaled by 2, and rotations contribute $\det = 1$).

> [!EXAM]
> That determinant check is worth doing on every composite question — it catches a dropped factor or a sign error in seconds. **Rotations have $\det = 1$; a uniform scale by $\beta$ contributes $\beta^3$; a reflection makes the determinant negative.**

---

**Next:** a different representation of rotation entirely — one that avoids the failure mode matrices and Euler angles share.
