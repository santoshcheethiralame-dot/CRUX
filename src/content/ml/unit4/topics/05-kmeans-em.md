---
subject: ml
unit: 4
order: 5
slug: kmeans-em
title: K-Means as Expectation-Maximization
summary: Within-cluster variation, and why K-means is a hard-assignment special case of EM for a Gaussian mixture.
minutes: 10
tags: [k-means, EM, within-cluster-variation, hard-assignment, GMM]
---

# K-Means as Expectation-Maximization

K-means is not just a heuristic — it is a **special case of the EM algorithm** (Unit 3) for a particular mixture model.

## The objective: within-cluster variation

K-means partitions the data into $K$ **non-overlapping** clusters $C_1,\dots,C_K$ satisfying:
- $C_1\cup\dots\cup C_K = \{1,\dots,n\}$ — every observation is in some cluster;
- $C_k\cap C_{k'}=\varnothing$ for $k\ne k'$ — no observation is in two clusters.

A **good** clustering minimises the total **within-cluster variation** $W(C_k)$ — how much points within a cluster differ from each other. Using squared Euclidean distance to the centroid:

$$\min_{C_1,\dots,C_K}\ \sum_{k=1}^{K} W(C_k), \qquad W(C_k) = \sum_{x\in C_k}\lVert x - m_k\rVert^2$$

This is exactly the **SSE** — so "minimise within-cluster variation" = "minimise SSE".

## The EM connection

Recall EM (Unit 3): alternate an **E-step** (estimate hidden cluster assignments) and an **M-step** (re-estimate parameters). K-means does precisely this — but with **hard** assignments:

| EM for GMM (soft) | K-Means (hard) |
|---|---|
| **E-step:** responsibilities $\tau_j(x_i)$ — probability each point belongs to each cluster | **Assignment:** each point assigned **entirely** to its nearest centroid (responsibility 0 or 1) |
| **M-step:** $\mu_j$ = responsibility-weighted mean; also update $\Sigma_j, \pi_j$ | **Update:** centroid = **plain mean** of assigned points |
| Elliptical clusters (any $\Sigma$) | Spherical, equal-variance clusters |

> [!NOTE]
> **K-means = EM for a Gaussian mixture** with (1) **hard** assignments instead of soft responsibilities, (2) **equal spherical covariances** ($\Sigma_k = \sigma^2 I$), and (3) **equal mixing weights**. Take the GMM's soft responsibilities to their 0/1 limit and the EM updates collapse exactly to the K-means assignment/update steps.

> [!INTUITION]
> The **assignment step is the E-step** (infer the hidden "which cluster?" variable) and the **update step is the M-step** (re-estimate the parameters = the means). Because each step never increases SSE, K-means — like all EM — **monotonically converges to a local optimum**, and so is sensitive to initialisation.

> [!TRAP]
> Because K-means assumes **spherical, equal-size** clusters, it fails on elongated or unequal clusters where a full GMM (soft, elliptical) succeeds. Hard assignment also makes K-means more sensitive to outliers than soft EM.

> [!EXAM]
> Be able to state: K-means minimises **within-cluster variation = SSE**; its **assignment step ≈ E-step**, **update step ≈ M-step**; and it is the **hard-assignment limit of EM** for a spherical, equal-variance, equal-weight Gaussian mixture. This links Unit 4 clustering back to Unit 3's EM/GMM.

---

**Next:** reducing dimensions instead of grouping points — **Principal Component Analysis**.
