---
subject: arvr
unit: 2
order: 5
slug: programming-2d-coordinate-systems
title: Programming 2D Applications and Coordinate Systems
summary: Why 2D is just 3D with z = 0, and the four coordinate systems a rendered object passes through.
minutes: 11
tags: [2D-programming, world-coordinates, object-coordinates, NDC, screen-coordinates]
---

# Programming 2D Applications and Coordinate Systems

## 2D is a special case of 3D

> A point on the 2D plane $p = (x, y)$ corresponds to $p = (x, y, 0)$ in 3D space.

That single line is why there is no separate 2D graphics system. You write 2D applications using the **same** API, the same pipeline and the same matrices — you simply leave $z$ at zero. The projection flattens nothing because there is nothing to flatten.

> [!NOTE]
> In homogeneous form (Unit 1) the point is $(x, y, 0, 1)$ — $z=0$ because it is on the plane, $w=1$ because it is a **point**. Contrast $(x, y, 0, 0)$, which would be a **direction** lying in the plane.

## The four coordinate systems

> In computer graphics and 3D rendering, **different coordinate systems are used to represent objects and transformations at various stages of the rendering pipeline.**

### World coordinates

| | |
|---|---|
| **Definition** | The **global coordinate system** where objects exist in a virtual 3D scene |
| **Purpose** | Defines the **absolute position** of objects relative to a **fixed world origin $(0,0,0)$** |
| **Example** | In a 3D game, the position of a house or a tree in the virtual environment |
| **Transformations** | Objects are placed in the scene using **model transformations** (translation, rotation, scaling) |

### Object coordinates

| | |
|---|---|
| **Definition** | The coordinate system relative to an **individual object's local origin** |
| **Purpose** | Defines the **shape and structure** of an object **before it is placed in the world** |
| **Example** | A car model with its origin at its centre; all points defining the car's shape are relative to that origin |
| **Transformations** | Converted to world coordinates by applying **model transformation matrices** |

### Physical-device coordinates (NDC)

| | |
|---|---|
| **Definition** | A **normalized** coordinate system used by the graphics pipeline, mapped to a standard range — **typically $[-1, 1]$ in OpenGL** |
| **Purpose** | Allows **device-independent rendering** before mapping to actual screen pixels |
| **Example** | After view and projection transformations, a 3D object's position is mapped to a 2D viewport |
| **Transformations** | **Projection transformations** convert world coordinates into NDC, ensuring consistency across display resolutions |

**NDC — Normalized Device Coordinates.**

### Window / screen coordinates

| | |
|---|---|
| **Definition** | The final **2D pixel coordinates** on the display screen where objects appear |
| **Purpose** | Maps the rendered scene to the **actual display resolution and pixel grid** |
| **Example** | A point in NDC $(-0.5, 0.5)$ might map to pixel $(200, 400)$ on a $1920\times1080$ display |
| **Transformations** | The **viewport transformation** maps NDC coordinates to actual screen pixels |

## The journey, in one picture

```
   OBJECT           WORLD              NDC                 WINDOW
   coordinates      coordinates        [-1, 1] cube        pixels
   ──────────       ──────────         ────────────        ──────
   the car's        the car parked     resolution-         (200, 400)
   own shape   ──▶  outside the   ──▶  independent    ──▶  on this
                    house              projection          1920×1080
                                                           screen
       model transformation   projection    viewport transform
```

> [!INTUITION]
> Each system exists so somebody can stop caring about something. The **modeller** works in object coordinates and never thinks about the room. The **scene designer** works in world coordinates and never thinks about the screen. **NDC** exists so the same scene renders identically on a phone and a 4K monitor — and, crucially for this course, so an **AR headset can render two viewports from one NDC scene** by changing only the final step.

> [!TRAP]
> The course lists **four** systems here, but the full OpenGL pipeline from Unit 1 has **six** (object → world → **eye** → **clip** → NDC → window). The eye and clip stages are omitted in this simplified 2D treatment. If a question says *"list the coordinate systems in the OpenGL pipeline"*, give **six**; if it asks about the four described in 2D programming, give **these four**. Read which is being asked.

## A worked NDC → screen mapping

The viewport transform is a linear map from $[-1,1]$ to the pixel range. For a viewport of width $W$ and height $H$ with origin at $(0,0)$:

$$x_{\text{screen}} = \frac{(x_{\text{ndc}} + 1)}{2}\,W \qquad\qquad y_{\text{screen}} = \frac{(y_{\text{ndc}} + 1)}{2}\,H$$

Check the course's example on a $1920\times1080$ display with NDC $(-0.5, 0.5)$:

$$x = \frac{(-0.5+1)}{2}(1920) = \frac{0.5}{2}(1920) = 480 \qquad y = \frac{(0.5+1)}{2}(1080) = 810$$

> [!NOTE]
> The course quotes $(200, 400)$ for this example, which corresponds to a **different viewport size or origin** than a full-screen $1920\times1080$ — the numbers are illustrative rather than computed. The **formula** above is the one to reproduce; it is what actually maps the canonical cube onto pixels, and it is why the same scene fills the screen at any resolution.

> [!EXAM]
> *"Explain the coordinate systems used in the rendering pipeline"* — for each, give **definition, purpose, example, and the transformation that produces it**. That four-part structure is exactly how the course presents them, and it is easy marks.

---

**Next:** the classic first program — a fractal that shows why the display strategy matters.
