---
subject: arvr
unit: 2
order: 3
slug: graphics-architectures
title: Graphics Architectures and the Pipeline
summary: Early calligraphic displays, the display processor and display list, the graphics pipeline, and the four major steps of the imaging process.
minutes: 14
tags: [architecture, display-processor, display-list, pipeline, rasterization, fragment-processing]
---

# Graphics Architectures and the Pipeline

## Early graphics systems

> - **API structure:** connects application programs to hardware/software for graphics processing.
> - **Early graphics systems** used **calligraphic CRT displays**, requiring **high refresh rates to avoid flicker**.

A calligraphic (vector) CRT steered the electron beam **along the lines of the drawing** rather than scanning the whole screen. The image existed only while the beam was tracing it, so the host computer had to re-send the entire drawing dozens of times per second — otherwise the phosphor faded and the picture flickered.

## Display processor architecture

> - Included instructions to **display primitives directly on CRT screens**.
> - **Display List:** image instructions **stored in memory and executed repeatedly** to maintain the display without flicker.

```
   HOST CPU ──sends once──▶ DISPLAY LIST (memory) ──▶ DISPLAY PROCESSOR ──▶ CRT
                                    ▲                        │
                                    └──── re-executed ───────┘
                                          many times/sec
```

> [!INTUITION]
> The **display list** is the first great idea in graphics hardware: *stop making the CPU re-describe the picture 60 times a second — store the description near the display and let dedicated hardware replay it.* The CPU is freed to do actual work.
>
> That idea never died. A modern **vertex buffer object (VBO)** is the same trick: upload the geometry to GPU memory once, then issue a one-line draw call per frame instead of streaming vertices across the bus. The Sierpinski gasket topic shows both versions side by side.

## Pipeline architectures — the graphics pipeline

> The graphics pipeline is a **sequence of operations that transform graphical primitives** (points, lines, polygons) **into a final image displayed in the frame buffer**. This process is essential for rendering scenes in real-time applications like video games, simulations and GUIs. To ensure high efficiency, modern graphics pipelines are **implemented in hardware on dedicated GPUs**, which optimize performance by **parallelizing computations**.

> [!INTUITION]
> **Why a pipeline?** Because every vertex undergoes the same sequence of operations independently. If a stage takes one clock tick, a pipeline of $n$ stages still produces **one finished vertex per tick** once full — it just takes $n$ ticks to fill. Combine that with the fact that vertices don't depend on each other and you can also run **thousands in parallel**. That combination — deep pipelining plus massive parallelism — is the entire reason a GPU outruns a CPU at this job.

## The four major steps in the imaging process

This is the single most examinable list in the topic.

### 1. Vertex Processing

- Each **vertex** (point in 3D space) is processed **independently**.
- Performs **coordinate transformations** to place objects correctly in the scene.
- Uses **matrix transformations** to shift between coordinate systems (e.g. world space to screen space).
- **Colour calculations** such as lighting effects are applied to each vertex.

*This is Unit 1's model-view and projection matrices, executed in hardware.*

### 2. Clipping and Primitive Assembly

- **Limits the displayed image to a defined clipping volume**, similar to a camera's viewfinder.
- Objects **outside the volume are clipped out and removed**, improving performance.
- Occurs at the **primitive level** — entire shapes (triangles, lines) are clipped rather than individual vertices.

### 3. Rasterization

- **Converts primitives** (polygons, lines, points) **into pixels** to be stored in the frame buffer.
- Generates **fragments** (potential pixels), each with assigned **colour, depth and texture** information.
- Determines **which pixels belong inside an object** — e.g. filling a triangle with colour.

> [!TRAP]
> A **fragment is not a pixel.** A fragment is a *candidate* — it carries colour, depth and texture data for one pixel location, but it may still be discarded by the depth test or alpha test, or blended with others. Several fragments can compete for the same pixel. Calling them the same thing loses marks.

### 4. Fragment Processing

- Performs **final colour calculations and effects** before displaying the image.
- **Texture mapping** applies images to objects to enhance realism.
- **Bump mapping** simulates surface irregularities by adjusting lighting effects.
- **Hidden-surface removal** ensures objects closer to the viewer obscure those behind them, preventing visual artifacts.

> Each step in the pipeline is **optimized for speed and runs in parallel on the GPU**, allowing smooth real-time rendering in gaming, 3D modelling and VR.

```
  VERTICES ──▶ ① VERTEX ──▶ ② CLIPPING & ──▶ ③ RASTER- ──▶ ④ FRAGMENT ──▶ FRAME
               PROCESSING     PRIMITIVE        IZATION       PROCESSING     BUFFER
               transform      ASSEMBLY         → fragments   texture,
               + light        cull outside                   depth test
```

> [!EXAM]
> *"Explain the four major steps of the imaging process"* — worth 6–8 marks and asked repeatedly. Give the four names **in order**, two bullets each, and finish with the sentence about parallel execution on the GPU. A labelled left-to-right diagram earns the presentation mark.

> [!NOTE]
> **Where the stages became programmable.** Steps ① and ④ are exactly the two the next topic replaces with your own code — **vertex shaders** and **fragment shaders**. Steps ② and ③ (clipping and rasterization) remain fixed-function, because they are pure geometry with no artistic decisions to make.

---

**Next:** what changes when you can program those stages yourself.
