---
subject: ml
unit: 1
order: 8
slug: inductive-bias-issues
title: ID3 — Hypothesis Space, Inductive Bias & Issues
summary: ID3's search properties, Occam's razor, preference vs restriction bias, the many-valued-attribute bias and gain ratio, and the checklist of issues in decision tree learning.
minutes: 16
tags: [inductive-bias, preference-bias, restriction-bias, occams-razor, gain-ratio, hypothesis-space, issues]
---

# ID3 — Hypothesis Space, Inductive Bias & Issues

## The hypothesis space ID3 searches

> **The hypothesis space of ID3 is the set of all possible decision trees.**

ID3 performs a **simple-to-complex, informed search** through this space:

- it uses **gain** as the heuristic,
- it uses a **greedy search** strategy,
- it **outputs a single hypothesis** (one decision tree),
- and it **does not guarantee an optimal solution**.

### Four properties worth memorising

| Property | Consequence |
|---|---|
| **Complete hypothesis space** — the space of decision trees can express **any finite discrete-valued function** over the attributes | The target function is **guaranteed to be in $H$**. ID3 never suffers Find-S's "target not representable" failure. |
| **No backtracking** — it accepts the first tree it encounters | Susceptible to **converging to a local optimum**, not a global one. Alternative hypotheses (other trees) consistent with the data are **not explored at all**. The search is **incomplete**. |
| **Single current hypothesis** (unlike Candidate-Elimination, which keeps the whole version space) | It cannot say *how many* trees are consistent with the data, and cannot pose discriminating queries. |
| **Statistically-based search choices** — at every step it looks at **all instances** that fall under the branch | **Robust to noisy data** (contrast Find-S, which reacts to **one example at a time**). Missing values can be replaced by the mode/average at that level. Extending ID3 to noisy data just means relaxing the termination criterion. |

> [!INTUITION]
> Find-S is jumpy — one bad example rewrites its hypothesis permanently. ID3 is deliberative — one bad example moves an information gain by a few hundredths and probably doesn't change which attribute wins. That difference is *entirely* due to using aggregate statistics instead of individual examples.

---

## The inductive bias of ID3

