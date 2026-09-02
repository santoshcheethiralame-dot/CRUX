---
subject: ml
unit: 1
order: 16
slug: performance-metrics
title: Confusion Matrix & Classification Metrics
summary: TP/FP/TN/FN, Type I and II errors, accuracy and why it fails on imbalanced data, precision, recall, specificity, F1, and the full multi-class treatment with worked problems.
minutes: 24
tags: [confusion-matrix, accuracy, precision, recall, specificity, f1-score, multi-class, class-imbalance]
---

# Confusion Matrix & Classification Metrics

After feature engineering and implementing a model we get an output — a class, or a probability. **Effectiveness is measured by metrics computed from the model and the test set.** For classification: **Accuracy, Precision, Recall, Specificity**, and (next topic) **ROC** and **AUC**.

---

## The confusion matrix

Given a classifier and an instance, there are **four possible outcomes**:

| | |
|---|---|
| **TP — True Positive** | the instance is **positive** and is classified as **positive** |
| **FN — False Negative** | the instance is **positive** and is classified as **negative** |
| **TN — True Negative** | the instance is **negative** and is classified as **negative** |
| **FP — False Positive** | the instance is **negative** and is classified as **positive** |

Given a classifier and a set of instances (the test set), a **two-by-two confusion matrix** (also called a **contingency table**) can be constructed representing the dispositions of the set of instances. **This matrix forms the basis for many common metrics.**

> [!INTUITION]
> **The naming rule, and it never fails:**
> - **The word Positive/Negative indicates the *prediction* made by the model.**
> - **The word True/False indicates whether that prediction was *right or wrong*.**
>
> So "False Negative" = *the model said Negative, and it was wrong* = the truth was positive. Read the second word first.

The course's canonical layout — **rows = ACTUAL, columns = PREDICTED**:

```
                          PREDICTED
                     POS (1)      NEG (0)
   ACTUAL  POS (1)      TP           FN      ← Type II error
   ACTUAL  NEG (0)      FP           TN
                         ↑
                    Type I error
```

> [!TRAP]
> **You may also see it transposed** (rows = predicted, columns = actual) — the slides show both. **Always read the axis labels before you compute anything.** Getting the orientation wrong swaps FP and FN, which swaps precision and recall, and silently destroys every number after it.

**Also memorise: FP and FN are Type I and Type II errors respectively** (the same convention as in statistics / your IDS course).

### Question

*200 objects, 100 from class A and 100 from class B. The model correctly predicted 60 of the positive class A and correctly predicted 30 of the negative class B. Find the total number of correct and wrong predictions.*

**Solution.** $N = 200$: **TP = 60, FN = 40, FP = 70, TN = 30**

- **Total correct** $= 60 + 30 = \mathbf{90}$
- **Total wrong** $= 70 + 40 = \mathbf{110}$

> [!NOTE]
> **How do we decide which class is "positive"?** Usually **whatever is considered "good" or "of interest" is taken as positive**, but it depends on the application context. In fraud detection the *fraud* is the positive class even though it's the bad outcome — because it's the thing you're hunting. **Take care when interpreting the values of the matrix — this is the most important thing.**

---

## Accuracy

> **Accuracy is the number of correct predictions made by the model over all kinds of predictions made.**

$$\boxed{\ \text{Accuracy} = \frac{TP + TN}{TP + TN + FP + FN}\ }$$

**Accuracy is generally a good measure only when the target variable classes are nearly balanced.**

### Why accuracy fails on imbalanced data

**Fraud detection.** Training distribution: 990 normal transactions, 10 fraudulent. On a test set of 100 transactions, **a naive program that calls every transaction normal achieves 98% accuracy** — while catching **zero** frauds.

> **Accuracy = 98% is not a good measure of the classifier when the dataset is imbalanced.**

And note our interest here is precisely **to catch all the fraudulent transactions correctly** — the metric is measuring the wrong thing.

> [!TRAP]
> This is the single most important idea in the topic. Whenever a question mentions **rare disease, fraud, defect detection, or "only 2% of the data is positive"**, accuracy is a trap and the expected answer involves **recall**, **precision**, **F1** or **ROC/AUC**.

### Class skew

