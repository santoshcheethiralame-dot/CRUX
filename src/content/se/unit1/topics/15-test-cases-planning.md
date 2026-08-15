---
subject: se
unit: 1
order: 15
slug: test-cases-planning
title: Test Cases, Test Planning & Security Validation
summary: Anatomy of a test case, the test plan and its IEEE 829 structure, the test-planning steps, adequacy/coverage criteria, tester mindsets, defect metrics, and security validation planning.
minutes: 15
tags: [test-case, test-plan, IEEE-829, coverage, metrics, security-validation]
---

# Test Cases, Test Planning & Security Validation

## Anatomy of a test case

A **test case** is a set of conditions and inputs designed to verify one specific behaviour. A well-formed test case has a standard format:

| Field | Meaning |
|---|---|
| **Test Case ID** | Unique identifier (traces to a requirement via the RTM). |
| **Description / Objective** | What this test checks. |
| **Preconditions** | State that must hold before running. |
| **Test data / Inputs** | The exact inputs to supply. |
| **Test steps** | The ordered actions to perform. |
| **Expected result** | What *should* happen (the oracle). |
| **Actual result** | What *did* happen (filled at run time). |
| **Status** | Pass / Fail. |
| **Postconditions** | State after running. |

> [!EXAM]
> The two fields that make a test case meaningful are **inputs/steps** and the **expected result**. Without a predefined **expected result** (the "oracle"), you cannot tell pass from fail — a common exam point.

[!INTUITION] A test case is a tiny experiment: *given these preconditions and inputs, I predict this output.* Running it either confirms the prediction (pass) or exposes a defect (fail). The prediction must be written **before** you run it.

## The test plan

> [!NOTE]
> A **test plan** is the master document that describes the **scope, approach, resources and schedule** of testing activities. It defines **what** will be tested, **how**, **by whom**, **when**, and the **pass/fail criteria**.

### IEEE 829 test-plan structure (table of contents)

The **IEEE 829** standard gives the canonical test-plan contents:

1. **Test plan identifier**
2. **Introduction** (scope & objectives)
3. **Test items** (what's being tested)
4. **Features to be tested** / **Features *not* to be tested**
5. **Approach** (the overall testing strategy)
6. **Item pass/fail criteria**
7. **Suspension & resumption criteria**
8. **Test deliverables**
9. **Testing tasks / environment**
10. **Responsibilities, staffing & training**
11. **Schedule**
12. **Risks and contingencies**
13. **Approvals**

> [!EXAM]
> Know that the test plan follows **IEEE 829**, and that it must state **features to be tested *and* not to be tested**, **pass/fail criteria**, and **suspension/resumption** criteria. These three are favourite "what does a test plan contain?" answers.

## The test-planning steps

A practical test-planning process (the "9 steps" flavour):

1. **Analyse the product / requirements** — understand what's being tested (use the SRS).
2. **Design the test strategy** — scope, levels, types, automation vs manual.
3. **Define objectives** — what testing must achieve.
4. **Define test criteria** — pass/fail and **suspension/resumption** criteria.
5. **Plan resources** — people, environment, tools, data.
6. **Set up the test environment** — hardware/software to run tests on.
7. **Schedule & estimate** — timeline and effort.
8. **Determine deliverables** — test cases, scripts, reports.
9. **Define exit criteria** — when is testing "done enough"?

## Test adequacy / coverage criteria — "when is testing enough?"

You can never test *everything* (exhaustive testing is impossible). **Adequacy criteria** decide when you've tested *enough*:

| Coverage criterion | "Done when…" |
|---|---|
| **Statement coverage** | every statement has been executed at least once. |
| **Branch / decision coverage** | every branch (true & false of each decision) has been taken. |
| **Path coverage** | every independent path through the code has been executed. |
| **Condition coverage** | every boolean sub-condition has been both true and false. |
| **Requirements coverage** | every requirement has at least one test (via the RTM). |

> [!TRAP]
> **100% statement coverage ≠ bug-free.** Coverage tells you what code you *ran*, not whether the outputs were *correct* or whether *missing* code (a missing requirement) exists. High coverage is necessary, not sufficient. Branch coverage is stronger than statement coverage.

## The tester's mindset

- A **developer's** mindset is **constructive** — make it work.
- A **tester's** mindset is **destructive (in a good way)** — try to **break** it; assume defects exist and hunt them.
- **Pesticide paradox** — running the same tests repeatedly stops finding new bugs; tests must be revised.
- **Defect clustering** — a small number of modules usually contain most defects (Pareto).
- Testing should be done by an **independent** team where possible (developers are blind to their own assumptions).

## Defect metrics

How testing quality is measured:

| Metric | Meaning |
|---|---|
| **Defect density** | **Defects / KLOC** (defects per 1000 lines of code) — or per function point. |
| **Issues per KLOC** | Common normalised quality measure across modules/releases. |
| **Defect Removal Efficiency (DRE)** | defects found *before* release ÷ total defects (before + after release). |
| **Test coverage %** | proportion of code/requirements exercised. |
| **MTTF / MTBF** | mean time to / between failures (reliability). |

> [!EXAM]
> **Defect density = number of defects / size (KLOC or FP).** Normalising by size lets you compare quality across modules/releases of different sizes — a frequent numeric question.

## Security Validation Planning

Security needs its **own** validation plan because attackers are adversarial and "shall not" properties are hard to test. Security validation activities:

| Activity | What it does |
|---|---|
| **Security test cases** | Derived from the **security requirements** (Topic 9) and threat model — incl. **abuse/misuse cases** ("what an attacker does"). |
| **Penetration testing (pen-testing)** | Authorised simulated attacks to find exploitable vulnerabilities. |
| **Vulnerability scanning** | Automated scans against known-vulnerability databases (CVEs). |
| **Static analysis (SAST)** | Inspect source for insecure patterns *without* running it. |
| **Dynamic analysis (DAST) / Fuzzing** | Feed malformed/random inputs to a running system to trigger crashes. |
| **Risk-based prioritisation** | Test the highest-risk assets/threats first (from the risk assessment). |

> [!INTUITION]
> Ordinary testing asks *"does it do what it should?"* Security validation also asks *"can it be **made to do what it shouldn't**?"* — so it adds **misuse cases**, **pen-testing** and **fuzzing** on top of normal V&V. This closes the loop back to the **SecDLC** "shift-left" principle from Topic 4.

> [!EXAM]
> Link the chain end-to-end: a **security requirement** (Topic 9) → a **security test case / misuse case** → verified by **pen-testing / fuzzing** → tracked in the **RTM** (Topic 10). Examiners love a question that spans requirements *to* validation.

---

**You've finished Unit 1.** You now have the full arc: *what software engineering is* → *how we organise building it (SDLCs, agile)* → *how we discover & specify requirements (RE, FR/NFR, security, SRS, UML)* → *how we verify & validate (testing, planning, security validation)*. Hit the **quizzes** and **flashcards** to lock it in.
