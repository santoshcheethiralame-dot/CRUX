---
subject: arvr
unit: 3
order: 17
slug: sensor-fusion
title: Sensor Fusion
summary: Why no single sensor suffices, the four-step fusion pipeline, and its applications in headsets and robotics.
minutes: 13
tags: [sensor-fusion, roll-pitch-yaw, normalization, quaternion, headsets, robotics, pipeline]
---

# Sensor Fusion

## The idea

> **Sensor fusion** is the process of **intelligently combining data from multiple sensors** to produce **more accurate, reliable and consistent tracking information** than could be achieved by relying on any single sensor alone.
>
> In AR/VR systems it is **essential for achieving precise and responsive head, hand or object tracking** in dynamic and unpredictable environments.

## Why it is necessary

> Each sensor type has **inherent strengths and weaknesses**:
>
> - **Gyroscopes** provide **high-frequency orientation data** but **suffer from drift over time**.
> - **Accelerometers** measure linear acceleration, offering **good long-term orientation cues** but are **sensitive to motion and noise**.
> - **Magnetometers** determine **absolute heading** (compass direction) but can be **distorted by nearby metal objects and electromagnetic fields**.
>
> By **fusing their outputs**, AR/VR systems can **correct errors, reduce drift and stabilize the virtual environment**, enhancing immersion and usability.

```
   GYROSCOPE        fast, smooth ──── but DRIFTS ────┐
                                                     │
   ACCELEROMETER    absolute DOWN ─── but noisy ─────┼──▶ FUSION ──▶ stable
                    (roll, pitch)                    │              6DOF pose
   MAGNETOMETER     absolute NORTH ── but distorted ─┘
                    (yaw)
```

> [!INTUITION]
> The complementary structure is the whole point, and it is worth being able to state in one line: **the gyroscope is precise but wanders; the accelerometer and magnetometer are jittery but never wander.** Fusion lets the steady sensors continuously correct the drift of the fast one, while the fast one smooths over their jitter.
>
> Neither is usable alone. Together they are excellent. That is not a coincidence — it is why these three sensors are the ones every IMU contains.

---

## The four-step fusion pipeline

> A typical sensor fusion pipeline in AR/VR applications follows these **sequential stages**.

### Step 1 — Normalize accelerometer and magnetometer data

> Raw accelerometer and magnetometer readings are subject to **scale differences and noise**. The first step is to **normalize these vector measurements to unit length**, ensuring **consistency** and preparing them for integration with other sensors.
>
> **Example:** a 3-axis accelerometer reading might be converted to a **normalized vector representing the device's orientation relative to gravity**.

> [!NOTE]
> Only the **direction** of these vectors carries orientation information — the magnitude does not. Gravity always points down whether the sensor reports 9.79 or 9.83 m/s²; magnetic field strength varies with geography but north is still north. Normalising discards the irrelevant magnitude and puts both sensors on the same footing.

### Step 2 — Derive roll, pitch and yaw angles

> Using normalized accelerometer and magnetometer data, the system computes the device's orientation in terms of **Euler angles**:
>
> - **Roll ($\phi$)** — rotation about the **front-to-back** axis
> - **Pitch ($\theta$)** — rotation about the **side-to-side** axis
> - **Yaw ($\psi$)** — rotation about the **vertical** axis (heading)
>
> This provides an **initial absolute orientation estimate**, which can **correct drift in the gyroscope data**.

> [!TRAP]
> Note the division of labour, which is a favourite exam point: the **accelerometer supplies roll and pitch** (from gravity) and the **magnetometer supplies yaw** (from north). The accelerometer **cannot** supply yaw — rotating about the vertical axis does not change how gravity feels. Without a magnetometer, heading drift is uncorrectable by inertial means alone.

### Step 3 — Convert to quaternions and combine with gyroscope deltas

> The calculated **Euler angles are converted to quaternions** for **robust, continuous 3D orientation tracking**. Simultaneously, the gyroscope provides **rapid, high-frequency changes in orientation**, also expressed as **incremental rotation quaternions ($\Delta q$)**.
>
> The fused orientation is obtained by combining these:
> - **Apply the gyroscope delta rotation.**
> - **Integrate with the orientation estimated from accelerometer and magnetometer data.**
>
> This fusion ensures **fast responsiveness from the gyroscope** and **long-term stability from the other sensors**.

