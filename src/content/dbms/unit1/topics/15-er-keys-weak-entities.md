---
subject: dbms
unit: 1
order: 15
slug: er-keys-weak-entities
title: Weak Entities & the ER Notation Summary
summary: What makes an entity weak, the identifying entity and identifying relationship, the discriminator, the three symbols that mark a weak entity, why total participation is forced, and the complete table of ER notation.
minutes: 11
tags: [weak-entity, strong-entity, identifying-relationship, discriminator, partial-key, total-participation, er-notation]
---

# Weak Entities & the ER Notation Summary

## What makes an entity weak

> [!NOTE]
> - A **weak entity is one whose existence is dependent on another entity**, called its **identifying entity**.
> - An entity that is **not** a weak entity set is termed a **strong entity**.
> - **Every weak entity must be associated with an identifying entity (strong entity)** — that is, the weak entity set is said to be **existence dependent** on the identifying entity.
> - The relationship associating the weak entity with the identifying entity is called the **identifying relationship**.

> [!INTUITION]
> Put plainly: **a weak entity cannot stand on its own.** Delete the thing it depends on and it stops making sense.
>
> A `Section` of a course is the standard example. "Section 2" means nothing by itself — section 2 *of what*? It only has meaning attached to a particular `Course`. Delete the course and its sections have nothing left to be sections of.
>
> Compare `Employee`, which is strong: an employee exists whether or not their department does.

---

## The discriminator (partial key)

A weak entity has **no key of its own**. What it has instead is a **discriminator** — sometimes called the **partial key** — which is unique **only among the weak entities belonging to one owner**.

> [!EXAM]
> **Primary key of a weak entity = primary key of the owner + the discriminator.**
>
> In the `Course` / `Section` example the discriminator is `Sec_ID`, so the full key is **{course_ID, Sec_ID}**. Section 2 of CS101 and section 2 of CS102 are different sections, and only the *pair* tells them apart.

> [!TRAP]
> The discriminator alone is **not** a key, and the owner's key alone is **not** a key either. Students lose marks by answering with just one of them. It is always the **combination**.

---

## How it is drawn

> [!EXAM]
> Three symbols, all doubled — that is the pattern worth remembering:
>
> | Construct | Symbol |
> |---|---|
> | **Weak entity** | **double rectangle** |
> | **Identifying relationship** | **double diamond** |
> | **Discriminator** | underlined with a **dashed line** |
> | (and) participation of the weak entity | **double line** — total |

```
   ┌──────────────────┐                            ╔══════════════════╗
   │   IDENTIFYING    │                            ║   WEAK ENTITY    ║
   │      ENTITY      │══<< identifying rel'ship >>║                  ║
   │     (strong)     │                            ║                  ║
   └──────────────────┘                            ╚══════════════════╝
      single rectangle         double diamond          double rectangle
              1                                                N

   the double line ══ on the weak side = TOTAL participation
   (a weak entity cannot exist without its owner)
```

The slides note the cardinality is **one-to-many / many-to-one**, where **many = the weak entity** and **one = the identifying entity** — one course has many sections, each section belongs to one course.

### The worked example

```
   ┌──────────────────┐                        ╔══════════════════╗
   │      COURSE      │══<< sec_course >>══════║     SECTION      ║
   │    (strong)      │                        ║      (weak)      ║
   └────────┬─────────┘         1        N     ╚═════════┬════════╝
            │                                            │
   ┌────────┼────────┬───────────┐        ┌────────┬─────┼──────┬──────────┐
   │        │        │           │        │        │     │      │          │
__course_ID__  Title  Credits  Dept_name  ¦Sec_ID¦ Semester Year Building room_no

   ¦Sec_ID¦  = the DISCRIMINATOR (partial key), drawn with a DASHED underline

   full key of SECTION  =  course_ID  +  Sec_ID  +  Semester  +  Year
                           ╰owner's key╯   ╰────── discriminator ──────╯
```

> [!NOTE]
> **In general, a weak entity set must have total participation in its identifying relationship set.**

> [!INTUITION]
> Total participation is **forced, not chosen**. A weak entity is *defined* as one that cannot exist without its owner — so there can never be a weak entity sitting outside the identifying relationship. The double line is not an extra design decision; it follows automatically from the entity being weak.
>
> This is why the three doubled symbols always travel together.

The slides add one more point: **a weak entity can participate in relationships other than the identifying relationship.** Being weak restricts how it is *identified*, not what else it may be connected to.

---

## Strong vs weak — the comparison

> [!EXAM]
> | | **Strong entity** | **Weak entity** |
> |---|---|---|
> | Key | Has its **own** primary key | Has only a **discriminator / partial key** |
> | Existence | **Independent** | **Existence dependent** on the owner |
> | Drawn as | Single rectangle | **Double rectangle** |
> | Its identifying relationship | — | **Double diamond** |
> | Participation | May be partial or total | **Always total** in the identifying relationship |
> | Full primary key | Its own key | **Owner's key + discriminator** |

---

## Worked question — the BANK database

*Each bank can have multiple branches, and each branch can have multiple accounts and loans.*

> [!EXAM]
> **List the strong entity types.**
> **LOAN, BANK, ACCOUNT and CUSTOMER.**
>
> **Is there a weak entity type? Give its name, partial key and identifying relationship.**
> Yes — **BANK_BRANCH**. Its **identifying relationship is BRANCHES** and its **partial key is Branch_no**.
>
> **What constraints do the partial key and the identifying relationship specify?**
> 1. **No two branches of the same bank have the same number.**
> 2. **A bank can have any number of branches, but a branch belongs to only one bank.**

> [!INTUITION]
> Notice how the two constraints map onto the two halves of the definition. The **partial key** gives you *"unique within one bank"* — branch 5 of HDFC and branch 5 of SBI can coexist. The **identifying relationship** gives you *"belongs to exactly one bank"*, which is the existence dependency.
>
> Together they say: **branch numbers only make sense inside a bank.** That is exactly what being weak means.

---

## The complete ER notation table

> [!EXAM]
> This summary table is worth memorising whole — questions frequently just ask *"what does this symbol mean?"*
>
> | Symbol | Meaning |
> |---|---|
> | Rectangle | **Entity** |
> | **Double** rectangle | **Weak entity** |
> | Diamond | **Relationship** |
> | **Double** diamond | **Identifying relationship** |
> | Ellipse | **Attribute** |
> | Ellipse with **underlined** name | **Key attribute** |
> | **Double** ellipse | **Multivalued attribute** |
> | Ellipse joined to sub-ellipses | **Composite attribute** |
> | **Dashed** ellipse | **Derived attribute** |
> | **Double line** $E_1 = R$ | **Total participation** of $E$ in $R$ |
> | **1** and **N** on the lines | **Cardinality ratio** 1:N |
> | **(min, max)** on a line | **Structural constraint** on participation of $E$ in $R$ |

> [!INTUITION]
> There is a pattern hiding in that table that makes it much easier to remember: **doubling a symbol always means "more than the plain version"**.
>
> - double **ellipse** → more than one *value*
> - double **rectangle** → an entity that needs more than itself to be identified
> - double **diamond** → the relationship that does that identifying
> - double **line** → participation of *every* member, not just some
>
> Meanwhile **dashing** a symbol means "not really stored" — a dashed ellipse is derived, and a dashed underline is only a partial key.

---

**Next:** turning the finished ER diagram into actual tables — **reducing ER to a relational schema**.
