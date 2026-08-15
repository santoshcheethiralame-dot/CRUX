---
subject: se
unit: 1
order: 9
slug: functional-nonfunctional
title: Functional & Non-Functional Requirements
summary: The difference between functional and non-functional requirements, Sommerville's NFR taxonomy (product/organisational/external), why NFRs are often critical, and how to make them measurable.
minutes: 15
tags: [functional, non-functional, NFR, taxonomy, metrics, quality]
---

# Functional & Non-Functional Requirements

System requirements are classically split into two kinds. Getting this distinction right — and knowing the **NFR taxonomy** — is one of the most heavily examined parts of the unit.

## Functional requirements (FR)

> [!NOTE]
> **Functional requirements** are statements of the **services** the system should provide: how it should react to particular inputs, and how it should behave in particular situations. They describe **what the system does**.

Examples (for a university library system):
- "A user shall be able to **search** the set of databases for a given query."
- "The system shall **email a confirmation** when a book is reserved."
- "Each librarian shall be assigned a **unique identifier**."

Functional requirements may also state what the system should **not** do.

> [!TRAP]
> Functional requirements must be **complete** (all services defined) and **consistent** (no contradictions). In practice, for complex systems they rarely are — natural-language FRs are often **ambiguous**, which is why we move to structured/system requirements and use cases.

## Non-functional requirements (NFR)

> [!NOTE]
> **Non-functional requirements** are constraints on the **services or functions** offered by the system — they are **not** about specific features but about **properties** of the system as a whole: timing, reliability, security, standards, etc. They describe **how well the system does it.**

Examples:
- "The system shall respond to any query in **under 2 seconds**." (performance)
- "The system shall be available **99.99%** of the time." (availability)
- "All user passwords shall be stored **hashed and salted**." (security)
- "The UI shall conform to **WCAG 2.1 AA** accessibility standards." (standards)

> [!EXAM]
> The single most-asked discriminator: **FR = *what* the system does (a service/feature); NFR = *how well* it does it / a constraint (a quality).** "Respond within 2 seconds" = NFR (performance). "Let the user reset their password" = FR.

### Why NFRs are often more critical than FRs

NFRs frequently apply to the system **as a whole** rather than individual features. A single failed NFR can make the **entire system unusable** even if every functional requirement is met. (A bank app that does everything but takes 5 minutes per transaction, or leaks passwords, is worthless.) NFRs also frequently **conflict** — e.g. more security usually costs performance and usability.

## Sommerville's NFR taxonomy — the three types

This taxonomy is a guaranteed exam diagram. NFRs come from **three sources**:

```
Non-functional requirements
├── Product requirements      (about the product's behaviour)
├── Organisational requirements (from the developing/buying org's policies)
└── External requirements      (from factors outside the system & org)
```

### 1. Product requirements
Specify or constrain the **runtime behaviour** of the software. Sub-types:
- **Efficiency** → **Performance** (speed, response time) and **Space** (memory/storage use).
- **Dependability** (reliability, availability, fault-tolerance).
- **Security** (confidentiality, integrity).
- **Usability** (ease of learning/use).

### 2. Organisational requirements
Derived from **policies and procedures** of the customer's or developer's organisation. Sub-types:
- **Environmental** (operating environment constraints).
- **Operational** (how the system will be used/operated).
- **Development** requirements — e.g. *"the system must be written in Java"* or *"must follow the company's design process / use a specified IDE / programming language."*

### 3. External requirements
Derived from **factors external** to the system and its development. Sub-types:
- **Regulatory** (must satisfy a regulator, e.g. aviation, medical).
- **Ethical** requirements (acceptable to society).
- **Legislative** → **Accounting** and **Safety/Security** legal requirements (e.g. GDPR data-protection law).

> [!EXAM]
> Learn the tree: **Product / Organisational / External**, and at least two sub-types of each. Classic question: *"A requirement that the software be written in Java"* → **Organisational** (development) requirement. *"Must comply with GDPR"* → **External** (legislative/regulatory).

## Making NFRs measurable (the big NFR pitfall)

NFRs are often written **vaguely** ("the system should be easy to use," "fast," "secure") — which makes them **impossible to verify**. A good NFR must be **measurable** so you can objectively test whether it's met. Sommerville gives a metrics table:

| Property | Measurable metric |
|---|---|
| **Speed** | Processed transactions/second; response/refresh time |
| **Size** | Megabytes; number of ROM chips |
| **Ease of use** | Training time; number of help frames |
| **Reliability** | Mean time to failure (MTTF); availability % |
| **Robustness** | Time to restart after failure; probability of data corruption |
| **Portability** | Number of target systems; % of platform-dependent statements |

> [!TRAP]
> "The system shall be **user-friendly**" is a **bad** requirement — unverifiable. Rewrite as: "A trained user shall complete a standard order in **under 90 seconds** with **fewer than 2 errors**." Always attach a number you can test.

## Functional vs Non-Functional — side by side

| | Functional | Non-functional |
|---|---|---|
| Describes | *What* the system does | *How well* it does it / constraints |
| Example | "Generate a monthly report" | "Generate it in < 5 s, 99.9% available" |
| Verified by | Does the feature work? | Measured against a metric/threshold |
| Failure impact | A feature is missing | The *whole system* may be unusable |
| Also called | Behavioural requirements | Quality attributes / constraints |

---

**Next:** a critical, often-separate category — **security requirements**.
