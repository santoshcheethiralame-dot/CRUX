---
subject: iot
unit: 4
order: 3
slug: data-pipeline
title: The IoT Analytics Pipeline
summary: The six stages data flows through — generation, collection, storage, processing, analytics, visualization/action — and where AI plugs in.
minutes: 11
tags: [pipeline, data-flow, stream-batch, storage, AI-integration]
---

# The IoT Analytics Pipeline

Data doesn't jump straight from sensor to insight — it flows through a **six-stage pipeline**, each stage adding structure and value.

| # | Stage | Purpose |
|---|---|---|
| **1** | **Data Generation** (sensing) | Sensors/actuators/MCUs convert physical phenomena to digital signals |
| **2** | **Data Collection** (communication) | Transmit data to gateways/cloud via MQTT, CoAP, HTTP, LoRaWAN… |
| **3** | **Data Storage** (persistence) | Store streams for retrieval and historical analysis |
| **4** | **Data Processing** (transformation) | Clean, normalise, aggregate raw data into usable form |
| **5** | **Data Analytics** (insight) | Extract patterns/predictions via statistics, AI, ML |
| **6** | **Visualization & Action** (decision) | Dashboards, alerts, and automated actuation |

## Stage by stage

**1. Generation** — sensors, actuators, and embedded boards (ESP32, Arduino, Raspberry Pi) produce **high-frequency, real-time, often unstructured** data.

**2. Collection** — uses IoT protocols (**MQTT** lightweight, **CoAP** low-power, **HTTP**, plus LoRaWAN/Zigbee/BLE) over **device-to-cloud**, **device-to-gateway**, or **device-to-device** architectures. Challenges: latency/bandwidth, connectivity loss, encryption in transit.

**3. Storage** — **time-series databases** (InfluxDB, TimescaleDB), **cloud storage** (S3, Azure Blob), and **NoSQL** (MongoDB, Cassandra) for unstructured data. Split into **edge storage** (short-term buffering) and **cloud storage** (long-term data lakes). Challenges: data velocity/volume, retention cost, schema evolution.

**4. Processing** — **cleaning** (dedupe, fill missing, filter noise), **normalization** (consistent units), **aggregation** (hourly averages), plus **stream processing** (Kafka, Spark Streaming, Flink) vs **batch processing** (Hadoop, Databricks).

**5. Analytics** — descriptive→prescriptive analysis using techniques like **anomaly detection, clustering, regression/forecasting, classification**; tools like Python (Pandas, Scikit-learn), TensorFlow/PyTorch, SageMaker.

**6. Visualization & action** — **dashboards** (Grafana, Power BI, Kibana, Tableau), **alerts** (email/SMS on threshold), and **automation** (actuators/APIs trigger responses). *Example:* a smart-building dashboard auto-turns-on HVAC if temperature exceeds a limit.

> [!INTUITION]
> The pipeline is a **refinement funnel**: raw, noisy, high-volume data enters at generation and is progressively **cleaned, stored, condensed, and interpreted** until a tiny, valuable signal — *"machine X will fail Tuesday"* — comes out the end as an alert or automatic action. Each stage throws away noise and adds meaning.

## Stream vs batch — the key processing choice

> [!TRAP]
> **Stream processing** handles data **in motion**, in real time (react now — e.g., shut off an overheating machine). **Batch processing** runs **periodic jobs** on stored data **at rest** (deep historical analysis — e.g., monthly trend reports). Many systems do both: stream at the edge for reflexes, batch in the cloud for insight.

## Where AI plugs in

AI strengthens **every** stage: anomaly detection at **ingestion**, automated noise reduction at **preprocessing**, intelligent tiering at **storage**, edge classification at **processing**, predictive models at **analytics**, and autonomous control loops at **action**.

> [!EXAM]
> Name the **six pipeline stages in order** (generation → collection → storage → processing → analytics → visualization/action), give one technology per stage (MQTT for collection, InfluxDB for storage, Spark for processing, Grafana for visualization), and distinguish **stream (real-time, data in motion) vs batch (periodic, data at rest)** processing.

---

**Next:** the engine that powers stages 4–5 — machine learning for IoT.
