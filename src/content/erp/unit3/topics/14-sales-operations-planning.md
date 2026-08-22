---
subject: erp
unit: 3
order: 14
slug: sales-operations-planning
title: Sales & Operations Planning (S&OP)
summary: S&OP as the process that balances demand against supply feasibility, why planning happens at product group level, the six input categories, the basic factors it optimises, and how ERP supports it.
minutes: 11
tags: [SOP, demand, supply, product-group, forecast, make-to-stock, make-to-order, level, chase, version-management]
---

# Sales & Operations Planning (S&OP)

## What S&OP is

> [!EXAM]
> **The process of matching (or balancing) demand with supply feasibility plan is called S&OP.**
>
> - **Without this, sales & marketing and production factory and procurement would work independently**
> - **Typically, planning is done at product group level** — groups **that have similar demand characteristics and common processes**
>   *Example: detergent cake, detergent bar…*

> [!TRAP]
> **S&OP stands for Sales and Operations Planning** — one of the pasted MCQs offers *"Standard and Operating Process"*, which is **FALSE**.

> [!INTUITION]
> **"Without this, sales & marketing and production factory and procurement would work independently"** is the *Production → Quantity, Sales → Variety* conflict of Unit 1, now given a **named process to resolve it.**
>
> S&OP is literally the meeting where the two sides are forced to agree on **one set of numbers**: Sales says what it intends to sell, Operations says what it can make, and the plan is the reconciliation. **That is why it is described as "balancing" rather than "forecasting."**
>
> The deck's gear-chain diagram makes the same point visually: **Supply on one side, Demand on the other, S&OP as the gear between them** — with *"increasing costs"* if you push one way and *"decreasing service"* if you push the other, and **targeted service and costs** in the middle. Its note adds: *"in a **sales-driven** organization the green wheel drives the rest of the chain; in a **production-driven** system it drives the rest."*

### Why at group level?

> [!EXAM]
> The deck poses the question directly: **"Why at Group level?"** — groups are chosen for **similar demand characteristics and common processes.**

> [!DERIVE]
> **Three reasons, and any is worth marks:**
>
> **Forecast accuracy.** Forecasts for a *group* are far more reliable than for individual items. You may not know whether customers will buy the 500 g or the 1 kg detergent pack, but total detergent demand is stable. **Aggregation cancels out item-level noise.**
>
> **Capacity is shared.** Items with **common processes** compete for the same machines, so the capacity question is a group question. Planning them separately would miss the contention.
>
> **Tractability.** A company with thousands of SKUs cannot hold a monthly management discussion about each one. **Groups reduce the plan to something a meeting can actually decide.**
>
> The detail arrives one level down: **MPS plans at end-product level.** So S&OP decides *how much detergent*, and MPS decides *which packs*.

## The inputs

> [!EXAM]
> **Sales and Operations Planning — inputs**, in six categories:
>
> | Category | Inputs |
> |---|---|
> | **Demand** | **Consensus forecast** · Promotion plan · **Business plan** · Inputs from customer |
> | **Operations** | **Current machine capacity** · Workforce capacity · Future requirements |
> | **Materials** | **Current supplier capacity** · Future requirements · **Materials storage capacity** |
> | **Finance** | **Revenue and margin requirement** · **Working capital requirements** · Other financial objectives |
> | **New Products** | **Introduction plan** · **Ramp-up plan** · **Cannibalization effects** |
> | **Product / Operations Strategy** | **Type of product (MTO / MTS / ATO)** · **Production strategy (Level / Chase)** · **Inventory strategy (build up, zero inventory)** |

> [!INTUITION]
> **Six inputs from at least five departments** is the point — this is why the deck's note says:
>
> > *"S&OP has to be a **joint activity across different departments** — inputs, justification and acceptance/commitments have to come from all departments concerned."*
>
> Two entries deserve a note.
>
> **"Consensus forecast"** — not *the* forecast, a **consensus** one. Sales, marketing and finance will each have a different number, and the process requires them to converge on one before planning can proceed.
>
> **"Cannibalization effects"** — a new product does not only add demand, it **takes demand from your own existing products.** Forecasting the new launch without subtracting from the old line double-counts, and you build inventory you cannot sell.

