---
subject: ml
unit: 1
order: 15
slug: knn-design-choices
title: k-NN in Practice — Choosing k, Weighting, Scaling & the Curse of Dimensionality
summary: The four designer choices, the tie-breaking rules for k, the elbow method, distance-weighted k-NN with a worked flip, normalization, the curse of dimensionality derivation, categorical encoding, and pros/cons.
minutes: 24
tags: [knn, choosing-k, elbow-method, weighted-knn, normalization, curse-of-dimensionality, one-hot, pros-cons]
---

# k-NN in Practice

## The four choices a designer has to make

| Question | What it forces you to decide |
|---|---|
| **Decide on the features that are relevant for the problem** | The **meaning of similarity** |
| **What happens if the range of the features differs a lot?** | **Feature scaling** is required (use normalization) |
| **How to find out how close/far away other points are?** | **Which distance measure** to use |
| **On how many neighbours should I base my result?** | **What is the appropriate value of $k$** |

Everything below is one of these four.

---

## 1. Choosing $k$

### The experiment that generates the rules

Training data: **A(2,8) triangle, B(3,9) triangle, C(5,11) circle, D(6,13) circle.** Query $x_q = (4,10)$.

| P1 | P2 | Distance | CLASS |
|---|---|---|---|
| $x_q$ | A | 2.82 | triangle |
| $x_q$ | B | **1.414** | triangle |
| $x_q$ | C | **1.414** | circle |
| $x_q$ | D | 3.6055 | circle |

Now try each $k$:

| $k$ | What happens |
|---|---|
| **1** | *"We have a dilemma in choosing neighbours"* — **B and C are tied at 1.414**, and they disagree. |
| **2** | *"We have a dilemma while choosing the mode"* — one triangle, one circle → **a tied vote**. |
| **3** | *"There is no problem"* — B(tri), C(cir), A(tri) → **triangle wins**. ✅ *But we won't stop here!* |
| **4** | *"There is a problem again"* — 2 triangles, 2 circles → **tied again**. |

> **From our experiments: $k$ should be ODD if the number of classes is EVEN, and EVEN if the number of classes is ODD.**

### …and then that rule breaks too

**Add two more classes**: E(5,9) heart, F(6,9) heart, G(8,12) square. Same query $x_q = (4,10)$.

| P1 | P2 | Distance | CLASS |
|---|---|---|---|
| $x_q$ | A | 2.82 | triangle |
| $x_q$ | B | **1.414** | triangle |
| $x_q$ | C | **1.414** | circle |
| $x_q$ | D | 3.6055 | circle |
| $x_q$ | E | **1.414** | heart |
| $x_q$ | F | 2.23606 | heart |
| $x_q$ | G | 4.4721 | square |

*"The label has **4 classes, which is even**. So from our previous statement, $k$ should be odd. So let $k = 5$… **We are stuck again!**"* — because B, C and E are now all tied at 1.414, giving a **three-way tie** across triangle / circle / heart.

### The rules that survive

> - **In practice there is no right value for $k$ to start with.**
> - However, you can **start with $k = \text{number of classes} + 1$**.
> - **In case of a tie, decrease $k$ by 1.**
> - Experimental results show that **$k = \sqrt{n}$ performs well too**, where $n$ is the size of the dataset.

### The elbow method

- **Calculate the error rate for different values of $K$.**
- **Choose the optimal $k$ as the elbow value of the curve** (the point where the error stops dropping steeply).
- **Re-run k-NN with the best $K$** and redo the classification report and the confusion matrix.
- **Any change to the data requires you to redo the elbow method** and re-define the best $K$.
- The elbow method **does not mean your curve should look exactly like an elbow** — it can be of any shape.

### $k$ and the bias–variance trade-off

> - **$K$ is very low:** could label the query point as whatever single point sits near it, because only a small number of points are considered. **Chance for high variance — overfitting.**
> - **$K$ is very high:** could mostly label query points as the class label that has a **majority in the given dataset**. **Chance for high bias — underfitting.**
> - **$K$ neither high nor low:** good trade-off without high bias and variance.

> [!INTUITION]
> $k$ is a **smoothing dial** running the wrong way round: **small $k$ = complex model** (a jagged decision boundary that traces every point), **large $k$ = simple model** (a nearly constant prediction). At the extreme $k = n$ the classifier always returns the majority class of the whole dataset — maximum bias, zero variance.

