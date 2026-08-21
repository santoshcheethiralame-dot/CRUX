---
subject: erp
unit: 1
order: 12
slug: blueprint-realization
title: Phases 3–4 — Business Blueprinting & Realization
summary: As-is modelling, BPR, to-be design and gap analysis with their deliverables, then Realization as the creation of the system — configuration, gap-bridging customization and testing — and why customization is the chapter's central risk.
minutes: 12
tags: [business-blueprint, as-is, to-be, gap-analysis, BPR, realization, configuration, customization, testing]
---

# Phases 3–4 — Business Blueprinting & Realization

## Phase 3 — Business Blueprinting (Design)

### Activities

> [!EXAM]
> **The key step of reviewing business processes and the upcoming ERP system.**
>
> - **Model As-Is process**
> - **Detailed requirements** — via **workshops, current problems, other initiatives**
> - **Business Process Re-engineering**
> - **To-Be process**
> - **Gap analysis**
> - **Review / audit of blueprint**
> - **Core team training**

### Deliverables — Blueprinting

> [!EXAM]
> - **Current model (As-Is)**
> - **Detailed requirement**
> - **Gap document**
> - **Future To-Be process** — with all the details

> [!INTUITION]
> Blueprinting is **three documents and the difference between two of them**:
>
> $$\textbf{As-Is} \;\;+\;\; \textbf{To-Be} \;\;\Rightarrow\;\; \textbf{Gap}$$
>
> **As-Is** is how the company works today. **To-Be** is how it will work on the new system. **The Gap document is what the package cannot do out of the box** — and it is the single most consequential deliverable in the whole life cycle, because everything in it must either be **customized** (expensive, risky) or **absorbed by changing the business** (politically hard).
>
> **Gap analysis is where the project's real cost is decided.**

> [!EXAM]
> The MCQ bank asks: *"The most important step of ERP implementation is ______"* — the options are installing, training, **gap analysis** and testing. The answer is **gap analysis**.

> [!TRAP]
> **Why model the As-Is at all, if you are about to replace it?** This is a genuine exam question and the answer is threefold:
>
> 1. You cannot compute a **gap** without both sides of the comparison.
> 2. The current process encodes **undocumented rules** that exist for real reasons — regulatory checks, customer commitments. Discard them blindly and you break the business.
> 3. **BPR needs a baseline** — you cannot claim an improvement without knowing what you improved from.
>
> Note the systems view listed **"old processes and systems & procedures"** as an **input** to implementation for exactly this reason.

> [!EXAM]
> **Core team training happens here — in Blueprinting — not at Go Live.** The core team must understand the package **before** they can design the to-be process on it. **End-user training is a different activity in a different phase (Final Preparation).**
>
> The MCQ bank distinguishes them: *"the phase in which the actual users of the system will be given training"* → **End user training**.

## Phase 4 — Realization (Build)

> [!EXAM]
> Realization **is the "creation" of the new system, with all the ground work and information gathered so far.** It involves **designing, building, testing and packaging for deployment**:
>
> - **Configuration**
> - **Gap bridging developments / customization**
> - **Unit + Integration testing**
> - **Training plan on the new system for end users**

### Deliverables — Realization

> [!EXAM]
> - **Configured / modified software** — along with **installation scripts**
> - **Technical documentation** on deployment and hardware configuring
> - **Quality check documentation**
> - **Final functional / technical specifications**
> - **End user training material**
> - **Data / system migration document**

> [!INTUITION]
> **Configuration and customization are not the same thing**, and the distinction is the most important one in this phase:
>
> | | **Configuration** | **Customization** |
> |---|---|---|
> | What it is | Setting the options the package already provides | **Code-level changes** to the base package |
> | Risk | Low | **High** |
> | Survives an upgrade? | **Yes** | Often **not** |
>
> **Configuration is filling in the form; customization is rewriting the software.** Every gap should be closed by configuration if it possibly can be.

### Customization — the chapter's central risk

> [!EXAM]
> **Customization is when identified gaps need "code level" changes to the base package.**
>
> - **ERP (is a framework!) allows for modifying the behavior**
> - **Lot of care and expertise required**
> - **Should not break the logic of the base system**
>
> **Risks:**
> - **Stability of base functionality**
> - **Deviating from best practice**
> - **Maintainability**

> [!DERIVE]
> **Trace the three customization risks forward and you find them again in later phases** — which is why this is the chapter's central risk rather than one item among many:
>
> - **Stability** → you can break working functionality that the vendor tested and you did not.
> - **Deviating from best practice** → the deck lists *"brings best practices"* as **benefit #1** of ERP. **Customize heavily and you forfeit the main benefit you paid for**, because you have replaced the vendor's proven process with your own old one.
> - **Maintainability** → the Support phase states it explicitly: *"Upgrades can be difficult if too much customization done during implementation."*
>
> **The deepest point:** a gap is usually a sign that **your process differs from the industry standard**. Sometimes that difference is your competitive advantage and is worth customizing for. **Usually it is just habit** — and the cheaper, better answer is to change the business, not the software. That decision is BPR, and it is why BPR sits inside the Blueprint phase.

> [!TRAP]
> **Testing in Realization is unit + integration testing only.** The heavier tests — **stress, volume and system tests, and user acceptance** — belong to **Final Preparation**.
>
> Note also that **data migration** appears in this phase only as a **document**; the actual migration happens at Go Live. The MCQ bank asks *"in which phase is data conversion carried out?"* → **Going live**.

---

**Next:** switching it on and keeping it running — **final preparation, go live & support**.
