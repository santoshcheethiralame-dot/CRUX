---
subject: iot
unit: 3
order: 3
slug: poe
title: Power over Ethernet (PoE)
summary: Carrying data and electrical power on one Ethernet cable — PSE/PD roles, the IEEE 802.3af/at/bt standards, and use cases.
minutes: 7
tags: [PoE, power, PSE, PD, 802.3bt]
---

# Power over Ethernet (PoE)

> [!NOTE]
> **Power over Ethernet (PoE)** lets a single Ethernet cable carry **both data and electrical power** simultaneously. This removes the need for separate power supplies or wiring for devices like sensors, cameras, and access points.

## The problem it solves

Normally a device like an IP camera or wireless access point needs **two** connections: a network cable **and** a power cable to a wall outlet. PoE collapses these into **one** cable that delivers:

- **High-speed data** (1 Gbps and beyond), and
- **Power** (up to 90 W in the latest standard).

> [!INTUITION]
> PoE's value is **deployment freedom**: you can mount a camera or sensor on a ceiling, pole, or remote wall where there's no power socket — the network cable powers it. One cable, one install, no electrician.

## How it works

- **PSE (Power Sourcing Equipment)** — a PoE switch or injector that **sends** power over the cable.
- **PD (Powered Device)** — the IP camera, sensor, or access point that **receives** both data and power.
- PoE uses two of the four twisted pairs in Cat5e/Cat6 cables to carry power (or all four in high-power variants).

## The IEEE standards

| Standard | Name | Power supplied | Typical use |
|---|---|---|---|
| **IEEE 802.3af** | PoE | ~15.4 W | IP phones, Wi-Fi access points |
| **IEEE 802.3at** | PoE+ | ~30 W | PTZ cameras, sensors, small appliances |
| **IEEE 802.3bt** | PoE++ | ~60 W / 90 W | Digital signage, PoE lighting, industrial IoT |

> [!INTUITION]
> The standards are just **rungs on a power ladder** — af (15 W) → at/PoE+ (30 W) → bt/PoE++ (60–90 W). More demanding devices need a higher rung. Remember the order af → at → bt and roughly 15 → 30 → 90 W.

> [!EXAM]
> Know that PoE carries **data + power on one cable**, the **PSE (source) / PD (powered device)** roles, and the **three standards in order** (802.3af ≈15 W, 802.3at/PoE+ ≈30 W, 802.3bt/PoE++ ≈60–90 W). A common question: "How does PoE simplify IoT deployment?" → one cable, no separate power, mount anywhere.

---

**Next:** making Ethernet real-time — Time-Sensitive Networking.
