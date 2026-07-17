---
subject: ml
unit: 3
order: 9
slug: gmm
title: Gaussian Mixture Models (GMM)
summary: Soft clustering with a mixture of Gaussians, the latent assignment variables, and the EM updates for π, μ, Σ.
minutes: 13
tags: [GMM, soft-clustering, gaussian, EM, responsibilities]
---

# Gaussian Mixture Models (GMM)

## Why GMMs?

A single Gaussian, by tuning its mean and **covariance**, can take any elliptical shape. A **mixture** of $K$ Gaussians can therefore model clusters of arbitrary elliptical shape and orientation.

> [!INTUITION]
> **GMM vs K-Means.** K-Means is **hard** clustering — each point belongs to exactly one (spherical) cluster. GMM is **soft** clustering — each point belongs to *every* cluster with a **probability** (responsibility), and clusters can be stretched ellipses. K-Means is essentially a special case of GMM with hard assignments and equal spherical covariances.

| | K-Means | GMM |
|---|---|---|
| Assignment | hard (one cluster) | **soft** (probabilities) |
| Cluster shape | spherical | **elliptical** (any $\Sigma$) |
| Algorithm | Lloyd's | **EM** |

## The Gaussian building block

Univariate normal: $\;p(x\mid\mu,\sigma) = \frac{1}{\sqrt{2\pi}\sigma}\exp\!\big[-\frac{(x-\mu)^2}{2\sigma^2}\big]$, with ML estimates $\hat\mu = \bar x$ and $\hat\sigma^2 = \frac1n\sum(x_i-\bar x)^2$.

Multivariate (for $X\in\mathbb{R}^d$) with mean vector $\mu$ and covariance $\Sigma$:

$$p(X) = \frac{1}{(2\pi)^{d/2}\,|\Sigma|^{1/2}}\exp\!\left[-\tfrac{1}{2}(X-\mu)^T\Sigma^{-1}(X-\mu)\right]$$

## The mixture model

$K$ Gaussians, each with its own $\mu_k, \Sigma_k$ and **mixing weight (prior)** $\pi_k$ (with $\sum_k\pi_k = 1$). The latent variable is the cluster-of-origin: a one-hot vector $Z_i = (z_{i1},\dots,z_{iK})$ where $z_{im}=1$ means point $X_i$ came from Gaussian $m$.

> [!NOTE]
> Same chicken-and-egg as EM: *if* we knew each point's source Gaussian, fitting $\mu_j, \Sigma_j$ would be a simple per-cluster ML estimate. We don't — so we run **EM**, where the "responsibilities" $\tau_j(x_i)$ are the soft cluster memberships.

## EM for GMM

**E-step — responsibilities** (posterior that point $x_i$ belongs to cluster $j$):

$$\tau_j(x_i) = P(z_{ij}=1\mid x_i,\theta) = \frac{\pi_j\,\mathcal{N}(x_i;\mu_j,\Sigma_j)}{\sum_{k=1}^{K}\pi_k\,\mathcal{N}(x_i;\mu_k,\Sigma_k)}$$

**M-step — re-estimate parameters** as responsibility-weighted statistics:

$$\pi_j = \frac{1}{n}\sum_i \tau_j(x_i), \qquad \mu_j = \frac{\sum_i \tau_j(x_i)\,x_i}{\sum_i \tau_j(x_i)}, \qquad \Sigma_j = \frac{\sum_i \tau_j(x_i)\,(x_i-\mu_j)(x_i-\mu_j)^T}{\sum_i \tau_j(x_i)}$$

> [!INTUITION]
> Compare with K-Means: there each centroid is the *plain* mean of its hard-assigned points. In GMM the mean is a **soft, responsibility-weighted** mean — points that *mostly* belong to cluster $j$ pull $\mu_j$ harder than points that only partly belong. The mixing weight $\pi_j$ is just the cluster's average responsibility.

Iterate E and M until the log-likelihood converges. Like all EM, it finds a **local** optimum (sensitive to initialization, often seeded by K-Means).

## Applications

Signal processing (additive Gaussian noise models), anomaly/outlier detection, and classification (language/genre identification).

> [!EXAM]
> Know: GMM = **soft** clustering via EM; the **responsibility** formula (E-step) and the three weighted updates for $\pi_j, \mu_j, \Sigma_j$ (M-step); and the K-Means contrast (hard/spherical vs soft/elliptical). The latent $z_{ij}$ is the cluster-assignment indicator.

---

**Next:** dropping the IID assumption for sequences — **Markov Models**.
