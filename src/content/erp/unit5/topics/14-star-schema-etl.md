---
subject: erp
unit: 5
order: 14
slug: star-schema-etl
title: Star Schema, Granularity, Refresh & ETL
summary: The star schema with facts, dimensions and attributes plus the deck's worked SALES example, the granularity trade-off, refresh options and techniques, the seven properties of quality data, and ETL with its uses and vendors.
minutes: 12
tags: [star-schema, fact-table, dimension-table, attributes, granularity, refresh, delta-refresh, data-quality, ETL, Informatica, data-migration]
---

# Star Schema, Granularity, Refresh & ETL

## The star schema

> [!EXAM]
> - **The classic star schema is a frequently used multi-dimensional model for relational databases**
> - **This database schema classifies two groups of data: facts (sales or quantity, for example) and dimension attributes (customer, material, time, for example)**
> - **Star schema uses fact and dimension tables and is composed of a single fact table and, for each dimension, one dimension table**
> - **Fact tables are related to each dimension table in a Many-to-One relationship (Primary / Foreign Key Relationships)**
>
> **Fact** — **these are numeric measurements (values) that represent a specific business aspect or activity.** **These are stored in a fact table at the center of the star schema** and contain facts that are linked through their dimensions. **Typical example of a fact table is individual sales records.**
>
> **Dimensions** — **these are qualifying characteristics that provide additional perspectives to a given fact.** **Dimensions are normally stored in dimension tables. These are joined to the fact table by a foreign key.** Typical examples: **time periods, geographic region (markets, cities), products, customers, salesperson.**
>
> **Attributes** — **provide additional information for a dimension.** For example **customer name, city and region can be attributes for the dimension Customer.**
>
> **Advantages of Star Schema:**
> - **Storing data in the form of the classic star schema is optimized for reporting**
> - **It allows the user to view facts from a variety of perspectives (dimensions)**

> [!EXAM]
> **The deck's worked star schema — an image-only slide, so it is easy to miss:**
>
> **Fact table — SALES:** **Product_Code · Period_Code · Store_Code · Units_Sold · Dollars_Sold · Dollars_Cost**
>
> **Dimension tables:**
>
> | Dimension | Columns |
> |---|---|
> | **PRODUCT** | **Product_Code** *(key)* · Description · Color · Size |
> | **PERIOD** | **Period_Code** *(key)* · Year · Quarter · Month · Day |
> | **STORE** | **Store_Code** *(key)* · Store_Name · City · Telephone · Manager |

> [!DERIVE]
> **Look at the SALES table and the structure gives itself away — it has exactly two kinds of column.**
>
> | Kind | Columns | Role |
> |---|---|---|
> | **Foreign keys** | Product_Code, Period_Code, Store_Code | **the dimensions** — *what, when, where* |
> | **Measures** | Units_Sold, Dollars_Sold, Dollars_Cost | **the facts** — the numbers |
>
> $$\textbf{fact table} = \textbf{keys pointing outward} + \textbf{numbers to add up}$$
>
> **That is the whole design, and it is why it is called a *star*:** one central table with dimension tables radiating from it, joined many-to-one.
>
> **The test for "is this a fact or a dimension" is simple and worth having:**
>
> - **Facts are things you would *add up*** — units sold, dollars sold, cost.
> - **Dimensions are things you would *group by* or *filter on*** — product, month, store.
>
> **"Total Dollars_Sold, by Month, for Blue products, in Mumbai stores"** uses one fact and three dimensions, and that single sentence is what the schema is built to answer.
>
> **Note the three-level hierarchy: dimension → attributes.** The **PERIOD** dimension carries **Year, Quarter, Month, Day** — those attributes *are* the drill-down path. Likewise **STORE** carries **City**, which supports the geographic hierarchy. **Attributes are not decoration; they are the axes along which you roll up and drill down.**
>
> **And notice what STORE contains that a fact table never would — Store_Name, Telephone, Manager.** Descriptive, textual, unaggregatable. **Putting them in the dimension keeps the fact table narrow**, and a narrow fact table is a fast one when it holds a billion rows.

