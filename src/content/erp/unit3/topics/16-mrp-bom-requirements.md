---
subject: erp
unit: 3
order: 16
slug: mrp-bom-requirements
title: MRP — Inputs, BOM & Requirements
summary: The three MRP inputs and its two outputs, what a bill of materials is and what exploding it means, the low-level code that orders the calculation, and the gross-versus-net requirement worked through with numbers.
minutes: 12
tags: [MRP, BOM, bill-of-materials, explosion, gross-requirement, net-requirement, low-level-code, purchase-requisition, CBP]
---

# MRP — Inputs, BOM & Requirements

## What MRP plans

> [!EXAM]
> - **Planning for materials required to produce expected output** — based on **actual customer order + forecast**
> - **Material includes those to be procured plus created in-house** — *these in-house produced items are not the end product*
> - **Material is based on BOM — Bill Of Material**
>
> The deck's example, a computer model with its BOM: **Cabinet ×1, Motherboard ×1, RAM ×4, CPU ×1, … SMPS ×1.**

## The inputs and outputs

> [!EXAM]
> **MRP — inputs and output:**
>
> | Inputs | Output |
> |---|---|
> | **Master Production Schedule (MPS)** | **Purchase & Production Plans** |
> | **Bill of Material (BOM)** | |
> | **Inventory Status Records** | |
> | **Item Master** | |

> [!INTUITION]
> **Mnemonic — the three MRP inputs answer three questions:**
>
> | Input | Question |
> |---|---|
> | **MPS** | *What must we build, and when?* |
> | **BOM** | *What goes into it?* |
> | **Inventory records** | *What do we already have?* |
>
> **Demand, structure, stock.** Take those three away and MRP has nothing to compute — which is exactly why an MCQ asks what *"lists the assemblies, sub-assemblies, parts and raw materials needed to produce one unit"* (**bill of materials**) and what *"details which end items are to be produced, when, and in what quantities"* (**master production schedule**).

> [!EXAM]
> **MRP outputs — the planning results:**
> - **Purchase Requisitions (PR)** — for **items procured from suppliers**; **PR ⇒ Purchase Orders (POs)**
> - **Planned Orders** — for **items produced in-house**; **Planned Orders ⇒ Production Orders**
> - **Combining multiple orders for each vendor/shop is possible**

> [!DERIVE]
> **The two outputs split by *make or buy*, and that split is the whole point of the BOM explosion.**
>
> $$\textbf{Buy it} \rightarrow \textbf{Purchase Requisition} \rightarrow \textbf{Purchase Order} \rightarrow \text{supplier}$$
> $$\textbf{Make it} \rightarrow \textbf{Planned Order} \rightarrow \textbf{Production Order} \rightarrow \text{shop floor}$$
>
> Note that both are **two-stage**: MRP produces a *requisition* or a *planned* order, which then becomes a **firm** purchase or production order. That intermediate stage exists so a **planner can review and approve** before the company commits money or machine time — MRP proposes, a human confirms.
>
> The Purchase Order end of this is exactly where **Procure-to-Pay** begins in Unit 1, and the Purchase Requisition → approval → PO steps are its first three stages. **MRP is what generates the demand that P2P then fulfils.**

## Bill of Material

> [!EXAM]
> - **BoM is also called the Product Structure**
> - **Bill of material (BOM) is the most important master data for MRP and product costing**
> - **BOM defines which raw materials/components are needed to make an end product, and the required quantity of children for each parent**
> - **Any MRP run does a BOM explosion** — i.e. **break up the end product (parent) sequentially into its lower level components (children) down to fundamental components**
>
> **BOMs can have multiple levels and can be very complex.**
>
> **BOM types:** **CADBOM** (CAD BoM) · **EBOM** (Engineering BOM) · **MBOM** (Manufacturing BOM)

> [!EXAM]
> **Four MCQ-bank answers about the BOM** — all four are among the pasted questions:
>
> | Question | Answer |
> |---|---|
> | A bill of materials **lists** | **the components, ingredients, and materials required to produce an item** |
> | The BOM contains information necessary to | **convert (explode) net requirements at one level into gross requirements at the next level** |
> | **"Exploding" the BOM means** | **converting the bill of materials into components and raw material requirements** |
> | The MRP input listing assemblies, sub-assemblies, parts and raw materials for one unit | **bill of materials** |

> [!INTUITION]
> **The deck's own analogy is the best one: "In a sense, BOM is like a recipe for a dish!"**
>
> A recipe names the ingredients and their quantities for one serving; a BOM names the components and their quantities for one unit. Scale the servings and you scale the ingredients — **that is exactly what explosion does.**
>
> The bicycle BOM the deck draws makes the multi-level structure concrete:
>
> **Bicycle (1)** → **Handle Bars (1)** · **Frame Assembly (1)** → **Frame (1)** · **Wheels (2)**
>
> Note the **quantity per parent** on each line — *Wheels (2)* — because that multiplier is what turns 200 bicycles into 400 wheels.

> [!TRAP]
> **The three BOM types are not three versions of the same list** — they are the same product seen by three functions:
>
> - **CAD BOM** — as the design tool holds it
> - **EBOM (Engineering BOM)** — as the **designers** structure it, by function
> - **MBOM (Manufacturing BOM)** — as the **factory** needs it, by assembly sequence, including packaging and consumables the engineer never lists
>
> **EBOM ≠ MBOM**, and reconciling them is a real problem in practice — which is why the deck notes *"type details discussed in the PLM chapter."*

