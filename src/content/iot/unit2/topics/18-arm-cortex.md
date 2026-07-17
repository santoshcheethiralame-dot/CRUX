---
subject: iot
unit: 2
order: 18
slug: arm-cortex
title: ARM Cortex-A vs Cortex-M
summary: The two ARM processor families behind IoT — Cortex-A application processors (run Linux) vs Cortex-M microcontrollers (run bare-metal/RTOS).
minutes: 9
tags: [ARM, Cortex-A, Cortex-M, MPU-vs-MCU, RTOS]
---

# ARM Cortex-A vs Cortex-M

Most IoT silicon runs an **ARM** core. ARM licenses processor *designs* (it doesn't make chips), and the two families you meet in IoT are **Cortex-A** and **Cortex-M** — built for very different jobs.

> [!NOTE]
> **Cortex-A** ("Application") processors are powerful CPUs designed to run **full operating systems** like Linux/Android — they power smartphones, Raspberry Pi, and IoT **gateways/edge servers**. **Cortex-M** ("Microcontroller") cores are small, low-power, deterministic processors for **microcontrollers** running **bare-metal or an RTOS** — they power sensors and end devices (STM32, many ESP-class parts).

## Side by side

| | Cortex-A (application) | Cortex-M (microcontroller) |
|---|---|---|
| **Runs** | Full OS (Linux/Android) | Bare-metal or RTOS |
| **Has an MMU?** | **Yes** (virtual memory, processes) | **No** (just an optional MPU) |
| **Performance** | GHz, multi-core, caches | MHz, single-core typically |
| **Power** | Higher (watts) | Very low (mW) |
| **Memory** | MB–GB of external RAM | KB of on-chip SRAM |
| **Determinism** | Lower (OS scheduling, caches) | **High** (predictable timing) |
| **IoT role** | **Gateways, edge servers, rich HMIs** | **Sensors, end nodes, real-time control** |
| **Examples** | Raspberry Pi (Broadcom), i.MX | STM32, nRF, many ESP-class MCUs |

> [!INTUITION]
> The deciding feature is the **MMU (Memory Management Unit)**. A Cortex-**A** has one, so it can run a real OS with virtual memory and many processes — it's a *small computer*. A Cortex-**M** has none, so it runs one program directly on the hardware with **predictable, real-time** timing — it's a *controller*. "A for Applications/Android (needs an OS), M for Microcontroller (bare-metal)."

## Mapping to the IoT architecture

This split mirrors the layered architecture from Unit 1:

- **Cortex-M** lives at the **perception/edge layer** — the battery-powered sensor that samples and reacts in real time.
- **Cortex-A** lives at the **gateway/fog layer** — the more powerful node that aggregates data, runs Linux, does edge analytics (even TinyML at scale), and bridges to the cloud.

> [!TRAP]
> There's also **Cortex-R** ("Real-time") for safety-critical, hard-real-time systems (automotive, storage) — a third family, between A and M in capability with strong real-time guarantees. Exam questions usually focus on **A vs M**, but know R exists.

> [!EXAM]
> The core discriminator: **Cortex-A runs a full OS (has an MMU) → gateways/edge servers/phones**; **Cortex-M is bare-metal/RTOS (no MMU, deterministic, low-power) → sensors/end nodes/real-time control**. Be ready to place a device (Raspberry Pi gateway = Cortex-A; STM32 sensor node = Cortex-M).

---

**Next:** the languages that program these chips — Embedded C & MicroPython.
