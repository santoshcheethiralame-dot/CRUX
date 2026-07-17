---
subject: dbms
unit: 3
order: 14
slug: query-processing
title: Query Processing
summary: The query-processing pipeline (scan → parse → validate → optimize → execute), translating SQL to relational algebra, semi/anti-joins, and the SELECT and JOIN algorithms.
minutes: 13
tags: [query-processing, query-tree, semi-join, join-algorithms, select-algorithms]
---

# Query Processing

**Query processing** translates a high-level query into low-level operations, optimizes them, and executes them.

## The pipeline

```text
SQL query → Scanner → Parser → Validation → Query tree → Optimizer → Code gen → Execute → Result
```

1. **Scanner** — identifies tokens (keywords, attribute & relation names).
2. **Parser** — checks the syntax against the language's grammar.
3. **Validation** — checks that all names exist and are semantically valid in the schema.
4. An internal **query tree** (or query graph / DAG) is built.
5. The **optimizer** picks a good **execution plan** (a query has many possible strategies — choosing one = **query optimization**).
6. **Code generator** + **runtime processor** execute it.

## Translating SQL → relational algebra
SQL is broken into **query blocks** (each a single SELECT-FROM-WHERE, optionally with GROUP BY/HAVING). Each block is translated into extended relational algebra and optimized independently.

## Semi-join & anti-join
Modern engines unnest subqueries into these operators for performance:

> [!NOTE]
> - **Semi-join `T1 ⋉ T2`** — used for `EXISTS / IN / ANY`. A T1 row is returned **as soon as it finds one match** in T2 (it doesn't find *all* matches like an inner join would, and doesn't duplicate the T1 row).
> - **Anti-join `T1 ▷ T2`** — used for `NOT EXISTS / NOT IN / ALL`. A T1 row is returned **only if it has no match** in T2.

> [!INTUITION]
> An inner join that's only used to *test existence* wastes work finding every match and can create duplicates. A **semi-join** stops at the first match — exactly the semantics of `EXISTS`. This is why `EXISTS` is often as fast as (or faster than) a join.

## Algorithms for SELECT

| Method | When it applies |
|---|---|
| **S1 Linear (brute force)** | scan every record — always works, no access path needed |
| **S2 Binary search** | equality on a key the file is physically **ordered** by |
| **S3a Primary index** | equality on a key with a primary index — at most **1** record |
| **S3b Hash key** | equality on a hash key — at most **1** record |
| **S4 Primary index + range** | `>, ≥, <, ≤` on an ordered key — find the boundary, then scan |

## Algorithms for JOIN (the costliest operation)

| Method | Idea | Cost |
|---|---|---|
| **J1 Nested-loop** | for each R row, scan all of S; brute force, no index | O(m·n) |
| **J2 Index nested-loop** | use an **index** on the inner relation's join attribute | much faster |
| **J3 Sort-merge** | sort both on the join attribute, merge in one pass (two pointers) | O(m+n) after sort |
| **J4 Partition-hash** | **partition** both with the same hash `h(join attr)` into buckets, then **probe** matching buckets only | near-linear |

> [!EXAM]
> **Sort-merge join** scans both sorted inputs once with two pointers — **O(m+n)** after sorting, no nested loops. **Partition-hash join** has a *partitioning* phase (hash both into buckets) and a *probing* phase (join bucket-pairs in memory) — so only same-bucket rows are ever compared.

---

**Next:** making queries fast — **query optimization & indexing**.
