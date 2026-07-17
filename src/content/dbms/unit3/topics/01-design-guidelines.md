---
subject: dbms
unit: 3
order: 1
slug: design-guidelines
title: Informal Design Guidelines for Schemas
summary: The four informal measures of a good relation schema — clear semantics, no redundancy/update anomalies, few NULLs, and no spurious tuples — with the EMP_PROJ/EMP_DEPT anomaly examples.
minutes: 12
tags: [design, anomalies, redundancy, spurious-tuples, normalization]
---

# Informal Design Guidelines for Schemas

**Relational database design** is the grouping of attributes into "good" relation schemas. Before the formal theory (functional dependencies, normal forms), there are four **informal quality measures**.

## Two design methodologies

- **Bottom-up (design by synthesis)** — start from individual attribute relationships and build up. Impractical: you'd have to collect binary relationships among *all* attribute pairs.
- **Top-down (design by analysis)** — start from natural groupings (an invoice, a form, a report), then analyse and **decompose**. This is the approach functional-dependency theory supports.

## The four informal measures of quality

1. Make the **semantics** of attributes clear.
2. **Reduce redundant information** in tuples.
3. **Reduce NULL values** in tuples.
4. **Disallow spurious tuples**.

### Guideline 1 — Clear semantics
Each tuple should represent **one entity or relationship instance**. Don't mix attributes of different entities (EMPLOYEE, DEPARTMENT, PROJECT) in one relation; refer to other entities only through **foreign keys**; keep entity and relationship attributes apart.

### Guideline 2 — Redundancy & update anomalies
Storing redundant data (e.g. the natural join of base relations) wastes space and causes three **update anomalies**:

| Anomaly | On `EMP_PROJ(Ssn, Pnumber, Ename, Pname, Plocation)` |
|---|---|
| **Insertion** | Can't add a project until an employee is assigned to it (PK parts can't be NULL); can't add an employee with no project. |
| **Deletion** | Deleting the last employee on a project **loses the project's data** too. |
| **Modification** | Renaming project P1 forces updating **all** (e.g. 100) of its rows — miss one → inconsistency. |

> [!EXAM]
> **Guideline 2:** design schemas with **no insertion, deletion, or modification anomalies**. If they're unavoidable (e.g. for a denormalized view), document them and handle them with triggers/procedures. The three anomalies are the headline motivation for **normalization**.

### Guideline 3 — Minimize NULLs
Design so tuples have **few NULLs**. An attribute that is NULL for most rows belongs in a **separate relation** with the key.

> [!INTUITION]
> If only 15% of employees have an individual office, don't put `Office_number` in EMPLOYEE (85% NULL). Instead create `EMP_OFFICES(Essn, Office_number)` holding only the employees who have one. NULLs waste space and complicate aggregates and joins (3-valued logic).

### Guideline 4 — Avoid spurious tuples
A bad decomposition can produce **spurious (wrong) tuples** when the pieces are joined back.

> [!TRAP]
> Design relations so they're joined on **(primary key, foreign key)** pairs. Joining on **non-key** matching attributes (e.g. a shared `Plocation` that isn't a key) generates spurious tuples. The **lossless (non-additive) join** property guarantees a join produces no spurious tuples — covered in detail in the decomposition topic.

> [!NOTE]
> **Lossless intuition:** split a table, then join it back. Recover *exactly* the original → **lossless (good)**. Get **extra wrong rows** → **lossy / spurious (bad)**. The guarantee holds only when the shared join column is a **key** of at least one piece.

---

**Next:** the formal tool behind all of this — **functional dependencies**.
