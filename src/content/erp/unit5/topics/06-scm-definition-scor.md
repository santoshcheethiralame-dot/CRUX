---
subject: erp
unit: 5
order: 6
slug: scm-definition-scor
title: SCM — Definition, Flows & SCOR
summary: What supply chain management is and why it became crucial, the three flows it tracks, the SCOR model's five processes with its supplier-to-customer diagram, and the seven rights of logistics.
minutes: 11
tags: [SCM, IRP, material-flow, information-flow, financial-flow, SCOR, plan-source-make-deliver-return, seven-rights, WIP, ASN, 3PL]
---

# SCM — Definition, Flows & SCOR

## What SCM is

> [!EXAM]
> - **SCM is the oversight of materials, information, and finances as they move in a process from supplier to manufacturer to wholesaler to retailer to consumer**
> - **Supply chain management involves coordinating and integrating these flows both within and among companies / users**
> - **Goal of an effective supply chain management system is to reduce cost of inventory and efficient movement of materials (supply)**

> [!EXAM]
> **Why SCM has become crucial:**
> - **Manufacturing at multiple sites, many vendors, distributors**
> - Example: *"consider the situation of **Big Bazaar ordering for supply of plastic chairs** to a manufacturer with many facilities across the country"*
> - **A method to optimize overall demand and supply flow**
> - **Also known as IRP — Intelligent Resource Planning**

> [!INTUITION]
> **The definition's phrase *"both within and among companies"* is what separates SCM from everything before it in this course.**
>
> ERP optimises **inside one company**. SCM optimises **across companies that do not share a management, a system or an incentive** — and that is a fundamentally harder problem, because you cannot instruct your supplier the way you can instruct your own plant.
>
> $$\textbf{MRP: one factory} \;\rightarrow\; \textbf{MRP II: one company} \;\rightarrow\; \textbf{ERP: one enterprise} \;\rightarrow\; \textbf{SCM: the network}$$
>
> **That is Unit 3's four-decade evolution table with its last ring named** — *"Extended ERP, ERP II: focussed on clients, **optimizing the whole business network, including suppliers and clients**."* **SCM is what that ring contains.**
>
> **The Big Bazaar example makes the point concretely:** the retailer's order is simple; **deciding which of the manufacturer's many facilities should make it, and how it should be routed**, is the problem — and no single company's ERP contains all the information needed to answer it.

> [!TRAP]
> **"Also known as IRP — Intelligent Resource Planning" is a deck-specific label** and is not standard industry usage. **Know it because it is on the slide**, but recognise that SCM is the term everyone actually uses.

## What SCM typically includes

> [!EXAM]
> **SCM typically includes:**
>
> | Area | Covers |
> |---|---|
> | **Inventory management** | **track costs and needs and optimize inventory levels** |
> | **Warehouse management** | **space utilizations · interfaces to material moving equipment · integrate with material identification technology** |
> | **Transportation management** | **carrier selection, loading, routing, scheduling…** |
>
> **Current-day SCMs support "open data models"; allowing for sharing of data even outside the enterprise:**
> - **Suppliers would know status of inventory**
> - **Customers would know status of orders, lead times…**

> [!DERIVE]
> ***"Open data models"* is the technical precondition for everything else in this chapter**, and it is worth understanding why.
>
> A classical ERP is **closed by design** — its data is the company's, protected by authorisation objects and org structures. **SCM requires the opposite**: your supplier must see your inventory, your customer must see your order status.
>
> | Who sees what | What it enables |
> |---|---|
> | **suppliers see your inventory** | they can replenish without being told → **VMI** |
> | **customers see order status and lead times** | fewer status calls, better planning at their end |
>
> **Every collaborative technique later in this chapter — VMI, CPFR, collaborative forecasting — is an application of this one capability.** And the risk it creates is equally real: **commercially sensitive data crosses the company boundary**, which is why the deck's own note observes that *"a company may expose only limited data — directly or through batch feeds, EDI etc."*
>
> **This is also why SaaS and SOA appear later in the same unit.** Sharing data across organisations needs **standards and interfaces**, not point-to-point custom integrations — which is exactly the argument the **EAI** slide makes.

## The three flows

> [!EXAM]
> **SCM tracks the flow of three things:**
>
> 1. **Material movement** — **movement of goods from a supplier to a customer**
> 2. **Information / Documentation flow** — **mandatory forms, import/export, license-permit…**; *"the information flow involves **transmitting orders and updating the status of delivery**"*
> 3. **Financial tracking** — **payment schedules, COD (Cash on Delivery) handling…**

> [!INTUITION]
> **Three flows, and they do not all move in the same direction** — which is the observation that makes the model useful.
>
> | Flow | Direction |
> |---|---|
> | **Material** | **downstream** — supplier → manufacturer → distributor → retailer → customer |
> | **Information** | **both ways** — orders travel **upstream**, delivery status travels **downstream** |
> | **Money** | **upstream** — the customer pays, and payment works back along the chain |
>
> $$\textbf{goods flow down} \qquad \textbf{money flows up} \qquad \textbf{information flows both ways}$$
>
> **The information flow is the one that can be improved almost for free, and that is the whole leverage of modern SCM.** Moving material faster costs money — faster trucks, more warehouses. **Moving information faster costs almost nothing once the systems are connected** — and better information substitutes directly for inventory.
>
> **That substitution is the chapter's recurring theme.** VMI replaces buffer stock with **shared consumption data**. CPFR replaces two conflicting forecasts with **one shared forecast**. Cross-docking replaces storage with **synchronised schedules**. **Every one trades inventory for information.**

