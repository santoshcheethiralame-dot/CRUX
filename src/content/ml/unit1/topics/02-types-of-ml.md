---
subject: ml
unit: 1
order: 2
slug: types-of-ml
title: Types of Machine Learning
summary: Supervised, unsupervised, reinforcement, semi/self-supervised, and generative vs discriminative models.
minutes: 14
tags: [supervised, unsupervised, reinforcement, generative, discriminative]
---

# Types of Machine Learning

The first question for any ML problem: **what kind of feedback does the learner get?** That single question splits ML into its main families.

| Paradigm | Input | Learns | Feedback signal |
|---|---|---|---|
| **Supervised** | Data **with labels** | A mapping $X \to Y$ | The correct answer for each example |
| **Unsupervised** | Data **without labels** | Hidden structure / groups | None (self-organising) |
| **Reinforcement** | States & actions | A policy (what action to take) | Rewards / punishments |

## 1. Supervised learning

**Given** training examples *and* their desired outputs (labels), learn a function that maps inputs to outputs:

$$Y = f(X)$$

The goal is to *approximate* $f$ so well that for a brand-new input $x$, we can predict its output $Y$. This learned approximation is the **hypothesis function** $h$ — a "claim" about the true mapping.

**Two sub-types** (decided by the *type of the target variable*):

- **Regression** — output is **continuous / real-valued**. *Given* $(x_1,y_1),\dots,(x_n,y_n)$, learn $f(x)$ to predict a real number. *Example:* house-price prediction, Arctic sea-ice extent over years.
- **Classification** — output is **categorical / discrete**. *Example:* tumour malignant vs benign, spam vs not-spam.

| Problem type | Output | Algorithms |
|---|---|---|
| Classification | Discrete class | Logistic Regression, Decision Trees, Random Forest, SVM, KNN |
| Regression | Real number | Linear Regression, Bayesian Linear Regression |

> [!NOTE]
> **Random Forest** and **KNN** work for *both* classification and regression. A neural network learns "supervised" when the desired output is known during training.

## 2. Unsupervised learning

**Given** training data *without* labels. The model must find the underlying structure on its own — group by similarity, or compress the representation. Also called **exploratory learning** (no target variable to aim at).

**Two sub-types:**

- **Clustering** — group objects so that items in a cluster are similar to each other and dissimilar to other clusters. *Given* $x_1,\dots,x_n$ (no labels) → output the hidden grouping. *Example:* customer segmentation, anomaly detection, sorting multi-coloured potatoes into colour piles.
- **Association** — find *relationships / rules* between variables in a large database (which items co-occur). *Example:* market-basket analysis ("people who buy a new home tend to buy furniture").

**Algorithms:** K-means, Hierarchical clustering, PCA, ICA, Apriori, SVD, anomaly detection.

## 3. Reinforcement learning (RL)

Learning **what to do** — how to map *situations to actions* — to maximise a numeric reward. An **agent** observes a **state**, takes an **action**, and the **environment** returns a **reward** (positive = reward, negative = punishment) plus the next state. Over time the agent learns a **policy** (called a **control policy**) that maximises total cumulative reward.

The agent–environment loop, at discrete steps $t=0,1,2,\dots$:

- observe state $s_t \in S$
- take action $a_t \in A(s_t)$
- receive reward $r_{t+1} \in \mathbb{R}$ and next state $s_{t+1}$

**Key elements:**

- **Agent** — the learner/decision-maker.
- **Policy** $\pi$ — defines the agent's behaviour (which action in which state).
- **Value function** $v(s)$ — how good it is to be in state $s$ = total expected reward starting from $s$.

> [!INTUITION]
> **Dog fetching a ball:** succeed → cookie (reward); fail → no cookie. After many tries the dog learns a policy that reliably fetches the ball. The agent always faces the **exploration vs exploitation** dilemma: try new actions (explore) vs repeat known-good actions (exploit).

*Applications:* game AI (AlphaGo Zero), robotics, trade execution, healthcare dosing.

## The big comparison (exam table)

| Criteria | Supervised | Unsupervised | Reinforcement |
|---|---|---|---|
| Data | Labelled | Unlabelled | No predefined data |
| Problems | Regression, Classification | Clustering, Association | Exploration/Exploitation |
| Supervision | Yes | No | No |
| Algorithms | LinReg, LogReg, SVM, KNN | K-Means, Apriori | Q-Learning, SARSA |
| Aim | Predict outcomes | Discover patterns | Learn a sequence of actions |
| Application | Risk eval, sales forecast | Recommenders, anomaly | Self-driving, gaming |

## Other paradigms

- **Semi-supervised** — uses a **small amount of labelled** data + a **large amount of unlabelled** data together. *Example:* a few labelled animal photos (camel, cow) help classify many unlabelled ones.
- **Self-supervised** — generates its *own* labels from the data via a **pretext task**, then transfers that knowledge to a target task. Backbone of modern LLMs.

## Generative vs Discriminative models

A cross-cutting distinction based on *what probability the model learns*. Given input $x$ and label $y$:

- **Discriminative model** learns the **conditional** $p(y \mid x)$ — directly draws the *boundary* between classes. Used for classification/regression.
- **Generative model** learns the **joint** $p(x, y)$ — models *how the data is distributed*. Can generate new samples, and via Bayes' rule can also produce $p(y\mid x)$ for classification.

> [!INTUITION]
> A **discriminative** model learns the line that separates cats from dogs. A **generative** model learns what cats look like and what dogs look like (their distributions). Discriminative draws *boundaries*; generative models the *placement* of data throughout the space.

| | Discriminative | Generative |
|---|---|---|
| Learns | $p(y\mid x)$ | $p(x,y)$ |
| Examples | Logistic Regression, SVM, Decision Tree, Random Forest | Naïve/Bayesian Network, HMM, Autoregressive, GANs |

**Worked illustration.** From a tiny dataset:

| x | y |
|---|---|
| 1 | 0 |
| 1 | 0 |
| 2 | 0 |
| 2 | 1 |

The **joint** $p(x,y)$ (generative) and the **conditional** $p(y\mid x)$ (discriminative):

| $p(x,y)$ | y=0 | y=1 |   | $p(y\mid x)$ | y=0 | y=1 |
|---|---|---|---|---|---|---|
| **x=1** | 1/2 | 0 |   | **x=1** | 1 | 0 |
| **x=2** | 1/4 | 1/4 |   | **x=2** | 1/2 | 1/2 |

The conditional table is what you need to *classify* a given $x$; the joint table can additionally *generate* likely $(x,y)$ pairs.

> [!EXAM]
> Classic MCQ traps: *"automated vehicle"* → **supervised** (it learns from labelled driving data). *"Exploratory learning"* → **unsupervised**. *Customer segmentation / market segmentation* → **unsupervised – clustering**. *Real-time game AI, robot navigation* → **reinforcement**. *Fraud detection, image classification, diagnosis* → **supervised – classification**.

---

**Next:** before any algorithm, we formalise *what a "concept" is* and the space of hypotheses a learner searches.
