---
subject: erp
unit: 1
order: 18
slug: costs
title: Costs of ERP Implementation
summary: Direct versus indirect costs, all nine direct cost elements with the hardware and licensing detail, the two indirect costs and why opportunity cost belongs there, and the worked sample cost table totalling 1,914 lakhs.
minutes: 12
tags: [costs, direct, indirect, hardware, license, AMC, consulting, PMO, opportunity-cost, cost-table]
---

# Costs of ERP Implementation

## Direct vs indirect

> [!EXAM]
> **Cost components are many.** Two types:
>
> | Type | Definition |
> |---|---|
> | **Direct costs** | **Costs of new material / service bought by paying money** — salaries, machines procured, s/w bought, consulting charges |
> | **Indirect costs** | **Typically costs of shared resources** — **management cost / overheads**, and **opportunity costs** |

> [!INTUITION]
> **The test is simple: does an invoice arrive?**
>
> **Direct costs have an invoice.** Somebody outside the project sends a bill — the hardware vendor, the ERP vendor, the consulting firm.
>
> **Indirect costs have no invoice.** They are real losses of value that never appear as a line item, which is exactly why they get forgotten in business cases — and why the deck lists them as **hidden costs that "come as a surprise."**

## The nine direct costs

> [!EXAM]
> 1. **Hardware**
> 2. **OS and DB cost**
> 3. **Application License Fee**
> 4. **Application Maintenance Cost**
> 5. **Complimentary Software License Cost**
> 6. **Consulting Service Cost**
> 7. **Post Implementation Support Cost**
> 8. **Training Cost**
> 9. **PMO Cost**
>
> Plus **other costs**.

> [!INTUITION]
> **Group the nine into four buckets and they become recallable:**
>
> | Bucket | Items |
> |---|---|
> | **Iron** — the machines | Hardware · OS and DB |
> | **Software** — the licences | Application licence · Application maintenance (AMC) · Complimentary software |
> | **People** — the humans | Consulting · Post-implementation support · Training |
> | **Overhead** — running the project | PMO |
>
> **Iron, Software, People, Overhead.** Note that the *People* bucket is by far the largest in the sample table — consulting alone is **800 lakhs** against 200 for hardware. **ERP is a services purchase more than a software purchase.**

### Hardware costs

> [!EXAM]
> - **Servers — typically high end**
> - **Includes networking costs**
> - **Development setup costs**
> - **Backup system is a must**
>
> **How do we know what is required?** **Hardware sizing** is an important exercise in the early **Evaluation / Preparation** phase. It depends on **number of users, number of transactions, levels of reliability and number of locations**.
>
> **Caveat:** the situation with **cloud-based ERP could be different.**

> [!EXAM]
> The QnA gives the fuller list of hardware elements:
> **Server/s · Storage disks including for backups · Network components · PCs** (CPUs, monitors, keyboards or laptops, mouse, printers) **for the implementation period and eventually for end users.**

> [!TRAP]
> **A development setup is a separate cost from the production system**, and it is routinely forgotten. You cannot configure and test on the live system — you need at least a **development** and usually a **test** environment too.
>
> That is also what **ASAP's "Transports"** tool exists for: moving configuration **from dev to deployment**. The tool only makes sense because the environments are separate — and separate environments cost money.

### OS, database and licensing

> [!EXAM]
> - **High-end OS/DB may have special licensing models**
> - They need to be **"Business Class"**
> - The question bank asks: *"What are the different licence policies that ERP vendors follow?"*

> [!DERIVE]
> **The sample table shows the licensing model directly** — it is **priced per user, by user type**:
>
> | User type | Count | Rate | Cost |
> |---|---|---|---|
> | **Developers** | 20 | 1.0 lakh each | **20 lakhs** |
> | **Professional users** | 30 | 80k each | **24 lakhs** |
> | **Ordinary users** | 450 | 50k each | **225 lakhs** |
> | | | **Total** | **269 lakhs** |
>
> **Two things to notice.** First, **licence cost scales with headcount, not with revenue or transactions** — so a people-heavy organisation pays more. Second, the **rate differs by user type**: a developer costs twice an ordinary user. This is why **scope freezing at module level** matters commercially — every extra module means more users needing licences.

### Application maintenance (AMC)

