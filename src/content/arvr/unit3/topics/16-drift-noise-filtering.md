---
subject: arvr
unit: 3
order: 16
slug: drift-noise-filtering
title: Physics of the Virtual World — Drift, Noise and Filtering
summary: The two error types, where each comes from, and the Kalman and complementary filters that correct them.
minutes: 12
tags: [drift, noise, kalman-filter, complementary-filter, sensor-bias, integration-error, physics]
---

# Physics of the Virtual World — Drift, Noise and Filtering

## Simulating physics

> In immersive AR/VR environments, **simulating real-world physical behaviours** such as **gravity, collisions, inertia and object dynamics** is crucial to achieving a **sense of realism and presence**. These simulations govern how objects move, interact and respond to forces within the virtual space.
>
> To accurately track user orientation and object rotations in 3D, complex mathematical representations like **quaternions** are used instead of traditional **Euler angles**, as they help **avoid issues like gimbal lock** and provide smooth, continuous rotational transitions.

> Furthermore, the integration of **real-world sensor data** (from gyroscopes, accelerometers and magnetometers) introduces challenges such as **drift, noise and dead reckoning errors**, necessitating **correction algorithms and sensor fusion techniques** to maintain system accuracy over time.

Two distinct problems follow, and they need **different** solutions.

---

## Drift

> **Drift** refers to the **gradual accumulation of error over time** in the estimated position or orientation of a tracked object or user. It occurs primarily due to:
>
> - **Sensor bias** — a constant offset in measurements.
> - **Numerical integration errors** when converting sensor outputs like angular velocity or acceleration into orientation and position.
>
> **Example:** in IMU-based tracking, continuous integration of small errors from gyroscopes or accelerometers can cause the virtual object to **slowly shift away from its intended position/orientation**.
>
> **Solution:** drift is typically corrected using **sensor fusion techniques**, which **combine multiple sensor inputs** (gyroscope + accelerometer + magnetometer) to **compensate for individual sensor weaknesses**.

## Noise

> **Noise** refers to **random fluctuations and inaccuracies in sensor measurements** caused by factors such as **electronic interference, temperature variations and mechanical vibrations**.
>
> **Example:** an accelerometer might detect minor, rapid changes in acceleration values **even when the device is stationary**, introducing **jitter or instability** in the virtual environment.

---

## The crucial distinction

| | **Drift** | **Noise** |
|---|---|---|
| Nature | **Systematic** — a consistent offset | **Random** — zero-mean fluctuation |
| Behaviour over time | **Accumulates and grows** | Stays roughly constant in magnitude |
| Caused by | Sensor **bias**, **integration** error | Electronic interference, temperature, vibration |
| Looks like | Content slowly **wandering away** from its anchor | Content **shaking or jittering** in place |
| Averaging helps? | **No** — averaging a bias gives you the bias | **Yes** — random errors cancel out |
| Fixed by | **An absolute reference** — sensor fusion | **Filtering** — Kalman, complementary |

> [!INTUITION]
> This table is the heart of the topic. **You cannot filter away drift and you cannot fuse away noise.**
>
> - Averaging a thousand readings of a gyro with a 0.01°/s bias gives you… a very confident 0.01°/s bias. Drift needs something that **knows the truth** — gravity, magnetic north, a camera.
> - Meanwhile no amount of cross-referencing removes random jitter; that needs **smoothing over time**.
>
> Confusing the two is the most common conceptual error in this topic, and exam questions exploit it.

---

## The filters

> To mitigate noise, AR/VR systems employ **filtering algorithms**:

### Kalman filter

> **Optimal recursive filters** that **estimate the current state of a dynamic system by minimizing the mean squared error**. They **combine prior state estimates with new sensor measurements while accounting for noise**.

The two-step cycle:

```
   ┌──────────────┐                    ┌──────────────┐
   │   PREDICT    │───────────────────▶│    UPDATE    │
   │ where should │                    │ what do the  │
   │ it be, from  │                    │ sensors say? │
   │ the model?   │◀───────────────────│ blend the two│
   └──────────────┘                    └──────────────┘
```

1. **Predict** — use a motion model to forecast the next state, and grow the uncertainty.
2. **Update** — weigh the prediction against the new measurement, **in proportion to how much each is trusted**, and shrink the uncertainty.

