---
subject: dbms
unit: 2
order: 24
slug: full-text-search
title: Full-Text Search in MySQL
summary: MATCH AGAINST and the FULLTEXT index, the full comparison against LIKE and REGEXP, the three search modes, how relevance is scored and when MySQL sorts by it automatically, and every Boolean operator with worked solutions.
minutes: 13
tags: [sql, full-text-search, match, against, fulltext-index, boolean-mode, natural-language-mode, relevance, stopwords, query-expansion]
---

# Full-Text Search in MySQL

> [!EXAM]
> **Full-Text Search (FTS) is a feature in MySQL where you can search for words or phrases in large text-based columns (`CHAR`, `VARCHAR`, `TEXT`) using natural language processing (NLP).**
>
> **Instead of just checking if a string is present, full-text search looks for relevant matches and ranks results based on how well they match the search terms.** It is more powerful than `LIKE`/`REGEXP`, since it **ranks results by relevance**.
>
> **Features:**
> - **Full-Text Indexes** → much faster than `LIKE`
> - **Search Modes** → Natural Language, Boolean, Query Expansion
> - **Relevance Ranking** → scores based on closeness of match
> - **Handles stopwords, synonyms and word proximity**

Used in **search engines, blogs, e-commerce and document systems**.

## The syntax

> [!EXAM]
> **The key feature is the `MATCH(column) AGAINST('search terms')` syntax.**
>
> ```sql
> SELECT * FROM products
> WHERE  MATCH(product_name, description)
>        AGAINST('smartphone' IN BOOLEAN MODE);
> ```
>
> **`MATCH`** performs the full-text search **on the listed columns**; **`AGAINST`** specifies the search term and the mode.

## FTS vs LIKE / REGEXP

> [!EXAM]
> | Feature | LIKE / REGEXP | FULL-TEXT SEARCH |
> |---|---|---|
> | **Index usage** | **Does not use indexes effectively.** Slow for large data | **Uses special indexes.** Faster searches |
> | **Relevance ranking** | **No relevance ranking**, just returns matches | **Results ranked by relevance** |
> | **Natural language support** | **Not supported** | **Supported** (Natural Language Mode) |
> | **Word boundary detection** | **Not accurate** — matches substrings like **"cat" in "concatenate"** | **Accurate word boundary detection** |
> | **Boolean logic** | **Not supported** | **Supported** (AND, OR, NOT operators) |
> | **Phrase searching** | **Possible but imprecise** | **Supported and more accurate** |

> [!INTUITION]
> The **"cat" in "concatenate"** example is the one to quote, because it names the actual difference in *kind*.
>
> `LIKE '%cat%'` is a **character-level** operation — it knows nothing about words, so it happily matches *concatenate*, *category* and *scatter*. Full-text search **tokenises the text into words first**, so it matches the word *cat* and nothing else.
>
> The index difference follows from the same fact. `LIKE '%cat%'` cannot use a normal B-tree index at all (a leading wildcard means the string could start anywhere), so it scans every row. A **FULLTEXT index is an inverted index** — a map from each word to the rows containing it — so it looks the word up directly. That is the source of the speed difference, and it is why the two rows of the table are really one point.

## How it works

> [!EXAM]
> 1. **Use columns of type `VARCHAR` or `TEXT`**
> 2. **Create a `FULLTEXT` index** on the column(s)
> 3. **Use `MATCH(column1, column2)` with `AGAINST('word')`**
>
> ```sql
> CREATE FULLTEXT INDEX idx_name ON table(column);
> ```

The deck's setup:

```sql
CREATE TABLE posts (
    id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(200),
    body  TEXT
) ENGINE=InnoDB;

ALTER TABLE posts ADD FULLTEXT(title, body);   -- to enable FTS

INSERT INTO posts (title, body) VALUES
('MySQL Tutorial',      'Learn the basics of database systems'),
('Advanced Database',   'We explore indexing and performance'),
('Cooking Tips',        'Always use fresh ingredients'),
('MySQL vs PostgreSQL', 'Comparison of two database systems'),
('Oracle Tips',         'Learn how to use Oracle effectively');
```

```sql
SELECT * FROM posts
WHERE  MATCH (title, body) AGAINST ('database' IN NATURAL LANGUAGE MODE);
```

> [!TRAP]
> **`MATCH` must list exactly the columns of the FULLTEXT index, in the same order.**
>
> The index above is on **`(title, body)` as a pair**. `MATCH(title, body)` uses it; `MATCH(title)` alone **cannot**, and MySQL raises an error rather than falling back. A **collection** — the deck's term for the set of columns in a FULLTEXT index — is indexed as a unit.

