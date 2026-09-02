---
subject: dbms
unit: 1
order: 13
slug: er-degree-ternary
title: Degree, Ternary Relationships & Descriptive Attributes
summary: The degree of a relationship set, two worked ternary examples and the precise reason a ternary relationship cannot be decomposed into binary ones, and descriptive attributes on relationships with the test for spotting them.
minutes: 9
tags: [degree, binary, ternary, n-ary, proj-guide, supply, descriptive-attribute, redundant-attribute]
---

# Degree, Ternary Relationships & Descriptive Attributes

## Degree of a relationship set

> [!NOTE]
> The **degree** of a relationship set is the **number of entity sets that participate** in it.
>
> - **Binary** — degree **2**. `advisor` is binary. **Most relationship sets in a database system are binary.**
> - **Ternary** — degree **3**.
> - Occasionally relationship sets involve more than two entity sets — **n-ary** in general.

> [!EXAM]
> Two MCQs test this directly: *"What does a binary relationship set involve?"* → **two entity sets**. *"What does a ternary relationship set involve?"* → **three entity sets**. Degree counts **entity sets**, not entities and not attributes.

> [!TRAP]
> Degree is **not** the same as cardinality, and the two are easy to confuse because both produce numbers. **Degree counts how many entity sets take part** (2, 3, n). **Cardinality counts how many entities each one may relate to** (1:1, 1:N, M:N). A relationship can be *binary and M:N*, or *ternary and 1:N* — the two properties are entirely independent.

---

## Ternary example 1 — `proj_guide`

*Suppose we have an entity set `project` representing all research projects in the university. Each project can have multiple associated students and multiple associated instructors. Furthermore, **each student working on a project must have an associated instructor who guides the student on that project**. How do we represent which instructor guides which student for which project?*

We relate the three entity sets through a **ternary relationship set `proj_guide`**:

```
   __ID__  name  Salary                     __ID__  name  tot_credits
        │    │      │                            │     │       │
        └────┼──────┘                            └─────┼───────┘
             │                                         │
      ┌──────┴───────┐                         ┌───────┴──────┐
      │  INSTRUCTOR  │────<  Proj_Guide  >─────│   STUDENT    │
      └──────────────┘           │             └──────────────┘
                                 │
                        ┌────────┴────────┐
                        │     PROJECT     │
                        └────────┬────────┘
                                 │
                    ┌────────────┼────────────┐
                    │            │            │
             __Project_ID__     name      Department
```

An instance of `proj_guide` indicates that **a particular student is guided by a particular instructor on a particular project**.

> [!EXAM]
> The justifying sentence — and the reason ternary relationships exist at all:
>
> **"A student could have different instructors as guides for different projects, which cannot be captured by a binary relationship between students and instructors."**
>
> That is the standard answer to *"why can a ternary relationship not always be replaced by binary ones?"*

> [!INTUITION]
> Try to decompose `proj_guide` into three binary relationships — *student–project*, *instructor–project*, *student–instructor* — and watch the information leak away.
>
> Suppose Asha works on P1 and P2, Dr Rao guides P1, Dr Iyer guides P2. The three binary relationships record all of that faithfully, yet they **cannot say which instructor guides Asha on which project**: from the pairs alone, *(Asha, Rao)* and *(Asha, Iyer)* are both derivable and both look equally applicable to both projects.
>
> **The three-way fact is not the sum of its two-way projections.**

## Ternary example 2 — `SUPPLY`

```
    Sname                Quantity            Proj_name
      │                     │                    │
  ┌──────────┐        ◇◇◇◇◇◇◇◇◇◇          ┌──────────┐
  │ SUPPLIER │───────◇  SUPPLY  ◇─────────│ PROJECT  │
  └──────────┘        ◇◇◇◇◇◇◇◇◇◇          └──────────┘
                           │
                      ┌─────────┐
                      │  PART   │── Part_no
                      └─────────┘
```

A `SUPPLY` instance records that a **supplier** supplied a particular **part** to a particular **project**, in a given **quantity**.

> [!NOTE]
> Notice both worked examples have the **same shape**: three entity sets, and a fact that only makes sense when **all three are named together**. *"Rao guides Asha on P1"* and *"Acme supplied 500 bolts to the Metro project"* both collapse into nonsense if you drop any one participant. **That collapse test is how you decide a relationship must be ternary** rather than a pair of binaries.

---

## Descriptive (relationship) attributes

**The motivating question.** Every student enrols for certain courses. Along with *who enrolled in what*, the university must track the **grade** the student scores in that course. **Where does `grade` go — in `Student` or in `Course`?**

Neither. A grade exists **only if the student enrolled** in that course, so it is associated with the `enrolls` **relationship**.

> [!NOTE]
> A relationship may have attributes, called **descriptive attributes**. An attribute of a relationship set is represented in an E-R diagram by an **oval connected to the relationship's diamond**.

```
   __student_ID__  name  Major                       Grade
             │       │      │                          │   ← descriptive
             └───────┼──────┘                          │     attribute: it
                     │                                 │     belongs to the
             ┌───────┴───────┐                         │     RELATIONSHIP,
             │    STUDENT    │────<  Enrolls  >────────┘     not to either
             └───────────────┘            │                  entity
                                          │
                                 ┌────────┴────────┐
                                 │     COURSE      │
                                 └────────┬────────┘
                                          │
                        ┌─────────────────┼─────────────────┐
                        │                 │                 │
                 __course_ID__      Course_name         Department
```

`Quantity` on the `SUPPLY` diamond above is a second example.

> [!TRAP]
> **Placing a relationship attribute inside an entity is one of the most common ER design errors.** The test: ask *"does this value exist for the entity on its own, or only once the two entities are connected?"*
>
> | Value | Exists on its own? | Verdict |
> |---|---|---|
> | A student's **name** | Yes, whether or not they enrol | **entity** attribute |
> | A student's **grade** | Only in the context of a course | **relationship** attribute |
> | An employee's **hours per week** | Only in the context of a project | **relationship** attribute |
> | A manager's **start date** | Only in the context of managing | **relationship** attribute |
>
> Related error: **redundant attributes**. If `dept_name` is the primary key of `department` and there is an `inst_dept` relationship, do **not** also store `dept_name` inside `instructor` — the relationship already carries that fact.

> [!INTUITION]
> There is a satisfying reason descriptive attributes are unavoidable, and it comes straight from the COMPANY requirements: *"keep track of the number of hours per week that an employee currently works on each project."* Hours cannot live on `EMPLOYEE` (which project?) and cannot live on `PROJECT` (which employee?). The value is a function of **the pair**, so it belongs on the thing that *is* the pair — the relationship.
>
> When this reduces to a relational schema, an M:N relationship becomes its own table, and **its descriptive attributes become ordinary columns of that table**. Descriptive attributes are, in effect, the payload the join table carries.

---

**Next:** the constraints that pin relationships down — **cardinality & participation**.
