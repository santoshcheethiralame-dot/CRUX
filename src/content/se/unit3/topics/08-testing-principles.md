---
subject: se
unit: 3
order: 8
slug: testing-principles
title: Testing Principles & V&V
summary: Dijkstra's insight, the seven principles of testing (with the exhaustive-testing impossibility and the pesticide paradox), and verification vs validation.
minutes: 12
tags: [testing, principles, dijkstra, verification, validation, pesticide-paradox]
---

# Testing Principles & V&V

## Why we test

> [!NOTE]
> *"Program testing can be used to show the **presence** of bugs, but **never** to show their **absence**!"* — **Edsger W. Dijkstra**

Testing verifies functional and non-functional requirements. It is **not a phase** — it is a **continuous activity** integrated throughout development. A **successful test finds a defect**; it cannot prove the program correct.

## The 7 Principles of Testing

| # | Principle | Key idea |
|---|---|---|
| **1** | **Presence, not absence of defects** | Testing shows defects exist, never that none remain. *(A 99% bug-free banking app that ignores PCI-DSS is still unusable.)* |
| **2** | **Exhaustive testing is impossible** | Even a 10-char input over 30 characters = **30¹⁰ ≈ 59 trillion** combinations — impossible even at a zettaFLOPS. Use **risk-based sampling**. |
| **3** | **Start testing early** | Guides design, gives early feedback, **cheapest** fixes, least damage. |
| **4** | **Defect clustering** | A few modules hold most defects (a payment module with ~80% of bugs); use code-churn metrics. |
| **5** | **Pesticide Paradox** | Repeating the same tests stops finding new bugs — **vary/rotate** techniques (add fuzzing, mutation). |
| **6** | **Context-dependent** | Choose techniques per project — avionics → formal verification; games → exploratory. |
| **7** | **Verification ≠ Validation** | *Verify:* building it **right** (specs)? *Validate:* building the **right** product (user needs)? |

> [!EXAM]
> The two most-quoted principles: **exhaustive testing is impossible** (so we sample with heuristics like EP/BVA) and the **pesticide paradox** (tests lose effectiveness — keep varying them). Know all seven; they're a guaranteed list question.

## Verification vs Validation

| | Verification | Validation |
|---|---|---|
| Question | *"Are we building the product **right**?"* | *"Are we building the **right** product?"* |
| Against | The **specification** | The **user's needs** |
| Example | Specs say "sort ascending" → sorts ascending ✓ | But the user actually wanted **descending** ✗ |

> [!INTUITION]
> Mnemonic from the slides: **V&V = "Very Very Important."** A product can pass **verification** (matches the spec perfectly) yet fail **validation** (the spec was wrong / not what the user needed). You need both.

> [!TRAP]
> Don't conflate **verification** (static or dynamic checks against the *spec*) with **validation** (checks against *user needs*). And remember **static testing = verification**, **dynamic testing = validation** (covered later) — a frequent matching question.

*(Classic motivating disaster: the **Ariane 5** crash — a 64-bit float to 16-bit integer conversion overflow that rigorous testing would have caught.)*

---

**Next:** how to actually choose test cases — **test design techniques (EP, BVA, pairwise)**.
