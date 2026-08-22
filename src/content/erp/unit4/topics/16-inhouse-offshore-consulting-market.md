---
subject: erp
unit: 4
order: 16
slug: inhouse-offshore-consulting-market
title: In-House vs External, Offshoring & the Consulting Market
summary: The advantages and disadvantages of an in-house implementation team and where it does work, the phase-wise offshoring percentages table, what can and cannot be offshored, and the three tiers of ERP consulting companies.
minutes: 11
tags: [in-house-team, external-consultants, rollout, offshore, ODC, GDC, blueprint, UAT, consulting-tiers, Accenture, Infosys]
---

# In-House vs External, Offshoring & the Consulting Market

## In-house implementation

> [!EXAM]
> **In-house Implementation — Advantages:**
> - **Need not pay external consultants**
> - **Team may have better process knowledge**
>
> **In-house Implementation — Disadvantages:**
> - **External consulting team will have better package knowledge**
> - **In-house team do not have access to methods and tools which a consulting company brings as part of their implementation methodology**
> - **Implementation is not their core competency**
> - **May lack on ERP project management skills**
> - **Overall may not work out to be cost effective if all internal costs are factored**
>
> **In-house Implementation — Where it may work:**
> - **Better suited for roll outs**
> - **Some help from external consultants on specific areas**

> [!EXAM]
> **The deck's pros-and-cons diagram states the same thing more sharply:**
>
> | **Pros** | **Cons** |
> |---|---|
> | **Better process knowledge** | **Product Expertise** *(they lack it)* |
> | **Better industry knowledge** | **ERP Project Mgmt Skill** *(they lack it)* |
> | **No money goes outside** | **Lack of methods and tools** |
> | | **No implementation experience** |
> | | **High chances of failure** |
>
> > *"In-house implementation may work in case of **Rollout projects** where implementation in the first site had been done by the consulting team and subsequent rollout by the in-house team."*

> [!DERIVE]
> **The trade is one kind of knowledge against another, and naming which is the whole answer.**
>
> | | **In-house team has** | **External team has** |
> |---|---|---|
> | Knowledge of… | **the business** — its processes, its exceptions, its politics | **the package** — how to configure it, what it can and cannot do |
> | Plus | industry knowledge | **methods and tools**, implementation experience, **project management skill** |
>
> **Neither side has both, and that is exactly why the standard project team has two halves.** The project-team chapter says it directly: *"the two teams complement each other skill-wise — while the first team brings lots of product knowledge and implementation experience, the second team brings the necessary business knowledge."*
>
> **So "in-house vs external" is a slightly false framing.** The real question is not *which one* but **how much external help you need on top of the core team you will have regardless.**

> [!TRAP]
> **The strongest disadvantage is the one that sounds weakest: *"implementation is not their core competency."***
>
> Everything else follows from it. An internal IT team implements an ERP **once**. A consulting firm has done it **fifty times**, which is why they have accumulated **methods and tools** — the ASAP-style methodology, blueprint templates, test scripts, cutover checklists. **Those artefacts are the compressed experience of prior projects, and you cannot buy them separately.**
>
> ⚠️ **And notice the deck contradicts the in-house team's own headline advantage.** *"Need not pay external consultants"* and *"no money goes outside"* are listed as pros — but the last disadvantage says **"overall may not work out to be cost effective if all internal costs are factored."**
>
> **That is not sloppiness; it is the point.** The saving is **visible** (no invoice) while the cost is **invisible** — senior staff pulled off their day jobs for a year, a longer timeline, rework from inexperience. **The apparent saving is an accounting artefact of which costs get billed.**
>
> **Which is why "high chances of failure" appears in the cons column at all** — and why the one place in-house genuinely works is a **rollout**: the consultants already built and proved the template at site one, so **site two is repetition, not design.** The hard part — the blueprint — has already been paid for.

## Offshoring

> [!EXAM]
> **Project phase-wise: what activity can be offshored**
>
> | Project Phase | **% on-site** | **% offshore** | **Type of activity from offshore** |
> |---|---|---|---|
> | **Project Preparation** | **100%** | **0%** | — |
> | **Business Blueprint** | **90%** | **10%** | **Building proof of concept / demo scenarios · blueprint documentation (partial)** |
> | **Realization** | **30%** | **70%** | **Configuration, Testing, Development** |
> | **Final Preparation and Go Live** | **50%** | **50%** | **Data migration, End user training, Content preparation** |
> | **Support** | **20%** | **80%** | **Resolving issues, running routine utility jobs, system development, managing change requests** |

