---
subject: iot
unit: 2
order: 11
slug: self-calibration
title: Sensor Calibration & Self-Calibration
summary: What calibration is, the error types it corrects (offset, gain, drift), and how smart sensors calibrate themselves automatically.
minutes: 9
tags: [calibration, self-calibration, drift, offset-gain, auto-zero]
---

# Sensor Calibration & Self-Calibration

> [!NOTE]
> **Calibration** is the process of comparing a sensor's output against a **known reference** and adjusting it so its readings are accurate. **Self-calibration** is when the sensor performs this **automatically**, without manual intervention.

Sensors leave the factory imperfect and degrade with age, temperature, and use. Calibration corrects this so readings stay trustworthy.

## The errors calibration corrects

| Error | What it is | Fix |
|---|---|---|
| **Offset (bias)** | Non-zero output when input is zero | Subtract the offset (**auto-zero**) |
| **Gain / scale error** | Slope of output-vs-input is wrong | Multiply by a correction factor |
| **Non-linearity** | Output curve deviates from a straight line | Apply a correction curve / lookup table |
| **Drift** | Slow change over time/temperature | Periodic **recalibration** |

> [!INTUITION]
> Two numbers fix most sensors: **offset** (where the line starts) and **gain** (how steep it is). Calibration finds the true line `y = gain·x + offset` and inverts it. **Drift** is what makes calibration a *recurring* job rather than a one-time factory step — the line slowly shifts, so you must re-measure it.

## How calibration is done

1. **One-point** — correct the **offset** using a single known reference (e.g., zero).
2. **Two-point** — correct both **offset and gain** using two known references (e.g., 0 °C ice and 100 °C boiling water).
3. **Multi-point** — many references to also correct **non-linearity** via a curve.

## Self-calibration

Smart sensors automate the above using on-board logic:

- **Auto-zero** — periodically sample a known-zero reference and subtract the offset.
- **Built-in references** — an internal stable reference (voltage, temperature) the sensor checks itself against.
- **Temperature compensation** — an extra temperature sensor lets the device correct readings that drift with temperature.
- **Algorithmic / AI-based** — models learn and compensate for systematic drift over time.

> [!INTUITION]
> Self-calibration is **drift insurance**. A field-deployed sensor can't be sent back to a lab every month, so it carries its own reference and quietly re-zeros itself — keeping a years-long unattended deployment accurate. It's the natural partner of the smart-sensor concept.

## Why it matters for IoT

IoT sensors are often **deployed at scale, unattended, for years**, in changing environments — exactly where drift accumulates and manual recalibration is impractical. Self-calibration keeps data reliable without truck-rolls, which is essential for trustworthy analytics.

> [!EXAM]
> Define **calibration** (compare to a reference, adjust) and **self-calibration** (automatic), list the errors it corrects (**offset, gain, non-linearity, drift**), describe **one/two/multi-point** calibration, and explain **why self-calibration matters for large, unattended IoT deployments** (drift over time, no manual access). Link offset/drift back to the static-metrics topic.

---

**Next:** networking many sensor nodes together — Wireless Sensor Networks.
