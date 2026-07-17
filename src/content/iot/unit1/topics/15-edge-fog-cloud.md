---
subject: iot
unit: 1
order: 15
slug: edge-fog-cloud
title: Edge, Fog & Cloud Computing
summary: The IoT data-management & compute stack — where data is processed (edge → fog → cloud), the trade-offs, and the hierarchy.
minutes: 11
tags: [edge, fog, cloud, compute-stack, latency, data-management]
---

# Edge, Fog & Cloud Computing

> [!NOTE]
> The **IoT Data Management & Compute Stack** is the layered system used to collect, store, process, analyse, and act on IoT data. It defines **where and how** data is handled — from the moment it's sensed to the moment it drives a decision.

The central design question is **where to compute**: at the device (**edge**), in between (**fog**), or in the data centre (**cloud**). The answer trades **latency, bandwidth, and autonomy** against **scale, storage, and analytical power**.

## Edge computing

- **Location:** *closest* to the IoT devices (sensors & actuators).
- **Examples:** embedded processors, smart cameras, industrial controllers.
- **Characteristics:**
  - **Ultra-low latency** — real-time / near-real-time decisions.
  - **Local processing** — data handled at the source.
  - **Bandwidth efficiency** — only relevant/aggregated data sent upstream.
  - **Device autonomy** — keeps working even during network disruption.

## Fog computing

- **Location:** *between* edge and cloud, usually at the **LAN level**.
- **Examples:** edge gateways, micro data centres, compute-capable routers.
- **Characteristics:**
  - **Intermediate analytics** — aggregates/pre-processes data from many edge devices.
  - **Contextual decisions** — site-level intelligence across multiple devices.
  - **Lower latency than cloud** (but higher than edge).
  - **Orchestration point** — manages devices, security, reliability, failover.

## Cloud computing

- **Location:** remote data centres / public or private cloud.
- **Examples:** AWS IoT Core, Azure IoT Hub, Google Cloud IoT.
- **Characteristics:**
  - **Massive scalability** — store petabytes from global fleets.
  - **Advanced analytics** — AI/ML, deep learning, predictive maintenance.
  - **Centralised dashboards** — visualisation, reporting, control.
  - **Data fusion & integration** — connect to ERP, CRM, external systems.

## The hierarchy — and how to choose

> [!INTUITION]
> Edge, fog, and cloud form a **hierarchy of "how far and how smart."** Edge = a **reflex** (instant, local, simple). Fog = **local coordination** (a site supervisor aggregating several machines). Cloud = the **brain** (global memory, heavy thinking, long-term learning). Data and decisions flow up the hierarchy as they need more context, and down as they need faster action.

| | Edge | Fog | Cloud |
|---|---|---|---|
| **Distance from device** | Closest | LAN-level | Remote |
| **Latency** | Lowest | Medium | Highest |
| **Compute power** | Limited | Moderate | Massive |
| **Data scope** | One device | A site / many devices | Global |
| **Storage** | Tiny / transient | Short-term | Long-term, petabyte-scale |
| **Best for** | Real-time reflexes | Site aggregation, failover | Heavy analytics, ML, dashboards |

> [!TRAP]
> "Edge vs cloud" is **not** all-or-nothing. Production systems are **hybrid**: the edge handles instant safety-critical reactions and filters noise; the fog coordinates a site and survives cloud outages; the cloud does the heavy ML and keeps the long-term record. The skill is **placing each function at the right tier**.

> [!EXAM]
> Expect a **compare/contrast of edge vs fog vs cloud** on latency, location, compute, and data scope, and the reasoning **why pushing compute to the edge reduces latency and bandwidth** (and adds offline autonomy). Be able to assign a scenario to a tier: *obstacle avoidance* → edge; *site-wide congestion analysis* → fog; *training a predictive model on a year of data* → cloud.

---

**Next:** the business view — the IoT value chain, project implementation, and standards.
