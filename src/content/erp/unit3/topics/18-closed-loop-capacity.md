---
subject: erp
unit: 3
order: 18
slug: closed-loop-capacity
title: Closed-Loop MRP & Capacity Planning
summary: MRP's seven stated limitations, why infinite planning makes the loop necessary, the capacity balancing problem, and the four levels of capacity planning each paired with its planning level.
minutes: 11
tags: [closed-loop-MRP, infinite-planning, limitations, capacity-planning, RCCP, CRP, resource-planning, APS]
---

# Closed-Loop MRP & Capacity Planning

## MRP's limitations

> [!EXAM]
> **MRP Limitations:**
>
> 1. **It only projects how much material or capacity is required to meet the sales forecast**
> 2. **Cannot consider actual capacity available on the shop floor, constraints and vendor's limitations, and plan accordingly**
> 3. **Cannot do any optimization**
> 4. **Requires very high accuracy of data** — i.e. bill of material data, system stock etc.
> 5. **Cannot replan fast enough**
> 6. **Requires high user discipline**
> 7. **Not appropriate for all areas** like **Project or Engineer-to-Order type of manufacturing**, as here **every new order has a unique Bill of Material**

> [!INTUITION]
> The seven fall into **three kinds of limitation**, which makes them easier to reproduce and to discuss:
>
> | Kind | Limitations |
> |---|---|
> | **What it cannot see** | 1, 2 — it ignores **actual capacity, constraints and vendor limits** |
> | **What it cannot do** | 3, 5 — no **optimization**, no **fast replanning** |
> | **What it demands of you** | 4, 6 — **very accurate data** and **high user discipline** |
> | **Where it does not fit** | 7 — **ETO / project manufacturing** |
>
> Limitations **4 and 6 are the ones that bite in practice.** MRP's arithmetic is only as good as the BOM and the stock figures — this is Unit 1's *"Garbage In, Garbage Out… only 1 out of 3 companies are sure of their data quality"* landing in production planning. **An MRP run on a wrong BOM confidently orders the wrong parts.**
>
> The deck's own note is balanced: *"Many of the limitations are drawbacks **in comparison to other products**; also, in some cases **there may not be better alternatives**. One can say these are **pointers for improvement**."*

> [!TRAP]
> **Limitation 7 is the same ETO/MTO/MTS spectrum** that shaped product costing and MPS expression.
>
> MRP assumes a **stable BOM** you can explode repeatedly. In **engineer-to-order** — shipbuilding, office interiors — *"every new order has a unique Bill of Material"*, so there is nothing stable to explode. **Those industries plan by project, not by MRP.**

## Closed-loop MRP

> [!EXAM]
> **MRP is known as an infinite planning tool** — *i.e. it does not consider available capacity information while planning (**assumes capacity is infinite**).*
>
> - **This means MRP can give production or procurement plans which are not executable**, as the amount of factory or supplier capacity needed **is not available**
> - **So it is important to do a reality check of the plan**
> - **If the plan is not executable, then the production plan for finished goods needs to be changed at the master production schedule (MPS) stage, and a fresh MRP run is needed**
> - **Thus MRP is a process of iterative planning** — **that's why this is also known as closed-loop MRP**

> [!EXAM]
> **The closed loop, as the deck draws it:**
>
> $$\textbf{S\&OP} \rightarrow \textbf{MPS} \rightarrow \textbf{MRP} \rightarrow \textbf{Capacity Requirements Planning} \rightarrow \textbf{Realistic?}$$
>
> - **No** → **feedback** back up to MPS, and re-run
> - **Yes** → **Execute: Production Plans · Material Plans · Capacity Plans**

> [!DERIVE]
> **"Infinite planning" is the precise name for MRP's central flaw, and it is worth being able to explain the mechanism.**
>
> MRP works **backwards from the schedule** through the BOM and lead times. That arithmetic is perfectly correct and says **nothing whatever about whether the factory can do the work.** It will happily produce a plan requiring 300 machine-hours in a week when the plant has 120.
>
> **Closing the loop means checking the plan against real capacity and, if it fails, going back up to MPS and changing what you promised to build.** The word *"loop"* is literal — output feeds back to input.
>
> This is exactly what Unit 1 said about closed-loop MRP: *"the MRP plan generated does not consider the feasibility of the plan… in Closed Loop MRP the plan is **validated, compared with reality and checked for feasibility**, and **alerts and triggers are reported to the planner**."* **The MCQ-bank true/false — "Closed loop MRP checks feasibility of the MRP plan" — is TRUE.**
>
> Note also **where the correction is applied**: not at MRP, but **back at MPS**. If capacity cannot support the plan, the answer is to build fewer finished products — which changes what sales can promise. **The constraint propagates upward.**

## Capacity planning

