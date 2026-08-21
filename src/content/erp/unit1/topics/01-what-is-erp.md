---
subject: erp
unit: 1
order: 1
slug: what-is-erp
title: What is ERP?
summary: Enterprise Business Systems and where ERP sits inside them, the E-R-P breakdown word by word, all three definitions the course examines, and what ERP physically is as a piece of software.
minutes: 12
tags: [ERP, EBS, definition, enterprise, resource, planning, gartner, integrated-information-system]
---

# What is ERP?

## Enterprise Business Systems

> [!EXAM]
> **Enterprise Business Systems (EBS) — definition:**
>
> **An integrated information system that connects and manages the core business processes of an organization using a centralized database, enabling efficient operations, real-time information sharing, and informed decision-making.**

> [!NOTE]
> **EBS represents the complete collection of integrated information systems** that support business operations, collaboration, and decision-making across an organization. **EBS includes systems such as ERP, CRM, SCM, HRM, and Business Intelligence platforms.**

> [!INTUITION]
> Get the containment right, because it is a favourite MCQ trap:
>
> $$\textbf{ERP} \subset \textbf{EBS}$$
>
> **EBS is the whole family; ERP is the biggest member of it.** The MCQ bank asks you to mark *"Enterprise application is a subset of ERP"* — **False**. It is the other way round.
>
> The deck states ERP's position exactly: *"ERP is a subset — a large one! Covers all the basic transactions inside the organization and dictates the overall business framework."*

## E-R-P, word by word

The three words are each examinable on their own — the question bank asks *"What is meant by enterprise, resource and planning?"*

> [!EXAM]
> | Word | Meaning | Examples |
> |---|---|---|
> | **Enterprise** | **An organization providing a set of products or services to society — a business entity.** Mid-size companies to huge business conglomerates, multi-crore / billion in sales | **Airtel, Tatas, Birlas, Mahindras, Reliance, IBM, Google, Apple** |
> | **Resource** | What the enterprise has to deploy | **Human resource, machines, plants, storehouses, material stock** |
> | **Planning** | What the enterprise must decide in advance | **Production, forecasts, money, new products, logistics, maintenance** |

> [!INTUITION]
> Read the three words as a sentence and the whole subject falls out:
>
> > **"An organisation (Enterprise) deciding in advance (Planning) how to deploy what it has (Resources)."**
>
> Note that **"resource" is deliberately broad** — it is not just money or materials. People, machines, buildings and stock are all resources, which is why ERP ends up containing HR and asset modules and not just finance.
>
> And the MCQ bank's definition of an enterprise is worth memorising as its own answer: **"an enterprise is a group of people with a common goal."** The *common* is the operative word — the whole of Unit 1 is about what goes wrong when departments stop sharing one.

## The three definitions

The course gives three, and an exam may ask for any of them. **Definition 1 is the textbook one — learn it verbatim.**

> [!EXAM]
> **Definition 1 — Textbook:**
>
> **ERP is an integrated information system built on a centralized database and having a common computing platform that helps in effective usage of enterprise's resources and facilitates the flow of information between all business functions of the enterprise (and with external stakeholders).**

> [!EXAM]
> **Definition 2 — Gartner** *(Research Note SPA-12-0420)*:
>
> *"is a **business strategy** and a set of **industry-domain-specific applications** that build customer and shareholder communities value network system by **enabling and optimising enterprise and inter-enterprise collaborative operational and financial processes**"*
>
> **Definition 3:**
>
> **ERP is a system of processes, applications, tools and operational philosophy of business enterprise, integrating resources and activities, data and control across different functions and stakeholders.**

> [!DERIVE]
> **Definition 1 has five load-bearing phrases.** Marks are given per phrase, so learn it in pieces rather than as one long sentence:
>
> 1. **integrated information system** — one system, not many
> 2. **centralized database** — one copy of the data
> 3. **common computing platform** — one technology base
> 4. **effective usage of enterprise's resources** — the *purpose*
> 5. **flow of information between all business functions (and external stakeholders)** — the *scope*
>
> Phrase 5 is the one students truncate. **"And with external stakeholders"** is what stretches ERP beyond the company's own walls — to suppliers and customers — and it is exactly what **Extended ERP / ERP II** later formalises.

> [!INTUITION]
> Compare definitions 1 and 2 and you can see the argument the whole course is making.
>
> **Definition 1 is technical** — database, platform, information flow. **Definition 2 opens with "is a business strategy."** Gartner is insisting ERP is not a software purchase but a decision about how the business will operate.
>
> The topic summary makes the same point twice over: *"ERP is a combination of technology and business process models **in equal measure**"* and *"is a good example of a **socio-technical system**."* If an exam asks "is ERP a technology project?", the expected answer is **no — it is equal parts technology and business process**, and the people side is why implementations fail.

## What ERP physically is

> [!EXAM]
> **ERP is a very large application software system and has:**
> - **Many modules**
> - **1000s of database tables**
> - **Millions of lines of code**
>
> **It is a business framework!**

> [!EXAM]
> Three statements the deck makes about what ERP *does*:
> - **ERP attempts to integrate all departments and functions across a company onto a single computing system that can serve all those different departments' particular needs.**
> - **ERP automates the tasks involved in performing a business process.**
> - **ERP replaces 100s of legacy systems in organizations.**

> [!TRAP]
> **"A business framework"** rather than "a program" is a phrase worth using in answers, and it has a practical consequence that returns in the Realization phase.
>
> A framework is something you **configure** to your business, not something you simply install. That is why ERP projects take years, why *customization* is a named risk, and why the deck lists *"ERP is a ready-made comprehensive system and can be deployed quickly"* as a **misconception**.

> [!NOTE]
> **Legacy system** — the MCQ bank's phrasing: *"the traditional business system is called a **legacy system**"*, and *"the main drawback of a legacy system is **no integration**."*
>
> Note the drawback is **not** that legacy systems are old or slow. It is that **they do not talk to each other** — which is the entire problem the next topic sets out.

## The ERP modules

> [!EXAM]
> **Core ERP modules:**
> **HCM (or HR) · Finance · Procurement · Inventory · Production Planning**
>
> **Extended ERP:**
> **CRM · Supply Chain Management (SCM) · PLM**

> [!INTUITION]
> The five core modules map onto the four classic resources plus the money:
>
> - **HCM** → people
> - **Inventory** → materials
> - **Production Planning** → machines and capacity
> - **Procurement** → getting more of the above
> - **Finance** → the ledger that every one of the others posts into
>
> **Finance is the module every other module touches**, which is why it is almost always in the first implementation wave — and why the banking example on a later slide shows a single loan application updating ten modules with the General Ledger among them.

> [!EXAM]
> **ERP supports *multiple* currency values** — an MCQ answer, and a consequence of the "Multi" problems in the next topic. Multinational enterprises operate in many currencies, so single-currency systems are disqualified outright.

---

**Next:** the problem all of this exists to solve — **why organizations need ERP**.
