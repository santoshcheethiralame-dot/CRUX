---
subject: arvr
unit: 2
order: 1
slug: intro-computer-graphics
title: Introduction to Computer Graphics
summary: Modelling versus rendering, the seven application areas, and where the graphics system sits between them.
minutes: 9
tags: [computer-graphics, modelling, rendering, applications]
---

# Introduction to Computer Graphics

## The two halves of the subject

> The process of computer graphics involves the **creation, manipulation and storage of geometric objects — known as modelling** — along with the **generation of their corresponding images — referred to as rendering**.

| | **Modelling** | **Rendering** |
|---|---|---|
| Concerned with | Defining the **shape, structure and properties** of objects in a virtual space | Transforming those models into **visually perceivable images** |
| Techniques | Mathematical representations, **mesh-based structures**, procedural generation | **Lighting, shading, texturing, rasterization** |
| Output | A description (vertices, topology, materials) | Pixels |
| Question answered | *"What is there?"* | *"What does it look like from here?"* |

Once rendered, images can be **displayed on screens** for interactive applications such as video games and simulations, or **stored for output on hardcopy devices** like printers and plotters.

> [!INTUITION]
> Modelling is writing the script; rendering is filming it. The same model renders differently from a different camera, under different lights, at a different resolution — and that separation is deliberate. It is why the **modelling–rendering paradigm** (a later topic) splits them into separate programs joined by an interface file, and why a Blender model can be exported into Three.js and still look like itself.

> [!NOTE]
> This split maps directly onto Unit 1. **Modelling lives in object coordinates** — the model knows nothing about the room or the viewer. **Rendering is the journey through world, eye, clip, NDC and window coordinates.** Unit 1 built the coordinate machinery; Unit 2 is what you do with it.

## Applications of computer graphics

The seven named in the course:

| Application | Example |
|---|---|
| **Data visualization** | Graphs, charts |
| **Computer-Aided Design (CAD)** | Mechanical drawings, architecture |
| **Virtual Reality (VR) environments** | The subject of Units 3 and 4 |
| **Education & training** | Simulators, interactive anatomy |
| **Entertainment** | Animations, games |
| **Image processing** | Filtering, enhancement, compositing |
| **Graphical User Interfaces (GUI)** | Every window you have ever clicked |

> [!EXAM]
> A common 3–4 mark opener: *"What is computer graphics? List its applications."* Define it as **modelling + rendering** (give one line each), then list the seven applications. Adding one concrete example per application is what turns a pass into full marks.

## Why this unit exists

Unit 1 gave you objects and transformations as *mathematics*. This unit is about the **system** that turns them into pixels:

1. **How does an application talk to the graphics hardware?** → the **programmer's interface** (an API)
2. **What does the hardware actually do with the data?** → **graphics architectures** and the **pipeline**
3. **How do I write such a program?** → **OpenGL** — primitives, attributes, control functions
4. **How do I get 3D onto a 2D screen?** → **projection**
5. **How is any of this done in 2026?** → **Three.js, Blender, React Three Fiber and WebXR**

Points 1–4 are the classical, examinable core; point 5 is how the same ideas appear in modern browser-based AR/VR — which is what you will actually build with.

---

**Next:** the interface between an application and the graphics system.
