---
subject: ml
unit: 1
order: 13
slug: knn
title: K-Nearest Neighbours (KNN)
summary: Distance measures, classification & regression, choosing K, weighted KNN, scaling, and the curse of dimensionality.
minutes: 22
tags: [KNN, distance, weighted-knn, normalization, curse-of-dimensionality]
---

# K-Nearest Neighbours (KNN)

KNN is a **lazy, instance-based** algorithm that classifies (or predicts) a query by looking at its **k closest neighbours**. It works for **both classification and regression**.

> [!INTUITION]
> *"Birds of a feather flock together."* KNN assumes a query is most like the points nearest to it. The **inductive bias of KNN**: the label of $x_q$ resembles the labels of the $k$ instances closest to it in feature space.

## The process

```
1. Represent all training instances as points in n-D feature space.
2. Given a query x_q, compute its distance to every training point.
3. Pick the k nearest points.
4. Classification → output the MODE (majority class) of the k neighbours.
   Regression     → output the MEAN of the k neighbours' values.
```

There is **no training** beyond storing the data. All the work is per-query distance computation.

## Distance measures

For instances with $d$ attributes, the distance between $x$ and $y$:

| Name | Formula | Note |
|---|---|---|
| **Euclidean** | $\sqrt{\sum_{i=1}^{d}(x_i - y_i)^2}$ | straight-line; Minkowski $q=2$ |
| **Manhattan** | $\sum_{i=1}^{d}\lvert x_i - y_i\rvert$ | grid/city-block; Minkowski $q=1$ |
| **Minkowski** | $\big(\sum_{i=1}^{d}\lvert x_i - y_i\rvert^{q}\big)^{1/q}$ | general; $q$ tunes the metric |

## KNN for classification

Target is discrete: classes $V=\{v_1,\dots,v_m\}$, target function $f:\mathbb{R}^d \to V$.

- **Train:** store every $\langle x, f(x)\rangle$.
- **Classify** $x_q$: find $k$ nearest $x_1,\dots,x_k$, then
$$\hat f(x_q) = \arg\max_{v \in V}\sum_{i=1}^{k}\delta(v, f(x_i)),\qquad \delta(a,b)=\begin{cases}1 & a=b\\ 0 & a\neq b\end{cases}$$
i.e. each neighbour casts one vote; the majority class wins.

**Practice (k=3, Euclidean).** Query $x_q=(100,135,12,8)$ against 5 patients (B.P., Sugar, Hb, WBC) → distances: D **5.19**, B **11.74**, A **15.13**, E 15.96, C 32.04. The 3 nearest are D(No), B(Yes), A(No) → mode = **No**.

## KNN for regression

Target is real-valued, $f:\mathbb{R}^d \to \mathbb{R}$. Same neighbours, but **average** their values:

$$\hat f(x_q) = \frac{1}{k}\sum_{i=1}^{k} f(x_i)$$

**Practice (k=3).** Predicting weight of ID-11 → 3 nearest are id6(60), id5(72), id4(59) → $\hat y = \tfrac{60+72+59}{3} = \mathbf{63.67}$. (Error for regression KNN is reported with **MSE** $=\tfrac1n\sum (y_i-\hat y_i)^2$.)

## Choosing K

$k$ controls the bias–variance tradeoff:

- **k too small** (e.g. 1) → decision driven by 1–2 points → **high variance / overfitting** (sensitive to noise).
- **k too large** → washes out into the majority class of the whole dataset → **high bias / underfitting**.
- **k just right** → smooth, well-generalised boundary.

**Heuristics:**

- Start with $k = (\text{number of classes}) + 1$; on a tie, **decrease k by 1**.
- $k = \sqrt{n}$ (n = dataset size) often works well.
- Avoid ties: pick **odd k for an even number of classes** (and vice-versa) so a majority usually exists.
- **Elbow method** — plot **error rate vs k**, choose k at the "elbow" where error stops dropping meaningfully.

