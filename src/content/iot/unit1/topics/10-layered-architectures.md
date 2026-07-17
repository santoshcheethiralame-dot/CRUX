---
subject: iot
unit: 1
order: 10
slug: layered-architectures
title: 3-Layer & 5-Layer IoT Architectures
summary: The foundational layered models — the 3-layer (perception/network/application) and the 5-layer extension that adds processing and business layers.
minutes: 11
tags: [3-layer, 5-layer, perception, network, application, business]
---

# 3-Layer & 5-Layer IoT Architectures

Layered models are the standard way to describe IoT systems: each layer has one job and talks only to its neighbours, giving **separation of concerns**.

## The 3-Layer Architecture

The most basic and widely-taught model has three layers:

| Layer | Role |
|---|---|
| **Perception Layer** | The **physical layer** — sensors and RFID gather data about the environment and identify smart objects; actuators act on it. |
| **Network Layer** | **Connects and transmits** — links smart objects to servers and network devices, and transports/processes the sensor data. |
| **Application Layer** | **Delivers services to the user** — defines how the IoT is deployed in a domain (smart home, smart car, etc.). |

> [!INTUITION]
> Read the 3 layers as **sense → move → use**. The perception layer *senses* the world, the network layer *moves* the data, the application layer *uses* it to serve a human. Every richer model just splits these three into finer pieces.

## The 5-Layer Architecture

The 3-layer model is too coarse for real deployments — it hides where *data processing* and *business logic* happen. The **5-layer** model adds two layers for better separation of concerns. A common version:

| Layer | Role |
|---|---|
| **1. Perception** | Sensors, actuators, RFID, embedded devices — collect environmental data + basic signal conversion. |
| **2. Network** | Transmit data to data centres / cloud / edge using Wi-Fi, Zigbee, BLE, LTE/5G, LoRaWAN; may handle encryption & integrity. |
| **3. Data Processing** *(a.k.a. Middleware / "cognition" layer)* | The **brain** — filtering, aggregation, temporary storage, context-aware processing, decision-making; may include **edge/fog** nodes. |
| **4. Service** | Logic, orchestration, and interoperability of IoT services — middleware, APIs, cloud platforms (AWS IoT, Azure IoT Hub). |
| **5. Application** | User-facing functionality — dashboards, alerts, app-based control (smart-home control, fleet monitoring). |

> [!NOTE]
> You will also see a 5-layer variant where the top layer is a **Business Layer** — handling ROI analysis, compliance/governance, workflow integration (ERP/CRM), and high-level reporting to align the IoT deployment with organisational goals. The middle layers (perception, network, processing) are the same; the difference is whether the top is framed as *application* or *business*.

### Why add the extra layers?

The added **Data Processing** and **Service** (or **Business**) layers make explicit two things the 3-layer model glosses over:

- **Where intelligence lives** — the processing/middleware layer is where filtering, analytics, and edge decisions happen, *before* data floods the cloud.
- **How services and business value are organised** — orchestration, APIs, and ROI/compliance get their own home.

> [!TRAP]
> The **perception → network → application** core is identical across both models. Don't lose marks by misordering them or putting "sensors" in the network layer. The 5-layer model **inserts** processing/service layers **in the middle**; it does not reshuffle the bottom and top.

> [!EXAM]
> Near-certain question: **draw/label the 3-layer model and name each layer's function**, then explain **what the 5-layer model adds and why** (data-processing + service/business layers for finer separation of concerns and explicit analytics/business logic). Memorise the **perception (physical/sensors) → network (transport) → application (user services)** backbone cold.

---

**Next:** beyond layers — the broader taxonomy of IoT architecture styles (cloud, edge/fog, AIoT, SOA, digital twin).
