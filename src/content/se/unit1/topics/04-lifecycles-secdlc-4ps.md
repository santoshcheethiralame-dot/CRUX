---
subject: se
unit: 1
order: 4
slug: lifecycles-secdlc-4ps
title: The Secure SDLC & the 4 Ps
summary: How SecDLC maps security onto every phase of the SDLC — pre-training plus five phases with their specific activities — and the 4 Ps framework of People, Process, Product and Project environment.
minutes: 13
tags: [SecDLC, secure-SDLC, threat-modelling, attack-surface, fuzz-testing, FSR, 4Ps, people, process, product]
---

# The Secure SDLC & the 4 Ps

## What SecDLC is

> [!NOTE]
> The **Security Development Life Cycle (SecDLC)** is a **structured set of processes that incorporates security considerations into every phase of the Software Development Life Cycle (SDLC).**

> [!INTUITION]
> The phrase that matters is **"into every phase"**. The alternative — and the historical default — is to treat security as a **testing activity at the end**: build the thing, then have someone try to break it.
>
> That fails for a simple economic reason. A security flaw baked into the **architecture** cannot be fixed by a test at the end; it can only be *found* there, at which point fixing it means redesigning. **SecDLC is the recognition that security is a design property, not a defect class.**

---

## Pre-SDL: Security training

> [!NOTE]
> **All members must receive appropriate training** to stay informed about **security basics and recent trends in security and privacy.**
>
> **Topics include:**
> - **Threat modelling** (e.g. design implications)
> - **Secure coding** (e.g. buffer overruns, cross-site scripting)
> - **Privacy** (e.g. types of privacy-sensitive data)
>
> This is **only the baseline training** — specialization and advanced training may be necessary.

> [!TRAP]
> Note this is **Pre-SDL** — it happens **before the lifecycle starts**, not inside it. That placement is deliberate: **you cannot ask a team to design securely in Phase 2 if they learn what a buffer overrun is in Phase 3.**

---

## The five phases

### Phase 1 — Requirements

> [!NOTE]
> **Identify functional aspects of the software that require deep review:**
> - **Which portions of the project will require security design reviews before release?**
> - **Which portions will require penetration testing** by a mutually agreed group **external to the project team**?
> - **Perform Threat Modeling and Security Risk Assessment (SRA)** to define **product security requirements**.

> [!EXAM]
> Two details are examinable here. The penetration testing group must be **external to the project team** — because the people who built a system are the worst placed to imagine attacks on it. And the phase's *output* is **product security requirements**, meaning security enters the SRS alongside functional requirements rather than living in a separate document.

### Phase 2 — Design

> [!NOTE]
> **All design specifications should describe how to securely implement all functionality** provided by a given feature or function:
>
> | Principle | Meaning |
> |---|---|
> | **Attack surface reduction** | **Giving attackers less opportunity to exploit a potential weak spot** |
> | **Defense in depth** | **Design the system with multiple layered defenses** |
> | **Risk analysis** | Of components or features that have **meaningful security risks** — which can be defined by the SRA during requirements |

> [!INTUITION]
> The two principles pull in different directions and that is the point. **Attack surface reduction** says *expose less* — fewer open ports, fewer privileges, fewer features enabled by default. **Defense in depth** says *assume the exposure you keep will be breached* — so put another layer behind it.
>
> Together: **minimise what can be attacked, then assume the minimum still fails.** The CrowdStrike case is a defense-in-depth failure — one corrupted library and there was nothing behind it.

### Phase 3 — Implementation

> [!NOTE]
> - **Publish a list of approved tools and their associated security checks** — such as compiler/linker options and warnings.
> - **Teams should analyze all functions and APIs** used in the project and **prohibit those determined to be unsafe (including open source)**.
> - Once a prohibited list is defined, **all code should be scanned for these functions and APIs and modified accordingly**.
> - **Static analysis of code should be performed.**

> [!EXAM]
> **"(including open source)"** is a small parenthesis worth noticing — it says the prohibition applies to **dependencies you did not write**, not just your own code. That is precisely the **over-reliance on an upstream vendor** failure from the CrowdStrike case.

### Phase 4 — Verification

> [!NOTE]
> - **Dynamic program analysis** — monitor application problems with **memory corruption, user privilege issues**, etc.
> - **Fuzz testing** — **deliberately introduce malformed or random data** to an application during dynamic analysis.
> - **Update threat model and attack surface analysis** — account for any design or implementation changes, and assure any new threats/attacks are **reviewed and mitigated**.

> [!EXAM]
> **Static vs dynamic analysis** is the pairing to hold:
> - **Static** (Phase 3) — examines the **code without running it**; finds banned APIs, unsafe patterns.
> - **Dynamic** (Phase 4) — examines the **running program**; finds memory corruption and privilege problems that only appear at runtime.
>
> **Fuzz testing** is the memorable one: feed the program **malformed or random data** on purpose, because attackers will. It finds the inputs no one thought to write a test for.

> [!TRAP]
> The third bullet is easily skipped and is the most conceptually important: **the threat model is updated, not merely consulted.** A threat model written in Phase 1 and never revisited describes a system you no longer have.

### Phase 5 — Release

> [!NOTE]
> **An incident response plan must be in place:**
> - **A first point of contact in an emergency**
> - **On-call contacts with decision-making authority, available 24 hours a day**
> - **Security servicing plans for code inherited from other groups** in the organization
> - **Security servicing plans for third-party code** — and if appropriate, **the right to make changes**
> - **Final Security Review (FSR)**: includes an examination of **threat models, tool output, performance against quality gates and bug bars**

