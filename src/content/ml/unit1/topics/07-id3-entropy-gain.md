---
subject: ml
unit: 1
order: 7
slug: id3-entropy-gain
title: ID3 — Entropy & Information Gain
summary: Entropy, average information, information gain, the 5-step ID3 recipe, and four fully worked trees (Play Tennis, Job Acceptance, multi-class, Watch Movie).
minutes: 26
tags: [ID3, entropy, information-gain, play-tennis, worked-example]
---

# ID3 — Entropy & Information Gain

This is the **most exam-heavy topic in the unit**: you will be handed a table and asked to build the tree by hand. The whole game is choosing, at each node, the attribute that makes the resulting groups as **pure** (homogeneous) as possible.

## Entropy — a measure of disorder

At a given point we prefer the attribute that **partitions the set into subsets that are as homogeneous as possible**. Ideally, no more decisions are required.

> **Entropy is an indicator of non-homogeneity / uncertainty — a measure of disorder** (how messy your data is). **Entropy needs to be reduced.**

For a set $S$ whose target takes $c$ classes with proportions $p_i$:

$$H(S) \;=\; -\sum_{i=1}^{c} p_i \log_2 p_i$$

- **Low entropy = pure** (one class dominates → certain). $H = 0$ when all examples share one class.
- **High entropy = mixed** (maximally uncertain). For 2 classes, entropy is **maximal $= 1$** at a 50/50 split.
- With $c$ classes the maximum possible entropy is $\log_2 c$.

> [!INTUITION]
> **The three buckets of balls, from the slides.**
> - **Bucket 1 — least entropy:** 4 red balls. *"We know for sure that the ball coming out is red."*
> - **Bucket 2 — medium entropy:** 3 red + 1 green. *"75% certain it's red, 25% certain it's green."*
> - **Bucket 3 — high entropy:** 2 red + 1 yellow + 1 green. *"50% red, 25% yellow, 25% green."*
>
> We have the most knowledge about bucket 1, so **bucket 1 has the least entropy**. Entropy is literally *how surprised you expect to be*.

Handy 2-class values to have memorised (they recur in every problem):

| Split | $H$ |
|---|---|
| $0/1$ (pure) | **0** |
| $\tfrac14,\tfrac34$ | **0.811** |
| $\tfrac13,\tfrac23$ | **0.918** |
| $\tfrac25,\tfrac35$ | **0.971** |
| $\tfrac12,\tfrac12$ | **1** |

> [!NOTE]
> By convention $0\log_2 0 = 0$. To compute $\log_2 x$ on a calculator that only has $\log_{10}$ or $\ln$: $\log_2 x = \log_{10}x / \log_{10}2 = \ln x / \ln 2$.

## Information Gain — the splitting criterion

> Information gain is a **measure of the effectiveness of an attribute in classifying the training data**: the **expected reduction in entropy** caused by partitioning the examples according to that attribute.
>
> **Information Gain = (entropy before the split) − (entropy after the split)**, and it **should be as high as possible**.

The "entropy after the split" is the **average information entropy** $I(A)$ — the **size-weighted average of the entropies of the individual subsets**:

$$I(A) \;=\; \sum_{v \in \text{Values}(A)} \frac{|S_v|}{|S|}\; H(S_v)$$

$$\boxed{\ \text{Gain}(S, A) \;\equiv\; H(S) \;-\; I(A)\ }$$

where $\text{Values}(A)$ is the set of all possible values of attribute $A$, and $S_v = \{\, s \in S \mid A(s) = v \,\}$ is the subset of $S$ for which $A$ takes value $v$.

> [!TRAP]
> The weights $|S_v|/|S|$ are **not optional** and they are **not equal**. A branch holding 1 of 14 examples counts one-fourteenth as much as its entropy suggests. Forgetting the weights is the most common arithmetic error in this topic.

## The 5-step ID3 recipe

```
1. Compute the entropy for the data-set:  H(S)
2. For each attribute A:
      a. Calculate the entropy H(S_v) for every value v of A
      b. Take the weighted average → average information entropy I(A)
      c. Calculate Gain(S, A) = H(S) − I(A)
3. Pick the attribute with the HIGHEST gain as the decision node
4. Split S on it; for each branch:
      - entropy 0 → leaf, stop
      - else recurse with the remaining attributes
5. Repeat until we get the tree we desire.
```

