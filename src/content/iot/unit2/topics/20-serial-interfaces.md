---
subject: iot
unit: 2
order: 20
slug: serial-interfaces
title: Serial Interfacing & Interrupts (I²C, SPI, UART)
summary: The three serial buses that connect MCUs to sensors — I²C, SPI, UART — compared, plus interrupt handling vs polling.
minutes: 11
tags: [I2C, SPI, UART, interrupts, polling]
---

# Serial Interfacing & Interrupts (I²C, SPI, UART)

A microcontroller talks to sensors, displays, and modules over **serial buses**. Three dominate IoT — **I²C, SPI, UART** — and the MCU reacts to events using **interrupts**.

## The three serial buses

| | **UART** | **I²C** | **SPI** |
|---|---|---|---|
| **Wires** | 2 (TX, RX) | 2 (SDA, SCL) | 4 (MOSI, MISO, SCLK, SS) |
| **Sync?** | **Asynchronous** (no clock) | Synchronous (shared clock) | Synchronous (shared clock) |
| **Devices** | 2 (point-to-point) | **Many** (addressed, 2 wires) | Many (one **SS** line each) |
| **Speed** | Low–medium | Medium (100k–3.4M) | **Highest** (tens of MHz) |
| **Addressing** | None | **7/10-bit device address** | Per-device chip-select |
| **Typical use** | GPS, modems, debug console | Many sensors on a shared bus | Displays, SD cards, fast ADCs |

### UART
Two wires, **no shared clock** (asynchronous) — both ends must agree on a **baud rate**. Simple, point-to-point: the MCU's `TX` connects to the peer's `RX` and vice-versa. Used for **serial debug**, GPS, and talking to Wi-Fi/BLE/cellular modems (recall Unit 2's connected-node loop).

### I²C (Inter-Integrated Circuit)
Just **two shared wires** — **SDA** (data) + **SCL** (clock) — for a whole bus of devices, each with a unique **address**. A controller addresses a target, so you can hang many sensors off the same two pins. Trades speed for **wiring simplicity and device count**.

### SPI (Serial Peripheral Interface)
**Four wires** — **MOSI** (controller→target), **MISO** (target→controller), **SCLK** (clock), and a per-device **SS/CS** (select). **Fastest** of the three (full-duplex), used for displays, SD cards, and high-rate sensors. Costs an extra select line per device.

> [!INTUITION]
> Pick by the trade-off: **UART** for a simple two-party link (debug/modem); **I²C** when you want **many sensors on the fewest wires** (two pins, addressed); **SPI** when you need **raw speed** and don't mind more wires. Mnemonic: I²C = *fewer wires, more devices*; SPI = *more wires, more speed*; UART = *no clock, point-to-point*.

## Interrupts vs polling

How does the MCU know an event happened (a button press, data ready)?

> [!NOTE]
> **Polling** = the CPU repeatedly *checks* ("is it ready yet?") in a loop. **Interrupts** = the hardware *signals* the CPU when an event occurs, which pauses the main program to run a short **ISR (Interrupt Service Routine)**, then resumes.

| | Polling | Interrupts |
|---|---|---|
| **CPU** | Wastes cycles constantly checking | Free to sleep / do other work |
| **Latency** | Depends on loop timing | Fast, event-driven response |
| **Power** | Higher (can't sleep) | **Lower** (sleep until event) |
| **Complexity** | Simple | More care (ISRs, shared data) |

> [!INTUITION]
> Polling is **staring at the kettle** waiting for it to boil; an interrupt is a **kettle that whistles** so you can do other things until it does. For battery IoT this is huge: with interrupts the MCU can **sleep** and wake only when a sensor fires — exactly the low-power pattern (and the reason a "denial-of-sleep" attack is so damaging, as you'll see in Unit 4).

> [!TRAP]
> Keep **ISRs short and fast** — do the minimum (set a flag, read a register) and handle the heavy work in the main loop. Long ISRs block other interrupts. Also protect data shared between an ISR and the main loop (e.g., mark it `volatile`).

> [!EXAM]
> Compare **UART (async, 2-wire, point-to-point), I²C (2-wire, addressed, many devices), SPI (4-wire, fastest, per-device select)** — know the wire counts and when to use each. Then **polling vs interrupts** (check-in-a-loop vs hardware-signalled ISR) and why interrupts save power (sleep until event). Keep ISRs short.

---

That rounds out the embedded foundations — from MCUs and architectures to languages, buses, and interrupts. **Next unit** turns to getting these devices networked.
