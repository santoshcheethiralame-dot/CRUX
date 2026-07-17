---
subject: iot
unit: 4
order: 9.3
slug: tinyml
title: TinyML & Edge AI
summary: Running machine-learning models directly on microcontrollers — why it matters, how it works, and its constraints.
minutes: 9
tags: [TinyML, edge-AI, on-device, inference, quantization]
---

# TinyML & Edge AI

The analytics topics ran ML in the cloud. **TinyML** flips that — it runs the model **on the microcontroller itself**, completing the "intelligence pushed to the edge" idea from Unit 1.

> [!NOTE]
> **TinyML (Tiny Machine Learning)** is the practice of running **ML inference on microcontrollers and other ultra-low-power, resource-constrained devices** — typically a few hundred KB of memory and milliwatts of power.

## Why run ML on a microcontroller?

The same drivers as edge computing (Unit 1), taken to the extreme:

- **Ultra-low latency** — decisions happen on-device in milliseconds, no cloud round-trip.
- **Offline autonomy** — works with no connectivity.
- **Bandwidth savings** — send only the *result* ("keyword detected"), not raw audio/video.
- **Privacy** — raw data (voice, images) never leaves the device.
- **Power** — far cheaper than constantly transmitting raw data over a radio.

> [!INTUITION]
> TinyML inverts the usual flow. Normally a sensor ships raw data to the cloud to be analysed; TinyML puts a small trained model **on the sensor**, so it ships a **conclusion**, not data. A smart doorbell that recognises a person *on-device* is faster, works offline, saves bandwidth, and keeps the video private — all at once. It's the smart-sensor idea (Unit 2) fused with ML.

## Train in the cloud, infer on the device

> [!NOTE]
> The key split: **training** (heavy, data-hungry) happens in the **cloud**; only **inference** (running the finished model) happens on the device. You never train on the MCU.

The workflow:
1. **Train** a model in the cloud (TensorFlow/PyTorch) on collected data.
2. **Shrink** it — **quantization** (e.g., 32-bit floats → 8-bit integers) and pruning to fit KB of memory.
3. **Convert & deploy** — e.g., **TensorFlow Lite for Microcontrollers**, **Edge Impulse** — flash it to the MCU.
4. **Infer on-device** — the model runs locally on live sensor data.

> [!TRAP]
> You **don't train on the microcontroller** — it lacks the memory/compute. TinyML is about **efficient inference** of an already-trained, heavily-compressed model. **Quantization** (shrinking weights to 8-bit ints) is what makes a model small and fast enough to fit, usually with only a small accuracy loss.

## Typical TinyML applications

- **Keyword/wake-word spotting** ("Hey Siri" on-device).
- **Anomaly detection** on vibration (predictive maintenance at the sensor).
- **Gesture/activity recognition** on wearables.
- **Simple image classification** (person/no-person) on tiny cameras.

> [!EXAM]
> Define TinyML (**ML inference on microcontrollers**, KB memory, mW power), its benefits (**low latency, offline, bandwidth-saving, privacy, power**), the **train-in-cloud / infer-on-device** split, and the role of **quantization** (shrink weights to fit). Tools: **TensorFlow Lite for Microcontrollers**, Edge Impulse.

---

**Next:** storing and visualizing the time-series stream — InfluxDB & Grafana.
