---
subject: iot
unit: 4
order: 2
slug: types-of-analytics
title: Types of IoT Analytics
summary: The four analytics questions — descriptive, diagnostic, predictive, prescriptive — and the rising ladder of complexity and value.
minutes: 9
tags: [descriptive, diagnostic, predictive, prescriptive, analytics-ladder]
---

# Types of IoT Analytics

IoT analytics is best understood as **four questions**, each harder than the last but worth more.

| Type | Question | What it does |
|---|---|---|
| **Descriptive** | *What is happening?* | Summarises current/past data — a snapshot of behaviour |
| **Diagnostic** | *Why did it happen?* | Finds the **cause** via correlation/comparison |
| **Predictive** | *What might happen next?* | **Forecasts** future events using ML/statistics |
| **Prescriptive** | *What should we do about it?* | **Recommends** optimal actions, weighing cost/benefit/risk |

## A worked thread — a truck engine

The same engine-temperature sensor illustrates all four:

- **Descriptive** — the sensor reports temperature every second; engineers see the engine is (or isn't) within safe limits.
- **Diagnostic** — after a failure, analysis of sustained high temperatures + coolant level + load reveals **overheating** as the root cause.
- **Predictive** — gradual temperature trends estimate **remaining component lifespan**, signalling an oil change before breakdown.
- **Prescriptive** — the system **recommends** scheduling oil changes, upgrading the cooling system, or leasing a newer model — actionable strategies that minimise cost.

> [!INTUITION]
> The four types form a **ladder of "tense": past → present → future → action**. Descriptive looks at *what happened*, diagnostic at *why*, predictive at *what's coming*, prescriptive at *what to do*. Each rung needs more sophisticated technique (and ML) but delivers more value — descriptive tells you the engine is hot; prescriptive tells you exactly what to do about it.

## Complexity vs value

As you climb the ladder, both **complexity and value rise**:

- **Descriptive/diagnostic** rely on statistics, correlation, dashboards.
- **Predictive/prescriptive** rely on **machine learning** and optimisation.

This maps directly to the **edge/fog/cloud** split from Unit 1: simple descriptive analytics can run at the edge; heavy predictive/prescriptive ML usually runs in the cloud.

## Why IoT needs analytics

IoT devices continuously produce vast data (temperatures, vibrations, GPS). **Without analytics it's useless noise.** Analytics:

- Extracts **patterns and trends**.
- Detects **faults and anomalies**.
- **Predicts** future behaviour (failures, demand).
- **Optimises** performance in real time.

The payoff: actionable insight, real-time decisions, **predictive maintenance**, cost efficiency, better customer experience, anomaly/security detection, scalability, compliance, and innovation.

> [!EXAM]
> The four analytics types — **descriptive (what), diagnostic (why), predictive (what next), prescriptive (what to do)** — are near-guaranteed. Map each to its question, give a one-line example, and note the **complexity/value ladder** (predictive & prescriptive need ML). This mirrors the Unit 1 analytics-intelligence driver.

---

**Next:** how data actually flows through the system — the analytics pipeline.
