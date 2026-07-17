---
subject: iot
unit: 1
order: 1
slug: what-is-iot
title: What is IoT? Smart Objects & Core Concepts
summary: The definition of IoT, what makes a "smart object", and the four pillars — connectivity, sensing, communication, analytics.
minutes: 12
tags: [definition, smart-objects, connectivity, sensing, analytics]
---

# What is the Internet of Things?

> [!NOTE]
> **The Internet of Things (IoT)** is a network of physical objects — devices, vehicles, appliances, machinery — that are **embedded with sensors, software, and network connectivity**, allowing them to **collect, exchange, and act on data** with little or no human intervention.

The phrase to remember is *"a world where things talk."* Classical computing connects **people** (laptops, phones browsing the web). IoT connects **things**: a thermostat, a soil probe, a shipping container, an MRI machine — each able to sense its environment and report or react autonomously.

## Smart objects — the atoms of IoT

An IoT device is often called a **smart object**. A smart object is a physical thing augmented with four capabilities:

| Capability | Provided by | Example |
|---|---|---|
| **Sensing** | Sensors | temperature, motion, heart-rate, GPS |
| **Actuation** | Actuators | relay, motor, valve, display |
| **Processing** | Microcontroller / embedded CPU | filter, threshold, basic ML |
| **Communication** | Radio / network interface | Wi-Fi, BLE, Zigbee, LoRa, cellular |

Smart objects span an enormous range of complexity:

- **Simple** — a smart thermostat, a smart bulb, an RFID-tagged garment.
- **Wearable** — a smartwatch, a fitness band, a continuous glucose monitor.
- **Industrial** — a vibration sensor on a turbine, an autonomous tractor, a connected assembly line.

> [!INTUITION]
> A "dumb" thermometer shows you a number. A **smart** thermometer *senses* the temperature, *decides* a room is too cold, *communicates* with a boiler, and *acts* by turning on the heat — then logs it all to the cloud. The intelligence is in the loop: **sense → communicate → analyse → act**, repeated continuously.

## The four core concepts of IoT

Almost every IoT system rests on four pillars (memorise these — they recur in every architecture later):

1. **Connectivity** — the ability of objects to reach the internet. Often via low-power, wide-area networks (**LPWANs**) such as Sigfox, **LoRaWAN**, and **NB-IoT**, or short-range links (Wi-Fi, BLE, Zigbee) through a **gateway**.
2. **Sensing** — devices carry sensors that capture data about the physical world (conditions, movement, events).
3. **Communication** — devices exchange data with each other and the cloud using standard protocols such as **MQTT, CoAP, and HTTP**.
4. **Analytics** — the collected data is processed to extract insight: improve efficiency, optimise processes, and make better decisions.

> [!INTUITION]
> Pillars map to *value*: **sensing** turns the physical world into data, **connectivity + communication** move that data, and **analytics** turns data back into decisions and actions. Remove any pillar and the loop breaks — sensors with no analytics are just noise; analytics with no sensors has nothing to analyse.

## Why now? What changed

IoT is not a new *idea*, but it only became practical when several curves crossed:

- **Cheap sensors & MEMS** — micro-machined sensors fell to cents per unit.
- **Ubiquitous wireless** — Wi-Fi, BLE, and cellular blanket the world.
- **Cheap microcontrollers** — capable 32-bit MCUs for a dollar.
- **Cloud services** — elastic storage and compute to absorb the data deluge.
- **IPv6** — enough addresses to give every object on Earth a unique identity.

> [!EXAM]
> Be able to (1) **define IoT** in one sentence, (2) list the **four concepts** — connectivity, sensing, communication, analytics, and (3) explain what makes an object "smart" (sense + process + communicate + actuate). A classic question: *"How does an IoT/smart device differ from a traditional electronic device?"* → it is **networked, sensor-equipped, and capable of autonomous data-driven action**.

---

**Next:** how IoT got here — from an internet-connected Coke machine to a $300 billion market.
