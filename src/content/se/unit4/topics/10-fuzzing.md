---
subject: se
unit: 4
order: 10
slug: fuzzing
title: Security Testing — Fuzzing
summary: What fuzzing is, the types of fuzzers (mutation/generation, white/gray/black-box), the coverage-guided process, its value, open-source tools, case studies, and how it complements pentesting.
minutes: 12
tags: [fuzzing, security, AFL, coverage-guided, OSS-fuzz, dynamic-analysis]
---

# Security Testing — Fuzzing

## Overview

> [!NOTE]
> **Fuzzing** is automated **dynamic** testing that feeds a program **random, malformed, or unexpected inputs** to trigger crashes, assertion failures, or memory errors that might be **security vulnerabilities**.

The key idea: let a fuzzer generate **thousands to millions** of test cases (often continuously) and watch for faults that manual, fixed test suites miss — especially in **low-level code** (C/C++ memory errors) and **poorly-validated parsers**.

## Types of fuzzers

| Type | How it generates inputs |
|---|---|
| **Mutation-based** | Start from valid sample inputs and **modify** them (flip bits, alter lengths) |
| **Generation-based** | Use a **model/grammar** of the input format to build inputs from scratch |
| **White-box** | Full knowledge of the target — uses symbolic execution / instrumentation |
| **Gray-box** | Uses **feedback** (e.g. code coverage) with limited instrumentation |
| **Black-box** | No knowledge — treats the program as an external interface, purely random |

> [!INTUITION]
> Fuzzers sit on a spectrum of "intelligence": a **dumb** fuzzer throws random bytes; a **smart** one produces syntactically valid, interesting inputs. The biggest modern advance is **coverage-guided (gray-box)** fuzzing.

## The process

1. **Input Generation** — produce test cases (mutate seeds or generate new data).
2. **Program Execution** — feed each input to the target, run under a monitor (often **AddressSanitizer**).
3. **Monitoring/Analysis** — watch for crashes, hangs, leaks, assertion failures; log the offending inputs.
4. **Feedback-Driven Loop** — **coverage-guided** fuzzers (AFL, libFuzzer) *favour* inputs that exercise **new code paths** and mutate those further.

> [!EXAM]
> The defining feature of modern fuzzers is the **coverage-guided feedback loop**: inputs that hit **new branches** are kept and mutated, steering the fuzzer deeper into the code automatically.

## Value, tools & cases

**Value:** uncovers deep memory-safety bugs invisible to review; broadly applicable (libraries, parsers, servers, kernels); **continuous** (Google's **OSS-Fuzz** found ~10,000 bugs); **complements pentesting** (low-level code paths vs high-level behaviour).

**Open-source tools:** **AFL/AFL++**, **libFuzzer** (LLVM), **Honggfuzz**, **Syzkaller** (Linux kernel), **Radamsa**, **Hypothesis** (Python property-based).

> [!INTUITION]
> Real impact: Mozilla's fuzzers found **20 vulnerabilities** in Firefox 102/103 before shipping; Google's OSS-Fuzz found the **OpenSSL 2022** Punycode buffer overflows (CVE-2022-3602/3786); **Syzkaller** has found thousands of Linux-kernel bugs. Even mature, critical software still benefits — many companies now run fuzzing **in CI**.

> [!TRAP]
> **Pentesting vs Fuzzing** are *complementary*, not interchangeable. **Pentesting** simulates an attacker exploring **network/app-level** vulnerabilities (manual + targeted). **Fuzzing** aggressively bombards **low-level code** with many inputs (automated + broad). A secure process uses **both**.

---

**Next:** the threats those tests defend against — **network security & attacks**.
