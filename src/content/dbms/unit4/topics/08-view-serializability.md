---
subject: dbms
unit: 4
order: 8
slug: view-serializability
title: View Serializability
summary: View equivalence's three conditions (same initial reads, same read-from, same final writes), the schedule-containment hierarchy, blind writes, and why conflict serializability is preferred.
minutes: 10
tags: [view-serializability, view-equivalence, blind-write, schedule-hierarchy]
---

# View Serializability

**View equivalence** is a **more general (weaker)** notion than conflict equivalence — it captures more correct schedules, but is harder to test.

## The three conditions

> [!EXAM]
> Two schedules S1 and S2 are **view equivalent** iff **all three** hold:
> 1. **Same initial reads** — each transaction that reads the *initial* value of an item does so in **both** schedules.
> 2. **Same read-from** — if T2 reads an item **written by T1** in S1, then T2 reads it from T1 in S2 too.
> 3. **Same final writes** — the transaction that performs the **last write** of each item is the **same** in both.
>
> A schedule is **view serializable** if it is view equivalent to some serial schedule.

## The containment hierarchy

$$\text{Serial} \subset \text{Conflict-serializable} \subset \text{View-serializable} \subset \text{All schedules}$$

> [!EXAM]
> **Every conflict-serializable schedule is view-serializable, but NOT vice-versa.** The schedules that are view-serializable but *not* conflict-serializable always contain a **blind write**.

## Blind write

A **blind write** is a write to an item **with no prior read** of that item by the same transaction.

```text
S: w3(X) is a blind write — T3 writes X without reading it first.
   w2(X) is NOT blind — T2 read X (r2(X)) before writing.
```

> [!INTUITION]
> A blind write can make a non-conflict-serializable schedule still *correct in effect*: if T3 overwrites X "blindly", the intermediate conflicting orders don't matter because the final value is determined solely by the last writer. That's exactly the loophole view equivalence (condition 3: same final writer) exploits and conflict equivalence misses.

## Why we prefer conflict serializability

> [!TRAP]
> View serializability captures **more** correct schedules — so why emphasise conflict serializability (Silberschatz Practice Ex. 17.5)? Because **testing view serializability is NP-complete**, while conflict serializability is a cheap **cycle check** on the precedence graph. Practical protocols (2PL) enforce the easier-to-guarantee conflict serializability.

| | Conflict equivalence | View equivalence |
|---|---|---|
| Based on | order of conflicting ops | read-from + final writes |
| Strictness | more strict | more flexible |
| Testability | **easy** (precedence graph) | **hard** (NP-complete) |
| Coverage | fewer schedules | more schedules |

---

**Next:** how protocols actually enforce serializability — **lock-based protocols**.
