---
subject: erp
unit: 2
order: 15
slug: prototyping-bpr-vs-tqm
title: Prototyping, Implementation & BPR vs TQM
summary: Why a prototype must precede full release and what it settles, how implementation synchronises with ERP go-live, and the full nine-parameter comparison of BPR against TQM with the performance-over-time picture.
minutes: 11
tags: [BPR, prototyping, implementation, TQM, comparison, incremental, radical, continuous, methodology]
---

# Prototyping, Implementation & BPR vs TQM

## Prototyping

> [!EXAM]
> **BPR — Prototyping and Detailing:**
>
> - **Initially run the new process on a small "set"** — **few customers, few transactions**
> - **Helps to decide organization support / structure needed to implement**
> - **Helps in detailing the process correctly**

> [!EXAM]
> The deck's reasoning:
>
> > **"Though a lot of thinking goes into creating a new process, some unexpected issues might crop up while implementing. So a prototype phase is a must to check viability and to some extent acceptance of the people involved. Only after the prototype is run successfully can all the points be frozen."**

> [!INTUITION]
> A prototype settles **three different questions at once**, which is why it cannot be skipped:
>
> | Question | The deck's phrase |
> |---|---|
> | **Does it work?** | *check viability* |
> | **Will people accept it?** | *to some extent acceptance of the people involved* |
> | **What does it need?** | *decide organization support / structure needed* |
>
> The second is the one that distinguishes a BPR prototype from a software pilot. You are not only testing whether the process functions — you are testing whether the **people will use it**, which is Chapter 4's concern arriving inside Chapter 5.
>
> **"Only after the prototype is run successfully can all the points be frozen"** is the operative constraint: the detailed design is an *output* of prototyping, not an input to it. You cannot fully specify a process you have never run.

> [!TRAP]
> This phase is the direct countermeasure to failure reason 7, **"large scale implementation without prototyping"**, and to the key to success **"prototype every process before large scale implementation."**
>
> Note the word **every**. It is not enough to prototype the programme once — each redesigned process needs its own trial, because each touches different people and different constraints.

## Full implementation

> [!EXAM]
> **BPR — Final release / Full implementation:**
>
> - **May be done in phases**
> - **Regular control through change management**
> - **If ERP is part of the game plan, the new system has to be synchronized with the ERP go live phase**

> [!DERIVE]
> **The third point is the one that matters most for this course**, and it explains why BPR sits where it does in the ERP life cycle.
>
> A redesigned process and the ERP system that supports it **must arrive together**. Deploy the process first and people execute it manually with no system support; deploy the ERP first and it enforces the *old* process. Either way you get the deck's proverb:
>
> > **"Old process + new technology = costly old process."**
>
> This is why **BPR is an activity inside Business Blueprinting** in Unit 1 — it must complete in time for the To-Be process to be configured into the system during **Realization**, and go live with it.
>
> **"May be done in phases"** connects to the deployment strategies: a phased process rollout pairs naturally with a **Rollout** ERP deployment, both trading time for reduced risk.

## BPR vs TQM

> [!EXAM]
> The comparison the deck draws, parameter by parameter:
>
> | Parameter | **Process Improvement / TQM** | **Process Redesign / BPR** |
> |---|---|---|
> | **Level of change** | **Incremental** | **Radical** |
> | **Starting point** | **Existing process** | **Clean slate** |
> | **Frequency of change** | **Continuous** | **One-time** |
> | **Time required** | **Short term** | **Long term** |
> | **Participation** | **Bottom up** | **Top down** |
> | **Typical scope** | **Narrow** | **Broad** |
> | **Risk** | **Moderate** | **High** |
> | **Primary enabler** | **Statistical control** | **IT** |
> | **Type of change** | **Cultural** | **Cultural / Structural** |

> [!EXAM]
> **TQM = Total Quality Management.** The deck's framing:
>
> > *"Instead of looking at the quality of the end product/service only, TQM looks at all the processes that contribute, so that a more holistic and sustainable benefit is achieved."*
>
> And on the performance graph: **"TQM actions act at a lower level than BPR. It is more of a continuous process than a drastic one-time one. Performance improvement in BPR is quite drastic; in TQM it is a slow graph."**

> [!INTUITION]
> **The graph is the memory hook for the whole table.** Plot process performance against time:
>
> - **TQM** is a **gentle upward slope** — small gains, continuously, forever
> - **BPR** is a **step change** — a jump, then a plateau
>
> Every row of the table follows from that shape:
>
> - A **step** must be **radical**, from a **clean slate**, and happens **once** — so it takes **long** to prepare and carries **high risk**, because you get one attempt.
> - A **slope** is **incremental**, starts from the **existing process**, and is **continuous** — so each change is **short**, **narrow** and **moderate risk**.
>
> **Participation follows too:** a step change must be **top down** because only management can authorise structural change; a slope is **bottom up** because the people doing the work spot the small improvements.

> [!TRAP]
> **The two are not alternatives, and the deck says so:**
>
> > *"A company might be running more than one improvement programme at any time… but they overlap with BPR."*
>
> The natural relationship is **sequential**: BPR delivers the step change, then TQM works the slope upward from the new level, until the environment shifts and another step is needed.
>
> Note the last row — **type of change**. TQM is **cultural** only; BPR is **cultural *and* structural**. That extra word is why BPR needs organizational design, a change team, and top management support, while TQM largely does not.

> [!EXAM]
> **The most-tested rows are "starting point" and "frequency":**
> - **TQM starts from the existing process; BPR starts from a clean slate**
> - **TQM is continuous; BPR is one-time**
>
> These are the two that follow directly from *fundamental rethinking* and *radical redesign*. A change that starts from the existing process cannot be a *fundamental rethink* — which is exactly failure reason 5, *"little change in process, not redesign."*

## Methodologies

> [!EXAM]
> The deck shows a slide on **different methodologies of BPR**, with the note:
>
> > **"Number of methodologies for BPR can be as many as the number of consulting companies! — Each branding it."**

> [!NOTE]
> The deck's two methodology slides — *"Different methodologies of BPR"* and *"A BPR Methodology"* — carry **only titles**, with no diagram or body content in the supplied file. The examinable point is the note above, which mirrors Unit 1's observation about implementation methodologies: they are **branded assets of consulting firms**, developed from accumulated practice, and *"has a brand value!"*

---

**Next:** BPR's relationship to IT, and where the target comes from — **business engineering, benchmarking & best practices**.
