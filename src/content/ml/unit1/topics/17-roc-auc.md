---
subject: ml
unit: 1
order: 17
slug: roc-auc
title: ROC Curves & AUC
summary: Why a threshold creates a curve, the full threshold sweep, reading ROC space (conservative/liberal/random/worse-than-random), discrete vs scoring classifiers, and AUC interpretation with a plotted example.
minutes: 20
tags: [ROC, AUC, threshold, TPR, FPR, sensitivity, specificity, scoring-classifier]
---

# ROC Curves & AUC

## Why we need another metric

**ROC (Receiver Operating Characteristics)** is a **combined metric** built from **TPR and FPR**. An ROC graph **depicts the relative trade-offs between benefits (true positives) and costs (false positives)**.

The motivation is two questions the single-number metrics cannot answer:

1. **How do we compare different classifiers?**
2. **How do we compare different *thresholds* for a single classifier** that produces a continuous output which must be mapped to a category?

That second question is the important one, and logistic regression is the reason it arises.

## Recap — where the threshold comes from

- Logistic regression is a statistical model used for **binary classification**, built on the **logistic / sigmoid function** $f(x) = \dfrac{1}{1+e^{-x}}$ — an **S-shaped curve that maps any real number into $(0,1)$, but never exactly to those limits**.
- It **predicts the probability** of an instance belonging to the default class: $P(Y = 1 \mid X) = h_\theta(X) = \dfrac{1}{1 + e^{-(\beta_0 + \beta_1 X)}}$, with $0 \le h_\theta(x) \le 1$.
- **That probability must be transformed into a binary value based on a *threshold*** — e.g. predict 1 (obese) if $P(X) \ge 0.5$, else 0.

> **Logistic regression is a classifier that produces a continuous-valued output (a probability) and uses a threshold (any value between 0 and 1) to predict the discrete-valued output (0 or 1).**

**So: how do we choose that threshold?** Each choice gives a *different* confusion matrix. ROC is the picture of all of them at once.

---

## One classifier, three thresholds

Obesity example, 8 samples, rows = actual:

**Threshold = 0.5**

| | Pred Obese | Pred Not Obese |
|---|---|---|
| **Actual Obese** | 3 | 1 |
| **Actual Not Obese** | 1 | 3 |

→ Sensitivity $= 3/4 = 0.75$, Specificity $= 3/4 = 0.75$, **FPR $= 0.25$**

**Threshold = 0.1** — *"if it was super important to correctly classify every obese sample…"*

| | Pred Obese | Pred Not Obese |
|---|---|---|
| **Actual Obese** | 4 | 0 |
| **Actual Not Obese** | 2 | 2 |

→ Sensitivity $= 1.0$ (**catches every obese sample**), Specificity $= 0.5$, **FPR $= 0.5$**

**Threshold = 0.9**

| | Pred Obese | Pred Not Obese |
|---|---|---|
| **Actual Obese** | 3 | 1 |
| **Actual Not Obese** | 0 | 4 |

→ Sensitivity $= 0.75$, Specificity $= 1.0$, **FPR $= 0$**

> [!INTUITION]
> **Lowering the threshold classifies more items as positive, so it increases both False Positives and True Positives.** Raising it decreases both. You cannot move one without moving the other — **that trade-off *is* the ROC curve.** Each threshold is one point on it.

---

## Worked threshold sweep (10 samples)

| ID | Actual | Predicted probability | $>0.6$ | $>0.7$ | $>0.8$ |
|---|---|---|---|---|---|
| 1 | 0 | 0.98 | 1 | 1 | 1 |
| 2 | 1 | 0.67 | 1 | 0 | 0 |
| 3 | 1 | 0.58 | 0 | 0 | 0 |
| 4 | 0 | 0.78 | 1 | 1 | 0 |
| 5 | 1 | 0.85 | 1 | 1 | 1 |
| 6 | 0 | 0.86 | 1 | 1 | 1 |
| 7 | 0 | 0.79 | 1 | 1 | 0 |
| 8 | 0 | 0.89 | 1 | 1 | 1 |
| 9 | 1 | 0.82 | 1 | 1 | 1 |
| 10 | 0 | 0.86 | 1 | 1 | 1 |

There are 4 actual positives (2, 3, 5, 9) and 6 actual negatives.

| Metric | $>0.6$ | $>0.7$ | $>0.8$ |
|---|---|---|---|
| **TPR** | 0.75 | 0.5 | 0.5 |
| **FPR** | 1 | 1 | 0.66 |
| **TNR** | 0 | 0 | 0.33 |
| **FNR** | 0.25 | 0.5 | 0.5 |

