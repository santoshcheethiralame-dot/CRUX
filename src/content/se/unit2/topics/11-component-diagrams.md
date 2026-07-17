---
subject: se
unit: 2
order: 11
slug: component-diagrams
title: Component Diagrams
summary: UML components and their notation, provided/required interfaces (lollipop & socket), ports and visibility, usage dependencies, subsystems, and the diagram-building process.
minutes: 12
tags: [UML, component-diagram, interfaces, lollipop-socket, ports, subsystems]
---

# Component Diagrams

## What is a component?

> [!NOTE]
> A **component** is a **replaceable, executable** piece of a system whose implementation is **hidden behind well-defined interfaces**. In UML it is a modular unit that encapsulates functionality and exposes only its interaction points.

**Characteristics:** **Modular** (cohesive functionality), **Replaceable** (swap for an equivalent), **Black-box** (internals hidden), **Executable** (active at runtime), **Interface-driven** (interacts only through interfaces).

**UML notation:** a rectangle with the **`<<component>>`** stereotype (and/or a component icon in the top-right) and the component name.

## Interfaces — lollipop & socket

| Interface | Meaning | Notation |
|---|---|---|
| **Provided interface** | A service the component **offers** to others | **"Lollipop"** — a ball ──○ extending out |
| **Required interface** | A service the component **needs** from others | **"Socket"** — a cup ──◗ |
| **Assembly connector** | Links a provided interface to a matching required one | ball-in-socket |

> [!EXAM]
> **Provided = lollipop (ball); Required = socket (cup).** When a ball fits into a socket (assembly connector), one component supplies what another needs. This ball-and-socket question is a classic.

## Ports & visibility

> [!NOTE]
> A **port** is an interaction point between a component and its environment, **grouping semantically related** provided and required interfaces.

- **Public ports** — drawn **over** the component boundary → all interfaces are publicly accessible.
- **Protected/Private ports** — drawn **inside** the boundary → restricted access.

## Dependencies & subsystems

- **Usage dependency** — a **client** component needs a **supplier** component to work; shown as a **dashed arrow** with `<<use>>`. The dependency must be available at runtime and operates through interface contracts.
- **Subsystem** — a **logical grouping** mechanism to organise large systems into manageable, deployable units. A subsystem is an *organisational construct* (it can't be instantiated itself, but its contents can).

## Building a component diagram

1. **Component identification** — analyse requirements to find major functional components.
2. **Component analysis** — examine each (links to artifacts, libraries, other elements).
3. **Relationship mapping** — identify dependencies, communication, interface needs.
4. **Interface definition** — specify provided & required interfaces with clear contracts.
5. **Validation & refinement** — review for separation of concerns and manageable complexity.

**Examples:**
- **Online Shopping System:** User Management · Product Catalog · Shopping Cart · Payment Processing · Order Management · Inventory.
- **ATM System:** ATM · Card Reader · Card Validator · Cash Dispenser · ATM Network — wired together with lollipop/socket interfaces.

> [!INTUITION]
> A component diagram is a **wiring diagram** for your system: each box is a swappable black-box module, and the balls-in-sockets show "this module plugs into that one." It makes the system's structure — and what you can replace independently — visible.

> [!NOTE]
> **Uses of component diagrams:** visualise system organisation, model subsystem interactions, identify component boundaries for **focused testing**, and clarify relationships with libraries/external dependencies.

---

**Next:** zooming into the components themselves — **software design principles & UML**.