> [!NOTE]
> "**Optimal**" is a precise claim, not marketing: for a **linear** system with **Gaussian** noise, the Kalman filter provably minimises mean squared error — no estimator does better. Real AR/VR systems are non-linear (rotations are not linear), so they use the **Extended** or **Unscented** Kalman Filter, which linearise around the current estimate and lose the strict optimality guarantee.

### Complementary filter

> **Simpler filters that merge fast-changing but drift-prone gyroscope data with slower, more stable accelerometer or magnetometer data.**

$$\theta_{k+1} = \alpha\big(\theta_k + \omega\,\Delta t\big) \;+\; (1-\alpha)\,\theta_{\text{accel}}$$

with $\alpha$ typically **0.95–0.98**.

> [!INTUITION]
> Read the formula as a sentence: *"trust the gyroscope for the short term (98%), and let the accelerometer nudge you back toward true vertical (2%)."*
>
> It is a **high-pass filter on the gyro** and a **low-pass filter on the accelerometer** — each sensor is used only over the frequency band where it is good. The gyro's fast, smooth response passes; its slow drift is filtered out. The accelerometer's stable long-term average passes; its jitter is filtered out. **The two filters are complements, which is where the name comes from.**

| | **Kalman filter** | **Complementary filter** |
|---|---|---|
| Basis | Statistical — models **uncertainty** explicitly | Frequency — **high-pass + low-pass** |
| Weighting | **Adaptive**, computed each step from covariances | **Fixed** constant $\alpha$ |
| Optimality | **Provably optimal** (linear + Gaussian) | Not optimal, but usually good enough |
| Cost | Matrix operations — heavier | A few multiplies — **very cheap** |
| Tuning | Process and measurement noise covariances | One parameter, $\alpha$ |
| Used in | Headsets, robotics, aerospace, autonomous vehicles | Cheap IMUs, drones, hobby projects, microcontrollers |

> **Practical application:** in a VR headset, filtering ensures that the **user's viewpoint remains steady and responsive**, free from jittery or erratic movements caused by sensor noise.

---

## Drift correction — a worked framing

The course question bank asks: *"Given a tilt drift and a heading drift, explain how drift correction is applied to estimate the correct orientation."*

| Drift | Which angles it affects | Corrected by | Why that sensor |
|---|---|---|---|
| **Tilt drift** | **Roll and pitch** | **Accelerometer** | It measures **gravity**, which always points down — an absolute vertical reference |
| **Heading drift** | **Yaw** | **Magnetometer** | It measures **magnetic north** — an absolute horizontal reference |

**The correction procedure:**

1. **Integrate the gyroscope** to get a fast orientation estimate — this is where drift enters.
2. **Compute the reference orientation** independently: roll and pitch from the accelerometer's gravity vector; yaw from the magnetometer.
3. **Compare** the two. The difference is the accumulated drift.
4. **Apply a fraction of that correction each step** — via a complementary filter's $(1-\alpha)$ term, or a Kalman update — so the estimate is pulled gently back rather than snapping.
5. **Re-normalise** the quaternion.

> [!TRAP]
> **Why apply only a fraction?** Because the accelerometer is only a valid vertical reference when the device is **not accelerating** — during real motion it measures gravity *plus* movement and is briefly wrong. Correcting fully toward it would inject that error straight into your orientation. Correcting slowly means the accelerometer wins over **minutes** (where the gyro drifts) while the gyro wins over **milliseconds** (where the accelerometer lies).
>
> Note also that **the accelerometer cannot fix yaw at all** — rotating about the vertical axis does not change how gravity feels. Yaw drift is correctable **only** by the magnetometer, or by vision.

> [!EXAM]
> *"What are the challenges in virtual physics simulations?"* — give **drift** (definition, two causes, IMU example, fixed by sensor fusion) and **noise** (definition, causes, stationary-accelerometer example, fixed by filtering), then the **distinction table**, then the two filters with what each is good for. The single sentence that shows understanding: **drift is systematic and needs an absolute reference; noise is random and needs smoothing.**

---

**Next:** the pipeline that puts all of this together.
