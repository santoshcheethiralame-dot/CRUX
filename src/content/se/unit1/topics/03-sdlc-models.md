---
subject: se
unit: 1
order: 3
slug: sdlc-models
title: The SDLC & Process Models
summary: Why an ad-hoc process fails, what a software process actually specifies, the levels of abstraction, and the legacy models — Waterfall, V, iterative, incremental and Spiral — with their advantages, disadvantages and shared limitations.
minutes: 14
tags: [SDLC, waterfall, V-model, iterative, incremental, spiral, software-process, levels-of-abstraction, boehm]
---

# The SDLC & Process Models

## How software gets developed without a process

> [!NOTE]
> The deck's honest starting picture — the loop most people actually fall into:
>
> **Discuss the software that needs to be written → Write some code → Test the code to identify the defects → Debug to find causes of defects → Fix the defects** → *(back to writing code)*

It then asks: **what does a software engineer's day actually look like?** — how many hours in meetings, coding, testing, debugging? The **idealised** picture is mostly *productive development (coding, testing, making progress towards goals)*. The reality contains a great deal that is not that.

> [!INTUITION]
> The point of that sequence of slides is to make one thing land: **the bottleneck is rarely typing code.** It is rework, waiting, miscommunication, and discovering late that you built the wrong thing.
>
> Every process model in this topic is an attempt to move discovery **earlier**, because a defect found in requirements costs a conversation, and the same defect found after release costs an outage.

### Improving the reliability of the process

> [!EXAM]
> The deck's own list of fixes — note that **none of them is about programming better**:
>
> - **Writing down all requirements**
>   - **Review** requirements
>   - **Require approval for all changes** to requirements
> - **Use version control for all changes**
>   - **Code reviews**
> - **Track all work items**
>   - **Break down development into smaller tasks**
>   - **Write down and monitor all reported bugs**
>   - **Hold regular, frequent meetings**

---

## Is a more structured SDLC necessary?

> [!NOTE]
> - It establishes an **order — provides a model — in which software project events occur from project conception to project delivery.**
> - It **forces us to think of the "big picture"** and follow steps so that we reach it **without glaring deficiencies**.
> - **Without it we may make decisions that are individually on target but collectively misdirected.**
> - It allows us to **organize and coordinate our work as a team**.
> - It allows us to **track progress and risks, and adjust as necessary**.

> [!INTUITION]
> *"Individually on target but collectively misdirected"* is the sentence to remember. Every local decision can be defensible while the system as a whole drifts somewhere nobody intended.
>
> That is a **coordination** problem, not a competence problem — and it is precisely why a team needs a shared process even when every individual is good at their job.

---

## What a software process is

> [!EXAM]
> **A software process is a structured set of activities and associated outcomes (intermediate and final) that produces a software product.**
>
> **Each activity is defined in terms of:**
>
> | Element | Question it answers |
> |---|---|
> | **Entry criteria** | What conditions must be satisfied **for initiating** this phase |
> | **Task and its deliverable** | What should be **done** in this phase |
> | **Exit criteria** | When can this phase be considered **done successfully** |
> | **Who** | Who is **responsible** |
> | **Dependencies** | What are the **dependencies** for this phase |
>
> **Note: each step can be a process itself.**

> [!TRAP]
> **Entry and exit criteria are the parts people skip, and they are what make a process real.** Without an exit criterion, "design is finished" is an opinion — and the CrowdStrike case is exactly what happens when a change proceeds without a defined readiness gate.

Two further activities the deck flags as **part of the software development process**: **configuration management** and **change management**.

---

## Levels of abstraction

> [!EXAM]
> | Level | What it captures |
> |---|---|
> | **Requirements** | high-level **"what"** needs to be done |
> | **Architecture** (high-level design) | high-level **"how"**, mid-level **"what"** |
> | **Design** (low-level design, e.g. design patterns) | mid-level **"how"**, low-level **"what"** |
> | **Code** | low-level **"how"** |

