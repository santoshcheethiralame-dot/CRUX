---
subject: iot
unit: 1
order: 14
slug: core-functional-stack
title: The Core IoT Functional Stack
summary: A simplified 3-layer functional view — Things, Communications Network (with its 4 sublayers), and Applications & Analytics.
minutes: 10
tags: [functional-stack, things, communications-network, sublayers, access-network]
---

# The Core IoT Functional Stack

To actually *design* an IoT network, a simplified **three-layer functional stack** gives better visibility into each layer's job than the abstract reference models.

| Layer | Responsibility |
|---|---|
| **Things** (Sensors & Actuators) | Physical devices that **collect** data (sensors) or **act** on the environment (actuators). |
| **Communications Network** | **Transfers** data between devices, gateways, and cloud (LoRa, FAN, PLC, IP transport). |
| **Applications & Analytics** | End-user services and business logic that **use** IoT data (smart-home apps, SCADA, MDM). |

## 1. The Things Layer

Physical devices must conform to the **constraints of their deployment environment** while still delivering the required information. Smart objects are classified along several axes:

- **Battery-powered** vs **power-connected**
- **Mobile** vs **static**
- **Low** vs **high** reporting frequency
- **Simple** vs **rich** data
- **Report range** (how far it must transmit)
- **Object density per cell** (how many devices share an access point)

> [!INTUITION]
> These axes are a **design checklist**. "Battery + mobile + low-frequency + simple data + long range" practically *spells* LoRaWAN; "powered + static + high-frequency + rich data + short range" spells Wi-Fi/Ethernet. Classifying the *thing* tells you which network to choose for it.

## 2. The Communications Network Layer

When devices can't reach the cloud alone, they communicate through a network — usually wireless — split into **four sublayers**:

| Sublayer | Role |
|---|---|
| **Access network** | The **final segment** to the device — wireless tech like 802.11ah, 802.15.4g, LoRa (or physical cabling). Where sensors actually attach. |
| **Gateways & Backhaul network** | Aggregates many nearby devices at a **central gateway** and carries their data between the local network and the main infrastructure. |
| **Network transport** | Implements **network/transport protocols** (IP, UDP) so different devices and media can interconnect reliably. |
| **IoT network management** | Adds **application-messaging protocols** (CoAP, MQTT) to move data between head-end applications and sensors. |

> [!INTUITION]
> The four sublayers trace the journey of a packet: it leaves the sensor over the **access network**, is gathered at the **gateway/backhaul**, is carried by **IP/UDP transport**, and is wrapped in **CoAP/MQTT** so the application understands it. Each sublayer adds the next piece needed for a reading to reach the app.

## 3. The Applications & Analytics Layer

At the top, applications **process the gathered data**. Their job is not just to control smart objects but to **make intelligent decisions** from the collected information — then instruct the "things" (or other systems) to adapt their behaviour or parameters. This closes the **sense → analyse → act** loop introduced in topic 1.

> [!TRAP]
> Don't confuse the **access network** (the last wireless hop to the sensor) with the **backhaul** (the link carrying aggregated traffic from the gateway to the core). Access = *device ↔ gateway*; backhaul = *gateway ↔ infrastructure*. They're different sublayers with different range and capacity needs.

> [!EXAM]
> Likely asks: **name the three functional layers** (Things, Communications Network, Applications & Analytics) and, for the communications layer, **list its four sublayers** (access network, gateways & backhaul, network transport, IoT network management) with one role each. Note which sublayer carries **CoAP/MQTT** (IoT network management) vs **IP/UDP** (network transport).

---

**Next:** where the computing actually happens — edge, fog, and cloud.
