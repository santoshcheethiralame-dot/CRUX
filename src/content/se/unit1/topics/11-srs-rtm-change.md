---
subject: se
unit: 1
order: 11
slug: srs-rtm-change
title: The SRS, Traceability (RTM) & Change Management
summary: The SRS as the customer-contractor agreement with the IEEE 830 template, the four things it must cover, validation versus verification, the RTM with forward and backward tracing, the six-step change process, and what agile does instead.
minutes: 14
tags: [SRS, IEEE-830, RTM, traceability, validation, verification, change-management, prototyping, agile]
---

# The SRS, Traceability (RTM) & Change Management

## Requirements specification

> [!EXAM]
> **After elicitation and analysis, we need to specify the requirements.**
>
> **Requirements specification is the documentation of a set of requirements that is reviewed and approved by the customer and provides direction for the software construction activities in the next stage of the life cycle.**
>
> **The software requirements specification (SRS) document is the basis for customers and contractors/suppliers agreeing on what the product will and will not do.** It describes **both the functional and nonfunctional requirements**.
>
> **IEEE definition:** *"a document that clearly and precisely describes each of the essential requirements (functions, performance, design constraints and quality attributes) of the software and the external interfaces."*

> [!INTUITION]
> **"What the product will and will not do"** is the phrase to hold on to. An SRS is not only a build instruction — it is a **boundary**.
>
> Its two jobs pull in opposite directions and both matter: it tells the developers what to build, **and** it protects both parties in a dispute. That second job is why the previous topic noted a system requirements document *"may be part of a contract between client and contractor"* — and it explains why SRS documents are so much more formal than the working notes engineers would write for themselves.
>
> The **"and will not"** half is what stops scope creep: a feature absent from the SRS is, by agreement, not being delivered.

## What an SRS must cover

> [!EXAM]
> | Area | Question it answers |
> |---|---|
> | **Functionality** | **What is the software supposed to do?** |
> | **External interfaces** | **How does the software interact with people, the system's hardware, other hardware, and other software?** |
> | **Non-Functionality** | **All of the quality criteria which drive the functionality** — e.g. performance, availability, portability |
> | **Design constraints imposed on an implementation** | Required **standards** in effect · **implementation language** · **policies for database integrity** · **resource limits** · **security** · **operating environment(s)** |

> [!TRAP]
> **Design constraints are a fourth category, not a subset of the other three** — and they are the one students forget.
>
> "Must be written in Java" is not functionality, not an interface, and not a quality attribute. It is a **restriction on how you may build it**, usually inherited from the organisation rather than the problem — which places it among the **organisational requirements** of the previous topic's classification.
>
> Note that **security appears here as a design constraint** as well as in the non-functional taxonomy. That is the third place security has appeared in this unit, which is the point the Secure SDLC topic was making.

## The IEEE 830 template

> [!EXAM]
> **Table of contents recommended by IEEE for an SRS (IEEE Std. 830-1998):**
>
> **1. Introduction**
> 1.1 Purpose · 1.2 Scope · 1.3 Definitions, acronyms, and abbreviations · 1.4 References · 1.5 Overview
>
> **2. Overall description**
> 2.1 Product perspective · 2.2 Product functions · 2.3 User characteristics · 2.4 Constraints · 2.5 Assumptions and dependencies
>
> **3. Specific requirements**
> 3.1 External Interface · 3.2 Functional Requirements · 3.3 Non-Functional Requirements · 3.4 Design Constraints
>
> **Appendixes · Index**

> [!INTUITION]
> The structure moves from **general to specific** in three passes — an introduction anyone can read, an overall description a manager can read, and specific requirements an engineer builds from. The same content, at three depths.
>
> Two sections earn special attention because they are where unstated beliefs get written down:
>
> - **1.3 Definitions, acronyms, and abbreviations** exists because of the elicitation topic's warning that *"application specialists may use language that isn't easy for the requirements engineer to understand."* A glossary is the defence against ambiguity between domains.
> - **2.5 Assumptions and dependencies** is where you record what you are **taking for granted**. If an assumption later proves false, this section is what lets you find every requirement that rested on it.

## Requirements validation

> [!EXAM]
> **The purpose of requirements validation is to help ensure that the requirements do what the customer wants.** This is important because **repairing requirement errors in downstream phases can be expensive.**
>
> | | Question |
> |---|---|
> | **Validation** | Determines whether the requirements, **if implemented, will solve the right problem and satisfy the intended user needs** |
> | **Verification** | Determines whether the requirements **have been specified correctly** |
>
> **Reviews are used for both validation and verification.**

> [!EXAM]
> **Techniques:**
>
> - **Requirement reviews** — the primary technique.
> - **Prototyping** — *a prototype facilitates user involvement during the requirements engineering phase and ensures engineers and users have the same interpretation of the requirements.* Most beneficial in **systems with many user interactions** (e.g. design of online billing systems); **systems with little or no user interaction may not benefit as much** (e.g. batch processing).
> - **Model validation** — **ensuring the models represent all essential functional requirements**, **demonstrating each model is consistent in itself**, and **usage of the Fish Bone Analysis technique**.
> - **Acceptance criteria** — **check if there are requirements matching the acceptance criteria.**

> [!TRAP]
> **Validation and verification appear here, at requirements time, and again in the testing topics** — and they mean the same thing in both places, applied to different artifacts.
>
> Boehm's formulation, which the testing topic states directly: **verification is "are we building the product right?"; validation is "are we building the right product?"**
>
> Applied to requirements: verification asks whether the document is well-formed (unambiguous, consistent, complete); validation asks whether the document describes the system the customer actually needs. **A perfectly verified SRS for the wrong system is a total loss** — which is why validation is the one the deck emphasises.

