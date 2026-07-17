---
subject: iot
unit: 1
order: 9
slug: iot-architecture-drivers
title: IoT Architecture — Drivers & Factors
summary: What IoT architecture is, and the design drivers (scalability, latency, intelligence, security, interoperability…) that shape every architectural choice.
minutes: 12
tags: [architecture, drivers, scalability, latency, edge-computing]
---

# IoT Architecture — Drivers & Factors

> [!NOTE]
> **IoT architecture** is the structure that lets internet-connected devices communicate and deliver value. Most models organise the system into **3 to 7 functional layers** (e.g., perception → network → application). Notably, IoT architecture **lacks a single standardised protocol**, which raises compatibility and security challenges.

## What is an architectural driver?

> [!NOTE]
> An **architectural driver** is a core influencing factor or requirement that shapes how an IoT system is designed. Drivers are **not physical components** — they are *forces, goals, or constraints* (technical, economic, user-based) that push the architecture in a direction.

> [!INTUITION]
> A driver is a *"because"* that forces a design decision. *Because* low latency matters → you must add **edge computing**. *Because* the system must scale to millions → you must use **microservices and message queues**. The drivers come first; the architecture is the answer to them.

## The key drivers (factors affecting the architectural model)

| Driver | What it demands of the architecture |
|---|---|
| **Scalability** | Handle growing devices/data/users without performance loss → cloud-native, microservices, queues |
| **Latency** | Near-instant response → edge computing, lightweight protocols |
| **Intelligence & analytics** | Turn raw data into insight → ingestion, analytics & ML engines |
| **Security & privacy** | Protect devices, data, users → encryption, auth, secure lifecycle |
| **Interoperability** | Multi-vendor devices work together → standards, common APIs |
| **Network constraints** | Cope with limited/intermittent links → local buffering, efficient protocols |
| **Real-time response** | Act within a guaranteed time → edge logic, deterministic paths |
| **Power & cost constraints** | Run for years, cheaply, at scale → low-power design, efficient transmission |
| **Modularity** | Add/replace components without redesign → loosely-coupled services |

## Two drivers worth a deeper look

### Scalability

The ability to handle increasing load — more devices, data, users, or operations — **without** a drop in performance, reliability, or manageability. IoT systems often **start small (10 sensors)** and grow to **millions**; a rigid architecture collapses.

**Types:** *device* scalability (more devices), *data* scalability (more volume), *user/application* scalability (more apps/APIs), *functional* scalability (add features without rework).

**Architectural responses:** cloud-native infrastructure (auto-scaling), **microservices** (independent services scale on demand), **message queues/streaming** (MQTT, Kafka — decouple producers from consumers), **horizontal scaling** (add nodes, not bigger machines), and **distributed databases / data lakes** (S3, HDFS, Cassandra).

> [!TRAP]
> **Horizontal** scaling = *add more machines/nodes* (scale **out**). **Vertical** scaling = *make one machine bigger* (scale **up**). IoT favours **horizontal** scaling because you can't keep buying a bigger single server for millions of devices.

### Latency sensitivity

How critically the system is affected by delay. Latency is the round-trip time for data to travel from device → server → back. If a delay causes **functional failure**, the application is **latency-sensitive**.

**Types:** *network* latency (travel time), *processing* latency (analysis time), *actuation* latency (command → physical action), *end-to-end* latency (event → completed action).

**Architectural response — push work to the edge:** process data **near the source** (gateway/sensor) so you don't depend on a distant cloud; use **low-latency protocols** (MQTT, CoAP, UDP over HTTP); make **local decisions** with on-device ML (**TinyML**) — e.g., a drone avoids obstacles with onboard logic, not a cloud round-trip.

> [!INTUITION]
> Latency is *the* reason **edge computing** exists. If a self-driving car or a factory safety stop had to ask the cloud "should I brake?", the round-trip delay could be fatal. When milliseconds decide safety, the decision must happen **at the edge**, not in a data centre hundreds of kilometres away.

> [!EXAM]
> You should be able to **name and explain several drivers** and, crucially, **link a driver to its architectural consequence** (latency → edge; scalability → microservices/horizontal scaling; interoperability → standards). Know the **horizontal vs vertical scaling** distinction and the **four types of latency**.

---

**Next:** the concrete layered models these drivers produce — 3-layer and 5-layer architectures.
