---
subject: erp
unit: 5
order: 19
slug: cloud-saas-hosted
title: Cloud Computing, SaaS & Hosted ERP
summary: Cloud computing with its seven service areas and its advantages and criticism, SaaS with its characteristics, benefits and drivers, the seven-row SaaS-versus-hosted-ERP table, and why ERP on SaaS is hard.
minutes: 12
tags: [cloud-computing, IaaS, PaaS, SaaS, multi-tenant, single-tenant, hosted-ERP, subscription, pay-as-you-use, TCO, on-premise]
---

# Cloud Computing, SaaS & Hosted ERP

## Cloud computing

> [!EXAM]
> - **Cloud computing ensures that a company need not invest in the hardware upfront for deploying a business application like ERP, and can pay for it based on usage — i.e. computing infrastructure is available on demand**
> - **Thus cloud computing is a way of computing, via internet**
> - **Cloud computing customers do not own the physical infrastructure, thus avoiding capital expenditure by renting usage from a third-party provider and paying the provider only for what they use**
>
> **Areas of cloud computing:**
> **Database as a service · Desktop as a service · Disaster recovery as a service · Infrastructure as a service · Integration as a service · Platform as a service · Storage as a service**

> [!EXAM]
> **Advantages of cloud computing:**
> - **Cost reduction**
> - **Improvement in efficiency and utilization**
> - **Centralization of infrastructure**
> - **Individual companies need not design the hardware based on peak load**
> - **Scalability**
> - **Easier maintenance**
> - **Better Reliability**
> - **Measuring resource usage**
> - **Infrastructure is available anytime anywhere**
>
> **Disadvantages of cloud computing:**
> > *"Critics against cloud theory remark that although companies might be able to **save on upfront capital expenditures, they might not save much and might actually pay more for operating expenses.** So **in situations where the capital expense is relatively small, the cloud model may not make great financial sense.**"*
>
> **Cloud Concept diagram:** **Company · Individual · Others** → **Cloud Middleware** → resources: **Server · Network · Database · Operating System**

> [!DERIVE]
> **The single most important advantage is the one stated as a full sentence rather than a phrase: *"individual companies need not design the hardware based on peak load."***
>
> **On premise, you must buy for the peak.** If your month-end close needs four times the capacity of an ordinary day, **you own four times the hardware and it idles for twenty-nine days a month.**
>
> $$\textbf{on-premise capacity} = \textbf{peak demand} \qquad\qquad \textbf{cloud capacity} = \textbf{current demand}$$
>
> **And this is why *"centralization of infrastructure"* and *"improvement in efficiency and utilization"* are separate advantages:** the provider pools many customers whose peaks fall at different times, so **the same physical hardware serves everyone's peak** without anyone owning idle capacity.
>
> **This is precisely the capacity-planning problem from Unit 3** — *"organizations have defined resources / limited capacity… customer needs fluctuate… a mismatch results in under-utilization or overload."* **Cloud is the answer to that for computing capacity specifically**: it converts a fixed resource into a variable one, which is the thing capacity planning could never do for machines and people.
>
> **The criticism is equally worth understanding, and it is a genuine argument, not a hedge.** Cloud converts **CapEx into OpEx** — you stop buying hardware and start paying rent. **Rent never stops.** Over a long enough horizon, and for a **steady, predictable load**, owning is cheaper than renting.
>
> **So the deck's conclusion is precise: *"where the capital expense is relatively small, the cloud model may not make great financial sense."*** **Cloud wins where demand is variable or unpredictable; ownership wins where it is steady and large.**

> [!TRAP]
> **The seven "as a service" areas are worth reading as layers, because the exam-relevant three are a stack.**
>
> | Layer | You rent | You manage |
> |---|---|---|
> | **IaaS — Infrastructure** | **servers, storage, network** | OS, middleware, application |
> | **PaaS — Platform** | **plus OS and middleware** | the application |
> | **SaaS — Software** | **the whole application** | **nothing but your data and configuration** |
>
> **Each layer up rents more and controls less.** The deck's own **Cloud Concept** diagram shows exactly the IaaS/PaaS resources — **server, network, database, operating system** — behind cloud middleware.
>
> ⚠️ **SaaS is not on the deck's list of "areas of cloud computing"** even though it is the most important one for ERP — **it is treated as its own topic**, which is a reasonable structure but easy to trip over. **Storage, database, desktop, disaster recovery and integration as a service are all narrower slices of the same idea.**

