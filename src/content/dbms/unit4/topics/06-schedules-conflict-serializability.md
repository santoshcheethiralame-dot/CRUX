---
subject: dbms
unit: 4
order: 6
slug: schedules-conflict-serializability
title: Schedules & Conflict Serializability
summary: Schedules and conflicting operations (the 3 conditions), serial vs serializable schedules, conflict equivalence by swapping non-conflicting operations, and conflict serializability.
minutes: 12
tags: [schedule, conflict, serializability, conflict-equivalence, serial-schedule]
---

# Schedules & Conflict Serializability

A **schedule (history)** S of n transactions is a chronological ordering of **all** their operations that **preserves each transaction's internal order**. A successful transaction ends with `commit`; a failed one with `abort`.

## Conflicting operations

> [!EXAM]
> Two operations **conflict** iff **all three** conditions hold:
> 1. they belong to **different** transactions,
> 2. they access the **same** data item, and
> 3. **at least one is a write**.
>
> So the conflicting pairs are **R-W, W-R, W-W**. `R-R` never conflicts; operations on **different items** never conflict; two operations of the **same transaction** never conflict.

```text
In Sa: r1(X); r2(X); w1(X); r1(Y); w2(X); w1(Y)
  conflict:     r1(X)–w2(X),  r2(X)–w1(X),  w1(X)–w2(X)
  no conflict:  r1(X)–r2(X) (both reads),  w2(X)–w1(Y) (different items),
                r1(X)–w1(X) (same transaction)
```

## Serial, serializable, conflict-serializable

- **Serial schedule** — no interleaving; each transaction runs fully before the next. Always consistent, but **low concurrency**.
- **Serializable schedule** — a *non-serial* schedule that is **equivalent to some serial schedule** → also consistent, *with* concurrency. (This is what we want.)
- **Conflict equivalence** — two schedules are conflict equivalent if the **relative order of every pair of conflicting operations is the same** in both.
- **Conflict serializable** — S is conflict serializable if it can be transformed into a **serial** schedule by **swapping adjacent non-conflicting operations**.

> [!INTUITION]
> Swapping two **non-conflicting** adjacent operations never changes the result (they touch different items, or are both reads, or belong to the same transaction). So if a sequence of such harmless swaps turns the interleaved schedule into a serial one, the interleaving was "serial in disguise" — hence correct.

> [!NOTE]
> **Serial vs serializable:** a serial schedule has **no concurrency** (one transaction at a time); a **serializable** schedule allows concurrency but is *equivalent in effect* to a serial one. Serializable schedules give the same consistency as serial schedules with **better resource utilisation and throughput** (Silberschatz/Elmasri Review Qs).

## Result equivalence (why it's not enough)
Two schedules are **result equivalent** if they produce the same final database state — but this **may be accidental** (true only for specific initial values), so it can't define equivalence. We use **conflict equivalence** (and view equivalence) instead.

---

**Next:** the mechanical test — the **precedence graph**.
