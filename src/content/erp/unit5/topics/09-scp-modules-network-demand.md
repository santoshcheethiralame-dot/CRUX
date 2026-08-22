---
subject: erp
unit: 5
order: 9
slug: scp-modules-network-demand
title: SCP Modules, Network Design & Demand Planning
summary: The eight SCP modules, network design with its decisions, triggers and cost considerations, the service-versus-cost trade-off with the deck's worked figures, and demand planning capabilities compared between ERP and SCM tools.
minutes: 12
tags: [SCP-modules, network-design, LTP, optimum-location, demand-planning, statistical-forecasting, causal-models, consensus-forecasting, like-modelling]
---

# SCP Modules, Network Design & Demand Planning

## The modules

> [!EXAM]
> **Typical modules of supply chain planning:**
>
> 1. **Network design**
> 2. **Demand planning**
> 3. **Supply Network planning**
> 4. **Production planning**
> 5. **Detailed scheduling**
> 6. **Transportation planning**
> 7. **Vehicle Scheduling**
> 8. **Route Planning**

> [!INTUITION]
> **The eight modules are the three planning levels in order**, which is why the list reads top-down:
>
> | Level | Modules |
> |---|---|
> | **Strategic** | **Network design** |
> | **Tactical** | **Demand planning · Supply Network planning · Production planning** |
> | **Operational** | **Detailed scheduling · Transportation planning · Vehicle Scheduling · Route Planning** |
>
> **One strategic module, three tactical, four operational** — the granularity gets finer and the module count rises as the horizon shortens, exactly as it did in MRP II's five levels.
>
> **And the pairing with the diagram's tools is exact:** *Network Design and LTP* at the strategic level; *S&OP, MPS, MRP* at the tactical; *detailed scheduling, transportation planning, route scheduling* at the operational. **The module list and the horizon diagram are the same content twice.**

## Network design

> [!EXAM]
> **Objective:** **designing the supply chain network — i.e. locating the factories, warehouses and distribution centers in the most optimal location that reduces overall supply chain cost and provides needed customer service.**
>
> **Typical Network Design Decisions:**
> - **Where new locations (Plants, Warehouses, DCs, and Stores) shall be opened?**
> - **Which products shall be produced at which locations?**
> - **Which customers should be assigned to which distribution centers?**
> - **What are the capacity requirements for plants / distribution centers?**
> - **Which locations shall be closed?**
>
> The deck asks its own question: ***"What category of planning is this — strategic / tactical / operational?"*** — **Strategic.**

> [!EXAM]
> **Need for network design** — *"under what conditions do companies typically look for a network design solution?"*
> - **A company wants to expand its activities to another country**
> - **Change in product demand over time, and locations might become unprofitable — so some locations may have to shut down and new ones opened**
> - **Introduction of a new product — where to produce, how to distribute**
>
> **"So SCP is not a one-time static exercise. It can be used regularly, since business will keep facing the above events regularly."**
>
> **Optimum location considerations:**
> - **Transportation costs, Production costs, Storage costs, Handling costs, Procurement costs, Penalty costs for delayed or non-fulfilled demand**
> - **Location-related Fixed operating costs, Costs for opening / closure of locations, government subsidies for location**
>
> **Network Design Vendors: ILOG Logic Tools · i2 Supply Chain Strategist**

> [!DERIVE]
> **The five decisions split into two kinds, and noticing that is the answer to *"what types of decisions are typically taken during network design?"***
>
> | Kind | Decisions |
> |---|---|
> | **Where things are** | **where to open** · **which locations to close** · **capacity requirements** |
> | **How the network is used** | **which products at which locations** · **which customers to which DCs** |
>
> **The second kind is the surprising and valuable half.** Even with the network fixed, **assigning products to plants and customers to distribution centres is itself an optimisation** — and it can be changed without building anything, which makes it the cheapest lever on the list.
>
> **"Which locations shall be closed?" is the decision companies avoid and the model does not.** Closing a plant is politically and humanly hard, and an optimiser will recommend it dispassionately. That is why the cost list explicitly includes **"costs for opening / closure of locations"** — the closure cost is part of the arithmetic, not an afterthought.
>
> **And the eleven cost considerations divide into three families:**
>
> | Family | Costs |
> |---|---|
> | **Flow costs** *(scale with volume)* | transportation · production · storage · handling · procurement |
> | **Location costs** *(scale with sites)* | fixed operating · opening / closure |
> | **Distortions** | **penalty costs for delayed or non-fulfilled demand** · **government subsidies** |
>
> **The two distortions are the interesting ones.** **Penalty costs are how service level enters a cost model** — without them, the cheapest network is one warehouse serving the world very slowly. **Subsidies are how policy enters** — and the deck's own note lists more of them: *"cost of location, strategic impact on business, **governmental subsidies, export/import special zones**, storage safety, local labor laws, infrastructure availability."*

> [!EXAM]
> **The service-versus-cost trade-off**, with the deck's worked figures *(referencing Fig. 25.6, p. 384)*:
>
> | | **Optimal Network For Cost** | **Optimal Network For Service** |
> |---|---|---|
> | **Savings** | **\$6 million** | **\$3 million** |
> | **Service** | **40% next day** | **80% next day** |
>
> **"Network is optimization — trade off between service and cost."**

