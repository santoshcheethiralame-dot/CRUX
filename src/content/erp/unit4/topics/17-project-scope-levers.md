---
subject: erp
unit: 4
order: 17
slug: project-scope-levers
title: Project Management & the Nine Levers of Scope
summary: The nine PMBOK areas as the deck gives them, the project manager's role, the nine levers of ERP project scope explained one by one, the data migration objects, and common ERP interfaces.
minutes: 12
tags: [PMBOK, project-manager, scope, process-scope, application-scope, interface-scope, data-migration, master-data, transaction-data, technology-scope]
---

# Project Management & the Nine Levers of Scope

## The PMBOK areas

> [!EXAM]
> **Nine Areas of Project Management (PMBOK)**, as the deck lists them:
>
> **Integration Management · Scope Management · Time Management · Cost Management · Quality Management · Human Resource Management · Communication Management · Risk Management · Procurement Management**
>
> **And the project manager's role:**
> - **Project Management is directly responsible for a few deliverables**
> - **Project Management needs to monitor and track all activities in the project**
> - **The Project Manager (PM) is the single face to the customer's senior management**

> [!TRAP]
> **Source erratum worth knowing.** The slide is illustrated with the cover of the **PMBOK Guide, Sixth Edition** — but the nine areas it lists are the **PMBOK 4th edition** set.
>
> **PMBOK 5th edition and later have ten knowledge areas**; the one missing from this list is **Project Stakeholder Management**, added in the 5th edition and present in the 6th.
>
> **Answer nine, as the deck gives them** — but knowing the tenth exists is worth a line, and it is a telling omission for an ERP project, where *"low top management support"*, *"low user involvement"* and *"organizational politics"* are all named risks. **Stakeholder management is precisely what those risks are failures of.**

> [!INTUITION]
> **"The PM is the single face to the customer's senior management" is a communication-architecture decision**, not a courtesy.
>
> With one designated interface, senior management gets **one consistent story**, and the project team is shielded from being pulled in different directions by different executives. With several faces, **every stakeholder hears a slightly different version** — and *"poor communication between relevant parties"* is the **most-cited reason for ERP project failure at 57%**, ahead of everything else.
>
> **The single-face rule is a direct control on the #1 failure cause.**

## The nine levers of scope

> [!EXAM]
> **Nine Levers of ERP Project Scope:**
>
> 1. **Location Scope**
> 2. **Business Scope**
> 3. **Process Scope**
> 4. **Application Scope**
> 5. **Interface Scope**
> 6. **Report Scope**
> 7. **Data Migration Scope**
> 8. **User Scope**
> 9. **Technology Scope**
>
> > **Identify in-scope and out-of-scope items clearly (and get sign off)!**

> [!DERIVE]
> **Nine levers, nine different questions — and the word "lever" is the key to the whole idea.**
>
> | Lever | The question it answers |
> |---|---|
> | **Location** | **which sites, plants, countries** are we implementing at? |
> | **Business** | **which legal entities / business units** are covered? |
> | **Process** | **which business processes** — P2P, O2C, H2R — are in? |
> | **Application** | **which modules** — FI, MM, SD, PP, HR — are in? |
> | **Interface** | **which other systems** must we connect to? |
> | **Report** | **which reports** will we build? |
> | **Data Migration** | **which data objects**, and **how much history**, move across? |
> | **User** | **how many users**, of which roles? |
> | **Technology** | **which platform, OS, database, landscape**? |
>
> **A lever is something you can pull to make the project bigger or smaller** — and every one of the nine is independently adjustable. That is the practical value of the list: when a project is over budget or behind schedule, **you do not have nine hundred choices, you have nine.** Drop two locations, defer a module, cut the report list, migrate two years of history instead of seven.
>
> **The single most important line on the slide is the instruction, not the list: *"identify in-scope and out-of-scope items clearly (and get sign off)."*** Writing down what is **out** of scope is harder and more valuable than writing what is in — because **scope creep** is a named risk of technology projects, and **"frequent change in scope"** is a named cause of ERP project risk. **An unstated exclusion is an assumed inclusion.**

> [!EXAM]
> **The question bank asks about two levers specifically:**
>
> - *"Explain what is meant by **process scope** and **application scope**."*
> - *"What is **interface scope**? Explain some common examples of application interface."*
> - *"Give some examples of **technology scope** and **scope exclusion**."*