> [!INTUITION]
> Notice the **interlocking pattern**: each level's *"how"* becomes the next level's *"what"*. Architecture answers *how* the requirements will be met, and that answer becomes the specification design must satisfy.
>
> This is why a decision made too high up is expensive to reverse — it is not one decision, it is **the "what" for everything below it.**

### The SDLC itself

> [!NOTE]
> The **Software Development Lifecycle** as the deck draws it — a **cycle**, not a line:
>
> **Requirement Analysis** *(feasibility study, requirements)* → **Design** *(architecture, design)* → **Implementation** → **Testing** → **Maintenance** → *(back to requirements)*

The deck also distinguishes several related lifecycles:

| Lifecycle | Scope |
|---|---|
| **SDLC** — Software Development | Building the software |
| **PDLC** — Product Development | **Brainstorm → Define → Design → Test → Launch** |
| **PMLC** — Project Management | Managing the project |
| **SMLC** — Software Maintenance | Sustaining it after release |

The **Product Development Lifecycle** stages, in brief:
- **Brainstorm** — an active discovery stage generating ideas about the user and their needs; also the time to **check competitors** and identify whether similar products exist, so yours **fills a gap or solves a problem better**.
- **Define** — figure out the specifications: **who is the product for, what will it do, what features are needed** for it to succeed.
- **Design** — turn insights into designs: **wireframes** (outlines/sketches), then **prototypes** (early models conveying functionality).
- **Test** — evaluate designs on user feedback, through **alpha testing** (internal, for technical glitches and usability problems) and **beta testing** (external, with potential users, to check the experience is **usable, equitable, enjoyable and useful**).
- **Launch** — share the finished version publicly, then **reflect**: what worked, what could improve, were goals achieved, were timelines met.

> [!EXAM]
> **Alpha = internal testing by the team. Beta = external testing with real potential users.** A commonly asked pair.
>
> And note the closing observation: for a **physical** product launch may end the lifecycle, but for a **digital** product teams **cycle back to design and testing** for the next version.

---

## Waterfall

> [!NOTE]
> - **Top-down approach**
> - **Sequential, non-overlapping** activities and steps
> - **Each step is signed off on and then frozen**
> - **Most steps result in a final document**

> [!EXAM]
> | **Advantages** | **Disadvantages** |
> |---|---|
> | Simple | **Assumes requirements are frozen** |
> | Clear identified phases | Difficult to change & sequential |
> | Easy to manage due to rigidity | Poor model for long projects |
> | Each phase — specific deliverables + reviews | **Big Bang approach** |
> | Easy to departmentalize and control | **High risk + uncertainty** |

**When can you use this model?**
- **Pure form: short projects where requirements are well known**
- **Product definition is stable & technology is understood**
- **Regulatory requirements**
- **When product requirements are very well understood and won't change**

> [!INTUITION]
> Notice that Waterfall's advantages and disadvantages are **the same property viewed twice**. "Easy to manage due to rigidity" and "difficult to change" are one fact. "Each step signed off and frozen" is both the control and the trap.
>
> So the question is never *"is Waterfall good?"* but **"is my situation one where freezing is realistic?"** — which is why the deck lists **regulatory requirements** as a genuine fit. When the spec is imposed by law and cannot change, its rigidity costs nothing and its documentation trail is exactly what you need.

---

## The V model

> [!NOTE]
> **Usage: similar to the Waterfall model.**
>
> | **Advantages** | **Disadvantages** |
> |---|---|
> | Similar to Waterfall model | Similar to Waterfall model |
> | **Test development activities can happen before the formal testing cycle** | **No early prototypes** of software |
> | **Higher probability of success + increased effectiveness of resource usage** | **Change in process ⇒ change in test documentation** |

> [!INTUITION]
> The V model is Waterfall **bent into a V**, with each development phase on the left paired to a testing phase on the right — requirements pair with acceptance testing, design with integration testing, and so on.
>
> Its real contribution is the first advantage: **you write the tests for a phase while you are doing that phase**, not months later. Writing the acceptance tests while writing the requirements forces you to ask *"how would I know this was satisfied?"* — a question that catches vague requirements immediately.

