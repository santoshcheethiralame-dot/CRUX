---
subject: ml
unit: 1
order: 1
slug: introduction
title: Introduction to Machine Learning
summary: What ML is, Mitchell's <P, T, E> definition, well-posed learning problems, and the ML pipeline.
minutes: 12
tags: [definition, P-T-E, pipeline, 7-steps]
---

# Introduction to Machine Learning

## What is Machine Learning?

A traditional program is a fixed set of rules a human wrote: *input → rules → output*. Machine learning flips this. We feed the computer **data and the desired outputs**, and the algorithm itself discovers the rules: *input + output → rules (a model)*. Those learned rules then generalise to new, unseen inputs.

> [!NOTE]
> Tom Mitchell's textbook definition — memorise it verbatim, it is the single most quoted line in this course:
>
> *"A computer program is said to **learn** from experience **E** with respect to some class of tasks **T** and performance measure **P**, if its performance at tasks in T, as measured by P, improves with experience E."*
> — Tom Mitchell, *Machine Learning*, McGraw Hill, 1997.

## The `<P, T, E>` framework

Any well-posed learning problem must specify three things:

| Symbol | Name | Question it answers | Intuition |
|---|---|---|---|
| **T** | Task | What is the program trying to *do*? | The job |
| **P** | Performance measure | How do we *score* it? | The exam |
| **E** | Experience | What does it *learn from*? | The training data |

A learning problem is **well-posed** (or **well-defined**) when all three are stated unambiguously. We write it as the triple **`<P, T, E>`**.

> [!INTUITION]
> Think of a student (the program). **T** = the subject they study, **E** = the practice problems they grind, **P** = the marks in the final exam. Learning means: *more practice (E) → better marks (P) on the task (T)*.

## Identifying P, T, E — worked examples

You **will** be asked to write `<P, T, E>` for a scenario in the exam. The trick: the *task* is the prediction itself, the *experience* is the labelled dataset, and the *performance* is almost always a *fraction/accuracy* of correct predictions.

**1. Learning to play Checkers**

- **T:** Playing checkers.
- **E:** Playing practice games against itself.
- **P:** Fraction (%) of games won against opponents.

**2. Handwriting recognition**

- **T:** Recognising and classifying handwritten words within images.
- **E:** A database of handwritten words with given (correct) classifications.
- **P:** Fraction of words correctly classified.

**3. Self-driving car (robot driving)**

- **T:** Driving on a public highway using vision sensors.
- **E:** A sequence of images and steering commands recorded while observing a human driver.
- **P:** Average distance travelled before an error (human takes over).

**4. Email spam filter**

- **T:** Classify an email as spam / not-spam.
- **E:** A database of emails labelled spam / not-spam (or watching the user sort them).
- **P:** Fraction of emails correctly classified.

**5. Credit-card fraud detection**

- **T:** Label a transaction as fraud / not-fraud.
- **E:** Historical transactions labelled fraud / not-fraud.
- **P:** Accuracy of the classifier — **with a higher penalty when a fraud is missed** (labelled not-fraud).

> [!EXAM]
> When you design **P**, match it to what actually matters. For fraud or cancer, a missed positive (false negative) is catastrophic, so the performance measure should *weight* those errors more heavily — plain accuracy is the wrong score (see *Performance Metrics*).

## The Machine Learning pipeline

A model is not just "the algorithm." It is the end of a pipeline:

```
Dataset
  → Data Preprocessing  (cleaning · transformation · reduction)
  → Split the data      (training · validation · test)
  → Training Set → ML Algorithm → Model
  → Model Evaluation  (using validation/test sets)
       ├─ not satisfactory → loop back, retrain / tune
       └─ satisfactory → Predictive Model → Predictions (labels)
```

- **Training set** — the algorithm learns its parameters from this.
- **Validation set** — used to tune choices (e.g. tree depth, *k*) and to compare candidate models *without* touching the test set.
- **Test set** — touched **once**, at the very end, to get an *unbiased* estimate of performance on future unseen data.

> [!TRAP]
> Never tune on the test set. The moment you make a decision based on test performance, the test set is "contaminated" and no longer gives an honest estimate of real-world accuracy.

## The 7 steps to Machine Learning

A clean checklist version of the pipeline:

1. **Data Collection** — gather raw data.
2. **Data Preparation** — clean, encode, scale, split.
3. **Choosing a Model** — pick an algorithm suited to the task.
4. **Training** — fit parameters on the training set.
5. **Evaluation** — measure performance on held-out data.
6. **Parameter Tuning** — adjust hyper-parameters to improve it.
7. **Prediction** — deploy the model on new inputs.

> [!EXAM]
> The 7 steps and the `<P, T, E>` triple are classic 2–4 mark warm-up questions. Know them cold; they are free marks.

---

**Next:** how learning problems are categorised — *supervised, unsupervised, reinforcement*, and the rest.
