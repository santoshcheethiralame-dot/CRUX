---
subject: se
unit: 1
order: 2
slug: crowdstrike-case-study
title: Case Study — The CrowdStrike Outage
summary: What happened on 19 July 2024, the five things that went wrong, the software-engineering practices that would have caught each, how to avoid it, and the change-management lesson that configuration is not lower-risk than code.
minutes: 12
tags: [crowdstrike, case-study, change-management, CCB, canary-release, rollback, SCM, incident-response]
---

# Case Study — The CrowdStrike Outage

> [!NOTE]
> The deck sets this as a **class discussion** before giving answers. Try them first:
> - **What could have gone wrong?**
> - **How to avoid such events? What could the company have done?**
> - **Is this a Microsoft issue? Explain.**
> - **How could they have minimized the impact?**
> - **Why did it take so long to get it fixed?**

---

## What happened

> [!EXAM]
> | Stage | Detail |
> |---|---|
> | **Defective update released** | On **18 July 2024**, CrowdStrike pushed a routine **Falcon** software update to production **without adequate testing**, embedding a **corrupted library** that would trigger system crashes |
> | **Global outage begins** | The next morning, **over 8.5 million Windows endpoints** worldwide abruptly failed when the update **auto-applied** |
> | **Critical services disrupted** | Sectors from **banking to healthcare** went offline; **airlines halted flight operations**; **911 call centres experienced intermittent failures** |
> | **Delta Air Lines impact** | Delta cancelled **more than 7,000 flights over five days**, affecting **1.3 million passengers**, estimating **\$550 million in losses** |
> | **Extended recovery** | Some organisations restored service within hours; **Delta's outdated infrastructure prolonged its recovery until 25 July** |
> | **Insurer exposure** | Insurers face an estimated **\$1.5 billion in cyber-interruption claims** from this single incident |
> | **Regulatory and legal fallout** | A **Georgia Superior Court** allowed Delta's suit alleging **gross negligence** to proceed; the **U.S. DOT** and **EU data-protection regulators** opened investigations |

> [!INTUITION]
> Answer the *"is this a Microsoft issue?"* question directly, because it is the one students get wrong. **No.** The faulty update was **CrowdStrike's**, not Microsoft's. What made Windows machines the victims is that Falcon is security software running at **kernel level** — so a crash there takes the whole operating system down rather than just one application.
>
> Microsoft's involvement is that its OS was the *environment*, not the cause. The instructive part is architectural: **code with that much privilege inherits a correspondingly enormous blast radius**, which is exactly why it should face the *most* release discipline, not the least.

> [!TRAP]
> Note the two very different recovery times: **hours for most, until 25 July for Delta**. The same defect, wildly different outcomes.
>
> The difference was not the bug — it was **the state of each organisation's own infrastructure**. Recovery required booting into safe mode and deleting a file on each machine, which is manageable if your fleet is modern and remotely manageable, and brutal if it is not. **Your ability to recover from someone else's failure is itself an engineering property you own.**

---

## What went wrong — the five failures

> [!EXAM]
> | Failure | Detail |
> |---|---|
> | **Inadequate staging & testing** | Minimal pre-production validation meant the buggy library went undetected — **a simple sandbox test could have flagged the crash** |
> | **Monolithic update deployment** | **All customers received the same update simultaneously**, eliminating opportunities for **canary or phased rollouts** |
> | **Poor change management** | Absence of a formal **Change Control Board (CCB)** and impact-analysis workflow **violated best practices in SCM and risk management** |
> | **Over-reliance on upstream vendor** | Relying on **a single code library without verifying its integrity** downstream introduced a **single point of failure** |
> | **Insufficient monitoring & alerting** | Telemetry **failed to trigger rapid rollback** when error rates spiked; incident response teams were **only alerted after mass failures** |

> [!INTUITION]
> Read them as a **sequence of missed chances**, not five separate mistakes. Testing should have caught it **before** release. A phased rollout would have caught it **at 1% of customers**. Monitoring should have caught it **within minutes**. Change management should have questioned it **before any of that**.
>
> **Four independent safety nets, none of them present.** That is the real finding — catastrophes are almost never one failure, they are the alignment of several absent defences.

---

## The software-engineering explanation

> [!EXAM]
> The deck maps each failure onto a named SE discipline — this is the answer to *"explain the outage in software-engineering terms"*:
>
> | Discipline | What was missing |
> |---|---|
> | **SCM & version control** | **No branching strategy or semantic versioning** enforced → untested code path introduced into master |
> | **Continuous integration** | Lack of **automated unit/integration tests against real-world configurations** → regressions slipped through |
> | **Release management** | **No canary or blue-green deployment model** → all users hit simultaneously by the bug |
> | **Requirements & quality assurance** | Missing clear **"release-readiness" criteria** (code coverage, fault injection) → low confidence in update stability |
> | **Risk management** | **No formal risk register or mitigation plans** for third-party library failures |

