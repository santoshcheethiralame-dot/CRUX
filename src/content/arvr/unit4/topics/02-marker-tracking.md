---
subject: arvr
unit: 4
order: 2
slug: marker-tracking
title: Marker Tracking
summary: The five-stage marker tracking pipeline, why a square marker gives full 6DOF from one image, and where marker tracking still wins.
minutes: 12
tags: [marker-tracking, fiducial, ARToolKit, thresholding, homography, pose-estimation, pipeline]
---

# Marker Tracking

> **Marker-based tracking** uses **predefined visual markers** — e.g. QR-like patterns — **for anchoring digital objects**. It offers **high precision with physical markers**.

## The pipeline

The course's figure shows the five stages. This sequence is directly examinable.

```
  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
  │ ① CAMERA │──▶│ ② THRESH-│──▶│ ③ DETECT │──▶│ ④ POSE   │──▶│ ⑤ RENDER │
  │   IMAGE  │   │   OLD    │   │  MARKER  │   │ ESTIMATE │   │  CONTENT │
  └──────────┘   └──────────┘   └──────────┘   └──────────┘   └──────────┘
   the scene      binary         find square    recover 6DOF    draw the
   as captured    black/white    contours and   camera pose     virtual
                  image          identify the   relative to     object on
                                 pattern        the marker      the marker
```

| Stage | What happens |
|---|---|
| **① Capture** | Grab the camera frame |
| **② Thresholding / binarization** | Convert to a **binary black-and-white image**. Markers are deliberately high-contrast so this is robust |
| **③ Detection & identification** | Find **connected components and quadrilateral contours**; extract the four corners; read the interior pattern to **identify which marker** it is |
| **④ Pose estimation** | From the four known corner positions, compute the **homography**, then decompose it into the **6DOF pose** of the camera relative to the marker |
| **⑤ Rendering** | Set the model-view matrix from that pose and draw the virtual object so it sits on the marker |

> [!INTUITION]
> **Why four corners are enough for full 6DOF.** The marker is a **square of known size**, so you know the 3D coordinates of its four corners in the marker's own frame. You observe where those four points land in the image. Four 3D↔2D correspondences are sufficient to solve for the camera's position and orientation — this is a small **Perspective-n-Point (PnP)** problem.
>
> That is the whole magic of markers: **known geometry converts a single image into an absolute pose**, with no history, no map and no motion required.

> [!NOTE]
> **Why the pattern inside matters.** The square gives you the *pose*; the interior pattern gives you the **identity** and resolves the **four-fold rotational ambiguity** — without it, a square looks the same rotated by 90°, and the virtual object would snap between four orientations.

## Why marker tracking is so reliable

| Property | Consequence |
|---|---|
| **High contrast, known shape** | Thresholding and contour finding are cheap and robust |
| **Known metric size** | Gives **absolute scale** — a monocular camera cannot otherwise recover it |
| **Known geometry** | Pose from a **single frame**, no initialisation and no drift |
| **Unique identity** | Multiple markers can coexist and be told apart |
| **Stateless** | Loses tracking and recovers instantly — nothing to re-initialise |

> [!INTUITION]
> **Scale is the underrated one.** A single camera watching natural features can recover the *shape* of a scene and the camera's motion, but **not how big anything is** — a doll's house and a real house produce identical images. Markers dissolve that ambiguity for free, because you told the system the marker is 8 cm across. It is why marker AR gets object size right and monocular SLAM often does not.

## Limitations

- **Requires clear line of sight** — occlude part of the marker and detection fails.
- **Affected by lighting** — glare, shadow across the marker, or very low light break thresholding.
- **Motion blur** destroys the sharp edges the detector needs.
- **The environment must be prepared** — someone has to print and place the marker.
- **Visually intrusive** — a black-and-white square in the middle of your product photo.

## Where it still wins

Despite being the oldest technique, marker tracking has not gone away:

| Use | Why markers |
|---|---|
| **Industrial and medical** | Certifiable, repeatable **accuracy**; the environment is controlled anyway |
| **Print and packaging AR** | The marker is the product — a book cover, a card, a label |
| **Ground truth** | Used to **evaluate** markerless systems, because marker pose is trustworthy |
| **Initialisation** | Bootstraps a SLAM map with correct **absolute scale** |
| **Multi-user alignment** | Two headsets seeing one marker instantly share a **common origin** |

> [!NOTE]
> **ARToolKit** is the named example — the open-source library that popularised marker-based AR and defined this pipeline. Its black-square-with-pattern design is still the reference, and modern successors (ArUco, AprilTag) are refinements of the same idea with better error-correcting codes.

> [!EXAM]
> Likely question: *"Explain the marker tracking pipeline."* Give the **five stages in order** with one line each, then explain **why four corners of a known square yield 6DOF** (a PnP problem with known geometry), then two advantages (**absolute scale, stateless recovery**) and two limitations (**line of sight, lighting**). Mentioning that the interior pattern supplies **identity and resolves the 90° ambiguity** is the detail that marks out a complete answer.

---

**Next:** the industrial-grade version — many cameras, infrared, and retro-reflective spheres.
