---
subject: iot
unit: 2
order: 19
slug: embedded-c-python
title: Embedded C & MicroPython
summary: The two dominant embedded languages — bare-metal C for control and efficiency vs MicroPython for rapid prototyping — and how each drives a GPIO.
minutes: 9
tags: [embedded-c, MicroPython, GPIO, tradeoffs, prototyping]
---

# Embedded C & MicroPython

You program an IoT microcontroller mainly in one of two languages: **C** (the long-time standard) or **MicroPython** (a compact Python for MCUs). Each suits a different stage of development.

## Embedded C

> [!NOTE]
> **Embedded C** is C adapted for microcontrollers — compiled to native machine code, giving **direct, efficient hardware control** with a tiny memory footprint. It's the default for production firmware (STM32 HAL, ESP-IDF, Arduino's C/C++).

Strengths: **fast**, **memory-efficient**, **deterministic**, full access to registers and peripherals. Cost: more verbose, manual memory management, slower to write/debug.

A GPIO blink in (Arduino-style) C:

```c
void setup() {
  pinMode(2, OUTPUT);          // configure pin 2 as output
}
void loop() {
  digitalWrite(2, HIGH);       // LED on
  delay(500);
  digitalWrite(2, LOW);        // LED off
  delay(500);
}
```

## MicroPython

> [!NOTE]
> **MicroPython** is a lean implementation of Python 3 that runs **directly on microcontrollers** (ESP32, Pi Pico, etc.). It trades some speed/memory for **fast, readable, interactive** development.

Strengths: **quick to write**, readable, an interactive **REPL** (type code live on the device), great for prototyping and teaching. Cost: **slower** and **heavier** (an interpreter runs on-device), less deterministic — less suited to hard real-time.

The same blink in MicroPython:

```python
from machine import Pin
from time import sleep

led = Pin(2, Pin.OUT)
while True:
    led.value(1)   # LED on
    sleep(0.5)
    led.value(0)   # LED off
    sleep(0.5)
```

## C vs MicroPython — when to use which

| | Embedded C | MicroPython |
|---|---|---|
| **Execution** | Compiled → native machine code | Interpreted on-device |
| **Speed / size** | Fast, tiny footprint | Slower, more RAM/flash |
| **Determinism** | High (real-time) | Lower |
| **Dev speed** | Slower to write | **Fast, interactive (REPL)** |
| **Best for** | Production, real-time, constrained MCUs | Prototyping, learning, glue logic |

> [!INTUITION]
> A common workflow uses **both**: **prototype in MicroPython** to validate the idea fast (interactive, readable), then **rewrite the performance-critical or production firmware in C** for speed, determinism, and the smallest footprint. Python gets you to "it works" quickly; C gets you to "it ships." Note both expose the same idea — configure a pin, then drive it high/low in a loop.

> [!EXAM]
> Contrast **Embedded C** (compiled, fast, deterministic, tiny — production/real-time) with **MicroPython** (interpreted, readable, interactive REPL — prototyping/teaching). Be able to read a simple **GPIO blink** in either and explain the trade-off (control/efficiency vs development speed).

---

**Next:** how the MCU talks to sensors and the world — serial buses and interrupts.