> [!TRAP]
> Quiz from the deck: *"When you find noise in the data, what would you do in k-NN?"* → **increase the value of $k$.** More votes average out the mislabelled points. *"Setting $k = 11$ for this dataset — good idea?"* → **No**: with only 5 negative instances in the entire training set, **any $k > 10$ guarantees a positive majority**, so the local negative pocket around the test point can never win. Large $k$ isn't "more evidence", it's **more dilution**.

---

## 2. Distance-weighted (weighted) k-NN

**The motivation.** Consider a 2-D plot with a binary label and query point $x_q$. **With vanilla k-NN at $K=3$, $x$ is classified as green — when it is more likely to be red**, because the single red neighbour sits almost on top of the query while the two green ones are far away. Plain voting treats all three as equals.

**The fix: let closer points have more influence.**

> **Weigh the contribution of each of the $k$ neighbours according to their distance to the query $x_q$. Give greater weight to the closer neighbour.**

$$\hat f(x_q) \;\leftarrow\; \arg\max_{v \in V}\ \sum_{i=1}^{k} w_i\,\delta\big(v,\ f(x_i)\big), \qquad w_i = \frac{1}{\text{distance}(x_q, x_i)^{m}}$$

where $\delta(a,b) = 1$ if $a = b$ and 0 otherwise, and **$m$ depends on how much you want to penalise points that are far away from the query point.**

For a **real-valued** target the weighted analogue normalises:

$$\hat f(x_q) = \frac{\sum_{i=1}^{k} w_i f(x_i)}{\sum_{i=1}^{k} w_i}$$

The denominator is a constant that **normalises the contributions** — it guarantees that if every neighbour has value $c$, the prediction is $c$.

### Worked example — weighting flips the answer

Query $X$, $k = 5$, closest points A, B, C, D, E:

| Point | Class | Distance | Weight $1/d$ |
|---|---|---|---|
| A | red | 2.1 | 0.476 |
| B | red | 1.8 | 0.556 |
| C | red | 2.0 | 0.500 |
| D | blue | **0.7** | **1.428** |
| E | blue | **1.1** | **0.909** |

**Vanilla k-NN:** 3 reds vs 2 blues → **Red**.

**Weighted k-NN ($m = 1$):**

$$\text{Support for red} = \tfrac{1}{2.1} + \tfrac{1}{1.8} + \tfrac{1}{2.0} = 0.476 + 0.556 + 0.5 = \mathbf{1.532}$$
$$\text{Support for blue} = \tfrac{1}{1.1} + \tfrac{1}{0.7} = 0.909 + 1.428 = \mathbf{2.337}$$
$$\text{estimated class for } X = \max(\text{red } 1.532,\ \text{blue } 2.337) = \mathbf{blue}$$

**The weighting flipped the verdict** — the two blue points are much closer, so they outweigh three distant reds.

> [!NOTE]
> Mitchell uses the **inverse *square*** distance, $w_i = 1/d(x_q,x_i)^2$ (i.e. $m = 2$), and handles the $d = 0$ case by returning $f(x_i)$ directly (or the majority among exact matches). He also notes that **once you weight by distance there is no harm in letting *all* training examples vote**, since distant ones contribute almost nothing. Using all examples makes it a **global method**; using only the nearest makes it a **local method**. The global form of the weighted rule is **Shepard's method** (Shepard, 1968) — which is exactly the normalised weight formula $w_i = h_i^{-p}\big/\sum_j h_j^{-p}$ that appears in the deck's quiz.

> [!EXAM]
> "Compare vanilla and weighted k-NN with an example" → build the exact table above: distances, $1/d$ weights, the two supports, and the flipped verdict. Then state the two benefits: (1) closer neighbours dominate, so the answer degrades gracefully as $k$ grows; (2) it is **robust to noisy training data**, because a weighted average smooths out isolated bad examples.

---

## 3. Scaling — why it is not optional

**Why do we scale?** Look at the same data plotted twice. **Without normalization**, $x_1$ spans $-20$ to $50$ but the points sit in a thin vertical strip — so the "10 nearest neighbours" of a test point are chosen **almost entirely by $x_2$**. **With normalization**, both axes span roughly $-2$ to $2$ and the neighbours genuinely surround the point.

### Worked example