> [!TRAP]
> **Process scope and application scope are the pair most often confused, and they cut the same project in two different directions.**
>
> - **Process scope is horizontal** — it follows a **business process end to end**, across whatever modules it touches. *Procure-to-Pay* runs through **MM** (requisition, PO, goods receipt) and **FI** (invoice, payment).
> - **Application scope is vertical** — it names **which modules are being implemented**. *FI, CO, MM, SD.*
>
> **You can implement a module without implementing every process that uses it, and you can implement a process that spans modules you are only partly deploying.** That mismatch is where scope gaps hide: a project scoped as *"MM and FI"* may quietly omit the **service procurement** process even though both its modules are in.
>
> **Scope by process, verify by application** — or you will find the gap at integration testing.

## Interface scope

> [!EXAM]
> **Common ERP interfaces:**
> - **Interface with Design Systems**
> - **Interface with Shop Floor Control Systems**
> - **Interface with Point Of Sale Systems**
> - **Interface with Weigh Bridge Application**
> - **Interface with Laboratory Management Information Systems**
> - **Interface with Industry Application**

> [!INTUITION]
> **Every one of those six is a system that exists because the ERP cannot do that job**, and noticing the pattern makes the list reproducible:
>
> | Interface | Why a separate system exists |
> |---|---|
> | **Design systems (CAD/PLM)** | engineering design is a different discipline entirely — and the **EBOM** originates there |
> | **Shop floor control** | **real-time machine control**; ERP works in transactions, not milliseconds |
> | **Point of Sale** | **retail till hardware**, must keep working when the network is down |
> | **Weigh bridge** | a **physical instrument** producing a measurement |
> | **LIMS** | **laboratory instruments and test protocols** |
> | **Industry application** | whatever the industry-exclusive process needs |
>
> **Three of the six are essentially instruments — weigh bridge, shop floor, LIMS — reading physical reality into the ERP.** The weigh bridge is the cleanest example: a truck's weight determines the goods receipt quantity, so **the scale must post directly into the GR** or someone will type it in wrongly.
>
> **This is exactly the "PLC / process automation equipment interface" named for the process industry in Unit 3**, and it is why interface scope is a lever at all: **each interface is a small development project**, with its own specification, testing and failure modes.

## Data migration scope

> [!EXAM]
> **Common ERP Master Data Migration Objects:**
>
> **Material Master · Customer Master · Vendor Master · Asset Master · Chart of Accounts · Cost Centres / Profit Centres / Cost Elements · Pricing Condition Master · Bill of Material, Routing, Work Centres etc. · Plant Maintenance Masters · Quality Management Masters · Warehouse Master**
>
> **Common ERP Transaction Data Migration Objects:**
>
> **General Ledger (GL) Balances & Open Items · Customer Open Items · Vendor Open Items · Budget Values · Loans and Advances · Open Internal Orders · Stock Balances · Material in Transit — High Seas, On Port · Open Service Contracts & Orders · Open Contracts & Purchase Orders · Open Sales Contracts & Orders**

> [!DERIVE]
> **The word that appears seven times in the transaction list is "open", and it is the whole principle.**
>
> **You do not migrate history — you migrate what is unfinished.**
>
> | | Migrate | Leave behind |
> |---|---|---|
> | **Master data** | **everything still active** — materials, customers, vendors, accounts | obsolete records *(migration is the chance to clean up)* |
> | **Transaction data** | **open items only** — unpaid invoices, undelivered POs, current balances | **closed, completed transactions** |
>
> **Why:** a purchase order already delivered and paid affects nothing going forward — it is a record, and the legacy system can keep it for enquiry. **An open PO must move**, because goods are still going to arrive against it and someone must receive them in the new system.
>
> $$\textbf{migrate} = \textbf{the state the business is in}, \text{ not } \textbf{the story of how it got there}$$
>
> **"Material in Transit — High Seas, On Port" is the vivid case:** goods that have left the vendor and not yet arrived, sitting on a ship. They are on nobody's shelf and in nobody's warehouse — but they are **owned, paid for or payable, and must appear on the balance sheet.** Miss them at cutover and both stock and payables are wrong on day one.
>
> **The master/transaction split matters practically** because they migrate at different times: **master data can be loaded weeks ahead and validated; open transaction data can only be extracted at the very last moment**, once the legacy system stops. That is the whole reason **cutover** is a distinct, minutely-planned phase.

> [!TRAP]
> **The question bank asks: "What is master and transaction data objects for data migration in an ERP project?"** — so know both lists and, more importantly, the **distinction**:
>
> - **Master data describes things that persist** — a material, a customer, a cost centre. It is **created once and referenced many times**.
> - **Transaction data records events** — an order, a receipt, a payment. It is **created constantly and references master data**.
>
> ⚠️ **And the migration is where "garbage in, garbage out" gets decided.** *"Having clean data in the system"* is a named success factor, and **validation of data before loading into the new system** is listed as one of the five core-team responsibilities. **The core team validates it because only the business knows whether a record is real.**

---

**Next:** the documents that hold the project together — **project plan, standards & charter**.
