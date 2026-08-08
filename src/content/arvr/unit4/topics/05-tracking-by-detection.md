---
subject: arvr
unit: 4
order: 5
slug: tracking-by-detection
title: Natural Feature Tracking by Detection
summary: The five-stage detection pipeline — interest points, descriptors, matching, PnP and robust pose estimation with RANSAC.
minutes: 13
tags: [tracking-by-detection, PnP, RANSAC, descriptor-matching, relocalisation, pipeline, gap-fill]
---

# Natural Feature Tracking by Detection

> [!NOTE]
> **Source note.** The syllabus names *"Natural Feature Tracking by Detection"*, but in the CAVE Lab booklet the **five-stage pipeline appears only inside an MCQ**. This topic expands it using that MCQ's stage list plus the standard treatment in **Schmalstieg & Höllerer**.

## What "by detection" means

Two strategies exist for tracking natural features across time:

| | **Tracking by detection** | **Incremental tracking** |
|---|---|---|
| Each frame is | Solved **from scratch** | Solved **relative to the previous frame** |
| Uses previous frame? | **No** | **Yes** |
| Cost | Higher | Lower |
| Drift | **None** — no error accumulates | **Accumulates** over time |
| Recovers from failure | **Instantly** | Needs re-initialisation |
| Handles fast motion | Well | Poorly — the search window is exceeded |

> [!INTUITION]
> **Tracking by detection is stateless, and that is its whole point.** It answers *"where am I?"* rather than *"how far have I moved since last frame?"* — so nothing accumulates and nothing needs recovering. It is what the system falls back on when incremental tracking loses the thread, which is why it is also called **relocalisation**.
>
> The cost is that it does full recognition every frame. Real systems therefore run **incremental tracking for speed and detection for recovery** — the subject of the next topic.

## The five stages

The order is directly examinable.

```
 ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐
 │① INTEREST  │─▶│② DESCRIPTOR│─▶│③ DESCRIPTOR│─▶│④ PnP CAMERA│─▶│⑤ ROBUST    │
 │  POINT     │  │  CREATION  │  │  MATCHING  │  │  POSE      │  │  POSE      │
 │  DETECTION │  │            │  │            │  │ DETERMIN.  │  │  ESTIMATION│
 └────────────┘  └────────────┘  └────────────┘  └────────────┘  └────────────┘
   find corners    describe each   match against    solve 3D↔2D     reject
   (FAST, Harris,  point's local   the map's        for the         outliers
   DoG)            appearance      descriptors      camera pose     (RANSAC)
```

### ① Interest point detection

Find candidate points in the current frame — **FAST**, **Harris**, DoG (SIFT) or the Hessian (SURF), from the previous topic. Typically several hundred to a few thousand per frame.

### ② Descriptor creation

Compute a **descriptor vector** for each detected point, summarising its local appearance in a way that survives viewpoint and lighting change — SIFT-128, SURF-64, or a binary descriptor such as **BRIEF/ORB**.

### ③ Descriptor matching

Compare the frame's descriptors against the **database of descriptors in the map**, each of which has a **known 3D position**. Every accepted match is a **3D ↔ 2D correspondence**.

> [!NOTE]
> Matching thousands of descriptors against a map containing hundreds of thousands is not done by brute force. Approximate nearest-neighbour structures — **kd-trees** for float descriptors, **locality-sensitive hashing** or **bag-of-words** vocabularies for binary ones — reduce it to something feasible. The **ratio test** (accept a match only if the best candidate is clearly better than the second-best) is the standard filter for ambiguous matches.

### ④ Perspective-n-Point camera pose determination

Given $n$ correspondences between **known 3D points** and their **2D image projections**, solve for the camera's **6DOF pose**. This is the **PnP problem**.

$$\text{given } \{(\mathbf{X}_i,\ \mathbf{x}_i)\} \quad\text{find } R,\ \mathbf{t} \quad\text{such that}\quad \mathbf{x}_i \simeq K[R \mid \mathbf{t}]\,\mathbf{X}_i$$

- **P3P** — three points give up to four solutions; a fourth point disambiguates.
- **EPnP** and similar solvers handle larger $n$ efficiently.

> [!INTUITION]
> This is exactly what marker tracking did with the four corners of a square — **the same PnP problem**, but now the 3D points come from a **map the system built** rather than from a printed shape of known size. That single substitution is the entire difference between marker-based and markerless AR.

### ⑤ Robust pose estimation

Descriptor matching **always produces some wrong matches** — repeated textures, similar corners, moving objects. A least-squares fit over contaminated data is dragged badly off by a handful of outliers, so the pose must be estimated **robustly**.

**RANSAC (RANdom SAmple Consensus):**

```
repeat N times:
    randomly select a minimal sample (e.g. 3–4 correspondences)
    compute a candidate pose from that sample
    count INLIERS — correspondences whose reprojection error is small
    keep the pose with the most inliers

finally: re-estimate the pose using ALL inliers, discarding outliers
```

> [!INTUITION]
> RANSAC inverts the usual logic. Instead of fitting all the data and hoping outliers average out, it **guesses a small sample, assumes it is clean, and asks how many others agree**. A sample containing an outlier produces a nonsense pose that almost nothing agrees with; a clean sample produces a pose supported by hundreds of points. **Consensus identifies the good data, and only then do you fit.**
>
> It is also why the minimal sample size matters so much: the probability that a random sample of size $s$ is all-inlier falls off as $w^s$, so P3P's $s=3$ needs far fewer iterations than a method requiring eight points.

---

## The full picture

| Stage | Input | Output |
|---|---|---|
| ① Detection | Camera frame | 2D interest point locations |
| ② Description | Points + image patches | Descriptor vectors |
| ③ Matching | Descriptors + map database | **3D ↔ 2D correspondences** (with outliers) |
| ④ PnP | Correspondences | A candidate 6DOF camera pose |
| ⑤ RANSAC + refine | Candidate poses | **Robust final pose** + inlier set |

> [!TRAP]
> A course MCQ asks for the order of the five stages. The correct sequence is **Interest Point Detection → Descriptor Creation → Descriptor Matching → Perspective-n-Point camera pose determination → Robust Pose Estimation**. The distractors permute these — most commonly putting pose determination before matching, which is impossible, since you need correspondences before you can solve for pose.

## Strengths and costs

| | |
|---|---|
| **Advantages** | **No drift** — each frame is independent · **instant recovery** from tracking loss · handles **fast motion and occlusion** · enables **relocalisation** in a previously-built map |
| **Limitations** | **Computationally expensive** every frame · needs a **pre-built map** of descriptors with 3D positions · fails on **textureless surfaces** (a blank wall has no interest points) · sensitive to **lighting change** between mapping and tracking |

> [!EXAM]
> Give the **five stages in order** with one line each, define **PnP** as recovering pose from **3D↔2D** correspondences, and explain **why RANSAC is needed** — descriptor matching inevitably produces outliers and least squares is not robust to them. Contrasting *by detection* (stateless, no drift, expensive) with *incremental* (cheap, drifts, needs recovery) shows you understand why both exist.

---

**Next:** the cheap-per-frame alternative that this one rescues.