> [!INTUITION]
> *"On-call contacts **with decision-making authority**"* is the phrase that separates a real plan from a document. During the CrowdStrike outage, the technical fix was known quickly — what took time was reaching machines and making decisions at scale.
>
> An incident plan that can reach an engineer but not someone who can **authorise a rollback** has a gap exactly where the clock is running.

> [!EXAM]
> The **Final Security Review (FSR)** is the release gate, and it checks **four** things: threat models, tool output, performance against **quality gates**, and **bug bars**. A *bug bar* is the pre-agreed severity threshold above which a defect blocks release.

---

## The 4 Ps

> [!NOTE]
> The **4 Ps — People, Process, Product and Project environment** — are **a framework used to describe and organize the key elements of a project.**
>
> They cover **everything from the team working on the project, the methodologies used, the tangible outcomes and even the external influences** that can impact success. The framework is essential because it **provides a holistic perspective**, helping project managers **better plan, execute and control** projects.

### P1 — People

> [!NOTE]
> **People are the backbone of any project.** *Without the right team in place, even the best-laid plans can crumble.* Three groups:
>
> | Group | Role |
> |---|---|
> | **The project team** | A **diverse mix of individuals**, each bringing unique skills — *the builders, the creators, the problem-solvers*. Their **collective efforts drive the project from inception to completion** |
> | **The stakeholders** | Individuals or groups with a **vested interest** — **sponsors** providing funding, **clients** awaiting deliverables, **end-users** who will benefit. Their **needs and expectations significantly influence the project's direction and goals** |
> | **The project manager** | **The linchpin** — responsible for keeping all moving parts in sync. **Plans, coordinates, communicates and leads**; ensures the project **stays on track, meets objectives and delivers value** |

The three enablers named: **collaboration** (sharing knowledge, resolving conflicts, building on each other's ideas), **communication** (everyone on the same page about goals, progress and challenges), and **leadership** (guiding, motivating, fostering a positive productive environment).

> **"In essence, a project's success largely depends on its people."**

### P2 — Process

> [!NOTE]
> **Process** is about **the methodologies, techniques and procedures that guide a project from initiation to closure.** Three components:
>
> **1. Project management processes** — *the roadmap*. Anything from **agile methodologies prioritising flexibility and adaptability** to **traditional waterfall models following a strict sequential approach**. **Each project requires a unique blend, tailored to its needs.**
>
> **2. The project lifecycle** — five stages:
>
> | Stage | What happens |
> |---|---|
> | **Initiation** | Define the project and get the necessary approvals |
> | **Planning** | Map out how to achieve the goals |
> | **Execution** | The real work happens; plans come to life |
> | **Monitoring** | Track progress and make necessary adjustments |
> | **Closure** | Tie up loose ends and celebrate success |
>
> **3. Change management process** — because *projects are rarely a smooth sail; more like a roller coaster ride*. It helps **navigate unexpected changes without losing sight of the goals**, managing changes to **scope, schedule or resources**. The key is a process that **allows flexibility without jeopardizing objectives**.

> **"A well defined process can steer the project towards its goals."**

### P3 — Product

> [!NOTE]
> The **product is the tangible output of a project — the reason the project exists in the first place.** It can be a **physical product, a service, or a result** meeting a specific requirement. Three components:
>
> | Component | Meaning |
> |---|---|
> | **Deliverables** | The **concrete outputs the project promises** — tangible aspects the stakeholder can **see, touch and evaluate** |
> | **Quality** | **The degree to which deliverables meet the specified requirements and expectations** — about ensuring **customer satisfaction and project success** |
> | **Scope** | The **defined boundaries and objectives** — the work to be done, features to include, constraints to observe. *"Like the blueprint of the project"* |

> [!TRAP]
> *"Without a clearly defined scope, a project can easily veer off course, leading to **cost overruns, delayed timelines and unhappy stakeholders**."*
>
> Note that all three named consequences of poor scope are the **failure criteria** from Topic 1 — late, over budget, requirements unmet. **Scope is where those failures originate.**

> **"The product of a project is its tangible value."**

### P4 — Project environment

> [!NOTE]
> Includes **external and internal factors that can impact the project's success.**
>
> | Factor | Meaning |
> |---|---|
> | **Organizational context** (internal) | The **culture, structure, policies and procedures** within the organization — *the backdrop of your project*. It **shapes how projects are initiated, executed and managed** |
> | **External factors** | Influences **outside the organization** — **market conditions, regulatory requirements, technological advancements, competitive** pressures |
> | **Risk management** | The **identification, assessment and mitigation** of potential risks and uncertainties — *foreseeing what could go wrong and having strategies to respond* |

The deck's illustration of organizational context: *an organization with a culture of innovation might encourage risk-taking and experimentation, while a more conservative organization might prioritize adherence to established processes and standards.*

> [!INTUITION]
> The closing observation is the useful one: **all these elements interact.** *"The organizational context might shape how risks are managed. External factors might create new risks or necessitate changes in the organization's policies."*
>
> That is why the 4 Ps are presented as a **framework** rather than a checklist — you cannot fix People without affecting Process, or change Scope without touching the Product. The value is in being reminded that a project failing on one P is often being *caused* by another.

> **"Understanding the project environment helps in making informed decisions and mitigating risks."**

---

**Next:** the process family built for change rather than prediction — **Agile development & Scrum**.
