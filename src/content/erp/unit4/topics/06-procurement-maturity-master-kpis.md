---
subject: erp
unit: 4
order: 6
slug: procurement-maturity-master-kpis
title: Procurement Maturity, Master Data & KPIs
summary: The three-level procurement maturity model with both of the deck's renderings, the four procurement master data objects, the six procurement KPIs with their definitions, and the SAP and Oracle offerings.
minutes: 12
tags: [maturity-model, e-procurement, SRM, supplier-analytics, master-data, vendor-master, KPI, cost-savings, procurement-ROI, SAP, Oracle]
---

# Procurement Maturity, Master Data & KPIs

## The maturity model

> [!EXAM]
> **Level 1 — Basic Processes**
> - **Basic procurement planning** / **mostly manual PRs & POs**
> - **Purchase order processes**
> - **Vendor payment**
> - **Goods Receipt**
> - **Quality Inspection**
>
> **Level 2 — Matured Processes**
> - **Optimum procurement planning** *(using **MRP or APS**)*
> - **E-procurement**
> - **ERS for vendor payment**
> - **Basic supplier collaboration** for **Forecasting, Inventory**
>
> **Level 3 — Innovative Processes**
> - **Sourcing optimization**
> - **SRM — Supplier Relationship Management**
> - **Auctions and reverse auctions**
> - **Advanced collaboration with suppliers** *(for **product development**)*
> - **Advanced supplier analytics**
> - **Exception management**

> [!INTUITION]
> **The three levels are three different relationships with the vendor**, and that is the cleanest way to hold them:
>
> | Level | The vendor is… | What you do |
> |---|---|---|
> | **1 — Basic** | **someone you send orders to** | **transact** — raise POs, receive goods, pay |
> | **2 — Matured** | **someone you share information with** | **collaborate on forecast and inventory** |
> | **3 — Innovative** | **someone you build products with** | **compete them, analyse them, co-develop with them** |
>
> **Transact → share → co-create.**
>
> Notice what changes at each boundary. **Level 1 → 2 is automation**: manual PRs become MRP/APS-driven, paper becomes e-procurement, invoices disappear into ERS. **Level 2 → 3 is strategy**: you stop merely running the process well and start *choosing* — which vendors, at what price, developing what.
>
> That maps exactly onto the two definitions of procurement from the first topic: **level 1 is *"sourcing, inspecting, paying"*; level 3 is *"a strategic approach to optimizing organizational spend."***

> [!TRAP]
> **Three items are easy to place at the wrong level.**
>
> - **E-procurement is level 2, but auctions and reverse auctions are level 3** — even though the commodity slide calls auctions *"E-procurement."* Buying through a portal is automation; **running a competitive auction is a sourcing strategy.**
> - **Supplier collaboration appears at both levels 2 and 3**, and the qualifiers are what separate them: level 2 is ***basic*** collaboration for **forecast and inventory**; level 3 is ***advanced*** collaboration **for product development**. Sharing numbers vs designing together.
> - **ERS sits at level 2, not level 1** — it looks like a payment automation, but it requires the price agreement and trust that only exist once the relationship is mature.
>
> **The reliable test: does it need the vendor's cooperation?** If yes, it is level 2 or above. If it happens entirely inside your own system, it is level 1.

> [!EXAM]
> Note that the maturity model is the **procurement-specific instance of a pattern that repeats across this course** — the **inventory management pyramid** (Control → Planning → Strategic) has exactly the same shape, and so does the **HCM automation order** (transaction-intensive first, strategic last).
>
> **The pattern: automate the routine, then plan better, then change what you do.** Each level needs the one below it working first.

## Master data for ERP procurement

> [!EXAM]
> **Four master data objects:**
>
> 1. **Material Master**
> 2. **Vendor Master**
> 3. **Terms and Conditions Master**
> 4. **Service Master Record / Service Catalog**