> [!DERIVE]
> The sample shows AMC as a **percentage of licence cost, rising over time**:
>
> **20% for the first three years, 22% thereafter** → $54L \times 3 + 59L \times 2 = 162 + 118 = \mathbf{280}$ **lakhs**
>
> **AMC (280 lakhs) exceeds the original licence fee (269 lakhs)** over the five-year horizon. That is the single most important arithmetic fact in the cost table: **the recurring cost of owning the software outgrows the cost of buying it.**
>
> It is also why **"maintenance itself as a (sizeable) service"** is listed as an emerging market trend — vendors have noticed.

### The remaining direct costs

> [!EXAM]
> - **Consulting Service Cost** — during implementation
> - **Post Implementation Support Cost**
> - **Complimentary Software License Cost** — the question bank asks *"what kind of complimentary software may be needed?"*; the sample names **analytics, office s/w extensions, backup & document management**
> - **Training Cost** — the sample notes **multi-locations, travel**
> - **PMO Cost** — the project management office

## The two indirect costs

> [!EXAM]
> 1. **Internal Employee Cost** — employees **not directly part of the implementation team**; **time spent providing requirements, on reviews, acceptance testing**
> 2. **Operational Disruption Cost** — **loss of productivity**
>
> Plus **opportunity costs!**

> [!INTUITION]
> **Mnemonic — the two indirect costs are "People and Pause":**
>
> - **People** — your own staff's time, diverted from their real jobs
> - **Pause** — the business running below full productivity during changeover
>
> Only two items, so the marks are in **explaining** them rather than listing them. The key insight for *internal employee cost*: these are people **not on the project team**, so their time is invisible to the project budget — nobody bills for it, and it appears in no plan.

> [!TRAP]
> **Opportunity cost is the hardest to defend and the most important to mention.** It is the value of **what those people and that money would have produced instead** — the product not launched, the other project not staffed.
>
> The deck itself writes it with a question mark — **"Opportunity costs! ?"** — acknowledging it is genuinely hard to quantify. In an exam, name it, define it, and say **why it resists measurement**: you are valuing something that never happened.
>
> This is the same phenomenon as the hidden cost *"typically pulls out 'good' resources from other projects/functions."*

## The sample cost table

> [!EXAM]
> **Costs are to be considered over a period — typically a 3–5 year horizon.**
>
> | Element | Amount (lakhs) | Basis |
> |---|---|---|
> | **Consulting** | **800** | during implementation |
> | **AMC charges** | **280** | 20% for 3 yrs, 22% later |
> | **License costs** | **269** | 20 devs + 30 professionals + 450 users |
> | **Post-implementation support** | **250** | |
> | **Hardware** | **200** | initial 150 + 10 × 5 maintenance |
> | **Training** | **45** | multi-location, travel |
> | **DB costs** | **30** | |
> | **OS costs** | **20** | initial 10 + 2 × 5 each year |
> | **Other software** | **20** | analytics, office extensions, backup, document management |
> | **GRAND TOTAL** | **1,914** | |

> [!EXAM]
> **The cash flow across six years** — *"what about cash flow?"*:
>
> | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 | Year 6 |
> |---|---|---|---|---|---|
> | **1294** | 122 | 122 | 122 | 127 | 127 |

> [!DERIVE]
> **The cash-flow row is the punchline of the entire chapter.**
>
> **Year 1 alone is 1,294 lakhs — 68% of the total 1,914** — and the remaining five years cost about 120 each. The spend is enormously **front-loaded**, while the benefits, per the Meta Group figure, deliver **as little as 5% ROI in year one and take three years to arrive**.
>
> Put the two facts together:
>
> $$\textbf{Costs peak in Year 1} \qquad \textbf{Benefits peak from Year 3}$$
>
> **That gap is the business case problem**, and it is why ERP needs **top management commitment** — anyone judging the project on its first-year numbers will conclude it is failing. It also explains why *"update your budget projection at regular intervals"* is one of Nestlé's four lessons.

> [!TRAP]
> The three largest lines — **consulting 800, AMC 280, licence 269** — total **1,349 of 1,914 (70%)**, and **not one of them is hardware.**
>
> If asked *"what is the biggest cost in an ERP project?"*, the answer is **consulting services**, not the software and certainly not the hardware. This is the quantitative form of *"ERP isn't only about the software."*

---

**Next:** what the money buys — **benefits & ROI**.
