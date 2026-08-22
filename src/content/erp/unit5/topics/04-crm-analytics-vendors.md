---
subject: erp
unit: 5
order: 4
slug: crm-analytics-vendors
title: CRM Analytics & Vendors
summary: The three types of CRM analytics with what each measures, the reporting capabilities CRM tools provide, the leading CRM products, and the 2018 vendor quadrant with its four leaders.
minutes: 9
tags: [CRM-analytics, sales-analytics, marketing-analytics, service-analytics, predictive-analytics, dashboards, drilldown, Salesforce, vendors, quadrant]
---

# CRM Analytics & Vendors

## The three types of analytics

> [!EXAM]
> **There can be different types of CRM analytics:**
>
> **Sales analytics** — *"allows companies to monitor and understand customer actions and preferences, through **dashboards that graphically display KPIs**."*
>
> **Marketing analytics** — *"marketing applications generally come with **predictive analytics** to improve **customer segmentation and targeting**, and tools to measure the **effectiveness (ROI) of a marketing / sales promotion campaign**."*
>
> **Customer service analytics** — *"increasing in popularity as companies demand **greater visibility into the performance of call centers and other support channels**, in order to **correct problems before they affect customer satisfaction levels**."*

> [!DERIVE]
> **The three analytics types correspond exactly to the three groups of application areas**, which is the cleanest way to hold them:
>
> | Analytics | Sits over | Answers |
> |---|---|---|
> | **Sales analytics** | SFA, order management, pricing | *what are customers **doing and preferring**?* |
> | **Marketing analytics** | campaigns, loyalty, lead management | *who should we **target**, and **did the campaign pay**?* |
> | **Service analytics** | call centre, field service | *how is **support performing**?* |
>
> **Each one uses a different technique, and the deck names them precisely:**
>
> - Sales analytics uses **dashboards and KPIs** — **descriptive**: *what happened?*
> - Marketing analytics uses **predictive analytics** — *what will this segment do?*
> - Service analytics is **preventive**: *"correct problems **before** they affect customer satisfaction levels."*
>
> **Only the marketing one is described as predictive**, and that is not accidental. Marketing must **commit budget in advance of knowing the outcome**, so a prediction has direct value. Sales analytics reports on deals that already exist; service analytics watches a queue that is already forming.
>
> **This is the descriptive-versus-predictive split** that the DW-BI chapter formalises later: *"**descriptive** analytics that focuses on history… and **prescriptive** analytics that focuses on trends to predict."*

> [!TRAP]
> **"Measure the effectiveness (ROI) of a marketing / sales promotion campaign" is the phrase to remember**, because campaign ROI is the thing CRM makes possible that was previously impossible.
>
> The classic complaint about advertising — *half of it is wasted, and nobody knows which half* — is a **measurement** problem, not a spending problem. **Once responses are recorded against customer records, you can attribute revenue to campaign** and compute the return.
>
> That closes the loop from the previous topic: **gather → plan → execute → measure → gather.** Without the measure step, the loop is a line, and the next campaign is planned on the same guesswork as the last one.
>
> **And "correct problems before they affect customer satisfaction levels" is the equivalent insight on the service side.** By the time satisfaction scores fall, the damage is done and customers have already left. **Watching queue lengths, resolution times and escalation rates is watching a leading indicator** — the same reason **exception messages** exist in MRP, and the same reason **SLA parameters** measure response and solution time rather than customer happiness.

## Reporting capabilities

> [!EXAM]
> **CRM applications support different types of customer analytics and reports through:**
>
> **Dashboards · Built-in reports · Custom reports · Trend analysis · Historical comparison · Graphics · Drilldown**