## Natural Language Mode

> [!EXAM]
> **By default, or with the `IN NATURAL LANGUAGE MODE` modifier, `MATCH()` performs a natural language search for a string against a text collection.**
>
> **For each row in the table, `MATCH()` returns a relevance value** — a similarity measure between the search string and the text in that row.
>
> **Natural Language Mode:**
> 1. **Uses natural language processing to rank results based on relevance**
> 2. **Ignores stopwords** (like "a", "the") **and very short words (less than 4 characters, by default)**
> 3. **Does not require special syntax** (unlike Boolean mode)
>
> Returns rows **where the relevance score is non-zero.**

> [!TRAP]
> **The minimum word length of 4 characters catches people out constantly.** Searching for `SQL`, `cat` or `AI` in natural language mode returns **nothing at all** — the term is below `innodb_ft_min_token_size` and is simply not indexed.
>
> Likewise a **stopword** such as "the" or "and" matches nothing however often it appears. Boolean mode is the way round both: it can **search even if the word is a stopword or appears in every row.**

## Relevance

> [!EXAM]
> **Relevance is a numeric score that tells how closely a row matches the search terms.** It is a **floating-point number** (0.0, 0.25, 1.2 …), and **higher score = better match**.
>
> **Relevance is calculated using:**
> 1. **How often the search term appears in the column**
> 2. **How rare the term is across all rows**
> 3. **Length of the document** — shorter docs = higher relevance if the term is present

```sql
SELECT id, title,
       MATCH(title, body) AGAINST('database') AS relevance
FROM   posts
WHERE  MATCH(title, body) AGAINST('database')
ORDER BY relevance DESC;
```

The query **selects matching rows, shows the relevance score, and orders by relevance descending** (highest match first). Note that `MATCH … AGAINST` appears **twice** — once in `SELECT` to display the score, once in `WHERE` to filter.

