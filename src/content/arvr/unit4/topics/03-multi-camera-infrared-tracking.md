---
subject: arvr
unit: 4
order: 3
slug: multi-camera-infrared-tracking
title: Multiple-Camera Infrared Tracking
summary: The five-stage stereo pipeline — blob detection, epipolar correspondence, triangulation, target matching and absolute orientation.
minutes: 13
tags: [infrared, motion-capture, stereo, epipolar-geometry, triangulation, absolute-orientation, gap-fill]
---

# Multiple-Camera Infrared Tracking

> [!NOTE]
> **Source note.** The CAVE Lab booklet names this syllabus item and describes it in a single line — *"uses retro-reflective spheres and IR cameras for motion capture"* — but the **pipeline** appears only inside one MCQ. This topic reconstructs it from that MCQ's stages plus the standard treatment in **Schmalstieg & Höllerer, *Augmented Reality: Principles and Practice***, which is clearly the source of this unit.

## The setup

> **Infrared tracking** uses **retro-reflective spheres and IR cameras for motion capture**.

```
     IR camera ──┐                    ┌── IR camera
     + IR ring   │    ●  ●            │   + IR ring
      light      │      ●             │     light
                 └──▶  rigid body ◀───┘
                     (3+ retro-reflective
                      spheres in a known,
                      asymmetric pattern)
```

**How the spheres become bright dots.** Each camera is ringed with **infrared LEDs**. **Retro-reflective** material returns light **straight back toward its source**, so from the camera's viewpoint the spheres blaze while everything else stays dark. With a short exposure and an IR-pass filter, the image is essentially **white dots on black** — a detection problem so easy it can run at 200–400 Hz.

> [!INTUITION]
> This is the same instinct as marker tracking's thresholding step, pushed into hardware. Rather than making the *software* robust to a messy image, you **engineer the image to be trivial**. That is why optical motion capture is the most accurate tracking technology in common use — sub-millimetre, sub-millisecond — and why it needs a dedicated room.

---

## The five-stage pipeline

| Stage | What happens |
|---|---|
| **① Blob detection** | Perform **blob detection in all images** to locate the spheres of the rigid-body markers. Output: 2D centroids per camera |
| **② Point correspondence** | **Establish point correspondences between blobs** across cameras — using **epipolar geometry** |
| **③ Triangulation** | Intersect the rays from corresponding blobs to get **3D candidate points** |
| **④ Target matching** | **Match 3D candidate points to the known 3D target points** of each rigid body |
| **⑤ Pose determination** | Determine the **target's pose using absolute orientation** |

### Stage 2 — why epipolar geometry

> [!TRAP]
> A course MCQ asks directly: *"in the stereo camera tracking pipeline, what is the purpose of the step involving epipolar geometry?"* The answer is **to establish point correspondences between blobs** — not to detect blobs, not to compute the pose.

The problem it solves: camera A sees five bright dots, camera B sees five bright dots. **Which dot is which?** Naively there are $5! = 120$ possible pairings.

**The epipolar constraint** collapses this. For a point seen at $\mathbf{x}_A$ in camera A, its image in camera B **must lie on a single line** — the *epipolar line* — determined by the two cameras' relative pose:

$$\mathbf{x}_B^{\mathsf T}\,F\,\mathbf{x}_A = 0$$

where $F$ is the **fundamental matrix** obtained during calibration.

> [!INTUITION]
> The epipolar line is just the **image of the ray**. Camera A knows the point lies somewhere along a ray from its optical centre; camera B, watching that ray from the side, sees it as a **line**. So the match must be on that line — turning a 2D search into a **1D** one, and usually leaving exactly one candidate.

### Stage 3 — triangulation

With the correspondence established, the two rays are intersected. In practice they never meet exactly (noise), so the **closest point between the skew rays** is taken — or a least-squares solution across all cameras that see the blob.

> [!NOTE]
> **Why more than two cameras?** **Occlusion.** A performer's arm will hide a sphere from some viewpoint at some moment. With 8–24 cameras, any given sphere is visible to several at all times, so the system degrades gracefully instead of dropping the marker. Extra cameras also **overdetermine** the triangulation, improving accuracy.

### Stage 4 — matching to the target

Triangulation gives an **unlabelled cloud** of 3D points. Which belong to the head-mounted rig and which to the controller? The answer is in the **rigid-body constraint**: the distances between a body's own spheres are **fixed and known**. The system searches for a subset of points whose mutual distances match a registered body's signature.

> [!INTUITION]
> This is why marker constellations are deliberately **asymmetric and unique** — each rigid body gets a different arrangement of spheres so its distance signature is unambiguous. A symmetric arrangement would be identifiable but **its orientation would not be**, exactly like a marker square without an interior pattern.

### Stage 5 — absolute orientation

The final step: given the known 3D points in the **body's own frame** and the corresponding measured points in the **world frame**, find the rotation $R$ and translation $\mathbf t$ that best align them.

$$\min_{R,\ \mathbf t}\ \sum_i \big\lVert (R\,\mathbf p_i + \mathbf t) - \mathbf q_i \big\rVert^2$$

This is the **absolute orientation problem**, and it has a **closed-form solution** (Horn's method, or via SVD) — no iteration, no initial guess.

> [!NOTE]
> **Note the difference from marker tracking.** There, pose came from **3D↔2D** correspondences (a PnP problem) because you had one camera. Here you have already triangulated, so it is **3D↔3D** — an easier, closed-form problem. Multiple cameras buy you that simplification, along with the accuracy.

---

## Characteristics

| | |
|---|---|
| **Advantages** | **Sub-millimetre accuracy**, very **high update rates** (200–400 Hz), **low latency**, robust to lighting since the system supplies its own IR illumination, and **many bodies tracked simultaneously** |
| **Limitations** | **Fixed installation** and expensive; confined to the **calibrated volume**; requires **line of sight** from at least two cameras; markers must be **worn**; defeated by other IR sources (sunlight, some remote controls) and by reflective surfaces |

**Where it is used:** film and game **motion capture**, biomechanics and gait analysis, **VR research labs**, surgical navigation, and as **ground truth** for evaluating other tracking systems.

> [!EXAM]
> *"Explain the steps involved in the multi-camera tracking pipeline"* is question 1 in the course's own question bank. Give the **five stages in order** — blob detection → **epipolar correspondence** → triangulation → target matching → **absolute orientation** — with one line each. Be explicit that **epipolar geometry solves correspondence** and that **absolute orientation is 3D↔3D with a closed-form solution**; those two facts are what the question is testing.

---

**Next:** what to do when you cannot put markers on anything.
