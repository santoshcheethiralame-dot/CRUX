---
subject: erp
unit: 4
order: 3
slug: procurement-functionalities
title: Procurement Functionalities — PR, Contracts, RFQ & PO
summary: The purchase requisition, the four contract types, quota arrangements and delivery schedules, the source list, the RFQ and quotation process, and the purchase order including blanket POs.
minutes: 12
tags: [purchase-requisition, contract, quantity-contract, value-contract, quota-arrangement, delivery-schedule, source-list, RFQ, purchase-order, blanket-PO]
---

# Procurement Functionalities — PR, Contracts, RFQ & PO

## The list

> [!EXAM]
> **Some important functionalities of ERP for the procurement process:**
>
> 1. **Purchase Requisition (PR)**
> 2. **Contracts** — types: **Quantity contract, Value contract** · **Central contract, Plant specific contract**
> 3. **Quota arrangement** — **required for multiple sources**
> 4. **Delivery Schedule** — **for better planning by the supplier**; **Forecast, Detailed or Firm schedules**
> 5. **Source list** — **Allowed / Preferred / Blocked suppliers list, material wise**
> 6. **RFQ (Request for Quotation)** — **manual entry or PR based**
> 7. **Quotation processing** — **data entries, comparison, selection and rejection**
> 8. **PO (Purchase Order)**

> [!INTUITION]
> **These eight objects answer the cycle's questions in order**, which is why they are worth learning as a sequence rather than a list:
>
> | Cycle question | Object |
> |---|---|
> | *What do we need?* | **Purchase Requisition** |
> | *Who is even allowed to supply it?* | **Source list** |
> | *On what standing terms?* | **Contract** · **Quota arrangement** |
> | *What price will they quote?* | **RFQ** → **Quotation processing** |
> | *Order it* | **Purchase Order** |
> | *When exactly do we want it?* | **Delivery Schedule** |
>
> **Everything except the PR and the PO is about narrowing the field before you commit.** That is the real shape of mature procurement: **most of the work happens before the order is placed.**

## Purchase Requisition

> [!EXAM]
> A **Purchase Requisition (PR)** is the **internal request to buy** — the document that says *the company needs this*, before any vendor is involved.
>
> Its two origins, from the ERP support table:
> - **Auto creation of PR by MRP run** — for planned production items
> - **Easy entry of PR data** in case of a **manual PR** — typically consumables and indirect items

> [!TRAP]
> **PR ≠ PO, and the distinction is the approval boundary.**
>
> | | **Purchase Requisition** | **Purchase Order** |
> |---|---|---|
> | Direction | **internal** — a request to your own purchasing dept | **external** — a request to the **vendor** |
> | Commits the company? | **no** | **yes — legally** |
> | Names a vendor? | not necessarily | **always** |
>
> **The PR is where a human approves; the PO is where the money is committed.** That is why MRP produces requisitions rather than orders — *MRP proposes, a human confirms* — and why the whole approval workflow sits between them.

## Contracts

> [!EXAM]
> **Definition (from the PO slide, but it governs contracts too):** a formal agreement with a vendor covering supply over a period.
>
> **Two ways of classifying contracts — by what is fixed, and by who can use them:**
>
> | Axis | Types |
> |---|---|
> | **What the contract fixes** | **Quantity contract** · **Value contract** |
> | **Who may release against it** | **Central contract** · **Plant specific contract** |

> [!DERIVE]
> **Quantity vs value contract** — the question bank asks this directly (*"What is a contract? Explain quantity and value contract"*), so be precise:
>
> - A **quantity contract** commits to a **quantity** — *we will buy 10,000 units over the year.* The contract is exhausted when the quantity is delivered.
> - A **value contract** commits to a **value** — *we will spend ₹50 lakh with this vendor over the year.* The contract is exhausted when the money is spent.
>
> **Which one you use depends on which side is predictable.** For a standard component at a fixed price, quantity is the natural unit. For **services** — where *"price comparison is complex"* and one unit of service is not like another — **value is the only unit that means anything**, which is why value contracts dominate service procurement.
>
> **Central vs plant-specific** is the second axis and it is about **scope of use**:
>
> - A **central contract** (the deck also calls it *plant independent*) can be **released against by any plant** in the company.
> - A **plant specific contract** binds **one plant only**.
>
> **Central contracts are how a multi-plant company buys as one company.** Negotiate once at group volume, let every plant draw on it. This is the procurement version of Unit 1's **Nestlé** problem — *29 vanilla records at 29 different prices* is what happens when every plant negotiates separately.

## Quota arrangement

> [!EXAM]
> **Quota arrangement** — **required for multiple sources.**

