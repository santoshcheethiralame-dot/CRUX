---
subject: erp
unit: 4
order: 20
slug: requirements-project-teams
title: Requirements Management & Project Teams
summary: The four fundamentals of requirements management, the five requirement types, the purpose of requirements gathering, the two-team structure with the core team's five responsibilities, the twelve project roles and the full team structure diagram.
minutes: 12
tags: [requirements, granularity, verifiable, prioritization, core-team, consulting-team, project-roles, steering-committee, process-owner, train-the-trainer]
---

# Requirements Management & Project Teams

## Fundamentals of requirements management

> [!EXAM]
> **Fundamentals of Requirements Management:**
>
> - **Granularity of requirement depends on the organization. Granularity can change depending on at what organizational level the requirement is defined**
> - **Requirements mean different things to different people. It is important to state requirements clearly**
> - **Requirement should be verifiable**
> - **Prioritization of requirements is important**

> [!DERIVE]
> **Four fundamentals, and each is a defence against a specific failure.**
>
> **① Granularity.** *"Reduce inventory"* stated by a CEO and *"the reorder point for material X must be recalculated weekly"* stated by a planner are the same requirement at two levels. **Neither is wrong; mixing them in one document is.** A requirements list at inconsistent granularity cannot be estimated, because nobody can tell whether an item is a day's work or a year's.
>
> **② "Requirements mean different things to different people."** This is the ambiguity problem, and it is the reason **"ineffective communication system"** is an ERP-specific risk. *"The system must support batch tracking"* means one thing to quality and another to the warehouse.
>
> **③ "Requirement should be verifiable."** This is the strongest of the four. A requirement you cannot test **cannot be accepted or rejected** — so it will be argued about at UAT, when it is most expensive.
>
> | Not verifiable | Verifiable |
> |---|---|
> | *"the system must be user friendly"* | *"a goods receipt must be postable in under 6 keystrokes"* |
> | *"reports should be fast"* | *"the stock overview report must return in under 5 seconds"* |
>
> **This is exactly the milestone discipline again** — *"to-be design completed"* rather than *"blueprinting going well."* **State it so that its truth is checkable.**
>
> **④ Prioritization.** Formalised as **VED — Vital, Essential, Desirable** in package selection, and it is what makes scope negotiable: when time runs short you drop *Desirable*, not whatever happens to be last on the list.

> [!EXAM]
> **Different Types of Requirements:**
>
> **Business · Functional · Legal · User · Maintainability**

> [!INTUITION]
> **Five types, five different sources of authority** — which is why they cannot be merged into one list:
>
> | Type | Comes from | Example |
> |---|---|---|
> | **Business** | **strategy** — what the company is trying to achieve | *reduce order-to-cash cycle to 30 days* |
> | **Functional** | **the process** — what the system must do | *the system must post a three-way match* |
> | **Legal** | **statute** — non-negotiable, external | *GST returns in the prescribed format* |
> | **User** | **the people using it** | *the storekeeper must be able to post a GR on a handheld* |
> | **Maintainability** | **the future** — who keeps it running | *no modification that blocks a standard upgrade* |
>
> **Legal requirements are automatically Vital** — you cannot descope a statutory return, and this is precisely why **installed base "geography / country specific"** was a screening criterion: a package with no local presence will not have the statutory formats.
>
> **Maintainability is the one teams forget**, and forgetting it is how you arrive at *"customizing the software too much"* — every requirement met by modification is a maintainability requirement violated, payable later at every upgrade.

## Requirements gathering

> [!EXAM]
> **Purpose of the Requirements Gathering Process:**
> - **To have an understanding of the company's current business processes**
> - **Understanding of current pain points**
> - **Have understanding of expectations from the future system**
> - **Identify areas of improvement in current process**

> [!TRAP]
> **Three of the four purposes are about the *present*, and only one is about the future system.** That proportion is the point.
>
> $$\textbf{current processes} + \textbf{current pain points} + \textbf{areas of improvement} \;\longrightarrow\; \textbf{AS-IS}$$
> $$\textbf{expectations from the future system} \;\longrightarrow\; \textbf{TO-BE}$$
>
> **This is Unit 2's AS-IS / TO-BE modelling arriving in the project.** You cannot design the target state without documenting the current one — and *"identify areas of improvement in current process"* is exactly where **BPR** enters, because the whole argument of Unit 2 was that **automating a bad process just makes it fast and bad.**
>
> **Note that "pain points" is listed separately from "current processes."** Documenting what the process *is* and documenting what people *hate about it* are different exercises, and the second is where the business case comes from.

## The project team

