---
subject: ml
unit: 2
order: 3
slug: multilayer-xor
title: Multilayer Networks & the XOR Problem
summary: Why one perceptron can't do XOR, how a network of perceptrons can represent any Boolean function, and MLP architecture.
minutes: 12
tags: [XOR, MLP, hidden-layer, universal, linear-inseparable]
---

# Multilayer Networks & the XOR Problem

## XOR breaks a single perceptron

Try to find perceptron weights for XOR:

| $x_1$ | $x_2$ | XOR | Constraint |
|---|---|---|---|
| 0 | 0 | 0 | $w_0 < 0$ |
| 0 | 1 | 1 | $w_2 \ge -w_0$ |
| 1 | 0 | 1 | $w_1 \ge -w_0$ |
| 1 | 1 | 0 | $w_1 + w_2 < -w_0$ |

Rows 2 and 3 demand $w_1 \ge -w_0$ **and** $w_2 \ge -w_0$, so $w_1 + w_2 \ge -2w_0 > -w_0$. But row 4 demands $w_1 + w_2 < -w_0$ — a **direct contradiction**. No single line separates XOR; it is **not linearly separable**.

> [!TRAP]
> Most real-world data is **linearly *inseparable*** — this is exactly why a single perceptron (or MP neuron) is too weak. The fix: stack perceptrons into a **network**.

## A network of perceptrons can represent any Boolean function

**Construction** (2 inputs, True = +1 / False = −1):

- A **hidden layer of 4 perceptrons**, each wired to both inputs. With bias $w_0 = -2$ (fires when weighted sum $\ge 2$) and edge weights of $+1$ (blue) or $-1$ (red), **each hidden perceptron fires for exactly one of the 4 input combinations** — no two fire for the same input.
- An **output perceptron** combines them via weights $w_1,\dots,w_4$ (these are *learned*).

Because each hidden unit "owns" one input pattern, the output conditions become **independent** (one weight per pattern) — so for XOR you get conditions like $w_1 < w_0,\ w_2 \ge w_0,\ w_3 \ge w_0,\ w_4 < w_0$ with **no contradiction**. Every Boolean function (separable or not) yields its own non-contradicting set.

> [!INTUITION]
> The hidden layer **re-represents** the input: it bends the inseparable XOR into a new space where the classes *are* linearly separable, then the output neuron draws the easy line. Hidden layers = automatic feature construction.

## Multilayer network (MLP) architecture

A typical ANN has three kinds of layers:

| Layer | Role |
|---|---|
| **Input layer** | Feeds in features. # units = # input features. **No computation.** |
| **Hidden layer(s)** | The **core of learning** — derives complex relationships & patterns. Can be many. |
| **Output layer** | Emits the final output. |

- More than one hidden layer → a **Deep ANN (DNN)**.
- A fully-connected multilayer network → a **Multilayer Perceptron (MLP)**; every neuron connects to all neurons in adjacent layers.
- The **number of layers and neurons** are **hyperparameters** (set by you, not learned).

> [!EXAM]
> Be ready to: (1) *prove* XOR is not linearly separable via the contradicting inequalities, and (2) state that a 2-layer network of perceptrons can implement **any** Boolean function. Name the three layers and note the input layer does **no computation**.

---

**Next:** the harsh step function gives way to the smooth, differentiable **sigmoid neuron**.