> [!INTUITION]
> The prototyping guidance contains a real cost-benefit rule rather than a platitude. Prototypes are **expensive** and they pay off in proportion to **how much of the requirement lives in the interaction**.
>
> For an online billing screen, most of what the user cares about *is* the interaction — so showing them beats describing it. For a nightly batch job, the behaviour is a specification, not an experience; there is nothing to show, and a prototype adds cost without reducing misunderstanding.

## Requirements management

> [!EXAM]
> **Requirements specification is the baseline on which the future lifecycle phases will need to build upon.**
>
> **Why might requirements change?**
> - **Better understanding of the problem**
> - **Customer internalizing the problem and solution**
> - **Evolving environment and technology landscape**
>
> **Facets of requirements management:**
> - **Ensuring that the requirements are all addressed in each phase of the lifecycle**
> - **Ensuring that the changes in the requirements are handled appropriately**

> [!INTUITION]
> Notice that **none of the three reasons for change is a mistake.**
>
> Requirements do not change mainly because somebody was careless. They change because **understanding improves** — the customer sees a prototype and realises what they actually wanted; the team learns the domain; the market moves. Change is **evidence of learning**, not of failure.
>
> This is the same conclusion the Agile topic reached from the other direction: *"expect the system requirements to change, and so design the system to accommodate these changes."* The difference is only in the response — a formal change process here, incremental re-planning there.

## The Requirements Traceability Matrix

> [!EXAM]
> **Requirements are traced across the SDLC using the requirement traceability matrix (RTM):**
> - **Forward tracing**
> - **Backward tracing**
>
> **Every phase of the SDLC progressively fills the RTM:**
>
> | Req ID | Architectural Section | Design Section | File / Implementation | Unit Test ID | Functional Test ID | System Test ID | Acceptance Test ID |
> |---|---|---|---|---|---|---|---|
> | | | | | | | | |

> [!DERIVE]
> **What the two directions actually answer.**
>
> - **Forward tracing** — start at a requirement, follow the row rightwards: *is this requirement designed, built and tested?* Catches **requirements that were dropped or forgotten.**
> - **Backward tracing** — start at a piece of code or a test, follow leftwards: *which requirement asked for this?* Catches **work that nobody asked for** — gold-plating, and features that survived a "Won't have" decision.
>
> A blank cell is a defect in either direction. **An empty test column means an untested requirement; an orphan file with no Req ID means unrequested code.**
>
> Note the four separate test columns — unit, functional, system, acceptance. Those are the **levels of testing** from topic 15, and the RTM is what connects each level back to the requirement it justifies.

> [!TRAP]
> **The RTM is filled *progressively*, not written at the end.** A matrix reconstructed after delivery documents what was built; it cannot tell you what was **missed**, because the missing rows are exactly the ones nobody will think to add.

## Requirements change management

> [!EXAM]
> - **Changes in requirements have impacts on plans, work products etc.**
> - **Uncontrolled changes can have a huge adverse impact on a project in terms of cost, schedule, quality and expectations.**
> - **Change requests go through a formal change management process.**

> [!EXAM]
> **The requirement change process, as the deck diagrams it:**
>
> 1. **Log the request for change and assign a change request identifier.**
> 2. **Log: who is requesting the change · why the request is coming in · what is being requested to change.**
> 3. **Perform impact analysis & estimate impact. Review impact with stakeholders.**
> 4. **Solicit formal approval as part of the approval process.**
> 5. **Rework the work products/items.**
> 6. **Log the following post changes:** when it was changed · who made the changes · who reviewed the changes · who tested the changes · **which release stream the change is going into.**

> [!INTUITION]
> The shape of this process is worth naming: **log → assess → approve → do → log again.** Four of the six steps are recording and deciding; **only one is actually changing anything.**
>
> That ratio is the point. The expensive part of a change is rarely the edit — it is the **unanticipated consequences**, which is what step 3's impact analysis exists to surface *before* approval rather than after. And the RTM is what makes impact analysis possible at all: to know what a change affects, you follow the requirement's row across.
>
> **Step 4 is the one that stops the process being theatre.** If approval can be skipped, the log becomes a record of changes that were going to happen anyway. Note the symmetry too — you log **before** (who, why, what) and **after** (when, who changed, who reviewed, who tested, which release). Together they form the audit trail, which is the same "track over time rather than overwrite" principle that good data design follows.

## Agile methods and requirements

> [!EXAM]
> - **Many agile methods argue that producing detailed system requirements is a waste of time**, as requirements change so quickly. **The requirements document is therefore always out of date.**
> - **Agile methods usually use incremental requirements engineering and may express requirements as "user stories".**
> - **This is practical for business systems but problematic for systems that require pre-delivery analysis (e.g. critical systems) or systems developed by several teams.**

> [!TRAP]
> This slide is even-handed and exam answers should be too — it states the agile critique **and** its two limits.
>
> The critique is real: a 200-page SRS that is obsolete on delivery consumed effort for no benefit. But the deck names exactly where the alternative fails:
>
> - **Critical systems** need **pre-delivery analysis.** You cannot discover a safety property incrementally in a medical device or an aircraft — regulators require the analysis *before* anyone is at risk, which is the **legislative/safety** branch of the NFR taxonomy.
> - **Several teams** need a **shared, written interface.** User stories work when one team holds the whole picture in conversation; across many teams the specification *is* the coordination mechanism.
>
> The honest conclusion — consistent with the Lean principle *"decide as late as possible"* — is that **documentation should be proportionate to the cost of being wrong.** Business system with fast feedback: light. Safety-critical system with many teams: heavy.

---

**Next:** the modelling notation used to capture requirements visually — **UML & use cases**.
