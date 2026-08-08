---
subject: arvr
unit: 3
order: 8
slug: sensors-computing
title: Sensors and Computing Platforms
summary: IMUs, GPS and external tracking; tethered, mobile and standalone computing — and the latency budget that constrains all of them.
minutes: 12
tags: [sensors, IMU, GPS, DGPS, lighthouse, GPU, tethered, standalone, latency]
---

# Sensors and Computing Platforms

> A typical AR/VR system architecture includes **displays, sensors, computing platforms and dedicated rendering engines**. One of the primary challenges is **minimizing latency** — the delay between user action and system response — and achieving **accurate sensor fusion** to precisely track user movements and environment changes in real time.

## Sensors

> Sensors **track user movement, orientation and environmental data** to ensure accurate placement and interaction of virtual objects.

### Inertial Measurement Units (IMUs)

> IMUs typically combine:
> - **Gyroscopes** — for detecting **angular rotation**
> - **Accelerometers** — for measuring **linear motion**
> - and sometimes **Magnetometers** — for determining **heading** based on Earth's magnetic field

A **9-DOF IMU** is all three; a 6-DOF IMU is gyroscope + accelerometer. Each has a characteristic failure mode, which is the subject of the mobile-sensors topic.

### GPS (Global Positioning System)

> Used primarily in **outdoor AR systems** to determine the user's **geographical location**. While standalone GPS offers **1–100 metre accuracy**, it can be improved through **Differential GPS (DGPS)**.

> [!NOTE]
> **How DGPS works** — and this is a course MCQ. A **ground station at a precisely known location** compares its GPS-computed position with its true position, deriving the current error (mostly caused by **atmospheric distortion** of the signal). It broadcasts that **correction signal** to nearby receivers, which apply it. Accuracy improves from metres to **sub-metre**.
>
> The MCQ's distractors claim GPS is an "outside-in system with signals transmitted from Earth to satellites" (backwards — satellites transmit to receivers) and that "GPS accuracy is fixed" (it is not — it varies with atmospheric conditions and satellite geometry).

### External tracking systems

> Some VR systems use **external base stations or cameras** — e.g. **Lighthouse tracking in the HTC Vive** — to track the position of HMDs and controllers in 3D space.

> [!INTUITION]
> **Outside-in vs inside-out**, the distinction underneath this:
> - **Outside-in** — fixed external sensors watch the headset (Lighthouse, camera rigs). **Very accurate and low-drift**, because the reference is genuinely fixed — but it requires **installation** and confines you to the tracked volume.
> - **Inside-out** — the headset's own cameras watch the room (Quest, HoloLens). **Portable, no setup, unlimited area** — but the headset must build and maintain its own map, which is **SLAM** (Unit 4).
>
> Lighthouse is the clever middle case: the base stations **sweep laser planes** across the room and the headset's photodiodes time their arrival. The base stations emit; the headset computes. It gets outside-in accuracy with inside-out computation.

---

## Computing devices

> Computing platforms **process inputs, run the software stack and generate real-time visual outputs**. Depending on system complexity and mobility requirements, these range from **high-performance PCs to standalone mobile devices**.

| Platform | Detail | Trade-off |
|---|---|---|
| **High-performance GPUs** | **Essential for rendering complex, high-resolution 3D environments at high frame rates** | Power and heat |
| **Tethered systems** | Headsets like **Oculus Rift** or **HTC Vive Pro** connect to **powerful desktop computers** for high-end applications | Maximum fidelity, but a cable and a fixed location |
| **Mobile and standalone devices** | **Google Cardboard** and **Meta Quest 3** operate using **mobile processors**, offering **portability with slightly reduced graphical fidelity** | Freedom of movement, constrained by battery and thermals |

> [!NOTE]
> **Google Cardboard** is the minimal case worth remembering: a folded cardboard holder plus two lenses, using **your phone** as display, sensor and computer. It has no positional tracking at all — only 3DOF orientation from the phone's IMU. It demonstrated that the *optics* of VR are cheap and that **tracking and compute** are what actually cost money.

## The latency budget

The sentence about minimising latency deserves unpacking, because it sets every other number in this unit.

**Motion-to-photon latency** is the total delay from the user moving to the corresponding photons reaching their eye:

```
  head moves ─▶ sensor ─▶ fusion ─▶ application ─▶ render ─▶ display ─▶ photons
                sample     filter     update        GPU       scan-out
  └──────────────────── target: under ~20 ms total ────────────────────┘
```

| Stage | Contributes |
|---|---|
| Sensor sampling | 1–2 ms (IMUs run at 500–1000 Hz) |
| Sensor fusion & filtering | ~1 ms |
| Application update | one frame |
| Rendering | one frame (11 ms at 90 fps) |
| Display scan-out & persistence | several ms |

> [!INTUITION]
> **Why ~20 ms?** Because of the **vestibulo-ocular reflex** — when your head turns, your eyes counter-rotate to hold your gaze steady, and they do it within about **10 ms**. Your visual system is therefore *calibrated* to expect the world to stay put during head motion. Any lag makes the virtual world **swim**, which is both a registration failure in AR and a sickness trigger in VR.
>
> This is the number that forces **90 fps**, **low-persistence displays** and **prediction** — and the next-but-one topic explains the reflex itself.

> [!EXAM]
> *"What hardware is required for an AR/VR system?"* — answer in the course's three groups: **displays** (previous topic), **sensors** (IMU = gyro + accelerometer + magnetometer; GPS with 1–100 m accuracy improved by DGPS; external tracking such as Lighthouse) and **computing devices** (GPU; tethered vs mobile/standalone, with the fidelity-versus-portability trade-off). Closing with the **latency requirement** shows you understand what constrains the choices.

---

**Next:** the software stack that runs on this hardware.
