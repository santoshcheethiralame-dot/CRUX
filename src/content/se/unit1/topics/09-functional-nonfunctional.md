---
subject: se
unit: 1
order: 9
slug: functional-nonfunctional
title: Functional & Non-Functional Requirements
summary: Functional requirements and the imprecision problem, why completeness and consistency are impossible in practice, the full non-functional taxonomy tree, the three classifications, the metrics table that makes NFRs verifiable, and user versus system versus domain requirements.
minutes: 15
tags: [functional, non-functional, NFR, metrics, product, organisational, external, user-requirements, domain, imprecision]
---

# Functional & Non-Functional Requirements

## Functional requirements

> [!EXAM]
> **Statements of services the system should provide, how the system should react to particular inputs and how the system should behave in particular situations.**
>
> - **Describe functionality or system services.**
> - **May state what the system should *not* do.**
> - **Depend on the type of software, expected users and the type of system where the software is used.**
>
> **Examples:**
> - The system must **send a confirmation email whenever an order is placed**.
> - The system must **allow blog visitors to sign up for the newsletter by leaving their email**.
> - The system must **allow users to verify their accounts using their phone number**.

> [!INTUITION]
> **"May state what the system should not do"** is the clause students skip, and it matters more than it looks.
>
> Negative requirements are how you specify **safety and security**: *the system shall not permit a withdrawal exceeding the account balance*, *the system shall not display another user's records*. These are real, testable requirements — and they are invisible if you only ever write "the system shall…".
>
> They are also the bridge to the **security requirements** topic, where almost every requirement is a constraint on what must *not* happen.

## Requirements imprecision

> [!EXAM]
> **Problems arise when functional requirements are not precisely stated.**
>
> **Ambiguous requirements may be interpreted in different ways by developers and users.**

> [!TRAP]
> The dangerous property of an ambiguous requirement is that **it does not look like a problem**. Both parties read it, both understand it, both are satisfied — and they understood **different things**.
>
> No one detects the disagreement at requirements time, because detecting it would require noticing that a sentence *could* be read another way. The cost surfaces at acceptance testing, which is the far end of the cost-of-repair curve from the previous topic.

## Completeness and consistency

> [!EXAM]
> **In principle, requirements should be both complete and consistent.**
>
> - **Complete** — they should include descriptions of **all facilities required**.
> - **Consistent** — there should be **no conflicts or contradictions** in the descriptions of the system facilities.
>
> **In practice, because of system and environmental complexity, it is impossible to produce a complete and consistent requirements document.**

> [!INTUITION]
> That last sentence is unusually honest for a textbook, and it is worth taking seriously rather than treating as a caveat.
>
> **Completeness is unachievable** because it would require enumerating the system's behaviour in *every* situation, including ones nobody has imagined. **Consistency is unachievable at scale** because a document of thousands of requirements written by many people over months will contain contradictions no one can hold in their head at once.
>
> The practical consequence is not "give up" — it is that **requirements need a review process and a change process**, because you are guaranteed to be working from an imperfect document. That is precisely why validation and change management exist as named activities.

## Non-functional requirements

> [!EXAM]
> **These define system properties and constraints** — e.g. reliability, response time and storage requirements. **Constraints are I/O device capability, system representations, etc.**
>
> - **Process requirements may also be specified**, mandating a particular **IDE, programming language or development method**.
> - **Non-functional requirements may be more critical than functional requirements. If these are not met, the system may be useless.**
> - **Often apply to the system as a whole rather than individual features or services.**

> [!TRAP]
> **"May be more critical than functional requirements"** is a stated exam point and it is counter-intuitive, so give the reasoning:
>
> A banking system that computes balances perfectly but takes **four minutes per transaction**, or is **available 60% of the time**, or **leaks account data**, has met every functional requirement and is **unusable**. Functional requirements decide whether the system *can* do the job; non-functional ones decide whether anyone *can use it* to do the job.

## The types of non-functional requirement

> [!EXAM]
> The deck's taxonomy tree:
>
> **Non-functional requirements**
> - **Product requirements**
>   - **Efficiency requirements** → **Performance requirements**, **Space requirements**
>   - **Usability requirements**
>   - **Dependability requirements**
>   - **Security requirements**
> - **Organizational requirements**
>   - **Environmental requirements**
>   - **Operational requirements**
>   - **Development requirements**
> - **External requirements**
>   - **Regulatory requirements**
>   - **Ethical requirements**
>   - **Legislative requirements** → **Accounting requirements**, **Safety/security requirements**

## The three classifications

> [!EXAM]
> | Class | Definition | Example |
> |---|---|---|
> | **Product requirements** | Requirements which specify that **the delivered product must behave in a particular way** | execution speed, reliability |
> | **Organisational requirements** | Requirements which are **a consequence of organisational policies and procedures** | process standards used, implementation requirements |
> | **External requirements** | Requirements which arise from **factors external to the system and its development process** | interoperability requirements, legislative requirements |

