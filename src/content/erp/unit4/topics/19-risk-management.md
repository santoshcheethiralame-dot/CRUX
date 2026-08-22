---
subject: erp
unit: 4
order: 19
slug: risk-management
title: Risk Management for ERP Projects
summary: The definition of risk and the four impact levels, the nine reasons for ERP project risk, the three-tier risk taxonomy that exists only as an image, the five-step risk management approach and the risk management plan.
minutes: 11
tags: [risk, impact-levels, catastrophic, risk-taxonomy, scope-creep, five-step-risk, risk-mitigation, phased-approach, risk-register]
---

# Risk Management for ERP Projects

## What a risk is

> [!EXAM]
> **A risk can be defined as the threat or probability that an action or event will adversely affect the project.**
>
> **Impact levels:**
>
> | Level | Meaning |
> |---|---|
> | **Negligible** | **leading to minor inconvenience** |
> | **Marginal** | **leading to degradation of secondary mission** |
> | **Critical** | **leading to serious threat to primary objective** |
> | **Catastrophic** | **leading to failure of primary mission** |
>
> > **Identify all critical and catastrophic threats to the project and deal with them proactively.**

> [!INTUITION]
> **The four levels are graded by what they threaten, not by how much they cost**, and that ordering is the useful part:
>
> $$\textbf{convenience} \rightarrow \textbf{secondary mission} \rightarrow \textbf{primary objective} \rightarrow \textbf{primary mission fails}$$
>
> **The instruction attached to them is where the value is: *"identify all critical and catastrophic threats… and deal with them proactively."*** You are explicitly told **not** to treat all risks equally — negligible and marginal risks are logged and watched, **not actively mitigated.**
>
> **That is the same attention-allocation principle as every other prioritisation scheme in this unit** — ABC for inventory, VED for requirements, cycle counting by class, screening before selection. **Rank by consequence, then spend effort only where the consequence justifies it.**
>
> **And note that risk has two dimensions, not one.** The definition says *"the threat **or probability**"*, and the five-step approach separates **impact** from **probability of occurrence** into two distinct steps — because **a catastrophic risk that is nearly impossible and a marginal risk that is certain need completely different responses.**

## Reasons for ERP project risk

> [!EXAM]
> **Reasons for ERP Project Risk**, as the deck's diagram gives them:
>
> **Frequent change in scope · Aggressive Time Frame · Connectivity in remote location · Computer Literacy of Employees · Organizational Politics · Lack of Top Mgmt Support · New Technology · No Prototyping · Inexperienced Core Team**

> [!INTUITION]
> **Group the nine and three sources appear:**
>
> | Source | Risks |
> |---|---|
> | **The project was set up badly** | **frequent change in scope · aggressive time frame · no prototyping** |
> | **The organisation is not ready** | **computer literacy · organizational politics · lack of top mgmt support · inexperienced core team** |
> | **The environment is hostile** | **connectivity in remote locations · new technology** |
>
> **Four of the nine are about people and the organisation**, not about software — which is the recurring lesson of this course and the reason **change management** is a unit of its own.
>
> **"No prototyping" is the least obvious and worth explaining**: without a prototype, **users first see the system at UAT**, when configuration is done and changing it is expensive. Unit 2 named prototyping as a BPR technique for exactly this reason, and the gap-analysis slide offers *"the vendor makes a prototype available to experiment with"* as one of two methods. **A prototype converts a late, expensive surprise into an early, cheap one.**
>
> **"Aggressive time frame" is the risk that manufactures other risks.** Compress the schedule and testing gets cut, training gets cut, data cleansing gets cut — and *"too tight project schedule, miscalculation of time and effort"* duly appears on the failure list.

## The three-tier risk taxonomy

> [!EXAM]
> **The deck's risk slide carries no text at all — the entire taxonomy exists only as an image.** It sorts risks into three nested groups:
>
> **Risk associated with EVERY project:**
> **Low user involvement · Poor project team skills · Low top management support · Poor project monitoring · Ineffective project management techniques · Scarcity of resources · Changing external environment · Attrition**
>
> **Risk associated with a TECHNOLOGY project:**
> **Inadequate management of IT issues · Scope creep · Volatile IT system · Instable vendor**
>
> **Risk associated with an ERP project:**
> **Implementation strategy · Inadequate selection · Ineffective communication system · Inadequate change management · Ineffective vendor and consultant · Inadequate training · Inadequate business process reengineering · Inappropriate implementation strategy · Complexity of the ERP system · Inadequate legacy system management**

