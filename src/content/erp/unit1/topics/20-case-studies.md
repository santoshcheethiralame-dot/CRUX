---
subject: erp
unit: 1
order: 20
slug: case-studies
title: Case Studies — Nestlé USA & Agilent
summary: Nestlé's BEST project from the 29 vanilla prices through the 2000 rebellion to $371 million saved, Agilent's Project Everest and its $105 million revenue loss, and the lessons both companies drew — remembered as DUKE.
minutes: 13
tags: [case-study, nestle, agilent, BEST, project-everest, SAP, oracle, DUKE, lessons, failure]
---

# Case Studies — Nestlé USA & Agilent

Two real implementations, two vendors, two outcomes — and, strikingly, **the same lesson**.

## Nestlé USA — Project BEST

### Background — Nestlé

> [!EXAM]
> - **Founded 1866, Switzerland**
> - **World's largest food company**, **#64 (2017)** in *Fortune* magazine's Global 500
> - In the USA: **33 manufacturing facilities, 6 distribution centers, 17 sales offices, 17,300 employees** nationwide
> - *"World's most admired Food Company"*

### The business challenges

> [!EXAM]
> After the brands were unified and reorganized into **Nestlé USA in 1991**, divisions were still **geographically dispersed**:
>
> - **Nestlé USA's brands were paying 29 different prices for vanilla — to the same vendor**
> - **Nine different general ledgers and 28 points of customer entry**
> - **Years of autonomous operation provided an almost "insurmountable hurdle"**
>
> > *"Nestlé was the world's No. 1 food and beverage company — but one of the least efficient."*

> [!INTUITION]
> **The vanilla figure is the single best illustration in the whole unit** — memorise it.
>
> **29 prices, one vendor.** Nobody was incompetent; each division negotiated sensibly in isolation. What was missing was **any way to know that the other 28 existed** — the pure form of an information silo, and of the "Multi" problem of many divisions.
>
> **Nine general ledgers** is the same defect in Finance, and **28 points of customer entry** means the company could not say how many customers it had. Every one of these is a **master data** failure — which is why *"standardizing master data"* became an explicit project objective.

### Project scope — Nestlé

> [!EXAM]
> - **Five SAP modules** — **purchasing, financials, sales and distribution, accounts payable and accounts receivable** — plus **Manugistics' supply chain module**
> - **October 1997 to Q1 2000**
> - **$210 million budget**
> - **50 senior executives and 10 senior IT people** on the team

### Project objectives — "One Nestlé, under SAP"

> [!EXAM]
> - **Transforming the separate brands into one highly integrated company**
> - **Internally aligned and united, establishing a common business process architecture**
> - **Standardizing master data**

### The implementation — what went wrong

> [!EXAM]
> - **The new business process confused most of the employees**
> - **Then resistance grew into rebellion in 2000**
> - **Reconstructed in June 2000 and completed in 2001**

> [!TRAP]
> **Note the sequence: confusion → resistance → rebellion.** It is not that the software failed — it is that **people did not understand the new processes**, and misunderstanding hardened into refusal.
>
> This is *"managing change"* and *"employee comfort on technology/use"* playing out for real, and it is why change management gets an entire unit of its own. The project **overran by more than a year** and had to be **reconstructed** — not rewritten, *reconstructed*, meaning the approach was rebuilt rather than the code.

### The outcome

> [!EXAM]
> **Changes and success:**
> - **Common database and business processes lead to more trustworthy demand forecast**
> - **A comprehensive account planning tool**
> - **Nestlé can now forecast down to the redistribution center level**
> - **Improved forecast accuracy by 2%**
> - **Higher factory utilization** — **fewer factories = big gains in factory utilization**
> - **Reduced inventory level**
>
> **Saved $371 million until 2001** — the favourable evolution of **COGS** (cost of goods sold) continued, with annual incremental savings accumulating year on year.

