---
subject: arvr
unit: 4
order: 4
slug: natural-feature-detection
title: Natural Feature Detection — Corners, Blobs and Descriptors
summary: What makes a good interest point, Harris and FAST corner detectors, SIFT and SURF blob detectors, and what a descriptor is for.
minutes: 13
tags: [natural-features, harris, FAST, SIFT, SURF, interest-points, descriptors, invariance]
---

# Natural Feature Detection — Corners, Blobs and Descriptors

> **Natural feature tracking** detects **2D interest points** using algorithms like **Harris corners, FAST, SIFT and SURF**.

No markers, no preparation — the algorithm finds points that were **already there**.

## What makes a good interest point

A useful feature must be **findable again**, from a different viewpoint, in different light, at a different scale. That requires:

| Property | Why |
|---|---|
| **Distinctive** | Locally unique, so it can be matched without ambiguity |
| **Repeatable** | The same physical point is detected again from a new viewpoint |
| **Localised** | Precisely positioned, not smeared along an edge |
| **Invariant** | Survives changes in rotation, scale, illumination and viewpoint |
| **Efficient** | Thousands must be found per frame, in a few milliseconds |

> [!INTUITION]
> **Why corners and not edges or flat regions** — this is the core idea and it is worth being able to state.
>
> - A **flat region** looks the same wherever you shift your window. You cannot tell where you are. **No information.**
> - An **edge** looks the same when you slide *along* it. You can localise across the edge but not along it. **One dimension of information — the aperture problem.**
> - A **corner** changes when you shift in **any** direction. **Two dimensions — fully localisable.**
>
> ```
>   flat            edge            corner
>  ░░░░░░          ░░░▓▓▓          ░░░▓▓▓
>  ░░░░░░          ░░░▓▓▓          ░░░▓▓▓
>  ░░░░░░          ░░░▓▓▓          ▓▓▓▓▓▓
>   move → no      move along →    move any way →
>   change         no change       it changes
> ```

---

## Corner detectors

### Harris corner detector

Examines how image intensity changes in a small window as it is shifted. The **structure tensor** summarises the local gradients:

$$M = \sum_{\text{window}} \begin{bmatrix} I_x^2 & I_xI_y \\ I_xI_y & I_y^2 \end{bmatrix}$$

Its two eigenvalues describe the local structure:

| Eigenvalues | Structure |
|---|---|
| both **small** | flat region |
| one large, one small | **edge** |
| both **large** | **corner** ✅ |

Harris avoids computing eigenvalues explicitly by using the response

$$R = \det(M) - k\,(\text{trace}\,M)^2$$

and keeping points where $R$ is large.

> [!NOTE]
> Harris is **rotation-invariant** — rotating the image rotates the gradients but not the eigenvalues — but **not scale-invariant**. Zoom in far enough and a corner becomes a smooth curve, and Harris stops finding it. That limitation is what SIFT exists to fix.

### FAST — Features from Accelerated Segment Test

Designed for speed. For a candidate pixel $p$, examine a **circle of 16 pixels** around it. $p$ is a corner if there is a **contiguous arc of at least 9** pixels all **brighter** than $p + t$, or all **darker** than $p - t$.

> [!INTUITION]
> FAST is fast because of an early-exit trick: **test only pixels 1, 5, 9 and 13 first** — the four compass points. For a contiguous arc of 9 to exist, at least **three of those four** must be consistently brighter or darker. If not, reject the pixel immediately. The overwhelming majority of pixels are discarded after **four comparisons**, which is what makes it usable at video rate on a phone.

| | **Harris** | **FAST** |
|---|---|---|
| Basis | Gradient **structure tensor** | **Intensity comparison** around a circle |
| Cost | Moderate | **Very low** |
| Repeatability | High | Good |
| Rotation-invariant | ✅ | ✅ (detection) |
| Scale-invariant | ❌ | ❌ |
| Used in | Classic tracking, calibration | **Real-time mobile AR**, ORB, PTAM |

---

## Blob detectors — scale invariance

### SIFT — Scale-Invariant Feature Transform

Builds a **scale space** by progressively blurring the image, then finds extrema in the **Difference of Gaussians** across both position and scale. Each keypoint therefore comes with:

- a **position**,
- a **characteristic scale** — the size at which the structure is most distinctive,
- an **orientation**, from the dominant local gradient direction.

The descriptor is a **128-dimensional** vector of gradient-orientation histograms in a $4\times4$ grid around the point.

> [!INTUITION]
> Detecting the **characteristic scale** is what buys scale invariance. Because the keypoint knows how big it is, the descriptor can be computed over a window **proportional to that size** — so the same physical patch produces the same descriptor whether photographed from 1 m or 3 m away. The dominant orientation does the same job for rotation: measure everything **relative to it** and rotation cancels out.

### SURF — Speeded-Up Robust Features

A faster approximation of SIFT. Replaces Gaussian derivatives with **box filters** evaluated via an **integral image**, so the cost of a filter is **independent of its size**. Typically a **64-dimensional** descriptor.

| | **SIFT** | **SURF** |
|---|---|---|
| Detector | Difference of Gaussians | **Hessian** with box filters |
| Speed | Slower | **Several times faster** |
| Descriptor length | **128** | 64 |
| Robustness | Highest | Slightly lower |

> [!NOTE]
> On mobile hardware, **ORB** (Oriented FAST + Rotated BRIEF) usually replaces both: FAST for detection plus a **binary** descriptor compared with **Hamming distance** — a single XOR-and-popcount instead of a 128-float Euclidean distance. Orders of magnitude faster, and it is what most phone AR and open-source SLAM actually run.

---

## Detector vs descriptor

A distinction worth being precise about, because the two halves solve different problems:

| | **Detector** | **Descriptor** |
|---|---|---|
| Answers | *"Where are the interesting points?"* | *"What does this point look like?"* |
| Output | A location (and often scale and orientation) | A **vector** summarising the local appearance |
| Purpose | **Find** repeatable points | **Match** points across images |
| Examples | Harris, FAST, DoG (SIFT), Hessian (SURF) | SIFT-128, SURF-64, BRIEF, ORB |

> [!INTUITION]
> Detection alone is useless for tracking — knowing there is a corner at pixel (312, 88) says nothing about **which** corner it is. The descriptor is what turns a set of points into a set of **identities**, so the same physical corner can be recognised in the next frame or in a map built yesterday. **Detector finds; descriptor recognises.**

> [!EXAM]
> *"Explain natural feature tracking"* — start with **why corners** (flat = no information, edge = one dimension, corner = two), then **Harris** (structure tensor eigenvalues) and **FAST** (16-pixel circle, arc of 9, early exit) as corner detectors, then **SIFT/SURF** for **scale invariance** via scale space, then the **detector vs descriptor** distinction. Naming ORB as the mobile-era answer shows current awareness.

---

**Next:** how these features are used to recover pose from a single frame.
