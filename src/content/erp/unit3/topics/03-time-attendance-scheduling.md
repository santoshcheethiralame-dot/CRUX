---
subject: erp
unit: 3
order: 3
slug: time-attendance-scheduling
title: Time, Attendance & Workforce Scheduling
summary: Why capturing time drives payroll, the methods of capture from punch cards to biometrics, and workforce scheduling with its four scheduling questions and the constraints that make it hard.
minutes: 10
tags: [time, attendance, leave, biometric, workforce-scheduling, shift-planning, labour-tracking, constraints]
---

# Time, Attendance & Workforce Scheduling

## Time, attendance and leave management

> [!EXAM]
> - **Human resource systems help in managing time, attendance and leave**
> - **Capturing employee time is important for the employee's payroll calculation**
> - **Variety of means to capture employee time:** **punch cards, register, swipe, biometric — fingerprint, face/retina**
> - **HRMS packages can interpret time data and calculate gross pay of employees**
>
> **HRMS systems can support functionalities like:**
> - **Time and Attendance reporting**
> - **Absence / Out of Office**
> - **Leave Time — good amount of complexity here!**
> - **Attendance and Leave management analytics**

> [!INTUITION]
> **The second bullet is the reason this module exists where it does.** Time capture is not an administrative nicety — it is **an input to payroll**, and payroll is money leaving the company every month.
>
> That is why time and attendance sits in the **first wave of automation** alongside payroll: they are the same data flowing through two steps. Capture the hours wrongly and you pay the wrong amount, which is an error that is **immediate, visible and expensive**.

> [!TRAP]
> **"Leave Time — good amount of complexity here!"** deserves the exclamation mark, and it is a good example of why HR software is harder than it looks.
>
> Leave carries **entitlements that accrue at different rates, carry forward with caps, expire, encash, differ by grade and by country, and interact with public holidays and weekends.** None of that is conceptually deep, but all of it is **rules**, and the rules differ per organisation and jurisdiction.
>
> This is why leave management is a favourite target for **customization** — and therefore, per Unit 1, a favourite source of upgrade pain.

> [!EXAM]
> The deck's note on what these systems are really policing:
>
> > **"One of the critical things in these systems is monitoring violations. A small minority who deviate first can induce a large majority to be ad-hoc / indisciplined."**
>
> And it acknowledges the modern complication: **"certain aspects such as working from home etc. add to complexity further."**

> [!INTUITION]
> That note is a **norms argument**, not a surveillance one, and it is worth stating carefully. The claim is that visible unpunished deviation **changes what everyone else considers acceptable** — so the system's value is in consistency of enforcement rather than in catching individuals.
>
> It connects to the chapter summary's *"makes the system more professional & objective"*: a rule applied by software applies equally, whereas a rule applied by managers applies unevenly, which is what makes deviation contagious.

## Workforce scheduling

> [!EXAM]
> - **Human resource management systems help in assigning the company's workforce to different assignments**
> - **Assignment is to a function and not to a task. Assigning to a task is done by the Manager**
>
> **Workforce scheduling solutions help in deciding:**
> - **which employee should be assigned to which work**
> - **on which date**
> - **for how many hours**
> - **between what time to what time**

> [!TRAP]
> **"Assignment is to a function and not to a task — assigning to a task is done by the Manager."** This is a scope boundary and it is examinable.
>
> The ERP schedules a person to a **function** — a shift on a production line, a slot in a service rota. **Which specific task they do within it is the manager's call**, made on the ground with information the system does not have.
>
> This is the same *"distributed HR function"* idea from the overview: the system handles what is rule-governed and enterprise-wide; **the line manager handles what requires local judgement.**

### The constraints

> [!EXAM]
> **Work environment constraints:**
> - **Tools / machine availability**
> - **Infrastructure availability**
> - **Constraints on work hours for women**
>
> **Other considerations:**
> - **Union rules, employment terms, overwork**
> - **Government rules**
> - **Skills, & skill levels**
> - **Dynamic change in load pattern**

> [!EXAM]
> **The scheduling problem, as the deck states it:**
>
> > **"Consider different labor rules and skills, factor in different constraints, match production and job schedule to employee availability, and come up with an optimal deployment schedule for workforce."**
>
> **Integrate with the time management module** to **check availability of employees (attendance)** and **minimize overtime costs.**

> [!DERIVE]
> **Workforce scheduling is a constrained optimisation problem**, and reading it that way makes the list of constraints intelligible rather than arbitrary:
>
> | | |
> |---|---|
> | **Objective** | an **optimal** deployment schedule — **minimize overtime costs**, meet the production schedule |
> | **Hard constraints** | **government rules** and **constraints on work hours for women** — legally non-negotiable |
> | **Contractual constraints** | **union rules, employment terms, overwork** limits |
> | **Capability constraints** | **skills and skill levels** — not everyone can do every job |
> | **Physical constraints** | **tools, machines, infrastructure** availability |
> | **Moving target** | **dynamic change in load pattern** |
>
> The **integration with time management** is what makes it solvable at all: you cannot schedule someone who is on leave, so the scheduler must read **attendance** data live.
>
> And note the objective is *minimise overtime* — the same cost lever as Unit 1's tangible benefit *"less overtime, less idle time; adjust capacity & schedules."*

### Scheduling capabilities

> [!EXAM]
> **Workforce Scheduling capabilities:**
> - **Optimized Scheduling / Shift Planning**
> - **Employee Assignment to schedule**
> - **Dynamic Rescheduling**
> - **Labor Tracking**

> [!EXAM]
> **"Labour tracking is a part of the ERP workforce scheduling module"** — a stated fill-in-the-blank in the MCQ bank.

> [!INTUITION]
> **Dynamic rescheduling** is the capability that separates a real system from a spreadsheet. The constraint list ends with *"dynamic change in load pattern"* — demand moves, people call in sick, machines break.
>
> A schedule is therefore **not a document produced once** but a plan that must be **recomputed against live constraints**. This is exactly the argument that will return in **Production Planning**, where MRP's stated limitation is that it *"cannot replan fast enough."*

---

**Next:** what the captured time turns into — **compensation, benefits & payroll**.