> **Any performance metric that uses values from *both* classes will be inherently sensitive to class skews.** Metrics such as **accuracy, precision and F-score** use values from both the positives and the negatives of the confusion matrix.

---

## Precision

> **Precision: "How many of the cases we *called* positive actually are positive?"**

$$\boxed{\ \text{Precision} = \frac{TP}{TP + FP}\ }$$

The $FP$ in the denominator means: *in reality the instance belonged to the negative class but was falsely predicted as positive*. Precision is a **column** statistic — it is computed over the **predicted-positive** column.

## Recall (Sensitivity / True Positive Rate / Hit rate)

> **Recall: "How many of the positive cases did we catch correctly?"**

$$\boxed{\ \text{Recall} = \frac{TP}{TP + FN}\ }$$

Recall is a **row** statistic — computed over the **actual-positive** row.

> [!INTUITION]
> **Precision is about not crying wolf. Recall is about not missing the wolf.**
> - A classifier that flags exactly one obvious fraud and nothing else has **precision 1.0** and **terrible recall**.
> - A classifier that flags every transaction has **recall 1.0** and **terrible precision**.
>
> The three Venn pictures in the slides are exactly these three regimes: high-recall/low-precision, low-recall/high-precision, and high-recall/high-precision.

## Specificity (True Negative Rate)

> **Specificity: "How many of the negative cases did we catch correctly?"**

$$\boxed{\ \text{Specificity} = \frac{TN}{TN + FP}\ }$$

## F1 Score

Let us find a measure that **combines both recall and precision**. Recall that

$$\text{Arithmetic Mean} = \frac{x+y}{2}, \qquad \textbf{Harmonic Mean} = \frac{2xy}{x+y}$$

> **F1 Score = the *harmonic mean* of precision and recall.**

$$\boxed{\ F_1 = \frac{2 \times \text{Precision} \times \text{Recall}}{\text{Precision} + \text{Recall}}\ }$$

**Interpretation:**

- **The higher the F1 score the better**, with **0 the worst possible and 1 the best**.
- **It reaches its optimum of 1 only if precision and recall are both 100%.**
- Precision = fraction of true positives out of **total predicted positives**; Recall = fraction of true positives out of **total actual positives**.
- **F1 is a balance between the two** — the model's capacity to predict positives correctly, out of both actual *and* predicted positives.

> [!INTUITION]
> **Why harmonic and not arithmetic?** Because the harmonic mean is **dominated by the smaller value**. Precision 1.0 with recall 0.02 gives an arithmetic mean of 0.51 (looks fine!) but an **F1 of 0.039** (correctly awful). The harmonic mean refuses to let one good number hide one terrible number — which is exactly what you want from a combined metric.

---

## The full list of rates

| Symbol | Name(s) | Formula | Meaning |
|---|---|---|---|
| **TPR** | True Positive Rate / **Recall** / **Sensitivity** | $\dfrac{TP}{TP+FN}$ | # of positives **correctly** classified |
| **FNR** | False Negative Rate | $\dfrac{FN}{TP+FN}$ | # of positives **incorrectly** classified |
| **TNR** | True Negative Rate / **Specificity** | $\dfrac{TN}{TN+FP}$ | # of negatives **correctly** classified |
| **FPR** | False Positive Rate / **$1 -$ Specificity** | $\dfrac{FP}{TN+FP}$ | # of negatives **incorrectly** classified |
| **Precision** | Positive Predictive Value | $\dfrac{TP}{TP+FP}$ | fraction of TP out of total *predicted* positives |
| **NPV** | Negative Predictive Value | $\dfrac{TN}{TN+FN}$ | fraction of TN out of total *predicted* negatives |
| **Accuracy** | — | $\dfrac{TP+TN}{\text{all}}$ | correct predictions over all predictions |
| **F1** | — | harmonic mean(P, R) | combined metric |

Note the useful identities: **TPR + FNR = 1** and **TNR + FPR = 1**.

**The metric grid** — where each one lives on the matrix:

