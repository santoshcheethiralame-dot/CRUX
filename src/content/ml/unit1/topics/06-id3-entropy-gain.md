---
subject: ml
unit: 1
order: 6
slug: id3-entropy-gain
title: ID3 — Entropy & Information Gain
summary: Entropy, information gain, average information, and the full Play-Tennis tree built by hand.
minutes: 20
tags: [ID3, entropy, information-gain, play-tennis]
---

# ID3 — Entropy & Information Gain

This is the **most exam-heavy topic in the unit**: you will be handed a table and asked to build the tree by hand. The whole game is choosing, at each node, the attribute that makes the resulting groups as **pure** (homogeneous) as possible.

## Entropy — a measure of disorder

**Entropy** measures the impurity / uncertainty of a set. For a set $S$ whose target takes $c$ classes with proportions $p_i$:

$$H(S) = -\sum_{i=1}^{c} p_i \log_2 p_i$$

- **Low entropy = pure** (one class dominates → certain). Entropy $= 0$ when all examples share one class.
- **High entropy = mixed** (maximally uncertain). For 2 classes, entropy is **maximal $=1$** at a 50/50 split.

> [!INTUITION]
> **Buckets of balls.** A bucket of *all red* balls → you're certain → entropy ≈ 0. A bucket that's 75% red / 25% green → some uncertainty. A bucket split evenly across many colours → maximum uncertainty → high entropy. ID3 wants to split the data into buckets that are as "all-one-colour" as possible.

Handy 2-class values to memorise: $H(0,1)=0$, $H(\tfrac14,\tfrac34)=0.811$, $H(\tfrac13,\tfrac23)=0.918$, $H(\tfrac25,\tfrac35)=0.971$, $H(\tfrac12,\tfrac12)=1$.

> [!NOTE]
> By convention $0\log_2 0 = 0$. With $c$ classes the maximum possible entropy is $\log_2 c$ (e.g. 3 classes → max $\approx 1.585$).

## Information Gain — the splitting criterion

When we split $S$ on attribute $A$, the **average (expected) entropy after the split** is the size-weighted average over each branch:

$$I(A) = \sum_{v \in \text{Values}(A)} \frac{|S_v|}{|S|}\, H(S_v)$$

**Information Gain** = entropy *before* − expected entropy *after*:

$$\text{Gain}(S, A) = H(S) - I(A)$$

It is the **expected reduction in entropy** from knowing $A$. **ID3 picks the attribute with the highest gain** at each node.

## ID3 algorithm

```
1. Compute entropy H(S) of the current set.
2. For each candidate attribute A:
      a. Compute H(S_v) for each value v of A.
      b. Compute weighted average I(A).
      c. Compute Gain(S,A) = H(S) − I(A).
3. Choose the attribute with the MAXIMUM gain as the decision node.
4. Split S by that attribute; for each branch:
      - if pure (entropy 0) → leaf;
      - else recurse with the remaining attributes.
```

## Full worked example — Play Tennis

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

### Step 1 — entropy of the whole set

9 Yes, 5 No out of 14:
$$H(S) = -\tfrac{9}{14}\log_2\tfrac{9}{14} - \tfrac{5}{14}\log_2\tfrac{5}{14} = 0.94$$

### Step 2 — gain for each attribute (root)

**Split on Outlook** → Sunny [2+,3−], Overcast [4+,0−], Rain [3+,2−]:

- $H(\text{Sunny}) = 0.971$, $H(\text{Overcast}) = 0$, $H(\text{Rain}) = 0.971$
- $I(\text{Outlook}) = \tfrac{5}{14}(0.971) + \tfrac{4}{14}(0) + \tfrac{5}{14}(0.971) = 0.693$
- $\text{Gain}(S,\text{Outlook}) = 0.94 - 0.693 = \mathbf{0.247}$

**Split on Temp** → High [2+,2−], Medium [4+,2−], Cool [3+,1−]:

- $H(\text{High})=1,\ H(\text{Medium})=0.918,\ H(\text{Cool})=0.811$
- $I(\text{Temp}) = \tfrac{4}{14}(1) + \tfrac{6}{14}(0.918) + \tfrac{4}{14}(0.811) = 0.911$
- $\text{Gain}(S,\text{Temp}) = 0.94 - 0.911 = 0.029$

Doing the same for the others:

| Attribute | Gain |
|---|---|
| **Outlook** | **0.247** ✅ |
| Humidity | 0.152 |
| Windy | 0.048 |
| Temp | 0.029 |

→ **Outlook wins → it becomes the root.**

### Step 3 — recurse on each branch

- **Overcast** branch: entropy already 0 (all Yes) → **leaf = Yes.** ✔
- **Sunny** branch (5 rows, $H=0.971$): test the remaining attributes *within Sunny*.

| Attribute (within Sunny) | Gain |
|---|---|
| **Humidity** | $0.971 - 0 = \mathbf{0.971}$ ✅ |
| Temp | 0.571 |
| Windy | 0.020 |

Humidity perfectly separates Sunny (High→all No, Normal→all Yes) → two leaves.

- **Rain** branch: by the same procedure, **Windy** gives the cleanest split (Strong→No, Weak→Yes).

### Final tree

```
Outlook = Sunny    → Humidity = High   → No
                     Humidity = Normal → Yes
Outlook = Overcast → Yes
Outlook = Rain     → Windy = Strong → No
                     Windy = Weak   → Yes
```

> [!EXAM]
> Show **every** entropy and gain calculation — method marks dominate. Standard order: (1) $H(S)$, (2) $I(A)$ and Gain for *each* attribute as a table, (3) pick max gain, (4) recurse, (5) draw the final tree. A branch with entropy 0 becomes a leaf immediately — don't split it further.

## Second example — Job Acceptance (smaller, faster)

| Salary | Location | Accept |
|---|---|---|
| Tier1 | MUM | Yes |
| Tier1 | BLR | Yes |
| Tier2 | BLR | No |
| Tier1 | HYD | No |
| Tier2 | MUM | Yes |

$H(S) = H(\tfrac35,\tfrac25) = 0.971$.

- **Salary:** Tier1 [2+,1−] $H=0.918$; Tier2 [1+,1−] $H=1$. $I=\tfrac35(0.918)+\tfrac25(1)=0.951$ → **Gain $=0.020$**.
- **Location:** MUM [2+,0−] $H=0$; BLR [1+,1−] $H=1$; HYD [0+,1−] $H=0$. $I=\tfrac25(1)=0.4$ → **Gain $=0.571$** ✅.

→ **Location is the root.** MUM→Yes, HYD→No, and BLR splits further on Salary (Tier1→Yes, Tier2→No).

> [!TRAP]
> Remove duplicate rows before computing — duplicates distort the proportions. And a target with **3 classes** can have entropy up to $\log_2 3 \approx 1.585$, not 1.

---

**Next:** what ID3 *assumes* (its inductive bias) and the issues that arise — leading into overfitting.
