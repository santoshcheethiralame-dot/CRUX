---
subject: erp
unit: 2
order: 20
slug: modelling-software-business-modelling
title: Process Modelling Software & Business Modelling
summary: Why tools are necessary and the four capabilities they need, the leading vendors, then Business Modelling as the enterprise-wide view, integrated data modelling and the extended-ERP modelling toolset.
minutes: 11
tags: [modelling-software, ARIS, visio, websphere, business-modelling, data-modelling, extended-ERP, orgware, baan]
---

# Process Modelling Software & Business Modelling

## Why tools are necessary

> [!EXAM]
> - **The number of processes is quite large even for a medium sized company — 40 to 100!**
> - **Designing the processes is both tedious and error prone**

> [!INTUITION]
> **40–100 processes** is the number that justifies the whole topic. At that scale you cannot hold consistency in your head — the same customer entity appears in a dozen models, and a change to one must propagate.
>
> This is also the number that justifies the **SPAS hierarchy**: *"business processes can be many, hence…"* Tools and hierarchy are two answers to the same problem of scale.

## Capabilities of process modelling software

> [!EXAM]
> **Capabilities of Process Modelling Software:**
>
> 1. **Multi Dimension Modelling Capability**
> 2. **Simulation Capability** — **statistical, visual**
> 3. **Pre Built Templates** — **industry standard frameworks: SCOR, APQC**
> 4. **Import export**

> [!DERIVE]
> Each capability answers a specific need established earlier in the chapter:
>
> | Capability | Why it is needed |
> |---|---|
> | **Multi-dimension** | the **five dimensions** — graphical, resource, information, organization, analysis |
> | **Simulation** | you cannot prototype every idea in the real business; simulate first |
> | **Pre-built templates** | **SCOR and APQC** exist as standards — don't redraw them |
> | **Import / export** | the model must reach the **ERP** and the **implementation methodology** |
>
> **Simulation is the capability with the least obvious value and the most.** BPR's prototyping phase runs a new process on *"few customers, few transactions"* — real but small. Simulation lets you discard bad designs **before** even that, at no operational risk. It is the cheapest possible failure.

> [!TRAP]
> The deck draws a distinction that is easy to miss:
>
> > *"**BPM software discussed here is different from business process management software** — though both are related. BPM here is **more graphical, rich in content and suitable to be mapped to an ERP**, whereas business process management software based designs are part of a system that **generates code** based on its own framework."*
>
> **Two different things share the abbreviation.** In this chapter, **BPM = Business Process *Modelling*** — a design and documentation activity. **Business Process *Management* software** is a runtime engine that executes processes.
>
> They connect through **BPMN → BPEL**, where a model becomes executable — but the chapter's BPM is about **describing** processes so they can be mapped into an ERP, not about running them.

## The vendors

> [!EXAM]
> **Leading three vendors:**
> - **Visio**
> - **IDS Scheer ARIS**
> - **IBM's WebSphere Business Modeler**
>
> **Many ERP products themselves provide BPM capability — Extended ERP (EERP).** Most of the leading vendors do; it was **started by Orgware of Baan ERP**.

> [!INTUITION]
> The deck's comparison of Visio against the specialists is the useful part:
>
> > *"Even the simple tool Visio can be used to create business process models, **but the semantic support is very limited. It is used only from a diagramming point.** But the niche products such as **ARIS have basic BP knowledge**."*
>
> **That is the difference between a drawing tool and a modelling tool.** Visio draws boxes; it does not know that a box is a *process* with inputs, outputs and an owner, so it cannot check anything. ARIS **understands** the semantics, which is what enables *"cross verification across different parts of the model"* and the multi-dimension capability.
>
> **A diagram you cannot validate is documentation; a model you can validate is engineering.**

> [!EXAM]
> **Business modelling tools (third party): BPWIN · ER/Studio Business Architect · Oracle BPA Suite · IBM BPM.** They:
> - **Provide various diagramming and system breakdown to any level of subsystems**
> - **Link with one or more ERPs for exporting BPs**
> - **Can input to the "implementation methodologies"**
> - **Allow validation of flows and alignment to business rules**
> - **Provide a repository of reference models** — **domain specific features, built-in processes** — so you **can start quickly and map to ERP**
> - Also provide **other convenient business visualization: org structure, business rules**
> - **Help process change smoothly**, when done properly and set for **automatic configuration**
> - **Provide templates** for different kinds of tasks and common business rules

## Business Modelling

> [!EXAM]
> **Business Modelling (BM) — Definition:**
>
> > **"Business Modelling is a visual representation of an enterprise's business as one large system showing different subsystems, what processes they support, and the interconnection between them, and showing how data is flowing between different subsystems."**
>
> - **Visually shows what will be the future application landscape** — **ERP will take care of which processes, where legacy applications will remain, how data flow will happen between ERP's different modules and legacy applications**
> - **Business modelling can be done with any level of detailing**
> - **A business model needs to be done keeping the company's business strategy, long term goal and vision in mind**

