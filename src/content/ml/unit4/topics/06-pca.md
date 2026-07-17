---
subject: ml
unit: 4
order: 6
slug: pca
title: Principal Component Analysis (PCA)
summary: The curse of dimensionality, variance-maximising principal components, the 5-step recipe, and a full worked example.
minutes: 16
tags: [PCA, dimensionality-reduction, covariance, eigenvectors, variance]
---

# Principal Component Analysis (PCA)

## Why reduce dimensions?

**High-dimensional data:** #features $p \gg$ #observations $N$. With too few observations relative to features you can't reliably learn the input→output relationship.

> [!TRAP]
> **Curse of dimensionality:** as dimensionality grows, data becomes **increasingly sparse**. For **classification**, sparse high-dim space means too few examples to train/label new points well; for **clustering**, **density and distance become meaningless** (everything is roughly equidistant — cf. KNN in Unit 1). So we reduce dimensions before learning.

**Feature Elimination** (drop features) vs **Feature Extraction** (build new combined features):

| | Feature Elimination | Feature Extraction (PCA) |
|---|---|---|
| What | drop unhelpful features | create new features = combinations of old |
| Pro | simple, interpretable | retains signal from *all* features |
| Con | **signal from dropped features lost** | new features less interpretable |

## What PCA produces

PCA creates **principal components** that are:
- **rank-ordered by variance** (PC1 has the most),
- **uncorrelated** / **orthogonal** to each other,
- **linear combinations** of the original attributes,
- **few** — drop the low-variance ones (little signal).

> [!INTUITION]
> **PC1 is the direction of maximum variance** — the line along which the data spreads out the most (the strongest underlying trend). **PC2** is the direction of next-most variance that is **orthogonal** (uncorrelated) to PC1, and so on. Projecting onto the top few PCs keeps most of the "spread" (information) while collapsing dimensions.

**Formal definition:** PCA is an **orthogonal transformation** converting possibly-correlated variables into **linearly uncorrelated** variables (the principal components).

## The 5 steps

1. **Standardise** — subtract the mean (centre at origin); optionally divide by std (scale).
2. **Covariance matrix** $C$ ($d\times d$) — captures pairwise feature correlation.
3. **Eigenvectors & eigenvalues** of $C$ — **eigenvectors = principal components**; **eigenvalues = variance explained (importance)**.
4. **Order** eigenvectors by **descending eigenvalue** → the top one is PC1.
5. **Project** — pick the top-$k$ eigenvectors to form the projection matrix; multiply the centred data by it → lower-dimensional representation.

## Worked example

Data: **(2,1), (3,5), (4,3), (5,6), (6,7), (7,8)**.

**Step 1 — mean:** $\mu = \big(\tfrac{2+3+4+5+6+7}{6}, \tfrac{1+5+3+6+7+8}{6}\big) = (4.5, 5)$. Subtract: $(-2.5,-4),(-1.5,0),(-0.5,-2),(0.5,1),(1.5,2),(2.5,3)$.

**Step 2 — covariance matrix** (average of $(x_i-\mu)(x_i-\mu)^T$):
$$C = \begin{bmatrix} 2.92 & 3.67 \\ 3.67 & 5.67 \end{bmatrix}$$

**Step 3 — eigenvalues** via $\det(C-\lambda I)=0$:
$$(2.92-\lambda)(5.67-\lambda) - (3.67)^2 = 0 \;\Rightarrow\; \lambda^2 - 8.59\lambda + 3.09 = 0 \;\Rightarrow\; \lambda_1=8.22,\ \lambda_2=0.38$$

**Eigenvector for $\lambda_1=8.22$** (= PC1, the largest eigenvalue) via $C\mathbf{x}=\lambda\mathbf{x}$:
$$2.92X_1+3.67X_2 = 8.22X_1 \;\Rightarrow\; X_1 = 0.69 X_2 \;\Rightarrow\; \text{PC1} \propto (0.69, 1) \approx (0.57, 0.82)$$

**Step 4–5 — project:** project the centred points onto PC1 → a **1-D** representation that retains most variance. To transform a single pattern: $\;z = (\text{eigenvector})^T\,(x - \mu)$. (e.g. for $(2,1)$, project $(2,1)-(4.5,5)$ onto PC1.)

> [!NOTE]
> **How many components to keep?** Choose $k$ so the retained eigenvalues explain enough total variance (e.g. 90–95%). Alpaydin (Ex 6.2): reconstruct from the top-$k$ eigenvectors and watch the **reconstruction error fall as $k$ rises** — a principled way to pick $k$.

> [!EXAM]
> The full PCA numerical: (1) mean-centre, (2) covariance matrix, (3) eigenvalues from the characteristic equation, (4) eigenvector for the **largest** eigenvalue = PC1, (5) project $z=\text{eigvec}^T(x-\mu)$. Remember: **eigenvectors = directions (PCs)**, **eigenvalues = variance**; PCs are **orthogonal** and ordered by variance.

---

**Next:** a more general matrix factorisation — **Singular Value Decomposition**.
