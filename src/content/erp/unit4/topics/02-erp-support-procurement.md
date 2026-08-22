---
subject: erp
unit: 4
order: 2
slug: erp-support-procurement
title: How ERP Supports the Procurement Cycle
summary: The stage-by-stage ERP support table, what happens at goods receipt and invoice verification, and three-way matching with the invoice-blocking controls around it.
minutes: 11
tags: [ERP-support, purchase-requisition, RFQ, three-way-matching, invoice-blocking, goods-receipt, ERS, credit-memo]
---

# How ERP Supports the Procurement Cycle

## Stage by stage

> [!EXAM]
> **The deck's cycle diagram annotates each stage with what ERP adds:**
>
> | Cycle stage | **ERP Support** |
> |---|---|
> | **Procurement Planning** | **Auto creation of PR by MRP run** · **easy entry of PR data** in case of manual PR · **different planning and lot sizing tools** |
> | **Source Determination / Vendor Selection** | **Purchase Info record** · **Scheduling Agreement** · **Contract** · **auto Request for Quotation creation** · **comparison of vendor quotes** |
> | **Purchase Order Creation** | **Auto creation of P.O. from PR, RFQ** · **minimum data entry** · **can automatically calculate price based on conditions** · **electronic P.O. communication to vendor** |
> | **Goods Receipt** | **Goods receipt in different scenarios** · **auto updation of stock and inventory valuation** |
> | **Vendor Payment** | **Auto matching of invoices with GR qty and P.O. price** · **blocking of invoices** · **reporting of aging invoices** |

> [!INTUITION]
> **Every entry in that column is one of three things**, and naming which makes the table reproducible rather than memorisable:
>
> | Kind of help | Examples |
> |---|---|
> | **Don't type it again** | auto PR from MRP, auto PO from PR/RFQ, minimum data entry, auto price calculation |
> | **Don't do the arithmetic yourself** | auto matching of invoices, auto stock and valuation update, quote comparison |
> | **Don't let a mistake through** | invoice blocking, under/over delivery check, shelf-life check |
>
> **Re-keying, reconciliation, and control.** That is the entire value proposition of an ERP in a transaction-intensive process — and it is why *"transaction intensive"* was given as the reason procurement is a fundamental module.

## Goods receipt

> [!EXAM]
> **At Goods Receipt (GR), ERP provides:**
> - **Quality inspection and shelf life expiration check**
> - **Under / over delivery check and report**
> - **Auto updation of stock and inventory valuation**

> [!TRAP]
> **"Auto updation of stock *and inventory valuation*"** is doing two different things and both are examinable.
>
> - **Stock update** is a **quantity** movement — 500 units arrive, stock goes up by 500. That is inventory management's business.
> - **Inventory valuation** is a **money** posting — the same receipt increases the value of stock on the balance sheet and creates a liability to the vendor. That is finance's business.
>
> **One physical event, two system consequences, posted simultaneously.** This is the concrete form of Unit 3's claim that *"other areas of ERP transactions have financial implications"* — and the SAP GL document from the finance chapter (Inventory 245.00 / Goods Received 275.00 / Price Variance 30.00, all against **Purchasing Document 4500017200**) is exactly what a goods receipt posts.

## Invoice verification

> [!EXAM]
> **At invoice verification, ERP provides:**
> - **Invoice entry**
> - **Auto or 3-way Matching of Invoice with GR, and PO**
> - **Blocking of invoices** — **quality inspection, amount variances, manual blocking / releasing, parking**
> - **Credit / Debit Memos**
> - **Invoice Ageing and their reporting**

## Three-way matching

> [!DERIVE]
> **Three-way matching is the single most important control in the procurement cycle**, and it is worth being able to explain from first principles.
>
> Three documents, from three different parties, must agree before money leaves the company:
>
> | Document | Created by | Answers |
> |---|---|---|
> | **Purchase Order** | **you** | *What did we agree to buy, at what price?* |
> | **Goods Receipt** | **your warehouse** | *What actually arrived?* |
> | **Invoice** | **the vendor** | *What are they charging us for?* |
>
> $$\textbf{PO} \;\wedge\; \textbf{GR} \;\wedge\; \textbf{Invoice} \;\Rightarrow\; \textbf{pay}$$
>
> **Match on quantity against the GR, match on price against the PO.** If either fails, the invoice is **blocked**.
>
> **Why three and not two:** any two documents can agree while still being wrong. PO and invoice agreeing proves only that the vendor billed what was ordered — **not that anything was delivered**. GR and invoice agreeing proves delivery — **not that the price was the one agreed**. Only all three together close both gaps.
>
> **Separation of duties is the reason it works:** the buyer raises the PO, the storekeeper posts the GR, the vendor sends the invoice. **No single person controls all three**, so no single person can create a payment for goods that never arrived.

> [!TRAP]
> **Distinguish blocking from parking** — the deck lists both and they are not the same:
>
> - **Blocking** — the invoice is **in the system and matched, but held** because something failed: a **quantity or amount variance**, a pending **quality inspection**, or a **manual block** placed by a user. It is released when the discrepancy is resolved.
> - **Parking** — the invoice is **entered but incomplete**, saved without posting so someone can finish or approve it later.
>
> **Blocked = complete but disputed. Parked = incomplete.**
>
> And **credit / debit memos** are the correction mechanism *after* posting: a **credit memo** reduces what you owe the vendor (short delivery, returned goods, overcharge), a **debit memo** increases it.

> [!EXAM]
> **ERS — Evaluated Receipt Settlement** — appears in the maturity model as a level 2 capability: *"ERS for vendor payment."*
>
> **ERS pays the vendor from the goods receipt and the purchase order alone — without waiting for an invoice.** The system already knows *what arrived* (GR) and *what it costs* (PO conditions), so it computes the amount and pays.
>
> The question bank asks it directly: *"How do ERPs support vendor payment and invoice verification process? **Explain ERS.**"*

> [!INTUITION]
> **ERS is three-way matching with the third document deleted**, and that is the cleanest way to hold it.
>
> If **PO price × GR quantity** already gives the correct amount, the vendor's invoice adds **no information** — it only adds a document to type in, a document to match, and an opportunity for a mismatch. **So remove it.**
>
> **What ERS requires in exchange:** total agreement on prices in the contract, and enough trust between the parties that neither needs the invoice as evidence. That is exactly why it sits at **level 2 (matured processes)** and not level 1 — it is not a feature you switch on, it is a relationship you have to have first.

---

**Next:** the specific ERP objects that make all this work — **procurement functionalities: PR, contracts, RFQ and PO**.