> *"The metrics change with the changing threshold values. We could generate different confusion matrices and compare the various metrics — but that would not be prudent. Instead, we **generate a plot between some of these metrics** so that we can easily visualise which threshold gives a better result."*

---

## The ROC curve

> **ROC is a *probability curve* that plots the TPR against the FPR at various threshold values, and essentially separates the "signal" from the "noise".**

- **x-axis = False Positive Rate (FPR) = $1 -$ Specificity $= \dfrac{FP}{FP+TN}$**
- **y-axis = True Positive Rate (TPR) = Sensitivity $= \dfrac{TP}{TP+FN}$**

Sweeping the obesity classifier over all thresholds:

| Threshold | FPR | TPR |
|---|---|---|
| 0 *(all samples classified obese)* | 1 | 1 |
| 0.3 | 0.75 | 1 |
| 0.4 | 0.5 | 1 |
| 0.6 | 0.25 | 0.75 |
| 0.7 | 0 | 0.75 |
| 0.9 | 0 | 0.5 |

> **The ROC graph summarises all of the confusion matrices that each threshold produced.**

From this graph, **depending on how many false positives we are willing to accept**, the optimal operating point is either **(0, 0.75)** — no false alarms, catch three quarters — or **(0.5, 1)** — catch everything, at the cost of half the negatives being flagged.

---

## Reading ROC space

### The corner points

- **(0, 0)** — the strategy of **never issuing a positive classification**. Commits no false-positive errors, but gains no true positives either.
- **(1, 1)** — the opposite: **unconditionally issuing positive classifications**.
- **(0, 1)** — **perfect classification.** Everything positive caught, nothing negative flagged.

**Informally, one point in ROC space is better than another if it is to the *northwest*** (TPR higher, FPR lower, or both) — i.e. toward $(0,1)$.

### Conservative vs liberal

| | Where | Behaviour |
|---|---|---|
| **Conservative** | left-hand side, near the x-axis | **Makes positive classifications only with strong evidence** → few false positives, but often low TPR too |
| **Liberal** | upper right-hand side | **Makes positive classifications with weak evidence** → classifies nearly all positives correctly, but often high FPR |

### The diagonal line

**The diagonal $y = x$ represents the strategy of randomly guessing a class.**

- If a classifier randomly guesses positive **half the time**, it gets half the positives and half the negatives right → the point **(0.5, 0.5)**.
- If it guesses positive **90% of the time**, it gets 90% of the positives right, but its FPR also rises to 90% → **(0.9, 0.9)**.
- **A random classifier's ROC point simply "slides" back and forth along the diagonal** depending on how often it guesses positive.

A classifier plotted at, say, (0.7, 0.7) is **virtually random** — it is effectively guessing positive 70% of the time.

### The empty lower triangle

> **Any classifier appearing in the lower-right triangle performs *worse than random guessing*. This triangle is therefore usually empty in ROC graphs.**

The slides' verdict on a classifier down there: *"performs much worse than random — throw it away; instead flip a coin to take a decision (it is that useless)."*

> [!NOTE]
> Strictly, a classifier reliably **below** the diagonal is *informative*: **invert its predictions** and it mirrors to $(1-\text{FPR},\ 1-\text{TPR})$ — above the diagonal. A model that is consistently wrong is as useful as one that is consistently right; only a model *on* the diagonal is truly worthless.

---

## Discrete vs scoring classifiers

| | Output | ROC footprint |
|---|---|---|
| **Discrete classifier** | outputs **only a class label** (Y or N) | yields a **single confusion matrix** → **one point** in ROC space |
| **Probabilistic / scoring classifier** | naturally yields an **instance probability or score** — a numeric value representing the degree to which an instance is a member of a class (e.g. Naive Bayes, a neural network, logistic regression) | can be combined with a threshold to produce a discrete classifier; **each threshold value produces a different point** → a **curve** |

**But discrete classifiers can be converted into scoring classifiers** by "looking inside" at the instance statistics they keep:

- **A decision tree determines the class label of a leaf node from the *proportion of instances* at that node** — the class decision is just the most prevalent class. **Those class proportions may serve as a score.**
- One can use **bagging** to generate an ensemble of discrete classifiers, each producing a vote; **the set of votes can be used to generate a score**.

> [!TRAP]
> "Decision trees cannot have an ROC curve" is **false**, and it's a favourite MCQ. A plain decision tree gives one point; a decision tree whose leaves report class *proportions* gives a full curve.

