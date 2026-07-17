---
subject: iot
unit: 4
order: 10
slug: iot-security-intro
title: IoT Security Goals & Threats
summary: Threat actors and the core security objectives — confidentiality, integrity, authentication, non-repudiation, and availability — and the tools that protect each.
minutes: 11
tags: [security, CIA, confidentiality, integrity, non-repudiation]
---

# IoT Security Goals & Threats

The massive growth of IoT devices has invited attackers to exploit their (often weak) security. Understanding IoT security starts with **who attacks** and **what they're trying to break.**

## Threat actors

> [!NOTE]
> A **threat actor** is an application, process, system, or person that poses a threat. **Threat modeling** is the process of identifying threats and calculating the risk of each.

A threat actor may be:

- An **outsider** planning an attack to access confidential data, **or**
- An **insider** with deep knowledge of the organisation's systems.

What attackers want: to **read** data, **modify** it, **inject new** data, or **disrupt** the system's operation (partially or entirely).

## The security objectives

Five security goals define what must be protected. The first three are the classic **CIA-style triad** (here: confidentiality, integrity, authentication), plus **non-repudiation** and **availability**.

| Goal | Threat when violated | Primary protection |
|---|---|---|
| **Confidentiality** | Attacker can **read** the data's content | **Encryption** |
| **Integrity** | Attacker can **modify** the data | **Hash algorithms** |
| **Authentication** | Attacker poses as a **legitimate user** | Credentials → stronger mechanisms |
| **Non-repudiation** | A party can **deny** sending/validity of data | **Digital signatures** |
| **Availability** | Attacker can **disrupt** the system | Anti-DoS measures (next topic) |

### Confidentiality

Protects the **content** of data so an actor who gains access can't understand it. The more sensitive the data, the stronger the protection needed. Must hold whether data is **at rest** (in a database), **in use** (being processed), or **in motion** (transmitted). **Encryption** is the primary tool.

### Integrity

Ensures data **isn't modified** by an attacker (e.g., altering a financial transaction). You also need mechanisms to **detect** when integrity is violated. **Hash algorithms** are the primary tool.

### Authentication

Verifies that someone/something **is who it claims to be**, so only authorised users get access. Username/password is the simplest mechanism; stronger ones (certificates, MFA) exist for sensitive data.

### Non-repudiation

Makes it impossible to **deny** having sent a message or the validity of data — crucial in online transactions where a party must not deny their signature. **Digital signatures** (+ supporting measures) provide it.

> [!INTUITION]
> A clean way to remember the goals: each protects against a different verb. **Confidentiality** stops *reading*, **integrity** stops *changing*, **authentication** stops *impersonating*, **non-repudiation** stops *denying*, **availability** stops *disrupting*. Match each goal to the verb it blocks and the tool that enforces it (encrypt / hash / verify-identity / sign / anti-DoS).

> [!EXAM]
> List the **five security objectives** and, for each, the **threat it blocks** and its **primary tool**: confidentiality→encryption, integrity→hashing, authentication→credentials, non-repudiation→digital signatures, availability→anti-DoS. Note confidentiality must hold for data **at rest, in use, and in motion**.

---

**Next:** the goal attackers love to target on IoT — availability.
