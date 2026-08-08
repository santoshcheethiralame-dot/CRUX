---
subject: arvr
unit: 2
order: 12
slug: parallel-projection
title: Parallel Projection
summary: Projectors that stay parallel — orthographic and oblique, the cavalier/cabinet distinction, and where accurate dimensions matter.
minutes: 11
tags: [projection, parallel, orthographic, oblique, cavalier, cabinet, glOrtho]
---

# Parallel Projection

## Projection in general

> **Projection is the mapping of 3D points to a 2D plane.** Two types: **Parallel Projection** and **Perspective Projection.**

Every projection works by tracing **projectors** — imaginary lines from the object's vertices to the **view plane**. What distinguishes the two families is simply whether those projectors are parallel.

## Parallel projection

> Parallel projection is commonly used in **technical drawings**, such as those in **architecture and engineering**, where **maintaining the true shape and size of objects is essential**. Unlike perspective projection, parallel projection **does not introduce distortion based on distance**, making it ideal for **precise measurements**. In this method, **projectors are parallel** and extend from the object's vertices to the view plane.

> - If the projectors are **perpendicular** to the view plane → **Orthographic Projection**.
> - If they intersect the view plane at an **angle other than 90°** → **Oblique Projection**.

```
   ORTHOGRAPHIC                    OBLIQUE
   projectors ⊥ view plane         projectors at an angle

   │  │  │  │                       ╱  ╱  ╱  ╱
   │  │  │  │                      ╱  ╱  ╱  ╱
   ▼  ▼  ▼  ▼                     ╱  ╱  ╱  ╱
  ────────────  view plane      ────────────  view plane
```

## Types of parallel projection

### 1. Orthographic projection

- **Projectors are perpendicular to the view plane.**
- Objects appear **without distortion, preserving their actual dimensions**.
- Common in **blueprints, CAD designs and mechanical drawings**.
- Subdivides into:
  - **a. Front view (Elevation)**
  - **b. Top view (Plan)**
  - **c. Side view (Profile)**

### 2. Oblique projection

- **Projectors are not perpendicular** to the view plane, resulting in a **distorted but still measurable** representation.
- **Allows visualization of multiple faces of an object in a single view.**
- Two common types:
  - **a. Cavalier projection** — **full depth is preserved**, leading to a more **stretched** appearance.
  - **b. Cabinet projection** — **depth is scaled down**, creating a **more natural look**.

| | **Cavalier** | **Cabinet** |
|---|---|---|
| Depth scaling | **1.0** — full depth preserved | **0.5** — depth halved |
| Appearance | Stretched, exaggerated | More natural |
| Projector angle | typically 45° | typically 63.4° |

> [!INTUITION]
> **Why cabinet looks better.** Preserving full depth (cavalier) makes the receding edges as long as the front edges, so a cube looks unnaturally elongated — the eye expects depth to *shorten*. Halving it fakes just enough foreshortening to look right, without giving up measurability. It is a deliberate compromise between the accuracy of parallel projection and the realism of perspective.

## The trade-off

> Parallel projection **ensures accurate proportions** and is widely used where precise dimensions are necessary. However, **it lacks depth perception**, making it **less suitable for realistic imagery** in visual applications like gaming or animations.

> [!TRAP]
> "No distortion" means **no distortion with distance** — parallel lines stay parallel and equal lengths stay equal regardless of depth. It does **not** mean the image looks like the object from a real viewpoint. In fact the absence of foreshortening is exactly what makes parallel projections look "wrong" to the eye and "right" to a machinist.

## In OpenGL

```c
glMatrixMode(GL_PROJECTION);
glLoadIdentity();
glOrtho(left, right, bottom, top, near, far);
```

`glOrtho` defines a **rectangular box** view volume. Anything inside is projected without foreshortening; anything outside is clipped.

> [!EXAM]
> A frequent question is *"Differentiate `glOrtho()` and `gluPerspective()`"*. The distinction to give:
>
> | | `glOrtho(l, r, b, t, n, f)` | `gluPerspective(fovy, aspect, near, far)` |
> |---|---|---|
> | View volume | a **rectangular box** | a **frustum** (truncated pyramid) |
> | Projectors | **parallel** | **converge** at the centre of projection |
> | Depth effect | none — size independent of distance | distant objects appear **smaller** |
> | Arguments | six clipping planes | field of view, aspect ratio, two clip planes |
> | Used for | CAD, technical drawing, 2D/UI overlays | realistic 3D, games, VR |
>
> ⚠ And remember the bug from the coloured-cube listing: **never call both** without `glLoadIdentity()` between them — they multiply into the same matrix.

> [!NOTE]
> Parallel projection is not merely historical in AR/VR. **UI overlays, HUD elements and magic-lens annotations** are drawn with an orthographic projection so they keep a constant on-screen size regardless of how far away the anchoring object is. A headset typically renders the world in perspective and the interface in ortho, in the same frame.

---

**Next:** the projection that actually mimics the eye.
