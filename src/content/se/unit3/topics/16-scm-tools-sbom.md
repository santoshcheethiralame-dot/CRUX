---
subject: se
unit: 3
order: 16
slug: scm-tools-sbom
title: SCM Tools & the Software Bill of Materials (SBOM)
summary: The four categories of SCM tools (source control, build, install, bug tracking), build tools Make and Maven, and the Software Bill of Materials for supply-chain security.
minutes: 13
tags: [SCM-tools, git, make, maven, bug-tracking, SBOM]
---

# SCM Tools & the Software Bill of Materials (SBOM)

## Four categories of SCM tools

**Source Code Administration · Software Build · Software Installation · Bug Tracking.**

### Source code administration
| Tool | Note |
|---|---|
| **RCS** | Very old, single-file version control |
| **CVS** | RCS-based; allows **concurrent working without locking**; web frontend |
| **ClearCase** | Multi-server; process modelling; policy checks |
| **GitHub** | Version control + project management; commits with unique IDs; **fork → change → pull request → merge** |

> [!INTUITION]
> The general GitHub contribution flow: **fork** a project → make changes → open a **pull request** → on **merge**, the changes since the last merge are computed and logged. PRs are where code review happens before code enters the shared branch.

### Software build tools
A **software build** transforms source (`.java/.c/.py` + configs/resources) into artifacts (`.exe/.jar/.war/.apk`) — the goal is **automation, consistency, repeatability** (defeats "it works on my machine"). Process: fetch source → compile → link → package → unit tests → reports → version artifact → store (Nexus/Artifactory) → notify.

- **Make / Makefile** (C/C++): defines **targets, dependencies, commands**. Variables like `CC = gcc`, `CFLAGS = -g`; automatic variables `$@` (target), `$^` (all deps), `$<` (first dep); `-c` compiles only, `-o` names the output (else `a.out`). A **`.PHONY: clean`** target removes generated files so builds are reproducible.
- **Maven** (Java): **convention-over-configuration** via a single `pom.xml`; enforces a standard layout (`src/main/java`, `src/test/java`, `target/`); handles compile/test/package/docs/distribution; supports parallel teams and generates reports.

> [!EXAM]
> **Make vs Maven:** Make is a general dependency-driven build tool (any language, explicit rules in a Makefile); Maven is a Java-focused tool using **convention over configuration** (`pom.xml`, standard directory layout). Both link a build to a specific commit for traceability.

### Software installation tools
**Bootstrapper** (small initial installer + delta updates) · **DeployMaster** (Windows, multi-version) · **WiX** (open-source MSI from XML) · **InstallShield** (commercial, cross-platform) · **Wise Installer** (Windows, silent install).

### Bug tracking tools
Centralised log/track/manage of defects with **audit trails**: **Bugzilla, FogBugz, Trac, Redmine, Jira, Backlog**. They support attachments, comments, workflows and notifications — far better than scattered emails/spreadsheets.

## Software Bill of Materials (SBOM)

> [!NOTE]
> A **Software Bill of Materials (SBOM)** is a formal, **machine-readable inventory** of every component, library and module in a software product — like a manufacturing "parts list." It records each ingredient's **name, version, supplier, license, checksum and dependencies**.

**Why it matters:**
| Benefit | Example |
|---|---|
| **Security** | When **Log4Shell** is disclosed, an SBOM instantly reveals whether the vulnerable `log4j 2.14.1` is present → proactive patching |
| **Compliance & licensing** | Track open-source licenses (GPL, MIT, Apache) to avoid incompatible/restrictive ones |
| **Traceability & audit** | Answer "which version of libxyz are we using?" / "when was it introduced?" |

> [!EXAM]
> **SBOM standards:** **SPDX** (Linux Foundation, widely adopted) · **CycloneDX** (OWASP, security-focused) · **SWID** (ISO). **Tools:** **Syft** (`syft myapp:latest -o cyclonedx-json`), **Trivy** (scans containers + outputs SBOMs), **OWASP Dependency-Check**, and **GitHub Actions** (auto-generates SBOMs in CI/CD).

> [!INTUITION]
> An SBOM is **supply-chain transparency.** When the next critical CVE drops, the question "are we affected?" goes from a frantic week-long audit to a one-second lookup — *if* you've been generating SBOMs all along.

---

**You've finished Unit 3.** The arc: *build AI-powered & AI-based systems* (AI4SE/SE4AI, MLOps) → *write quality code* (standards, reviews, static analysis) → *automate delivery* (CI/CD, DevOps, DevSecOps) → *verify rigorously* (testing principles, techniques, levels, performance/chaos) → *control change* (SCM, versioning, change/release/defect management, SBOM). Hit the **quizzes** and **flashcards** to lock it in.
