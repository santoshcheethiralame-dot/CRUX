---
subject: iot
unit: 4
order: 5
slug: ml-types
title: Supervised, Unsupervised & Reinforcement Learning
summary: The three ML paradigms, their IoT tasks (classification/regression, clustering/anomaly/dimensionality reduction), autoencoders, and semi-supervised hybrids.
minutes: 12
tags: [supervised, unsupervised, reinforcement, clustering, autoencoder]
---

# Supervised, Unsupervised & Reinforcement Learning

Machine learning comes in three paradigms, distinguished by **what the data looks like and how the model learns.**

| Paradigm | One-liner | Learns from |
|---|---|---|
| **Supervised** | Learning from **labelled** data | Input–output pairs (features → known answer) |
| **Unsupervised** | Finding **hidden patterns** | Unlabelled data (structure only) |
| **Reinforcement** | Learning by **interaction** | Trial and error via rewards/penalties |

## Supervised learning — labelled data

The algorithm trains on **input–output pairs** where correct answers (labels) are known, to predict/classify future data. IoT is a great fit: devices emit rich, timestamped signals with natural labels (failure/normal, defect/no-defect, disease class…).

| Task | IoT targets | Algorithms |
|---|---|---|
| **Classification** | fault vs healthy, anomaly type, pass/fail, activity class | Decision Trees, Random Forest, SVM, Neural Nets |
| **Regression** | RUL (remaining useful life), energy demand, time-to-failure, yield | Linear Regression, … |

> [!NOTE]
> **Prefer supervised** when you can define "success" precisely, obtain labels at reasonable cost, and need **measurable, SLA-grade accuracy** (e.g., false negatives < 1%).

## Unsupervised learning — no labels

The data has **no labels**; the algorithm finds structure itself. Essential in IoT because labelling the flood of raw sensor data manually is **expensive and slow**. Three key tasks:

| Task | What it does | IoT example |
|---|---|---|
| **Clustering** | Groups similar data points | Group smart-home energy patterns by household/time |
| **Anomaly detection** | Flags points far from normal | A vibration/power surge → impending machine failure |
| **Dimensionality reduction** | Fewer variables, key info kept | Compress hundreds of readings into a few KPIs |

**Algorithms:** K-Means, hierarchical clustering, **PCA**, autoencoders.

### Autoencoders for anomaly detection

> [!INTUITION]
> An **autoencoder** is a neural net that learns to **compress then reconstruct** normal data. Train it only on *normal* motor vibration; it reconstructs normal patterns with low error. When an **abnormal** vibration appears, it can't reconstruct it well → **high reconstruction error → anomaly alert**. The model never saw a fault label — it just knows "this doesn't look normal." (VAEs and Self-Organizing Maps extend this to complex, non-linear data.)

## Reinforcement learning — trial and error

The model learns by **trial and error** through **rewards or penalties**, suited to continuous decision-making.

- **Examples:** autonomous robots learning navigation; smart grids optimising power; drones adjusting flight paths dynamically.

> [!INTUITION]
> RL is **learning like training a pet** — no labelled answer key, just rewards for good outcomes and penalties for bad ones, until the agent discovers a good policy. It fits IoT problems that are *sequential decisions* (navigate, optimise, control) rather than *one-shot predictions*.

## Semi-supervised — the hybrid

Real IoT often combines paradigms: **unsupervised** learning first finds clusters/anomalies, the results are **partially labelled**, then fed into a **supervised** model — blending pattern discovery with prediction accuracy.

*Example:* cluster energy usage → label clusters "efficient / average / inefficient" → train a supervised classifier to auto-categorise new data.

> [!EXAM]
> Know the **three paradigms** (supervised=labelled, unsupervised=unlabelled patterns, reinforcement=reward/penalty) with **IoT examples and algorithms**; the **unsupervised tasks** (clustering, anomaly detection, dimensionality reduction); how an **autoencoder detects anomalies** (reconstruction error); and the **semi-supervised hybrid**. Predictive maintenance = supervised; intrusion/fault anomaly detection = unsupervised.

---

**Next:** the most interpretable supervised classifier — the decision tree.
