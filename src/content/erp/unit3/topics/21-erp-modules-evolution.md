---
subject: erp
unit: 3
order: 21
slug: erp-modules-evolution
title: ERP Modules & Evolution
summary: The twelve ERP modules with their SAP names, how the niche enterprise applications evolved alongside ERP and overlap with it, and the four-decade MRP → MRP II → ERP → ERP II history.
minutes: 11
tags: [modules, SAP, HCM, FI-CO, MM, SD, PP, SCM, CRM, SRM, PLM, EAM, evolution, ERP-II]
---

# ERP Modules & Evolution

## The modules

> [!EXAM]
> **ERP Modules** — *the deck's list, with SAP's module name in brackets:*
>
> | Module | SAP |
> |---|---|
> | **Human Capital Management (HCM)** | **[HR]** |
> | **Financial Management (FM)** | **[FI-CO]** |
> | **Procurement and Inventory Management (PIM)** | **[MM]** |
> | **Supplier Relationship Management** | **[SRM]** |
> | **Production Planning and Execution (PPE)** | **[PP]** |
> | **Supply Chain Planning (SCP)** | **[SCM]** |
> | **Sales and Service** | **[SD]** |
> | **Warehouse and Transportation Management** | |
> | **Customer Relationship Management (CRM)** | |
> | **Quality Management** | |
> | **Maintenance Management / Enterprise Asset Management** | |
> | **Product Lifecycle Management (PLM)** | |
>
> The deck's caveat, stated twice: *"**This is one set of modules. Different ERPs may have different sets of modules.** But **the core functionality of production, Finance, Warehouse, Inventory, Asset Management will be there in some form or the other.**"*

> [!INTUITION]
> **Group the twelve by what they touch, and the list stops being a list to memorise:**
>
> | Group | Modules |
> |---|---|
> | **Inward — the supply side** | **SRM · PIM/MM · Warehouse & Transportation** |
> | **Inside — making it** | **PPE/PP · Quality Management · Maintenance/EAM · PLM** |
> | **Outward — the demand side** | **Sales & Service (SD) · CRM · SCP** |
> | **Across — the whole enterprise** | **Financial Management (FI-CO) · HCM (HR)** |
>
> **Notice which two sit in the last row.** Money and people are not the property of any one function — every module consumes them, which is exactly why **FI and HR are the two you cannot leave out** and why this unit gave them a chapter each alongside production.
>
> The **inward → inside → outward** ordering is also the physical flow of goods, so the middle three rows are just **Procure-to-Pay, then production, then Order-to-Cash** with module names attached.

