---
subject: iot
unit: 3
order: 17
slug: lightweight-crypto
title: Lightweight Cryptography & ASCON
summary: Why constrained IoT devices need lightweight crypto, how ASCON (the NIST standard) differs from heavy AES, and what authenticated encryption provides.
minutes: 10
tags: [lightweight-crypto, ASCON, AES, AEAD, NIST]
---

# Lightweight Cryptography & ASCON

Security needs encryption — but the standard algorithms were designed for servers and laptops, not coin-cell sensors. **Lightweight cryptography** closes that gap.

## Why standard crypto strains IoT devices

> [!NOTE]
> **Lightweight cryptography** is a class of cryptographic algorithms designed for **resource-constrained devices** — little RAM/ROM, low clock speed, tiny energy budget — while still providing strong security.

Algorithms like **AES** are secure and ubiquitous, but on a tiny MCU they can be **costly**: large memory footprint, more compute, and — critically — **more energy per operation**, which drains batteries. For billions of constrained nodes, that overhead matters.

> [!INTUITION]
> Recall Unit 1's power challenge and Unit 4's denial-of-sleep attack: on an IoT device, **every CPU cycle is battery**. Encryption that's "free" on a laptop can measurably shorten a sensor's life. Lightweight crypto asks: *how do we keep strong security while spending the fewest gates, bytes, and joules?*

## ASCON — the NIST lightweight standard

> [!NOTE]
> **ASCON** is the algorithm **selected by NIST (2023) as the standard for lightweight cryptography** for constrained devices. It provides **Authenticated Encryption with Associated Data (AEAD)** and **hashing** in one compact, efficient design.

What ASCON offers:
- **Authenticated encryption (AEAD)** — confidentiality **and** integrity/authenticity in a single pass (you know the data is secret *and* untampered).
- **Small footprint** — designed to run well on tiny hardware (and resist side-channel attacks).
- **Efficiency** — far lower memory/energy cost than a full AES-GCM stack on constrained MCUs.

## ASCON vs AES

| | AES (e.g., AES-256-GCM) | ASCON |
|---|---|---|
| **Designed for** | General-purpose (servers, PCs, phones) | **Constrained IoT devices** |
| **Footprint** | Larger (tables/hardware) | **Small** (gates, RAM, code) |
| **Energy/op** | Higher on tiny MCUs | **Lower** |
| **Provides** | Encryption (+ GCM for AEAD) | **AEAD + hashing** in one primitive |
| **Status** | FIPS standard, widely deployed | NIST **lightweight** standard (2023) |

> [!INTUITION]
> AES isn't "bad" — on a phone or server it's excellent (often hardware-accelerated). The point is **fit**: a powerful safe is great for a bank vault but absurd strapped to a sparrow. **ASCON is the right-sized lock** for a sensor — strong enough to protect the data, light enough not to drain the battery or overflow the chip.

> [!TRAP]
> "Lightweight" does **not** mean "weak." ASCON was chosen through a multi-year public NIST competition for its **security and efficiency**. It's lighter in *resource cost*, not in *cryptographic strength*. Don't confuse lightweight crypto with rolling your own weak cipher (a classic IoT mistake).

> [!EXAM]
> Know **why** IoT needs lightweight crypto (constrained CPU/memory/**energy** — every cycle is battery), that **ASCON is the NIST (2023) lightweight standard** providing **AEAD (authenticated encryption) + hashing**, and how it **differs from AES** (smaller footprint, lower energy on tiny MCUs — same strength, better fit). "Lightweight = resource-light, not security-light."

---

**Next:** hiding devices from attackers — network obfuscation.
