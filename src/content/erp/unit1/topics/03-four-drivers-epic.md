---
subject: erp
unit: 1
order: 3
slug: four-drivers-epic
title: The Four Drivers of the ERP Revolution
summary: The exact four-item answer the question bank asks for, remembered as EPIC — department to Enterprise, function to Process, silos to Integrated, departmental databases to one Common database — with the three silo challenges as DNS.
minutes: 12
tags: [four-drivers, EPIC, mnemonic, silos, DNS, process-view, integrated-database, BPR]
---

# The Four Drivers of the ERP Revolution

## The question and its exact answer

> [!EXAM]
> **Q: What were the four major drivers of the ERP revolution in the last four decades?**
>
> **A. The four major drivers are:**
> **(a) From department to enterprise**
> **(b) From function to processes**
> **(c) From information silos to integrated information system**
> **(d) From departmental database to company-wide integrated database**
>
> This is a **stated question-bank item with a stated four-part answer.** Reproduce all four, each as a *"from X to Y"* shift.

> [!INTUITION]
> **Mnemonic — the four drivers spell EPIC:**
>
> | Letter | Driver | From → To |
> |---|---|---|
> | **E** | **Enterprise** | from **department** → to enterprise |
> | **P** | **Process** | from **function** → to process |
> | **I** | **Integrated** | from **information silos** → to integrated information system |
> | **C** | **Common database** | from **departmental databases** → to one company-wide database |
>
> Each driver is a **widening**: one department becomes the whole enterprise, one function becomes an end-to-end process, many systems become one system, many databases become one database.
>
> **Say it as: "ERP made the company EPIC — Enterprise, Process, Integrated, Common database."**

> [!TRAP]
> All four are **"from → to"** statements, and marks are lost for giving only the destination. *"Integrated information system"* is half an answer; **"from information silos to an integrated information system"** is the whole one.
>
> Note also they are **not four separate events** — they are four *aspects of the same shift*, which is why they happened together over the same four decades.

## Driver 1 — From department to enterprise

Covered in full in the previous topic: departmental targets conflict with enterprise goals (**Production → Quantity, Sales → Variety**), capacity planning is not done, and consolidated planning is needed at enterprise level.

> [!EXAM]
> The shift in one line: **the unit of optimisation moves from the department to the enterprise.**

## Driver 2 — From function to process

> [!EXAM]
> **By the 1990s, business re-engineering brought in new thinking of the "process view":**
> - **Measurements were based on final outcomes** — important in a competing field
> - **Management actions had to focus on activities affecting the process rather than the function**
> - **Short-term capacity increase to meet deadlines**
> - **Visibility of all activities across functions related to a process**

> [!NOTE]
> **A business process is a sequence of interconnected activities performed across different departments to achieve a common business objective and deliver value to customers or stakeholders.**
>
> Simpler: **a series of activities that converts an input into a valuable output.**

> [!DERIVE]
> **A business process spans departments** — the deck's worked example:
>
> | Department | Activity |
> |---|---|
> | **Production** | Manufacturing items as per the order, and giving them to Quality for final inspection |
> | **Quality** | Inspecting quality as per customer spec, and moving goods to the finished-goods warehouse |
> | **Warehouse** | Picking the item from finished-goods stock |
>
> **No single department owns the outcome.** That is precisely why measuring departments separately fails, and why the process view had to replace the functional view.

> [!INTUITION]
> The clinching argument is the customer's point of view. Order a smartphone online and you **do not care** which department processed the order, who updated inventory, or which team raised the invoice. You care about **correct product, on-time delivery, good service.**
>
> **The customer only ever experiences the process.** They never experience your org chart — so optimising the org chart optimises something no customer can see.

> [!EXAM]
> **Functional vs Process orientation** — a comparison table worth reproducing:
>
> | Functional organization | Process-oriented organization |
> |---|---|
> | **Department-focused** | **Customer-focused** |
> | **Separate databases** | **Shared database** |
> | **Local optimization** | **Enterprise optimization** |
> | **Manual communication** | **Automated workflow** |
> | **Data duplication** | **Single source of truth** |
> | **Slow decision making** | **Real-time decision making** |
> | **Limited visibility** | **End-to-end visibility** |

## Driver 3 — From information silos to an integrated system

> [!EXAM]
> **Q: What are the three major challenges of information silos?**
>
> **A. (a) Duplication of data**
> **(b) No integration between the departmental databases**
> **(c) Systems not able to update all relevant information online**
>
> Another **stated question-bank answer with an exact count — three.**

> [!INTUITION]
> **Mnemonic — the three silo challenges are DNS:**
>
> - **D** — **Duplication** of data
> - **N** — **No integration** between departmental databases
> - **S** — **Systems can't update** everything online
>
> Convenient, because a DNS server is exactly the thing that stops every machine keeping its own private list of addresses — the same problem, one layer down.

> [!NOTE]
> **Before ERP**, the deck draws each department as its own stack of paper and its own PC, with the order thrown over the wall from **Sales → Production → Logistics → Billing**.
>
> **With ERP**, one ERP box sits in the middle with **Finance, Manufacturing, Inventory & Supply, Human Resources, Sales, Service and Data Analysis** arranged around it — **clients on one side, suppliers on the other**, and arrows running **both ways** to every module.

> [!EXAM]
> The **front-office / back-office** split shown on that diagram is worth knowing: **Sales, Service and other customer-facing functions are front office; Finance, Manufacturing, Inventory and HR are back office.** ERP sits between them and lets one event update both.

> [!EXAM]
> **Seamless integration in ERP** — *"tight linkage between operational planning and execution is very important."* One **Material/Product database** is accessed by:
>
> **Sales order processing · Inventory and warehouse management · Production · Marketing · Planning (forecasting, materials planning, procurement management, product costing) — and even customers and vendors!**

## Driver 4 — From departmental databases to one company-wide database

> [!EXAM]
> **Single database advantages — the exact three:**
> 1. **No data duplication**
> 2. **Data standardization**
> 3. **Data tracking**

> [!INTUITION]
> Three advantages that arrive in order, each depending on the one before:
>
> **One copy** (no duplication) makes it possible to agree **one format** (standardization), which makes it possible to follow a record's whole history (**tracking**).
>
> Tracking is the one students undervalue, and it is what makes **compliance and auditing** possible — item 9 on the disintegrated-data problem list. With five databases you cannot prove which number was the real one; with one, the audit trail exists by construction.

> [!TRAP]
> **"Centralized database" does not mean one physical server.** Large ERP deployments are distributed and replicated. What is centralized is the **logical single source of truth** — one authoritative definition of a customer, a vendor, a part number.
>
> The Nestlé case makes this concrete: the company was paying **29 different prices for vanilla to the same vendor** because "the same vendor" existed 29 times over. **Standardizing master data was an explicit project objective.**

## Putting the four together

> [!DERIVE]
> **The four drivers are one shift seen from four angles**, and they reinforce each other:
>
> $$\textbf{Enterprise view} \Rightarrow \text{needs} \Rightarrow \textbf{Process view} \Rightarrow \text{needs} \Rightarrow \textbf{Integrated system} \Rightarrow \text{needs} \Rightarrow \textbf{Common database}$$
>
> You cannot manage at enterprise level without seeing whole processes; you cannot see a whole process without an integrated system; an integrated system is only possible on shared data.
>
> **So if an exam asks you to "explain" rather than "list" the four drivers, this chain is the explanation** — each driver is the precondition for the next.

---

**Next:** the processes themselves — **business processes & the process view**.
