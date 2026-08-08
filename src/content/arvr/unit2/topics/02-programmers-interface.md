---
subject: arvr
unit: 2
order: 2
slug: programmers-interface
title: The Programmer's Interface
summary: The API as the bridge to hardware, the pen-plotter model, the raster-based 2D model, and what a three-dimensional API must specify.
minutes: 13
tags: [API, pen-plotter, raster, framebuffer, 3D-API, drivers]
---

# The Programmer's Interface

## The API

> - **Graphics systems are accessed through Application Programming Interfaces (APIs).**
> - **The API connects an application program to the graphics system.**
> - **Software drivers convert API output to hardware-specific instructions.**

```
   APPLICATION  ──▶  API (OpenGL / Direct3D)  ──▶  DRIVER  ──▶  HARDWARE (GPU)
   "draw a red         a standard, portable        vendor-       actual
    triangle here"     description                 specific      pixels
```

> [!INTUITION]
> The API exists so your program does not have to know whether it is talking to an NVIDIA, AMD or Intel GPU. **You describe *what* you want; the driver decides *how*.** This is exactly the same separation of concerns as the coordinate pipeline in Unit 1 — each layer is allowed to stop caring about something.

---

## Model 1 — The pen plotter model

> A pen-based plotting system creates images by **physically moving a pen across paper**, following specified coordinates to generate drawings. This method was widely used in early computer graphics and is still applied in fields such as **architectural drafting and CNC plotting**.

**The two functions — this is the entire API:**

| Function | Effect |
|---|---|
| `moveto(x, y)` | **Moves the pen** to the specified coordinate **without drawing** |
| `lineto(x, y)` | **Draws a line** from the current position to the specified coordinate |

These allow **precise vector-based drawing**, useful where technical accuracy matters — engineering schematics, blueprint plotting.

**Limitations:**

- **Does not extend well to 3D graphics** — it operates strictly in a 2D coordinate space.
- **Lacks real-time rendering capabilities**, making it unsuitable for modern interactive applications like gaming and simulations.
- Compared to digital raster displays, it is **slower and less adaptable** for complex visual effects.

> [!NOTE]
> Notice the model is **stateful**: `lineto` draws from *"the current position"*, which is remembered between calls. That idea never went away — OpenGL is also a **state machine** (current colour, current matrix, currently bound buffer), and it is the source of a whole class of bugs where a call behaves differently depending on what happened earlier.

---

## Model 2 — The alternative raster-based 2D model

> The raster-based 2D model operates by **directly manipulating pixels in a framebuffer**, which is a memory buffer that holds image data before it is displayed on screen. Instead of defining shapes through geometric primitives like lines and curves, this approach **modifies individual pixels** — making it the foundation of **bitmap graphics and digital displays**.

**The key function:**

```c
write_pixel(x, y, color);
```

- Sets the pixel at $(x,y)$ to a specified colour.
- Used for drawing points, lines and shapes by modifying pixel values in the framebuffer.

**Advantages:**

- **Fine-grained control** over the image — complex effects such as **shading, anti-aliasing and texturing**.
- Efficient for **image processing, digital painting and GUI rendering**, where direct pixel manipulation is required.
- Supports **blending and filtering**, making it suitable for photo editing and special effects.

**Limitations:**

- **Less efficient for scalable vector graphics** — resizing causes **pixelation**.
- **Lacks structural information** about objects, making shape manipulation more complex than in vector approaches.
- **Memory-intensive** for high-resolution displays — every pixel requires storage and processing.

> [!INTUITION]
> **Vector vs raster, in one line:** the pen plotter stores *"a line from here to there"*; the framebuffer stores *"these two million pixels are these colours."* One scales to any resolution and cannot be blurred; the other can represent a photograph. Modern systems use **both** — geometry travels down the pipeline as vectors and is **rasterized** into pixels at the very end.

> [!EXAM]
> *"Compare the pen plotter model and the raster-based 2D model"* is a clean 5-marker. Structure it as: the defining function (`moveto`/`lineto` vs `write_pixel`), what is stored (geometry vs pixels), two advantages each, two limitations each, and one line on where each is used today.

---

## Model 3 — Three-dimensional APIs

> **OpenGL, Direct3D, Open Scene Graph.**

**Key components** — a 3D API must let you specify all four:

| Component | Specified by |
|---|---|
| **a. Objects** | Defined by **sets of vertices** |
| **b. Viewer** | **Camera position & orientation** |
| **c. Light sources** | **Directional, spot, point** lights |
| **d. Material properties** | **Absorption, scattering, diffuse/specular reflection** |

**Supported primitives:** **points, line segments, polygons, quadrics, parametric polynomials.**

> [!INTUITION]
> Those four components are exactly the four things you need to answer *"what colour is this pixel?"* — **what is there** (objects), **where am I looking from** (viewer), **what is illuminating it** (lights), and **how does the surface respond to light** (materials). Remove any one and the question is unanswerable. Every graphics API since has the same four, whatever it calls them; in Three.js they are `Mesh`, `Camera`, `Light` and `Material`.

> [!TRAP]
> Do not confuse the **API** with the **library**. OpenGL is a *specification* (an API); GLEW and GLUT are *libraries* that make it usable; the *driver* implements it. A question asking "what is the role of the API" wants **the bridge between application and graphics system** — not "it draws triangles".

---

**Next:** what the hardware on the other side of that interface actually looks like.
