---
subject: se
unit: 3
order: 14
slug: scm-activities
title: SCM Activities — CIs, Baselines & Branching
summary: Configuration item identification, the three SCM directories, baselines and how to create them, branch models (trunk-based, Gitflow, hotfix), and version management with semantic versioning.
minutes: 13
tags: [configuration-items, directories, baselines, branching, gitflow, semantic-versioning]
---

# SCM Activities — CIs, Baselines & Branching

## 1. Configuration Item (CI) identification

> [!NOTE]
> A **Configuration Item (CI)** is any artifact placed under SCM control. The typical rule: put **anything needed to reproduce the product** under SCM.

**Include:** source code, build scripts, dependency manifests, test data, infrastructure-as-code, SQL migration scripts, behaviour-affecting documentation.
**Avoid:** transient files (IDE caches, generated logs) unless essential for traceability.

> [!EXAM]
> The decision checklist for a CI: **(1)** Is it needed to recreate the product? **(2)** Will multiple people change it? **(3)** Is it required for legal/compliance/audit? If yes → it's a CI.

## 2. The three SCM directories

| Directory | Nature | Purpose |
|---|---|---|
| **Programmer Directory** | Dynamic | Each developer's active working copy (keep clean via `.gitignore`) |
| **Software Repository** | Static | Historical storage of released baselines/artifacts (use Nexus/Artifactory for binaries) |
| **Master Directory** | Controlled | Authoritative production-ready baselines; restricted access, signed tags + checksums |

## 3. Baselines

> [!NOTE]
> A **baseline** is an agreed, **frozen snapshot** of CIs. Types: **Functional baseline** (design/requirements), **Development baseline** (internal integration snapshot), **Release baseline** (final tested & accepted version).

**How to create a baseline:**
1. Ensure all CIs are committed and **tagged** in the VCS.
2. Run a **clean build** from the tagged commit.
3. Run the **full verification suite** (unit, integration, security scans).
4. Produce **signed artifacts**, store in master.
5. Publish baseline metadata (changelog, **SBOM**, test results).

> [!INTUITION]
> A baseline is a "known-good save point." Once frozen, every change is measured against it, and you can always **roll back** to it. Changing a baseline must go through **formal change control** (emergency fixes via hotfix branches with CCB approval).

## 4. Branch management

> [!NOTE]
> **Branch** when you need isolation: large features, release stabilization, or customer-specific customization. Document branch lifetime, owner, and merge-back expectations.

| Model | How it works |
|---|---|
| **Trunk-based** | Single main branch + **short-lived** feature branches — promotes continuous integration |
| **Gitflow** | Separate **feature / release / hotfix** branches — clear cycles, but more merge overhead |
| **Release-per-customer** | Long-lived branches for each customer's customization |

**Merging guidance:** merge **small and often** · rebase feature branches on main frequently · use PRs + mandatory reviews.

> [!EXAM]
> **Hotfix workflow:** a critical production bug → branch from the **release tag** → fix & quick-test → merge into the **release branch** *and* into **main** (forward-port) so the fix isn't lost in the next release.

## 5. Version management

> [!NOTE]
> **Version management** tracks multiple versions/revisions. Use **semantic versioning — MAJOR.MINOR.PATCH** — plus branching/merging, **tagging** (e.g. `v1.2.0`), and archiving.

> [!INTUITION]
> **Semantic versioning** tells users what changed: bump **MAJOR** for breaking changes, **MINOR** for backward-compatible features, **PATCH** for backward-compatible bug fixes. *e.g.* `v2.0.0` ships new (breaking) APIs while `v1.5.2` stays supported for old clients — both coexist via branching.

---

**Next:** governing change end-to-end — **change, release & defect management**.
