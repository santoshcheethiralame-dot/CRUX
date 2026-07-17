---
subject: se
unit: 1
order: 1
slug: introduction-to-se
title: Introduction to Software Engineering
summary: What software & SE really are, the 1968 software crisis, FLURPS quality drivers, the cost of failure, and CS vs SE.
minutes: 14
tags: [definition, software-crisis, FLURPS, quality, CS-vs-SE]
---

# Introduction to Software Engineering

## What is "software"? (it is not just code)

A common trap is to think *software = the program*. Sommerville is explicit: **software is the programs *and* all the associated documentation and configuration data needed to make them work correctly.**

A **software product** therefore includes:

- the **executable programs** (the source + compiled code),
- **libraries** it depends on,
- **configuration files** to set it up,
- **documentation** — both system documentation (architecture, how it works) and user documentation (how to use it),
- and increasingly, **websites / services** for users to download information.

> [!NOTE]
> Two kinds of software product:
> - **Generic products** — stand-alone systems sold on the open market to *anyone* (e.g. MS Word, Photoshop, a database). The developer owns and controls the specification.
> - **Customised (bespoke) products** — commissioned by a *specific* customer to meet their own needs (e.g. an air-traffic-control system, a bank's settlement engine). The customer owns and controls the specification.

## What is Software Engineering?

> [!NOTE]
> **Software Engineering** is an engineering discipline concerned with **all aspects of software production**, from the early stages of system specification through to maintaining the system after it has gone into use.

Unpack the two key phrases:

- **"Engineering discipline"** — engineers make things work. They apply theories, methods and tools *appropriately*, but they also work within **organisational and financial constraints**, so they look for solutions even when there are no applicable theories. They are pragmatic.
- **"All aspects of software production"** — not just the technical process of writing code, but also project management and the development of tools, methods and theories to support production.

[!INTUITION] Computer **Science** is to Software **Engineering** as Physics is to Mechanical/Electrical Engineering. Science gives you the *theories and fundamentals*; engineering uses those theories to **build a real, reliable, economical product under constraints** (deadlines, budgets, team size).

## The Software Crisis — why the discipline was born

The term **"software engineering"** was coined at the **1968 NATO Software Engineering Conference (Garmisch, Germany)** to confront the **software crisis**: as hardware grew vastly more powerful, the software running on it became impossible to build and maintain with the *ad-hoc* "just code it" methods of the day.

Symptoms of the crisis (still the symptoms of bad projects today):

| Symptom | Meaning |
|---|---|
| **Over budget** | Projects cost far more than estimated |
| **Over time** | Projects ran years late |
| **Low quality** | Software was buggy, did not meet requirements |
| **Unmaintainable** | Hard to change; fixing one bug created others |
| **Never delivered** | Some projects were simply cancelled |

The crisis was driven by **increasing system complexity**: we were trying to build larger and larger systems, yet had no proven, repeatable *process* to do so. The engineering response: bring **discipline, process, and measurement** to software production.

> [!EXAM]
> "Why/when did software engineering emerge?" → The **software crisis**, named at the **NATO conference of 1968**. The root cause was **growing complexity outpacing ad-hoc development methods**.

## What makes *good* software? — quality attributes

A program that "works" is not enough. Sommerville lists **four essential attributes** of good professional software — these are *non-functional* qualities that all good software must have:

| Attribute | What it means |
|---|---|
| **Maintainability** | Software *must evolve* to meet changing needs. It should be written so it can be cost-effectively changed. |
| **Dependability & security** | It should be reliable, safe, and secure — it must not cause physical or economic damage in the event of failure, and malicious users must not access or damage the system. |
| **Efficiency** | It should not waste system resources — responsiveness, processing time, memory use. |
| **Acceptability** | It must be *understandable, usable and compatible* with other systems users use, so they will actually adopt it. |

### FLURPS — a memorable quality checklist

A widely-taught mnemonic for the dimensions of software quality is **FLURPS** (a variant of HP's FURPS):

- **F** — **Functionality** (does it do what it should?)
- **L** — **Localizability** (can it adapt to languages/regions?)
- **U** — **Usability** (is it easy to learn and use?)
- **R** — **Reliability** (does it fail rarely, recover well?)
- **P** — **Performance** (speed, throughput, resource use)
- **S** — **Supportability** (can it be maintained, configured, serviced?)

> [!INTUITION]
> Functional requirements ask *"can it do the job?"* The FLURPS/quality attributes ask *"is it good enough to live with?"* A feature can be present (functional) yet unusable, unreliable or slow (poor quality). Both halves matter.

## The cost of getting it wrong

Software failure is not abstract — it is expensive and sometimes deadly. Classic disasters used to motivate SE:

- **Ariane 5 (1996)** — rocket self-destructed 37 s after launch; cause was a software exception from converting a 64-bit float to a 16-bit integer (overflow). ~$370M lost.
- **Therac-25** — a radiation-therapy machine whose software race condition delivered massive radiation overdoses, killing patients.
- **Y2K** — billions spent worldwide fixing two-digit year fields.

The lesson: software is now embedded in safety-critical, business-critical and society-critical systems, so **process and quality are not optional**.

## Computer Science vs Software Engineering vs System Engineering

A frequent exam discriminator:

| | Concerns |
|---|---|
| **Computer Science** | The *theories and fundamentals* — algorithms, complexity, computation. Underpins SE the way physics underpins electrical engineering. |
| **Software Engineering** | The *practicalities* of developing and delivering **useful software** under real constraints. |
| **System Engineering** | All aspects of **computer-based systems development** — hardware, software, *and* process engineering. SE is one part of this larger whole. |

> [!TRAP]
> SE is **not** simply "programming." Programming is one activity *inside* software engineering. SE adds requirements, design, verification, project management, and maintenance — the whole lifecycle around the code.

## Software process & the engineering mindset

Because software is intangible and infinitely malleable, the only way to control its production is to follow a **software process**: a structured set of activities required to develop a software system. Every process, however simple, includes four fundamental activities:

1. **Specification** — define what the system should do.
2. **Development (Design & Implementation)** — define the organisation of the system and implement it.
3. **Validation** — check that it does what the customer wants.
4. **Evolution** — change the system in response to changing needs.

These four are the backbone of *every* lifecycle model in the next topics.

---

**Next:** a concrete, modern reminder of why this discipline matters — the **CrowdStrike** outage of 2024.
