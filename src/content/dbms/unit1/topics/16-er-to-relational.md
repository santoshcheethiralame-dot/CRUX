---
subject: dbms
unit: 1
order: 16
slug: er-to-relational
title: Reducing E-R Diagrams to a Relational Schema
summary: The rules for mapping an ER design to relations — strong and weak entities, composite/derived/multivalued attributes, and 1:1/1:N/M:N/n-ary relationships.
minutes: 13
tags: [er-to-relational, mapping, foreign-key, junction-table, schema]
---

# Reducing E-R Diagrams to a Relational Schema

Both the E-R model and the relational model are abstract logical representations, so an E-R design maps cleanly to relations. **Each entity set and each relationship set → a relation schema** of the same name.

## The mapping rules

> [!NOTE]
> | ER construct | Mapping rule |
> |---|---|
> | **Strong entity** (simple attrs) | A relation with the same attributes; the entity's PK becomes the relation's PK. *e.g. `student(ID, name, tot_cred)`* |
> | **Weak entity** A (owner B) | Relation with A's attributes **∪** B's PK; PK = `{B's PK} ∪ {A's discriminator}`. *e.g. `section(course_id, sec_id, semester, year, …)`* |
> | **Composite attribute** | Create a column for each **leaf** sub-attribute (flatten); the composite itself isn't stored |
> | **Derived attribute** | **Not stored** (computed on demand) |
> | **Multivalued attribute** | A **separate relation** holding the attribute **+** the entity's PK; PK = both together. *e.g. `instructor_phone(ID, phone)`* |
> | **1:1 relationship** | Add one side's PK as a **foreign key** in the other (or merge the two relations) |
> | **1:N relationship** | Put the **"one" side's PK** as a **foreign key** in the **"many" side's** relation |
> | **M:N relationship** | Create a **new (junction) relation** with both entities' PKs (a composite PK) + any descriptive attributes |
> | **n-ary relationship** | A new relation with the PKs of **all** participating entities + descriptive attributes |

## The two golden rules

> [!EXAM]
> The two rules that dominate exam questions:
> - **1:N → foreign key on the *many* side** (no new table needed).
> - **M:N → a brand-new *junction* table** holding both PKs (a composite primary key) plus relationship attributes.

> [!INTUITION]
> Why does a **multivalued attribute** always become its **own table**? Because a relation can't hold a *set* in a single cell — that would violate **First Normal Form (1NF)**. So "instructor has many phones" becomes `instructor_phone(ID, phone)` with one row per phone.

## Worked example — university database

```text
Strong entities → student(ID, name, tot_cred), instructor(ID, name, salary),
                  course(course_id, title, credits), department(dept_name, building, budget)
Weak entity     → section(course_id, sec_id, semester, year, building, room_no)   -- PK = course_id+sec_id+semester+year
M:N relationship→ advisor(s_ID, i_ID)            -- a junction table
1:N relationship→ instructor gets dept_name as a FK (the "one" department side)
Multivalued     → instructor_phone(ID, phone)    -- its own table
```

## M:N mapping — step by step

Take an **Instructor** ⟷ **Student** `advisor` relationship (M:N), where the relationship itself carries an attribute `Date_of_assignment`.

> [!DERIVE]
> **Why two tables aren't enough:** put `Student_ID` in `Instructor` and an instructor could advise only **one** student; put `Instructor_ID` in `Student` and a student could have only **one** advisor. Neither captures M:N — you need a third **bridge** table.
>
> **The three rules:**
> 1. **Create a new relation** `Advisor` to represent the relationship `advisor`.
> 2. **Take both entities' PKs as foreign keys** in it — `Instructor_ID` (→ `Instructor.ID`) and `Student_ID` (→ `Student.ID`) — and their **combination is the composite primary key** of `Advisor`. (A given instructor–student pair links at most once.)
> 3. **Move the relationship's own attributes** into the new table — `Date_of_assignment` describes the *pairing*, not either entity, so it becomes a column of `Advisor`.

```sql
CREATE TABLE Advisor (
    Instructor_ID      INT,
    Student_ID         INT,
    Date_of_assignment DATE,                       -- relationship attribute
    PRIMARY KEY (Instructor_ID, Student_ID),        -- composite PK
    FOREIGN KEY (Instructor_ID) REFERENCES Instructor(ID),
    FOREIGN KEY (Student_ID)    REFERENCES Student(ID)
);
```

> [!TRAP]
> A common mistake: trying to store an M:N relationship with a foreign key on one side. It **can't work** — each side relates to *many* of the other, so neither can hold a single FK. M:N **always** needs a separate junction relation (e.g. `takes(student_id, course_id, grade)`).

---

**Next:** the procedural query language — **relational algebra: unary operators**.
