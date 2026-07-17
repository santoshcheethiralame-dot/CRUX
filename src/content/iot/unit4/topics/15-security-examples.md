---
subject: iot
unit: 4
order: 15
slug: security-examples
title: Real-World IoT Security & Privacy Incidents
summary: Landmark incidents — Mirai, LockState, the Jeep hack, TRENDnet, St. Jude pacemakers, the Ukrainian grid, and DJI — each mapped to the security goal it broke.
minutes: 10
tags: [Mirai, Jeep, SCADA, incidents, case-studies]
---

# Real-World IoT Security & Privacy Incidents

Theory becomes vivid through real incidents. Each below is tagged with the **security goal** it violated.

## Mirai botnet — Availability (2016)

A DoS/DDoS attack against **Dyn**, a DNS provider, disrupted **13,000+** internet domains. Attackers infected many IoT devices — mostly **cameras, baby monitors, and home gateways with hard-coded/default credentials** — with **Mirai** malware, creating an army of "zombies" that connected to a command-and-control server and flooded the target.

> [!INTUITION]
> Mirai is *the* cautionary tale: attackers didn't use their own computers — they hijacked **low-security IoT devices** as a DDoS army. As IoT grows, every device with a default password is a potential soldier. It validates everything in the availability and vulnerabilities topics at once (default creds → DDoS).

## LockState — Integrity (2017)

A smart-lock maker pushed a **buggy firmware update** that bricked locks — they stopped working **and** couldn't accept further updates. Many were used in Airbnb rentals where guests had only a **code, no physical key**, so renters were locked out and locks had to be shipped back. *Not* a malicious attack, but it shows why **integrity controls on the firmware-update process** are essential.

## Jeep hack — Software update / safety (2015)

Researchers exploited the firmware-update process to reach a Jeep's **CAN bus**, gaining full control — they could **change speed and steer the car off the road**. No malicious attacker, but proof that ignoring IoT security can be **life-threatening**.

## TRENDnet webcams — Confidentiality (2010–2011)

An IP-camera maker sent **login info without encryption** and stored it in **clear text**; a software bug let anyone who knew a camera's IP watch its video/audio. A textbook **confidentiality** failure — no encryption in motion or at rest.

## St. Jude cardiac devices — Availability & Integrity (2017)

Implantable **pacemakers/defibrillators** were found vulnerable: attackers could **deplete the battery** or **administer wrong pacing/shocks** via the device's transceivers — attacking both availability and integrity, with potentially fatal consequences.

## Ukrainian smart grid — Availability & Integrity (2016)

An attack on a **SCADA**-controlled power grid cut power to **200,000+** customers. Attackers reached the SCADA system (which talks to field **RTUs**) and **toggled breaker switches** open/closed, using **"Crash Override"** malware purpose-built to attack electrical grids — showing how SCADA attacks have **widespread physical effects**.

## DJI drones — Privacy (2016)

The largest civilian drone maker reportedly **shared global customer data** with a foreign government, prompting a US ban. DJI later added a **"local mode"** that stops drone data transmitting over the internet — fixing privacy at the cost of some functionality.

## Summary — incident → goal violated

| Incident | Goal violated |
|---|---|
| **Mirai** (DDoS via IoT) | Availability |
| **LockState** (bad firmware) | Integrity |
| **Jeep** (CAN bus takeover) | Integrity / safety |
| **TRENDnet** (clear-text creds) | Confidentiality |
| **St. Jude** (cardiac devices) | Availability + Integrity |
| **Ukrainian grid** (SCADA) | Availability + Integrity |
| **DJI** (data sharing) | Privacy |

> [!EXAM]
> Be able to **match each incident to the security goal it broke** and state its lesson: **Mirai** = default creds → DDoS (availability); **TRENDnet** = no encryption (confidentiality); **Jeep/St. Jude** = integrity with safety stakes; **Ukrainian grid** = SCADA availability; **DJI** = privacy. Mirai and the Jeep hack are the most-cited.

---

**Next:** a structural fix for trust in IoT — blockchain.
