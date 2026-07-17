---
subject: ml
unit: 1
order: 14
slug: performance-metrics
title: Performance Metrics
summary: Confusion matrix, accuracy/precision/recall/F1/specificity, multi-class metrics, and ROC/AUC.
minutes: 20
tags: [confusion-matrix, precision, recall, f1, roc, auc]
---

# Performance Metrics

After a model predicts, we measure it on **test data**. Choosing the *right* metric is as important as the model.

## The confusion matrix

For a binary classifier, every prediction is one of four outcomes:

|  | Predicted Positive | Predicted Negative |
|---|---|---|
| **Actual Positive** | **TP** (true positive) | **FN** (false negative) — *Type II error* |
| **Actual Negative** | **FP** (false positive) — *Type I error* | **TN** (true negative) |

Read the labels as: **True/False** = was the prediction *right*? **Positive/Negative** = what did the model *predict*?

## The core metrics

| Metric | Formula | Question it answers |
|---|---|---|
| **Accuracy** | $\dfrac{TP+TN}{TP+TN+FP+FN}$ | Of all predictions, how many were right? |
| **Precision** | $\dfrac{TP}{TP+FP}$ | Of those *predicted positive*, how many really are? |
| **Recall** (Sensitivity, TPR) | $\dfrac{TP}{TP+FN}$ | Of all *actual positives*, how many did we catch? |
| **Specificity** (TNR) | $\dfrac{TN}{TN+FP}$ | Of all *actual negatives*, how many did we catch? |
| **F1 score** | $\dfrac{2\cdot P\cdot R}{P+R}$ | Harmonic mean of precision & recall |

Rate family: **FNR** $=\frac{FN}{TP+FN}=1-\text{Recall}$, **FPR** $=\frac{FP}{TN+FP}=1-\text{Specificity}$.

## Why accuracy isn't enough — class imbalance

> [!TRAP]
> **Fraud detection:** 990 normal, 10 fraud. A lazy classifier that labels **everything "normal"** gets **~98–99% accuracy** — while catching **zero** fraud. Accuracy is misleading on **imbalanced** data. Any metric that mixes both classes (accuracy, precision, F1) is sensitive to class skew.

## Precision vs Recall — which to optimise?

> [!INTUITION]
> **Precision** matters when **false positives are costly**; **recall** matters when **false negatives are costly**.
> - **Spam filter → precision.** A real email lost to the spam folder (FP) is bad; a spam that slips into the inbox (FN) is just annoying.
> - **Cancer / fraud detection → recall.** Missing a real case (FN) is catastrophic; a false alarm (FP) just triggers more checks.

The **F1 score** balances the two; it's the **harmonic** mean (not arithmetic) so it punishes a low value in *either*. F1 = 1 only when **both** precision and recall are 1; F1 = 0 in the worst case.

## Worked binary example

|  | Pred Positive | Pred Negative |
|---|---|---|
| **Actual Positive** | TP = 100 | FN = 5 |
| **Actual Negative** | FP = 10 | TN = 50 |

$n=165$.

- Accuracy $= \frac{100+50}{165} = 0.91$
- Precision $= \frac{100}{100+10} = 0.91$
- Recall $= \frac{100}{100+5} = 0.95$
- Specificity $= \frac{50}{10+50} = 0.83$
- F1 $= \frac{2(0.95)(0.91)}{0.95+0.91} = 0.93$

## Multi-class confusion matrix

For $K$ classes you get a $K\times K$ matrix; the **diagonal = correct**. Metrics are computed **per class** in a *one-vs-rest* style. For class $i$: $TP_i$ = cell $(i,i)$; $FP_i$ = rest of column $i$; $FN_i$ = rest of row $i$.

$$\text{Accuracy} = \frac{\sum_i \text{cell}(i,i)}{\text{all cells}}, \quad \text{Precision}_i = \frac{TP_i}{\text{column}_i\text{ sum}}, \quad \text{Recall}_i = \frac{TP_i}{\text{row}_i\text{ sum}}$$

**Practice (4-class A,B,C,D).** With the matrix below (rows = actual):

| Act\Pred | A | B | C | D |
|---|---|---|---|---|
| A | 100 | 80 | 10 | 10 |
| B | 0 | 9 | 0 | 1 |
| C | 0 | 1 | 8 | 1 |
| D | 0 | 1 | 0 | 9 |

Accuracy $=\frac{100+9+8+9}{230}$. Per-class (e.g. A): $TP{=}100, FP{=}0, FN{=}100 \Rightarrow P{=}1, R{=}0.5$. Averaging → **avg precision ≈ 0.49, avg recall ≈ 0.78, F1 ≈ 0.60.**

## ROC and AUC

The **ROC curve** plots **TPR (recall) vs FPR** as the classification **threshold** sweeps from 1 down to 0. Each threshold gives one confusion matrix → one $(FPR, TPR)$ point.

- **(0,0)** — threshold so high nothing is called positive (no FP, no TP).
- **(1,1)** — threshold so low everything is called positive.
- **(0,1)** — top-left — **perfect** classifier.
- **Diagonal $y=x$** — random guessing. Points **below** it are worse than random.
- A classifier is **better** the further **north-west** (higher TPR, lower FPR) it sits.

> [!INTUITION]
> **Conservative** classifiers (low threshold to call positive only on strong evidence) sit lower-left — low FPR, low TPR. **Liberal** classifiers sit upper-right — high TPR but more false alarms. The ROC curve shows the whole tradeoff at once.

**AUC** (Area Under the ROC Curve) summarises it in one number:

| AUC | Meaning |
|---|---|
| **1.0** | Perfect separation of classes |
| **0.5** | No discrimination — random / constant guessing |
| **0.5 – 1.0** | Useful; higher = better |
| **0** | Perfectly *wrong* (predicts every class inverted) |

Higher AUC ⇒ better at distinguishing positive from negative across **all** thresholds — useful for comparing models independently of any single threshold.

**ROC practice.** Sweeping thresholds over predicted probabilities gives, e.g., FPR/TPR points $(1,1),(1,1),(0.5,1),(0.5,0.5),(0,0.5),(0,0)$ → a staircase curve with **AUC = 0.75**.

> [!EXAM]
> Highest-yield drills: (1) fill a confusion matrix and compute all five metrics; (2) argue **precision vs recall** for a given scenario; (3) explain why **accuracy fails on imbalanced data**; (4) plot an **ROC** point-by-point from a threshold table and read off AUC. Remember **Type I = FP**, **Type II = FN**, and **F1 = harmonic mean**.

---

🎉 **That completes Unit 1.** Consolidate with the **MCQ quiz** and **flashcards**, then attempt the **PYQs** once they're loaded.
