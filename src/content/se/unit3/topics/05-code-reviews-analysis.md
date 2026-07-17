---
subject: se
unit: 3
order: 5
slug: code-reviews-analysis
title: Code Reviews & Static Analysis
summary: Why code reviews are the highest-impact defect-detection practice (with the empirical data and industry practices), software comprehension, and static vs dynamic analysis with its tools.
minutes: 13
tags: [code-review, static-analysis, dynamic-analysis, linters, comprehension]
---

# Code Reviews & Static Analysis

## The central role of code reviews

> [!NOTE]
> A **code review** is a constructive critique of a developer's code by a team member — a required **sign-off step** before code is checked in at many organisations.

**Value:** early defect detection (cheaper to fix) · team collaboration & shared understanding · accountability & quality · **knowledge sharing** (juniors learn from seniors).

### The empirical data
> [!EXAM]
> Code reviews are **more effective than testing** at finding defects:
> - Design/code **inspections detect 55–60%** of defects, vs **integration testing 45%** and **unit testing 25%** (some studies cite **60–90%** for reviews).
> - Teams using reviews averaged **0.82 errors / 100 LOC** vs **4.5** without.
> - After **AT&T** introduced reviews: **+14% productivity** and **−90% defects**.

### Industry practices
- **Google:** all submitted code reviewed by **≥1 other person**.
- **Yelp:** Review Board with asynchronous **inline comments**; a **"Ship It!"** is required to merge.
- **Facebook:** the submitter must **address all requested changes** before merging.

> [!INTUITION]
> Reviews come in two flavours: **holistic** (big-picture, architectural) and **incremental** (per change). A good pull request is written for the reviewer — small, focused, well-described, "think like a reviewer."

## Software comprehension ("archaeology")

Understanding a large codebase is **software archaeology** — you can't grasp it all at once, so build a **working model**.
- **Expert vs novice:** experts go **top-down**, recognising patterns and forming hypotheses; novices read line-by-line by trial-and-error.
- **Practical first steps:** read `README.md` → clone → **build & run** → use a **debugger** to trace execution → **search for key constants** (strings, error codes) to locate relevant code.

## Static vs Dynamic analysis

| Aspect | **Static Analysis** | **Dynamic Analysis** |
|---|---|---|
| Requirement | Source code only | Successful build + test inputs |
| Method | Reasons about **all** possible paths, **no execution** | Observes **individual executions** |
| Findings | May contain **false positives** | Problems are **real** (witnessed) |
| Coverage | All warnings of a problem class | Only what's seen — **false negatives** |

> [!EXAM]
> **Static analysis = no execution, may give false positives, finds all of a class.** **Dynamic analysis = executes, findings are real but limited to what test inputs exercise (false negatives).** The best QA strategy **combines both**.

### Static analysis tools
A good tool is **fast**, reports **few false positives**, and gives **informative messages** — ideal for **CI pipelines**:
- **Linters** — shallow syntax analysis for style, formatting, naming.
- **Pattern-based bug detectors** — syntax/API rules for common mistakes (correctness, performance, security, multithreading).
- **Type-annotation validators** — check user-defined types (e.g. "Nullable") to prevent null-pointer errors.

> [!TRAP]
> Type/static checking catches real disasters: **NASA's Mars Climate Orbiter** ($327 million) was lost to an **undetected unit mismatch** (pound-force vs newton) — exactly the kind of error stronger typing/static analysis is designed to catch.

---

**Next:** automating the path from commit to production — **CI/CD pipelines**.
