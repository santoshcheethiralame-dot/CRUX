---
subject: erp
unit: 5
order: 7
slug: strategic-tactical-operational
title: Strategic, Tactical & Operational Planning
summary: The three decision levels with their horizons, examples and planning tools, why strategic decisions have the maximum impact, and the SCP evolution ladder from MRP II to advanced collaboration.
minutes: 11
tags: [strategic-planning, tactical-planning, operational-planning, planning-horizon, network-design, LTP, SCP-evolution, reversibility]
---

# Strategic, Tactical & Operational Planning

## The three levels

> [!EXAM]
> **Supply chain planning helps decisions at 3 levels** — this is the QnA's model answer, so it is worth having verbatim:
>
> **1) Strategic decisions — Long term decisions**
> - **Critical decision for the company having long term implications — # years** *(even beyond the annual business plan)*
> - **Factory geography, warehouse locations, sources for procurement — local / global, etc.**
> - **Decisions are difficult to reverse without substantial cost for the change**
> - **These decisions influence the company's long term profit and sales goal**
>
> **2) Tactical decisions — Medium term decisions**
> - **Applicable for months to quarters**
> - **Sales and Operations planning, MPS, MRP fall in this category**
>
> **3) Operational decisions — Short term decisions**
> - **Reviewed week / daily**
> - **Vendor schedules, distribution plan, transportation and route plan, etc. fall in this category**

> [!EXAM]
> **The deck's diagram — "Different planning horizons need separate SCP"** — spans **Years → Minutes** and gives each level a question and its tools:
>
> | Level | Cadence | **The question** | **Planning tools** |
> |---|---|---|---|
> | **Strategic** | **Yearly / Quarterly** | **"What is my long term capacity management strategy? What is my most optimized network design?"** | **Network Design · Long Term Planning (LTP)** |
> | **Tactical** | **Monthly / Weekly** | **"How do I meet my monthly customer requirements?"** | **S&OP · MPS · MRP** |
> | **Operational** | **Daily / Hourly** | **"How do I schedule my orders, my transport routes?"** | **Detailed scheduling · Transportation Planning · Route scheduling** |

> [!INTUITION]
> **The three levels are separated by *reversibility*, not merely by time — and that is the insight the exam wants.**
>
> The QnA gives it away for the strategic level: *"decisions are **difficult to reverse without substantial cost** for the change."*
>
> | Level | Decision | Cost of changing your mind |
> |---|---|---|
> | **Strategic** | **build a factory in Pune** | **enormous** — the land, the plant, the people are committed |
> | **Tactical** | **produce 8,000 units next month** | **moderate** — adjust the schedule, absorb some inventory |
> | **Operational** | **send truck 4 via this route** | **negligible** — reroute it |
>
> **Time horizon and reversibility go together for a physical reason: the longer the horizon, the more concrete the commitment.** A factory is bricks; a route is a line on a map.
>
> **That is why the three need "separate SCP" tools rather than one system with a date filter.** A network-design tool answers *where should things be* over years, evaluating land costs, subsidies and transport lanes. A route optimiser answers *which way should this truck go this afternoon*. **Same company, completely different mathematics.**

> [!TRAP]
> **The tactical level is the MRP II ladder from Unit 3, entire.**
>
> $$\textbf{Tactical} \;=\; \textbf{S\&OP} + \textbf{MPS} + \textbf{MRP}$$
>
> **Everything Unit 3 spent five topics on sits inside *one* of SCM's three levels** — and that is the chapter's implicit argument for why SCP exists. **MRP II has no strategic level at all** (its top is the Business Plan, which is a target, not a network design) and its operational level stops at PAC inside one factory.
>
> **SCP adds a level above MRP II and extends the level below it across companies.**
>
> ⚠️ **Note also that operational decisions here are *inter-company*** — *"vendor schedules, distribution plan, transportation and route plan."* Unit 3's operational level (**PAC**) was *"flow of work through the factory."* **Same tier, wider scope.**

## Impact and ROI

> [!EXAM]
> **"Strategic supply chain decisions have maximum impact on business."**
>
> The deck's chart plots **ROI / Impact** against **Planning Horizon**, with the horizon axis running **Years → Quarters → Month → Days → Hours** and the three levels — **Strategic, Tactical, Operational** — laid along it.
>
> Two notes from the deck: *"you may also note the **overlaps** in the 3 plans / decisions"*, and *"**time axis direction is reverse to usual**."*

