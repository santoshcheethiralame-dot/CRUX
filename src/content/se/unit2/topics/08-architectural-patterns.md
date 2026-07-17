---
subject: se
unit: 2
order: 8
slug: architectural-patterns
title: Common Architectural Patterns
summary: Seven classic architectural patterns — pipes & filters, object-oriented, event-driven, blackboard, layered, client-server and MVC — with examples, pros and cons.
minutes: 15
tags: [patterns, pipes-filters, layered, client-server, MVC, event-driven]
---

# Common Architectural Patterns

> [!NOTE]
> An **architectural pattern** (or **style**) is a *named collection of architectural design decisions* — a **reusable, proven solution** to a recurring structural problem, providing vocabulary and guidance for organising a system.

## The seven patterns

### 1. Pipes & Filters
Data flows through a sequence of independent **filters** connected by **pipes**. Each filter does a **local transformation** with **no shared state**; the system is **acyclic**.
- **Applications:** compilers (lexing → parsing → code generation), data/image/signal pipelines.
- **Pros:** reusability, parallelism, easy unit testing. **Cons:** transformation overhead; poor for interactive systems.

### 2. Object-Oriented
System as **interacting objects** encapsulating state + behaviour (encapsulation, inheritance, polymorphism, abstraction).
- **Applications:** desktop apps, simulations, games, business apps. *(e.g. Adobe Photoshop — tools, layers, effects as objects.)*

### 3. Event-Driven
Components **produce, detect and consume events**, enabling loose coupling. Parts: **event producers, consumers, channels, processing**.
- **Applications:** UIs, real-time systems, microservices, IoT. *(e.g. Node.js — requests/file ops trigger callback events.)*
- **Pros:** loose coupling, scalability, responsiveness. **Cons:** hard to debug event flow; event-ordering issues.

### 4. Blackboard
Multiple **knowledge sources** collaborate via a shared **blackboard**; a **control** component decides which source acts based on the blackboard state.
- **Applications:** expert systems, pattern/speech recognition, signal interpretation, stock trading. Opportunistic, incremental problem-solving.

### 5. Layered
Hierarchical **layers**; each provides services to the layer above and uses services from the layer below; **adjacent-layer** communication only.
- **Applications:** **TCP/IP stack**, operating systems, web apps (presentation/business/data).
- **Pros:** modularity, technology substitution, separation of concerns. **Cons:** performance overhead, rigidity.

### 6. Client-Server
**Clients** request services; **servers** provide them. Centralised resources; request-response over a network. Variations: **two-tier**, **three-tier**, **n-tier**.
- **Applications:** web apps, databases, email, online banking.

### 7. Model-View-Controller (MVC)
Separates an application into three parts to promote separation of concerns in UIs:

| Part | Responsibility |
|---|---|
| **Model** | Application data + business logic |
| **View** | UI presentation + capturing user input |
| **Controller** | Mediates between Model and View; handles user actions |

**Flow:** user interacts with the **View** → View notifies the **Controller** → Controller updates the **Model** → Model notifies the View → View updates the display.
- **Applications:** Spring MVC, ASP.NET MVC, desktop & mobile apps.

> [!EXAM]
> Match pattern → example: **Pipes & Filters → compiler**; **Layered → TCP/IP stack / OSI**; **Event-driven → Node.js / GUIs**; **Blackboard → expert systems**; **Client-server → web/banking**; **MVC → web frameworks**. And know **MVC's three parts** and their interaction order.

> [!INTUITION]
> Choosing a pattern is choosing your **trade-offs**. Layered gives clean separation but adds call overhead; event-driven gives loose coupling but is hard to trace; pipes-and-filters gives reuse but isn't interactive. There is **no universally best pattern** — match it to the system's dominant quality attribute.

---

**Next:** the principles that judge any structure — **cohesion, coupling, modularity & security**.
