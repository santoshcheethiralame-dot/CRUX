---
subject: iot
unit: 3
order: 2
slug: wired-ethernet
title: Wired Connectivity & Ethernet
summary: Wired technologies (Ethernet, RS-485, CAN, Modbus) and Ethernet in depth — characteristics, MAC addressing, and the switch/router network architecture.
minutes: 11
tags: [wired, Ethernet, 802.3, MAC, switch, router]
---

# Wired Connectivity & Ethernet

> [!NOTE]
> **Wired communication** transmits data over physical cables (copper or fibre). It's chosen when **high reliability, security, and bandwidth** are critical, or when devices don't move — e.g., where interference is high, latency/jitter must be minimal, and long uptime matters.

Common wired technologies: **Ethernet, RS-232, RS-485, CAN, Modbus.** Of these, Ethernet dominates.

## Ethernet

> [!NOTE]
> **Ethernet** is a family of LAN networking technologies, originally standardised as **IEEE 802.3**. It defines the **physical and data-link layers** of the OSI model, letting devices communicate over a wired connection. It is the dominant wired standard.

### Key characteristics

| Property | Detail |
|---|---|
| **Medium** | Twisted-pair copper (Cat 5e/Cat 6) or **fibre optic** |
| **Data rate** | 10 Mbps → 100 Mbps (Fast) → 1 Gbps (Gigabit) → 10/40/100 Gbps |
| **Topology** | Usually **star** — devices connect to a central switch/hub |
| **Addressing** | Each device has a unique **MAC address** for frame-level delivery |

### Why Ethernet for IoT?

- **High reliability & stability** — far less prone to interference and drops than wireless.
- **Deterministic behaviour** — predictable timing, critical for industrial automation.
- **Power over Ethernet (PoE)** — data *and* power on one cable (next topic).
- **Security** — a wired medium is harder to eavesdrop or jam than radio.

> [!INTUITION]
> Ethernet's superpower for IoT is **determinism + reliability**: an industrial controller knows its packet will arrive, on time, every time. That predictability is exactly what wireless struggles to guarantee — which is why factory floors and critical infrastructure stay wired.

## MAC vs IP addressing

> [!TRAP]
> Don't confuse the two addresses every networked IoT device has. A **MAC address** is a unique **hardware** identifier used for delivery **within the local network** (Layer 2). An **IP address** is a **logical** identifier used to **route packets across networks/the internet** (Layer 3). MAC = "which physical device on this LAN"; IP = "which host, routable anywhere."

## Ethernet-based network architecture

A typical IoT LAN reaching the cloud has four parts:

1. **IoT devices** — each with a unique **MAC** (local) and **IP** (logical) address; the sources/consumers of data.
2. **Ethernet switch** — the LAN hub. Operates at **Layer 2**, using MAC addresses to forward each frame **only to its intended recipient** (no broadcast flooding).
3. **Router** — the **gateway to the WAN/internet**. Has its own MAC + IP, performs **NAT (Network Address Translation)** to map private local IPs to a public IP, and routes traffic in/out.
4. **WAN / Internet** — enables remote monitoring, cloud analytics, OTA updates, and app control — i.e., **machine-to-cloud (M2C)** and **cloud-to-machine (C2M)** communication.

> [!INTUITION]
> Picture the data's journey: a sensor's frame goes to the **switch** (which uses MAC to send it only where it's needed), then to the **router** (which NATs the private IP to a public one and forwards it over the **WAN** to the cloud). Switch = smart local post office (Layer 2/MAC); router = the gateway to the outside world (Layer 3/IP).

> [!EXAM]
> Know that Ethernet = **IEEE 802.3**, physical + data-link layers, star topology, MAC addressing; the **four reasons to use it for IoT** (reliability, determinism, PoE, security); the **MAC vs IP** distinction (hardware/Layer-2/local vs logical/Layer-3/routable); and the **switch (Layer 2, MAC) vs router (Layer 3, NAT, gateway to WAN)** roles.

---

**Next:** powering devices through the same cable — Power over Ethernet.
