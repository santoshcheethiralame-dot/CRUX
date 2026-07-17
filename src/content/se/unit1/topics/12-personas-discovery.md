---
subject: se
unit: 1
order: 12
slug: personas-discovery
title: Personas, Scenarios & Requirements Discovery
summary: Using personas and scenarios to keep requirements user-centred, ethnography for tacit requirements (the Flipkart example), and how these techniques feed the requirements process.
minutes: 11
tags: [personas, scenarios, ethnography, user-centred, discovery, requirements]
---

# Personas, Scenarios & Requirements Discovery

Requirements aren't abstract — they exist to serve **real people doing real tasks**. These techniques keep the team anchored to the user.

## Personas

> [!NOTE]
> A **persona** is a **fictional but realistic character** that represents a key *type* of user. It gives the team a concrete, memorable stand-in for a whole class of users, so design decisions can be made by asking *"would this work for Priya?"* instead of arguing about an abstract "user."

A good persona typically includes:

- **Name & photo** — makes them memorable ("Priya, the busy commuter").
- **Demographics** — age, job, tech-savviness.
- **Goals & motivations** — what they're trying to achieve.
- **Frustrations / pain points** — what currently annoys them.
- **Context** — how, when and where they'd use the system.

> [!INTUITION]
> Personas fight the **"elastic user"** problem — when "the user" can be stretched to justify any decision. A named persona with fixed goals forces honest design: a feature either helps *that specific persona* or it doesn't.

> [!TRAP]
> A persona is **not** a real individual and not an *actor* (a use-case role). It's a research-based *archetype* used for empathy and prioritisation. Several personas may all map to the same use-case actor.

## Scenarios

> [!NOTE]
> A **scenario** is a **narrative story** of how a persona uses the system to accomplish a goal — a concrete, real-world example of an interaction, told start to finish.

Sommerville suggests a scenario should include:
- A description of the **starting situation** (state before).
- The **normal flow** of events.
- **What can go wrong** and how it's handled.
- Other **concurrent activities**.
- The **state when the scenario finishes**.

Example scenario:
> *Priya opens the app on the metro to reorder her usual groceries. She taps "Reorder last," but one item is out of stock. The app suggests a substitute, she accepts, chooses cash-on-delivery, and schedules evening delivery — all before her stop.*

> [!INTUITION]
> **Persona = who** (the character). **Scenario = what they do** (the story). **Use case = the formal interaction** behind the story. They form a chain: a *persona* drives a *scenario*, which is formalised as a *use case*, which yields *requirements* and then *test cases*.

## Ethnography — discovering tacit requirements

**Ethnography** is a **passive** elicitation technique (Topic 7) where an analyst **immerses themselves** in the users' real working environment and **observes** actual work. Its power is capturing **tacit knowledge** — the "how we really do it" that users never think to mention in an interview.

It reveals two things interviews miss:
1. How people **actually** work versus how processes *say* they should work.
2. **Cooperation and awareness** — how work depends on informal collaboration between people.

### The Flipkart example

When designing for the Indian e-commerce market, teams observed (ethnographically) that many first-time online shoppers **distrusted prepaid online payment** and had unreliable connectivity. These tacit, contextual facts — never stated in a feature request — drove crucial requirements: **Cash on Delivery (COD)**, lightweight/low-data UIs, and vernacular-language support. No interview question "what payment method do you want?" would have surfaced the deep distrust; **observation did.**

> [!EXAM]
> Ethnography's headline benefit: it uncovers **tacit / implicit requirements** that stakeholders can't articulate, by **observing real work in context**. Limitation: it shows *how things are*, not *how they could be* — so it's combined with other techniques.

## How it all feeds the requirements process

```
Ethnography / observation ─┐
Interviews / workshops    ─┤→ understand users → Personas → Scenarios
                                                      ↓
                                              Use cases (UML)
                                                      ↓
                                       Functional & non-functional requirements
                                                      ↓
                                                  SRS + RTM
```

These user-centred techniques sit at the **front** of requirements engineering: they ensure the requirements we elicit, specify and validate are **the ones real users actually need** — closing the loop back to elicitation (Topic 7).

---

**Next:** once requirements are set and the system is built, we must check it — **software testing, V&V and terminology**.
