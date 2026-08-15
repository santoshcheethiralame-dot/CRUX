---
subject: se
unit: 1
order: 7
slug: xp-lean-agile
title: Extreme Programming & Lean Agile
summary: XP's goal and its twelve core practices from the planning game through to sustainable pace, then Lean Agile's aim of minimising waste and its seven principles.
minutes: 13
tags: [XP, extreme-programming, TDD, pair-programming, refactoring, continuous-integration, lean, waste, kanban]
---

# Extreme Programming & Lean Agile

## What XP is

> [!NOTE]
> **Extreme Programming is a software development methodology that's part of what's collectively known as agile methodologies.**
>
> **XP is built upon values, principles, and practices, and its goal is to allow small to mid-sized teams to produce high-quality software and adapt to evolving and changing requirements.**

> [!INTUITION]
> The name comes from taking known-good practices and pushing them to their extreme. If code review is good, review **continuously** — that is pair programming. If testing is good, test **before writing the code** — that is TDD. If integration is good, integrate **several times a day** — that is continuous integration.
>
> Every practice below is a familiar idea with the dial turned all the way up.

---

## The twelve core practices

### 1 — Planning Game

> [!NOTE]
> The main planning process in XP. **There are two levels of plans:**
>
> - **Release planning** — the team and **stakeholders/customers collaboratively decide what requirements and features can be delivered into production, and when.** Based on **priorities, capacity, estimations and risk factors** of the team.
> - **Iteration planning** — the team **picks the most valuable items** from the list, **breaks them down into tasks**, then **estimates and commits to delivering** at the end of the iteration.

### 2 — Simple design

> [!NOTE]
> **The team will not do complex or big architecture and designs upfront**; instead it **starts with a simple design and lets it emerge and evolve over a period of iterations.** The code is **frequently refactored** so it stays **maintainable and free of technical debt**. **Simple designs make the "definition of done" easier.**
>
> XP teams conduct a small test or proof-of-concept workout called a **spike**. The outcome helps the team **understand the validity of the hypothesis, gauge the complexity of the solution, and feel assured to estimate and build**.

> [!EXAM]
> A **spike** is a small, timeboxed experiment run purely to **reduce uncertainty before estimating**. It is not a deliverable — its output is knowledge.

### 3 — Test-Driven Development (TDD)

> [!EXAM]
> **Developers write the unit test cases BEFORE starting the coding.** The team **automates the unit tests**, which helps during **build and integration**. The main benefit is that **programmers have to only write the code that passes the tests.**
>
> **The basic TDD steps:**
> 1. **Write the unit test case first**
> 2. **Write a minimal amount of code to pass the test**
> 3. **Refactor it** by adding the needed feature and functionality, **while continuously making sure the tests pass**

> [!INTUITION]
> "Only write the code that passes the tests" is the real payoff, and it is a **scope control** mechanism as much as a quality one. You cannot gold-plate a feature nobody asked for if the only code you are allowed to write is code a test demands.
>
> Writing the test first also forces you to **use the interface before you build it**, which surfaces awkward designs immediately rather than after everything depends on them.

### 4 — Code standard

> [!NOTE]
> Organizations want programmers to hold to a **well-described and standard style of coding**. Since there are **multiple programming pairs at play**, coding standards create **consistency in code, style, naming convention, exception handling and use of parameters.**
>
> **These standards must be defined and agreed before the team starts the coding.** They make the code **simple to understand**, help **detect problems quickly**, and **increase the efficiency of the software.**

### 5 — Refactoring

> [!NOTE]
> **Restructuring or reconstructing existing things.** Over time the team produces lots of working code which **increases the complexity of the whole**. To avoid this:
> - Ensure **code or functions are not duplicated**
> - **No long functions or methods**
> - **Removing unnecessary variables**
> - **Proper use of access modifiers**
>
> By refactoring, programmers **improve the overall code quality and make it more readable without altering its behavior.**

> [!EXAM]
> **"Without altering its behavior"** is the defining clause of refactoring, and the one exam questions hinge on. Change what the code *does* and it is not refactoring — it is a feature change or a bug fix.
>
> This is also why refactoring **requires tests**: they are what prove the behaviour did not change.

### 6 — Pair programming

> [!NOTE]
> **Two programmers operating on the same code and unit test cases, on the same system — one display and one keyboard.**
>
> | Role | Focus |
> |---|---|
> | **Pilot** | **Clean code**; compiles and runs it |
> | **Navigator** | **The big picture**; reviews code for **improvement or refactoring** |
>
> **Every hour, or after a given period, the pair switches roles** so the pilot becomes navigator and vice versa. **The pairs themselves are not fixed and are frequently swapped** — the main benefit being that **over time everyone gets to know the code and functionality of the whole system.**

> [!INTUITION]
> Two people on one keyboard looks like halved productivity, which is the standard objection. The counter-arguments are all in the description: **review happens continuously rather than as a later gate**, and **swapping pairs spreads knowledge of the whole system**.
>
> That second effect is the underrated one — it is insurance against the situation where only one person understands a critical component.

### 7 — Collective code ownership

> [!NOTE]
> By following pair programming, **the XP team always takes collective ownership of code.** **Success or failure is a collective effort and there is no blame game.** **There is no one key player**, so **if there is a bug or issue, any developer can be called to fix it.**

### 8 — Continuous integration

