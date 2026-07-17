---
subject: dbms
unit: 4
order: 4
slug: concurrency-problems
title: Concurrency Control & The Four Problems
summary: Why concurrency is needed, and the four anomalies of uncontrolled interleaving — lost update, dirty read, incorrect summary, and unrepeatable read.
minutes: 11
tags: [concurrency-control, lost-update, dirty-read, incorrect-summary, unrepeatable-read]
---

# Concurrency Control & The Four Problems

**Concurrency control** manages simultaneous transactions to preserve atomicity, isolation, consistency, and **serializability**.

## Why allow concurrency?
Running transactions **serially** (one fully, then the next) is always safe but wastes the CPU and disk. Concurrency gives **improved throughput & resource utilisation** and **reduced waiting time** — at the cost of these anomalies if interleaving is uncontrolled.

## The four problems

> [!EXAM]
> Memorise all four (the classic exam list), with a starting value of X:

| Problem | What happens |
|---|---|
| **Lost Update** | Two transactions interleave so that one's write **overwrites** the other's. T1 computes X−2 (uncommitted), T2 reads the *old* X and writes X+3 — when T1 writes back, T2's update is **lost**. |
| **Dirty Read (Temporary Update)** | T2 reads an **uncommitted** value written by T1; T1 then **rolls back**, so T2 used data that never validly existed. |
| **Incorrect Summary** | T2 computes an **aggregate** (sum/avg) while T1 updates items mid-scan, so the result mixes old and new values and is wrong. |
| **Unrepeatable Read** | T reads the same item **twice**; another transaction changes it in between, so T gets two different values. |

```text
Lost Update (X starts at 5):
  T1: read(X)=5;  X := X−2 (=3) ............ write(X)=3   ← overwritten/lost
  T2: ........... read(X)=5; X := X+3 (=8); write(X)=8
  Final X = 8, but the −2 update vanished.
```

> [!INTUITION]
> All four anomalies come from **uncontrolled interleaving** of reads and writes on shared items — a transaction sees or overwrites another's half-finished work. The cure is a concurrency-control scheme (isolation levels, **locking**, snapshot isolation) that only permits **serializable** interleavings.

> [!TRAP]
> Distinguish **dirty read** (reads *uncommitted* data that may be rolled back) from **unrepeatable read** (reads *committed* data that changes between two reads). Both involve re-reading, but the first is about uncommitted data, the second about a committed update landing mid-transaction.

---

**Next:** the tunable trade-off — **isolation levels**.
