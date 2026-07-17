---
subject: iot
unit: 4
order: 13
slug: threat-modeling
title: Threat Modeling & Risk (DREAD)
summary: The systematic process of finding threats, the threat-type categories, and rating risk with Microsoft's DREAD model — via the smart charging-station example.
minutes: 11
tags: [threat-modeling, DREAD, STRIDE, risk, charging-station]
---

# Threat Modeling & Risk

> [!NOTE]
> **Threat modeling** is the process of identifying the important threats to a system and determining their **impact**, by rating each threat on its **impact** and its **probability of occurrence**. It reveals which threats need the most attention and which components need the most protection.

Attack probability rises where the **data is more valuable**, so it helps to identify likely **attackers and their motivations** up front.

## The threat-modeling process

| Step | What you do |
|---|---|
| **1. Identify assets** | List physical & data assets + their security needs (confidentiality, integrity, authentication, non-repudiation, availability); find high-value assets and who owns/accesses them |
| **2. Identify message flow** | Map how data/messages flow among assets and to external parties; find the highest-value data and entry points |
| **3. Identify threat types** | Categorise threats (see below) |
| **4. Rate threats & calculate risk** | Score each threat by probability × impact |

## Threat-type categories

A standard categorisation (STRIDE-style) of *what kind* of threat each is:

| Threat type | Description |
|---|---|
| **Identity spoofing** | Using a fake identity for unauthorised access (via social engineering, **phishing**, DB compromise, **man-in-the-middle**) |
| **Data tampering** | Modifying data — catastrophic if it controls a car/plane/ship |
| **Repudiation** | Denying a transaction occurred |
| **Information disclosure** | Breaching confidentiality |
| **Denial of Service** | Compromising availability |
| **Escalation of privilege** | Exploiting a bug/flaw to gain higher access (e.g., installing a **rootkit**) |
| **Bypassing physical security** | Breaking into a server room, tapping a line, accessing field devices |

> [!INTUITION]
> These categories map back to the **security goals** from the intro: spoofing breaks *authentication*, tampering breaks *integrity*, info disclosure breaks *confidentiality*, repudiation breaks *non-repudiation*, DoS breaks *availability*. Threat-typing is just asking "**which security goal does this attack violate?**" — plus the physical and privilege-escalation angles.

## Worked example — smart EV charging station

A smart EV charging-station system: ground sensors (via **BLE**) report vacancy to an **IoT gateway**, which connects over **Wi-Fi** to a router → cloud; an **IP camera** captures licence plates; payments and usage flow over **cellular** to a cloud app (which may notify police of stolen-car plates).

- **Assets** — *physical:* ground sensors, IP camera, charging stations, gateway, router. *Data:* sensor data, video, licence-plate data, payment data, status/pricing data.
- **Highest-value data** — **payment data, licence-plate data, and raw video footage**.
- **Threats** — spoofing a customer identity, tampering with pricing, disclosing video, DoS on the stations, **privilege escalation via a rootkit** on the backend, etc.

## Rating risk — the DREAD model

> [!NOTE]
> **DREAD** is a Microsoft risk-assessment model. Score a threat (e.g., 1–10) on five factors and **average** them to get a risk number:

| Letter | Factor | Asks |
|---|---|---|
| **D** | **Damage** | How catastrophic is the attack? |
| **R** | **Reproducibility** | How easily can it be repeated? |
| **E** | **Exploitability** | How much skill/time/complexity to launch? |
| **A** | **Affected users** | How many people/systems are impacted? |
| **D** | **Discoverability** | How easy is the threat to discover? |

*Worked rating:* for "attacker uses a legitimate customer's stolen info," one analysis scored Damage 2, Reproducibility 3, Exploitability 8, Affected 1, Discoverability 1 → **average ≈ 3 → a low-risk threat.** Repeat for every threat to prioritise.

> [!INTUITION]
> DREAD turns fuzzy worry into a **comparable number**. By scoring every threat on the same five axes and averaging, you can **rank** them and spend your limited security budget on the high scorers first — exactly what threat modeling is for. (An alternative framing weighs damage, skill needed, repeatability, and detection-difficulty — same idea.)

> [!EXAM]
> Know the **four threat-modeling steps** (assets → message flow → threat types → rate/risk), the **threat-type list** (spoofing, tampering, repudiation, info disclosure, DoS, escalation of privilege, physical bypass) and how they map to security goals, and **DREAD** (Damage, Reproducibility, Exploitability, Affected users, Discoverability — averaged for a risk score). The charging-station example is a likely long-answer.

---

**Next:** the rules and privacy safeguards around all this — regulations & privacy.
