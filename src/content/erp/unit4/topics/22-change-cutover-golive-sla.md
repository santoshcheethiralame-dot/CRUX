---
subject: erp
unit: 4
order: 22
slug: change-cutover-golive-sla
title: Change Requests, Cutover, Go-Live & SLAs
summary: The five-step change request process and the three-environment change cycle, cutover and transaction criticality, go-live with its open-issues reality and audit checklist, preparedness for the future, and service contracts with SLA parameters and priority levels.
minutes: 12
tags: [change-request, development-environment, quality-environment, production, cutover, go-live, go-live-audit, SLA, P1, service-level-report]
---

# Change Requests, Cutover, Go-Live & SLAs

## Change request management

> [!EXAM]
> **Change Request Management Process:**
>
> 1. **User requests for a change**
> 2. **Impact of the same is analyzed and change is approved**
> 3. **Change is made in the development environment and transported to the quality environment**
> 4. **All documents (process and config docs) are updated with the change**
> 5. **Change is tested in the quality environment and transported to the production environment**

> [!EXAM]
> **Different needs for change requests:**
> - **The software vendor had provided a new patch for fixing a bug in the application**
> - **There is a new business requirement which has come, and that needs new configurations in the software**
> - **As a continuous improvement initiative, some system parameters need to be modified**
>
> **The Change Cycle**, as the deck draws it:
>
> $$\textbf{Development Environment} \xrightarrow{\;\textbf{Approval}\;} \textbf{Test Environment} \xrightarrow{\;\textbf{Approval}\;} \textbf{Production Environment}$$
>
> with **regular corrections / changes** feeding in at the development end and **"test the changes"** before **"changes applied to production."**

> [!DERIVE]
> **The three-environment landscape is the examinable structure, and the reason for each one is different.**
>
> | Environment | Purpose | Why it must be separate |
> |---|---|---|
> | **Development** | where the change is **made** | mistakes here must be **free** — you break things while building |
> | **Quality / Test** | where the change is **proved** | testing needs **stable, complete** data and no half-finished work |
> | **Production** | where the **business runs** | **nothing untested may ever touch it** |
>
> **The word the deck uses for moving between them is "transported", and it is precise:** the change is not re-made in each environment — **the same object is moved forward**, so what was tested is exactly what goes live. **Re-doing a change in production is the failure this design exists to prevent.**
>
> **Two approval gates**, one before each transport, which means **no change reaches production without having passed test and been approved twice.**
>
> **Step 4 is the one people skip and the deck deliberately places it *before* the final transport:** *"all documents (process and config docs) are updated with the change."* **Documentation is a precondition for going live, not a follow-up task** — because a system whose documentation drifts from its configuration becomes unmaintainable, and *"project documentation standards"* is on the standards list for exactly this reason.

> [!TRAP]
> **The three "needs for change" have very different origins, and conflating them is the trap:**
>
> - **A vendor patch** originates **outside** — you did not ask for it and cannot refuse it indefinitely. This is why *"how future upgrades will be provided and at what cost"* is a contract clause.
> - **A new business requirement** originates **inside** — and this is the one that is scope creep if it arrives *during* the project and normal maintenance if it arrives *after*.
> - **Continuous improvement** originates from **operating the system** — nobody asked for it; someone noticed a parameter could be better.
>
> ⚠️ **The same process handles all three, and that is intentional.** *"Frequent change in scope"* is a named project risk, and *"change request management standards"* is the first item on the standards list — **the point of a formal process is that no change, whatever its origin, reaches production without impact analysis, approval and testing.**

## Cutover

> [!EXAM]
> - **Cut over is the final stage of ERP Realization before the company moves on to the new system**
> - **For moving from the old system to the new ERP application, activities need to be planned in minute detail**
> - **Transactions need to be stopped in the old application for a brief period and need to be moved to the new ERP**
> - **Cut over needs to be planned in a way that there is minimum business disruption**
> - **It is important to understand the criticality of the transaction before planning the cutover**
> - **There are some critical business transactions like customer ordering, invoicing etc. which a business will never like to stop, as there may be chances of revenue loss — whereas something like creating a maintenance order or creating new purchase contracts for vendors can be deferred by a week**
> - **Understanding this criticality is important, and this needs to be a senior management decision** for the company going for ERP, **as typically every department in the company believes their transactions are most critical**

