---
subject: iot
unit: 2
order: 8
slug: smart-objects
title: Smart Objects
summary: The four defining capabilities of a smart object, how it works, classification by mobility & reporting, and current trends.
minutes: 9
tags: [smart-object, capabilities, mobility, reporting, trends]
---

# Smart Objects

> [!NOTE]
> A **smart object** is an autonomous device that **both senses and acts** — transforming an everyday object into part of a network of intelligent things that learn from and interact with their environment. It goes beyond a passive RFID tag to include **bidirectional communication and real-time sensing**.

## The defining capabilities

A device qualifies as a smart object if it has, at minimum, these characteristics:

1. **Unique identity** — an identifier / name / network address.
2. **Sensing** — perceives ambient conditions (temperature, pressure, light…).
3. **Processing** — an on-board microcontroller/CPU + memory.
4. **Communication** — a wired/wireless interface; network-addressable.
5. **Actuation & logic** — executes pre-programmed application logic to act/respond.

> [!INTUITION]
> Compare with Unit 1's "smart object" (sense + process + communicate + actuate). The extra ingredient stressed here is **unique identity + embedded application logic** — the object isn't just wired up, it has a *name on the network* and its *own program* deciding what to do. That autonomy is what separates a smart object from a plain sensor.

## How a smart object works

It integrates sensors, a microprocessor, wireless interfaces (Wi-Fi/Bluetooth/RFID), and embedded apps:

1. **Sense** the environment (temperature, motion, light, humidity…).
2. **Transmit** the data over wireless networks to servers/platforms.
3. **Process** it with pre-programmed algorithms — often coordinating with other IoT components and big-data analytics.
4. **Act** via actuators (switches, motors, valves, alarms) based on the analysis.
5. **Manage resources** — energy (battery / harvester), compute, and storage.

## Classification by behaviour

| Axis | Categories |
|---|---|
| **Mobility** | **Static** (fixed install — structural sensor, thermostat) vs **Mobile** (wearables, asset trackers) |
| **Reporting frequency** | **Low** (a rust sensor sending monthly data) vs **High** (vibration sensors at hundreds of Hz) |

## Trends in smart objects

- Size is **decreasing**.
- Power consumption is **decreasing**.
- Processing power is **increasing**.
- Communication is **improving** and **increasingly standardised**.

**Advantages of (wirelessly connected) smart objects:** deployment flexibility in hard-to-reach places, simpler scaling to many nodes, lower implementation cost, easier maintenance, effortless addition of new nodes, and resilience to dynamic topology changes.

**Disadvantages:** potentially **less secure** (e.g., hijacked access points), typically **lower transmission speeds**, and greater **environmental influence** on the wireless link.

> [!EXAM]
> Know the **four/five defining capabilities** (identity, sensing, processing, communication, actuation+logic), the **classification axes** (mobility: static/mobile; reporting: low/high), and the **trends** (smaller, lower power, more compute, standardised comms). Be ready to contrast a smart object with a plain sensor (adds identity, logic, actuation, networking).

---

**Next:** the microscopic machines behind modern sensors — MEMS.
