---
subject: iot
unit: 3
order: 14
slug: coap
title: CoAP
summary: "HTTP for tiny things" — the RESTful, UDP-based protocol with methods, discovery, CON/NON reliability, DTLS security, and a CoAP/HTTP/MQTT comparison.
minutes: 11
tags: [CoAP, REST, UDP, DTLS, confirmable]
---

# CoAP

> [!NOTE]
> **CoAP (Constrained Application Protocol)** is a lightweight application protocol for **constrained IoT devices** (sensors, wearables). It's conceptually **"HTTP for tiny things"** — RESTful and familiar, but built to run on minimal resources.

What makes it lean: it runs primarily over **UDP** (tiny headers, no TCP handshake), adds its own reliability and asynchrony for intermittent links, and supports **multicast, resource discovery, observe/streaming,** and **block-wise transfer**.

## Key features

1. **RESTful architecture** — treats data/functions as **resources** accessed with **GET, POST, PUT, DELETE** (like HTTP) → easy interoperability.
2. **Built-in discovery** — devices auto-discover resources via a special **`/.well-known/core`** URI.
3. **Asynchronous communication** — non-blocking; **Message IDs** match responses to requests.
4. **Optional reliability** — via **Confirmable (CON)** messages: the sender expects an **ACK**; if none arrives, it **retransmits**. (**Non-confirmable (NON)** = fire-and-forget.)
5. **Security with DTLS** — **Datagram TLS** encrypts/authenticates (UDP's equivalent of TLS).

## RESTful & resource-oriented

> [!NOTE]
> **REST (Representational State Transfer)** treats everything as a **resource** identified by a **URI**, manipulated through a uniform set of methods. CoAP is REST-based, so a sensor's temperature is a resource like `coap://sensor1.local/temp`.

This lets CoAP **interoperate with HTTP** — a proxy can translate CoAP ↔ HTTP, bridging tiny devices to web systems.

The **methods** mirror HTTP:

| Method | Action | Success code |
|---|---|---|
| **GET** | Retrieve a resource | 2.05 Content (≈200 OK) |
| **POST** | Create a subordinate resource | 2.01 Created |
| **PUT** | Update/create a resource at the URI | 2.04 Changed / 2.01 Created |
| **DELETE** | Delete the resource | 2.02 Deleted |

## How CoAP works

A simple **client/server, request/response** model: the client sends a request (e.g., GET a temperature) → the server replies with the data. Requests/responses use a compact **binary** format with options in **TLV (Type-Length-Value)**, optional **tokens** to match request↔response, and retransmission/ACK for reliability.

## Message format (essentials)

| Field | Size | Purpose |
|---|---|---|
| **Version (V)** | 2 bits | CoAP version |
| **Type (T)** | 2 bits | CON (00), NON (01), ACK (10), Reset (11) |
| **Token Length (TKL)** | 4 bits | Token size (0–8 bytes) |
| **Code** | 8 bits | Request / response / empty |
| **Message ID** | 16 bits | Detects duplicates, matches ACKs to CON |
| **Token** | 0–8 B | Links request and response |
| **Options / Payload** | variable | Metadata (URI, content format) / data (after `0xFF` marker) |

## CoAP vs HTTP vs MQTT

| Feature | CoAP | HTTP | MQTT |
|---|---|---|---|
| **Transport** | **UDP** | TCP | TCP |
| **Overhead** | Low | High | Low |
| **Security** | **DTLS** | TLS | TLS |
| **Messaging model** | Request/Response **+ Observe** | Request/Response | **Publish/Subscribe** |
| **Best fit** | Sensor nodes, actuators | Web, browsers | Cloud-connected devices |
| **Multicast** | **Yes** | No | No |

> [!INTUITION]
> Pick by shape of the problem: **CoAP** when the device is *tiny and RESTful* and you want HTTP-like semantics without the weight (it even does **multicast** — one request to many devices). **MQTT** when many devices stream telemetry to the cloud through a broker (**pub/sub**). **HTTP** when talking to the web. CoAP's **Observe** option gives it a pub/sub-like "subscribe to a resource" ability over its request/response base.

> [!EXAM]
> Know CoAP = **RESTful (GET/POST/PUT/DELETE) over UDP**, "HTTP for tiny things", **DTLS** security, **CON (reliable, ACK) vs NON** messages, **`/.well-known/core`** discovery, **multicast** support, and the **CoAP (UDP/DTLS/req-resp) vs HTTP (TCP/web) vs MQTT (TCP/pub-sub)** comparison table — a near-guaranteed question.

---

**Next:** industrial control and the web — SCADA and web-based protocols.
