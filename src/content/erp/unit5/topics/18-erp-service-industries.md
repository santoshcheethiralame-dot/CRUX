---
subject: erp
unit: 5
order: 18
slug: erp-service-industries
title: ERP for Service Industries
summary: Retail with its processes, components and the Oracle Retek and SAP Retail solution maps, healthcare for providers and payers, educational institutions, banking and insurance, and utilities.
minutes: 12
tags: [retail, category-management, assortment, POS, healthcare, providers, payers, education, banking, Finacle, FLEXCUBE, insurance, utilities]
---

# ERP for Service Industries

## Retail

> [!EXAM]
> **Industry-specific processes:**
> - **Category management**
> - **Merchandise budgeting and planning**
> - **Assortment management**
> - **Space management**
> - **Advanced promotion planning functionality and planning markdowns**
> - **Store clustering**
> - **Specialized retail replenishment functionalities** like **continuous replenishment, cross docking**
> - **Point of sales solutions**
> - **Cross channel order fulfilment**
> - **Store operations**
>
> **Main components of a Retail ERP solution:**
> **Master data · Merchandise planning, procurement and replenishment · Supply chain execution · Managing pricing and promotions · Point of sale integration · Reports / KPIs / Exception alerts · Store operations · Retail Planning**
>
> **Retail ERPs: Retek · JDA · SAP IS-Retail**

> [!INTUITION]
> **Retail's processes are all about *what to stock, where, and at what price* — because a retailer makes nothing.**
>
> | Process | The decision it makes |
> |---|---|
> | **Category management** | how do we manage **a whole product category** as a business? |
> | **Assortment management** | **which items** should this store carry? |
> | **Space management** | **how much shelf** does each item get? |
> | **Store clustering** | which stores are **similar enough** to treat the same way? |
> | **Merchandise budgeting and planning** | **how much money** goes into which category? |
> | **Promotion planning and markdowns** | **what price**, when? |
>
> **Store clustering is the one that makes the others tractable.** A chain with 800 stores cannot plan an assortment for each individually, and a single national assortment ignores that a city-centre store and a highway store sell different things. **Clustering groups similar stores so assortment and space decisions are made per cluster** — a few dozen decisions instead of 800.
>
> **That is the same "match the resolution to the decision" principle as ABC classification, rough-cut capacity planning and data granularity.**
>
> **And "cross channel order fulfilment" is the modern requirement:** order online, collect in store; buy in store, deliver home; return anywhere. **It demands a single view of inventory across every store and warehouse** — which is precisely the *"global inventory visibility"* that Unit 4 named as an Oracle Inventory Management capability.

> [!EXAM]
> **Oracle Retek Retail Applications** — the deck's abbreviation list:
>
> **RMS** Retail Merchandise System · **RTM** Retail Trade Management · **ReSA** Retail Sales Audit · **ReIM** Retail Invoice Matching · **RPM** Retail Price Management · **ARI** Active Retail Intelligence · **RIB** Retail Integration Bus · **RSL** Retail Service Layer · **RETL** Retail Extract, Transform and Load · **VCC** Value Chain Collaboration · **MFP** Merchandise Financial Planning · **RDF** Retail Demand Forecasting · **RSIM** Retail Store Inventory Management · **RPOS** Retail Point of Service · **AIP** Advanced Inventory Planning · **RWMS** Retail Warehouse Management**

> [!EXAM]
> **Oracle Retek solutions grouped by functionality:**
>
> | Functionality | Products |
> |---|---|
> | **Merchandise Operations Management** | Retail Merchandising System · Retail Price Management · Retail Trade Management · Retail Design · Retail Invoice Matching · Retail Sales Audit · Retail WebTrack |
> | **Store & Multi-channel Retailing** | Retail Point of Service · Retail Store Inventory Management |
> | **Supply Chain Planning & Optimization** | Retail Advanced Inventory Planning · Retail Inventory Optimization |
> | **Supply Chain Execution** | Retail Labor Management · Retail Warehouse Management System |
> | **Merchandise Planning & Optimization** | Retail Item Planning · Retail Price Optimization · Retail Promotion Planning · Retail Merchandise Financial Planning · Retail Allocation |
> | **Demand Planning** | Retail Demand Forecasting |
> | **Enterprise Infrastructure** | Retail Active Retail Intelligence · Retail Data Warehouse · Retail Portal · Retail Integration Solution |

