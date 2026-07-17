---
subject: dbms
unit: 4
order: 3
slug: transaction-states
title: Transaction States & the System Log
summary: The transaction state-transition diagram (active, partially committed, committed, failed, aborted, terminated), the commit point, and the role of the system log in recovery.
minutes: 9
tags: [transaction-states, commit-point, system-log, abort, rollback]
---

# Transaction States & the System Log

A transaction passes through a sequence of **states** during execution:

```text
            ┌──────────────► partially committed ───► committed
            │                        │ (checks fail)
  active ───┤                        ▼
            └────────► failed ◄───────────────  (abort during active)
                          │
                          ▼
                       aborted ───► terminated
```

| State | Meaning |
|---|---|
| **Active** | the initial state; executes READ and WRITE operations |
| **Partially committed** | after the final operation; concurrency-control & recovery **checks run here** |
| **Committed** | checks passed → reached its **commit point**; changes are now permanent (survive crashes) |
| **Failed** | a check failed, or the transaction was **aborted** during the active state |
| **Aborted** | rolled back; the database is restored to its pre-transaction state |
| **Terminated** | the transaction leaves the system |

> [!EXAM]
> The **commit point** is the moment a transaction reaches the **committed** state — after which **durability** guarantees its changes persist. Before the commit point (active / partially committed), the transaction can still be rolled back.

## Restart vs kill (after an abort)
- **Restart** — if the abort was due to an *external* cause (hardware/system error), the transaction is re-run as a **brand-new transaction**.
- **Kill** — if the abort was due to an *internal* logic error or bad input, it is abandoned (it would just fail again).

## The system log
The **log** is a sequential file (on disk) recording every database write: `[transaction_id, item, old_value, new_value]`, plus `start`, `commit`, and `abort` records.

> [!INTUITION]
> The log is what makes the state diagram safe across crashes: at recovery, the system reads the log and **undoes** transactions that never reached `commit`, while **redoing** committed ones whose writes may not have hit disk. Commit/abort records mark which is which.

## Schedule recoverability (a peek ahead)
Schedules are classified by how safely they recover (Elmasri Ch.20):
- **Recoverable** — a transaction commits only *after* every transaction it read from has committed (a committed transaction is never later undone).
- **Cascadeless** — transactions read only **committed** values → aborts never cascade.
- **Strict** — transactions read/write an item only after the last writer committed/aborted → simplest recovery (just restore old values).

---

**Next:** what goes wrong without control — the **concurrency problems**.
