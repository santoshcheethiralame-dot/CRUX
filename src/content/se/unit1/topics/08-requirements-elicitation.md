---
subject: se
unit: 1
order: 8
slug: requirements-elicitation
title: Requirements Engineering & Elicitation
summary: What requirements engineering is, user vs system requirements, the four RE process activities, and elicitation techniques (active & passive) with their problems.
minutes: 16
tags: [requirements-engineering, elicitation, RE-process, stakeholders, interviews]
---

# Requirements Engineering & Elicitation

## What is a "requirement"?

A **requirement** is a statement of what the system **should do** (a service) or a **constraint** on its operation. Sommerville notes requirements span a huge range of detail — from a high-level abstract statement of a service down to a detailed mathematical functional specification. This double meaning is split into two levels:

| Level | Audience | Detail |
|---|---|---|
| **User requirements** | Customers, end-users, managers | Statements in **natural language + diagrams** of what services the system provides and its operational constraints. *What* the user wants. |
| **System requirements** | Developers, system architects | A **detailed, structured** description of the system's functions, services and constraints — the contract for *what to implement*. *How* (functionally) the system must behave. |

> [!EXAM]
> "Distinguish user requirements from system requirements." → **User** requirements are abstract, natural-language statements for the *customer*; **system** requirements are detailed, precise specifications for the *developer*. They describe the same system at different levels of detail.

## What is Requirements Engineering (RE)?

> [!NOTE]
> **Requirements Engineering** is the process of **finding out, analysing, documenting and checking** the services and constraints of a system.

It is the front of the lifecycle, and the **most error-prone** part: mistakes made here are the *most expensive* to fix later (recall the cost-of-change curve — a requirements error found in maintenance can cost 100× what it costs to fix at requirements time).

## The four RE process activities

RE is usually drawn as a spiral or iterative cycle of four activities:

| # | Activity | What happens |
|---|---|---|
| **1** | **Elicitation (& discovery)** | Work *with stakeholders* to discover the requirements — what they need and why. |
| **2** | **Analysis & negotiation** | Classify, prioritise, detect and **resolve conflicts** between stakeholders; agree on a consistent set. |
| **3** | **Specification (documentation)** | Write the requirements down in a standard form — the **SRS** (next topics). |
| **4** | **Validation** | Check the documented requirements for completeness, consistency, realism and verifiability. |

(Often **requirements management** — handling change over time — is added as an ongoing fifth activity.)

> [!INTUITION]
> Elicitation = *gather*; Analysis = *understand & reconcile*; Specification = *write down*; Validation = *check it's right*. Then loop. It is iterative because each pass uncovers more.

## Stakeholders

A **stakeholder** is anyone who is affected by the system or has an influence on its requirements — end-users, managers, the customer paying for it, regulators, domain experts, even the operations/support staff. **Identifying all stakeholders is critical**: a missed stakeholder means missed requirements.

## Requirements elicitation — the techniques

Elicitation techniques split into two families by whether the analyst *intervenes*:

### Active techniques (the analyst drives the interaction)

| Technique | Description | Watch-outs |
|---|---|---|
| **Interviews** | One-on-one or group Q&A with stakeholders. **Closed** interviews use a pre-set list of questions; **open** interviews explore freely. | Interviewees may omit "obvious" domain knowledge; jargon barriers; bias in questions. |
| **Workshops / JAD** | Joint Application Development sessions — stakeholders & analysts together rapidly agree requirements. | Needs skilled facilitation; strong personalities can dominate. |
| **Brainstorming** | Generate many ideas quickly without early criticism. | Can drift; needs prioritisation afterwards. |
| **Prototyping** | Build a throwaway/early prototype so users react to something concrete. | Users may fixate on the prototype's look; can set wrong expectations. |
| **Questionnaires / surveys** | Reach many stakeholders cheaply. | Rigid; can't probe follow-ups; low response rates. |

### Passive techniques (observe without steering)

| Technique | Description |
|---|---|
| **Observation / Ethnography** | Watch users do their real work in their real environment to capture **tacit, "how it's really done"** knowledge that people forget to mention. |
| **Document/artifact analysis** | Study existing forms, manuals, reports, and the legacy system to infer requirements. |
| **Social/discourse analysis** | Study how people communicate and collaborate around the work. |

> [!EXAM]
> Be able to classify a technique as **active** (interviews, workshops, brainstorming, prototyping — analyst *interacts*) vs **passive** (ethnography/observation, document analysis — analyst *observes*). Ethnography is the headline *passive* technique.

## Why elicitation is hard — the classic problems

Sommerville lists the difficulties (a favourite exam list):

- **Stakeholders don't know what they really want** — and express it in their own terms with implicit domain knowledge.
- **Different stakeholders express requirements differently** and have **conflicting** requirements.
- **Political factors** influence requirements (managers wanting more power/budget).
- The **economic and business environment changes** during elicitation, so requirements change too.
- Analysts may **miss "obvious"** requirements that everyone assumes.

> [!TRAP]
> The hardest requirements to capture are the **tacit / unspoken** ones — things stakeholders consider "too obvious to state." This is exactly why **passive observation/ethnography** exists: to surface what interviews miss.

## A note on agile elicitation

In agile, elicitation is **continuous**, not a one-off phase. The **on-site customer / product owner** answers questions as stories are built, and requirements are captured as **user stories + acceptance criteria** rather than a frozen document.

---

**Next:** how we *classify* what we elicit — **functional vs non-functional** requirements.
