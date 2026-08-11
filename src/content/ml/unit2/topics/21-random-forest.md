---
subject: ml
unit: 2
order: 21
slug: random-forest
title: Random Forest
summary: The algorithm step by step, why only R of M attributes are considered at each split, out-of-bag error in the forest, the worked heart-disease example, and the decorrelation argument that separates random forest from plain bagged trees.
minutes: 11
tags: [random-forest, bagging, feature-randomization, OOB, decorrelation, variable-importance, decision-tree]
---

# Random Forest

## What it is

> [!NOTE]
> - **An ensemble classifier using many decision tree models.**
> - Can be used for **Classification or Regression**.
> - **Accuracy and variable importance information is provided with the results.**
>
> **Decision Tree: one tree. Random Forest: more than one tree.**

---

## The algorithm

> [!NOTE]
> 1. **A random seed is chosen which pulls out at random a collection of samples from the training dataset while maintaining the class distribution.**
> 2. With this selected dataset, **a random set of attributes from the original dataset is chosen based on user-defined values. All the input variables are not considered because of enormous computation and high chances of overfitting.**
> 3. **In a dataset where $M$ is the total number of input attributes, only $R$ attributes are chosen at random for each tree, where $R < M$.**
> 4. **The attributes from this set create the best possible split to develop a decision tree model. The process repeats for each of the branches until the termination condition, stating that leaves are the nodes that are too small to split.**

### The four steps in short

> [!EXAM]
> 1. **Create a bootstrapped dataset**
> 2. **Create decision trees using a random subset of features**
> 3. **Compute the out-of-bag error**
> 4. **Run the samples through the random forest and classify based on voting**

> [!TRAP]
> Step 1 says *"while maintaining the class distribution"* — this is **stratified** bootstrapping, which matters on imbalanced data where a plain bootstrap could produce a sample containing almost none of the minority class.
>
> And note the reason given for $R < M$ has **two parts**: **enormous computation** *and* **high chances of overfitting**. Most students remember only the first, but the second is the more important one.

---

## Out-of-bag error in the forest

> [!NOTE]
> - Remember, in bootstrapping we **sample with replacement**, and therefore **not all observations are used for each bootstrap sample. On average 1/3 of them are not used!**
> - We call them **out-of-bag samples (OOB)**.
> - We can **predict the response for the $i$-th observation using each of the trees in which that observation was OOB**, and do this for $n$ observations.
> - **Calculate overall OOB MSE** (regression) **or classification error**.

> [!EXAM]
> "**On average 1/3**" is the same $1/e \approx 0.368$ result derived under bagging — the slides round $36.8\%$ to a third. Being able to state *why* it is $1/e$, via $(1 - 1/n)^n$, is what a full-mark answer needs.

---

## The worked example

The original dataset used to walk through the construction:

| Chest Pain | Good Blood Circ | Blocked Arteries | Weight | Heart Disease |
|---|---|---|---|---|
| No | No | No | 125 | **No** |
| Yes | Yes | Yes | 180 | **Yes** |
| Yes | Yes | No | 210 | **No** |
| Yes | No | Yes | 167 | **Yes** |

> [!DERIVE]
> **Tracing the algorithm on this table.**
>
> **Step 1 — bootstrap.** Draw 4 rows with replacement, e.g. rows $\{2, 3, 4, 4\}$. Row 4 appears **twice**; **row 1 appears not at all** — so **row 1 is out-of-bag for this tree**.
>
> **Step 2 — random features.** With $M = 4$ attributes, take $R = 2$ at random for this split, say `{Good Blood Circ, Blocked Arteries}`. Choose the better of those **two** as the root — even if `Weight` would have been the best split overall, it is **not a candidate here**.
>
> Repeat at each subsequent node with a **freshly drawn** subset of $R$ attributes, until leaves are too small to split.
>
> **Steps 3–4.** Build many such trees. Push row 1 through **every tree for which it was OOB**, take the **majority vote**, and compare to its true label `No`. Aggregating over all rows gives the **OOB classification error**.

> [!TRAP]
> The random feature subset is drawn **fresh at every node**, not once per tree. A tree therefore considers different candidate attributes at different depths — which is what keeps the randomisation from simply amounting to training each tree on a fixed reduced feature set.

---

## Why feature randomisation matters

> [!EXAM]
> **Bagged trees vs random forest** — the difference is one line:
>
> | | Randomises |
> |---|---|
> | **Bagging with trees** | the **data** only (bootstrap rows) |
> | **Random forest** | the **data AND the features** considered at every split ($R < M$) |

> [!INTUITION]
> Here is why that second source of randomness is essential. Suppose one attribute — say `Weight` — is a strong predictor. In **plain bagged trees**, *every* tree will pick `Weight` as its root split, because every bootstrap sample still shows it to be the best. The trees end up **nearly identical**, their errors are **highly correlated**, and averaging them achieves almost nothing.
>
> Restricting each split to $R$ random attributes means `Weight` is unavailable at roughly $1 - R/M$ of the nodes, **forcing other trees to find alternative structure**. The trees become genuinely different, their errors **decorrelate**, and the variance reduction that bagging promises actually materialises.
>
> This is the **independence requirement** from the ensemble-learning topic, enforced by construction.

> [!EXAM]
> Typical defaults: **$R = \sqrt{M}$** for classification and **$R = M/3$** for regression. Smaller $R$ means **more decorrelation but weaker individual trees** — $R$ is the dial between the two, and it is the forest's main hyperparameter.

---

## Variable importance

Because the OOB set gives an honest error estimate, it also yields a **feature-importance** measure at no extra cost: permute one attribute's values in the OOB data, re-measure the error, and the **increase** indicates how much the forest relied on that attribute.

> [!INTUITION]
> This is why the opening slide lists **"accuracy and variable importance information is provided with the results"** as a headline property. Random forest is not only a strong classifier but a practical **feature-selection tool** — and it produces both from the same resampling machinery, with no separate validation set and no extra training runs.

---

## Where the unit lands

> [!INTUITION]
> Three different answers to the same question — *how do you fit a boundary that data does not hand you directly?*
>
> - **Neural networks** learn a **representation** in which the problem becomes linear, by gradient descent through hidden layers.
> - **SVM** fixes the representation up front through a **kernel**, then solves a **convex** problem exactly.
> - **Ensembles** give up on a single good model and **average many mediocre ones** instead.
>
> The first pays with tuning and local minima; the second with the burden of choosing a kernel; the third with compute and lost interpretability. **No method escapes the trade — they just place the cost in different places.**

---

**End of Unit 2.**
