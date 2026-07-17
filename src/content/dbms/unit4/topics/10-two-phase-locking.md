---
subject: dbms
unit: 4
order: 10
slug: two-phase-locking
title: Two-Phase Locking (2PL)
summary: The growing/shrinking phases of 2PL and the lock point, why 2PL guarantees conflict serializability but not deadlock-freedom, and the strict and rigorous variants plus lock conversions.
minutes: 12
tags: [2pl, two-phase-locking, growing-phase, shrinking-phase, strict-2pl, rigorous-2pl]
---

# Two-Phase Locking (2PL)

**Two-phase locking** is the protocol that *guarantees* conflict-serializable schedules. Each transaction obeys two phases:

> [!EXAM]
> - **Phase 1 — Growing phase:** a transaction may **acquire** locks but may **not release** any.
> - **Phase 2 — Shrinking phase:** a transaction may **release** locks but may **not acquire** any new ones.
>
> Once a transaction releases its first lock, it enters the shrinking phase and can request **no more** locks. The **lock point** is the end of the growing phase (the last lock acquired).

> [!INTUITION]
> The rule forces every transaction to **grab everything it needs before giving anything up.** This prevents the early-unlock inconsistency: by the time T1 releases a lock, it has already acquired all the locks it will ever need, so no other transaction can sneak in and corrupt its view. Transactions can be **serialized in lock-point order**.

## What 2PL guarantees (and doesn't)

> [!TRAP]
> **2PL guarantees conflict serializability, but does NOT guarantee freedom from deadlock.** Two transactions following 2PL can still deadlock (each waiting for the other's lock). Deadlock must be handled separately (detection + rollback, or prevention). 2PL also doesn't by itself prevent **cascading rollback** — that needs the strict variant.

## The variants

| Variant | Rule | Guarantees |
|---|---|---|
| **Basic 2PL** | growing then shrinking | conflict serializability |
| **Strict 2PL** | hold all **exclusive (write)** locks until **commit/abort** | recoverable + **no cascading rollback** |
| **Rigorous 2PL** | hold **all** locks (S and X) until **commit/abort** | serialize in **commit order**; simplest to reason about |

> [!EXAM]
> **Strict vs Rigorous:** strict 2PL keeps **exclusive** locks until commit; rigorous 2PL keeps **all** locks until commit. **Most commercial databases implement rigorous 2PL** but just call it "two-phase locking." Strict/rigorous are preferred because they make schedules **recoverable and cascadeless**.

## Lock conversions

2PL allows upgrading/downgrading locks within the phases:
- **Growing phase:** acquire `lock-S`, acquire `lock-X`, or **upgrade** `S → X` (need more access).
- **Shrinking phase:** release locks, or **downgrade** `X → S`.

> [!NOTE]
> **Proving 2PL ⇒ conflict serializability** (Elmasri Ex. 21.20): if the precedence graph of a 2PL schedule had a **cycle**, then some transaction in that cycle must have acquired a lock *after* releasing one — violating the two-phase rule. Since no cycle is possible, every 2PL schedule is conflict serializable.

---

**Next:** the non-relational world — **NoSQL systems & the CAP theorem**.
