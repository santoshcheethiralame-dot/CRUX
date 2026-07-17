---
subject: iot
unit: 4
order: 8
slug: aws-azure
title: AWS IoT & Azure IoT
summary: The two leading managed IoT clouds — their core components, the cloud-vs-edge services (Greengrass/IoT Edge), and key advantages.
minutes: 9
tags: [AWS, Azure, IoT-Core, Greengrass, managed-cloud]
---

# AWS IoT & Azure IoT

The two most widely used IoT clouds are **AWS IoT** (Amazon) and **Azure IoT** (Microsoft). Both are **fully managed** platforms to connect, monitor, and manage devices securely at scale.

## AWS IoT — core components

AWS IoT is a comprehensive, managed platform integrating cloud, edge, analytics, and AI.

| Layer | AWS service | Function |
|---|---|---|
| **Device connectivity** | **AWS IoT Core** | Securely connects devices via **MQTT, HTTP, WebSockets** |
| **Device management** | AWS IoT Device Management | Large-scale registration, organisation, monitoring |
| **Edge computing** | **AWS IoT Greengrass** | Local compute, ML inference, analytics — even **offline** |
| **Data processing** | IoT Analytics / Kinesis / Lambda | Real-time stream processing |
| **ML & AI** | Amazon **SageMaker** / Lookout for Equipment | Predictive models, anomaly detection |
| **Visualization** | Amazon QuickSight | Dashboards and visualizations |

## Azure IoT

Azure IoT is Microsoft's managed ecosystem of cloud services, edge components, and SDKs to connect, monitor, and manage devices at scale. Its hub (**Azure IoT Hub**) provides MQTT-based device messaging, and **Azure IoT Edge** runs processing locally — mirroring AWS's Core/Greengrass split.

## Cloud vs edge — within the platform

> [!INTUITION]
> Both clouds offer the **same two modes** you saw in the previous topic, just with branded services:
> - **Cloud-based** → devices connect straight to **AWS IoT Core / Azure IoT Hub**; ingest, process, store centrally. For scalable, global, centralized control.
> - **Edge-based** → **AWS IoT Greengrass / Azure IoT Edge** process locally for low latency, offline operation, and bandwidth savings, syncing to the cloud periodically.
>
> Remember the pairing: **IoT Core ≈ IoT Hub** (cloud connectivity); **Greengrass ≈ IoT Edge** (local/edge compute).

## Advantages of a managed IoT cloud

- **Massive scalability** — millions of devices with auto-scaling.
- **High security** — end-to-end encryption, identity & access management (AWS **IAM** + IoT policies), per-device certificates.
- **AI/ML integration** — real-time intelligence (SageMaker, Greengrass ML).
- **Cost efficiency** — pay-as-you-go.
- **Interoperability** — integrates with the broader ecosystem (Lambda, DynamoDB, S3, Kinesis…).

> [!EXAM]
> Be able to name **AWS IoT Core** (device connectivity via MQTT/HTTP/WebSockets) and **AWS IoT Greengrass** (edge compute, offline ML), the **Azure** equivalents (**IoT Hub** / **IoT Edge**), and the **advantages** (scalability, security via IAM/certs, AI/ML, pay-as-you-go). The Core↔Hub and Greengrass↔IoT Edge mapping is a likely question.

---

**Next:** the lightweight platforms for prototyping and academics — ThingSpeak & thinger.io.
