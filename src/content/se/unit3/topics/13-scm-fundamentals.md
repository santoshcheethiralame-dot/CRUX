---
subject: se
unit: 3
order: 13
slug: scm-fundamentals
title: Software Configuration Management — Fundamentals
summary: What SCM is and why it matters, its goals, why it's needed, how it changes in Agile, the SCM roles (including the CCB), and the SCM plan.
minutes: 12
tags: [SCM, configuration-management, baselines, roles, CCB, SCM-plan]
---

# Software Configuration Management — Fundamentals

## What is SCM?

> [!NOTE]
> **Software Configuration Management (SCM)** is the discipline of systematically **controlling and tracking changes** to software artifacts. It identifies **Configuration Items (CIs)**, tracks the history of changes (who, why, when — via versioning, branching, merging), and provides **baselines** (stable snapshots) plus promotion through stages (dev → test → release).

> [!INTUITION]
> Without SCM, if three developers edit `payment.py` at once, two changes get silently overwritten. SCM records every change, **merges** differences, and forces the integrator to **resolve conflicts** — nothing is lost.

**Why it matters:**
- **Reproducible builds** — recreate the exact binary shipped to a customer.
- **Audit trails** — trace a released bug back to the exact commit and author.
- **Concurrent work** — teams work in parallel without losing changes.

## Goals & need

**Goals:** controlled & predictable change · improved productivity (fewer merge conflicts) · **traceability** (requirements → code → test → release) · support multiple release lines · reliable **rollback/forward-port**.

| Scenario | Problem without SCM | SCM solution |
|---|---|---|
| 10 devs on 1 file | Overwrites, lost work | Locking / Merging |
| Multiple versions | Confusion (v1 vs v2) | **Branching** |
| Live system bugs | Risky hotfixes | Controlled release |
| Hardware changes | Incompatible builds | Build configs |

> [!EXAM]
> SCM's headline benefits: **reproducibility, traceability, concurrent work, and controlled change.** It's needed for concurrent development, maintaining multiple versions (support v1.0 while building v2.0), environment diversity, requirement churn, and compliance/auditing.

## SCM in Agile

Agile's rapid, incremental changes need SCM that supports CI/CD:
- **Trunk-based or short-lived feature branches** — minimise merge pain.
- **Automated CI pipeline** on every push.
- **Infrastructure-as-code** stored under SCM.
- **Code reviews via pull requests (PRs)** before merging.

*Workflow:* pull latest from trunk → feature branch → run local tests/linters → open a PR (CI runs the full suite, reviewers comment) → after approval + passing CI, merge and let pipelines promote the artifact.

## SCM roles

| Role | Duties |
|---|---|
| **Configuration Manager** | Define items, policies, tools; **baselining** & master repository |
| **Developer/Engineer** | Author code, branches, tests; request promotions; resolve conflicts |
| **Build/Release Engineer** | Build system, artifact repo, deployment pipelines |
| **QA/Test Engineer** | Validate changes before promotion |
| **Change Control Board (CCB)** | Review high-risk changes; **approve/reject** promotions |
| **Auditor** | Check process adherence & baseline integrity |

> [!INTUITION]
> In **small teams** one person wears many hats; in **large/regulated** orgs these roles are distinct with formal sign-offs. The **CCB** is the gatekeeper for risky changes.

## The SCM Plan

A **living document** created early, defining how CM is applied. Contents: ① Introduction & purpose ② Scope & CIs ③ Roles ④ Tools (Git, Jenkins, Nexus, JIRA) ⑤ Branching & versioning ⑥ Baseline & release process ⑦ Change control ⑧ Appendix: change-request form. Plus backup/archival and audit cadence.

---

**Next:** the day-to-day work of SCM — **configuration items, baselines & branching**.
