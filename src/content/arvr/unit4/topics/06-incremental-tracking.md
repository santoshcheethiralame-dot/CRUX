---
subject: arvr
unit: 4
order: 6
slug: incremental-tracking
title: Incremental Tracking
summary: The KLT tracker, optical flow, patch warping, active search with camera motion models, and the drift that makes recovery necessary.
minutes: 13
tags: [incremental-tracking, KLT, optical-flow, patch-warping, active-search, motion-model, drift]
---

# Incremental Tracking

## The idea

Rather than recognising the scene from scratch each frame, **incremental tracking** exploits the fact that consecutive video frames are **almost identical**. At 60 fps, only ~16 ms of motion separates them, so every feature is **close to where it was**.

| | **Tracking by detection** | **Incremental tracking** |
|---|---|---|
| Question asked | *"Where am I?"* | *"How far have I moved since the last frame?"* |
| Search area | The whole image / whole map | A **small window** around the last position |
| Cost per frame | High | **Low** |
| Drift | None | **Accumulates** |
| On failure | Recovers instantly | **Lost** — needs re-initialisation |

---

## The KLT tracker

**Kanade–Lucas–Tomasi** is the classical incremental tracker.

> [!TRAP]
> A course MCQ asks what technique KLT primarily employs. The answer: **KLT employs feature extraction followed by optical flow tracking.** The distractors offer histogram analysis, blob detection with non-linear transformations, and template matching — all wrong.

**How it works.** For a small patch around a feature, find the displacement $\mathbf{d}$ that best aligns it with the next frame, by minimising the sum of squared differences:

$$\varepsilon(\mathbf d) = \sum_{\mathbf x\,\in\,W} \big[\,I_{t+1}(\mathbf x + \mathbf d) - I_t(\mathbf x)\,\big]^2$$

Solved iteratively via the **optical flow constraint**, which follows from assuming brightness is constant along a point's trajectory:

$$I_x u + I_y v + I_t = 0$$

> [!INTUITION]
> The optical flow equation says: *if a pixel's brightness does not change as it moves, then how fast it appears to move is fixed by how quickly brightness varies in space versus in time.* Where the image has a strong gradient, a small motion causes a large brightness change, so motion is easy to measure. Where it is flat, it is unmeasurable — **which is exactly why KLT tracks corners**, and why "good features to track" is literally the title of the Shi–Tomasi paper that accompanies it.

**Why one equation is not enough — the aperture problem.** A single pixel gives one equation in two unknowns $(u, v)$. KLT resolves this by assuming the displacement is **constant over a small window**, giving many equations and a least-squares solution — and the window is solvable precisely when the structure tensor has **two large eigenvalues**, i.e. at a corner.

---

## Patch warping

Simple translation-only tracking fails as the viewpoint changes: a patch on a surface **rotates, scales and shears** as you move around it. **Patch warping** models the patch's transformation rather than just its position.

The course's figure illustrates the failure cases that make this necessary:

| Condition | What happens |
|---|---|
| **Losing target** | The feature leaves the frame or is no longer recognisable |
| **Occlusion** | A hand or object covers the patch — appearance changes completely |
| **Tilt** | The surface is viewed obliquely; the patch is **perspectively distorted** |
| **Motion blur** | Fast motion smears the patch; gradients vanish |
| **Reflection** | Specular highlights change the appearance entirely, breaking brightness constancy |

> [!NOTE]
> Every one of these breaks the **brightness constancy assumption** that optical flow depends on. Warping addresses tilt and scale by transforming the reference patch before comparison — typically with an **affine** or **homography** warp. It cannot help with occlusion, blur or specularity, which is why incremental tracking **must** be paired with a detection-based recovery path.

---

## Active search and camera motion models

Rather than searching a fixed window around the last position, **active search** **predicts** where each feature should appear and searches a small region around the prediction.

The course question bank asks for the **camera motion models** used for this:

| Model | Assumption | Suits |
|---|---|---|
| **Constant position** | The camera did not move | Static or very slow shots; smallest search region |
| **Constant velocity** | Velocity persists between frames | **The common default** — smooth panning and walking |
| **Constant acceleration** | Acceleration persists | Aggressive, changing motion |
| **IMU-driven** | Predict from the **gyroscope/accelerometer** | **The best option when available** — the IMU reports actual motion at 1000 Hz |

> [!INTUITION]
> A motion model turns tracking into a **prediction-and-correction** loop, which is exactly the Kalman filter's shape from Unit 3: *predict where it should be, look there, correct*. The tighter the prediction, the smaller the search window — and a smaller window is both **faster** and **less likely to latch onto the wrong feature**.
>
> This is also the cleanest example of **visual-inertial fusion**: the IMU cannot give position, but it is excellent at saying *"the camera just rotated 3° to the left"*, which tells the vision system precisely where to look. Each sensor covers the other's weakness.

---

## Advantages and drawbacks

The course question bank asks explicitly for these.

| | |
|---|---|
| **Advantages** | **Computationally cheap** — small local searches, no descriptors, no database · **high frame rates** on modest hardware · **smooth, temporally consistent** pose with little jitter · needs **no pre-built map** |
| **Drawbacks** | **Drift** — small per-frame errors accumulate without bound · **fails on fast motion** (feature leaves the search window), **occlusion**, **motion blur** and **lighting change** · **cannot recover** on its own once lost · requires **initialisation** |

> [!INTUITION]
> **Drift here is the same phenomenon as gyroscope drift in Unit 3**, and for the same reason: you are **integrating relative measurements**. Each frame-to-frame estimate is slightly wrong, and the errors compound. The cure is identical too — periodically correct against something **absolute**, which for vision means **tracking by detection** against a map, or closing a loop in SLAM.

## How the two are combined

```
   ┌─────────────────────────────────────────────────────┐
   │  INCREMENTAL TRACKING  — every frame, cheap         │
   │  KLT / optical flow with active search              │
   └───────────────────────┬─────────────────────────────┘
                           │ tracking lost?
                           │ (too few inliers, blur, occlusion)
                           ▼
   ┌─────────────────────────────────────────────────────┐
   │  TRACKING BY DETECTION — on demand, expensive       │
   │  relocalise from scratch against the map            │
   └─────────────────────────────────────────────────────┘
```

> [!EXAM]
> *"What is incremental tracking? Explain its advantages and drawbacks"* is question 3 in the course's question bank. Define it as estimating pose **relative to the previous frame** rather than from scratch; name **KLT** as the classical method (**feature extraction followed by optical flow**); give the advantages (cheap, high frame rate, smooth, no map needed) and drawbacks (**drift**, fails on fast motion/occlusion/blur, **cannot self-recover**); and close with the **hybrid architecture** — incremental for speed, detection for recovery. That last point is the one most answers miss.

---

**Next:** what happens when the system builds the map itself, while using it.
