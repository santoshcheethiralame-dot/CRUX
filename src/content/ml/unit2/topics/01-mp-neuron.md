---
subject: ml
unit: 2
order: 1
slug: mp-neuron
title: Biological Inspiration & the MP Neuron
summary: How a biological neuron motivates the model, the McCulloch-Pitts neuron with its aggregation and decision functions, representing Boolean functions, the geometric view of linear separability, and the five limitations that force the perceptron.
minutes: 12
tags: [neuron, mp-neuron, mcculloch-pitts, threshold, boolean, linear-separability, limitations]
---

# Biological Inspiration & the MP Neuron

## The biological picture

> [!NOTE]
> The brain does not compute with a single neuron. There is a **massively parallel interconnected network of neurons**. Sense organs relay information to the **lowest layer** of neurons; some of those **fire** in response and relay information onward to the neurons they connect to; those may fire in turn, and the process continues.
>
> An average human brain has around **100 billion neurons**.

| Part | Role |
|---|---|
| **Dendrites** | Receive signals from other neurons |
| **Soma (cell body)** | Aggregates the incoming signals |
| **Axon** | Transmits the output onward |
| **Synapse** | The junction where one neuron's axon meets another's dendrite |

> [!INTUITION]
> Two features of that description survive into every artificial network in this unit: **aggregate, then decide**, and **layer upon layer**. Everything else — weights, sigmoids, backpropagation — is machinery bolted onto those two ideas. The biology is not a blueprint; it is a **licence to build a layered network of simple aggregating units** and see how far that gets you.

---

## The McCulloch–Pitts neuron

> [!NOTE]
> McCulloch and Pitts proposed a **highly simplified computational model of the neuron**. It splits into two functions:
> - **g aggregates** the inputs,
> - **f takes a decision** based on that aggregation.
>
> The inputs can be **excitatory or inhibitory**.

$$g(x_1, x_2, \dots, x_n) = g(\mathbf{x}) = \sum_{i=1}^{n} x_i$$

$$y = f(g(\mathbf{x})) = \begin{cases} 1 & \text{if } g(\mathbf{x}) \geq \theta \\ 0 & \text{if } g(\mathbf{x}) < \theta \end{cases}$$

- $\theta$ is the **thresholding parameter**.
- Inputs $x_i \in \{0,1\}$ and output $y \in \{0,1\}$.
- **$y = 0$ if any $x_i$ is inhibitory**, regardless of the sum — an inhibitory input is an absolute veto.

The diagram draws the unit as a circle split in half: the **lower half is $g$**, the **upper half is $f$**, with $\theta$ written inside.

> [!TRAP]
> The inhibitory rule is a **hard override**, checked *before* the threshold. It is not "subtract one from the sum" — a single inhibitory input firing forces the output to 0 even if every other input is 1. This is what lets a single MP neuron implement **NOT** and **NOR**.

---

## Representing Boolean functions

With no weights available, the only thing you can tune is $\theta$ (and which inputs are inhibitory). That is still enough for several functions:

| Function | Inputs | Setting |
|---|---|---|
| **AND** (3 inputs) | $x_1, x_2, x_3$ | $\theta = 3$ — only $(1,1,1)$ reaches the threshold |
| **OR** (2 inputs) | $x_1, x_2$ | $\theta = 1$ — any single 1 suffices |
| **NOR** (2 inputs) | both **inhibitory** | $\theta = 0$ — fires only on $(0,0)$ |
| **NOT** (1 input) | single **inhibitory** input | $\theta = 0$ |

Inhibitory inputs are drawn as small **open circles** on the input lines rather than arrowheads.

> [!EXAM]
> Be ready to state the threshold for a named function. The pattern for **non-inhibitory** functions is simply *"how many inputs must be 1?"* — AND over $n$ inputs needs $\theta = n$, OR needs $\theta = 1$. Anything requiring a **0** to trigger the output needs **inhibitory inputs with $\theta = 0$**.

---

## The geometric interpretation

> [!NOTE]
> A single MP neuron **splits the input points into two halves** — 4 points for 2 binary inputs. The dividing line is
>
> $$\sum_{i=1}^{n} x_i - \theta = 0$$
>
> - all inputs producing **output 0** lie on one side, where $\sum x_i < \theta$;
> - all inputs producing **output 1** lie on the other, where $\sum x_i \geq \theta$.

**OR**, with $\theta = 1$: the line $x_1 + x_2 = 1$ passes through $(0,1)$ and $(1,0)$. Only $(0,0)$ falls below it — exactly the one input that should output 0.

**AND**, with $\theta = 2$: the line $x_1 + x_2 = 2$ passes through $(1,1)$ alone, isolating the single point that should output 1.

> [!NOTE]
> **Linear separability (for Boolean functions)** — the definition as stated:
>
> *There exists a line (plane) such that all inputs which produce a 1 lie on one side of the line (plane) and all inputs which produce a 0 lie on the other side.*
>
> **A single MP neuron can represent only linearly separable Boolean functions.**

> [!INTUITION]
> Notice what the geometry reveals that the algebra hides. Because there are no weights, $\sum x_i = \theta$ is always a line of **slope −1** — a 45° cut. The only freedom is **where to place it**, not how to tilt it. So the MP neuron can only draw one family of boundaries, and the threshold slides that fixed-angle line back and forth. The perceptron's weights are precisely what let the line **rotate**.

---

## The five limitations

> [!EXAM]
> This list is the bridge to the perceptron — each limitation is answered by a feature of the next model.
>
> | # | Limitation | Question the slides pose |
> |---|---|---|
> | 1 | **Input must be binary** | What if the attribute is real-valued or has more than 2 classes? |
> | 2 | **All inputs are treated equally** | What if a few input attributes are more important? |
> | 3 | **Threshold is hand-coded** | Can it be learned? |
> | 4 | Works only for **linearly separable** Boolean functions | — |
> | 5 | The **output is binary (categorical)** | — |

> [!INTUITION]
> Track how the unit resolves these. **Limitations 1–3 are fixed by the perceptron** (real inputs, numerical weights, and a learning rule that treats the threshold as just another weight). **Limitation 4 is fixed by the multilayer network** — a *network* of perceptrons handles what one cannot. **Limitation 5 is fixed by the sigmoid neuron**, whose output is a real value in $(0,1)$.
>
> The whole first half of this unit is that table being worked through, one row at a time.

---

**Next:** weights, a learnable threshold, and real-valued inputs — **the perceptron**.
