---
subject: erp
unit: 4
order: 7
slug: inventory-pyramid-transactions
title: Inventory Management — The Pyramid & Transaction Processes
summary: The inventory management pyramid in both of the deck's forms, its Lose–Maintain–Gain framing, and the four transaction processes worked through in detail.
minutes: 11
tags: [inventory-management, IM-pyramid, goods-receipt, goods-issue, reservations, stock-transfer, ASN, POD, barcode, RFID]
---

# Inventory Management — The Pyramid & Transaction Processes

## The pyramid

> [!EXAM]
> **The Inventory Management Pyramid, as the deck's diagram draws it — three levels:**
>
> | Level | Contents |
> |---|---|
> | **Strategic Inventory Optimization** *(top)* | **Deployment strategy** — determine **strategic locations** to hold inventory and **how much to hold at each location / echelon** · **Channel integration with suppliers** · **Adopting best practices like VMI, CPFR, JIT and cross docking** |
> | **Inventory Planning** *(middle)* | **Using inventory models to determine optimal inventory policies** · **Use quantitative models to determine safety stock, cycle stock, cost of inventory** |
> | **Inventory Control** *(base)* | **Implement systems to record all inventory transactions** · **Cycle counting for inventory accuracy** · **Inventory tracking capabilities** · **Inventory valuation processes** |

> [!TRAP]
> **The question bank asks for "the three levels in inventory management pyramid" — answer three, not four.**
>
> The deck's *slide text* elsewhere lists **four** process groups — **Transaction · Control · Planning · Strategic** — which looks like a contradiction. It is not: **the pyramid merges transactions and control into one base level.** The deck's own summary slide confirms it:
>
> $$\textbf{Transactions \& Inv Control (Lose)} \;\rightarrow\; \textbf{Inventory Planning (Maintain)} \;\rightarrow\; \textbf{Strategic IM Processes (Gain)}$$
>
> **So: three pyramid levels, four process groups.** Use whichever the question asks for, and know they describe the same thing.

> [!DERIVE]
> **Lose · Maintain · Gain is the most valuable annotation on the whole diagram**, and an answer that explains it is a strong answer.
>
> | Level | Label | Why |
> |---|---|---|
> | **Transactions & Control** | **Lose** | doing this well **wins you nothing** — it is the price of entry. Doing it badly **loses** you money through shrinkage, wrong counts and unusable data. |
> | **Inventory Planning** | **Maintain** | correct models and safety stock **keep you competitive** — you carry no more inventory than peers and stock out no more often. |
> | **Strategic Optimization** | **Gain** | VMI, CPFR, cross-docking, network deployment are where you **beat competitors**, not merely match them. |
>
> **Accurate records are table stakes; strategy is advantage.**
>
> And the ordering is **strictly dependent upward**: you cannot run an inventory model on stock figures that are wrong, and you cannot deploy inventory optimally across a network if you do not know what you have. **Each level is built on the one below.** That is why it is drawn as a pyramid and not as three boxes.

> [!EXAM]
> **How ERP supports each level:**
>
> | Level | ERP support |
> |---|---|
> | **Inventory Transactions & Control** | **ERP systems supporting basic inventory transactions like goods issue, receipt, stock transfer** · **basic inventory control techniques like cycle counting for inventory accuracy, inventory valuation** · **help in locating where, how much inventory is lying, of what value** |
> | **Inventory Planning** | **Scientific determination of safety stock, cycle stock etc.** · **determining when to order how much — inventory model** · **inventory replenishment planning (ERP tool like DRP)** |
> | **Strategic Inventory Mgmt** | **Adopting best practices like Lean, Cross Docking** · **deciding inventory based on service levels** · **inventory collaborative approaches like VMI, CPFR** |

## The four transaction processes

> [!EXAM]
> **The four inventory transaction processes:**
>
> 1. **Goods Receipt (GR)**
> 2. **Goods Issue**
> 3. **Reservations**
> 4. **Stock Transfer**