> [!INTUITION]
> **Why convert to quaternions here rather than staying in Euler angles?** Because the Euler estimate was only ever an intermediate — convenient to compute from gravity and north, but subject to **gimbal lock** and awkward to blend. Once both estimates are quaternions they can be combined smoothly (by slerp or a filter gain) with no singularities. **Euler angles are the input format; quaternions are the working format.**

### Step 4 — Re-normalize to prevent error propagation

> Due to **floating-point inaccuracies and integration drift over time**, quaternions must be **periodically re-normalized** (adjusted to unit length) to **maintain valid rotation representations and prevent cumulative errors**.
>
> Without this, small numerical errors could grow, causing **noticeable inaccuracies in object orientation or viewpoint alignment**.

$$q \leftarrow \frac{q}{\lVert q\rVert}$$

---

## The pipeline at a glance

| Step | Operation | Purpose |
|---|---|---|
| **1** | **Normalize** accelerometer + magnetometer | Remove scale differences; keep only direction |
| **2** | Derive **roll, pitch, yaw** | Absolute orientation reference (accel → roll/pitch, mag → yaw) |
| **3** | Convert to **quaternions**, combine with **gyro $\Delta q$** | Fast response + long-term stability, without gimbal lock |
| **4** | **Re-normalize** | Prevent floating-point error accumulating |

> [!EXAM]
> *"Outline the steps involved in sensor fusion"* is a near-certain question. Give the **four steps in order** with **one line of purpose each** — the marks are for the sequence and the reason, not just the names. Add the **why**: each sensor's weakness is another's strength (gyro drifts / accel and mag don't; accel and mag are noisy / gyro isn't).

---

## Applications

> Sensor fusion plays a **foundational role in both AR/VR systems and broader technological applications** where **real-time, reliable tracking** is essential.

### AR/VR headsets

> In devices like **Oculus Quest, HTC Vive and Microsoft HoloLens**, sensor fusion **stabilizes the user's view** and ensures:
>
> - **Smooth and responsive head tracking**
> - **Realistic alignment of virtual objects with physical surroundings**
> - **Minimization of motion sickness** caused by tracking lag or instability
>
> By fusing gyroscope, accelerometer and sometimes magnetometer data, these systems **maintain orientation and position tracking even during rapid or erratic movements**.

### Robotics

> In **mobile robots, drones and autonomous vehicles**, sensor fusion combines data from:
> - **IMUs**
> - **GPS**
> - **LIDAR**
> - **Cameras**
>
> This enables **precise navigation and obstacle avoidance** in **dynamic, cluttered or GPS-denied environments**, ensuring reliable operation in tasks such as **mapping, object retrieval and environmental monitoring**.
>
> **Example:** a drone might use **gyroscope and accelerometer data for rapid motion adjustments**, **GPS for long-term positioning**, and **magnetometers for heading stabilization**.

> [!NOTE]
> Notice the drone example is the **same architecture at a different scale**: a fast-but-drifting sensor (IMU) corrected by a slow-but-absolute one (GPS). Swap GPS for a camera doing SLAM and you have a Quest headset. **Fusion is one idea, applied wherever fast and absolute cannot come from the same sensor.**

---

## Where Unit 3 has arrived

The unit began with **registration** — virtual content must stay aligned with the real world — and every topic since has been an obstacle to it:

- **Displays** determine what alignment even looks like (OST cannot occlude; VST adds latency).
- **The eye** sets the deadline (VOR ⇒ ~20 ms).
- **No single sensor** can meet it — each drifts, is noisy, or needs infrastructure.
- **Filtering** removes noise; **fusion** removes drift.
- The output is a stable **6DOF pose**, $(\mathbf p, q)$, delivered every few milliseconds.

That pose is what the renderer of Unit 2 turns into a view matrix, and what Unit 4 will use for interaction.

> [!INTUITION]
> **The one thing that fusion cannot supply is position without an external reference.** That is the gap Unit 4 fills: computer vision — marker tracking, natural feature detection, SLAM and visual odometry — is how the headset finds the outside world to be absolute *against*.

---

**End of Unit 3.** Next: how the camera actually recovers that pose from images, and what the system does with it.
