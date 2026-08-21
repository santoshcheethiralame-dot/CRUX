---
subject: erp
unit: 1
order: 11
slug: pre-implementation-preparation
title: Phases 1–2 — Pre-Implementation & Project Preparation
summary: The activities and deliverables of the first two phases — team formation, feasibility and ROI, scope freezing, the RFP for package and partner, then the detailed plan, project charter, methodology choice and hardware sizing.
minutes: 12
tags: [pre-implementation, project-preparation, RFP, scope, steering-committee, project-charter, hardware-sizing, deliverables]
---

# Phases 1–2 — Pre-Implementation & Project Preparation

The question bank asks for **the critical (a) activities, (b) typical deliverables and (c) milestones** of each phase. Learn every phase in that three-part shape.

## Phase 1 — Pre-Implementation

### Activities — Pre-Implementation

> [!EXAM]
> - **Team formation**
> - **Feasibility / ROI / Business case**
> - **Budgeting**
> - **Requirements — collection, prioritization**
> - **Scope freezing** — typically at **function / module level**
> - **Partner / Package selection** — *at times partner selection is done early to support other activities.* **Who is first, partner or package? Merits in both cases**

### Team formation

> [!EXAM]
> Two bodies are formed, and the distinction is examinable:
>
> | Body | Composition |
> |---|---|
> | **Steering committee** | **Senior, more managerial** |
> | **Implementation team** | **Technical, product expert** |

> [!INTUITION]
> The split is **authority vs capability**. The steering committee cannot configure the software; the implementation team cannot approve a budget or overrule a department head.
>
> **You need both, and you need them separate.** This is also why *"top management support"* is a named people-challenge — if the steering committee is nominal, the implementation team has no way to resolve a dispute between two departments.

### Requirements definition

> [!EXAM]
> **Requirements definition — high level.** The deck is unusually blunt about why it is hard:
> - **Very tricky, conflicting organization politics**
> - **Limitations based on product / IT infrastructure**
> - **At times consultants are required to resolve**
> - **Leads to deep analysis of existing system**

> [!TRAP]
> **"Conflicting organization politics" is a stated cause of difficulty**, not an aside. Requirements conflict because **departments genuinely want different things** — the same Production-vs-Sales tension from Chapter 1, now surfacing as a specification problem.
>
> That is why **consultants are sometimes required to resolve it**: an outsider can arbitrate between two department heads in a way that a peer cannot.

### The RFP

> [!EXAM]
> **RFP — Package and/or Partner:**
> - **Is an intense activity**
> - **Cost not the only criterion**
> - **Selection may be based on corporate relationships!**

### Deliverables — Pre-Implementation

> [!EXAM]
> **Pre-Implementation deliverables:**
> - **Scope**
> - **High level plan**
> - **Selected team + partner + package**
> - **Contract agreements**
> - **Budget approvals**
> - **Contracts — drafting, finalization & approvals**

> [!INTUITION]
> **The deliverables tell you what the phase is *for*.** Every one is a **commitment**: an agreed scope, a chosen partner, a signed contract, an approved budget.
>
> **Pre-implementation is the phase where the organisation decides to spend the money.** Nothing has been built and nothing has been designed — what has happened is that the project has become real.
>
> This is also why **"scope freezing"** sits here. Freeze it too late and you cannot price the contract; freeze it too early and you commit before you understand. The corresponding risk — *"scope never gets finalized… analysis paralysis"* — is the first implementation challenge listed in Chapter 2.

## Phase 2 — Project Preparation

### Activities — Project Preparation

> [!EXAM]
> - **Team selection — internal and external**; **create proper structure**
> - **Detailed scope** — after reviewing/exploring
> - **Create project mission/vision (charter)** — should act as a **guideline for all concerned**, and is **also used for communication across**
> - **Decide implementation methodology — details**
> - **Standards / governance**
> - **Technical preparation:**
>   - **Solution architecture**
>   - **Hardware sizing and configuration design**
> - **Plan resources and schedules**
> - **Kick-off meeting**
> - **Overview / orientation training to senior & key people**

### Deliverables — Project Preparation

> [!EXAM]
> **Project Preparation deliverables:**
> - **Detailed plan**
> - **Vision and mission statements**
> - **Technical (software) design**
> - **Hardware sizing & configurations**
> - **Project plan**
> - **Resource plan**
> - **Training plan**
> - **Project charter**
>
> **All these need to be agreed by relevant stakeholders for this milestone achievement.**

> [!TRAP]
> **The project charter is a deliverable of Project Preparation, not Business Blueprinting.** The MCQ bank tests exactly this as a True/False:
>
> > *"Project charter is a deliverable of Business Blueprinting phase."* — **FALSE.**
>
> It belongs to **Phase 2**. Blueprinting delivers the **as-is model, detailed requirements, gap document and to-be process** — no charter.

> [!INTUITION]
> **Notice the word "detailed" repeating.** Pre-implementation produced a *high-level* plan and a *function-level* scope; Project Preparation produces the **detailed plan** and **detailed scope**.
>
> **The two phases do the same things at two resolutions**, and that is the cleanest way to distinguish them in an answer: *Phase 1 sizes and commits, Phase 2 details and organises.*

### Hardware sizing

> [!EXAM]
> **Hardware sizing is an important exercise in the early Evaluation / Preparation phase.** It **depends on:**
> - **Number of users**
> - **Number of transactions**
> - **Levels of reliability**
> - **Number of locations**
>
> **Caveat:** *"the situation with adopting cloud-based ERP could be different."*

> [!DERIVE]
> **Why sizing must happen this early, before anything is built.**
>
> Hardware is a **direct cost** and one of the largest — in the sample cost table, **200 lakhs** of a 1,914-lakh project. You cannot produce a credible budget in Pre-Implementation without it, and you cannot order long-lead servers late.
>
> But note the **circularity**: sizing needs the number of users and transactions, which depends on scope, which is being frozen in the same phase. **This is why sizing is revisited in Phase 2** and why the deck lists it in both.
>
> The cloud caveat matters because it **dissolves the problem** — with cloud ERP you scale on demand instead of guessing three years ahead, which is precisely the *"scalability"* advantage in the implementation-types table.

---

**Next:** designing and building it — **business blueprinting & realization**.