> **ID3 prefers the shortest trees (Occam's razor) and prefers attributes with the highest gain — this is a *Preference Bias*, arising from ID3's search strategy.**

Mitchell states it at two levels of precision:

> **Approximate inductive bias of ID3:** *Shorter trees are preferred over larger trees.*

> **A closer approximation:** *Shorter trees are preferred over longer trees. **Trees that place high information gain attributes close to the root are preferred** over those that do not.*

Heuristically ID3 *should* find a short consistent tree, because it is biased to place high-gain attributes nearest the root — but because of the subtle interaction between the gain heuristic and the particular data, **it does not always find the shortest consistent tree**.

> [!NOTE]
> **BFS-ID3** is the thought experiment that pins this down: an algorithm that searches **breadth-first** through trees of depth 1, then depth 2, … and returns the smallest consistent tree it finds. BFS-ID3 exhibits *precisely* the bias "shorter trees are preferred". **ID3 is an efficient greedy approximation to BFS-ID3** — it tries to find the shortest tree without paying for the whole breadth-first search.

### Occam's razor

> **Occam's razor: prefer the simplest hypothesis that fits the data.** (William of Occam, c. 1320.)

**The argument for it:** there are far **fewer short hypotheses than long ones**, so it is **less likely that a short hypothesis fits the training data by coincidence**. There are many more 500-node trees than 5-node trees; finding a 500-node tree that fits 20 examples is unsurprising, while a 5-node tree that fits them perfectly is real evidence.

**Two objections Mitchell raises** (good for a "critically discuss" question):

1. By the same reasoning you could prefer *"trees with exactly 17 leaves, 11 internal nodes, testing $A_1$ at the root"* — that set is small too. Why is "short description" a more privileged small set than any other arcane one?
2. **Size depends on the representation.** A learner given a hand-crafted boolean attribute XYZ (true exactly when the big tree says positive) would represent the same function as a **one-node** tree. Two learners both applying Occam's razor would then reach contradictory conclusions.

---

## Preference bias vs restriction bias — the exam table

| | **ID3** | **Find-S / Candidate-Elimination** |
|---|---|---|
| Hypothesis space | **Complete** (all discrete-valued functions) | **Incomplete** (only conjunctions) |
| Search through it | **Incomplete** (greedy, no backtracking) | **Complete** (finds every consistent hypothesis) |
| Where the bias comes from | **The search strategy / ordering of hypotheses** | **The definition of the search space** |
| Name of the bias | **Preference bias** (= search bias) | **Restriction bias** (= language bias) |
| Risk | May miss the best hypothesis | May **exclude the target concept altogether** |

> **In brief: the inductive bias of ID3 follows from its *search strategy*, whereas the inductive bias of the Find-S / Candidate-Elimination algorithm follows from the *definition of its search space*.**

**Which is better?** **A preference bias is typically more desirable**, because the learner works within a **complete hypothesis space assured to contain the unknown target function**. A restriction bias that strictly limits the hypotheses introduces the possibility of **excluding the target function entirely** — which is exactly what broke Find-S on the disjunctive counter-example.

> [!EXAM]
> "Differentiate preference bias and restriction bias with examples" is a standing 5-mark question. Give the table, then the one-sentence summary in bold above, then say which is preferable **and why**.

> [!NOTE]
> Some systems combine both. The checkers evaluation function of Mitchell's Chapter 1 uses a **linear combination of board features** (a restriction bias — non-linear functions are unrepresentable) **and** the LMS parameter-tuning rule (a preference bias from the ordered search over parameter values).

---

## The bias toward many-valued attributes (and its fix)

> **The inductive bias of ID3 favours attributes with many values**, as these are more likely to lead to reduced entropy and thus increased gain.

**The extreme example:** add an attribute **Date** to the 14-row PlayTennis table. Date takes 14 distinct values, so it splits the data into 14 singletons, each perfectly pure. Its information gain is **maximal**, so it becomes the root, giving a very broad depth-1 tree that classifies the training data perfectly — **and predicts nothing at all** about a new day.

**The fix — gain ratio (Quinlan 1986), used in C4.5.** Penalise attributes that split broadly and uniformly, using **split information**:

$$\text{SplitInformation}(S,A) \;=\; -\sum_{i=1}^{c}\frac{|S_i|}{|S|}\log_2\frac{|S_i|}{|S|}$$

$$\boxed{\ \text{GainRatio}(S,A) \;=\; \frac{\text{Gain}(S,A)}{\text{SplitInformation}(S,A)}\ }$$

> [!NOTE]
> **SplitInformation is the entropy of $S$ with respect to the *values of $A$*** — not with respect to the target. That contrast is the whole trick, and it's the sentence that earns the mark.
>
> - An attribute that separates $n$ examples completely (like Date) has SplitInformation $= \log_2 n$ — a big divisor.
> - A boolean attribute splitting them exactly in half has SplitInformation $= 1$ — no penalty.
> - So if two attributes give the same Gain, the **less fragmenting one scores higher**.

**Practical caveat:** the denominator can be **zero or very small** when one subset holds nearly all of $S$, making GainRatio undefined or absurdly large. Quinlan's heuristic: **compute Gain for all attributes first, then apply the GainRatio test only to those with above-average Gain.**

---

## The checklist: issues in decision tree learning

The slides list these as *the* issues; each of the first four has its own treatment later:

| # | Issue | Where it is handled |
|---|---|---|
| a | **Overfitting of data** — ID3 makes the tree too specific to the given instances | Overfitting & Pruning topic |
| b | **Handling continuous attributes** | Continuous, Missing & Costly Attributes topic |
| c | **Handling attributes with missing values** | same |
| d | **Handling attributes with differing costs** | same |
| e | **No guarantee on running time** — sometimes it takes enormously long, because there can be too many choices at every step | — |
| f | **Choosing the attribute-selection measure** | gain ratio, above |

> [!EXAM]
> A 6–8 marker: *"Discuss the issues in decision tree learning."* List all six, then expand overfitting (definition + two causes + two pruning families), continuous (dynamic threshold $A_c$), missing (mode / class-conditional mode / fractional instances) and cost ($\text{Gain}^2/\text{Cost}$). That structure is worth full marks.

---

**Next:** overfitting — the formal definition, and the two families of pruning that fix it.
