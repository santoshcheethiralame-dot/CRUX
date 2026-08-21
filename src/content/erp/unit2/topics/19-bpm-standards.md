---
subject: erp
unit: 2
order: 19
slug: bpm-standards
title: BPM Standards
summary: The four families of process definition standard, APQC's fourteen categories, SCOR's five management processes, BPMN and its relationship to BPEL, EPC and UML, the five dimensions of a process model and the maturity continuum.
minutes: 12
tags: [standards, APQC, SCOR, BPMN, BPEL, EPC, UML, OMG, multi-dimension, maturity]
---

# BPM Standards

## The four families

> [!EXAM]
> **Common Business Process Definition Standards are:**
>
> | Family | Standard |
> |---|---|
> | **Enterprise Process Standard** | **APQC Process Classification Framework** |
> | **Supply Chain Process Standard** | **Supply Chain Operation Reference Model (SCOR)** |
> | **Industry Process Standards** | like **ECR** in retail |
> | **Collaboration Process Standards** | like **VICS** (Voluntary Intra-Industry Commerce Standards) |
>
> **Expansions to know:** **APQC = American Productivity and Quality Council** · **ECR = Efficient Consumer Response**

> [!INTUITION]
> The four families are ordered by **scope**, which makes them easy to place:
>
> $$\textbf{Enterprise} \rightarrow \textbf{Supply chain} \rightarrow \textbf{Industry} \rightarrow \textbf{Collaboration between firms}$$
>
> **APQC** covers everything one company does; **SCOR** covers the chain it sits in; **ECR** covers one industry's conventions; **VICS** covers how firms trade with each other. Each is broader in *reach* and narrower in *applicability* than the last.
>
> The deck's note adds why they matter increasingly: *"like other engineering disciplines, BE also has standards, though a rigid standard is difficult in this kind of subject. **Compliance requirements are getting stronger by the day. Hence we should expect standards becoming more and more important.**"*

## APQC Process Classification Framework

> [!EXAM]
> APQC divides an enterprise into **Operation Processes** and **Management and Support Processes**:
>
> **Operation processes (1–7):**
> 1. **Manage Business Strategy**
> 2. **Manage Brands & Services**
> 3. **Manage Sales Planning**
> 4. **Manage Buying & Sourcing**
> 5. **Manage Sales Execution**
> 6. **Manage Logistics**
> 7. **Manage Marketing & Customer Service**
>
> **Management and support processes (8–14):**
> 8. **Manage Human Resources**
> 9. **Manage IT**
> 10. **Manage Finance**
> 11. **Manage Assets & Properties**
> 12. **Manage Environmental Health & Safety**
> 13. **Manage External Relationships**
> 14. **Manage Knowledge and Change**

> [!INTUITION]
> The **operation / support split is Porter's Value Chain again** — *primary activities* that deliver to the customer, and *support activities* that make them possible.
>
> Compare: APQC's operations run **strategy → brands → sales planning → sourcing → sales execution → logistics → marketing & service**, which is recognisably *in-make-out-sell-serve*. Its supports are **HR, IT, Finance, Assets, EHS, External relationships, Knowledge & change** — a superset of Porter's *firm infrastructure, HRM, technology development, procurement.*
>
> **Item 14, "Manage Knowledge and Change", is worth noticing** — change management appears as a **standard enterprise process** in its own right, which is the strongest possible statement of Chapter 4's claim that it is a discipline rather than an attitude.

## SCOR — the five management processes

> [!EXAM]
> **SCOR is based on five distinct management processes:**
>
> $$\textbf{Plan} \;\cdot\; \textbf{Source} \;\cdot\; \textbf{Make} \;\cdot\; \textbf{Deliver} \;\cdot\; \textbf{Return}$$
>
> The model spans the whole chain — **Suppliers' Supplier → Supplier → Your Company → Customer → Customer's Customer** — with **Source, Make, Deliver and Return** repeating at each link, and **Plan** sitting above them all.

> [!INTUITION]
> **Mnemonic — "Plan, Source, Make, Deliver, Return" follows the goods and then brings them back.**
>
> **Source → Make → Deliver** is the physical flow, in order. **Return** is the reverse flow — the one people forget, and the reason reverse logistics is a named discipline. **Plan** is not in the flow at all; it sits **above** the other four, coordinating them.
>
> Two structural points from the diagram earn marks:
>
> **The four operational processes repeat at every link.** Your supplier also sources, makes, delivers and returns. That is what makes SCOR a *chain* model rather than a company model.
>
> **The model extends two hops in each direction** — to your **suppliers' supplier** and your **customer's customer**. This is the ERP II idea from Unit 1: optimising *"the whole business network, including suppliers and clients."*

## BPMN

> [!EXAM]
> - **Business Process Management Initiative (BPMI) developed BPMN**, which has been **maintained by the Object Management Group (OMG) since the two organizations merged in 2005**
> - **Business Process Model and Notation (BPMN) is a standard for business process modelling that provides a graphical notation for specifying business processes in a Business Process Diagram (BPD), based on a flowcharting technique**
> - **BPMN supports business process management for both technical users and business users**, by providing a notation that is **intuitive to business users, yet able to represent complex process semantics**
> - **Bridges the communication gap that frequently occurs between business process design and implementation**
> - **BPMN also provides a mapping between the graphics of the notation and the underlying constructs of execution languages, particularly Business Process Execution Language (BPEL)**