> [!INTUITION]
> **Cutover is the one moment in the project when the business genuinely stops**, and the deck's framing is unusually candid about why it is hard.
>
> **The technical problem is small: extract open items from the old system, load them into the new one.** But you can only extract them once the old system stops taking transactions — and every hour it is stopped is an hour the business is not operating.
>
> $$\textbf{cutover window} \;\propto\; \textbf{data volume} \qquad\text{but}\qquad \textbf{business tolerance} \;\propto\; \frac{1}{\textbf{transaction criticality}}$$
>
> **So the plan has to rank transactions by how long each can be frozen** — and the deck's examples are precise: **customer ordering and invoicing lose revenue directly if stopped**; **maintenance orders and new purchase contracts can wait a week** with no revenue impact at all.
>
> ⚠️ **The line that makes this a management problem rather than a planning problem: *"typically every department in the company believes their transactions are most critical."*** Ask each department and all of them will say they cannot stop. **Somebody with authority over all of them has to decide** — which is precisely why the deck says **it needs to be a senior management decision.**
>
> **This is also why cutover is often scheduled over a weekend, a holiday, or a financial period boundary** — you pick the moment when the fewest critical transactions are happening. **Hershey's 1999 go-live near its peak season is the counter-example that made the point famous.**

## Go-live

> [!EXAM]
> - **The day a company moves from the old legacy system to the new ERP application is called the "Go Live" date**
> - **Ideally a company should complete all its ERP project related activities before Go Live, though in most cases projects go live with a number of open issues**
> - **In most ERP implementations, before Go Live, there will be a list of open issues.** **It's OK to have such issues** — till the company is not going live with some **critical** issues pending
> - **It's important to have a detailed list of these issues with an agreed-upon time frame within which such issues will be closed by the consulting team and core team from the company's side**
> - **It is common to prepare a detailed checklist known as the Go Live Checklist** to ensure all critical areas are taken care of before Go Live

> [!EXAM]
> **Go Live audit focuses on:**
> - **Completeness of Integration testing**
> - **End user training**
> - **End user acceptance testing and signoff**
> - **Data migration**
> - **Support help desk**
> - **Period End Closing Procedures**
> - **Critical open items**

> [!TRAP]
> ***"It's OK to have such issues"*** is a striking admission and the most useful sentence on the slide.
>
> **Waiting for zero open issues means never going live** — new issues arrive faster than the tail closes. So the realistic standard is not *no issues* but **no critical issues, with everything else listed and time-boxed.**
>
> $$\textbf{go-live criterion} = \textbf{zero critical open items} + \textbf{a dated closure plan for the rest}$$
>
> **The two conditions attached are what stop this becoming an excuse:** a **detailed list**, and an **agreed time frame with named owners on both sides.** An undocumented open issue is not an open issue — **it is a defect that has been forgotten.**
>
> **And notice what the go-live audit checks: five of its seven items are *readiness*, not *correctness*** — training done, UAT signed off, data migrated, **help desk in place**, period-end procedures ready. **Only "integration testing" and "critical open items" are about whether the software works.**
>
> That balance is the lesson: **at go-live, the risk is no longer that the system is wrong — it is that the organisation is not ready to use it.** *"Support help desk"* being an audit item is the sharpest instance: go live without one and every user problem on day one has nowhere to go.

## Preparedness for the future

> [!EXAM]
> **Three distinct parameters to judge preparedness for the future:**
> - **The manpower has to be trained**
> - **The system has to support the business in the future**
> - **The vendor has to update its ERP system to take care of future changes in the business environment**
>
> **The objectives could be set as:**
> - **Train people according to industry standard to make the organization largely independent of the consultants**
> - **If a large amount of customization has taken place, the ERP system may not be able to evolve**
> - **It is a strong indicator for the organization to start looking for an alternative**

