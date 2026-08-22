---
subject: erp
unit: 5
order: 16
slug: datamart-ods-mining-bi
title: Data Marts, ODS, Data Mining, Analytics & BI
summary: The data mart and how it differs from a warehouse, the operational data store and its overwrite function, data mining with its uses and three steps, the analytics segments, BI tool functionality, and the vendor landscape.
minutes: 12
tags: [data-mart, ODS, data-mining, market-basket, fraud-detection, analytics, descriptive, prescriptive, business-intelligence, dashboards, scorecards]
---

# Data Marts, ODS, Data Mining, Analytics & BI

## Data marts

> [!EXAM]
> - **A data mart is a subset of a data warehouse that supports the requirements of a particular department or business function**
>
> **Characteristics of a data mart:** **Small · Flexible · Lightly summarized · Departmentally structured**
>
> **Difference between data mart and data warehouse:**
> - **A data mart focuses on only the requirements of users associated with one department or business function**
> - **Data marts do not normally contain detailed operational data, unlike data warehouse**
> - **As data marts contain less data compared with data warehouses, data marts can be more easily navigated**
>
> **Advantages of a Data Mart:**
> 1. **To give users access to the data they need to analyze most often**
> 2. **To provide data in a form that matches the needs of users in a department or business function**
> 3. **To improve end-user response time due to the reduction in the volume of data to be accessed**
> 4. **Normally use less data, so tasks such as data cleansing, loading, transformation, and integration are far easier — hence implementing and setting up a data mart is simpler than establishing a corporate data warehouse**
> 5. **The cost of implementing data marts is normally less than that required to establish a data warehouse**
>
> **The deck's comparison diagram:**
>
> | **Data Warehouse** | **Data Mart** |
> |---|---|
> | **Organizationally structured** | **Structured and Customized by Department** |
> | **Detailed Data Warehouse Data** | **Small · Flexible · Lightly summarized** |
>
> **"A Data Warehouse can source data from different data sources and, in turn, is a source of data for several data marts."**

> [!INTUITION]
> **A data mart is the warehouse cut down to one department's needs**, and the five advantages are really two:
>
> | Advantage | Reduces to |
> |---|---|
> | 1, 2 — the data they need, in their form | **relevance** — no wading through other departments' data |
> | 3, 4, 5 — faster, simpler, cheaper | **size** — everything is easier when there is less of it |
>
> **The relationship the last line states is the important one:**
>
> $$\textbf{many sources} \rightarrow \textbf{one warehouse} \rightarrow \textbf{many data marts}$$
>
> **The warehouse fans data in; the marts fan it back out.** That shape matters because **the integration happens once, centrally** — so the marketing mart and the finance mart are guaranteed to agree, because both descend from the same reconciled warehouse.
>
> ⚠️ **Building marts *directly* from source systems is the failure mode this architecture prevents.** Independent marts drift apart, and you end up with two departments quoting different revenue figures — which is the **information silo problem** re-created inside the analytics layer.
>
> **This is the same "one general core plus per-context extensions" pattern as the material master in Unit 3** — *one material number, per-plant and per-sales-org views.* **Integrate once; specialise many times.**

## Operational Data Store

> [!EXAM]
> - **An ODS consolidates data from multiple source systems and provides a near real-time integrated view of current data**
> - **Its purpose is to provide data for operational purposes, and it has add, change or delete functionality**
>
> **Advantages of ODS:**
> - **Overwrite function**
> - **Save data at a document level**
> - **Contains consolidated data**
> - **Can be used for reporting and drill-down**
> - **An ODS is designed to quickly perform relatively simple queries on small amounts of data**
>
> **Difference of ODS with Data Warehouse:**
> - **An ODS stores only very recent information. In comparison, the data warehouse is more like long term memory, in that it stores relatively permanent information**
> - **In contrast to a data warehouse, data in ODS objects is stored in flat, transparent database tables. Fact and dimension tables are not created**

