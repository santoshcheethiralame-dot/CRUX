---
subject: erp
unit: 5
order: 5
slug: plm
title: Product Lifecycle Management (PLM)
summary: What PLM is, why it is cross-functional, the eleven business drivers from the question bank's model answer, and a map of the fifteen PLM questions the syllabus asks — flagged as built from the question bank because no PLM deck was supplied.
minutes: 9
tags: [PLM, product-lifecycle, cross-functional, PDM, business-drivers, regulatory-compliance, MSDS, EBOM, MBOM, gap-flagged]
---

# Product Lifecycle Management (PLM)

> [!NOTE]
> **Source note — read this first.**
>
> The Unit 5 chapter map lists a **PLM module chapter (Ch. 14 / textbook Ch. 31, pages 468–482, 38 slides)**, and the question bank asks **fifteen PLM questions**. **No PLM deck was supplied with the material for this unit.**
>
> Everything below is built strictly from **the one authoritative PLM answer in the supplied Sample Questions and Answers**, plus the **question bank's own wording**, plus the PLM references that appear inside the other decks. **Nothing here is invented** — but this topic is necessarily thinner than the rest of the unit, and the remaining question-bank items are mapped rather than answered.
>
> **If the PLM deck turns up, this topic should be rebuilt from it.**

## What PLM is

> [!EXAM]
> **The QnA's model answer — *"What is PLM? Why is product lifecycle management cross-functional? What are the business drivers for a PLM application?"***
>
> - **Product lifecycle management (PLM) is a new set of enterprise applications that manages all data and information about a product from its initial conception to retirement**
> - **Product lifecycle includes conceptualization of the product, design, manufacturing, ensuring quality of the product throughout its life cycle, ensuring product safety during its manufacturing, distribution and usage, and finally service — from concept to development till the product retires from service**
> - **PLM processes are cross functional — they involve multiple functions: R&D, Engineering, Marketing, Production, Quality, Sales and Service**

> [!INTUITION]
> **PLM is to a *product* what HCM is to an *employee* and CRM is to a *customer*** — and stating that parallel is the fastest way to hold what the module is.
>
> | Module | Manages the life cycle of | From | To |
> |---|---|---|---|
> | **HCM** | **an employee** | recruitment | retirement |
> | **CRM** | **a customer** | lead | repeat customer |
> | **PLM** | **a product** | **initial conception** | **retirement from service** |
>
> **All three are the same architectural idea: take one long-lived entity, and hold every piece of information about it in one place across every function that touches it.** That is why *"Hire-to-Retire"* and *"concept to retirement"* sound alike — they are the same sentence about different subjects.
>
> **And the reason PLM is cross-functional is contained in that span.** No single department owns a product for its whole life: **R&D conceives it, Engineering designs it, Production makes it, Quality certifies it, Marketing positions it, Sales sells it, Service repairs it.** Seven functions, one object.
>
> $$\textbf{one product} \times \textbf{seven functions} \;\Rightarrow\; \textbf{seven partial views, unless something unifies them}$$
>
> **That is exactly the information-silo problem again** — the same defect as Nestlé's twenty-nine vanilla records and as the fragmented customer view CRM exists to fix. **PLM is the third instance of the pattern.**

## The eleven business drivers

> [!EXAM]
> **Business drivers for a PLM application**, verbatim from the QnA:
>
> 1. **Product Variants and growing product lines**
> 2. **Shorter product development cycles**
> 3. **Cost reduction pressure**
> 4. **Reduced engineering resources**
> 5. **Collaboration needs with local and global partners**
> 6. **Regulatory compliance pressure**
> 7. **Process and data integration needs between R&D, Production, Supply**
> 8. **Innovation focus** — **business model, processes, product**
> 9. **Intellectual asset management**
> 10. **Documentation control**
> 11. **Product Variants and growing product lines**

> [!DERIVE]
> **Eleven drivers, and they fall into four groups — which is how to reproduce them under exam conditions.**
>
> | Group | Drivers | The pressure |
> |---|---|---|
> | **More products, less time, less money** | product variants and growing product lines · shorter development cycles · cost reduction pressure · reduced engineering resources | **do more with less, faster** |
> | **More people involved** | collaboration with local and global partners · process and data integration between R&D, Production, Supply | **the product is designed across organisations** |
> | **More rules to obey** | regulatory compliance pressure | **safety and environmental law** |
> | **More to protect and record** | intellectual asset management · documentation control · innovation focus | **the design *is* the asset** |
>
> **The first group is a squeeze from both ends and is the strongest single argument for PLM.** Companies are producing **more variants** of **more products** in **less time** with **fewer engineers** — and those four cannot all be satisfied by working harder. **The only way is to stop re-designing what has already been designed**, which requires knowing what exists. That is what PLM's data management is for.
>
> **The second group explains why it must be a system rather than a shared drive.** When *"hundreds of sub-part suppliers"* co-develop a product — the phrase is from this unit's own collaborative-planning slide — **design data crosses company boundaries**, and email cannot manage revision control across organisations.
>
> **The third group is where PLM becomes non-optional.** Regulatory compliance is not a benefit you choose; **you cannot sell a chemical, a drug or a vehicle without the documentation.** The question bank's PLM items dwell on exactly this: **environmental safety and product compliance, chemical safety, hazardous material management, regulatory reporting, and the master safety data sheet.**
>
> **And "documentation control" is the mechanism underneath all of it.** A product's specification changes hundreds of times; **knowing which revision is current, and which revision a shipped unit was built to**, is the difference between a targeted recall and a total one.

