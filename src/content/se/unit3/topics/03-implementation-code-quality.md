---
subject: se
unit: 3
order: 3
slug: implementation-code-quality
title: The Implementation Phase & Code Quality
summary: The implementation phase and its pre-implementation decisions, the characteristics of quality code (naming, structuring, readability), and good programming style including the dangling-else trap.
minutes: 13
tags: [implementation, code-quality, naming-conventions, programming-style, dangling-else]
---

# The Implementation Phase & Code Quality

## The implementation phase

> [!NOTE]
> The **implementation (development/construction) phase** translates the abstract **design** into concrete, executable code. **Input:** the design document. **Process:** developers write, unit-test and peer-review code. **Output:** executable software (the input to testing).

**Characteristics:** **tool-intensive** (compilers, debuggers, GUI builders) · **knowledge-intensive** (algorithms, coding practices) · **quality-focused** · **high-volume output** (many configuration items).

> [!INTUITION]
> The **cost of fixing a bug** rises steeply across phases — a defect caught while coding is far cheaper than one found in production. That's why clean code and early checks pay off. (Code even has "personalities": *The Cryptic Ninja*, *The Verbose Novelist*, *The Chaos Demon* — vs *The Professional*.)

### Key pre-implementation decisions
- **Programming language** — chosen for ecosystem support, environment (web/mobile), client preference, developer availability, performance, security. (Abstraction levels: Assembly → Procedural → Object-Oriented → Aspect-Oriented.)
- **Development environment** — editors, compilers, debuggers, build tools (commercial vs open-source, integration, security).
- **Configuration Management Plan** — to manage the high volume of configuration items.

## Characteristics of quality code

| Characteristic | Description |
|---|---|
| **Simple & Clear** | Reasonable limits on lines/function, arguments/function, and nesting levels |
| **Naming conventions** | Meaningful identifiers; **PascalCase** for classes, **camelCase** for methods; avoid keyword-like names; **2–3 min, 30 max** characters |
| **Structuring** | Highlight dependencies; logical grouping (`#include`, `#define`); separate header & implementation files |
| **Readability** | Standard indentation, blank lines to show blocks, clear comments explaining the **"why"** |

> [!EXAM]
> Naming conventions are a favourite detail: **PascalCasing for classes, camelCasing for methods**, identifiers **2–3 to 30 characters**, and comments should explain the **"why," not the "what."**

## Good programming style — Do's & Don'ts

**Do's:** use a few standard control constructs · use GOTO **disciplined** (if at all) · use user-defined types to model the domain · hide data structures behind **access functions** · meaningful variable names · formatting for readability.

**Don'ts:** don't be too clever · avoid ambiguous **dangling if** / **dangling else** · don't nest too deeply · don't reuse one identifier for multiple purposes · examine routines with **more than 5 formal parameters**.

> [!TRAP]
> A **"dangling else"** is an ambiguity where an `else` clause could logically pair with **more than one preceding `if`**. The compiler pairs it with the *nearest* `if` — which may not be what you intended, causing incorrect behaviour. Always use braces to make the pairing explicit.

```c
// Ambiguous — which if does the else belong to?
if (a)
    if (b) doX();
else doY();          // pairs with 'if (b)', not 'if (a)'!
```

---

**Next:** the disciplined rules around code — **defensive, secure & testable programming standards**.
