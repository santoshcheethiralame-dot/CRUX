---
subject: arvr
unit: 2
order: 9
slug: polygon-rendering
title: Polygon Rendering
summary: Polygons per second as the performance metric, the three rendering methods, simple versus complex polygons, and why triangles win.
minutes: 11
tags: [polygons, wireframe, flat-shading, cel-shading, simple-polygon, triangles]
---

# Polygon Rendering

## The performance metric

> **Performance metric: number of polygons rendered per second.**
>
> - One of the **key performance metrics** in computer graphics.
> - Determines **how efficiently a system can handle complex scenes with high geometric detail**.
> - **Higher polygon throughput** allows for more detailed and realistic rendering; **lower performance may lead to lag or lower frame rates.**

> [!NOTE]
> This metric matters enormously for AR/VR specifically. A desktop game at 60 fps renders one image per frame; a VR headset renders **two** (one per eye) at **90 fps or more** — roughly **three times the throughput** for the same scene. It is the reason VR content is aggressively budgeted for polygon count, and why the frame-rate figure in Unit 3 is quoted as **60–120 fps** rather than the usual 60.

## The three rendering methods

### 1. Render edges only

- Draws only the **wireframe** of the model, displaying its **structural geometry**.
- Useful for **debugging, modelling and visualizing underlying mesh structures**.
- **Computationally inexpensive** — no shading or texturing required.

### 2. Render the interior with solid colour or patterns

- Faces are filled with a **single colour, a gradient or a pattern**.
- **Flat shading** applies a uniform colour; **texturing** maps an image onto the surface for added realism.
- **The most common approach in real-time rendering and game graphics.**

### 3. Choose to render or not render edges

- Some techniques **selectively display or hide edges** to control visual complexity.
- **Cel-shading** (cartoon-style graphics) **outlines edges** to enhance contrast and stylization.
- **Removing edges** creates a smoother appearance, useful in **photo-realistic rendering**.

> Each method has **trade-offs between performance and visual quality**, and the choice depends on the application's needs — whether it prioritizes **speed, detail or artistic style**.

```
   EDGES ONLY            SOLID FILL             FILL + EDGES
    ╱╲  ╱╲                ╱▓▓╲                    ╱▓▓╲
   ╱__╲╱__╲              ╱▓▓▓▓╲                  ╱▓▓▓▓╲
   wireframe             flat shaded             cel-shaded
   cheapest              most common             stylised
```

> [!INTUITION]
> These are not three *techniques* so much as three **answers to "what is this image for?"** — a modeller debugging topology wants edges; a game wants filled surfaces at speed; a stylised game wants both, deliberately. The course's framing (*speed, detail or artistic style*) is the useful part of the answer.

## Polygon types

> - **Simple polygon**
> - **Complex polygon**

| | **Simple polygon** | **Complex polygon** |
|---|---|---|
| Edges | **No two non-adjacent edges intersect** | Edges **cross** one another |
| Shape | A single, well-defined interior | Self-intersecting, or with holes |
| Rendering | Fills unambiguously | **Interior is ambiguous** — needs a fill rule |
| OpenGL | Guaranteed correct | **Undefined behaviour** |

> [!TRAP]
> OpenGL requires polygons to be **simple, convex and planar** — and it does **not check**. Feed it a self-intersecting or non-planar polygon and you get whatever the hardware happens to do, which is often a mess that renders differently on different GPUs. This is the single most common cause of "it works on my machine" bugs in polygon rendering.
>
> For a complex polygon you must either apply a **fill rule** (even-odd or nonzero winding) or **tessellate** it into simple pieces first.

## Why triangles dominate

The course MCQ asks it directly — *"what primitive polygon is used for creating a mesh to represent a complex object?"* — and the answer is the **triangle**. Four reasons worth being able to give:

1. **Always planar.** Three points define a plane; a quad's four points may not be coplanar, leaving the surface ill-defined.
2. **Always convex.** A triangle cannot self-intersect or be concave, so it is always a *simple* polygon.
3. **Trivial to rasterize.** The inside test is three edge functions — cheap, exact, and easy to build in hardware.
4. **Barycentric interpolation is natural.** Interpolating colour, depth and texture coordinates across a triangle uses exactly the affine-sum weights from Unit 1.

> [!NOTE]
> Every polygon eventually becomes triangles. A `GL_QUADS` or `GL_POLYGON` call is **tessellated into triangles** before rasterization — modern OpenGL removed quads and polygons from the core profile entirely for this reason. When you count "polygons per second", you are really counting **triangles per second**.

> [!EXAM]
> *"Explain the methods of polygon rendering"* — name all three with the technique attached (wireframe / flat shading + texturing / cel-shading), state the trade-off sentence, and close with **simple vs complex polygons** and the note that OpenGL assumes simple, convex, planar polygons. Adding *why triangles* earns the extra mark.

---

**Next:** actual OpenGL programs — the callback structure, and the three listings from the course.