> [!DERIVE]
> **The BPMN-to-BPEL mapping is the most consequential fact on this slide.**
>
> A BPMN diagram is not only a picture for humans — it can be **mapped to an execution language** and actually run. That closes the gap between *"business process design"* and *"implementation"*, which the previous bullet names explicitly.
>
> Contrast with the sync problem from the BPM topic, where a diagram and its documentation drift apart. **If the diagram *is* the specification that executes, it cannot go stale** — the model and the running process are the same artefact.
>
> The deck's own example, **"Collect Votes"**, shows the notation's vocabulary: **tasks** (rounded boxes), a **gateway** (diamond — *"Conference Call in Voting Week?"* with Yes/No branches), **timer events** (*"Wait until Thursday, 9am"*, *"Delay 6 Days"*), **start and end events** (circles), and **data objects** (*Calendar*, *Vote*, *Vote Tally*) attached by dashed **data associations**.

## EPC, BPMN and UML compared

> [!EXAM]
> | Standard | Details |
> |---|---|
> | **Event Driven Process Chains (EPC)** | Originally developed by **IDS Scheer** to illustrate **SAP** processes within the **ARIS** framework. Their application has since extended beyond this, and **EPCs are now considered one of the leading standards for modelling business processes** |
> | **Business Process Modelling Notation (BPMN)** | A **standardized graphical notation**. The notation is **strongly IT-oriented** and is maintained by the **Object Management Group**. Both **IBM and IDS Scheer are members of OMG**, which also governs standards for processes and methodologies |
> | **Unified Modelling Language (UML)** | A leading **standardized specification language for object modelling in the software engineering sector**. Compiled by **three object-oriented software methodologists within Rational Software**, and supported by the **Rational Unified Process** methodology |

> [!TRAP]
> **Know which one belongs to whom** — this is the most MCQ-able content in the chapter:
>
> - **EPC → IDS Scheer → ARIS → SAP**
> - **BPMN → BPMI, then OMG (merged 2005) → BPEL**
> - **UML → Rational Software → Rational Unified Process**
>
> Note that **UML is for software object modelling**, not business processes — it appears here because it is used adjacently, and Unit 1 covered use-case modelling. **BPMN is business-process-native; UML is software-native.**
>
> Note also the connection back: *"modelling methods could be influenced by ERPs — **SAP links with EPC**."* Your choice of ERP can determine your notation.

## The five dimensions of a process model

> [!EXAM]
> **Multi Dimension Process Models:**
>
> | Dimension | Description |
> |---|---|
> | **Graphical Model** | **The pictorial representation of the process model** |
> | **Resource Model** | **Allows all resources to be defined so they can be associated to the model** |
> | **Information Model** | **A view of data and how data is used within a business process** |
> | **Organization Model** | **The definition and structure of all organization units and their associated resources** |
> | **Analysis Model** | **Where key process metrics and attributes are defined and then analyzed** |

> [!INTUITION]
> **Mnemonic — G-R-I-O-A, and they arrive in that order as a model matures:**
>
> **G**raphics first *(what happens)* → **R**esources *(what it needs)* → **I**nformation *(what data flows)* → **O**rganization *(who does it)* → **A**nalysis *(how well it performs)*.
>
> Each dimension answers a different question about the *same* process, and each costs more effort than the last — which is exactly what the maturity continuum below describes.

## The process modelling maturity continuum

> [!EXAM]
> The deck's continuum runs from **Very Basic Model** to **Advanced Model**, with effort and benefits rising together:
>
> | Stage | What is added | Benefit | Effort |
> |---|---|---|---|
> | **Basic process flows** | — | **Communication — technical and business speak the same language** | **Lowest effort:** simple models; process owners and model builders |
> | **Add organization elements** | organization structure and roles | **Organizational impacts of process or process change** | Expanded scope; **structure and roles must be modelled and assigned** |
> | **Add resources and controls** | — | **Alignment of processes to audit and compliance requirements** | Increased **governance of modelling** |
> | **Add infrastructure and data** | — | **Illuminates systems and data requirements and outputs** | Increased **model QA and auditing**; broader organizational involvement; **data confidentiality issues** |
> | **Add timings and costs** | — | **Visibility into time to process, costs to process and opportunities for optimization** | **Highest effort:** substantial investment in detail costing; **time and motion studies** needed for data gathering |

> [!TRAP]
> **The continuum is a warning as much as a roadmap.** Each stage adds real benefit **and** real cost, and the deck names the costs precisely — governance, QA, auditing, **data confidentiality issues**, and finally **time and motion studies**.
>
> The practical implication: **model to the depth your purpose requires, and no further.** If you need to communicate between IT and business, basic flows suffice. Only if you need cost optimisation do you take on time-and-motion study.
>
> **This is the same judgement as As-Is shallow / To-Be deep** — depth is chosen by purpose, not maximised on principle. Modelling everything to the last stage is the BPM version of *analysis paralysis*.

---

**Next:** the tools that draw these, and the wider model they sit in — **modelling software & business modelling**.
