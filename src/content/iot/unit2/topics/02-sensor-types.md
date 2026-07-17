---
subject: iot
unit: 2
order: 2
slug: sensor-types
title: Types & Classification of Sensors
summary: Classifying sensors by measured quantity, by power (active vs passive), by intrusion (invasive vs non-invasive), and by contact.
minutes: 11
tags: [classification, active-passive, invasive, contact, sensor-catalog]
---

# Types & Classification of Sensors

Sensors can be sliced along several independent axes. The four most-tested are: **by measured quantity, by power source, by intrusion, and by contact.**

## 1. By measured quantity

The most natural grouping — what physical thing does it measure?

| Family | Measures | Examples | Applications |
|---|---|---|---|
| **Temperature** | Heat / temperature | Thermocouple, RTD, thermistor | HVAC, engines, process control |
| **Proximity** | Object presence (no contact) | Inductive, capacitive, ultrasonic | Robotics, parking, conveyors |
| **Pressure** | Force of a fluid/gas | Barometer, piezoelectric, capacitive | Weather, hydraulics, tyre pressure |
| **Position** | Linear/rotary displacement | Encoders, LVDT | Motion control, robotics |
| **Humidity** | Moisture content | Capacitive, resistive | Agriculture, HVAC |
| **Gas/chemical** | Gas presence/composition | MQ-series, electrochemical | Safety, air quality |
| **Motion** | Movement | PIR, ultrasonic, accelerometer | Security, automation |
| **Optical/vision** | Light, images | LDR, photodiode, CMOS/CCD | Imaging, surveillance |
| **Level / flow / force** | Tank level, flow rate, load | Ultrasonic, strain gauge | Industrial monitoring |

## 2. By power source — Active vs Passive

> [!NOTE]
> An **active sensor** *emits its own energy* (sound, light, radio) into the environment and measures the **reflected/returned signal**. A **passive sensor** emits nothing — it simply **detects natural energy** (heat, light, sound) already coming from the object.

| | Active | Passive |
|---|---|---|
| **How it works** | Emits energy, measures the echo/reflection | Detects existing natural energy |
| **Power** | Needs continuous power supply | Low power / often battery-less |
| **Strengths** | Higher range/accuracy; works in the dark | Cheap, low-noise, no interference emitted |
| **Examples** | Ultrasonic, radar, LiDAR | Thermocouple, photodiode/LDR, PIR |

> [!INTUITION]
> Active = a **bat** (sends a chirp, listens for the echo). Passive = an **eye** (just receives whatever light arrives). The bat works in darkness but spends energy; the eye is cheap but depends on ambient light.

> [!TRAP]
> A **PIR (Passive Infrared) sensor** is *passive* — it detects the infrared heat radiating from a body; it does **not** emit IR. Don't confuse it with an active IR proximity sensor that emits an IR beam.

## 3. By intrusion — Invasive vs Non-invasive

| | Invasive | Non-invasive |
|---|---|---|
| **Interaction** | Inserted into / becomes part of the system | Placed externally, doesn't disturb the system |
| **Measurement** | Direct / internal | Indirect / external |
| **Accuracy** | Often higher (close to source) | May be lower |
| **Trade-off** | May alter the system; install disrupts it | Easy, safe, reusable |
| **Examples** | Thermocouple in an engine cylinder, pH probe, blood-glucose needle | IR thermometer, clamp-on flowmeter, wearable pulse tracker, MRI |

## 4. By contact — Contact vs No-contact

- **Contact** sensors need direct physical contact with the target (thermocouple touching a surface, strain gauge).
- **No-contact** sensors measure from a distance (IR thermometer, ultrasonic).

> [!INTUITION]
> These axes overlap but aren't identical. An IR thermometer is **passive** (receives IR), **non-invasive**, and **no-contact** all at once. Always state *which axis* you're classifying on — a sensor sits at one point on *each* axis independently.

> [!EXAM]
> The highest-frequency item is **active vs passive** (emits energy vs detects natural energy) with correct examples (ultrasonic/radar/LiDAR = active; thermocouple/LDR/PIR = passive). Also know **invasive vs non-invasive** and **contact vs no-contact**, and be able to classify a given sensor on all axes.

---

**Next:** how we judge a sensor's quality — static performance metrics.
