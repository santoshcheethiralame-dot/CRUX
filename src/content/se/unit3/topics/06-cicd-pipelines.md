---
subject: se
unit: 3
order: 6
slug: cicd-pipelines
title: CI/CD Pipelines & Continuous Integration
summary: The developer's post-coding tasks and why they must be automated, the CI/CD pipeline stages and history, build systems and the DAG, and the pros and cons of continuous integration.
minutes: 13
tags: [CI, CD, pipeline, build-systems, DAG, automation]
---

# CI/CD Pipelines & Continuous Integration

## After writing code — automate everything

After writing code, a developer must: get source (Git) → install dependencies (npm/pip) → run **static analysis** (SonarQube/ESLint) → compile → generate docs → run tests → create **artifacts** (JAR, Docker image) → ship → operate & **monitor** (Prometheus) → repeat.

> [!EXAM]
> *"Which of these steps should be manual?"* → **None!** Manual processes are error-prone, slow and inconsistent. Automation prevents human error, ensures repeatability, and catches mistakes early (a forgotten dependency or a syntax error fails the build before production).

## The CI/CD pipeline

> [!NOTE]
> A **CI/CD pipeline** automates the journey from **code commit to production deployment**. **CI** builds & tests on commits; **CD** deploys validated changes. Objective: maintain a **deployable state**, minimise errors, improve release frequency & quality.

```
Commit → Build → Unit Tests → Integration Tests → Deploy to Staging
       → Acceptance Tests → Deploy to Production
```

A simple loop view: **Code Edit → Tests Run → Code Merged → Code Deployed** (→ repeat). Tools like **GitHub Actions, Jenkins, CircleCI** manage it.

### History of CI
1999 XP rule *"Integrate Often"* → 2000 Fowler's *"Continuous Integration"* blog → 2001 first CI tool → 2005 **Hudson/Jenkins** → 2011 Travis CI → 2019 **GitHub Actions**.

### Best practices
- **Automate everything** feasible.
- Always use a **one-step build** tool (Maven/Gradle).
- Use a CI tool to build & test on **every commit**.
- **Don't depend on anything** that's not in the build file (reproducibility).
- **Don't break the build!**

## Build systems & the DAG

> [!NOTE]
> A build system has three roles: **define tasks & resources**, **define dependencies (a graph)**, and **execute tasks**. It uses a **Directed Acyclic Graph (DAG)** so a task runs only after the tasks it depends on finish.

> [!INTUITION]
> Large projects have **thousands of tasks** plus external libraries. The DAG ensures, e.g., that *deploy* (Task Z) runs only after *build* (Task D) **and** *test* (Task E) complete — a controlled, correct order. A good build system also runs **only the compiles needed** by dependency changes (incremental builds) and eliminates "tribal knowledge."

## Continuous Integration — pros & cons

> [!NOTE]
> **CI** is the practice of frequently merging code into a shared repository (e.g. `main`) and **automatically verifying** it via builds and tests. Developers work on feature branches and merge to main **frequently** (e.g. daily).

| Pros | Cons |
|---|---|
| Interaction problems between developers found & fixed **early** | Large systems take **long** to build & test |
| The mainline is always the **definitive working system** | If the dev platform ≠ target platform, system tests may not run in the developer's workspace |

> [!TRAP]
> CI is about **frequent integration**, not just "having a build server." The value comes from merging *small changes often* so conflicts surface immediately — letting changes pile up on long-lived branches defeats the purpose.

---

**Next:** scaling automation across teams and adding security — **DevOps & DevSecOps**.
