---
subject: dbms
unit: 4
order: 9
slug: lock-based-protocols
title: Lock-Based Protocols
summary: Shared and exclusive locks, the lock-compatibility matrix, why early unlocking breaks serializability, and the deadlock and starvation problems with the lock table.
minutes: 12
tags: [locks, shared-lock, exclusive-lock, deadlock, starvation, lock-table]
---

# Lock-Based Protocols

A **lock** is a mechanism that controls concurrent access to a data item. A transaction must acquire the appropriate lock (granted by the **concurrency-control manager**) before accessing an item.

## The two lock modes

| Mode | Request | Holder can | Concurrent holders |
|---|---|---|---|
| **Shared (S)** | `lock-S` | **read** only | many S-locks at once |
| **Exclusive (X)** | `lock-X` | **read and write** | only one |

## Lock-compatibility matrix

A request is granted only if its mode is **compatible** with all locks currently held by *other* transactions:

| held ↓ \ requested → | **S** | **X** |
|---|---|---|
| **S** | ✅ | ❌ |
| **X** | ❌ | ❌ |

> [!EXAM]
> **Only S–S is compatible.** Several transactions may read an item simultaneously (shared locks), but a writer needs an exclusive lock, which conflicts with *everything*. An incompatible request **waits** until the conflicting locks are released.

## The early-unlock trap

> [!TRAP]
> Simply locking items isn't enough — **releasing a lock too early** breaks serializability. If T1 transfers between A and B but unlocks B before it has finished, T2 can read B in an inconsistent intermediate state and produce a wrong result (e.g. display \$250 instead of \$300). The fix is a *protocol* on **when** locks may be released → **two-phase locking** (next topic).

## Deadlock

> [!NOTE]
> **Deadlock** — two transactions each wait for a lock the other holds:
> ```text
> T3 holds X-lock(B), wants X-lock(A)  ┐
> T4 holds X-lock(A), wants X-lock(B)  ┘  → neither can proceed
> ```
> Resolution: **roll back** one of them. MySQL **detects deadlocks automatically** (via a wait-for graph) and rolls back the victim. Consistent lock ordering across transactions prevents deadlocks.

## Starvation
A transaction waiting for an **exclusive** lock can be perpetually overtaken by a stream of compatible **shared**-lock grants → **starvation**. Fixed by granting locks **first-come-first-served**: no request is granted while an earlier, conflicting request is still waiting.

## The lock manager & lock table
The **lock manager** is a process that receives lock/unlock requests and replies with grants (or rollback messages on deadlock). It maintains an in-memory **lock table** — a linked list per item recording which transactions hold/wait for which modes. FIFO ordering guarantees **freedom from starvation**.

---

**Next:** the protocol that guarantees serializability — **two-phase locking**.
