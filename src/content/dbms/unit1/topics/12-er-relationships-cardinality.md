---
subject: dbms
unit: 1
order: 12
slug: er-relationships-cardinality
title: Relationships, Roles & Recursive Relationships
summary: Relationship sets versus instances, the diamond notation and the relationship-set extension, roles, and recursive relationships with the two worked examples that make role names mandatory.
minutes: 9
tags: [relationship, relationship-set, relationship-instance, diamond, role, recursive, prereq, supervises]
---

# Relationships, Roles & Recursive Relationships

## Relationships and relationship sets

> [!NOTE]
> - A **relationship** signifies a **connection between entities**. Example: `advisor` links instructor **Katz** to student **Shankar**.
> - A **relationship set** contains **relationships of the same type**. The `advisor` relationship set links students and their advisors.
> - A **relationship instance** in an E-R schema represents an **association between the named entities** in the real-world enterprise being modelled.

The lecture's precise illustration of an *instance*: the individual instructor entity **Katz**, who has instructor ID **45565**, and the student entity **Shankar**, who has student ID **12345**, participate in a relationship instance of `advisor`. That instance represents the fact that **Katz is advising Shankar**.

```
      instructor                              student
   ┌────────────────┐                     ┌──────────────┐
   │76766 Crick     │────────────────────▶│98988 Tanaka  │
   │45565 Katz      │────────────────────▶│12345 Shankar │   ← the named instance
   │10101 Srinivasan│────────────────────▶│00128 Zhang   │
   │98345 Kim       │────────────────────▶│76543 Brown   │
   │76543 Singh     │────────────────────▶│76653 Aoi     │
   │22222 Einstein  │────────────────────▶│23121 Chavez  │
   └────────────────┘                     │44553 Peltier │
                                          └──────────────┘
```

> [!TRAP]
> The same **schema vs state** distinction applies here as it did to entities:
>
> | Term | It is… |
> |---|---|
> | **Relationship type / set** | the **definition** — `advisor` relates `instructor` to `student` |
> | **Relationship instance** | **one specific pairing** — *Katz advises Shankar* |
>
> A question asking *"what is a relationship instance?"* wants the **specific association between named entities**, not the general definition. Note also that student `76543 Brown` and instructor `76543 Singh` share an ID number — **IDs are only unique within their own entity set**.

---

## Representation in an E-R diagram

> [!EXAM]
> **Relationships are depicted by diamonds.** Lines connect the diamond to the relevant entity sets, which are **rectangles**.
>
> ```
>       name  Salary                          ID    name
>          \   /                                \   /
>      ┌────────────┐      ◇◇◇◇◇◇◇       ┌──────────────┐
>  ID ─│ Instructor │─────◇ advisor ◇─────│   Student    │─ tot_credits
>      └────────────┘      ◇◇◇◇◇◇◇       └──────────────┘
>                        (relationship)
> ```
>
> Two of the deck's own MCQs test exactly this: *"how is a relationship between two entity sets depicted?"* → **by a diamond**; *"what does an E-R diagram's diamond represent?"* → **a relationship**.

Just as an entity set has an extension, so does a relationship set — some instances of a `WORKS_FOR` relationship between `EMPLOYEE` and `DEPARTMENT`:

```
    EMPLOYEE          WORKS_FOR          DEPARTMENT
      e1 ●──────────────■ r1 ─────────────▶● d1
      e2 ●──────────────■ r2 ─────────────▶● d1
      e3 ●──────────────■ r3 ─────────────▶● d2
      e4 ●──────────────■ r4 ─────────────▶● d1
      e5 ●──────────────■ r5 ─────────────▶● d2
      e6 ●──────────────■ r6 ─────────────▶● d3
      e7 ●──────────────■ r7 ─────────────▶● d3
```

> [!INTUITION]
> Each $r_i$ is **a pair**, $r_i = (e_i, d_j)$. That is what a relationship set *is* mathematically: **a set of tuples drawn from the participating entity sets** — a subset of $E_1 \times E_2 \times \dots \times E_n$.
>
> Everything that follows — degree, cardinality, participation — is just a **constraint on which tuples are allowed in that set**. Holding that one idea makes the rest of the ER model mechanical.

