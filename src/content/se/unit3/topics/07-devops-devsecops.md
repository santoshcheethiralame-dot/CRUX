---
subject: se
unit: 3
order: 7
slug: devops-devsecops
title: DevOps & DevSecOps
summary: What DevOps is and how it extends Agile, the four pillars, the five-stage DevOps pipeline and its tools, Agile vs DevOps, and DevSecOps with the shift-left principle.
minutes: 14
tags: [DevOps, DevSecOps, pillars, pipeline, shift-left, continuous-deployment]
---

# DevOps & DevSecOps

## What is DevOps?

> [!NOTE]
> **DevOps** combines **Development (Dev)** and **Operations (Ops)** to improve delivery speed and effectiveness — a culture, set of practices, and tools for high-velocity delivery. It blends the SDLC with IT operations and is an **extension of Agile** (deliver incrementally, faster, removing manual labor).

> [!INTUITION]
> The driving Agile principle is *"working software is the primary measure of progress"* — DevOps **automates** to achieve it. **Amazon deploys code every 11.7 seconds** on average; that velocity is impossible without DevOps automation.

## The four pillars of DevOps

| Pillar | Idea |
|---|---|
| **Collaboration** | Shared responsibility, open communication, **reduced silos**, cross-functional teams |
| **Affinity** | Strength of relationships between teams — empathy, shared values, mutual trust, co-owned metrics |
| **Tools** | The **enablers** of automation (version control, build, CI/CD, config mgmt, containers, orchestration) |
| **Scaling** | Extending DevOps as the org grows — **organizational, infrastructure, process, team** scaling |

> [!EXAM]
> The four pillars: **Collaboration, Affinity, Tools, Scaling.** "Collaboration is the heart of DevOps"; **Affinity** is specifically about *relationships/trust* between teams (don't confuse it with collaboration).

## The DevOps pipeline (5 stages)

1. **Continuous Integration** — frequent merges to main; automated builds/tests (Jenkins, GitHub Actions).
2. **Continuous Build** — compile, resolve dependencies, create artifacts; static analysis (Lint/SonarQube); **DAG** task ordering (Maven/Gradle).
3. **Continuous Testing** — automated unit/integration/regression/UI/API tests; any failure stops the pipeline (Selenium, JUnit, PyTest).
4. **Continuous Delivery (CD)** — always in a **deployable state**; auto-package & deploy to staging; **release on demand** after validation.
5. **Continuous Deployment** — auto-deploy validated builds **directly to production** with **no manual approval**; needs strong monitoring/rollback (Netflix uses Spinnaker, deploying hundreds of times/day).

> [!TRAP]
> **Continuous Delivery vs Continuous Deployment:** *Delivery* keeps software always deployable and releases **on demand** (a human clicks "go"). *Deployment* goes all the way — **every** validated change auto-ships to production with no manual gate. Deployment requires mature testing, monitoring and rollback.

**Tool categories:** Version control (Git) · Build (Maven/Gradle/Ant) · CI/CD (Jenkins/CircleCI/GitHub Actions) · Testing (Selenium/JUnit/PyTest) · Containerization (**Docker**) · Orchestration (**Kubernetes**/OpenShift) · Monitoring (Prometheus/Grafana/ELK).

## Agile vs DevOps

| Agile | DevOps |
|---|---|
| Focuses on iterative **development** | Extends across **development + operations + delivery** |
| Customer collaboration, working software | Automates build/test/deploy/monitor for velocity |

## DevSecOps

> [!NOTE]
> **DevSecOps** (development, **security**, operations) **automates the integration of security at every phase** of the SDLC — from design through delivery. Previously security was "tacked on" at the end by a separate team.

- Makes security a **shared responsibility** of dev, security and ops — the motto *"software, safer, sooner."*
- Core idea: **"shifting left"** — moving security testing *toward developers* so weaknesses are found and fixed **as code is written**, not at the end.

> [!EXAM]
> **DevSecOps = "shift left"**: integrate security continuously and early. Benefits: find issues **earlier/cheaper**, fix faster (automation + feedback loops), **shrink the attacker's window**, scale without losing velocity. Challenge: diverse tech is hard to test at speed; misconfigured checks create **brittle pipelines**.

> [!INTUITION]
> "Shift left" = on a left-to-right timeline of the SDLC (plan → code → build → test → release), push security **leftward** toward planning/coding. A flaw caught at coding costs a fraction of one caught in production (recall the CrowdStrike outage).

---

**Next:** verifying the software works — the principles of **software testing**.
