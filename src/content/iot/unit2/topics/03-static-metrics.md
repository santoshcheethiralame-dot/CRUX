---
subject: iot
unit: 2
order: 3
slug: static-metrics
title: Sensor Performance — Static Metrics
summary: How sensors are judged under steady conditions — accuracy, precision, sensitivity, resolution, linearity, range, offset, and drift.
minutes: 11
tags: [accuracy, precision, sensitivity, resolution, linearity, drift]
---

# Sensor Performance — Static Metrics

A sensor's quality is captured by **performance metrics**, split into **static** (steady/slowly-varying conditions) and **dynamic** (fast-changing conditions, next topic). Static metrics describe how accurate, consistent, and reliable a sensor is when the input is stable.

## Accuracy vs Precision — the key pair

> [!NOTE]
> **Accuracy** = how close the output is to the **true value**. **Precision (repeatability)** = how **consistent** repeated readings are for the same input — *regardless* of whether they're correct.

> [!INTUITION]
> Picture a dartboard. **Accurate** = darts cluster around the bullseye (true value). **Precise** = darts cluster tightly *together* — even if that cluster is in the wrong corner. You can be **precise but inaccurate** (tight cluster, wrong spot → a systematic error you can calibrate out) or **accurate but imprecise** (scattered around the bullseye → noise). The best sensor is both.

- **Accuracy** is often quoted as ±error or a percentage of full-scale range (e.g., a temperature sensor accurate to ±1 °C).
- **Precision** matters when *consistency* beats correctness — e.g., a humidity sensor used for **trend analysis**.

## The core static metrics

| Metric | Definition | Example |
|---|---|---|
| **Accuracy** | Closeness to the true value | ±1 °C from actual temperature |
| **Precision / repeatability** | Consistency of repeated readings | Same reading each time for a fixed input |
| **Sensitivity** | How much output changes per unit change of input | 10 mV per °C |
| **Resolution** | Smallest input change the sensor can detect | Detects 0.01 °C steps |
| **Linearity** | How closely output follows a straight line vs input | 1 V change per 10 N across the range |
| **Range (full-scale)** | Min–max values it can measure | 0–500 psi |
| **Offset (bias)** | Output when the input is zero (should be 0) | 0.05 V with no load |
| **Drift** | Slow change in output over time for a fixed input | Reading creeps up as the device ages |

### Sensitivity vs Resolution (commonly confused)

> [!TRAP]
> **Sensitivity** = the *slope* of output-vs-input (how big an output you get per unit input). **Resolution** = the *smallest step* the sensor can distinguish. A sensor can be very sensitive (steep slope) yet have coarse resolution if its electronics can't resolve fine steps. They are different properties.

### Linearity, range, offset, drift

- **Linearity** — a perfectly linear sensor gives proportional output across its whole range; non-linearity causes errors, especially near the extremes.
- **Range** — pick a range that covers your expected extremes without **saturation** or wasted resolution.
- **Offset** — a baseline shift at zero input from manufacturing imperfections; corrected during **calibration**.
- **Drift** — a slow, gradual shift over time (ageing, temperature) — the reason sensors need periodic **recalibration** (see the self-calibration topic).

> [!EXAM]
> The almost-guaranteed question is **accuracy vs precision** (use the dartboard). Also be ready to define **sensitivity, resolution, linearity, offset, and drift** with one example each, and distinguish **sensitivity vs resolution**. Know that **offset** and **drift** are the errors calibration targets.

---

**Next:** how sensors perform under *change* — dynamic metrics.