> [!DERIVE]
> **The three parameters are the three parties who must keep up: you, the system, and the vendor.**
>
> **The second bullet under objectives is the sharpest statement of the customization argument anywhere in this unit:**
>
> > ***"If a large amount of customization has taken place, the ERP system may not be able to evolve. It is a strong indicator for the organization to start looking for an alternative."***
>
> **Heavy customization does not just cost money — it eventually forces a replacement.** The mechanism: every vendor upgrade must be re-tested against every modification, and modifications break as the standard code beneath them changes. Past a threshold, **upgrading costs more than the upgrade is worth**, so you stop upgrading. Once you stop, the system **stops receiving statutory updates, security patches and new functionality** — and it slowly becomes the legacy system you replaced.
>
> $$\textbf{customization} \uparrow \;\Rightarrow\; \textbf{upgrade cost} \uparrow \;\Rightarrow\; \textbf{upgrades stop} \;\Rightarrow\; \textbf{system frozen} \;\Rightarrow\; \textbf{replace it}$$
>
> **That closes the loop back to the good-fit rule.** A 75–80% fit avoided the customization that would eventually have forced this outcome — which is why package selection is described as *"make or break"* at the start of a project whose consequences run for a decade.
>
> **And the first objective — "make the organization largely independent of the consultants" — is the point of Train the Trainer** and of having the core team configure the system themselves. **The exit strategy is built during the project, not after it.**

## Service contracts and SLAs

> [!EXAM]
> - **Service Contract:** **a long-term agreement with business partners that specifies the services offered for that period**
> - **Service Level Agreement (SLA):** **contracts that assure the customer performance of certain services within a predefined period of time.** **SLAs list the level of service a customer is entitled to**
>
> **An SLA can contain:**
> - **Response time** *(e.g. call back within a specified time, technician on site within a specified time)*
> - **Service window / Availability time** — **working hours of the Support Center**
> - **Downtime** — **maximum number of breakdowns per year**
> - **Availability** — **percentage of assured system availability**
> - **Solution time** — **maximum period of time allowed for the solution of a problem**
>
> **Priority levels:**
> - **SLAs are generally designed based on the severity level of the issue**
> - **Issues having the highest severity level are defined as Priority 1 (P1) issues**
> - **For supporting P1 and P2 issues, support teams are available on call on a 24×7 basis on rotation**
> - **Priority 3 and 4 calls are generally attended the next business day**
> - **Generally on a monthly basis, Service Level Reports (SLR) are prepared to see SLA adherence**

> [!INTUITION]
> **The five SLA parameters measure two different things, and separating them is the insight:**
>
> | Measures | Parameters |
> |---|---|
> | **How reliable is the system?** | **Downtime** *(breakdowns per year)* · **Availability** *(% uptime)* |
> | **How responsive is the support?** | **Response time** · **Service window** · **Solution time** |
>
> **Response time and solution time are deliberately separate**, and the distinction is where SLAs are gamed. *"We called you back within 15 minutes"* satisfies **response time** while the problem remains unsolved for a week. **Only solution time commits to actually fixing it** — which is why a support contract with a response-time SLA and no solution-time SLA is much weaker than it looks.
>
> **The P1–P4 tiering is the same prioritisation principle as everything else in this unit** — ABC, VED, risk impact levels, exception messages. **P1/P2 get 24×7 on-call; P3/P4 wait for the next business day**, because paying for round-the-clock cover on trivial issues is exactly the waste that severity tiers exist to avoid.
>
> **And the Service Level Report closes the loop.** *"How you define success — define measures"* was the first item on the things-to-take-care-of list; **the SLR is that principle applied to the support phase**, monthly and in writing. **Without it, an SLA is a promise nobody checks.**

---

**Unit 4 complete.** From **buying materials** (procurement and inventory) through **buying the software** (package and partner selection) to **running the project** (scope, plan, risk, teams, success and failure) and **handing it over** (cutover, go-live, SLA).
