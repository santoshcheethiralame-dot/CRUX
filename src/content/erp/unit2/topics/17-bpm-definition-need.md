---
subject: erp
unit: 2
order: 17
slug: bpm-definition-need
title: Business Process Modelling — Definition, Need & Rules
summary: What a process model is and its three names, the seven reasons BPM is needed including bridging the IT-business language gap, and the seven thumb rules for process modelling with the QnA's model answer.
minutes: 11
tags: [BPM, process-modelling, process-mapping, definition, need, thumb-rules, communication, cross-functional]
---

# Business Process Modelling — Definition, Need & Rules

## Definition

> [!EXAM]
> **Definition:**
>
> > **"Process model is a visual representation of different activities and steps of the process, data flows of inputs and outputs for different steps of the process."**
>
> - **It can also show which organizational entity runs the process**
> - **It is a design representation of a business process**
>
> **Also known as: Process Modelling · Process Mapping**

> [!INTUITION]
> **"A design representation"** is the phrase that places BPM correctly. A process model is to a business process what an **architectural drawing** is to a building: not the thing itself, but a representation precise enough to build from and cheap enough to change.
>
> Note what the definition says a model contains — **three** things, not one:
> 1. the **activities and steps**
> 2. the **data flows** of inputs and outputs
> 3. **which organizational entity runs** each part
>
> That third element is what makes it a *business* process model rather than a flowchart. It shows **who does what**, which is how hand-offs become visible — and hand-offs are what BPR is hunting.

## Why BPM is needed

> [!EXAM]
> **BPM — Need:**
>
> 1. **This is visual and easy to understand.** It quickly shows the **activities under a process, steps under each activity, relationship and data flows, and which organizational entity does it**
> 2. **Easy to identify improvement areas in the current process** — **points of hand-offs, unnecessary steps that can be eliminated, parallelized**
> 3. **A quick comparison of AS IS and TO BE process** when both are represented
> 4. **Can help quickly to navigate from Scenario to Process to Activity to Step**
> 5. **Very useful communication mechanism across various stakeholders.** **Bridges the gap between IT people and business users who generally do not speak the same language**
> 6. **Very useful to check the impact of changes at any particular step / activity**
> 7. **Tool driven**
>
> **BPM will have to be supported with textual documentation wherever required.**

> [!INTUITION]
> Reason **5 is the one to lead with in an answer** — *"bridges the gap between IT people and business users who generally do not speak the same language."*
>
> This is the same problem Unit 1 named in requirements gathering, and the same one the **Q&A database** in ASAP addresses. The business expert knows the process but not the system; the consultant knows the system but not the business. **A diagram is a shared artefact both can read**, which neither a specification document nor a configuration screen manages.
>
> Reason **2 is where BPM earns its place in a BPR chapter**: the model does not merely record the process, it **makes the defects visible** — hand-offs, unnecessary steps, things that could run in parallel. Those are precisely the diagnosed problems and the redesign principles. **You draw the process in order to see what is wrong with it.**

> [!TRAP]
> **"BPM will have to be supported with textual documentation wherever required"** is a stated limitation, and the deck's note explains why it is awkward:
>
> > *"Largely BPM is a graphics-driven creation. There will always be some assumptions and notes that should go along with a process or connector. **Generally keeping them in sync is a problem.**"*
>
> A diagram cannot carry rules, assumptions and exceptions — those need words. But the moment you have a picture and a document, they can **drift apart**, and a model whose annotations are stale is worse than no model, because it is trusted.
>
> The deck notes the modern answer: *"in the BPM standards, the documentation also could be structured to have information suitable for automating"* — i.e. keep the text **inside** the model rather than beside it.

> [!EXAM]
> **BPM is an expert job.** The deck's note: *"Should have the practical knowledge of the field. So typically done in conjunction with experts in field plus a 'business engineering' team."*
>
> On tools: *"When we use a tool there are many other points that are made part of the tool — such as cross verification across different parts of the model. Of course, a tool also can bias to an extent the thinking. **But generally advantages are more than cons.**"*

## The thumb rules

> [!EXAM]
> **BPM — Thumb Rules / Guidelines for Process Modelling:**
>
> 1. **Each process should have specific inputs and outputs**
> 2. **Each process should cross a number of functional boundaries**
> 3. **Differentiate between the means (forms, documents and procedures) and the end (value added, deliverables).** There can always be a different way of doing the process if the process goals are met. **Focus on goals more than means**
> 4. **Processes should relate to customers and their needs**, either directly or as contributors to other processes
> 5. **Identify inputs and outputs of the processes**
> 6. **Process Map creation must be evolved by a cross functional team**
> 7. **Assume no Organizational structure or boundaries**
> 8. **Think outside all constraints**

> [!INTUITION]
> **Mnemonic — the rules answer three questions:**
>
> | Question | Rules |
> |---|---|
> | **What is a process?** | 1 · 2 · 5 — it has inputs and outputs, and it **crosses functions** |
> | **What matters about it?** | 3 · 4 — the **end, not the means**; the **customer**, not the department |
> | **Who draws it, and how freely?** | 6 · 7 · 8 — a **cross-functional team**, assuming **no boundaries or constraints** |
>
> **Definition, priority, mindset.**

> [!TRAP]
> **Rules 7 and 8 — "assume no organizational structure or boundaries" and "think outside all constraints" — sound like slogans and are the operational heart of the list.**
>
> They exist because of failure reason 5: *little change in process, not redesign.* If you draw the To-Be process **as departments currently exist**, you will reproduce the current hand-offs, because the boundaries generate the hand-offs. **The org chart must not be an input to the process design** — the redesigned process determines the structure, not the other way round, which is exactly the *organizational design* cascade.
>
> This is also why rule 6 requires a **cross-functional team**: a model drawn inside one department will stop at that department's edges.

> [!INTUITION]
> **Rule 3 — means versus ends — is the most useful single test in the chapter.**
>
> *"There can always be a different way of doing the process if the process goals are met. Focus on goals more than means."*
>
> When somebody says *"we need the triplicate form"*, that is a **means**. The **end** is whatever the form achieves — a record, an authorisation, a confirmation. Once you name the end, you can ask whether a form is still the best way to reach it, which is precisely what *"examine the rules and assumptions behind each issue"* demands during diagnosis.
>
> **Means get preserved out of habit; ends get preserved because they matter.**

## The QnA's model answers

> [!EXAM]
> **"Why is business process modelling important in an ERP project?"**
>
> *Since it is a visual model it becomes **easy to understand for people who are new to the project** and need to understand the procedure followed in this company. It quickly shows the activities of a process, the steps involved and all the activities under it. This helps in **identifying improvement areas** in the current process. It will help to **quickly navigate from Scenario to Process to Activity to Step**. Hence it is a very useful **communication mechanism across different stakeholders**, and it helps to **bridge the gap between the business team and the IT team**.*

> [!EXAM]
> **"Give some rules of process modelling"** — the QnA notes *"any number below based on the marks"*, then lists seven of the eight above. **Give as many as the mark allocation warrants, starting with rules 1, 2 and 3.**

---

**Next:** modelling the current and future states, and organising many processes — **AS-IS, TO-BE & the process hierarchy**.
