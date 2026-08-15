---
subject: se
unit: 1
order: 8
slug: requirements-elicitation
title: Requirements Engineering & Elicitation
summary: Where requirements sit in the lifecycle and the levels of abstraction, the nine properties of a single requirement and the five of a set, the in-class rewriting exercise, the four-plus-one process, and active versus passive elicitation techniques.
minutes: 15
tags: [requirements, elicitation, feasibility-study, properties, MoSCoW, stakeholders, abstraction, standish]
---

# Requirements Engineering & Elicitation

## Where requirements sit

> [!NOTE]
> **Virtually all SDLC models have the following stages**, and **requirements are at the top of the list as we start the journey of product development:**
>
> **Requirements → Design → Implementation → Testing → Release → Maintenance**

### Levels of abstraction

> [!EXAM]
> | Level | What it fixes |
> |---|---|
> | **Requirements** | High-level **"what"** needs to be done |
> | **Architecture (High-Level Design)** | High-level **"how"**, mid-level **"what"** |
> | **Design (Low-Level Design, e.g. design patterns)** | Mid-level **"how"**, low-level **"what"** |
> | **Code** | Low-level **"how"** |

> [!INTUITION]
> This is the same ladder the **SDLC & Process Models** topic introduced, and the pattern is worth restating because it is the reason requirements must avoid implementation detail:
>
> **each level's "how" becomes the next level's "what."**
>
> If a requirement already specifies *how*, it has stolen the architecture level's job — and it has done so at the point where you know least about the system. That is precisely what the Don'ts list below is guarding against.

## What a requirement is

> [!EXAM]
> - A **requirement is the property which must be exhibited by software developed/adapted to solve a particular problem.**
> - **A requirement should specify the externally visible behavior of *what* and not *how*.**
> - Requirements engineering is **the first step in any software-intensive development lifecycle irrespective of model**. It is:
>   - **Difficult, error prone and costly**
>   - **Critical for successful development of all downstream activities**
>   - **Requirement errors are expensive to fix**

The deck illustrates that last point with a **cost-of-repair-as-a-function-of-time** curve — the familiar exponential rise, where a defect caught in requirements costs a fraction of the same defect caught after release.

> [!TRAP]
> *"Externally visible behavior"* is the operative phrase and the one that decides borderline cases. A requirement describes what an observer **outside** the system can see it do.
>
> "The system shall store passwords using bcrypt" is not externally visible — it is a design decision. "The system shall not store passwords in recoverable form" **is** externally visible, and it leaves the design free.

## Properties of an individual requirement

> [!EXAM]
> The deck's diamond diagram lists **nine properties** that each individual requirement must have:
>
> **Clear · Concise · Consistent · Unambiguous · Feasible · Traceable · Verifiable · Prioritized · Quantifiable**
>
> With the definition it spells out: **Concise — requirements should describe a single property.**

> [!INTUITION]
> The nine are not nine unrelated virtues; they sort into three groups by **who is being protected**:
>
> - **Clear, Concise, Unambiguous** — protect the *reader*. Everyone must understand the same thing.
> - **Verifiable, Quantifiable** — protect the *tester*. There must be a check that passes or fails.
> - **Feasible, Traceable, Prioritized, Consistent** — protect the *project*. It must be buildable, followable, orderable, and non-self-contradicting.
>
> **Concise is the sneaky one.** "Describe a single property" sounds like style advice, but a requirement bundling two properties cannot be traced or prioritised — you cannot half-implement it or defer half of it. The exercise below shows exactly that.

## The in-class exercise

The deck asks you to **use the properties of requirements to transform the given sentences into requirements**. This is the most exam-relevant page in the lecture, because it shows the *repair*, not just the rule.

> [!EXAM]
> | Bad | Rewritten | Properties fixed |
> |---|---|---|
> | *All screens must appear quickly on the monitor* | **When the user accesses any screen, it must appear on the monitor within 2 seconds** | **Clear, Concise, Unambiguous, Verifiable, Measurable** |
> | *The replacement control system shall be installed with no disruption to production* | **…shall be installed causing no more than 2 days of production disruption** | **Feasible** |
> | *The system must generate a batch end report and a discrepancy report when a batch is aborted* | **The system must generate a batch end report when a batch is completed or aborted** · **The system must generate a discrepancy report when a batch is aborted** | **Traceable** |
> | *The system must be user friendly* | **The user interface shall be menu driven. It shall provide dialog boxes, help screens, radio buttons, dropdown list boxes, and spin buttons for user inputs** | **Verifiable** |