> [!TRAP]
> **The star schema is *deliberately denormalised*, and this is the point students most often get wrong.**
>
> A properly normalised design would split **STORE** into store → city → state → country tables. **The star schema flattens all of that into one dimension table**, accepting the redundancy.
>
> | | **OLTP — normalized** | **Warehouse — star schema** |
> |---|---|---|
> | Goal | **avoid update anomalies** | **avoid joins** |
> | Because | data changes constantly | **data is non-volatile — it does not change** |
> | Cost | many joins per query | some storage redundancy |
>
> **The justification is non-volatility.** Normalisation exists to prevent inconsistency when data is updated — **and warehouse data is not updated.** So the reason for normalising evaporates, and you may trade storage for query speed freely.
>
> **This is exactly what the OLTP-vs-OLAP table states:** *"OLTP database design is **highly normalized**… OLAP database design is typically **denormalized with limited tables**."* **The two designs are opposite because their workloads are opposite.**

## Data granularity

> [!EXAM]
> **Data Granularity — appropriate level to store data. The trade-off:**
>
> **Data stored at summarized level has advantages like:**
> - **Reduced storage costs and reduced CPU usage**
> - **Increases performance, since a smaller number of records to be processed**
> - **Better performance in reporting**
>
> **But: summarized level data cannot answer transaction level questions.**
>
> **Storing data at detailed level — i.e. storing each transaction — has the advantage that each transaction's details can be obtained.** **However the problem here is volume of data, i.e. too voluminous.**

> [!INTUITION]
> **The trade-off is exact and symmetrical:**
>
> $$\textbf{summarized: fast, cheap, cannot drill down} \qquad\longleftrightarrow\qquad \textbf{detailed: slow, expensive, answers anything}$$
>
> **And the practical resolution is not to choose** — it is to hold **both**, which is precisely why a warehouse contains *"current detail data, old detail data, lightly summarized data and highly summarized data."*
>
> **The unrecoverable direction is what makes this decision matter.** You can always summarise detail; **you can never recover detail from a summary.** So the risk is asymmetric: over-summarise and the question you cannot answer next year is permanently unanswerable.
>
> **This is the same shape as *"deciding inventory based on service levels"* and *"rough cut vs detailed capacity planning"*** — coarse where coarse is enough, fine where fine is needed. **The recurring principle of this whole course: match the resolution to the decision.**

## Refreshing the warehouse

> [!EXAM]
> **Different options for refreshing data in a data warehouse:**
> - **Periodically** (e.g. every night, every week)
> - **After every significant event** — say after each month-end financial closing
> - **On every update** — i.e. as soon as there is a change in data
>
> **Different refresh techniques:**
> - **Full refresh from base tables**
> - **Incremental or Delta refresh**

> [!DERIVE]
> **The three options trade *freshness* against *load on the source system*:**
>
> | Option | Freshness | Cost |
> |---|---|---|
> | **Periodically** | up to a day/week stale | **low** — runs overnight when systems are quiet |
> | **After significant events** | aligned to **business meaning** | low, and **consistent** |
> | **On every update** | **near real time** | **high** — constant load on OLTP |
>
> **"After every significant event" is the subtle one and deserves explaining.** Refreshing after **month-end closing** means the warehouse always holds *closed, reconciled* figures — **never a half-closed month that would produce misleading reports.** **Business meaning, not clock time, defines the boundary.**
>
> **And the two techniques differ enormously in cost:**
>
> - **Full refresh** reloads everything. **Simple, safe, and completely impractical once the warehouse is large.**
> - **Delta / incremental refresh** loads only what changed. **Far cheaper, but it requires knowing what changed** — a change-capture mechanism in the source system.
>
> **"On every update" refresh is essentially what an ODS provides**, and it is why the ODS exists as a separate object: **near-real-time integration is a different design problem from historical analysis.**

