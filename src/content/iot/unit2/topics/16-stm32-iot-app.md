---
subject: iot
unit: 2
order: 16
slug: stm32-iot-app
title: Designing IoT Applications with STM32
summary: From GPIO blink to a full sense→process→act→transmit app — CubeMX/HAL workflow, GPIO, delays, and UART communication.
minutes: 11
tags: [GPIO, HAL, CubeMX, UART, blink, design-flow]
---

# Designing IoT Applications with STM32

This ties Unit 2 together: a real IoT node reads sensors, decides, drives actuators, and reports — all on the STM32.

## GPIO — talking to the physical world

> [!NOTE]
> **GPIO (General-Purpose Input/Output)** pins are the MCU's connection to the physical world — used to control LEDs, read buttons, and interface sensors/actuators. Each pin can be configured as **Input, Output, Alternate Function** (for a peripheral like UART/SPI), or **Analog** (for the ADC).

## "Hello World" of embedded — blink an LED

The embedded equivalent of `print("hello")` is blinking an LED. The workflow:

1. In **STM32CubeMX**, configure the LED pin as a GPIO **Output**.
2. In `main.c`, toggle the pin inside the super-loop using the **HAL** API.
3. Add a delay so the blink is visible.

```c
while (1) {
    HAL_GPIO_TogglePin(GPIOC, GPIO_PIN_13);  // toggle the LED
    HAL_Delay(500);                          // wait 500 ms
}
```

> [!INTUITION]
> `HAL_GPIO_TogglePin` and `HAL_Delay` are **HAL (Hardware Abstraction Layer)** calls — readable function names that hide the raw register writes underneath. CubeMX generates all the messy setup code; you focus on the logic in the loop. That's why STM32 is beginner-friendly despite being a professional-grade MCU.

## UART — letting the node talk

> [!NOTE]
> **UART (Universal Asynchronous Receiver/Transmitter)** is a simple serial protocol used to **debug via a serial console** (over USB/COM) and to **communicate with modules** like GPS, Bluetooth, or a Wi-Fi/cellular modem.

UART is often the bridge that turns a standalone microcontroller into a **connected** IoT node — the MCU senses and processes locally, then sends results over UART to a communication module that reaches the cloud.

## The full IoT application loop on STM32

Putting Unit 2's pieces together, a typical node does:

| Step | STM32 mechanism |
|---|---|
| **1. Sense** | Read a sensor via **ADC** (analog) or **I²C/SPI** (digital smart sensor) |
| **2. Process** | Filter/threshold/calibrate in the Cortex-M core (maybe **TinyML**) |
| **3. Decide & Act** | Drive an actuator via **GPIO/PWM** (LED, relay, motor) |
| **4. Transmit** | Send results over **UART** → Wi-Fi/BLE/cellular module → cloud |
| **5. Repeat** | Loop forever (often **sleep** between cycles to save power) |

> [!INTUITION]
> This is the **whole unit in one loop**: a *sensor* (topics 1–5) feeds the *embedded MCU* (topics 14–15), which makes a decision and drives an *actuator* (topic 6), then reports over a comms peripheral — the physical realisation of Unit 1's "sense → analyse → act" loop. Unit 3 then expands that "transmit" step into full networking protocols.

## The design flow

1. **Define** the use case, sensors, and actuators needed.
2. **Configure** pins and peripherals in **CubeMX** (GPIO, ADC, UART, timers).
3. **Write** the application logic in `main.c` using HAL.
4. **Build** (compiler + linker → `.bin`), **flash** (ST-Link), and **debug** (GDB/OpenOCD).
5. **Test, measure power, and iterate.**

> [!EXAM]
> Be able to describe the **GPIO blink** workflow (CubeMX configure → `HAL_GPIO_TogglePin` + `HAL_Delay` in the loop), state what **UART** is used for (serial debug + talking to GPS/BT/modem modules), and **trace the full node loop** (sense via ADC/I²C → process → act via GPIO/PWM → transmit via UART → repeat). This is the capstone connecting sensors, embedded systems, and connectivity.

---

That completes Unit 2 — from a single sensing element through embedded firmware to a connected STM32 node. **Next:** Unit 3 opens the "transmit" step into IoT protocols — starting with wired connectivity (Ethernet, PoE, TSN, PLC).
