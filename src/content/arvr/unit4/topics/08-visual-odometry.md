---
subject: arvr
unit: 4
order: 8
slug: visual-odometry
title: Visual Odometry
summary: Estimating camera motion frame to frame — feature tracking, the essential matrix, the 5-point algorithm inside a RANSAC loop, and pose recovery.
minutes: 12
tags: [visual-odometry, essential-matrix, 5-point-algorithm, RANSAC, epipolar, scale-ambiguity]
---

# Visual Odometry

## Definition

> **Visual Odometry** estimates **camera motion frame-to-frame** by **tracking features**, calculating the **essential matrix** (**5-point algorithm within a RANSAC loop**), and recovering **incremental camera pose**.

The name is borrowed from wheel odometry: just as counting wheel rotations tells a robot how far it has travelled, **counting how the image changes** tells a camera how far it has moved.

## The pipeline

The course question bank asks for these steps directly.

| Step | What happens |
|---|---|
| **① Capture and undistort** | Grab consecutive frames; remove lens distortion using the calibrated intrinsics $K$ |
| **② Detect and match features** | Find interest points (FAST, Harris) and **track them** into the next frame (KLT) or match by descriptor |
| **③ Estimate the essential matrix** | Compute $E$ from the correspondences using the **5-point algorithm inside a RANSAC loop** |
| **④ Decompose $E$** | Recover the **rotation $R$** and **translation direction $\mathbf t$** between the two frames |
| **⑤ Resolve the ambiguity** | $E$ decomposes into **four** possible $(R, \mathbf t)$ pairs; pick the one placing triangulated points **in front of both cameras** (the *cheirality* test) |
| **⑥ Estimate scale** | Recover the **magnitude** of $\mathbf t$ from an external cue — see below |
| **⑦ Concatenate** | Compose the incremental pose onto the running trajectory: $T_k = T_{k-1}\,\Delta T_k$ |

---

## The essential matrix

For two views of the same scene, corresponding image points $\mathbf x$ and $\mathbf x'$ (in **normalised camera coordinates**) satisfy the **epipolar constraint**:

$$\mathbf{x}'^{\mathsf T}\,E\,\mathbf{x} = 0, \qquad E = [\mathbf t]_\times R$$

where $[\mathbf t]_\times$ is the skew-symmetric matrix of the translation.

> [!INTUITION]
> This is the **same epipolar geometry** as in multi-camera IR tracking — but used the other way round.
>
> - There, the cameras' relative pose was **known from calibration**, and epipolar geometry was used to **find correspondences**.
> - Here, the correspondences are **known from feature tracking**, and epipolar geometry is used to **find the relative pose**.
>
> Same equation, opposite unknown. Recognising that is worth a mark and makes both topics easier to remember.

> [!NOTE]
> **Essential vs fundamental matrix.** The **fundamental matrix** $F$ relates points in raw **pixel** coordinates and needs no calibration. The **essential matrix** $E$ relates points in **normalised camera** coordinates and therefore requires the **intrinsics $K$** to be known — $E = K'^{\mathsf T} F K$. Because $E$ encodes calibrated geometry, it decomposes directly into $R$ and $\mathbf t$, which $F$ cannot.

## The 5-point algorithm inside a RANSAC loop

**Why five points?** $E$ is a $3\times3$ matrix, but it has only **5 degrees of freedom**: 3 for rotation, 3 for translation, **minus 1** because the translation's **magnitude is unrecoverable** from images alone. So five correspondences suffice.

**Why inside RANSAC?** For the same reason as tracking by detection: **feature matching produces outliers**, and a least-squares fit is not robust to them.

```
repeat:
    randomly sample 5 correspondences
    compute candidate E (5-point algorithm)
    count inliers — points satisfying x'ᵀEx ≈ 0
    keep the E with the most inliers
finally:
    re-estimate E using all inliers
```

> [!INTUITION]
> The minimal sample size is not a detail — it is why the 5-point algorithm replaced the older **8-point algorithm**. RANSAC's iteration count grows as $w^{-s}$ where $w$ is the inlier fraction and $s$ the sample size. With 50% outliers, a 5-point sample is all-inlier about **3%** of the time; an 8-point sample only **0.4%** — roughly **eight times more iterations**. Fewer points per sample means dramatically faster robust estimation.

---

## The scale ambiguity

Decomposing $E$ gives the **direction** of translation but **not its magnitude**.

> [!TRAP]
> **A single camera cannot recover absolute scale.** A large scene viewed from far away and a small scene viewed from close up produce **identical images** — the doll's-house problem. Nothing in the image sequence distinguishes them.

**How real systems resolve it:**

| Source | Mechanism |
|---|---|
| **Stereo camera** | Known **baseline** between two lenses gives metric depth directly |
| **IMU** | Accelerometer measures in **m/s²** — integrating supplies real-world scale |
| **Known object** | A marker or object of known size in view (see marker tracking) |
| **Depth sensor** | Measures metric distance per pixel |
| **Assumed camera height** | Ground-plane assumption, common in automotive VO |

**Scale drift** is the related nuisance: even with a fixed scale estimate, small errors accumulate and the reconstructed trajectory gradually shrinks or expands. Loop closure in full SLAM corrects it.

---

## Visual odometry vs SLAM

| | **Visual Odometry** | **SLAM** |
|---|---|---|
| Goal | The **trajectory** — how the camera moved | Trajectory **and a consistent map** |
| Memory | Recent frames only | The **whole map** |
| Loop closure | **No** | **Yes** — corrects accumulated drift |
| Drift | **Accumulates without bound** | Bounded by loop closures |
| Cost | Lower | Higher |
| Analogy | Dead reckoning | Dead reckoning **plus landmarks you recognise** |

> [!INTUITION]
> **Visual odometry is the front end of SLAM, without the memory.** It answers *"how did I move?"* frame by frame, and like all incremental methods it drifts. SLAM adds the back end — a persistent map and loop closure — which is precisely what converts unbounded drift into bounded error.
>
> The whole progression of this unit is the same idea at three scales: **the IMU drifts and vision corrects it; visual odometry drifts and the map corrects it; the map drifts and loop closure corrects it.** Each layer supplies an absolute reference to the one below.

> [!EXAM]
> *"Outline the steps involved in visual odometry"* is question 7 in the course's question bank. Give the pipeline — **capture/undistort → detect and track features → estimate $E$ via the 5-point algorithm in RANSAC → decompose into $R$ and $\mathbf t$ → resolve the four-fold ambiguity → recover scale → concatenate**. State explicitly that **$E$ has 5 DOF because translation magnitude is unrecoverable**, that **RANSAC is needed because matching produces outliers**, and that **scale requires an external cue**. Finishing with the VO-vs-SLAM contrast earns the last mark.

---

**Next:** taking all of this outdoors, where none of it quite works.
