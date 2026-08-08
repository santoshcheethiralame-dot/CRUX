---
subject: arvr
unit: 3
order: 11
slug: tracking-overview
title: Tracking in 3D — 6DOF and the Characterisation of Tracking
summary: What tracking means, the six degrees of freedom, how a pose is represented mathematically, and the axes along which tracking systems trade off.
minutes: 12
tags: [tracking, 6DOF, pose, degrees-of-freedom, latency, jitter, drift, accuracy]
---

# Tracking in 3D — 6DOF and the Characterisation of Tracking

## What tracking is

> **Tracking** is a **foundational aspect of AR and VR systems**, determining the **real-time position and orientation** — commonly expressed as **6 Degrees of Freedom (6DOF)** — of users, controllers and virtual objects relative to a physical or virtual environment.
>
> **Accurate tracking ensures a seamless alignment between user movements and corresponding changes** within the virtual or augmented environment, **preserving immersion and interaction fidelity**.

## The six degrees of freedom

A rigid body in 3D space has exactly six independent ways to move:

| | Degree of freedom | Motion |
|---|---|---|
| **Position (translation)** | **Surge** | forward / backward — along $x$ |
| | **Sway** | left / right — along $y$ |
| | **Heave** | up / down — along $z$ |
| **Orientation (rotation)** | **Roll** | about the front-to-back axis |
| | **Pitch** | about the side-to-side axis |
| | **Yaw** | about the vertical axis |

```
        yaw ↻                    3 DOF  = orientation only
         │                                (Google Cardboard: you can look
    ┌────┴────┐                            around but not lean in)
    │         │──▶ surge
    │  HEAD   │                   6 DOF = orientation + position
    └────┬────┘                            (Quest, Vive: you can walk
       heave                                around an object)
```

> [!TRAP]
> **3DOF vs 6DOF is a favourite exam distinction.** A phone or Google Cardboard gives **3DOF** — orientation only, from the IMU. You can look around, but leaning forward does not bring you closer to anything, because the system has no idea you moved. **6DOF adds position**, which requires either external base stations or inside-out camera tracking (SLAM). Everything that makes VR feel real — leaning to peer around a corner, reaching for an object — needs the other three.

## Representing a pose mathematically

The course question bank asks directly: *"How do you represent the pose of a rigid body that is subjected to tracking, mathematically?"*

A **pose** is position **and** orientation together:

$$\text{pose} = (\mathbf{p},\ q) \qquad \mathbf p \in \mathbb{R}^3,\quad q \in \mathbb{H},\ \lVert q\rVert = 1$$

- **Position** $\mathbf p = (x, y, z)$ — a translation vector.
- **Orientation** $q = (w, x, y, z)$ — a **unit quaternion**, for all the Unit 1 reasons: no gimbal lock, compact, and smoothly interpolatable.

Equivalently, as a single **homogeneous transformation matrix** (Unit 1):

$$T = \begin{bmatrix} R_{3\times3} & \mathbf{p} \\ \mathbf{0}^{\mathsf T} & 1 \end{bmatrix}$$

where $R$ is the rotation matrix corresponding to $q$. This is the object's frame expressed in the world frame — **exactly the model matrix** of the Unit 2 pipeline.

> [!INTUITION]
> This is why Unit 1 spent so long on quaternions and homogeneous transformations. **A tracker's entire output is a stream of $(\mathbf p, q)$ pairs**, and the renderer's job is to turn the newest one into a view matrix before the next frame. Tracking and rendering meet at exactly this data structure.

> [!EXAM]
> Answer that question in three parts: (1) a pose has **6DOF** — 3 translation + 3 rotation; (2) represent it as **$(\mathbf p, q)$** with $\mathbf p \in \mathbb{R}^3$ and $q$ a **unit quaternion**, explaining *why* a quaternion rather than Euler angles; (3) note the equivalent **$4\times4$ homogeneous matrix** form and that it is the object's frame expressed in world coordinates.

## Characterising a tracking system

> Tracking systems can be broadly categorized based on the **type of technology used**, ranging from **mechanical setups to advanced optical and sensor fusion systems**. Each method involves **trade-offs in terms of precision, mobility, cost and susceptibility to interference**.

The axes on which any tracker is judged:

| Property | Meaning | Why it matters |
|---|---|---|
| **Accuracy** | How close the reported pose is to the true pose | Registration error in AR |
| **Precision / jitter** | How much the reading varies when nothing is moving | Visible shaking of virtual content |
| **Latency** | Delay between motion and reported pose | The **20 ms** budget; sickness |
| **Update rate** | Samples per second | Must exceed the frame rate |
| **Drift** | Slow accumulation of error over time | Content wanders away from its anchor |
| **Range / working volume** | The region within which tracking works | Room-scale vs desk-scale vs outdoor |
| **Degrees of freedom** | 3DOF vs 6DOF | Whether the user can move as well as look |
| **Line-of-sight requirement** | Does occlusion break it? | Robustness in real use |
| **Interference susceptibility** | Metal, magnetic fields, light, sound | Where it can be deployed |

> [!INTUITION]
> **Accuracy and precision are different, and both matter differently.** A tracker with a constant 2 cm offset (poor accuracy, good precision) makes content sit slightly wrong but **stably** — often unnoticeable. A tracker that is right on average but jitters by 2 mm (good accuracy, poor precision) makes content **visibly shake**, which is far more objectionable. Human perception is much more sensitive to **motion** than to constant offset.

## The tracking problem in one sentence

Everything in the next four topics is an attempt to answer:

> **Given noisy, drifting, partially-occluded sensor readings, produce a stable 6DOF pose within 20 milliseconds.**

- **No single sensor can do it** — each has a failure mode (mobile-sensors topic).
- Orientation and position have **different solutions** (the two tracking topics).
- The answer is to **combine sensors so their failure modes cancel** — **sensor fusion**, which is where this unit ends.

---

**Next:** the four classical tracking technologies.
