---
subject: erp
unit: 3
order: 20
slug: production-scenarios-drp
title: Production Scenarios & DRP
summary: The three production scenarios with their specific ERP requirements, Kanban and its Toyota origin, and Distribution Requirement Planning with its objectives, inputs, outputs and worked plan.
minutes: 11
tags: [process-industry, repetitive-manufacturing, kanban, JIT, backflushing, batch-management, DRP, distribution, SKU]
---

# Production Scenarios & DRP

## The three production scenarios

> [!EXAM]
> | Scenario | Characteristics | Examples |
> |---|---|---|
> | **Process Industry** | **Batch management, recipe, PI sheets, interface of ERP with PLC / process automation equipment** | **chemical, oil and gas, pharmaceutical, petrochemical** |
> | **Repetitive Manufacturing** | **Product less complex, more stable, long periods of the same product.** **Material staging, back flushing** | **consumer goods (FMCG), electronics** |
> | **Kanban / Just In Time (JIT)** | **JIT, Kanban** | industries using Kanban or JIT process |

> [!INTUITION]
> The three scenarios sit on a spectrum of **how discrete the product is**:
>
> - **Process industry** makes things you **measure** — litres of chemical, tonnes of petrochemical. You cannot count them, and two batches genuinely differ.
> - **Repetitive manufacturing** makes identical discrete units, **continuously, for long periods**.
> - **Kanban/JIT** makes discrete units too, but **pulled by consumption** rather than pushed by a schedule.
>
> **That is why each needs different ERP support** — and it is the deepest reason ERP requires configuration: *"this is also the place where a lot of 'customization' is needed based on type of industry."*

## Scenario-specific requirements

> [!EXAM]
> **For Process Industry:**
> - **Batch Management** — **chemical properties may differ; for tracking**
> - **Characteristics** — **different parameters to define different materials**
> - **Recipe ⟺ BOM in process industry**
> - **Process Instruction Sheet** for the process operator
>
> **For Repetitive Manufacturing:**
> - **Period and quantity based production plan**
> - **Back flushing** — *shift/day's finished goods produced and BOM consumed quantities for batch update & inventory reduction*
> - **Specialized material staging near the assembly line**
>
> **For Kanban / JIT Manufacturing:**
> - **Electronic Kanban card** — **material, quantity, destination details**
> - **Triggers delivery from demand source to supply source**
> - **Kanban quantity calculation** — to store beside the operator

> [!TRAP]
> **"Recipe ⟺ BOM in process industry"** is a clean exam point: **the process industry's equivalent of a bill of materials is a recipe.** Same role — what goes in, in what quantity — different name and different tolerances.
>
> **Batch management** is the other distinctive requirement, and it exists because *"chemical properties may differ"* between batches. Two batches of the same material are **not interchangeable**, so each must be tracked individually — which is the traceability requirement that made **Farm to Fork** work in Unit 1.

> [!DERIVE]
> **Back flushing is the concept most worth understanding**, because it inverts the normal flow.
>
> Normally you **issue** materials to production, then produce. Back flushing does the reverse: **record the finished goods, then work backwards through the BOM to deduct what must have been consumed.**
>
> $$\textbf{1,000 units produced} \times \textbf{BOM} \rightarrow \textbf{components automatically deducted from stock}$$
>
> **Why it suits repetitive manufacturing specifically:** the product is *"less complex, more stable, the same for long periods"*, so the BOM is reliable and consumption is predictable. Recording every component issue individually on a fast line would be pure transaction overhead.
>
> **The trade-off:** back flushing assumes the BOM is exactly right. **Scrap, rework and substitutions are invisible** to it, so inventory drifts from reality and must be corrected by physical counts. It buys speed with accuracy — acceptable on a stable line, dangerous on a variable one.

## Kanban

> [!EXAM]
> - **The term "Kanban" was originally conceived by the Japanese car manufacturer Toyota**
> - **It literally means "visual sign" or "visual card"**
> - **Back in the 1940s when Toyota used Kanban for the first time, the cards were paper notes pinned on a physical board (Kanban board)**
> - **Toyota workers used the kanban card system to create a transparent work process and reduce production waste**

> [!INTUITION]
> **Kanban is a pull system, and that is its essential contrast with MRP.**
>
> | | **MRP** | **Kanban** |
> |---|---|---|
> | Direction | **Push** — a central plan tells each stage what to make | **Pull** — a stage makes only what the next stage has consumed |
> | Trigger | the **schedule** | **an empty bin / a returned card** |
> | Needs | accurate BOM, stock and lead-time data | **stable, level demand** |
>
> The deck's phrasing captures it: the card **"triggers delivery from demand source to supply source"** — the *demand* end initiates, not the supply end.
>
> **Kanban is deliberately low-tech**, which is why ERP's contribution is modest: an **electronic kanban card** carrying *material, quantity, destination*, plus the **kanban quantity calculation** for how much to keep beside the operator.
>
> Recall from Unit 2 that **Kanban/JIT by Toyota** is one of the named **best practices** that arrived inside ERP packages from leading corporations, alongside **Wal-Mart's VMI**.

