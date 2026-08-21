---
subject: erp
unit: 1
order: 13
slug: golive-support
title: Phases 5–6 — Final Preparation, Go Live & Support
summary: The ten final checks before cut-over, the go-live itself with parallel runs and phased switchover, implementation closure and harvesting, then the Support phase with SLAs, upgrades and the handover from implementation to support team.
minutes: 12
tags: [go-live, cut-over, final-preparation, parallel-run, closure, support, SLA, upgrades, help-desk]
---

# Phases 5–6 — Final Preparation, Go Live & Support

## Phase 5 — Final Preparation and Go Live

### The final checks

> [!EXAM]
> **The ten final checks before cut-over:**
>
> 1. **Stress / volume / system tests**
> 2. **User acceptance**
> 3. **End user training**
> 4. **Data migration**
> 5. **Set up Help Desk / resource teams**
> 6. **Audit by external team**
> 7. **Communications to all stake-holders** — **cut-over date**, clearly specifying **what to expect and what not to**, with **agreement and commitment by all**
> 8. **Contingency plans for the "cut-over"**
> 9. **Hardware / network infrastructure availability**
> 10. **Go / No-Go**

> [!INTUITION]
> The list is in a defensible order and reads as a sequence of gates:
>
> - **1–2 test the system** (does it work, and does the business agree it works)
> - **3–4 prepare the people and the data**
> - **5–6 put the safety nets in place** (help desk, external audit)
> - **7–9 prepare the organisation** (tell everyone, plan for failure, check the infrastructure)
> - **10 is the decision**
>
> **"Go / No-Go" being last is the point.** Everything before it is evidence; the switchover is a **decision that can still be refused**.

> [!TRAP]
> **"Audit by external team"** matters for the same reason external penetration testers do: **you cannot impartially certify your own work.** The team that built the system is the worst-placed group to judge whether it is ready.
>
> And note item 7's phrasing — communicate **"what to expect and what not to."** Setting expectations *downward* is as important as setting them up. This is **expectation management**, listed separately as an implementation challenge: *"ERP cannot solve all the problems of the company."*

### Go Live / Cut-Over

> [!EXAM]
> - **Switch over to the new system**
> - **Execute parallel runs of the old system for a defined period**
> - **Help Desk & hand-holding & escalation management**
> - **Typically done in phases / batches across the affected organization**
> - **Fine-tune configuration issues**
> - *"Keep waiting for **bouquets and brick-bats**!"*

> [!DERIVE]
> **Why run the old system in parallel**, given the expense of operating two systems at once?
>
> Because **cut-over is the least reversible moment in the project**. If the new system produces a wrong number, the parallel run is the only way to *detect* it — you compare the two outputs. And if the new system fails outright, the old one is still running, so the business does not stop.
>
> **A parallel run is an insurance policy**, and its cost is exactly the premium. The deck pairs it with **"contingency plans for the cut-over"** for the same reason.
>
> **"Typically done in phases / batches"** is the other risk control — and it is the **Rollout** deployment strategy applied to the moment of switchover. Big-bang cut-over across every location at once is possible, and it is the highest-risk option available.

### Implementation closure

> [!EXAM]
> - **Closure meeting**
> - **Final acceptance sign-off**
> - **Create a small activity team to "harvest":**
>   - **Knowledge**
>   - **Re-usable parts**
>   - **Marketing / branding materials**

> [!INTUITION]
> **"Harvesting" is the step almost every project skips**, and its three targets are aimed at three different beneficiaries:
>
> - **Knowledge** → the *next* project inside this company
> - **Re-usable parts** → the *implementation partner*, who can now deploy faster elsewhere
> - **Marketing / branding materials** → the partner again, as a **reference case**
>
> This is how implementation **methodologies** get built in the first place: the deck says they *"got developed through 100s of implementation best practices."* **Harvesting is the mechanism by which one project's experience becomes the next project's method.**

## Phase 6 — Support

> [!EXAM]
> The Support phase is the **new system stabilization, fine tuning and "look ahead" phase**:
>
> - **Handover from implementation team to support team — in a staggered manner**
> - **Work on open issues**
> - **Execute support activity as per SLA**
> - **Measure and improve performance**
> - **Ensure "business-class" operations** — **reliability, availability, data backup**
> - **Develop hooks and interfaces across other, second-line applications**

> [!TRAP]
> **"Staggered manner"** is a deliberate word. The implementation team **cannot** hand over on day one and leave — they hold knowledge that exists nowhere else, and the system is least stable immediately after go-live.
>
> This connects to two named challenges: **"getting the right people"** for support, and **"extending core team for support"** under people challenges. **The people who built it are the people who can fix it, and they want to move on to the next project.**

### Upgrades

> [!EXAM]
> - **Happens when there are significant product upgrades**
> - **Can be difficult if too much customization was done during implementation**
> - Requires **backup, roll back, regression testing**
> - **Documentation upgrades**

> [!INTUITION]
> This is the **bill for customization arriving**, years later and paid by a different team.
>
> Every code-level change made in Realization must be **re-applied and re-tested** against each new vendor release. A heavily customized ERP can become effectively un-upgradable — which is how organisations end up on **obsolete versions**, one of the six support challenges: *"technology obsolescence."*
>
> **The decision made in Phase 4 determines the cost of Phase 6 forever.** That is the strongest argument the chapter makes for configuring rather than customizing.

### The support life cycle

> [!EXAM]
> Recall the equation: **ERP Lifecycle = ERP Implementation Life cycle + ERP Support Life cycle.**
>
> Support is not an epilogue — it is **half the life cycle**, and it never ends while the system is in use. This is why the deck lists **"maintenance itself as a (sizeable) service"** as an emerging market trend, and why **post-implementation support cost** is its own line in the Chapter 3 cost table (**250 lakhs** in the sample, against 800 lakhs of implementation consulting).

> [!DERIVE]
> **A useful check on the whole chapter.** Place each item in its phase:
>
> | Activity | Phase |
> |---|---|
> | Package and partner selection | **1 — Pre-Implementation** |
> | Project charter | **2 — Project Preparation** |
> | Gap analysis | **3 — Business Blueprinting** |
> | Configuration and customization | **4 — Realization** |
> | Data migration / conversion | **5 — Go Live** |
> | End user training | **5 — Final Preparation** |
> | Core team training | **3 — Blueprinting** |
> | SLA-based operations | **6 — Support** |
>
> The two most-tested rows are the **two trainings in two different phases**, and **data migration being a *document* in Phase 4 but the *act* in Phase 5**.

---

**Next:** the branded processes that structure all of this — **implementation methodologies**.
