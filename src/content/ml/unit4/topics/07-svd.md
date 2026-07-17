---
subject: ml
unit: 4
order: 7
slug: svd
title: Singular Value Decomposition (SVD)
summary: Factorising any matrix into U Σ Vᵀ, a full worked example, and how SVD relates to PCA.
minutes: 14
tags: [SVD, factorization, singular-values, eigenvalues, PCA]
---

# Singular Value Decomposition (SVD)

## The decomposition

SVD factorises **any** matrix $A$ (size $m\times n$) into three matrices:

$$\boxed{\,A = U\,\Sigma\,V^T\,}$$

| Factor | Size | Meaning (movie-rating analogy) |
|---|---|---|
| $U$ | $m\times m$ | **left singular vectors** — about the *users/rows* (general preferences) |
| $\Sigma$ | $m\times n$ | **singular values** on the diagonal — *importance* of each factor |
| $V^T$ | $n\times n$ | **right singular vectors** — about the *items/columns* (item similarity) |

$U$ and $V$ are **orthogonal**; $\Sigma$ holds the **singular values** $\sigma_i = \sqrt{\lambda_i}$ in descending order. SVD works for **non-square** matrices (unlike eigendecomposition).

## How to compute it

> [!NOTE]
> The recipe: the right singular vectors $V$ are the **eigenvectors of $A^TA$**; the singular values are $\sigma_i=\sqrt{\lambda_i}$ of $A^TA$; and the left singular vectors are $u_i = \tfrac{1}{\sigma_i}A v_i$.

## Worked example

$$A = \begin{bmatrix}1&0&1\\0&1&0\\0&1&1\\0&1&0\\1&1&0\end{bmatrix}\ (5\times3)$$

**Step 1 — $A^TA$:**
$$A^TA = \begin{bmatrix}2&1&1\\1&4&1\\1&1&2\end{bmatrix}$$

**Step 2 — eigenvalues** via $\det(A^TA-\lambda I)=0$: $\;\lambda^3 - 8\lambda^2 + 17\lambda - 10 = (\lambda-5)(\lambda-2)(\lambda-1)=0 \Rightarrow \lambda = 5,2,1$.

**Step 3 — singular values** $\sigma_i=\sqrt{\lambda_i}$: $\sigma_1=\sqrt5,\ \sigma_2=\sqrt2,\ \sigma_3=1$.
$$\Sigma = \begin{bmatrix}\sqrt5&0&0\\0&\sqrt2&0\\0&0&1\\0&0&0\\0&0&0\end{bmatrix}\ (5\times3)$$

**Step 4 — right singular vectors $V$** (solve $(A^TA-\lambda I)v=0$, normalise):
$$v_1=\tfrac{1}{\sqrt6}[1,2,1]^T,\quad v_2=\tfrac{1}{\sqrt2}[-1,0,1]^T,\quad v_3=\tfrac{1}{\sqrt3}[1,-1,1]^T$$
(For $v_3$ you can also use orthogonality: $v_1^Tv_3=0,\ v_2^Tv_3=0$.) So
$$V = \begin{bmatrix}\tfrac{1}{\sqrt6}&\tfrac{-1}{\sqrt2}&\tfrac{1}{\sqrt3}\\[2pt]\tfrac{2}{\sqrt6}&0&\tfrac{-1}{\sqrt3}\\[2pt]\tfrac{1}{\sqrt6}&\tfrac{1}{\sqrt2}&\tfrac{1}{\sqrt3}\end{bmatrix}$$

**Step 5 — left singular vectors $U$** via $u_i = \tfrac{1}{\sigma_i}A v_i$: e.g. $u_1 = \tfrac{1}{\sqrt5}\cdot\tfrac{1}{\sqrt6}[2,2,3,2,3]^T = \tfrac{1}{\sqrt{30}}[2,2,3,2,3]^T$, and $u_3 = Av_3$ (since $\sigma_3=1$). Assemble $U$ so that $A = U\Sigma V^T$.

## SVD and PCA

> [!INTUITION]
> **PCA is SVD on the centred data matrix.** If $X$ is mean-centred, the covariance matrix is $\propto X^TX$, whose **eigenvectors are PCA's principal components** — exactly the **right singular vectors $V$** of $X$, with singular values $\sigma_i$ related to the eigenvalues by $\lambda_i = \sigma_i^2$. So PCA can be computed via SVD (and more stably). Both are linear dimensionality-reduction tools for continuous data.

> [!EXAM]
> Reproduce the 5-step SVD: $A^TA$ → eigenvalues → $\sigma_i=\sqrt{\lambda_i}$ (form $\Sigma$) → eigenvectors of $A^TA$ = $V$ → $u_i=\tfrac1{\sigma_i}Av_i$ = $U$. State $A=U\Sigma V^T$, that $U,V$ are orthogonal, that it handles **non-square** matrices, and that **PCA ≡ SVD of the centred data** ($\lambda_i=\sigma_i^2$).

---

**Next:** from linear algebra to neural depth — **Introduction to Deep Learning**.
