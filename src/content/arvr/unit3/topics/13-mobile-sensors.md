---
subject: arvr
unit: 3
order: 13
slug: mobile-sensors
title: Mobile Sensors and Their Failure Modes
summary: GPS, gyroscopes, accelerometers and magnetometers — what each measures, and the specific way each one fails.
minutes: 12
tags: [mobile-sensors, GPS, DGPS, IMU, gyroscope, accelerometer, magnetometer, drift]
---

# Mobile Sensors and Their Failure Modes

> Mobile AR/VR systems rely on **embedded sensors within smartphones, tablets and standalone headsets** to track movement and orientation. While they enable **portability and untethered experiences**, these sensors often **compromise on precision due to drift and interference**.

**Every sensor here has a specific, named failure mode.** Learning the failure is more important than learning the function — because the failures are what motivate sensor fusion.

---

## GPS

> Used primarily for **outdoor AR applications**, GPS provides geographical positioning by **triangulating signals from satellites**.

| | |
|---|---|
| **Accuracy** | Typically **1–100 metres**; improvable to **sub-metre** with **Differential GPS (DGPS)** |
| **Limitations** | **Limited or no functionality indoors**; susceptible to **atmospheric and signal obstructions** |
| **Example** | AR navigation apps and location-based games like **Pokémon GO** |

> [!TRAP]
> **1–100 m is hopeless for registration.** At 10 m of error, a virtual object anchored to a building could appear inside the road. GPS is only ever used for **coarse localisation** — *which* building you are near — with fine registration handed to vision. Any exam answer claiming GPS alone enables AR registration is wrong.

---

## Inertial Measurement Units (IMUs)

> IMUs combine several motion sensors into a single module.

### 1. Gyroscopes

> **Measure angular velocity** to track orientation changes.
>
> **Issue:** over time, **errors accumulate — known as orientation drift**.

> [!DERIVE]
> **Why gyroscopes drift.** A gyroscope reports **angular velocity $\omega$**, not angle. To get orientation you must **integrate**:
> $$\theta(t) = \theta_0 + \int_0^t \omega(\tau)\,d\tau$$
> Any constant **bias** $\epsilon$ in the measurement integrates into an error that **grows linearly with time**: $\epsilon t$. A bias of just 0.01°/s — excellent for a consumer MEMS gyro — accumulates to **36° after an hour**.
>
> The gyro is *fast and smooth in the short term* and *useless in the long term*. Remember that shape; it is the whole basis of the complementary filter.

### 2. Accelerometers

> **Measure linear acceleration** along three axes.
>
> **Issue:** **double integration** of acceleration to derive position leads to **rapidly accumulating errors**.

> [!DERIVE]
> **Why accelerometers are worse.** Position requires integrating **twice**:
> $$\mathbf{p}(t) = \mathbf p_0 + \mathbf v_0 t + \iint \mathbf a\,d\tau^2$$
> A constant bias $\epsilon$ now produces an error of $\tfrac12\epsilon t^2$ — **quadratic**, not linear. A bias of 0.01 m/s² gives **18 cm of error after 6 seconds**, and 5 m after a minute.
>
> **This is why inertial position tracking alone is impossible**, and why 6DOF headsets need cameras or base stations. The accelerometer's real job is different — see below.

### 3. Magnetometers

> **Measure the Earth's magnetic field** to determine **heading or compass direction**.
>
> **Issue:** **prone to distortion from nearby electronic devices or metallic structures.**

---

## Advantages and limitations, as a whole

| | |
|---|---|
| **Advantages** | **Compact and low-cost.** **Available in most consumer devices** — smartphones, AR glasses, VR headsets. |
| **Limitations** | **Drift and error accumulation over time.** **Requires frequent correction via sensor fusion techniques.** |
| **Example** | Smartphone AR platforms like **Google ARCore** and **Apple ARKit** rely heavily on IMU data for motion tracking. |

---

## The complementarity that makes fusion work

This is the key insight, and it is what the whole next-but-one topic is built on:

| Sensor | Good at | Bad at | Error behaviour |
|---|---|---|---|
| **Gyroscope** | **Fast, smooth** short-term orientation change | Long-term absolute orientation | **Drifts** — error grows linearly |
| **Accelerometer** | **Long-term absolute** reference — it always feels **gravity**, giving true *down* | Short term — swamped by motion; useless for position | **Noisy** but does **not drift** |
| **Magnetometer** | **Absolute heading** — it always feels magnetic north | Anything near metal or electronics | Noisy, distortable, but does **not drift** |
| **GPS** | **Absolute global position** outdoors | Indoors; fine precision | Coarse but bounded |

> [!INTUITION]
> **The failure modes are opposites, and that is the whole trick.**
>
> - The **gyroscope** is a sprinter: precise moment to moment, but wanders off course over time.
> - The **accelerometer and magnetometer** are a compass and a plumb line: jittery and easily disturbed, but they **never drift**, because they measure things that do not move — gravity and magnetic north.
>
> Combine them so the slow, absolute sensors **continuously correct the drift** of the fast one, and the fast one **smooths over the noise** of the slow ones. Neither is usable alone; together they are excellent. That is **sensor fusion**, and the complementary filter is its simplest expression.

> [!NOTE]
> Notice what the accelerometer is *actually* used for. Not position — the double integration makes that hopeless. It measures **gravity**, which gives an absolute **roll and pitch** reference. It cannot give **yaw**, because rotating about the vertical axis does not change how gravity feels — which is exactly why a **magnetometer** is needed for the third angle.

> [!EXAM]
> A very likely question: *"What are mobile sensors in AR/VR and what are their limitations?"* Give the four sensors, what each measures, and — crucially — **the specific failure of each**: GPS coarse and indoor-blind; gyroscope **drift from single integration**; accelerometer **quadratic error from double integration**; magnetometer **distortion from metal and electronics**. Then close with the complementarity table, which sets up sensor fusion as the answer.

---

**Next:** how orientation specifically is computed from these readings.