---

## How to avoid it

> [!NOTE]
> | Measure | What it means |
> |---|---|
> | **Implement phased rollouts** | Use **canary releases and feature flags** to expose changes to a **small subset** before full-scale deployment |
> | **Automate testing & rollbacks** | Integrate **regression, fault-injection and canary-pipeline tests**; **script automatic rollback on threshold breaches**. Automated **security testing integrated in the CI/CD pipeline** throughout the lifecycle |
> | **Enforce SCM best practices** | Adopt **semantic versioning**, maintain **separate release branches**, conduct **CCB-driven impact analyses** |
> | **Establish "release-readiness" gates** | Define clear **QA criteria — test coverage, performance benchmarks, security scans** — that must pass before deployment |
> | **Strengthen monitoring & incident response** | **Real-time telemetry with automated alerts** and a **documented runbook** for immediate mitigation |
> | **Diversify dependencies** | **Mirror critical libraries** and **verify checksums/signatures** to avoid single-source risks |

> [!INTUITION]
> **A canary release is the cheapest of these and would have done the most.** Ship to 1% of machines, watch the error rate, and stop. The defect was not subtle — it crashed the machine on boot — so even a tiny sample would have exposed it within minutes.
>
> That is worth internalising: the most valuable safeguards are usually not clever, they are just **staged**. You are not trying to be certain the change is safe; you are trying to **limit how much you lose if it isn't**.

---

## The change-management lesson

> [!EXAM]
> The deck's sharpest point, and the one most likely to be asked:
>
> > **Configuration updates were treated differently from code changes** — a **critical gap in the kind of testing the change was subjected to**.
>
> **To improve the change management process:**
> - **Classify changes based on the risk and impact, not type**
> - **Comprehensive risk assessment for all changes**
> - **Automated rollback plans for all types of changes**
> - **Phased deployment approach for high-risk changes**
> - **Enhance monitoring and alerting** to quickly detect issues post deployment

> [!TRAP]
> **"Classify by risk and impact, not type"** is the single most transferable sentence in this case study.
>
> The failing update was *"just a configuration file"* — not code, so it bypassed the testing that code would have faced. But it was loaded by a **kernel-level driver**, so its actual blast radius was enormous. **The category was low-risk; the reality was catastrophic.**
>
> Any process that decides how much scrutiny a change gets by asking **what kind of artefact it is** rather than **what damage it could do** has the same hole.

### The Change Control Board

> [!NOTE]
> The supplied Q&A material makes the CCB mechanism explicit: **when a change request is submitted, analyse its impact** — on schedule, cost, and other requirements — before approving it. The CCB is the body that performs that analysis and makes the accept/reject decision.
>
> This connects forward to **requirements change management** later in the unit: the RTM and the CCB are the two instruments that stop uncontrolled change.

---

## Why it took so long to fix

Returning to the discussion question: the fix itself was simple — boot into safe mode, delete the offending file. But:

- machines were **crashing on boot**, so they could not receive a corrective update through the normal channel;
- the remedy required **physical or out-of-band access to each endpoint**, at a scale of **8.5 million**;
- organisations with **older infrastructure**, like Delta, had far less remote-management capability.

> [!INTUITION]
> This is the part with the widest lesson. **A system that breaks in a way that prevents its own repair channel from working is in a category of its own.**
>
> Auto-update is a genuine security good — it is how fleets get patched quickly. But the very mechanism that makes a fix propagate in hours is the mechanism that made this defect propagate in hours. **The update channel is both the immune system and the vector**, and designing it means taking that duality seriously: staged rollout, a kill switch, and a recovery path that does not depend on the broken component.

---

## Where this fits in the unit

> [!INTUITION]
> The case study is placed second in the unit deliberately. Almost every topic that follows is a named answer to something that failed here:
>
> | Failed here | Addressed in |
> |---|---|
> | No staged process, no gates | **SDLC & process models** |
> | Security not built into the lifecycle | **Secure SDLC** |
> | No release-readiness criteria | **Test planning** |
> | Uncontrolled change | **RTM & change management** |
> | Testing that did not match reality | **V&V and test cases** |
>
> Keep coming back to it. When a later topic feels abstract, ask **which part of 19 July 2024 it would have prevented.**

---

**Next:** the structured processes that exist to prevent exactly this — **the SDLC & process models**.
