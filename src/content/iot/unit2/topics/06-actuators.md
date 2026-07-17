---
subject: iot
unit: 2
order: 6
slug: actuators
title: Actuators — The IoT's Action-Takers
summary: What actuators are, their types, how they close the IoT loop, and open- vs closed-loop control.
minutes: 10
tags: [actuator, types, control, open-loop, closed-loop]
---

# Actuators — The IoT's Action-Takers

If sensors are the eyes and ears, **actuators are the hands** of IoT.

> [!NOTE]
> An **actuator** is a device that moves or controls a mechanism — it **converts an electrical signal into a physical action** (motion, sound, light, heat). In IoT, actuators are the "doers" that let smart devices *act* on their environment based on data from sensors.

Common examples: **electric motor** (electrical → motion), **solenoid valve** (opens/closes to control fluid flow), **LED** (electrical → light), **speaker** (electrical → sound), **relay** (an electrically-operated switch).

## Closing the IoT loop

Actuators complete the **sense → decide → act** loop:

> Temperature sensor detects heat → controller decides to switch on the AC → **actuator (relay)** activates the AC.

Actuators are what make decisions **actionable in the physical world**. Combined with sensors, they form **closed-loop control systems** (e.g., a smart thermostat that senses, decides, acts, and re-senses).

## Sensors vs Actuators

| Feature | Sensor | Actuator |
|---|---|---|
| **Role** | **Input** device — senses data | **Output** device — acts on data |
| **Function** | Detects changes in environment | Causes changes in environment |
| **Example** | Temperature sensor | Fan motor switched on by that sensor |

## Types of actuators

| Type | How it works | Examples |
|---|---|---|
| **Electric** | Motion from electrical energy | Servo motor, stepper motor |
| **Hydraulic** | Pressurised fluid creates movement | Hydraulic cylinders |
| **Pneumatic** | Compressed air produces motion | Pneumatic arms, air valves |
| **Thermal** | Expand/contract with heat | Thermostatic valves |
| **Magnetic** | Magnetic fields drive motion | Electromagnets, relays |

## Actuator characteristics (selection)

When choosing an actuator, consider: **response time** (how fast it reacts), **force/torque output** (strength), **power consumption** (critical for battery systems), **lifespan/durability** (mechanical parts wear), and **control interface** (analog, digital, PWM, or via Zigbee/Bluetooth).

## Control methods — open vs closed loop

> [!NOTE]
> **Open-loop control** has **no feedback** — the actuator runs a fixed command regardless of the result (cheaper, less reliable). **Closed-loop control** uses **sensor feedback** to adjust the actuator continuously (more reliable, self-correcting).

| | Open-loop | Closed-loop |
|---|---|---|
| **Feedback** | None | Uses sensor feedback |
| **Cost / reliability** | Cheaper, less reliable | Costlier, self-correcting |
| **Example** | Sprinkler on for a fixed time | Window blinds adjusting to a light sensor |

> [!INTUITION]
> Open-loop is "**fire and forget**" — water the lawn for 10 minutes whether it rained or not. Closed-loop "**watches the result**" — keep adjusting until the measured outcome matches the target. Closed-loop is the basis of every smart thermostat, cruise control, and autopilot.

Control/communication interfaces for actuators include **GPIO, PWM, I²C/SPI, Modbus**.

> [!EXAM]
> Know the **definition** (electrical signal → physical action), the **sensor-vs-actuator** table (input/sense vs output/act), the **five actuator types** (electric, hydraulic, pneumatic, thermal, magnetic), and **open- vs closed-loop control** (the presence of feedback is the dividing line).

---

**Next:** sensors that think for themselves — smart sensors.