> [!EXAM]
> **Activities that commonly get offshored:** **Development · Unit testing, Volume testing · Training content preparation · Support**
>
> **Activities that can be offshored to a limited extent:** **Configuration · Data migration**
>
> **Activities that are difficult to offshore** *(hence done on-site)***:** **Business blueprinting · Integration testing · UAT · End User Training · Change management activities**

> [!DERIVE]
> **The percentages trace a clear curve — 0% → 10% → 70% → 50% → 80% — and the shape is the answer to "why."**
>
> $$\textbf{offshore \%} \;\propto\; \frac{1}{\textbf{customer contact required}}$$
>
> | Phase | Offshore | Because |
> |---|---|---|
> | **Preparation** | **0%** | it is **kickoff, charter, team formation** — pure relationship-building |
> | **Blueprint** | **10%** | it is **workshops with business users**, discovering how the company works. **You cannot elicit requirements from another continent.** |
> | **Realization** | **70%** | **configuration, development, testing** — specified work against a signed blueprint. **The requirement is written down, so location stops mattering.** |
> | **Go Live** | **50%** | **splits**: data migration and content prep travel; **end-user training and cutover do not** |
> | **Support** | **80%** | **ticket-driven and repeatable**, and time-zone difference becomes an *advantage* — overnight coverage |
>
> **The one dip at Go Live is the informative point.** Offshore share falls from 70% back to 50% precisely because go-live is when people, not systems, need attention: **training, hand-holding, and being physically present when the switch is thrown.**
>
> **The general rule the two lists encode: work that is *specified* can be offshored; work that is *discovered* cannot.** Blueprinting, UAT, end-user training and change management all require sitting with business users — which is why all four are on the "difficult" list.

> [!TRAP]
> **Unit testing is on the "commonly offshored" list; integration testing and UAT are on the "difficult" list.** That split is examinable and the reason is precise:
>
> - **Unit testing** checks *does this configuration do what the spec says?* — self-contained, and the spec is written down.
> - **Integration testing** checks *do the modules work together across the real business process?* — needs cross-module business judgement.
> - **UAT — User Acceptance Testing** — is by definition **the business users deciding whether they accept it.** **It cannot be offshored because the people doing it are the customer.**
>
> **Configuration and data migration sit in the middle ("limited extent")** for the same reason from the other side: they are mostly specified work, but **judgement calls keep arising** that need someone who understands the business — *is this legacy record a duplicate or two genuine customers?*

> [!EXAM]
> **Two abbreviations from the topic summary:**
> - **ODC = Offshore Development Center**
> - **GDC = Global Delivery Center**

## The ERP consulting market

> [!EXAM]
> **ERP consulting companies — global, by tier:**
>
> | Tier | Companies |
> |---|---|
> | **Tier 1** | **IBM, Accenture, SAP** |
> | **Tier 2** | **Capgemini, Deloitte, HP, CSC, TCS, Infosys, Wipro** |
> | **Tier 3** | **HCL-Axon, Siemens, Cognizant, L&T Infotech, Atos, smaller companies, local players like Ramco…** |
>
> A separate slide names **IBM · Accenture · SAP · Capgemini** and *"many others."*

> [!INTUITION]
> **Two observations on this list are worth a mark each.**
>
> **① SAP appears in Tier 1 of the *consulting* market as well as Tier 1 of the *package* market.** The vendor sells implementation services for its own product — which is why the partner chapter warns about mixing the two roles, and why some companies deliberately hire **a different firm for package selection** than for implementation.
>
> **② The Indian IT services firms are spread across Tier 2 and Tier 3** — **TCS, Infosys, Wipro** at Tier 2; **HCL-Axon, Cognizant, L&T Infotech** at Tier 3. That distribution is the **offshoring table made into an industry**: the phase-wise percentages (70% of Realization, 80% of Support) describe exactly the work these firms built their ERP practices on, and **ODC/GDC** is the operating model that delivers it.
>
> **The consulting tiers mean the same thing as the package tiers — customer size, not quality.** A Tier 1 consulting firm brings global delivery capability and presence in many geographies (two of the ten selection criteria) at a price that only a large programme can justify. **A single-country mid-market implementation is often better served by Tier 2 or 3**, for the same reason a mid-market company is better served by a Tier 2 package.

---

**Next:** running the thing once it is bought — **project management & the nine levers of scope**.
