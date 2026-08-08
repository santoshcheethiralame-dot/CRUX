---
subject: arvr
unit: 4
order: 7
slug: slam-ptam
title: SLAM and PTAM
summary: The chicken-and-egg problem of mapping while localising, loop closure, and PTAM's insight of splitting tracking and mapping into two threads.
minutes: 14
tags: [SLAM, PTAM, loop-closure, keyframes, bundle-adjustment, threads, relocalisation]
---

# SLAM and PTAM

## The problem

> **Simultaneous Localization and Mapping (SLAM)** — **model-free, real-time mapping and localization without prior models.**

Three words carry the weight. **Simultaneous**, because the two halves depend on each other:

- To know **where you are**, you need a **map**.
- To build a **map**, you need to know **where you are**.

> [!INTUITION]
> This is a genuine chicken-and-egg problem, and the resolution is **bootstrapping**. Start by assuming you are at the origin. Observe some features and place them in a tentative map. Move a little; use those features to estimate your new pose; use the new pose to add more features. Each half is slightly wrong, and each half's error feeds the other — which is why the interesting parts of SLAM are all about **stopping the errors compounding**.

**Model-free** is the other key word: unlike marker or model-based tracking, SLAM needs **no prior knowledge** of the environment. Walk into an unfamiliar room and it starts working. That is why it is the technology behind every modern inside-out headset and phone AR platform.

## The components

| Component | Job |
|---|---|
| **Front end (tracking)** | Estimate the camera pose for the current frame against the existing map |
| **Back end (mapping)** | Add new landmarks, refine existing ones, optimise the map |
| **Loop closure** | Recognise a previously-visited place and **correct accumulated drift** |
| **Relocalisation** | Recover pose after tracking failure — **tracking by detection** against the map |

### Loop closure — the crucial one

As you explore, small pose errors accumulate: walk a circuit around a building and you arrive back at the start believing you are several metres away. **Loop closure** detects *"I have been here before"* — usually via **bag-of-words place recognition** — and then **redistributes the accumulated error** around the whole loop.

> [!INTUITION]
> Loop closure is the vision equivalent of an **absolute reference** from Unit 3. Incremental tracking drifts exactly as a gyroscope drifts; recognising a previously-mapped place is the visual version of feeling gravity — a measurement that **does not depend on history**, and so can cancel the accumulated error.
>
> It also produces SLAM's most characteristic behaviour: the map visibly **snaps into alignment** the moment a loop closes.

### Bundle adjustment

The back end's optimisation: jointly refine **all camera poses and all 3D landmark positions** to minimise total **reprojection error** — the distance between where each landmark is predicted to appear and where it was actually observed.

$$\min_{\{R_j,\ \mathbf t_j\},\ \{\mathbf X_i\}} \ \sum_{i,j} \big\lVert \mathbf x_{ij} - \pi(R_j, \mathbf t_j, \mathbf X_i) \big\rVert^2$$

It is expensive, which is precisely the problem PTAM solves.

---

## PTAM — Parallel Tracking and Mapping

> **PTAM** runs **tracking and mapping in separate threads**; **mapping adds keyframes at intervals**.

### The insight

Tracking and mapping have **completely different requirements**:

| | **Tracking** | **Mapping** |
|---|---|---|
| Must run | **Every frame** — at full frame rate | **Occasionally** |
| Latency requirement | **Hard real-time** — the display is waiting | Soft — can take a second |
| Work per invocation | Small — pose from an existing map | Large — bundle adjustment over many frames |
| Consequence | Cannot be blocked | Can afford to be slow |

Before PTAM, both ran in one loop, so **every frame paid the cost of map optimisation**. PTAM's contribution was to notice that they need not be coupled at all — put them on **separate threads** and let each run at its natural rate.

> [!TRAP]
> A course MCQ asks how the two threads differ. The correct answer:
>
> **The Tracking Thread operates at full frame rate, computing camera poses from correspondences, while the Mapping Thread runs at a much slower rate, focusing on adding new keyframes.**
>
> The distractors **swap** the two. Remember it by purpose: **tracking feeds the display, so it must never be late; mapping improves the map, so it can afford to think.**

### Keyframes

The mapping thread does not use every frame — most are nearly identical to their neighbours and add nothing. It selects **keyframes** at intervals, when:

- enough **time or distance** has passed since the last one,
- the view has changed enough to give a good **baseline** for triangulating new points,
- tracking quality is good enough to trust the pose.

Bundle adjustment then runs over the **keyframes only**, which is what makes it tractable.

> [!INTUITION]
> Keyframes are a **compression of the video into the frames that carry new information**. A hundred frames of standing still contain one frame's worth of information about the room. Selecting keyframes turns an unbounded stream into a bounded graph — and it is the same instinct as the display list in Unit 2: *don't reprocess what hasn't changed.*

---

## Where SLAM appears

| System | Use |
|---|---|
| **ARKit / ARCore** | Phone AR — visual-inertial SLAM is what places content on your floor |
| **Meta Quest, HoloLens** | **Inside-out 6DOF** headset tracking with no external base stations |
| **Robot vacuums, drones, self-driving cars** | Navigation and obstacle avoidance in unmapped spaces |
| **WebXR hit testing** | The "tap to place" surface from Unit 2 comes from the SLAM map |

> [!NOTE]
> **Visual-inertial SLAM** is what actually ships. Pure visual SLAM fails during fast motion, on textureless walls and in the dark; the IMU covers exactly those gaps at 1000 Hz, and vision corrects the IMU's drift. It is the Unit 3 fusion argument again — **fast-but-drifting corrected by slow-but-absolute** — with the camera playing the absolute role.
>
> It also fixes monocular SLAM's **scale ambiguity**: one camera cannot tell a doll's house from a real one, but an accelerometer measures **metres per second squared**, supplying real-world scale.

## Limitations

- **Textureless environments** — a plain white wall offers no features.
- **Dynamic scenes** — moving people and objects violate the assumption of a static world.
- **Repetitive structure** — identical corridors cause **false loop closures**, which are worse than none.
- **Computational cost** and battery drain.
- **Drift** between loop closures.
- **Scale ambiguity** for a single camera without inertial or stereo input.

> [!EXAM]
> *"What is SLAM? Explain with the help of a diagram, and list example applications"* is question 4 in the course's question bank. Cover: the **simultaneous chicken-and-egg problem**; **model-free** operation with no prior model; the four components (**tracking front end, mapping back end, loop closure, relocalisation**); **loop closure as drift correction**; and applications (phone AR, inside-out headsets, robotics). Then give **PTAM** as the architectural refinement — **two threads, tracking at full rate, mapping at keyframe intervals** — and say **why** that split works.

---

**Next:** the frame-to-frame motion estimation underneath all of this.
