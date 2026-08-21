---
subject: erp
unit: 1
order: 15
slug: deployment-strategies
title: Deployment Strategies — Big Bang to Rollout Modular
summary: The four deployment strategies as a two-by-two grid of locations against modules, the full five-parameter comparison of risk, time, learning scope, change management and resource demand, and how to choose.
minutes: 11
tags: [big-bang, rollout, modular, deployment, risk, comparison, grid, change-management]
---

# Deployment Strategies — Big Bang to Rollout Modular

## The four strategies

> [!EXAM]
> **Variations of 4 main strategies:**
>
> 1. **Big Bang** — **all locations, all modules**
> 2. **Progressive Rollout** — **selected locations**
> 3. **Big Bang but Modular**
> 4. **Rollout and Modular**

## The grid — the key to the whole topic

> [!EXAM]
> | Approach → | **Big bang** | **Rollout** | **Big bang Modular** | **Rollout Modular** |
> |---|---|---|---|---|
> | **Locations** | **All** | **Selected** | **All** | **Selected** |
> | **Modules** | **All** | **All** | **Selected** | **Selected** |

> [!INTUITION]
> **This is a 2 × 2 grid, and once you see that, you never have to memorise four definitions.**
>
> Two questions, each answered *all* or *some*:
>
> $$\textbf{How many locations?} \qquad \textbf{How many modules?}$$
>
> | | **All modules** | **Selected modules** |
> |---|---|---|
> | **All locations** | **Big Bang** | **Big Bang Modular** |
> | **Selected locations** | **Rollout** | **Rollout Modular** |
>
> **The naming is completely regular:**
> - **"Big Bang"** always means **all locations**
> - **"Rollout"** always means **selected locations**
> - Adding **"Modular"** always means **selected modules**
>
> So **Big Bang = everything everywhere**, and **Rollout Modular = some things, some places** — the two extremes, with the mixed cases in between.

## The comparison across five parameters

> [!EXAM]
> | Parameter | **Big bang** | **Rollout** | **Big bang Modular** | **Rollout Modular** |
> |---|---|---|---|---|
> | **Risk** | **High** | Average | **High** | **Low** |
> | **Time** | **Low** | Average | Average | **High** |
> | **Learning scope** | **Low** | **High** | Average | **High** |
> | **Change mgmt** | **High** | Average | **High** | **Low** |
> | **Resource demand** | **High** | Average | **High** | **Low** |

> [!EXAM]
> The QnA states the four with their headline trade-off:
>
> - **Big bang — high risk, less time**
> - **Rollout — medium risk, moderate time**
> - **Big bang Modular — high risk, moderate time**
> - **Rollout Modular — low risk, more time**

> [!DERIVE]
> **The whole table is one trade-off, plus one exception.**
>
> $$\textbf{Risk} \;\;\text{and}\;\; \textbf{Time} \;\;\text{move in }\textbf{opposite}\text{ directions}$$
>
> **Big Bang** is fastest and riskiest; **Rollout Modular** is slowest and safest. You are buying safety with time, and there is no option that gives you both.
>
> **Risk, change management and resource demand all move together** — read across those three rows and they are identical (High / Average / High / Low). That makes sense: switching everything on at once means **everyone changes at once** (change management) and **everyone needs support at once** (resources), which is *why* it is risky. **Three rows, one underlying quantity: how much is happening simultaneously.**
>
> **The exception is Learning scope**, and it is the row students misread. It is **High for both Rollout options and Low for Big Bang.**

> [!TRAP]
> **"Learning scope" means the opportunity to learn from earlier waves and improve later ones — and higher is better.**
>
> **Big Bang has Low learning scope** because there is no *later*. You go live everywhere simultaneously, so a lesson learned at site 1 cannot be applied at site 2 — site 2 went live the same morning.
>
> **Rollout has High learning scope** precisely because it is staged: fix what went wrong at the first site before touching the second.
>
> So on this one row, **Low is bad and High is good** — the opposite polarity to Risk, Change management and Resource demand. Getting this backwards is the classic error.

> [!INTUITION]
> **Why Big Bang Modular is still High risk** despite deploying fewer modules: because it still hits **all locations at once**. **Location count drives risk more than module count does**, since it is locations that determine how many *people* change their working day simultaneously.
>
> Compare with **Rollout Modular** — Low on risk, change management *and* resources — because it minimises both dimensions. It pays for that with **High time**, which is the one thing a business under competitive pressure often cannot spare. Recall the challenge: *"long timeline — difficult to sustain momentum; benefits/results cannot be delayed beyond a point."*

## Choosing a strategy

> [!DERIVE]
> The choice follows from what the organisation can least afford to lose:
>
> | If the organisation… | Choose |
> |---|---|
> | needs benefits fast and can absorb disruption | **Big Bang** |
> | has many locations and wants to learn as it goes | **Rollout** |
> | wants full coverage but is phasing functionality | **Big Bang Modular** |
> | is risk-averse, or is a first-time adopter with limited resources | **Rollout Modular** |
>
> Note the connection to **implementation types**: a **two-tier** deployment naturally suggests a **Rollout** — HQ first, subsidiaries after — because the organisation is already structured in tiers.

> [!EXAM]
> **The MCQ bank tests the definition directly:** *"In Big bang all ERP modules are implemented at selected locations."* — **FALSE.**
>
> Big Bang is **all modules at ALL locations**. The statement describes **Big Bang Modular** at best, and really describes nothing in the grid, since "selected locations" makes it a Rollout. **Read these statements against the grid and they resolve instantly.**

> [!EXAM]
> The question bank asks twice — *"write about the four common ERP implementation/deployment strategies"* and *"explain the pros and cons of each."* A full answer needs: **the grid** (locations × modules), **the five-parameter table**, and **the risk-versus-time trade-off** as the summarising idea.

---

**Next:** not every ERP project is a first implementation — **types of ERP projects**.
