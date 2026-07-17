---
subject: dbms
unit: 4
order: 11
slug: nosql-cap
title: NoSQL Systems & the CAP Theorem
summary: The four categories of NoSQL databases, their distributed characteristics (scalability, replication, sharding, eventual consistency), and the CAP theorem with the NoSQL trade-off.
minutes: 12
tags: [nosql, cap-theorem, eventual-consistency, sharding, replication]
---

# NoSQL Systems & the CAP Theorem

**NoSQL** = "**Not Only SQL**" — non-tabular databases for huge, unstructured / semi-structured, **schema-less** data. They emphasise **scalability, availability, replication, and high performance** over immediate consistency and rich query languages. They emerged as storage got cheap and data exploded (Google **BigTable**, Amazon **DynamoDB**, Facebook **Cassandra**, **MongoDB**, **Neo4j**).

## The four categories

| Type | Data model | Examples |
|---|---|---|
| **Document** | JSON-like documents | MongoDB, CouchDB |
| **Key-value** | key → value (record/object) | **Redis**, DynamoDB |
| **Wide-column** | column families (vertical partitioning) | Cassandra, HBase |
| **Graph** | nodes + edges, traversed by paths | **Neo4j** |

```text
Document:     { "student_id": 101, "name": "Riya", "marks": {"DBMS": 90} }
Key-value:    user102 → {"name": "Amit", "age": 24}
Wide-column:  RowKey 101 | ColumnFamily personal_info: name=Riya, city=Bangalore
Graph:        (A:Person)-[:FRIENDS_WITH]->(B:Person)
```

## Distributed characteristics
- **Horizontal scalability** — add nodes **while running** (scale out, not up).
- **Availability + replication + eventual consistency** — data is replicated across nodes; if one fails, others serve it. Replication is **master-slave** (writes go to the master, propagate to slaves) or **master-master** (writes at any replica).
- **Sharding** — partition records across nodes for load balancing.
- **High-performance access** — **hashing** `h(K)` or **range partitioning** on keys.
- **Schema-less**, **less powerful query languages** (an API of operations on keys rather than SQL), optional **versioning**.

## The CAP Theorem

> [!EXAM]
> A distributed system with replication **cannot simultaneously guarantee all three** of:
> - **Consistency (C)** — all nodes see the same data at the same time,
> - **Availability (A)** — every request gets a (success/failure) response,
> - **Partition tolerance (P)** — the system keeps working despite a network partition.
>
> **You can guarantee at most two of the three.** Since network partitions are unavoidable in a distributed system, **P is essentially mandatory** — so the real choice is **C vs A**.

> [!INTUITION]
> Traditional SQL systems prize **C** (strong consistency via ACID). NoSQL systems usually choose **A + P**, accepting **eventual consistency** — replicas may briefly disagree but converge over time. For a shopping cart or social feed, a slightly stale read is fine; for a bank ledger it isn't.

> [!TRAP]
> **CAP "consistency" ≠ ACID "consistency"** (Elmasri Review 24.6). CAP-C means *all replicas agree on the current value*; ACID-C means *a transaction preserves integrity constraints*. They're different ideas that happen to share a word.

---

**Next:** the most popular key-value store — **Redis**.
