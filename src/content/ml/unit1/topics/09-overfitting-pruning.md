---
subject: ml
unit: 1
order: 9
slug: overfitting-pruning
title: Overfitting & Pruning
summary: The formal overfitting definition, why trees overfit, early termination vs post-pruning, the reduced-error pruning walkthrough, rule post-pruning with rule ordering, and how to pick tree size.
minutes: 22
tags: [overfitting, pruning, reduced-error-pruning, rule-post-pruning, validation-set, MDL]
---

# Overfitting & Pruning

## What overfitting is

> **Overfitting means becoming too specific to the training set.**

Trying to make the tree very specific to the training instances means **the tree may do really badly on new instances / test data**. The model does wonders with training data but very badly with test data — and **overfitting can occur with almost all ML models**, not just trees.

**Reasons overfitting turns out to be bad:**

1. **Noise in data** — mislabelled or corrupted examples,
2. **Training set too small**,
3. **Training set biased** — not representative of the target function.

## The formal definition (learn it word-for-word)

Consider the error of hypothesis $h$ over

- the **training data**: $\text{error}_{\text{train}}(h)$
- the **entire distribution $\mathcal{D}$** of data: $\text{error}_{\mathcal{D}}(h)$

> **Definition.** Given a hypothesis space $H$, a hypothesis $h \in H$ **overfits** the training data if there exists an alternative hypothesis $h' \in H$ such that
>
> $$\text{error}_{\text{train}}(h) \;<\; \text{error}_{\text{train}}(h')$$
> $$\text{and}\qquad \text{error}_{\mathcal{D}}(h) \;>\; \text{error}_{\mathcal{D}}(h')$$
>
> — i.e. **$h$ has smaller error than $h'$ over the training examples, but $h'$ has smaller error than $h$ over the entire distribution of instances.**

> [!NOTE]
> Where does that alternative $h'$ come from? Either from a **different algorithm**, or by **making changes to the decision tree built by ID3** — which is exactly what pruning does. This is why the definition and the cure are taught together.

> [!TRAP]
> The definition is a **comparison between two hypotheses**, not a statement about one. "The model has 99% train accuracy and 60% test accuracy" is *evidence* of overfitting, not the definition. Write the two inequalities.

## Overfitting made concrete

**Mitchell's noise example.** Add one mislabelled example to the 14-row PlayTennis table:

$$\langle \text{Outlook}=\text{Sunny},\ \text{Temp}=\text{Hot},\ \text{Humidity}=\text{Normal},\ \text{Wind}=\text{Strong},\ \text{PlayTennis}=\textbf{No}\rangle$$

On the clean data ID3 produces the familiar small tree. This one bad row lands in the *Sunny → Humidity = Normal* leaf alongside two genuine positives; because it is labelled negative, **ID3 keeps splitting below that node** until it separates the liar from the truth-tellers. The tree grows, training accuracy stays at 100%, and future accuracy falls.

**The slides' complementary example — overfitting without noise.** Take the clean tree and a new test instance:

$$\text{Sunny, High, Normal, Strong} \;\to\; \textbf{No (true label)}$$

Trace the tree: *Sunny → Humidity → Normal → **Yes***. **Leads to an error.** With our tree, once it sees Sunny it only checks Humidity, and if Humidity = Normal it outputs Yes. **In our training set, if we had had even one example where the answer was No under this branch, we would have required another decision node** and the tree would have been deeper. The tree isn't wrong because of noise — it's wrong because the training sample never contained the counter-example.

## The two curves

```
Mean Average Error
   │╲                                    ← validation error
   │ ╲     ╭──────────╮
   │  ╲___╱            ╲______  Validation
   │  ╲
   │   ╲______________________  Training
   └────────────┬─────────────────→  Tree Depth
    Underfitting │  Overfitting
              optimum
```

- **Training error decreases monotonically** as the tree grows.
- **Validation/test error first decreases, then increases.** (In Mitchell's diabetes experiment the turn happens at about **25 nodes**.)

**"What is the depth at which we should stop making the decision tree further?"** The slides answer honestly: **not possible to know — experiment and see.** That is what a validation set is for.

## The three-way data split (again, but now it earns its keep)

The available data is split into three subsets:

- the **training** examples,
- the **validation** examples — **used for pruning the tree**,
- a set of **test** examples — used to provide an **unbiased estimate of accuracy over future unseen examples**.

> [!NOTE]
> A common heuristic is to withhold **one third** of the data for validation and train on the other two thirds. The **major drawback**: when data is limited, withholding a validation set shrinks the training set further — which is precisely why rule post-pruning with a *pessimistic estimate on the training set* (C4.5) was invented.

---

## Avoiding overfitting

1. **Use another algorithm** and see if you get a better tree.
2. **Use ID3 itself but modify the tree** to make it perform better on new instances. There is **no guarantee** the change produces a better tree — you have to experiment and see.
   - **Pruning:** *cut off the tree at some point and make that a leaf node, putting the decision as the category to which the majority of the instances under that branch belong.* **This implies we are making the tree more general.**

### Two families of pruning

| | **Early Termination (pre-pruning)** | **Post Pruning** |
|---|---|---|
| Idea | **Stop growing the tree earlier**, before it reaches the point where it perfectly classifies the training data | **Allow the tree to overfit the data, then post-prune it** |
| Rule | Halt growth when **the goodness of the split falls below a threshold** | Fully grow the tree, then **selectively chop a node and replace it with its most popular class** |
| Example criteria | a certain **minimum information gain**; a **maximum depth** set before the algorithm begins; a minimum number of samples per node | reduced-error pruning; rule post-pruning |
| Verdict | Cheaper, but you must guess the stopping rule blind | **Found to be more effective**, due to the difficulty of knowing when to stop growing |

> [!INTUITION]
> Pre-pruning is deciding not to take a turn because the road *looks* like a dead end. Post-pruning is driving to the end, seeing it's a dead end, and reversing. The second is slower but it actually knows. **Post-pruning wins**, and the slides say so explicitly.

---

## Post-Pruning Method I — Reduced-Error Pruning

**The procedure:**

- Consider **each of the decision nodes in the tree to be candidates for pruning**.
- **Pruning a decision node consists of:**
  1. **removing the subtree rooted at that node**,
  2. **making it a leaf node**,
  3. **assigning it the most common classification of the training examples affiliated with that node**.
- **Nodes are removed only if the resulting pruned tree performs no worse than the original over the validation set.**
- Nodes are pruned **iteratively**, **always choosing the node whose removal most increases the tree's accuracy over the validation set**.
- Pruning **continues until further pruning is harmful** (i.e. it decreases validation accuracy).

### The worked walkthrough

Start with the fully grown tree on the 2-D orange/blue dataset:

```
x ≤ 5.0 ?  Y → ORANGE
           N → x ≤ 5.4 ? Y → y ≤ 7.5 ? Y → BLUE
                                       N → y ≤ 8.4 ? Y → ORANGE
                                                     N → BLUE
                         N → BLUE
```

| Round | Action | Validation error | Decision |
|---|---|---|---|
| 0 | Build the complete tree, record its validation error | baseline | — |
| 1 | Prune the deepest node **(y ≤ 8.4)**, replace with the majority class in that branch | **reduced** | **keep the change**, continue |
| 2 | Prune the new deepest node **(y ≤ 7.5)** | **reduced** | **keep**, continue |
| 3 | Prune **(x ≤ 5.4)** — collapsing to `x ≤ 5.0 ? ORANGE : BLUE` | **increased** | **revert the change and stop pruning** |

**Final tree:**

```
x ≤ 5.0 ? Y → ORANGE
          N → x ≤ 5.4 ? Y → ORANGE
                         N → BLUE
```

Stop, since there is no other node to prune at that level.

> **When pruning begins, the tree is at its maximum size and lowest accuracy over the validation set. As pruning proceeds, the number of nodes is reduced and accuracy over the validation set increases.**

> [!TRAP]
> Prune **from the leaves upward**, and evaluate on the **validation set** — never on the training set (pruning can only *hurt* training accuracy, so a training-set criterion would prune nothing). And the replacement label is the **majority class of the training examples at that node**, not of the validation examples.

---

## Post-Pruning Method II — Rule Post-Pruning

Used by a variant in **C4.5**. **Rule post-pruning removes pre-conditions to improve error.**

**Procedure:**

1. **Convert the tree to an equivalent set of rules** — one rule per path from root to leaf. A learned rule looks like `if A1 ∧ A2 ∧ … then C`, where $A_1, A_2, \dots$ are the **preconditions / constraints / body / antecedents** and $C$ is the **postcondition / head / consequent**.
2. **Prune each rule by removing preconditions that result in improved estimated accuracy** (calculate the rule accuracy over the validation set).
3. **Sort the pruned rules by their estimated accuracy** and consider them **in that sequence** when classifying unseen instances.

### Worked example

Tree:

```
                    windy
        true /                \ false
       outlook                 temp
 sunny/ overcast \rain    hot /  mild  \ cool
humidity  good   bad   outlook  outlook  good
 high/ \normal        s/ o \r   s/ o \r
 bad    good        bad good ?  bad  ?  good
```

**Each path from root to leaf becomes a rule**, e.g. `if ¬windy ∧ hot ∧ sunny then bad`. **Different pruning decisions can be made for different rules.**

Extracted, then pruned. Literals in ~~strikethrough~~ were **removed**, because removing them did not worsen the rule's estimated accuracy:

| Original rule (from one root-to-leaf path) | After pruning |
|---|---|
| if ~~windy~~ ∧ sunny ∧ high **then** bad | if sunny ∧ high **then** bad |
| if ~~windy~~ ∧ sunny ∧ normal **then** good | if sunny ∧ normal **then** good |
| if ~~windy~~ ∧ overcast **then** good | if overcast **then** good |
| if windy ∧ rain **then** bad | *(unchanged)* |
| if ~~¬windy~~ ∧ hot ∧ sunny **then** bad | if hot ∧ sunny **then** bad |
| if ~~¬windy ∧ hot~~ ∧ overcast **then** good | if overcast **then** good |
| if ¬windy ∧ mild ∧ sunny **then** bad | *(unchanged)* |
| if ¬windy ∧ ~~mild~~ ∧ rain **then** good | if ¬windy ∧ rain **then** good |
| if ¬windy ∧ cool **then** good | *(unchanged)* |

**Rule ordering — order rules by accuracy and coverage** (the leading number is coverage):

```
4  if overcast                 then good
3  if ¬windy ∧ rain            then good
3  if sunny ∧ high             then bad
2  if sunny ∧ normal           then good
2  if ¬windy ∧ cool            then good
2  if windy ∧ rain             then bad
2  if hot ∧ sunny              then bad
1  if ¬windy ∧ mild ∧ sunny    then bad
```

> **Each such rule is pruned by removing any precondition whose removal does not worsen its estimated accuracy.**

### Why convert to rules before pruning? (three advantages)

1. **It distinguishes the different contexts in which a decision node is used.** Each distinct path produces a distinct rule, so the pruning decision for an attribute test can be made **differently for each path**. If you pruned the tree instead, your only choices are to remove the decision node entirely or keep it in full.
2. **It removes the distinction between tests near the root and tests near the leaves** — you avoid messy bookkeeping like "how do I reorganise the tree if the root is pruned but part of the subtree is retained?"
3. **Readability.** Rules are easier for people to understand.

> [!NOTE]
> **How does C4.5 estimate rule accuracy without a validation set?** It evaluates on the **training set itself, using a pessimistic estimate**: take the observed accuracy over the examples the rule applies to, compute the standard deviation assuming a **binomial** distribution, and take the **lower bound** for a given confidence level (for 95%, observed accuracy $- 1.96\sigma$). For large data sets the penalty is tiny; for small sets it bites hard. Not statistically rigorous, but useful in practice.

---

## Criteria for finding the correct tree size

- Either **stop growing the tree earlier** or **prune it afterwards** — **post-pruning has been more effective**.
- Use a **separate set of examples**, distinct from the training examples, to evaluate the post-pruning nodes.
- Apply a **statistical test** (e.g. a chi-squared test) to estimate whether expanding or pruning a node is likely to produce an improvement **beyond the training set**.
- **Minimum Description Length (MDL) principle** — another way to minimise the model, combining the tree's size/depth and its error into a single improved cost function. *(Marked out of scope of the syllabus to discuss, but name it — it is a Bayesian-flavoured version of Occam's razor and it reappears in Unit 3.)*

> [!EXAM]
> *"Explain reduced-error pruning and rule post-pruning."* — 8 marks. Give: the definition of overfitting; the pre- vs post-pruning table; the 5-bullet reduced-error procedure; the 4-step rule post-pruning procedure **plus the three advantages of converting to rules**; and one line on which is preferred and why.

---

**Next:** the practical extensions — continuous attributes, missing values, and attributes that cost money.
