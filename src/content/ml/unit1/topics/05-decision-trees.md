---
subject: ml
unit: 1
order: 5
slug: decision-trees
title: Decision Trees — Representation
summary: Tree structure, terminology, disjunction-of-conjunctions, the build loop, and ID3 vs CART.
minutes: 11
tags: [decision-tree, representation, ID3, CART]
---

# Decision Trees — Representation

A **decision tree** is a flowchart-like model that makes a decision through a series of attribute tests. The learned function *is* the tree, and it can be re-written as human-readable **if–then rules**. Decision trees handle **both classification and regression**.

## How a tree classifies

To classify an instance, **sort it down the tree** from the root to a leaf:

- **Node (decision node)** — tests *one attribute* of the instance.
- **Branch** — corresponds to *one possible value* of that attribute.
- **Leaf** — assigns the final *class label* (or value).

## Terminology

| Term | Meaning |
|---|---|
| **Root node** | Topmost node; where tree-building starts. |
| **Decision / internal node** | Tests an attribute and branches on its values. |
| **Branch / edge** | One outcome of an attribute test. |
| **Leaf / terminal node** | Carries the decision (class label). |
| **Sub-tree** | A tree hanging off a decision node. |

> Every node *except* the leaves is a decision node.

## Worked structure — "Play Tennis"

```
                 Outlook
        ┌───────────┼───────────┐
     Sunny      Overcast       Rain
       │            │            │
    Humidity       Yes         Wind
    ┌───┴───┐               ┌───┴───┐
  High   Normal           Strong   Weak
    │       │               │        │
   No      Yes             No       Yes
```

## Decision trees = disjunction of conjunctions

Each **root-to-leaf path is a conjunction** (AND) of attribute tests; the **whole tree is a disjunction** (OR) of those paths. The "Yes" decision above means:

$$(\text{Outlook}{=}\text{Sunny} \wedge \text{Humidity}{=}\text{Normal}) \ \vee\ (\text{Outlook}{=}\text{Overcast}) \ \vee\ (\text{Outlook}{=}\text{Rain} \wedge \text{Wind}{=}\text{Weak})$$

> [!INTUITION]
> This is exactly **why decision trees are more expressive than Find-S.** Find-S can only represent a *single conjunction*; a tree represents a **disjunction of conjunctions**, so it can carve out far more complex concepts (recall the 6 fruit-concepts the conjunctive bias excluded — a tree can express them).

> [!NOTE]
> **Decision trees can represent *any* Boolean function.** Mitchell (Exercise 3.1) asks you to draw trees for $A\wedge\neg B$, $A\vee(B\wedge C)$, and even $A\oplus B$ (**XOR**). A single perceptron fails on XOR (next unit) — but a decision tree handles it, because the disjunction-of-conjunctions form is complete over Boolean functions.

## Building a decision tree (top-down, greedy)

```
1. Select the BEST decision attribute for the current node.   ← the crux
2. Make it the decision attribute for that node.
3. For each value of the attribute, create a descendant branch.
4. Sort the training examples down to the new descendant nodes.
5. If the examples at a node are perfectly classified → STOP (leaf);
   else recurse on that node with the remaining attributes.
```

Everything hinges on **Step 1: "best attribute"**. Different choices give different trees.

## One task, many trees

For the same data (e.g. "does a student play basketball?" using Gender, Performance, Height), you can build **many valid trees** by ordering the attribute tests differently. They all fit the training data, but they differ in **size**. *Which do we prefer?* → the **smallest** tree that fits (Occam's razor), because shorter trees tend to generalise better. The job of a *splitting criterion* (entropy/information gain, or Gini) is to push us toward that small tree greedily.

## Two classic algorithms

| | **ID3** (Iterative Dichotomiser 3) | **CART** (Classification & Regression Trees) |
|---|---|---|
| Author / year | Ross Quinlan, 1986 | Leo Breiman |
| Tree shape | **Multiway** (one branch per attribute value) | **Binary** splits |
| Split heuristic | **Information Gain** (entropy) | **Gini impurity** (classification), **least squares** (regression) |
| Tasks | Classification (extendable to regression) | Classification *and* regression |

> [!EXAM]
> Remember the pairing: **ID3 → entropy / information gain**; **CART → Gini impurity / sum of squares**. And know that ID3 builds a *multiway* tree while CART builds *binary* trees.

---

**Next:** the engine of ID3 — **entropy** and **information gain**, with full worked examples.