---

## Iterative vs incremental

> [!EXAM]
> | **ITERATIVE MODEL** | **INCREMENTAL MODEL** |
> |---|---|
> | **Revisit and refine everything** | **No need to go back and change delivered things** |
> | **Focus on details of things** | **Focus on things not implemented yet** |
> | **Leverage on learnings** | **Does not leverage on experience or knowledge** |

> [!INTUITION]
> The classic picture: **incremental** builds the Mona Lisa one finished strip at a time; **iterative** sketches the whole painting roughly, then refines the whole thing repeatedly.
>
> - **Incremental** = *add more* — each delivery is a new complete piece, and earlier pieces stay as they were.
> - **Iterative** = *improve what's there* — each pass revisits the whole and makes it better.
>
> Real projects almost always do **both at once**: add a new feature (incremental) while refining existing ones from user feedback (iterative). The table is separating two ideas that usually travel together.

---

## Spiral

> [!NOTE]
> - **Originally proposed by Boehm.**
> - Instead of representing the process as a **sequence of activities with some backtracking**, the process is represented as a **spiral**.
> - **Each loop in the spiral represents a phase** of the software process. The **innermost loop** might concern **system feasibility**, the next **requirements definition**, the next **system design**, and so on.

> [!EXAM]
> - **Incremental/iterative model — combines Waterfall and prototyping**
> - Iterations are called **spirals**
> - **Repeat these four activities:**
>   1. **Determine objectives** (requirements)
>   2. **Risk analysis**
>   3. **Develop and test**
>   4. **Plan next delivery**
> - **Phased reduction of risks — address high risks early**
>
> | **Pros** | **Cons** |
> |---|---|
> | **Early indication of unforeseen problems** | **More complex to run** |
> | **Allows for changes** | **Requires proper risk assessment** |
> | **The risk reduces as costs increase** | **Requires more planning and experienced management** |

> [!INTUITION]
> Spiral's distinguishing feature is that **risk analysis is a first-class step in every loop** — no other legacy model does this.
>
> *"The risk reduces as costs increase"* is the whole design goal stated as a curve: you deliberately spend the **early, cheap** loops attacking the **scariest unknowns**, so that by the time you are spending serious money the frightening questions are already answered.
>
> The matching con is honest: this only works **if you can actually assess risk**, which needs experienced management. A spiral run by people who cannot identify the real risks is just an expensive way to iterate.

---

## Limitations of legacy lifecycle models

> [!EXAM]
> The deck's closing list of what these models share — and where they struggle:
>
> - **Predictive** software development methods
> - **Upfront planning**
> - **Do not facilitate periodic customer interaction**
> - Suited for **large complex projects**
> - **Regulatory** perspectives
> - Suited for **global and distributed organizations**
> - **Product lifecycle and its ecosystem**
> - **People and skill perspective**
> - Suitable for projects with **clear definition**
> - Suitable **when things are not changing too fast**

> [!TRAP]
> Read that list carefully — **it is not purely a list of weaknesses.** Several entries ("suited for large complex projects", "regulatory perspectives", "suited for global and distributed organizations") are situations where these models genuinely **win**.
>
> The two real limitations are **"do not facilitate periodic customer interaction"** and **"suitable when things are not changing too fast"** — and those two are exactly what **Agile** was created to address, which is the next topic.

> [!INTUITION]
> The word that ties it together is **predictive**. Every model here assumes you can know enough at the start to plan the whole thing. That assumption holds beautifully for a regulated avionics system and collapses for a consumer app whose market shifts every quarter.
>
> **The choice of process model is really a bet about how much you can know up front** — and the honest answer differs per project, which is why no model is universally correct.

---

**Next:** building security into the process rather than bolting it on — **the Secure SDLC & the 4 Ps**.
