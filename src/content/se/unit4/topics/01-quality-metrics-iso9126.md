---
subject: se
unit: 4
order: 1
slug: quality-metrics-iso9126
title: Software Quality, ISO 9126 & Measurement
summary: Why quality matters (Ariane 5), the six ISO 9126 quality characteristics, what measurement is (Kelvin, IEEE 1061), the entities and qualities we measure, and why everything is measurable.
minutes: 13
tags: [quality, ISO-9126, measurement, metrics, ariane-5]
---

# Software Quality, ISO 9126 & Measurement

## Why quality matters — the Ariane 5 disaster

On **June 4, 1996**, the inaugural flight of **Ariane 5** was lost shortly after launch, destroying a **$400 million payload**.
- The **Inertial Reference System** was **reused from Ariane 4** without re-validation.
- Ariane 5's **higher horizontal velocity** caused a **64-bit float → 16-bit integer overflow** in the **backup** system… immediately **followed by the exact same overflow in the primary**.
- Both processors failed → total loss of control.

> [!TRAP]
> The deep lesson: **software is a single point of failure.** Redundant *hardware* helps; redundant *software* that is identical **fails the same way**. *One variable, one wrong data type, half a billion dollars.* This is why quality — and **measurement** — matters.

## The ISO 9126 Quality Model

> [!NOTE]
> **ISO 9126** defines **six quality characteristics** for software products:

| Characteristic | Definition | Example |
|---|---|---|
| **Functionality** | Does it work correctly? | Registration saves to the database correctly |
| **Reliability** | Does it work consistently? | App doesn't crash during peak registration |
| **Usability** | Is it easy to use? | Students register in < 3 clicks |
| **Efficiency** | Does it use resources well? | Handles 1000 concurrent users without slowdown |
| **Maintainability** | Can we fix/enhance it easily? | New event type added in < 2 hours |
| **Portability** | Can it run elsewhere? | Works on iOS, Android and web |

> [!EXAM]
> Memorise the **six ISO 9126 characteristics**: **Functionality, Reliability, Usability, Efficiency, Maintainability, Portability.** (Its successor **ISO 25010** adds Security and Compatibility.) A guaranteed list/match question.

## What is measurement?

> *"To measure is to know; if you cannot measure it, you cannot improve it."* — **Lord Kelvin**
> *"Measure what is measurable, and make measurable what is not so."* — **Galileo**

> [!INTUITION]
> **Measurement turned software from a craft into engineering.** Before: *"When will it be done?" → "When it's done."* After: *"Based on a velocity of 20 story points/sprint, 8 weeks."* Numbers replace vibes.

**Definitions:**
- **Measurement** (Craner & Bond): the **empirical, objective assignment of numbers**, by a rule from a model, to attributes of objects/events, to describe them.
- **Software Quality Metric (IEEE 1061):** *"a function whose inputs are software data and whose output is a single numerical value that can be interpreted as the degree to which the software possesses a given attribute that affects its quality."*

## What do we measure?

- **Entities:** software **product** · **modules** · development **process** · **people**.
- **Software qualities:** functionality, availability, portability, scalability, security, performance, bugginess, regulatory compliance, documentation…
- **Process qualities:** development efficiency, conformance to process, reliability of predictions, fairness, on-time release.
- **People qualities:** developers (satisfaction, collaboration, flow), customers (satisfaction, ease of use, feature usage).
- **Non-trivial (hard) qualities:** code elegance, maintainability, fairness, team collaboration, creativity.

> [!NOTE]
> **Everything is measurable** (Hubbard's argument): if you *care* about X, then X must be **detectable** (it corresponds to some result). If detectable, it is detectable in **some amount**. If observable in some amount, it is **measurable** — at least indirectly.

---

**Next:** the concrete numbers — **code metrics & function points**.
