---
subject: iot
unit: 3
order: 13
slug: mqtt
title: MQTT
summary: The lightweight publish/subscribe protocol — broker, topics, QoS levels, retained messages, Last Will, control packets, and security.
minutes: 11
tags: [MQTT, pub-sub, broker, QoS, topics]
---

# MQTT

> [!NOTE]
> **MQTT (Message Queuing Telemetry Transport)** is a lightweight messaging protocol for IoT. It's **event-driven** and connects devices using the **publish/subscribe** pattern: a **Publisher** and **Subscriber** communicate via **Topics** and are **decoupled** — the **MQTT Broker** handles the connection between them.

## Why MQTT for IoT?

IoT devices run on batteries, use cheap MCUs, communicate over unstable links, and send small packets. MQTT addresses all of this with:

- **Low overhead** — only **2 bytes** in the fixed control header.
- **Simple command structure.**
- **Reliable delivery** — QoS levels.
- **Easy scaling** to thousands of devices.

## Architecture — three roles

| Component | Role |
|---|---|
| **Publisher** (client) | **Sends** data to a **topic** |
| **Subscriber** (client) | **Receives** data from topics it subscribes to |
| **Broker** (server) | Central server that **routes** messages from publishers to subscribers |

**Working principle:** publishers send messages tagged with a **topic name** → subscribers express interest in topics → the broker delivers each message to all subscribed clients.

> [!INTUITION]
> A **topic** is like a hierarchical channel name, e.g. `home/livingroom/temperature`. The temperature sensor *publishes* `25°C` to that topic; a phone app *subscribed* to it receives `25°C` — but the sensor and app never talk directly or even know about each other. The **broker** is the matchmaker that routes by topic. That decoupling is MQTT's superpower.

## Quality of Service (QoS) levels

> [!NOTE]
> MQTT offers **three QoS levels** trading reliability against overhead:

| QoS | Guarantee | Use case |
|---|---|---|
| **0 — At most once** | Fire-and-forget, no ACK | Non-critical (routine temperature) |
| **1 — At least once** | Guaranteed arrival, but **may duplicate** | Important updates |
| **2 — Exactly once** | Delivered **once**, via handshake | Financial / control data |

> [!INTUITION]
> Climbing QoS buys reliability but costs round-trips and battery. **QoS 0** = "I'll say it once, hope you heard." **QoS 1** = "I'll keep saying it until you ACK" (so you might hear it twice). **QoS 2** = "Let's handshake so you get it exactly once." Use the *lowest* level the data can tolerate.

## Other key features

- **Retained messages** — the broker stores the **last** message on a topic and sends it to any **new** subscriber immediately.
- **Last Will and Testament (LWT)** — if a client disconnects unexpectedly, the broker publishes a predefined "last will" message to notify others.
- **Persistent sessions** — disconnected clients reconnect without losing subscriptions/messages.

## Control packets (a sampler)

`CONNECT` / `CONNACK` (connect + ack), `PUBLISH` / `PUBACK`, `SUBSCRIBE` / `SUBACK`, `PINGREQ` / `PINGRESP` (heartbeat to keep the connection alive), `DISCONNECT`.

## Security

- **Authentication** — username/password in `CONNECT`; token/certificate in enterprise setups.
- **Encryption** — **TLS/SSL** (port **8883**).
- **Access control** — brokers restrict topics per user via **ACLs**.

Popular brokers: **Eclipse Mosquitto** (open-source, lightweight), **HiveMQ** (enterprise), **EMQX** (millions of connections), **AWS IoT Core**, **Azure IoT Hub**.

> [!EXAM]
> Almost certain: the **pub/sub model** (publisher → topic → broker → subscriber, decoupled), the **three QoS levels** (0 at-most-once, 1 at-least-once/may-duplicate, 2 exactly-once), **retained messages** and **Last Will & Testament**, the **2-byte header** (lightweight), and **TLS on port 8883**. Be ready to trace a smart-home temperature example.

---

**Next:** the request/response counterpart — CoAP.
