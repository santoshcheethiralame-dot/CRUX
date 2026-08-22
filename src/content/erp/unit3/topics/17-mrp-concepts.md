---
subject: erp
unit: 3
order: 17
slug: mrp-concepts
title: MRP Concepts & Procedures
summary: The eight MRP fundamentals — planning horizon, low-level code, lot sizing, backward scheduling with its requisition-date formula, time fences and exception messages — plus MRP for service industries.
minutes: 11
tags: [planning-horizon, lot-sizing, backward-scheduling, time-fences, exception-messages, service-MRP, bill-of-labour]
---

# MRP Concepts & Procedures

## The eight fundamentals

> [!EXAM]
> **MRP Fundamentals — the deck's list:**
>
> 1. **Planning Horizon**
> 2. **Planning sequence and Low-level code**
> 3. **Dependency related**
> 4. **Gross & Net Requirement calculations**
> 5. **Lot Sizing Procedures**
> 6. **Backward Scheduling**
> 7. **Time Fences**
> 8. **Exception Messages**
>
> *(Items 2 and 4 were worked through in the previous topic.)*

## Planning horizon

> [!EXAM]
> **Defined as the period for which the planning is done.**
>
> *"For example, if the planning horizon is the next one month, the **demand elements of next one month are only considered** for planning. **This necessitates the planning run to happen on a regular basis** — in this case monthly once."*

> [!INTUITION]
> The horizon creates an obligation: **because you only plan a window, you must re-plan when the window moves.** A one-month horizon means a monthly run; a weekly review of MRP (as the five-levels table specifies) means a weekly run.
>
> This is the *"rolling"* nature of MRP — it is not a plan made once but **a plan continually recomputed as the horizon slides forward**, which is why *"timely and accurate replanning"* is named as MRP's major strength.

## Lot sizing

> [!EXAM]
> **Different lot sizing procedures supported in ERP:**
>
> | Type | Procedures |
> |---|---|
> | **Static procedure** | **Lot-for-lot order quantity** · **Replenish to maximum stock level** · **Fixed lot size** |
> | **Periodic procedure** | **Daily lot size** · **Weekly lot size** · **Monthly lot size** · **Planning calendar** |

> [!INTUITION]
> **Why not simply order exactly what you need, when you need it?** That *is* **lot-for-lot**, and it minimises inventory — but it also means ordering constantly, in small quantities.
>
> The deck's note gives the reason for the alternatives:
>
> > *"Lot sizing is primarily for **optimizing** — **transportation / packing costs and other overheads** should be optimally calculated and timed."*
>
> Every order carries a **fixed cost** regardless of size — a delivery, a machine setup, paperwork. **Lot sizing trades that ordering cost against inventory holding cost.** *Static* procedures fix the **quantity**; *periodic* procedures fix the **interval** — order once a week, whatever the week needs.

## Backward scheduling

> [!EXAM]
> **When delivery dates for finished products are known / committed**, things to consider are the **raw material requirement date** and the **processing time**.
>
> **The formula:**
>
> $$\textbf{Purchase requisition date} = \textbf{MRP date} - \textbf{GR processing time} - \textbf{Vendor lead time} - \textbf{Purchasing processing time}$$
>
> *(GR = Goods Receipt)*

> [!DERIVE]
> **Backward scheduling works from the deadline backwards**, subtracting every delay that stands between the order and the material being usable:
>
> | Subtract | Because |
> |---|---|
> | **Goods Receipt processing time** | material arriving at the gate is not yet available — it must be received, inspected and put away |
> | **Vendor / supplier lead time** | the supplier needs time to deliver after being ordered |
> | **Purchasing processing time** | your own purchasing department needs time to turn a requisition into an order |
>
> **Three delays, three subtractions.** The one most often forgotten is the **first** — teams plan back to the delivery date rather than to the *available-for-production* date, and lose the goods-receipt window.
>
> The deck's note: *"Backward planning is almost always there whenever there is a **constraint based delivery** — e.g. based on time, budget."*
>
> Note the contrast with **forward scheduling**, which appears under ERP's capacity support: *"schedule with forward planning feature."* **Backward asks "when must I start to finish on time?"; forward asks "if I start now, when will I finish?"**

## Time fences

> [!EXAM]
> **Time fences — four zones by distance from the due date:**
>
> | Zone | Time to due date | Change allowed |
> |---|---|---|
> | **Frozen** | **1–2 weeks** | **No change** |
> | **Firm** | **2–4 weeks** | **± 5%** |
> | **Full** | **4–6 weeks** | **± 10%** |
> | **Open** | **6+ weeks** | **± 20%** |

> [!INTUITION]
> **Mnemonic — three F's and an O: Frozen, Firm, Full, Open** — and **the further away, the freer you are.**
>
> The logic is **commitment**. Material within two weeks of the due date has already been ordered, delivered and possibly started on the machine — changing it wastes money that is already spent. Six weeks out, nothing is committed, so a 20% swing costs nothing.
>
> **This is the mechanism that reconciles two opposing needs**: manufacturing wants a stable schedule to be efficient, sales wants flexibility to serve customers. Time fences give both — **stability near in, flexibility far out** — instead of a single answer that fails one side.
>
> It also explains the MPS input list: **forecasts drive the far horizon, actual orders drive the near one.** The fence is where the handover happens.

## Exception messages

> [!EXAM]
> **Exceptions:**
> - **Getting values that are outside the expected range / impossible**
> - **Below safety stock**
> - **Needs to be corrected and re-run**
> - **Prioritize the messages → take action**

> [!INTUITION]
> An MRP run over thousands of items produces **thousands of planned orders**, and no planner can review them all. **Exception messages are how the system directs human attention** — it flags only what is impossible or dangerous.
>
> Note **"prioritize the messages"**: even the exceptions can be too many. And **"needs to be corrected and re-run"** — MRP is iterative, which connects directly to **closed-loop MRP** in the next topic.

## MRP for service industries

> [!EXAM]
> **Service MRP:**
> - **The same principles can be applied to service industries**
> - **Bill Of Service!** · **Bill Of Labour**
> - **Specially suited for varied load conditions** — **hotels, retail**

> [!TRAP]
> The deck attaches a genuine caution:
>
> > *"Applying best practices and paradigms from manufacturing into the service industry **is not easy**. **Dynamics involved are different.** Objective assessments of **capacity, performance, schedule adherence are difficult**."*
>
> A **Bill of Labour** is the service analogue of a BOM — *this service requires 2 hours of a senior technician and 1 hour of a junior* — and it explodes the same way. But services differ in ways that break the analogy: **capacity cannot be inventoried** (an unsold hotel room tonight is gone forever), and **quality is harder to measure objectively**.
>
> **So the principle transfers; the precision does not.** That is a fair and creditable answer if asked whether MRP applies to services.

---

**Next:** MRP's central weakness and the answer to it — **closed-loop MRP & capacity planning**.
