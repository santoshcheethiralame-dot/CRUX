---
subject: erp
unit: 4
order: 18
slug: project-plan-charter
title: Project Plan, Standards & Charter
summary: The six component plans of an ERP project plan, the resource plan and its ramp-up logic, the nine project standards, the project charter's contents with the real table of contents, and the kick-off meeting.
minutes: 12
tags: [project-plan, resource-plan, milestones, standards, project-charter, kick-off, WSR, MoM, implementation-time]
---

# Project Plan, Standards & Charter

## The project plan

> [!EXAM]
> - **Project plan depends on the implementation strategy of the company**
> - **Granularity of a project plan depends at which point it is created and for which audience**
> - **A project plan is typically prepared in a spreadsheet (like Excel) or with project management software tools like MS Project**
>
> **An ERP project plan is composed of several plans:**
>
> 1. **Activity, Deliverables and Milestone plan**
> 2. **Resource plan**
> 3. **Training Plan**
> 4. **Testing Plan**
> 5. **Data Migration Plan**
> 6. **Change Management Plan**

> [!INTUITION]
> **Six sub-plans, and five of them are named after the things that most often go wrong.**
>
> | Sub-plan | Guards against |
> |---|---|
> | **Activity / Deliverables / Milestones** | *"lack of planning of scheduling, resources and activities"* (39% of failures) · *"milestones not being set"* (29%) |
> | **Resource plan** | *"inadequate co-ordination of resources"* (26%) · *"scarcity of resources"* |
> | **Training plan** | *"inadequate training"* · *"training issues for the team"* |
> | **Testing plan** | *"no quality control"* (34%) · *"test the solution thoroughly"* |
> | **Data migration plan** | *"having clean data in the system"* |
> | **Change management plan** | *"inadequate change management"* · *"employees resist ERP implementation"* |
>
> **Each sub-plan is a named failure with a document attached to it.** That is the honest reading of the list — the plan structure is a distillation of what has gone wrong on previous projects.

> [!EXAM]
> **Project Resource Plan:**
> - **Shows in which month how many resources are needed**
> - **Whether resources need to be at client site or at offshore location**
> - **How many resources are needed from the consulting company side and how many from the core team**
> - **[Ramp up / Ramp down plan]**
> - **Resource Plan is derived from Project Plan**
> - **There can be different roles introduced during different phases of the project**

> [!DERIVE]
> **The resource plan has four dimensions, and each maps to something already established in this unit:**
>
> | Dimension | Connects to |
> |---|---|
> | **When** — which month | the **phase plan** |
> | **Where** — site or offshore | the **offshoring percentages table** — 0% / 10% / 70% / 50% / 80% by phase |
> | **Whose** — consulting or core team | **in-house vs external**; the core team brings business knowledge, consultants bring product knowledge |
> | **Ramp up / ramp down** | **different roles appear in different phases** |
>
> **"Resource Plan is derived from Project Plan" is the causal direction, and getting it backwards is the classic error.** You do not decide you have ten people and then plan what they can do; **you plan the work and then compute the people it needs.** Staffing to availability rather than to plan is how *"aggressive time frame"* becomes an unachievable schedule.
>
> **Ramp-up/ramp-down is why the plan is monthly rather than a single headcount.** Project Preparation needs a handful of people; **Realization needs the peak** — configuration, development and testing all at once; Go Live needs trainers and data people; Support needs a small steady team. **A flat headcount would be idle at both ends and short in the middle.**

> [!EXAM]
> **The deck's sample high-level plan and milestones** runs **Jan → Aug** across seven workstreams — **Project Preparation · Blueprinting · Realization · Realization Final · Go Live Preparation · Go Live · Hyper care & Support** — with these milestones:
>
> 1. **Preparation work completed, project team training starts**
> 2. **To-be design completed**
> 3. **Development objects specified**
> 4. **Standard configuration completed, testing started**
> 5. **Development of objects completed, testing completed, go-live preparation started**
> 6. **Go Live, Sustain starts**
> 7. **Sustain Ends**

> [!TRAP]
> **Every milestone on that list is a *completed deliverable*, not a date or an activity** — *"to-be design **completed**"*, *"development objects **specified**"*, *"testing **completed**"*.
>
> That is what makes a milestone useful: **you can tell unambiguously whether it has been met.** *"Blueprinting 80% done"* is an opinion; *"to-be design completed and signed off"* is a fact.
>
> **This is the same discipline as *"requirement should be verifiable"*** in requirements management, and it is the direct remedy for *"mismanagement of progress"* and *"milestones not being set."*
>
> Note also that **"Hyper care & Support" is planned in from the start** and has its own end milestone — *"Sustain Ends."* **The project is not over at go-live**, and treating it as though it were is how support gets under-resourced exactly when the system is least stable.

## Implementation time

> [!EXAM]
> **Implementation time depends on the following parameters:**
> - **Number of sites where ERP has to be implemented**
> - **Number of modules or functions to be implemented**
> - **Maturity level of organizations**
> - **Customization**

> [!INTUITION]
> **Three of those four are scope levers by another name** — **sites = location scope**, **modules = application scope**, **customization** is what a poor functionality fit forces. **The plan's duration is a function of the scope, which is why scope is the first thing to manage.**
>
> **"Maturity level of organizations" is the one that is not a lever, and it is the interesting one.** A company with documented processes, clean master data and prior experience of large change moves faster than one without — **and you cannot shorten the project by wishing that away.** It is the same variable the **procurement maturity model** and the **inventory pyramid** both measure: *how much of the groundwork is already done?*

