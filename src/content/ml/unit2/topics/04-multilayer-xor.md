---
subject: ml
unit: 2
order: 4
slug: multilayer-xor
title: Multilayer Networks & the XOR Problem
summary: Why a single perceptron fails on linearly inseparable data, the three-layer network of perceptrons, and the XOR construction that shows any Boolean function can be implemented with one hidden layer.
minutes: 11
tags: [xor, multilayer, hidden-layer, linear-separability, network-of-perceptrons, representation]
---

# Multilayer Networks & the XOR Problem

## When does a single perceptron fail?

> [!NOTE]
> - If data is **not linearly separable** — as with the **XOR** function — then a single perceptron is **not enough to represent the functionality**.
> - In fact, **most real-world data is linearly inseparable**. While a single perceptron cannot deal with such data, **a network of perceptrons can!**

The two figures make the contrast: on the left, a straight line cleanly divides red from blue (**linearly separable**); on the right, a dataset of **concentric rings** where no line can possibly work (**linearly inseparable**).

### Why XOR is impossible for one perceptron

Plot all three functions on the unit square — $x_1$ across, $x_2$ up:

```
        AND                     OR                     XOR
   x2                      x2                     x2
    │   0     1             │   1     1            │   1     0
    │        ╱              │  ╲                   │
    │   0   ╱ 0             │   ╲ 0     1          │   0     1
    └──────╱──── x1         └────╲─────── x1       └──────────── x1

   one line works          one line works        NO straight line
   (cut off the 1)         (cut off the 0)       can do it — the two
                                                 1s sit on a diagonal
```

| $x_1$ | $x_2$ | XOR |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

> [!DERIVE]
> Suppose a single perceptron could do it. Writing $y = 1 \iff w_0 + w_1x_1 + w_2x_2 \geq 0$, the four rows demand:
>
> | Row | Requirement |
> |---|---|
> | $(0,0) \to 0$ | $w_0 < 0$ |
> | $(0,1) \to 1$ | $w_0 + w_2 \geq 0$ |
> | $(1,0) \to 1$ | $w_0 + w_1 \geq 0$ |
> | $(1,1) \to 0$ | $w_0 + w_1 + w_2 < 0$ |
>
> Add rows 2 and 3: $2w_0 + w_1 + w_2 \geq 0$. From row 4, $w_1 + w_2 < -w_0$, so
> $$2w_0 + w_1 + w_2 < 2w_0 - w_0 = w_0 < 0$$
> which **contradicts** $2w_0 + w_1 + w_2 \geq 0$. **The system of inequalities has no solution.**

> [!INTUITION]
> Geometrically it is even quicker. The two 1-outputs sit at $(0,1)$ and $(1,0)$ — **diagonally opposite corners** of the unit square — and the two 0-outputs sit at the other diagonal. **No single straight line separates one diagonal from the other.** That is the entire content of "XOR is not linearly separable."

---

## The network of perceptrons

> [!NOTE]
> The three-layer network used to implement any Boolean function of 2 inputs:
>
> - The **input layer** contains the inputs $(x_1, x_2)$.
> - The **middle layer containing the 4 perceptrons is called the hidden layer**; their outputs are $h_1, h_2, h_3, h_4$.
> - The **final layer containing one output neuron is called the output layer**.
> - The **red and blue edges are the layer-1 weights**; **$w_1, w_2, w_3, w_4$ are the layer-2 weights**.
> - Every hidden perceptron has **bias $= -2$**.

```
   INPUT           HIDDEN LAYER  (bias = −2 on each)        OUTPUT

                    ┌──────────────────┐
              ┌────→│  h1  ↔  (−1,−1)  │────w1────┐
              │     └──────────────────┘          │
              │     ┌──────────────────┐          │
     x1 ──────┼────→│  h2  ↔  (−1, 1)  │────w2────┤    ┌─────────┐
              │     └──────────────────┘          ├───→│    y    │──→
     x2 ──────┼────→┌──────────────────┐          │    └─────────┘
              │     │  h3  ↔  ( 1,−1)  │────w3────┤
              │     └──────────────────┘          │
              │     ┌──────────────────┐          │
              └────→│  h4  ↔  ( 1, 1)  │────w4────┘
                    └──────────────────┘

   exactly ONE hidden unit fires per input pattern  →  one-hot encoding
   so choosing w1..w4 just means "pick which patterns output 1"
```

