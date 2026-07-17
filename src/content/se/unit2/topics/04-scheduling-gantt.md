---
subject: se
unit: 2
order: 4
slug: scheduling-gantt
title: Scheduling, Gantt Charts & the Critical Path
summary: How project schedules are built, the seven scheduling principles, Gantt chart components, and critical path analysis (longest path, zero slack).
minutes: 12
tags: [scheduling, gantt, critical-path, slack, milestones]
---

# Scheduling, Gantt Charts & the Critical Path

## Project scheduling

**Project scheduling** distributes the estimated effort across the planned duration by allocating it to specific software-engineering tasks. The schedule **evolves**: early on you build a **macroscopic** schedule (major framework activities); as the project proceeds, each entry is refined into a **detailed** schedule of specific actions and tasks.

### Two scheduling perspectives
1. **End date already fixed** (irrevocably set, e.g. by the market/contract) → the organisation must **distribute effort within** the prescribed time frame.
2. **End date set by the engineering org** → effort is distributed to best use resources, and the end date is defined **after** analysis.

> [!TRAP]
> Sommerville/Pressman note the **first situation (fixed end date) is far more common** — and far more dangerous, because the deadline is set before anyone knows if it's realistic.

### The seven scheduling principles
① **Compartmentalization** (break work into pieces) · ② **Interdependency** (manage predecessor/successor relations) · ③ **Time allocation** (realistic time + buffers) · ④ **Effort validation** (cross-check estimates) · ⑤ **Defined responsibilities** · ⑥ **Defined outcomes** (measurable deliverables) · ⑦ **Defined milestones**.

## Gantt charts

> [!NOTE]
> A **Gantt chart** is a visual schedule plotting **activities against a time scale**. In one glance it shows **what is to be done (activities) and when (the schedule)**.

| Component | Meaning |
|---|---|
| **Activity list** | Vertical axis — all tasks/deliverables in sequence |
| **Time scale** | Horizontal axis — the timeline (days/weeks/months) |
| **Duration bars** | Horizontal bars = each task's start, duration, end |
| **Dependencies** | Connections showing predecessor → successor relationships |
| **Progress indicators** | Completed work vs planned progress |
| **Milestones** | Significant events / completion points |

**Uses:** planning, **progress tracking** (planned vs actual), stakeholder communication, resource management, and schedule-risk management.

## Critical Path Analysis

> [!NOTE]
> The **critical path** is the **longest sequence of dependent activities** through the project network. It determines the **minimum possible project duration**. Activities on it have **zero slack** — any delay to them **directly delays the whole project**.

**Characteristics:**
- Longest-duration path through the network.
- **Zero total slack** for every activity on the path.
- Direct impact on the completion date.
- Priority focus for resource allocation and risk management.

> [!INTUITION]
> **Slack** (float) = how long a task can slip without delaying the project. Critical-path tasks have **zero** slack, so they're where the PM should focus. Non-critical tasks have spare time you can borrow.

> [!EXAM]
> Critical path = **longest path = zero slack = sets the minimum duration**. To finish *earlier*, you must shorten the **critical** path (more resources / reduced scope on those tasks) — speeding up non-critical tasks does nothing.

**Benefits of identifying the critical path:** resource optimisation, finding schedule-compression opportunities, setting risk-management priorities, and focusing progress monitoring.

---

**Next:** dealing with what might go wrong — **risk management**.