> [!INTUITION]
> **Seven capabilities, and they answer questions at three different depths:**
>
> | Depth | Capability | Question |
> |---|---|---|
> | **Glance** | **dashboards, graphics** | *is anything wrong right now?* |
> | **Read** | **built-in reports, custom reports** | *what are the numbers?* |
> | **Investigate** | **trend analysis, historical comparison, drilldown** | *why, and is it getting worse?* |
>
> **Drilldown is the one that matters most and is the least visible.** A dashboard showing *"sales down 8%"* is useless on its own — the necessary next question is **which region, which product, which salesperson.** Drilldown is the ability to keep asking that until you reach the transaction.
>
> **It is exactly the OLAP roll-up / drill-down operation** from the DW-BI chapter, where the same movement runs **Country → Region → State → City → Sales office**. **CRM analytics is OLAP with a customer dimension**, which is precisely why the two chapters sit in the same unit.
>
> **And "built-in reports vs custom reports" is a package-selection point in miniature:** built-in reports are the vendor's standard, available immediately; custom reports are yours, and someone has to build and maintain them. **The good-fit rule applies here too** — a CRM whose standard reports answer your questions costs far less than one where every question needs development.

## Leading CRM products

> [!EXAM]
> **Leading CRM Products:**
>
> **Salesforce · SAP · Oracle · Adobe · Microsoft · Zoho**

> [!EXAM]
> **The deck's 2018 vendor quadrant** — a **no-text, image-only slide** plotting **Value Score** against **Capability Score** in four quadrants: **Leaders** (high both) · **Masters** (high value, lower capability) · **Pacesetters** (high capability, lower value) · **Contenders** (lower both).
>
> | Quadrant | Vendors shown |
> |---|---|
> | **Leaders** | **Pipedrive · HubSpot · Salesforce · Zoho** |
> | **Masters** | Highrise · Base · Hatchbuck |
> | **Pacesetters** | **Oracle CRM On Demand** · Gold-Vision · amoCRM · Bpm'online |
> | **Contenders** | SalesNOW · Velocify · Close.io · Teamgate · Commence · AddressTwo · InStream · Cosential · PipelineDeals · Nimble · Act-On |
>
> *(Vtiger, Bitrix24 and Capsule sit near the centre boundaries.)*

> [!TRAP]
> **The vendor list here looks nothing like the ERP vendor list, and that difference is the examinable observation.**
>
> | | **ERP market** | **CRM market** |
> |---|---|---|
> | Tier 1 | **SAP, Oracle** — dominant | **Salesforce** — a CRM-only company leads |
> | Structure | **three tiers**, heavily consolidated | **dozens of viable players**, many small |
> | Newcomers | rare — huge barriers to entry | **HubSpot, Pipedrive, Zoho** are Leaders |
>
> **Salesforce leading rather than SAP or Oracle is the whole story.** CRM is where the *"specialized products are getting specialized further and maintain independent identity"* half of Unit 3's arms race actually won — the specialist beat the suites on their own ground.
>
> **Why CRM in particular:** it sits **at the edge of the enterprise**, touching customers, so it needs far less integration with core ledgers and production than a finance or manufacturing module does. **Low integration requirement is exactly the condition under which best-of-breed defeats the integrated suite** — the same principle that put **IBM's DIOS** at the top of the inventory pyramid while **SAP MM** held the base.
>
> ⚠️ **And note Oracle CRM On Demand's position: high capability, lower value score.** A capable product that customers judge expensive for what it delivers — which is exactly what **"Price and Value for Money"** meant as a selection criterion rather than plain "price."

> [!EXAM]
> **The question bank asks two vendor questions that the deck's own slides do not fully answer:**
>
> - *"Explain the capabilities of **SAP CRM**."*
> - *"What are the different modules of **Oracle Siebel CRM**? What are their key capabilities?"*
>
> **The assignment sets the same task:** *"study in detail the CRM capabilities of SAP CRM and Oracle Siebel CRM; note down all their modules and sub-modules; what capabilities do they offer; draw similarities and differences."*
>
> **Answer these from the generic application areas**, which every major CRM implements: **SFA · e-Commerce · Call Centre / Interaction Centre · Marketing · Field Service · PRM · Pricing · Product Configuration · Analytics.** Note that **Siebel is one of the products Oracle acquired** — it appears in the Unit 4 acquisition list alongside **JD Edwards, PeopleSoft and Retek**.

---

**Next:** the module the deck did not cover — **product lifecycle management (PLM)**.