> [!TRAP]
> **The list as printed repeats "Product Variants and growing product lines" at both ends** — it appears first and again last in the source. **That is a duplication in the QnA document, not two different drivers.** Treat it as **ten distinct drivers**, and do not lose a mark trying to distinguish them.

## Where PLM appears elsewhere in this course

> [!EXAM]
> **PLM is referenced in four other places in the supplied material, and those references are usable:**
>
> | Where | What it says |
> |---|---|
> | **Unit 3 — ERP modules** | **PLM** is one of the **twelve ERP modules** |
> | **Unit 3 — evolution table** | **PLM: earlier = Quality Mgmt, Product Dev Project mgmt → now = Product Data mgmt, Doc Mgmt, Product Safety** |
> | **Unit 4 — BOM types** | **CADBOM · EBOM · MBOM** — *"type details discussed in the PLM chapter"* |
> | **Unit 5 — industry processes** | **patent management, managing intellectual property, secrecy of formulation** (pharma); **managing fashion, style, design** (apparel) |
>
> **The evolution row is the most useful of the four**, because it names PLM's three current capability areas directly: **Product Data Management · Document Management · Product Safety** — and those map onto question-bank items 6, 9/10 and 12/13/14 respectively.

> [!INTUITION]
> **The EBOM / MBOM distinction from Unit 4 is PLM's clearest concrete contribution**, and it is worth carrying here because the question bank asks *"how do PLM applications help in managing bill of material and manufacturing part number?"*
>
> | | **EBOM** | **MBOM** |
> |---|---|---|
> | Built by | **engineering** | **manufacturing** |
> | Structured by | **function** — how the product works | **assembly sequence** — how it gets built |
> | Includes | designed components | **plus packaging, consumables, and anything the factory needs that the engineer never listed** |
>
> **EBOM ≠ MBOM, and reconciling them is a real problem in practice.** PLM owns the engineering side and hands over to ERP's manufacturing side — **which is exactly where the two systems meet**, and why the question bank pairs *"bill of material"* with *"manufacturing part number"*: the same physical part carries **one identity in design and another in production**, and something must hold the mapping.
>
> **That handover is also the honest answer to *"what are the differences of a PLM application from an ERP application?"*** — **PLM manages the product *before and around* it is made; ERP manages *making and selling* it.** PLM's world is designs, revisions, documents and approvals; ERP's world is orders, stock, costs and postings. **The BOM is where they meet.**

> [!EXAM]
> **The remaining question-bank items, mapped to what the supplied material supports:**
>
> | # | Question | Supported by |
> |---|---|---|
> | 1 | What is PLM? cross-functional? business drivers? | **fully answered above (QnA)** |
> | 2 | Value propositions of a PLM solution | derivable from the eleven drivers |
> | 3 | Phases of a typical product life cycle | **the QnA's own span**: conceptualization → design → manufacturing → quality → safety → service → retirement |
> | 4 | Differences of PLM from ERP | the EBOM/MBOM handover above |
> | 5, 8 | Typical / core and advanced PLM capabilities | evolution row: **PDM, Doc Mgmt, Product Safety** |
> | 6 | Product data management and PDM capabilities | evolution row: *"Product Data mgmt"* |
> | 7, 11 | Requirement, product safety, project & portfolio management | evolution row + Unit 4 requirements management |
> | 9 | PLM and change management | Unit 4's **change request process** applied to design |
> | 10 | Bill of material and manufacturing part number | **EBOM / MBOM above** |
> | 12, 13, 14 | Environmental safety, compliance, regulatory reporting, **master safety data sheet** | evolution row: *"Product Safety"* + pharma/chemical industry processes |
> | 15 | PLM market space, leading vendors and products | **the assignment names two: SAP (SAP PLM) and PTC (Windchill)** |
>
> **Item 15 has a definite answer from the supplied assignment sheet: SAP PLM and PTC Windchill.** The others should be answered from the drivers and the three capability areas until the deck is available.

---

**Next:** the largest module in the unit — **supply chain management: definition, flows & SCOR**.
