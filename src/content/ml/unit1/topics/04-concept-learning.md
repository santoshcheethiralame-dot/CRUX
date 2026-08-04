---
subject: ml
unit: 1
order: 4
slug: concept-learning
title: Concept Learning — Feature, Concept, Hypothesis & Version Space
summary: Concepts and feature vectors, counting the concept space, how inductive bias shrinks it to the hypothesis space, version spaces, and the futility of bias-free learning.
minutes: 22
tags: [concept-learning, feature-space, concept-space, hypothesis-space, version-space, inductive-bias, restriction-bias]
---

# Concept Learning

## What is a concept?

> **A concept defines what belongs to a category and what doesn't.**

The slides illustrate this with the letter **'A'** rendered in dozens of wildly different fonts and handwriting styles. No two are pixel-identical, yet you recognise every one of them. Whatever you have in your head that lets you do that *is* the concept.

**Concept learning** is therefore: *learning to categorise, given a sample of positive and negative training examples of the category.*

Mitchell's formal definition, which you should be able to quote:

> **Concept learning** is *the problem of searching through a predefined space of potential hypotheses for the hypothesis that best fits the training examples.*

Notation: the concept/function to be learned is the **target concept**, written **$c$**. For a boolean concept, $c : X \to \{0,1\}$.

Two things must be true for a machine to learn a concept:
1. We must be able to **provide features** that let the machine express the concept.
2. Many concepts can fit a dataset — the algorithm must learn the one that **best fits the training data and works well on new instances**.

---

## Feature space (instance space) $X$

> **The feature space is the set of all possible combinations of attributes (features) used to describe examples.**

Reducing the concept of the letter 'A' to five boolean features:

| Feature | Values |
|---|---|
| Has Crossbar | Yes / No |
| Has Pointed Top | Yes / No |
| Symmetrical | Yes / No |
| Has Two Legs | Yes / No |
| Is Curved | Yes / No |

Each character is then a **feature vector**:

- **'A'** → [Yes, Yes, Yes, Yes, No]
- **'Λ'** → [No, Yes, Yes, Yes, No]
- **'a'** → [Yes, No, No, No, Yes]

**Size of the feature space** = the product of the number of values of each attribute. With $d$ binary features, $|X| = 2^d$.

---

## Concept space — and why it explodes

> **The concept space is the set of all possible concepts that can be formed using the feature space. It includes every possible labelling (positive/negative) of every feature vector.**

If there are $m = 2^d$ possible instances, then each instance may independently be labelled + or −, so:

$$\#\text{concepts} = 2^{m} = 2^{2^{d}}$$

Equivalently: **the concept space is the set of all subsets (the power set) of the instance space.**

### The fruit-edibility example (learn this one — every count follows from it)

Concept: **a fruit's edibility.** Features: Colour ∈ {Red, Green}, Shape ∈ {Round, Long}.

Feature space $\chi$ (size $2^2 = 4$):

| Code | Colour | Shape |
|---|---|---|
| RR | Red | Round |
| RL | Red | Long |
| GR | Green | Round |
| GL | Green | Long |

Concept space: each of the 4 instances gets a 0/1 label, so there are **$2^4 = 16$** possible concepts — the full 16-row truth table over the columns (RR, RL, GR, GL).

$$\boxed{\text{$d$ binary features } \Rightarrow 2^{2^{d}} \text{ concepts}}$$

> [!TRAP]
> Do not confuse the two exponents. $2^d$ counts **instances**; $2^{2^d}$ counts **concepts**. With just 5 binary features that's 32 instances but $2^{32} \approx 4.3$ **billion** concepts. Searching that space exhaustively is hopeless — which is exactly why we need bias.

---

## Reducing the concept space → the hypothesis space $H$

> **Make an assumption about the nature of the concept. The assumption reduces the space of concepts we are going to look at. This reduction of the concept space is what we call *inductive bias*. The shrunken space is called the *hypothesis space*.**

```
        ┌──────────── CONCEPT SPACE (all 2^(2^d) labellings) ────────────┐
        │                                                                │
        │        ┌──── HYPOTHESIS SPACE H (what we're willing to  ────┐  │
        │        │      consider — imposed by inductive bias)        │  │
        │        │        ┌── VERSION SPACE (consistent with D) ──┐  │  │
        │        │        └───────────────────────────────────────┘  │  │
        │        └────────────────────────────────────────────────────┘  │
        └────────────────────────────────────────────────────────────────┘
```

