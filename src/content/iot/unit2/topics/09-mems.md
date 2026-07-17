---
subject: iot
unit: 2
order: 9
slug: mems
title: MEMS — Micro-Electro-Mechanical Systems
summary: Miniaturized mechanical+electrical elements on a chip — structure, fabrication, examples (accelerometer, gyroscope), and why they enabled modern IoT.
minutes: 9
tags: [MEMS, microfabrication, accelerometer, gyroscope, silicon]
---

# MEMS — Micro-Electro-Mechanical Systems

> [!NOTE]
> **MEMS (Micro-Electro-Mechanical Systems)** are **miniaturized mechanical and electro-mechanical elements** — sensors, actuators, and structures — fabricated using **microfabrication** on silicon. They combine mechanical, electrical, and sometimes fluidic components on a single chip, at sizes from **micrometers to a few millimeters.**

MEMS are the reason a full accelerometer, gyroscope, and microphone fit inside a phone or a drone. They made high-quality sensing **cheap, tiny, and low-power** — a key enabler of the modern IoT explosion.

## Structure of a MEMS device

A typical MEMS system contains:

- **Sensor element** — a micromechanical structure, often a **mass-spring** system that moves in response to acceleration, pressure, etc.
- **Signal conditioning** — amplification of the tiny electrical change.
- **Actuation** (optional) — some MEMS also move/act.
- **Microcontroller / interface** — to read out and communicate.

It is built on a **silicon wafer using photolithography** (the same process family as chips), and may integrate **analog and digital circuits on the same die**.

> [!INTUITION]
> A MEMS accelerometer is a **microscopic mass on springs**. When the device accelerates, the tiny mass lags behind and shifts, changing the capacitance between it and fixed plates. That capacitance change is read as acceleration. Etch this structure into silicon and you get a millimetre-scale, mass-produced motion sensor for cents.

## Common MEMS examples

| MEMS device | Senses | Found in |
|---|---|---|
| **Accelerometer** | Linear acceleration / tilt | Phones (screen rotation), wearables, airbags |
| **Gyroscope** | Angular rotation rate | Drones (stabilisation), game controllers, navigation |
| **Pressure sensor** | Pressure / altitude | Barometers, tyre monitors, weather |
| **MEMS microphone** | Sound | Phones, smart speakers |
| **MEMS magnetometer** | Magnetic field | Digital compass |

An **IMU (Inertial Measurement Unit)** typically bundles a MEMS accelerometer + gyroscope (+ magnetometer) — the foundation for motion tracking and the **sensor-fusion** topic that follows.

## Why MEMS matter for IoT

- **Tiny** — fit anywhere, even wearables and implants.
- **Cheap** — mass-produced on wafers like chips.
- **Low power** — suited to battery/energy-harvested nodes.
- **Integrable** — sensor + electronics on one die → smart sensors.

> [!EXAM]
> Expand the acronym (**Micro-Electro-Mechanical Systems**), state that they are **silicon-microfabricated mechanical+electrical elements** at micro-millimetre scale, name **examples (accelerometer, gyroscope, pressure, microphone)**, and explain **why they enabled cheap, tiny, low-power IoT sensing**. Often paired with the IMU/sensor-fusion question.

---

**Next:** combining many sensors into one better estimate — sensor fusion.
