---
subject: iot
unit: 4
order: 11
slug: availability-attacks
title: Attacks on Availability — DoS, DDoS & Denial-of-Sleep
summary: How attackers disrupt IoT systems — Denial of Service, Distributed DoS using IoT armies, and the IoT-specific Denial-of-Sleep battery attack.
minutes: 8
tags: [availability, DoS, DDoS, denial-of-sleep, botnet]
---

# Attacks on Availability — DoS, DDoS & Denial-of-Sleep

> [!NOTE]
> **Availability** ensures an IoT system stays available to serve its users. **Attacks on availability** try to shut the system down, or degrade it to run slower / at lower capacity than designed.

## Denial of Service (DoS)

To attack availability, an attacker tries to **saturate** the network or system so it can't service legitimate requests — a **Denial of Service (DoS)** attack. The system is overwhelmed and becomes unresponsive.

## Distributed Denial of Service (DDoS)

> [!NOTE]
> A **DDoS (Distributed Denial of Service)** attack uses a **large number of distributed devices** to flood a target simultaneously.

IoT makes DDoS especially dangerous: there are **billions of often-insecure IoT devices** to conscript. An attacker first **compromises enough IoT devices** (an "army of nodes"/zombies), then instructs them all to **saturate a target** at once.

> [!INTUITION]
> A single DoS is **one person blocking a doorway**; a DDoS is a **flash mob** — thousands of hijacked devices jamming the entrance at the same time, from everywhere, so you can't just block one source. IoT is the perfect recruiting ground because so many cameras and gateways ship with default passwords (this is exactly the **Mirai** botnet story — covered in the incidents topic).

## Denial-of-Sleep (DoSA) — an IoT-specific attack

> [!NOTE]
> A **Denial-of-Sleep Attack (DoSA)** targets **battery-powered** IoT devices by **preventing them from entering sleep mode** — an attack on the device's *power supply* meant to drain its battery and shorten its lifetime.

Normally a battery device sends a little data, then **sleeps** to save power. In a DoSA:

- The attacker keeps the device **awake**, forcing it to consume far more energy.
- A simple method: a **fake IoT device** that constantly transmits to legitimate devices in range, making them **waste energy** communicating with it.
- The result: their batteries drain fast and the devices eventually become **unavailable**.

> [!INTUITION]
> Denial-of-Sleep is uniquely cruel to IoT because it weaponises IoT's own survival strategy. The whole low-power design (Unit 2/3) depends on devices **sleeping** most of the time. Deny them sleep and you don't need to crash them — you just **run their batteries flat**, killing a years-long deployment in days. It's a DoS aimed at the *power budget*, not the *network*.

> [!EXAM]
> Distinguish **DoS** (saturate one target), **DDoS** (many distributed/compromised devices flood at once — IoT armies/zombies), and **Denial-of-Sleep (DoSA)** (keep battery devices awake to drain power → unavailability). DoSA being **IoT-specific** (attacks the power supply) is a high-value exam point.

---

**Next:** the weaknesses that let these attacks in — IoT vulnerabilities.