> [!DERIVE]
> **Four masters, four questions** — and note that they mirror the production master data's structure exactly:
>
> | Master | Question |
> |---|---|
> | **Material Master** | **what** are we buying? |
> | **Vendor Master** | **who** are we buying it from? |
> | **Terms and Conditions Master** | **on what terms** — payment, delivery, incoterms? |
> | **Service Master / Catalog** | **what services** can be bought, and how are they specified? |
>
> **What · who · on-what-terms · and the awkward fourth one.**
>
> The **Service Master exists precisely because of the service-procurement problem**: *"sometimes it is difficult to define a service specification during procurement."* A catalogue of pre-defined service specifications is the attempt to solve that by **specifying once and reusing**, instead of re-specifying every time.
>
> **The Material Master is shared with production** — the same object, seen through the **Purchasing view** rather than the MRP or Work-scheduling view. That is the material master's segmented design doing its job: *"information required for purchase is not required for work scheduling."*
>
> **The Vendor Master is procurement's own** and is the counterpart of the **Customer Master** on the sales side — which is why both appear in the data-migration object list for an ERP project.

## KPIs for procurement

> [!EXAM]
> | # | **Measure** | **Definition** |
> |---|---|---|
> | 1 | **Cost Savings** | **Department's contribution to the financial success of the organization** |
> | 2 | **Supplier Performance** | **Performance of suppliers on price, delivery, quality, service, etc.** |
> | 3 | **Procurement Cycle Time** | **Average time taken between requisition submission and PO placement** |
> | 4 | **Procurement ROI** | **Ratio of savings made by operating costs. Measures the department's cost efficiency** |
> | 5 | **Contract Compliance** | **No. of exceptions in contract — quantity, price, etc.** |
> | 6 | **Purchasing Analysis** | **Order value analysis — net order value, ABC analysis, frequency analysis, etc.** |

> [!INTUITION]
> **The six split into three pairs, which makes them recallable:**
>
> | Pair | KPIs | Measures |
> |---|---|---|
> | **Money** | Cost Savings · Procurement ROI | *did we save, and was saving worth what it cost?* |
> | **Process** | Procurement Cycle Time · Contract Compliance | *are we fast, and do we follow our own rules?* |
> | **Partners & spend** | Supplier Performance · Purchasing Analysis | *are our vendors good, and where is the money going?* |
>
> **Save · run · watch.**
>
> **Procurement ROI is the subtle one** and worth understanding rather than memorising. Cost savings alone can always be increased by spending more on procurement staff — hire twenty more negotiators and you will find more savings. **ROI asks whether the savings exceeded the cost of finding them**, which is why the definition is *"ratio of savings made by operating costs."*
>
> **Procurement cycle time is deliberately measured requisition → PO, not requisition → delivery.** That boundary is the part procurement actually controls; the vendor's lead time is not theirs to shorten. **A well-chosen KPI stops at the edge of the team's authority.**

> [!TRAP]
> **Purchasing Analysis lists "ABC analysis"** — the same technique that appears under **inventory control** in the next chapter half.
>
> Same tool, two uses: **on inventory it classifies stock by consumption value** to decide how tightly to control it; **on purchasing it classifies orders by value** to decide where to spend negotiating effort. **Pareto in both cases** — a few items carry most of the value.

## ERP solutions for procurement

> [!EXAM]
> **SAP offerings**
>
> *Planning:* **Consumption based planning · Reorder point planning · Forecast based planning · MRP based planning**
>
> *Procurement scenarios:* **Purchase requisition · Purchase of materials to production · Purchase to stock · Purchase by KANBAN · Purchase to sales order · Purchase to projects · Procurement for direct consumption · Internal procurement between plants · Procurement via sub-contracting**
>
> **Oracle offerings**
>
> **Internet Procurement · Purchasing Intelligence · Online Supplier Portal · Purchasing · Oracle Sourcing · Procurement Contracts · Daily Business Intelligence · Quality**

> [!INTUITION]
> **SAP's list is scenarios; Oracle's list is products.** That difference is itself informative about how the two vendors package the same functionality — and it is why comparing ERP packages feature-by-feature is harder than it looks, a point the package-selection chapter makes at length.
>
> **The nine SAP scenarios are worth one read** because they enumerate every *reason* a purchase can happen: **to production, to stock, by Kanban, to a sales order, to a project, for direct consumption, between plants, via sub-contracting.** Each has a different account to post to and a different trigger — which is exactly why an ERP needs nine of them rather than one generic "buy something."

---

**Next:** the second half of the chapter — **inventory management: the pyramid & transaction processes**.
