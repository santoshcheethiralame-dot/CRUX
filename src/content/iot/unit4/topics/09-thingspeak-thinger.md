---
subject: iot
unit: 4
order: 9
slug: thingspeak-thinger
title: ThingSpeak & thinger.io
summary: Two lightweight IoT platforms ideal for prototyping and academic projects — ThingSpeak's channels/MATLAB analytics and thinger.io's device management.
minutes: 8
tags: [ThingSpeak, thinger-io, prototyping, channels, dashboards]
---

# ThingSpeak & thinger.io

Not every project needs the full weight of AWS or Azure. For **prototyping, learning, and academic IoT**, two lightweight platforms shine: **ThingSpeak** and **thinger.io**.

## ThingSpeak (by MathWorks)

> [!NOTE]
> **ThingSpeak** is a cloud platform for **real-time data collection, analysis, and visualization** — purpose-built for sensor-based and academic IoT projects, with tight **MATLAB** integration.

Core concepts:

- **Channels** — the basic unit; each channel holds up to **8 fields** of time-stamped data (e.g., field1 = temperature, field2 = humidity). Devices push readings to a channel.
- **Write/Read API keys** — devices `POST` data using a write key (often over **HTTP** or **MQTT**); apps read with a read key.
- **Built-in visualization** — automatic charts of each field over time.
- **MATLAB analysis & visualization** — run MATLAB code in the cloud on your channel data (the key differentiator) for filtering, math, and ML.
- **Reactions / ThingHTTP / alerts** — trigger actions (emails, tweets, web requests) on conditions.

> [!INTUITION]
> ThingSpeak's superpower is **MATLAB in the cloud**. Where other platforms make you export data to analyse it, ThingSpeak lets you run MATLAB analytics *directly on the channel* — which is why it's a favourite in universities and for quick sensor experiments. Think "Google Sheets + charts + MATLAB" for IoT telemetry.

## thinger.io

> [!NOTE]
> **thinger.io** is an open-source-friendly IoT platform for **device connectivity, management, and data visualization** — scalable from a single prototype to production, with generous free tiers for makers.

Core capabilities:

- **Device management** — register and connect devices (ESP32, Arduino, Raspberry Pi) with a lightweight client library.
- **Real-time, bidirectional communication** — read sensor *resources* and call device functions remotely (not just upload telemetry).
- **Dashboards** — drag-and-drop widgets (charts, gauges, maps, buttons) to visualise and control devices.
- **Data buckets** — store time-series data for history.
- **Endpoints** — trigger emails, webhooks, or other services on events.

> [!INTUITION]
> The handy contrast: **ThingSpeak is data-and-analytics-first** (push readings, analyse with MATLAB, chart trends), while **thinger.io is device-and-control-first** (manage devices, read/write their resources live, build interactive dashboards). Both spare you from standing up your own server — ideal for coursework and prototypes.

## When to use a lightweight platform

| Need | Reach for |
|---|---|
| Quick sensor dashboards + MATLAB analytics + academic project | **ThingSpeak** |
| Device management + live control + drag-drop dashboards | **thinger.io** |
| Millions of devices, enterprise security, deep AI/ML | **AWS / Azure** (previous topic) |

> [!EXAM]
> Know **ThingSpeak** = real-time collection/analysis/visualization with **channels (8 fields)** and **MATLAB** integration (academic/prototyping), and **thinger.io** = device connectivity/management + dashboards + live read/write of device resources. The syllabus names both explicitly — be ready to describe each and contrast them with enterprise clouds (AWS/Azure) for scale.

---

**Next:** the other half of Unit 4 — IoT security goals and threats.
