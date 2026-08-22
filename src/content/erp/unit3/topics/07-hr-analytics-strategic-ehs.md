---
subject: erp
unit: 3
order: 7
slug: hr-analytics-strategic-ehs
title: HR Analytics, Strategic vs Operational HR & EHS
summary: The HCM analytics table by category, the exact split between strategic and operational HR processes that the MCQs test, Employee Health and Safety applications, and the HCM vendor landscape.
minutes: 11
tags: [HR-analytics, KPI, strategic-HR, operational-HR, EHS, occupational-health, industrial-hygiene, vendors, peoplesoft]
---

# HR Analytics, Strategic vs Operational HR & EHS

## HCM / HR analytics

> [!EXAM]
> | Category | Typical KPIs / Reports |
> |---|---|
> | **Recruitment** | **Cost per hire** · **Time to fill vacant positions** |
> | **Onboarding** | **Onboarding efficiency** |
> | **Attendance & Leave** | **Attendance percentage** · **Unapproved leave percentage**, with drill down (which employees) |
> | **Compensation** | **Salary comparison with industry benchmarks** · **Salary increase %** · **Number of promotions in a year** |
> | **Learning** | **Average number of training days per employee** · **Number of "No show" cases** (registered but not appeared) · **Training feedback** · **Training budget** |
> | **Employee Relationship** | **Portal usage rate** · **Workforce utilization** · **Number of rescheduling cases** |

> [!INTUITION]
> The metrics fall into **three kinds**, and recognising which is which tells you what each is *for*:
>
> - **Efficiency** — *cost per hire, time to fill, onboarding efficiency, workforce utilization.* How well is HR running?
> - **Compliance / hygiene** — *attendance %, unapproved leave % **with drill down**.* Who is deviating?
> - **Competitiveness** — *salary comparison with industry benchmarks, promotions per year.* Are we still attractive?
>
> The third group is **benchmarking** from Unit 2 embedded in HR — you cannot know whether your salaries are right by looking only at your own data.
>
> Two entries are worth a second look. **"No show" cases** measures waste: a registered seat nobody used costs money and denies someone else a place. **"Portal usage rate"** measures whether ESS actually worked — a portal nobody visits has not moved data entry anywhere.

## Strategic vs operational HR processes

> [!EXAM]
> This split is directly examined — learn which side each process is on.
>
> | **Strategic / Core Processes** | **Operational / Routine Processes** |
> |---|---|
> | **Performance management process design** | **Employee record management** |
> | **Compensation & Reward planning** | **Leave and Absence management** |
> | **Planning job roles** | **Time and labor management** |
> | **Recruitment process design** | **Tax and compliance services** |
> | **Workforce planning** | **Payroll** |
> | **Learning management** | **Health, Welfare, Retirement benefits administration** |
> | | **Retirement Benefits** |

> [!TRAP]
> **Three of the pasted MCQs test exactly this table, and two of them are traps:**
>
> - *"Planning job roles is a strategic HR process."* — **TRUE**
> - *"Payroll is a strategic HR process."* — **FALSE** *(payroll is operational)*
> - *"Succession planning is a part of learning management."* — **FALSE** *(it is talent management)*
>
> The reliable test: **strategic processes contain the words "design" or "planning"** — *performance management process **design***, *compensation **planning***, ***planning** job roles*, *recruitment process **design***, *workforce **planning***.
>
> **Operational processes are the running of the thing** — records, leave, time, tax, payroll, benefits administration.
>
> **Design and plan it = strategic. Run it every month = operational.**

> [!DERIVE]
> **This table is the order-of-automation table seen from a different angle**, and noticing that ties the chapter together.
>
> The **operational** column is almost exactly the **first wave** — payroll, employee records, time and attendance, leave. High volume, objective rules, automated first.
>
> The **strategic** column is the **third wave** — performance, compensation planning, learning. Low volume, judgement-based, automated last.
>
> So the two tables are one fact: **the processes ERP automates first are precisely the operational ones**, because being rule-governed is what makes something both *operational* and *automatable*.
>
> Note the one apparent oddity: **Learning management appears in the strategic column**, though *training administration* is routine. The distinction is between **designing the learning strategy** (strategic) and **booking people onto courses** (operational).

## Employee Health and Safety (EHS)

> [!EXAM]
> **EHS = Employee Health and Safety.**
>
> - **EHS applications support systems and processes that ensure appropriate health and safety controls are incorporated into all operations**
> - This includes provisions for the **systematic identification, evaluation, and control of potential workplace hazards**, including **potential exposure and health risks related to chemicals and emissions**
> - **EHS software support can span across all processes in which employees interact with product and manufacturing processes** — such as **R&D, manufacturing, transportation, storage, and disposal**
> - **It has the ability to sense and respond to potential hazards**

> [!TRAP]
> **EHS stands for Employee Health and Safety — not "Enterprise Human Services."** One of the pasted MCQs states the latter and the answer is **FALSE**.
>
> *(In wider industry usage EHS is often expanded as **Environment, Health and Safety**. Answer with the deck's expansion — **Employee Health and Safety** — since that is what the course states.)*

### The two EHS solution areas

> [!EXAM]
> **Leading EHS solutions help in areas like:**
>
> **1. Industrial Hygiene and Safety** — helps in:
> - **Risk assessments of different tasks or different work areas**
> - **Incident management and safety management of specific work areas**
>
> **2. Occupational Health** — this module:
> - **Equips occupational health professionals with the tools, functions, and flexibility they need to provide for the health and well-being of employees**
> - **Enables full-scale health management of workers based on their exposure, injury or illness, and demographic parameters**

> [!EXAM]
> **EHS: Industrial Hygiene and Safety — the functional areas:**
> - **Work Area** · **Assignment of Location** · **Employee Assignment**
> - **Accident Recording** · **Reasons Recording** · **Accident Reporting** · **Accident Analysis**
> - **Safety Audit Log Entry & Reporting**
> - **Notification Creation and Processing for Safety Rounds**

> [!INTUITION]
> The two areas split by **direction in time**:
>
> - **Industrial Hygiene and Safety** is mostly **after the fact and about places** — record the accident, record the reasons, report it, analyse it, audit the area.
> - **Occupational Health** is **ongoing and about people** — manage a worker's health based on **exposure, injury/illness and demographics**.
>
> Note that the accident chain runs **record → reasons → report → analyse.** Recording alone is compliance; **analysis** is what prevents the next accident, and it needs the *work area* and *employee assignment* links to ask "which location, which shift, which task keeps producing incidents?"
>
> **That query requires EHS to be integrated with workforce scheduling and personnel data** — which is the argument for EHS living inside HCM rather than as a standalone safety register.

## HCM vendors

> [!EXAM]
> **Comprehensive functionality:** **PeopleSoft** · **SAP, Oracle … other ERPs** · **IBM**
>
> **Many vendors support a functionality subset:** **Workforce / Labor management** · **Leave system** · **Payroll**
>
> **Lots of country specific vendors exist.**

> [!INTUITION]
> **PeopleSoft is named first, ahead of SAP and Oracle**, and that is historically correct — it was the HCM specialist that defined the category before being acquired by Oracle.
>
> The **subset vendors** cluster around exactly the three things that are highest-volume and most local: **workforce management, leave and payroll.** And **country-specific vendors** exist for the reason payroll gave us: **localisation and tax law cannot be generalised**, so a local specialist can beat a global suite on its own ground.

---

**Next:** Chapter 8 begins — **financial management overview & application categories**.
