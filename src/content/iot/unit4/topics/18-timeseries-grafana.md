---
subject: iot
unit: 4
order: 9.6
slug: timeseries-grafana
title: Time-Series Databases & Grafana
summary: Why IoT needs purpose-built time-series databases like InfluxDB, and how Grafana turns those streams into real-time dashboards and alerts.
minutes: 9
tags: [InfluxDB, time-series, Grafana, dashboards, visualization]
---

# Time-Series Databases & Grafana

Unit 4's pipeline named storage and visualization as stages 3 and 6. Here's the IoT-standard toolkit for them: **InfluxDB** to store, **Grafana** to see.

## Why a time-series database?

Recall (Unit 1) that IoT data is overwhelmingly **time-series** — values stamped with the time they were measured, arriving continuously at high frequency.

> [!NOTE]
> A **time-series database (TSDB)** like **InfluxDB** or **TimescaleDB** is purpose-built to **ingest, store, and query timestamped data at high volume** — optimized for "what happened over this time range" queries, retention policies, and downsampling.

Why not a normal relational database?

| Need | Relational DB | Time-series DB |
|---|---|---|
| **High-rate timestamped writes** | Struggles at scale | **Optimized** for it |
| **Time-range queries / aggregation** | Manual, slower | **Native, fast** (e.g., "avg per 5 min") |
| **Retention / downsampling** | Manual | **Built-in** (auto-expire old, keep summaries) |
| **Storage of repetitive series** | Inefficient | **Compressed** for time-series |

> [!INTUITION]
> A relational database is built for *relationships* between entities (the DBMS course's joins); a TSDB is built for *one shape of data* — a firehose of `(timestamp, value, tags)`. By specializing, InfluxDB ingests millions of points/second and answers "average temperature per hour last week" instantly, with **automatic downsampling** to keep years of history cheap (store raw for a day, hourly averages forever).

**InfluxDB** concepts: data is written as **measurements** with **tags** (indexed metadata, e.g., `device=sensor1`) and **fields** (the values), each with a timestamp; queried with **Flux/InfluxQL**.

## Grafana — real-time visualization

> [!NOTE]
> **Grafana** is an open-source platform for **visualizing time-series data** as live, interactive **dashboards** — line graphs, gauges, heatmaps — and for firing **alerts** when metrics cross thresholds.

- **Data-source agnostic** — plugs into InfluxDB, Prometheus, and many others.
- **Real-time dashboards** — auto-refreshing panels for monitoring fleets of devices.
- **Alerting** — rules that trigger email/Slack/webhook when a value breaches a limit (closing the pipeline's "action" stage).

> [!INTUITION]
> The pairing is the IoT monitoring standard: **InfluxDB is the memory; Grafana is the eyes.** Devices write readings to InfluxDB; Grafana reads them back as a live wall of charts and shouts (alerts) when something's wrong. Together they implement pipeline stages **storage → visualization → action** with off-the-shelf, open-source tools.

## Where it sits in the stack

`Sensors → (MQTT) → ingest → **InfluxDB** (store) → **Grafana** (visualize + alert) → action`

Often deployed at the **edge/fog** (a local InfluxDB+Grafana on a gateway) for on-site dashboards that survive cloud outages, syncing to the cloud for long-term history.

> [!EXAM]
> Know **why a time-series DB** beats a relational DB for IoT (high-rate timestamped writes, native time-range aggregation, **retention/downsampling**), name **InfluxDB**, and describe **Grafana** as the real-time dashboard + **alerting** layer. The **InfluxDB (store) + Grafana (visualize)** combo is the classic IoT monitoring stack.

---

**Next:** the flagship analytics use case — predictive maintenance.
