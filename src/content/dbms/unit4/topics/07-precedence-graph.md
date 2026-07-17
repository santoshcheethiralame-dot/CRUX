---
subject: dbms
unit: 4
order: 7
slug: precedence-graph
title: Testing Serializability — The Precedence Graph
summary: The precedence (serialization) graph algorithm for testing conflict serializability — building edges from conflicts, the cycle test, and recovering the serial order by topological sort.
minutes: 11
tags: [precedence-graph, serialization-graph, conflict-serializability, topological-sort]
---

# Testing Serializability — The Precedence Graph

The **precedence graph** (a.k.a. serialization graph) is the mechanical test for conflict serializability.

## The algorithm (Algorithm 20.1)

1. Create a **node** `Ti` for each transaction.
2. For each conflicting pair where `Tj`'s operation comes **after** `Ti`'s, add an edge **`Ti → Tj`**:
   - `wi(X)` … then … `rj(X)`  (W-R), or
   - `ri(X)` … then … `wj(X)`  (R-W), or
   - `wi(X)` … then … `wj(X)`  (W-W).
3. The schedule is **conflict serializable iff the precedence graph has NO cycle**.

> [!EXAM]
> **Cycle ⇒ NOT conflict serializable. Acyclic ⇒ conflict serializable.** For an acyclic graph, a **topological sort** gives an **equivalent serial order**.
> **Trick to read off the serial order:** repeatedly find a node with **in-degree 0**, output it, and remove it (with its out-edges); repeat. The removal order is the serial schedule.

## Worked example — cyclic (not serializable)

> [!DERIVE]
> `S : R1(A), R2(A), R1(B), R2(B), R3(B), W1(A), W2(B)`
> Conflicts → edges:
> - `R2(A)` before `W1(A)` ⇒ **T2 → T1**
> - `R1(B)` before `W2(B)` ⇒ **T1 → T2**
> - `R3(B)` before `W2(B)` ⇒ **T3 → T2**
>
> `T1 → T2` and `T2 → T1` form a **cycle ⇒ NOT conflict serializable**.

## Worked example — acyclic (serializable)

> [!DERIVE]
> Conflicts give edges: **T2→T3, T2→T1, T3→T1, T3→T4, T1→T4, T2→T4**.
> No cycle ⇒ **conflict serializable**. Topological sort: T2 (in-degree 0) → T3 → T1 → T4.
> **Equivalent serial order: T2 → T3 → T1 → T4.**

> [!NOTE]
> **Why serializability testing isn't used at runtime:** you'd have to build the graph for the whole schedule *after the fact*. Instead, the DBMS uses a **protocol** (like two-phase locking) that *guarantees* only conflict-serializable schedules are ever produced. The precedence graph is a tool to *prove* protocols correct and to solve exam problems.

---

**Next:** a weaker, more permissive notion — **view serializability**.
