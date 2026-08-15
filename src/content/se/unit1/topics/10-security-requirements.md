---
subject: se
unit: 1
order: 10
slug: security-requirements
title: Security Requirements
summary: Why security is a distinct requirement class, the CIA triad, Security Requirements Analysis (SRA), types of security requirement, and writing them SMART.
minutes: 12
tags: [security, CIA-triad, SRA, SMART, requirements, threat]
---

# Security Requirements

## Why security requirements deserve their own topic

Security is technically a **non-functional** (product) requirement, but it is so critical — and so easy to get wrong — that it is treated separately. Unlike most NFRs, security is **adversarial**: there is an intelligent attacker actively trying to break your assumptions. (The CrowdStrike outage in Topic 2 shows what happens when a security product itself fails.)

Security requirements are often **"shall not"** statements (constraints on what must *never* happen), which makes them harder to test than ordinary "shall" features.

## The CIA triad — the foundation

Almost every security requirement maps to one of three core goals:

| Goal | Meaning | Example requirement |
|---|---|---|
| **Confidentiality** | Information is disclosed only to authorised parties. | "Patient records shall be visible only to the assigned clinician." |
| **Integrity** | Information cannot be modified in an unauthorised or undetected way. | "All transactions shall be tamper-evident via cryptographic signing." |
| **Availability** | The system/data is accessible to authorised users when needed. | "The service shall withstand a DDoS of X requests/sec and stay 99.9% available." |

> [!EXAM]
> The **CIA triad = Confidentiality, Integrity, Availability**. (Sometimes extended with **Authentication, Authorisation, Non-repudiation, Accountability**.) Be ready to classify a requirement into the right CIA goal.

## Security Requirements Analysis (SRA)

**Security Requirements Analysis** is the process of identifying the security needs of a system *early* — i.e. "shifting security left" (recall the SecDLC). The flow:

1. **Identify the assets** — what is worth protecting (data, services, reputation)?
2. **Identify the threats** — who/what could harm those assets (threat modelling, e.g. STRIDE)?
3. **Identify vulnerabilities** — weaknesses a threat could exploit.
4. **Assess risk** — likelihood × impact for each threat.
5. **Derive security requirements / controls** — what the system must do (or never do) to mitigate the risks.

> [!INTUITION]
> **Risk = Threat × Vulnerability × Impact.** You write a security requirement for each significant risk: a control that lowers likelihood (prevention) or impact (mitigation/recovery).

## Types of security requirement

Security requirements come in several flavours — recognise them:

| Type | Purpose | Example |
|---|---|---|
| **Identification** | Uniquely recognise a user/entity before anything else. | "Each user shall have a unique user ID." |
| **Authentication** | Verify the claimed identity. | "Users shall authenticate via password + OTP (2FA)." |
| **Authorisation** | Control what an authenticated user may do. | "Only admins shall delete accounts (least privilege)." |
| **Confidentiality / Privacy** | Protect data from disclosure. | "Data in transit shall be encrypted with TLS 1.3." |
| **Integrity** | Detect/prevent tampering. | "Audit logs shall be append-only and hashed." |
| **Non-repudiation** | Prevent denial of an action. | "Each transaction shall be digitally signed." |
| **Immunity / Survivability** | Resist and recover from attack. | "The system shall detect and quarantine malware." |
| **Privacy** | Comply with data-protection rules. | "Personal data shall be processed per GDPR." |

## Writing security requirements that are SMART

Like all NFRs, security requirements must be **testable** — vague ones ("the system shall be secure") are useless. Use the **SMART** criteria:

| Letter | Criterion | Meaning |
|---|---|---|
| **S** | **Specific** | Precisely states what is required (no ambiguity). |
| **M** | **Measurable** | Has a criterion you can verify/test. |
| **A** | **Achievable** | Technically and practically feasible. |
| **R** | **Relevant** | Addresses a real risk to a real asset. |
| **T** | **Time-bound** | Has a timeframe / deadline where applicable. |

> [!TRAP]
> "The system shall be secure" fails every SMART test. Rewrite: "The system shall **lock an account for 15 minutes after 5 failed login attempts** (Specific, Measurable, Time-bound), mitigating brute-force attacks (Relevant)."

> [!EXAM]
> Two acronyms get confused: **SMART** is for writing *good (security) requirements*; **INVEST** is for good *user stories*. Don't swap them.

## Security across the lifecycle

Security is not a single phase — it threads through the **SecDLC** (Topic 4) and culminates in **Security Validation Planning** and penetration testing (Topic 14). A security requirement defined here becomes a security **test case** later.

---

**Next:** documenting all of this — the **SRS, the RTM, and requirements change management**.
