---
subject: ml
unit: 1
order: 12
slug: eager-vs-lazy
title: Eager vs Lazy Learning
summary: Global-model (eager) vs memory-based (lazy) learning, and instance-based learning.
minutes: 6
tags: [eager, lazy, instance-based, memory-based]
---

# Eager vs Lazy Learning

A second way to classify algorithms: **when** do they do the work — at training time, or at query time?

## Eager learning

The learner builds a **global model** from the training data *up front*. Once built, the training data is discarded; every query is answered by the **model**.

- Training data → generalised model → used for **all** future queries.
- Work happens at **training time**; prediction is then **fast**.
- **Example: Decision Trees** (also logistic regression, neural networks).

## Lazy learning

The learner **stores the training data** and does **no work until a query arrives**. For each query it runs a procedure over the stored data to produce an answer — there is **no global model**.

- No model is built; the training data is used **directly** at query time.
- Work happens at **prediction time**; training is trivial (just memorise).
- **Example: k-Nearest Neighbours (KNN)** and other instance-based methods.

| | Eager | Lazy |
|---|---|---|
| Builds a model? | Yes (global) | No |
| Training cost | High | ~zero (store data) |
| Prediction cost | Low | High (scan data each query) |
| Adapts to new data | Needs retraining | Instantly (just add to memory) |
| Example | Decision Tree | KNN |

## Instance-based (memory-based) learning

A family of **lazy** algorithms that compare each **new instance to stored training instances**. Because computation is deferred until a query is seen, they are literally called **"lazy."** Members include **k-nearest neighbours** (our focus), kernel machines, and RBF networks.

> [!INTUITION]
> Eager = study hard before the exam, then answer fast from memory. Lazy = bring all your notes and look up the closest matching example for every question. Lazy pays nothing to "learn" but pays a lot per query.

> [!EXAM]
> Be ready to (a) define both, (b) give the canonical example of each (**Decision Tree = eager, KNN = lazy**), and (c) state the cost tradeoff: eager = expensive training / cheap prediction; lazy = cheap training / expensive prediction.

---

**Next:** the flagship lazy algorithm in full — **K-Nearest Neighbours**.