> [!INTUITION]
> **BPM and BM differ by scope, and the distinction is exam-worthy:**
>
> | | **Business Process Modelling (BPM)** | **Business Modelling (BM)** |
> |---|---|---|
> | **Models** | **one process** — its activities, steps, data flows | **the whole enterprise as one large system** |
> | **Shows** | who does what, in what order | **which subsystems exist and how they interconnect** |
> | **Answers** | *how does this process work?* | *what will the **application landscape** look like?* |
>
> **BM's distinctive contribution is the phrase "where legacy applications will remain."** It is the only artefact in the course that shows the **boundary of the ERP** — what it will absorb and what it will not.
>
> That matters because Unit 1 listed **"complex interfaces"** as an implementation challenge: *"ERP system interfaces to several other systems; depending on organization IT landscape, complexity of integration can be high."* **The business model is where those interfaces are decided** — and Agilent's *"2,200 legacy applications"* is what happens when nobody has drawn one.

> [!EXAM]
> **Business Modelling Practices:**
> - **Processes are driven by the business model — can be standard**
> - **Sub-processes are typically unique to each company based on policy and practice** — **authorization, documentation, type of data collection, auditing**
> - **Starting at the highest level, one keeps expanding various sub-processes**
> - **Modelling methods could be influenced by ERPs — SAP links with EPC**
> - **BPM can be helpful in selecting the ERP!**
> - **Along with the existing MIS process, BPM helps in creating the initial data model too**
> - **Models need to be optimized** — depending on context, initially or after initial implementation

> [!TRAP]
> **"Processes can be standard; sub-processes are typically unique"** is the homogenization paradox resolved at a third level of detail.
>
> Every company runs *Order to Cash* — the **process** is standard. But *how* you authorise a discount, what you document, what you audit — the **sub-processes** — reflect your policy and are where difference legitimately lives.
>
> **Standardise the process, differentiate the sub-process.** This is the practical form of the BPR advice: *"do a limited BPR… in a way that gives them competitive advantage."*

> [!INTUITION]
> **"BPM can be helpful in selecting the ERP!"** deserves the exclamation mark the deck gives it.
>
> The obvious sequence is *choose ERP, then model processes to fit it.* This inverts it: **model your processes first, then choose the package that supports them best.** That directly addresses the risk from the BPR chapter — *"there is no guarantee that those best designed processes will be supported by the ERP solution."*
>
> It also connects to Unit 1's open question, *"who is first, partner or package?"* — **a business model gives you an evidence base for that decision** instead of relying on corporate relationships.

## Integrated data modelling

> [!EXAM]
> **Is it needed, and at what level?**
> - **Enterprise data modelling** is **needed minimally for customization sake**
> - **ERP is a business aware application!**
> - **Change to existing model** — **a lot of caution is required because of interdependency**
> - **Development should be controlled and well managed** from a **maintenance and ERP upgrade** point of view

> [!DERIVE]
> **"ERP is a business aware application"** is the reason data modelling is *"needed minimally."*
>
> Unlike a blank database, an ERP **already has a data model** — thousands of tables encoding a vendor's view of what a customer, an order and a material are. You are not designing from scratch; you are **understanding and minimally extending** what exists.
>
> Hence the caution: *"a lot of caution required because of interdependency."* Change one entity and you touch every module that reads it — the same amplification that made **data quality** so critical in Unit 1 (*"Garbage In — Garbage Out"*).
>
> And the closing clause is Unit 1's customization risk restated: **"development should be controlled and well managed from a maintenance and ERP upgrade point of view."** Every data-model change is a change you must re-apply and re-test at every upgrade.

## BPM as extended ERP

> [!EXAM]
> **BPM — Extended ERP:**
> - **A set of enterprise modelling tools for effective implementation**
> - **Part of the implementation tool set and methodology (started in Baan)**
> - **A kind of self-help for customers — reduces the need for consultants (= cost!)**
> - **Example: access control to different processes; setting up parameters, employee/role specific menu**
> - **Manually doing this is tedious, takes time and is human error prone**
> - **Care required: tool-generated "configuration" changing can be tricky to maintain**

> [!INTUITION]
> **"Reduces the need for consultants (= cost!)"** is a direct attack on the largest line in Unit 1's cost table — **consulting at 800 of 1,914 lakhs.**
>
> The idea is that if the customer can generate configuration from a model themselves, they buy fewer consultant-days. That is a real saving, and it is why vendors build these tools.
>
> But note the caution: **"tool-generated configuration changing can be tricky to maintain."** You have traded consultant dependency for **tool dependency** — the configuration is now an output of a model, so changing it by hand desynchronises the two. **The sync problem from the start of this chapter, one level down.**

## Chapter summary

> [!EXAM]
> - **BPM is detailing of processes as graphical designs**
> - **BPM is tool driven**
> - **Standards exist due to collaboration in industry**
> - **BPM acts as the key input for ERP implementation — a specific process description**

> [!EXAM]
> **The deck's exercises**, worth attempting:
> - **Draw a BPM for any "kind of company" you know**
> - **Prepare a list of features for a BPM tool**
> - **Create a business process model for the campus recruitment process** using **process box, decision box, and flow/connectors**

---

That closes Unit 2. The unit moved from **why people resist change and how to manage it**, through **reengineering the processes themselves** — defining, diagnosing, redesigning and prototyping them — to **modelling them precisely enough that an ERP can be built from the result.**
