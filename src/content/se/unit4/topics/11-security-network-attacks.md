---
subject: se
unit: 4
order: 11
slug: security-network-attacks
title: Network Security & Attacks
summary: The cost of poor privacy (GDPR fines), network attacks (person-in-the-middle, sniffing, spoofing), and the Big-3 of network security — authentication, authorization and confidentiality.
minutes: 11
tags: [security, GDPR, person-in-the-middle, spoofing, big-3, confidentiality]
---

# Network Security & Attacks

## The cost of getting it wrong — GDPR fines

| Company | Fine | Violation |
|---|---|---|
| **Meta** | **€1.2 B** (May 2023) | Illegally transferring EU user data to the US without adequate protection (record-breaking) |
| **Amazon** | **€746 M** (2021) | Tracking customer data without consent for targeted advertising |
| **TikTok** | **€530 M** (2025) | Transferring EU data to China; engineers there had direct access |

> [!EXAM]
> **Cumulative GDPR fines since 2018 ≈ €5.88 billion** (Ireland alone ~€3.5 B). The takeaway: these are *engineering* choices with massive consequences — **build privacy-respecting software from day one**.

## Attacking the network

> [!NOTE]
> **Assume the network is not secure.** You must guard against a compromised network.

| Attack | What it does |
|---|---|
| **Person-in-the-Middle (PITM)** | Intercepts traffic; can **read** and **change** messages before forwarding |
| **Sniffing / Eavesdropping** | Passively **listens** to traffic on the subnet (or the backbone) |
| **Spoofing** | **Pretends to be someone else** — IP spoofing, email spoofing, **DNS spoofing** (fool a DNS server into returning wrong IPs) |

## The Big-3 of network security

| Concept | Meaning |
|---|---|
| **Authentication** | Knowing **with whom** you communicate (user ↔ server identity) |
| **Authorization** | The user has the **privilege** to perform an operation |
| **Confidentiality** | Communicating without others reading/changing it; includes **replay** protection |

> [!INTUITION]
> Confidentiality protects the *content* but typically **not the fact** that communication occurred — outsiders can still see *that* you talked, just not *what* you said.

> [!EXAM]
> **Which of the Big-3 protects you from…?**
> - **Sniffing** → **Confidentiality** (they can listen, but can't read it)
> - **Spoofing** → **Authentication** (you verify who you're really talking to)
> - **Person-in-the-Middle** → **Authentication + Confidentiality** (verify identity *and* encrypt)

---

**Next:** the broader concern behind those fines — **privacy & privacy engineering**.