> [!DERIVE]
> **Read the third row carefully — it is the subtlest.** The original is not vague; it is **two requirements in one sentence**, and it is also *wrong*: it says both reports are generated when a batch is **aborted**, when in fact the batch end report is also needed on **successful completion**.
>
> Splitting it into two does three things at once: each becomes **Concise** (one property each), each becomes independently **Traceable** to its own test, and the error in the original condition surfaces and gets fixed.
>
> **A bundled requirement hides bugs.** That is the real argument for Concise.

> [!TRAP]
> The second row shows that **"no disruption" is not a strong requirement, it is an infeasible one.** Requirements that demand perfection — zero downtime, no bugs, complete security — cannot be met or verified, so they are quietly ignored during construction.
>
> Replacing an absolute with a **budget** ("no more than 2 days") makes it something a team can actually design against and a tester can actually check.

## Properties of a *set* of requirements

> [!EXAM]
> A set of requirements — as opposed to each requirement individually — must be:
>
> **Realistic · Complete · Correct · Modifiable · Ranked for Importance or Stability**
>
> **When there are many requirements but limited time or budget, choices must be made about which to include or exclude.** Factors affecting the **stability** of requirements:
> - **changes in customer needs**
> - **improved developer understanding of the products**
> - **changes in organizational policy**

> [!INTUITION]
> Why does a *set* need its own properties? Because some defects are **invisible in any single requirement**.
>
> One requirement cannot be *incomplete* — the gap is between requirements. One requirement cannot conflict with itself. And **"Ranked for Importance or Stability"** is meaningless for a single item: ranking only exists across a collection.
>
> Note the *two* ranking axes. **Importance** answers "what do we build first?" **Stability** answers "what is likely to change?" — and the most dangerous work is the item that is both important and unstable, because you must build it early and will probably build it twice.

## Do's and don'ts of requirements gathering

> [!EXAM]
> **Do's:**
> - **Talk to the customers** — to learn how they work and what they need from the product
> - **Ask questions throughout the process** — identify hidden requirements
> - **Understand the "why" part of their activity and not just the "what"**
> - **Expect requirements to change later** — during and after development
>
> **Don'ts:**
> - **Be too specific or detailed** for requirements
> - **Elaborate on implementation complexity or logic** behind the system
> - **Describe "how" it will be implemented, including UX**
> - **Try to think of implementation and associated details**
> - **Add unnecessary features not wanted by the customers**

> [!TRAP]
> **Four of the five Don'ts are the same mistake**: drifting from *what* into *how*. The fifth — adding features nobody asked for — is **gold-plating**, which the Lean topic classified as waste.
>
> Note also *"understand the why and not just the what"* sitting opposite *"don't describe how"*. Requirements engineering wants the **why** (motivation, which lets you propose better solutions) and the **what** (observable behaviour), while explicitly refusing the **how**. This is exactly the three-part user-story template — *as a `<user>` I want `<function>` so that `<result>`* — where the "so that" clause carries the why.

> [!NOTE]
> The deck cites the **Standish CHAOS Report 2015**: **customer involvement is the 3rd highest factor of project success.** This is the same evidence base as the Standish figures in the **Introduction to SE** topic, and it is the empirical case for the first Do.

## Feasibility study

> [!EXAM]
> **What:** a **short, low-cost study to assess the practicality of the project and whether it should be done.**
> **When:** **mostly done before beginning a project.**
>
> **Activities:**
> - Figure out the **client / sponsor / user** who would have a stake in the project
> - Find the **current solution** to the problem
> - Find the **targeted customers and the future marketplace**
> - **Potential benefits** · **Scope**
> - **High-level block-level understanding of the solution**
> - **Considerations of technology** · **Marketing strategy** · **Financial projection**
> - **Schedule, high-level planning and budget requirements**
> - **Issues, assumptions, risks and constraints**
> - **Alternatives and their consideration** · **Potential project organization**
>
> **It ends with a GO or NO-GO.**

