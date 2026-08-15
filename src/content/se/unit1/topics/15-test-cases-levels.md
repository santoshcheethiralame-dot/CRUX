---
subject: se
unit: 1
order: 15
slug: test-cases-levels
title: Test Cases & Levels of Testing
summary: What a test case is and why a failing test has three possible causes, the full test-case documentation format field by field, test suites, and the four levels of testing with the class of defect each one alone can catch.
minutes: 11
tags: [test-case, test-suite, triage, preconditions, expected-results, unit-testing, integration, system-testing, acceptance]
---

# Test Cases & Levels of Testing

## What a test case is

> [!EXAM]
> **Test cases define how to test a system, software or an application. A test case is a singular set of actions or instructions for a tester to perform that validates a specific aspect of a product or application functionality.** If the test fails, the result **might be a software defect that the organization can triage.**
>
> - **A tester or QA professional typically writes test cases**, which are **run after the completion of a feature or the group of features that make up the release**.
> - **Test cases also confirm whether the product meets its software requirements.**
> - **A group of test cases is organized in a test suite**, which **tests a logical segment of the application**, such as a specific feature.

> [!TRAP]
> **"If the test fails, the result *might* be a software defect."** The hedge is deliberate and it is examinable.
>
> A failing test has **three** possible causes, not one:
> 1. The **software** is wrong — a genuine defect.
> 2. The **test** is wrong — a bad expected result, or a broken fixture.
> 3. The **requirement** is wrong or has changed, so the test now encodes an obsolete expectation.
>
> This is why the sentence says *triage* rather than *fix*. **Triage is the act of deciding which of the three it is** before anyone touches code — and it appears as *"Bug Triage"* in the standard test plan contents.

> [!INTUITION]
> **"Validates a specific aspect"** — singular — is the test-case equivalent of the **Concise** property of a requirement from the elicitation topic.
>
> A test asserting five unrelated things gives you one bit of information when it fails: *something* broke. A test asserting one thing tells you **exactly** what broke. **The diagnostic value of a test suite comes from its granularity, not its size.**

## Test case format

> [!EXAM]
> **Test case documentation typically includes all the pertinent information to run and collect data from the test.** While the specific format might differ between organizations, most include:
>
> | Field | Detail |
> |---|---|
> | **Module name** | The module or feature under test |
> | **Test ID and/or name** | A **unique identifier** that should **follow a standard naming convention** |
> | **Tester name** | The person conducting the test |
> | **Test data** | The dataset(s) to use for the test |
> | **Assumptions or preconditions** | Steps that must be accomplished prior to testing, or what can be assumed — e.g. *"after a successful login"* |
> | **Test priority** | Whether the test is **low, medium or high** priority |
> | **Test scenarios** | **The high-level action from which the test case derives** |
> | **Testing environment** | The name and/or characteristics of the environment for testing |
> | **Testing steps** | The steps for the tester to follow **in the desired order** |
> | **Expected results** | The output you **expect** to receive from the system |
> | **Actual results** | The output you **actually** receive |
> | **Pass/fail determination** | **If actual matches expected, the test passes. If not, it fails** |

> [!DERIVE]
> **The format is built around one comparison.** Strip away the administration and a test case is:
>
> $$\textbf{preconditions} + \textbf{steps} + \textbf{data} \;\longrightarrow\; \textbf{actual} \;\;\text{vs}\;\; \textbf{expected}$$
>
> Everything else exists to make that comparison **reproducible and attributable**. The **Test ID** lets the RTM link it to a requirement; the **environment** and **test data** let someone else reproduce the result; the **tester name** says who to ask.
>
> **Expected results must be written *before* execution.** Recording what the system did and calling it expected is not a test — it is a description. This is the same discipline TDD enforces by writing the test first.

> [!TRAP]
> **Preconditions are the field most often left blank and the most common cause of unreproducible failures.** *"After a successful login"* is exactly the sort of state that the test author has and the next person does not.
>
> A test that passes on one machine and fails on another almost always differs in **preconditions or environment**, not in the steps.

> [!INTUITION]
> Note that **Test ID** is required to *"follow a standard naming convention"* rather than merely be unique.
>
> A convention lets you find every test for a module without a database — and it is what makes the **RTM's** four test columns fillable. Recall those columns: *Unit Test ID, Functional Test ID, System Test ID, Acceptance Test ID*. Each of them is a test case ID from this format, which is how a requirement is traced all the way to the evidence that it works.

## Levels of testing

> [!EXAM]
> The deck's four-step staircase:
>
> | # | Level | Tests |
> |---|---|---|
> | **1** | **Unit Testing** | **Test the individual component** — verifies proper functioning of the individual unit |
> | **2** | **Integration Testing** | **Test integrated components** — focuses on **finding interface errors between components**, and bugs **not identified during unit testing** |
> | **3** | **System Testing** | **Test the entire system** — assessment of the entire system behavior; information helps **direct product release**; discovers **bugs that cannot be attributed to a single component** |
> | **4** | **Acceptance Testing** | **Test the final system** — done by **system providers/users/customers**; **determines if the system meets the needs** |

> [!DERIVE]
> **Each level catches a class of defect the one below it structurally cannot.** This is the argument for having four levels rather than just testing the finished system.
>
> - A **unit** test cannot find an **interface** mismatch, because it only ever sees one side of the interface. Two components can each be perfectly correct and still disagree about units, ordering or null handling.
> - An **integration** test cannot find an **emergent** system property — throughput collapsing under real load, or a deadlock that needs three subsystems and real timing to appear.
> - A **system** test cannot find that you built **the wrong thing**, because it checks the system against **the specification** — and if the specification was wrong, the system passes.
>
> Only **acceptance testing**, run **by the customer**, answers Boehm's validation question: *are we building the right product?*

> [!INTUITION]
> Look at **who performs** each level: developers → testers → the test team → **the customer**.
>
> **The levels move outward from the code and outward from the team.** That is not incidental — it is why the last level is the only one that can catch a bad specification. Everyone inside the project shares the same assumptions about what was being built; only someone outside it can notice those assumptions were wrong.
>
> The same widening applies to what is under test: one component, then connected components, then the whole system, then the system in its real context of use.

> [!TRAP]
> Do not confuse **levels** with **types**. The previous topic's categorisation tree listed *Levels (lifecycle) of testing types* as **one axis among four**, alongside functional/structural, static/dynamic, and manual/automatic.
>
> A single test can sit on all four axes at once — a **system**-level, **functional**, **dynamic**, **automated** test. Exam questions asking you to "classify" a test usually want more than one axis, and answering with only the level is an incomplete answer.

> [!EXAM]
> Each level maps onto a phase of the **V-model** from the process-models topic, and the test cases for a level are **drafted during the corresponding phase**, not at the end:
>
> | Phase | Test cases produced |
> |---|---|
> | **Feasibility** | **acceptance** test cases |
> | **Requirements** | **functional and system** test cases |
> | **Architecture/Design** | refined functional and system cases, plus **integration** test cases |
> | **Implementation** | **code unit** test cases |
> | **Maintenance** | **regression** and other tests |

---

**Next:** deciding how much testing to do and how to organise it — **test planning & security validation**.
