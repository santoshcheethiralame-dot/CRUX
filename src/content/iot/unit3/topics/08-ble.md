---
subject: iot
unit: 3
order: 8
slug: ble
title: Bluetooth Low Energy (BLE)
summary: The low-power Bluetooth variant — GAP/GATT model, central/peripheral roles, the connection lifecycle, and BLE 5.x features.
minutes: 12
tags: [BLE, GATT, GAP, central-peripheral, advertising]
---

# Bluetooth Low Energy (BLE)

> [!NOTE]
> **Bluetooth Low Energy (BLE)** is a power-conserving variant of Classic Bluetooth for **short-range, low-bandwidth** data. Unlike Classic Bluetooth (always ON), BLE stays in **sleep mode** except when a connection is active — consuming roughly **100× less power**.

BLE's killer advantage: **the gateway is already in everyone's pocket** — virtually every smartphone speaks BLE.

## Key features

- **IoT-centric design** — low power and memory footprint fit constrained devices; runs for long periods without recharge.
- **Low power** — sleeps most of the time, waking only to send/receive.
- **Fast connection setup** — connects in **milliseconds** (good for frequent, short transfers).
- **Security** — **AES-128** encryption; BLE 5.x adds LE Secure Connections (ECDH) + privacy addresses.
- **Low latency** — suits real-time apps (remotes, gaming).

## The BLE data model — GAP & GATT

> [!NOTE]
> **GAP (Generic Access Profile)** governs **discovery, advertising, connections, and roles**. **GATT (Generic Attribute Profile)** is the **application data model** — it defines how data is structured and exchanged using **services** and **characteristics**.

- A **service** is a collection of related data + behaviour for one function (e.g., *Heart Rate*, *Battery*).
- A **characteristic** is a data value within a service (with properties and configuration).
- Clients **read / write / subscribe**; servers **expose** data.

## Device roles

| Role | Example |
|---|---|
| **Central** | Phone / gateway (initiates, controls) |
| **Peripheral** | Sensor / "thing" (advertises, provides data) |
| **Advertiser** | Periodically broadcasts "I exist" + basic info |
| **Scanner** | Listens for advertisements |
| **Initiator** | A scanner that can also request a connection |

BLE has an architectural **asymmetry**: e.g., a smartphone (central) connects to a smart band (peripheral).

## The connection lifecycle

> [!INTUITION]
> BLE's lifecycle is **"shout, then whisper."** A peripheral first **shouts** to the world (advertising on channels 37/38/39 — "I exist!"); once a central hears it and connects, they switch to a private, low-power **whisper** (a scheduled connection), and the peripheral stops shouting to save energy.

1. **Advertising** — peripheral sends short packets on channels 37/38/39 with its name + service UUIDs.
2. **Discovery & connect** — central scans, filters by signal/service, starts a connection.
3. **Pairing & bonding** — exchange keys, enable AES-128; **bonding** stores keys for auto-reconnect.
4. **Service discovery (GATT)** — central learns the device's services & characteristics, subscribes to notifications.
5. **Data transfer** — peripheral pushes **Notifications** (no ACK) for telemetry or **Indications** (ACK) for critical data; central reads/writes.
6. **Power saving** — peripheral sleeps, waking briefly → months/years of battery.

## BLE 5.x extras

- **LE Coded PHY** — long-range mode (extended coverage).
- **Direction finding** — indoor positioning (AoA/AoD) for RTLS.
- **BLE Mesh** — many devices relay messages (e.g., smart lighting).

## BLE vs Classic Bluetooth

| | BLE | Classic Bluetooth |
|---|---|---|
| **Communication** | Small packets, short bursts | Continuous, two-way |
| **Power** | Very low (sleeps) | Higher (always on) |
| **Range / throughput** | Shorter, sub-Mbps | Longer range, higher throughput (audio/streaming) |

> [!EXAM]
> Know BLE = **low-power short-range, ~100× less power than Classic**; the **GAP (access/discovery) vs GATT (data model: services & characteristics)** distinction; **central vs peripheral** roles; the **lifecycle** (advertise → discover/connect → pair/bond → GATT discovery → data transfer → sleep); **Notifications (no ACK) vs Indications (ACK)**; and **BLE vs Classic** (small bursts/low power vs continuous/high throughput).

---

**Next:** the medium-range heavyweight — Wi-Fi for IoT.
