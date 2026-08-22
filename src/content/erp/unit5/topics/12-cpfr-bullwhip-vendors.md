---
subject: erp
unit: 5
order: 12
slug: cpfr-bullwhip-vendors
title: CPFR, the Bullwhip Effect & SCM Vendors
summary: How CPFR started and what its process does, the nine steps of the VICS reference framework grouped into four phases, the bullwhip effect and why it amplifies upstream, and the SCP vendor landscape.
minutes: 11
tags: [CPFR, VICS, nine-steps, joint-business-plan, sales-forecast, order-forecast, exceptions, bullwhip-effect, i2, JDA, APO, ILOG]
---

# CPFR, the Bullwhip Effect & SCM Vendors

## What CPFR is

> [!EXAM]
> **CPFR — Collaborative Planning, Forecasting and Replenishment:**
>
> - **CPFR started as a vision for some of the large retailers like Wal-Mart in the 1990s, who found the biggest problem of supply chain is that the company and their supplier do not work with the same forecast numbers and execute replenishment using this**
> - **Collaboration between company and supplier is key for effective forecasting and replenishment planning**
>
> **CPFR Process:**
> - **Customers and suppliers submit their own individual forecasts**
> - **These are combined into one shared, agreed-upon forecast**
> - **Joint forecast is done through sharing — sales data, existing inventory, and stock-out information, promotions, and supplier production constraints**

> [!DERIVE]
> **The diagnosis is the whole idea: *"the company and their supplier do not work with the same forecast numbers."***
>
> **Both parties forecast the same future demand, and get different answers** — because each sees only part of the picture:
>
> | Party | Sees | Cannot see |
> |---|---|---|
> | **Retailer** | **actual sales**, planned promotions, store-level stock | the supplier's **production constraints** |
> | **Supplier** | **their own capacity**, other customers, material lead times | **actual end-consumer demand** |
>
> **So they plan against each other.** The retailer plans a promotion the supplier cannot supply; the supplier builds capacity for a volume that never comes. **Neither is wrong from where they stand — the information is split.**
>
> $$\textbf{two forecasts} \;\Rightarrow\; \textbf{two plans} \;\Rightarrow\; \textbf{one of them is wrong, and both parties pay}$$
>
> **CPFR's answer is not a better forecasting algorithm — it is a *single* forecast.** The four things shared are exactly the four things each party was missing: **sales data and stock-out information** (retailer → supplier), **promotions** (retailer → supplier), and **production constraints** (supplier → retailer).
>
> **VMI and CPFR compared** — this contrast is worth having ready:
>
> | | **VMI** | **CPFR** |
> |---|---|---|
> | Who decides | **the supplier alone** | **both, jointly** |
> | Shared | consumption data | **the forecast itself, plus a joint business plan** |
> | Scope | **replenishment** | **planning, forecasting and replenishment** |
> | Formality | a practice | a **standard** — the VICS nine-step framework |
>
> **VMI delegates; CPFR agrees.** That is why CPFR sits **above** VMI on the collaboration evolution chart — it needs more trust, and it covers more.

## The nine steps

> [!EXAM]
> **VICS — Voluntary Intra Industry Commerce Standards** — **created a standard for CPFR: a 9-step reference framework for collaboration and performance tracking.**
>
> **The nine steps of CPFR:**
>
> 1. **Develop Collaboration Arrangement**
> 2. **Create Joint Business Plan**
> 3. **Create Sales Forecast**
> 4. **Identify Exceptions to Sales Forecast**
> 5. **Resolve Exceptions to Sales Forecast**
> 6. **Create Order Forecast**
> 7. **Identify Exceptions to Order Forecast**
> 8. **Resolve Exceptions to Order Forecast**
> 9. **Generate Order**
>
> The deck's diagram marks the four phases with the letters **P · C · R · F**.