## Distribution Requirement Planning

> [!EXAM]
> - **DRP is the process of shipment of finished goods from manufacturing locations to end customers**
> - **It is a network of warehouses, distribution centers and wholesalers / retailers**
> - **DRP is not part of the MRP II flow**, but it is **an extension of MRP logic of manufacturing to the distribution network**
> - **Provides a time-based finished goods inventory replenishment plan in the distribution network**
> - **DRP translates local distribution center requirements into central distribution center requirements, which are then translated to central warehouse requirements, and finally into gross requirements at the factory**
>
> $$\textbf{LDC} \rightarrow \textbf{CDC} \rightarrow \textbf{CWH} \rightarrow \textbf{Factory}$$

> [!TRAP]
> **"DRP is not part of the MRP II flow"** is a stated fact and an easy exam point. The five MRP II levels are BP, S&OP, MPS, MRP, PAC — **DRP is none of them.** It is an *extension* of the same logic applied outward to distribution.
>
> Note also the **direction of the translation**: requirements flow **inward from the customer end toward the factory**, not outward. The local distribution centre's need becomes the central centre's need, which becomes the factory's gross requirement. **DRP explodes a network the way MRP explodes a BOM** — which is exactly why it is called *an extension of MRP logic*.
>
> **The MCQ-bank answer:** *Distribution Resource Planning (DRP) is* → **"a time-phased stock replenishment plan for all levels of a distribution network."**

> [!EXAM]
> **The distribution network**, as the deck's diagram shows it:
>
> $$\textbf{Factory} \rightarrow \textbf{Central distribution facility} \rightarrow \textbf{Regional centre} \rightarrow \textbf{Local warehouse} \rightarrow \textbf{Retailer}$$

### Objectives

> [!EXAM]
> - **To improve customer service levels** by **anticipating customer demand at distribution centers** and **providing finished products at the correct location**
> - **To provide an accurate requirements plan for manufacturing** — **matching material supply to manufacturing demand, and customer demand to product supply**
> - **To optimize the distribution of available stock in the distribution network**
> - **Minimize finished goods inbound inventory in the network**

> [!INTUITION]
> The first and last objectives are **in tension**, and recognising that is the insight.
>
> *"Providing finished products at the correct location"* wants stock **close to the customer**, spread across many local warehouses. *"Minimize finished goods inventory in the network"* wants stock **concentrated centrally**, where it can serve any region.
>
> **Stock held centrally is more efficient; stock held locally is more responsive.** DRP is the calculation that decides where the line falls — which is the same **service vs cost** trade-off that S&OP balances at the production end.

### Inputs and outputs

> [!EXAM]
> **Inputs:**
> - **Forecast of demand for each SKU** (gross requirement)
> - **Current inventory level of the SKU** — balance on hand
> - **Target safety stock**
> - **Lead time for replenishment**
> - **In transit** (scheduled receipts)
> - **Planned shipments or planned order releases**
>
> **Outputs:**
> - **Stock transport requisitions between locations** — **which goods, of what quantity, to where and when**
> - **Between any of: factory, warehouse, distribution center**

> [!DERIVE]
> **The DRP inputs are the MRP inputs with the network substituted for the BOM** — which is what *"an extension of MRP logic"* means concretely:
>
> | MRP | DRP |
> |---|---|
> | MPS — what to build | **Forecast of demand per SKU** |
> | BOM — what goes into it | **the distribution network** |
> | Inventory status | **current inventory + in transit + safety stock** |
> | Lead times | **replenishment lead time** |
> | → Purchase requisitions / planned orders | → **stock transport requisitions** |
>
> The **worked DRP plan** in the deck shows this per location, week by week — for a **Central Warehouse Facility** (order quantity Q=200, safety stock SS=0, lead time LT=2) and a **Regional Warehouse** (Q=50, SS=15, LT=1) — with rows for **Period Usage, Gross Requirement, Beginning Inventory, Scheduled Receipts, Net Requirement, Planned Receipt, Ending Inventory and Planned Order.**
>
> **Those rows are exactly the MRP netting logic** — gross requirement less what you have gives net requirement, which becomes a planned order offset backwards by the lead time. **Same arithmetic, applied to locations instead of components.**

> [!TRAP]
> **Source erratum — SKU.** The deck's speaker note glosses **SKU as "Semi Knocked down Unit."** That is **not** what SKU means in inventory and distribution.
>
> **SKU = Stock Keeping Unit** — a distinct sellable item at a distinct location, the level at which stock is counted and replenished. That reading is the only one that makes the surrounding slide coherent: *"forecast of demand for each SKU"* and *"current inventory level of the SKU, i.e. balance on hand"* are statements about **a stocked item**, not about a knocked-down assembly.
>
> **Answer "Stock Keeping Unit" in an exam.** Flagging it here so the note does not mislead you later.

> [!EXAM]
> The deck notes that **DRP is one of the core areas that evolved into SCP (Supply Chain Planning)**, and that ERP support for it appears as **PP-DRP — Distributed Requirement Planning.**

---

**Next:** stepping back to the whole module landscape — **ERP modules & evolution**.