| ID | Age | Income (rupees) |
|---|---|---|
| 1 | 25 | 80,000 |
| 2 | 30 | 100,000 |
| 3 | 40 | 90,000 |
| 4 | 30 | 50,000 |
| 5 | 40 | 110,000 |

**Pre-normalizing** — Euclidean distance between 1 and 2:

$$\big[(100000-80000)^2 + (30-25)^2\big]^{1/2} = \mathbf{20000}$$

- **The high magnitude of income dominated the distance between the two points.**
- **This impacts performance, as higher weightage is given to variables with higher magnitude.**

**How to normalize? Standardisation (z-score):**

$$x_i = \frac{x_i - \mu}{\sigma},\qquad \mu = \text{mean},\ \ \sigma = \text{standard deviation}$$

Here $\mu_{\text{age}} = 33,\ \sigma_{\text{age}} = 6$; $\mu_{\text{income}} = 86000,\ \sigma_{\text{income}} = 20591.26$.

| ID | Age | Income |
|---|---|---|
| 1 | −1.192 | −0.260 |
| 2 | −0.447 | 0.608 |
| 3 | 1.043 | 0.173 |
| 4 | −0.447 | −1.563 |
| 5 | 1.043 | 1.042 |

**Post-normalizing** — Euclidean distance between 1 and 2:

$$\big[(0.608 + 0.260)^2 + (-0.447 + 1.192)^2\big]^{1/2} = \mathbf{1.14}$$

- **Distance is not biased towards the income variable anymore.**
- **Similar weightage is given to both variables.**

> [!TRAP]
> Fit $\mu$ and $\sigma$ on the **training set only**, then apply those same numbers to the test set. Computing them over the full dataset leaks test information into training. (Min–max scaling to $[0,1]$ is the other common choice; z-score is what the slides use.)

---

## 4. The curse of dimensionality

**The setup.** The k-NN classifier makes the assumption that **similar points share similar labels**. Unfortunately, **in high-dimensional spaces, points drawn from a probability distribution tend to never be close together.**

### The derivation (know this)

- Imagine the unit cube $[0,1]^d$. All training data is sampled uniformly within it: $\forall i,\ x_i \in [0,1]^d$. Consider the $k = 10$ nearest neighbours of a test point.
- Let **$\ell$ be the edge length of the smallest hyper-cube containing all $k$ nearest neighbours** of the test point.
- Then that cube's volume must hold a $k/n$ fraction of the points:

$$\ell^{\,d} \approx \frac{k}{n} \qquad \Longrightarrow \qquad \boxed{\ \ell \approx \left(\frac{k}{n}\right)^{1/d}\ }$$

With $n = 1000$ and $k = 10$:

| $d$ | $\ell = (0.01)^{1/d}$ |
|---|---|
| 2 | 0.10 |
| 10 | 0.63 |
| 100 | **0.955** |
| 1000 | **0.995** |

> **So as $d$ grows, almost the entire space is needed to find the 10-NN.** **This breaks down the k-NN assumption**, because the $k$ nearest neighbours **are not particularly closer (and therefore not more similar) than any other data points** in the training set. **Why would the test point share a label with those $k$ neighbours, if they are not actually similar to it?**

**The picture:** histograms of all pairwise distances between randomly distributed points in $d$-dimensional unit squares, for $d = 2, 3, 10, 100, 1000, 10000$. **As $d$ grows, all distances concentrate within a very small range** — the histogram collapses to a spike. When every pair of points is essentially the same distance apart, "nearest" carries no information.

### Can more data rescue us? No.

- How many points would we need for $\ell$ to become truly small? **Fix $\ell = 1/10 = 0.1$.**
- Then $n = k/\ell^{\,d} = k \cdot 10^{\,d}$, **which grows exponentially!**
- **For $d > 100$ we would need far more data points than there are electrons in the universe.**

### How to deal with it

1. **Assign weights to the attributes when calculating distances.** E.g. predicting the price of a house: give higher weights to **area and locality** than to **colour**.
2. **Iteratively leave out one attribute and test the algorithm** — the exercise leads you to the best set of attributes (wrapper-style feature selection).
3. **Dimensionality reduction** using techniques like **PCA**.

