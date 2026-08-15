---
subject: se
unit: 1
order: 11
slug: srs-rtm-change
title: The SRS, Traceability (RTM) & Change Management
summary: The Software Requirements Specification (IEEE 830) and its structure, why natural language is problematic, requirements validation, the Requirements Traceability Matrix, and managing requirements change.
minutes: 14
tags: [SRS, IEEE-830, RTM, traceability, validation, change-management]
---

# The SRS, Traceability & Change Management

## The Software Requirements Specification (SRS)

> [!NOTE]
> The **Software Requirements Specification (SRS)** is the official, agreed document that states **what** the development team should implement. It records both the **user requirements** and the detailed **system requirements**, and acts as the **contract** between customer and developer.

The SRS should describe **what** the system must do, **not how** it should do it (no design decisions). Good SRS qualities — it should be:

- **Complete** — every requirement is included.
- **Consistent** — no requirement contradicts another.
- **Unambiguous** — exactly one interpretation.
- **Verifiable / testable** — each requirement can be checked.
- **Modifiable** — structured so changes are easy.
- **Traceable** — each requirement has a unique ID and can be tracked.
- **Ranked / prioritised** — by importance and stability.

### IEEE 830 — the standard SRS structure

**IEEE Std 830** defines a recommended table of contents:

1. **Introduction** — purpose, scope, definitions, references, overview.
2. **Overall Description** — product perspective, product functions, user characteristics, **constraints**, assumptions and dependencies.
3. **Specific Requirements** — the detailed **functional** and **non-functional** requirements (the bulk of the document); external interfaces; performance; design constraints; software attributes.
4. **Appendices & Index.**

> [!EXAM]
> Know that the **SRS = the contract**, describes **what not how**, and follows **IEEE 830**. The "good SRS" adjectives (complete, consistent, unambiguous, verifiable, modifiable, traceable) are a common 4-mark list.

## The problem with natural language

Most SRS documents are written in **natural language**, which is readable but flawed:

- **Ambiguity** — words have multiple meanings; "the system should be fast."
- **Over-flexibility** — the same thing can be said many ways, hiding duplication/conflict.
- **Lack of modularisation** — hard to structure and cross-reference.

Mitigations: use a **standard template**, structured natural language (forms), tables and diagrams, and where precision is vital, formal/semi-formal notations (use cases, models).

## Requirements validation

**Validation** checks that the documented requirements actually define the system the customer wants. Sommerville's validation **checks**:

| Check | Question |
|---|---|
| **Validity** | Does the system provide the functions that *best* support the customer's needs? |
| **Consistency** | Are there any requirement conflicts? |
| **Completeness** | Are all needed functions & constraints included? |
| **Realism** | Can the requirements be implemented with available budget/technology? |
| **Verifiability** | Can each requirement be tested? |

Validation **techniques**: requirements **reviews/inspections**, **prototyping**, and **test-case generation** (if you can't write a test for it, the requirement is probably bad).

> [!TRAP]
> **Verification vs Validation** in requirements: *validation* asks "are these the **right** requirements?" (do they match the customer's needs). Don't confuse with later V&V of the built system (Topic 13).

## The Requirements Traceability Matrix (RTM)

> [!NOTE]
> A **Requirements Traceability Matrix (RTM)** is a document (table) that **maps and traces each requirement** through the lifecycle — from its source, to its design element, to the code, to the **test cases** that verify it.

Why it matters:
- **Coverage** — proves every requirement has been designed, built **and tested** (no requirement is orphaned).
- **Impact analysis** — when a requirement changes, the RTM instantly shows what design/code/tests are affected.
- **Bidirectional tracing** — *forward* (requirement → test) ensures nothing is missed; *backward* (test/code → requirement) ensures no "gold-plating" (code with no requirement behind it).

A simple RTM:

| Req ID | Requirement | Design ref | Code module | Test case(s) | Status |
|---|---|---|---|---|---|
| FR-01 | User can reset password | DD-12 | `auth/reset.py` | TC-07, TC-08 | Passed |
| NFR-03 | Response < 2 s | DD-04 | `api/` | TC-21 | Passed |

> [!EXAM]
> The RTM's headline purpose is **coverage + traceability**: every requirement maps to a test (forward) and every test/feature maps back to a requirement (backward). It is the tool for **change-impact analysis**.

## Requirements change management

Requirements **always** change — business needs, regulations, technology and understanding all evolve. A disciplined **change-management** process keeps this from causing chaos. The workflow:

```
1. Change request          (a stakeholder requests a change)
        ↓
2. Problem analysis & specification   (is the request valid/clear?)
        ↓
3. Change analysis & costing          (impact via RTM; estimate cost/risk)
        ↓
4. Change Control Board (CCB) decision (approve / reject / defer)
        ↓
5. Change implementation              (update SRS, design, code, tests)
        ↓
6. Update the RTM & re-validate
```

Supporting ideas:
- **Change Control Board (CCB)** — the group that approves/rejects changes.
- **Impact analysis** — use the RTM to see everything a change touches.
- **Baselining** — freeze an agreed version; all changes are against the baseline.
- **Versioning** — track requirement versions so history is auditable.

> [!INTUITION]
> Change management answers three questions for every change: *Is it worth it? (cost vs benefit) · What does it affect? (impact via RTM) · Who decides? (the CCB).* Uncontrolled change = **scope creep**.

---

**Next:** modelling requirements visually — **UML and use cases**.
