---
subject: ml
unit: 4
order: 3
slug: kmeans
title: K-Means Clustering
summary: The assignment/update loop, a full worked example clustering 8 points into 3 clusters, and complexity.
minutes: 15
tags: [k-means, centroid, partitional, convergence, complexity]
---

# K-Means Clustering

K-means is a **partitional, hard** clustering method: it splits data into **K non-overlapping** clusters, each represented by its **centroid** (mean), assigning every point to its nearest centroid.

## The algorithm

```
1. Initialise: choose K, pick K initial centroids (often random points).
2. Assignment step: assign each point to its CLOSEST centroid (Euclidean).
3. Update step: recompute each centroid = MEAN of points assigned to it.
4. Repeat 2–3 until centroids stop changing (convergence).
```

*[Flow: Start → Init → Assignment → Update → "Centroids changed?" → YES loops back / NO → Stop.]*

> [!INTUITION]
> Two alternating moves: **"which cluster owns each point?"** (assignment) and **"where should each cluster's centre be?"** (update). Each step can only decrease (or hold) the total squared error, so it converges — though only to a **local** optimum that depends on the initialisation.

## Worked example — 8 points into K=3

Points: **A1(2,10), A2(2,5), A3(8,4), A4(5,8), A5(7,5), A6(6,4), A7(1,2), A8(4,9)**. Initial centres (random): **C1=A1(2,10), C2=A4(5,8), C3=A7(1,2)**. (Manhattan distance $|x_2-x_1|+|y_2-y_1|$ here.)

**Iteration 1** — assign each point to nearest centre → **C1={A1}, C2={A3,A4,A5,A6,A8}, C3={A2,A7}**. New centroids:
$$C_1=(2,10),\quad C_2=\Big(\tfrac{8+5+7+6+4}{5},\tfrac{4+8+5+4+9}{5}\Big)=(6,6),\quad C_3=\Big(\tfrac{2+1}{2},\tfrac{5+2}{2}\Big)=(1.5,3.5)$$

**Iteration 2** — reassign with C1(2,10), C2(6,6), C3(1.5,3.5) → **C1={A1,A8}, C2={A3,A4,A5,A6}, C3={A2,A7}**. New centroids: $C_1^*=(3,9.5),\ C_2^*=(6.5,5.25),\ C_3^*=(1.5,3.5)$.

**Iteration 3** — reassign → **C1={A1,A4,A8}, C2={A3,A5,A6}, C3={A2,A7}**. New centroids: $C_1^{**}=(3.67,9),\ C_2^{**}=(7,4.3),\ C_3^{**}=(1.5,3.5)$.

**Iteration 4** — assignments **unchanged** → **algorithm stops**. Final clusters: **{A1,A4,A8}, {A3,A5,A6}, {A2,A7}**.

> [!NOTE]
> If no distance is specified, use **Euclidean**. The centroid is the **coordinate-wise mean** of the cluster's members.

## Properties

- **Initial centroids are random** → results **vary run to run** (a major weakness — see next topic).
- The centroid is the **mean**; "closeness" via **Euclidean** (or cosine/correlation for other data).
- Most movement happens in the **first few iterations**.
- **Complexity:** $O(n\cdot K\cdot I\cdot d)$ — $n$ points, $K$ clusters, $I$ iterations, $d$ attributes.
- **Pros:** simple, easy to implement, fast on small data. **Cons:** slow on very large data; needs numeric values; must pick K; sensitive to init & outliers.

> [!INTUITION]
> **K-means as vector quantization** (Alpaydin): the $K$ centroids form a *codebook*; each point is encoded by the **index** of its nearest centroid. This is exactly how K-means compresses images — store the codebook + per-pixel indices instead of raw pixels.

> [!EXAM]
> The classic question hands you points + K + initial centres and asks you to run **iterations until convergence**: (1) assign by nearest centroid, (2) recompute centroids as means, (3) repeat until assignments stop changing. Show every iteration's assignment and the new centroids. Know the complexity $O(nKId)$.

---

**Next:** how good is a clustering, and how to fix K-means' weaknesses — **SSE, limitations & Bisecting K-Means**.
