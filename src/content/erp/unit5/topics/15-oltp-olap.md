---
subject: erp
unit: 5
order: 15
slug: oltp-olap
title: OLTP vs OLAP & OLAP Operations
summary: The characteristics of OLTP and OLAP with the seven-row comparison table, the three types of analysis, the OLAP functionalities with roll-up, drill-down, slice and dice worked through the deck's own examples, the strengths, and the three OLAP types.
minutes: 12
tags: [OLTP, OLAP, normalized, denormalized, roll-up, drill-down, slice-and-dice, pivot, data-cube, ROLAP, MOLAP, HOLAP]
---

# OLTP vs OLAP & OLAP Operations

## OLTP

> [!EXAM]
> **OLTP — Online Transaction Processing:**
>
> - **OLTP refers to a class of systems that facilitate and manage transaction-oriented applications, typically for data entry and retrieval**
>
> **Characteristics of OLTP:**
> 1. **OLTP manages ongoing transactional data related to business operations like production, sales data etc.**
> 2. **OLTP is the source of the data origin. Every data of the business is stored in the OLTP system**
> 3. **OLTP database design is highly normalized in nature**
> 4. **Follows Entity Relationship diagram and uses data modeling**
> 5. **Involves relational database management system (RDBMS)**

## OLAP

> [!EXAM]
> **OLAP — Online Analytic Processing:**
>
> - **OLAP enables a user to easily and selectively extract and view data from different points-of-view**
> - **OLAP data is stored in a multidimensional database, providing rapid access to data for analysis**
> - **OLAP is part of the broader category of business intelligence and data mining tools**
>
> **Characteristics of OLAP:**
> 1. **Data is consolidated for a period of time**
> 2. **OLAP database is formed from various databases which are OLTP in nature**
> 3. **OLAP provides decision making information and does analysis**
> 4. **Database design is typically denormalized with limited tables**
> 5. **The data reveals multi-dimensional views of various kinds of business activities**

> [!EXAM]
> **OLAP and OLTP — Differences:**
>
> | **OLTP System** | **OLAP System** |
> |---|---|
> | **Holds current data** | **Holds historical data** |
> | **Stores detailed data** | **Can store both detailed and highly summarized data** |
> | **Data is dynamic — changes with every transaction** | **Data is largely static** |
> | **Transaction driven** | **Analysis driven** |
> | **Supports day-to-day transactions / decisions** | **Supports strategic decisions** |
> | **A large number of operational users use the system** | **Low number of managerial users use the system** |
> | **High number of transactions in the system** | **Medium to low level of transactions** |

> [!DERIVE]
> **The whole table follows from one difference in workload**, and deriving it is much stronger than reciting it.
>
> $$\textbf{OLTP: many users, tiny operations, constant writes} \qquad \textbf{OLAP: few users, huge queries, rare writes}$$
>
> | Because the workload is… | The design must be… |
> |---|---|
> | **many small writes** (OLTP) | **normalized** — avoid update anomalies, keep writes cheap |
> | **few enormous reads** (OLAP) | **denormalized** — avoid joins, keep reads fast |
> | **current state matters** (OLTP) | **overwrite** — no need to keep history |
> | **trends matter** (OLAP) | **accumulate** — history *is* the data |
>
> **This is the same reasoning as the star schema's denormalisation**, restated at the system level: **normalisation protects writes; denormalisation accelerates reads.** A system doing one does not need the protection the other requires.
>
> **The two rows about users are the ones people skip and they are the most telling.** *"A large number of operational users"* versus *"low number of managerial users"* — **thousands of clerks entering orders, versus a few dozen managers asking questions.** That difference alone justifies separate systems: **tuning one database for both workloads means it serves neither well**, which is why *"better performance of source system"* is listed as an advantage of warehousing.
>
> **And OLAP characteristic ② — *"OLAP database is formed from various databases which are OLTP in nature"* — states the dependency: OLAP has no data of its own.** OLTP is *"the source of the data origin"*; OLAP is downstream, always. **Which is why data latency is unavoidable.**

## OLAP analysis and functionality

> [!EXAM]
> **Types of analysis possible in OLAP:**
> - **Aggregation**
> - **Comparison**
> - **Ranking**
>
> **OLAP functionalities:**
> - **Roll up and Roll down (Drill-up and Drill-down)**
> - **Slice and dice**
> - **Multidimensional data cube**
> - **Pivot**
> - **Sort**
>
> **Strengths of an OLAP tool:**
> - **Powerful visualization tool**
> - **Provides fast, interactive response times**
> - **Good for analyzing time series**
> - **Can be useful to find some clusters and outliers**
>
> **Three Types of OLAP: ROLAP · MOLAP · HOLAP**

