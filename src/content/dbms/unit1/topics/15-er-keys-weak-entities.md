---
subject: dbms
unit: 1
order: 15
slug: er-keys-weak-entities
title: Keys & Weak Entity Sets
summary: Superkey, candidate key and primary key; choosing the primary key of a relationship set by cardinality; and weak entity sets with their identifying relationship and discriminator.
minutes: 12
tags: [superkey, candidate-key, primary-key, weak-entity, discriminator]
---

# Keys & Weak Entity Sets

## Keys for entity sets

> [!NOTE]
> | Key | Definition |
> |---|---|
> | **Superkey** | A set of attributes that **uniquely identifies** an entity (may have extra attributes) |
> | **Candidate key** | A **minimal** superkey (no attribute can be removed) |
> | **Primary key** | The **chosen** candidate key |

> [!INTUITION]
> Every candidate key is a superkey, but not vice-versa: `{ID, name}` is a superkey of `student` but **not** a candidate key, because `{ID}` alone already identifies the student. The DBA picks one candidate key as the **primary key**.

## Keys for relationship sets

The primary key of a relationship set **R** depends on whether R has descriptive attributes:
- **No attributes:** PK = **union of the participating entities' PKs**. e.g. `advisor` → `{Instructor_ID, Student_ID}`.
- **Has attributes** `{a₁…aₘ}`: the **superkey** is the union of PKs ∪ `{a₁…aₘ}`, but the descriptive attributes (e.g. `grade`) are **in the superkey, not necessarily the primary key**.
- Clashing PK names are prefixed by entity/role name; **recursive** relationships use **role names** (e.g. `{Course_ID, Prereq_ID}`).

> [!EXAM]
> **Choosing the relationship PK by cardinality:**
> - **1:1** → the PK of **either** participating entity.
> - **1:N / N:1** → the PK of the **"many" side**.
> - **M:N** → the **union** of both entities' PKs.
>
> For `enrolls(Student, Course)` with a `grade` attribute (M:N): PK = `{Student_ID, Course_ID}` — **grade is not part of the primary key**.

## Weak Entity Sets

> [!NOTE]
> A **weak entity set** is one whose **existence depends on** another entity set (the **identifying / owner** entity set). It has **no primary key of its own** — instead it uses the owner's PK **+ a discriminator (partial key)**.

Properties of a weak entity set:
- It is **existence-dependent** on (and "owned by") the identifying entity set.
- The **identifying relationship** is **many-to-one** from the weak entity to the owner, with **total participation** of the weak entity, and **no descriptive attributes**.
- **ER notation:** weak entity = **double rectangle**; identifying relationship = **double diamond**; discriminator = **dashed underline**.

> [!INTUITION]
> `section` can't exist without a `course` — it's a **weak entity** identified by `course`. Its PK = `{Course_ID (from the owner), sec_id, semester, year}` = the **owner's PK + the discriminator**. A section number "1" is meaningless without knowing *which course's* section 1 it is.

> [!EXAM]
> Weak-entity MCQ facts: it has **total participation** in the identifying relationship; it has a **discriminator** (not its own PK); drawn as a **double rectangle**; the identifying relationship is a **double diamond**; the relationship is **many-to-one** toward the owner. It **cannot exist independently** because it lacks a PK of its own.

---

**Next:** turning the diagram into tables — **reducing E-R to a relational schema**.
