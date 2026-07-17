---
subject: ml
unit: 4
order: 4
slug: kmeans-evaluation
title: K-Means — SSE, Limitations & Bisecting
summary: Sum-of-squared-error, the elbow method, K-means' failure modes, the initial-centroid problem, and Bisecting K-Means.
minutes: 14
tags: [SSE, elbow, bisecting-k-means, outliers, initialization]
---

# K-Means — SSE, Limitations & Bisecting

## Sum of Squared Error (SSE)

The standard quality measure: for each point, the error is the distance to its cluster's centroid; square and sum:

$$SSE = \sum_{i=1}^{K}\sum_{x\in C_i}\text{dist}(m_i, x)^2$$

where $m_i$ is the centroid of $C_i$. SSE measures total within-cluster variation.

> [!TRAP]
> Lower SSE *seems* better — but **increasing K always reduces SSE** (more centroids → tighter clusters; at $K=n$, SSE = 0). So you **can't** pick K by minimising SSE alone. A good clustering with **small K** can beat a poor one with large K.

### Elbow method (choosing K)

Run K-means for **K = 1…10**; plot **SSE vs K**. SSE drops sharply then flattens; the **"elbow"** (point of diminishing returns) is a good K.

### SSE worked example

Points A1(2,10), A2(2,5), A3(8,4), A4(5,8), A5(7,5), A6(6,4), A7(1,2), A8(4,9); clusters $C_1=\{A1,A4,A8\}, C_2=\{A3,A5,A6\}, C_3=\{A2,A7\}$. Centroids $C_1=(3.6,9), C_2=(7,4.3), C_3=(1.5,3.5)$.

$$SSE(C_1) = (2{-}3.6)^2+(5{-}3.6)^2+(4{-}3.6)^2+(10{-}9)^2+(8{-}9)^2+(9{-}9)^2 = 2.56+1+1.96+1+1+0 = \mathbf{6.68}$$

With $SSE(C_2)=2.67$ and $SSE(C_3)=5$: **Total SSE = 14.35**.

## Document data → cosine

K-means isn't limited to spatial data. For **text**, Euclidean distance is a poor proximity measure → use **cosine similarity**. The goal becomes **maximising the similarity** of documents to their cluster centroid — this quantity is the cluster's **cohesion**.

## Limitations

> [!TRAP]
> K-means struggles when clusters have **differing sizes**, **differing densities**, or **non-globular (non-convex) shapes** — because it carves space into Voronoi cells around centroids (roughly spherical, equal-ish). The **notion of a cluster is itself ambiguous** — the same points can plausibly be 2, 4, or 6 clusters.

**Outliers** badly distort K-means (with SSE): they pull centroids and inflate SSE → **remove outliers before** clustering.

## The initial-centroid problem

Results depend heavily on random initial centroids. If there are $K$ real clusters, the chance of picking one centroid from each is small — e.g. for equal-sized clusters and $K=10$, $P = \frac{10!}{10^{10}} = 0.00036$. Sometimes centroids self-correct, sometimes not.

**Fixes:**
- **Multiple runs** (keep the lowest-SSE result).
- **Hierarchical clustering on a sample** to seed the centroids.
- **Over-select** centroids (more than K), then keep the most widely separated.
- **Post-process** (merge/split clusters), or use **Bisecting K-Means**.

**Empty clusters:** if a centroid gets no points, replace it with the point contributing **most to SSE** (farthest from any centroid), or a point from the highest-SSE cluster.

## Bisecting K-Means

A hybrid of **divisive hierarchical** + K-means that resists the local-minimum problem:

```
1. Set K. Start with all data as ONE cluster.
2. Use K-means with K=2 to split a cluster into two.
3. Measure each cluster's intra-cluster SSE.
4. Select the cluster with the LARGEST SSE and split it (K=2).
5. Repeat 2–4 until #leaf clusters = K.
```

> [!INTUITION]
> Instead of placing all K centroids at once (fragile), Bisecting K-means **grows** the clustering by always splitting the *worst* (highest-SSE) cluster. It's **less sensitive to initialisation** and can produce either a flat (partitional) or a hierarchical result. *(Local minimum = good but not best; global minimum = best possible.)*

> [!EXAM]
> Compute **SSE** for a given clustering (per-cluster then total); explain why SSE can't pick K (use the **elbow** instead); list K-means' three failure modes (sizes/density/non-globular) and the **initial-centroid** fixes; and give the **Bisecting K-means** steps (always split the highest-SSE cluster).

---

**Next:** the probabilistic view — **K-Means as Expectation-Maximization**.
