---
subject: iot
unit: 2
order: 14
slug: embedded-systems
title: Introduction to Embedded Systems & Programming
summary: What an embedded system is, its defining constraints, and the microcontroller fundamentals behind every IoT device.
minutes: 10
tags: [embedded, microcontroller, real-time, RTOS, firmware]
---

# Introduction to Embedded Systems & Programming

Every "thing" in IoT runs on an **embedded system** — and programming it is different from writing a desktop app.

> [!NOTE]
> **Embedded programming** means writing software that runs on a **microcontroller** — a small, dedicated computer inside an everyday device (washing machine, drone, car). Unlike general-purpose computers, embedded systems are **designed for one specific task**, run in **real time**, have **limited memory and compute**, and often **lack an OS** (or use a lightweight **RTOS**).

## Defining characteristics

| Characteristic | Meaning |
|---|---|
| **Task-specific** | Built to do one job well, not run arbitrary software |
| **Real-time** | Must respond within strict time bounds |
| **Resource-constrained** | Kilobytes of RAM, limited flash, low clock speed |
| **Often OS-less / RTOS** | Bare-metal code, or a small real-time OS for scheduling |
| **Tightly coupled to hardware** | Software directly drives pins, timers, and peripherals |

> [!INTUITION]
> A desktop OS hides the hardware behind layers of abstraction; embedded programming **takes those layers away**. You write code that flips physical pins, reads voltages, and counts clock ticks directly — there's often no file system, no process scheduler, no safety net. The reward is total control and deterministic, real-time behaviour.

## Microcontroller vs microprocessor

> [!TRAP]
> A **microprocessor** (like a PC's CPU) is *just* the processing core — it needs external RAM, storage, and peripherals. A **microcontroller (MCU)** integrates the CPU **plus** memory (flash + RAM) **plus** peripherals (GPIO, timers, ADC, communication) **on a single chip** — a whole computer for a few rupees, ideal for embedded/IoT.

## Anatomy of a microcontroller

- **CPU core** — executes instructions.
- **Flash memory** — stores the firmware (the program).
- **SRAM** — runtime memory for variables and the stack.
- **GPIO** — general-purpose pins to drive LEDs/relays and read buttons/sensors.
- **Timers** — precise time-based tasks, PWM, scheduling.
- **ADC** — reads analog sensor voltages → digital numbers.
- **Communication peripherals** — **UART/USART, I²C, SPI** to talk to other chips and modules.

## Why learn embedded systems?

- They **power IoT**, robotics, automation, healthcare, automotive.
- You learn how **hardware and software work together**.
- You build **real-time** applications.
- Platforms like **STM32** are widely used and open-source friendly.

## The bare-metal program model

A typical embedded program has two parts:

```c
int main(void) {
    // setup: configure clocks, GPIO, peripherals (run once)
    HAL_Init();
    SystemClock_Config();
    MX_GPIO_Init();

    while (1) {
        // super-loop: runs forever
        // read sensors → process → drive actuators
    }
}
```

> [!INTUITION]
> Almost every microcontroller program is **"setup once, then loop forever."** There's no "exit" — the device runs its sense→process→act loop until powered off. (Arduino's `setup()`/`loop()` is exactly this pattern with friendlier names.)

> [!EXAM]
> Define an embedded system and its **four constraints** (task-specific, real-time, resource-limited, often OS-less/RTOS), distinguish **microcontroller vs microprocessor** (MCU = CPU + memory + peripherals on one chip), list the **MCU components** (CPU, flash, SRAM, GPIO, timers, ADC, UART/I²C/SPI), and the **setup-then-super-loop** program structure.

---

**Next:** the specific board this course uses — the STM32 microcontroller.