> [!DERIVE]
> **The three tiers are cumulative, and that is the structure worth reproducing.**
>
> $$\textbf{every project} \;\subset\; \textbf{technology project} \;\subset\; \textbf{ERP project}$$
>
> **An ERP project carries all twenty-two risks**, not just the ten in its own tier. The taxonomy explains *why* ERP projects fail more often than ordinary projects: **they inherit every generic project risk, plus every technology risk, plus ten of their own.**
>
> **And the ERP-specific tier is almost entirely about the organisation, not the software:**
>
> | ERP-specific risk | Points back to |
> |---|---|
> | **Inadequate selection** | the package and partner selection chapters |
> | **Inadequate BPR** · **inadequate change management** | **Unit 2** in its entirety |
> | **Inadequate training** · **ineffective communication** | the change-management plan |
> | **Ineffective vendor and consultant** | partner selection criteria |
> | **Inadequate legacy system management** | data migration and **interface scope** |
> | **Complexity of the ERP system** | the good-fit rule and customization |
>
> **Nine of the ten are things this course has already taught you to prevent.** Only *"complexity of the ERP system"* is inherent to the product.
>
> ⚠️ **Note that "implementation strategy" and "inappropriate implementation strategy" both appear** in the deck's list — the same concern stated twice, which is itself a signal of how much weight it carries. **Big-bang versus phased is the choice**, and the risk plan's own remedy names it: *"a phased approach to ERP implementation to contain the exposure."*

## The five-step approach

> [!EXAM]
> **Five Step Project Risk Management Approach:**
>
> 1. **Find potential risk elements of the project**
> 2. **Assess the probability of occurrence of these risk elements**
> 3. **Analyze impact of each of these elements**
> 4. **Prioritize the risk**
> 5. **Develop a risk mitigation plan for top risk elements**
>
> *(The question bank asks: "What are the typical risks of an ERP project? **Explain the five steps of risk management process.**")*

> [!TRAP]
> **Steps 2 and 3 are separate on purpose, and step 4 is what joins them.**
>
> $$\textbf{risk exposure} \;\approx\; \textbf{probability} \times \textbf{impact}$$
>
> **Neither factor alone tells you what to do.** A catastrophic risk with negligible probability and a negligible risk that is certain can carry the same exposure — and both are handled differently from a critical risk that is likely.
>
> **Step 5 says "for TOP risk elements", not "for all risks"** — the same instruction as *"identify all critical and catastrophic threats."* **Mitigation costs money and attention; you buy it only for the risks that justify it**, and the other risks stay on the register, watched.
>
> **The whole approach is: find everything, score it two ways, rank, then act on the top.** That is precisely the shape of **exception messages** in MRP — *"prioritize the messages → take action"* — and of **ABC-driven cycle counting. Three chapters, one algorithm.**
>
> Note the **Risk Register** in the documentation-standards list: the artefact where steps 1–4 live, maintained through the project rather than produced once.

## The risk management plan

> [!EXAM]
> **Risk Management Plan:**
> - **Contain the risk exposure once the risk has occurred**
> - **Explore business processes that may be changed to adapt to the ERP system**
> - **Explore ERP modules that may need changes**
> - **Assess the feasibility of the changes**
> - **Estimate the cost, time, and the resources required**
> - **A phased approach to ERP implementation to contain the exposure**

> [!EXAM]
> **Mitigate the Risk** — the deck's four named remedies:
> - **Appropriate selection team**
> - **Right selection process**
> - **Adequate budget**
> - **Adequate time allocated**

> [!INTUITION]
> **The plan's first bullet is about *containment*, not prevention: *"contain the risk exposure once the risk has occurred."*** That is a mature position — some risks will materialise regardless, and the plan's job is to limit the damage rather than pretend it can be avoided.
>
> **Bullets 2 and 3 are the two ways to close any gap**, and they are the same two options as the good-fit rule:
>
> $$\textbf{change the business process} \qquad\text{or}\qquad \textbf{change the ERP module}$$
>
> **Adapt to the software, or adapt the software.** The first is BPR; the second is customization. **Bullets 4 and 5 then price both** — *feasibility*, then *cost, time and resources* — so the choice is made on evidence rather than preference. And the course's standing advice is clear on which usually wins: **"minimize developments and customization… to the extent possible use the standard software."**
>
> **The phased approach is the structural mitigation and the strongest single item on the list.** Going live in one plant, or with one module, means **a failure is contained to that scope** — you learn, correct, and roll the corrected version onward. **Big bang converts every risk into a single, simultaneous, all-or-nothing event**, which is exactly why the in-house team is judged fit for **rollouts** but not first implementations.
>
> **The four mitigation remedies are notably specific and all concern selection** — *appropriate team, right process, adequate budget, adequate time.* **Three of the four are simply "do not rush the selection."** Given that **"inadequate selection"** and **"poor ERP package selection"** appear on both the risk taxonomy and the failure list, the emphasis is earned.

---

**Next:** getting the requirements right and staffing the project — **requirements management & project teams**.
