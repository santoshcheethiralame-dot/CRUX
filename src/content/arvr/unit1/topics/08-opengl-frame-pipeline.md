---
subject: arvr
unit: 1
order: 8
slug: opengl-frame-pipeline
title: Graphical Programming — The OpenGL Frame Pipeline
summary: The six coordinate systems a vertex passes through, what each transformation does, and where the perspective divide happens.
minutes: 12
tags: [OpenGL, pipeline, coordinates, NDC, clip-coordinates, viewport]
---

# Graphical Programming — The OpenGL Frame Pipeline

## The six stages

> **The coordinate transformation pipeline in OpenGL follows this sequence:**
> 1. **Object (Model) Coordinates**
> 2. **World Coordinates**
> 3. **Eye (Camera) Coordinates**
> 4. **Clip Coordinates**
> 5. **Normalized Device Coordinates**
> 6. **Window (Screen) Coordinates**
>
> **These transformations help in rendering 3D objects onto a 2D screen efficiently.**

Memorise the six names **in order** — this is a guaranteed short question, and every later graphics topic refers back to it.

```
  ┌──────────────────┐  model      ┌──────────────────┐  view       ┌──────────────────┐
  │ OBJECT (MODEL)   │──matrix────▶│ WORLD            │──matrix────▶│ EYE (CAMERA)     │
  │ the teapot's own │             │ the room         │             │ relative to the  │
  │ local coords     │             │                  │             │ viewer           │
  └──────────────────┘             └──────────────────┘             └────────┬─────────┘
                                                                             │ projection
                                                                             │ matrix
  ┌──────────────────┐  viewport   ┌──────────────────┐ perspective ┌────────▼─────────┐
  │ WINDOW (SCREEN)  │◀──transform─│ NORMALIZED       │◀──divide────│ CLIP             │
  │ actual pixels    │             │ DEVICE COORDS    │   (÷ w)     │ 4D, pre-divide   │
  │ e.g. (200, 400)  │             │ [-1, 1] cube     │             │                  │
  └──────────────────┘             └──────────────────┘             └──────────────────┘
```

## What each step does

| Stage | Transformation applied | What it achieves |
|---|---|---|
| **Object → World** | **model matrix** | Places the object **in the scene** — position, orientation, size of *this instance* |
| **World → Eye** | **view matrix** | Re-expresses everything **relative to the camera**; the camera sits at the origin looking down $-z$ |
| **Eye → Clip** | **projection matrix** | Applies **perspective or parallel projection** and defines the **view volume**; clipping happens here |
| **Clip → NDC** | **perspective divide** ($\div w$) | Collapses 4D homogeneous coordinates into the canonical $[-1,1]$ cube |
| **NDC → Window** | **viewport transform** | Maps the canonical cube onto **actual pixels** at the actual resolution |

> [!NOTE]
> OpenGL fuses the first two into the **model-view matrix**, so in practice a vertex is multiplied by *model-view*, then by *projection*, then divided by $w$, then scaled to the viewport. Two matrix multiplies, one divide, one scale — that is the entire fixed-function transform pipeline.

## The four coordinate systems the course names explicitly

| System | Definition | Purpose | Example |
|---|---|---|---|
| **World coordinates** | The **global** system where objects exist in a virtual 3D scene | Defines **absolute position relative to a fixed world origin $(0,0,0)$** | The position of a house or tree in a 3D game |
| **Object coordinates** | Relative to an **individual object's local origin** | Defines the **shape and structure** of an object before it is placed in the world | A car model with its origin at its centre |
| **Physical-device coordinates (NDC)** | A **normalized** system where coordinates map to a standard range (**typically $[-1,1]$ in OpenGL**) | Allows **device-independent rendering** before mapping to actual pixels | After view and projection, a 3D position mapped to a 2D viewport |
| **Window / screen coordinates** | The final **2D pixel coordinates** on the display | Maps the rendered scene to the **actual resolution and pixel grid** | NDC $(-0.5, 0.5)$ → pixel $(200, 400)$ on a $1920\times1080$ display |

> [!INTUITION]
> **Why so many stages?** Each one exists so that a different person can stop caring about something.
> - The **modeller** works in object coordinates and never thinks about the room.
> - The **scene designer** works in world coordinates and never thinks about the camera.
> - The **camera** works in eye coordinates and never thinks about screen resolution.
> - **NDC** exists so the same scene renders identically on a phone and a 4K monitor.
>
> Every boundary is a separation of concerns, paid for by one matrix multiply.

## Why NDC is worth its own stage

Normalized Device Coordinates are **resolution-independent**. Everything up to NDC is pure geometry; only the final viewport transform knows how many pixels the display has. That means:

- the same scene graph renders correctly at any resolution or aspect ratio,
- **clipping** can be done against a fixed canonical cube rather than an arbitrary frustum, which is far cheaper,
- an AR headset can render **two** viewports (one per eye) from one NDC scene by changing only the last step.

> [!TRAP]
> The **perspective divide happens between clip and NDC**, not inside the projection matrix. The projection matrix only *sets up* $w$; the hardware performs $\div w$ afterwards. A question asking "where does the perspective divide occur?" wants **clip → NDC**.

> [!EXAM]
> Two reliable questions. *"List the coordinate systems in the OpenGL pipeline"* — give all six in order. *"Differentiate world and object coordinates"* — object coordinates are **local to the model and define its shape**; world coordinates are **global and define where that model sits in the scene**; the **model transformation** converts one to the other.

---

**Next:** how these objects are represented in code, and the one point-arithmetic operation that *is* legal.
