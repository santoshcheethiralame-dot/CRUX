---
subject: erp
unit: 1
order: 5
slug: evolution-mrp-to-erp2
title: Evolution — MRP to ERP II
summary: The decade ladder from MRP through closed-loop MRP, MRP II, ERP and Extended ERP, what each stage added and what problem it fixed, and the closed-loop MRP distinction that the QnA singles out.
minutes: 12
tags: [MRP, closed-loop-MRP, MRP-II, ERP, ERP-II, extended-ERP, evolution, timeline, feasibility]
---

# Evolution — MRP to ERP II

## The decade ladder

> [!EXAM]
> | Period | ERP outlook |
> |---|---|
> | **1960–70s** | **MRP — Material Requirement Planning.** Inventory and process time reduction with new production planning systems |
> | **1980s** | **MRP II — Manufacturing Resource Planning.** Greater reduction due to **integration with accounting, billing** |
> | **1990s** | **ERP.** All processes integrated; collaboration with other enterprise apps like CRM, SRM; **supports non-manufacturing too** |
> | **2000s** | **Extended ERP or ERP II.** Focused on clients, **optimizing the whole business network — including suppliers and clients** |

> [!INTUITION]
> **Mnemonic — one decade, one step, and the scope doubles each time:**
>
> $$\textbf{MRP} \xrightarrow{\text{+ capacity}} \textbf{Closed-loop MRP} \xrightarrow{\text{+ money}} \textbf{MRP II} \xrightarrow{\text{+ everything else}} \textbf{ERP} \xrightarrow{\text{+ outside the company}} \textbf{ERP II}$$
>
> Track what each arrow adds and you never confuse the stages:
>
> - **MRP** — *materials* only
> - **Closed loop** — materials **checked against capacity**
> - **MRP II** — plus **accounting and billing** (money joins the plan)
> - **ERP** — plus **every other function**, and no longer manufacturing-only
> - **ERP II** — plus **suppliers and customers** (the wall around the company comes down)
>
> Notice the boundary moves outward exactly twice: at **ERP** it crosses from the factory to the whole company; at **ERP II** it crosses from the company to the network.

> [!TRAP]
> Watch the two expansions of "MR":
>
> - **MRP = Material Requirement Planning**
> - **MRP II = Manufacturing Resource Planning**
>
> Both words change, not just the numeral. **"Material" becomes "Manufacturing"** and **"Requirement" becomes "Resource"** — which is precisely the widening from *what parts do I need* to *what resources does the whole plant need*. The MCQ bank asks you to expand **MRP** in a fill-in-the-blank, so get the exact words.

## MRP — Material Requirement Planning

> [!NOTE]
> MRP **basically addressed material planning problems**, and was later **enhanced by closed-loop MRP solutions**.
>
> The question bank asks: *"How do MRP systems work? What fundamental problems do they solve for manufacturers?"* — the fundamental problem is **having the right materials, in the right quantity, at the right time**, computed from the production schedule and the bill of materials rather than guessed.

## Closed-loop MRP — the examinable distinction

> [!EXAM]
> **Q: How is closed-loop MRP different from MRP?**
>
> **A.** The MRP plan generated **does not consider the feasibility of the plan**, since it **does not consider the capacity available while planning**. In **closed-loop MRP** the plan generated is **validated, compared with reality and checked for feasibility**. **Alerts and triggers are reported to the planner** to take appropriate steps if any issues are found.
>
> The MCQ bank states it as a True/False: **"Closed loop MRP checks feasibility of the MRP plan." — TRUE.**