```
                            PREDICTED
                  ┌───────────────┬───────────────┐
                  │      POS      │      NEG      │
   ┌──────────────┼───────────────┼───────────────┤
   │ ACTUAL  POS  │      TP       │      FN       │ ─→ Sensitivity / Recall
   │              │               │  (Type II)    │      = TP / (TP + FN)
   ├──────────────┼───────────────┼───────────────┤
   │ ACTUAL  NEG  │      FP       │      TN       │ ─→ Specificity
   │              │   (Type I)    │               │      = TN / (TN + FP)
   └──────────────┴───────────────┴───────────────┘
                          │               │
                          ▼               ▼
                     Precision           NPV                Accuracy
                   = TP / (TP+FP)    = TN / (TN+FN)    = (TP+TN) / all
```

> [!EXAM]
> **Rows are about reality, columns are about the prediction.** Sensitivity and specificity are **row-normalised**; precision and NPV are **column-normalised**. If you remember that one sentence you can rebuild every formula in the table under exam pressure without memorising any of them.

---

## Fully worked binary problem

*A binary classifier on $n = 165$ instances: TP = 100, FN = 5 (Type II), FP = 10 (Type I), TN = 50.*

| Metric | Question it answers | Working | Value |
|---|---|---|---|
| **Accuracy** | Overall, how often is the classifier correct? | $\dfrac{100+50}{165}$ | **0.91** |
| **Precision** | When it predicts yes, how often is it correct? | $\dfrac{100}{100+10}$ | **0.91** |
| **Recall** | When it's actually yes, how often does it predict yes? | $\dfrac{100}{100+5}$ | **0.95** |
| **Specificity** | When it's actually no, how often does it predict no? | $\dfrac{50}{10+50}$ | **0.83** |
| **F1 Score** | Combined | $\dfrac{2(0.95)(0.91)}{0.95+0.91}$ | **0.93** |

---

## Multi-class confusion matrices

A confusion matrix that deals with **more than 2 classes**. Just like the 2-class matrix, it describes the performance of a multi-class classification model — but now it is $c \times c$ with the correct predictions along the **diagonal**.

### The general rule (this is all you need)

Using notation $P(\text{Actual},\ \text{Prediction})$, for class $i$:

| | Where it lives |
|---|---|
| **TP** | the diagonal cell $(i, i)$ |
| **FN** | the **rest of row $i$** |
| **FP** | the **rest of column $i$** |
| **TN** | everything **not** in row $i$ and not in column $i$ |

**Example — a 3-class Husky / Labrador / Bulldog matrix.** For the **Husky** class:

| | |
|---|---|
| True Positive | $P(H,H)$ |
| True Negative | $P(L,L) + P(L,B) + P(B,L) + P(B,B)$ |
| False Positive | $P(L,H) + P(B,H)$ — the Husky **column** minus the diagonal |
| False Negative | $P(H,L) + P(H,B)$ — the Husky **row** minus the diagonal |

> [!TRAP]
> Two slides in the deck contain **typos** here — the Labrador FP is printed as $P(H,L) + P(L,B)$ (it should be $P(H,L) + P(B,L)$, the Labrador *column*), and the Bulldog TN repeats $P(B,B)$ where it should read $P(L,L)$. **Trust the column/row rule, not the printed expansion.** If your FP and FN for a class overlap in any cell, you've made this mistake.

### The derived metrics

**Accuracy = sum of the diagonal ÷ sum of all cells:**

$$\text{Accuracy} = \frac{P(H,H) + P(L,L) + P(B,B)}{\sum \text{all cells}}$$

**Precision = diagonal cell ÷ its COLUMN total:**

$$\text{Precision}(H) = \frac{P(H,H)}{P(H,H) + P(L,H) + P(B,H)}$$

**Recall = diagonal cell ÷ its ROW total:**

$$\text{Recall}(H) = \frac{P(H,H)}{P(H,H) + P(H,L) + P(H,B)}$$

### Practice problem — evaluate this matrix

Rows = Actual, columns = Predicted:

| | **A** | **B** | **C** | **D** |
|---|---|---|---|---|
| **A** | **100** | 80 | 10 | 10 |
| **B** | 0 | **9** | 0 | 1 |
| **C** | 0 | 1 | **8** | 1 |
| **D** | 0 | 1 | 0 | **9** |

Total $N = 200 + 10 + 10 + 10 = 230$.

