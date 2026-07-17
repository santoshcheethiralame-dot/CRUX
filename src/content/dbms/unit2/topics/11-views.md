---
subject: dbms
unit: 2
order: 11
slug: views
title: Views
summary: Virtual tables defined by a stored query — creating views, querying and nesting them, the criteria for an updatable view, advantages/disadvantages, and views vs CTEs.
minutes: 12
tags: [sql, view, virtual-table, updatable-view, data-independence]
---

# Views

A **view** is a **virtual table**: it stores a *query*, not data. Its rows are computed on demand from the underlying base table(s) each time the view is used.

```sql
CREATE VIEW view_name AS <query expression>;
```

Purposes: **hide complex queries**, present a tailored table per use-case, **restrict access** (security — expose only some columns/rows), and support role assignment.

```sql
CREATE VIEW physics_fall_2017 AS
SELECT course.course_id, sec_id, building, room_number
FROM course, section
WHERE course.course_id = section.course_id
  AND course.dept_name = 'Physics'
  AND section.semester = 'Fall' AND section.year = 2017;

-- Query it exactly like a table:
SELECT course_id FROM physics_fall_2017 WHERE building = 'Watson';
```

## Views on views

A view can be defined in terms of another view:

```sql
CREATE VIEW physics_fall_2017_watson AS
SELECT course_id, room_number FROM physics_fall_2017 WHERE building = 'Watson';
```

## Updatable views

CRUD through a view propagates to the base table — **but only if the view is "simple enough"** that each view row maps unambiguously to one base row. A view is updatable only when **all** of these hold:

- built on a **single table**;
- **no** aggregate functions (`SUM`, `MAX`, `COUNT`, …);
- **no** `DISTINCT`, `GROUP BY`, `HAVING`, or `UNION`;
- **no** joins or subqueries;
- **not** recursive.

> [!EXAM]
> A **multi-table (join) view is read-only.** Insert/update/delete through a valid single-table view **also changes the base table.** Elmasri Exercise 7.9 makes this concrete: on a `DEPT_SUMMARY` view built with `GROUP BY` and aggregates, *queries* are allowed but **updates are rejected** because a summary row has no single base row to change.

## WITH CHECK OPTION

An updatable view defined with a `WHERE` filter can, by default, be used to insert/update rows that **fall outside the view's own condition** — the row goes into the base table but then vanishes from the view. **`WITH CHECK OPTION`** forbids this: any insert/update through the view must satisfy the view's `WHERE`, else it is rejected.

```sql
CREATE VIEW above80k AS
    SELECT * FROM employee WHERE salary > 80000
    WITH CASCADED CHECK OPTION;

INSERT INTO above80k VALUES (..., 87000, ...);   -- OK: 87000 > 80000
INSERT INTO above80k VALUES (..., 44000, ...);   -- ERROR 1369: CHECK OPTION failed
```

> [!TRAP]
> Without `CHECK OPTION`, an `UPDATE above80k SET salary = 47000` *succeeds* but the row **disappears from the view** (it no longer satisfies `salary > 80000`), though it still lives in the base table. `WITH CHECK OPTION` blocks exactly these "self-evicting" writes. `CASCADED` (the default) also enforces the conditions of any underlying views; `LOCAL` checks only this view's condition.

## Advantages

- **Simplicity / complexity hiding** — wrap a complex join behind one name.
- **Security** — exclude sensitive columns; grant access to the view, not the table.
- **Consistency** — a stable interface even if base tables are reorganised; can rename columns.
- **Data integrity** — DML through a view can be checked against constraints.
- **Logical data independence** — applications query the view, insulated from base-table changes.
- Tiny **storage** (only the definition is stored, not the data).

## Disadvantages

- Cannot `INSERT` if the base table has a NOT-NULL column missing from the view.
- Cannot modify columns built from **expressions** or **group functions**.
- A `READ ONLY` view blocks all DML; views can't use temp tables; can't take parameters.

## Views vs CTE

| Feature | View | CTE |
|---|---|---|
| What it is | virtual table stored in the schema | temporary result set (`WITH`) |
| Persistence | **persists** until `DROP VIEW` | exists **only for one query** |
| Reusability | reusable across many queries | single query only |
| Scope | global (per permissions) | local to the query |
| Best for | hiding complex joins for repeated use | breaking one query into readable steps; recursion |
| Updatable? | some (single-table, no aggregation) | **never** |

> [!INTUITION]
> Choose a **view** when many queries need the same derived table over time; choose a **CTE** when you just want to structure **one** complex query. A view is a permanent fixture; a CTE is scratch paper.

---

**Next:** controlling who can do what — **users, roles & privileges**.