> [!NOTE]
> Mitchell frames the same cure geometrically as **"stretching the axes"**: multiply axis $j$ by a factor $z_j$, chosen to minimise the true classification error, estimated by **cross-validation** — **leave-one-out** is nearly free for k-NN since there is no retraining. Setting some $z_j = 0$ **eliminates** an irrelevant attribute entirely. *Locally* varying stretch factors are rarely used: too many degrees of freedom → overfitting.
>
> His framing of *why* is worth quoting: with 20 attributes of which only 2 are relevant, **instances identical on the 2 relevant attributes can still be far apart**, because the distance is **dominated by the 18 irrelevant ones**. Decision trees don't suffer this — they *select* attributes; k-NN uses all of them, always.

---

## 5. Handling categorical features

| Case | Encoding |
|---|---|
| **Boolean values** | Convert to **0 and 1** |
| **Non-binary with a natural order** | Convert to numerical values **based on that order** (ordinal encoding). e.g. Educational attainment: HS, College, MS, PhD → **1, 2, 3, 4** |
| **No order and more than one category** | Convert to **one-hot encoding**. e.g. Animals: Cat, Dog, Zebra → **(1,0,0), (0,1,0), (0,0,1)** |

**Worked example.** Attributes: Education, Place, Gender; target: Eligibility.

- **Education has a natural order:** High school < College < PhD → **1, 2, 3**
- **Place needs to be one-hot encoded** — here dummy-coded into two columns: **$(p_1,p_2) = (0,0)$ → Bangalore, $(0,1)$ → Udupi, $(1,0)$ → Mandya**
- **Gender is binary** → 0 for Female and 1 for Male (or the other way)

| Education | Place | Gender | Eligibility | → | Education | P1 | P2 | Gender | Eligibility |
|---|---|---|---|---|---|---|---|---|---|
| High school | Bangalore | M | Yes | | 1 | 0 | 0 | 1 | Yes |
| College | Udupi | F | No | | 2 | 0 | 1 | 0 | No |
| PhD | Mandya | M | No | | 3 | 1 | 0 | 1 | No |
| PhD | Mandya | M | Yes | | 3 | 1 | 0 | 1 | Yes |
| College | Udupi | F | No | | 2 | 0 | 1 | 0 | No |
| High School | Mandya | M | No | | 1 | 1 | 0 | 1 | No |
| PhD | Udupi | M | Yes | | 3 | 0 | 1 | 1 | Yes |
| College | Bangalore | F | Yes | | 2 | 0 | 0 | 0 | Yes |
| PhD | Bangalore | F | Yes | | 3 | 0 | 0 | 0 | Yes |
| High School | Mandya | M | No | | 1 | 1 | 0 | 1 | No |

> [!TRAP]
> **Never ordinal-encode an unordered attribute.** If you wrote Bangalore = 1, Udupi = 2, Mandya = 3, then Euclidean distance would claim Bangalore is "closer to" Udupi than to Mandya — a fact you invented. One-hot encoding makes every pair of distinct categories equidistant, which is the honest default.

---

## Pros and cons

**Pros**

- **Requires no training before making predictions.** New data can be added seamlessly; it will not impact the accuracy of the algorithm.
- **Only two parameters required:** $k$ and the distance measure.
- **Versatile** — useful for both classification and regression.
- *(Also: non-parametric — it makes no assumption about the functional form of the problem being solved.)*

**Cons**

- **Time** — prediction is computationally expensive; we must compute the distance between the query point and **all** other points ($N$ in the thousands).
- **Space** — high memory requirement; a lazy algorithm which **stores all of the training data**.
- **Does not work well with large datasets** — the cost of calculating the distance between the new point and every existing point is high.
- **It is sensitive to scaling.**
- **The curse of dimensionality.**

> [!NOTE]
> Query cost can be reduced with **efficient memory indexing** — e.g. a **kd-tree** (Bentley 1975; Friedman et al. 1977), where instances are stored at the leaves of a tree with nearby instances at nearby nodes, and internal nodes sort the query to the relevant leaf by testing selected attributes.

> [!EXAM]
> The deck's summary MCQ: *"Which is true about k-NN? (1) it performs much better if all data has the same scale; (2) it works well with a small number of input variables but struggles when the number of inputs is very large; (3) it makes no assumptions about the functional form of the problem being solved."* → **All of the above.** Those three statements are effectively the assumptions of the algorithm — scaling, low dimensionality, non-parametric.

---

**Next:** how we actually measure whether any of these classifiers is any good.
