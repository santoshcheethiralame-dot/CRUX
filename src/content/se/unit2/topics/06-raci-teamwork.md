---
subject: se
unit: 2
order: 6
slug: raci-teamwork
title: RACI, Planning Outcomes, Monitoring & Teamwork
summary: The RACI responsibility matrix, the deliverables of project planning, monitoring & control, and what makes software teams cohesive and effective.
minutes: 13
tags: [RACI, planning-outcomes, monitoring, teamwork, cohesion, quality]
---

# RACI, Planning Outcomes, Monitoring & Teamwork

## Quality of projects — built in, not bolted on

> [!NOTE]
> Quality must be **built into the process from inception** — it cannot be "added" after development. **Everyone** in the software process (engineers, managers, all stakeholders) is responsible for quality. Stressing quality reduces **rework**, which lowers cost and improves time-to-market.

The five **quality perspectives** (Garvin): **Transcendent** (excellence beyond expectation), **User-based** (fitness for use), **Manufacturing-based** (conformance to specs), **Product-based** (inherent attributes), **Value-based** (best balance of cost/time/quality).

## The RACI Matrix

> [!NOTE]
> A **RACI matrix** (a Responsibility Assignment Matrix) is a table listing **stakeholders × tasks**, marking each cell with **R, A, C or I** to make responsibility unambiguous.

| Letter | Role | Meaning | Rule |
|---|---|---|---|
| **R** | **Responsible** | "The Doer" — performs the work | **Several R's** allowed per task |
| **A** | **Accountable** | "The buck stops here" — ultimately answerable, has yes/no/veto | **Only ONE A** per task |
| **C** | **Consulted** | "In the loop" — expertise needed **before** completion | **Two-way** communication |
| **I** | **Informed** | Notified **after** a decision/action | **One-way** communication |

> [!EXAM]
> The two most-tested rules: **exactly one "A" per task** (you can't have two people driving the bus), but **multiple "R"s** are fine. **Consulted = two-way** (before); **Informed = one-way** (after).

*Example (software testing):* **R** = test engineers; **A** = project manager; **C** = developers (clarify defects); **I** = stakeholders (receive results).

## Outcomes of project planning

Comprehensive planning produces these deliverables:

1. **Project Plan** (master doc: scope, objectives, approach)
2. **Work Breakdown Structure**
3. **Project Schedule** (tasks, dependencies, durations, resources)
4. **Resource Management Plan**
5. **Communication Plan**
6. **Risk Management Plan**
7. **Role Definitions** (e.g. a RACI matrix)

## Project monitoring & control

**Monitoring and control** is the systematic observation of execution to spot problems **early** and apply corrective action. Core activities: performance-data collection & analysis, progress vs **baseline**, trend analysis/forecasting, **change control**, critical-path analysis, and stakeholder reporting.

> [!INTUITION]
> Planning sets the **baseline**; monitoring compares **actual vs baseline** and feeds **corrective action** back into the project. It's the feedback loop that keeps a project on course.

## Teamwork & team dynamics

Modern software engineering is **inherently collaborative** — scale, complexity, schedules and quality needs make solo development infeasible for commercial systems.

### Group cohesiveness
Cohesive teams put **group success over individual achievement**. Advantages:

- **Quality-standard development** — collective standards + peer accountability.
- **Knowledge sharing & learning** — fewer silos, growing collective capability.
- **Continuity** — shared knowledge survives departures (reduces risk).
- **Continuous-improvement culture** — the team improves regardless of individual ownership.

**Building cohesiveness:** shared-purpose creation (involve all in spec/design), social interaction, transparent information sharing, group professional development.

### Team effectiveness factors

| Factor | Key considerations |
|---|---|
| **Composition** | Diverse skills (client interaction, design, programming, testing, docs); balanced seniority; collaborative personalities; cultural diversity |
| **Organization** | Clear roles & authority; efficient communication/decisions; flexible structure |
| **Communication** | **Technical** (designs), **managerial** (objectives/priorities), **stakeholder** (progress/issues) |

> [!TRAP]
> Cohesion is a *force multiplier*, but beware **groupthink** — an over-cohesive team can suppress dissent. Healthy teams stay cohesive **and** keep challenging ideas.

---

**Next:** we move from managing the project to designing the system — **software architecture**.
