---
subject: ml
unit: 1
order: 6
slug: decision-trees
title: Decision Trees — Representation & Terminology
summary: Tree anatomy, why a tree is a disjunction of conjunctions, the generic tree-building algorithm, multi-way splits, and ID3 vs CART.
minutes: 14
tags: [decision-trees, terminology, disjunction-of-conjunctions, ID3, CART, if-then-rules]
---

# Decision Trees — Representation & Terminology

## What a decision tree is

- A decision tree is a **flowchart-like diagram that makes decisions based on a series of conditions**.
- **The learned function is represented by the tree itself.**
- A tree can be **re-represented as if-then rules** to improve human readability.
- It works for **both classification and regression**:
  - *Regression:* "What is the temperature going to be tomorrow?" → **84°**
  - *Classification:* "Will it be Cold or Hot tomorrow?" → **HOT**

**Decision trees classify instances by sorting them down the tree from the root to some leaf node.**

- **Node** — specifies some **attribute** of the instance to be tested
- **Branch** — corresponds to one of the **possible values** of that attribute

## Terminology

| Term | Meaning |
|---|---|
| **Root node** | The topmost node, where tree construction starts. |
| **Decision node** | Any node where branching (testing) occurs — a certain attribute is tested and a branch is taken based on its value. |
| **Leaf node** | The end of the path; **carries the decision** (the class label or predicted value). |
| **Sub-tree** | Any node together with everything below it. |
| **Branch** | An edge, labelled with one value of the parent's attribute. |

**Note — the five facts to write in a "terminology" answer:**

1. Every node except a leaf node is a decision node.
2. Each decision node tests for **one attribute**.
3. Each branch corresponds to **one attribute value**.
4. Each leaf node assigns a **classification label**.
5. **Decision trees represent a *disjunction of conjunctions* — which makes them more expressive than Find-S.**

---

## Why "disjunction of conjunctions" matters

Take the classic PlayTennis tree:

```
                  Outlook
        sunny /      | overcast    \ rain
        Humidity     yes           Wind
     high/   \normal          strong/   \weak
      no      yes               no       yes
```

Read every **root-to-leaf path that ends in "yes"**, AND the tests along it, then OR the paths together:

$$\text{Play} = (\text{Outlook}{=}\text{Sunny} \wedge \text{Humidity}{=}\text{Normal})\ \vee\ (\text{Outlook}{=}\text{Overcast})\ \vee\ (\text{Outlook}{=}\text{Rain} \wedge \text{Wind}{=}\text{Weak})$$

Each **path is a conjunction**; the **set of paths is a disjunction**.

> [!INTUITION]
> This is the exact capability Find-S lacked. Find-S can only utter one conjunction, so a concept like *"Low, or High-with-$a_3$=1"* destroyed it. A tree just grows two branches and says both. **Decision trees can represent any function over discrete-valued attributes** — the hypothesis space is *complete*.

> [!EXAM]
> "Convert the given decision tree into a set of if-then rules" is a standard 4–5 mark question. One rule per **leaf**: antecedents = the attribute tests along the path, consequent = the leaf's label. e.g. `IF (Outlook = Sunny) ∧ (Humidity = High) THEN PlayTennis = No`.

---

## Branches need not be binary

The loan-application tree from the slides is a good multi-way example — note that **Income Range** has three branches and **years in job** has three:

```
                        Income Range
            <30K /         30–70K |            \ >70K
        Govt job?                No. years         Criminal record?
      yes/    \no          <1 /  1–5 |  \ >5      yes/       \no
   Approve   Reject     Reject       |  Approve  Reject   Approve with
                              Credit card                double premium
                             outstanding balance
                         high/    medium|    \low
                       Reject    Approve      Approve with premium
```

Points worth noticing: an attribute may reappear at different depths in different sub-trees; different branches may use entirely different attributes; and leaves may carry more than two outcomes ("Approve", "Reject", "Approve with premium", "Approve with double premium").

---

## The generic tree-building algorithm

```
1. Select the "best" decision attribute for the next node.   ← the crux of the problem
2. Assign that attribute as the decision attribute for the node.
3. For each value of the attribute, create a new descendant of the node
   (a new branch is opened). Each branch gets the subset of instances
   that fall under it. If no further decision making is required,
   you have reached a leaf node.
4. Sort the training examples down to the new nodes.
5. If the training examples are perfectly classified, STOP;
   else iterate over the new leaf nodes.
```

Everything interesting is hidden inside step 1 — **"best"**. Different definitions of *best* give different algorithms.

## Many trees fit the same data

The slides show three different trees for "does this student play basketball?" — one rooted at *Gender*, one at *Performance*, and so on — **all consistent with the same training data**. So: **which one do we prefer, and why?**

That question has two answers, and you need both:
- a **local, greedy criterion** for picking the attribute at each node → **information gain** (next topic);
- a **global preference** among all consistent trees → **Occam's razor: prefer the shortest tree** (the inductive-bias topic).

---

## The two algorithms named in the syllabus

| | **ID3** | **CART** |
|---|---|---|
| Full name | **Iterative Dichotomiser 3** | **Classification And Regression Trees** |
| Author / year | **Ross Quinlan, 1986** | term introduced by **Leo Breiman** |
| Tree shape | **Multiway tree** (one branch per attribute value) | **Binary** tree |
| Split criterion | **Information gain** (greedy, per node) | **Gini impurity** for classification; **sum of least squares** for regression |
| Attributes | **Categorical** features | Categorical and continuous |
| Use | Classification (and regression) | Classification or regression |

> [!NOTE]
> ID3 finds, **for each node in a greedy manner, the categorical feature that will yield the largest information gain** for the target. Its successor **C4.5** (also Quinlan) adds gain ratio, continuous attributes, missing values and rule post-pruning — several of which appear later in this unit.

> [!TRAP]
> Don't say "ID3 builds a binary tree". ID3 opens **one branch per attribute value**, so a 3-valued attribute gives 3 branches. CART is the binary one. Also: ID3 **uses each attribute at most once along any path** (once you've split on Outlook, every instance below has a fixed Outlook, so it carries no more information on that path).

---

**Next:** the split criterion itself — entropy and information gain, with the tree built by hand.