> [!DERIVE]
> **The ODS is the warehouse with two of its four characteristics deliberately reversed** — and stating which is the cleanest possible answer to *"what are the similarities and differences between a data warehouse and an ODS?"*
>
> | Characteristic | **Data Warehouse** | **ODS** |
> |---|---|---|
> | **Integrated** | ✔ | ✔ **same** |
> | **Subject-oriented** | ✔ star schemas | ✘ **flat, transparent tables — no facts or dimensions** |
> | **Time-variant** | ✔ 5–10 years | ✘ **only very recent information** |
> | **Non-volatile** | ✔ never overwritten | ✘ **overwrite function — add, change, delete** |
>
> **They share integration and differ on everything else** — and each difference exists to serve a different question.
>
> $$\textbf{Warehouse: "what has been happening over years?"} \qquad \textbf{ODS: "what is true right now, across all systems?"}$$
>
> **The ODS is the answer to data latency**, the warehouse's stated disadvantage. If a call-centre agent needs the customer's **current** consolidated position — orders across three systems, as of this minute — **a warehouse refreshed nightly cannot help**, and querying three source systems live is slow and fragile. **The ODS sits between them.**
>
> **"Overwrite function" is listed as an *advantage*, which is worth pausing on**, because non-volatility was an advantage for the warehouse. **The same property is a virtue or a defect depending on the question**: for history you must never overwrite; for *current state* you must, or the ODS would just be a slow warehouse.
>
> **And "save data at a document level" pairs with "relatively simple queries on small amounts of data."** The ODS holds **individual documents** — this order, this delivery — not aggregates. **It answers *what happened to this one thing*, not *what is the trend*.**

## Data mining

> [!EXAM]
> - **Data mining is the process of extracting patterns from data, that is used in a wide range of uses such as marketing surveillance, fraud detection and scientific discovery**
> - **Data Warehousing provides the enterprise with memory; Data Mining provides the enterprise with intelligence**
> - **Data mining can discover valid, novel, potentially useful, and ultimately understandable patterns in data**
>
> **Uses of Data Mining:**
> **Customer analysis · Targeted marketing · Cross selling · Segmenting or grouping customers · Market Basket Analysis · Credit rating · Fraud detection · Medicine / Disease outcome**
>
> **Data Mining Steps:** **Data Preparation → Model Construction → Results validation**
>
> **Data Mining Vendors:**
> - **Major players:** **Clementine · IBM's Intelligent Miner · SGI's MineSet · SAS's Enterprise Miner**
> - **Other players:** **DataMind (NeurOagent) · Information Discovery (IDIS) · SAS Institute (SAS / Neuronets)**

> [!TRAP]
> **The four properties of a mined pattern — *valid, novel, potentially useful, understandable* — are the exam answer to *"what are the properties of the pattern identified by data mining?"*, and each rules out a specific failure:**
>
> | Property | Rules out |
> |---|---|
> | **Valid** | a pattern that is **statistical noise** — true in this sample, false in general |
> | **Novel** | a pattern you **already knew** — *"customers buy more at Diwali"* is true and useless |
> | **Potentially useful** | a pattern you **cannot act on** |
> | **Understandable** | a pattern **nobody can interpret or trust** |
>
> **Novelty is the one that distinguishes mining from reporting**, and it is worth saying so. **Reporting answers questions you asked; mining finds patterns you did not know to ask about.** That is exactly the deck's own contrast: *"data warehousing provides memory; data mining provides intelligence."*
>
> ⚠️ **And "validity" is the deck's own caution answered** — the question bank asks *"what cautions are needed while mining data?"* **Search a large dataset for patterns and you will find some by pure chance.** That is why **"Results validation" is a named step**, not an optional check: a pattern must be tested on data it was not discovered in.

> [!INTUITION]
> **Market Basket Analysis is the canonical example and the one worth being able to explain.** It finds **which products are bought together** — *customers who buy X also buy Y* — from transaction data.
>
> **Its value is that it needs no theory.** Nobody hypothesised the association; it fell out of the data. And it converts directly into action: **shelf placement, bundling, and cross-sell recommendations** — which is precisely the *"cross selling"* benefit from the CRM chapter.
>
> **That is the answer to *"how is data mining useful for customer relationship management?"***
>
> | Mining use | CRM capability it powers |
> |---|---|
> | **Customer analysis · Segmenting customers** | **customer segmentation and targeting** (marketing analytics) |
> | **Targeted marketing** | **focused marketing** (CRM benefit) |
> | **Cross selling · Market basket analysis** | **better cross-sell / up-sell** (CRM benefit) |
> | **Credit rating · Fraud detection** | **credit checks, risk management** (FSCM, Unit 3) |
>
> **Every CRM benefit that requires knowing something about a customer that they did not tell you is mining underneath.**

## Analytics

