---
subject: se
unit: 1
order: 12
slug: uml-use-cases
title: UML & Use-Case Modelling
summary: The UML diagram taxonomy (structural vs behavioural), use-case diagrams with actors and «include»/«extend», how to write a use case in four steps, and main/alternate/exception flows.
minutes: 16
tags: [UML, use-case, actor, include, extend, scenarios, modelling]
---

# UML & Use-Case Modelling

Natural-language requirements are ambiguous; **models** make them precise and visual. The standard modelling notation is the **Unified Modeling Language (UML)** — a family of 14 diagram types maintained by the OMG.

## The UML diagram taxonomy

UML diagrams split into two families:

```
UML Diagrams
├── Structural  (the static "what is")          ── things & their relationships
│   ├── Class diagram
│   ├── Object diagram
│   ├── Component diagram
│   ├── Deployment diagram
│   ├── Package diagram
│   ├── Composite-structure diagram
│   └── Profile diagram
└── Behavioural (the dynamic "what happens")    ── behaviour over time
    ├── Use-case diagram
    ├── Sequence diagram        ┐
    ├── Communication diagram   │ (the 4 Interaction
    ├── Timing diagram          │  sub-diagrams)
    ├── Interaction-overview    ┘
    ├── Activity diagram
    └── State-machine diagram
```

> [!EXAM]
> **Structural = static structure** (Class, Object, Component, Deployment, Package, …). **Behavioural = dynamic behaviour** (Use-case, Sequence, Activity, State-machine, Communication, Timing, …). The four **interaction** diagrams (Sequence, Communication, Timing, Interaction-overview) are a *sub-family* of behavioural. Classic question: *"Is a class diagram structural or behavioural?"* → **Structural.**

> [!INTUITION]
> **Structural** diagrams are a *photograph* of the system's parts; **behavioural** diagrams are a *video* of the system in action. Sequence/activity/state diagrams show *how things change over time*; class/component/deployment show *how things are arranged*.

## Use-case diagrams

A **use-case diagram** captures the **functional requirements** as interactions between **actors** and the **system**. It answers: *who uses the system, and what can they do?*

### Elements

| Element | Notation | Meaning |
|---|---|---|
| **Actor** | stick figure | A role *external* to the system that interacts with it — a user **or another system**. |
| **Use case** | oval | A discrete unit of functionality / a goal the actor achieves. |
| **System boundary** | rectangle | The box enclosing the use cases; actors sit outside it. |
| **Association** | line | Which actor participates in which use case. |

> [!TRAP]
> An **actor is a role, not a person.** One person can play several actors (a shopper *and* an admin); one actor can be played by many people — or by **another system** (e.g. a "Payment Gateway" actor). Don't draw individual users.

### The two key relationships — «include» vs «extend»

This is the single most-tested use-case detail:

| Relationship | Meaning | Direction | When |
|---|---|---|---|
| **«include»** | The base use case **always** uses the included one (mandatory, reusable common behaviour). | Base ──«include»──▶ Included | "Place Order" *always* includes "Validate Payment." Factor out shared steps. |
| **«extend»** | The extending use case **optionally/conditionally** adds behaviour to the base at an *extension point*. | Extension ──«extend»──▶ Base | "Apply Discount Coupon" *sometimes* extends "Checkout." Adds optional/exceptional behaviour. |

> [!EXAM]
> Mnemonic: **«include» = "always," «extend» = "sometimes."** And mind the **arrow direction**: «include» points *from* base *to* the included case; «extend» points *from* the extension *to* the base. **Generalisation** (a third relation) lets one actor/use-case inherit from another.

## Writing a use case — the 4 steps

Sommerville's recipe to turn a use case into a written specification:

1. **Identify the actors** — who/what interacts with the system.
2. **Identify the use cases** (goals) — what each actor wants to accomplish.
3. **Define the main success scenario** — the normal, everything-goes-right flow of events.
4. **Define the alternative & exception flows** — variations and error paths.

### Flows of events

A written use case documents three kinds of flow:

| Flow | Meaning |
|---|---|
| **Main / Basic flow** ("happy path") | The standard sequence when nothing goes wrong. |
| **Alternative flow** | A valid variation (e.g. pay by wallet instead of card). |
| **Exception flow** | An error path (e.g. payment declined, item out of stock). |

### Worked example — "Checkout" use case

| Field | Content |
|---|---|
| **Use case** | Checkout |
| **Actor** | Registered Shopper (primary), Payment Gateway (secondary) |
| **Precondition** | Cart is non-empty; user is logged in. |
| **Main flow** | 1. Shopper requests checkout → 2. System shows order summary → 3. Shopper confirms address → 4. System «include» **Validate Payment** → 5. System creates order → 6. System emails confirmation. |
| **Alternative flow** | 3a. Shopper selects a saved address. 4a. Shopper «extend» **Apply Coupon** before payment. |
| **Exception flow** | 4e. Payment declined → system shows error, returns to step 4. |
| **Postcondition** | Order is recorded; inventory decremented; confirmation sent. |

> [!INTUITION]
> A use-case **diagram** gives the bird's-eye view (actors ↔ ovals); the use-case **description** (flows) gives the step-by-step detail. You need both — the diagram to see scope, the text to build and test it.

---

**Next:** putting a human face on requirements — **personas, scenarios and requirements discovery**.
