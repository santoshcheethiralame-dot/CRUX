---
subject: erp
unit: 1
order: 16
slug: types-of-erp-projects
title: Types of ERP Projects
summary: The six kinds of ERP project beyond first-time implementation — upgrade, global roll-out, migration, harmonization and support — why each needs a different methodology, and how they connect to the maturing ERP market.
minutes: 9
tags: [project-types, upgrade, rollout, migration, harmonization, consolidation, support, obsolescence]
---

# Types of ERP Projects

> [!EXAM]
> **Not all ERP projects are similar!**
>
> | Type | Description |
> |---|---|
> | **First time ERP implementation** | The greenfield case — no ERP exists yet |
> | **ERP Upgrade** | Driven by **obsolescence** or **new version functionality** |
> | **Global roll-out** | **Global template but country-specific enhancements** |
> | **Migration from one to another** | **Unhappy with current, OR no longer supported** |
> | **Harmonization / Consolidation** | **Reducing many instances / types of ERPs to one** |
> | **Support / Sustain** | Ongoing operation of a live system |

> [!INTUITION]
> **Mnemonic — sort the six by what already exists:**
>
> - **Nothing exists** → **First-time implementation**
> - **The same ERP exists, but old** → **Upgrade**
> - **The same ERP exists, but only here** → **Global roll-out**
> - **A different ERP exists** → **Migration**
> - **Too many ERPs exist** → **Harmonization / Consolidation**
> - **It exists and works** → **Support / Sustain**
>
> Reading them in that order gives you the list every time, because it is a natural progression: **none → one → one everywhere → the wrong one → too many → steady state.**

## The six, in detail

### First-time implementation

The case the entire life cycle chapter is written around — all six phases, full blueprinting, full BPR, maximum change management.

### Upgrade

> [!EXAM]
> Driven by **obsolescence** or **new version functionality**.

> [!TRAP]
> **Upgrades are where over-customization comes home.** The Support phase states it plainly: *"can be difficult if too much customization done during implementation"*, requiring **backup, roll back, regression testing and documentation upgrades.**
>
> Note that **"technology obsolescence"** is also one of the six **support/maintenance challenges** — so obsolescence both *causes* upgrade projects and is *made worse* by postponing them. Organisations that customise heavily postpone upgrades, which deepens the obsolescence, which makes the eventual upgrade harder still.

### Global roll-out

> [!EXAM]
> **Global template but country-specific enhancements.**

> [!INTUITION]
> This is the **"Multi" problems** turned into a project. A global template gives consistency; country-specific enhancements handle what genuinely cannot be standardised — **tax law, statutory reporting, language, currency, local labour rules.**
>
> The tension is permanent: **too much local variation and you no longer have one system; too little and it is illegal in half your countries.** This is also the natural habitat of **two-tier ERP**.

### Migration

> [!EXAM]
> **Unhappy with current, OR no longer supported.**

> [!DERIVE]
> The two reasons produce very different projects, which is worth saying in an answer:
>
> - **"Unhappy with current"** is a **choice**. There is time to plan, and the business case must justify abandoning a working system.
> - **"No longer supported"** is a **forced move**. The vendor has ended support, so the deadline is external and non-negotiable — and there may be **no business case at all**, only risk avoidance.
>
> **Migration's dominant technical risk is data conversion.** Agilent's case shows exactly this: *"the other problem we had was converting backlog from legacy to new systems, especially for our highly configured products."*

### Harmonization / Consolidation

> [!EXAM]
> **Reducing many instances / types of ERPs to one.**
>
> The MCQ bank states it as a True/False: *"In an ERP consolidation project, companies migrate from several ERPs to one."* — **TRUE.**

> [!INTUITION]
> Consolidation usually arrives through **mergers and acquisitions** — buy three companies and you inherit three ERPs. The hard part is rarely technical; it is **reconciling master data**: three definitions of "customer", three part-numbering schemes, three charts of accounts.
>
> **This is the Nestlé problem exactly** — *"nine different general ledgers and 28 points of customer entry"*, and **29 different prices for vanilla to the same vendor**. Consolidation is what fixes that, and *"standardizing master data"* was a stated Nestlé project objective.

### Support / Sustain

The ongoing half of the life cycle — SLA-based operation, open issues, performance improvement, interfaces to second-line applications.

## Why this list matters

> [!EXAM]
> Two question-bank items rest on it:
> - **"What are the possible different types of ERP projects? Explain."**
> - **"Why do different ERP projects need different types of methodologies?"**

> [!DERIVE]
> **The second question answers itself once you compare the work involved:**
>
> | Project | As-Is modelling | BPR | Change mgmt | Data conversion | Regression testing |
> |---|---|---|---|---|---|
> | **First-time** | **Heavy** | **Heavy** | **Heavy** | Medium | Low |
> | **Upgrade** | **None** — it's your own system | Low | Low | Low | **Heavy** |
> | **Migration** | Medium | Medium | Medium | **Heavy** | Medium |
> | **Consolidation** | **Heavy** — across several systems | **Heavy** | **Heavy** | **Heavy** | Medium |
>
> A methodology tuned for a first-time implementation would spend months on **As-Is modelling** — **entirely wasted on an upgrade**, where the as-is is the system you are already running. Conversely, an upgrade methodology's emphasis on regression testing is barely relevant to a greenfield build.
>
> **Consolidation is the hardest row**, because it is heavy on nearly everything at once.

> [!EXAM]
> This list is also the **emerging trend** from Chapter 1: *"newer types of ERP projects are emerging — **Migration, Consolidation and Harmonization, Upgrades**."*
>
> The reason is market maturity. **Most large enterprises already own an ERP**, so the growth is no longer in first-time implementations but in changing the one you have. That is why the exact three named as "emerging" are the three middle rows of this table.

---

**Next:** what goes wrong, and how often — **challenges & risks of ERP implementation**.
