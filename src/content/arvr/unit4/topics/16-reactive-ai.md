---
subject: arvr
unit: 4
order: 16
slug: reactive-ai
title: Reactive AI
summary: Finite state machines, behaviour trees and utility AI — and the four properties the syllabus names: adaptability, complexity, universality and feasibility.
minutes: 13
tags: [reactive-AI, FSM, behaviour-trees, utility-AI, NPC, combinatorial-explosion, adaptability]
---

# Reactive AI

## What reactive means

**Reactive AI** maps the **current situation directly to an action**, with no planning ahead. Perceive → decide → act, every tick, with no model of the future.

> [!INTUITION]
> A reactive agent is a **very fast reflex**, not a thinker. It never asks *"what will happen if I do this?"* — it asks *"given what I see right now, what do I do?"* That makes it **cheap, predictable and easy to author**, which is why it still runs the overwhelming majority of game and VR characters.

The decision-making cycle of an NPC spans several layers, from strategy down to animation, and the reactive techniques below operate mainly at the upper ones:

```
   Quests / Strategy   ◀── highly combinatorial
   Activities / Tactics       (FSMs, behaviour trees, rule-based, utility AI, planning)
   Navigation                 (grids, roadmaps, navigation meshes)
   Animation           ◀── multi-dimensional continuous
                              (direct control, motion matching)
```

---

## The three techniques

### 1. Finite State Machines (FSMs)

> **Rule-based state transitions.**

The agent is in exactly one **state** at a time; **events or conditions** trigger transitions.

```
              out-of-sight
        ┌──────────────────────┐
        ▼                      │
     WANDER ──in sight──▶ CHASE ──in range──▶ SHOOT
        ▲                  ▲   │                 │
        └──── out-of-sight ┘   └── out-of-range ─┘
```

| | |
|---|---|
| **Advantages** | **Trivial to understand and debug**; behaviour is fully **predictable**; cheap; easy to author visually |
| **Limitations** | Transitions grow as $O(n^2)$ in the number of states — **the combinatorial explosion**; adding one state means reconsidering every existing transition; hard to reuse |

### 2. Behaviour Trees (BTs)

> **Hierarchical task structures.**

A tree evaluated from the root each tick. Internal nodes are **composites**; leaves are **actions** or **conditions**.

| Node type | Semantics |
|---|---|
| **Sequence** | Run children in order; **fail if any fails** (logical AND) |
| **Selector / Fallback** | Try children in order; **succeed on the first that succeeds** (logical OR) |
| **Decorator** | Modifies one child — invert, repeat, retry, cooldown |
| **Leaf** | An action ("Shoot") or condition ("in range?") |

```
                  Selector ?
        ┌─────────────┼─────────────┐
    Sequence →     Sequence →     Wander
    ┌────┴────┐    ┌────┴────┐
 in range?  Shoot  in sight? Chase
```

> [!INTUITION]
> **Why behaviour trees largely replaced FSMs**: the priority ordering is **implicit in the tree structure**, so adding a new behaviour means inserting **one subtree** rather than re-wiring $n$ transitions. Subtrees are **reusable** across characters, and the root-down re-evaluation gives **automatic interruption** — a higher-priority branch takes over the moment its condition becomes true, with no explicit transition needed. Modularity is the whole win.

### 3. Utility AI

> **Computes scores for decisions to increase adaptability.**

Every possible action is scored by a **utility function** over the current world state; the highest score wins (or a weighted random choice among the top scorers).

$$U(a) = \sum_i w_i \cdot f_i(\text{state})$$

| | |
|---|---|
| **Advantages** | **Highly adaptable** — behaviour degrades gracefully as the situation changes; adding an action means adding **one scoring function**, not editing any structure; naturally handles competing motivations |
| **Limitations** | **Harder to predict and debug** — no explicit structure to inspect; tuning weights is fiddly; can produce dithering between similarly-scored options |

> [!INTUITION]
> The three techniques form a clear progression in **how the decision is represented**: FSM says *"I am in this state"*; a behaviour tree says *"try these in this order"*; utility AI says *"score everything and pick the best"*. Control and predictability decrease left to right; **adaptability increases**.

---

## Limitations of reactive AI

> **Combinatorial explosion with complex scenarios.**

As the number of states, conditions and interactions grows, the authored logic grows **faster than linearly** — and every new behaviour must be reconciled with all the existing ones.

---

## The four properties the syllabus names

> [!NOTE]
> The syllabus lists *"Reactive AI: Adaptability, Complexity and Universality, Feasibility"*. The booklet gives the three techniques and the combinatorial-explosion limitation but does not use this framing, so the following organises the same material against those four headings.

| Property | How reactive AI fares |
|---|---|
| **Adaptability** | **Limited.** Behaviour is bounded by what was authored — a reactive agent handles only situations its designer anticipated. **Utility AI is the most adaptable** of the three, since scores respond continuously to state, but it still cannot invent a behaviour nobody wrote. |
| **Complexity** | **Grows badly.** FSM transitions scale as $O(n^2)$; interacting behaviours multiply. Behaviour trees mitigate this through **hierarchy and reuse**, and utility AI through **independent scoring functions**, but the authoring burden still rises steeply with scenario richness. |
| **Universality** | **Low.** A reactive controller is written for **one character in one game**; it does not transfer. There is no general reactive agent — the logic *is* the domain knowledge. |
| **Feasibility** | **Excellent — and this is why it dominates.** Runtime cost is trivial (a few comparisons per tick), behaviour is **predictable and debuggable**, designers can author it without programming, and it is guaranteed to meet frame-time budgets. |

> [!INTUITION]
> Read the four together and the trade-off is stark: reactive AI is **weak on adaptability and universality but unbeatable on feasibility**. In a VR application running at 90 fps with a strict frame budget and a requirement that characters behave **the same way every time for testing and safety**, feasibility and predictability often matter more than intelligence.
>
> That is the honest reason most shipped AR/VR characters are reactive: **not because designers cannot do better, but because better is usually not worth the cost.** The next topic is what you buy when it is.

> [!EXAM]
> *"Explain reactive AI and discuss its adaptability, complexity, universality and feasibility."* Give the **three techniques** (FSM with an example diagram, behaviour trees with sequence/selector semantics, utility AI with the scoring idea), state the **combinatorial explosion** limitation, then address the **four properties** explicitly in the table's terms. The closing judgement — **reactive AI trades adaptability for feasibility, and in real-time systems that is usually the right trade** — is the sentence that shows you have understood rather than listed.

---

**Next:** the alternative — agents that plan.