> [!EXAM]
> Read the `WORKS_FOR` figure as data, not decoration. Every $e_i$ appears **exactly once**, and $d_1$ receives three arrows — so each employee works for **one** department, while a department has **many** employees. The figure is therefore showing a **1:N relationship with total participation on the EMPLOYEE side**, and being able to read those constraints off an instance diagram is a standard exam task.

---

## Roles

> [!NOTE]
> The **function that an entity plays in a relationship** is called that entity's **role**.

Since entity sets participating in a relationship set are generally **distinct**, roles are **implicit and not usually specified**. They become useful when the meaning of a relationship needs clarification — specifically **when the entity sets of a relationship set are not distinct**, i.e. when **the same entity set participates more than once, in different roles**.

---

## Recursive relationships

> [!NOTE]
> A relationship set in which **the same entity set participates more than once in different roles** is called a **recursive relationship set**. In this type, **explicit role names are necessary** to specify how an entity participates in a relationship instance.

### Worked example 1 — course prerequisites

Consider the entity set `course`, recording all courses offered. Some courses have **prerequisite courses** that must be completed first. To depict that one course (C2) is a prerequisite for another (C1), we use a relationship set `prereq`, modelled by **ordered pairs of course entities**.

We indicate roles by **labelling the lines** that connect diamonds to rectangles:

```
                        ┌──────────────┐
                        │    COURSE    │
                        └───┬──────┬───┘
        role: course_id     │      │     role: prereq_id
                            │      │
                            │      │      the SAME entity set
              ┌─────────────┘      └─────────────┐   plays both roles
              │                                  │
              └────────<   prereq   >────────────┘
                        (relationship)

   attributes of COURSE:  __course_ID__ · Course_name · Department
```

The role indicators **`course_id`** and **`prereq_id`** distinguish the two ends.

### Worked example 2 — employee supervision

An `EMPLOYEE` entity set relates to itself through `SUPERVISES`, with roles **(AS SUPERVISOR)** on the `1` side and **(AS SUPERVISEE)** on the `N` side.

```
           ┌──────────────────────────────────┐
           │             EMPLOYEE             │
           └────┬────────────────────────┬────┘
                │                        │
        (AS SUPERVISOR)           (AS SUPERVISEE)
              1 │                        │ N
                │                        │
                └───<   SUPERVISES   >───┘

   one employee supervises N employees, and each of those has
   exactly 1 supervisor — a 1:N relationship of EMPLOYEE with itself
```

> [!EXAM]
> The deck's MCQ: *"Which of the following is an example of a recursive relationship?"* — options are course prerequisites, instructor-student, student-course enrolment, student-advisor. **Answer: course prerequisites**, because it is the only one where **both ends are the same entity set**. A companion MCQ asks what `prereq` connects: **courses to other courses**.
>
> The test is always the same: **is the entity set on both ends the same one?** Instructor–student, student–course and student–advisor all join *two different* entity sets, so none is recursive.

> [!TRAP]
> **Without role names a recursive relationship is ambiguous.** The pair `(CS201, CS101)` is meaningless until the lines are labelled — you cannot tell which course is the prerequisite. This is why role labels are *optional* in general but **mandatory** here. The same applies to the supervision example: *(Smith, Wong)* needs role names to say who supervises whom.

> [!INTUITION]
> The formal reason is that a relationship set is a set of **ordered** tuples, but a **diagram has no inherent order** — two lines leaving a diamond look alike. Role names restore the ordering that the mathematics assumes and the picture loses. When you reduce this to a relational table you will see the same problem solved the same way: the table needs **two differently-named columns** (`course_id`, `prereq_id`) drawn from the same domain.

---

**Next:** how many entity sets can join a relationship, and what hangs off the diamond — **degree, ternary relationships & descriptive attributes**.
