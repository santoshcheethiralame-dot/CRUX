---
subject: iot
unit: 3
order: 7
slug: zigbee
title: Zigbee
summary: The IEEE 802.15.4 mesh protocol — stack, device roles (coordinator/router/end device), addressing, network formation, routing, and power saving.
minutes: 13
tags: [Zigbee, 802.15.4, mesh, coordinator, AES-128]
---

# Zigbee

> [!NOTE]
> **Zigbee** is a wireless protocol for **low-power, low-data-rate** IoT, built on the **IEEE 802.15.4** standard. It operates mainly in the **2.4 GHz** unlicensed ISM band (with sub-GHz regional variants: 868 MHz Europe, 915 MHz USA), focusing on reliable, energy-efficient, secure mesh communication.

Think of Zigbee as the **language smart-home devices use to talk to each other** — Philips Hue, IKEA TRÅDFRI, SmartThings, and Amazon Echo hubs all speak it.

## Why Zigbee?

- **Low power** — devices run on coin-cell batteries for **years** (up to ~7).
- **Mesh networking** — devices relay data, extending coverage.
- **Interoperability** — many vendors support it.
- **Scalability** — up to **65,000 devices** (theoretical) per network.
- **Low cost** — unlicensed band, open protocol, no licence fee.

### Key characteristics

| Property | Value |
|---|---|
| **Data rate** | 20–250 kbps |
| **Range** | ~10–100 m per hop (~70 m indoor, ~400 m outdoor); mesh extends it |
| **Network join time** | ~30 ms |
| **Devices** | up to 65,000 (theory), ~240 practical |
| **Security** | **AES-128** encryption |
| **Spread spectrum** | **DSSS** (Direct Sequence Spread Spectrum) |

## The Zigbee 3.0 stack (built on 802.15.4)

| Layer | Responsibility |
|---|---|
| **PHY + MAC (802.15.4)** | Radios, channels, transmit power, **CSMA/CA**, acknowledgements |
| **NWK (Network)** | Forming the network, addresses, **routing**, neighbour tables |
| **APS (Application Support)** | Security wrapping, binding, groups, device discovery |
| **Application (ZCL clusters)** | The real "things" — On/Off, Level, Temperature, Scenes — as attributes & commands |

> [!INTUITION]
> Zigbee = **802.15.4 (the radio) + Zigbee's own layers on top (the smarts)**. 802.15.4 gives the physical radio and MAC; Zigbee adds networking (mesh routing), application support (security, grouping), and a standard data model (clusters) so a light from one vendor understands an "On" command from another's hub.

## Device roles

| Role | Function |
|---|---|
| **Coordinator** | **Starts the PAN**, picks the channel & PAN ID, can hold network keys; often the **Trust Center** (security authority) + gateway/hub. **One per network.** |
| **Router** (Full Function Device) | Stays **awake**, relays traffic (the **mesh backbone**), can admit new joins |
| **End Device** (Reduced Function Device) | Battery sensors/actuators; **sleep** most of the time, **don't relay**; pair with a "parent" that buffers their messages |

## Addressing

- Every device has a **64-bit IEEE (EUI-64)** unique ID (factory-burned).
- On joining a PAN, it also gets a **16-bit short address** for fast routing.
- The network is identified by a **PAN ID** (+ extended PAN ID for uniqueness).

## Forming & joining a network

**Formation:** the coordinator does an **energy scan** (channels 11–26) for low noise → picks channel + PAN ID → starts beaconing (or non-beacon mode) → opens **permit join**.

**Joining (commissioning):** new device **discovers** joinable PANs → **associates** (parent assigns a 16-bit address) → receives the **Network Key** (security) → **configures** clusters, groups, and attribute reporting.

## Routing & mesh

Zigbee supports **star/tree/mesh** topologies — **mesh is the norm**. Routing is **AODV-like (on-demand)**:

1. If a path is unknown, the source floods a **Route Request (RREQ)**.
2. The destination (or a node with a route) returns a **Route Reply (RREP)**.
3. **Route maintenance** repairs broken paths using neighbour tables and link quality (LQI/RSSI).

Each router hop is ~tens of metres, so **multi-hop** gives whole-home/building coverage.

> [!INTUITION]
> The **end device sleeps to save power, but can't relay** — so it leans on an always-awake **router parent** that buffers its messages. When the end device wakes, it sends a **MAC Data Request** to pull queued data. This "sleep + parent buffers" pattern is how coin-cell devices last years on a mesh.

> [!EXAM]
> High-frequency items: Zigbee = **IEEE 802.15.4, 2.4 GHz, mesh, AES-128**; the **three device roles** (coordinator starts/secures the PAN; routers relay/stay awake; end devices sleep/don't relay); **65,000-device** scalability; the **stack** (PHY/MAC → NWK → APS → application/ZCL); and **on-demand AODV-like mesh routing** (RREQ/RREP).

---

**Next:** the short-range protocol in everyone's pocket — BLE.
