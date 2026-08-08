---
subject: arvr
unit: 3
order: 15
slug: position-attached-bodies
title: Tracking Position and Attached Bodies
summary: Why position is harder than orientation, how 6DOF position is actually obtained, and tracking chains of linked bodies through forward kinematics.
minutes: 13
tags: [position-tracking, 6DOF, attached-bodies, kinematic-chain, forward-kinematics, skeleton, gap-fill]
---

# Tracking Position and Attached Bodies

> [!NOTE]
> **Source note.** The booklet covers orientation tracking thoroughly but treats **position tracking** and **tracking attached bodies** only in passing, though both are named syllabus items. This topic assembles them from the booklet's own material plus **LaValle, *Virtual Reality*** (Ch 9, tracking) and the standard kinematics treatment already used in Unit 1.

## Why position is the hard half

Orientation has an absolute reference available at all times: **gravity** gives you down, **magnetic north** gives you heading. Position has **no equivalent** — nothing you can feel tells you *where you are*.

| | **Orientation** | **Position** |
|---|---|---|
| Absolute reference from a cheap sensor? | ✅ gravity + magnetic north | ❌ **none** |
| From inertial integration | Single integration → **linear** drift | Double integration → **quadratic** drift |
| Recoverable from an IMU alone? | Yes, with fusion | **No** |
| What it actually requires | Gyro + accelerometer + magnetometer | **External reference** — cameras, base stations or GPS |

> [!TRAP]
> This asymmetry is the reason **3DOF headsets exist and are cheap**, while **6DOF headsets need cameras**. It is not that manufacturers were being stingy — orientation is genuinely obtainable from a £2 chip, and position genuinely is not.

## How position is actually obtained

Since inertial sensors cannot supply it, every 6DOF system uses an **external spatial reference**:

| Method | Mechanism | Example |
|---|---|---|
| **Outside-in optical** | Fixed cameras or base stations observe the tracked object | HTC Vive **Lighthouse**; motion-capture rigs |
| **Inside-out optical (SLAM)** | The device's own cameras observe the environment and build a map | Meta **Quest**, **HoloLens**, ARKit/ARCore |
| **Marker-based** | A known-geometry fiducial gives absolute pose from one image | **ARToolKit** |
| **GPS** | Satellite trilateration | Outdoor AR, 1–100 m (sub-metre with **DGPS**) |
| **Ultrasonic / EM** | Time-of-flight or field strength from a fixed emitter | Early VR trackers; **Polhemus** |

> [!INTUITION]
> All five answer the same question — *"where am I relative to something that does not move?"* The differences are only in what plays the role of "something that does not move": a base station, a printed marker, a satellite constellation, or **features of the room itself**. The last is SLAM, and it is the one that needs no preparation at all, which is why it won.

**In practice these are combined with the IMU:** the external reference supplies **absolute position at a low rate** (30–90 Hz, sometimes interrupted by occlusion), and the IMU **fills the gaps at high rate** (500–1000 Hz) and covers dropouts. This is sensor fusion again, applied to position rather than orientation.

## Tracking attached bodies

Many things worth tracking are not single rigid bodies but **chains of linked ones** — an arm, a hand, a full skeleton. The syllabus calls this *tracking attached bodies*.

### The kinematic chain

A chain of rigid bodies connected by joints, each body's pose expressed **relative to its parent**:

```
   shoulder ──▶ upper arm ──▶ elbow ──▶ forearm ──▶ wrist ──▶ hand
     (root)        link 1               link 2              link 3
```

This is precisely the **frame hierarchy** of Unit 1 and the **scene graph** of Unit 2. Each joint contributes a transform, and a body's pose in world coordinates is the **concatenation** of every transform from the root down to it:

$$T_{\text{hand}}^{\text{world}} = T_{\text{shoulder}}^{\text{world}} \; T_{\text{upper}}^{\text{shoulder}} \; T_{\text{fore}}^{\text{upper}} \; T_{\text{hand}}^{\text{fore}}$$

### Why this is worth doing

| | |
|---|---|
| **Fewer parameters** | A free-floating hand needs 6DOF. A hand at the end of a two-link arm of known lengths needs only the **joint angles** — the position follows. Constraints reduce the unknowns. |
| **Physically plausible results** | The chain cannot produce a forearm detached from an elbow, or a joint bent backwards, because the structure forbids it. |
| **Robust to occlusion** | If the wrist marker is hidden, its pose can still be **inferred** from the elbow and the known link length. |

> [!INTUITION]
> Constraints are **information**. Knowing that the forearm is 26 cm long and hinged at the elbow removes three degrees of freedom for free — and that is three fewer things your noisy sensors have to measure. **The skeleton is a prior.**

### Forward vs inverse kinematics

| | **Forward kinematics (FK)** | **Inverse kinematics (IK)** |
|---|---|---|
| Given | The **joint angles** | The **desired end-effector pose** |
| Compute | Where the end-effector ends up | The **joint angles** that achieve it |
| Difficulty | Straightforward — concatenate transforms | Harder — may have **many solutions or none** |
| Used for | Tracking a body from joint sensors | Posing an avatar from headset + two controllers |

> [!NOTE]
> **Unit 1's arm question was forward kinematics.** *"The upper and lower arms are rotated by 20° and 40° about the x-axis; where is the wrist?"* — you were given the joint angles and asked to concatenate the transforms down the chain. Now it has a name.
>
> **IK is what a VR system actually needs.** A headset knows only three poses — head and two hands. To animate a full avatar it must **solve backwards** for plausible elbow and shoulder angles. That is why VR avatars often have oddly-placed elbows: the problem is underdetermined, and the solver is guessing.

### Body tracking in practice

| Approach | How |
|---|---|
| **Marker-based mocap** | Retro-reflective markers on the body, tracked by IR cameras; joints inferred from marker clusters |
| **Depth-camera skeleton tracking** | A depth sensor (Kinect) fits a skeletal model to the depth image |
| **IMU suits** | An IMU per limb segment; orientations composed along the chain |
| **Vision-based pose estimation** | A neural network infers joint positions from ordinary video |
| **IK from sparse input** | Headset + two controllers → solve for a full body |

Unit 4 returns to several of these under **body tracking** and **input modalities**.

> [!EXAM]
> If asked *"how are attached bodies tracked?"*: define the **kinematic chain** with poses relative to parents; state that world pose is the **concatenation of transforms from the root**; give the three benefits (**fewer parameters, physical plausibility, occlusion robustness**); and distinguish **FK** (angles → position) from **IK** (position → angles), noting that VR avatar animation is an **IK** problem solved from only three tracked points.

---

**Next:** the two things that corrupt every reading — drift and noise.
