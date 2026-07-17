---
subject: iot
unit: 3
order: 1
slug: connectivity-criteria
title: IoT Connectivity & Communication Criteria
summary: Wired vs wireless connectivity, and the criteria engineers weigh — bandwidth, latency, range, power, scalability, reliability, security, cost, topology.
minutes: 10
tags: [connectivity, criteria, wired-vs-wireless, tradeoffs, topology]
---

# IoT Connectivity & Communication Criteria

Unit 2 ended with a node that *senses, processes, and acts*. Unit 3 is about the **"transmit"** step — how that node actually moves data. IoT devices need reliable communication channels, and connectivity falls into two broad families.

## Wired vs wireless

| | Wired | Wireless |
|---|---|---|
| **Examples** | Ethernet, RS-232, RS-485, CAN, Modbus, PLC | Wi-Fi, BLE, Zigbee, LoRaWAN, cellular |
| **Strengths** | High throughput, **deterministic** timing, security, reliability | Flexibility, mobility, easy/cheap deployment, scale |
| **Best for** | Industrial, fixed, mission-critical | Consumer IoT, mobile, large-area |

> [!INTUITION]
> Wireless **dominates consumer IoT** because of flexibility — no cables to billions of devices. But **wired wins where timing and reliability are non-negotiable**: a factory robot or a power-grid relay can't tolerate a dropped wireless packet, so it uses deterministic Ethernet. The choice is reliability/determinism vs flexibility/cost.

## The communication criteria

When choosing *any* connectivity technology, engineers assess these criteria — there is no single "best," only the best **fit**:

| Criterion | What it asks | Example contrast |
|---|---|---|
| **Bandwidth** | Data per second the channel carries | Ethernet (high) vs Zigbee (low) |
| **Latency** | Delay before a response | Industrial control <10 ms vs soil data 2–5 s |
| **Range** | Max distance with signal integrity | Zigbee ~10–100 m vs LoRaWAN 10–15 km |
| **Power consumption** | Energy per operation | BLE (low, fitness band) vs Wi-Fi (high, plugged-in) |
| **Scalability** | Devices supported without degradation | Zigbee mesh (large) vs RS-232 (point-to-point) |
| **Reliability** | Delivery without loss/corruption | Ethernet/RS-485 (high) vs Wi-Fi in congestion (drops) |
| **Security** | Confidentiality, integrity, authentication | HTTPS over Wi-Fi; AES in Zigbee/LoRaWAN |
| **Cost** | Hardware + install + recurring fees | Cellular (high recurring) vs Wi-Fi (no usage fee) |
| **Topology flexibility** | Supported layouts (star/mesh/P2P) | Zigbee (mesh) vs Wi-Fi (star) |
| **Interoperability** | Works across vendors/platforms | MQTT/CoAP over TCP/IP |

### Constrained devices & networks

Two IoT-specific terms:

- **Constrained devices** — limited CPU, memory, and battery (a coin-cell sensor). They can't run heavy protocols.
- **Constrained-node networks** — networks of such devices, with low bandwidth, high loss, and tight power budgets.

> [!INTUITION]
> Every criterion is really a **trade-off dial**, and turning one up usually turns another down. More range or bandwidth costs power; more reliability (acknowledgements, retries) costs latency and energy. IoT connectivity design is choosing *which dials matter* for your application and accepting the cost on the others.

> [!EXAM]
> Be ready to (1) contrast **wired vs wireless** (determinism/reliability vs flexibility/cost) and (2) **list and apply the communication criteria** to a scenario — e.g., "pick connectivity for remote rural sensors" → long range + low power + low cost → LoRaWAN. Know **constrained devices / constrained-node networks**.

---

**Next:** the wired workhorse — Ethernet.
