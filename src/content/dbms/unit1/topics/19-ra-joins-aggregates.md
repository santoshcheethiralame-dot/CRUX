---
subject: dbms
unit: 1
order: 19
slug: ra-joins-aggregates
title: Cartesian Product, Joins, Aggregates & Worked Queries
summary: The Cartesian product and natural/theta join, aggregate functions and grouping, and a set of fully worked relational-algebra queries over the Sailors-Boats-Reserves database.
minutes: 15
tags: [relational-algebra, join, cartesian-product, aggregate, grouping, sailors]
---

# Cartesian Product, Joins, Aggregates & Worked Queries

## Cartesian Product — ×

> [!NOTE]
> **R × S** combines **every** tuple of R with **every** tuple of S. Result **degree = n + m**; result **size = |R| · |S|**. Operands need **not** be union-compatible.

> [!TRAP]
> A raw Cartesian product is usually **meaningless** (it pairs unrelated rows) — it becomes useful only when **followed by a selection** that keeps matching rows: `σ_{Sailors.sid = Reserves.sid}(Sailors × Reserves)`.

## Join — ⋈

> [!NOTE]
> - **Natural join (⋈)** does a Cartesian product **internally**, then automatically keeps only rows that **match on the common-named, compatible columns** (and removes the duplicate column). `Sailors ⋈ Reserves` joins on `sid`.
> - **Theta join (⋈_θ)** joins on an explicit condition θ, e.g. `Project ⋈_{Dnum = Dnumber} Department`.

> [!INTUITION]
> A natural join is exactly **Cartesian product + select on equal keys + drop the duplicate column** — it's the everyday way to "follow a foreign key" and combine two tables without the cross-product's redundancy.

## Aggregate Functions & Grouping

> [!NOTE]
> **Aggregate functions** take a collection of values and return a single value: **SUM, AVG (average), MAX, MIN, COUNT**. Notation uses **ℱ**: `ℱ_{MAX age}(Sailors)`, `ℱ_{COUNT sid, AVG age}(Sailors)`. (COUNT counts rows incl. duplicates; AVG ignores NULLs.)

**Grouping** divides tuples into groups by a **grouping attribute** (written on the **left** of ℱ), then applies the aggregate per group:
```text
rating ℱ COUNT(sid), AVG(age) (Sailors)     -- count & average age PER rating
```
This is SQL's **GROUP BY**.

## Worked queries — Sailors–Boats–Reserves

> [!DERIVE]
> Schema: **Sailors**(sid, sname, rating, age) · **Boats**(bid, bname, color) · **Reserves**(sid, bid, day).
>
> **1. Names of sailors who reserved boat 103:**
> `∏ sname ( σ bid=103 (Reserves) ⋈ Sailors )`
>
> **2. Names of sailors who reserved a *red* boat:**
> `∏ sname ( σ color='red' (Boats) ⋈ Reserves ⋈ Sailors )`
>
> **3. Names of sailors who reserved a red *or* a green boat:**
> `∏ sname ( σ color='red' ∨ color='green' (Boats) ⋈ Reserves ⋈ Sailors )`
>
> **4. Sailors who reserved *every* boat (division):**
> `( ∏ sid, bid (Reserves) )  ÷  ( ∏ bid (Boats) )`  → then join with Sailors for names.

## Worked queries — generalized projection & joins

> [!DERIVE]
> **EMPLOYEE(Emp-ID, Salary, Deduction, Years-of-Service)** — compute a report:
> `Report(Emp-ID, Net_Salary, Bonus, Tax) ← ∏ Emp-ID, (Salary − Deduction), (2000 × Years-of-Service), (Salary × 0.25) (EMPLOYEE)`
> *(Generalized projection allows arithmetic expressions in the project list.)*
>
> **SALESPERSON(SalesPersonID, Name)** · **TRIP(SalesPersonID, From, To, TripID)** · **EXPENSE(TripID, Amount)** — total expenses of salesperson 504:
> ```text
> t1 ← σ SalesPersonID=504 (TRIP)
> t2 ← ∏ TripID (t1)
> t3 ← EXPENSE ⋈ t2
> Result ← ℱ SUM(Amount) (t3)
> ```

> [!EXAM]
> Strategy for RA queries: **(1)** select the rows you want with σ, **(2)** join the tables you need with ⋈, **(3)** project the columns asked for with ∏, **(4)** use **division for "every/all"**, **set difference for "not/without"**, and **ℱ with grouping for "total/average per …"**.

---

**Next:** the practical query language — **SQL overview & data types**.