> [!EXAM]
> **Three strategy choices in the last input row** are examinable in their own right:
>
> - **Product type** — **MTO (Make to Order) · MTS (Make to Stock) · ATO (Assemble to Order)**
> - **Production strategy** — **Level** (produce at a uniform rate) vs **Chase** (follow demand up and down)
> - **Inventory strategy** — **build up** vs **zero inventory**

> [!DERIVE]
> **Level versus Chase is a genuine trade-off** and a good exam contrast:
>
> | | **Level production** | **Chase production** |
> |---|---|---|
> | Output rate | **uniform** | **follows demand** |
> | Absorbs demand peaks with | **inventory** | **capacity** — overtime, hiring, subcontracting |
> | Costs you | **inventory holding cost** | **workforce and flexibility cost** |
> | Suits | stable products, MTS | variable demand, MTO |
>
> The deck lists it as *"uniform production vs demand driven"* among the factors. **You must absorb demand variation somewhere — either in stock or in capacity — and the choice is which is cheaper for your business.**

## What S&OP optimises

> [!EXAM]
> **Reviewed at various levels** — *demand, supply, financial, product impact on market, management analysis.*
>
> **Basic factors:**
> - **Minimize costs / maximize profits**
> - **Minimize inventory costs**
> - **Minimize change in production runs**
> - **Minimize impact on workforce**
> - **Maximize utilization of plant & equipment**
> - **Maximize customer service**

> [!TRAP]
> **These six factors conflict with each other, and that is the whole difficulty of S&OP.**
>
> **Maximise customer service** pushes toward holding stock and offering variety; **minimise inventory costs** pushes the other way. **Minimise change in production runs** pushes toward long uniform batches; **maximise customer service** pushes toward responding to demand shifts.
>
> **There is no setting that maximises all six.** S&OP is the forum where the trade-off is made **deliberately and jointly**, instead of each department optimising its own factor — which is precisely the *local vs global optimisation* failure of Unit 1.

> [!EXAM]
> The deck's blunt note on the discipline this imposes:
>
> > **"Sales cannot build 'castles' in the air without ground realities of what is possible / achievable."**
>
> And: *"Once the business plan is done, SOP is done together with key departments — **but driven by Sales and Marketing**."*

## How ERP supports S&OP

> [!EXAM]
> **ERP's support for SOP:**
> - **Product Group Creation** — planning at group level
> - **Rough cut Capacity Planning** — various alternatives on **resource time, overtime, subcontract**; **maximize internal resource utilization** and **minimize external resource utilization like overtime**
> - **Transferring SOP data to DM** — interlinking with **Demand Management** of MPS. Demand management determines **the requirement dates and requirement quantities for important assemblies**, and **specifies the strategies for planning and producing/procuring finished products**
> - **Version Management** — **multiple versions of plans stored** for different planning scenarios: **different forecasting techniques, different capacity info (single/double shift, overtime)**

> [!INTUITION]
> **Version Management is the capability worth understanding**, and the deck's note explains why:
>
> > *"Planning is an intellectual, non-trivial activity… **an important aspect of planning is to consider multiple options and then choose the most suitable one**. Till the most suitable one is firmed up, one needs to have **concurrency of multiple options/plans**."*
>
> A plan is not written once — you build several and compare them: *what if we run double shifts? what if we subcontract? what if the optimistic forecast holds?* **The system must hold all of them simultaneously without any being "the" plan yet.**
>
> This is the same idea as **Long Term Planning's simulation** capability, and it is what separates planning software from a spreadsheet that holds one answer.

> [!EXAM]
> Note the SAP module mapping the deck gives for S&OP: **PP-SOP** (flexible planning for demand forecasting), **PP-DRP** (Distributed Requirement Planning), **PP-LTP** (Long Term Planning).

---

**Next:** turning the group plan into specific products and dates — **the Master Production Schedule & ATP**.
