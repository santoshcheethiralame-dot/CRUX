---
subject: se
unit: 2
order: 15
slug: quality-management
title: Software Quality Management
summary: The Heartbleed case study, quality perspectives and McCall's dimensions, attributes vs measures vs metrics, metrics categorization, the Cost of Quality framework, and SQA.
minutes: 15
tags: [quality, heartbleed, McCall, metrics, cost-of-quality, SQA]
---

# Software Quality Management

## Case study — Heartbleed (OpenSSL, 2014)

> [!NOTE]
> **Heartbleed (CVE-2014-0160)** shows how a **quality-process lapse** became a security flaw affecting millions.

- **OpenSSL** is the widely-used open-source **SSL/TLS** library behind countless web servers (Apache, Nginx, curl) — yet maintained by a **small volunteer team** with **irregular updates and no formal release process**.
- **The bug:** the TLS **Heartbeat** extension (RFC 6520) sends a payload + a **length field**; the receiver echoes the payload back. OpenSSL **did not validate that the length field matched the actual payload size**. A malicious client could claim **64 KB** while sending a few bytes → the server returned **excess memory** (a **buffer over-read**), leaking **private keys, session tokens, PII**.
- **The failure was process, not just code:** the bug lived **~2 years**, unnoticed by reviews/testing; even after the fix (OpenSSL 1.0.1g), **~17% of HTTPS servers stayed vulnerable for weeks**.

**Quality-management failures:** no formal **code review**; **insufficient testing** (no out-of-bounds/negative tests, no **fuzzing**); **unstructured release process** (no quality gates/regression suites); poor documentation.

> [!EXAM]
> Heartbleed = **missing input (length) validation** + weak QA. The fixes are textbook quality management: mandatory **code review**, **automated testing incl. boundary-value & fuzzing in CI**, traceability, and **security audits** of critical modules.

## Quality perspectives & dimensions

The five **quality perspectives** (Garvin): **Transcendent, User-based, Manufacturing-based, Product-based, Value-based** (from the project-management topic).

**McCall's product quality dimensions** group quality attributes by purpose:

| Perspective | Attributes |
|---|---|
| **Product Operation** | **Correctness, Reliability, Efficiency, Integrity (security), Usability, Functionality, Availability** |
| **Product Revision** (evolution) | **Maintainability, Testability, Flexibility** |
| **Product Transition** (deployment) | **Portability, Reusability, Interoperability** |

## Metrics & measurement

> [!NOTE]
> **Attribute** = a measurable property. **Measure** = a quantitative indication of size/amount (e.g. *number of defects*). **Metric** = a calculated **relationship between measures** (e.g. *defects per KLOC*).

> [!TRAP]
> "Number of defects" is a **measure**; "defects per thousand lines of code" is a **metric** (it combines the defect count with system size). Examiners love this measure-vs-metric distinction.

**Metrics categorization:**
- **Direct measures (internal):** depend only on themselves — Cost, Effort, **LOC**, testing duration.
- **Indirect measures (external):** derived — **defect density**, productivity.
- **Size-oriented:** Errors/KLOC, Cost/LOC.
- **Complexity-oriented:** **Fan-in/Fan-out**, **Halstead's software science** (program length, volume, vocabulary — from distinct operators/operands).
- **Product / Project / Process metrics** — assess product state / staffing & cost & schedule / long-term process improvement.

## Cost of Quality (COQ)

A framework to **quantify what is spent on quality** and find improvements:

| | Category | Examples |
|---|---|---|
| **Cost of Good Quality (COGQ)** | **Prevention** | Training, quality planning, design reviews, automation |
| | **Appraisal** | Code reviews, testing at all levels, audits, metrics |
| **Cost of Poor Quality (COPQ)** | **Internal failure** (before delivery) | Defect repair/rework, extra testing, schedule delays |
| | **External failure** (after delivery) | Customer support, patches, warranty, reputation damage |

> [!INTUITION]
> COQ's lesson: **prevention is cheapest.** A defect caught by a design review (prevention) costs a fraction of one found by a customer (external failure). Spend on the left (prevention/appraisal) to slash the right (failure).

## Software Quality Assurance (SQA)

> [!NOTE]
> **SQA** is the systematic **monitoring of the development *process*** to ensure quality throughout the lifecycle — not just inspecting the final product.

SQA covers requirements → design → implementation → testing → deployment → maintenance. Activities: process planning, oversight & control, **compliance auditing**, **deviation management** (document/analyze/escalate), release-criteria definition, **quality gates**.

**SQA plan contents:** responsibility management · document control · requirements management (traceability) · design & development control (coding standards, peer review) · testing & validation · risk management · quality audits · **defect management** (tracking + root-cause) · training.

---

**Next:** the long-term cost of shortcuts, and a discipline to keep quality high — **technical debt & TDD**.