> [!TRAP]
> Choosing k is not just "bigger = more votes = better." A large k on an imbalanced set will simply predict the majority class for everything. Tune k with validation / the elbow method.

## Weighted KNN

Let **closer neighbours count more.** Weight each neighbour's vote by an inverse function of its distance:

$$\hat f(x_q) = \arg\max_{v\in V}\sum_{i=1}^{k} w_i\,\delta(v, f(x_i)), \qquad w_i = \frac{1}{\text{distance}(x_q, x_i)^m}$$

**Worked example (k=5).** Neighbours and distances — red: A(2.1), B(1.8), C(2.0); blue: D(0.7), E(1.1).

- Support(red) $= \tfrac1{2.1}+\tfrac1{1.8}+\tfrac1{2.0} = 0.476+0.556+0.5 = 1.532$
- Support(blue) $= \tfrac1{1.1}+\tfrac1{0.7} = 0.909+1.428 = 2.337$
- **Predicted = blue.**

> [!NOTE]
> Plain (unweighted) KNN with k=5 here would say **red** (3 red vs 2 blue). Weighting **flips it to blue** because D and E are much closer. Distance weighting also lets you safely use larger k.

## Why scaling matters

KNN is **distance-based**, so an attribute with a large numeric range **dominates** the distance. Always **normalise** first.

**Example.** Age (≈25–40) vs Income (≈50k–110k). Raw distance between record 1 and 2:
$$\sqrt{(100000-80000)^2 + (30-25)^2} \approx 20000$$
— income completely swamps age. After **standardisation** $x' = \dfrac{x - \mu}{\sigma}$ (here $\mu_{\text{age}}=33,\sigma=6$; $\mu_{\text{inc}}=86000,\sigma=20591$), the same distance becomes ≈ **1.14**, giving both features fair influence.

## Handling categorical attributes

- **Binary** → map to 0/1.
- **Ordinal** (natural order, e.g. HS < College < MS < PhD) → integer codes 1, 2, 3, 4.
- **Nominal** (no order, e.g. Cat/Dog/Zebra) → **one-hot encoding**: (1,0,0), (0,1,0), (0,0,1).

## The curse of dimensionality

> [!DERIVE]
> Sample $n$ points uniformly in the unit cube $[0,1]^d$. The edge length $\ell$ of the smallest hypercube holding the $k$ nearest neighbours of a query satisfies $\ell^d \approx k/n$, so
> $$\ell \approx \Big(\frac{k}{n}\Big)^{1/d}.$$
> For $n=1000$, $k=10$: $d{=}2\Rightarrow\ell{=}0.1$; $d{=}10\Rightarrow 0.63$; $d{=}100\Rightarrow 0.955$; $d{=}1000\Rightarrow 0.995$.

As $d$ grows, the "nearest" neighbours fill **almost the entire space** — they're no longer *near*, so KNN's core assumption collapses. Worse, fixing $\ell=0.1$ requires $n = k\cdot 10^{d}$ points — **exponential** data (for $d>100$, more points than atoms in the universe). **Fixes:** weight/select relevant attributes, drop attributes by leave-one-out testing, or apply **dimensionality reduction (PCA)**.

## Pros & cons

| Pros | Cons |
|---|---|
| **No training** — add data anytime | **Slow prediction** — distance to all $n$ points |
| Only 2 knobs: $k$ and the distance metric | **High memory** — stores all training data |
| Works for classification **and** regression | **Sensitive to scaling** (must normalise) |
| No assumptions about functional form | Suffers the **curse of dimensionality** |

> [!EXAM]
> KNN questions are usually numerical: compute Euclidean distances, take the $k$ nearest, output **mode** (classification) or **mean** (regression). Be ready to also: redo it **weighted** (flips ties), explain **why normalise**, and state the **curse of dimensionality** with the $\ell\approx(k/n)^{1/d}$ intuition. Remember KNN is **lazy**, with **high variance for small k**.

---

**Next:** once a model predicts, how do we *measure* it — **performance metrics**.