## Software as a Service

> [!EXAM]
> - **With SaaS, a provider licenses an application to customers for use as a service on demand, through time subscription or "pay-as-you-use" model**
> - **This model allows vendors to develop, host and operate software for customer use**
> - **Rather than purchase the hardware and software to run an application, customers need only a computer or a server to download the application, and internet access to run the software**
> - **SaaS software vendors can adopt different approaches for giving customers access to the application — i.e. they may host the application on their own web servers, or upload the application to the consumer device and disable it after the contract expires**
> - **While SaaS was widely deployed initially for sales force automation (SFA) and Customer Relationship Management (CRM), gradually it became popular for applications like computerized billing, invoicing, human resource (HR) management, service desk management, sales pipeline management etc.**
>
> **SaaS characteristics:**
> 1. **Network based access to a business software**
> 2. **Activities (like maintenance) are managed from a central location rather than at each customer's site**
> 3. **SaaS application delivery follows a one-to-many model**
> 4. **Generally SaaS vendors price applications on a per-user basis, mostly with a minimum number of users and with additional fees for extra bandwidth and storage**

> [!EXAM]
> **SaaS Benefits:**
> - **Saves money for customers as the entire cost is variable and there is no fixed cost or upfront investment. Easy to calculate ROI**
> - **Multi-Tenant Efficiency** — **as the software is used by multiple companies, chances are that the software is never idle and always used by someone**
> - **Faster releases of new features, since the entire community of users benefits from new functionality**
> - **Flexibility and Scalability**
>
> **SaaS Drivers:**
> - **Growth of adoption of package applications / ERPs by SMBs**
> - **Computing has become a commodity**
> - **SaaS had become more popular for applications that are more standard across industries**
> - **More matured software evolution**
> - **Software hosting capability had matured over years**
> - **Network, Bandwidth and Security is becoming more reliable**

> [!INTUITION]
> **"One-to-many" is the characteristic that generates all the others, and naming it is the strongest answer to *"explain software as a service."***
>
> $$\textbf{one instance of the software} \;\longrightarrow\; \textbf{many customers}$$
>
> | Because it is one-to-many… | …this follows |
> |---|---|
> | maintenance happens once | **"managed from a central location rather than at each customer's site"** |
> | everyone is on the same version | **"faster releases — the entire community benefits"** |
> | hardware is shared across customers | **"multi-tenant efficiency — never idle"** |
> | you cannot change shared code | **customization is impossible** |
>
> **The last row is the cost, and it is not a limitation of the technology — it is a direct consequence of the model.** You cannot modify software that a thousand other companies are simultaneously running.
>
> **And "SaaS became popular for applications that are more standard across industries" is that constraint stated as market behaviour.** Payroll, expenses, service desk and CRM are similar everywhere, so a standard version fits. **Manufacturing, industry-specific processes and complex finance are not** — which is exactly why ERP was late to SaaS.
>
> **Note where SaaS started: SFA and CRM** — which matches the CRM chapter's own vendor quadrant, where **Salesforce, HubSpot, Pipedrive and Zoho** lead. **All SaaS-native.**

## SaaS versus hosted ERP

> [!EXAM]
> **Hosted ERP:**
> - **The ERP application can be hosted in a service provider's data center**
> - **Hosting ERP is becoming popular among customers looking to outsource their existing ERP implementations, to avoid capital outlays, and customers lacking access to knowledgeable ERP staff**
> - **Leading ERPs like SAP and Oracle are looking at hosting as a possible source of new revenue for managed services, beyond their traditional license revenue**
>
> **Differences between SaaS and Hosted ERP:**
> - **ERP hosting is typically done for a particular customer** — i.e. **it does not follow the multi-tenant architecture of SaaS**
> - **Under SaaS the same standard software must be used by all tenants and no modification in custom code or configuration is possible** — **in hosted ERP, as the application is hosted for a particular customer, code modification or customization is possible as per the customer's requirement**
> - **Unlike SaaS where the customer pays a monthly subscription fee (and does not own the license), in hosting customers need to pay a license fee (and they own the license)**
> - **In SaaS, the software vendor decides when to upgrade; in hosting, the customer decides on upgrade timing and whether to upgrade at all**

