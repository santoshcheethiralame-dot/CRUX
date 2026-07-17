---
subject: iot
unit: 4
order: 12
slug: iot-vulnerabilities
title: IoT Vulnerabilities
summary: The common weaknesses attackers exploit — weak authentication, insecure networks, insecure mobile apps, chip-level glitch injection, configuration mistakes, and privacy gaps.
minutes: 10
tags: [vulnerabilities, authentication, black-hole, glitch-injection, configuration]
---

# IoT Vulnerabilities

IoT systems are riddled with weak points across hardware, software, network, and configuration. The major categories:

## 1. Insufficient authentication / weak encryption

Data must be encrypted **at every hop** — device↔device, device↔gateway, gateway↔cloud, and device↔cloud. IoT **protocols must support strong encryption**, but some commonly-used protocols **don't provide strong encryption**, leaving data exposed.

## 2. Insecure network connectivity

Attackers launch **routing attacks** to spoof, redirect, or drop packets at the network layer.

> [!NOTE]
> **Black hole attack:** a fake IoT device advertises itself as offering the **shortest path** to other nodes. Once traffic is routed through it, the fake device can **redirect or silently drop** the packets.

Many IoT deployments don't apply network security properly. Defences: secure **Layer 3/4** protocols (notably **IPSec** at Layer 3) and **firewall rules** across cloud, databases, and servers.

## 3. Insecure mobile connection

IoT devices are often configured via a **companion smartphone app**, which requests the **Wi-Fi password** and network info during setup. If the app **stores this insecurely**, attackers who reach that database can **authenticate as legitimate users** and walk into the IoT system.

## 4. Insecure chip manufacturing (glitch injection)

Every IoT chip is designed to operate within a range of **voltage, current, or temperature**. An attacker can push these parameters **outside** the safe range to force the device into an **insecure state**.

> [!NOTE]
> **Glitch injection:** deliberately adding noise/disturbance — zapping the power supply, applying electrostatics — to make a device **boot or operate in an insecure state**. Chip makers must build in **countermeasures** at the chip level.

> [!INTUITION]
> Glitch injection is a reminder that IoT security isn't only about software — it's **physical**. Because devices sit out in the field (Unit 1's "unattended endpoints"), an attacker with physical access can poke the *hardware* itself. This is why **secure boot** and chip-level protections matter, not just encryption.

## 5. Configuration issues

Even well-designed components become vulnerable through **poor configuration**:

- Neglecting to set a proper password.
- Leaving **default settings/credentials** unchanged.
- Using a **weak encryption** scheme.
- **Disabling security event logging** (so attacks go unnoticed).

## 6. Privacy issues

A device may breach privacy if it **collects, analyses, or stores data without consent**, or if data is used to **identify** a person or used **maliciously** against them.

> [!TRAP]
> A subtle one: data that is **harmless in isolation** can become a **serious privacy risk when integrated** with information from other systems. Innocuous location pings + purchase records + a calendar can together re-identify and profile a person. (This drives the **Privacy Impact Assessment** in a later topic.)

> [!EXAM]
> Be able to **name and briefly explain the vulnerability categories**: weak authentication/encryption, insecure network (**black hole attack**), insecure mobile app (stored Wi-Fi creds), insecure chip mfg (**glitch injection**), configuration issues (**defaults, weak passwords, no logging**), and privacy issues (consent, **data integration risk**). The black-hole and glitch-injection terms are high-value.

---

**Next:** systematically finding and rating these threats — threat modeling.
