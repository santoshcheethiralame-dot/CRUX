---
subject: ml
unit: 4
order: 2
slug: hierarchical
title: Hierarchical Clustering
summary: Agglomerative vs divisive, the linkage methods (single/complete/average/Ward), a worked merge, and dendrograms.
minutes: 14
tags: [hierarchical, agglomerative, divisive, linkage, dendrogram]
---

# Hierarchical Clustering

Hierarchical clustering builds a **nested hierarchy** of clusters by repeatedly combining (or splitting) groups based on a proximity criterion.

> [!INTUITION]
> **Analogy:** organising files into folders and subfolders. If you never stop, you end at one of two extremes — every item alone, or everything in one big cluster.

**Key advantage:** you **don't specify the number of clusters in advance** (unlike K-means). The output is a **dendrogram**; *cut it at the desired level* to get any number of clusters.

## Two directions

| | **Agglomerative** (bottom-up) | **Divisive** (top-down) |
|---|---|---|
| Start | each point its own cluster | all points in one cluster |
| Step | **merge** the two closest clusters | **split** a cluster |
| End | one big cluster | each point alone (or a stop criterion) |

> [!INTUITION]
> *Agglomerative analogy:* strangers at a party — everyone alone → the most similar pair up → eventually one big friend circle.

**Divisive** uses a **termination criterion** (e.g. minimum SSE within a cluster, below which no further split). Both are **"inflexible"**: once a merge/split is made, it **cannot be undone**.

## Agglomerative algorithm

```
1. Compute the proximity (distance) matrix.
2. Let each data point be its own cluster.
3. Repeat:
     merge the two CLOSEST clusters
     update the proximity matrix
4. Until only one cluster remains.
```

The crux — and what distinguishes the variants — is **how you measure the distance between two clusters** (how to "update the proximity matrix").

## Linkage methods (inter-cluster distance)

| Method | Distance between clusters $C_i, C_j$ |
|---|---|
| **MIN — Single link** | distance of the **closest** pair |
| **MAX — Complete link** | distance of the **farthest** pair |
| **Group Average** | $\dfrac{1}{|C_i||C_j|}\sum_{p\in C_i, q\in C_j}\text{dist}(p,q)$ |
| **Centroid** | distance between cluster centroids |
| **Ward's method** | minimises the increase in **squared error** |

> [!TRAP]
> **Single link** can *chain* (connect clusters via a single close pair → long straggly clusters) and is sensitive to noise. **Complete link** resists chaining but breaks large clusters and is sensitive to outliers. Choose linkage to match cluster shape.

### Linkage worked example

Clusters $C_1=\{a,b\}$, $C_2=\{c,d,e\}$ with pairwise distances giving $\{d(a,c),d(a,d),d(a,e),d(b,c),d(b,d),d(b,e)\}=\{3,4,5,2,3,4\}$:

- **Single link:** $\text{dist}(C_1,C_2)=\min\{3,4,5,2,3,4\}=\mathbf{2}$
- **Complete link:** $\text{dist}(C_1,C_2)=\max\{3,4,5,2,3,4\}=\mathbf{5}$

## Worked example — agglomerative on coordinates

Given points **A–F** as $(x_1,x_2)$ coordinates:

1. **Step 1** — compute the **Euclidean** distance between every pair $\big(d=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}\big)$ → a 6×6 proximity matrix.
2. **Step 2 (iter 1)** — find the smallest non-zero entry → **0.50**, between **D and F** → merge **{D,F}**.
3. **Step 3 (update)** — rebuild the matrix using **single-link (MIN)**: $\text{dist}(\{D,F\},X)=\min(d(D,X),d(F,X))$.
4. **Iter 2–4** — repeatedly merge the closest pair and update.
5. **Final** — stop at the termination condition → the **dendrogram** records the merge order and heights (D–F merge at height 0.5, etc.).

> [!NOTE]
> A **dendrogram** is a tree whose merge heights show *how dissimilar* the merged clusters were. Cutting it horizontally at a chosen height yields a flat clustering — the cut height trades #clusters against cluster tightness.

## Limitations & hierarchical vs non-hierarchical

- Merges/splits are **irreversible**; sensitive to **noise/outliers**; struggles with **different-sized clusters** and **non-convex shapes**; can **break large clusters**.

| Hierarchical | Non-Hierarchical (e.g. K-means) |
|---|---|
| Predefined top→bottom order | Forms clusters by merge/split, **no tree** |
| Less reliable, **slower** | More reliable, **faster** |
| Struggles with high-error data | Handles error better |
| Easy to read (dendrogram) | Harder to interpret |

> [!EXAM]
> Be able to: run an agglomerative merge from a distance matrix (find min, merge, update by **single/complete link**); compute single vs complete link distance between two clusters; and explain the **dendrogram** + that hierarchical needs **no pre-set k**. Remember merges are **irreversible**.

---

**Next:** the dominant partitional method — **K-Means**.
