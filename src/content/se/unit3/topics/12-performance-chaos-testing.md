---
subject: se
unit: 3
order: 12
slug: performance-chaos-testing
title: Performance, Soak & Chaos Testing
summary: Testing for performance bugs (profiling vs tracing), soak/endurance testing, chaos engineering (Netflix Chaos Monkey, the principles and tools), and static vs dynamic testing with fault-based techniques.
minutes: 14
tags: [performance-testing, soak-testing, chaos-engineering, profiling, mutation-testing]
---

# Performance, Soak & Chaos Testing

## Performance testing

> [!NOTE]
> **Performance testing** finds **performance bugs** (not functional ones): unexpected slowness, **degradation over time**, and platform/version differences (fast on the dev machine, slow in prod).

Performance bugs are **"bad" bugs** — they don't crash, don't give wrong results, and have no error message; they're just **slow** and hard to diagnose.

- **Performance regression testing** — log execution times each build, compare trends; **fail the build if >5% slower** in CI (an upward trend = a regression).
- **Profiling vs Tracing:** **Profiling** measures code performance to find **CPU/memory bottlenecks** (VisualVM, JProfiler, cProfile, py-spy); **Tracing** tracks the **execution flow / call sequence** (find deadlocks).
- **Instrumentation** — embed monitoring code (static at source, or dynamic at runtime); adds overhead → use in a test environment only.

> [!TRAP]
> **Disney+ launch:** they load-tested **video streaming**, but the real bottlenecks were **account creation** (DB locks), **login** (auth overload) and **browsing old titles** (cache-miss storm). Lesson: **stress the right paths** — test where real users actually load the system, not just the obvious feature.

## Soak (Endurance) Testing

> [!NOTE]
> **Soak testing** runs the system under significant load for an **extended period** (**8–72 hours at 70–80% load**) to find issues that only appear over time: **memory leaks, connection leaks, thread-pool exhaustion**.

> [!INTUITION]
> A 1 MB/hour memory leak is invisible in a 5-minute test — but after **100 hours** it's an out-of-memory crash. Soak testing is how you catch the slow killers that short bursts never reveal.

## Chaos Engineering

> [!NOTE]
> **Chaos Engineering** purposefully **breaks components in production** to observe, learn and improve resilience — *"break things on purpose to make them unbreakable"* — with the **blast radius minimized**.

**Principles (Chaos Manifesto):** build a hypothesis around steady-state behaviour → vary real-world events → run experiments **in production** → automate to run continuously → **minimize blast radius**.

> [!EXAM]
> **Netflix's Chaos Monkey** randomly kills AWS instances **during business hours**, forcing resilience by design; the key metric **Stream Starts per Second (SPS)** stays flat — *"99.99% availability not by luck, but by surviving daily chaos."* Tools: **Chaos Monkey** (kill instances), **Latency Monkey** (network delay), **Chaos Mesh** (Kubernetes), **Gremlin** (enterprise).

> [!INTUITION]
> Google's chaos experiments revealed **hidden dependencies** — cutting the São Paulo network unexpectedly took down Mexico links too. *"Dependencies are invisible until broken."* Chaos engineering surfaces failure modes you'd never find in a test lab. **Use it for** large distributed, cloud-native, high-availability systems — **not** monoliths or third-party SaaS.

## Static & Dynamic testing; fault-based techniques

> [!NOTE]
> **Static testing = "Verification"** (analyse without executing — reviews, walkthroughs, inspections, static analysis: data flow, control flow, cyclomatic complexity). **Dynamic testing = "Validation"** (run the system: input → output → compare to expected).

| Aspect | Static | Dynamic |
|---|---|---|
| Execution | No | Yes |
| Timing | Early (design/coding) | Later (execution) |
| Cost to fix | **Low** | **High** |
| Goal | **Prevent** defects | **Detect** defects |

**Fault-based techniques:**
- **Error Guessing** — use experience/intuition to find likely defects (e.g. guess SQL injection in login).
- **Fault Seeding** — deliberately inject faults (unknown to testers) to **calibrate** the test process's effectiveness.
- **Mutation Testing** — mutate source statements; check the tests **catch** them — **all mutants should fail**, proving the test suite is robust.

> [!TRAP]
> **Fault seeding vs mutation testing** sound alike but differ: **fault seeding** measures *how good your testing process is* (what fraction of seeded faults do testers find?); **mutation testing** measures *how good your test suite is* (do the tests kill the mutants?). Both inject faults; the *thing being evaluated* differs.

---

**Next:** controlling everything that changes — **Software Configuration Management**.