---

# Worked example 1 — Play Tennis (14 instances)

| Outlook | Temp | Humidity | Windy | Play |
|---|---|---|---|---|
| Sunny | High | High | Weak | No |
| Sunny | High | High | Strong | No |
| Overcast | High | High | Weak | Yes |
| Rainy | Medium | High | Weak | Yes |
| Rainy | Cool | Normal | Weak | Yes |
| Rainy | Cool | Normal | Strong | No |
| Overcast | Cool | Normal | Strong | Yes |
| Sunny | Medium | High | Weak | No |
| Sunny | Cool | Normal | Weak | Yes |
| Rainy | Medium | Normal | Weak | Yes |
| Sunny | Medium | Normal | Strong | Yes |
| Overcast | Medium | High | Strong | Yes |
| Overcast | High | Normal | Weak | Yes |
| Rainy | Medium | High | Strong | No |

### Step 1 — entropy before the split

$|S| = 14$, with 9 Yes and 5 No: $p_1 = 9/14 = 0.643$, $p_2 = 5/14 = 0.357$.

$$H(S) = -\big(0.643\log_2 0.643 + 0.357\log_2 0.357\big) = \mathbf{0.94}$$

### Step 2 — split on **Outlook**

Outlook has 3 values → 3 subsets: $|S_{\text{sunny}}|=5$, $|S_{\text{overcast}}|=4$, $|S_{\text{rain}}|=5$.

$$H(S_{\text{sunny}}) = -\left(\tfrac25\log_2\tfrac25 + \tfrac35\log_2\tfrac35\right) = 0.971$$
$$H(S_{\text{overcast}}) = -(1\log_2 1 + 0\log_2 0) = 0$$
$$H(S_{\text{rain}}) = -\left(\tfrac35\log_2\tfrac35 + \tfrac25\log_2\tfrac25\right) = 0.971$$

$$I(\text{Outlook}) = \tfrac{5}{14}(0.971) + \tfrac{4}{14}(0) + \tfrac{5}{14}(0.971) = 0.693$$

$$\text{Gain}(S,\text{Outlook}) = 0.94 - 0.693 = \mathbf{0.247}$$

### Step 2 — split on **Temp**

$|S_{\text{high}}|=4$ [2+,2−], $|S_{\text{medium}}|=6$ [4+,2−], $|S_{\text{cool}}|=4$ [3+,1−].

$$H(S_{\text{high}}) = -\left(\tfrac24\log_2\tfrac24 + \tfrac24\log_2\tfrac24\right) = 1$$
$$H(S_{\text{medium}}) = -\left(\tfrac46\log_2\tfrac46 + \tfrac26\log_2\tfrac26\right) = 0.918$$
$$H(S_{\text{cool}}) = -\left(\tfrac34\log_2\tfrac34 + \tfrac14\log_2\tfrac14\right) = 0.81125$$

$$I(\text{Temp}) = \tfrac{4}{14}(1) + \tfrac{6}{14}(0.918) + \tfrac{4}{14}(0.81125) = 0.911$$

$$\text{Gain}(S,\text{Temp}) = 0.94 - 0.911 = \mathbf{0.029}$$

### Step 3 — the gain table

| $H(S)$ | 0.94 |
|---|---|
| **Gain(S, Outlook)** | **0.247** ✅ |
| Gain(S, Humidity) | 0.152 |
| Gain(S, Windy) | 0.048 |
| Gain(S, Temp) | 0.029 |

**We pick the attribute with maximum gain → the root is `Outlook`**, with branches sunny / overcast / rain.

### Step 4 — the overcast branch is already done

$H(S_{\text{overcast}}) = 0$, **which means it is single-valued and hence we can come to a conclusion from overcast** → **leaf = Yes.** ✔

### Step 5 — recurse on the Sunny branch

| Outlook | Temp | Humidity | Windy | Play |
|---|---|---|---|---|
| Sunny | High | High | Weak | No |
| Sunny | High | High | Strong | No |
| Sunny | Medium | High | Weak | No |
| Sunny | Cool | Normal | Weak | Yes |
| Sunny | Medium | Normal | Strong | Yes |

$|S_{\text{sunny}}| = 5$, $H = 0.971$.

