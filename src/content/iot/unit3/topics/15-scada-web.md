---
subject: iot
unit: 3
order: 15
slug: scada-web
title: SCADA & Web-Based Protocols
summary: Industrial SCADA systems, the IoT transport methods, and generic web-based protocols (HTTP/REST, WebSocket) plus AMQP and DDS.
minutes: 9
tags: [SCADA, HTTP, REST, WebSocket, AMQP, DDS]
---

# SCADA & Web-Based Protocols

Beyond the lightweight IoT protocols, two more worlds matter: the **industrial** control world (SCADA) and the **web** world (HTTP/REST and friends).

## SCADA — industrial supervisory control

> [!NOTE]
> **SCADA (Supervisory Control And Data Acquisition)** is a system architecture for **monitoring and controlling industrial processes** — power grids, water treatment, oil & gas, manufacturing. It's the original "industrial IoT," predating the term.

A SCADA system has four classic parts:

| Component | Role |
|---|---|
| **Sensors & actuators (field devices)** | Measure and act on the physical process |
| **RTUs / PLCs** | Remote Terminal Units / Programmable Logic Controllers — collect field data, execute local control |
| **Communication network** | Links field devices to the central station (often **Modbus, DNP3**, now IP) |
| **SCADA master / HMI** | Central supervisory software + **Human-Machine Interface** for operators to monitor and control |

> [!INTUITION]
> SCADA is **IoT before IoT** — the same sense → communicate → supervise → act loop, but for heavy industry and with a human operator at the **HMI** in the loop. Modern IoT increasingly *converges* with SCADA: cloud analytics and IP protocols (MQTT) now sit alongside the traditional PLC/RTU + Modbus/DNP3 stack.

## IoT application transport methods

The transport layer carries application data; the choice shapes reliability and overhead:

- **TCP** — connection-oriented, reliable, ordered; used by HTTP, MQTT, AMQP. Higher overhead.
- **UDP** — connectionless, lightweight, no handshake; used by CoAP, DDS. Lower overhead, better for constrained/lossy links.

## Generic web-based protocols

| Protocol | Nature | IoT role |
|---|---|---|
| **HTTP / REST** | Request/response over TCP; resources via URIs + GET/POST/PUT/DELETE | Simple cloud/web integration, dashboards, APIs |
| **HTTPS** | HTTP over **TLS** | Secure web communication |
| **WebSocket** | Full-duplex, persistent connection over TCP | Real-time browser ↔ device updates |
| **AMQP** | Robust enterprise **publish/subscribe** with queuing | Reliable message delivery between systems |
| **DDS** | **Peer-to-peer**, high-performance, real-time data distribution | Distributed, time-critical systems (autonomous vehicles, defence) |

> [!INTUITION]
> **HTTP/REST** is the universal translator — heavy for tiny sensors, but every web service, browser, and app already speaks it, so it's the easiest bridge to the wider internet. That's why IoT often runs lightweight protocols (CoAP/MQTT) at the *edge* and converts to **HTTP/REST** at the *gateway/cloud* for integration. **AMQP** adds enterprise-grade reliability; **DDS** adds peer-to-peer real-time.

## Putting the stack together

A complete IoT communication picture, bottom to top:

1. **Link/network** — wired (Ethernet/PLC) or wireless (Zigbee/BLE/Wi-Fi/LoRaWAN/cellular).
2. **Transport** — TCP or UDP.
3. **Application** — MQTT, CoAP, HTTP/REST, AMQP, DDS.
4. **Integration** — SCADA/HMI for industry; cloud platforms & dashboards for modern IoT.

> [!EXAM]
> Know **SCADA** (supervisory control of industrial processes; components: field devices, **RTU/PLC**, network with Modbus/DNP3, **master/HMI**), the **TCP vs UDP** transport trade-off, and the **web-based protocols** (HTTP/REST for web integration, WebSocket for real-time, AMQP for enterprise pub/sub, DDS for peer-to-peer real-time). A common framing: edge runs CoAP/MQTT, gateway converts to HTTP/REST for the cloud.

---

That completes Unit 3 — the full IoT communication stack from wired Ethernet through wireless protocols to application-layer messaging. **Next:** Unit 4 turns this data into value — analytics, cloud platforms, security, and privacy.