> [!INTUITION]
> **Mnemonic — the nine steps are a two-two-then-repeat pattern, and seeing that makes them reproducible:**
>
> | Phase | Steps | What happens |
> |---|---|---|
> | **Plan** | **1–2** | **Develop collaboration arrangement · Create joint business plan** |
> | **Forecast (sales)** | **3–5** | **Create · Identify exceptions · Resolve exceptions** |
> | **Forecast (order)** | **6–8** | **Create · Identify exceptions · Resolve exceptions** |
> | **Replenish** | **9** | **Generate order** |
>
> > ### **Agree, then forecast twice, then order.**
>
> **Steps 3–5 and 6–8 are the *same three steps* applied to two different forecasts** — which is why nine steps are much easier to remember than they look. **Create → identify exceptions → resolve exceptions**, twice.
>
> **The distinction between the two forecasts is the examinable part:**
>
> $$\textbf{Sales forecast} = \text{what the end consumer will buy}$$
> $$\textbf{Order forecast} = \text{what the retailer will order from the supplier}$$
>
> **They are not the same number.** Sales forecast is **consumer demand**; order forecast is that demand **adjusted for the retailer's own inventory position, lot sizes, promotions and store openings.** A retailer might sell 1,000 units a week and order 4,000 once a month — **the sales forecast is smooth, the order forecast is lumpy.**
>
> **And that gap is precisely where the bullwhip effect is born**, which is why CPFR forecasts both explicitly instead of assuming one follows from the other.

> [!TRAP]
> **The exception-handling steps (4, 5, 7, 8) are four of the nine — nearly half — and skipping them is the standard mistake.**
>
> **The point of a joint forecast is not that the two parties always agree; it is that *disagreement is detected and resolved before it becomes two different plans.*** An **exception** is a divergence beyond an agreed tolerance — *your forecast says 1,200, mine says 800.*
>
> **Without steps 4–5 and 7–8, CPFR would just be two forecasts exchanged by email.** **The exception process is what makes it a single forecast.**
>
> This is the same discipline as **exception messages** in MRP — *"getting values that are outside the expected range… prioritize the messages → take action"* — applied across a company boundary.
>
> **And step 1 comes before everything for a reason.** *"Develop collaboration arrangement"* is where the parties agree **what will be shared, how often, in what format, and what tolerance counts as an exception.** Without that agreement, step 4 has no definition of "exception" to work with.

## The bullwhip effect

