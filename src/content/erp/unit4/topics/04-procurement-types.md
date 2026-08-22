---
subject: erp
unit: 4
order: 4
slug: procurement-types
title: Types of Procurement — Material vs Service, Direct vs Indirect
summary: The four procurement variants, the three-row material-versus-service comparison with its challenges, and the full six-row direct-versus-indirect table.
minutes: 11
tags: [material-procurement, service-procurement, direct-items, indirect-items, service-entry, e-procurement, PSU, MRO]
---

# Types of Procurement — Material vs Service, Direct vs Indirect

## The four variants

> [!EXAM]
> **Procurement process variants for different types of procurement:**
>
> 1. **Procurement of Materials and Services**
> 2. **Procurement of Direct and Indirect Items**
> 3. **Commodity Procurement**
> 4. **Govt. / PSU Procurement**
>
> *(**PSU = Public Sector Unit**, per the deck's own gloss.)*

> [!INTUITION]
> **Each variant breaks a different assumption of the standard cycle**, which is the cleanest way to hold why there are four:
>
> | Variant | Which assumption breaks |
> |---|---|
> | **Services** | *you can receive and store the thing* — **you cannot** |
> | **Indirect items** | *demand comes from the production plan* — **it comes from past consumption** |
> | **Commodities** | *the price is a number you negotiate* — **it moves with the market** |
> | **Govt / PSU** | *you may choose your vendor* — **procedure chooses for you** |
>
> **Goods receipt, MRP-driven demand, a fixed price, and free choice of vendor** are the four things the standard cycle takes for granted. Each variant removes one.

## Material vs service procurement

> [!EXAM]
> **Differences between material and service procurement:**
>
> | **Material Procurement** | **Service Procurement** |
> |---|---|
> | **Materials can be inventorized** | **Services can not be inventorized** |
> | **Specifications are clearly defined during material procurement** | **Sometimes it is difficult to define a service specification during procurement** |
> | **For a given specification price comparison is simple** | **For a given specification service price comparison is difficult — price may differ by time of purchase, ambience, etc.** |

> [!EXAM]
> **Typical challenges of service procurement** — *this is the question bank's exact ask:*
> - **Service cannot be inventorized**
> - **Difficult to specify service specifications**
> - **Price comparison is complex**
> - **Goods receipt is replaced by service entry and acceptance for service procurement**

> [!DERIVE]
> **All four challenges descend from one fact: a service does not exist as an object.**
>
> | Because a service is not an object… | …this follows |
> |---|---|
> | there is nothing to put on a shelf | **cannot be inventorized** |
> | there is nothing to measure or draw | **specification is hard to define** |
> | two instances are not identical | **price comparison is complex** |
> | nothing physically arrives at a gate | **GR is replaced by service entry and acceptance** |
>
> **The last one is the most examinable, because it is a concrete process change**, not just a difficulty. The standard cycle's **Goods Receipt** — *receive, inspect, put away, update stock and valuation* — has no meaning for a service. In its place:
>
> $$\textbf{Service Entry Sheet} \rightarrow \textbf{Acceptance} \rightarrow \textbf{Invoice Verification}$$
>
> Someone records **what work was performed**, and someone with authority **accepts** that it was performed satisfactorily. **Acceptance is a judgement where goods receipt was a measurement** — and that is precisely why service procurement is harder to control.
>
> The deck's *"price may differ by **time of purchase, ambience**"* is a nice concrete example: **the same hotel room is a different price on a Tuesday and during a conference**, and that is not a pricing error — it is what a service is.

> [!TRAP]
> **This is the same "services are different" caution that Unit 3 attached to MRP for services** — *"applying best practices and paradigms from manufacturing into the service industry is not easy; **dynamics involved are different**; objective assessments of capacity, performance, schedule adherence are difficult."*
>
> **Two chapters, one underlying reason: services cannot be inventoried and cannot be measured objectively.** If a question asks you to compare, the strongest answer names that root cause rather than listing surface differences.
>
> Note also the **Service Master / Service Catalog**, which appears in the procurement master data — the attempt to make service specifications reusable by cataloguing them, precisely because specifying them freshly each time is the problem.

## Direct vs indirect items

> [!EXAM]
> **Differences of procurement between direct and indirect items** — the deck's full six-row table:
>
> | | **Direct Items** | **Indirect Items** |
> |---|---|---|
> | **Demand** | **driven by market demand of end items** | **not driven by end item demand; mostly driven by past consumption trend** |
> | **Procurement dept involvement** | **much higher** — they must **collaborate with the supplier to design the component or product** | **much lower** — **mostly off-the-shelf items are procured** |
> | **Share of spend** | **generally a significant portion by value** of total monthly procurement spend | **generally a small portion by value** — **typically low value items** |
> | **Planning** | **through planning runs of MRP or Advanced Planning Systems** | **consumption based**; in some cases **purchase requisitions are created manually** |
> | **Who procures** | **always by the procurement team** | **procurement team and also the end user / employee**, through **E-Procurement or Portal** |
> | **Back-end ERP integration needed** | **much higher** — for reasons like **delivery schedule releases** | **lower** |

> [!INTUITION]
> **Direct items go into the product; indirect items keep the company running.** Steel and microchips are direct. Printer paper, cleaning services and laptop spares are indirect.
>
> **That one distinction generates all six rows.** Trace it:
>
> - Because direct items **go into the product**, their demand is **derived from what you sell** → MRP planning, market-driven demand.
> - Because they are **part of the product**, their design matters → **collaboration with the supplier to design the component**.
> - Because a product is made of many units of them → **large share of spend**, **high integration** for delivery schedules.
>
> And symmetrically, because indirect items **do not go into the product**, nothing derives their demand → **consumption-based planning**, small spend, **and the buyer can be the person who needs it.**
>
> **This is Unit 3's dependent vs independent demand exactly.** Direct = **dependent** = **MRP**. Indirect = **independent** = **CBP (Consumption Based Planning)**, and CBP's own description said it: *"more suited for class B, class C items… based on historical data patterns… does not have much relation to the finished product demand."*

> [!TRAP]
> **The "who procures" row is the one people get wrong**, and it is the most interesting.
>
> For **indirect** items, the deck says procurement can be done **by the end user / employee through E-Procurement or a Portal** — the employee orders their own stationery from a catalogue, without a buyer touching it.
>
> **That is a deliberate decision to stop controlling something.** A buyer's time spent negotiating a ₹500 order costs more than the order. So for low-value items, **the right control is a pre-approved catalogue with a spending limit** — not a purchasing professional.
>
> This is the same principle as **ESS** in HCM: **push the transaction to the person who wants it, and control by policy rather than by gatekeeping.** It is also exactly what the item-based strategy means when it gives MRO the driver *"purchase admin cost should be low."*

> [!EXAM]
> **Govt / PSU procurement**, the fourth variant, is characterised across the selection chapters by one binding rule: **the RFP process is a must for Public Sector Organizations.**
>
> Where a private company *may* run a competitive RFP, a public body **must** — because the requirement is not just a good price but a **defensible, auditable record** that the process was fair.

---

**Next:** the variant where the price itself is the problem — **commodity procurement & item-based strategy**.
