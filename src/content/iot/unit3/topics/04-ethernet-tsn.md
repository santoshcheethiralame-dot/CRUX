---
subject: iot
unit: 3
order: 4
slug: ethernet-tsn
title: Ethernet TSN (Time-Sensitive Networking)
summary: Upgrading best-effort Ethernet into deterministic, real-time networking — the IEEE 802.1 TSN features and where they're used.
minutes: 9
tags: [TSN, deterministic, real-time, 802.1, jitter]
---

# Ethernet TSN (Time-Sensitive Networking)

> [!NOTE]
> **Time-Sensitive Networking (TSN)** is a set of **IEEE 802.1** standards that enhance standard Ethernet with **deterministic, real-time** communication — guaranteeing delivery of packets at a precise time, with low latency and minimal jitter. It's "supercharged Ethernet" for mission-critical IoT.

## Why TSN? — the problem with plain Ethernet

> [!NOTE]
> Traditional Ethernet is **best-effort** — it makes no guarantee about *when* a packet arrives. That's fine for email or video, but unacceptable for **cyber-physical systems** that need strict timing.

These systems require guaranteed timing:

- **Industrial automation** (coordinating robot arms)
- **Autonomous vehicles** (sensor → control → actuator in microseconds)
- **Smart-grid control** (real-time switching)
- **Robotics in manufacturing**

> [!INTUITION]
> Best-effort vs deterministic is the difference between **"it'll probably get there soon"** and **"it WILL get there in exactly X microseconds."** When a robot arm or a brake actuator depends on a packet, "probably soon" can cause a collision. TSN turns Ethernet's *probably* into a *guarantee*.

## Key TSN features

| Feature (standard) | What it does | Why it matters for IoT |
|---|---|---|
| **Time synchronization (802.1AS)** | All devices sync clocks to sub-microsecond precision | Coordinated action between sensors & actuators |
| **Traffic scheduling (802.1Qbv)** | Packets sent in pre-defined time slots | Critical messages sent exactly when needed |
| **Traffic shaping (802.1Qav)** | Controls data flow to avoid congestion | Prevents delays to time-sensitive data |
| **Frame preemption (802.1Qbu / 802.3br)** | Urgent frames interrupt lower-priority ones | Life-/time-critical data always gets priority |
| **Resource reservation (802.1Qcc)** | Reserves bandwidth in advance for critical flows | Guarantees bandwidth for high-priority apps |

> [!INTUITION]
> The features combine into a guarantee: **synchronised clocks** (everyone agrees on the time) + **scheduled time slots** (critical traffic has reserved windows) + **preemption** (urgent data jumps the queue) + **reserved bandwidth** (capacity is guaranteed). Together they make latency *bounded and predictable*, not just "usually low."

## Applications

- **IIoT** — coordinating assembly-line robots; sensor feedback and actuation within microseconds.
- **Autonomous vehicles** — connecting LiDAR/radar, control systems, and actuators with near-zero-latency delivery.
- **Smart grid** — real-time monitoring and automated switching to prevent outages.
- **Healthcare IoT** — ICU devices where alarms/readings must never be delayed.

> [!EXAM]
> Define TSN (**IEEE 802.1**, deterministic real-time Ethernet, low jitter), explain **why** (best-effort Ethernet can't guarantee timing for cyber-physical systems), and name **2–3 features** (time sync 802.1AS, scheduling 802.1Qbv, frame preemption) with their purpose. Know it targets **IIoT, autonomous vehicles, smart grid.**

---

**Next:** networking over existing power lines — PLC.
