---
subject: se
unit: 4
order: 12
slug: privacy-engineering
title: Privacy & Privacy Engineering
summary: The concept of privacy, how it's protected, the FTC Fair Information Practice Principles, why software engineers should care, privacy engineering mechanisms (Privacy-by-Design), and the LINDDUN threat taxonomy.
minutes: 13
tags: [privacy, FIPP, privacy-by-design, LINDDUN, threat-modelling, GDPR]
---

# Privacy & Privacy Engineering

## The concept of privacy

> [!NOTE]
> **Privacy** is the **moral right of individuals to be left alone** — free from surveillance or interference by other individuals, organisations, or the state.

*(Warren & Brandeis, 1890: "numerous mechanical devices threaten to make good the prediction that 'what is whispered in the closet shall be proclaimed from the house-tops.'")* The same worry, amplified — today phones and IoT readily collect driving habits, GPS history, sleep, and health data.

> [!INTUITION]
> *"Is privacy dead?"* — Scott McNealy (Sun, 1999): *"You have zero privacy anyway. Get over it."* But **not everyone feels the same** about every scenario, and **almost everyone cares about *some* of it** — so privacy is far from dead; it's a design responsibility.

## How privacy is protected

Via **laws, self-regulation, and technology** — through **notice and access control** over collection/use/deletion/sharing, **collection limitation**, **use limitation**, and security & accountability.

### US FTC Fair Information Practice Principles (FIPPs)
| # | Principle | Meaning |
|---|---|---|
| 1 | **Notice / Awareness** *(core)* | Disclose data practices |
| 2 | **Choice / Consent** *(core)* | Opt-in / opt-out |
| 3 | **Access / Participation** | Users can review & correct their data |
| 4 | **Integrity / Security** | Secure, limited access |
| 5 | **Enforcement** | A mechanism for handling violations |

> [!EXAM]
> The **FTC FIPPs**: Notice, Choice, Access, Integrity/Security, Enforcement — with **Notice and Choice** as the two *core* principles. Also know the privacy laws SWEs face: sector laws **COPPA / HIPAA / FERPA**, state law **CCPA**, and the EU's **GDPR**.

## Privacy engineering

**Goals:** legal compliance (GDPR/CCPA), aligning with consumer expectations, building trust, competing on privacy, promoting privacy as a societal value.

**Mechanisms:**
- **Selective data collection** — purpose-driven; minimise personal data.
- **Data minimization** — de-identification, **pseudonymization**, **anonymization**.
- **Data-retention policies**, **cryptographic tools** (confidentiality), access-controlled storage, audits.
- **Threat modelling**.
- **Privacy-by-Design (PbD)** — build privacy in **from the start**, not bolted on late.

## Threat modelling — the LINDDUN taxonomy

> [!NOTE]
> **Threat modelling** systematically identifies possible threats and mitigations using a **taxonomy**. **LINDDUN** is the **privacy**-threat taxonomy (the privacy mirror of security's **STRIDE**):

| Letter | Privacy threat | Example question |
|---|---|---|
| **L** | **Linkability** | Can someone correlate a student's registrations to learn their interests/schedule? |
| **I** | **Identifiability** | Does event check-in expose attendee identities unnecessarily? |
| **N** | **Non-repudiation** | Does attendance create a permanent, undeniable record? |
| **D** | **Detectability** | Can an outsider detect that a record exists at all? |
| **D** | **Disclosure of information** | Are we collecting phone numbers when email would suffice? |
| **U** | **Unawareness** | Do users know data is collected? Can they delete their account? |
| **N** | **Non-compliance** | Have we documented our GDPR compliance measures? |

> [!EXAM]
> **LINDDUN = Linkability, Identifiability, Non-repudiation, Detectability, Disclosure of information, Unawareness, Non-compliance.** It is to *privacy* what **STRIDE** is to *security*. Be able to map a scenario to the right LINDDUN category.

---

**Next:** measuring how thoroughly we test — **code & branch coverage**.
