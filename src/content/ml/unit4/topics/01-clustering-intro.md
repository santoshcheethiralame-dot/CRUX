---
subject: ml
unit: 4
order: 1
slug: clustering-intro
title: Unsupervised Learning & Clustering
summary: From labelled to unlabelled data — the goal of clustering (minimise intra, maximise inter) and the family of approaches.
minutes: 9
tags: [unsupervised, clustering, intra-cluster, inter-cluster]
---

# Unsupervised Learning & Clustering

## Supervised vs Unsupervised (recap)

- **Supervised** — trained on **labelled data** (data + label); learns under the supervision of a target variable to classify/predict.
- **Unsupervised** — **unlabelled data** (data only, no target). The algorithm must **find structure in the input on its own**, grouping similar data by patterns/properties without knowing labels. The flagship task is **clustering**.

## What is clustering?

> Finding groups of objects such that objects **within a group are similar** (related) to one another and **different** from objects in other groups.

The two objectives are complementary:

> [!NOTE]
> **The clustering criterion:**
> - **Intra-cluster** distances are **minimised** (points in a cluster are tight/similar),
> - **Inter-cluster** distances are **maximised** (clusters are well-separated).

A cluster is a subset of the data; the process of forming clusters is *clustering*. It partitions an **unlabelled** dataset into consistent groups based on shared, unknown characteristics.

**Applications:** marketing, insurance, city-planning, earthquake studies, image compression (vector quantization), document grouping.

## Approaches to clustering

| Family | Idea |
|---|---|
| **Hierarchical** | build a tree (dendrogram) of nested clusters |
| **Partitional** | divide into *k* flat clusters (e.g. K-means, K-medoid) |
| **Density-based** | clusters = dense regions (e.g. DBSCAN) |
| **Grid-based** | quantise space into a grid |
| **Model-based** | fit a probabilistic model (e.g. GMM via EM) |
| **Fuzzy** | each point belongs to clusters with degrees of membership |

> [!INTUITION]
> Two big philosophical splits run through this unit: **hierarchical vs partitional** (do you build a tree, or commit to *k* flat groups?), and **hard vs soft** (does a point belong to exactly one cluster, or to several with probabilities?). K-means is partitional + hard; GMM (Unit 3) is model-based + soft.

> [!EXAM]
> State the clustering goal in one line — **minimise intra-cluster, maximise inter-cluster distance** — and name the approaches. Clustering is *unsupervised*: there are **no labels**, so there's no single "correct" answer, only better/worse partitions by some criterion (e.g. SSE).

---

**Next:** building a tree of clusters — **Hierarchical Clustering**.
