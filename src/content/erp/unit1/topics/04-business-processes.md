---
subject: erp
unit: 1
order: 4
slug: business-processes
title: The Six Business Processes
summary: The six named enterprise processes with their steps, ERP modules and real-company examples, the seven-step Quote-to-Cash cycle in full, the banking example where one event updates ten modules, and why ERP beats manual systems.
minutes: 15
tags: [business-process, P2P, O2C, F2S, T2M, H2R, F2F, quote-to-cash, dell, apple, infosys, walmart]
---

# The Six Business Processes

## The named processes

> [!EXAM]
> **Examples of organizational processes:**
>
> | Process | Full name |
> |---|---|
> | **P2P** | **Procure to Pay** |
> | **O2C** | **Quote / Order to Cash** |
> | **F2S** | **Forecast to Stock** |
> | **T2M** | **Time to Market** |
> | **H2R** | **Hire to Retire** |
> | **F2F** | **Farm to Fork** |
>
> **An automated system such as ERP is well suited to measure and control processes**, better than manual or non-integrated systems.

> [!INTUITION]
> Every name has the form **"X to Y"**, and that is the memory hook: each names its **own start and end point**. You never have to recall what a process contains — the name tells you the boundary, and the middle follows.
>
> **Procure → Pay.** Start when you want something, end when the supplier is paid.
> **Order → Cash.** Start when the customer asks, end when their money arrives.
> **Hire → Retire.** Start at recruitment, end at exit.
>
> The two directions are worth noticing: **P2P is money going out, O2C is money coming in.** They are mirror images, and together they are most of what a business does.

## 1 — Procure to Pay (P2P)

> [!EXAM]
> **Definition:** the complete process of **purchasing goods or services — from identifying a business need to paying the supplier.**
> **Business goal:** acquire the right materials at the **right price, quality and time** while ensuring **timely supplier payment**.
>
> **Steps:** Need identified → Purchase requisition → Purchase approval → **Purchase Order** → Supplier delivery → **Goods receipt** → **Invoice verification** → **Payment to supplier**
>
> **ERP modules:** Procurement · Inventory · Warehouse · Finance · Accounts Payable

> [!NOTE]
> **Dell example:** Dell needs 5,000 Intel processors. Production forecasts demand → Procurement raises a purchase request → manager approves → PO sent to Intel → Intel delivers → Warehouse records receipt → Finance verifies the supplier invoice → **ERP automatically schedules payment.** All inside ERP, with **no duplicate data entry**.
>
> **Benefits:** reduced procurement costs · faster purchasing · better supplier relationships · real-time inventory updates · automatic payment processing.

> [!TRAP]
> The three-way check hidden in the middle of P2P is the part worth understanding: **Purchase Order → Goods Receipt → Invoice Verification.**
>
> The invoice is only paid if it matches **what was ordered** and **what actually arrived**. A supplier who ships 400 units and invoices for 500 is caught automatically. In a non-integrated system the PO, the receipt and the invoice sit in three different departments' systems, so nobody can perform that check without manual reconciliation — problem 7 on the disintegrated-data list.

## 2 — Quote / Order to Cash (O2C)

> [!EXAM]
> **Definition:** the complete customer sales process — **from receiving a quotation request to collecting payment.**
> **Business goal:** deliver products **quickly, accurately and profitably** while ensuring timely payment.
>
> **Steps:** Customer enquiry → Quotation → Sales order → Inventory check → Shipping → Invoice → Customer payment
>
> **ERP modules:** CRM · Sales · Inventory · Warehouse · Finance · Accounts Receivable

### The seven-step Quote-to-Cash cycle

> [!EXAM]
> The deck's detailed Q2C diagram, on the example *"customer enquires for 1,000 Dell laptops"*:
>
> | # | Stage | What happens | **Key output** |
> |---|---|---|---|
> | **1** | **Quote / Proposal** | Sales understands requirements and creates a quote with product, price, terms and validity | **Sales Quote** |
> | **2** | **Quote Approval** | Quote is reviewed and approved **by the customer** | **Approved Quote** |
> | **3** | **Sales Order** | Once approved, the sales order is created in the system | **Sales Order** |
> | **4** | **Fulfillment / Delivery** | Order processed; laptops picked, packed and shipped per agreed schedule | **Goods Delivered** |
> | **5** | **Invoicing** | Invoice generated per the sales order and delivery confirmation | **Customer Invoice** |
> | **6** | **Payment Receipt** | Customer pays per agreed terms (e.g. **Net 30 days**) | **Payment Received** |
> | **7** | **Cash Application** | Payment recorded and applied against the invoice; **account updated and closed** | **Cash Applied / Account Closed** |

> [!DERIVE]
> **Why Q2C matters** — the deck's five reasons, each traceable to a stage:
>
> - **Revenue** — faster processing means faster revenue generation
> - **Customer satisfaction** — customers receive products on time *(stage 4)*
> - **Cash flow** — organizations receive payments quicker *(stages 6–7)*
> - **Operational efficiency** — departments work together seamlessly
> - **Visibility** — management can track orders **from quotation to payment**
>
> Note that the process does **not** end at delivery. Stages 5–7 are all about **getting paid**, and that is deliberate: a delivered order that is never collected is not revenue. This is exactly why *"reducing number of days outstanding"* appears later as one of the four **tangible benefits**.

> [!TRAP]
> **Stage 2 — "approved by the customer"** — is easy to misread as internal approval. It is the *customer* accepting the quote. Contrast with **P2P's "purchase approval"**, which *is* internal (your manager).
>
> **In P2P you approve; in O2C the customer approves.** The mirror-image relationship holds here too.

