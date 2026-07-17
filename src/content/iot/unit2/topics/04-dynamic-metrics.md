---
subject: iot
unit: 2
order: 4
slug: dynamic-metrics
title: Sensor Performance — Dynamic Metrics
summary: How sensors behave under fast-changing inputs — response time, SNR, bandwidth, and frequency response.
minutes: 9
tags: [response-time, SNR, bandwidth, frequency-response, dynamic]
---

# Sensor Performance — Dynamic Metrics

**Dynamic metrics** describe how quickly and faithfully a sensor reacts to a **changing** input. They matter most in real-time, fast-moving applications: robotics, autonomous vehicles, vibration monitoring, audio.

## Response time

> [!NOTE]
> **Response time** is the time a sensor takes to react to a **step change** in input and settle within a defined percentage (typically **90 %** or **95 %**) of its final value.

In fast-moving systems a slow response means **missed or outdated data**. *Example:* a temperature sensor that takes 1.5 s to reach 90 % of a sudden jump from 25 °C to 100 °C has a response time of 1.5 s.

> [!INTUITION]
> Response time is a sensor's **reflexes**. A blazing-fast race needs fast reflexes — a vibration sensor sampling a spinning motor must react in milliseconds; a soil-moisture sensor can take seconds because the soil changes slowly. Match the sensor's reflexes to how fast the world it watches actually moves.

## Signal-to-Noise Ratio (SNR)

> [!NOTE]
> **SNR** measures the level of the desired **signal** relative to background **noise**. A higher SNR means a cleaner, more usable signal.

In noisy environments (industrial floors, RF-heavy areas), high-SNR sensors keep data trustworthy, leading to more reliable decisions. SNR is usually expressed in decibels (dB).

## Bandwidth

> [!NOTE]
> **Bandwidth** is the range of input frequencies over which the sensor can reliably operate and **track the input without distortion.** Unit: **hertz (Hz)**.

Sensors for **vibration monitoring** or **audio** need wide bandwidth so they can follow rapidly oscillating signals; a sensor with too narrow a bandwidth will "blur" fast changes.

## Frequency response

> [!NOTE]
> **Frequency response** describes how a sensor's output **amplitude and phase** vary with the frequency of the input signal.

It characterises sensors in dynamic systems — **accelerometers, microphones** — telling you across which frequencies the sensor reports faithfully and where it starts to attenuate or lag.

> [!INTUITION]
> Bandwidth and frequency response are two views of the same thing. **Frequency response** is the full curve (gain & phase vs frequency); **bandwidth** is the *width of the usable flat part* of that curve. Outside the bandwidth, the frequency response droops and readings become unreliable.

## Static vs dynamic — when to care about which

| | Static metrics | Dynamic metrics |
|---|---|---|
| **Condition** | Steady / slowly varying input | Fast-changing input |
| **Examples** | Accuracy, precision, resolution, linearity | Response time, SNR, bandwidth, frequency response |
| **Typical use** | Environmental/structural monitoring | Robotics, autonomous vehicles, vibration, audio |

> [!EXAM]
> Define **response time** (time to reach 90/95 % of a step change) — the most-asked dynamic metric — plus **SNR, bandwidth (Hz), and frequency response**. Be able to say **why a fast/wide-bandwidth sensor is needed for real-time/vibration** applications and to sort a list of metrics into static vs dynamic.

---

**Next:** putting metrics to work — how to actually select a sensor.
