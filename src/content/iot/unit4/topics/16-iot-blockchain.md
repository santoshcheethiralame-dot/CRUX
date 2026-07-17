---
subject: iot
unit: 4
order: 16
slug: iot-blockchain
title: IoT & Blockchain
summary: How a distributed, tamper-evident ledger addresses IoT's trust and security gaps — benefits, challenges, and use cases.
minutes: 10
tags: [blockchain, distributed-ledger, decentralization, trust, smart-contracts]
---

# IoT & Blockchain

The security topics exposed IoT's core weakness: it relies on **central servers and weak device trust**. **Blockchain** offers a structurally different model.

## What is blockchain?

> [!NOTE]
> A **blockchain** is a **distributed, append-only ledger** shared across many nodes. Transactions are grouped into **blocks**, each **cryptographically hashed** and linked to the previous block, and validated by **consensus** — making the record **decentralized, tamper-evident, and transparent.**

Key properties:

- **Decentralization** — no single central authority; the ledger is replicated across nodes.
- **Immutability** — altering a past block would break every subsequent hash, so tampering is detectable.
- **Consensus** — nodes agree on valid transactions (e.g., Proof of Work/Stake, or lighter schemes for IoT).
- **Smart contracts** — self-executing code that runs when conditions are met.

## Why pair blockchain with IoT?

IoT's pain points map directly onto blockchain's strengths:

| IoT problem | Blockchain remedy |
|---|---|
| **Single point of failure** (central server/cloud) | **Decentralized** ledger — no central server to take down |
| **Data tampering** (integrity) | **Immutable**, hash-linked records — tampering is evident |
| **Weak device identity/trust** | Cryptographic **device identity** and signed transactions |
| **Opaque data provenance** | **Transparent**, auditable history of every reading/transaction |
| **Manual, intermediary-heavy transactions** | **Smart contracts** automate machine-to-machine deals |

> [!INTUITION]
> Blockchain's gift to IoT is **trust without a middleman**. Normally every device must trust a central cloud; if that's hacked or down, the whole system fails. A blockchain lets devices **transact and verify data among themselves** on a tamper-evident shared ledger — so a compromised node can't silently rewrite history, and there's no single server to attack. It directly answers the **integrity** and **availability** weaknesses from the security topics.

## Use cases

- **Supply chain** — immutable provenance: track a product (or vaccine cold-chain) sensor-by-sensor, tamper-proof.
- **Device identity & access** — each device has a cryptographic identity on the ledger; rogue devices are rejected.
- **Smart-contract automation** — a sensor reading triggers an automatic payment or action (e.g., autonomous machine-to-machine micropayments).
- **Energy trading** — peer-to-peer solar energy trading between smart meters.
- **Secure firmware/data integrity** — record firmware hashes on-chain to detect tampering (the LockState/Jeep lesson).

## Challenges — why it's not a silver bullet

> [!TRAP]
> Blockchain and IoT have a **fundamental tension**: blockchains are **compute-, storage-, and energy-hungry** (especially Proof-of-Work), while IoT devices are **constrained, low-power, and battery-limited**. Classic blockchains also have **low throughput and high latency** — poor fits for high-frequency sensor data.

Other challenges: **scalability** (millions of devices × many transactions), **storage growth** (the ledger only grows; constrained nodes can't hold it), and **standardisation/integration** immaturity. These drive **lightweight, IoT-tailored** ledgers and consensus (and often keeping heavy ledger work at gateways/cloud, not the device).

> [!EXAM]
> Know blockchain's properties (**decentralized, immutable/tamper-evident, consensus, smart contracts**), **why it helps IoT** (removes single point of failure, ensures integrity/provenance, strengthens device trust, automates via smart contracts), key **use cases** (supply-chain provenance, device identity, energy trading), and the **challenges** (constrained devices vs compute/storage/energy-heavy chains; scalability/throughput). The constrained-device tension is the most important exam point.

---

That completes Unit 4 — and the IoT subject: from raw analytics through ML and the cloud to security, privacy, and blockchain. The full sense → connect → analyse → secure → trust loop.
