---
subject: iot
unit: 3
order: 5
slug: plc
title: Power Line Communication (PLC)
summary: Sending data over existing electrical wiring — how it works, modulation schemes, and IoT applications like smart grids.
minutes: 7
tags: [PLC, power-line, smart-grid, OFDM, modulation]
---

# Power Line Communication (PLC)

> [!NOTE]
> **Power Line Communication (PLC)** transmits data over **existing electrical wiring** — carrying digital signals (like internet data) over the same AC power lines (110 V / 220 V) that deliver electricity. No new cabling is needed.

## Why PLC is attractive

- **No new wires** — reuses the power infrastructure already in every building and grid.
- Popular in **smart grid, home automation, IoT, and energy monitoring**.
- Works well for **low-bandwidth** control signals and low-speed data.

> [!INTUITION]
> PLC's appeal is **"the wire is already there."** Every meter, appliance, and streetlight is already connected to power — so if you can ride data on those same lines, you get connectivity for free, even in places wireless can't reach. That's why it's a natural fit for smart grids and dense urban infrastructure.

## How PLC works

1. Standard AC power lines carry **50/60 Hz** electrical power; PLC overlays **higher-frequency data signals** (kHz–MHz range) on top.
2. A **PLC modem/chipset** sits at each end (e.g., a smart meter and a gateway).
3. Data is encoded using **modulation** techniques:
   - **OFDM** (Orthogonal Frequency-Division Multiplexing) — robust, high-throughput.
   - **FSK** (Frequency Shift Keying).
   - **PSK** (Phase Shift Keying).
4. **Filters** separate the data signal from the power signal so both coexist safely without interference.

## Applications in IoT

| Use case | Role of PLC |
|---|---|
| **Smart grid** | Utilities collect data from smart meters over power lines |
| **Smart homes** | Control appliances via power sockets (lights, thermostats) |
| **Industrial automation** | Communicate with sensors/actuators in harsh factory environments |
| **Rural / remote areas** | Connectivity where wireless is unreliable or blocked |
| **Building energy management** | Integrate meters, HVAC, and lighting controls |

> [!EXAM]
> Know that PLC sends **data over existing power lines** (no new wiring), overlays **high-frequency data (kHz–MHz)** on the 50/60 Hz power using **OFDM/FSK/PSK** modulation with **filters** to separate signals, and is used heavily in **smart grid / smart meter** applications.

---

**Next:** the wireless side begins — unlicensed spectrum and range classes.
