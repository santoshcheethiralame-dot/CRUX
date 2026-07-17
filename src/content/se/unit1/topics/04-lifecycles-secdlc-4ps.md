---
subject: se
unit: 1
order: 4
slug: lifecycles-secdlc-4ps
title: Product Lifecycles, the Secure SDLC & the 4 Ps
summary: How the SDLC sits inside larger product, project (PMLC) and software (SMLC) lifecycles; the five phases of the Secure SDLC (SecDLC); and the 4 Ps of software project management.
minutes: 12
tags: [PMLC, SMLC, SecDLC, secure-sdlc, 4Ps, lifecycle]
---

# Product Lifecycles, the Secure SDLC & the 4 Ps

## The SDLC is only one lifecycle among several

The **SDLC** describes how the *software* is built. But the software lives inside larger cycles that a project manager must also see:

| Lifecycle | Scope | Focus |
|---|---|---|
| **Product Life Cycle** | The whole product, cradle to grave | Introduction → Growth → Maturity → **Decline/Retirement** (a *business/market* view) |
| **PMLC** — Project Management Life Cycle | One project | Initiating → Planning → Executing → Monitoring & Controlling → Closing (the **PMI/PMBOK** phases) |
| **SMLC** — Software (Development) Life Cycle | Building the software | The SDLC phases (requirements → … → maintenance) |
| **SDLC** | The engineering process | Specification, development, validation, evolution |

> [!INTUITION]
> Think of nested boxes: a **product** exists in a market for years (Product Life Cycle); to build or update it you run **projects** (PMLC); each project develops software via the **SMLC/SDLC**. The PM watches all three at once.

### The Product Life Cycle stages

1. **Introduction** — launch; low sales, high cost.
2. **Growth** — adoption accelerates.
3. **Maturity** — peak sales, market saturation, competition.
4. **Decline / Retirement** — demand falls; the product is sunset or replaced.

## The Secure SDLC (SecDLC) — "shift security left"

A normal SDLC bolts security on at the end (penetration testing just before release). A **Secure SDLC (SecDLC)** weaves **security into every phase** — the principle of **"shifting security left"** (earlier in the timeline). The five phases:

| # | Phase | Security activity |
|---|---|---|
| **1** | **Investigation / Requirements** | Define security requirements & policy; identify what must be protected. |
| **2** | **Analysis** | **Risk analysis & threat modelling** — what are the threats and vulnerabilities? |
| **3** | **Design** | **Secure design** — architect controls (authentication, encryption, least privilege); design reviews. |
| **4** | **Implementation** | **Secure coding** + static analysis (SAST); code reviews for vulnerabilities. |
| **5** | **Maintenance** | Ongoing **monitoring, patching, incident response**, and re-assessment. |

> [!EXAM]
> The SecDLC has **5 phases: Investigation → Analysis → Design → Implementation → Maintenance**, each adding a security activity. The big idea is **"shift left"**: catching a security flaw in *design* is far cheaper than catching it after *release* (recall CrowdStrike).

[!TRAP] "DevSecOps" and "SecDLC" are not the same thing. **SecDLC** is the *lifecycle* idea of building security into each phase. **DevSecOps** (Unit 3) is the *operational practice* of automating security into the CI/CD pipeline. SecDLC is the principle; DevSecOps is one way to operationalise it.

## The 4 Ps of (Software) Project Management

Software project management famously balances **four P's**. Get any one wrong and the project suffers.

| P | Meaning | Why it matters |
|---|---|---|
| **People** | The most important asset — developers, customers, stakeholders, managers. | Software is built *by* people *for* people; staffing, skills and communication dominate success. |
| **Product** | The software (and documents/data) to be built — its scope and objectives. | You must define *what* is being delivered before you can plan or estimate it. |
| **Process** | The framework of activities, methods and tools used to build the product. | Choosing the right process model (waterfall? agile?) shapes everything. |
| **Project** | The plan that brings People, Product and Process together and tracks them. | Planning, scheduling, tracking and risk management — the act of *managing*. |

> [!INTUITION]
> Pressman's ordering is deliberate: you start with **People**, who build a **Product**, by following a **Process**, organised as a **Project**. Each P builds on the previous.

> [!EXAM]
> Memorise the 4 Ps and their order: **People → Product → Process → Project**. "Which P is the most important?" → **People**.

## Putting it together

- The **SDLC** (last topic) is the engineering engine.
- It runs inside a **PMLC** (how the project is managed) and an even larger **Product Life Cycle** (how the product lives in the market).
- A **SecDLC** overlays security onto every SDLC phase ("shift left").
- The **4 Ps** are the levers a project manager pulls to keep all of this on track.

---

**Next:** the modern answer to rigid plan-driven models — **Agile** and **Scrum**.