**On Temp:** $|S_{\text{high}}|=2$ (both No) $H=0$; $|S_{\text{medium}}|=2$ (one each) $H=1$; $|S_{\text{cool}}|=1$ $H=0$.
$I(\text{Temp}) = \tfrac25(1) = 0.4$ → $\text{Gain} = 0.971 - 0.4 = \mathbf{0.571}$

**On Humidity:** $|S_{\text{high}}|=2$ (both No) $H=0$; $|S_{\text{normal}}|=3$ (all Yes) $H=0$.
$I(\text{Humidity}) = 0$ → $\text{Gain} = 0.971 - 0 = \mathbf{0.971}$

**On Windy:** $|S_{\text{weak}}|=3$ [1+,2−] $H=0.918$; $|S_{\text{strong}}|=2$ [1+,1−] $H=1$.
$I(\text{Windy}) = \tfrac35(0.918)+\tfrac25(1) = 0.951$ → $\text{Gain} = 0.971 - 0.951 = \mathbf{0.02}$

| $H(S_{\text{sunny}})$ | 0.971 |
|---|---|
| Gain(S_sunny, Temp) | 0.571 |
| **Gain(S_sunny, Humidity)** | **0.971** ✅ |
| Gain(S_sunny, Windy) | 0.02 |

**Humidity wins.** Both of its values have entropy 0, **which means we have reached leaf nodes** — High → No, Normal → Yes. Doing the same for the Rain branch gives **Windy** (Strong → No, Weak → Yes).

### Final tree — Play Tennis

```
Outlook = Sunny    → Humidity = High   → No
                     Humidity = Normal → Yes
Outlook = Overcast → Yes
Outlook = Rain     → Windy = Strong → No
                     Windy = Weak   → Yes
```

> [!EXAM]
> Show **every** entropy and gain calculation — method marks dominate. Standard order: (1) $H(S)$; (2) $I(A)$ and Gain for *each* attribute, as a table; (3) pick max gain; (4) recurse; (5) draw the final tree. A branch with entropy 0 becomes a leaf immediately — say so explicitly and don't split it further.

---

# Worked example 2 — Job Acceptance (watch for the trap)

| salary | Location | job acceptance |
|---|---|---|
| Tier 1 | MUM | YES |
| Tier 1 | BLR | YES |
| Tier 2 | BLR | NO |
| Tier 1 | HYD | NO |
| Tier 2 | MUM | YES |
| Tier 1 | HYD | NO |

> [!TRAP]
> **Ensure there are no duplicate rows in your data.** Row 4 and row 6 are identical — (Tier 1, HYD, NO). After de-duplication **$|S| = 5$, not 6.** Every number below depends on this. The slides flag this in yellow for a reason.

**Step 1.** $|S|=5$: $P(\text{yes}) = 3/5$, $P(\text{no}) = 2/5$ → $H(S) = \mathbf{0.971}$

**Split on salary:**
- $|S_{\text{Tier1}}| = 3$ → $P(\text{yes})=2/3,\ P(\text{no})=1/3$ → $H = 0.918$
- $|S_{\text{Tier2}}| = 2$ → $P(\text{yes})=1/2,\ P(\text{no})=1/2$ → $H = 1$
- $I(\text{salary}) = \tfrac35(0.918) + \tfrac25(1) = 0.9508$
- $\text{Gain}(S,\text{salary}) = 0.971 - 0.9508 = \mathbf{0.0202}$

**Split on Location:**
- $|S_{\text{MUM}}| = 2$ → all Yes → $H = 0$
- $|S_{\text{BLR}}| = 2$ → one each → $H = 1$
- $|S_{\text{HYD}}| = 1$ → all No → $H = 0$
- $I(\text{Location}) = \tfrac25(1) = 0.4$
- $\text{Gain}(S,\text{Location}) = 0.971 - 0.4 = \mathbf{0.571}$ ✅

**Root = Location.** Final tree:

```
Location = MUM → Yes
Location = HYD → No
Location = BLR → Salary = Tier 1 → Yes
                 Salary = Tier 2 → No
```

---

# Worked example 3 — a multi-class target

| M | N | O | **Y** |
|---|---|---|---|
| A | C | X | **T** |
| A | C | Z | **E** |
| A | D | X | **T** |
| A | D | Z | **T** |
| B | C | X | **E** |
| B | C | Z | **F** |
| B | D | X | **F** |
| B | D | Z | **F** |

