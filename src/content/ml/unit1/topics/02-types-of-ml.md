---
subject: ml
unit: 1
order: 2
slug: types-of-ml
title: Types of Machine Learning
summary: Supervised (regression vs classification), unsupervised (clustering vs association), reinforcement learning, semi- and self-supervised learning, plus the full comparison table.
minutes: 18
tags: [supervised, unsupervised, reinforcement, clustering, association, semi-supervised, self-supervised]
---

# Types of Machine Learning

## The map

```
Machine Learning
├── Supervised          data WITH labels        → learns a mapping
│   ├── Regression      target is CONTINUOUS    → house price, temperature
│   └── Classification  target is CATEGORICAL   → spam/ham, tumour type
├── Unsupervised        data WITHOUT labels     → finds structure
│   ├── Clustering      group by similarity     → customer segmentation, anomaly detection
│   └── Association     find co-occurrence      → market-basket analysis
└── Reinforcement       states + actions        → learns a control policy from rewards
```

The three-box diagram from the slides makes the distinction crisply:

| Paradigm | Input | Output | Feedback signal |
|---|---|---|---|
| **Supervised** | Data **with labels** | A **mapping** $Y=f(X)$ | A **critic** — the correct answer |
| **Unsupervised** | Data **without labels** | **Classes / groups** | **None** |
| **Reinforcement** | **States and actions** | A **state → action** policy | A **critic** supplying a **reinforcement signal** (reward / punishment) |

---

## 1. Supervised learning

**Given training data *and* the desired outputs.** You have input variables $x$ and an output variable $Y$, and the algorithm learns the **mapping function from the input to the output**:

$$Y = f(X)$$

The goal is to approximate $f$ so well that for **new** input $x$ you can predict $Y$. This approximation is called the **hypothesis function** $h$ — "hypothesis" because it is a *claim* about the target function, not a proof.

**Two steps, always:**

1. **Training** — the model is fed a labelled dataset and learns about each type of data.
2. **Testing** — the model is run on held-out test data and predicts the output.

> [!INTUITION]
> The shapes example from the slides: during training the model is told *"four equal sides → Square, three sides → Triangle, six equal sides → Hexagon"*. At test time it is shown a shape with no label and must name it. The labels were the *supervision*.

### Regression — continuous target

Given $(x_1,y_1),\dots,(x_n,y_n)$, learn $f(x)$ to predict $y$, where **$y$ is real-valued**.

- Slide example: **September Arctic Sea Ice Extent vs Year** — you can fit a straight line (linear) or a curve (polynomial) through the scatter.
- Other examples: house price prediction, tomorrow's temperature in °C, number of shares traded tomorrow.

### Classification — categorical target

Given $(x_1,y_1),\dots,(x_n,y_n)$, learn $f(x)$ to predict $y$, where **$y$ is categorical (discrete)**.

- Slide example: **Breast cancer Malignant(1)/Benign(0) vs Tumour Size**.
- Binary: $y\in\{0,1\}$, where **0 = negative class, 1 = positive class**. Multi-class: $y\in\{0,1,2,3,\dots\}$.

### Algorithms

| For classification | For regression |
|---|---|
| Random Forest, **Decision Trees**, **Logistic Regression**, Support Vector Machines | **Linear Regression**, Bayesian Linear Regression |

**Random forest works for both.** A neural network is said to learn *supervised* if the desired output is already known.

> [!TRAP]
> **Logistic regression is a classification algorithm**, despite the name. It is called "regression" because it regresses a *continuous probability*; the classification happens when you threshold that probability. See the Logistic Regression topic.

**Applications:** speech recognition, spam detection (new email → spam classifier → spam / not-spam), risk evaluation, sales forecasting.

---

## 2. Unsupervised learning

**Given training data *without* desired outputs.** The model is trained on an **unlabeled dataset** and is allowed to act on that data **without any supervision**.

Goals:
- **Find the underlying structure** of the dataset,
- **group the data according to similarities**, and
- **represent the dataset in a compressed format**.

Pipeline from the slides:

```
INPUT raw unlabeled data → Interpretation → Algorithm → Processing → OUTPUT groups
```

The algorithm first **interprets the raw data to find hidden patterns**, then applies an algorithm such as k-means, dividing objects into groups according to similarities and differences.

### Clustering

A method of **grouping objects into clusters such that objects with the most similarities remain in one group and have little or no similarity with objects of another group**. Given $x_1,\dots,x_n$ **without labels**, output the **hidden structure** behind the $x$'s.

> [!INTUITION]
> The potato picture: you're handed one mixed sample and you sort it into piles. Nobody told you what the piles are called — you invented them from similarity alone. That's the difference from classification, where the pile names were given up front.

### Association

An **unsupervised** method for **finding relationships between variables in a large database** — it determines the **set of items that occur together**.

Examples from the slides:
- people who buy a new home most likely buy new furniture;
- a subgroup of cancer patients grouped by their gene-expression measurements;
- groups of shoppers based on browsing and purchasing histories;
- movies grouped by the ratings given by viewers.

### Algorithms

**K-means clustering · Hierarchical clustering · Neural networks (encoders, autoencoders) · Principal Component Analysis (PCA) · Independent Component Analysis · Apriori algorithm · Singular Value Decomposition (SVD)**

**Applications:** organising computing clusters, social network analysis, market segmentation, astronomical data analysis.

---

## 3. Reinforcement learning (RL)

RL is learning **what to do — how to map situations to actions**. The algorithm (the **agent**) evaluates a current situation (the **state**), takes an **action**, and receives **feedback** from the environment after each act. Positive feedback is a **reward**; negative feedback is a **punishment**. The learner must **discover which action yields the maximum reward** — it is never told which action to take.

