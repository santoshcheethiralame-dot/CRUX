---
subject: iot
unit: 1
order: 11
slug: architecture-types
title: Types of IoT Architectures
summary: The taxonomy of architectural styles — cloud-centric, edge/fog-centric, AIoT, middleware-based, SOA, and digital-twin.
minutes: 9
tags: [cloud-centric, edge-fog, AIoT, SOA, digital-twin, middleware]
---

# Types of IoT Architectures

Beyond counting layers, IoT systems are classified by **where processing happens** and **how components are organised**. Each style answers a different dominant driver.

| Architecture | Core idea | Best when the driver is… |
|---|---|---|
| **Three-Layer** | Perception → Network → Application | Simplicity, teaching |
| **Five-Layer** | Adds Data-Processing + Service/Business layers | Real deployments needing analytics + business logic |
| **Cloud-Centric** | Devices push all data to the cloud; processing/decisions happen there | Scalable, centralised control |
| **Edge / Fog-Centric** | Processing pushed near the device (edge/fog nodes) | **Low latency**, bandwidth saving, near-real-time |
| **AIoT** | IoT + AI; embedded ML at edge or cloud to predict and learn | Intelligence, autonomy |
| **Middleware-Based** | A middleware layer standardises device comms and abstracts hardware | **Interoperability**, cross-platform |
| **Service-Oriented (SOA)** | System built from modular, independent services via APIs | **Modularity**, scalability, maintainability |
| **Digital-Twin** | Real-time virtual replica of a physical asset/system | Simulation, monitoring, predictive maintenance |
| **IoTWF (Cisco)** | 7-layer industrial reference model with cross-cutting security & management | Large industrial deployments |

## The styles that matter most

### Cloud-centric vs Edge/Fog-centric

This is the central tension. **Cloud-centric** sends everything to a central cloud — maximally scalable and powerful, but every decision pays a round-trip delay. **Edge/Fog-centric** processes data close to the source — fast and bandwidth-thrifty, and it keeps working when the cloud is unreachable.

> [!INTUITION]
> Cloud vs edge is the **latency vs scale** trade-off made physical. Push to the **cloud** when you need heavy analytics, global view, and long-term storage. Push to the **edge** when you need millisecond reactions and offline resilience. Most real systems are **hybrid** — edge for reflexes, cloud for thinking.

### AIoT

**AIoT = AI + IoT.** Embedding ML in the system lets devices *predict, classify, and learn* — anomaly detection, predictive maintenance, on-device inference with **TinyML**. It is the architectural expression of the "intelligence & analytics" driver.

### SOA & Middleware — answering interoperability and modularity

- **SOA** composes the system from **independent services connected by APIs**, so each can be developed, scaled, and replaced on its own.
- **Middleware-based** inserts a layer that **standardises communication and abstracts hardware**, letting devices from different vendors interoperate (e.g., **oneM2M**, covered next).

### Digital Twin

A **digital twin** is a continuously-updated virtual model of a physical asset. You can simulate "what-if" scenarios, monitor health, and predict failures on the *twin* without touching the real machine.

> [!INTUITION]
> A digital twin is a **flight simulator for a real asset**. Because the twin mirrors the live sensor data of the real thing, you can test changes, forecast wear, and spot trouble on the copy — risk-free — then apply the lessons to the physical original.

> [!EXAM]
> Be able to **match an architecture style to its driving requirement**: low latency → **edge/fog**; interoperability → **middleware/oneM2M**; modularity → **SOA**; intelligence → **AIoT**; simulation/predictive maintenance → **digital twin**; centralised scale → **cloud-centric**. The cloud-vs-edge trade-off is the most common discussion question.

---

**Next:** a concrete interoperability standard — the oneM2M common-service-layer architecture.
