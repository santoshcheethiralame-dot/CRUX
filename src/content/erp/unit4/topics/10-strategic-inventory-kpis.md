---
subject: erp
unit: 4
order: 10
slug: strategic-inventory-kpis
title: Strategic Inventory Management, KPIs & Solutions
summary: The four strategic inventory processes including VMI and cross-docking, the nine inventory KPIs with their definitions, and the SAP, Oracle and IBM offerings.
minutes: 11
tags: [strategic-inventory, VMI, cross-docking, lean, service-levels, KPI, inventory-turn, shrinkage, obsolescence, SAP-MM, best-of-breed]
---

# Strategic Inventory Management, KPIs & Solutions

## The four strategic processes

> [!EXAM]
> **Strategic Inventory Management Processes:**
>
> 1. **Process of Inventory Collaboration**
>    - **VMI — vendor managed inventory**
>    - **Wal-Mart and P&G collaboration**
> 2. **Deciding inventory based on service levels**
>    - **Critical items, high service levels ⇒ high inventory**
>    - **Low service levels ⇒ low inventory**
> 3. **Best practice processes**
>    - **Cross docking** — **effective coordination of inbound & outbound shipments**; example: **Wal-Mart**
>    - Vendors: **SAP, Oracle, Manhattan Associates**
> 4. **Lean Inventory Management**
>    - **Lean principles** · **reduce waste from supply chain** · **Kanban or JIT**

> [!INTUITION]
> **What makes these four "strategic" rather than "planning"** is worth stating, because the boundary is the whole point of the pyramid.
>
> **Planning-level questions are answered inside your own four walls**: *given my demand and my lead times, when and how much do I order?* Every one of the four models — Q, P, min-max, two-bin — assumes the rest of the supply chain is fixed and only optimises your own ordering.
>
> **Strategic-level questions change the arrangement itself:**
>
> | Process | What it changes |
> |---|---|
> | **VMI** | **who decides** the replenishment — the vendor, not you |
> | **Service-level-based inventory** | **the target itself** — you choose how often to stock out |
> | **Cross docking** | **whether stock is held at all** |
> | **Lean / JIT** | **how much waste the chain carries**, end to end |
>
> **Planning optimises within the rules; strategy changes the rules.** That is why this level is labelled **Gain** while the ones below are **Maintain** and **Lose**.

> [!DERIVE]
> **Cross-docking deserves unpacking**, because *"effective coordination of inbound and outbound shipments"* understates what it does.
>
> In a normal warehouse: **receive → put away → store → pick → ship.** In cross-docking: goods arriving on the inbound dock are **moved straight across to an outbound truck** — no put-away, no storage, no picking.
>
> $$\textbf{inbound truck} \rightarrow \textbf{dock} \rightarrow \textbf{outbound truck}$$
>
> **The warehouse becomes a sorting hub rather than a store.** What it eliminates is not just handling cost but **inventory itself** — stock that never rests is stock you never finance.
>
> **What it costs you in exchange is slack.** Cross-docking only works if the inbound and outbound schedules are tightly synchronised; one late truck and the whole flow stalls, because **there is no buffer stock to absorb it**. That is exactly why it sits at the strategic level and requires *"channel integration with suppliers"* — it cannot be done unilaterally.
>
> **Wal-Mart is the standing example**, and it is the same company credited with popularising **VMI** with **P&G**. Not a coincidence: both techniques trade **inventory for information**, and Wal-Mart's structural advantage was having the better information.

> [!TRAP]
> **"Deciding inventory based on service levels" is a choice, not an accident** — and that is the counter-intuitive part.
>
> A **service level** is the probability of *not* stocking out. Setting it to 99% rather than 95% sounds obviously better, until you see what safety stock costs: **the higher the service level, the more disproportionate the stock required**, because you are covering ever-rarer demand spikes.
>
> So the strategic decision is: **which items deserve 99%, and which are fine at 90%?** The deck's own answer — *"critical items, high service levels ⇒ high inventory"* — points straight back to the item strategy matrix, where **critical spares** carry the driver *"should never be out of stock."*
>
> **Nobody sets 100%**, because 100% requires infinite stock. **Accepting some stock-outs is the correct policy**, and choosing where to accept them is the strategic act.

> [!EXAM]
> **Lean Inventory Management** connects directly to Unit 3: **Kanban / JIT**, credited to **Toyota**, is named as one of the **best practices** that arrived inside ERP packages from leading corporations — alongside **Wal-Mart's VMI**, which is the very next item on this same list.
>
> **Both of this topic's best-practice examples are the two named in Unit 1's best-practices slide.** The two chapters are describing the same two companies.

## KPIs for inventory management