> [!DERIVE]
> **Trace the causal chain — it is the four drivers in miniature:**
>
> $$\textbf{Common database} \rightarrow \textbf{trustworthy forecast} \rightarrow \textbf{forecast to RDC level} \rightarrow \textbf{+2\% accuracy} \rightarrow \textbf{higher utilization} + \textbf{lower inventory} \rightarrow \textbf{\$371M}$$
>
> **Everything starts with the common database** — driver **C** of EPIC. And note that **2% forecast accuracy** sounds trivial but converts into hundreds of millions, because a food company's inventory is enormous and perishable.
>
> **Set the numbers against each other:** **$210 million budget, $371 million saved by 2001.** Even with the overrun and the rebellion, Nestlé came out ahead — which is worth saying, because the case is often taught as a failure. **It is a troubled project with a positive return.**

### Nestlé's four lessons

> [!EXAM]
> 1. **Don't start a project with a deadline in mind**
> 2. **Update your budget projection at regular intervals**
> 3. **ERP isn't only about the software** — *"No major software implementation is really about the software,"* said former Nestlé CIO **Jeri Dunn**. *"You are challenging their principles, their beliefs and the way they have done things for many many years"*
> 4. **Keep the communication lines open**

> [!INTUITION]
> **Mnemonic — Nestlé's four lessons spell DUKE:**
>
> | Letter | Lesson |
> |---|---|
> | **D** | **Deadline** — don't start with one in mind |
> | **U** | **Update** your budget projection regularly |
> | **E** | **ERP isn't only about the software** |
> | **K** | **Keep** communication lines open |
>
> Each maps onto a challenge from Chapter 2: **D** ↔ *long timeline / infeasible deadline*, **U** ↔ *huge budget / cost overruns*, **E** ↔ *socio-technical system*, **K** ↔ *managing change*.

## Agilent Technologies — Project Everest

### Background — Agilent

> [!EXAM]
> - **The world's leading designer, developer and manufacturer of electronic and optical test, measurement and monitoring systems**
> - **Separated from Hewlett Packard and became a public company in 1999**
> - **World HQ in Palo Alto, CA**
> - **Facilities in more than 40 countries**; products manufactured in the **U.S., China, Germany, Japan, Malaysia, Singapore, Australia and the U.K.**
> - **~37,000 employees**; customers in **more than 120 countries**
>
> **Three business groups:** **Test and Measurement · Semiconductor Products · Chemical Analysis**

### Project scope — Agilent

> [!EXAM]
> - **Oracle's E-Business Suite** software
> - **September 2000 to 2004**
> - **$220 million budget**
> - **Roughly 100 Oracle consultants** to install the program

### Objectives

> [!EXAM]
> - **"One IT" organization**
> - **Supply chain capability** — for example, suppliers and customers
> - **Migrating 2,200 legacy applications** inherited from HP to Oracle
>
> **The One IT project** — CIO **Marty Chuck** developed the vision in **August 2000**, moving **more than 2,500 IT professionals** from site, regional and divisional IT organizations. Its objectives:
> - **Consolidate a large number of independent operating groups into a single worldwide IT function**
> - **Share information quickly and efficiently**
> - **Drive operational costs down by more than 20%**
> - **Combine all IT budgets**

> [!EXAM]
> **Changes in the supply chain process:**
>
> | For suppliers | For customers |
> |---|---|
> | Migrating from all existing ERP systems to a **single Oracle-based infrastructure** | **Real-time information about inventory and order status** |
> | **Use of bar code** for materials received | **Easier to understand invoicing and pricing** |
> | **Use of Evaluated Receipt Settlement (ERS)** — an **automated invoice and payment system** | **Improved visibility on product delivery lead time** |