```
            ┌──────────── action a_t ────────────┐
            │                                    ▼
        AGENT                              ENVIRONMENT
            ▲                                    │
            └──── state s_t+1 , reward r_t+1 ────┘
```

### The agent–environment interface (formal)

Agent and environment interact at **discrete time steps** $t = 0, 1, 2, \dots$:

- agent observes **state** at step $t$: $s_t \in S$
- produces an **action** at step $t$: $a_t \in A(s_t)$
- gets a resulting **reward**: $r_{t+1} \in \mathbb{R}$
- and a resulting **next state**: $s_{t+1}$

### Key elements

| Element | Definition |
|---|---|
| **Agent** | The software program that makes intelligent decisions — the **learner**. It acts by interacting with the environment and receives rewards for its actions. |
| **Policy function** | **Defines the agent's behaviour** in an environment: the way the agent decides which action to perform. The policy is adopted based on rewards/penalties received from previous actions. |
| **Value function** | Denotes **how good it is for an agent to be in a particular state**, $v(s)$. Dependent on the policy; equals the **total expected reward** received starting from that state. |

### Worked intuitions from the slides

**The dog.** A dog sits in a room. Task: learn to fetch the ball. It moves, fetches the ball, gets a **cookie**; if it fails, **no cookie**. Slowly, over many trials, the dog learns a mapping from situation to action that reliably earns the cookie — that learned mapping is a **control policy**.

**The chess pawn.** Green box = the training agent (a pawn); red = the target (a win).
- In state $S_1$ the agent takes a random action $A_1$ and moves two steps forward. Since this is progress toward killing the target, it gets a reward $R_1$.
- In the new state $S_2$ it decides to go straight — and receives a **penalty**.
- After $n$ episodes it meets a similar state again, **remembers the past penalty**, goes to the right diagonal instead, and receives a heavy reward → the agent learns that this action was superb.

**Pacman.** The goal is to eat the food in the grid while avoiding the ghosts. The **grid world is the interactive environment**; PacMan gets a **reward for eating food** and a **punishment if killed by a ghost**. The **states** are PacMan's locations in the grid; the total cumulative reward is PacMan winning. To build an optimal policy the agent faces the dilemma of **exploring new states while simultaneously maximising its reward** — the **exploration–exploitation dilemma**.

### RL vs the other two

- Both supervised learning and RL use a mapping between input and output. But in supervised learning the feedback is **the correct set of actions**; in RL the feedback is **rewards and punishments** as signals for positive and negative behaviour.
- Unsupervised learning's goal is to find **similarities and differences** between data points; RL's goal is to find a **suitable action model that maximises the total cumulative reward**.

**Practical applications:** AlphaGo Zero (first program to beat a world champion at Go); robotics and high-dimensional control — Google reportedly cut data-centre energy consumption by ~50% using DeepMind's technology; text summarisation (Salesforce); **trade execution** — JPMorgan announced in 2017 it would use a robot for executing large orders; **healthcare** — medication dosing, treatment policies for chronic sufferers, clinical trials.

---

## 4. The middle ground: semi-supervised and self-supervised

| | Definition |
|---|---|
| **Semi-supervised learning** | Input data has only **partial labels** — e.g. the camel and cow images are labelled, the elephant is not. The model uses the labelled part to structure its use of the unlabelled part, and still predicts "It's an Elephant". |
| **Self-supervised learning** | **Pre-train on a dataset with *no* labels using a *pretext task*** (a task whose labels are generated automatically from the data itself), then **transfer that knowledge** to a target model trained on the labelled dataset for the **target task**. |

> [!INTUITION]
> Self-supervised learning is how modern language models are built: "predict the next token" is a pretext task whose labels come free with the text. The pretext task isn't what you want — it's a cheap way to buy representations before spending your expensive labels.

---

## The comparison table (memorise this)

| Criteria | **Supervised** | **Unsupervised** | **Reinforcement** |
|---|---|---|---|
| **Definition** | Learns by using **labelled** data | Trained on **unlabelled** data without any guidance | Works by **interacting with the environment** |
| **Type of data** | Labelled data | Unlabelled data | **No predefined data** |
| **Type of problems** | Regression and classification | Association and clustering | **Exploitation or exploration** |
| **Supervision** | Extra supervision | No supervision | No supervision |
| **Algorithms** | Linear Regression, Logistic Regression, SVM, KNN | K-Means, C-Means, Apriori | **Q-Learning, SARSA** |
| **Aim** | Calculate outcomes | Discover underlying patterns | **Learn a series of actions** |
| **Application** | Risk evaluation, forecast sales | Recommendation systems, anomaly detection | Self-driving cars, gaming, healthcare |

> [!EXAM]
> This table is a guaranteed 5–8 mark question ("Compare supervised, unsupervised and reinforcement learning"). Write it *as a table* with at least the rows: definition, data, problem types, algorithms, aim, application. Then add one line each on semi-supervised and self-supervised for the extra mark.

> [!TRAP]
> Classic MCQ traps from the deck:
> - *"Predict tomorrow's temperature in °C"* → **regression** (continuous), not classification.
> - *"Predict the number of shares traded tomorrow"* → **regression**, even though shares are counted in whole numbers — the quantity is effectively continuous and ordered.
> - *"Discover whether there are different **types** of patients from drug-response data"* → **unsupervised** (clustering); nobody gave you the types.
> - Predicting *odds of developing diabetes from DNA*, and *whether an audio clip contains vocals*, are both **supervised** — the labels exist.

---

**Next:** a cross-cutting distinction that applies to *all* supervised models — generative vs discriminative.
