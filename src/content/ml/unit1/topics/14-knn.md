---
subject: ml
unit: 1
order: 14
slug: knn
title: k-Nearest Neighbours
summary: The algorithm for discrete and real-valued targets, distance measures (Euclidean/Manhattan/Minkowski), the inductive bias, Voronoi surfaces, and two fully worked practice problems.
minutes: 22
tags: [knn, instance-based, euclidean, manhattan, minkowski, voronoi, worked-example]
---

# k-Nearest Neighbours

## The idea in four lines

- **A lazy learning algorithm.**
- **Classify based on its neighbours.**
- The algorithm can be used for **both classification and regression**.
- Works on the idea that **similar people / things / subjects tend to stay together**.

## Overview of the procedure

1. **All instances correspond to points in the $n$-dimensional space.**
2. **Given a query point, find where it belongs in the space.**
3. **Find its $K$ neighbours** ($K$ in k-NN is the number of neighbours in consideration).
4. These points may belong to some class (**classification**) or may have a real value (**regression**).
5. **Assign the *mode* of the neighbours for classification, and the *mean* for regression.**

**How do we find neighbours? Using distance measures.**

## Inductive bias

> The inductive bias of a learning algorithm is the set of assumptions the learner uses to predict outputs for inputs it has not encountered.
>
> **Inductive bias in k-NN: the classification of an instance $x$ will be most similar to the classification of the $K$ other instances that are *nearby*.**

> [!TRAP]
> Notice what this bias assumes and never checks: that **your distance function actually encodes similarity**. If the features are on wildly different scales, or if most of them are irrelevant, "nearby" stops meaning "similar" and the whole method quietly fails. That is the entire content of the next topic.

---

## Distance measures

For instances described by $d$ attributes:

| Measure | Formula |
|---|---|
| **Euclidean** | $\displaystyle \sqrt{\sum_{i=1}^{d}(x_i - y_i)^2}$ |
| **Manhattan** | $\displaystyle \sum_{i=1}^{d}\lvert x_i - y_i\rvert$ |
| **Minkowski** | $\displaystyle \left(\sum_{i=1}^{d}\lvert x_i - y_i\rvert^{\,q}\right)^{1/q}$ |

where **$d$ = number of attributes**, and $x_i, y_i$ are the $i$-th attributes.

**Minkowski is the general form — manipulate $q$ to get the others:**

- **$q = 1$ → Manhattan distance** (also called city-block or taxicab: you can only travel along the axes)
- **$q = 2$ → Euclidean distance** (straight line)
- *(as $q \to \infty$ → Chebyshev distance: the largest single-coordinate difference)*

> [!INTUITION]
> The three little pictures on the slide say it all: **Euclidean** is the diagonal arrow between the two dots; **Manhattan** is the L-shaped path along the grid lines; **Minkowski** is the family of paths in between, bending toward the diagonal as $q$ grows.

---

## k-NN for classification (discrete-valued target)

**Setup.** In classification the target function is **discrete valued** with $m$ classes. Define the set of all classes $V = \{v_1, v_2, \dots, v_m\}$. In $d$-dimensional space, the target function is

$$f : \mathbb{R}^d \to V$$

and any instance $x_i$ has label $f(x_i) \in V$.

**Training algorithm:** *store each training example $\langle x, f(x)\rangle$.* That's all.

**Classification algorithm:** given a query $x_q$, find the $k$ nearest neighbours $x_1 \dots x_k$ of $x_q$, and return

$$\hat f(x_q) \;\leftarrow\; \arg\max_{v \in V} \sum_{i=1}^{k} \delta\big(v,\ f(x_i)\big), \qquad \delta(a,b) = \begin{cases}1 & a = b\\ 0 & \text{otherwise}\end{cases}$$

> [!INTUITION]
> The $\delta$ notation is just a formal way of saying **"take a vote and return the mode"**. Each of the $k$ neighbours contributes 1 to its own class's tally; the class with the largest tally wins.

## k-NN for regression (real-valued target)

In regression the target function is **real valued (continuous)**: $f : \mathbb{R}^d \to \mathbb{R}$. Same training step; only the last line changes:

$$\hat f(x_q) \;\leftarrow\; \frac{\sum_{i=1}^{k} f(x_i)}{k}$$

> **The mean value of the $k$ nearest neighbours is returned as the approximated value of the query instance $x_q$.**

> [!NOTE]
> **What hypothesis is k-NN actually representing?** It never forms an explicit $\hat f$ — but if you queried every point in the space, you would trace out a decision surface. For **1-NN** that surface is a set of **convex polyhedra, one around each training example** — the region of space closest to that point. This is the **Voronoi diagram** of the training set. Naming it is an easy mark in a viva.

---

## Practice Problem 1 — k-NN classification

*Apply k-NN to assess the risk for a patient whose BP is 100, sugar 135, Haemoglobin 12 and WBC count 8 thousand. Take **$k = 3$** and use **Euclidean distance**.*

Query point: $x_q = (100,\ 135,\ 12,\ 8)$

| # | B.P. | Sugar | Haemoglobin | WBC (thousands) | **Risk** |
|---|---|---|---|---|---|
| A | 100 | 120 | 12 | 6 | **No** |
| B | 110 | 130 | 14 | 5 | **Yes** |
| C | 120 | 110 | 11 | 7 | **Yes** |
| D | 100 | 140 | 13 | 7 | **No** |
| E | 115 | 140 | 11 | 6 | **Yes** |

**Step 1 — distance from $x_q$ to every point.** e.g. for A:

$$d(x_q, A) = \sqrt{(100{-}100)^2 + (135{-}120)^2 + (12{-}12)^2 + (8{-}6)^2} = \sqrt{0 + 225 + 0 + 4} = \sqrt{229} = 15.13$$

| Query | Point | Euclidean distance |
|---|---|---|
| $x_q$ | A | 15.13 |
| $x_q$ | B | 11.74 |
| $x_q$ | C | 32.04 |
| $x_q$ | D | **5.19** |
| $x_q$ | E | 15.96 |

**Step 2 — sort and pick the $k = 3$ nearest:**

$$\mathbf{D\ (5.19)},\quad \mathbf{B\ (11.74)},\quad \mathbf{A\ (15.13)},\quad \text{then } E\ (15.96),\ C\ (32.04)$$

**Step 3 — take the mode of their labels:**

$$\text{mode}(\underbrace{\text{NO}}_{D},\ \underbrace{\text{YES}}_{B},\ \underbrace{\text{NO}}_{A}) = \mathbf{NO}$$

**Answer: the patient is classified as *No risk*.**

---

## Practice Problem 2 — k-NN regression

*Find the weight of ID 11. The value of $k$ is 3. Use Euclidean distance.*

| ID | Height | Age | Weight |
|---|---|---|---|
| 1 | 5 | 45 | 77 |
| 2 | 5.11 | 26 | 47 |
| 3 | 5.6 | 30 | 55 |
| 4 | 5.9 | 34 | **59** |
| 5 | 4.8 | 40 | **72** |
| 6 | 5.8 | 36 | **60** |
| 7 | 5.3 | 19 | 40 |
| 8 | 5.8 | 28 | 60 |
| 9 | 5.5 | 23 | 45 |
| 10 | 5.6 | 32 | 58 |
| **11** | **5.5** | **38** | **?** |

**Step 1 — distances from ID 11 = $(5.5,\ 38)$.** e.g. for id 6:

$$d = \sqrt{(5.5-5.8)^2 + (38-36)^2} = \sqrt{0.09 + 4} = \sqrt{4.09} = 2.022$$

| Point | id 1 | id 2 | id 3 | id 4 | id 5 | id 6 | id 7 | id 8 | id 9 | id 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| **Distance** | 7.017 | 12.006 | 8.006 | **4.019** | **2.118** | **2.022** | 19.001 | 10.00 | 15 | 6.00 |

**Step 2 — sort, take the 3 nearest:** **id 6 (2.022), id 5 (2.118), id 4 (4.019)**

**Step 3 — take the mean of their target values:**

| Id | weight |
|---|---|
| id 6 | 60 |
| id 5 | 72 |
| id 4 | 59 |

$$\hat f(x_{11}) = \frac{60 + 72 + 59}{3} = \mathbf{63.666}$$

> [!TRAP]
> Look carefully at what actually decided this answer. **Age ranges over 19–45 while Height ranges over 4.8–5.9** — so $(38-36)^2 = 4$ dwarfs $(5.5-5.8)^2 = 0.09$. **Height contributes essentially nothing; the "nearest neighbours" are just the three closest ages.** This problem is a live demonstration of why **feature scaling is mandatory for k-NN** — see the next topic.

> [!EXAM]
> The marking scheme for both problems is the same 4 steps, so always write them: (1) state the query point and $k$; (2) tabulate **all** distances, showing the formula substituted at least once; (3) sort and list the $k$ nearest **by name**; (4) take **mode** (classification) or **mean** (regression) and state the answer. Never round distances until the final table — ties are decided by tiny differences.

---

## Worked implementation walkthrough

### Classification, $k = 4$

For most practical purposes the dataset is divided into **production (training) and test data (80:20)**.

**Training data:** (3,5) red, (3,6) red, (4,6) red, (4,4) red, (7,10) green, (8,9) green, (8,8) green, (9,10) green
**Test data:** (5,5) **red**, (4,7) **green**

Steps: **upload the production data into memory**; **decide the distance measure** (Euclidean); **decide $k$** ($k=4$); for each test point find the distance to all neighbours, take the nearest 4, and **assign the mode**; then **calculate error and accuracy**.

Result on this tiny test set: **TP = 1, TN = 0, FP = 1, FN = 0**

$$\text{Error} = \frac{FP + FN}{\text{all predictions}} = \frac{1}{2} = \mathbf{0.5}$$

*(This is a small example — real data will be in the thousands.)*

### Regression, $k = 4$

**Training data** (X, Y, value): (3,5,3.5) (3,6,2.6) (4,6,2.8) (4,4,3.1) (7,10,8.7) (8,9,8.5) (8,8,9.3) (9,10,9.7)
**Test data:** (5,5) true value **3.7**; (7,8) true value **8.4**

Same procedure, but **assign the prediction as the mean of the neighbours**, and **calculate the error using MSE**:

- Test point (5,5): prediction $= 3.0$ → $e_1 = (3.7 - 3.0)^2 = \mathbf{0.49}$
- Test point (7,8): prediction $= 9.05$ → $e_2 = (8.4 - 9.05)^2 = \mathbf{0.4225}$

$$\text{MSE} = \frac{0.49 + 0.4225}{2} = \mathbf{0.45625}$$

> [!NOTE]
> Note the asymmetry in evaluation: classification is scored with **error rate / accuracy** (from a confusion matrix), regression with **MSE**. Using accuracy on a regression problem — or MSE on a classification problem — is a conceptual error, not just a formatting one.

---

**Next:** the four design decisions that make or break k-NN in practice.
