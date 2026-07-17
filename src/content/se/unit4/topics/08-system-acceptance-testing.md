---
subject: se
unit: 4
order: 8
slug: system-acceptance-testing
title: System & Acceptance Testing
summary: System testing and its many types (smoke, load vs stress, recovery…), acceptance testing and its categories, regression testing, release vs system testing, and performance testing.
minutes: 13
tags: [system-testing, acceptance-testing, load-stress, regression, release-testing]
---

# System & Acceptance Testing

## System testing

> [!NOTE]
> **System testing** tests the completely integrated system against the **Software Requirements Specification (SRS)**. It is **black-box**, end-to-end testing of the whole application.

**Process:** test-environment setup → create test cases → create test data → execute → defect reporting & logging.

### The many types of system testing
**Smoke/sanity** (is the build fit for further testing?), **performance**, **functional vs non-functional**, **recovery** (restart after disaster), **destructive**, **installation**, **usability**, **cloud**, **localization**, **compliance**, **scalability**, **boundary**, **regression**, **startup/shutdown**, **platform**, **load**, **stress**, **security**.

> [!EXAM]
> **Load vs Stress testing** — the classic discriminator. **Load** applies the *expected* load to see how the system performs under normal/above-average use. **Stress** applies *extreme* load to find the **breaking point** (where it fails due to high traffic).

> [!INTUITION]
> **Smoke testing** comes from hardware: power on a new board and see if it *literally* smokes. In software it's a quick check that the build's core functions work — deciding whether it's even worth running the full test suite.

## Acceptance testing

> [!NOTE]
> **Acceptance testing** runs a suite exercising the users' operating conditions, created **collaboratively** (customers, business analysts, testers, developers). It verifies the completeness of a **user story** and is the **final quality gateway** before release.

| Category | Meaning |
|---|---|
| **Acceptance / qualification** | Checks behaviour against the customer's requirements |
| **Installation** | Verifies installation in the deployment environment |
| **Alpha & beta** | Small representative-user trials — in-house (**alpha**) or external (**beta**); often *uncontrolled* |
| **Performance** | Verifies performance requirements (capacity, response time); volume testing tries internal limits |

## Regression, release & performance testing

- **Regression testing** — verify that changes have **not broken** previously working code. **Automate** it (re-run all tests; they must pass **before committing**).
- **Release vs System testing:**

| | **System testing** | **Release testing** |
|---|---|---|
| By | Development team | **Separate team** (not involved in development) |
| Goal | Find defects (**defect testing**) | Show it meets requirements / good enough for external use (**validation testing**) |

- **Performance testing** — tests emergent properties (performance, reliability); steadily increase load until performance is **unacceptable**. **Stress testing** is performance testing where the system is **deliberately overloaded** to test its failure behaviour.

> [!TRAP]
> **Release testing ≠ system testing**, even though release testing *is a form of* system testing. The difference is **who** (an independent team) and **why** (validation — "is it good enough to ship?" — not defect-hunting).

---

**Next:** testing for attackers — **penetration testing**.