> [!INTUITION]
> A **quota arrangement splits a material's requirement across several approved vendors in fixed proportions** — *60% to vendor A, 40% to vendor B* — and the system then allocates each requisition automatically.
>
> **Why you would deliberately not buy everything from the cheapest vendor:**
>
> - **Supply risk** — a single source is a single point of failure. One fire, one strike, one bankruptcy stops your production line.
> - **Negotiating position** — a vendor who supplies 100% of your need has all the leverage in the next price negotiation.
> - **Capacity** — no single vendor may be able to supply the whole volume.
>
> **The quota is the price you pay for not being hostage to one supplier** — you accept a slightly higher average price in exchange for continuity and leverage. And ERP's contribution is that once the percentages are set, **allocation happens without anyone deciding it order by order.**

## Delivery schedules

> [!EXAM]
> **Delivery Schedule** — *for better planning by the supplier.* Three kinds:
>
> | Type | Meaning |
> |---|---|
> | **Forecast** | indicative volumes far out — *plan capacity for roughly this* |
> | **Detailed** | firmer near-term quantities and dates |
> | **Firm** | committed — **the supplier will be paid for these whether you take them or not** |
>
> The question bank asks: *"What are the different types of delivery schedule and **why is it needed**?"*

> [!TRAP]
> **The three schedule types are time fences seen from the supplier's side** — and recognising that is the answer to *"why is it needed."*
>
> Recall Unit 3's fences: **Frozen (no change) · Firm (±5%) · Full (±10%) · Open (±20%)**. A delivery schedule publishes exactly that structure **outward to the vendor**, so the vendor can distinguish *what we are committed to* from *what we might need*.
>
> **Without it, the supplier sees only firm orders arriving with your lead time** and has to guess about everything beyond that. Guessing badly means either **excess stock at their end** (which you pay for in the price) or **stock-outs at yours**. Publishing the forecast lets them plan capacity and materials properly — **and it is the first real step of collaborative planning**, the thing that becomes VMI and CPFR in Unit 5.

## Source list

> [!EXAM]
> **Source list** — **allowed / preferred / blocked suppliers list, material wise.**

> [!INTUITION]
> The source list is a **per-material vendor whitelist with three states**, and its purpose is **control, not convenience**.
>
> - **Allowed** — you may buy this material from them
> - **Preferred** — the default, chosen automatically unless overridden
> - **Blocked** — you may **not** buy from them, and the system will refuse
>
> **"Blocked" is the important one.** A vendor whose quality has failed, whose certification has lapsed, or who is under legal dispute must not be orderable — and relying on every buyer remembering that is not a control. **Encoding it in the source list makes the rule enforce itself.**
>
> Note the phrase **"material wise"**: a vendor can be preferred for one material and blocked for another. Approval is per **material**, not per **vendor**.

## RFQ and quotation processing

> [!EXAM]
> - **RFQ (Request for Quotation)** — **manual entry or PR based**
> - **Quotation processing** — **data entries, comparison, selection and rejection**
> - From the ERP support table: **auto Request for Quotation creation** and **comparison of vendor quotes**

> [!DERIVE]
> **"PR based" RFQ creation is a small phrase carrying the chapter's whole logic**: the requisition already states the material, quantity and required date, so the RFQ can be generated from it without re-typing anything. **The same data flows PR → RFQ → quotation → PO**, entered once.
>
> $$\textbf{PR} \rightarrow \textbf{RFQ} \rightarrow \textbf{Quotation} \rightarrow \textbf{PO}$$
>
> And **"selection and rejection"** matters more than it looks: rejecting a quotation in the system, rather than just ignoring it, leaves an **audit trail of why the winner won.** For public-sector and large-value purchases, that trail is not optional — which is why the **RFP process is a must for Public Sector Organizations**, as the selection chapters state twice.

## Purchase Order

> [!EXAM]
> **Definition:** *"a formal request / document to a vendor to supply certain goods or services under conditions stated in the order."*
>
> - **Converting PR to PO** (or from a previous PO)
> - **PO creation reduces data entry and errors**; **use of default values of terms, addresses, etc.**
> - **Blanket PO** — for **consumables**, with **longer period validity**

> [!TRAP]
> **A blanket PO is one order covering many deliveries over a long validity period**, used for **consumables** — low-value, repeatedly-bought items where raising a fresh PO each time would cost more in administration than the goods are worth.
>
> This is the **same economics as lot sizing** from Unit 3: *"every order carries a fixed cost regardless of size."* A blanket PO amortises that fixed cost across a year of small draws.
>
> It also matches the item strategy exactly: **MRO / indirect goods** have the driver *"purchase admin cost should be low"* — and the blanket PO is the mechanism that makes it low.

---

**Next:** how the process changes with what you are buying — **types of procurement: material vs service, direct vs indirect**.