## Low-level code

> [!EXAM]
> **Concept of planning sequence and low-level code:**
>
> - **MRP always happens in a sequence.** For example, a car at the highest level is made up of a chassis assembly, a gear box assembly, an engine assembly, etc. **The MRP run first explodes the bill of material and plans for these assemblies.** Each assembly may be made up of hundreds of other components
> - **This sequence of planning is driven by something known as the low-level code**

> [!EXAM]
> The deck's worked example — a BOM where **A** is the end product:
>
> | Item | Low level code |
> |---|---|
> | **A** | **0** |
> | **B** | **1** |
> | **C** | **1, 3** → **3** |
> | **D** | **2** |
> | **E** | **3** |
>
> **C appears at both level 1 and level 3, so its low-level code is 3 — the lowest (deepest) level at which it occurs.**

> [!DERIVE]
> **Why the low-level code must be the *deepest* occurrence** is the examinable idea.
>
> Component **C** is used directly in **A** (level 1) *and* inside **D** (level 3). If MRP planned C when it first met it at level 1, it would compute C's requirement from A alone — and then later discover that **D also needs C**, after C's order had already been placed.
>
> By assigning C the code **3**, MRP defers planning it until **every** parent that could require it has been processed. **The rule is: plan an item only once, and only after all its demand is known.**
>
> This is why the sequence matters and why the concept has a name. It is the same logic as topological ordering — **you cannot compute a node until all its predecessors are done.**

## Gross and net requirements

> [!EXAM]
> **The deck's worked example.** An order is received for **25 A items**, and the following are on hand: **A = 3, B = 7, C = 16, D = 4, E = 6.**
>
> $$\textbf{Net requirement} = \textbf{Gross requirement} - \textbf{Quantity on hand}$$
>
> | Step | Item | Gross requirement | On hand | **Net requirement** |
> |---|---|---|---|---|
> | 0 | **A** | 25 | 3 | **22** |
> | 1 | **B** *(1 per A)* | 22 | 7 | **15** |
> | 2 | **D** *(1 per B)* | 15 | 4 | **11** |
> | 3 | **C** *(1 per A and D)* | **22 + 11 = 33** | 16 | **17** |
> | 4 | **E** *(1 per D)* | 11 | 6 | **5** |

> [!DERIVE]
> **Trace the cascade and two mechanisms become visible.**
>
> **First — the net requirement at one level becomes the gross requirement at the next.** A's net is 22, so B's gross is 22. B's net is 15, so D's gross is 15. This is precisely what the MCQ means by *"the BOM contains information necessary to **convert (explode) net requirements at one level into gross requirements at the next level**."*
>
> **Second — item C is why low-level code exists.** C is used *1 per A* **and** *1 per D*, so its gross requirement is the **sum of demand from both parents**:
>
> $$\underbrace{22}_{\text{from A}} + \underbrace{11}_{\text{from D}} = 33$$
>
> Had C been planned at level 1, its gross would have been 22 and the 11 from D would have been missed. **Because C carries low-level code 3, it is planned only after D's net requirement is known** — and both demands are captured.
>
> **This single example demonstrates explosion, netting, and low-level code at once**, which is why it is worth being able to reproduce.

> [!TRAP]
> **What an MRP plan does *not* contain** is an examinable negative. The MCQ asks for the exception:
>
> > *A material requirements plan contains information with regard to all of the following **except**: **the capacity needed to provide the projected output rate**.*
>
> **MRP plans materials, not capacity.** That is precisely its stated limitation — it is an *infinite planning* tool — and it is why **Capacity Requirements Planning** is a separate step alongside it.
>
> Two related MCQ answers: **a material requirements plan specifies "the quantity and timing of planned order releases"**, and **a major strength of MRP is its capability "for timely and accurate replanning."**

## Consumption Based Planning

> [!EXAM]
> **CBP — Consumption Based Planning:**
> - **Deals with items that are consumables** — **fuel, stationery, spares**
> - **More suited for class B, class C items**
> - **Based on historical data patterns** — immediate recent
> - **Does not have much relation to the finished product demand**
> - Approaches: **reorder point planning** (based on stock level) · **forecast based** · **time-phased**

> [!EXAM]
> | **MRP** | **CBP** |
> |---|---|
> | **Mainly followed for production items** | **Mainly followed for consumables, regular spares, office supplies** |
> | **Plan is driven by finished goods requirement** | **Plan is driven by past consumption and forecast** |
> | **Needs a BOM explosion** | **Does not need a BOM explosion** — several approaches: forecast based, time based, re-order based |
>
> **MRP procedures overall:** **MRP** · **Consumption-based planning** → **reorder point planning** (automatic / manual reorder point) · **forecast-based planning** · **time-phased planning**

> [!INTUITION]
> **The distinction is between dependent and independent demand**, and that is the cleanest way to hold it.
>
> **MRP handles dependent demand** — how many wheels you need is *derived* from how many bicycles you are building. It is computed, not forecast.
>
> **CBP handles independent demand** — how much stationery the office consumes has no BOM relationship to anything you sell. It can only be **forecast from history**.
>
> That is why CBP needs no BOM explosion: **there is nothing to explode from.** And it is why CBP suits **class B and C items** — low-value consumables where a simple reorder point is cheaper to run than a full planning calculation.

---

**Next:** the mechanics that make an MRP run work — **MRP concepts & procedures**.