> [!DERIVE]
> **The chart says that impact rises with horizon — and the reason is that strategic decisions set the constraints every lower decision must work inside.**
>
> $$\textbf{network design} \;\Rightarrow\; \textbf{which lanes exist} \;\Rightarrow\; \textbf{what routes can be optimised}$$
>
> **No amount of brilliant route optimisation recovers the cost of a warehouse in the wrong city.** The operational planner is choosing the best path through a network **someone else already fixed** — so the ceiling on operational savings is set strategically.
>
> **That is why the deck reverses the time axis.** Normally time runs left-to-right increasing; here it runs **years on the left, hours on the right**, so that **impact falls as you move rightward** and the chart reads as a descending staircase. **Reading it without noticing the reversal inverts the conclusion**, which is presumably why the deck flags it.
>
> **And the "overlaps" note is honest rather than decorative.** The levels are not cleanly separated: **MRP** is tactical but drives **vendor schedules**, which are operational; **S&OP** is tactical but does a **capacity check** that touches strategic capacity. **The boundaries are gradients**, which is exactly what Unit 3 said about the five MRP II levels — *"there will be gaps between each planning level and also with execution levels."*

> [!EXAM]
> **Industry segments with high reliance on supply chain**, per the deck:
> - **Retail**
> - **Distributed manufacturing businesses**
> - *"many more"*

> [!INTUITION]
> **Why retail leads the list connects straight back to the mineral-water question.** For a retailer, **almost the entire cost structure is supply chain** — buying, moving, storing and shelving goods someone else made. There is no manufacturing efficiency to find, so **logistics *is* the business**.
>
> **And "distributed manufacturing" is the other high-reliance case for the opposite reason:** many sites, many vendors, many distributors means **many possible routings**, and therefore a large optimisation space. **A single-plant, single-market company has little to optimise.**
>
> This is why **Wal-Mart** appears in this course as the example for **VMI**, **cross-docking** and **CPFR** alike, and why the deck's own worked example is **Big Bazaar** — retailers with distributed supply are where supply-chain technique pays best.

## The evolution of SCP software

> [!EXAM]
> **Supply Chain Planning Solutions — Evolution.** The deck plots **richness of functionality** against **value perception** across three generations:
>
> | Generation | Capabilities |
> |---|---|
> | **MRP II** | **Material Requirement Calculation · Calculation of M/c / Labor Resource · Sales & Ops Plan (SOP) · Master Schedule (MPS) · Order Promising (ATP) · Distribution Plan (DRP) · Capacity Planning** |
> | **ERP** | **MRP II** *(all of the above)* **· Demand Planning · Integration with SCM execution systems** *(Transport, Warehouse, Materials Management, Production Execution)* |
> | **SCM Planning & Collaboration** | **Advanced Demand Planning · Supply Chain Planning and Optimization · Production scheduling, Optimization · Transportation Planning, Route Optimization · Global Available to Promise · Advanced Collaboration** *(like VMI, CPFR)* |
>
> **"Term SCM became popular post 1995."**

> [!DERIVE]
> **The ladder is cumulative and each rung adds one word to the rung below it — and that word is the answer to *"discuss the evolution of supply chain planning software."***
>
> | Rung | What it added |
> |---|---|
> | **MRP II** | **calculation** — work out material and capacity requirements |
> | **ERP** | **integration** — connect planning to the execution systems that carry it out |
> | **SCM** | **optimization** and **collaboration** — find the *best* plan, and make it *jointly* |
>
> **Compare the same capability at two rungs and the pattern is unmistakable:**
>
> | MRP II / ERP | SCM |
> |---|---|
> | Demand Planning | **Advanced** Demand Planning |
> | Order Promising (ATP) | **Global** Available to Promise |
> | Distribution Plan (DRP) | Transportation Planning, **Route Optimization** |
> | Capacity Planning | Production scheduling, **Optimization** |
>
> **Every SCM entry is an ERP entry with "advanced", "global" or "optimization" attached.** That is precisely the *transaction → decision* movement Unit 3's *earlier-vs-now* tables described — **and it is why the two products overlap and co-exist rather than one replacing the other.**
>
> **The deck's own note says it plainly:** *"while ERP evolved to become more comprehensive in terms of functionality, niche applications like SCP focused on key areas and specialized… **so ERP and SCP may co-exist, overlapping at times.** DRP of the traditional ERP has quickly grown to become an application by itself."*
>
> **DRP is the clearest instance.** In Unit 3 it was one slide inside production planning; here it has become **Transportation Planning with Route Optimization**, a product category with its own vendors. **A feature became an application.**

---

**Next:** the split that organises the whole SCM market — **SCP vs SCE, and ERP vs SCP**.