### Our bias: conjunctive concepts

We assume every hypothesis is a **conjunction of attribute-value constraints**, where each attribute slot can hold:

- a **specific value** (e.g. `Red`),
- **`?`** — "any value is acceptable",
- **`Ø`** — "no value is acceptable" (which makes the whole hypothesis reject everything).

So the possible values per attribute number **(actual values) + `?` + `Ø`**. And **because a single `Ø` anywhere already means "reject all instances"**, all such hypotheses collapse into one. Hence:

$$|H|_{\text{semantically distinct}} \;=\; 1 + \prod_{i} \big(|\text{values}(A_i)| + 1\big)$$

**Fruit example:** each attribute has 2 values, so $(2+1)=3$ options each →

$$|H| = (3 \times 3) + 1 = \mathbf{10}$$

The ten hypotheses are:

$$\langle R,R\rangle,\ \langle R,L\rangle,\ \langle R,?\rangle,\ \langle G,R\rangle,\ \langle G,L\rangle,\ \langle G,?\rangle,\ \langle ?,R\rangle,\ \langle ?,L\rangle,\ \langle ?,?\rangle\ (\text{accept all}),\ \langle\varnothing\rangle\ (\text{reject all})$$

**Reduction from 16 to 10.** Which six were lost? Map every row of the truth table to its hypothesis:

| RR RL GR GL | Corresponding hypothesis |
|---|---|
| 0 0 0 0 | ⟨Ø⟩ |
| 0 0 0 1 | ⟨G, L⟩ |
| 0 0 1 0 | ⟨G, R⟩ |
| 0 0 1 1 | ⟨G, ?⟩ |
| 0 1 0 0 | ⟨R, L⟩ |
| 0 1 0 1 | ⟨?, L⟩ |
| 0 1 1 0 | **— excluded** |
| 0 1 1 1 | **— excluded** |
| 1 0 0 0 | ⟨R, R⟩ |
| 1 0 0 1 | **— excluded** |
| 1 0 1 0 | ⟨?, R⟩ |
| 1 0 1 1 | **— excluded** |
| 1 1 0 0 | ⟨R, ?⟩ |
| 1 1 0 1 | **— excluded** |
| 1 1 1 0 | **— excluded** |
| 1 1 1 1 | ⟨?, ?⟩ |

**6 concepts are excluded because of the inductive bias** — and every one of them needs a **disjunction** or a **negation** to express (e.g. `0111` = "everything except Red-Round" = ¬⟨R,R⟩). A conjunction of attribute values simply cannot say that.

> [!NOTE]
> **This is a *restriction bias* (also called a *language bias*).** The slides say it exactly: *"Our bias: concepts are of a particular kind called **conjunctive concepts**, because of which the hypothesis space is restricted. Hence it is a Restriction Bias."* Contrast this with ID3's **preference bias** later in the unit.

> [!TRAP]
> A restriction bias buys tractability at a price: **the target concept may or may not be present in the hypothesis space** — and it certainly won't be if the true concept is disjunctive, or if there are errors in the training data.

---

## Counting practice problems

### Practice 1 (this is Mitchell's *EnjoySport*)

*A data object is defined by 6 attributes: $a_1$ has 3 values, $a_2 \dots a_6$ are binary.*

- **Instance space:** $|X| = 3\times2\times2\times2\times2\times2 = 96$
- **Concept space:** $2^{|X|} = \mathbf{2^{96}}$
- **Hypothesis space (with the conjunctive bias):** $(3{+}1)\times(2{+}1)^5 + 1 = 4 \times 243 + 1 = \mathbf{973}$
- **Reduction from $2^{96}$ to 973.**

> [!NOTE]
> Mitchell also counts the **syntactically distinct** hypotheses — allowing each of the 6 slots to be a value, `?`, *or* `Ø` — giving $5\cdot4\cdot4\cdot4\cdot4\cdot4 = 5120$. The **973** figure is the *semantically* distinct count, because every hypothesis containing at least one `Ø` denotes the same empty set. If a question says "semantically distinct", use the $+1$ formula.

### Practice 2

*Remote-work dataset with 4 attributes — Experience {Junior, Mid, Senior}, Location {City, Suburb, Rural}, Tech Stack {Frontend, Fullstack, Backend}, Team Size {Small, Medium, Large}, boolean target Remote.*

