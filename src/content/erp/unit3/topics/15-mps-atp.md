---
subject: erp
unit: 3
order: 15
slug: mps-atp
title: Master Production Schedule & Available-to-Promise
summary: What the MPS specifies and what it drives, its six inputs, the three roles it plays, the Available-to-Promise calculation, and how MPS is expressed differently for make-to-stock and make-to-order.
minutes: 11
tags: [MPS, master-production-schedule, ATP, available-to-promise, end-item, make-to-stock, make-to-order, demand-management]
---

# Master Production Schedule & Available-to-Promise

## What MPS is

> [!EXAM]
> - **MPS is done for individual products** and states the requirements for **individual finished products** that need to be produced
> - It **details what the company plans to produce, expressed in specific configurations, quantities, and dates**
> - **Takes into account the forecast, the production plan, the production priority and other considerations** such as **backlog** and **available-to-promise quantity**
> - **MPS is the manufacturing build schedule of individual finished products by date and quantity** — it tells manufacturing **which items need to be made, on what date, and in what quantity**
> - **Distribution / allocation of jobs across different facilities**

> [!EXAM]
> **Three MCQ-bank answers about MPS, all examinable and all subtly different:**
>
> | Question | Answer |
> |---|---|
> | A master production schedule **specifies** | **what product is to be made, and when** |
> | A master production schedule **contains information about** | **quantities and required delivery dates of final products** |
> | The MRP input detailing **which end items** are to be produced, when, and in what quantities | **the master production schedule** |

> [!TRAP]
> **The first of those three is the classic trap.** The distractor is *"what **component** is to be made, and when."*
>
> **MPS is about finished products; MRP is about components.** That is the entire division of labour between levels 3 and 4 — MPS says *"200 bicycles on the 14th"*, and MRP works out that this needs 400 wheels, 200 frames and so on.
>
> Similarly, MPS contains **final products**, not sub-assemblies. Anything about sub-assemblies or components belongs to **MRP**.
>
> Also note: **MPS stands for Master Production Schedule** — one of the pasted MCQs offers *"Material Production Services"*, which is **FALSE**.

## What MPS drives and provides

> [!EXAM]
> **The three roles of MPS:**
>
> 1. **MPS drives MRP**
> 2. **MPS is the basis for making order promises** — *it tells the company's sales and marketing team which product will be available on what date*
> 3. **MPS is a priority plan for manufacturing** — *it tells manufacturing which customer orders are of priority*

> [!EXAM]
> **MPS inputs:**
> - **The production plan** (process)
> - **Forecasts of finished goods**
> - **Actual orders received from customers**
> - **Inventory for all finished goods**
> - **Capacity information**
> - **Plant facilities, resources, etc.**

> [!INTUITION]
> **The three roles point in three different directions**, which is why MPS is called the decisive plan:
>
> - **Downward to MRP** — it is the input that starts materials planning
> - **Outward to Sales** — it is what lets you promise a date to a customer
> - **Inward to the factory** — it is the priority order for the shop floor
>
> The deck's note is emphatic: *"**MPS is the decisive plan.** That is, the company's 'production process'."*
>
> Note that inputs include **both forecasts and actual orders**. Further out, the schedule is forecast-driven; nearer in, real orders replace the forecast. **That transition is what the time fences later formalise.**

## Available-to-Promise (ATP)

> [!EXAM]
> - **Capability of making promises for delivery is a basic requirement for every business**
> - In case the material is **supposed to come from a vendor or needs to be manufactured**, the **date of scheduled receipt** from manufacturing or vendor is taken for promising availability
>
> **The calculation:**
>
> $$\textbf{ATP Quantity} = \textbf{Quantity}(\text{stock available OR confirmed receipts from suppliers}) - \textbf{Quantity already reserved for other customer orders}$$
>
> **Naturally, ATP value is not constant — it varies with time.**

> [!DERIVE]
> **ATP is not the same as stock on hand**, and the difference is what makes it useful.
>
> Two corrections are applied to raw stock:
>
> - **Add** what is **confirmed to arrive** — scheduled receipts from suppliers or from your own production. You can promise goods you do not yet have, provided you know when they land.
> - **Subtract** what is **already promised to someone else.** Stock physically present but reserved against another order is not available.
>
> **Hence "ATP varies with time":** a unit not available today may be available next week when a shipment arrives, and a unit available today may be unavailable tomorrow once someone reserves it. **ATP is a function of date, not a single number** — which is why the deck asks for *"a graph?"*
>
> This is the mechanism behind Unit 1's tangible benefit **"availability in full/part check, no wrong promise."**

> [!EXAM]
> The deck's note on why this matters commercially:
>
> > *"ATP is an **extremely important ability of a business** — hence ERP should support this. **In some segments of industry this is a competitive, decisive factor** — for example automobile."*

## MPS by production strategy

> [!EXAM]
> **How the MPS is expressed depends on the manufacturing strategy** — two MCQ-bank items:
>
> | Operation type | MPS usually expressed in terms of |
> |---|---|
> | **Continuous (make-to-stock)** | **end-items** |
> | **Job shop (make-to-order)** | **customer orders** |

> [!INTUITION]
> The difference follows from **when the customer appears**.
>
> In **make-to-stock**, you produce before any customer exists, so the schedule can only be expressed in **end-items** — *"5,000 units of model X in week 12."* There is no customer to name.
>
> In **make-to-order**, production is **triggered by** a specific order, so the natural unit of scheduling is **the customer order itself.**
>
> *(The intermediate case — **assemble-to-order** — is typically expressed in **modules**, which is why "modules" and "kits" appear as distractors in those MCQs.)*
>
> This is the same **ETO → MTO → MTS** spectrum that determined product costing in the management accounting topic. **One distinction, consequences in both costing and planning.**

## How ERP supports MPS

> [!EXAM]
> **ERP Support for MPS:**
> - **Planning based on a variety of production strategies** — e.g. **Make to Stock, based on forecast** (example: a beverage such as cola)
> - **This is a very useful feature of ERP from a competitive advantage point of view**
> - **Modern enterprises allow for mix-mode manufacturing based on need.** **When to use which strategy can be decided based on a planning exercise using ERP**
>
> The deck's note: *"**Without ERP it is difficult to manually check out various production strategies.**"*

> [!INTUITION]
> **"Mix-mode manufacturing"** is Unit 1's *"Multi (mixed) mode manufacturing"* problem being answered.
>
> A real company rarely uses one strategy for everything — high-volume lines run make-to-stock while custom variants run make-to-order, **in the same plant**. The value of ERP here is that it can **model and compare the strategies** before you commit, rather than forcing one mode on the whole factory.
>
> The SAP module mapping the deck gives for MPS is **PP-MP-DEM — Master Planning, Demand Management.**

---

**Next:** turning finished products into components — **MRP, the BOM & requirements**.
