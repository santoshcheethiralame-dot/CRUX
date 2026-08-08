---
subject: arvr
unit: 2
order: 8
slug: primitives-attributes
title: Primitives and Attributes
summary: Geometric versus raster primitives, the OpenGL primitive types, and how the two follow different pipelines.
minutes: 11
tags: [primitives, geometric, raster, GL_POINTS, GL_LINE_STRIP, framebuffer, attributes]
---

# Primitives and Attributes

## Geometric primitives

> **Basic building blocks in computer graphics that form more complex shapes.**

| Primitive | Definition |
|---|---|
| **Points** | The simplest primitive — a **single location in space** |
| **Line segments** | Defined by **two endpoints**, forming a straight connection |
| **Polygons** | Closed shapes formed by connecting multiple line segments — **triangles and quadrilaterals** are the most common in 3D rendering |
| **Curves** | Smooth, mathematically defined paths such as **Bézier curves or splines** |
| **Surfaces** | Defined using **patches or meshes**, often used to represent 3D objects |

> These primitives pass through the **geometric pipeline**, where **transformations, clipping, lighting and shading** operations determine how they are positioned and rendered. The pipeline ensures that **only visible portions of objects are displayed**, optimizing performance and rendering quality.

## Raster primitives

> **Pixel-based representations of images that lack geometric structure.** Example: a **bitmap image or a texture** applied to a 3D object.

**Properties:**

- Unlike geometric primitives, raster primitives **do not have definable points, edges or transformations in 3D space**.
- They exist as **arrays of pixels stored in the framebuffer**.

> Since raster primitives do not undergo geometric transformations, they follow a **separate rasterization pipeline** that processes them directly for display. This pipeline focuses on **blending, filtering and anti-aliasing**, ensuring rasterized images are properly rendered on screen.

## The comparison

| | **Geometric primitives** | **Raster primitives** |
|---|---|---|
| Described by | **Vertices and topology** | **Arrays of pixels** |
| Has structure in 3D? | ✅ points, edges, faces | ❌ none |
| Transformable? | ✅ full geometric pipeline | ❌ no geometric transformations |
| Pipeline | **Geometric** — transform, clip, light, shade | **Rasterization** — blend, filter, anti-alias |
| Resolution | **Independent** — scales cleanly | **Fixed** — resizing causes pixelation |
| Examples | Points, lines, polygons, curves, surfaces | Bitmaps, textures |

> [!INTUITION]
> This is the **vector versus raster** distinction from the programmer's-interface topic, now as data types rather than as API models. A triangle *knows* it is a triangle and can be rotated exactly. A bitmap is just colours in a grid — rotate it and you must **resample**, which is why blending, filtering and anti-aliasing are the operations that matter for it.
>
> Real scenes use both: **geometry defines the shape, raster data defines the surface detail.** A brick wall is two triangles (geometric) wearing a brick texture (raster).

## Rendering in OpenGL

> **Basic geometric primitives in OpenGL:**
> - **Points** — `GL_POINTS`
> - **Line segments** — `GL_LINES`
> - **Polylines** — `GL_LINE_STRIP`, `GL_LINE_LOOP`

```c
glDrawArrays(GL_POINTS, 0, NumPoints);
```

**The full set available to `glBegin`:**

`GL_POINTS` · `GL_LINES` · `GL_LINE_STRIP` · `GL_LINE_LOOP` · `GL_TRIANGLES` · `GL_TRIANGLE_STRIP` · `GL_QUADS` · `GL_QUAD_STRIP` · `GL_POLYGON`

> [!TRAP]
> The names are **plural** — `GL_POINTS`, `GL_LINES`, `GL_TRIANGLES`, `GL_QUADS`. A course MCQ offers a near-identical singular list (`GL_POINT`, `GL_LINE`, `GL_TRIANGLE`…) as a distractor. The plural list is the correct one.

**How the list interpreters differ**, given vertices $v_0, v_1, v_2, v_3 \dots$:

| Mode | Interpretation |
|---|---|
| `GL_LINES` | Independent segments: $(v_0v_1), (v_2v_3), \dots$ — vertices consumed **in pairs** |
| `GL_LINE_STRIP` | A connected path: $(v_0v_1), (v_1v_2), (v_2v_3), \dots$ — **open** |
| `GL_LINE_LOOP` | Same as strip, **plus a closing segment** back to $v_0$ |
| `GL_TRIANGLES` | Independent triangles, vertices consumed **in threes** |
| `GL_TRIANGLE_STRIP` | Each new vertex forms a triangle with the **previous two** — $n$ vertices give $n-2$ triangles |

> [!INTUITION]
> **Why strips exist.** To draw 100 connected triangles, `GL_TRIANGLES` needs 300 vertices; `GL_TRIANGLE_STRIP` needs 102. Since vertex processing is per-vertex work, a strip is roughly **three times cheaper**. This is the same "stop re-sending data" instinct behind display lists and VBOs.

## Attributes

**Attribute functions** (category 2 of the six) control **how** a primitive appears rather than *what* it is: **colour and fill** are the two the course names, alongside point size, line width and stipple patterns.

```c
glPointSize(2);                    /* attribute: how big are points */
glColor3f(1.0f, 0.0f, 0.0f);       /* attribute: current colour     */
glBegin(GL_POINTS);                /* primitive begins              */
    glVertex2dv(array[i]);
glEnd();
```

> [!NOTE]
> Attributes are **state** (see the previous topic): `glColor3f` sets the *current* colour, and every vertex issued afterwards inherits it until it is changed. This is why the coloured-cube program sets a new colour before each face rather than per vertex.

> [!EXAM]
> *"Differentiate geometric and raster primitives"* — use the comparison table, and make the pipeline point explicitly: **geometric primitives go through the geometric pipeline (transform/clip/light/shade); raster primitives bypass it and go through a rasterization pipeline (blend/filter/anti-alias)**. That sentence is the heart of the answer.

---

**Next:** polygons specifically — how they are filled, and what makes one "simple".
