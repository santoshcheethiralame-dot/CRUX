---
subject: iot
unit: 3
order: 10
slug: lorawan
title: LoRaWAN
summary: The long-range, low-power LPWAN — star-of-stars architecture, the four components, device classes A/B/C, and the two-key security model.
minutes: 12
tags: [LoRaWAN, LPWAN, star-of-stars, classes, OTAA]
---

# LoRaWAN

> [!NOTE]
> **LoRaWAN (Long Range Wide Area Network)** is a low-power, long-range protocol managing data between IoT devices and the network. It uses a **star-of-stars topology** where **gateways** act as transparent relays between **end devices** and a central **network server**.

A note on naming: **LoRa** is the physical radio modulation (**Chirp Spread Spectrum, CSS**); **LoRaWAN** is the networking protocol/MAC layer built on top of it.

## Key characteristics

- **Long range** — 10+ km rural, 2–5 km urban; deep indoor penetration.
- **Ultra-low power** — **5–10+ years** on a coin cell.
- **License-free** — unlicensed sub-GHz spectrum (865–868 MHz India/EU, 915 MHz US).
- **Secure** — end-to-end **AES-128**.
- **Bidirectional** — supports uplink and downlink.
- **Geolocation** — can locate a device by triangulation across **≥3 gateways**, no GPS needed.
- **High capacity** — network servers handle millions of messages from thousands of gateways.

> [!TRAP]
> LoRaWAN's strength (long range, years of battery) comes at the cost of **extremely low data rates** — bytes per message. It's perfect for *small, infrequent* transmissions (a meter reading, a soil sample) and useless for streaming. Don't propose it for anything image/audio/video.

## Architecture — the four components

| Component | Role |
|---|---|
| **End devices (nodes)** | LoRa sensors/actuators; send **uplinks**, receive **downlinks**; battery-powered |
| **Gateways** | Receive LoRa RF, convert to IP, forward to the network server; **transparent** (don't interpret data); multiple can hear the same message (redundancy) |
| **Network Server (NS)** | The **brain** — de-duplication, device authentication, **Adaptive Data Rate (ADR)**, routing, security/session keys |
| **Application Server (AS)** | Decrypts payloads (AppSKey), processes/visualises data, interfaces external systems (MQTT, REST) |

Each end device has identifiers: **DevEUI** (globally unique hardware ID), **AppEUI** (application provider), **DevAddr** (dynamically assigned network address).

> [!INTUITION]
> "**Star-of-stars**" means devices don't mesh — each end device just shouts to **all gateways in earshot** (a star), and the gateways all relay to **one network server** (another star). The device is dumb and cheap; the **network server is the brain** that dedupes, authenticates, and tunes data rates. This keeps the battery device ultra-simple while intelligence lives centrally.

## Device classes (A / B / C)

| Class | Downlink behaviour | Trade-off | Use |
|---|---|---|---|
| **Class A** | Two short receive windows **only after an uplink** | **Best battery life** | Most sensors (default) |
| **Class B** | Adds scheduled receive slots (beacon-synced) | Some battery for **predictable downlink latency** | Devices needing occasional control |
| **Class C** | **Permanently open** receive window | Highest power | **Mains-powered** devices needing instant downlink |

> [!INTUITION]
> The classes are a **battery-vs-responsiveness dial**. Class A listens only briefly after it talks (best battery, but you can't reach it on demand). Class C listens always (you can command it instantly, but it must be plugged in). Class B is the compromise — scheduled windows.

## Security — two keys, two activation methods

End-to-end AES-128 uses **two session keys**:

- **NwkSKey (Network Session Key)** — between device and network server; ensures **integrity** (anti-tampering).
- **AppSKey (Application Session Key)** — between device and application server; ensures **confidentiality** (anti-eavesdropping).

Activation methods: **OTAA (Over-the-Air Activation)** — secure, dynamic key generation (preferred); **ABP (Activation by Personalization)** — static keys, simpler but less secure.

## Message flow

1. **Uplink** — end device sends via LoRa PHY → multiple gateways receive → forward to NS.
2. **Network processing** — NS removes duplicates, authenticates, decrypts network headers, forwards payload to AS.
3. **Application** — AS decrypts the payload, visualises/logs/acts.
4. **Downlink (optional)** — AS → NS → gateway → device (e.g., "turn off motor").

> [!EXAM]
> Core items: **LoRa = CSS modulation**, **LoRaWAN = star-of-stars** with **4 components** (end device, gateway *transparent*, network server *the brain*, application server); the **3 classes** (A best battery / C always-listening mains / B scheduled); **two keys** (NwkSKey=integrity, AppSKey=confidentiality) and **OTAA vs ABP**.

---

**Next:** the licensed alternative — Cellular IoT.
