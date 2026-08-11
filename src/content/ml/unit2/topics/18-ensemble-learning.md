---
subject: ml
unit: 2
order: 18
slug: ensemble-learning
title: Ensemble Learning
summary: Weak versus strong learners, the four sources of diversity and why independence of errors is the requirement, how predictions are combined, the probability argument for why confidence rises, and the taxonomy of ensemble methods.
minutes: 11
tags: [ensemble, weak-learner, strong-learner, diversity, voting, bias-variance, decision-stump]
---

# Ensemble Learning

## The idea

> [!NOTE]
> **Goal: boost accuracy while keeping models simple and fast.**
>
> - **Strong learners** (e.g. **SVM**) → high accuracy but **expensive to train/test**
> - **Weak learners** (e.g. **decision stump, perceptron**) → simple, fast, but **low accuracy**
> - **Combine weak learners' predictions** → to make it comparable to a strong model
> - Examples: **Bagging, Boosting, Random Forests**

> [!EXAM]
> A **decision stump** is a decision tree with **only one node (the root)** — it splits on a single attribute once. It is the canonical weak learner, and the reason matters: it is so simple that **there is no real scope for overfitting**.

### Real-life analogies

- In **medical diagnosis**, most of us try to get a **second or third opinion** instead of immediately taking a decision.
- We have a **panel of judges** in order to get a legal opinion.
- **Spam detection** decomposes into separate checks: does the email contain phrases like *"how to earn a prize"*? Is it **only an image**? **Who is the sender**? How was **caps lock** used? What is in the **subject line**?

> [!NOTE]
> All these steps are **weak classifiers**. **Individually they cannot answer the question** of whether the email is spam. **However, when used together, they can detect spam with high probability and accuracy.**

---

## Getting diverse weak learners

> [!EXAM]
> The main requirement is that they be **inexpensive to build**. Four sources of diversity:
>
> | Source | Example |
> |---|---|
> | **Different algorithms** | Decision stump, perceptron |
> | **Different hyperparameters** of the same algorithm | Different tree depths |
> | **Different subsets of the training data (resampling)** | **The most popular** — this is bagging |
> | **Different features** of the training data | This is what random forest adds |

### What the learners must be like

> [!NOTE]
> If there is to be any use from an ensemble, these learners **must be different in some way — must be independent**. We are not saying that every time all the learners must give a different opinion (sometimes it could be the same, sometimes different); however, **the combined opinion of these learners must be better than the individual opinion**.
>
> **The errors made by these learners must be independent and random in nature.**

> [!TRAP]
> That last sentence is the **entire condition** for an ensemble to work, and it is where ensembles fail in practice. If every learner makes the **same** mistakes, averaging changes nothing — you get one model's error with $N$ times the compute.
>
> Diversity is not a nice-to-have; it is the mechanism. This is exactly why random forest goes to the trouble of randomising **features as well as data**: bootstrapping alone leaves the trees too similar.

**How many learners?** *Empirically, **100 learners** are good enough, but it depends on the problem — even a lesser number could work.*

---

## Combining the predictions

> [!NOTE]
> - Using **statistics, such as the mode or mean** (**simple majority voting**).
> - **Assign different weights to different learners** before taking the vote — **some models may be more trustworthy than others**.

> [!NOTE]
> Base models perform not so well by themselves either because they have **high bias** (low degree of freedom models) or because they have **too much variance**. **The new combined learner is expected to have low bias and low variance.**
>
> **The presence of over-training (which leads to overfitting) is not generally a problem with weak classifiers.** For example, in **decision stumps** — decision trees with only one node — **there is no real scope for overfitting**. This helps the classifier which combines the outputs of weak classifiers in avoiding overfitting.

> [!INTUITION]
> Notice the two combination rules map onto the two methods that follow. **Equal-weight majority voting** is what **bagging** does — every learner saw an equally valid sample, so none deserves more say. **Weighted voting** is what **boosting** does — learners are built sequentially and judged, so better ones earn more influence.

---

## Why ensemble — the summary

> [!NOTE]
> - To improve on the **stability and predictive power** of the model.
> - However, **there is no absolute guarantee an ensemble model performs better than an individual model** — but if you build many of those, and your individual classifier is weak, your **overall performance should be better**.
> - This comes at the **cost of increased algorithmic and model complexity**.
> - To make **more accurate predictions** than any individual model.
> - They are among the **most powerful techniques in machine learning, often outperforming other methods**.
> - **High confidence** — when most of the learners predict the same class.

> [!TRAP]
> Do not overclaim in an exam answer. The slides are explicit: **no absolute guarantee**. The benefit is conditional on the learners being **weak and diverse**. Combine 100 copies of the same strong, correlated model and you gain nothing but cost.

---

## Why confidence increases — the probability argument

> [!DERIVE]
> Assume $N$ models combined into the ensemble, each with the **same accuracy $A$** (a simplification — in reality they differ).
>
> $$P(\text{a model correctly predicts an instance}) = A$$
> $$P(\text{a model misclassifies an instance}) = 1 - A$$
>
> Since **all $N$ must misclassify** for the whole set to fail — and the errors are independent, so probabilities **multiply**:
>
> $$P(\text{all } N \text{ misclassify}) = (1-A)(1-A)\cdots(1-A) = \boxed{(1-A)^N}$$
>
> Therefore
>
> $$P(\text{at least 1 of the } N \text{ predicts correctly}) = C = \boxed{1 - (1-A)^N}$$

**Worked numerically** with a weak learner at $A = 0.6$:

| $N$ | $(1-A)^N$ | $C = 1 - (1-A)^N$ |
|---|---|---|
| 1 | 0.400 | 0.600 |
| 5 | 0.010 | 0.990 |
| 10 | 0.0001 | 0.9999 |

> [!TRAP]
> The slides raise the caveat themselves: *"if only 1 model predicts the instance correctly and the majority misclassify, we may not listen to that model."* So $1-(1-A)^N$ is **not** the ensemble's accuracy — majority voting needs **more than half** to be right, not just one.
>
> **The point being made is narrower and still valid:** *the probability that **every** learner gets a given instance wrong is very, very low.* And in reality all learners have different accuracies, so the exact expression differs.

> [!INTUITION]
> The independence assumption is where the whole calculation lives or dies. $(1-A)^N$ requires errors to be **statistically independent**. If the learners are perfectly correlated, $P(\text{all wrong}) = 1-A$ — no improvement at all, no matter how many you add.
>
> So the arithmetic is really a formal restatement of the earlier requirement: **diversity is not a detail of the method, it is the source of the benefit.**

---

## Types of ensemble methods

> [!EXAM]
> | Strategy | Methods |
> |---|---|
> | **Manipulate the data distribution** | **Bagging**, **Boosting** ← *in syllabus* |
> | **Manipulate the input features** | **Random forests** ← *in syllabus* |
> | **Manipulate the class labels** | Error-correcting output coding |

---

**Next:** parallel learners on resampled data — **bagging**.
