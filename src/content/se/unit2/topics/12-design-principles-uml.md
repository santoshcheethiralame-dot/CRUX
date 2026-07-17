---
subject: se
unit: 2
order: 12
slug: design-principles-uml
title: Software Design Principles & UML
summary: The design techniques (abstraction, modularity, information hiding, complexity management), the key design issues, and UML for design — especially sequence diagrams.
minutes: 14
tags: [design, abstraction, information-hiding, UML, sequence-diagram, complexity]
---

# Software Design Principles & UML

Design **bridges architecture and implementation** — it decomposes architectural components into implementable units with specific algorithms, data structures and interactions.

## Techniques that enable design

### Abstraction
Focus on **essential properties** while hiding implementation detail, so developers work at the right level without being overwhelmed.
- **Benefits:** complexity management, clear interface definition, reusability, isolated maintenance.

### Modularity & cohesion
Design as **highly cohesive modules** with clear responsibilities and minimal dependencies.

| | Example |
|---|---|
| **Good (functional cohesion)** | An auth module with only `login()`, `logout()`, `resetPassword()`, `validateCredentials()` — all about authentication |
| **Bad (coincidental cohesion)** | A "utils" module with `login()`, `generateReport()`, `sendEmail()`, `calculateTax()` — unrelated functions grouped arbitrarily |

### Information hiding
Strategically conceal implementation to reduce coupling and improve maintainability.
- **Encapsulation** — bundle data + methods, expose controlled access, hide internal representation.
- **Interface–implementation separation** — define public interfaces independently, so you can change the implementation without affecting clients.

> [!EXAM]
> **Abstraction** = ignore detail to focus on essentials (a *what*, not *how*, view). **Information hiding/encapsulation** = deliberately conceal internals behind an interface to reduce coupling. They're related but distinct — abstraction is about *level*, information hiding is about *access*.

### Complexity management
Manage both **intra-modular** (within a component) and **inter-modular** (between components) complexity. Sources: **algorithmic, data-structure, control-flow, interface** complexity. Strategies: hierarchical organisation, standardised **design patterns**, clear/simple interfaces, appropriate abstractions.

## Key design issues

| Issue | Concerns |
|---|---|
| **Concurrency** | Thread safety, **deadlock** prevention, performance vs coordination, resource contention |
| **Non-functional requirements** | Performance, security (authn/authz, audit), reliability (fault tolerance, recovery, availability) |
| **Data persistence** | DB selection (relational/NoSQL), caching, data migration, backup/recovery |
| **Event handling** | Observer pattern, event queues, callbacks, state machines |
| **Error & exception handling** | Exception hierarchies, graceful degradation, meaningful messages, logging |

## UML for design

**Structured design methods** (e.g. **Booch**, **Fusion**) give step-by-step guidance. **UML** documents design from multiple viewpoints:

| UML diagram | Shows |
|---|---|
| **Use-case** | Functionality from the user's perspective |
| **Class** | Static structure of objects & relationships |
| **Sequence** | Dynamic object interaction **over time** |
| **Component** | System organisation & deployment |
| **State** | Object behaviour & state transitions |

### Sequence diagrams
> [!NOTE]
> A **sequence diagram** models object interactions **over time** for a use case — showing the messages and method calls that implement it.

**Elements:**
- **Lifelines** — vertical dashed lines representing an object's existence over time.
- **Messages** — horizontal arrows showing communication between objects.
- **Activation boxes** — thin rectangles on a lifeline marking when an object is **actively processing**.
- **Return messages** — dashed arrows showing responses/return values.
- **Alt fragments** — boxed regions for conditional flows (e.g. `[authorization OK]` vs `[fail]`).

> [!INTUITION]
> If a **class diagram** is a *photo* of the system's structure, a **sequence diagram** is a *video* of one scenario playing out — who calls whom, in what order, over time. It's perfect for showing how a single use case (e.g. "view patient information" → authorize → return info / error) actually executes.

---

**Next:** how components talk to each other — **API design, ABI & error handling**.
