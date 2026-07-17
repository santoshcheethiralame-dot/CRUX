---
subject: iot
unit: 2
order: 15
slug: stm32-architecture
title: The STM32 Microcontroller
summary: The STM32 ARM Cortex-M family — series, on-chip hardware, the embedded toolchain, and how it compares to a Raspberry Pi Pico.
minutes: 10
tags: [STM32, ARM-Cortex-M, peripherals, toolchain, HAL]
---

# The STM32 Microcontroller

> [!NOTE]
> **STM32** is a family of **32-bit ARM Cortex-M** based microcontrollers from **STMicroelectronics.** They are low-power and high-performance, carry a wide range of built-in peripherals (ADC, UART, SPI, I²C), and are supported by a rich development ecosystem.

STM32 is the board this course uses to design IoT applications. It hits the sweet spot: powerful enough for real sensing/control, cheap and low-power enough for embedded deployment.

## Popular STM32 series

| Series | Positioning |
|---|---|
| **STM32F1** | General-purpose |
| **STM32L** | Ultra-low-power |
| **STM32F4** | High-performance (with FPU/DSP) |

## Core hardware components

| Block | Role |
|---|---|
| **Cortex-M CPU core** | Processes instructions |
| **Flash memory** | Stores the firmware |
| **SRAM** | Runtime memory (variables, stack) |
| **GPIO** | Drives LEDs/buttons, reads digital I/O |
| **Timers** | Precise time-based tasks, PWM |
| **ADC** | Reads analog voltages (sensors) |
| **USART / I²C / SPI** | Communication with external devices/modules |

Higher-end STM32F4 parts add a hardware **FPU & DSP** instructions, advanced timers (with quadrature encoder interface), **CAN/CAN-FD, USB OTG, Ethernet**, and mixed-signal integration (built-in op-amps) — useful for richer IoT and motor-control applications.

## STM32 vs Raspberry Pi Pico W

| | Raspberry Pi Pico W | STM32F4 series |
|---|---|---|
| **Core** | Dual-core Cortex-M0+ @ 133 MHz | Single-core Cortex-M4F @ ~72–80 MHz |
| **Flash** | 2 MB external QSPI | 16 KB – 512 KB on-chip |
| **RAM** | 264 KB SRAM | 4 KB – 80 KB SRAM |
| **Operating voltage** | 1.8–3.3 V | 2.0–3.6 V |

> [!INTUITION]
> The Pico has more raw memory and a faster dual core; the STM32F4 wins on **integrated real-world features** — a hardware FPU/DSP, richer timers, CAN, Ethernet, analog blocks. For **deterministic industrial control and signal processing**, that on-chip peripheral richness matters more than megabytes of RAM.

## The embedded toolchain

> [!NOTE]
> A **toolchain** is the set of tools that converts source code → machine code the MCU runs.

| Stage | Tool examples |
|---|---|
| **Editor / IDE** | STM32CubeIDE, VS Code, Arduino IDE |
| **Compiler / assembler** | GCC, Clang — translate C/C++/ASM → object code |
| **Linker** | Combines object files + libraries → firmware binary (`.elf` / `.hex` / `.bin`) |
| **Programmer / flasher** | ST-Link, J-Link, bootloader — loads firmware into the MCU |
| **Debugger** | GDB, OpenOCD — breakpoints, step-through, real-time trace |

The STM32 ecosystem adds **STM32CubeMX** (a graphical pin/peripheral configurator that generates init code) and the **HAL (Hardware Abstraction Layer)** library, so you call `HAL_GPIO_TogglePin(...)` instead of writing raw register values.

> [!EXAM]
> Know that STM32 is a **32-bit ARM Cortex-M** MCU family, name the **series (F1 general, L low-power, F4 high-perf)**, list the **on-chip blocks** (CPU, flash, SRAM, GPIO, timers, ADC, UART/I²C/SPI), and the **toolchain stages** (IDE → compiler → linker → flasher → debugger). The STM32-vs-Pico contrast (peripherals/real-time vs raw memory) is a likely discussion point.

---

**Next:** putting it together — designing an IoT application on the STM32.