> [!INTUITION]
> **"Short, low-cost"** and **"ends with GO or NO-GO"** define the whole activity. A feasibility study is a **cheap option on an expensive decision** — you spend a little to find out whether to spend a lot.
>
> That framing tells you the failure mode: a feasibility study that grows long and expensive has defeated its own purpose, and one that cannot return **NO-GO** was never a study, only a formality.

## The requirements engineering process

> [!EXAM]
> **A "four + one" set of activities** to produce specifications or requirements. **It is an iterative process.**
>
> $$\textbf{Elicitation} \rightarrow \textbf{Analysis} \rightarrow \textbf{Specification} \rightarrow \textbf{Validation}$$
>
> — steps 1 to 4, with an arrow looping **back from Validation to Elicitation** — plus, standing apart:
>
> **Requirements Management** *(the "+ one")*
>
> **Requirements Validation — helps ensure the right requirements are realized.**

> [!TRAP]
> **Why Requirements Management is the "+ one" and not "step 5" is the point of the diagram.**
>
> The four steps are a **cycle you iterate**. Management is **continuous and runs alongside all of them**, and it does not stop when specification is signed off — it continues through the entire lifecycle, because requirements keep changing after they are agreed.
>
> Drawing it as a fifth sequential box would say "do management once, at the end," which is exactly wrong.

## Requirements elicitation

> [!NOTE]
> Elicitation is **the process of working proactively with all stakeholders, gathering their needs, articulating their problem, identifying and negotiating potential conflicts, thereby establishing a clear scope and boundary for a project.**
>
> **It involves:** understanding the problem · understanding the domain · identifying clear objectives · understanding the needs · understanding constraints of the system stakeholders · **writing business objectives for the project**.

> [!INTUITION]
> The word is **elicitation**, not "collection," and the difference is the whole discipline.
>
> Collecting implies requirements already exist and stakeholders will hand them over. **Eliciting** admits they are partly unknown, partly contradictory between stakeholders, and partly so obvious to a domain expert that they will never think to mention them.
>
> Note **"identifying and negotiating potential conflicts"** — conflict between stakeholders is treated as *expected*, not as a failure. Different stakeholders genuinely want different things, and somebody has to arbitrate.

### Elicitation techniques — active and passive

> [!EXAM]
> The approach is based on **the nature of the system being developed** and **the background and experience of stakeholders**.
>
> | **Active** — *ongoing interaction* between stakeholders and users | **Passive** — *infrequent interaction* |
> |---|---|
> | **Interviews** | **Use cases** |
> | **Facilitated meetings** | **Business process analysis & modeling** |
> | **Role-playing** | **Workflows** |
> | **Prototypes** | **Questionnaires** |
> | **Ethnography** | **Checklists** |
> | **Scenarios** | **Documentation** |

> [!TRAP]
> The split is by **frequency of interaction**, not by effort or by value — so do not read "passive" as "lazy" or "worse."
>
> A questionnaire reaches a thousand users that no interview schedule could; documentation analysis surfaces the regulatory constraints nobody remembers to mention. What passive techniques cannot do is **follow up on a surprising answer**, which is exactly what active techniques exist for.
>
> Real projects mix both, and the choice is driven by the two stated factors — the nature of the system, and who the stakeholders are.

## Requirements analysis

> [!EXAM]
> The process of requirements analysis:
> - **Understand requirements in depth**
> - **Classify requirements into coherent clusters**
> - **Model the requirements**
> - **Analyze requirements using a fishbone diagram**
> - **Recognize and resolve conflicts**
> - **Negotiate requirements**
> - **Prioritize requirements — MoSCoW (Must have, Should have, Could have, Won't have)**
> - **Identify risks**
> - **Decide on build or buy — COTS solution**

> [!EXAM]
> **The clusters requirements are classified into:**
>
> **Functional · Non-functional · User · System · Domain**
>
> The first two get their own topic next; **user, system and domain requirements** are covered there too.

> [!INTUITION]
> **MoSCoW's real content is the "W".** Must / Should / Could is an ordinary three-level priority scale, and any scheme has one.
>
> **"Won't have"** is the unusual part: it forces an explicit, recorded decision **not** to build something *in this release*. Without it, low-priority items are never rejected — they sit at the bottom of the list forever, get re-discussed every planning meeting, and leave stakeholders assuming they are still coming.
>
> **Saying no explicitly is cheaper than saying "maybe later" indefinitely.**

---

**Next:** the two big categories in detail — **functional & non-functional requirements**.
