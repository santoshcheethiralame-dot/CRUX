---
subject: se
unit: 1
order: 10
slug: security-requirements
title: Security Requirements
summary: The requirements phase as where security capabilities get fixed, security risk assessment step by step, assets and stakeholders, threats and attackers, the risk categorisation rule, SMART security objectives, and the hospital example carried through all of it.
minutes: 13
tags: [security, SRA, risk-assessment, threat-modelling, assets, stakeholders, SMART, risk-rating, non-functional]
---

# Security Requirements

## Why security belongs in the requirements phase

> [!EXAM]
> - **The Requirements Phase establishes what security capabilities a system must provide *before* design and implementation.**
> - **Why it matters:** **finding security needs early reduces costly redesign and vulnerabilities.**
> - **Key outputs:** **security requirements specification, risk assessment and threat modelling.**

> [!INTUITION]
> This is the **Secure SDLC** idea from topic 4 applied at one specific phase — security mapped onto every stage rather than bolted on at the end.
>
> The argument is the cost-of-repair curve again. A missing security capability discovered in **requirements** is a paragraph; discovered in **design** it is an architectural change; discovered **after release** it is a breach, a disclosure, and a patch cycle.
>
> Note what the phase produces: not code, not controls, but **a specification, a risk assessment and a threat model** — three documents that constrain everything built afterwards.

## Security Risk Assessment (SRA)

> [!EXAM]
> **A structured process to identify, quantify, and prioritize security risks.**
>
> 1. **Identify Assets and Stakeholders**
> 2. **Identify potential threats and attackers**
> 3. **Analyze, Evaluate and categorize risk** based on **likelihood & impact assessment**
> 4. **Define mitigations**
>
> **Worked example:**
> - **Asset:** Customer Credit Card Data
> - **Threat:** Database injection attack
> - **Likelihood: Medium; Impact: High → Risk Rating: High**

> [!INTUITION]
> The order of the four steps is the content. **You cannot identify threats until you know what is worth attacking**, and you cannot rate a risk until you know both the threat and the value of what it threatens.
>
> Starting at step 2 — the common instinct, "let's list attacks" — produces an unbounded list of everything bad that could conceivably happen, with no way to rank it. **Assets bound the problem.**
>
> Note also that **mitigation is last**. Deciding on defences before assessing risk is how teams end up heavily protecting something cheap while leaving the valuable thing exposed.

## Step 1 — Assets and stakeholders

> [!EXAM]
> - **Determine what holds value and for whom.**
> - **Value can be either tangible**, such as economic benefits, **or intangible**, such as reputational or emotional significance.
> - **Anything which has a value is categorized as an asset.**
> - **Anyone who owns an asset is categorized as a stakeholder.**
> - **There can be more than one stakeholder for a given asset.**
> - **One stakeholder may have multiple assets.**

> [!DERIVE]
> **The hospital example, which the deck carries through the whole lecture.**
>
> *A patient's medical data in a hospital database managed by the hospital.*
>
> | Asset | Stakeholder | Why it has value |
> |---|---|---|
> | Medical data | **Patient** | **Privacy** — intangible |
> | Medical data | **Hospital** | **Legal, and in turn financial** implications |
> | The database itself | **Hospital** | **Economic** — initial cost, and non-availability may impact revenue |
>
> This single example demonstrates **both** many-to-one relationships at once: **one asset (medical data) with two stakeholders**, and **one stakeholder (the hospital) with two assets**.
>
> It also shows why the same asset needs different protection for different owners. The patient's interest is **confidentiality**; the hospital's interest in the database is **availability**. A control that protects one may do nothing for the other.

## Step 2 — Threats and attackers

> [!EXAM]
> **Systematically identify attack paths and potential threat agents.**
>
> - **Any weakness which may compromise an asset is considered a potential threat.**
> - **Any actor who may exploit an existing adversary to gain something is considered an attacker.**
> - **Gain can be tangible** (e.g. financial) **or intangible** (e.g. causing harm to someone).
>
> **Steps involved:**
> - **Visualize processes, data stores, trust boundaries.**
> - **Identify actors & assets** — e.g. external user, internal admin, session tokens.
> - **Enumerate threats.**
> - **Rate severity.**

> [!DERIVE]
> **The hospital example continued.**
>
> **Unrestricted access to the database** is the existing **weakness**. Potential threats include:
>
> - **Hospital employees** — *insider* attackers
> - **Other patients** — *external* attackers
> - **Natural disasters**, such as a fire at the physical location of the database
> - **A competing organization** — an external attacker acting **not for direct tangible gain, but to corrupt the database and inflict financial damage on a competitor as strategic sabotage**

> [!TRAP]
> Two entries in that list break the stereotype of "attacker," and both are exam-worthy.
>
> **A natural disaster is listed as a threat.** It has no motive at all. Security is about protecting assets from *compromise*, and a fire destroys availability just as effectively as an attack — so it belongs in the same assessment.
>
> **The competitor gains nothing directly.** This is why the definition insists gain may be **intangible**. An attacker model that assumes everyone wants money will not predict sabotage, vandalism, or an attacker whose goal is simply to cause harm — and will leave you undefended against them.

