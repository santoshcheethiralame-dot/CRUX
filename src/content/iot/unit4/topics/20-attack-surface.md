---
subject: iot
unit: 4
order: 16.1
slug: attack-surface
title: The IoT Attack Surface & OWASP IoT Top 10
summary: Mapping vulnerabilities across every layer (physical, network, cloud) and the OWASP IoT Top 10 list of the most common, impactful IoT weaknesses.
minutes: 11
tags: [attack-surface, OWASP, layers, physical, cloud]
---

# The IoT Attack Surface & OWASP IoT Top 10

> [!NOTE]
> The **attack surface** is the **sum of all points** where an attacker could try to enter or extract data from a system. IoT's attack surface is unusually large because it spans **physical devices, networks, and cloud** — many layers, each a target.

## The attack surface by layer

A layered view (mirroring the architecture from Unit 1) shows where attacks land:

| Layer | Example attacks |
|---|---|
| **Physical / device** | Tampering, **glitch injection**, extracting firmware/secrets from the chip, default credentials, no secure boot |
| **Network / communication** | Eavesdropping, **MITM**, replay, **black-hole** routing, denial-of-sleep, weak/none encryption |
| **Cloud / application** | Insecure APIs, weak authentication, broken access control, data breaches, insecure web dashboards |

> [!INTUITION]
> IoT's defining security problem is that the attack surface is **physical + network + cloud at once**. A web app you secure mostly at the server; an IoT system can be attacked by **holding the device** (physical), **sniffing its radio** (network), *or* **breaching its cloud API** — and it's only as strong as the weakest of those. Defenders must secure **every layer**, not just one.

## The OWASP IoT Top 10

> [!NOTE]
> The **OWASP IoT Top 10** is a community list (by the Open Worldwide Application Security Project) of the **most common and impactful IoT vulnerabilities** — a practical, beginner-friendly checklist of what to fix first.

The headline items:

| # | Vulnerability | Meaning |
|---|---|---|
| **1** | **Weak/guessable/hardcoded passwords** | Default or unchangeable credentials (the #1 IoT flaw — enabled **Mirai**) |
| **2** | **Insecure network services** | Unneeded/open ports and services exposed on the device |
| **3** | **Insecure ecosystem interfaces** | Weak web/API/mobile/cloud interfaces around the device |
| **4** | **Lack of secure update mechanism** | No (or unsigned) firmware updates → can't patch flaws (the LockState/Jeep lesson) |
| **5** | **Use of insecure/outdated components** | Old libraries/OS with known vulnerabilities |
| **6** | **Insufficient privacy protection** | Mishandling users' personal data |
| **7** | **Insecure data transfer/storage** | No encryption in transit or at rest (the TRENDnet lesson) |
| **8** | **Lack of device management** | Can't monitor/decommission devices at scale |
| **9** | **Insecure default settings** | Ships insecure; no option to harden |
| **10** | **Lack of physical hardening** | Easy physical access to ports/chips/data |

> [!INTUITION]
> Notice the OWASP list is dominated by the **basics**: bad passwords (#1), no updates (#4), no encryption (#7), insecure defaults (#9). IoT breaches rarely need exotic exploits — they exploit **fundamentals left undone**. That's why the list is a *checklist*: fix the obvious things and you stop the vast majority of real-world attacks (Mirai was just #1 at scale).

> [!TRAP]
> The OWASP IoT Top 10 is a **prioritized awareness list, not a ranking of severity for your specific device**. It tells you the *most common* problem classes to check; your actual risk depends on your threat model (Unit 4's threat-modeling/DREAD).

> [!EXAM]
> Describe the **layered attack surface** (physical/device, network, cloud — each with example attacks) and explain why IoT's surface is uniquely broad. Know the **OWASP IoT Top 10** as a checklist of common weaknesses, especially **#1 weak/hardcoded passwords**, **#4 lack of secure update**, and **#7 insecure data transfer** — and link them to real incidents (Mirai, LockState, TRENDnet).

---

**Next:** a modern defensive model — Zero Trust Architecture.