## Project standards and procedures

> [!EXAM]
> **Project Standards and Procedures:**
>
> 1. **Change request management standards**
> 2. **Issue management standards**
> 3. **Project communication management standards**
> 4. **Project monitoring and status reporting standards**
> 5. **Testing standards**
> 6. **System configuration standards**
> 7. **Development strategy and standards**
> 8. **Authorization standards**
> 9. **Project documentation standards** — formats for **WSRs, Module Status Reports, MoMs, Issue Log, Charter, Functional Specs, Tech Specs, Test plans/scripts, Risk Register, Naming and Versioning Stds**
>
> *(**WSR** = Weekly Status Report · **MoM** = Minutes of Meeting)*

> [!DERIVE]
> **Standards exist because an ERP project is done by dozens of people across several firms and locations** — and without agreed formats, **nothing can be compared, aggregated or handed over.**
>
> Three concrete consequences:
>
> - **Naming and versioning standards** — without them, two consultants create the same object twice under different names, and nobody knows which functional spec is current.
> - **Status reporting standards** — if every module lead reports differently, **the PM cannot roll them up into one view**, and *"mismanagement of progress"* follows mechanically.
> - **Configuration and development standards** — the system will be **maintained for a decade by people not on this project.** Undocumented, inconsistent configuration is a permanent tax on every future change.
>
> **The deeper point: standards are the cheapest possible control.** They cost a document each and prevent a class of problems entirely — which is why they belong in Project Preparation, before there is anything to standardise.
>
> **Note that "change request management standards" is listed first**, and it gets a whole process of its own later. On a project where *"frequent change in scope"* is a named risk, **the procedure for handling change has to exist before the first change arrives.**

## The project charter

> [!EXAM]
> **The Project Charter is a document that is a major deliverable of the Project Preparation phase.** It contains:
>
> - **Project overview:** **SoW, Objectives, Benefits; Vision and Mission statements**
> - **Project scope**
> - **Project goals and objectives**
> - **Project deliverables**
> - **Business case summary**
> - **Total estimated project cost**
> - **Implementation strategy**
> - **Project stakeholders**
> - **Assumptions and constraints**
> - **Risk assessment**
>
> **Kick Off Meeting — where the Project Charter is presented formally.**

> [!EXAM]
> **The deck's sample charter table of contents**, worth skimming because it shows what a real one covers:
>
> **1 Introduction** — *Statement of Work · Project Objectives · Benefits · Assumptions and Constraints*
> **2 Scope** — *Functional Scope · Technical Scope (Software, Hardware)*
> **3 Project Organisation and Roles** — *Executive Sponsor · Executive Committee · Steering Committee · Project Manager · Project Integration Manager · Project Office · Project Team Leads (Functional, Technology, Change Management)*
> **4 Project Plan** — *Methodology Overview: Proposed Implementation Strategy · Scope Management · Issue Management · Complexity Management · Risk Management · Project Planning and Monitoring · Quality Assurance;* **Implementation:** *Project Plan · Training Plan · Knowledge Transfer · Change Management*
> **5 Project Management Standards and Procedures** — *Project Monitoring · System Configuration · Communication Plan · System Landscape · System Authorisation Standards · System Problems and Error Handling · System Enhancement and Modifications Approval*

> [!INTUITION]
> **The charter is the project's constitution: one document that fixes what we are doing, why, who decides, and how we will work.**
>
> | Charter section | Fixes |
> |---|---|
> | Overview, business case, benefits | **why** |
> | Scope, deliverables, goals | **what** |
> | Stakeholders, organisation and roles | **who decides** |
> | Implementation strategy, plan, standards | **how** |
> | Assumptions, constraints, risk assessment | **what could go wrong** |
>
> **The section that carries the most weight in practice is "Assumptions and Constraints."** Every estimate rests on assumptions — *the legacy data is clean*, *the core team is full-time*, *there will be one site go-live*. **Writing them down converts an argument later ("you should have known") into a fact ("this assumption failed, here is the impact").**
>
> **And notice that the charter contains the standards, the plans and the risk assessment by reference** — it is the **single approved artefact** from which everything else hangs, which is exactly why presenting it *is* the kick-off.

## The kick-off meeting

> [!EXAM]
> **Project kick off is a formal meeting to announce the start of the project to the whole organization and other organizations.**
>
> **The goal of project kick off is to:**
> - **Introduce project team members to the organization and explain their roles, responsibilities in the project**
> - **Explain high level project plan, implementation strategy, timeline, project goals and deliverables at different project stages**
> - **Outline Key Organizational Change Management goals and objectives**
> - **Create excitement about the project among the project team and the entire organization**

> [!TRAP]
> **Three of the four kick-off goals are change management, not project management** — introducing people, outlining OCM objectives, and **"create excitement."**
>
> That proportion is deliberate and it is the examinable point. The kick-off is **announced to "the whole organization"**, not to the project team — most of the audience will never touch the plan. What they need is **to know this is happening, that leadership is behind it, and who to talk to.**
>
> This is Unit 2's change-management doctrine in its first concrete appearance: **communication starts before the work does.** *"Poor communication"* is the **57% failure cause**; *"communication is essential for success of ERP"* is a stated success factor; and **the kick-off is the first communication event of the project.**
>
> ⚠️ **"Create excitement" is a real objective, not decoration.** An ERP project asks people to abandon systems they are fluent in for one they are not. **Whether they arrive at that curious or resentful is substantially set on day one.**

---

**Next:** what could go wrong and what to do about it — **risk management for ERP projects**.
