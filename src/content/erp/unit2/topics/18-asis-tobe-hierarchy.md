---
subject: erp
unit: 2
order: 18
slug: asis-tobe-hierarchy
title: AS-IS, TO-BE & the Process Hierarchy
summary: The two models and the asymmetry in how much detail each needs, the four-level process hierarchy remembered as SPAS with its worked example, and why the hierarchy matters for navigation and roles.
minutes: 10
tags: [AS-IS, TO-BE, modelling, process-hierarchy, SPAS, scenario, activity, step, abstraction]
---

# AS-IS, TO-BE & the Process Hierarchy

## The two models

> [!EXAM]
> | | **AS IS Modelling** | **TO BE Modelling** |
> |---|---|---|
> | **Purpose** | **Understand current processes for the purpose of improving** | **New process design** |
> | **Guiding principles** | **No need of much detailed analysis, as anyway the process will not be used in future.** It is important to understand the process **at high level** — **why the process exists, what it does, what's the high level objective** | **Need to be detailed so that every step is clear to users.** **All input–output relationships, data flows, and the organization roles performing the process need to be detailed out** |

> [!INTUITION]
> **The asymmetry is the entire point of this slide: AS-IS shallow, TO-BE deep.**
>
> The reasoning is stated plainly — *"anyway the process will not be used in future."* Spending months documenting a process you are about to discard is effort invested in something with no future value.
>
> This is the direct countermeasure to BPR failure reason 1, **"Too much AS IS Analysis (Paralysis)."** Teams get the balance backwards because the As-Is is **observable** — you can go and watch it — whereas the To-Be must be **invented**, which is harder and less comfortable.
>
> **The three As-Is questions are worth memorising** as the definition of "high level enough": **why does it exist · what does it do · what is its high-level objective.** Anything beyond that is probably paralysis.

> [!TRAP]
> The deck's note adds a caution that stops "shallow" turning into "careless":
>
> > *"**If you do not understand where you are, any detailed map is pretty much useless!** … Though As-Is modelling sounds trivial, often it is based on a critical set of understanding/assumptions. **It is important to understand and document them as well** in As-Is. Recall that we are in the context of BPR — so knowing the current is important."*
>
> So the rule is **shallow on detail, but explicit about assumptions.** You need not record every keystroke; you must record *why* the process is shaped as it is — because those rules and assumptions are exactly what the diagnosis phase interrogates.

> [!EXAM]
> The QnA's model answer distinguishes them by **time**: **AS-IS is the current process "before ERP implementation"; TO-BE is "the new procedures to be followed using the ERP implementation."**

> [!DERIVE]
> **Why TO-BE must be detailed** — it has a downstream consumer that As-Is does not.
>
> The To-Be model is what gets **configured into the ERP**. Unit 1's Realization phase turns it into configuration and, where the package cannot support it, into **customization**. A vague To-Be produces guesses at configuration time.
>
> Note precisely what must be detailed: **all input–output relationships, data flows, and the organization roles performing the process.** Those three map onto what an ERP actually needs — data, and who is authorised to do what.
>
> And recall from the BPM need list: *"a quick comparison of AS IS and TO BE process when both are represented."* **Gap analysis is that comparison** — which is why both models exist at all.

## The process hierarchy

> [!EXAM]
> **Business Process Hierarchy is a logical grouping of Business Scenarios, Business Processes, Activities and Steps.**
>
> | Level | Name |
> |---|---|
> | **Level 1** | **Scenario** |
> | **Level 2** | **Process** |
> | **Level 3** | **Activity** |
> | **Level 4** | **Step** |

> [!EXAM]
> **The deck's worked example**, expanding downward:
>
> | Level | Example |
> |---|---|
> | **1 — Scenario** | **Supply Chain Management** |
> | **2 — Process** | **Order Management** |
> | **3 — Activity** | **Delivery Scheduling** |
> | **4 — Step** | **Calculation of Delivery Date** |

> [!INTUITION]
> **Mnemonic — the four levels spell SPAS:**
>
> **S**cenario → **P**rocess → **A**ctivity → **S**tep
>
> And the example gives you the shape: **Supply Chain Management → Order Management → Delivery Scheduling → Calculation of Delivery Date.** Each level is one **"expansion"** of the level above — the deck's own word — narrowing from a whole business area to a single computation.
>
> A useful check: **a Step is something one person does at one time**; an **Activity** is a coherent chunk of work; a **Process** has *"a clear beginning and an end"* and crosses departments; a **Scenario** is a whole business area containing several processes.

> [!EXAM]
> **Why a hierarchy?**
> - **It helps to see processes at different levels**
> - **Based on the organizational role, people can explode and analyze the process**
> - **It is easy to navigate the hierarchy — from Scenario to Process to Activity to Step**
> - **It is easy to define roles at different levels**
>
> The stated motivation: **"Business processes can be many. Hence…"**

> [!INTUITION]
> The deck's notes give the three real benefits, and they are the standard benefits of any abstraction hierarchy:
>
> > *"Hierarchy facilitates **control and intuitive structure when the numbers are larger**. **Natural delegation of responsibility and consolidation of goals.** **Facilitates abstraction.**"*
>
> **The numbers argument is the practical one.** The next topic notes that even a medium-sized company has **40–100 processes** — and each of those has activities, which have steps. Flat, that is thousands of items that nobody can navigate. Hierarchical, you can enter at the level you care about.
>
> **"Based on the organizational role, people can explode and analyze"** is the elegant part: a director looks at Scenarios, a process owner at Processes, an operator at Steps. **One model, read at four depths by four audiences** — which is the same idea as the SRS being written general-to-specific in three passes.

> [!TRAP]
> **"It is easy to define roles at different levels"** connects the hierarchy back to BPR.
>
> Recall the diagnosed problem *"clear ownership of process missing"* and Hammer's process-centred organization, where **"there is a process owner for each process."** Ownership has to be assigned **at a level** — you own a *Process*, you are not the owner of a single *Step*.
>
> **The hierarchy is what makes "process owner" a definable job** rather than a vague responsibility for everything.

> [!EXAM]
> The deck also maps the hierarchy onto **notations** in one diagram: the top two levels (**process map with core processes**, and **main processes**) are drawn in **VACD**; **Processes** in **EPC**; and **Process Steps** in **EPC + FAD** — showing that different levels of the hierarchy are conventionally drawn in different notations. *(VACD = value-added chain diagram; EPC and FAD are covered in the standards topic.)*

---

**Next:** the standards that govern how these models are drawn — **BPM standards**.
