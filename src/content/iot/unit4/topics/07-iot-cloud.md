---
subject: iot
unit: 4
order: 7
slug: iot-cloud
title: IoT Cloud Platforms & Architecture
summary: Why IoT runs on the cloud — the benefits, the scalable cloud architecture layers, and the cloud-based vs edge-based design choice.
minutes: 10
tags: [cloud, architecture, scalability, cloud-vs-edge, OTA]
---

# IoT Cloud Platforms & Architecture

> [!NOTE]
> **IoT cloud platforms** are the **backbone** of large-scale IoT. They manage device **connectivity & authentication**, **data ingestion & storage**, **real-time analytics & visualization**, and **integration** with AI/ML, security, and automation services.

Why it matters: connecting devices to the cloud is the cornerstone of automation, real-time analytics, and business agility — from smart factories to intelligent transport.

## Key benefits of cloud integration

- **Scalability** — elastic, horizontal scaling without redesigning infrastructure as devices grow.
- **Real-time visibility** — instant access to device data for monitoring, alerts, decisions.
- **Predictive analytics & automation** — cloud AI/ML detects anomalies, forecasts failures, triggers actions.
- **Operational efficiency** — pay-as-you-go reduces on-prem cost.
- **Secure, centralized device management** — dashboards, **OTA (over-the-air) updates**, role-based access control, compliance.

> [!INTUITION]
> The cloud gives IoT three things a device never could: **infinite elastic scale** (millions of devices), **unlimited memory** (years of history for ML), and **heavy compute** (training deep models). The trade-off is **latency and connectivity dependence** — which is exactly why edge/fog exists alongside it (Unit 1).

## A scalable cloud IoT architecture

A reference layering, edge to cloud:

| Layer | Role |
|---|---|
| **Device layer** | Sensors, actuators, controllers — secure, identifiable; provisioning, certification, power management |
| **Network & gateway layer** | Edge gateways collect/preprocess data (LoRaWAN, NB-IoT); bridge edge↔cloud |
| **Cloud ingestion layer** | Gateways send filtered, compressed data up — the core of edge-to-cloud |
| **Data processing layer** | Real-time tools (AWS Lambda, Azure Stream Analytics) → automated, event-driven workflows |
| **Storage & analytics layer** | Scalable stores (time-series DBs, data lakes) power dashboards, analytics, AI |

## The central choice — cloud-based vs edge-based

> [!NOTE]
> When designing an IoT system, you pick between two architectures (often combined):
> - **Cloud-based:** devices connect **directly to the cloud**, where data is processed, analysed, and monitored centrally. Best for **scalable, centralized control** and global deployments.
> - **Edge-based:** devices first connect to an **edge gateway** that processes/filters locally, then forwards to the cloud. Best for **low latency, offline operation, and bandwidth savings**.

| | Cloud-based | Edge-based |
|---|---|---|
| **Processing** | Centralized in the cloud | Local at the edge gateway |
| **Latency** | Higher (round-trip) | Low (local decisions) |
| **Offline** | Fails without connectivity | Keeps working |
| **Bandwidth** | Sends raw/more data | Sends filtered/less data |
| **Best for** | Scale, global view, heavy ML | Real-time, resilient, bandwidth-limited |

> [!INTUITION]
> This is the **same edge/fog/cloud trade-off from Unit 1**, now framed as an architecture decision: cloud-based = simplest and most scalable but latency-bound; edge-based = fast and resilient but more complex. Real deployments are **hybrid** — edge gateways filter and react locally, syncing to the cloud periodically for storage and heavy analytics.

> [!EXAM]
> Know the **benefits of cloud integration** (scalability, real-time visibility, predictive analytics, OTA/centralized management), the **architecture layers** (device → gateway → ingestion → processing → storage/analytics), and — high-frequency — **cloud-based vs edge-based** (central/scalable/latency-bound vs local/low-latency/offline-resilient), usually combined as a hybrid.

---

**Next:** the two dominant clouds — AWS IoT and Azure IoT.
