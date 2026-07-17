---
subject: dbms
unit: 1
order: 5
slug: er-entities-attributes
title: The E-R Model — Entities & Attributes
summary: The entity-relationship model and its diagrams, entities and entity sets, and the full taxonomy of attributes (simple/composite, single/multivalued, derived, complex, null) with their ER symbols.
minutes: 14
tags: [er-model, entity, attribute, multivalued, derived, composite]
---

# The E-R Model — Entities & Attributes

## The E-R model

> [!NOTE]
> The **Entity-Relationship (E-R) model** is a high-level **conceptual** data-modeling technique that captures the **logical structure** of a database. **E-R diagrams** give a graphical representation using symbols for **entities, attributes, and relationships** — simple, clear, and used to spot redundancies and issues *before* implementation.

## Entities & entity sets

- **Entity** — a distinct "thing"/object in the real world (a person, course, …), described by **attributes**. Can be **concrete** (a book) or **abstract** (a course, a reservation).
- **Entity Set** — a collection of entities of the **same type** sharing attributes (e.g. `student`, `instructor`).
- **Extension** — the actual collection of entities in an entity set at a point in time.
- Entity sets can be **non-disjoint** (overlap) — e.g. a `person` may be both an instructor and a student.

## Attributes

> [!NOTE]
> | Attribute type | Meaning | ER symbol |
> |---|---|---|
> | **Simple (atomic)** | Cannot be subdivided (ID, roll number, phone) | ellipse |
> | **Composite** | Can be split into sub-parts (address → street/city/state/pin; name → first/middle/last); may form a **hierarchy** | ellipse with sub-ellipses |
> | **Single-valued** | One value per entity (age, name) | ellipse |
> | **Multivalued** | Many values per entity (phone numbers, emails) | **double ellipse** |
> | **Stored** | Actually stored (Date_of_Birth) | ellipse |
> | **Derived** | **Computed** from others (Age from DoB) | **dashed ellipse** |
> | **Complex** | Nesting of composite + multivalued, e.g. `{PreviousDegrees(College, Year, Degree, Field)}` | — |
> | **Key attribute** | Uniquely identifies the entity | **underlined** |

> [!EXAM]
> The ER symbols are exam gold: **multivalued = double ellipse**, **derived = dashed ellipse**, **key = underlined**. A *composite* attribute is split into parts (address); a *derived* attribute (age) is **not stored** but computed from a stored one (DoB).

## Domain, Null & Descriptive attributes

- **Domain / Value Set** — the set of permitted values for an attribute (e.g. Age ∈ [16, 70]). Formally $A : E \to P(V)$ — a function from the entity set to the power set of values.
- **Null value** — used when an attribute is **not applicable**, **missing** (a value exists but is unknown), or **unknown** (we don't know if a value exists). e.g. a missing middle name → NULL.
- **Descriptive attribute** — an attribute of a **relationship**, not an entity. e.g. `grade` belongs to the `enrolls` relationship (you only get a grade *if* you enroll), so it sits on the relationship **diamond**, not on `student` or `course`.

> [!TRAP]
> **Where does `grade` go?** Not in `Student` and not in `Course` — it's a **descriptive attribute of the `enrolls` relationship**. A frequent design mistake is placing relationship attributes inside an entity. Likewise, **redundant attributes** are removed: if `dept_name` is the PK of `department` and there's an `inst_dept` relationship, don't *also* store `dept_name` in `instructor`.

---

**Next:** how entities connect — **relationships, cardinality & participation**.
