---
subject: iot
unit: 1
order: 4
slug: iot-connectivity
title: IoT Connectivity & Gateways
summary: The connectivity technology landscape (Wi-Fi/BLE/Zigbee/LoRaWAN/NB-IoT/Ethernet/5G) and why short-range devices need an IoT gateway.
minutes: 12
tags: [connectivity, LPWAN, gateway, protocol-translation, range-power-tradeoff]
---

# IoT Connectivity & Gateways

> [!NOTE]
> **IoT connectivity** is the set of communication technologies and protocols that let IoT devices connect, communicate, and exchange data with other devices, networks, or cloud platforms.

There is **no single best** connectivity technology. Each trades off **range, power, data rate, and cost** differently, and you pick by matching the trade-off to the use case.

## The connectivity landscape

| Technology | Range | Power | Data rate | Typical use |
|---|---|---|---|---|
| **Wi-Fi** | Short–Medium | High | High (up to ~1 Gbps) | Smart homes, cameras, appliances |
| **Bluetooth / BLE** | Short | Low | Low–Medium | Wearables, health monitors |
| **Zigbee / Z-Wave** | Short–Medium | Very low | Low | Home automation, smart lighting |
| **LoRaWAN** | Long | Very low | Low | Agriculture, remote monitoring |
| **NB-IoT / LTE-M** | Long | Low | Medium | Smart meters, asset tracking |
| **Ethernet** | Short (wired) | High | Very high | Industrial IoT, critical systems |
| **5G** | Very long | Medium–High | Very high | Autonomous vehicles, smart cities |

> [!INTUITION]
> There is an iron **range ↔ power ↔ data-rate triangle**. You usually get *two* of {long range, low power, high data rate}, never all three. A **LoRaWAN** node reaches kilometres on a coin cell — but only sips a few bytes. **Wi-Fi** streams video — but is power-hungry and short-range. Choose the corner your application lives in.

### LPWAN — the IoT-native class

**Low-Power Wide-Area Networks (LPWANs)** — Sigfox, **LoRaWAN**, **NB-IoT** — were created specifically for IoT: **long range, tiny data, years on a battery.** They sacrifice bandwidth (you can't stream video) to win on range and power, perfectly matching the uplink-light, periodic traffic of most sensors.

## The IoT gateway

Short-range radios (Bluetooth, Zigbee, sometimes Wi-Fi) and non-IP protocols **cannot reach the internet on their own**. They need a bridge: the **IoT gateway**.

> [!NOTE]
> An **IoT gateway** is hardware or software that sits **between local IoT devices and the cloud/data centre**. It collects, processes, and forwards device data to the internet — and pushes commands back down.

### What a gateway actually does

| Function | Description |
|---|---|
| **Protocol translation** | Converts BLE/Zigbee/Wi-Fi data into IP-friendly formats (HTTP, MQTT, CoAP) |
| **Data aggregation** | Collects from many devices and sends upstream efficiently (fewer, bigger messages) |
| **Edge processing** | Filters / pre-analyses data locally to cut latency and bandwidth |
| **Security enforcement** | Adds encryption, authentication, and firewalling at the network edge |
| **Network bridging** | Bridges non-IP networks (Zigbee, BLE) to IP networks (Ethernet, LTE, 5G) |
| **Device management** | Firmware updates, diagnostics, and provisioning of the devices below it |

> [!INTUITION]
> Think of the gateway as a **translator + bouncer + receptionist** for a building full of devices that don't speak "internet." It translates their dialects to IP, screens traffic for security, batches their messages, and even does light work on-site so the cloud isn't bothered with raw noise.

> [!TRAP]
> A gateway is **not** just a "router." A router moves IP packets; an IoT gateway additionally **translates protocols**, **aggregates**, does **edge processing**, and **manages devices**. That protocol-translation role is exactly why short-range, non-IP devices need it.

> [!EXAM]
> Expect (1) the **range/power/data-rate trade-off** across technologies (pick the right one for a scenario), (2) the meaning of **LPWAN** and one example (LoRaWAN/NB-IoT), and (3) **why a gateway is needed** and **three of its functions** (protocol translation, aggregation, edge processing, security).

---

**Next:** how IoT and digitization feed each other — and the rise of time-series data.