> [!INTUITION]
> **ERS is P2P taken to its conclusion** and worth understanding as such. In normal Procure-to-Pay you match **purchase order → goods receipt → invoice**. With Evaluated Receipt Settlement you **drop the invoice entirely** — the buyer pays automatically on the goods receipt, computed from the agreed PO price.
>
> **No invoice means no invoice disputes and no matching effort.** It is only possible when both parties trust one shared set of data — precisely the ERP II move of reaching **outside the company boundary**.

### The troubles

> [!EXAM]
> - Because of the **consolidation of its 2,200 software systems to under 20**, **confusion meant lost orders and revenue**
> - **An $88 million reduction in third-quarter orders** — of that, **$38 million was lost** and **$50 million pulled through to the fourth quarter**
> - **$105 million in lost revenue and $70 million in operating profit**
> - **Mistakes converting backlog:** *"The other problem we had was converting backlog from legacy to new systems, especially for our highly configured products in our test and measurement operation."*
> - **An extra $35 million** to cover costs of the ERP and CRM rollout

> [!TRAP]
> **Distinguish the $88 million from the $38 million** — exam questions exploit the difference. Orders fell by **$88M**, but only **$38M was permanently lost**; the other **$50M was delayed** into the next quarter. **A delayed order is not a lost one.**
>
> Note also the cause of the worst damage: **converting backlog**, and specifically for **highly configured products**. Customised, complex data is the hardest to migrate — the practical face of *"data quality loss — Garbage In, Garbage Out."*

### Agilent's lessons

> [!EXAM]
> - **ERP implementations are a lot more than software packages**
> - **People, processes, policies and culture are all factors** that should be taken into consideration when implementing a major enterprise system
> - **ERP disasters are often caused by a user company itself**
> - **Study ERP well before implementation** — *"The disruptions after going live were more extensive than we expected"* — CEO **Ned Barnholt**

> [!TRAP]
> **"ERP disasters are often caused by a user company itself"** is the most uncomfortable line in the unit, and it is examinable.
>
> The reflex after a failure is to blame the vendor or the consultants. Agilent's own conclusion is that **the customer's readiness — its data, its processes, its people — is usually the deciding factor.** Nobody outside the company can fix bad master data or departmental resistance.

## The two cases side by side

> [!EXAM]
> | | **Nestlé USA** | **Agilent** |
> |---|---|---|
> | **Project name** | **BEST** | **Project Everest** |
> | **Vendor** | **SAP** (+ Manugistics SCM) | **Oracle E-Business Suite** |
> | **Period** | **1997 – 2001** | **2000 – 2004** |
> | **Budget** | **$210 million** | **$220 million** |
> | **Core problem** | **Fragmented divisions** — 29 vanilla prices, 9 ledgers | **2,200 legacy applications** from the HP separation |
> | **What went wrong** | **Employee confusion → rebellion (2000)** | **Lost orders during cut-over; backlog conversion errors** |
> | **Damage** | Overran by **more than a year** | **$105M lost revenue, $70M operating profit, +$35M costs** |
> | **Outcome** | **$371 million saved by 2001** | Recovered, but at heavy cost |

> [!INTUITION]
> **Both companies, independently, reached the same conclusion** — and if you remember one thing from this topic, make it this pairing:
>
> > **Nestlé:** *"No major software implementation is really about the software."*
> > **Agilent:** *"ERP implementations are a lot more than software packages. People, processes, policies and culture are all factors."*
>
> Different decades, different vendors, different industries, **identical lesson** — which is the empirical proof of the course's closing claim that **ERP is a socio-technical system** and *"a combination of technology and business process models in equal measure."*
>
> Note too that **neither company was badly run**. Nestlé was the world's largest food company; Agilent was a market leader spun out of HP. **ERP implementations damage competent organisations** — which is why the Standish figure of **10% success** is believable.

---

That closes Unit 1 — from **what ERP is**, through **why organisations needed it** and **how it evolved**, into **how it is implemented and deployed**, and finally **what it costs, what it returns, and what happens when it goes wrong.**