> [!INTUITION]
> **The four are exactly the ways stock can change**, which is why there are four and not five:
>
> | Process | Effect on your stock |
> |---|---|
> | **Goods Receipt** | **in** — stock increases |
> | **Goods Issue** | **out** — stock decreases |
> | **Stock Transfer** | **sideways** — total unchanged, location changes |
> | **Reservations** | **none physically** — but the stock is **promised** and no longer freely available |
>
> **In · out · sideways · spoken for.**
>
> **Reservation is the odd one and the interesting one:** it moves no goods at all. It changes *availability*, not *quantity* — and that distinction between **physical stock** and **available stock** is what makes an ATP check meaningful.

### Goods Receipt

> [!EXAM]
> **Goods Receipt (GR):**
> - **ASN = Advanced Shipping Notice (from supplier)**
> - **Receiving goods (PO / Delivery Schedule)**
> - **Damage identification**
> - **Unloading & unpacking**
> - **Capture Lot # details**
> - **Reconcile PO — Delivery Schedule — GR**
> - **Returns — quality not acceptable**
> - **Bar codes, RFID — simpler, faster process**

> [!DERIVE]
> **Trace one delivery through that list and the design becomes obvious:**
>
> $$\textbf{ASN arrives} \rightarrow \textbf{truck arrives} \rightarrow \textbf{unload, unpack, check for damage} \rightarrow \textbf{capture lot \#} \rightarrow \textbf{reconcile} \rightarrow \textbf{post GR (or return)}$$
>
> **The ASN comes *before* the goods** — that is the whole point of it. The supplier tells you *what is on the truck and when it will land*, so your warehouse can plan labour, dock space and put-away **before** the driver is at the gate. Without it, receiving is reactive.
>
> **"Capture Lot # details"** is the traceability hook: it is what makes **batch management** possible downstream, and therefore what makes a recall possible. Unit 1's **Farm to Fork** traceability starts physically here, at the goods receipt.
>
> **"Reconcile PO — Delivery Schedule — GR"** is the receiving-side half of three-way matching: does what arrived match what we ordered and when we asked for it?
>
> **Bar codes and RFID** are noted as making this *"simpler, faster"* — and the RFID chapter in Unit 5 explains exactly why: **no line of sight needed**, so a whole pallet reads at once instead of item by item.

### Goods Issue

> [!EXAM]
> **Goods Issue:**
> - **Create ASN (to customer)**
> - **Packing and loading**
> - **Issue goods and post in ERP**
> - **Receive POD (proof of delivery) from customer**

> [!INTUITION]
> **Goods issue is goods receipt run backwards, and the symmetry is exact:**
>
> | Goods Receipt | Goods Issue |
> |---|---|
> | **receive** an ASN from the supplier | **create** an ASN for the customer |
> | unload and unpack | **pack and load** |
> | post the receipt | post the issue |
> | *(the supplier gets your GR as confirmation)* | **receive POD** — proof of delivery |
>
> **Your goods issue is your customer's goods receipt.** That is the literal meaning of a supply *chain*: every link's outbound process is the next link's inbound process — which is exactly what the SCOR model draws in Unit 5, with **Deliver** on one company meeting **Source** on the next.
>
> **POD matters commercially**, not just operationally: it is the evidence that the customer received the goods, and therefore the trigger that makes the invoice collectable. **No POD, no defensible receivable.**

### Reservations and Stock Transfer

> [!EXAM]
> - **Reservations** — **by customer for a later date. Ensure availability.**
> - **Stock Transfer** — **Plant to Plant, to Company, to Stores, to Warehouse, to Dealer**

> [!TRAP]
> **Stock transfer "to Company" is the one that is not like the others.**
>
> Plant-to-plant, to-stores, to-warehouse and to-dealer are movements **within one legal entity** — the goods change location but not owner, so **no sale occurs and no revenue is recognised**.
>
> A transfer **to another company** in the group crosses a **legal entity boundary**, which means it *is* a sale for accounting and tax purposes even though nothing left the group. That is **inter-company transfer**, and it needs transfer pricing, an invoice and — at consolidation — **elimination**, so the group does not report the same revenue twice.
>
> This is exactly why **financial consolidation** appears in the Unit 3 finance chapter's "now" column. **One physical truck movement; two completely different accounting treatments depending on who owns each end.**

---

**Next:** keeping the numbers honest — **inventory control & the classification systems**.