> [!TRAP]
> **Those four numbers are the most quotable thing in the SCM chapter, and the arithmetic is the point.**
>
> $$\textbf{Doubling next-day service } (40\% \rightarrow 80\%) \textbf{ costs } \$3\text{m of the }\$6\text{m saving}$$
>
> **There is no "right" answer between the two networks** — and that is the lesson. The cost-optimal network consolidates into few large facilities; the service-optimal network spreads into many local ones. **Consolidation is cheap and slow; dispersion is fast and expensive.**
>
> **This is the same trade-off as DRP's competing objectives in Unit 3** — *"providing finished products at the correct location"* versus *"minimize finished goods inventory in the network"* — and as **Level vs Chase**, and as **service-level-based inventory** in Unit 4. **Four appearances of one structure.**
>
> **What the optimiser actually provides is not the answer but the curve**: for each level of service, the cheapest network that achieves it. **Choosing a point on that curve is a business decision**, and the deck's own note says so — *"cost optimization is key; **but weighed against risks**. So a variety of what-if situations have to be allowed."* **Which is exactly what "simulation capability" means in the ERP-versus-SCP table.**

## Demand planning

> [!EXAM]
> **Demand Planning Tool Capabilities:**
>
> **Forecasting at different planning levels · Consistent planning · Forecasting for quantity or value · Data visibility as per planning need · Statistical Forecasting Capability · Forecasting based on a number of parameters · Consensus Forecasting · Collaborative Forecasting · Planning for promotion · Planning for new products · Planning for Discontinuation / Phase out · Macros**

> [!EXAM]
> **Demand Planning capability — ERP vs SCM software:**
>
> | **Demand Planning in ERP Tool** | **Demand Planning in SCM Tool** |
> |---|---|
> | **Some simple statistical forecasting tools** | **Supports extensive statistical forecasting capability with support for a large number of forecasting tools** |
> | **Does not support causal / multi-variate models** | **Supports causal / multi-variate models** |
> | **Does not support like modelling** | **Supports like modelling** |
> | **Does not support advanced promotion planning** | **Supports advanced promotion planning** |
> | **Does not support collaborative forecasting** | **Supports collaborative forecasting** |
> | **Provides very little exception handling capability** | **Has capabilities of writing advanced macros, alerts and automated e-mail for exception handling** |
> | **Basic drill down capability** | **Better drill down and graphical capability** |
> | **Data for forecasting is not stored in a data warehouse** — e.g. in SAP ERP, data is stored in **LIS based info structures** | **Historical data for forecasting is stored in a data warehouse** — hence can store much larger data with better performance |

> [!DERIVE]
> **Three of those eight rows deserve unpacking, because they name techniques rather than adjectives.**
>
> **① Causal / multi-variate models.** A simple statistical forecast extrapolates **the product's own history** — last year's sales predict this year's. A **causal model** uses *other* variables: **price, weather, competitor activity, economic indicators, promotions.**
>
> $$\textbf{time-series: } y_t = f(y_{t-1}, y_{t-2}, \dots) \qquad\qquad \textbf{causal: } y_t = f(\text{price}, \text{weather}, \text{promotion}, \dots)$$
>
> **The difference bites whenever the future is not like the past** — which is exactly when a forecast matters most.
>
> **② "Like modelling"** *(also called analogous forecasting)* forecasts a product **with no history** by borrowing the history of a similar one. **A new phone model has no sales history; the previous model does.** This is what makes *"planning for new products"* possible at all — and it is the direct answer to why **product launches** break ordinary forecasting.
>
> **③ Consensus vs collaborative forecasting** are different and the pairing is deliberate:
>
> | | Reconciles | Across |
> |---|---|---|
> | **Consensus forecasting** | sales, marketing, finance and production numbers | **inside one company** |
> | **Collaborative forecasting** | your forecast and your **customer's** | **across companies** |
>
> **Consensus is S&OP's arbitration made into software** — Unit 3's *"joint plan developed by the Sales and Marketing team together."* **Collaborative forecasting crosses the company boundary**, and is what becomes **CPFR** two topics from now.
>
> **And the last row is the reason the DW-BI chapter is in the same unit:** an SCM tool stores forecast history **in a data warehouse**, while ERP stores it in operational structures. **That is not a storage detail — it is why one can hold years of history and analyse it quickly and the other cannot.** OLTP structures are built for transactions; OLAP structures are built for exactly this.

> [!TRAP]
> **"Planning for Discontinuation / Phase out" is the capability people forget, and it is symmetric with new products.**
>
> A product being phased out has **falling demand for a knowable reason** — and a forecast that extrapolates its history will **over-order right up to the end**, leaving exactly the obsolete stock that the *"inventory obsolescence"* KPI measures and that *"heavy markdown"* eventually clears.
>
> **Launch and phase-out are the two moments when history is the worst possible guide**, which is precisely why both need their own capability.

---

**Next:** the operational modules — **production planning, GATP & transportation optimization**.
