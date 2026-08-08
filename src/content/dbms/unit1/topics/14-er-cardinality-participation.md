---
subject: dbms
unit: 1
order: 14
slug: er-cardinality-participation
title: Cardinality & Participation
summary: The four mapping cardinalities and how each reduces to tables, total versus partial participation, why the two constraints are independent, and (min,max) notation which expresses both at once.
minutes: 9
tags: [cardinality, mapping-cardinality, one-to-many, many-to-many, participation, total, partial, min-max, chen]
---

# Cardinality & Participation

## Mapping cardinalities

> [!NOTE]
> The **mapping cardinality** (or **cardinality ratio**) expresses **the number of entities to which another entity can be associated** via a relationship set. For a binary relationship between entity sets $A$ and $B$:

| Ratio | Meaning | Example |
|---|---|---|
| **One-to-one (1:1)** | Each $A$ relates to **at most one** $B$, and each $B$ to at most one $A$ | `manages` — a department has one manager, an employee manages at most one department |
| **One-to-many (1:N)** | One $A$ relates to **many** $B$; each $B$ relates to at most one $A$ | `works_for` — a department has many employees; each employee works for one department |
| **Many-to-one (N:1)** | The converse of 1:N — just 1:N read from the other side | employee → department |
| **Many-to-many (M:N)** | Each $A$ relates to many $B$ **and** each $B$ to many $A$ | `advisor`; `works_on` — employees on projects |

> [!TRAP]
> **1:N and N:1 are the same constraint viewed from opposite ends.** Which label you write depends on **which entity set you name first**, so always state the direction: *"one department to many employees"* is unambiguous; *"1:N"* on its own is not. Marks are lost by writing the ratio backwards, not by misunderstanding it.

> [!INTUITION]
> Cardinality is what decides how the relationship is **reduced to tables**, so it is worth pre-loading the consequence:
>
> | Ratio | How it becomes relational |
> |---|---|
> | **M:N** | **must** become its own table, holding both keys |
> | **1:N** | the key of the "one" side becomes a **foreign key** on the "many" side — no new table needed |
> | **1:1** | a foreign key on **either** side (prefer the side with **total participation**) |
>
> That mapping is why cardinality is worth getting right at diagram time: it is the difference between a schema with three tables and one with four.

> [!EXAM]
> Identify the ratio from a sentence. The reliable method is to **ask the question twice, once from each side**:
>
> *"Can one department have many employees?"* → yes. *"Can one employee belong to many departments?"* → no. ⇒ **1:N** (department to employee).
>
> *"Can one student enrol in many courses?"* → yes. *"Can one course have many students?"* → yes. ⇒ **M:N**.
>
> Two yeses ⇒ M:N. One yes ⇒ 1:N in the direction of the yes. Two nos ⇒ 1:1.

---

## Participation constraints

> [!NOTE]
> - **Total participation** — **every** entity in the entity set **must** participate in **at least one** relationship in the relationship set. Drawn as a **double line**.
> - **Partial participation** — some entities **may not** participate. Drawn as a **single line**.

Example: **every student must have an advisor** (total for `Student`), but **an instructor need not advise anyone** (partial for `Instructor`).

```
   ┌────────────┐      ◇◇◇◇◇◇◇      ╔══════════════╗
   │ Instructor │─────◇ advisor ◇════║   Student    ║
   └────────────┘      ◇◇◇◇◇◇◇      ╚══════════════╝
        partial                          total
     (single line)                   (double line)
```

> [!TRAP]
> **Cardinality and participation are different constraints and are examined together precisely because they are confused.**
>
> | | Question it answers | Values |
> |---|---|---|
> | **Cardinality** | *How many* can an entity relate to? | 1:1, 1:N, N:1, M:N |
> | **Participation** | *Must every* entity relate at all? | total / partial |
>
> "Total for `Student`, partial for `Instructor`" means **every student must have an advisor, but an instructor need not advise anyone**. The two constraints are **independent** — you must state **both** to specify a relationship fully.

> [!INTUITION]
> Think of them as answering *how many* and *how few*. Cardinality caps the **maximum**; participation sets the **minimum** to either zero (partial) or one (total). Seen that way it is obvious they are independent — and obvious why the $(min, max)$ notation below can replace both.

---

## (Min, Max) — Chen notation

A line may carry a pair $(l,\,h)$, where $l$ is the **minimum** and $h$ is the **maximum** cardinality — the number of relationship instances that entity may participate in.

| Value | Means |
|---|---|
| $l = 1$ | **Total** participation |
| $l = 0$ | **Partial** participation |
| $h = 1$ | Participates in **at most one** relationship |
| $h = N$ | **No upper limit** |

> [!EXAM]
> **Student — Enrolls (2, 5)** means each student enrols in a **minimum of 2 and a maximum of 5** courses. Read $(l, h)$ as *"between $l$ and $h$ relationships"*.
>
> The strength of $(min, max)$ is that it expresses **cardinality and participation in a single pair** — $l$ carries the participation constraint, $h$ carries the cardinality. That is why it is preferred when the constraints are more precise than *"one"* or *"many"*, e.g. *"a team has between 5 and 11 players"*, which no ratio notation can state.

> [!TRAP]
> A common slip is reading $(l, h)$ as though it labelled the **other** side of the relationship. It does not — the pair on a line constrains **the entity set that line is attached to**, counting how many relationship instances **each entity of that set** participates in. `Student—(2,5)—Enrolls` constrains **students**, not courses.

---

## Putting the constraints together

> [!EXAM]
> A full specification of a binary relationship states **three** things. For *"every student must have exactly one advisor; an instructor may advise any number of students, including none"*:
>
> | Aspect | Answer |
> |---|---|
> | **Cardinality** | **1:N** — one instructor to many students |
> | **Participation of `Student`** | **Total** — every student must have an advisor (double line) |
> | **Participation of `Instructor`** | **Partial** — an instructor need not advise (single line) |
>
> In $(min, max)$ form: `Student (1,1)` and `Instructor (0,N)`.
>
> Reducing it: because it is **1:N**, the key of the *one* side (`instructor.ID`) becomes a **foreign key** on the *many* side (`student`), and because `Student`'s participation is **total**, that foreign key is declared **NOT NULL**.

> [!INTUITION]
> That last line is the payoff for the whole topic. **Participation constraints are what become `NOT NULL`, and cardinality is what decides where the foreign key goes or whether a new table is needed.** Everything you draw here has a direct, mechanical consequence in the SQL you write later — which is why the diagram is worth getting exactly right.

---

**Next:** uniquely identifying entities and relationships — **keys & weak entity sets**.
