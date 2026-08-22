---
subject: erp
unit: 5
order: 8
slug: scp-vs-sce-vs-erp
title: SCP vs SCE, and ERP vs SCP
summary: The definitions of SCM, SCP and SCE, the full planning-versus-execution table with its processes, applications and vendors, supply chain execution in retail, and the nine-row ERP-versus-SCP comparison.
minutes: 12
tags: [SCP, SCE, planning-vs-execution, network-design, demand-planning, simultaneous-planning, finite-capacity, constraint-based, simulation, APO, i2]
---

# SCP vs SCE, and ERP vs SCP

## The three terms

> [!EXAM]
> - **Supply Chain Management (SCM) is the management of a network of interconnected activities towards the provision of product and/or service packages required by the end customers.** **Since customers may have customers (B2B) in turn, this forms a business chain or supply chain**
> - **Supply chain management spans all movement and storage of raw materials, work-in-process inventory, and finished goods from point of origin to point of consumption**
> - **SCM is sometimes broken down into the stages of planning, execution and shipping**
> - **Supply Chain Planning (SCP) and Supply Chain Execution (SCE) are the two main categories of SCM**
> - **Supply Chain Planning (SCP) is the component of supply chain management involved with predicting future requirements to balance supply and demand**

> [!INTUITION]
> **The definition of SCP is worth reading slowly: *"predicting future requirements to **balance supply and demand**."***
>
> **That is the same sentence as S&OP's purpose in Unit 3** — and indeed as capacity planning's *"A is not directly linked to B, hence a mismatch"*. **Balancing supply against demand is the single problem this entire course keeps returning to**, at successively wider scopes:
>
> | Scope | Where it appeared |
> |---|---|
> | **one work centre** | capacity control (PAC) |
> | **one factory** | closed-loop MRP, CRP |
> | **one company** | S&OP — Level vs Chase |
> | **one distribution network** | DRP |
> | **the whole chain** | **SCP** |
>
> **And note *"customers may have customers (B2B) in turn, this forms a business chain."*** That recursion is what the **SCOR** diagram drew — *suppliers' supplier → supplier → your company → customer → customer's customer.* **The chain has no natural end**, which is why the deck elsewhere calls it *"the extended enterprise."*

## Planning versus execution

> [!EXAM]
> **Supply Chain Planning vs Supply Chain Execution:**
>
> | | **Supply Chain Planning** | **Supply Chain Execution** |
> |---|---|---|
> | **Processes** | **Network Design · Demand Planning · Supply Planning · Material Planning · Sales and Operations Planning · Safety stock planning · Inventory Planning · Production Planning · Detailed Scheduling · Distribution planning · Transportation Planning · Vehicle Scheduling · Route Planning** | **Inventory Management · Procurement · Vendor Management · Warehousing · Sales Order Management · Production Order Mgmt · Shipping · Transport Execution · Quality Management** |
> | **Applications** | **ERP, Supply Chain Planning solutions** | **ERP** |
> | **Vendors** | **SCP solutions (SAP APO, i2 Technologies, Oracle APS)** · **ERPs (SAP, Oracle)** | **SAP ERP · Oracle ERP · Other ERPs** |

> [!DERIVE]
> **The distinguishing test is simple and worth stating: *does anything physically happen?***
>
> | | **Planning** | **Execution** |
> |---|---|---|
> | Produces | **a plan** — numbers about the future | **a transaction** — a record that something happened |
> | Can be re-run | **yes, freely** — simulate as often as you like | **no** — a posted goods receipt is a fact |
> | Needs | optimisation algorithms | **authorisation, workflow, audit trail** |
>
> **The deck's own note names exactly that difference:** *"planning software need not worry about aspects such as **access control, transaction management, workflow execution**. These are the must / should features of execution software such as ERP."*
>
> **That is why the Applications row is asymmetric and it is the most examinable cell in the table:**
>
> $$\textbf{Planning: ERP } \textit{or} \textbf{ SCP solutions} \qquad\qquad \textbf{Execution: ERP } \textit{only}$$
>
> **Specialist planners exist; specialist executors do not.** You can buy a better optimiser than your ERP's, because optimisation is a self-contained mathematical problem. **You cannot easily buy a better transaction processor**, because execution must post to the ledger, respect authorisations and leave an audit trail — all of which live in the ERP.
>
> **This is the same level-dependent conclusion as the inventory pyramid in Unit 4:** *the lower the level, the stronger the case for integrated ERP; the higher the level, the stronger the case for best-of-breed.* **Here it is stated as a market fact.**

> [!TRAP]
> **Some process pairs appear on both sides with different verbs, and telling them apart is exactly what the question bank is testing.**
>
> | Planning | Execution |
> |---|---|
> | **Transportation Planning · Vehicle Scheduling · Route Planning** | **Transport Execution · Shipping** |
> | **Inventory Planning · Safety stock planning** | **Inventory Management** |
> | **Production Planning · Detailed Scheduling** | **Production Order Mgmt** |
> | **Material Planning** | **Procurement · Vendor Management** |
>
> **The deck admits the boundary is soft:** *"both planning and execution activities above are different and distinct, **but the boundaries are blurred** — for example transportation planning and shipping."*
>
> **The reliable discriminator: planning decides *what should happen*; execution records *what did*.** Route *planning* chooses the route; transport *execution* records that the truck left. **Same truck, two systems.**

