---
subject: iot
unit: 2
order: 12
slug: wsn
title: Wireless Sensor Networks (WSNs)
summary: Networks of small, low-power sensor nodes that report to a sink — node anatomy, communication patterns, characteristics, and WSN vs IoT.
minutes: 10
tags: [WSN, sensor-node, sink, mesh, WSN-vs-IoT]
---

# Wireless Sensor Networks (WSNs)

> [!NOTE]
> A **Wireless Sensor Network (WSN)** is a collection of small, autonomous, **low-power sensor nodes** that monitor physical/environmental conditions and wirelessly transmit their data to a **base station** (also called the **gateway** or **sink**).

WSNs are a foundational building block of IoT — the dense fabric of sensing under smart cities, agriculture, and industrial monitoring.

## Anatomy of a sensor node

Each node typically contains four parts:

| Part | Role |
|---|---|
| **Sensor(s)** | Collect data (temperature, humidity, motion…) |
| **Microcontroller** | Process data and run control logic |
| **Radio transceiver** | Send/receive data wirelessly |
| **Battery / energy harvester** | Power the node |

> [!INTUITION]
> A sensor node is a **tiny computer with a radio and a battery**, designed to do as *little* as possible to last as *long* as possible. Every design choice — sleep cycles, low-power radios, local filtering — serves one goal: stretch a small battery across months or years of unattended operation.

## Communication patterns

Wirelessly-connected nodes report in one of two ways (mirroring the Unit 1 traffic model):

- **Event-driven** — transmit only when a particular **event or threshold** is detected.
- **Periodic** — transmit at fixed **time intervals**.

## WSN characteristics

- **Low power & compute** — built for long battery life.
- **Self-organizing** — nodes form ad-hoc **mesh** or **tree** topologies automatically.
- **Unattended operation** — once deployed, they run independently for long periods.

## Applications & challenges

**Applications:** smart agriculture (soil moisture), IIoT (vibration, pressure, gas), smart cities (traffic, parking, pollution).

**Challenges:** **power management** (longevity), **reliability & coverage**, **scalability** (thousands of nodes without congestion), and **security** (lightweight crypto under tight resources).

## WSN vs IoT

> [!TRAP]
> A **WSN is a subset of IoT**, not a synonym. WSN = the **sensing-and-forwarding** layer; IoT is the **whole ecosystem** around it (processing, actuation, connectivity, analytics, control).

| Aspect | WSN | IoT |
|---|---|---|
| **Scope** | Subset — sensing + basic data transmission | Full ecosystem: sense, process, actuate, connect, analyse, control |
| **Data flow** | Usually **unidirectional** (sensor → gateway → app) | **Bidirectional** (device ⇌ cloud ⇌ devices/users), real-time control |
| **Intelligence** | Minimal at nodes; logic at the sink | Local **edge** intelligence + distributed decisions |
| **Protocols** | Low-power (IEEE 802.15.4, Zigbee, 6LoWPAN) | Mix across layers (IP, MQTT, CoAP, HTTP, LoRaWAN, NB-IoT) |
| **Integration** | Often closed/siloed | Designed for interoperability & cloud integration |
| **Example** | Soil sensors reporting to a local server | Smart irrigation reading soil + weather and watering via cloud rules |

> [!EXAM]
> Define a WSN (low-power nodes → sink/gateway), list the **four node components**, the **two communication patterns** (event-driven, periodic), the **self-organizing/unattended/low-power** characteristics, and — high-frequency — the **WSN vs IoT** distinction (WSN = sensing subset, unidirectional; IoT = full bidirectional ecosystem).

---

**Next:** where sensing is heading — sensors of the future.
