---
subject: se
unit: 4
order: 3
slug: metrics-pitfalls-goodhart
title: Pitfalls of Metrics & Goodhart's Law
summary: The coverage paradox, confounding variables and correlation vs causation, why averages lie (use percentiles), and Goodhart's law on metrics-as-targets gone wrong.
minutes: 11
tags: [coverage-paradox, confounding, correlation, percentiles, goodharts-law]
---

# Pitfalls of Metrics & Goodhart's Law

## The Coverage Paradox

> [!NOTE]
> Research found only a **low-to-moderate correlation** between **code coverage** and **test effectiveness** *once test-suite size is controlled for*. Most studies ignored the **confounding influence of suite size**.

> [!INTUITION]
> The chain looks like: *more tests → higher coverage → better bug detection*. **BUT** it's **not the coverage % that catches bugs — it's having more diverse test cases.** Coverage is a **side effect, not the cause**. Chasing the coverage number directly misses the point.

## Confounding variables & correlation ≠ causation

> [!TRAP]
> A **confounding variable** secretly drives both things you're comparing. Looking only at *coffee → cancer* is misleading because **smoking** is a confounder (coffee drinkers smoked more). **Correlation ≠ causation.**

**Spurious correlations in software:**
- "More commits = more bugs" → commit less? **No!**
- "Longer functions = more bugs" → split everything? **Not always!**
- "More meetings = higher productivity" → meet 8 hours/day? **Please no!**

Always ask: **what is the confounding variable?**

## Averages lie — use percentiles

> [!EXAM]
> An API averaging **500 ms** sounds fine — but the distribution may be: 95% at 200 ms, 4% at 1000 ms, and **1% at 30,000 ms (timeout!)**. The average **hides** the disaster. **Always report percentiles (p50, p95, p99), not just the average.**

## Goodhart's Law

> [!NOTE]
> **Goodhart's Law:** *"When a measure becomes a target, it ceases to be a good measure."*

Once you reward people for a number, they **optimise the number** — often by gaming it rather than achieving the real goal.

| Example | Target | Result |
|---|---|---|
| **Wells Fargo** | New accounts opened (bonuses) | Employees opened **3.5 million fake accounts** → **$3 B** fines + brand damage |
| **Bug bounties** | Bugs fixed (pay per fix) | Developers **introduced bugs to fix later** |
| **Coverage mandate** | 100% code coverage required | Developers wrote **meaningless tests** that catch no bugs |

> [!TRAP]
> Tying developer bonuses to a single metric (**LOC/day**, low bug counts, coverage %) reliably produces **gaming**. Metrics should **inform** decisions, never become **blind targets**. The fix is usually team-based incentives and looking at multiple signals.

---

**Next:** a different facet of professional software — **the open-source ecosystem**.