> [!DERIVE]
> **Why plain MRP produces impossible plans.** MRP works backwards from the schedule:
>
> > *"To ship 1,000 laptops on the 30th, I need 1,000 processors by the 20th, so order them on the 5th."*
>
> That arithmetic is correct and **says nothing about whether the factory can actually build 1,000 laptops that month.** MRP assumes **infinite capacity** — infinite machines, infinite labour, infinite hours.
>
> **Closed-loop MRP closes the loop** by feeding actual capacity and actual shop-floor status back into the plan and **checking it before committing.** The word *"loop"* is literal: output is fed back to the input.
>
> **One line for the exam: MRP plans as if capacity were unlimited; closed-loop MRP checks the plan against real capacity and raises alerts.**

## MRP II — Manufacturing Resource Planning

> [!EXAM]
> **MRP II addresses traditional gaps by incorporating forecasting, sales and operations planning**, and integrates with **accounting and billing**.
>
> The question bank asks directly: *"What are the additional processes included in MRP II over MRP?"* — **forecasting, sales & operations planning, accounting and billing**, on top of material planning and capacity.

> [!INTUITION]
> MRP II is where the plan first acquires a **money dimension**. MRP could tell you *what to buy*; MRP II could tell you *what it will cost and whether you can afford it*, because accounting is now inside the same system.
>
> That matters for the story the course is telling: **integration with Finance is the first cross-functional integration in the whole history**, and it is the template for everything ERP later did with HR, sales and service.

## ERP

> [!EXAM]
> **ERP encompasses every process within the organization.**
>
> Two things happen at this stage, and both are examinable:
> 1. **All processes are integrated** — not just manufacturing ones
> 2. **ERP supports non-manufacturing organizations too** — banks, hospitals, universities, telecoms

> [!TRAP]
> **"ERP is only for manufacturing companies" is listed as a misconception**, and the deck explains exactly why people believe it: *"due to the origins of ERP — MRP → MRP II → ERP."*
>
> The lineage really is a manufacturing lineage. But by the 1990s the scope had widened past it, which is why the industries list includes **Retail (FMCG), Healthcare, Telecom & Utilities, Banking & Insurance (BFSI), Transportation and Education** alongside the manufacturing verticals.
>
> **The evolution explains the myth and refutes it at the same time** — a good structure for a written answer.

## Extended ERP / ERP II

> [!EXAM]
> **Extended ERP (ERP II)** is **focused on clients, optimizing the whole business network — including suppliers and clients.**
>
> The applications added at this stage are **SCM, CRM, PLM, APS, SRM and EAM** — covered in the next topic.

> [!INTUITION]
> The defining move of ERP II is that the system **crosses the company boundary**.
>
> Classic ERP integrates everything *inside* the enterprise. ERP II reaches **outward to suppliers (SRM, SCM) and customers (CRM)**. That is why the textbook definition ends with the clause students so often drop: *"...and with **external stakeholders**."*
>
> The Agilent case shows the same move in practice — its ERP objective was explicitly **"supply chain capability; for example, suppliers, customers."**

## The whole evolution in one picture

> [!EXAM]
> The deck's arrow diagram, bottom to top:
>
> **MRP** *(material planning, enhanced by closed-loop MRP)* → **MRP II** *(forecasting, sales & operations planning)* → **ERP** *(every process within the org)* → **SCM · CRM · PLM · APS · SRM · EAM**
>
> Note the top of the arrow is **not a single successor** — it fans out into six named applications. **ERP II is a family, not a product.**

> [!DERIVE]
> **A one-question self-test that catches the common confusions.** Place each of these on the ladder:
>
> | Capability | Stage |
> |---|---|
> | Compute what parts to order from the BOM | **MRP** |
> | Check the plan against available machine capacity | **Closed-loop MRP** |
> | Cost the production plan and raise the invoice | **MRP II** |
> | Run payroll and recruitment in the same system | **ERP** |
> | Let a supplier see your demand forecast directly | **ERP II** |
>
> If you can place all five, you can answer any evolution question — including *"what were the four major drivers of the ERP revolution in the last four decades?"*, since those four decades are exactly this ladder.

---

**Next:** the six applications the arrow fans out into — **extended ERP (SPACES)**.