> [!EXAM]
> **The comparison table:**
>
> | Criteria | **SaaS** | **Hosted ERP** |
> |---|---|---|
> | **Architecture** | **Multi Tenant** | **Single Tenant** |
> | **Fee Structure** | **Subscription based** | **License** |
> | **License ownership** | **ERP Vendor** | **Customer** |
> | **Software customization / code modification possible** | **No** | **Yes** |
> | **Application hosting — who does?** | **ERP vendor's data center** | **Service provider's data center** |
> | **Application Upgrade — who does?** | **ERP vendor** | **Customer** |
> | **Application and infrastructure maintenance — who does?** | **ERP vendor / software publisher** | **Service provider** |

> [!DERIVE]
> **All seven rows follow from row one — multi-tenant versus single-tenant — and demonstrating that is the strongest possible answer to *"how is hosted ERP different from SaaS?"***
>
> $$\textbf{Multi-tenant: one instance, many customers} \qquad \textbf{Single-tenant: one instance, one customer}$$
>
> | Because SaaS is multi-tenant… | Because hosting is single-tenant… |
> |---|---|
> | **no customization** — you cannot modify shared code | **customization possible** — it is your instance |
> | **vendor decides upgrades** — everyone moves together | **customer decides**, or never upgrades |
> | **vendor hosts and maintains** — one instance to run | **a service provider** hosts your copy |
> | **subscription, vendor owns the licence** | **you own the licence** |
>
> **The upgrade row is the one with the sharpest practical consequence.** Under SaaS you **cannot refuse an upgrade** — which is unsettling for a company running its operations on it, but also means **you can never fall behind** and never face the *"large amount of customization ⇒ the system cannot evolve"* death spiral from Unit 4. **The constraint that removes your control also removes your ability to make that mistake.**
>
> **For which type of customer is hosted ERP a good option?** The deck answers it: **customers looking to outsource their existing implementation to avoid capital outlays, and customers lacking access to knowledgeable ERP staff.** In other words — **you have already customised, you already own the licence, and you cannot go to SaaS; but you do not want to run the data centre.** **Hosting is the middle position: keep your customised system, rent someone else's operations team.**

> [!EXAM]
> **Type of ERP software in use** *(Panorama Consulting's 2013 ERP Report, from the deck's image-only slide)*:
>
> | Type | Share |
> |---|---|
> | **On-Premise ERP (Traditional)** | **61%** |
> | **Software as a Service (SaaS)** | **14%** |
> | **Cloud ERP (hosted and managed off-site)** | **12%** |
> | **Other** | **13%** |

> [!TRAP]
> **Those figures are the reality check on the whole chapter and worth quoting.** As of that survey, **61% of ERP was still on-premise** — SaaS and cloud together barely a quarter. **The emerging trends were, at the time, genuinely emerging.**
>
> **Why ERP resisted SaaS longer than CRM — the deck states three major issues directly:**
> - **Security of customer specific data**
> - **Ensuring a high level of availability of the ERP system, as ERP is the heart of a company's business operations**
> - **Each customer needs specific customization, and it is difficult to stick to a standard solution**
>
> **And the special capabilities a service provider needs to offer ERP as SaaS:**
> - **A very thorough understanding of how the software is being used by the client base**
> - **The ability to maintain and upgrade the software remotely**
> - **Ensuring high system availability — virtually no downtime is acceptable**
>
> ⚠️ **The third issue is the fundamental one, and it is a contradiction rather than a difficulty:** SaaS requires a standard solution; **ERP customers need industry-specific and company-specific configuration.**
>
> **The deck's own resolution is the interesting part:** *"success of ERP / CRM software as SaaS will depend on offering the capability of offering **industry best-practice configurations**, as well as the ability for the customer to do **further configuration**."*
>
> **That is the preconfigured-template idea from Unit 4, made into the enabling condition for SaaS ERP** — **configuration, not code.** Let customers configure within the standard; never let them modify it. **The distinction between configuration and customization, which mattered commercially in Unit 4, becomes architecturally load-bearing here.**

---

**Next:** the technologies underneath — **SOA, RFID, mobile & EAI**.
