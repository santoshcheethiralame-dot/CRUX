---
subject: arvr
unit: 4
order: 1
slug: computer-vision-for-ar
title: Computer Vision and Augmented Reality
summary: Why AR is a vision problem, the six tracking methods in one table, and the sparse/dense and prepared/unprepared axes that organise them.
minutes: 12
tags: [computer-vision, tracking-methods, SLAM, PTAM, visual-odometry, sparse, dense]
---

# Computer Vision and Augmented Reality

## Why vision

Unit 3 ended at a wall: **inertial sensors can supply orientation but never position**, because a bias double-integrates into quadratic error. Something must supply an **absolute spatial reference**, and outside a prepared room the only sensor that can is the **camera**.

> **Augmented Reality overlays virtual content onto the physical world**, enhancing perception through devices like smartphones, tablets, AR glasses and headsets. Unlike VR, which creates a fully immersive environment, **AR integrates digital elements within real-world contexts in real time.**

**The underlying technologies:**

| Technology | Role |
|---|---|
| **Computer Vision** | Recovers **where the camera is** relative to the world |
| **Sensors** | IMU, GPS — fast, but drifting or coarse |
| **AI / Machine Learning** | Recognition, gesture understanding, learned tracking, behaviour |

**Key applications:** **Gaming** (Pokémon GO) · **Navigation** (real-time overlays for directions) · **Education** (interactive anatomy or engineering models) · **Industrial Maintenance** (visual overlays for repair guidance).

> [!INTUITION]
> The whole of Unit 4's tracking half answers one question: **given an image, where was the camera when it was taken?** Every method differs only in what it uses as a reference — a printed marker, retro-reflective spheres, natural texture, or a map the system builds for itself.
>
> Once you have the camera pose, Unit 2's pipeline draws the content and Unit 3's fusion smooths it. **Vision closes the loop that inertial sensing cannot.**

---

## The six tracking methods

This table is the course's own, and it is the spine of the unit.

| Method | How it works |
|---|---|
| **Marker Based Tracking** | Uses **predefined visual markers** (e.g. QR codes) for anchoring digital objects |
| **Infrared Tracking** | Uses **retro-reflective spheres and IR cameras** for motion capture |
| **Natural Feature Tracking** | Detects **2D interest points** using algorithms like **Harris corners, FAST, SIFT, SURF** |
| **Simultaneous Localization and Mapping (SLAM)** | **Model-free, real-time mapping and localization without prior models** |
| **Visual Odometry** | Estimates **camera motion frame-to-frame** by tracking features, calculating the **essential matrix** (**5-point algorithm within a RANSAC loop**) and recovering **incremental camera pose** |
| **Parallel Tracking and Mapping (PTAM)** | Runs **tracking and mapping in separate threads**; mapping **adds keyframes at intervals** |

Each gets its own topic. The rest of this page is how they relate.

---

## Types of tracking

> - **Marker-based tracking:** high precision with physical markers.
> - **Infrared tracking:** uses IR cameras and retro-reflective markers.
> - **Feature-based tracking:** natural feature points (corners, blobs).
> - **Dense tracking:** **tracks every pixel**, often using depth sensors like **Kinect**.
> - **Outdoor tracking:**
>   - **Sensor fusion** — combining GPS, IMU and visual data
>   - **GIS data integration** — building outlines and elevation models from GIS services
>   - **Scalable visual matching** — **bag-of-words** models for robust, large-scale place recognition

## Two axes that organise everything

### Axis 1 — prepared vs unprepared environment

| | **Prepared** | **Unprepared** |
|---|---|---|
| Needs | Markers placed, or cameras installed | Nothing |
| Methods | Marker-based, infrared | Natural feature, SLAM, visual odometry, PTAM |
| Accuracy | **Very high** | Good, but can **drift** |
| Where it wins | Studios, labs, industrial cells | Anywhere — a phone in a living room |

> [!INTUITION]
> This is the **1997 → 2008 story** from Unit 3, restated as an engineering axis. Preparing the environment buys accuracy; refusing to prepare it buys **deployability**. Every method in this unit is a position on that trade.

### Axis 2 — sparse vs dense

| | **Sparse tracking** | **Dense tracking** |
|---|---|---|
| Operates on | **Discrete interest points** — corners, blobs | **Every pixel** |
| Input | Ordinary camera images | **Rich sensory input**, often a **depth sensor (Kinect)** |
| Cost | Low — hundreds of points per frame | High — hundreds of thousands of pixels |
| Gives you | Camera pose | Pose **and a surface model** of the scene |
| Good for | Real-time pose on a phone | **Continuous tracking of body parts**, reconstruction, occlusion handling |

> [!TRAP]
> A course MCQ asks what distinguishes sparse from dense tracking. The fullest answer: **sparse tracking deals with discrete points, whereas dense tracking uses rich sensory input for continuous tracking of body parts.** Sparse throws away almost all the image on purpose — that is what makes it fast enough. Dense keeps it, and needs a depth camera or a lot of compute to afford that.

> [!NOTE]
> Dense tracking is what makes **occlusion handling** possible in AR. To know that a real chair should hide a virtual ball, the system needs a **depth value at every pixel** — which is exactly what a sparse point cloud cannot give you. It is also the bridge to **3D scanning**, later in this unit.

---

## How the methods stack in a real system

They are not alternatives so much as layers:

```
   ┌─────────────────────────────────────────────────────────┐
   │ RELOCALISATION   — where am I, from scratch?            │
   │  tracking-by-detection · bag-of-words place recognition │
   ├─────────────────────────────────────────────────────────┤
   │ MAPPING          — build/refine the world model         │
   │  SLAM · PTAM mapping thread · keyframes                 │
   ├─────────────────────────────────────────────────────────┤
   │ FRAME-TO-FRAME   — where did I move since last frame?   │
   │  incremental tracking (KLT) · visual odometry           │
   ├─────────────────────────────────────────────────────────┤
   │ INERTIAL         — fill the gaps at 1000 Hz             │
   │  IMU + sensor fusion  (Unit 3)                          │
   └─────────────────────────────────────────────────────────┘
```

> [!INTUITION]
> Read it as a hierarchy of **timescales**. The IMU answers "what changed in the last millisecond", incremental tracking answers "since the last frame", mapping answers "what does this room look like", and relocalisation answers "I have no idea where I am — help". A robust AR system runs all four, and **falls back down the stack when a layer fails**: lose the features, coast on the IMU; lose tracking entirely, relocalise.

> [!EXAM]
> A likely opener: *"What role does computer vision play in AR?"* — it supplies the **absolute pose that inertial sensors cannot**, by recovering camera position and orientation from images. Then give the **six methods table**, and organise them with the **prepared/unprepared** and **sparse/dense** axes. That framing is worth more than reciting six definitions.

---

**Next:** the simplest and most reliable of them — marker tracking.