- **Instance space:** $3\times3\times3\times3 = \mathbf{81}$
- **Concepts:** $\mathbf{2^{81}}$
- **Semantically distinct hypotheses:** $(4\times4\times4\times4) + 1 = \mathbf{257}$

> [!EXAM]
> These three numbers — $|X|$, $2^{|X|}$, and $\prod(|v_i|+1)+1$ — are worth easy marks and are asked *constantly*. Write the formula, substitute, box the answer. Don't forget the **+1**.

---

## Version space

The training data is only a **subset** of all possible data. Among the hypotheses in $H$, some are compatible with what you've seen and some aren't.

> A hypothesis $h$ is **consistent** with a training set $D$ if it classifies **all** the objects of $D$ into their corresponding classes.

> **The version space is the set of all hypotheses from the hypothesis space that are consistent with the training data:**
> $$VS_{H,D} = \{\, h \;:\; h \in H \ \wedge\ h \text{ is consistent with } D \,\}$$

So $VS \subseteq H \subseteq \text{Concept Space}$.

### Worked example

| Code | Colour | Shape | Edible? | |
|---|---|---|---|---|
| RR | Red | Round | **Yes** | ← training |
| RL | Red | Long | **No** | ← training |
| GR | Green | Round | *(unknown)* | |
| GL | Green | Long | *(unknown)* | |

Test each of the 10 hypotheses against the two labelled rows. Only two survive:

$$VS = \{\ \langle R, R\rangle,\ \langle ?, R\rangle\ \}$$

- ⟨R,R⟩ accepts only Red-Round ✔ (RR positive, RL negative) ✔
- ⟨?,R⟩ accepts anything Round ✔ (RR positive, RL negative) ✔
- ⟨R,?⟩ would accept RL — inconsistent ✘. ⟨?,?⟩ accepts everything ✘. And so on.

> [!INTUITION]
> The version space is your **remaining uncertainty**, made explicit. Every new training example that contradicts some hypotheses shrinks it. If the version space collapses to one hypothesis, you've identified the concept exactly; if it becomes **empty**, your bias was wrong (or your data is noisy) — no conjunction can explain the data.

> [!NOTE]
> A partially-learned version space is still useful. If **every** hypothesis in $VS$ labels a new instance positive, you can classify it positive with full confidence; if all label it negative, likewise negative; if they split, you must abstain. (Mitchell shows you only need to test the *most specific* boundary $S$ to check the first case and the *most general* boundary $G$ for the second.)

---

## Why bias is not optional

Mitchell's argument, worth 4–5 marks on its own:

1. **A biased hypothesis space can miss the target.** A conjunctive $H$ cannot express "Sky = Sunny **or** Sky = Cloudy". Given three examples of that concept, the version space is **empty**.
2. **So make $H$ the power set of $X$** — every possible concept expressible via arbitrary conjunctions, disjunctions and negations. Now the target is guaranteed to be in $H$…
3. **…but now the learner cannot generalise at all.** The most specific consistent hypothesis is just the *disjunction of the observed positives*; the most general is the *negated disjunction of the observed negatives*. **The only instances classified unanimously are the training examples themselves.** Every unseen instance is called positive by exactly half the version space and negative by the other half, so even voting is useless.

> **The futility of bias-free learning:** *a learner that makes no a priori assumptions regarding the identity of the target concept has **no rational basis for classifying any unseen instances.***

### The formal definition of inductive bias

> The **inductive bias** of a learner $L$ is any **minimal set of assertions $B$** such that for any target concept $c$ and training data $D_c$:
> $$(\forall x_i \in X)\ \big[(B \wedge D_c \wedge x_i) \vdash L(x_i, D_c)\big]$$

In words: **the extra assumptions that would turn the learner's inductive leaps into deductive consequences.** For the conjunctive learners of this chapter, that assumption is simply **"the target concept $c$ is contained in the hypothesis space $H$."**

> [!EXAM]
> A very common long question: *"What is inductive bias? Why is it necessary?"* Answer in three beats: (1) the formal definition above; (2) the counting argument — without bias, $H$ = power set, $|VS|$ never shrinks usefully, generalisation is impossible; (3) name the two kinds — **restriction/language bias** (Find-S, Candidate-Elimination) vs **preference/search bias** (ID3), which you meet later in this unit.

---

**Next:** the first actual learning algorithm — **Find-S**, which walks the hypothesis space from most-specific upward.
