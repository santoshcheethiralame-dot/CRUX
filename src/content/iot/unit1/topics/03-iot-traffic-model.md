---
subject: iot
unit: 1
order: 3
slug: iot-traffic-model
title: The IoT Traffic Model
summary: How IoT data flow differs from human-generated traffic — event-driven, periodic, uplink-heavy, mostly stationary — and per-device traffic patterns.
minutes: 9
tags: [traffic-model, uplink, event-based, periodic, QoS]
---

# The IoT Traffic Model

A **traffic model** describes *how, when, and how much* data a system sends. Designing IoT networks demands understanding that **IoT traffic is fundamentally different from human-generated traffic.**

## IoT vs human-generated traffic

When *you* browse the web, you pull large pages on demand, mostly **downloading**, in bursts that peak during waking hours. IoT devices behave almost the opposite way.

| Aspect | Human-generated traffic | IoT-generated traffic |
|---|---|---|
| **Event dependency** | Not event-based (you click when you want) | **Event-based** (a sensor fires when something happens) |
| **Traffic pattern** | Peaks during the day | **Periodic / steady** throughout the day |
| **Data volume** | Often large per session | Varies — from a few bytes to massive (video) |
| **Direction** | High **downlink** (you download) | High **uplink** (devices upload sensor data) |
| **Mobility** | Application-dependent | Mostly **stationary**; some mobile (wearables) |

> [!INTUITION]
> A human is a *consumer* of data → big **downloads**, bursty, daytime-heavy. A sensor is a *producer* of data → small **uploads**, steady, around the clock. This single inversion (downlink-heavy → uplink-heavy) is why cellular networks built for humans needed new profiles (NB-IoT, LTE-M) for things.

## Per-device traffic patterns

Even within IoT, different devices generate very different traffic. A few archetypes:

| Device | Traffic character |
|---|---|
| **Smoke detector / alarm** | **Event-based**, rare, **low-latency**, needs an **ACK** (you must know the alert arrived) |
| **Surveillance camera** | Event-based but **large data transfer** (video streams) |
| **Smart meter** | **Periodic** updates *plus* event-based bursts (e.g., a power-outage notification — small but urgent) |
| **Weather monitoring** | **Periodic / query-based** — sampled at fixed intervals |
| **Street-light controller** | **Command-based** — receives commands more than it sends |
| **Firmware update** | **Occasional** but **large** downloads (new features / security patches) |

## Why the traffic model matters for design

The traffic profile drives nearly every architectural choice:

- **Latency requirements** — a smoke alarm needs millisecond delivery with acknowledgement; a soil sensor can tolerate minutes.
- **Bandwidth & protocol** — tiny periodic readings suit lightweight **CoAP/MQTT over UDP**; video needs high-bandwidth links.
- **Power budget** — every transmission drains a battery, so devices **batch** and **sleep**, trading freshness for years of battery life.
- **Network choice** — uplink-heavy, low-rate, stationary traffic is exactly what **LPWANs** (LoRaWAN, NB-IoT) are optimised for.
- **Quality of Service (QoS)** — critical events (alarm) get reliable, acknowledged delivery; routine telemetry can be best-effort.

> [!TRAP]
> Don't assume "more data = more important." A **power-outage notification** from a smart meter is *tiny* (a few bytes) but far more urgent than the megabytes of routine consumption data it normally sends. Urgency is about **latency and reliability**, not volume.

> [!EXAM]
> The signature comparison table (event-based, periodic, **uplink-heavy**, mostly stationary) is a frequent question. Be ready to: contrast IoT vs human traffic on **direction (uplink vs downlink)** and **pattern (periodic vs daytime-peak)**, and classify a given device's traffic (event-based vs periodic vs command-based) with a justification.

---

**Next:** how those devices actually reach the internet — connectivity technologies and the role of the gateway.
