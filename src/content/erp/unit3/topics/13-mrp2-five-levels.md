---
subject: erp
unit: 3
order: 13
slug: mrp2-five-levels
title: MRP II — The Five Planning Levels
summary: The five levels from business plan down to production activity control, each with its purpose, planning horizon, level of detail and review frequency, and the cascade that makes them one system.
minutes: 12
tags: [MRP-II, business-plan, SOP, MPS, MRP, PAC, planning-horizon, cascade, mnemonic]
---

# MRP II — The Five Planning Levels

## What MRP II is here for

> [!EXAM]
> - **MRP** — production, procurement
> - **MRP II** — production, procurement, **marketing, finance**
> - **Continuous changes in the market**
> - **Market → SOP → MPS → MRP**
> - **MRP II is a "standard" for production planning. All ERPs support it.**

> [!TRAP]
> **MRP-II stands for Manufacturing Resource Planning** — one of the pasted MCQs offers *"Material Redesign Practice 2"*, which is **FALSE**. And the MCQ bank's true/false *"MRP stands for Management Resources Planning"* is likewise **FALSE**.
>
> Keep the two expansions exact:
> - **MRP = Material Requirement Planning**
> - **MRP II = Manufacturing Resource Planning**
>
> The MCQ bank also asks how MRP II is *"accurately described"* — the answer is **"MRP augmented by other resource modules."**

> [!NOTE]
> The deck's own convention, worth noting: **"Here onwards, just MRP would mean MRP II in our context."** And: *"It may be noted that **ERP's role is more in planning than actual execution**."*

## The five levels

> [!EXAM]
> **MRP II Planning has five major levels:**
>
> 1. **Business Plan [BP]**
> 2. **Sales and Operations Plan [SOP]**
> 3. **Master Production Schedule [MPS]**
> 4. **Material Requirement Planning [MRP]**
> 5. **Purchasing and Production Scheduling** *(Production Activity Control, PAC)*

> [!INTUITION]
> **Mnemonic — "Business Says Make More Products":**
>
> | Word | Level |
> |---|---|
> | **B**usiness | **Business Plan** |
> | **S**ays | **Sales and Operations Plan** |
> | **M**ake | **Master Production Schedule** |
> | **M**ore | **Material Requirement Planning** |
> | **P**roducts | **Purchasing and Production activity control** |
>
> The order is also a **funnel**: each level takes the one above and makes it more specific, shorter-term and more detailed. **Years → months → weeks → lead time → a shift.**

## The five levels in detail

> [!EXAM]
> **1) Business Plan**
> - **Purpose:** long term **goals, objectives, business direction** in terms of product lines, markets etc., **jointly agreed by all teams** — **Marketing, Production, Finance and Engineering**
> - **Planning horizon:** long term, **next three to five years**
> - **Level of detail:** **high level**
> - **Review frequency:** **once every quarter** — minor modifications yearly

> [!EXAM]
> **2) Sales and Operations Plan (SOP)**
> - **Purpose:** a **joint plan developed by Sales and Marketing together**. Details the **quantities of different product groups** to be produced in each period (week or month), and the **resources** (machine capacity, labor, materials) needed, and **does a capacity availability check through Resource Planning**
> - **Planning horizon:** **6–12 months**
> - **Level of detail:** **product group level**
> - **Review frequency:** **once every month**

> [!EXAM]
> **3) Master Production Scheduling (MPS)**
> - **Purpose:** details the plan of **finished products** to be made in each period (typically every week). Availability check done through **Rough Cut Capacity Planning**. Also used for the **Available-to-Promise check** and to **promise a delivery date to the customer**
> - **Planning horizon:** **6–12 months**
> - **Level of detail:** **end product level**
> - **Review frequency:** **once every week**

> [!EXAM]
> **4) Materials Requirement Planning (MRP)**
> - **Purpose:** a plan for **production and purchase of components** needed for the items in the master production schedule. Tells **how much** quantity is needed (based on the finished goods **Bill of Material**) and **when** it is needed (based on **manufacturing and supplier's lead time**)
> - **Planning horizon:** **combined manufacturing and purchase lead time**
> - **Level of detail:** **very high — includes individual components**
> - **Review frequency:** **once every week**

> [!EXAM]
> **5) Purchasing and Production Activity Control**
> - **Purpose:** the **implementation phase** of production planning and control systems. **Purchasing controls flow of materials from vendor to factory**; **production activity control plans and controls flow of work through the factory**
> - **Planning horizon:** **very short — may be a day or a shift**
> - **Level of detail:** **very high — includes individual components and machines**
> - **Review frequency:** **daily**

## Reading the four columns

> [!DERIVE]
> The examinable structure is that **every level has the same four attributes**, and they move together in a consistent direction:
>
> | Level | Horizon | Detail | Review |
> |---|---|---|---|
> | **Business Plan** | **3–5 years** | High level | **Quarterly** |
> | **S&OP** | **6–12 months** | **Product group** | **Monthly** |
> | **MPS** | **6–12 months** | **End product** | **Weekly** |
> | **MRP** | **combined lead time** | **Individual components** | **Weekly** |
> | **PAC** | **a day or a shift** | **Components and machines** | **Daily** |
>
> **Three things move in lockstep as you descend:**
>
> $$\textbf{Horizon} \downarrow \qquad \textbf{Detail} \uparrow \qquad \textbf{Review frequency} \uparrow$$
>
> **And the reason is one idea: you can only plan in detail as far ahead as you can predict.** Three years out you cannot know which components will be needed, so you plan product lines and markets. A shift ahead you know exactly which machine runs which part.
>
> **If an exam asks you to compare the levels, this table is the answer** — and if you remember only the direction of the three arrows, you can reconstruct it.

> [!TRAP]
> **MPS and S&OP share a horizon (6–12 months) but differ in detail and review frequency.** That is the pair most easily confused:
>
> - **S&OP** — **product group** level, reviewed **monthly**
> - **MPS** — **end product** level, reviewed **weekly**
>
> The horizon is the same because both are tactical planning over the same year; what differs is **how finely they slice it and how often they revisit it.**

## The cascade

> [!EXAM]
> The deck's flow diagram: **(1) Business Plan → (2) Sales and Operations Plan** *(comprising Marketing Plan, Production Plan, Sales Plan)* **→ (3) Master Production Schedule → (4) Materials Requirement Plan → Purchasing and Production Activity Control**, with **RESOURCE OK?** checks after S&OP and MPS, **feedback loops** back up when the answer is No, and **Performance Measures** at the bottom.
>
> **This whole structure is Closed Loop MRP; the whole diagram is MRP II.**

> [!INTUITION]
> The deck's note captures why this counts as more than a sequence of documents:
>
> > *"Each of the plans has **different planning horizons, different levels of detail, reviewed at different levels at different frequencies**. One can also consider **MRP to be a framework — a business framework**."*
>
> And: *"**MRP, like any other framework or tool, brings its own 'philosophy' of how things should be done**, as seen in the 5-level structure."*
>
> That is the same claim Unit 1 made about ERP as *"a business framework"*. **Adopting MRP II means adopting its view that planning should be hierarchical, with feedback at each level** — which is a decision about how to run the company, not a software setting.

> [!EXAM]
> Note the **integration point** the deck flags: *"**ERP's concept of 'integration of various functions' has its beginnings in MRP!**"* The Business Plan is jointly agreed by **Marketing, Production, Finance and Engineering**, and S&OP is a **joint plan by Sales and Marketing with Production** — cross-functional planning was built into MRP II before ERP existed.

---

**Next:** the level where demand meets supply — **Sales & Operations Planning**.
