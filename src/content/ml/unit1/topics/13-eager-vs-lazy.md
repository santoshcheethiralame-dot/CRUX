---
subject: ml
unit: 1
order: 13
slug: eager-vs-lazy
title: Eager vs Lazy Learning
summary: The two learning philosophies side by side, instance-based (memory-based) learning, and why lazy learners can approximate a target function locally.
minutes: 9
tags: [eager, lazy, instance-based, memory-based, knn]
---

# Eager vs Lazy Learning

## The two pictures

```
EAGER                                  LAZY
──────────────────────────────────     ──────────────────────────────────
TRAINING                               TRAINING
  training data ──→ build MODEL          training data ──→ just stored
                    (data discarded)                       (no model built)

QUERY                                  QUERY
  x ──→ MODEL ──→ prediction             x ───────────┐
                                                      ├──→ compare ──→ prediction
  (training data no longer needed)       stored data ─┘

cost:  slow to train, fast to answer   cost:  no training, slow to answer
```

- **Eager:** *creates a model using the training data, which is used across all test queries.*
- **Lazy:** *for every test query, it processes the training data to make a prediction.*

## The comparison table

| | **Eager Learning** | **Lazy Learning** |
|---|---|---|
| When is the work done? | **At training time** — generalisation happens up front | **At query time** — generalisation is **postponed** until a new instance must be classified |
| Model built? | Training data is used to create a **global model**; a **generalised model** is created based on the training set | **No global model is created** |
| At query time | The **global model** is used to make the prediction | A **common procedure is run on the training data** for **every** test instance |
| Use of training data | Training data is **not directly used** to make a prediction — the generated model is used instead | **Prediction uses the training data directly** |
| Training cost | High | **Essentially zero** (just store the data) |
| Query cost | Low | **High** — must touch the stored data every time |
| Memory | Only the model | **All of the training data** |
| **Example** | **Decision Tree** (also logistic regression, neural nets, SVM) | **Instance-Based Learning algorithms like KNN** |

> [!EXAM]
> "Differentiate eager and lazy learning with examples" is a reliable 4–5 mark question. Draw the two boxes, give the table with at least: when generalisation happens, whether a global model exists, training vs query cost, memory, and one example each (**Decision Tree** vs **k-NN**).

---

## Instance-based (memory-based) learning

> **Instance-based learning** (also called **memory-based learning**) is a family of learning algorithms that **compare new problem instances with instances seen in training, which have been stored in memory**.

> **Because computation is postponed until a new instance is observed, these algorithms are sometimes referred to as "lazy."**

Examples of instance-based learning algorithms:
- **the k-nearest neighbours algorithm** (our focus),
- **kernel machines**,
- **RBF (radial basis function) networks**.

*(Case-based reasoning is the symbolic cousin — it stores richer, structured "cases" rather than points in $\mathbb{R}^n$, and is used for things like help-desk retrieval and legal reasoning.)*

---

## Why laziness is sometimes an advantage

This is the conceptual payoff, and it is what makes the topic more than a memorised table:

> **A key advantage of delayed, or lazy, learning is that instead of estimating the target function once for the entire instance space, these methods can estimate it *locally and differently for each new instance* to be classified.**

An eager learner must commit to **one** global approximation of $f$ before it knows what it will be asked. A lazy learner constructs a **different local approximation for every query**, and never builds an approximation designed to perform well over the entire instance space.

> [!INTUITION]
> An eager learner is a textbook written before anyone asked a question. A lazy learner is a librarian who fetches the three most relevant books *after* you ask. The textbook is faster to consult; the librarian gives a better answer to a weird question — and needs the whole library kept on the shelves.

**When it pays:** when the target function is **very complex globally but simple locally** — a wiggly surface that looks nearly flat in any small neighbourhood. A single global model would need enormous capacity; a family of tiny local models does it easily.

> [!NOTE]
> Two disadvantages Mitchell highlights:
> 1. **Classification cost is high** — nearly all computation happens at query time, so efficient **indexing** of stored examples (e.g. a **kd-tree**) is a real practical concern.
> 2. **They consider *all* attributes** of the instance when retrieving similar examples — unlike decision trees, which *select* a subset. If the target concept depends on only a few of many attributes, the instances that are truly most similar **may well be far apart** in the full space. That is the **curse of dimensionality**, and nearest-neighbour methods are especially sensitive to it.

> [!TRAP]
> "Lazy" does not mean "bad" or "no learning". The learning is real — it's just **deferred**. And "eager" does not mean "fast": eager learners are slow to train and fast to query; lazy learners are the exact opposite. Getting the direction of that trade backwards is a classic MCQ loss.

---

**Next:** the canonical lazy learner — k-Nearest Neighbours.
