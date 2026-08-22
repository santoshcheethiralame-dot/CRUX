---
subject: erp
unit: 5
order: 13
slug: data-warehouse
title: The Data Warehouse — Definition, Characteristics & Architecture
summary: Inmon's definition, the four characteristics with a mnemonic, the five defining features, the three-tier architecture with the deck's diagrams, warehousing capabilities, and the advantages and disadvantages.
minutes: 11
tags: [data-warehouse, subject-oriented, integrated, time-variant, non-volatile, three-tier, OLAP-server, MOLAP, ROLAP, data-latency]
---

# The Data Warehouse — Definition, Characteristics & Architecture

## What a data warehouse is

> [!EXAM]
> - **Data warehouse sources data from various operational systems, organizes and stores it in a form that is standardized, structured, consistent, clean and integrated**
> - **This is structured in a way to specifically address the reporting and analytic requirements**
>
> **The formal definition:**
>
> > **A data warehouse is a subject-oriented, integrated, time-variant, non-volatile collection of data used in support of the management decision making process.**

## The four characteristics

> [!EXAM]
> **Four important characteristics of a Data Warehouse:**
>
> | Characteristic | Meaning |
> |---|---|
> | **Subject-oriented** | **organized around subjects such as sales, product and customer.** **It focuses on modeling and analysis of data for decision makers related to a particular area** |
> | **Integrated** | **constructed by integrating multiple heterogeneous sources like OLTP, ERP, CRM, legacy applications etc.** |
> | **Time-variant** | **provides information from a historical perspective**, e.g. **past 5–10 years** |
> | **Non-volatile** | **data once recorded cannot be updated — i.e. cannot be changed until the next refresh** |

> [!INTUITION]
> **Mnemonic — "SITN", and each characteristic is a deliberate *rejection* of how an operational system works:**
>
> | Characteristic | Operational system | Data warehouse |
> |---|---|---|
> | **S**ubject-oriented | organised by **process** — order entry, goods receipt | organised by **subject** — sales, product, customer |
> | **I**ntegrated | **one application's** data | **many sources**, reconciled |
> | **T**ime-variant | **current** state only | **5–10 years** of history |
> | **N**on-volatile | **updated constantly** | **write once, read many** |
>
> **Every one is the opposite of an OLTP design, and that is the point** — you cannot build good analytics on a database optimised for transactions.
>
> **"Non-volatile" is the least intuitive and the most important.** An operational system **overwrites**: change a customer's address and the old one is gone. A warehouse **never overwrites** — otherwise last year's report would silently change every time someone corrected a record today, and **no analysis would ever be reproducible.**
>
> **"Subject-oriented" is the one that shows up in design.** An OLTP schema follows the **process** — you find a sales order, its line items, its deliveries. A warehouse follows the **subject** — you find *sales*, sliced by product, customer, region and time. **That reorganisation is exactly what a star schema is.**

> [!EXAM]
> **A data warehouse is further characterized by the following:**
> - **The data warehouse is for strategic decision making**
> - **The warehouse data is integrated**
> - **The warehouse contains historical data over a long time horizon**
> - **The warehouse data is oriented around various subjects**
> - **The warehouse data is mainly read-only with periodic batch updates from operational data sources**
>
> **And on structure and use:**
> - **The data warehouse contains data with several levels of detail: current detail data, old detail data, lightly summarized data and highly summarized data**
> - **The data warehouse is characterized by, and optimized for, read-only transactions**
> - **One of the popular architectures for a data warehouse is a three-tier architecture**
> - **The applications that run on a data warehouse include OLAP, data mining tools and query tools**

> [!TRAP]
> **"Several levels of detail" is easy to skim and is examinable in its own right.**
>
> A warehouse holds the **same facts at four granularities simultaneously**: **current detail · old detail · lightly summarized · highly summarized.**
>
> **Why store the same thing four times:** a dashboard asking *"total sales by region this year"* should not scan a billion transactions to produce one number. **Pre-summarised levels answer common questions instantly**, while the detail level remains available for drill-down.
>
> **This is exactly the granularity trade-off** the next topic states directly — *"summarized level data cannot answer transaction level questions"* versus *"storing at detailed level… the problem here is volume of data."* **Holding both levels is how you refuse to choose.**

## The architecture

> [!EXAM]
> **The deck's architecture diagram** *(an image-only slide)* shows:
>
> $$\textbf{CRM · Billing · ERP · Flat Files · Other Data Sources} \;\rightarrow\; \textbf{ETL} \;\rightarrow\; \textbf{Data Warehouse} \;\rightarrow\; \textbf{Reporting · Analytics · Data Mining}$$
>
> **The fuller version adds the OLAP layer:**
>
> $$\textbf{Data Source} \rightarrow \textbf{Extract, Transform, Load} \rightarrow \textbf{Data Warehouse} \rightarrow \textbf{Data Marts} \rightarrow \textbf{OLAP Servers} \rightarrow \textbf{Data Analysis Tools}$$
>
> with **External Sources** and **Operational Database** as the data sources, **MOLAP** and **ROLAP** named as OLAP server types, and **OLAP · Query/Reporting · Data Mining** as the analysis tools.

