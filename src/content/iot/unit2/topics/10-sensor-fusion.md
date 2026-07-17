---
subject: iot
unit: 2
order: 10
slug: sensor-fusion
title: Sensor Fusion
summary: Combining data from multiple sensors into a single, more accurate estimate — fusion types, levels, the IMU example, and complementary/Kalman filters.
minutes: 11
tags: [sensor-fusion, IMU, Kalman-filter, complementary-filter, redundancy]
---

# Sensor Fusion

> [!NOTE]
> **Sensor fusion** is the process of **combining data from multiple sensors** to produce information that is **more accurate, complete, or reliable** than any single sensor could provide alone.

No single sensor is perfect — each has noise, drift, blind spots, or a limited range. Fusion plays sensors' strengths against each other's weaknesses.

> [!INTUITION]
> Your own balance is sensor fusion: your **inner ear** (rotation), **eyes** (visual reference), and **muscle/joint feedback** all feed your brain, which fuses them into one stable sense of "which way is up." Block one (spin in the dark) and balance degrades — but the others compensate. IoT devices do the same with accelerometers, gyroscopes, and magnetometers.

## Why fuse? — three categories

| Type | Idea | Example |
|---|---|---|
| **Complementary** | Sensors cover **different aspects**; together they give the full picture | Accelerometer (good long-term) + gyroscope (good short-term) → stable orientation |
| **Competitive (redundant)** | Multiple sensors measure the **same** quantity → fault tolerance & noise reduction | Three temperature sensors voting out a faulty one |
| **Cooperative** | Sensors combine to derive information **neither could alone** | Two cameras → 3D depth (stereo vision) |

## The classic example — the IMU

An **IMU** fuses a MEMS **accelerometer** and **gyroscope** (often + **magnetometer**):

- The **accelerometer** measures tilt from gravity — accurate over the long term, but **noisy** and disturbed by motion.
- The **gyroscope** measures rotation rate — smooth and responsive short-term, but **drifts** as small errors integrate over time.

> [!INTUITION]
> Accelerometer and gyro have **opposite flaws**: the accelerometer is noisy but doesn't drift; the gyro is smooth but drifts. Fuse them — trust the gyro for fast changes and the accelerometer to correct slow drift — and you get an orientation estimate that is *both* smooth *and* stable. The whole is better than either part.

## How fusion is done — filters

- **Complementary filter** — a lightweight blend: high-pass the gyro (fast changes), low-pass the accelerometer (slow correction), and add. Cheap, great for microcontrollers.
- **Kalman filter** — the optimal statistical estimator for linear systems with Gaussian noise. It maintains a running estimate plus an uncertainty, then **predicts** and **corrects** with each new measurement, weighting each sensor by how trustworthy it is. The **Extended Kalman Filter (EKF)** handles non-linear systems (used in drones, GPS+IMU navigation).

## Levels of fusion

| Level | Fuses… |
|---|---|
| **Data-level (low)** | Raw sensor data directly |
| **Feature-level (mid)** | Extracted features from each sensor |
| **Decision-level (high)** | Each sensor's decision/classification, then combined |

## Where it's used

Drones & robotics (stable flight), smartphones (orientation, step counting), autonomous vehicles (camera + radar + LiDAR + GPS + IMU), and health wearables (motion + heart-rate context).

> [!EXAM]
> Define sensor fusion (combine multiple sensors → more accurate/reliable estimate), give the **IMU = accelerometer + gyroscope** example explaining their **complementary flaws** (noise vs drift), name the **three fusion types** (complementary, competitive/redundant, cooperative), and the **fusion filters** (complementary filter, **Kalman/EKF**).

---

**Next:** keeping sensors honest over time — calibration and self-calibration.