---

## AUC — Area Under the ROC Curve

To compute ROC points we could evaluate a logistic regression model many times at different thresholds, **but this would be inefficient**. Fortunately there is an efficient, **sorting-based** algorithm that provides this information — and summarises it as **AUC**.

> **AUC measures the entire two-dimensional area underneath the entire ROC curve** (think integral calculus) **from (0,0) to (1,1)**. It provides an **aggregate measure of performance across all possible classification thresholds**.

> **The higher the AUC, the better the model is at distinguishing between the positive and negative classes.** More AUC = better model — which is how we compare two models and select the best for our problem.

### Interpretation table

| AUC | Meaning |
|---|---|
| **1** | The classifier **perfectly distinguishes** all positive and negative class points |
| **$0.5 < \text{AUC} < 1$** | There is a **high chance** the classifier can distinguish positives from negatives |
| **0.5** | The classifier is **not able to distinguish** positives from negatives — it is predicting a random class or a constant class for all points |
| **0** | The classifier **predicts all negatives as positives and all positives as negatives** — perfectly wrong (and therefore perfectly invertible) |

> [!INTUITION]
> There's an equivalent probabilistic reading worth knowing: **AUC is the probability that the model ranks a randomly chosen positive example above a randomly chosen negative one.** AUC = 0.5 means a coin flip decides the ordering; AUC = 1 means every positive scores above every negative. This also explains why AUC is **threshold-free** — it's a statement about *ranking*, not about any particular cut-off.

---

## Worked example — plot the ROC curve and find AUC

Rule: predict 1 if $\hat y \ge$ threshold.

| Actual $y$ | Predicted $\hat y$ | $t{=}0$ | $t{=}0.2$ | $t{=}0.4$ | $t{=}0.6$ | $t{=}0.8$ | $t{=}1$ |
|---|---|---|---|---|---|---|---|
| 1 | 0.8 | 1 | 1 | 1 | 1 | 1 | 0 |
| 0 | 0.6 | 1 | 1 | 1 | 1 | 0 | 0 |
| 1 | 0.4 | 1 | 1 | 1 | 0 | 0 | 0 |
| 0 | 0.2 | 1 | 1 | 0 | 0 | 0 | 0 |
| **FPR** | | 1 | 1 | 0.5 | 0.5 | 0 | 0 |
| **TPR** | | 1 | 1 | 1 | 0.5 | 0.5 | 0 |

*(Positives are rows 1 and 3; negatives are rows 2 and 4, so each contributes 0.5 to its rate.)*

Plotting (FPR, TPR) gives the staircase

$$(0,0) \to (0,\,0.5) \to (0.5,\,0.5) \to (0.5,\,1) \to (1,\,1)$$

**Area under it:**

$$\text{AUC} = \underbrace{0.5 \times 0.5}_{\text{first block}} + \underbrace{0.5 \times 1}_{\text{second block}} = 0.25 + 0.5 = \mathbf{0.75}$$

> [!EXAM]
> The full-marks recipe for "plot the ROC and find AUC": (1) sort by predicted score descending; (2) for each candidate threshold build the predicted column; (3) compute **FPR and TPR** rows — always divide by the **class totals**, not by $N$; (4) plot the points and join them; (5) find the area as a sum of rectangles/trapeziums. State the AUC value **and** one sentence interpreting it.

> [!TRAP]
> Two easy losses: (a) putting **TPR on the x-axis** — the x-axis is **FPR**, always; (b) dividing FPR by the total number of samples instead of by the **number of actual negatives**. Write "P = ⟨count⟩, N = ⟨count⟩" at the top of your working and you won't do either.

---

## Choosing the operating point

AUC tells you which model is better *overall*; it does not tell you **where to sit on the curve**. That choice comes back to the cost asymmetry from the very first topic:

- **Cancer screening / fraud detection** — a false negative is catastrophic → **lower the threshold**, accept a high FPR, move up-and-right.
- **Spam filtering / criminal conviction** — a false positive is catastrophic → **raise the threshold**, move down-and-left.

> [!NOTE]
> This is where the unit closes the loop. Mitchell's ⟨P, T, E⟩ said the performance measure **P** is part of the problem definition, and that fraud detection needs *"a higher penalty when fraud is labelled as not-fraud"*. ROC is the tool that lets you **act** on that statement: same model, same data, different point on the curve.

---

**End of Unit 1.** The thread through all seventeen topics: choose a hypothesis space, search it with some bias, and measure honestly what you got.