> [!EXAM]
> **Three Tier Data Warehouse Architecture:**
>
> | Tier | Contents |
> |---|---|
> | **1 — Data Sources** | operational systems, external sources, flat files |
> | **2 — Data Migration** | **ETL and Data Loading Tools** |
> | **3 — Data Storage Repository** | **the warehouse** *(and data marts)* |
> | **Analysis layer** | **Reporting, OLAP, Data Mining** |

> [!DERIVE]
> **The architecture is the four characteristics turned into boxes**, and tracing that correspondence is the strongest way to answer *"explain the three-tier architecture of a data warehousing tool."*
>
> | Characteristic | Which part of the architecture delivers it |
> |---|---|
> | **Integrated** | **the ETL layer** — reconciling CRM, billing, ERP and flat files into one model |
> | **Subject-oriented** | **the warehouse schema** — star schemas organised by subject |
> | **Time-variant** | **the warehouse itself** — accumulating loads over years |
> | **Non-volatile** | **the load process** — periodic batch, never transactional update |
>
> **The ETL layer is the load-bearing one, and it is why it gets its own tier.** Bringing CRM, ERP and legacy data together means resolving **different customer IDs, different date formats, different units, different definitions of "revenue."**
>
> **That is Nestlé's twenty-nine vanilla records arriving in the analytics layer** — and it is why *"clean data"* has its own list of properties two topics from now.
>
> **Separating the tiers buys three things:**
>
> - **Analytical load never touches production systems** — a heavy query cannot slow down order entry. *(The deck names this as an advantage outright: **"better performance of source system."**)*
> - **Sources can change without breaking reports**, because only the ETL layer knows their formats
> - **One warehouse serves many analysis tools** — OLAP, query/reporting and data mining all read the same repository

## Warehousing capabilities

> [!EXAM]
> **Data Warehousing Capability:**
>
> - **Data Storage**
> - **Database Integration**
> - **Supporting different data types**
> - **Application and middleware integration**
> - **Software platform integration**
> - **Security features** like **authentication, authorization, access control, permission management, data encryption, security monitoring / alerting / auditing**
> - **High availability and reliability features** like **redundancy, fault tolerance, data protection; data replication and mirroring; data backup, recovery, protection, disaster recovery**
> - **Supporting different industry standards** like **SQL, SOA (Web services, XML)**
> - **Administration features** — **system monitoring and control, diagnostics and troubleshooting, job scheduling and control**
> - **Metadata management, Data modeling, Hierarchy management**

> [!INTUITION]
> **Notice how much of that list is *not* about analysis** — security, high availability, backup, administration, standards. **Only the last line is analytical.**
>
> **The reason: a data warehouse becomes a critical system.** Once management decisions run on it, **it must be as available and as protected as the transaction systems that feed it** — and it now contains the **entire company's data in one place**, which makes it a far more attractive target than any single source system.
>
> $$\textbf{one repository of everything} \;\Rightarrow\; \textbf{one place to protect}$$
>
> **Metadata management is the most under-appreciated item.** Metadata is **data about the data** — where a figure came from, how it was calculated, when it was last refreshed. **Without it, two reports showing different revenue numbers cannot be reconciled**, and users stop trusting the warehouse. **A warehouse nobody trusts is worse than no warehouse**, because it still costs money.
>
> **And "hierarchy management" is what makes drill-down work at all** — the *Country → Region → State → City → Sales office* structure has to be defined and maintained somewhere.

## Advantages and disadvantages

> [!EXAM]
> **Advantages and Disadvantages of Data Warehousing:**
>
> | **Pros** | **Cons** |
> |---|---|
> | **Common Data Model** | **Data latency** |
> | **Clean Data** | **Unstructured data reporting not possible** |
> | **Better performance of source system** | |
> | **Facilitate reporting** | |
>
> The topic summary adds: **"storage of data for longer period"** as an advantage, and states the disadvantages as **"latency factor and no capability of storing unstructured data."**

> [!TRAP]
> **Both disadvantages follow directly from characteristics you were just told were advantages — and saying so is the mark-earning observation.**
>
> **① Data latency is the price of non-volatility.** Because the warehouse is loaded by **periodic batch** rather than updated transactionally, **it is always out of date by one refresh cycle.** Ask it about this morning's orders and it will not know.
>
> $$\textbf{non-volatile + batch load} \;\Rightarrow\; \textbf{latency}$$
>
> **Which is why an ODS exists** — *"an ODS consolidates data from multiple source systems and provides a **near real time** integrated view of current data."* **The ODS is the answer to this specific disadvantage.**
>
> **② Unstructured data is excluded by the schema.** A warehouse stores facts and dimensions in tables. **Emails, documents, images, call recordings and social media posts do not fit** — and they are exactly the data the CRM chapter said could be valuable *("from outside the organization if needed, like social media")*.
>
> ⚠️ **This is the honest limitation of the classical warehouse**, and it is the gap that later technologies were built to fill. **Answer it as stated; recognising it as the structural boundary of the approach is what makes the answer good.**
>
> **And "better performance of source system" is the advantage people forget** — it is a benefit to the *operational* systems, not to the analysts. **Moving reporting off OLTP is often the original business case**, before anyone has run a single analysis.

---

**Next:** how the data is actually shaped inside — **star schema, granularity, refresh & ETL**.
