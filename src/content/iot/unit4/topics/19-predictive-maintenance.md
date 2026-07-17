---
subject: iot
unit: 4
order: 9.9
slug: predictive-maintenance
title: Predictive Maintenance
summary: The flagship IoT analytics use case — using sensor data and ML to predict hardware failure before it happens, beating reactive and preventive maintenance.
minutes: 9
tags: [predictive-maintenance, RUL, anomaly, vibration, downtime]
---

# Predictive Maintenance

If IoT analytics has one signature application, it's **predictive maintenance** — and it ties together everything in this subject: sensors, connectivity, edge/cloud, and ML.

## The three maintenance strategies

| Strategy | When you fix | Problem |
|---|---|---|
| **Reactive** ("run to failure") | **After** it breaks | Costly unplanned downtime; collateral damage |
| **Preventive** (scheduled) | On a **fixed calendar** | Often too early (wasted parts) or too late (still fails) |
| **Predictive** | **Exactly when data says it's needed** | Requires sensors + analytics |

> [!NOTE]
> **Predictive maintenance** uses real-time sensor data and ML to **forecast equipment failure before it happens**, so repairs are scheduled at the optimal moment — minimizing both downtime and unnecessary servicing.

> [!INTUITION]
> The three strategies are like car tyres. **Reactive** = drive until a blowout on the highway (dangerous, expensive). **Preventive** = replace every 6 months no matter the tread (safe but wasteful). **Predictive** = a sensor watching tread depth and pressure tells you to replace them *next week, before they fail*. Predictive hits the sweet spot — and only IoT data makes it possible.

## How it works — the whole subject in one loop

1. **Sense** — sensors capture failure-predictive signals: **vibration, temperature, current, acoustic, oil quality** (Unit 2).
2. **Transmit** — readings stream over MQTT/etc. to edge or cloud (Unit 3).
3. **Store** — time-series data lands in InfluxDB / a data lake.
4. **Analyse** — ML detects degradation:
   - **Anomaly detection** (unsupervised/autoencoder) flags abnormal vibration → impending fault.
   - **Regression** predicts **RUL (Remaining Useful Life)** — "this bearing has ~12 days left."
   - **Classification** labels machine state *healthy / degrading / faulty*.
5. **Act** — auto-schedule maintenance, order the part, alert a technician (Grafana alert / dashboard).

> [!INTUITION]
> Predictive maintenance is the **capstone of this whole course**: a vibration **sensor** (U2) on a motor streams over **MQTT** (U3) to the cloud (or runs **TinyML** at the edge), where an **autoencoder/regression model** (U4) predicts a bearing failure days ahead and triggers an action. Every unit shows up in this one loop — *sense → connect → analyse → act*.

## Business impact

- **Less downtime** — fix before failure, on your schedule, not the machine's.
- **Lower cost** — replace parts only when needed; avoid catastrophic secondary damage.
- **Safety** — catch dangerous failures (turbines, brakes) early.
- It's the backbone of **IIoT / Industry 4.0** (Unit 1) — the killer app that justifies the sensors.

> [!TRAP]
> Predictive maintenance has real ML challenges (from the analytics topic): **data imbalance** (failures are rare, so few positive examples), **model drift** (sensor behaviour changes over time → retrain via the feedback loop), and needing enough **historical failure data** to learn from.

> [!EXAM]
> Contrast **reactive vs preventive vs predictive** maintenance (and why predictive is the sweet spot), describe the **sense → transmit → store → analyse → act** loop with the ML techniques used (**anomaly detection, RUL regression, classification**), and name the predictive signals (**vibration, temperature, current**). Note the challenges (rare failures = data imbalance, model drift).

---

**Next:** the security half of the unit, starting with the IoT attack surface.
