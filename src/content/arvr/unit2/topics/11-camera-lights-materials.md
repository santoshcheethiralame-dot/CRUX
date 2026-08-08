---
subject: arvr
unit: 2
order: 11
slug: camera-lights-materials
title: Camera, Lights and Materials
summary: gluLookAt and its nine arguments, light types, material properties, and the modelling–rendering paradigm.
minutes: 12
tags: [camera, gluLookAt, lights, materials, specular, diffuse, modelling-rendering]
---

# Camera, Lights and Materials

## Camera specification

> `glLookAt(3Dlocation, LookAtPoint, UpVector)`

In practice the function is **`gluLookAt`** (a GLU utility function) and it takes **nine** scalars — three vectors of three:

```c
gluLookAt(eyeX, eyeY, eyeZ,        /* where the camera IS      */
          centerX, centerY, centerZ, /* what it is LOOKING AT   */
          upX, upY, upZ);            /* which way is UP         */
```

From the coloured-cube listing: `gluLookAt(0, 0, 10, 0, 0, 0, 0, 1, 0)` — stand at $(0,0,10)$, look at the origin, with $+y$ as up.

> [!INTUITION]
> Three vectors are exactly what a camera needs, and no fewer. **Eye** fixes the position. **Centre** fixes the direction. But those two still leave the camera free to **roll** about its own view axis — so the **up vector** pins the last degree of freedom. Three numbers for position, two for direction, one for roll: six degrees of freedom, which is precisely the **6DOF** you will meet in Unit 3's tracking.

> [!TRAP]
> The **up vector must not be parallel to the view direction** (centre − eye). If it is, the cross product used to build the camera basis is zero and the view matrix is degenerate — the image collapses or vanishes. Looking straight down with up = $(0,1,0)$ is the usual way to hit this.
>
> Also note **`gluLookAt` builds a matrix that transforms the world into the camera's frame** — it is the **view matrix** of Unit 1. It does not "move the camera"; it moves the world so the camera sits at the origin.

## Lights

> **Types of lights:**
> - **Point sources vs distributed sources**
> - **Spotlights**
> - **Near and far sources**

| Light type | Behaviour |
|---|---|
| **Point source** | Radiates equally in all directions from a single position — like a bare bulb |
| **Distributed (area) source** | Emits from a surface rather than a point; produces **soft shadows** |
| **Spotlight** | A point source restricted to a **cone**, with a direction and cutoff angle |
| **Near source** | Close enough that **direction and distance vary** across the object |
| **Far (directional) source** | Effectively at infinity, so all rays are **parallel** — the Sun |

> [!NOTE]
> The near/far distinction is a **cost** decision as much as a physical one. For a far source, the light direction is the **same for every vertex**, so it can be computed once. For a near source it must be recomputed per vertex, along with distance attenuation. This is why directional lights are cheap and point lights are not.

## Materials

> **Material properties:**
> - **Colour absorption**
> - **Diffuse and specular scattering**

| Property | What it controls |
|---|---|
| **Absorption** | Which wavelengths the surface **swallows** — what gives an object its colour |
| **Diffuse scattering** | Light scattered **equally in all directions**; depends on $\mathbf n\cdot\mathbf l$ — the surface's angle to the light. Gives matte appearance |
| **Specular scattering** | Light reflected **mirror-like** toward the viewer; depends on the **viewing direction**. Gives the shiny highlight |
| **Ambient** | A crude constant standing in for light bounced off everything else |

> [!INTUITION]
> **Diffuse asks "how much light lands here?" Specular asks "is the mirror pointing at me?"** That is why diffuse shading is independent of where you stand, while a specular highlight **slides across the surface as you move** — which is exactly what makes it read as *shiny*. It is also why a specular highlight is such a strong depth and material cue in VR.

> [!EXAM]
> A recurring MCQ: *"If you need more shininess on the object, which light property would you change?"* → **Specularity**. And: *"Describe how OpenGL light interacts with material properties to determine the appearance of a 3D object"* — the answer is that **the final colour is the sum of ambient, diffuse and specular contributions**, each being the product of the light's property and the material's corresponding property, with diffuse weighted by $\mathbf n\cdot\mathbf l$ and specular by the viewer direction.

**Setting materials in OpenGL:**

```c
glMaterialfv(GL_FRONT, GL_SPECULAR, spec);    /* vector form — 4 floats */
glMaterialf (GL_FRONT, GL_SHININESS, 50.0f);  /* scalar form — 1 float  */
glEnable(GL_COLOR_MATERIAL);                  /* let glColor drive material */
```

Note the naming rule from the API topic doing its work: **`glMaterialfv`** takes a **f**loat **v**ector; **`glMaterialf`** takes a single float.

## The modelling–rendering paradigm

> **Process:**
> - **a. Modeler** — defines objects.
> - **b. Interface file** — contains **object descriptions, light sources and viewer location**.
> - **c. Renderer** — generates the final image.

```
   ┌──────────┐    ┌──────────────────┐    ┌───────────┐
   │ MODELER  │──▶ │  INTERFACE FILE  │──▶ │ RENDERER  │──▶ image
   │ defines  │    │  objects, lights │    │ generates │
   │ objects  │    │  viewer location │    │ the image │
   └──────────┘    └──────────────────┘    └───────────┘
```

> [!INTUITION]
> This is the **modelling versus rendering** split from the first topic, made into a **system architecture**. The interface file is the seam — and because it is a file, the two halves can be different programs, run on different machines, at different times, by different people.
>
> You already use this: **Blender** is the modeller, a **glTF file** is the interface file, and **Three.js** is the renderer. The paradigm the course describes from the 1990s is exactly the modern web-AR workflow, which is where this unit ends up.

> [!NOTE]
> Notice what the interface file must contain — **objects, light sources and viewer location**. Compare the **four components of a 3D API** from the programmer's-interface topic (objects, viewer, lights, materials). Same list. That is not a coincidence: the interface file has to carry everything the renderer needs to answer *"what colour is this pixel?"*

---

**Next:** how the 3D scene is flattened onto a 2D screen — starting with parallel projection.
