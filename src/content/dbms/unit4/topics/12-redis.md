---
subject: dbms
unit: 4
order: 12
slug: redis
title: Key-Value Stores — Redis
summary: Redis as an in-memory key-value store, its five core data structures (string, list, hash, set, sorted set), key commands and lifecycle, use cases, and limitations.
minutes: 12
tags: [redis, key-value, in-memory, sorted-set, caching]
---

# Key-Value Stores — Redis

**Redis** is an open-source, **in-memory** key-value store — a giant persisted hash map (RAM for speed, disk only for persistence). Schema-less, very fast, with **Lua scripting** and **master-slave replication/clustering**.

- Keys are **binary-safe strings**; **`:`** denotes hierarchy/namespacing (e.g. `PES:Department`, `user:101`).
- Each value is one of several **data structures**; by default a value is a string.

## The five core data structures

| Structure | Description | Use case | Key commands |
|---|---|---|---|
| **String** | binary-safe bytes (≤ 512 MB) | caching, atomic counters | `SET`, `GET`, `MSET`, `MGET`, `INCR/DECR`, `APPEND` |
| **List** | ordered linked list of strings | stacks/queues, logging | `LPUSH`, `RPUSH`, `LPOP`, `RPOP`, `LRANGE`, `LLEN`, `BLPOP` |
| **Hash** | field → value map (like a row/JSON) | structured records | `HSET`, `HGET`, `HGETALL`, `HDEL`, `HINCRBY`, `HEXISTS` |
| **Set** | unordered **unique** strings | tags, unique tracking | `SADD`, `SREM`, `SMEMBERS`, `SISMEMBER`, `SINTER`, `SUNION`, `SDIFF` |
| **Sorted Set (Zset)** | members each with a **score**, kept sorted | leaderboards, ranking | `ZADD`, `ZINCRBY`, `ZRANGE`, `ZREVRANGE`, `ZRANK`, `ZREM` |

```text
HSET user:101 name "Alice" age 30        # store a record (hash)
ZADD leaderboard 1550 "player1"          # leaderboard entry (sorted set)
ZREVRANGE leaderboard 0 9 WITHSCORES     # top-10 by score, descending
SADD article:1 "redis" "database"        # tags (set)
SINTER friends:alice friends:bob         # mutual friends (set intersection)
```

> [!EXAM]
> The **Sorted Set (Zset)** keeps members ordered by **score** (ties broken lexicographically) — the canonical structure for **leaderboards/rankings**. A **Hash** mimics a table row or JSON object. Redis is a **key-value** store (not document/column/graph).

## Key lifecycle (TTL)
```text
EXPIRE user:session:123 3600   # auto-delete after 3600s (caching/sessions)
TTL    user:session:123        # remaining time-to-live
PERSIST user:session:123       # remove the timeout (make permanent)
DEL    user:session:123        # delete now
```

## Use cases & limitations

> [!NOTE]
> **Use cases:** caching (Zomato popular restaurants), **pub/sub message broker** (Roblox notifications), real-time analytics (Xignite), **session storage** (Amazon cart), **leaderboards** (HackerRank).
> **Limitations:** RAM is **expensive** (whole DB in memory), **manual** eviction config, **data loss** risk on crash (in-memory), **not for complex joins/aggregations** (it's optimised for key lookups).

> [!INTUITION]
> Redis trades durability and query power for **raw speed**. It's the layer *in front of* your SQL database — `User → API → Redis cache → (miss) → MySQL`. A cache hit returns in microseconds; a miss falls through to the slower relational store and back-fills the cache.

---

**Next:** the graph world — **Neo4j**.
