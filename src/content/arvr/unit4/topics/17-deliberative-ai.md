---
subject: arvr
unit: 4
order: 17
slug: deliberative-ai
title: Deliberative AI
summary: Planning sequences of actions, the three problem classes it solves, and the trade-offs against reactive AI.
minutes: 11
tags: [deliberative-AI, planning, resource-management, tactical-planning, exploration, hybrid-architecture]
---

# Deliberative AI

## What deliberative means

> **Planning sequences of actions for complex decision-making.**

Where a reactive agent maps the current state directly to an action, a **deliberative** agent **searches over possible futures** — it builds a **plan**: a sequence of actions leading from the current state to a goal.

> [!INTUITION]
> The distinction in one line: **reactive AI asks *"what do I do now?"*; deliberative AI asks *"what sequence of things will get me what I want?"*.**
>
> A reactive guard sees a locked door and gives up, because no authored rule covers it. A deliberative guard reasons: *the door is locked → the key is in the office → the office is down the corridor → therefore go to the office first.* Nobody wrote that behaviour; it **fell out of the search**. That is the entire value proposition — and the entire cost.

## The three problem classes

> Solves problems like:
> 1. **Resource management**
> 2. **Tactical planning**
> 3. **Intelligent exploration**

| Problem | What it requires | Why reactive AI struggles |
|---|---|---|
| **Resource management** | Allocating limited resources over time toward a goal | Requires reasoning about **future** consumption, not the present state |
| **Tactical planning** | Coordinated multi-step action, often with several agents | The value of a move depends on **what follows**, which a reflex cannot see |
| **Intelligent exploration** | Deciding **where to go next** to gain information | Requires modelling **what is not yet known** — inherently about the future |

> [!NOTE]
> All three share one feature: **the best action now depends on what happens later**. That is precisely the situation a reactive rule cannot express, because a reactive rule is a function of the *present* only. Whenever you see that dependency in an exam scenario, the answer involves planning.

## How planning works

The classical formulation gives the planner:

- a **state representation** — what is true now;
- a set of **actions**, each with **preconditions** and **effects**;
- a **goal condition**.

The planner then **searches** for an action sequence transforming the current state into one satisfying the goal — using A\*, hierarchical task networks (HTN), or **GOAP** (Goal-Oriented Action Planning), which is the game-industry standard.

> [!INTUITION]
> **GOAP** is worth knowing because it inverts how behaviour is authored. Instead of writing *"if X then Y"* rules, the designer declares **what each action needs and what it achieves**, and the planner assembles them. Add a new action and the agent may immediately use it in plans nobody anticipated — the **combinatorial explosion of reactive authoring becomes a combinatorial search instead**, which the machine performs rather than the designer.

## The trade-offs

> **Trade-offs:**
> - **Less controllable than Reactive AI**
> - **Computationally intensive (can be offloaded offline)**

| | **Reactive AI** | **Deliberative AI** |
|---|---|---|
| Decides by | Mapping state → action | **Searching over futures** |
| Handles unanticipated situations | ❌ only what was authored | ✅ **composes novel plans** |
| Predictability | **High** — same input, same output | **Lower** — plans can surprise you |
| Designer control | **Direct** — you wrote the behaviour | **Indirect** — you wrote the actions, not the behaviour |
| Cost per decision | Trivial | **Expensive** — search |
| Debuggability | Easy | **Hard** — you must reconstruct why the planner chose that |
| Scales with scenario complexity | Poorly (authoring burden) | **Better** — add actions, not rules |

> [!TRAP]
> **"Less controllable" is a genuine problem, not a quibble.** A planner may find a technically optimal solution that is **dramatically wrong** — a guard who correctly deduces that the fastest route to the alarm is straight through the player's hiding place, ruining a set-piece. In an authored experience, designers frequently *want* the predictable behaviour, which is why deliberative AI is used **selectively** rather than everywhere.

> [!NOTE]
> **"Can be offloaded offline"** is the practical mitigation. The expensive search need not happen inside the frame budget:
> - **plan ahead of time** and cache the result;
> - **plan on a background thread** across several frames — exactly PTAM's trick of splitting fast and slow work into separate threads;
> - **plan at a coarse level** occasionally while a reactive layer handles the moment-to-moment.

## The hybrid architecture

In practice almost nothing is purely one or the other:

```
   ┌──────────────────────────────────────────────────┐
   │  DELIBERATIVE  — slow, occasional, goal-level    │
   │  "get the key, then open the door, then escape"  │
   └───────────────────────┬──────────────────────────┘
                           │ issues the current sub-goal
                           ▼
   ┌──────────────────────────────────────────────────┐
   │  REACTIVE  — every tick, fast                    │
   │  "walk toward the door; dodge; open it"          │
   └──────────────────────────────────────────────────┘
```

> [!INTUITION]
> This is the same **layered, multi-timescale architecture** that has appeared throughout the course: the IMU at 1000 Hz under vision at 60 Hz under mapping at keyframe intervals; incremental tracking under relocalisation; the tracking thread under the mapping thread in PTAM.
>
> **Fast-and-dumb underneath, slow-and-smart on top**, with the slow layer setting goals for the fast one. It is arguably the single most transferable idea in the whole subject.

> [!EXAM]
> *"Differentiate deliberative AI and reactive AI, discussing their influence on adaptability, predictability, control and efficiency"* is question 8 in the course's own question bank. Answer with the comparison table, being explicit on all four requested axes:
> - **Adaptability** — deliberative **wins**: it composes plans for unanticipated situations.
> - **Predictability** — reactive **wins**: same input, same output, every time.
> - **Control** — reactive **wins**: the designer authors behaviour directly.
> - **Efficiency** — reactive **wins**: trivial runtime cost versus search.
>
> Then close with the **hybrid architecture**, which is how real systems get the benefits of both.

---

**Next:** what happens when the behaviour is learned rather than authored.
