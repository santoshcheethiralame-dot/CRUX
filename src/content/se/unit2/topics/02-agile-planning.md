---
subject: se
unit: 2
order: 2
slug: agile-planning
title: Agile Project Planning
summary: Adaptive vs predictive planning, the two levels (release & iteration), story-based planning and the planning game, velocity, task allocation, and agile planning's limits.
minutes: 13
tags: [agile, planning, planning-game, velocity, user-stories, iteration]
---

# Agile Project Planning

## Adaptive vs predictive planning

Plan-driven projects try to predict the **whole** trajectory up front. **Agile planning** is a shift to **adaptive** planning that embraces change: rather than predicting everything, the team makes informed decisions on **current knowledge** and stays flexible.

> [!NOTE]
> In agile, the functionality of each increment is **decided during development**, based on **progress** and the **customer's changing priorities** — not fixed at the start. Since the customer's priorities change, it makes sense to have a flexible plan that can absorb those changes.

## The two levels of agile planning

| Level | Horizon | Focus |
|---|---|---|
| **Release planning** | Several months | Which **features** go into a release; prioritisation by business value; major milestones; resource/capacity; dependencies & risk |
| **Iteration planning** | **2–4 weeks** | Detailed planning of the next increment: story selection by velocity, task breakdown, acceptance criteria, sprint goal |

> [!EXAM]
> Two levels: **Release planning** (long-term, features) and **Iteration planning** (short-term, ~2–4 weeks, the next increment). Don't confuse the horizons.

## Story-based planning & the Planning Game

User stories (features from the user's point of view) drive planning. The **Planning Game** — originally from **Extreme Programming (XP)** — is a collaborative activity where the team and product owner:

- **Prioritise** stories by business value,
- **Estimate** the effort each story needs,
- **Plan** iteration content based on the team's velocity, and
- **Adjust** scope as priorities change.

**Effort points & velocity:** the team reads and discusses the stories, ranks them, and assigns **effort points** reflecting size + difficulty. The number of effort points completed per iteration is the team's **velocity** — which lets you estimate the **total effort** to build the system and choose how many stories fit each iteration.

> [!INTUITION]
> **Velocity** is the team's "speed." If you complete 20 points per 2-week sprint and 200 points remain, you have ~10 sprints of work. It turns guesswork into evidence-based forecasting.

## Task allocation & commitment

During task planning, developers break the selected stories into **development tasks**:

- Each task should take **4–16 hours** of work.
- All tasks needed to implement the iteration's stories are listed.
- Developers **sign up (volunteer)** for tasks rather than being assigned them.

**Benefits of self-selection:** the whole team gets an overview of the iteration's work, and developers feel **ownership**, which motivates them to finish.

> [!EXAM]
> A development task = **4–16 hours**. Developers **volunteer** for tasks (self-selection), not assignment by the manager — a frequent true/false point.

## Software delivery — fixed time, variable scope

> [!TRAP]
> A working **increment is always delivered at the end of each iteration**. If the planned features can't be finished in time, the **scope is reduced — the delivery schedule is *never* extended.** (Fixed timebox, variable scope.)

## When agile planning struggles

| Difficulty | Why |
|---|---|
| **Customer availability** | Agile planning needs continuous customer involvement; representatives may be busy or prefer traditional plans. |
| **Team composition/distribution** | Works best with **small, stable, co-located** teams; hard for large, distributed, or frequently-changing teams. |
| **Scalability** | Traditional agile planning may not scale to large, multi-team enterprise projects. |

> [!INTUITION]
> Agile planning is a **conversation around a table**. The further you get from a small co-located team that can actually have that conversation, the harder collaborative planning becomes.

---

**Next:** putting numbers on the work — **estimation with WBS, COCOMO and function points**.
