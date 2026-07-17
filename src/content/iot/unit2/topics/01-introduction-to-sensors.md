---
subject: iot
unit: 2
order: 1
slug: introduction-to-sensors
title: The "Things" — Sensors & Transducers
summary: What the "things" in IoT are, the definition of a sensor/transducer, and how sensors act as the eyes and ears of IoT.
minutes: 9
tags: [sensor, transducer, things, signal, perception]
---

# The "Things" — Sensors & Transducers

Unit 1 looked at IoT from the top down (architecture, verticals). Unit 2 zooms into the bottom layer — the **"Things"** — the physical hardware that senses and acts.

> [!NOTE]
> In IoT, **"things"** are physical devices that can **sense, process, and communicate.** They fall into three groups: **sensors** (measure physical parameters), **actuators** (act on the environment), and **smart objects** (combine sensing, processing, and communication).

## What is a sensor?

> [!NOTE]
> A **sensor** is a device that detects a change in its environment and produces a corresponding output. It **converts a physical phenomenon** (temperature, light, motion…) into a **measurable signal** — usually an analog voltage, sometimes a digital signal — that can be read, displayed, or processed further.

Sensors are the **eyes and ears of IoT**: without them, the system is blind to the physical world. Every reading that flows up the architecture starts here.

Common examples:

| Sensor | Phenomenon → output |
|---|---|
| **Thermometer / thermistor** | Temperature → voltage/resistance |
| **Microphone** | Sound waves → electrical signal |
| **LDR (Light Dependent Resistor)** | Light intensity → resistance |
| **Accelerometer** | Motion / orientation → voltage |

## Sensor vs transducer

These terms are often used interchangeably, but there is a precise distinction:

> [!INTUITION]
> A **transducer** is *any* device that converts one form of energy into another. A **sensor** is a transducer used specifically to **measure** (input side: physical → electrical). An **actuator** is a transducer on the **output side** (electrical → physical action). So: *every sensor is a transducer, but not every transducer is a sensor.*

## The signal chain

A raw sensor output is rarely usable as-is. A typical sensing chain is:

**Physical input → sensing element → signal conditioning (amplify/filter) → ADC → digital value → processor**

- The **sensing element** does the physical-to-electrical conversion.
- **Signal conditioning** amplifies weak signals and filters noise.
- The **ADC (Analog-to-Digital Converter)** turns the analog voltage into a number the microcontroller can use.

> [!EXAM]
> Be able to **define a sensor** (detects a change → measurable signal, "eyes and ears of IoT") and **distinguish sensor / transducer / actuator** (sensor = input/measure, actuator = output/act, transducer = the general energy-converter superclass). Give 3–4 sensor examples with the quantity each measures.

---

**Next:** the many ways sensors are classified — by quantity, power, and contact.