## Quality data

> [!EXAM]
> **Properties of Quality Data:**
>
> 1. **Accuracy**
> 2. **Completeness**
> 3. **Integrate**
> 4. **Timeliness**
> 5. **Consistency and Standardization**
> 6. **Accuracy of Hierarchical relationships**
> 7. **Uniqueness**

> [!TRAP]
> **Three of the seven are the ones that actually bite in an ERP context, and they map onto problems this course has already named.**
>
> **① Uniqueness** — **one real-world thing must be one record.** This is **Nestlé's twenty-nine vanilla records** stated as a data-quality property, and it is the hardest to achieve when integrating multiple sources, because *"Ramesh Kumar"* in CRM and *"R. Kumar"* in ERP are the same customer.
>
> **② Consistency and standardization** — **the same thing must be recorded the same way everywhere.** Different date formats, different units, different currency conventions. **This is what the "T" in ETL spends most of its time on.**
>
> **③ Accuracy of hierarchical relationships** — **the drill-down paths must be correct.** If a city is assigned to the wrong region, **every regional report is wrong and every drill-down leads to the wrong place** — and the error is invisible at the summary level, which is what makes it dangerous.
>
> ⚠️ **This whole list is "garbage in, garbage out" from Unit 1 given seven names**, and it is why **clean data** is listed as both an advantage of warehousing and a named ERP success factor (*"having clean data in the system"*). **The warehouse does not create quality; the ETL layer has to impose it.**

## ETL tools

> [!EXAM]
> **ETL — Extraction, Transformation, Loading:**
>
> **ETL tools enable companies to extract data from multiple sources (Extract), reformat and cleanse it (Transform), and load (Load) it into another database, a data mart or a data warehouse for analysis.**
>
> | Step | What it does |
> |---|---|
> | **Extract** | **batch extraction of high volumes of data from one or more sources** |
> | **Transform** | **after extraction, the data needs to be transformed or modified depending on specific business logic involved, so that it can be sent to the target repository** |
> | **Load** | **loading of data to specified target systems** — **data warehouse, data mart, ODS, another application** |
>
> **Areas of usage for ETL Tools:**
> 1. **Data migrations**
> 2. **Master data management**
> 3. **Data warehousing and reporting**
> 4. **Compliance**
>
> **ETL Vendors come from a variety of backgrounds:**
> - **Pure-play ETL vendors** — **Ascential Software (Ascential DataStage) · Informatica (Informatica PowerCenter)**
> - **Database vendors** — **IBM · Microsoft (Microsoft, Pervasive) · Oracle (Oracle Warehouse Builder — OWB)**
> - **Business intelligence (BI) vendors** — **Business Objects · Cognos · Hummingbird · SAS**

> [!INTUITION]
> **"Transform" is the step doing the real work, and it is where the four data-warehouse characteristics are actually manufactured.**
>
> | Transform does | Delivering |
> |---|---|
> | reconciling customer IDs across systems | **Integrated** · **Uniqueness** |
> | standardising formats, units, currencies | **Consistency and Standardization** |
> | restructuring process data into subjects | **Subject-oriented** |
> | stamping records with a load date | **Time-variant** |
>
> **Extract and Load are plumbing; Transform is where the data warehouse's promises are kept.**
>
> **And the four usage areas are worth noticing, because only one of them is analytics.**
>
> **"Data migrations" is the connection back to Unit 4** — the ERP project's master and transaction data migration objects have to move from legacy to new system, and **ETL is the tool that does it.** *"Validation of data before loading into the new system"* was a named core-team responsibility; **ETL is where that validation is implemented.**
>
> **"Compliance" is the fourth and least obvious:** regulators require reports that draw on data from several systems, and **ETL is what assembles them repeatably and auditably** — which links to **SOX compliance** in Unit 3's finance evolution row.

---

**Next:** how the data gets queried — **OLTP vs OLAP, and OLAP operations**.