> [!EXAM]
> - **Analytics are business applications that analyze data for specific business subjects — like Supply Chain, Customer Relationship Management, Human Resource, Finance, etc.**
>
> **Analytics can be divided into two major categories:**
> - **Descriptive analytics — focuses on history** *(say: historical customer patterns)*
> - **Prescriptive analytics — focuses on trends to predict** *(say: customer's future behavior)*
>
> **Different Analytics Segments:**
> 1. **Financial and Business Performance Management (BPM) analytic applications** — further divided into **Financial Analytics** and **Business Performance Management (BPM)**
> 2. **Customer Relationship Management (CRM) Analytics**
> 3. **Operations and Production Analytic Applications**

> [!INTUITION]
> **The distinguishing feature of analytics, as opposed to OLAP or BI, is in the first line: *"for specific business subjects."***
>
> $$\textbf{OLAP: a general tool} \qquad \textbf{Analytics: a packaged application for one function}$$
>
> **An OLAP tool can slice any cube; a CRM analytics application already knows what a churn rate is.** The subject knowledge is built in — the metrics, the models and the reports come pre-defined.
>
> **That is why the three segments match the modules exactly** — **Financial/BPM ↔ FI-CO, CRM Analytics ↔ CRM, Operations and Production ↔ PP and SCM.** **Analytics is packaged per module**, which is also the same *"analytics"* row that appeared in Unit 3's HCM chapter and in the **CRM analytics** topic here.
>
> ⚠️ **Note the deck's descriptive/prescriptive split uses "prescriptive" where "predictive" is the more standard term** for *"focuses on trends to predict."* **Answer as the deck states it**, and know that industry usually reads **descriptive** = *what happened*, **predictive** = *what will happen*, **prescriptive** = *what should we do*.

## Business Intelligence

> [!EXAM]
> - **Business intelligence tools mainly help in reporting as per the end user requirement**
> - **OLAP, Analytics, Data mining etc. are part of the Business Intelligence suite**
>
> **Functionalities of BI Tools:**
> **Alerts · Scorecards · Dashboards · Ad hoc query · Workflow · Data delivery · Customization of reports based on user profile · Predictive modeling and data mining using advanced mathematical techniques · Visualization · Slice and Dice of data**
>
> **Leading Business Intelligence vendors:**
> - **SAP** — *SAP Business Intelligence is SAP's flagship product* — **Business Objects** *(taken over by SAP)*
> - **IBM Cognos** *(taken over by IBM)*
> - **Brio · Oracle · SAS Institute · Hyperion**
>
> **From the market slides:** the **Data Warehouse as a Service market** was **\$1.2 billion (2018-e)** growing to a projected **\$3.4 billion (2023-p)**, led by **North America**, then **Europe, APAC, MEA and Latin America** *(MarketsandMarkets)*.

> [!DERIVE]
> **BI is the umbrella, and the deck says so directly: *"OLAP, Analytics, Data mining etc. are part of the Business Intelligence suite."***
>
> $$\textbf{BI} \;\supset\; \{\textbf{OLAP}, \textbf{Analytics}, \textbf{Data Mining}, \textbf{Reporting}\}$$
>
> **So what does BI add on top of its parts?** Compare the functionality list against what OLAP and mining already provide:
>
> | Already in OLAP / mining | **BI adds** |
> |---|---|
> | slice and dice, visualization | **alerts** — the system tells *you* |
> | ad hoc query | **scorecards, dashboards** — a curated standing view |
> | predictive modeling and data mining | **workflow** — a finding triggers an action |
> | | **data delivery**, **report customization by user profile** |
>
> **The additions all concern *pushing* rather than *pulling*.** OLAP waits for someone to ask a question. **Alerts, dashboards, scorecards, workflow and data delivery bring the answer to the person without them asking** — and route it onward when action is needed.
>
> **That is the difference between a tool and a system:** *"correct problems **before** they affect customer satisfaction levels"* — the CRM-analytics goal — requires **being told**, not having to look.
>
> **And the vendor list is another acquisition story, exactly like Unit 4's:** **Business Objects → SAP**, **Cognos → IBM**, and **Hyperion → Oracle**. **Three independent BI leaders, all absorbed by suite vendors** — the *"specialists get acquired, suites get comprehensive"* half of Unit 3's arms race, in one line.

---

**Next:** how all of this differs by sector — **ERP for manufacturing industries**.
