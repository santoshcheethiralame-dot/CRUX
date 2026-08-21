---
subject: erp
unit: 1
order: 10
slug: life-cycle-overview
title: The ERP Life Cycle — Six Phases
summary: What the ERP life cycle is and why adoption needs special treatment, the six phases with their alternate IBM Ascendant names, the mnemonic that fixes their order, and the systems view of implementation as input-process-output.
minutes: 11
tags: [life-cycle, phases, pre-implementation, blueprint, realization, go-live, support, mnemonic, systems-view]
---

# The ERP Life Cycle — Six Phases

## Why ERP adoption is special

> [!EXAM]
> **ERP adaptation:**
> - **Has a very high impact on business operations**
> - **Needs top management commitment & support**
> - **Is complicated and needs special focus**
> - Requires **special teams**
> - Requires **end user involvement**
> - Involves **many activities and stakeholders**

> [!INTUITION]
> Every one of those six points is a reason ERP gets **its own life cycle** rather than being run as an ordinary software project.
>
> Ordinary software adds a capability. **ERP replaces how the company works** — which is why *top management commitment* appears in the very first bullet and again in the people-challenges list. It is the only item that appears twice.

## The six phases

> [!EXAM]
> **The phases of the ERP life cycle, in sequence** — with the alternate names from **IBM's Ascendant methodology** in brackets:
>
> | # | Phase | Also called |
> |---|---|---|
> | **1** | **Pre-Implementation** | **Evaluation phase** |
> | **2** | **Project Preparation** | — |
> | **3** | **Business Blueprinting** | **Design phase** |
> | **4** | **Realization** | **Build phase** |
> | **5** | **Final Preparation and Go Live** | *(Fine Tune)* |
> | **6** | **Support** | **Manage phase** *(Sustenance)* |
>
> **Each phase has specific activities, deliverables and milestones.**

> [!EXAM]
> **The defining equation of the chapter:**
>
> $$\textbf{ERP Lifecycle} = \textbf{ERP Implementation Life cycle} + \textbf{ERP Support Life cycle}$$
>
> Phases **1–5 are implementation**; phase **6 is support**. The deck's diagram marks phases 2–5 as the **"implementation period"**, with Support extending onward.

> [!INTUITION]
> **Mnemonic — six phases, six words:**
>
> > ## **Papa Please Bring Rice For Supper**
>
> | Word | Phase |
> |---|---|
> | **Pa**pa | **Pre-implementation** |
> | **P**lease | **Project preparation** |
> | **B**ring | **Business blueprinting** |
> | **R**ice | **Realization** |
> | **F**or | **Final preparation & go live** |
> | **S**upper | **Support** |
>
> It also happens to encode the shape of the project: you **ask** (Pre-implementation, Project preparation), you **design** (Blueprint), you **make** (Realization), and then you **serve** (Go live, Support).

> [!TRAP]
> **Learn the alternate names.** A question may use either vocabulary, and the Ascendant set is the more intuitive one:
>
> $$\textbf{Evaluation} \rightarrow \textbf{Design} \rightarrow \textbf{Build} \rightarrow \textbf{Manage}$$
>
> If you ever blank on which SAP-style phase does what, translate it: **Blueprint = Design** (decide *what*), **Realization = Build** (make it), **Support = Manage** (run it).

## The phases at a glance

> [!EXAM]
> | Phase | Core question it answers |
> |---|---|
> | **Pre-Implementation** | *Should we do this, with whom, and at what cost?* |
> | **Project Preparation** | *How exactly will we run the project?* |
> | **Business Blueprinting** | *What do our processes look like now, and what should they look like?* |
> | **Realization** | *Build and test the configured system* |
> | **Final Preparation & Go Live** | *Are we ready, and can we switch over?* |
> | **Support** | *Keep it running, stabilise and improve* |

> [!DERIVE]
> **The two most confusable phases are 1 and 2**, because both are "preparation". The distinction is a decision boundary:
>
> - **Pre-Implementation** happens **before the project is committed.** It ends with **package and partner selected, budget approved and contracts signed.** The organisation could still decide *not* to proceed.
> - **Project Preparation** happens **after commitment.** The money is approved and the vendor is chosen; this phase decides **how the project will be run** — detailed plan, charter, methodology, technical architecture.
>
> **One-line test: Pre-implementation chooses *whether and with whom*; Project preparation chooses *how*.**

## The systems view of implementation

> [!EXAM]
> The deck presents ERP implementation as an **input → process → output** system:
>
> | **Input** | **Process** | **Output** |
> |---|---|---|
> | **BPR plans** · **old processes, systems and procedures** · **data** | **Implementation team** · **ERP infrastructure** · **TIME** | **New processes, systems and procedures** · **a running ERP system** |

> [!INTUITION]
> Three things about this diagram are worth noticing in an answer.
>
> **The old processes are an *input*, not something discarded.** You cannot design the to-be without modelling the as-is — which is exactly what the Blueprint phase does.
>
> **Data is an input in its own right.** Migrating it is a named activity in Go Live, and **data quality** is a named risk: *"only 1 out of 3 companies are sure of their data quality — Garbage In, Garbage Out!"*
>
> **TIME is listed as part of the process.** That is unusual and deliberate: an ERP implementation cannot be compressed past a point, which is why *"long timeline"* is an implementation challenge and *"don't start a project with a deadline in mind"* is Nestlé's first lesson.

## Why the sequence sometimes breaks

> [!EXAM]
> The question bank asks: **"Sometimes ERP implementation may not follow the defined sequence — why? Explain with some examples."**
>
> The deck's own supporting points:
> - In Pre-Implementation, **"at times partner selection is done early to support other activities"** — and it poses the question **"who is first, partner or package? Merits in both cases."**
> - There are **variations in approach**: **pre-determined partners/package (no evaluation required)**, **multiple partners**, even **multiple packages**, driven by **license cost management & corporate relationship compulsions**.

> [!DERIVE]
> **Package first or partner first?** Both are defensible, which is the point of the question:
>
> - **Package first** — choose the software that fits your industry, then find someone who implements it well. Risk: the best-fitting package may have no good local implementation partner.
> - **Partner first** — choose a consultancy you trust, and let them recommend. Risk: **they will recommend what they know**, so the package choice is no longer independent.
>
> And the sequence breaks for reasons that are not technical at all: the deck notes **"selection may be based on corporate relationships!"** — a parent company already runs SAP, or a customer mandates it. **Business Case with Customer** makes the same point: *"some business customers mandate use of ERP to facilitate business ease."*

---

**Next:** the first two phases in detail — **pre-implementation & project preparation**.