> [!TRAP]
> **Learn the SAP abbreviations — they are the ones that appear in questions and in industry.** The three least guessable:
>
> - **FI-CO** = **Financial Accounting + Controlling** — the external/internal split from the finance chapter, which is why the module name is hyphenated
> - **MM** = **Materials Management** (the deck's PIM)
> - **SD** = **Sales and Distribution** (the deck's Sales and Service)
>
> **PP** (Production Planning), **HR**, **SRM**, **CRM**, **SCM** and **PLM** are transparent.

## Evolution of enterprise applications

> [!EXAM]
> - **ERP functionalities have evolved over time**
> - **So also, the non-integrated niche enterprise "functional" applications such as CRM, SRM…**
> - **Lots of overlap in functionality**
> - **They may co-exist within an enterprise**

> [!EXAM]
> **The earlier vs now table — SCM and Financial Management:**
>
> | Function | **Earlier** | **Now** |
> |---|---|---|
> | **SCM** | Warehouse mgmt · Production mgmt · Distribution · Inventory mgmt · Transport mgmt | **Demand planning · Supply chain network · Factory scheduling · Inventory optimization · Transportation and route optimization** |
> | **Fin Mgmt** | Accounts Receivable/Payable · Mgmt accounting · Order mgmt · Tax mgmt · Treasury mgmt · Costing | **Budgeting · Financial SCM · Financial consolidation · SOA/SOX compliance** |
>
> *(SOX = **Sarbanes-Oxley**, per the deck's note.)*

> [!EXAM]
> **The earlier vs now table — PLM, EAM, SRM and CRM:**
>
> | Function | **Earlier** | **Now** |
> |---|---|---|
> | **PLM** | Quality Mgmt · Product Dev Project mgmt | **Product Data mgmt · Document Mgmt · Product Safety** |
> | **EAM** | Procurement · Vendor payment · Vendor rating | **Condition monitoring · Reliability/Maintenance · Mobile Asset Tracking** |
> | **SRM** | Procurement · Vendor payment · Vendor rating | **E-Procurement · Auction · Supplier self service · Supplier Analytics** |
> | **CRM** | Sales · Order Mgmt · Service · Invoice | **Internet Sales Service · Tele Sales Service · Mobile Sales Service · Opportunity Mgmt** |

> [!DERIVE]
> **Read the two columns as a single movement and the pattern is unmistakable: transaction → decision.**
>
> | Function | Earlier column is about… | Now column is about… |
> |---|---|---|
> | **SCM** | *recording* where stock is | **deciding** what to make and how to route it — planning, scheduling, **optimization** |
> | **Fin Mgmt** | *recording* what was paid and owed | **planning** and **proving** — budgeting, consolidation, **compliance** |
> | **SRM** | *paying* the vendor | **choosing** the vendor — auctions, **supplier analytics** |
> | **CRM** | *invoicing* the customer | **winning** the customer — **opportunity management**, new channels |
>
> **Every "earlier" entry is a transaction that had already happened; every "now" entry is a decision about what should happen.** That is the same shift Unit 1 described as **data → information → insight**, and the same reason **APS** exists beside plain capacity evaluation.
>
> **Two other threads run through the "now" column and are worth naming:**
> - **Self-service** — *supplier self service* here, **ESS** in HCM. The same idea applied outward instead of inward.
> - **Mobile** — *mobile asset tracking*, *mobile sales service*. Function moving to where the work physically is.

> [!TRAP]
> **The overlap is the examinable point, not a footnote.** The deck says it three times: *"lots of overlap in functionality"*, *"here again the overlaps are clearly seen"*, and *"because of significant overlap in functionality, it is confusing at times."*
>
> Look at **EAM and SRM in the "earlier" column: they are word-for-word identical** — *Procurement · Vendor payment · Vendor rating*. Two separate product categories once did the very same thing, and only diverged later.
>
> This creates a real decision the deck states plainly:
>
> > *"**A company has to carefully weigh whether to go for an enterprise app that is critical to its business, or go for an integrated ERP.** Even in ERP, modules can be **separately implemented**. **It is not an easy decision.**"*
>
> **This is the best-of-breed vs single-vendor trade-off** from Unit 2's package selection — a specialist CRM will out-feature the ERP's CRM module, but it will not be integrated for free.

> [!INTUITION]
> **The deck's summary of the arms race is a quotable line:**
>
> > *"**ERP functionalities are getting comprehensive to include the niche functionalities at each newer version, but the specialized products are getting specialized further and maintain independent identity.**"*
>
> **Both sides are running, so the overlap never closes.** ERP absorbs what the specialists proved valuable; the specialists move further ahead into depth ERP will not follow. That is why *"they may co-exist within an enterprise"* is the normal state of affairs and not a sign of bad architecture.

## ERP history and evolution

> [!EXAM]
> | Period | ERP Outlook |
> |---|---|
> | **1960–70s** | **MRP — Material Requirement Planning.** **Inventory and process time reduction** with new production planning systems |
> | **1980s** | **MRP II — Manufacturing Resource Planning.** **Greater reduction due to integration with accounting, billing** |
> | **1990s** | **ERP.** **All processes integrated**; collaboration with other enterprise apps like CRM, SRM…; **supports non-manufacturing too** |
> | **2000s** | **Extended ERP, ERP II.** **Focussed on clients, optimizing the whole business network — including suppliers and clients** |

> [!INTUITION]
> **Mnemonic — each decade adds one ring outward:**
>
> $$\textbf{Materials} \rightarrow \textbf{the Factory} \rightarrow \textbf{the Enterprise} \rightarrow \textbf{the Network}$$
>
> | Decade | Scope | One-word test |
> |---|---|---|
> | **1960–70s** | **MRP** — *materials* | can I get the **parts**? |
> | **1980s** | **MRP II** — *the whole plant*, plus accounting and billing | can the **factory** do it, and what does it cost? |
> | **1990s** | **ERP** — *the whole company*, manufacturing or not | is the **enterprise** integrated? |
> | **2000s** | **ERP II** — *suppliers and customers too* | is the **network** optimised? |
>
> **The boundary keeps moving outward, and each expansion is the previous one's limitation resolved.** MRP could not see capacity — MRP II added it. MRP II only served factories — ERP served everyone. ERP stopped at the company wall — ERP II crossed it.
>
> Note the phrase **"supports non-manufacturing too"** in the 1990s row: **that is precisely the moment the word "Manufacturing" left the name.** Manufacturing Resource Planning became *Enterprise* Resource Planning because the customers were no longer only factories — which is the naming story from Unit 1, dated.

> [!EXAM]
> **The deck's speaker notes expand each row** and are worth having verbatim:
>
> - **MRP** — *"Uses the master production schedules — **what needs to be manufactured, how much, how much in stock, how much to order.** **First application of computing to manufacturing process.** Closed loop — little simplistic, **does not consider constraints of capacity** etc."*
> - **MRP II** — *"**Not just production** but considers other functions such as **capacity, financial, HR, supply chain, billing…**"*
> - **ERP** — *"All that is MRP and MRP II **+ other things such as HR, collaborate with other enterprise apps** … **e-Business applications started coming.**"*

> [!TRAP]
> **Two dating traps in this table.**
>
> **First — "MRP was the first application of computing to manufacturing."** That claim belongs to the **1960–70s row specifically**, and it is the reason MRP matters historically even though its limitations are severe. Do not attach it to MRP II or ERP.
>
> **Second — expand the two acronyms correctly.** They differ by one word and it is exactly the word that changed:
>
> | | Expansion |
> |---|---|
> | **MRP** | **Material Requirement Planning** |
> | **MRP II** | **Manufacturing Resource Planning** |
>
> **Not "Material Resource Planning."** MRP II broadened from *materials* to *all manufacturing resources* — capacity, money, people — and the name records that.

## Chapter summary

> [!EXAM]
> **The deck's own PPE summary:**
> - **PPE is one of the central ERP capabilities**
> - **Has brought in many structured concepts leading to standardization**
> - **This is also the place where a lot of "customization" is needed** based on type of industry etc.
> - **Proper adaptation of ERP in PPE can result in significant competitive advantage at the core of the company**
>
> The speaker note adds the modern qualifier: *"**PPE is central to MRP and hence to traditional ERP** — though **current-day ERPs focus more on managing, control, collaboration, supply chain** etc."*

> [!INTUITION]
> **The third and fourth bullets are in tension, and that tension is the unit's closing idea.**
>
> PPE **standardized** production planning — MRP II is *"a 'standard' for production planning; all ERPs support it"* — and standardization is what makes ERP packages possible at all. But PPE is simultaneously **where the most customization is needed**, because a chemical plant, an FMCG line and a Kanban cell genuinely plan differently.
>
> **So the competitive advantage in bullet four comes from the fit, not from the software.** Everyone can buy the same package; the advantage is in **adapting it properly to your industry** — which is exactly Unit 2's argument that ERP value comes from **BPR and change management**, not from installation.

---

**Unit 3 complete.** Three modules seen end to end — **HCM** (the ten areas, hire-to-retire), **Financial Management** (FI vs CO, the four flows), and **Production Planning and Execution** (the five MRP II levels, master data, scenarios and DRP) — and now placed on the map of all twelve modules and four decades of evolution.
