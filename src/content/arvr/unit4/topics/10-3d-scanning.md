---
subject: arvr
unit: 4
order: 10
slug: 3d-scanning
title: 3D Scanning of Environments
summary: Active and passive capture methods, the reconstruction pipeline from point cloud to mesh, and why AR needs scene geometry at all.
minutes: 13
tags: [3d-scanning, LIDAR, structured-light, time-of-flight, photogrammetry, point-cloud, mesh, occlusion, gap-fill]
---

# 3D Scanning of Environments

> [!NOTE]
> **Source note.** *"3D Scanning of environments"* is a named syllabus item that the CAVE Lab booklet does **not cover at all**. This topic is written from **Schmalstieg & Höllerer, *Augmented Reality: Principles and Practice*** — the evident source of this unit — together with current sensor documentation. If your lecturer issues material for it, treat that as authoritative.

## Why AR needs scene geometry

Tracking answers *"where is the camera?"*. Scanning answers *"what is the scene shaped like?"* — and several things become possible only with the second:

| Capability | Requires |
|---|---|
| **Occlusion** — a real chair hides a virtual ball | **Depth at every pixel** |
| **Physics** — a virtual ball bounces off a real table | A **collision mesh** of the room |
| **Placement** — content sits on a real surface | **Plane detection** |
| **Realistic lighting** — virtual objects lit by the real room | Geometry **and** captured illumination |
| **Persistence** — content stays put between sessions | A **saved spatial map** |

> [!INTUITION]
> Tracking alone gives you a **floating** virtual object — correctly positioned but obviously not *in* the room, because it passes through furniture and casts no shadow. Scanning is what makes it **inhabit** the space. It is the difference between an overlay and an augmentation, and it is exactly the capability WebXR's **hit test** (Unit 2) exposes to the browser.

---

## Active methods — the system emits energy

### Structured light

Project a **known pattern** (stripes, dots, or a pseudo-random speckle) onto the scene and observe how it **deforms**. Deformation encodes depth by triangulation between projector and camera.

- **Example:** the original **Kinect**.
- **Pros:** dense, accurate at close range, works on **textureless** surfaces.
- **Cons:** **indoor only** — sunlight swamps the pattern; limited range; multiple units interfere.

### Time-of-Flight (ToF)

Emit modulated infrared light and measure the **time (or phase shift) of the return** for every pixel.

$$d = \frac{c\,\Delta t}{2}$$

- **Examples:** Kinect v2, phone ToF sensors.
- **Pros:** **direct depth per pixel**, fast, no baseline needed, works in darkness.
- **Cons:** lower spatial resolution; **multipath** errors in corners; struggles with dark, shiny or transparent surfaces.

### LIDAR

Sweeps a laser and times returns, producing a highly accurate point cloud.

- **Examples:** iPhone/iPad Pro LIDAR scanner; survey and automotive units.
- **Pros:** **long range**, high accuracy, works **outdoors** and in darkness.
- **Cons:** sparser than a depth camera; expensive at survey grade; poor on glass and water.

---

## Passive methods — ambient light only

### Stereo vision

Two cameras a **known baseline** apart; match pixels between the views and triangulate. Depth comes from **disparity** — nearer objects shift more between the images.

- **Pros:** cheap, passive, works outdoors, metric scale from the known baseline.
- **Cons:** fails on **textureless** surfaces (nothing to match) — which is exactly where structured light succeeds.

### Photogrammetry / Structure from Motion (SfM)

Many overlapping photographs from different viewpoints; detect and match features across all of them, then jointly solve for camera poses **and** 3D structure by **bundle adjustment**.

- **Pros:** only a normal camera needed; **very high visual fidelity**; scales to buildings and landscapes.
- **Cons:** **offline** — minutes to hours; needs texture and good coverage; **no absolute scale** without a reference object.

> [!NOTE]
> This is the **captured worlds** technique from Unit 3 — the Nimrud Palace reconstruction is photogrammetry. And the mathematics is the same **bundle adjustment** that SLAM's back end runs; the difference is that SLAM must do it in real time on a live stream, while photogrammetry can take all night over a fixed photo set.

---

## The reconstruction pipeline

```
  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
  │① CAPTURE │─▶│② REGISTER│─▶│③ FUSE    │─▶│④ MESH    │─▶│⑤ TEXTURE │
  │  depth / │  │  align    │  │ integrate│  │ extract  │  │ project  │
  │  images  │  │  scans    │  │ into one │  │ surface  │  │ colour   │
  └──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────┘
```

| Stage | What happens |
|---|---|
| **① Capture** | Acquire depth frames or images from many viewpoints |
| **② Registration** | Align them into one coordinate frame — **ICP (Iterative Closest Point)** for depth scans, feature matching for images |
| **③ Fusion** | Integrate into a single volumetric representation — typically a **Truncated Signed Distance Field (TSDF)**, which averages away noise |
| **④ Meshing** | Extract a surface from the volume — **marching cubes** |
| **⑤ Texturing** | Project camera imagery onto the mesh for appearance |

> [!INTUITION]
> **Why fuse into a volume rather than just piling up points?** Because a raw point cloud is noisy, redundant and has no notion of *surface* — you cannot tell inside from outside, so you cannot render occlusion or run physics. A **TSDF** stores, per voxel, the signed distance to the nearest surface; averaging hundreds of noisy observations into that field **cancels the noise**, and the surface is simply where the field crosses zero. **KinectFusion** was the landmark real-time demonstration.

> [!NOTE]
> **Semantic scene understanding** is the modern layer on top. A mesh says *"there is a horizontal surface here"*; a neural network says *"that is a table"*. ARKit's scene reconstruction and plane classification do this, which is what lets an app request *"place this on a floor, not a table"*. It is the same shift from geometry to meaning that the AI topics at the end of this unit are about.

---

## Comparison

| Method | Active/Passive | Range | Outdoors | Textureless surfaces | Real-time |
|---|---|---|---|---|---|
| **Structured light** | Active | Short | ❌ | ✅ | ✅ |
| **Time-of-Flight** | Active | Short–medium | Limited | ✅ | ✅ |
| **LIDAR** | Active | **Long** | ✅ | ✅ | ✅ |
| **Stereo** | Passive | Medium | ✅ | ❌ | ✅ |
| **Photogrammetry / SfM** | Passive | Any | ✅ | ❌ | ❌ **offline** |

> [!TRAP]
> The recurring split is **active methods supply their own light, so they work on blank walls and in the dark; passive methods rely on existing texture, so they fail on a plain white surface but work in sunlight where projected patterns are washed out.** If asked to choose a method, the two questions are: *is there texture?* and *is there sunlight?*

> [!EXAM]
> *"Explain 3D scanning of environments"* — give **active** methods (structured light, ToF, LIDAR) and **passive** methods (stereo, photogrammetry/SfM) with one advantage and one limitation each; then the **five-stage reconstruction pipeline** (capture → register → fuse → mesh → texture), naming **ICP**, **TSDF** and **marching cubes**; and open with **why AR needs it at all** — occlusion, physics, placement, lighting and persistence.

---

**Next:** the other half of Unit 4 — how the user acts on all this.
