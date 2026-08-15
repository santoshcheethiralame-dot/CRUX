---
subject: se
unit: 1
order: 12
slug: uml-use-cases
title: UML & Use-Case Modelling
summary: UML and the OMG definition, actors and use cases, how to build a use-case diagram with include versus extend, the notation, use-case flow written from the actor's point of view, and the four steps for writing one with the worked checkout example.
minutes: 15
tags: [UML, use-case, actor, include, extend, main-success-scenario, alternate-flow, exception-flow, OMG]
---

# UML & Use-Case Modelling

## What UML is

> [!EXAM]
> **The Unified Modeling Language has become the de-facto standard for building Object-Oriented software.**
>
> **The OMG specification states:** *"The Unified Modeling Language (UML) is a **graphical language for visualizing, specifying, constructing, and documenting the artifacts of a software-intensive system**. The UML offers a standard way to write a system's blueprints, including conceptual things such as **business processes and system functions** as well as concrete things such as **programming language statements, database schemas, and reusable software components**."*
>
> **UML plays an important role in defining different perspectives of a system:** Requirements → Design → Implementation → Deployment.

> [!EXAM]
> **Why is UML used?**
>
> **UML use-case models are predominantly used with modeling systems, to discuss the *dynamic behavior* of the system when it is running/operating.** It is often used **to gather the requirements of a system including internal and external influences.**

> [!INTUITION]
> Two words in the OMG definition carry the weight: **"graphical"** and **"standard."**
>
> Graphical matters because the audience for a requirements model includes **domain experts and end users**, not just developers — and a diagram is readable by people who would never read a specification.
>
> Standard matters more. A private notation invented for one project must be explained before it can be used; a standard one is understood across companies. **The value of a notation scales with how many people already read it**, which is why a de-facto standard beats a better-designed obscure one.

## Use-case diagrams

> [!EXAM]
> - **A use case, from a user's point of view, outlines how the proposed system will perform a task expected to be performed, while responding to a request or task of a role/actor/user.**
> - **Use case diagrams are used to visualize, specify, construct, and document the (intended) behavior of the system, during requirements capture and analysis.**
> - **Used by developers, domain experts and end-users.**

### Actors and use cases

> [!EXAM]
> **Use case models have two important elements — actors and use cases.**
>
> | Element | Definition |
> |---|---|
> | **Actor** | **One or a set of objects who directly interacts with the system.** Every actor has **a defined purpose** while interacting with the system. **An actor can be a person, device or another system.** |
> | **Use case** | **A piece of functionality that a system offers to its users.** |
>
> **The set of all use cases defines the entire functionality of the system.** Use cases **also define the error conditions that may occur while interacting with the system.**

> [!TRAP]
> **"An actor can be a person, device or another system"** is the most-missed point in use-case modelling, and the deck's own diagram proves it.
>
> In the sample **Online Shopping System**, the actors are: **Customer** — a person — but also **`<<service>>` Authentication**, **Identity Provider**, **Credit Payment Service**, and **Credit Card**. Four of the five actors are **not human at all.**
>
> An actor is defined by **being outside the system boundary and interacting across it**, not by being a user. Miss this and you model only the humans, and the entire integration surface of the system — the part most likely to fail — goes unspecified.

### How to create one

> [!EXAM]
> - **List main system functions (use cases) in a column**
> - **Draw ovals around the function labels**
> - **Draw the system boundary**
> - **Draw actors and connect them with use cases**
> - **Specify include and extend relationships between use cases**

> [!EXAM]
> | Relationship | When | Example |
> |---|---|---|
> | **`<<include>>`** | A use case **always calls another use case as part of its behavior** | **"Place Order" always includes "Process Payment"** |
> | **`<<extend>>`** | A use case **optionally adds behaviour to another** | **"Make Payment" can be extended by "Apply Discount", if applicable** |
>
> **Use `include` for reuse, and `extend` for optional or conditional behaviour.**

> [!INTUITION]
> The one-word test: **`include` is *always*; `extend` is *sometimes*.**
>
> They also differ in **which way the dependency points**, which is why they are drawn as separate arrows. With `include`, the base use case **knows about** and calls the included one — "Place Order" is written assuming payment happens. With `extend`, the extending use case **attaches itself** to a base that does not know it exists — "Apply Discount" hooks onto "Make Payment", and payment works fine without it.
>
> **`include` factors out common behaviour** (reuse — the same reason you extract a function); **`extend` adds optional behaviour without editing the original** (which is how you bolt on a promotion without touching the payment flow).

### Notation

> [!EXAM]
> | Symbol | Meaning |
> |---|---|
> | **Use cases** | **Horizontally placed ovals** representing the different functionalities a user might have |
> | **Actors** | **Stick figures** representing the people employing the use cases |
> | **Associations** | **A line between actors and use cases** |
>
> Plus the **system boundary** — a box drawn around the use cases, with actors **outside** it.

> [!NOTE]
> The deck's sample diagram, **Online Shopping System**, contains four use cases inside the boundary — **View items**, **Make purchase**, **Complete checkout**, **Log in** — with **`<<include>>`** arrows running from *Make purchase* to *View items* and from *Complete checkout* to *Make purchase*.
>
> The **Customer** actor sits on the left; **Authentication**, **Identity Provider**, **Credit Payment Service** and **Credit Card** sit on the right, connected across the boundary.

> [!INTUITION]
> The **system boundary box is not decoration** — it is the most important line on the diagram.
>
> Inside it is **what you are building**. Outside it is **what you must interact with but do not control**. Every line crossing the boundary is an **interface you will have to specify, integrate against, and handle the failure of.**
>
> Placing the payment service *outside* the box is a design statement: you are not building payments, you are depending on someone who does — and therefore you need a story for what happens when they are unavailable.