> [!TRAP]
> **Read the Retek list and notice that it is this entire course, re-badged for retail.**
>
> | Retek product | What it is |
> |---|---|
> | **RETL — Retail Extract, Transform and Load** | **ETL** |
> | **Retail Data Warehouse** | **the data warehouse** |
> | **RDF — Retail Demand Forecasting** | **demand planning** |
> | **AIP — Advanced Inventory Planning** | **inventory models** |
> | **RWMS — Retail Warehouse Management** | **supply chain execution** |
> | **ReIM — Retail Invoice Matching** | **three-way matching** |
> | **RIB — Retail Integration Bus** | **EAI** |
> | **VCC — Value Chain Collaboration** | **CPFR / VMI** |
>
> **An industry solution is not different technology — it is the same technology with the industry's vocabulary, data model and processes pre-configured.** *"Retail Invoice Matching"* does exactly what Unit 4's three-way matching does; it just already knows what a retail invoice looks like.
>
> ⚠️ **That is the honest answer to what you are buying with an industry solution: pre-configuration, not novelty.** Which is also why **preconfigured templates** were named as the SMB answer in Unit 4 — **the same idea, sold to smaller companies.**
>
> **The SAP Retail solution map makes the same point structurally**, layering **SEM · WFM · SCM · CRM · SRM · mySAP ERP** with retail-specific content — **merchandise management, POS connectivity, POSDM, forecasting and replenishment, allocations** — sitting on **SAP NetWeaver** and **R/3 Enterprise** underneath. **Standard platform, retail content.**

## Healthcare

> [!EXAM]
> **For Healthcare Providers:**
> - **Managing Medical Records**
> - **Scheduling Appointments**
> - **Planning for Beds**
> - **Managing Operation Theater**
> - **Tracking of Inpatients and Outpatients**
> - **Managing waiting lists of patients**
> - **Patient Help desk and managing patient queries**
> - **Providing information and education to patients**
> - **Online Diagnostic reporting / Image reports**
>
> **For Healthcare Payers:**
> - **Claims Handling**
> - **Payer Relationship Management**
> - **Payer communication**
>
> **ERP modules for a Hospital:** **Patient Management · Scheduling (Bed, OT, Appointments) · Patient Help Desk · Pharmacy · Pathology · Store · Payroll · Accounts and Billing · Patient online Investigation Reports · Hospital MIS / Reports**

> [!EXAM]
> **Processes for a Healthcare Provider**, as the deck structures them:
>
> | Layer | Contents |
> |---|---|
> | **Core Processes** | **Prevent** *(manage health programs, advise healthy lifestyles)* · **Diagnose** *(order diagnostic tests, execute tests, analyze information)* · **Treat** *(prescribe medication, execute surgery interventions, provide treatment)* · **Care / Support** *(provide nursing care, home care, manage chronic illness)* |
> | **Manage Resources** | **human resources · operation theaters · materials · diagnostic appliances · beds · outpatient rooms · medications · tools · organs, blood** |
> | **Manage Information** | **patient info · appointments / schedules · medical reports · physical records · doctor's info** |
> | **Support processes** | **finance & cost · purchasing · logistics · human resources · IT** |

> [!DERIVE]
> **The provider/payer split is the structural insight in healthcare, and it is worth stating.**
>
> $$\textbf{Provider: delivers care} \qquad\qquad \textbf{Payer: pays for it}$$
>
> **They are different organisations with different systems.** The provider's processes are about **beds, theatres, tests and treatments**; the payer's are about **claims, relationships and communication.** *"Payer Relationship Management"* is literally **CRM where the customer is an insurer.**
>
> **And the "Manage Resources" list contains the most striking entry in the whole chapter: *"organs, blood."***
>
> **These are inventory items** — they have a stock level, a location, an expiry and a matching requirement. But they are also **perishable in hours, non-substitutable, and impossible to reorder.** No procurement lead time applies; no EOQ can be calculated. **It is the extreme case of the critical-item quadrant from Unit 4 — *"should never be out of stock"* — with no way to guarantee supply.**
>
> **Scheduling is the other hard problem, and for a familiar reason.** *"Planning for beds"*, *"managing operation theater"* and *"managing waiting lists"* are **finite-capacity scheduling against uncertain demand** — the same structure as production scheduling, except that the *"orders"* are patients, arrivals are partly emergencies, and **you cannot hold inventory of treated patients.**
>
> **That is Unit 3's caution about services made concrete:** *"capacity cannot be inventoried"*, *"dynamics involved are different."* **An empty operating theatre hour is gone forever, exactly like an unsold hotel room.**

## Educational institutions

> [!EXAM]
> **Managing the student life cycle:**
> - **Student master data**
> - **Registration / Admission of students to different study programs**
> - **Handling different examinations**
> - **Managing students' performance and Grading**
> - **Managing student financials**
> - **Online services to students**
>
> **Plus: Managing Education Campuses · Managing Libraries**
>
> **Managing different Academic Services:**
> - **Planning courses and curriculum**
> - **Developing course content**
> - **Scheduling class / exam and publishing schedule**
> - **Planning capacities**
> - **Evaluation of different programs**
>
> **Modules of an ERP solution for Educational Institutions:** **Admission · Registration · Grading · Progression · Degree · Graduation · Financial Aid · Alumni Relations**

