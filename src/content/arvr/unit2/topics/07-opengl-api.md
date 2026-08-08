---
subject: arvr
unit: 2
order: 7
slug: opengl-api
title: The OpenGL API — GL, GLEW and GLUT
summary: The six categories of API function, what GL, GLEW and GLUT each provide, and how to read an OpenGL function name.
minutes: 12
tags: [OpenGL, GLEW, GLUT, API-categories, function-naming, state-machine]
---

# The OpenGL API — GL, GLEW and GLUT

## The graphics system as a black box

> **The graphics system is a black box handling output generation and user input.**

Your application pushes primitives and attributes in; images come out and events come back.

## The six categories of API functions

Every function in a graphics API falls into one of these six groups. **This list is directly examinable.**

| # | Category | Examples |
|---|---|---|
| **1** | **Primitive Functions** | Lines, Polygons, Triangles, Quads |
| **2** | **Attribute Functions** | Colors, Fills |
| **3** | **Viewing Functions** | Camera View, Orthographic, Perspective Projections |
| **4** | **Transformation Functions** | Rotation, Translation, Scaling, Shear |
| **5** | **Input Functions** | Keyboards, Mice, Data Tablets |
| **6** | **Control Functions** | Multiprocessing, Multi-window Environments, Error Handling |

> [!INTUITION]
> The six categories answer six questions: **what shapes?** (primitives) · **what do they look like?** (attributes) · **from where?** (viewing) · **positioned how?** (transformations) · **how does the user act?** (input) · **how is the program managed?** (control). Any graphics API you ever meet will have all six, whatever it names them.

## The three libraries

> In OpenGL, the core functions responsible for rendering graphics are contained within the **GL (Graphics Library)**, which provides a comprehensive set of tools for handling 2D and 3D rendering. However, **since OpenGL itself does not directly handle operating system-specific tasks**, additional libraries are often required.

| Library | Full name | What it provides |
|---|---|---|
| **GL** | Graphics Library | The **core rendering functions** — 2D and 3D drawing |
| **GLEW** | **OpenGL Extension Wrangler Library** | **Simplifies access to modern OpenGL features** by **managing extensions** and eliminating platform-specific dependencies — you get the latest functionality **without manually handling extension loading** |
| **GLUT** | **OpenGL Utility Toolkit** | **Window management, input handling and basic event-driven functionality** — abstracts away lower-level system interactions, making it easy to create/manage windows, handle user input and manage rendering loops |

> Together, these libraries **enhance OpenGL's usability and provide a more accessible framework for graphics programming across different platforms.**

> [!INTUITION]
> **Why isn't windowing part of OpenGL?** Because OpenGL is deliberately **operating-system agnostic** — it knows how to draw, not how to open a window, because windows work differently on Windows, macOS and Linux. That is the same separation-of-concerns discipline you saw with the API/driver split: OpenGL draws; **GLUT** deals with the OS; **GLEW** deals with the fact that different GPUs expose different optional features.

> [!TRAP]
> Don't say "GLUT is part of OpenGL". GLUT and GLEW are **separate helper libraries**. A question asking *"why are GLEW and GLUT needed alongside OpenGL?"* wants: OpenGL **does not handle OS-specific tasks** — GLUT supplies **windowing and input**, GLEW supplies **extension management**.

## Function naming

> **OpenGL function format:** `glSomeFunction*();`

OpenGL names encode the argument types in the name itself, because C has no function overloading:

```
        glVertex 3 f v
        │        │ │ │
        │        │ │ └── v = arguments passed as a VECTOR (an array)
        │        │ └──── f = data type: f float, d double, i int, s short
        │        └────── 3 = number of components (2, 3 or 4)
        └─────────────── gl = the core GL library prefix
```

| Call | Meaning |
|---|---|
| `glVertex2f(x, y)` | 2 components, **float** |
| `glVertex3f(x, y, z)` | 3 components, float |
| `glVertex3fv(array)` | 3 float components, passed as a **vector** |
| `glVertex2dv(array)` | 2 **double** components, as a vector |
| `glColor3f(r, g, b)` | RGB colour as three floats |

**Prefixes tell you the library:** `gl` → core GL · `glu` → GL Utility (e.g. `gluLookAt`, `gluPerspective`) · `glut` → GLUT toolkit (e.g. `glutInit`, `glutMainLoop`).

> [!EXAM]
> A recurring MCQ: *"What is the difference between `glColor3d` and `glColor3f`?"* → **`glColor3d` takes double arguments, `glColor3f` takes float arguments.** Both set R, G and B (three components). The distractors — "3d means 3-dimensional colour operations", "one is real space and the other integer space" — misread the suffix as meaning something semantic. **The suffix is always *count* then *type*.**

## OpenGL is a state machine

A detail worth internalising early, because it explains a whole class of bugs:

```c
glColor3f(1.0, 0.0, 0.0);   /* set the CURRENT colour to red   */
glVertex3f(0, 0, 0);        /* this vertex is red              */
glVertex3f(1, 0, 0);        /* so is this one — colour persists */
glColor3f(0.0, 1.0, 0.0);   /* current colour is now green     */
glVertex3f(1, 1, 0);        /* this vertex is green            */
```

Colour, the current matrix, the bound buffer and dozens of other settings are **global state** that persists until changed.

> [!TRAP]
> This is the **pen-plotter statefulness** from the programmer's-interface topic, grown up. It means **the same drawing code produces different output depending on what ran before it** — the classic cause of "my object is the wrong colour" or "my transform is applied twice". The discipline is to **push and pop state** around anything you change (`glPushMatrix`/`glPopMatrix`), which is precisely why those functions exist.

---

**Next:** the primitives and attributes those functions specify.
