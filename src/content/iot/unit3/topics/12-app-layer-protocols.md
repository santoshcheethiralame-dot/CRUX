---
subject: iot
unit: 3
order: 12
slug: app-layer-protocols
title: IoT Application-Layer Protocols
summary: The role of the application layer, the two communication models (publish/subscribe vs request/response), transport choices, and how to pick a protocol.
minutes: 10
tags: [application-layer, pub-sub, request-response, transport, protocol-choice]
---

# IoT Application-Layer Protocols

> [!NOTE]
> The **application layer** sits at the **top** of the IoT protocol stack and is the interface between the IoT network and end-user applications. It defines **how devices communicate data** — the format, encoding, reliability, and structure of the exchanged information.

It's the layer that decides how your temperature sensor, GPS tracker, or smart bulb actually "talks" to cloud services and mobile apps.

## What application-layer protocols handle

- **Data representation** — JSON, XML, binary, **CBOR** (compact binary for constrained devices).
- **Message formatting and routing.**
- **Communication reliability** — QoS levels.
- **Device-to-cloud and cloud-to-device** messaging.
- **Interoperability** — so devices from different vendors work together.

They are specifically **adapted for constrained devices** — far more efficient than standard internet protocols on limited CPU, memory, and battery.

## The two communication models

> [!NOTE]
> IoT application protocols split into two families by **communication pattern**.

| Model | Idea | Examples |
|---|---|---|
| **Message-oriented (Publish/Subscribe)** | Lightweight, **asynchronous**, via a **broker**; publishers and subscribers are **decoupled** | **MQTT**, AMQP |
| **Request/Response (Client/Server)** | Direct device-to-server interaction (like the HTTP model) | **HTTP**, **CoAP** |

> [!INTUITION]
> **Request/response** is a **phone call** — the client asks, the server answers, both must be present at once. **Publish/subscribe** is a **noticeboard** — a publisher pins a message to a topic and walks away; anyone subscribed reads it whenever they're ready, and neither needs to know the other exists. Pub/sub's **decoupling** is why it scales to thousands of intermittently-connected devices.

## The common protocols

- **MQTT** — Message Queuing Telemetry Transport (pub/sub, broker-based).
- **CoAP** — Constrained Application Protocol (request/response, "HTTP for tiny things").
- **AMQP** — Advanced Message Queuing Protocol (robust enterprise pub/sub).
- **DDS** — Data Distribution Service (high-performance, peer-to-peer, real-time).

## Transport: TCP vs UDP

The application protocol rides on a transport:

- **TCP** (connection-oriented, reliable, ordered) — used by **HTTP, MQTT, AMQP**.
- **UDP** (connectionless, lightweight, no handshake) — used by **CoAP, DDS** — lower overhead for constrained, lossy links.

## How to choose a protocol

| If you need… | Choose |
|---|---|
| Lowest-power, constrained device, RESTful | **CoAP** (UDP) |
| Unreliable network, session persistence, many devices | **MQTT** (pub/sub) |
| Centralized hub-and-spoke | **MQTT / AMQP** |
| Highly distributed peer-to-peer, real-time critical | **DDS** |
| Simple web/browser integration | **HTTP** |

> [!EXAM]
> Know the application layer's **role** (format/encoding/reliability/interop at the top of the stack), the **two models** — **publish/subscribe (MQTT/AMQP, broker, decoupled)** vs **request/response (HTTP/CoAP)** — the **TCP vs UDP** mapping (MQTT/HTTP=TCP; CoAP=UDP), and **how to pick** (CoAP for constrained; MQTT for unreliable links/scale; DDS for distributed real-time).

---

**Next:** the dominant pub/sub protocol — MQTT.