> [!NOTE]
> Developers pair-program on **local versions** of the code. There is a need to **integrate changes every few hours or on a daily basis**, so after every compilation and build it is integrated, where **all tests are executed automatically for the entire project.**
>
> **If the tests fail, they are fixed then and there**, so any chance of **defect propagation and further problems** is avoided **with minimum downtime.**

> [!TRAP]
> Notice the causal claim: integrating often is not about tidiness, it is about **defect propagation**. The longer a broken change sits unintegrated, the more work is built on top of it — so the cost of the fix grows with the delay.
>
> This is precisely the discipline missing in the **CrowdStrike** case: automated tests against real configurations, run on every build.

### 9 — Small release

> [!NOTE]
> A cross-functional team **releases a Minimum Viable Product (MVP) frequently.** Small releases help **break down complex modules into small chunks of code**, and help the developer team and the **on-site customer** demonstrate the product and **focus only on the least amount of work that has the highest priority.**

### 10 — System metaphor

> [!NOTE]
> **Mainly related to user stories** — the stories **must be simple enough to be easily understood by user and developers, and to relate to code.**
>
> It can be a **naming convention** used in design and code to give teams a **shared understanding**. For example **`Order_Food()`** is easily explained — it will be used to order food. It is **easy for the team to relate to the functionality of a component just by looking at its name.**

### 11 — Onsite customer

> [!EXAM]
> **A role similar to the Product Owner in Scrum.** The onsite customer is responsible for **crafting the vision, defining user stories and acceptance criteria, the definition of "done", and release planning.**
>
> They are **experts who know the domain or product** and know how to **generate return on investment (ROI) by delivering the MVP.**
>
> **If the role is not full time**, it can be filled by **product managers, product owners, UI-UX designers and business analysts — called proxies.**
>
> **"On-site" implies the customers or their representatives sit with the rest of the team** so that **communication flows freely.**

### 12 — Sustainable pace

> [!NOTE]
> **A people-centric practice.** Practices like **TDD, continuous integration and refactoring** help **proactively improve the quality and stability** of the working software.
>
> XP maintains a sustainable pace by **introducing down time during the iteration.** The team is **not doing actual development at this time but acts as a buffer to deal with uncertainties and issues.** Teams can use the **slack time to pay down technical debt by refactoring code, or do research to keep up the pace.**

> [!INTUITION]
> Deliberately planning **slack** is the practice most often cut first and most costly to lose. A schedule with no slack has no capacity to absorb the unexpected — so the first surprise consumes time that was promised to something else, and the team starts borrowing against quality.
>
> **Slack is what converts an estimate into a plan that survives contact with reality.**

---

## Lean Agile

> [!NOTE]
> **Lean-Agile is a set of principles and practices for working that aims to minimise waste while maximising value.** This enables organisations to **make quality a priority in their products and services.**

### The seven principles

> [!EXAM]
> | Principle | What it means |
> |---|---|
> | **Eliminate waste** | Waste is **anything that doesn't add value to a product — value as perceived by the customer**. Anything **produced or sitting around that doesn't get used**; developers **coding more features than are immediately needed**; **time lost shifting development from one group to another** |
> | **Amplify learning** | *"Like trying to put together a new recipe for a top restaurant dish — a chef will iterate and learn from the variations produced."* Software is more complex and teams are big, but amplifying learning **makes the discovery process possible** |
> | **Decide as late as possible** | With many unknowns — which processor, which language, which screen, will functionality change with market feedback — **there's no value in speculating. Delay decisions until you have the facts** |
> | **Deliver as fast as possible** | *"Design, implement, feedback, improve"* and repeat. Speed **enables informed decisions with real feedback**. A short cycle **amplifies learning** and ensures **customers get what they need now, not what they needed yesterday** |
> | **Empower the team** | **The people doing the work understand the details best.** Involve technical teams in **the details of technical decisions**; enable **pull techniques and local signalling mechanisms (like Kanban)**. So long as a leader guides, *"they will make better technical and process decisions than anyone can make for them"* |
> | **Build integrity in** | More than customers being happy — **perceived integrity**; and beyond **conceptual integrity** where the whole works seamlessly. For software it means it **can evolve smoothly over time**, having **coherent architecture, high usability and fitness for purpose, and being maintainable, adaptable and extensible.** For the team, integrity comes from **wise leadership, relevant expertise, effective communication and healthy discipline** |
> | **Optimize (see) the whole** | **Don't just look at one area.** *"Quite often, the common good suffers if people attend first to their own specialised interests."* Instead of measuring people's **specialised contribution**, look at **the overall performance of the project** |

> [!TRAP]
> **"Decide as late as possible" is not procrastination**, and that is the distinction exams probe. It means **defer the decision until the last responsible moment** — the point after which delaying starts to cost you.
>
> The justification is stated plainly: *"there's no value in speculating."* A decision made early, on guesses, is not more decisive than one made later on facts — it is just more likely to be wrong and more expensive to reverse.

> [!INTUITION]
> **"Value as perceived by the customer"** is the phrase that makes *eliminate waste* usable. Without it, "waste" is a matter of opinion; with it, there is a test — *would the customer pay for this?*
>
> The examples are pointed. **Features coded before they are needed are waste**, even though writing them felt productive — they are inventory sitting unused, and they still have to be maintained. And **handoffs between groups are waste**, which is the argument for cross-functional teams.
>
> The final principle guards against the rest going wrong: optimise one team's throughput hard enough and you can easily make the **whole** system slower. **Local optimisation is not global optimisation.**

---

**Next:** working out what to build in the first place — **requirements engineering & elicitation**.