> [!EXAM]
> **The deck's worked roll-up / drill-down example** — a location hierarchy:
>
> $$\textbf{Country (India)} \rightarrow \textbf{Region (West)} \rightarrow \textbf{State (Maharashtra)} \rightarrow \textbf{City (Mumbai)} \rightarrow \textbf{Sales office (Ravioli)}$$
>
> **Roll Up** = **higher level of aggregation** *(moving up the hierarchy)* · **Roll Down / Drill Down** = **low-level details** *(moving down)*
>
> **The fuller dimension hierarchy** the deck draws: **Country: INDIA** → **East Zone / West Zone** → **Gujarat, Maharashtra, Assam, Bengal** → **Mumbai, Pune, Kolkata** → **Nariman Point, Vikroli, …** — i.e. **Country → Region → State → City → Sales Office.**

> [!EXAM]
> **The deck's slicing and dicing example — a CPG company**, with three dimensions:
>
> | Dimension | Members |
> |---|---|
> | **Product** | **Detergent · Food · Personal care · Healthcare** |
> | **Sales Channel** | **Retail · Wholesale · Export** |
> | **Regions** | **APAC · Americas · Europe** |
>
> **"The Food Slice"** — fixing **Product = Food** and looking at the remaining Channel × Region grid.
>
> **And the multidimensional data cube:** **Time Period (1Qtr–4Qtr) × Product (TV, VCR, PC) × Country (India, China, Mexico, Australia)**, with **sum** along the edges.

> [!DERIVE]
> **The five functionalities are five different ways to move through a cube**, and the CPG example makes each concrete.
>
> | Operation | What it does | On the CPG cube |
> |---|---|---|
> | **Roll up** | **aggregate to a higher level** | City → State → Region |
> | **Drill down** | **the reverse — expose detail** | Region → State → City |
> | **Slice** | **fix ONE dimension**, view the rest | *"the Food slice"* — Product = Food |
> | **Dice** | **fix a range on SEVERAL dimensions** | Food **and** Personal care, in APAC **and** Europe, Retail only |
> | **Pivot** | **rotate — swap which dimension is on which axis** | Products-as-rows becomes Regions-as-rows |
>
> **Slice vs dice is the distinction most often examined and most often confused:**
>
> $$\textbf{Slice: one dimension fixed to one value} \qquad\qquad \textbf{Dice: several dimensions restricted to sub-ranges}$$
>
> **A slice cuts one flat plane out of the cube; a dice cuts a smaller cube out of the cube.**
>
> **And roll-up/drill-down are the operations that make the hierarchy in the dimension tables useful.** Recall the **PERIOD** dimension carrying *Year, Quarter, Month, Day* — **those attributes are the rungs you roll up and down.** This is the same drill-down capability listed under **CRM analytics** *("dashboards, trend analysis, drilldown")* — **CRM analytics is OLAP over a customer dimension.**
>
> **The three types of analysis map onto the operations neatly:** **aggregation** is roll-up, **comparison** is what pivot and dice are for, and **ranking** is sort applied to an aggregate.

> [!TRAP]
> **The three OLAP types differ in *where the data physically lives*, and the names give it away once you know the middle letter.**
>
> | Type | Storage | Trade-off |
> |---|---|---|
> | **ROLAP** — **Relational** OLAP | data stays in **relational tables**; cubes computed on the fly | **scales to huge volumes**; **slower** queries |
> | **MOLAP** — **Multidimensional** OLAP | data pre-aggregated into a **multidimensional cube** | **very fast**; **limited size**, long load times |
> | **HOLAP** — **Hybrid** OLAP | **summaries in a cube, detail left relational** | fast at summary level, drills through to detail |
>
> **HOLAP is the granularity trade-off implemented as an architecture** — *"reduced storage costs and better reporting performance"* from the summarised side, *"each transaction's details can be obtained"* from the detailed side, **both at once.**
>
> ⚠️ **Note the architecture diagram named MOLAP and ROLAP as the two OLAP server types feeding the analysis tools.** They sit **between the warehouse and the user**, which is why they are called *servers* — **the warehouse stores; the OLAP server presents.**
>
> **And "good for analyzing time series" is not a throwaway strength.** Time is the one dimension present in nearly every cube, and it has a **natural hierarchy** (day → month → quarter → year) with **natural comparisons** (this month vs last month vs same month last year). **OLAP is built for exactly that shape of question**, which is what the **Time-variant** characteristic exists to support.

---

**Next:** the other repositories and what you do with them — **data marts, ODS, data mining, analytics & BI**.
