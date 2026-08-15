---
subject: se
unit: 1
order: 13
slug: personas-discovery
title: Personas, Scenarios & Requirements Discovery
summary: The six specification techniques, personas and user scenarios, requirements discovery through interviewing with its two types and two stated problems, and ethnography — including the Flipkart last-mile delivery case study end to end.
minutes: 14
tags: [personas, user-scenarios, discovery, interviewing, ethnography, flipkart, stakeholders, storyboarding]
---

# Personas, Scenarios & Requirements Discovery

## The techniques for specifying requirements

> [!EXAM]
> **What techniques are used to specify requirements?**
>
> **UML and use cases · Personas and user scenarios · Storyboarding · Paper prototyping · Prototyping · Feature list**

UML and use cases had the previous topic. This one covers **personas and user scenarios**, then turns to how requirements are **discovered** in the first place.

## Personas

> [!EXAM]
> **A persona is a fictional yet realistic representation of a user archetype who might use your system.** It **embodies key characteristics, needs, goals, and pain points of real users.**
>
> **Why personas?**
> - **Ground the design in real user behavior**
> - **Help teams empathize with users**
> - **Drive user-centered requirements**
>
> **Example — Library Catalog System:**
> - **Persona A:** First-year undergraduate student
> - **Persona B:** Librarian managing inter-library loans
> - **Persona C:** Faculty member planning a course

> [!INTUITION]
> **"Fictional yet realistic"** is doing careful work. A persona is invented, but it must be **derived from evidence** about real users — otherwise it is just the team's assumptions given a name and a photograph, which is worse than no persona because it makes guesses feel researched.
>
> The three library personas show why more than one is needed. They want **incompatible things**: the first-year wants a simple search that hides complexity; the librarian wants bulk administrative tools; the faculty member wants to assemble reading lists. **A single "user" would have averaged these into somebody who does not exist.**
>
> Personas make **conflicting requirements visible** rather than letting them collapse into a vague compromise — which is the same job the elicitation topic gave to *"identifying and negotiating potential conflicts."*

## User scenarios

> [!EXAM]
> **A user scenario is a narrative that describes how a persona might interact with the system in a particular situation.**
>
> **Structure (similar to user stories):**
> > **"As a `<persona>`, I want to `<goal>` so that `<benefit>`."**
>
> **Example:** *"As a graduate student, I want to filter research articles by citation count so that I can quickly find the most impactful sources."*
>
> **Scenarios help identify missing flows, UI features, and exception cases.**

> [!TRAP]
> This is **the same template as the user story** from the Agile topic — *as a `<user>` I want `<function>` so that `<desired result>`* — with one substitution: the role slot is filled by **a named persona** rather than a generic "user."
>
> That substitution is the entire point. *"As a user, I want to filter articles"* leaves open who is asking and why. *"As a graduate student"* invokes everything the persona records — their expertise, their goals, their pain points — so the team can judge whether the feature actually serves them.
>
> **Personas and user stories are complementary, not alternatives:** the persona supplies the *who*, the story supplies the *what* and *why*.

## Requirements discovery

> [!EXAM]
> **The process of gathering information about the required and existing systems and distilling the user and system requirements from this information.**
>
> - **Interaction is with system stakeholders from managers to external regulators.**
> - **Systems normally have a range of stakeholders.**

> [!INTUITION]
> Note the phrase **"required *and existing* systems."** Discovery is not only about the system you intend to build — it is also about the one already in use, whether that is software, a paper process, or a set of habits.
>
> That matters because the existing system encodes years of accumulated corrections for problems nobody remembers any more. Replace it without understanding it and you will faithfully re-introduce every problem it was quietly solving.
>
> **"From managers to external regulators"** sets the range deliberately wide: the people who *pay* for a system, the people who *use* it, and the people who *constrain* it are usually three different groups who never meet.

## Interviewing

> [!EXAM]
> **Formal or informal interviews with stakeholders are part of most RE processes.**
>
> **Two types:**
> - **Closed interviews** — based on a **pre-determined list of questions**
> - **Open interviews** — where **various issues are explored with stakeholders**
>
> **Effective interviewing:**
> - **Be open-minded, avoid pre-conceived ideas about the requirements, and be willing to listen to stakeholders**
> - **Prompt the interviewee to get discussions going** using a **springboard question, a requirements proposal, or by working together on a prototype system**

> [!EXAM]
> **Interviews in practice:**
> - **Normally a mix of closed and open-ended interviewing**
> - **Good for getting an overall understanding of what stakeholders do and how they might interact with the system**
> - **Interviewers need to be open-minded without pre-conceived ideas of what the system should do**
> - **You need to prompt the user to talk about the system by suggesting requirements rather than simply asking them what they want**

> [!TRAP]
> **"Suggest requirements rather than simply asking them what they want"** looks like it contradicts *"avoid pre-conceived ideas"*, and reconciling the two is the insight.
>
> The problem with *"what do you want?"* is that it is **too open to answer**. Faced with a blank page, people either say "I don't know" or describe their current process with minor tweaks.
>
> A **proposal** gives them something to react to — and people are far better at criticising a concrete suggestion than at generating one. The discipline is to hold the proposal **loosely**: it is a springboard for their thinking, not a plan you are defending. Suggest, then listen to the correction.