> [!EXAM]
> - **ERP project team is generally made up of two different teams — one from the consulting side and the other team (called core team) from the organization implementing the ERP solution**
> - **The two teams complement each other skill-wise: while the first team brings with it lots of product knowledge and implementation experience, the second team brings with it the necessary business knowledge**
> - **Successful knowledge transfer from each other only ensures that the project is successful**

> [!EXAM]
> **Role of Core Team — ERP core team mainly helps in the following areas:**
>
> 1. **To provide business inputs during TO-BE process design**
> 2. **Configuring the system**
> 3. **Validation of data before loading into the new system**
> 4. **Testing of the system**
> 5. **Training the end users in the solution (using Train the Trainer concept)**

> [!DERIVE]
> **Each of the five core-team responsibilities exists because *only the business side can do it*** — and that is the reason the core team is not optional.
>
> | Responsibility | Why only they can do it |
> |---|---|
> | **Business inputs to TO-BE design** | consultants know the package; **only the business knows the business** |
> | **Configuring the system** | *(shared)* — but doing it themselves is how they **learn to maintain it** |
> | **Validating data before load** | only they can tell a **genuine duplicate from two real customers** |
> | **Testing** | only they know **what a correct result looks like** |
> | **Training end users** | a colleague who has done the job **is more credible than a consultant** |
>
> **"Train the Trainer" is the mechanism named, and it is worth explaining:** consultants train the core team, the core team trains the end users. It **scales** (a handful of consultants cannot train two thousand people), it **transfers ownership**, and it leaves the knowledge **inside the company** when the consultants leave.
>
> **That is the same reason "preparedness for the future" names as its first objective: "train people according to industry standard to make the organization largely independent of the consultants."** The exit is designed in from the start.

> [!TRAP]
> ***"For projects to succeed the core team need to be full time"*** is a stated success factor, and it is the one most often violated.
>
> The core team is drawn from the business — and they are, necessarily, **the people the business can least spare**, because you want the ones who actually understand the processes. So they get assigned "50%" and end up doing their day job plus a project.
>
> **The consequence appears twice on the failure list: "ERP core team do not have the right resource" and "high turnover rate of project team members."** A part-time core team means the business inputs to TO-BE design are rushed, the data validation is skimmed, and the testing is thin — **and all three of those are separately named failure causes.**

## Roles in an ERP project

> [!EXAM]
> **There can be different roles in an ERP project such as:**
>
> 1. **Project Sponsor**
> 2. **Steering Committee member**
> 3. **Process Owner** *(from business side)*
> 4. **Project Manager** *(both from consulting and core team side)*
> 5. **Module Lead** *(both from consulting and core team side)*
> 6. **Module Team Member** *(both from consulting and core team side)*
> 7. **Part-time extended module team member** *(from core team side)*
> 8. **Integration Manager**
> 9. **Data Manager**
> 10. **Training Manager**
> 11. **Change Manager**
> 12. **Industry Subject Matter Expert (SME)**

> [!EXAM]
> **Project team structure**, as the deck's diagram draws it:
>
> **Project Sponsor** → **Steering Committee** → **two Project Managers side by side** — one from the **consulting company**, one from the **company implementing ERP** — and beneath them: **Functional Module Lead · Core Team Module Leads · Technical Lead · Industry SME · Training Manager · Data Manager · Integration Manager · Change Mgmt Consultant**, with **Module Team Members**, **Team Members** and **Extended Team Members** below, and **Process Owners** attached across.

> [!INTUITION]
> **Three features of that structure are examinable.**
>
> **① Three roles appear "both from consulting and core team side" — PM, Module Lead, Module Team Member.** The whole delivery spine is **mirrored**, one of each. That is the two-team design made structural: every level has someone who knows the package and someone who knows the business, **paired**.
>
> **② Four roles are cross-cutting, not module-aligned** — **Integration Manager, Data Manager, Training Manager, Change Manager.** They exist because integration, data, training and change **span every module**, and anything that spans modules will be nobody's job unless someone owns it. *(Every one of the four corresponds to a sub-plan of the project plan.)*
>
> **③ The Process Owner is explicitly "from the business side."** They own a **process**, not a module — and processes cross modules. **They are the person who signs off the TO-BE design and, crucially, owns the benefits afterwards.** *"Process owner's involvement"* and *"who owns business benefits"* are both named success factors, and this is the role that answers them.
>
> **The Sponsor / Steering Committee layer at the top is where "top management support" physically lives.** *"Lack of top management support"* appears on the risk diagram, in the generic-project risk tier, and on the failure list — and this is the part of the structure that either functions or does not. **A steering committee that never meets is the organisational form of that risk materialising.**
>
> **The "part-time extended module team member" is a candid entry.** It acknowledges that not everyone can be full-time — while the success factors insist the *core* team must be. **Extended members are consulted; core members are dedicated.**

---

**Next:** what makes these projects work and what kills them — **critical success factors, success & failure**.
