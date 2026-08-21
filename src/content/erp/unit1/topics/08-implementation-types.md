---
subject: erp
unit: 1
order: 8
slug: implementation-types
title: ERP Implementation Types
summary: The four deployment types — on-premises, cloud, hybrid and two-tier — each with pros and cons, the full comparison table across control, cost and flexibility, and the five business factors that decide which to choose.
minutes: 11
tags: [on-premises, cloud, hybrid, two-tier, deployment, comparison, SaaS, control, cost, flexibility]
---

# ERP Implementation Types

> [!EXAM]
> **Four major ERP implementation types:**
>
> **On-premises · Cloud · Hybrid · Two-tier**

> [!INTUITION]
> **Mnemonic — the four are two pure types and two mixtures:**
>
> - **The two pure types:** **On-premises** (all yours) and **Cloud** (all theirs)
> - **The two mixtures:** **Hybrid** mixes *by module*; **Two-tier** mixes *by location*
>
> That single distinction — **hybrid splits the software, two-tier splits the organisation** — is the one exam questions turn on, and it is the thing most students get backwards.

## 1 — On-premises ERP

> [!EXAM]
> **Installed locally, managed by the internal IT team.**
>
> **Pros:** **High control, customization, data security**
> **Cons:** **Higher upfront costs, complex maintenance**

## 2 — Cloud-based ERP

> [!EXAM]
> **Hosted by a provider, accessed via the internet.**
>
> **Pros:** **Scalability, lower initial costs, automatic updates**
> **Cons:** **Limited infrastructure control, ongoing subscription**

> [!INTUITION]
> On-premises and cloud are **exact mirror images**, and every pro of one is the con of the other:
>
> | | On-premises | Cloud |
> |---|---|---|
> | **Control** | high — it's your hardware | low — it's theirs |
> | **Upfront cost** | high — you buy servers | low — you rent |
> | **Ongoing cost** | maintenance | **subscription forever** |
> | **Updates** | you do them | **automatic** |
>
> Note the cost trade is **capital vs operating expenditure**: on-premises is a large one-time spend, cloud is a smaller perpetual one. Over a long enough horizon cloud is not necessarily cheaper — which is why the Chapter 3 cost tables are computed over a **3–5 year horizon** rather than year one.

## 3 — Hybrid ERP

> [!EXAM]
> **Combination of on-premises and cloud modules.**
>
> **Pros:** **Flexibility, phased migration, regulatory compliance**
> **Cons:** **Integration and data consistency can be challenging**

> [!TRAP]
> **"Regulatory compliance" as a *pro* of hybrid** is the non-obvious entry and a good exam point.
>
> Some data legally **cannot leave the country or the building** — patient records, defence data, certain financial records. Hybrid lets you keep exactly those modules on-premises while everything else runs in the cloud. **It is a legal architecture as much as a technical one.**
>
> Its con follows directly: two halves means **an integration seam**, and seams are where data consistency breaks.

## 4 — Two-tier ERP

> [!EXAM]
> **Tier 1: Centralized ERP for headquarters.**
> **Tier 2: Specialized / affordable ERP for branches / subsidiaries.**
>
> **Pros:** **Central control with local adaptability**
> **Cons:** **Requires careful integration, governance**

> [!INTUITION]
> Two-tier exists because of the **"Multi" problems**. A conglomerate's headquarters needs a heavyweight system for consolidated reporting; a 40-person subsidiary in another country does **not** need — and cannot afford — the same system.
>
> So the group runs **a big ERP at the centre and lighter ones at the edges**, with the subsidiaries reporting upward. **Central control where it matters, local affordability where it doesn't.**

## The comparison table

> [!EXAM]
> | # | Type | Core feature | Key benefit | **Control** | **Cost** | **Flexibility** | **Best for** |
> |---|---|---|---|---|---|---|---|
> | **1** | **On-prem** | Full internal control | Customization and security | **High** | **High** | **Low** | **Large, regulated organizations** |
> | **2** | **Cloud** | Provider hosted (SaaS) | Scalability and low upfront cost | **Low** | **Low** | **High** | **Fast-growing, modern firms** |
> | **3** | **Hybrid** | Mixed deployment | Flexibility and phased migration | **Medium** | **Medium** | **High** | **Migrating or mixed needs** |
> | **4** | **Two-tier** | HQ + branch systems | Local adaptation & central control | **Central + Local** | **Medium** | **High** | **Multinationals, subsidiaries** |

> [!DERIVE]
> **Read the three middle columns as a pattern rather than twelve facts.**
>
> **Control and Cost move together** — High/High for on-prem, Low/Low for cloud, Medium/Medium for hybrid. That is not a coincidence: **control is something you pay for.** Owning the servers gives you authority over them and the bill for them at the same time.
>
> **Flexibility moves against control.** On-prem is the only **Low** flexibility entry, and it is the only **High** control one. Locking things down is precisely what makes them hard to change.
>
> So the whole table reduces to one trade-off:
>
> $$\textbf{Control} \;\uparrow\;\; \Rightarrow\;\; \textbf{Cost} \;\uparrow\;,\;\; \textbf{Flexibility} \;\downarrow$$
>
> **Two-tier is the only row that escapes it**, because it refuses to answer globally — high control at HQ, high flexibility at the branches.

> [!TRAP]
> **"Best for" is the column most likely to be asked in an MCQ**, and the four answers are distinct enough to be worth memorising verbatim:
>
> - **Large, regulated** → on-prem
> - **Fast-growing, modern** → cloud
> - **Migrating or mixed** → hybrid
> - **Multinationals with subsidiaries** → two-tier
>
> The word **"regulated"** is the tell for on-prem, and **"subsidiaries"** is the tell for two-tier.

## How to choose

> [!EXAM]
> **Based on the following business factors:**
>
> **Size · Complexity · Regulatory needs · IT resources · Growth plans**
>
> **— and match ERP type to business priorities.**

> [!INTUITION]
> Each factor points at a specific answer, which is how you handle a "recommend a type for this company" question:
>
> | Factor | Points toward |
> |---|---|
> | **Size** — large | on-prem or two-tier |
> | **Complexity** — many divisions/countries | two-tier |
> | **Regulatory needs** — high | on-prem or hybrid |
> | **IT resources** — few | cloud |
> | **Growth plans** — rapid/uncertain | cloud |
>
> **"IT resources" is the practical decider for small firms.** Cloud's real benefit is not the cost — it is that **you do not need staff to run it**, since updates are automatic.

> [!EXAM]
> Note the connection forward: **"New deployment models — Cloud ERP"** is listed among the **emerging trends in the ERP marketplace**, alongside *"maintenance itself as a (sizeable) service."* The industry is moving from column 1 toward column 2 of this table.

---

**Next:** who sells all this, to whom — **market players, industries & trends**.