> [!EXAM]
> | **Measure** | **Definition** |
> |---|---|
> | **Stock outs** | **# incidents of stock not available when required** |
> | **Inventory Turn** | **Annual sales / Average inventory level** |
> | **Inventory Carrying Cost** | **Σ all costs of finished goods** |
> | **SKU turnover** | **# SKU cycles / turns** |
> | **Inventory Ageing** | **Total Gross Inv % for specific periods** |
> | **Inventory Cycle Counting Accuracy** | **Sum of variance between physical inv. and perpetual inv.** OR **# accurate part cycle counts / total # cycle counts performed** |
> | **Shrinkage** | **Costs of breakage, pilferage, deterioration of inv.** |
> | **Storage space utilization** | **Volume of storage / total storage capacity, in %** |
> | **Inventory Obsolescence as a % of Total Inventory** | **Obsolete & scrap inv. / Gross inv. value** |

> [!INTUITION]
> **The nine KPIs measure the two drivers, one on each side**, which is why they are worth grouping rather than listing:
>
> | Driver | KPIs |
> |---|---|
> | **"Never stock out"** | **Stock outs** |
> | **"Never carry excess"** | **Inventory Turn · SKU Turnover · Inventory Carrying Cost · Inventory Ageing · Obsolescence · Storage Space Utilization** |
> | **"Are the numbers even true?"** | **Cycle Counting Accuracy · Shrinkage** |
>
> **Eight of the nine watch the excess side.** That imbalance is honest: stock-outs are loud — a customer complains, a line stops — while excess inventory is **silent**, sitting quietly on a shelf until it becomes a markdown. **You need instruments for the failure you cannot hear.**
>
> **Inventory Turn is the headline number**, and its formula is worth understanding rather than memorising:
>
> $$\textbf{Inventory Turn} = \frac{\textbf{Annual sales}}{\textbf{Average inventory level}}$$
>
> A turn of **12** means you sell your entire stock twelve times a year — roughly **one month of stock on hand**. A turn of **4** means three months. **Higher is generally better** because the same sales are supported by less tied-up cash.
>
> ⚠️ **But higher is not unboundedly better** — push turns up far enough and you are running with no buffer, and the **stock-outs** KPI starts rising. **The two KPIs are meant to be read against each other**, which is precisely the point of measuring both.

> [!TRAP]
> **Cycle counting accuracy and shrinkage look similar and are not.**
>
> - **Shrinkage** measures **the value you actually lost** — *costs of breakage, pilferage, deterioration.*
> - **Cycle counting accuracy** measures **how well you know what you have** — the variance between the physical count and the system's perpetual record.
>
> **You can have low shrinkage and terrible accuracy** (nothing is being lost, but your records are a mess) — and that is dangerous in its own right, because **the planning layer is running on numbers that are wrong.**
>
> This is the **Lose** level of the pyramid stated as a metric: bad control does not just lose goods, **it corrupts the input to everything above it.**

## Vendor solutions

> [!EXAM]
> **SAP Offerings — SAP Materials Management (MM) module:** **GR, GI, Goods Return · Stock Transfers · Physical Inv. and Cycle Counting · Inventory Valuation** and many more
>
> **Oracle Offerings — Oracle Inventory Management:** **Inbound, Outbound and Reverse Logistics' transactional support · tracking raw materials, WIP components, finished goods · active alerts, intelligent messages for proactive management · global inventory visibility** and many more
>
> **IBM offerings:** **Dynamic Inventory Optimization (DIOS)**
>
> The deck adds one framing phrase: **"ERP vs best of breed."**

> [!INTUITION]
> **Look at what each vendor's list emphasises and the "ERP vs best of breed" question answers itself.**
>
> **SAP MM's list is transactions and control** — GR, GI, transfers, counting, valuation. That is the **base of the pyramid**, and an integrated ERP is exactly the right tool for it because those transactions must post to finance simultaneously.
>
> **IBM's DIOS is "Dynamic Inventory *Optimization*"** — the **top** of the pyramid. A specialist optimiser, not an ERP module.
>
> **Oracle's list sits between them**, adding *"active alerts, intelligent messages"* and *"global inventory visibility"* — the planning layer.
>
> **So the trade-off is level-dependent**, and that is the useful generalisation: **the lower the pyramid level, the stronger the case for integrated ERP** (because the transaction must hit the ledger); **the higher the level, the stronger the case for best-of-breed** (because the value is in the algorithm, not the integration).
>
> This is the same *"lots of overlap in functionality… they may co-exist within an enterprise"* argument from Unit 3's evolution chapter, and it is the decision the package-selection chapter formalises next.

---

**Next:** choosing the software itself — **ERP package selection: process & who does it**.