> [!EXAM]
> **The balancing problem:**
>
> - **A** — at any time, organizations have **"defined" resources / limited capacity**: **plants, machines, people, raw material stock**
> - **B** — **customer needs might fluctuate up / down**: type, quantity, timelines for products
> - **A is not directly linked to B. Hence a mismatch results in:**
>   - **Under-utilization**
>   - **Overload / insufficient capacity**
> - **Capacity planning is to balance A & B** using strategies like **overtime, outsourcing, sub-contracting to create extra capacity**
>
> **Knowing the exact capacity required of everything needed is non-trivial.**

> [!INTUITION]
> **The mismatch is structural, not a planning failure.** Capacity is **fixed in the short run** — you cannot buy half a machine or hire a skilled operator for one afternoon. Demand is **continuously variable**. Two quantities that move differently cannot match by themselves.
>
> So the mismatch always shows up as **one of two costs**: idle capacity you are paying for, or demand you cannot serve. The listed strategies — **overtime, outsourcing, subcontracting** — are all ways of **buying short-term capacity at a premium** rather than owning it year-round.
>
> This is the same **Level vs Chase** trade-off from S&OP: absorb variation in **inventory**, or absorb it in **capacity**.

> [!EXAM]
> The deck's note on who does this and why it matters commercially:
>
> > *"Capacity planning is typically a **'higher order' managerial task**. Needs good domain expertise and ground reality awareness. **In services business, capacity planning is quite crucial since this dictates the cost estimations and hence the quote pricing** — so this is also a **competitive parameter**."*

## The four levels of capacity planning

> [!EXAM]
> **MRP II suggests capacity planning at different levels — each paired with a planning level:**
>
> | Capacity technique | Planning level it checks |
> |---|---|
> | **Resource Planning (RP)** | **S&OP** |
> | **Rough Cut Capacity Planning (RCCP)** | **MPS** |
> | **Capacity Requirement Planning (CRP)** | **MRP** |
> | **Capacity Control (CC)** | **PAC** — Production Activity Control and detailed scheduling on the shop floor |

> [!INTUITION]
> **Every planning level has a matching capacity check.** That symmetry is the single most examinable structure in the topic:
>
> $$\begin{aligned}\textbf{S\&OP} &\longleftrightarrow \textbf{RP} \\ \textbf{MPS} &\longleftrightarrow \textbf{RCCP} \\ \textbf{MRP} &\longleftrightarrow \textbf{CRP} \\ \textbf{PAC} &\longleftrightarrow \textbf{CC}\end{aligned}$$
>
> And the checks get **finer as you descend**, exactly like the plans they check. **Resource Planning** asks a rough question about whole plants over months; **Capacity Control** manages actual machine loading on a shift.
>
> **"Rough Cut" is named honestly** — at MPS level you check capacity only against the few **critical resources** (bottleneck machines, key labour), not everything, because the plan itself is not detailed enough to justify more.
>
> Note the deck's split of the diagram into **Planning** (Business Plan, S&OP, MPS, MRP with RP, RCCP, CRP) and **Execution** (PAC with Capacity Control) — the same boundary as level 5 of the five-level model.

> [!EXAM]
> The deck's note on the gaps between levels:
>
> > *"Generally there will be **gaps between each planning level and also with execution levels**. Modern enterprises are complex and **the possibility of things deviating from plan is always there**. So plans need to be tracked at each level and **kept refining at lower levels**, adjusting to deviations from preceding steps."*

## How ERP supports capacity management

> [!EXAM]
> **ERP Support for Capacity Management:**
> - **Capacity evaluation — at each resource level**
> - **Scheduling of orders based on capacity**
> - **Allow processing of orders in parts to match capacity**
> - **Schedule with forward planning feature**
>
> **Most of these are semi-automated and need "manual" actions.**
>
> **Specialized Supply Chain apps with APS — Advanced Planning and Scheduling — have a much better capability here.**

> [!TRAP]
> The deck is candid: **"ERP's support for capacity management is a little indirect."**
>
> This is an honest admission worth repeating in an answer. ERP **evaluates** capacity and **presents** the conflict, but the resolution — overtime, subcontract, re-sequence — is largely a **human decision** made outside the system.
>
> That gap is exactly the market that **APS** fills, and it explains why APS is one of the six **Extended ERP (SPACES)** applications from Unit 1: *"optimizes production planning, resource allocation and scheduling… helps forecast demand, **balance production capacity**, and improve delivery performance."*
>
> **APS is the descendant of closed-loop MRP** — both exist because plain MRP assumes infinite capacity.

> [!EXAM]
> **The MCQ-bank answer worth noting:** *"The __________ planning features of most ERP systems offer both rough cut and detailed capacity planning."* → **capacity**.

---

**Next:** the data all of this runs on — **master data for production planning**.
