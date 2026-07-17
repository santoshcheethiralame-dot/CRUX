---
subject: se
unit: 2
order: 5
slug: risk-management
title: Risk Management
summary: What a risk is, the two dimensions of risk classification (type & what-is-affected), the four-step risk process, risk exposure, response strategies, and risk indicators.
minutes: 13
tags: [risk, project-product-business, risk-exposure, mitigation, indicators]
---

# Risk Management

## What is a risk?

> [!NOTE]
> A **risk** is the **probability of an unwanted incident** occurring during a project that could impact the **schedule, budget, quality, or viability**. Risk management is concerned with **identifying risks and drawing up plans to minimise their effect**.

Software is uncertain by nature — loosely defined requirements, requirements that change with customer needs, hard-to-estimate time/resources, and varying individual skills. So you must **anticipate** risks, understand their **impact** on the project/product/business, and take steps to **avoid or reduce** them.

## Risk classification — two dimensions

### (a) By type
**Technical · Organizational · External** (and People, Requirements, Technology, Tools, Estimation risks).

### (b) By what is affected
This is the most-tested classification:

| Category | Affects | Examples |
|---|---|---|
| **Project risks** | **Schedule or resources** | Staff turnover, hardware unavailability, management change |
| **Product risks** | **Quality or performance** of the software | Requirements change, technology underperformance, integration problems |
| **Business risks** | The **organisation's** objectives | Competitor ships first, technology becomes obsolete, funding cut |

> [!EXAM]
> Classify by what's hit: **Project** → schedule/resources; **Product** → software quality/performance; **Business** → the organisation. Note a risk can be **both** project *and* product (e.g. *requirements change*, *size underestimate*, *specification delays*).

## The Risk Management process (4 steps)

```
1. Risk identification → 2. Risk analysis → 3. Risk planning → 4. Risk monitoring  (loop)
```

| Step | What happens |
|---|---|
| **1. Identification** | Find project/product/business risks — via brainstorming, historical analysis, checklists, expert interviews, documentation review. |
| **2. Analysis** | Assess **likelihood × consequence** of each risk (qualitative H/M/L or quantitative). Compute **Risk Exposure** and **prioritise**. |
| **3. Planning** | Draw up response strategies to avoid or minimise each risk. |
| **4. Monitoring** | Track risk indicators throughout the project; report status; update plans; scan for new risks. |

> [!INTUITION]
> **Risk Exposure = Probability × Impact (cost).** A 10% chance of a ₹10-lakh loss has the same exposure (₹1 lakh) as a 100% chance of a ₹1-lakh loss. Exposure lets you **rank** risks so attention goes where it matters most.

### Risk response strategies

| Strategy | Meaning |
|---|---|
| **Avoidance** | Eliminate the risk source (change scope or approach) |
| **Mitigation** | Reduce the probability or impact through preventive action |
| **Transfer** | Shift responsibility to another party (insurance, contracts) |
| **Acceptance** | Acknowledge the risk and plan a **contingency** response |

> [!EXAM]
> Four responses: **Avoid, Mitigate, Transfer, Accept.** "Buy insurance" = transfer; "add code reviews to cut defect risk" = mitigate.

## Risk indicators (leading signs)

Effective monitoring watches **leading indicators** that signal trouble early:

| Risk type | Potential indicators |
|---|---|
| **Estimation** | Schedule slippage; failure to clear reported defects |
| **Organizational** | Organizational gossip; lack of action by senior management |
| **People** | Poor morale; poor team relationships; high staff turnover |
| **Requirements** | Many change requests; customer complaints |
| **Technology** | Late hardware/software delivery; many technology problems |
| **Tools** | Reluctance to use tools; complaints about CASE tools |

> [!INTUITION]
> Indicators are the **smoke before the fire.** By the time a risk has clearly happened, it's a problem, not a risk — the point of monitoring is to catch the early smoke.

---

**Next:** assigning responsibility and keeping the team healthy — **RACI, planning outcomes & teamwork**.