> [!INTUITION]
> **The eight modules are a life cycle, exactly like HCM's ten areas and CRM's funnel:**
>
> $$\textbf{Admission} \rightarrow \textbf{Registration} \rightarrow \textbf{Grading} \rightarrow \textbf{Progression} \rightarrow \textbf{Degree} \rightarrow \textbf{Graduation} \rightarrow \textbf{Alumni Relations}$$
>
> with **Financial Aid** running alongside throughout.
>
> **This is the fourth instance of the pattern in this course** — **Hire-to-Retire** for employees, **lead-to-repeat-customer** for customers, **concept-to-retirement** for products, and now **admission-to-alumni** for students. **Every one of them is: take a long-lived entity, follow it end to end, and hold one record across every function that touches it.**
>
> **And "Alumni Relations" after graduation is the giveaway that this is CRM in disguise** — the relationship continues after the "transaction" completes, generating donations and reputation. **Exactly the *Customer → Account → Repeat* transition from the sales funnel.**
>
> **"Planning capacities" and "scheduling class / exam" are the same finite-capacity problem as hospitals and factories** — rooms, teaching staff and timetable slots are the constrained resources.

## Banking and insurance

> [!EXAM]
> **Banking — industry-specific processes:**
>
> | Group | Processes |
> |---|---|
> | **Normal banking activities** | **supporting transactions and maintaining data for savings account and card · fixed term deposit · dealing with shares, bonds, investment funds, derivatives · offering different brokerage services · card management** |
> | **Financing services** | **offering loans to customers · project financing · trade financing / Letter of Credit (LOC) services · leasing** |
> | **Treasury management** | **interest rate management · foreign exchange management / trading currencies · credit risk management** |
>
> **Leading Banking ERPs: Finacle (Infosys) · FLEXCUBE (Oracle) · IS-Banking (SAP) · BaNCS (TCS)**
>
> **ERP solution for Insurance companies:** **Customer Relationship Management · Product & Service Configuration · Policy Management · Commissions Mgmt · Claims Management · Inkasso / Exkasso (Collections & Disbursements) · Cash Management · Investment Management · Management Accounting · Financial Accounting · General Ledger · Reporting · Profitability Analysis · Human Resources · Facility Maintenance · Procurement · Overhead Mgmt** — accessed through **Internet · Agency · Interaction Center**

> [!TRAP]
> **Banking is the one industry where the ERP's *core* is finance rather than production — and that inverts the usual architecture.**
>
> In a manufacturer, **FI-CO records what production and sales did.** In a bank, **the financial transaction *is* the product.** There is no factory; the ledger is the operation.
>
> **That is why banking ERPs are a completely separate product category with their own vendors** — **Finacle, FLEXCUBE, BaNCS** — rather than a configuration of SAP or Oracle's standard ERP. **Two of the four named are Indian: Finacle by Infosys and BaNCS by TCS.**
>
> **Note that "Treasury management" appears here as a core banking process**, while in Unit 3 it was **one of the four categories of the finance module** for an ordinary company. **Same function, utterly different weight** — for a manufacturer treasury manages spare cash; for a bank, **interest rate, FX and credit risk management are the business.**
>
> **The insurance map is worth one observation:** it puts **CRM and the Interaction Center at the front** and **Policy Management, Claims Management and Commissions** in the middle. **Insurance is a relationship business with two moments of truth — selling the policy and paying the claim** — and *"Inkasso / Exkasso"* (collections and disbursements) is money flowing in as premiums and out as claims. **The whole business is those two flows.**

## Utilities

> [!EXAM]
> **Industry-specific processes:**
> - **Managing meters** — **installation and inspection of meters** · **reading meters and consumption determination**
> - **Energy Trading**
> - **Billing**
> - **Managing waste and emission**

> [!INTUITION]
> **Utilities are distinctive because of scale and because the "order" is continuous.**
>
> A utility has **millions of customers**, each consuming continuously rather than placing orders. **There is no sales order, no delivery, no goods issue** — there is a **meter**, and consumption is discovered by reading it.
>
> $$\textbf{meter reading} \;\rightarrow\; \textbf{consumption determination} \;\rightarrow\; \textbf{billing}$$
>
> **That three-step chain replaces the entire Order-to-Cash cycle**, and it is why **billing is named as a process in its own right**: producing millions of accurate bills from millions of readings on a cycle is a genuinely large computational and operational task.
>
> **"Energy trading" is the same commodity logic as oil** — electricity is traded on markets, and a utility both buys and sells. **"Managing waste and emission" is the regulatory obligation**, matching **EHS** from Unit 3 and **product safety / environmental compliance** from PLM.
>
> **And Ramco was named in Unit 4 as *"Ramco for Utilities"*** — the industry-specific package example, closing the loop with the selection chapter.

---

**Next:** how ERP is delivered now — **cloud, SaaS & hosted ERP**.
