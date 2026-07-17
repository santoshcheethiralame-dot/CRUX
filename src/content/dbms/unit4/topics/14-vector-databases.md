---
subject: dbms
unit: 4
order: 14
slug: vector-databases
title: Vector Databases & Similarity Search
summary: Vectors and embeddings, full-text vs semantic vector search, cosine/Euclidean similarity, the ANN indexes (HNSW, IVFPQ), and a PostgreSQL pgvector hands-on for semantic search.
minutes: 12
tags: [vector-database, embeddings, cosine-similarity, hnsw, pgvector, rag]
---

# Vector Databases & Similarity Search

A **vector database** stores **high-dimensional vectors** and retrieves by **similarity (semantic meaning)** rather than exact match — built for ML embeddings, recommendations, semantic/multilingual search, and **RAG** (Retrieval-Augmented Generation with LLMs).

## Vectors & embeddings
- A **vector** is an array of numbers; in ML each number is a **feature** (a flower as `(petal_length, petal_width)`; closer vectors = more similar).
- An **embedding** is a vector produced by an **embedding model** (OpenAI `text-embedding-ada-002`, Google `embedding-gecko`) that converts text/images/audio into vectors **capturing semantic meaning** — similar objects land close together (`"doctor" ≈ "physician"`, "Boats" near "Ferries").

## Full-text search vs vector search

| Full-Text Search (FTS) | Vector (Semantic) Search |
|---|---|
| matches **words / stems** (lexical) | matches **meaning** (semantic) |
| **inverted index** (word → doc IDs) | **vector index** (HNSW, IVF) by distance |
| no synonyms / context | handles synonyms & context |
| ranks by **TF-IDF / BM25** | ranks by **vector distance** |
| text only | text, images, audio — anything vectorizable |

> [!INTUITION]
> FTS finds documents containing your *words*; vector search finds documents that *mean* the same thing. Searching "Rainy days make me sad" returns "Rainy days can be gloomy" (high similarity) over "Success is rewarding" (low) — even with no shared keywords.

## Similarity metrics

> [!EXAM]
> Two standard metrics:
> - **Cosine similarity** — the cosine of the angle θ between vectors. **1** = same direction (very similar), **0** = orthogonal (unrelated), **−1** = opposite. Standard for text.
> - **Euclidean distance** — straight-line distance between the points.

| Cosine value | Meaning |
|---|---|
| 0.8 – 1.0 | highly similar |
| 0.5 – 0.8 | moderately similar |
| 0.0 – 0.5 | low similarity |

## Vector indexing (Approximate Nearest Neighbour)
Comparing a query against millions of vectors exhaustively is slow, so vector DBs use **ANN** indexes:
- **KNN** — *exact* nearest neighbours; fine for small datasets.
- **ANN** — *approximate* nearest neighbours; efficient on large, high-dimensional data.
- **HNSW** (Hierarchical Navigable Small World) — builds a hierarchical graph; fast, memory-efficient ANN.
- **IVFPQ** — inverted file + product quantization; high-accuracy on massive datasets.

## pgvector hands-on (PostgreSQL)
```sql
CREATE EXTENSION vector;                       -- add VECTOR data type
CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title TEXT, synopsis TEXT,
    embedding VECTOR(8)                          -- the embedding column
);
CREATE INDEX ON movies USING hnsw (embedding vector_cosine_ops);  -- ANN index
-- Semantic "find similar movies":
-- SELECT title FROM movies ORDER BY embedding <=> :query_vector LIMIT 5;
```

> [!NOTE]
> A traditional RDBMS can become a vector store via an **extension** (`pgvector` for PostgreSQL, vector types in SQL Server, `FT.CREATE … VECTOR` in Redis) — you don't always need a dedicated vector DB. The primary advantage over a relational DB is **similarity search on semantic meaning**, not exact-match or aggregation.

> [!NOTE]
> This closes Unit 4 — from the single-machine guarantees of **transactions and serializability** to **distributed NoSQL** (key-value, graph, vector) and the trade-offs (**CAP**, eventual consistency) that modern data management lives by.

---

**Unit 4 complete.** Drill the high-yield skills: **ACID**, the **4 concurrency problems**, the **isolation-level/anomaly table**, **conflict serializability via the precedence graph**, **2PL & its variants**, the **CAP theorem**, and the NoSQL families (**Redis / Neo4j / vector DBs**). Review the **MCQ quizzes** (slide + textbook exercises) and **flashcards**.
