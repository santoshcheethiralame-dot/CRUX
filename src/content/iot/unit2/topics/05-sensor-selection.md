---
subject: iot
unit: 2
order: 5
slug: sensor-selection
title: Sensor Selection
summary: The criteria for choosing a sensor — measurement needs, performance, environment, power, cost, integration — with a worked example.
minutes: 9
tags: [selection, criteria, requirements, worked-example, parking]
---

# Sensor Selection

Choosing the right sensor is an engineering decision that balances **performance, compatibility, cost, and durability** against the application's real needs. Picking wrong means false readings, dead batteries, or a blown budget.

## The selection criteria

### 1. Measurement requirements
- **What** is being measured? (temperature, pressure, motion…)
- Expected **range** and **resolution**?
- Is the measurement **absolute or relative**?
- Are high **precision and accuracy** required?

### 2. Performance metrics
- Required **accuracy, sensitivity, response time, SNR** — driven by how critical and how fast the application is.

### 3. Environment
- Operating **temperature, humidity, dust, vibration**; indoor vs outdoor; does it need to be **waterproof / UV-resistant / corrosion-proof**?

### 4. Power
- **Battery, mains, solar, or energy-harvested?** Battery/solar nodes demand **ultra-low-power** sensors.

### 5. Cost
- Unit cost matters when a deployment **scales to hundreds or thousands** of nodes; total cost includes maintenance.

### 6. Integration & interface
- Output type (**analog, digital, PWM**) and bus (**I²C, SPI, UART**); must be **compatible** with the chosen microcontroller/board (Arduino, Raspberry Pi, STM32 GPIO).

> [!INTUITION]
> Selection is a **constraint-satisfaction** problem, not "pick the best sensor." The most accurate sensor is useless if it drains a solar node in a day, costs too much to scale to 100 units, or outputs a bus your MCU can't read. You're finding the sensor that satisfies *all* constraints at once — often the "good enough, cheap, low-power" one wins.

## Worked example — smart parking system

**Objective:** detect the presence/absence of a vehicle in each parking spot.

| Criterion | Consideration |
|---|---|
| **Measurement requirement** | Presence/absence — a **binary** state (not a precise distance) |
| **Performance** | **Quick response + high accuracy** to avoid false detections |
| **Environment** | Outdoor → must be **waterproof and UV-resistant** |
| **Power** | Solar-powered node → **ultra-low power** consumption |
| **Cost** | Scales to **100+ slots** → **low-cost** sensor (IR or ultrasonic) |
| **Integration** | Output must suit **Arduino/Raspberry Pi GPIO** |

The analysis points to a **low-cost IR or ultrasonic proximity sensor**: it only needs a binary presence signal, sips power, survives outdoors, and interfaces over simple GPIO.

> [!EXAM]
> A very common question gives a **scenario** (smart parking, cold-chain logistics, wearable heart monitor) and asks you to **pick a sensor and justify it against ≥6 selection criteria**. Structure the answer: *measurement requirement → performance → environment → power → cost → integration*, then name the sensor that fits all of them.

---

**Next:** the output side of the loop — actuators.