$$\text{Accuracy} = \frac{100 + 9 + 8 + 9}{230} = \frac{126}{230} = \mathbf{0.548}$$

Per class:

| class | TP | FP (rest of column) | FN (rest of row) | Precision | Recall |
|---|---|---|---|---|---|
| **A** | 100 | $0+0+0 = 0$ | $80+10+10 = 100$ | $\tfrac{100}{100} = 1$ | $\tfrac{100}{200} = \tfrac12$ |
| **B** | 9 | $80+1+1 = 82$ | $0+0+1 = 1$ | $\tfrac{9}{91}$ | $\tfrac{9}{10}$ |
| **C** | 8 | $10+0+0 = 10$ | $0+1+1 = 2$ | $\tfrac{8}{18}$ | $\tfrac{8}{10}$ |
| **D** | 9 | $10+1+1 = 12$ | $0+1+0 = 1$ | $\tfrac{9}{21}$ | $\tfrac{9}{10}$ |

**Macro-averaging** (the mean of the per-class values):

$$\text{Avg Precision} = \frac{1 + 0.099 + 0.444 + 0.429}{4} = \mathbf{0.492}$$
$$\text{Avg Recall} = \frac{0.5 + 0.9 + 0.8 + 0.9}{4} = \mathbf{0.775}$$
$$F_1 = \frac{2(0.492)(0.775)}{0.492 + 0.775} = \mathbf{0.601}$$

> [!INTUITION]
> Look at class A: **precision 1.0, recall 0.5.** The model **never** wrongly calls something an A — but it misses **half** of the real A's, dumping 80 of them into B. Precision alone would have called this a perfect classifier for A. That gap is exactly what F1 is designed to expose.

---

## More short worked examples

### Medical

| Patients \ Diagnosis | Diagnosed sick | Diagnosed healthy |
|---|---|---|
| **Sick** | 1000 | 200 |
| **Healthy** | 800 | 8000 |

- **Accuracy** — *out of all the patients, how many did we classify correctly?* $\dfrac{1000+8000}{10000} = \mathbf{90\%}$
- **Precision** — *out of the patients we diagnosed with an illness, how many did we classify correctly?* $\dfrac{1000}{1000+800} = \mathbf{55.7\%}$
- **Recall** — *out of the sick patients, how many did we correctly diagnose as sick?* $\dfrac{1000}{1000+200} = \mathbf{83.3\%}$

### Spam

| E-mail \ Folder | Spam folder | Inbox |
|---|---|---|
| **Spam** | 100 | 170 |
| **Not spam** | 30 | 700 |

- **Accuracy** $= \dfrac{100+700}{1000} = \mathbf{80\%}$
- **Precision** — *out of all the e-mails sent to the spam folder, how many were actually spam?* $\dfrac{100}{100+30} = \mathbf{76.9\%}$
- **Recall** — *out of all the spam e-mails, how many were correctly sent to the spam folder?* $\dfrac{100}{100+170} = \mathbf{37\%}$

> [!INTUITION]
> Same matrix, **precision 76.9% but recall only 37%**. This filter almost never puts real mail in the spam folder (good — that's the expensive error) but it lets nearly two thirds of spam through. **Which do you want?** For a spam filter, high precision is worth low recall; for cancer screening, the opposite. **The metric you optimise is a product-design decision, not a maths one.**

### Geometric versions

- *"Find TP, FP, TN, FN for the given graph, where blue is positive and red is negative"* (a line separates the plane; points above are guessed positive): **TP = 6, FN = 1, FP = 2, TN = 5.**
- From the same figure: **Precision $= \tfrac68$** (out of the points we predicted positive, how many are correct) and **Recall $= \tfrac67$** (out of the points labelled positive, how many did we correctly predict).

> [!EXAM]
> Standard 5–10 mark question: *"Given the following confusion matrix, compute accuracy, precision, recall, specificity and F1."* Write the matrix with axis labels, identify TP/FP/TN/FN explicitly (a numbered list), then each formula → substitution → value. Do **not** skip the substitution line; that's where the method marks are.

---

**Next:** what happens when the classifier outputs a *probability* rather than a class — thresholds, ROC and AUC.