## Use-case flow

> [!EXAM]
> - **A use case is an example behaviour of the system.**
> - **Written from an actor's point of view, not the system's.**
> - **3–9 clearly written steps (flow) lead to a "main success scenario".**
> - **Also used to describe "variation" and "exception" scenarios.**
>
> **Use cases are hugely valuable:**
> - **Capture a level of functionality** (list of goals)
> - **Establish an understanding between the customer and the developers** of the requirements (success scenarios)
> - **Alert developers of variations (extensions) and exceptions (errors) cases to test**

> [!TRAP]
> **"3–9 steps" is a real constraint, not a stylistic suggestion**, and both bounds mean something.
>
> **Fewer than 3** and the use case is not a scenario — it is a single operation that probably belongs as a step inside another use case.
>
> **More than 9** and you have bundled several goals together; the fix is to split, exactly as INVEST's **Small** criterion demands of user stories. A 30-step use case cannot be validated by a customer in one reading, which defeats its purpose.
>
> **"From an actor's point of view, not the system's"** is the other constant slip. Write *"the customer provides credentials"*, not *"the system reads the credential buffer."*

### The worked example

> [!EXAM]
> | | |
> |---|---|
> | **Goal** | **Customer Checkout** |
> | **Actor** | **Customer**, with help from other actors |
>
> **Main flow**
> 1. Customer selects to complete checkout.
> 2. The system requests the customer to log in.
> 3. The customer provides credentials.
> 4. **The system invokes the Authentication service to verify credentials.**
> 5. **The Authentication service delegates to an Identity Provider for validation.**
> 6. Upon successful authentication, the customer proceeds.
> 7. The system displays payment options (e.g. credit card).
> 8. The customer selects Credit Card as the payment method.
> 9. **The system contacts the Credit Payment Service for authorization.**
> 10. Payment is successfully authorized.
> 11. The system confirms the order and shows an order summary.
> 12. Checkout process is completed.
>
> **Alternate flow — Invalid Login Credentials**
> **At Step 4, if authentication fails:**
> **4a.** System displays an error message and asks the user to retry.
> **4b.** Customer may retry login or cancel checkout.

> [!DERIVE]
> **The flow and the diagram are the same model at two zoom levels** — worth checking, because it is how you verify your own work.
>
> Every non-human actor on the diagram appears in the flow: **Authentication** at step 4, **Identity Provider** at step 5, **Credit Payment Service** at step 9. The `<<include>>` from *Complete checkout* to *Make purchase* to *View items* is the ordering the steps walk through.
>
> **The diagram says *what* interacts; the flow says *in what order and with what data*.** Neither is sufficient alone, and if an actor appears in one but not the other, one of them is wrong.

> [!TRAP]
> Note the alternate flow is labelled **"At Step 4"** — the failure is pinned to the **specific numbered step** where it can occur.
>
> This is why the main flow's steps must be numbered. An unnumbered flow cannot carry variations, and *"sometimes login fails"* is not something a developer can implement or a tester can locate.

## Four steps for writing a use case

> [!EXAM]
> **1 — Identify actors and their goals.**
> - **Actors:** What users and (sub)systems interact with our system?
> - **Goals:** What does each actor need our system to do?
> - **Trigger:** What kicks off the interaction with the system?
>
> **2 — For each goal, identify what each actor needs the system to do.**
> - The **main success scenario is the preferred "happy path"** — **easiest to read and understand**
> - **Capture each actor's intent and responsibility, from trigger to goal**
> - **State what information passes between actor(s) and system**
> - **Number each step (line)**
>
> **3 — List the variations to the main (success) flow.**
> - **Alternate branches from the main path**
> - **What options/enhancements might the user want or expect?**
> - **Label with step number:** `5.1 <variation>; 5.1 <steps>; 5.1 <continue at step 6>`
>
> **4 — List the exceptions (error) flow.**
> - **Many steps can fail** · **describe failure-handling**
> - **Label with step number:** `5.1 <failure condition>; 5.1 <actions>; 5.1 <continue at failure step 7>`

> [!INTUITION]
> Steps 3 and 4 look similar and are **different in kind**, which is the distinction worth carrying into an exam.
>
> - **A variation is another way to succeed.** Paying by UPI instead of card — the goal is still reached.
> - **An exception is a way to fail.** The card is declined; the goal is not reached and something must be done about it.
>
> Both are labelled by step number and both must say **where control resumes** — *continue at step 6*. A branch with no rejoin point leaves the reader stranded, which is the same defect as an unhandled exception in code.

> [!EXAM]
> **Do's and don'ts for alternate flows:**
>
> **Do's:**
> - **Think about how every step of the use case could be enhanced or fail**
> - **Give a plausible response to each extension from the system**
> - **Response should either jump to another step of the case, or end it**
>
> **Don'ts:**
> - **List things outside the scope of the use case** *("User's power goes out")*
> - **Make unreasonable assumptions** *("DB will never fail")*
> - **List a remedy that your system can't actually implement**
> - **Go overboard**

> [!TRAP]
> The two Don'ts examples are **opposite errors**, and a good answer names both.
>
> *"User's power goes out"* is **out of scope** — real, but nothing your system can do about it, so documenting it adds noise without adding a requirement.
>
> *"DB will never fail"* is an **unreasonable assumption** — the database certainly will fail, and pretending otherwise means no one designs the recovery path.
>
> The rule that separates them is the third Do: **every listed exception needs a response the system can actually perform.** If you can't respond, it isn't your exception; if you can, you must specify it.

---

**Next:** the other techniques for specifying requirements, and how to discover them in the field — **personas, scenarios & discovery**.
