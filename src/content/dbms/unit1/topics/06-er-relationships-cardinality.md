---
subject: dbms
unit: 1
order: 6
slug: er-relationships-cardinality
title: Relationships, Cardinality & Participation
summary: Relationships and relationship sets, degree (binary/ternary/recursive) and roles, the four mapping cardinalities, total vs partial participation, and the (min,max) Chen notation.
minutes: 13
tags: [relationship, degree, recursive, cardinality, participation, min-max]
---

# Relationships, Cardinality & Participation

## Relationships & relationship sets

> [!NOTE]
> A **Relationship** is an association among entities (e.g. `advisor` links instructor *Katz* to student *Shankar*). A **Relationship Set** is a set of relationships of the same type. A **Relationship Instance** is one specific association. In an E-R diagram, relationships are drawn as **diamonds** connected by lines to the participating entity **rectangles**.

## Degree, recursive relationships & roles

- **Degree** = the number of entity sets participating: **binary** (2 — most common), **ternary** (3), n-ary. e.g. `proj_guide(instructor, student, project)` is ternary.
- **Recursive (self-referencing) relationship** — the **same entity set participates more than once**, e.g. `prereq` relating `course` to `course`, or an employee–supervisor relationship.
- **Role** — the function an entity plays in a relationship. **Role names** are required for recursive relationships to disambiguate (e.g. `course_id` and `prereq_id` on the two lines to `course`).

> [!INTUITION]
> A *recursive* relationship is an entity set related to **itself** — course→course (prerequisite), employee→employee (supervises). You can't tell the two ends apart without **role names** labelling the lines.

## Mapping Cardinalities (cardinality ratios)

> [!EXAM]
> For a binary relationship between entity sets A and B:
> | Ratio | Meaning | Example |
> |---|---|---|
> | **One-to-one (1:1)** | Each A relates to ≤ 1 B, and vice-versa | `manages` (department ↔ its manager) |
> | **One-to-many (1:N)** | One A relates to many B; each B to ≤ 1 A | `works_for` (department → employees) |
> | **Many-to-one (N:1)** | The converse of 1:N | |
> | **Many-to-many (M:N)** | Each A relates to many B and vice-versa | `advisor`, `works_on` (employee ↔ project) |

## Participation constraints

> [!NOTE]
> - **Total participation** — *every* entity in E **must** participate in at least one relationship in R. Shown by a **double line**. e.g. every student must have an advisor.
> - **Partial participation** — some entities **may not** participate. Shown by a single line. e.g. an instructor need not advise anyone.

> [!TRAP]
> Cardinality and participation are **different** constraints. **Cardinality** (1:1, 1:N, M:N) limits *how many* an entity relates to; **participation** (total/partial) says *whether every* entity must relate at all. "Total for Student, Partial for Instructor" means every student must have an advisor, but an instructor need not advise.

## (Min, Max) — Chen notation

A line may carry **(l, h)**: `l` = **minimum** cardinality, `h` = **maximum**.
- `l = 1` ⇒ **total** participation; `l = 0` ⇒ partial.
- `h = 1` ⇒ participates in at most one relationship; `h = N` ⇒ no limit.

> [!EXAM]
> In (min, max) notation, **Student—Enrolls (2, 5)** means each student enrolls in a **minimum of 2 and a maximum of 5** courses. Read it as "between l and h relationships."

---

**Next:** uniquely identifying entities and relationships — **keys & weak entity sets**.