## Step 3 — Risk categorisation

> [!EXAM]
> **Analyze, evaluate and categorize risk** on three factors:
> - **Cost of the weakness to be exploited**
> - **Probability of the weakness being exploited**
> - **Damage if the weakness is exploited**
>
> **Severity is assigned from these:**
>
> | Rating | Cost of exploit | Probability | Damage |
> |---|---|---|---|
> | **Low Risk** | **High** | Low | Low |
> | **Medium Risk** | Medium | Medium | Medium |
> | **High Risk** | **Low** | High | High |

> [!INTUITION]
> **Cost runs backwards from the other two, and that is the whole insight.** High damage raises risk; high probability raises risk; but **high cost *lowers* it.**
>
> "Cost of exploit" means **the attacker's cost** — effort, skill, equipment, time. An attack requiring a nation-state budget is less likely to happen to you than one requiring a browser and ten minutes.
>
> So the worst case is **cheap to attack, likely, and devastating** — and the cheapness is what makes it likely. The three factors are not independent; **cost drives probability.**

> [!DERIVE]
> **The hospital example, rated:**
>
> - **Insider attack** (because of the unrestricted database) — **low cost, high probability, high damage → HIGH RISK**
> - **External attacker** (another patient) — **medium cost, medium probability, medium damage → MEDIUM RISK**
>
> Note *why* the insider risk is highest: an employee already has access, so the **cost of exploiting the weakness is near zero**. The insider is not more malicious than the outsider — they are **cheaper**, and the model correctly ranks them first.

## Step 4 — Security objectives

> [!EXAM]
> **Translating risks into goals:** convert each high-priority risk into a **measurable objective**, using **SMART criteria**:
>
> | | Meaning | Example |
> |---|---|---|
> | **S**pecific | **Clearly state the outcome** | encrypt all **Personally Identifiable Information (PII)** in transit |
> | **M**easurable | **Define metrics** | **256-bit AES, TLS v1.2+** |
> | **A**chievable | **Align with team capabilities** | |
> | **R**elevant | **Directly mitigates an identified threat** | |
> | **T**ime-bound | **Milestone before design review** | |
>
> **Example objectives:**
> - **Encrypt database backups with AES-256 by Q3.**
> - **Implement brute-force protection limiting login attempts to 5 per hour.**

> [!INTUITION]
> SMART is doing the same job here that the **metrics table** did for non-functional requirements in the previous topic: turning an unverifiable aspiration into something a tester can check.
>
> Compare *"the system shall be secure"* with *"limit login attempts to 5 per hour."* The second is Specific (what), Measurable (5, per hour), and testable in a minute. The first cannot be passed or failed.
>
> **R — Relevant — is the one that ties the chain together.** Every objective must **trace back to an identified threat**. Without it, teams accumulate security controls that are fashionable rather than useful, while the actual high risk from step 3 goes unaddressed.

> [!TRAP]
> The deck's hospital conclusion is worth reading carefully, because it is easy to misread as complacency:
>
> > *Insider attack risk is almost nil considering doctors are trusted. External attack (other patient) risk is almost nil as access protection will not allow database access.*
>
> This is the **residual risk after mitigation**, not the original assessment. Step 3 rated the insider risk **HIGH**; the objectives reduce it. The point is that risk ratings are **re-evaluated once controls exist** — an assessment is a before-and-after exercise.
>
> Note also the justification differs by case: the insider risk is reduced by **trust** (a process control) and the external one by **access protection** (a technical control). Trust is the weaker of the two, and "we trust our staff" is precisely the assumption that insider-threat programmes exist to question.

## From assessment to requirements

> [!EXAM]
> **SRA, security objectives and threat modelling will lead to clearly articulated security requirements for the product.**
>
> **These are part of the non-functional requirements.**
>
> - **Use the Risk Analysis output** to determine high-priority threats.
> - **Review Threat Models** to identify vulnerable points and potential attack paths.
> - **Apply Security Objectives** to ensure each critical area is protected by measurable goals.
> - **Draft and refine requirements that are clear, testable, and traceable** to specific risks and objectives.

> [!INTUITION]
> Two things to carry out of this topic.
>
> First, **"these are part of the non-functional requirements"** places security exactly where the taxonomy tree in the previous topic put it — `Security requirements` under **Product**, and `Safety/security` under **Legislative/External**. Security appears **twice** in that tree, which is not redundancy: one is a property you choose, the other is an obligation imposed on you.
>
> Second, the closing words — **clear, testable, and traceable** — are three of the nine properties of a requirement from topic 8. Security requirements are **ordinary requirements subject to the ordinary quality bar**; the SRA is simply the machinery for discovering them. And **traceable** here means something stronger than usual: traceable *back to a specific risk*, so that anyone can ask of any control, "which threat is this for?" — and get an answer.

---

**Next:** writing it all down and keeping it under control — **the SRS, RTM & change management**.
