---
subject: se
unit: 2
order: 10
slug: microservices
title: Microservices Architecture
summary: Microservices fundamentals, the monolith vs SOA vs microservices comparison, reasons to adopt (Netflix), migration patterns (strangler fig, anti-corruption layer), and the challenges.
minutes: 14
tags: [microservices, monolith, SOA, netflix, strangler-fig, challenges]
---

# Microservices Architecture

## Fundamentals

> [!NOTE]
> **Microservices** structure an application as a collection of **small, independently deployable services** communicating through **well-defined APIs**. Each service is organised around a **business capability**, has **its own database** (decentralized data), and its own deployment cycle.

**Core characteristics:**
- **Service independence** — each service runs independently with its own DB and deployment.
- **API communication** — services interact **only** through network APIs (not shared DBs/memory).
- **Business-capability alignment** — organised around business functions, not technical layers.
- **Decentralized data management** — no shared database.

## Monolithic vs SOA vs Microservices

| Feature | **Monolithic** | **SOA** | **Microservices** |
|---|---|---|---|
| **Structure** | Single unified codebase | Services over an **ESB**/HTTP | Independently deployable small services |
| **Deployment** | One unit | Semi-independent | Each independent |
| **Communication** | In-process calls | Often via **ESB** (Enterprise Service Bus) | Lightweight (HTTP/REST, gRPC) |
| **Scalability** | Whole app | Some per-service | Fine-grained, independent |
| **Tech flexibility** | One stack | Moderate | High, per service |
| **Fault isolation** | Low (one failure hits all) | Better, shared deps | High, contained per service |
| **Complexity** | Simple first, hard later | Needs governance | Complex; needs DevOps + monitoring |
| **Best for** | Small teams, MVPs | Medium-large enterprises with reusable services | Large-scale systems with independent modules |

> [!EXAM]
> Key contrasts: **monolith = single deployable unit + shared DB + in-process calls**; **microservices = independent deployables + own DB per service + network APIs**. **SOA** sits between, using an **ESB** for communication. Microservices' headline benefit is **fault isolation + independent scaling**; its headline cost is **operational complexity**.

## Why adopt microservices?

Development velocity · selective component updates · technology diversity · **independent scalability** · targeted security · **fault isolation**.

**Netflix example:** hundreds of microservices — user-facing (subscriptions, auth, recommendations), content (streaming, encoding, metadata), infrastructure (service discovery, config, monitoring), data (analytics, A/B testing). Benefits: **global scale** (millions concurrent), **multiple deploys per day**, fault tolerance, technology experimentation.

> [!INTUITION]
> Why can't Netflix use a monolith? A single codebase deployed as one unit **can't scale or iterate** at Netflix's volume — one team's change would risk the whole platform, and you couldn't scale just the streaming service independently of billing. Microservices let each team move at its own pace.

## Migrating from a monolith

| Pattern | How it works |
|---|---|
| **Strangler Fig** | Route requests through a **facade / API gateway**; migrate functionality **piece by piece**; the monolith and new services **coexist**; eventually the monolith is fully replaced. |
| **Anti-Corruption Layer** | A **translation layer** between new services and an unchangeable legacy system — translates data formats and domain models so legacy concepts don't "corrupt" the new design. |

> [!INTUITION]
> The **strangler fig** is named after a vine that grows around a tree and gradually replaces it — exactly how you replace a monolith without a risky "big bang" rewrite.

## Challenges of microservices

- **Operational complexity** — managing hundreds of services (deploy, monitor, troubleshoot).
- **Inter-service communication** — network failures need **retries, circuit breakers, fallbacks** to prevent cascade failures.
- **Data consistency** — no global transactions → need patterns like the **saga** (with compensating actions).
- **Testing complexity** — end-to-end testing needs many running services + mocks.
- **Governance, DevOps overhead, distributed security/compliance** (e.g. each service must be HIPAA-compliant).

> [!TRAP]
> Microservices are **not always the right choice.** For small teams, MVPs and early-stage products, a **monolith is simpler and faster**. Microservices trade simplicity for scalability and independence — only worth it at scale.

---

**Next:** modelling system structure in UML — **component diagrams**.