### The two problems with interviews

> [!EXAM]
> - **Application specialists may use language to describe their work that isn't easy for the requirements engineer to understand.**
> - **Interviews are not good for understanding domain requirements:**
>   - **Requirements engineers cannot understand specific domain terminology**
>   - **Some domain knowledge is so familiar that people find it hard to articulate, or think that it isn't worth articulating**

> [!INTUITION]
> The second sub-point is the deeper problem and the reason the next technique exists.
>
> The first is merely a **vocabulary** gap — annoying, but fixable by asking, and it is why the SRS template carries a *Definitions and acronyms* section.
>
> The second is a **tacit knowledge** gap, and **no amount of asking will close it**, because the expert does not know there is anything to say. A nurse will not mention that the ward round happens at 7am and nobody can enter data during it; it is too obvious to be worth stating. You will only discover it by **watching**.
>
> **Interviews can only surface what people know they know.**

## Ethnography

> [!EXAM]
> - **A social scientist spends a considerable time observing and analysing how people actually work.**
> - **People do not have to explain or articulate their work.**
> - **Social and organisational factors of importance may be observed.**
> - **Ethnographic studies have shown that work is usually richer and more complex than suggested by simple system models.**

> [!TRAP]
> **"People do not have to explain or articulate their work"** is precisely the fix for the tacit-knowledge problem above. Observation bypasses articulation entirely.
>
> The cost is in the definition: **"a considerable time."** Ethnography is the most expensive elicitation technique in the unit, which is why the elicitation topic listed it under **active** techniques and why it is reserved for situations where the gap between what people *say* they do and what they *actually* do is likely to be large.

## Case study — how Flipkart used ethnography for last-mile delivery

> [!EXAM]
> **Problem statement:**
> - **Flipkart needed to understand why delivery drivers in India faced delays despite optimized routes.**
> - **Traditional data analytics (GPS tracking, delivery times) didn't explain the bottlenecks.**

> [!EXAM]
> **The ethnographic approach — three methods:**
>
> **1. Field observations** — researchers **rode along with delivery drivers** in cities like **Bangalore and Mumbai**, observing:
> - **Traffic & road conditions** — unpredictable jams, narrow lanes, poor addressing systems
> - **Customer behaviors** — recipients not home, **cash-on-delivery (COD) verification** demands, **gated communities with security delays**
> - **Driver workarounds** — informal strategies such as **calling customers in advance** and **leaving packages with local shopkeepers**
>
> **2. Interviews with stakeholders** — **drivers, warehouse managers, and customers.** Discovered that **COD payments caused delays because drivers had to count cash and wait for verification.**
>
> **3. Artifact analysis** — **reviewed delivery logs, GPS deviations, and customer feedback to cross-validate findings.**

> [!EXAM]
> **Outcome & solutions:**
> - **Dynamic routing adjustments** — algorithms updated to account for **local traffic patterns** (e.g. avoiding school zones at pickup times)
> - **Cashless COD** — **digital payment confirmations** to reduce cash-handling delays
> - **Micro-fulfillment centers** — small warehouses **closer to dense urban areas**, placed where drivers faced the most delays
> - **Local partnerships** — **kirana** (small local stores) used as **pickup points** in hard-to-reach areas

> [!EXAM]
> **Key takeaways:**
> - **Data alone isn't enough** — **GPS logs don't show *why* drivers take detours**
> - **Human insights drive innovation** — ethnography **reveals workarounds that can be formalized** (e.g. digital COD)
> - **Hyper-local solutions matter** — **what works in Mumbai may fail in Manila**

> [!DERIVE]
> **Trace one thread through the whole case, because it is the cleanest illustration in the unit.**
>
> **Observation:** drivers **leave packages with local shopkeepers** — an informal workaround, invented by drivers, invisible to management and absent from every process document.
>
> **Analysis:** they do it because recipients are not home and a second delivery attempt costs more than the shopkeeper's goodwill.
>
> **Solution:** **kirana stores become official pickup points.**
>
> The company did not invent that solution. **It discovered the solution its own drivers had already invented, and formalised it** — which is exactly the second key takeaway. This is only findable by watching: no driver would report it in an interview, because from their point of view it is a rule-bend, not a best practice.

> [!INTUITION]
> **"Data alone isn't enough — GPS logs don't show *why*"** is the whole argument for qualitative methods in one line, and it maps onto a distinction the unit keeps returning to.
>
> Analytics are excellent at **what** and **how much**: this route took 40 minutes, this delivery failed. They are structurally incapable of **why**, because the reason is not in the data — it is in the gated-community security desk and the cash-counting.
>
> Note that Flipkart already **had** the quantitative data and it *"didn't explain the bottlenecks."* Ethnography was not a substitute for analytics; it was what made the analytics interpretable. **The third method, artifact analysis, then cross-validates the observations against the logs** — qualitative insight proposing the explanation, quantitative data confirming its scale.

---

**Next:** checking that what was built matches what was asked for — **software testing, V&V and terminology**.