Class counts: T = 3, E = 2, F = 3 out of 8.

$$H(S) = -\tfrac38\log_2\tfrac38 - \tfrac28\log_2\tfrac28 - \tfrac38\log_2\tfrac38 = \mathbf{1.56}$$

> [!NOTE]
> **If the target attribute can take on $c$ possible values, the entropy can be as large as $\log_2 c$.** Here $\log_2 3 = 1.585$, and $1.56$ sits just under it — the three classes are close to uniform. This is exactly why a 3-class problem can have entropy above 1, which surprises people who have only ever seen binary targets.

---

# Worked example 4 — Watch Movie (14 instances)

| Weather | Mood | Genre | Alone | **Watch Movie** |
|---|---|---|---|---|
| Sunny | Happy | Comedy | No | Yes |
| Sunny | Bored | Drama | Yes | No |
| Cloudy | Lazy | Thriller | Yes | Yes |
| Rainy | Sad | Romance | No | Yes |
| Rainy | Bored | Comedy | Yes | No |
| Rainy | Happy | Thriller | Yes | No |
| Cloudy | Happy | Romance | No | Yes |
| Sunny | Bored | Comedy | No | No |
| Sunny | Happy | Romance | Yes | Yes |
| Rainy | Lazy | Drama | No | Yes |
| Sunny | Lazy | Thriller | Yes | Yes |
| Cloudy | Bored | Comedy | Yes | Yes |
| Cloudy | Sad | Romance | No | Yes |
| Rainy | Sad | Thriller | Yes | No |

**Step 1.** 9 Yes / 5 No out of 14 → $H(S) = \mathbf{0.94}$

**Split on Weather:** $|S_{\text{sunny}}|=5$ [3+,2−], $|S_{\text{cloudy}}|=4$ [4+,0−], $|S_{\text{rainy}}|=5$ [2+,3−]

$$H(S_{\text{sunny}}) = 0.971,\quad H(S_{\text{cloudy}}) = 0,\quad H(S_{\text{rainy}}) = 0.971$$
$$I(\text{Weather}) = \tfrac{5}{14}(0.971)+\tfrac{4}{14}(0)+\tfrac{5}{14}(0.971) = 0.693$$
$$\text{Gain}(S,\text{Weather}) = 0.94 - 0.693 = \mathbf{0.247}$$ ✅

Weather is the root; **Cloudy has entropy 0 → leaf = Yes.**

**The Sunny branch** (5 rows: Happy/Comedy/No→Yes, Bored/Drama/Yes→No, Bored/Comedy/No→No, Happy/Romance/Yes→Yes, Lazy/Thriller/Yes→Yes), $H = 0.971$:

Split on **Mood**: $|S_{\text{happy}}|=2$ (both Yes, $H=0$), $|S_{\text{bored}}|=2$ (both No, $H=0$), $|S_{\text{lazy}}|=1$ (Yes, $H=0$).
$$I(\text{Mood}) = 0 \quad\Rightarrow\quad \text{Gain}(S_{\text{sunny}},\text{Mood}) = 0.971 - 0 = \mathbf{0.971}$$

Mood splits Sunny perfectly, and it collapses neatly into **bored → No, not bored → Yes**. The Rainy branch resolves on **Alone**.

### Final tree — the second dataset

```
weather ?
├── sunny ──────→ mood ?
│                 ├── not bored ──→ Yes
│                 └── bored     ──→ No
├── cloudy ──────────────────────→ Yes
└── rainy ──────→ alone ?
                  ├── no  ───────→ Yes
                  └── yes ───────→ No
```

> [!INTUITION]
> Compare this with the Play Tennis tree: identical class counts (9/5), identical branch sizes (5/4/5), identical entropies. **The Watch-Movie problem is the Play-Tennis problem wearing a disguise.** If you can do one you can do the other — and recognising that in the exam saves you five minutes of panic.

---

> [!TRAP]
> The three mistakes that cost the most marks:
> 1. **Forgetting the $|S_v|/|S|$ weights** in $I(A)$.
> 2. **Not de-duplicating rows** when the question plants duplicates.
> 3. **Assuming max entropy is 1** — it's $\log_2 c$; with 3 classes that's 1.585.

---

**Next:** what ID3 *assumes* while doing all this — its hypothesis space and its inductive bias.
