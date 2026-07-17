---
subject: iot
unit: 3
order: 11
slug: cellular-iot
title: Cellular IoT (NB-IoT, LTE-M, 5G)
summary: The licensed-spectrum path for IoT — GSM-IoT, NB-IoT, LTE-M, and 5G mMTC, plus when wide-area cellular beats LPWAN.
minutes: 9
tags: [cellular, NB-IoT, LTE-M, 5G, mMTC, licensed]
---

# Cellular IoT (NB-IoT, LTE-M, 5G)

> [!NOTE]
> **Cellular IoT** connects devices over **licensed** spectrum operated by telecom carriers — the same networks as your phone, but with profiles tuned for low-power, low-data IoT. Unlike Wi-Fi/Zigbee/LoRa, it does **not** use unlicensed bands.

The advantage: **ubiquitous, carrier-managed coverage** — no gateways to deploy, just a SIM and the existing cellular network reaching anywhere with signal.

## The technologies

| Technology | What it is | Best for |
|---|---|---|
| **GSM-IoT (2G)** | Legacy 2G modules for simple telemetry | Low-cost trackers (where 2G survives) |
| **NB-IoT (Narrowband IoT)** | Ultra-low-power, deep-coverage, very low data rate | Smart meters, parking, fixed sensors |
| **LTE-M (Cat-M1)** | Higher data rate + **mobility & voice** support | Asset/vehicle tracking, wearables |
| **5G NR (mMTC)** | **Massive Machine-Type Communication** — huge device density | Dense smart-city / industrial deployments |

> [!NOTE]
> **NB-IoT** and **LTE-M** are the two **LPWAN cellular** standards (3GPP). **NB-IoT** = lowest power, deepest indoor coverage, *stationary* low-rate sensors. **LTE-M** = more bandwidth, supports **mobility and voice**, for moving/richer devices.

> [!INTUITION]
> Think of cellular IoT as **LPWAN you rent instead of build**. LoRaWAN needs you to deploy gateways; NB-IoT/LTE-M ride the carrier's towers that already blanket the country. You trade a **recurring subscription cost** for **zero infrastructure** and instant nationwide reach. NB-IoT vs LTE-M ≈ "cheapest/stationary" vs "mobile/voice-capable."

## NB-IoT vs LTE-M vs LoRaWAN

| | NB-IoT | LTE-M | LoRaWAN |
|---|---|---|---|
| **Spectrum** | Licensed | Licensed | Unlicensed |
| **Mobility** | Poor (stationary) | Good (handover) | Limited |
| **Data rate** | Very low | Low–medium | Very low |
| **Power** | Very low | Low | Lowest |
| **Cost model** | Subscription | Subscription | No spectrum fee (self-run) |

## When to choose cellular

- **Wide-area, mobile, or no-gateway deployments** — asset tracking across a country.
- **Carrier-grade reliability & coverage** without building infrastructure.
- **Deep indoor** fixed sensors (NB-IoT) — basements, meters.

> [!TRAP]
> The most common exam trap: **cellular IoT uses LICENSED spectrum** (operator-owned), unlike Wi-Fi/BLE/Zigbee/LoRa. Also don't confuse the two LPWAN families: **NB-IoT** (stationary, lowest power) vs **LTE-M** (mobile, voice, higher rate).

> [!EXAM]
> Know the cellular IoT technologies (**GSM-IoT, NB-IoT, LTE-M, 5G mMTC**), that they use **licensed** spectrum, the **NB-IoT vs LTE-M** distinction (stationary/lowest-power vs mobile/voice), and **when cellular beats LPWAN** (wide-area, mobile, no infrastructure — at a subscription cost). **5G mMTC** = massive device density.

---

**Next:** moving up the stack — IoT application-layer protocols.
