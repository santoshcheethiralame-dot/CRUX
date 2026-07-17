---
subject: ml
unit: 2
order: 1
slug: mp-neuron
title: Biological Inspiration & the MP Neuron
summary: From the biological neuron to McCulloch–Pitts thresholding logic, Boolean functions, and linear separability.
minutes: 12
tags: [MP-neuron, threshold, linear-separability, boolean]
---

# Biological Inspiration & the MP Neuron

## The biological neuron

An Artificial Neural Network (ANN) is loosely inspired by the brain's ~**100 billion neurons** wired into a *massively parallel* network. Information flows: sense organs → lowest layer of neurons → some **fire** and relay to others → and so on. The key idea is **division of labour** — each neuron responds to a specific stimulus (e.g. one fires if the visual is funny, another if the text is funny, a third aggregates "fire if ≥2 of 3 inputs fired").

| Biological part | Function | ANN equivalent |
|---|---|---|
| **Dendrite** | Receives signals from other cells | Input |
| **Soma** (cell body) | Processes / integrates the signal | Node (processing) |
| **Axon** | Carries the impulse away | Output |
| **Synapse** | Junction passing the signal on | Interconnection (weight) |

## The McCulloch–Pitts (MP) neuron

The first mathematical model of a neuron (1943). **Binary in, binary out** — $y \in \{0,1\}$. It has two stages:

- **g** *aggregates* the inputs (just sums them),
- **f** *decides* by comparing the sum to a threshold $\theta$.

$$g(x_1,\dots,x_n) = \sum_{i=1}^{n} x_i, \qquad y = f(g(\mathbf{x})) = \begin{cases} 1 & \text{if } g(\mathbf{x}) \ge \theta \\ 0 & \text{if } g(\mathbf{x}) < \theta \end{cases}$$

Inputs are **excitatory** (counted) or **inhibitory** — and **if any inhibitory input is on, $y=0$ regardless** of the others. $\theta$ is the **thresholding parameter** (hand-set, not learned).

## Representing Boolean functions

Choosing the right $\theta$ lets one MP neuron compute Boolean gates:

| Function | Inputs | Threshold $\theta$ | Fires when |
|---|---|---|---|
| **AND** | $n$ | $n$ | all inputs are 1 |
| **OR** | $n$ | 1 | at least one input is 1 |
| **NOR** | 2 (inhibitory) | 0 | all inputs are 0 |

> [!INTUITION]
> Think of $\theta$ as "how many votes are needed." AND needs *every* vote ($\theta = n$); OR needs just *one* ($\theta = 1$).

## Geometric interpretation & linear separability

A single MP neuron draws the line $\sum_i x_i = \theta$ and splits the input space in two: points with $\sum x_i \ge \theta$ output 1, the rest output 0.

- **OR** (2 inputs): line $x_1 + x_2 = 1$ separates $(0,0)$ from the other three corners.
- **AND** (2 inputs): line $x_1 + x_2 = 2$ separates $(1,1)$ from the rest.

> [!NOTE]
> **Linear separability** (for Boolean functions): there exists a line/plane such that all inputs producing 1 lie on one side and all producing 0 lie on the other. A single MP neuron can represent **only linearly-separable** functions.

## Limitations of the MP neuron

> [!TRAP]
> The four limitations motivate the *perceptron* (next topic):
> 1. **Inputs must be binary** — can't handle real-valued or multi-class attributes.
> 2. **All inputs treated equally** — no concept of *weights* (some inputs should matter more).
> 3. **Threshold is hand-coded** — can it be *learned* from data?
> 4. Works **only for linearly-separable Boolean functions**; output is always binary.

---

**Next:** the **Perceptron** adds learnable weights and real-valued inputs.
