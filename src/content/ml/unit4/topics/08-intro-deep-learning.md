---
subject: ml
unit: 4
order: 8
slug: intro-deep-learning
title: Introduction to Deep Learning
summary: Deep learning's place under AI, ML vs DL, the hierarchy of learned features, and why DL took off.
minutes: 8
tags: [deep-learning, representation-learning, feature-hierarchy, ML-vs-DL]
---

# Introduction to Deep Learning

## What is deep learning?

Deep learning sits under the **AI umbrella**, as a subset of machine learning. The key difference:

> [!NOTE]
> - **Classical ML** uses algorithms designed for **specific tasks**, often relying on **hand-crafted features**.
> - **Deep learning** is **representation learning** across **multiple layers** — each layer transforms the previous layer's output, learning a **hierarchy of concepts** automatically. It's implemented with **deep neural networks** (neural networks with **many hidden layers**).

| | Machine Learning | Deep Learning |
|---|---|---|
| Features | hand-engineered | **learned automatically** |
| Data need | works with less | needs **large** data |
| Example tasks | spam detection, credit scoring | translation, face recognition, autonomous driving |

## The hierarchy of features

> [!INTUITION]
> **Face recognition example:** raw image → **input layer** detects local contrast (colour, luminosity) → **hidden layer 1** detects parts (eyes, nose, lips) → **hidden layer 2** assembles the whole face → **output**. Each layer builds **more abstract** features from simpler ones. More hidden layers ⇒ capacity to solve more complex problems. This automatic feature *hierarchy* is what "deep" means.

## Why deep learning took off

- **No feature engineering needed** — when there's a *lack of domain understanding* for hand-designing features, DL learns them itself.
- **Scalable** — performance **keeps improving as you feed more data** (unlike classical methods that plateau).
- **Compute + data** — modern GPUs (lots of computational power) and large labelled datasets made training deep nets practical.

**Types of deep networks:** CNNs (images), RNNs (sequences), **Generative Adversarial Networks (GANs)**, and **Transformers** (the focus later in this unit).

> [!EXAM]
> Be ready to contrast **ML vs DL** (hand-crafted vs learned features; less vs more data) and name the **three drivers** of DL's rise: **more compute, more data, better results in key applications** (speech/image/ad). The slide note: neural networks are *not* a brand-new field, and even experts must **iterate** through models (no "perfect first try").

---

**Next:** the deep network built for images — **Convolutional Neural Networks**.