> [!EXAM]
> **Related terms and concepts the deck lists:**
>
> **WIP — Work in Progress · ASN — Advanced Shipping Notice · GRN — Goods Received Note · AWB — Airway Bill Number / Bill of Lading · VMI — Vendor Managed Inventory · 3PL — Third Party Logistics**
>
> **And its motivating question:** *"Consider the cost of a mineral water bottle. **How much does it cost you at the corner shop? How much would be the raw material cost? Is there a difference? Is it significant? Why?**"*

> [!TRAP]
> **The mineral-water question is the chapter's thesis in disguise, and it is worth answering rather than skipping.**
>
> The **water itself is nearly free.** Almost the entire retail price is **bottling, packaging, transport, storage, distribution margin and retail margin** — that is, **supply chain cost, not product cost.**
>
> $$\textbf{retail price} - \textbf{raw material cost} \;=\; \textbf{the supply chain}$$
>
> **Which is why supply chain optimisation is worth so much:** for a low-value, high-volume, bulky product, **there is far more margin to be found in moving it than in making it.** The same logic explains why **retail** is named as the industry segment with the highest reliance on supply chain, and why **Wal-Mart** is the standing example for both VMI and cross-docking.

## The SCOR model

> [!EXAM]
> **SCOR = Supply Chain Operational Reference** *(the deck's speaker note expands it as **Supply Chain Operation Reference Model**)*
>
> **The five basic components of a supply chain management system:**
>
> $$\textbf{Plan} \cdot \textbf{Source} \cdot \textbf{Make} \cdot \textbf{Deliver} \cdot \textbf{Return}$$
>
> **The deck's diagram — *"SCOR is Based on Five Distinct Management Processes"* — draws the five processes repeating along the chain:**
>
> $$\textbf{Suppliers' Supplier} \rightarrow \textbf{Supplier} \rightarrow \textbf{Your Company} \rightarrow \textbf{Customer} \rightarrow \textbf{Customer's Customer}$$
>
> Each link carries **Source · Make · Deliver** with **Return** beneath it, and **Plan** sitting above — with the company's own **Plan** spanning the whole chain.
>
> The deck's own aside: ***"Have we seen this slide earlier? — BPM!"***

> [!DERIVE]
> **Two features of the SCOR diagram carry all the meaning.**
>
> **① The same five processes repeat at every link.** Your **Deliver** is your customer's **Source**. Their **Deliver** is their customer's **Source**. **That is what makes it a *reference* model** — one vocabulary that describes every company in the chain, so two trading partners can talk about their processes in the same terms.
>
> **This is exactly the goods-issue/goods-receipt symmetry from Unit 4** — *"your goods issue is your customer's goods receipt"* — generalised to five processes and drawn across five companies.
>
> **② "Plan" sits above the others and spans further.** Each company plans its own link, but **your Plan reaches across your suppliers and customers**, which is the diagram's way of saying that planning is where cross-company coordination happens. **Source, Make, Deliver and Return are executed locally; Plan is what has to be shared.**
>
> **That split is precisely the SCP-versus-SCE distinction** the next topics develop: **planning is collaborative and optimisable; execution is local and transactional.**
>
> **③ "Return" is a first-class process, not an afterthought.** Most process models stop at Deliver. SCOR gives returns equal standing because **reverse logistics is a real and expensive flow** — recalls, warranty, faulty goods, end-of-life. It is the same *"inbound, outbound **and reverse** logistics"* that Oracle Inventory Management advertised, and the same reverse flow that **field service** manages for spare parts.
>
> **The deck's *"Have we seen this slide earlier? — BPM!"*** points at Unit 2: **SCOR is one of the named process-modelling standards**, alongside **APQC, BPMN, EPC and UML**. **It is a business process framework that happens to be about supply chains.**

## The seven rights

> [!EXAM]
> **The seven "rights" of logistics — to deliver:**
>
> 1. **the right product**
> 2. **in the right quantity**
> 3. **and the right condition**
> 4. **to the right place**
> 5. **at the right time**
> 6. **for the right customer**
> 7. **at the right price**
>
> **"These seven rights highlighted the importance of moving and storing materials in an efficient, timely, and reliable manner."**

> [!INTUITION]
> **Mnemonic — the seven rights are the answers to *what, how much, how good, where, when, who and how much does it cost*:**
>
> | Question | Right |
> |---|---|
> | **what** | right **product** |
> | **how much** | right **quantity** |
> | **in what state** | right **condition** |
> | **where** | right **place** |
> | **when** | right **time** |
> | **for whom** | right **customer** |
> | **at what cost** | right **price** |
>
> **They are not seven independent goals — they are seven ways one delivery can be wrong**, and getting six of seven right still means the delivery failed. **The right product, quantity, condition, place and customer at the wrong *time* is a stock-out; everything right except the *price* is an unprofitable order.**
>
> **That "all or nothing" character is why supply chain performance is so hard to measure with a single number**, and why the KPI lists in Unit 4 ran to nine measures for inventory alone.

---

**Next:** the three levels at which supply chains are planned — **strategic, tactical & operational planning**.