> [!INTUITION]
> The three classes answer **"where did this requirement come from?"**, and that origin determines **who can change it** — which is the practical reason to classify at all.
>
> - **Product** — comes from *what the system must be*. Negotiable with the customer.
> - **Organisational** — comes from *your own company's rules*. Negotiable internally, with effort.
> - **External** — comes from *law, regulators and other systems*. **Not negotiable at all.**
>
> That ordering matters when scope is cut under schedule pressure: a legislative requirement cannot be dropped to make a date, however much the team would like to. Note the tree places **Safety/security** under **Legislative** for exactly this reason — in regulated domains it is a legal obligation, not a product choice.

## Non-functional requirements affect architecture

> [!EXAM]
> - **Non-functional requirements may affect the overall architecture of a system rather than the individual components.** For example, to ensure that **performance requirements** are met, you may have to **organize the system to minimize communications between components**.
> - **A single non-functional requirement, such as a security requirement, may generate a number of related functional requirements** that define system services that are required. **It may also generate requirements that restrict existing requirements.**

> [!INTUITION]
> This is why non-functional requirements cannot be deferred, and it is the single most useful idea on the page.
>
> A functional requirement is usually **local** — you can add "export to CSV" late, because it touches one place. A non-functional requirement is usually **global**: "respond within 200 ms" or "survive a datacentre failure" constrains **how the whole system is put together**. Discover it late and you are not adding a feature, you are rebuilding the architecture.
>
> The second bullet describes the *cascade*: one security NFR ("only authorised users may see records") spawns functional requirements (log in, manage roles, audit access) **and restricts existing ones** (every existing report now needs a permission check). **One line of non-functional requirement can rewrite a page of functional ones.**

## Metrics for specifying non-functional requirements

> [!EXAM]
> This table is the answer to "how do you make an NFR verifiable?"
>
> | Property | Measure |
> |---|---|
> | **Speed** | Processed transactions/second · User/event response time · Screen refresh time |
> | **Size** | Mbytes · Number of ROM chips |
> | **Ease of use** | **Training time** · **Number of help frames** |
> | **Reliability** | **Mean time to failure** · Probability of unavailability · Rate of failure occurrence |
> | **Robustness** | **Time to restart after failure** · Percentage of events causing failure · Probability of data corruption on failure |
> | **Portability** | **Percentage of target dependent statements** · Number of target systems |

> [!DERIVE]
> **Work the row that seems impossible.** "The system must be easy to use" is the classic unverifiable requirement — the deck used it as the bad example in the previous topic's exercise.
>
> The table's answer: measure **training time** and **number of help frames**. Neither *is* ease of use; both are **observable proxies** for it. So the requirement becomes:
>
> > *A new user shall complete the core workflow after no more than 30 minutes of training.*
>
> That is testable — recruit users, train them, time them. **The technique generalises: when a quality seems unmeasurable, do not measure the quality, measure a consequence of it.**

> [!TRAP]
> Proxies are approximations, and optimising the proxy instead of the property is a real failure mode. A team judged on "number of help frames" can add help frames without making anything easier.
>
> Choose proxies that are **hard to game and closely coupled** to what you actually want — and note that this is the same hazard as metric-driven management generally.

## User, system and domain requirements

Beyond functional and non-functional, the analysis step classifies requirements by **who they are written for**.

> [!EXAM]
> **User requirements** — **statements in natural language plus informal context diagrams**, system/sub-system and their interconnections and operational constraints. **Written for/by customers.**
>
> > *Example:* Screen A accepts production information, including Lot, Product Number, and Date. System B produces the Lab Summary Report. Twenty users can use System C concurrently without noticeable system delays.
>
> **System requirements** — **a structured document setting out detailed descriptions of the system's functions, services and operational constraints.** **Defines what should be implemented**, so **may be part of a contract between client and contractor**.
>
> **Domain requirements** — **constraints on the system from the domain of operations.**
>
> > *Example (healthcare):* The software must be developed in accordance with **IEC 60601** standard regarding the basic safety and performance for medical electrical equipment.

> [!NOTE]
> The deck's summary: **user requirements describe what the user needs and wants from the system, while system requirements describe the technical specifications and constraints that the system must meet to fulfil those user requirements.** Understanding the difference **helps ensure the system meets the needs of its users while also being technically feasible and efficient.**

> [!INTUITION]
> User and system requirements are often **the same requirement written twice, for two audiences** — and the reason is the phrase *"may be part of a contract."*
>
> The user version must be readable by a customer who is not an engineer, so it is natural language and tolerates some vagueness. The system version may be **legally binding**, so it must be precise enough to settle a dispute about whether the delivered software conforms.
>
> **Domain requirements are the dangerous category**, and they connect to the elicitation topic's warning about interviews: domain knowledge is *"so familiar that people find it hard to articulate or think that it isn't worth articulating."* Nobody in a hospital will spontaneously tell you about IEC 60601 — they assume everyone knows. Missed domain requirements are missed precisely because they are obvious to the expert.

---

**Next:** the requirements that specify what must *not* happen — **security requirements**.