> [!EXAM]
> **The Bullwhip Effect**, as the deck charts it — four panels moving upstream:
>
> $$\textbf{Consumer Sales} \rightarrow \textbf{Retailer's Order to Wholesaler} \rightarrow \textbf{Wholesaler's Order to Manufacturer} \rightarrow \textbf{Manufacturer's Order to Supplier}$$
>
> The deck's note: ***"this is a characterization of a real-world phenomenon."***
>
> **"Eliminating Bullwhip effect — less variability" is the first stated benefit of VMI.**

> [!DERIVE]
> **The four panels show the same underlying demand with progressively larger swings** — and explaining *why* the amplification happens is what the question is really asking.
>
> **Consumer sales are relatively smooth.** Each link upstream adds variability for reasons that are individually rational:
>
> | Cause | Mechanism |
> |---|---|
> | **Order batching** | the retailer sells 100/day but orders **500 once a week** — a smooth demand becomes a spiky order |
> | **Safety stock adjustment** | demand rises 10%, so the retailer orders 10% more **plus** more safety stock — **amplifying the increase** |
> | **Lead-time reaction** | long lead times mean each link over-orders to cover uncertainty |
> | **Promotions and forward buying** | a discount causes a large one-off order that does not reflect consumption |
> | **Shortage gaming** | expecting rationing, buyers **over-order deliberately** |
>
> $$\textbf{small change in consumer demand} \;\xrightarrow{\text{each link amplifies}}\; \textbf{large swing at the manufacturer}$$
>
> **The manufacturer at the far end sees violent swings caused by a market that barely moved** — and responds by building capacity and stock for peaks that are artefacts.
>
> **Every cause has the same root: each link can only see the orders from the link immediately below it, not actual consumption.** Which is exactly why **VMI eliminates it** — the supplier receives **POS data and stock levels**, not orders. **The distorting filter is removed.**
>
> **And it is why CPFR exists too:** a **shared forecast** means the manufacturer is not inferring demand from an order pattern at all. **Both techniques attack the bullwhip by replacing an order signal with a data signal.**

## SCM vendors

> [!EXAM]
> **Supply Chain Planning Solutions — Vendors:**
>
> **i2 / JDA** *(strong in Retail)* **· SAP (SAP Advanced Planner and Optimizer — APO) · Oracle (Oracle Advanced Planning and Scheduling / Oracle Value Chain Planning — APS) · Manugistics / JDA · Adexa · Demantra · Logility · Aspentech** *(strong in Process Industry)* **· IFS · IBM's ILOG SCO**

> [!EXAM]
> **The two product suites the deck details:**
>
> **SAP APO** — **Demand Planning · Supply Network Planning · Global ATP · Deployment · PP/DS (Production Planning / Detailed Scheduling) · Transportation Planning**, all under the **Supply Chain Cockpit**
>
> **i2 Supply Chain Product Suite** — **Supply Chain Strategist · Supply Chain Planner · Demand Planner · Factory Planner · Optimal Planner · Optimal Scheduler · Profit Optimizer · Inventory Planner · Demand Fulfilment · Sales Configurator · Shipment Scheduler · Transportation Manager · Transp. Optimizer · Transp. Modeler · Carrier Bid Optimizer · 3D Load Configurator · Global Logistics Manager · Global VMI · Global Procurement Manager · Global Demand Manager · Global Fulfilment Manager · Sales & Operations Review**

> [!INTUITION]
> **SAP APO's six modules map one-to-one onto this chapter's topics**, which is a useful way to check your own coverage:
>
> | APO module | Topic |
> |---|---|
> | **Demand Planning** | demand planning capabilities |
> | **Supply Network Planning** | SNP tool capabilities |
> | **Global ATP** | GATP |
> | **PP/DS** | production planning and detailed scheduling |
> | **Transportation Planning** | transport optimizer |
> | **Deployment** | distribution — the DRP descendant |
>
> **i2's suite is far longer because it is a collection of separately-sold products rather than modules of one application** — note **Global VMI** and **3D Load Configurator** as products in their own right. **That difference in packaging is the same SAP-versus-others contrast Unit 4 noted in procurement**, where SAP listed *scenarios* and Oracle listed *products*.
>
> **The industry specialisations are worth remembering:** **i2 / JDA strong in retail**, **Aspentech strong in process industry.** That is the same *"strong in a particular industry"* selection criterion from Unit 4 — **Mincom in Mining, Retek for Retail, Ramco for Utilities** — appearing in the SCP market.

> [!TRAP]
> **The vendor list quietly documents heavy consolidation, and the deck's own note says so:** *"being 'smaller' compared to ERP systems, there is **more churn in the companies by way of mergers / acquisitions**. **JDA has acquired quite a few companies** in the last 7–8 years."*
>
> **Notice that both "i2 / JDA" and "Manugistics / JDA" appear on one list** — two once-independent vendors, both now JDA. **And Manugistics also appears in Unit 4's financial-viability warning** as having gone to JD Edwards.
>
> ⚠️ **That is the financial-viability criterion demonstrated inside a single slide:** a specialist market with many small vendors is a market where **your vendor may not exist in five years.** It is also why *"naturally ERP vendors claim advantage of integration to ERP"* — **stability and integration are what the suite sells against the specialist's superior algorithms.**
>
> **IBM's ILOG SCO is described as designed to "complement and enhance existing investments in ERP and APS solutions"** — the best-of-breed position stated explicitly: **not a replacement, a layer on top.**

---

**Next:** the analytical layer over all of it — **the data warehouse and its architecture**.
