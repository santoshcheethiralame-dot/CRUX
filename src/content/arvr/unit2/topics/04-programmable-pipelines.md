---
subject: arvr
unit: 2
order: 4
slug: programmable-pipelines
title: Programmable Pipelines and Shaders
summary: Fixed-function versus programmable, what vertex and fragment shaders do, and the effects they unlock.
minutes: 11
tags: [shaders, vertex-shader, fragment-shader, GLSL, fixed-function, programmable]
---

# Programmable Pipelines and Shaders

## What changed

> Modern graphics cards incorporate **programmable pipelines**, allowing developers to **customize how graphics are processed at different stages** of the graphics pipeline. Unlike older **fixed-function pipelines**, where rendering operations followed a **predefined path**, programmable pipelines provide **greater flexibility and control**, enabling complex visual effects and real-time optimizations.

| | **Fixed-function pipeline** | **Programmable pipeline** |
|---|---|---|
| Behaviour | A **predefined path** — you set *parameters* | You supply **the code that runs** |
| Lighting | One built-in model (Phong-style, per-vertex) | Any model you can write |
| Flexibility | Configure via state (`glEnable`, `glLight*`) | Full control per vertex / per fragment |
| Era | OpenGL 1.x — `glBegin`/`glEnd`, immediate mode | OpenGL 2.0+, WebGL, Direct3D 9+ |

> [!INTUITION]
> The fixed-function pipeline was a **vending machine**: a fixed menu, and you press buttons. The programmable pipeline is a **kitchen**: you write the recipe. That is why every visually distinctive game of the last twenty years looks different from every other one — they are running different code in the same two slots.

## The two key components

### 1. Vertex programs (vertex shaders)

Run **once per vertex**, replacing step ① of the imaging process:

- **Modify vertex positions dynamically** for effects like **morphing, deformation and animation**.
- **Compute vertex colours** based on lighting models.
- Perform **custom transformations**, allowing advanced projection effects **beyond traditional matrix operations**.

### 2. Fragment programs (fragment shaders)

Run **once per fragment**, replacing step ④:

- **Control how individual pixels (fragments) are processed** before being written to the frame buffer.
- Apply **textures, transparency, bump mapping and shading effects**.
- Implement **advanced lighting models**, including realistic **reflections and refractions**.

```
  vertices ──▶ [ VERTEX SHADER ]  ──▶ clipping ──▶ rasterization ──▶ [ FRAGMENT SHADER ] ──▶ framebuffer
                 YOUR CODE            fixed          fixed              YOUR CODE
                 runs per vertex                     → fragments        runs per fragment
```

> [!TRAP]
> **A fragment shader runs far more often than a vertex shader.** A full-screen triangle at 1080p has 3 vertices and roughly **two million fragments**. Work you can do per-vertex (and let the rasterizer interpolate) is thousands of times cheaper than the same work per-fragment. That single fact drives most real-time graphics optimisation.

## Advantages of programmable pipelines

> - Enables **realistic lighting and shading effects**, such as **Phong shading, ambient occlusion and dynamic shadows**.
> - Supports **custom rendering techniques**, including **cel-shading, motion blur and water simulations**.
> - Allows game developers and visual effects artists to create **cinematic-quality graphics in real-time applications**.

> By leveraging programmable pipelines, modern GPUs can render **highly detailed and visually stunning graphics**, making them essential in video games, simulations and CGI rendering.

## A minimal shader pair

Shaders are written in **GLSL** (OpenGL Shading Language). The smallest useful pair:

```glsl
/* ---- vertex shader: runs once per vertex ---- */
attribute vec4 vPosition;
uniform   mat4 modelViewProjection;

void main() {
    gl_Position = modelViewProjection * vPosition;   /* Unit 1, in hardware */
}
```

```glsl
/* ---- fragment shader: runs once per fragment ---- */
precision mediump float;

void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);         /* opaque red */
}
```

> [!NOTE]
> Note what `gl_Position = modelViewProjection * vPosition` actually is: **the entire Unit 1 coordinate pipeline, in one line**. Object coordinates go in, clip coordinates come out; the hardware then does the perspective divide and viewport transform. Everything you derived about frames, homogeneous coordinates and concatenation is compressed into that single matrix.

> [!INTUITION]
> **Why interpolation matters.** Values written by the vertex shader are **interpolated across the triangle** by the rasterizer before reaching the fragment shader — using the **barycentric coordinates** from Unit 1's affine-sum topic. Colour, texture coordinates, normals and depth all arrive at the fragment shader already blended. That is the mechanism behind smooth (Gouraud) shading, and it is why affine sums were worth proving.

> [!EXAM]
> *"Differentiate fixed-function and programmable pipelines"* — give the table above, then name the **two programmable stages** (vertex and fragment) with two responsibilities each, then three effects that programmability unlocks (**Phong shading, cel-shading, motion blur** are the course's own examples). Mentioning that clipping and rasterization remain fixed-function shows you understand *why* only those two stages are programmable.

---

**Next:** writing an actual 2D graphics application, and the coordinate systems it works in.