Each hidden perceptron is labelled with the input combination it responds to:

$$h_1 = (-1,-1), \quad h_2 = (-1,1), \quad h_3 = (1,-1), \quad h_4 = (1,1)$$

> [!EXAM]
> **Why bias $= -2$ is the key to the construction.** Each hidden unit has two incoming weights of $\pm 1$ chosen to match one specific input pattern. Its net input reaches $+2$ **only** when both inputs match its pattern; any mismatch drops it to $0$ or $-2$. With the threshold at $2$ (i.e. bias $-2$), **exactly one hidden neuron fires for each of the four input combinations** — the hidden layer performs a **one-hot encoding** of the input.

---

## Implementing XOR

| $x_1$ | $x_2$ | XOR | $h_1$ | $h_2$ | $h_3$ | $h_4$ | $\sum_{i=1}^{4} w_i h_i$ |
|---|---|---|---|---|---|---|---|
| 0 | 0 | 0 | **1** | 0 | 0 | 0 | $w_1$ |
| 0 | 1 | 1 | 0 | **1** | 0 | 0 | $w_2$ |
| 1 | 0 | 1 | 0 | 0 | **1** | 0 | $w_3$ |
| 1 | 1 | 0 | 0 | 0 | 0 | **1** | $w_4$ |

Let $w_0$ be the bias of the output neuron; it fires if $\sum_{i=1}^{4} w_i h_i \geq w_0$. Here **$w_0 = 0$**.

> [!EXAM]
> Because exactly one $h_i$ is 1 in each row, the sum **collapses to a single weight**. The four rows therefore give **four independent conditions**:
>
> $$w_1 < w_0, \qquad w_2 \geq w_0, \qquad w_3 \geq w_0, \qquad w_4 < w_0$$
>
> **Unlike before, there are no contradictions now and the system of inequalities can be satisfied.** With $w_0 = 0$, any choice such as $w_1 = w_4 = -1$ and $w_2 = w_3 = +1$ works.

The two conclusions the slides draw:

- **Each $w_i$ is now responsible for one of the 4 possible inputs** and can be adjusted to get the desired output for that input.
- **Each Boolean function will result in a different set of non-contradicting inequalities**, which can be satisfied by appropriately setting $w_1, w_2, w_3, w_4$.

> [!INTUITION]
> Compare the two systems of inequalities and the whole lesson of this topic falls out.
>
> For the **single perceptron**, the four conditions all involve the *same* two weights $w_1, w_2$ — they **fight each other**, and we proved they are unsatisfiable.
>
> For the **network**, each condition involves a **different** weight. Nothing competes, so **every** assignment of outputs to the four corners is achievable. The hidden layer has bought us that independence by turning 2 inputs into 4 mutually exclusive indicators.
>
> This is the deep point: **the hidden layer's job is to re-represent the input in a space where the problem becomes linearly separable.** Kernels will do the same thing for SVMs later in this unit, by a completely different mechanism.

> [!TRAP]
> The construction proves **representational power**, not learnability. It shows a network *exists* that computes XOR — it says nothing about *finding* the weights. The perceptron learning rule cannot train this network, because the hidden units have no target values to compute an error against. Solving that is what **backpropagation** is for, and it needs the neuron to be differentiable first.

---

## How it generalises

> [!EXAM]
> Any Boolean function of $n$ inputs can be implemented by a network with **$2^n$ hidden perceptrons** — one per input combination — plus a single output neuron. This is a **representation** result: it guarantees a solution exists, at the cost of a hidden layer that grows **exponentially** in the number of inputs.
>
> Real networks are far smaller because they **share** hidden units across many input patterns instead of dedicating one unit to each, and because they use **smooth** activations that let a single unit contribute partially to many decisions.

---

**Next:** making the neuron differentiable so the weights can actually be learned — **the sigmoid neuron & loss functions**.
