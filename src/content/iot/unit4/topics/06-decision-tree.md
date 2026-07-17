---
subject: iot
unit: 4
order: 6
slug: decision-tree
title: Decision Tree Classification
summary: The simplest, most interpretable classifier — structure, terminology (root/decision/leaf, splitting, pruning, entropy), how it works, and IoT applications.
minutes: 10
tags: [decision-tree, classification, entropy, information-gain, interpretable]
---

# Decision Tree Classification

> [!NOTE]
> **Classification** in IoT categorises sensor data or device behaviour into predefined classes — *Normal/Faulty*, *Safe/Critical*, *Walking/Running/Idle*. **Decision Trees** are among the **simplest and most interpretable** classifiers for these tasks.

## What is a decision tree?

> [!NOTE]
> A **decision tree** is a **flowchart-like** structure for classification or regression. It maps choices to outcomes, splitting data recursively on the features that give the **maximum information gain** (or **minimum impurity**).

| Part | Meaning |
|---|---|
| **Root node** | The first question / the entire dataset |
| **Internal (decision) nodes** | A decision based on an attribute (e.g., *temperature > 30 °C?*) |
| **Branches** | The outcomes of a decision (the paths taken) |
| **Leaf nodes** | The final classification (e.g., *"Faulty Device"*) |

### More terminology

- **Splitting** — breaking a node into smaller nodes based on an attribute.
- **Pruning** — trimming branches to stop the tree getting too complex (fights overfitting).
- **Entropy** — a measure of how "messy"/mixed-up the data is; the tree tries to **reduce** entropy at each split.

> [!INTUITION]
> A decision tree is just a **game of 20 questions**, automated. Each internal node asks the *most informative yes/no question* it can (the one that best separates the classes — highest **information gain**, biggest drop in **entropy**). Follow the answers down the branches until you hit a **leaf** — the answer. Its appeal in IoT is **interpretability**: you can read off *exactly why* a machine was flagged "faulty."

## How a decision tree works

1. **Start at the root** — a main question derived from the dataset's features.
2. **Ask yes/no questions** — split data into subsets by attribute.
3. **Branch on answers** — yes → one path, no → another.
4. **Keep splitting** — reducing the data step by step.
5. **Reach a leaf** — when no useful question remains, the leaf gives the final prediction.

> [!TRAP]
> The tree splits on the feature that **most reduces impurity** (max information gain / min entropy) — *not* an arbitrary or random feature. And **pruning** matters: an unpruned tree memorises noise (overfits); pruning keeps it general. (This connects to the bias–variance and ID3 ideas from the ML course.)

## Decision trees in IoT analytics

| IoT domain | Goal | Input features | Output class |
|---|---|---|---|
| **Smart home** | Device anomaly | Power usage, temperature, time | Normal / Faulty |
| **Smart agriculture** | Crop health | Soil moisture, humidity, leaf colour | Healthy / Diseased |
| **Industrial IoT** | Machine failure | Vibration, temperature, load | Working / Faulty |
| **Wearables** | Activity recognition | Accelerometer, gyroscope | Walking / Running / Sleeping |

> [!EXAM]
> Know the tree **structure** (root → internal/decision nodes → branches → leaves), the **terminology** (splitting, **pruning** = anti-overfit, **entropy** = impurity the tree minimises, **information gain**), the **how-it-works** steps, and a couple of **IoT classification examples** (machine Normal/Faulty from vibration/temp/load). Emphasise **interpretability** as the reason DTs are favoured in IoT.

---

**Next:** where all this analytics runs at scale — the IoT cloud.
