---
subject: arvr
unit: 2
order: 13
slug: perspective-projection
title: Perspective Projection
summary: Converging projectors, vanishing points, one/two/three-point perspective, and the full eight-row comparison with parallel projection.
minutes: 12
tags: [projection, perspective, vanishing-point, foreshortening, gluPerspective, comparison]
---

# Perspective Projection

## The idea

> Perspective projection is commonly used in **artistic and realistic 3D renderings** to create a **sense of depth**, making images appear more natural. Unlike parallel projection, where projectors remain parallel, perspective projection uses **projectors that converge at a single point, known as the Centre of Projection (COP)**. This **mimics how the human eye perceives the world** — objects appear smaller as they move farther away, resulting in a realistic depth effect.

**Key characteristics:**

- **Vanishing points**, where parallel lines appear to converge in the distance.
- **Perspective foreshortening**, where objects shrink as they recede into the background, enhancing realism.

```
        PERSPECTIVE                        PARALLEL
   projectors converge at COP        projectors stay parallel

        ╲    │    ╱                      │  │  │  │
         ╲   │   ╱                       │  │  │  │
          ╲  │  ╱                        │  │  │  │
           ╲ │ ╱                         ▼  ▼  ▼  ▼
            ╳  COP                     ────────────
```

> [!DERIVE]
> **Where the shrinking comes from.** With the eye at the origin looking down $-z$ and a view plane at $z = -d$, similar triangles give the projected coordinates of a point $(x, y, z)$:
> $$x_p = \frac{x}{z/(-d)} = \frac{-d\,x}{z}, \qquad y_p = \frac{-d\,y}{z}$$
> The **division by $z$** is the entire effect: double the depth and the projected size halves. In homogeneous form this is arranged so the fourth component carries $z$, and the **perspective divide** at the clip → NDC stage performs the division — which is exactly why homogeneous coordinates were worth introducing in Unit 1.

## Types of perspective projection

Classified by **how many axes are not parallel to the view plane**, which equals the number of vanishing points.

### 1. One-point perspective

- Has a **single vanishing point** where all receding lines converge.
- Common in **hallways, roads and railway tracks**, where depth extends in one direction.
- Frequently used in **architectural and interior design sketches**.

### 2. Two-point perspective

- Uses **two vanishing points**, typically positioned on the horizon.
- Common for 3D objects like **buildings and furniture**, providing a more natural representation of depth.
- Offers a **dynamic and balanced composition**, often used in **game design and animations**.

### 3. Three-point perspective

- Introduces a **third vanishing point**, either **above or below the horizon**, creating a sense of **height or depth**.
- Used for **skyscrapers, aerial views** or extreme perspective angles.
- Creates **dramatic effects**, often seen in **cinematic visuals and comic book illustrations**.

> Perspective projection plays a crucial role in creating **immersive 3D environments**, offering a balance between **realism and artistic expression** in graphics, gaming and visual storytelling.

> [!INTUITION]
> **How to count vanishing points fast:** look at a cube and count how many sets of its parallel edges run *into* the picture rather than across it. Face the cube square-on → only the depth edges recede → **one** point. Turn it so you see two faces → two sets recede → **two** points. Now also look *up* at it → the vertical edges recede as well → **three** points.

## The comparison table

Reproduce this in full — it is the highest-value item in the topic.

| # | **Parallel Projection** | **Perspective Projection** |
|---|---|---|
| 1 | Represents objects **like a telescope** | Represents objects in a **3D realistic way** |
| 2 | **No depth effects** | **Distant objects appear smaller** |
| 3 | Distance from the centre of projection is **infinite** | Distance is **finite** |
| 4 | Provides **accurate object dimensions** | **Distorts dimensions** due to perspective |
| 5 | Projection lines are **parallel** | Projection lines **converge** |
| 6 | Projectors **remain parallel** | Projectors are **not parallel** |
| 7 | Two types: **Orthographic, Oblique** | Three types: **One-, Two- and Three-point perspective** |
| 8 | **Does not create realistic views** | **Creates realistic views** |

> [!INTUITION]
> Row 3 is the one that explains all the others. **Parallel projection is perspective projection with the eye moved infinitely far away** — at infinite distance the projectors from a finite object become parallel, and foreshortening vanishes. Everything else in the table follows from that single fact.

## In OpenGL

```c
glMatrixMode(GL_PROJECTION);
glLoadIdentity();
gluPerspective(fovy, aspect, near, far);
```

| Argument | Meaning |
|---|---|
| `fovy` | **Field of view** in degrees, measured **vertically** |
| `aspect` | Width ÷ height of the viewport |
| `near`, `far` | Distances to the near and far **clipping planes** |

The view volume is a **frustum** — a pyramid with its tip at the eye and its top sliced off by the near plane.

> [!TRAP]
> **`near` must be greater than zero**, and the ratio `far / near` should be kept as small as the scene allows. Depth-buffer precision is distributed **non-linearly** — most of it is spent near the camera — so a tiny `near` value (like the `0.001` in the course's cube listing) starves distant geometry of precision and produces **z-fighting**: surfaces flickering as the depth test flips between them. In VR this is especially visible and especially unpleasant.

> [!NOTE]
> **Why field of view matters in VR.** In a normal application `fovy` is an aesthetic choice. In a headset it is **dictated by the optics** — it must match the physical lenses and the user's inter-pupillary distance, or the virtual world will appear the wrong scale and induce discomfort. A course question asks you to *"simulate a camera with an adjustable focal length, which influences the field of view of the perspective projection"* — the link is that **a longer focal length means a narrower `fovy`**, flattening the scene; a shorter one widens it and exaggerates depth.

> [!EXAM]
> Two guaranteed questions. *"Differentiate parallel and perspective projection"* — reproduce the eight-row table. *"Explain the types of perspective projection"* — one, two and three-point, each with its vanishing-point count, a use case and an example. Adding the "one vanishing point per receding axis" rule shows you understand rather than memorised.

---

**Next:** the modern half of the unit — the same ideas in the browser, starting with Three.js.
