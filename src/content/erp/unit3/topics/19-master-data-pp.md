---
subject: erp
unit: 3
order: 19
slug: master-data-pp
title: Master Data for Production Planning
summary: The four critical master data elements, the material master with its four data segments and its many views, and work centres and routing with the worked routing example linking operations to cost centres.
minutes: 10
tags: [master-data, material-master, BOM, work-centre, routing, views, cost-centre, operations, scheduling]
---

# Master Data for Production Planning

## The four elements

> [!EXAM]
> **A key piece of ERP is maintaining the master data elements required for production. Mainly four types of data:**
>
> 1. **Material Master**
> 2. **BOM (Bill of Material)**
> 3. **Work Center**
> 4. **Routing**
>
> **ERP structures these data nicely.**
>
> The wider **PP Basic Data** diagram adds: **Materials · Bills of Material · Routings · Work Centers · Capacities · Inspection Plans · Production Facilities · Production Resources/Tools.**

> [!INTUITION]
> **Mnemonic — "My BOM Works Right":**
>
> | Word | Element |
> |---|---|
> | **M**y | **Material Master** |
> | **BOM** | **Bill of Material** |
> | **W**orks | **Work Center** |
> | **R**ight | **Routing** |
>
> And they answer four different questions, which is the better way to remember what each *is*:
>
> | Element | Question |
> |---|---|
> | **Material Master** | **what** is it? |
> | **BOM** | **what goes into** it? |
> | **Work Center** | **where** is it made? |
> | **Routing** | **in what order** is it made? |
>
> **What · what-from · where · in-what-order.** Notice that **BOM and Routing are a pair**: the BOM is the *ingredients*, the routing is the *method*. A recipe needs both.

## Material Master

> [!EXAM]
> - **Lots of information related to material** — **identification, cost, measures, planning parameters**
> - **Generally represented as views, similar to "database views"**
>
> The deck's note: *"It is sufficiently complicated that **expertise in just SAP MM is a job profile by itself!**"*

### The four data segments

> [!EXAM]
> | Segment | Contains | Examples |
> |---|---|---|
> | **General Data** | **data applicable everywhere** | **material number, description, units of measure, weight, volume, product hierarchy** |
> | **Plant Specific Data** | **data relevant for planning and production** | **MRP profile, production costs, planning data, valuation** |
> | **Storage Location Specific Data** | **data referring to storage and inventory management** | **quantities, special stock, warehouse attributes** |
> | **Sales Specific Data** | **data dependent on sales organization and distribution channel** | **delivering plant, sales text, sales units, shipping data, division** |

> [!DERIVE]
> **The segmentation exists because the same material means different things in different places**, and that is the examinable idea.
>
> A material's **weight** is the same everywhere — **general data**. But its **MRP profile** may differ between two plants that make it differently; its **stock quantity** obviously differs by storage location; and its **sales unit** may differ by distribution channel (sold singly in retail, by the case to wholesalers).
>
> So the master record is not a flat row — it is **one general core plus per-plant, per-location and per-sales-organisation extensions.** That structure is what lets a multi-plant, multi-channel company hold **one material number** across the enterprise while still recording local differences.
>
> **This is Unit 1's data standardization done properly** — one identity, many contexts — as against Nestlé's 29 vanilla records.

### The views

> [!EXAM]
> **Master data views** on the material master:
>
> **Basic · Purchasing · MRP · Work scheduling · Forecast · Sales · Costing · Accounting · Quality Management · Warehouse Management · Classification · Plant / Storage location stocks**

> [!INTUITION]
> **A "view" is what one function needs to see** — and the deck's note explains why that matters beyond convenience:
>
> > *"Ability of ERP to provide **appropriate access to information across all stakeholders** is an important feature… **Information required for purchase is not required for work scheduling.** So a **purchase clerk might have access to 'sensitive' information such as cost price, but the works manager may not** — even though in the org structure he is 'superior'."*
>
> **Access follows the job, not the rank.** That is a genuinely non-obvious point, and it is the material-master version of the **role-based access** idea from ESS. It also connects to Unit 1's *"flat org structure / employee empowerment / controlled access"*.

## Work Centers

> [!EXAM]
> **Work Centers:**
> - **Machine / people / production line where the activity is performed**
> - **Closely linked to the "cost center" of the finance module**
> - **Key element to determine scheduling, capacity planning, costing**
>
> The deck's diagram shows a **Work Center** — comprising **assembly line, machines, people, production line** — feeding **Capacity Requirements Planning**, **Scheduling** and **Costing**, and linked to a **Cost Center**.

> [!TRAP]
> **The work centre ↔ cost centre link is the integration point between production and finance**, and it is worth stating explicitly.
>
> The **work centre** is where work physically happens; the **cost centre** is where cost is recorded. They are two views of the same organisational unit — which is exactly why **product cost accounting** works: an hour of production at a work centre becomes an hour of cost at the linked cost centre, automatically.
>
> Without that link, manufacturing knows how long things took and finance knows what things cost, and **nobody can connect the two** — the information-silo problem in its costliest form.

## Routing

> [!EXAM]
> **Routing:**
> - **Operation sequence to produce finished goods**
> - **Material moves from one work center to the next at successive levels of job completion**
> - **Important for scheduling**
>
> **Combination of work center and routing provides ample scope for optimizing combinations.**

> [!EXAM]
> **The deck's worked routing example:**
>
> | Operation | Time | Work Center | Function | Cost Center |
> |---|---|---|---|---|
> | **Operation 10** | **20 min** | **W1** | Assembly | **100** |
> | **Operation 20** | **15 min** | **W2** | **Painting** | **200** |
> | **Operation 30** | **10 min** | **W3** | **Finishing** | **300** |

> [!DERIVE]
> **This small table is doing three jobs at once**, which is why routing is master data rather than a document:
>
> - **Sequencing** — operations numbered **10, 20, 30** establish the order. *(They step by ten so that an operation can later be inserted between two existing ones without renumbering — a small, practical convention.)*
> - **Scheduling** — the times sum to **45 minutes** of work content per unit, which combined with quantity and work-centre capacity gives you a duration.
> - **Costing** — each operation is at a **work centre linked to a cost centre**, so the time spent converts directly into cost at that centre's rate.
>
> $$\textbf{Routing} \times \textbf{quantity} \rightarrow \textbf{load per work centre} \rightarrow \textbf{capacity check} + \textbf{cost}$$
>
> **This is where CRP gets its numbers from.** Capacity Requirements Planning cannot check a plan against capacity unless it knows how long each operation takes and which work centre it loads — and the routing is exactly that.

> [!INTUITION]
> **"Ample scope for optimizing combinations"** points at a real degree of freedom: the same product can often be routed **more than one way** — a different machine, a different sequence, an outsourced step.
>
> That is what makes routing a *planning* lever and not just a description. Change the routing and you change the load on each work centre, which changes both the schedule and the cost — the same choice space that **APS** exists to search systematically.

> [!EXAM]
> **BOM is "the most important master data for MRP and product costing"** — worth pairing with routing in an answer: **the BOM drives material requirements; the routing drives capacity and conversion cost.** Together they define both what a product consumes and what it costs to make.

---

**Next:** how planning differs by industry, and how it extends past the factory — **production scenarios & DRP**.