## 3 — Forecast to Stock (F2S)

> [!EXAM]
> **Definition:** predicting future demand and **maintaining sufficient inventory before customer orders arrive.**
> **Business goal:** ensure products are available when customers need them **while minimizing excess inventory.**
>
> **Steps:** Demand forecast → Production planning → Material planning → Manufacturing → Quality check → Warehouse → **Stock ready**
>
> **ERP modules:** Demand Planning · Manufacturing · Inventory · Warehouse · Procurement
>
> **Apple example:** before an iPhone launch, Apple forecasts demand from **historical sales, market trends, customer pre-orders, regional demand and marketing campaigns**. Factories begin production **months before launch**, so products are available worldwide on release day.

> [!INTUITION]
> F2S is the only one of the six that runs **before** a customer exists — it is **build-to-stock**, whereas O2C is **build-to-order**.
>
> That is what makes its goal a genuine tension: *available when needed* pushes stock up, *minimize excess* pushes it down. Forecast too low and you get **stockouts**; too high and you get **dead stock**. This is the trade-off the later "inventory reduction" benefit is measured against.

## 4 — Time to Market (T2M)

> [!EXAM]
> **Definition:** the time required to **develop a new product and make it available to customers.**
> **Business goal:** **introduce products faster than competitors.**
>
> **Steps:** Idea → Design → Engineering → Testing → Manufacturing → Launch
>
> **ERP modules:** **PLM** · Engineering · Procurement · Manufacturing · Sales
>
> **Tesla example:** by integrating design, engineering, manufacturing, procurement and suppliers, Tesla reduces development cycles and introduces features faster than traditional automakers.

## 5 — Hire to Retire (H2R)

> [!EXAM]
> **Definition:** the complete **employee lifecycle — from recruitment until retirement or exit.**
>
> **Steps:** Recruitment → Hiring → Onboarding → Training → Performance management → Payroll → Promotion → **Retirement / Exit**
>
> **ERP modules:** Human Resources · Payroll · Learning & Development · Performance Management · Finance
>
> **Infosys example:** HR creates the employee record → IT provides system access → payroll configured → mandatory training assigned → performance goals tracked → promotions and salary revisions managed → exit processes handled. **All employee information stays in one integrated system.**

## 6 — Farm to Fork (F2F)

> [!EXAM]
> **Definition:** tracks food products **from agricultural production to the consumer's plate.**
> **Business goal:** ensure **food quality, safety and traceability** across the supply chain.
>
> **Steps:** Farm → Harvest → Processing → Packaging → Distribution → Retail → Customer
>
> **ERP modules:** Procurement · Manufacturing · Quality Management · Warehouse · Logistics · Retail
>
> **Walmart example:** traces food items from farms to stores. **If contamination is detected, affected batches are identified quickly and removed from shelves** — improving food safety and reducing waste.

> [!INTUITION]
> F2F is the odd one out and worth a sentence in any answer about it: it is the only process whose primary driver is **regulatory and safety**, not cost or revenue.
>
> Its distinguishing capability is **traceability in reverse** — given a contaminated product on a shelf, work *backwards* to the farm and identify every other batch from the same source. That is a query no functional system can answer, because the answer spans the entire chain.

## One event, many modules

> [!EXAM]
> **The banking example** — *one business event updates multiple modules simultaneously.* A customer applies for a **home loan**:
>
> 1. **Customer Information Management** verifies KYC and stores customer details
> 2. **Customer Analytics** checks credit history and predicts repayment capability
> 3. **Risk & Compliance** validates RBI guidelines, KYC, AML and fraud checks
> 4. **Loans Management** creates the loan account after approval
> 5. **Collateral Management** records the property documents pledged as security
> 6. **Accounting for Banking** records the disbursement in the **General Ledger**
> 7. **Financial Performance Management** updates loan portfolio and profitability reports
> 8. **Billing Management** generates the **EMI schedule** and monthly statements
> 9. **Payment Engine** processes each EMI payment
> 10. **Customer Service** can instantly view loan status and respond to queries
>
> **A single transaction automatically updates ten modules through a shared database.**

> [!TRAP]
> This slide is the best single answer to *"what does integration actually mean?"* — and note the direction of the argument.
>
> The customer performs **one action**. The *system* performs ten updates. In a siloed bank those ten updates are ten separate data entries in ten systems, each one an opportunity for **inconsistency** — and the customer-service agent at step 10 would have no way to see the loan at all.

## ERP vs manual / non-integrated systems

> [!EXAM]
> | Aspect | Manual / non-integrated | **ERP-based** |
> |---|---|---|
> | **Data entry** | Repeated in multiple departments | **Enter once, used everywhere** |
> | **Information sharing** | Emails, phone calls, spreadsheets | **Shared in real time** |
> | **Decision making** | Delayed | **Real-time dashboards** |
> | **Process visibility** | Limited | **End-to-end visibility** |
> | **Inventory tracking** | Manual updates | **Live inventory status** |
> | **Reporting** | Time-consuming | **Instant reports and analytics** |
> | **Customer experience** | Delays and inconsistencies | **Faster, accurate service** |
> | **Compliance** | Manual checks | **Automated controls and audit trails** |
> | **Collaboration** | Department silos | **Integrated enterprise workflows** |

> [!INTUITION]
> **"Enter once, used everywhere"** is the row that generates every other row.
>
> Single entry removes the chance for divergence, which is what makes real-time sharing trustworthy, which is what makes dashboards worth looking at, which is what makes decisions fast. **Every advantage in the right-hand column is downstream of that first one.**

---

**Next:** how ERP got here — **the evolution from MRP to ERP II**.
