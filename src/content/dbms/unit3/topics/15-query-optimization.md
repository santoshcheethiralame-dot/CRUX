---
subject: dbms
unit: 3
order: 15
slug: query-optimization
title: Query Optimization, EXPLAIN & Indexing
summary: What makes queries slow, key optimization techniques, reading the plan with EXPLAIN, and how an index turns an O(n) scan into an O(log n) lookup.
minutes: 10
tags: [query-optimization, explain, indexing, b-tree, performance]
---

# Query Optimization, EXPLAIN & Indexing

**Query optimization** is the process of choosing an efficient execution strategy — minimising execution time and resource use. A query has many possible plans; the optimizer picks one.

## Common causes of slow queries

> [!NOTE]
> - **Missing/unused indexes** — forces a full table scan.
> - **`SELECT *`** — fetches unnecessary columns.
> - **Complex joins & nested subqueries** — many table scans, large intermediates.
> - **Functions in the WHERE clause** — `WHERE YEAR(d) = 2024` **blocks index use**, forcing a scan.
> - **Large unfiltered datasets** — processing rows you'll throw away.

## Key optimization techniques

1. **Use indexes wisely** — speed up searches and joins.
2. **Retrieve only needed columns** — avoid `SELECT *`.
3. **Optimize joins** — join only required tables, on indexed columns.
4. **Filter early with `WHERE`** — cut rows before joins/aggregation.
5. **Use `LIMIT`** for large result sets.

> [!INTUITION]
> Most of these reduce to **"touch fewer rows and columns, as early as possible."** Filtering early and indexing the filter/join columns shrinks every later step. A function wrapped around an indexed column defeats the index because the stored values no longer match what's compared.

## EXPLAIN — reading the plan

`EXPLAIN` shows **how** the engine will run a query: the table access order, which indexes are used, and estimated rows — the primary tool for spotting bottlenecks.

```sql
EXPLAIN SELECT column1, column2
FROM table_name
WHERE condition;
```

## Indexing — with vs without

An **index** (B-tree or hash) acts like sorted pointers into the table, so the engine jumps straight to matching rows instead of scanning everything.

```sql
-- Without an index: full table scan, cost grows linearly
SELECT * FROM Employee WHERE salary > 50000;      -- O(n)

-- With an index: B-tree jumps to qualifying rows
CREATE INDEX idx_salary ON Employee(salary);
EXPLAIN SELECT * FROM Employee WHERE salary > 50000;  -- O(log n)
```

> [!EXAM]
> A B-tree index turns a `WHERE`/join lookup from a **full scan O(n)** into an **index lookup O(log n)** — the single biggest lever for SELECT performance on large tables. Indexes do cost extra storage and slow down inserts/updates (the index must be maintained), so index the columns you actually **filter and join on**.

> [!NOTE]
> This closes Unit 3: from informal design intuition, through the formal machinery of FDs / closure / minimal cover, to the normal forms (1NF→BCNF→4NF/5NF) that produce redundancy-free schemas, and finally how the engine **processes and optimizes** queries over those schemas.

---

**Unit 3 complete.** Drill the high-yield skills: **attribute closure**, **finding candidate keys** (and `2^(n−x)` superkeys), **minimal cover**, and classifying a relation's **highest normal form** with the right decomposition. Review the **MCQ quizzes** (slide + textbook exercises) and **flashcards**.
