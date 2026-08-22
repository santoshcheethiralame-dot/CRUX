---
subject: erp
unit: 4
order: 1
slug: procurement-overview-cycle
title: Procurement — Definition & the Procurement Cycle
summary: What procurement is and why it is a fundamental ERP module, the seven-step process, and the eight-stage procurement cycle exactly as the deck's diagram draws it.
minutes: 10
tags: [procurement, PIM, procurement-cycle, PR, PO, goods-receipt, invoice-verification, transaction-intensive]
---

# Procurement — Definition & the Procurement Cycle

## What procurement is

> [!EXAM]
> **Definition:**
>
> > *"**Procurement is the process of sourcing materials from vendor, inspecting it and finally paying the vendor for the accepted materials.**"*
>
> - **Procurement is a requirement for almost every organization**
> - **Hence considered a fundamental module of any ERP system**
> - **It is a transaction intensive process**
> - **Widely used module**

> [!EXAM]
> The deck's **second definition**, from *purchasecontrol.com* (May 2019):
>
> > *"**Procurement management is a strategic approach to optimizing organizational spend.** It involves **sourcing, requisitioning, ordering, inspection, and reconciliation.** It means **acquiring your goods and services from preferred vendors, within your determined budget, either on or before the deadline.**"*

> [!INTUITION]
> **The two definitions differ in one word, and the difference is the whole chapter.**
>
> The first is **operational** — *source it, inspect it, pay for it.* The second calls procurement a **"strategic approach to optimizing organizational spend."**
>
> That gap is exactly what the **procurement maturity model** later formalises: level 1 is the first definition, level 3 is the second. **A department that only executes purchase orders is at level 1; a department that shapes what the company spends is at level 3.**
>
> Notice also the deck's own reasoning for why this module matters so much: **"a requirement for almost every organization"** and **"transaction intensive."** Those two together are the classic ERP case — **high volume, universal, rule-governed** — which is why procurement is a *fundamental* module rather than an optional one, and why **MM (Materials Management)** is one of SAP's core modules.

## The procurement process

> [!EXAM]
> **The seven-step process, as the deck lists it:**
>
> 1. **Determining what to buy and how much — Procurement Planning**
> 2. **Determination of the source of supply**
> 3. **Selecting the vendor**
> 4. **Purchase Order (PO) creation**
> 5. **Goods Receipt (GR)**
> 6. **Invoice verification**
> 7. **Processing vendor payment**

## The procurement cycle

> [!EXAM]
> **The deck's cycle diagram is drawn as an eight-stage loop** — this is the version to reproduce when a question says *"explain a typical procurement cycle"*:
>
> $$\textbf{Requirement Determination} \rightarrow \textbf{Source of Supply Determination} \rightarrow \textbf{Vendor Selection} \rightarrow \textbf{Order Processing}$$
> $$\rightarrow \textbf{Purchase Order Monitoring} \rightarrow \textbf{Goods Receipt} \rightarrow \textbf{Invoice Verification} \rightarrow \textbf{Payment Processing} \rightarrow \textit{(back to the start)}$$
>
> A second diagram in the same deck draws a **five-stage** summary loop: **Procurement Planning → Source Determination / Vendor Selection → Purchase Order Creation → Goods Receipt → Vendor Payment.**

> [!TRAP]
> **Three versions of the same cycle appear in this deck, with 5, 7 and 8 stages.** They are not contradictory — they are different granularities of one loop:
>
> | 5-stage loop | 7-step list | 8-stage diagram |
> |---|---|---|
> | Procurement Planning | Determining what to buy | **Requirement Determination** |
> | Source Determination / Vendor Selection | Source of supply · Selecting the vendor | **Source of Supply Determination · Vendor Selection** |
> | Purchase Order Creation | PO creation | **Order Processing · Purchase Order Monitoring** |
> | Goods Receipt | Goods Receipt | **Goods Receipt** |
> | Vendor Payment | Invoice verification · Vendor payment | **Invoice Verification · Payment Processing** |
>
> **The eight-stage diagram is the safest one to draw** — it is the most detailed, and every shorter version collapses out of it. Its two extra stages over the seven-step list are **Purchase Order Monitoring** (chasing the order after it is placed) and the splitting of *order* into **processing** and **monitoring**.

> [!DERIVE]
> **Why it is drawn as a cycle rather than a line** is worth one sentence in an answer.
>
> Payment processing does not end the story — **it feeds the next requirement determination**, because the same materials are consumed again and must be bought again. Procurement for a manufacturer is **continuous and repeating**, not a one-off project.
>
> That is also why it hands off cleanly at both ends:
>
> $$\textbf{MRP run} \rightarrow \textbf{Purchase Requisition} \rightarrow \underbrace{\textbf{the procurement cycle}}_{\text{this chapter}} \rightarrow \textbf{Accounts Payable}$$
>
> **The requirement comes from MRP** (Unit 3), and **the payment lands in AP** (Unit 3's finance chapter). Procurement is the middle of **Procure-to-Pay**, and P2P's stages — *purchase requisition → approval → purchase order → goods receipt → invoice → payment* — are this cycle under a different name.

> [!INTUITION]
> **Read the cycle as four questions and it stops being eight boxes to memorise:**
>
> | Question | Stages |
> |---|---|
> | **What do we need?** | Requirement Determination |
> | **Who will supply it?** | Source of Supply Determination · Vendor Selection |
> | **Order it and chase it** | Order Processing · Purchase Order Monitoring |
> | **Did it arrive, and do we owe them?** | Goods Receipt · Invoice Verification · Payment Processing |
>
> **Need · source · order · settle.**
>
> Note that **three of the eight stages are about settling up** — GR, invoice verification and payment. That proportion is not accidental: it is where the money moves, where fraud and error live, and consequently where ERP's controls concentrate. **Three-way matching**, in the next topic, exists precisely there.

---

**Next:** what the software actually adds at each stage — **how ERP supports the procurement cycle**.
