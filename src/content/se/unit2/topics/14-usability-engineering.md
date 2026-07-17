---
subject: se
unit: 2
order: 14
slug: usability-engineering
title: Usability Engineering
summary: Usability fundamentals and catastrophic interface failures, the user-centred design process, testing methods (incl. dogfooding & Wizard of Oz), the LESEM evaluation framework, and accessibility.
minutes: 14
tags: [usability, LESEM, user-testing, dogfooding, prototyping, accessibility]
---

# Usability Engineering

## Fundamentals

> [!NOTE]
> **Usability engineering** is the systematic application of **human-factors** principles to interface design, so systems are **learnable, efficient, error-preventing and satisfying** for their intended users. It bridges the gap between technical functionality and human needs.

## When bad interfaces kill — two case studies

- **Hawaiian Missile Alert (2018):** a confusing interface caused a **false ballistic-missile alert** that panicked residents for **38 minutes**. Failures: poor visual separation between **test vs live** options, insufficient confirmation, **no quick cancellation/recovery**, plus poor training.
- **Therac-25:** cryptic messages like **"Malfunction 54"** (no actionable info), race conditions from rapid input, poor status feedback, and an **override culture** (frequent nuisance alarms led operators to dismiss warnings) contributed to deaths.

> [!EXAM]
> Both disasters show usability is a **safety and quality** concern, not cosmetics. Common threads: unclear feedback, weak confirmation for critical/irreversible actions, and no easy recovery.

## The user-centred design process

A systematic cycle ensuring **user needs drive design**:

1. **User requirements analysis** — target users, goals, context, constraints.
2. **Task analysis** — break workflows into tasks, spot usability issues.
3. **Design & prototyping** — interface solutions for those needs.
4. **Usability evaluation** — test with real users.
5. **Iterative refinement** — improve from feedback.

> Integrate usability **throughout the lifecycle** (requirements → design → implementation → testing), not as a final-stage afterthought.

## Usability testing methods

| Method | What it is |
|---|---|
| **Low-cost user testing** | Have a few people try the app every few weeks — can they figure it out unaided? |
| **Lab study** | Controlled environment; **think-aloud** protocols; quantitative metrics (time, error rate, success %). |
| **Field study** | Observation in the user's **natural environment** — reveals real workflows. |
| **A/B testing** | Compare two design alternatives with real users; measure behaviour/conversion. |
| **Shadowing / Ethnography** | Deep observation in natural settings — motivations, frustrations, workarounds. |
| **Dogfooding** | *"Eating your own dog food"* — the **team uses its own product internally before public release**, to catch usability/performance issues **before users do**. |
| **Interviews & surveys** | Direct elicitation of attitudes and needs. |

> [!EXAM]
> **Dogfooding** = the company/team uses its own product internally before release (informal real-world testing by developers, designers, PMs, support). Each method answers *different* questions, so teams **combine** several.

## The LESEM evaluation framework

The dimensions of usability you evaluate:

| Attribute | Meaning | Key measures / strategies |
|---|---|---|
| **Learnability** | How quickly users learn | Initial-learning time; learning curve. *Progressive disclosure, consistent patterns, immediate feedback.* |
| **Efficiency** | How fast experienced users work | Task-completion time, **keystroke analysis**. *Keyboard shortcuts, batch operations, smart defaults.* |
| **Satisfaction** | Emotional response/experience | Satisfaction surveys, comparative studies. |
| **Errors** | Prevention & recovery | *Input validation, **confirmation dialogs**, constraint-based input; **undo**, clear messages.* |
| **Memorability** | Support for returning users | Intuitive organisation, visual cues, **recognition over recall**. |

> [!INTUITION]
> **Recognition over recall:** it's easier to *recognise* an option from a menu than to *recall* a command from memory. Good interfaces show you the options (menus, icons) rather than making you remember them — a core memorability principle.

## Prototyping & accessibility

**Prototyping** gives early feedback before costly implementation:
- **Low-fidelity** — paper sketches/wireframes (rapid, cheap).
- **Interactive** — click-through mockups of flows.
- **High-fidelity** — near-production interfaces.
- **Wizard of Oz testing** — **humans secretly simulate the system's responses** while users interact with a mockup (great for testing AI/conversational interfaces before building the NLP).

**Accessibility & inclusive design** — usable by people of diverse abilities. Principles: **Perceivable, Operable, Understandable, Robust** (POUR). **Standards: WCAG 2.1, Section 508.**

---

**Next:** measuring and assuring that the product is good — **software quality management**.
