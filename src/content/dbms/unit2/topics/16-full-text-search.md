---
subject: dbms
unit: 2
order: 16
slug: full-text-search
title: Full-Text Search in MySQL
summary: Relevance-ranked text search over large columns — MATCH...AGAINST with a FULLTEXT index, the natural-language / boolean / query-expansion modes, relevance scoring, and why it beats LIKE/REGEXP.
minutes: 11
tags: [sql, full-text-search, match-against, relevance, boolean-mode]
---

# Full-Text Search in MySQL

**Full-Text Search (FTS)** enables advanced text search over large `CHAR`/`VARCHAR`/`TEXT` columns, ranking results by **relevance**. It powers search engines, blogs, e-commerce, and document systems.

## FTS vs LIKE / REGEXP

| Feature | LIKE / REGEXP | FULLTEXT |
|---|---|---|
| Index usage | poor → **slow** on large data | uses a special **full-text index** → fast |
| Relevance ranking | none (match / no-match) | **ranks** results by relevance |
| Natural language | not supported | supported |
| Word boundaries | inaccurate (`cat` matches "con**cat**enate") | accurate **word**-boundary detection |
| Boolean logic | none | AND / OR / NOT via operators |
| Phrase search | possible but imprecise | supported and accurate |

> [!INTUITION]
> `LIKE '%cat%'` is a blind substring scan — no index, no ranking, and it matches *inside* other words. FTS tokenises text into words, indexes them, and returns the **best matches first** — the difference between `grep` and a search engine.

## How it works

```sql
CREATE FULLTEXT INDEX idx_name ON table(col1, col2);          -- required first
SELECT * FROM table WHERE MATCH(col1, col2) AGAINST('word');  -- search
```

The columns inside `MATCH(...)` must match those covered by the `FULLTEXT` index.

## The three modes

**1. Natural Language Mode** (default) — returns a relevance score and **ignores stopwords** ("a", "the", …).

```sql
SELECT article_id, title FROM articles
WHERE MATCH(title, content) AGAINST('MySQL' IN NATURAL LANGUAGE MODE);
```

**2. Boolean Mode** — operators give precise control:

| Operator | Meaning |
|---|---|
| `+word` | word **must** be present |
| `-word` | word **must not** be present |
| `"phrase"` | exact **phrase** match |
| `word*` | **wildcard** prefix (`data*` → data, database) |
| `( )` | **group** terms |

```sql
SELECT * FROM posts WHERE MATCH(title, body) AGAINST('+mysql -oracle'      IN BOOLEAN MODE);
SELECT * FROM posts WHERE MATCH(title, body) AGAINST('"database systems"'  IN BOOLEAN MODE);
SELECT * FROM posts WHERE MATCH(title, body) AGAINST('+data +scien*'       IN BOOLEAN MODE);
```

**3. Query Expansion Mode** — runs the search, then **expands** it using the most-relevant matches to find related terms automatically.

```sql
SELECT * FROM Authors
WHERE MATCH(Name, Email, Bio) AGAINST('Computer Vision' WITH QUERY EXPANSION);
```

## Relevance

A numeric score (higher = better). It rises with:

- **term frequency** within the row,
- **rarity** of the term across all rows (rarer terms weigh more),
- shorter **document length** for the same match.

```sql
SELECT article_id, title,
       MATCH(title, content) AGAINST('MySQL') AS relevance
FROM articles
WHERE MATCH(title, content) AGAINST('MySQL')
ORDER BY relevance DESC;
```

> [!EXAM]
> Boolean-mode operators: **`+`** = required, **`-`** = excluded, **`"..."`** = exact phrase, **`*`** = prefix wildcard, **`( )`** = grouping. `AGAINST('+data +scien*' IN BOOLEAN MODE)` matches rows containing "data" **and** any word starting with "scien" (science, scientific…).

> [!NOTE]
> This closes Unit 2: from sharpening basic SELECT, through set operations, NULL logic, aggregation, joins, the full family of subqueries and CTEs, views and access control, to the active database (triggers, functions, procedures) and analytic features (window functions, full-text search).

---

**Unit 2 complete.** Review the **MCQ quizzes** (slide + textbook exercises), **flashcards**, and revisit the division/"for all" pattern — it is the highest-yield exam topic.
