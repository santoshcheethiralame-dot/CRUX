---
subject: dbms
unit: 4
order: 13
slug: neo4j
title: Graph Databases — Neo4j
summary: The Neo4j graph data model (nodes, directed relationships, properties, labels, paths), how it compares to the ER model, optional schema, and the Cypher query language.
minutes: 11
tags: [neo4j, graph-database, cypher, nodes, relationships]
---

# Graph Databases — Neo4j

**Neo4j** is an open-source **graph database** (written in Java). Data is a **graph** of **nodes** (entities) and **directed relationships** (edges). It excels at **highly connected, relationship-heavy** data where relational JOINs would be expensive.

> [!INTUITION]
> "Friends of friends who like X" is a nightmare of self-JOINs in SQL but a one-line traversal in a graph DB. Neo4j stores relationships as **first-class, direct pointers**, so following them is fast (no join rebuild) — ideal for social networks, recommendations, fraud detection, and knowledge graphs.

## The data model

| Element | Description |
|---|---|
| **Node** | an entity (Person, Product); can have **≥ 0 labels** |
| **Label** | groups nodes by type, e.g. `EMPLOYEE` (a node may have several: `PERSON:EMPLOYEE:MANAGER`) |
| **Relationship** | a **directed** edge (start node → end node) with a **relationship type** (e.g. `WORKS_FOR`); traversable either way |
| **Property** | a key-value pair on a **node *or* relationship**, e.g. `{Fname:'John', Lname:'Smith'}` |
| **Path** | a sequence of nodes connected by relationships; used to specify query **patterns** |

## Neo4j vs the ER model

| Neo4j | ER model |
|---|---|
| node ↔ entity, label ↔ entity type, relationship ↔ relationship instance, property ↔ attribute | the same concepts, but **design-only** |
| relationships are **directed**; a node may have **no label** | relationships undirected; **every** entity has a type |
| an actual high-performance DBMS | a database **design tool** |

- **Optional schema** — graphs work without a schema; you *may* add indexes and constraints (e.g. a uniqueness constraint on a label's property) and **indexes** on properties for fast lookup. Neo4j assigns each node an internal unique identifier.

## Cypher (the query language, CQL)

```cypher
-- Create nodes and a relationship
CREATE (e:EMPLOYEE {empId:1, name:'John'})
CREATE (e)-[:WORKS_FOR {since:2020}]->(d:DEPARTMENT {name:'Research'})

-- Pattern match: who works for Research?
MATCH (e:EMPLOYEE)-[:WORKS_FOR]->(d:DEPARTMENT {name:'Research'})
RETURN e.name
```

> [!EXAM]
> In Neo4j, **nodes** represent **entities** (people, places, things) and **relationships** the connections; the storage model is **nodes + relationships** (not tables/documents/key-value pairs). Its key advantage over an RDBMS is **efficient handling of highly connected data**. The query language is **Cypher** (`CREATE`, `MATCH`, `WHERE`, `RETURN`); the `→` shows relationship direction.

---

**Next:** searching by meaning — **vector databases**.
