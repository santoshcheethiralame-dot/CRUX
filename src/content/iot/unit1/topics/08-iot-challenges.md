---
subject: iot
unit: 1
order: 8
slug: iot-challenges
title: Challenges in IoT
summary: The seven recurring obstacles — security & privacy, interoperability, connectivity, power, data overload, scalability, and cost.
minutes: 9
tags: [challenges, security, interoperability, scalability, Mirai]
---

# Challenges in IoT

IoT's strengths — billions of cheap, distributed, always-on devices — are also the source of its hardest problems. Seven challenges recur across every deployment.

## 1. Security & Privacy

IoT devices often **lack robust security**, making them weak entry points into a network.

- **Threats:** default credentials left unchanged, **unencrypted communication**, unpatched firmware, and **botnets** (the **Mirai** attack of 2016 hijacked IoT devices for a massive DDoS).
- **Impact:** compromised personal data, unauthorised control of devices (smart locks, health monitors), and loss of trust.

> [!INTUITION]
> One weak device endangers everything. A hacked smart thermostat can be a foothold to breach a home Wi-Fi network or be conscripted into a botnet. Security is only as strong as the **weakest** of millions of endpoints — and many are shipped with hard-coded default passwords.

## 2. Lack of Interoperability & Standards

There is **no single universally accepted IoT protocol**. Devices from different vendors often can't talk to each other (one uses MQTT, another CoAP, a third a proprietary API).

- **Impact:** integration complexity, **vendor lock-in**, fragmentation, and difficulty scaling across ecosystems.

## 3. Connectivity & Network Reliability

IoT relies on continuous, stable connectivity that isn't always available — especially in rural or remote areas.

- **Issues:** packet loss, latency, signal interference, power outages, protocol choice (Wi-Fi vs LoRa vs Zigbee vs NB-IoT).
- **Impact:** lost real-time capability, missed alerts, poor reliability.

## 4. Power Management

Most sensor devices are **battery-operated** and deployed in hard-to-reach places.

- **Challenge:** the trade-off between **transmission frequency and battery life** — always-on connectivity drains batteries; frequent replacement is impractical.
- **Impact:** shortened device lifetime, maintenance overhead.

## 5. Data Overload & Management

IoT ecosystems generate **massive, continuous data**, much of it redundant or noisy.

- **Challenge:** real-time processing vs long-term storage; filtering, deduplication, compression; ensuring data integrity and time synchronisation.
- **Impact:** cloud/network strain, decision delays — driving the need for **edge computing** and AI analytics.

## 6. Scalability Bottlenecks

Going from a few devices to thousands or millions demands rethinking architecture, data pipelines, and compute.

- **Challenge:** load balancing, device provisioning and lifecycle management, keeping performance from degrading at scale.
- **Impact:** rising infrastructure cost, orchestration complexity.

## 7. High Initial Costs

Sensors, gateways, connectivity, and platform integration require significant up-front investment before benefits materialise.

> [!INTUITION]
> Notice how the challenges **interlock**. Battery limits (power) force devices to skimp on crypto (security) and to send less data (reliability); the flood of devices (scalability) worsens the data deluge (data management); and the lack of standards (interoperability) makes securing and scaling everything harder. They are not independent — fixing one often pressures another.

> [!EXAM]
> Be able to **list and briefly explain the major challenges** (security/privacy, interoperability, connectivity, power, data, scalability, cost). The two highest-frequency exam items: the **security** challenge with the **Mirai botnet** example, and the **interoperability/standards** problem (no universal protocol → vendor lock-in). Often phrased: *"Discuss the challenges in deploying IoT at scale."*

---

**Next:** we move from *what IoT does* to *how it's structured* — IoT architecture and its design drivers.