> [!INTUITION]
> The three scoring factors are the classic **TF-IDF** intuition, and each has a plain-English justification:
>
> - **Term frequency** — a document mentioning "database" ten times is more about databases than one mentioning it once.
> - **Inverse document frequency** — a word appearing in *every* row distinguishes nothing, so it is worth little. A rare word is highly informative. (This is why MySQL's natural-language mode gives **zero** relevance to a term present in more than 50% of rows.)
> - **Document length** — one mention in a short title is a stronger signal than one mention buried in a long article.
>
> Together: **frequent in this document, rare in the collection, in a short document → high score.**

### Automatic sorting by relevance

> [!EXAM]
> **What if you don't mention relevance?**
>
> ```sql
> SELECT id, title FROM posts WHERE MATCH(title, body) AGAINST('database');
> ```
>
> **MySQL will sort the results by relevance automatically, if and only if:**
> 1. **You don't use any `ORDER BY`**
> 2. **You're using `MATCH(...) AGAINST(...)` in the `WHERE` clause**
> 3. **The FULLTEXT index is being used** (not bypassed)
> 4. **It's a simple query** (no joins)

> [!TRAP]
> **If you add any other `ORDER BY` clause, MySQL stops auto-sorting by relevance.**
>
> ```sql
> SELECT id, title FROM posts
> WHERE MATCH(title, body) AGAINST('database')
> ORDER BY id;     -- sorts by id, NOT relevance
> ```
>
> The implicit ordering is a convenience, not a guarantee — and all four conditions must hold. **If relevance order matters, compute it in the `SELECT` list and `ORDER BY` it explicitly.** Never rely on the implicit behaviour in code you care about.

## Boolean Mode

> [!EXAM]
> **BOOLEAN MODE allows you to:**
> 1. **Use operators (`+`, `-`, `"`, `*`) to include, exclude or group terms**
> 2. **Search for partial words using wildcards (`*`)**
> 3. **Write complex search logic** (AND, OR, NOT-like behavior)
> 4. **Search even if the word is a stopword or appears in every row**
>
> **You must explicitly write:** `AGAINST ('your_query' IN BOOLEAN MODE)`

> [!EXAM]
> | Operator | Meaning | Example |
> |---|---|---|
> | **`+`** | **Word must be present** | `+mysql` (must contain "mysql") |
> | **`-`** | **Word must not be present** | `-database` (must not contain "database") |
> | **(none)** | **Word is optional, but affects relevance** | `database` — rows with the word are **ranked higher** |
> | **`""`** | **Search exact phrase** | `"mysql tutorial"` |
> | **`*`** | **Wildcard (suffix only)** | `data*` matches "data", "database" |
> | **`( )`** | **Group terms** | `+(mysql database)` — must contain mysql **or** database |

**Worked examples:**

```sql
-- include one word, exclude another
SELECT * FROM posts WHERE MATCH(title, body)
AGAINST('+mysql -oracle' IN BOOLEAN MODE);

-- exact phrase
SELECT * FROM posts WHERE MATCH(title, body)
AGAINST('"database systems"' IN BOOLEAN MODE);

-- prefix search
SELECT * FROM posts WHERE MATCH(title, body)
AGAINST('data*' IN BOOLEAN MODE);       -- data, database, databases

-- grouping
SELECT * FROM posts WHERE MATCH(title, body)
AGAINST('+(mysql database) -oracle' IN BOOLEAN MODE);
```

> [!EXAM]
> **Only *suffix* wildcards are supported** — `data*` is legal, **`*data` is not.**
>
> This is a direct consequence of how the inverted index is stored: words are held in sorted order, so everything beginning with `data` sits together and can be found by prefix. Finding everything *ending* in `data` would require scanning every word in the index.

> [!TRAP]
> **A term with no operator is optional, not required** — and this trips people who read Boolean mode as ordinary AND.
>
> `AGAINST('mysql database' IN BOOLEAN MODE)` returns rows containing **either** word; the terms only influence ranking. To require both you must write **`+mysql +database`**.
>
> The `-` operator is also **exclusion only** — a query of nothing but negative terms (`'-oracle'`) returns an empty result, because there is nothing positive to match against.

## The practice exercise

The deck sets up an `articles` table with a `FULLTEXT (title, content)` index and poses five questions. The solutions from the notes:

> [!DERIVE]
> **1 — All articles mentioning "MySQL" (natural language):**
> ```sql
> SELECT article_id, title, content FROM articles
> WHERE MATCH(title, content) AGAINST('MySQL' IN NATURAL LANGUAGE MODE);
> ```
>
> **2 — Get the relevance score for "MySQL":**
> ```sql
> SELECT article_id, title,
>        MATCH(title, content) AGAINST('MySQL' IN NATURAL LANGUAGE MODE) AS relevance
> FROM articles
> WHERE MATCH(title, content) AGAINST('MySQL' IN NATURAL LANGUAGE MODE)
> ORDER BY relevance DESC;
> ```
>
> **3 — Must include "MySQL", must not include "Oracle":**
> ```sql
> SELECT article_id, title FROM articles
> WHERE MATCH(title, content) AGAINST('+MySQL -Oracle' IN BOOLEAN MODE);
> ```
>
> **4 — Either "tutorial" or "guide":**
> ```sql
> SELECT article_id, title FROM articles
> WHERE MATCH(title, content) AGAINST('tutorial guide' IN BOOLEAN MODE);
> ```
> *No `+` signs — that is what makes it OR rather than AND.*
>
> **5 — Must contain "data" and any word starting with "scien":**
> ```sql
> SELECT article_id, title FROM articles
> WHERE MATCH(title, content) AGAINST('+data +scien*' IN BOOLEAN MODE);
> ```
> *Two `+` signs for "must have both", and `scien*` matches "science", "scientific".*

## Query Expansion Mode

> [!EXAM]
> The **third mode**, mentioned in the features list and used in the notes: **`WITH QUERY EXPANSION`** **expands search terms using the top matches.**
>
> ```sql
> SELECT * FROM Authors
> WHERE MATCH(Name, Email, Bio) AGAINST('Computer Vision' WITH QUERY EXPANSION);
> ```

> [!INTUITION]
> Query expansion is a **two-pass** search, which is the easiest way to remember it. MySQL runs the search once, takes the **most relevant rows** from that first pass, harvests **additional words** from them, and searches again with the enlarged term set.
>
> So a search for *"Computer Vision"* may also surface documents about *image recognition* — words that never appeared in your query but appear alongside it in the best matches. It is **automatic synonym discovery from the data itself**.
>
> The trade-off is precision: it broadens results and can drift off-topic, which is why it is not the default.

> [!EXAM]
> **The three modes, one line each:**
> - **Natural Language Mode** — the **default**; ranks by relevance, ignores stopwords and short words, no special syntax.
> - **Boolean Mode** — operators `+ - " " * ( )`; must be requested explicitly; works with stopwords.
> - **Query Expansion Mode** — runs twice, **expanding the search using the top matches**.

---

That closes Unit 2. The unit moved from **sharpening the basic query block** (SELECT/WHERE/ORDER BY), through **combining relations** (set operations, joins), **queries inside queries** (subqueries, correlation, division), **naming intermediate results** (CTEs, views), **stored logic** (triggers, functions, procedures), and finally the two features that step outside plain relational retrieval — **window functions** and **full-text search**.
