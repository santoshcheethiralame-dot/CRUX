---
subject: ml
unit: 1
order: 1
slug: introduction
title: What Machine Learning Is — ⟨P, T, E⟩
summary: Mitchell's definition, well-posed learning problems, the 6 canonical P-T-E examples, the ML pipeline and the train/validation/test split.
minutes: 14
tags: [definition, P-T-E, well-posed, pipeline, train-test-split]
---

# What Machine Learning Is — ⟨P, T, E⟩

## The two definitions you must be able to quote

**Arthur Samuel (informal, 1959):** machine learning is *the field of study that gives computers the ability to learn **without being explicitly programmed***.

**Tom Mitchell (formal, 1997)** — the one the exam wants:

> A computer program is said to **learn** from experience **E** with respect to some class of tasks **T** and performance measure **P**, if its performance at tasks in **T**, as measured by **P**, **improves with experience E**.

The slides also give the one-line version: *"Machine learning is the study of computer algorithms that allow computer programs to automatically improve through experience."* — Tom Mitchell, *Machine Learning*, McGraw Hill, 1997.

So a **well-posed (well-defined) learning problem** is fully specified by the triple

$$\langle P,\ T,\ E \rangle$$

- **T — Task**: what the program is supposed to *do*. Not the algorithm, not the data — the *job*.
- **P — Performance measure**: the number that says how well it did T.
- **E — Experience**: the training data / interaction the program improves from.

> [!TRAP]
> The single most common exam mistake is putting the *data-crunching* into T. In "learn to predict the weather", **T is "the weather prediction task"**, **not** "examining a large amount of historical weather data" (that's E) and **not** "the probability of correctly predicting tomorrow's weather" (that's P). This exact MCQ appears in the slide deck.

## The six canonical ⟨P, T, E⟩ examples

Memorise the shape, not the words — you'll be asked to invent one for a fresh scenario.

| # | Problem | **T** — Task | **E** — Experience | **P** — Performance |
|---|---|---|---|---|
| 1 | **Checkers** | Playing checkers | Playing practice games **against itself** | Fraction of games won |
| 2 | **Handwriting recognition** | Recognising & classifying handwritten words within images | Database of handwritten words **with given classification** | Fraction of correct words identified |
| 3 | **Self-driving car** | Driving on the road using a vision sensor | Sequence of images & steering commands recorded **while observing a human driver** | Average distance travelled **before an error** |
| 4 | **Text categorisation** | Assigning a document to its content category | Database of pre-classified documents | Fraction of documents correctly tagged |
| 5 | **Spam filter** | Classifying an email as spam / non-spam | Watching the user label emails; a labelled email database | Fraction of emails correctly classified |
| 6 | **Credit-card fraud** | Assigning "fraud / not fraud" to a transaction | Historical transactions labelled fraud / not fraud | Accuracy of the classifier, **with a higher penalty when fraud is labelled as not-fraud** |

> [!EXAM]
> Example 6 is the interesting one. The performance measure is **asymmetric**: a missed fraud (false negative) costs far more than a false alarm (false positive). Whenever a question says "some errors are worse than others", the answer lives in **P**, not in the algorithm. This is the same idea that later justifies caring about **recall** over accuracy, and about **where you put the threshold** on an ROC curve.

> [!INTUITION]
> Reading a ⟨P,T,E⟩ statement aloud should sound like a job advert: *"You will do **T**. You'll learn on the job from **E**. Your appraisal is **P**."* If any of the three is missing, the learning problem is not well-posed — you literally cannot tell whether the program has learned anything.

## The 7 steps of a machine learning project

From the slides, in order:

```
STEP 1  Data Collection
STEP 2  Data Preparation
STEP 3  Choosing a Model
STEP 4  Training
STEP 5  Evaluation
STEP 6  Parameter Tuning
STEP 7  Prediction
```

Note the loop that is implicit between 5 and 6: you evaluate, tune, and re-evaluate. **Step 7 (prediction on genuinely new data) is the only step that happens after the model is frozen.**

## The pipeline and the three-way split

```
                     ┌──────────── 80% ────────────┐
   Dataset  ──split──┤        Training data        ├─→ ML algorithm ─→ MODEL
                     └──────────── 20% ────────────┘                     │
                                Test data ─────────────────────────────→ ├─→ Prediction
```

The two-way split (train / test) is the version you'll draw most often, but the honest version is a **three-way split**:

| Subset | What it is used for | Touched during training? |
|---|---|---|
| **Training set** | **Learn** — fit the model's parameters | Yes, constantly |
| **Validation set** | **Compare** — select between models, tune hyper-parameters, decide when to stop / prune | Yes, but only to *choose*, never to fit parameters |
| **Test set** | **Evaluate** — one unbiased estimate of accuracy on future unseen examples | **No — used exactly once, at the very end** |

> [!TRAP]
> If you tune on the test set, the test set stops being a test set — its estimate becomes optimistically biased and worthless. That's the whole reason the validation set exists. You'll meet this split again, concretely, in **reduced-error pruning** (the validation set decides which nodes to cut) and in **choosing $k$ for k-NN**.

> [!NOTE]
> 80:20 is a convention, not a law. Mitchell's common heuristic for the pruning case is to **withhold one third for validation and train on the other two thirds**. With little data you'd instead use cross-validation, which recycles every example as both train and validation.

## Where the rest of the unit hangs off this

Everything else in Unit 1 is one of these three things:

- **A choice of hypothesis space** — conjunctive rules (Find-S), decision trees (ID3), a sigmoid of a linear score (logistic regression), or *no explicit hypothesis at all* (k-NN).
- **A search strategy through that space** — general-to-specific hill climbing, greedy information-gain splitting, gradient descent, or "just store everything".
- **A performance measure** — accuracy, precision/recall/F1, specificity, ROC/AUC, MSE.

> [!EXAM]
> Typical 2–5 mark openers: *"Define machine learning as per Tom Mitchell"*, *"What is a well-posed learning problem?"*, *"Identify T, P and E for &lt;scenario&gt;"*, *"Why do we need a validation set separate from the test set?"* All four are answered by this page.

---

**Next:** the taxonomy of learning — supervised, unsupervised, reinforcement, and the semi-/self-supervised middle ground.
