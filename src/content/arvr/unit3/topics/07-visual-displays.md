---
subject: arvr
unit: 3
order: 7
slug: visual-displays
title: Visual Displays and Spatial Display Models
summary: Optical see-through, video see-through and spatial projection — how each works, what each costs, and the world-fixed versus user-fixed distinction.
minutes: 14
tags: [displays, OST, VST, CAVE, spatial-projection, HoloLens, world-fixed, user-fixed]
---

# Visual Displays and Spatial Display Models

> **Displays are responsible for presenting digital content to users** — either by **overlaying it onto the physical world (AR)** or by **replacing the user's view with a fully virtual environment (VR)**.

Three display models, and the choice determines almost everything else about the system.

---

## 1. Optical See-Through (OST) head-mounted displays

> These allow users to **see the real world directly through transparent or semi-transparent lenses**, onto which **virtual content is projected**.
>
> **Example: Microsoft HoloLens** — superimposes 3D holograms onto the physical environment.

```
   real world ──────────────────────▶ ╲          ╱ ──▶ eye
                                       ╲ half-  ╱
   display ──▶ projected image ────────▶ silvered
                                         combiner
```

| | |
|---|---|
| **Advantages** | The real world is seen **directly** — full resolution, zero latency, natural depth and peripheral vision. **Safe**: if the device fails, the user can still see. |
| **Limitations** | Virtual content is **additive only** — it cannot make anything darker, so **true black is impossible** and holograms look **ghostly/translucent**. Typically a **narrow field of view**. **Registration errors are glaringly visible** against the real world. Requires per-user **calibration** of the eye position. |

> [!INTUITION]
> The key limitation is worth understanding physically: an optical combiner **adds** light. There is no way to *subtract* light from the real world, so a virtual object can never **occlude** what is behind it — you always see the wall through the hologram. This is why OST content looks like a ghost, and why "occlusion handling" is a hard open problem in AR.

## 2. Video See-Through (VST) head-mounted displays

> VST HMDs **use cameras to capture the real-world view**, which is then **combined with digital content and displayed to the user on internal screens**. This allows **full control over the visual feed** but **may introduce latency**.
>
> **Example: Oculus Rift and HTC Vive.**

```
   real world ──▶ camera ──▶ ┌──────────┐ ──▶ internal ──▶ eye
                              │ COMPOSITE│     display
   virtual content ─────────▶ └──────────┘
```

| | |
|---|---|
| **Advantages** | The system controls **every pixel**, so virtual objects can **properly occlude** the real world, and the real and virtual can be **colour-matched and lit consistently**. Easier to align, because both are digital images. |
| **Limitations** | **Latency** — the real world is delayed by the camera-and-display pipeline. Real-world **resolution, dynamic range and field of view are limited by the cameras**. **Unsafe on failure** — if the device dies the user is blind. Camera position differs from eye position, causing **parallax error**. |

> [!TRAP]
> The course lists **Oculus Rift and HTC Vive** as VST examples. Strictly, those are **VR headsets** — fully occluding displays that became video-see-through only once passthrough cameras were added. The clean modern examples of VST are **Meta Quest 3** and **Apple Vision Pro**. Reproduce the course's examples in an exam, but understand the distinction: **VST is a *technique*, and any occluding headset with cameras can do it.**

## 3. Spatial projection systems

> These **project virtual images directly onto physical surfaces or into the surrounding environment**, enabling mixed-reality experiences **without the need for headsets**.
>
> **Example: CAVE systems (Cave Automatic Virtual Environment)** project immersive visuals onto the **walls and floors of a room-sized cube**.

| | |
|---|---|
| **Advantages** | **No headset** — nothing worn, no hygiene or comfort issue, no isolation. **Naturally multi-user**: everyone in the room sees it and can see each other. Users see their **own hands and bodies**. |
| **Limitations** | **Fixed installation**, expensive, and **not portable**. The projection is only correct from **one tracked viewpoint** — other viewers see a distorted image. Cannot project onto arbitrary or moving surfaces. **Ambient light** washes it out. |

> [!NOTE]
> **CAVE** is a recursive acronym (*CAVE Automatic Virtual Environment*) and a deliberate reference to Plato's allegory of the cave. It is also the origin of the name of the **CAVE Lab at PESU** that produced this course's booklet.

---

## The comparison

| | **OST** | **VST** | **Spatial projection** |
|---|---|---|---|
| Real world reached the eye by | **Directly**, through optics | **Via cameras** and a screen | **Directly** — it *is* the real world |
| Occlusion of real by virtual | ❌ impossible | ✅ full control | Partial (projected onto surfaces) |
| Real-world latency | **Zero** | **Non-zero** | Zero |
| Field of view | Typically narrow | Camera-limited | Very wide (room-scale) |
| Safety on failure | **Safe** — still see | **Unsafe** — blind | Safe |
| Portability | Wearable | Wearable | **Fixed installation** |
| Multi-user | One per headset | One per headset | **Naturally shared** |
| Example | **HoloLens** | **Rift / Vive** (passthrough) | **CAVE** |

> [!EXAM]
> *"Explain the spatial display models used in AR/VR"* or *"Differentiate optical see-through and video see-through displays"* — a guaranteed question. Give the mechanism, one advantage, one limitation and the named example for each of the three. The single strongest discriminating fact: **OST cannot occlude the real world and has zero real-world latency; VST can occlude but adds latency.**

---

## World-fixed versus user-fixed displays

A second classification, cutting across the first — **where does the content stay put?**

| | **World-fixed** | **User-fixed** |
|---|---|---|
| Content is anchored to | **The real environment** | **The user** (head, body or device) |
| When the user moves | Content **stays where it is** | Content **moves with them** |
| Requires | Full **6DOF tracking and registration** | Little or no world tracking |
| Example | A hologram sitting on a real table; a CAVE projection | A HUD overlay; a head-locked menu |

> [!TRAP]
> A course MCQ asks for *"the primary distinction between world-fixed and user-fixed displays"*. The answer is that **world-fixed displays remain fixed in the physical environment while user-fixed displays dynamically adjust with the user's movements**. The distractor reverses this — read carefully.

> [!INTUITION]
> This distinction is the display-side statement of **registration**. World-fixed content *must* be registered in 3D and therefore demands accurate tracking; user-fixed content does not. It is also why a heads-up display is **not AR** by the three-requirements test from the first topic — it is user-fixed, so it fails requirement 3.
>
> In Unit 4 this reappears as the **placement taxonomy**: head-referenced, torso-referenced and hand-referenced interfaces are all *user-fixed*; content anchored to a table is *world-fixed*.

---

**Next:** the sensors and computers behind the display.
