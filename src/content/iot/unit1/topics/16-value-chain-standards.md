---
subject: iot
unit: 1
order: 16
slug: value-chain-standards
title: IoT Value Chain, Implementation & Standards
summary: How value flows from silicon to service, the stages of implementing an IoT project, and the major standards bodies.
minutes: 9
tags: [value-chain, project-implementation, standards, IEEE, oneM2M]
---

# IoT Value Chain, Implementation & Standards

## The IoT value chain

> [!NOTE]
> The **IoT value chain** is the sequence of stages through which raw sensor data is turned into business value — each stage adding value to the data passing through it.

A common way to break it down:

| Stage | Players / role | Value added |
|---|---|---|
| **Hardware / silicon** | Chip & sensor makers (MEMS, MCUs, radios) | The physical sensing & compute substrate |
| **Devices / things** | Device OEMs | Packaged smart objects |
| **Connectivity** | Network operators, LPWAN providers | Move data off the device |
| **IoT platform** | Cloud/platform vendors | Ingest, store, manage devices & data |
| **Analytics / applications** | Software vendors, integrators | Turn data into insight & action |
| **End service** | Vertical solution providers | Deliver outcomes to the customer |

> [!INTUITION]
> Read the value chain as data **gaining worth** at every hop: a raw voltage from a sensor is nearly worthless; once it's connected, stored, analysed, and packaged into a *"your machine will fail Tuesday"* alert, it's worth real money. The further **right** in the chain, the closer to the customer's actual problem — and historically that's where the **margins** concentrate (services over hardware).

## IoT project implementation

Deploying IoT is more than buying sensors. A typical implementation flow:

1. **Define the use case & KPIs** — what business problem and what success metric (e.g., "cut downtime 20%").
2. **Select sensors & devices** — match the *things* to the environment and data needs.
3. **Choose connectivity** — pick the right range/power/data-rate technology (and gateways).
4. **Design the architecture** — decide edge/fog/cloud split, pick a platform, address the drivers (scalability, latency, security).
5. **Build data pipeline & analytics** — ingestion, storage, processing, dashboards/ML.
6. **Secure & manage** — identity, encryption, OTA updates, device lifecycle.
7. **Pilot → scale** — prove value on a small deployment, then scale out (where scalability bites).
8. **Operate & iterate** — monitor, maintain, improve.

> [!TRAP]
> The most common failure isn't technical — it's starting with the *technology* instead of the **use case and KPI**. Without a measurable business goal, an IoT project becomes "sensors looking for a problem," and the data overload/cost challenges sink it.

## IoT standards

Because IoT spans hardware, networks, data, and applications, **many standards bodies** are involved — and the *lack of a single universal standard* is exactly the interoperability challenge from earlier.

| Body | Contribution |
|---|---|
| **IEEE** | Physical/MAC standards — 802.11 (Wi-Fi), 802.15.4 (Zigbee/Thread base) |
| **IETF** | Internet protocols — IPv6, **6LoWPAN**, **CoAP**, RPL routing |
| **oneM2M** | Common **service-layer** standard for interoperability |
| **3GPP** | Cellular IoT — **NB-IoT, LTE-M, 5G** |
| **ITU-T** | High-level IoT reference frameworks |
| **ISO/IEC** | **ISO/IEC 30141** IoT reference architecture; security/privacy standards |
| **Industry alliances** | LoRa Alliance (LoRaWAN), Zigbee/Connectivity Standards Alliance, OCF |

> [!INTUITION]
> No single body "owns" IoT because IoT is a *stack*, not a *product*: **IEEE** standardises the radio, **IETF** the internet protocols, **3GPP** the cellular link, **oneM2M** the service layer, **ISO/IEC** the overall architecture. Interoperability comes from these layers agreeing — which is why fragmentation persists and standards like oneM2M and ISO/IEC 30141 matter.

> [!EXAM]
> Be able to (1) **describe the value chain** (silicon → device → connectivity → platform → analytics → service) and where value/margin concentrates, (2) list the **major steps to implement an IoT project** (use case → devices → connectivity → architecture → analytics → security → scale), and (3) name a few **standards bodies and what they cover** (IEEE radio, IETF/CoAP, 3GPP/NB-IoT, oneM2M service layer, ISO/IEC 30141).

---

That completes Unit 1 — from *what IoT is* through architecture, the value chain, and standards. **Next up:** Unit 2, the sensors and embedded systems that make the "Things" layer real.