## Supply chain execution in practice

> [!EXAM]
> **The deck's worked SCE example, in retail:**
> - **Any retail ERP needs to support typical retail supply chain execution processes like goods receipt, goods issues, inventory management, and processes for merchandise distribution like warehouse and transport management**
> - **Each of these can have several sub-processes** — e.g. **goods issue** can be divided into **creating outbound delivery, pick, pack and final goods issue**
> - **Creating outbound delivery** can be further subdivided into **vehicle scheduling, route determination, staging area and picking location determination, and planning for proof of delivery**
> - **Posting of goods receipt** can be divided into **posting goods receipt, quality check, invoice verification, final settlement**
> - **There can be several variants to merchandise distribution processes like cross-docking, flow through etc.**
> - **ERP software supports real-time tracking of inventory transactions, automated cycle counting, different inventory accounting and costing techniques, and integration to handheld devices**

> [!INTUITION]
> **The point of this slide is the nesting, and it is worth seeing explicitly:**
>
> $$\textbf{Goods Issue} \rightarrow \textbf{Create outbound delivery} \rightarrow \textbf{vehicle scheduling, route determination, staging area, picking location, POD planning}$$
>
> **One line item on a process diagram expands into five real decisions**, each of which someone or something must make for every shipment. **That is what "transaction intensive" means concretely**, and it is why execution belongs in an ERP: these are high-volume, rule-governed steps that must each leave a record.
>
> **Note that "vehicle scheduling" and "route determination" appear here as sub-steps of execution** — while the planning column lists **Vehicle Scheduling** and **Route Planning** as planning processes. **That is the blurred boundary in one concrete instance:** planning sets the routing policy and the schedule; execution applies it to this particular delivery.
>
> **And every item in the final bullet is recognisable from Unit 4** — *real-time tracking of inventory transactions* (the transaction processes), *automated cycle counting* (inventory control), *inventory accounting and costing* (moving average / standard price), *handheld device integration* (bar codes and RFID at goods receipt). **SCE is Unit 4's inventory chapter seen from the supply-chain side.**

## ERP versus SCP

> [!EXAM]
> **The nine-row comparison — this is the question bank's *"explain the difference between ERP and supply chain planning software"*:**
>
> | | **ERP** | **Supply Chain Planning** |
> |---|---|---|
> | **Focus** | **Transaction and Basic Planning** | **Advanced Planning and Optimization** |
> | **Planning Order** | **Sequential planning of material and capacity** | **Simultaneous planning of material and capacity** |
> | **Prioritization Handling** | **Cannot handle any prioritization rule** | **Can handle any prioritization rules (Customer, Product etc.)** |
> | **Simulation** | **Limited simulation capability** | **Have extensive simulation capability** |
> | **Constraints planning** | **Cannot do any constraints based planning** | **Can do constraint based planning** |
> | **Capacity Mgmt** | **Plan based on infinite capacity** | **Can plan based on finite capacity, i.e. available capacity** |
> | **Forecasting** | **Have basic forecasting capability** | **Have advanced forecasting capability (Statistical forecasts / Causal models etc.)** |
> | **Replanning** | **Replanning takes long time** | **Replanning can be very quick** |
> | **ATP — Available to promise** | **Limited order promising capability** | **Advanced order promising capability in terms of alternate location or alternate product** |

> [!DERIVE]
> **Every row of that table is one of MRP's seven limitations from Unit 3, answered.** Laying them side by side is the strongest possible answer to this question:
>
> | MRP limitation (Unit 3) | SCP row that answers it |
> |---|---|
> | *"cannot consider **actual capacity available**… assumes capacity is infinite"* | **finite capacity planning** |
> | *"cannot consider **constraints** and vendor's limitations"* | **constraint based planning** |
> | *"**cannot do any optimization**"* | **Advanced Planning and Optimization** |
> | *"**cannot replan fast enough**"* | **replanning can be very quick** |
>
> **Four of the seven limitations, matched one-for-one.** That is not a coincidence — **SCP is the product category that exists because MRP has those limitations**, exactly as Unit 3 said of APS: *"specialized supply chain apps with APS — Advanced Planning and Scheduling — have a much better capability here."*
>
> **The two rows worth understanding rather than memorising are *planning order* and *ATP*.**
>
> **① Sequential vs simultaneous planning.** MRP plans **material first**, then checks capacity afterwards — which is why **closed-loop MRP** has to loop back to MPS when the capacity check fails. **SCP plans material and capacity together in one pass**, so the plan it produces is feasible when it emerges. **The loop disappears because the constraint was inside the calculation from the start.**
>
> **② Global ATP.** ERP's ATP answers *"do we have it, here, on that date?"* — a lookup. **SCP's answer is a search**: if not here, **another location**; if not this product, **an alternate product**; if nothing exists, **can we make it in time (capable-to-promise)?** That is why it is called **Global** ATP, and why it needs finite-capacity data to answer at all.
>
> **The deck's own summary is the fairest one-line verdict, and worth quoting:** *"in a nutshell, **SCP has advanced functionality over ERP; but ERP has higher integration and execution capability**. Of course, these differences are at some point — over time product vendors, both ERP and SCP, bridge these gaps based on market forces."*

---

**Next:** what an SCP product actually contains — **SCP modules, network design & demand planning**.
