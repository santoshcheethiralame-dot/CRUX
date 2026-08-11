---
subject: ml
unit: 2
order: 6
slug: forward-propagation
title: Forward Propagation & Network Notation
summary: The layers of a multilayer network, the Mitchell notation used throughout backpropagation, how to size and index a weight matrix, and a worked forward pass.
minutes: 11
tags: [forward-propagation, notation, weight-matrix, net, downstream, layers, mitchell]
---

# Forward Propagation & Network Notation

## The layers

| Layer | Role |
|---|---|
| **Input layer** | Receives the raw feature values; no computation happens here |
| **Hidden layer(s)** | Intermediate representations; there may be one or many |
| **Output layer** | Produces the network's prediction; the only layer with **target values** |

> [!INTUITION]
> "Hidden" simply means **not observed in the data** — we have inputs and we have targets, but nothing in the dataset says what a hidden unit *should* output. That absence is the whole difficulty of training: for the output layer we can compute an error directly, and for hidden layers we cannot. Backpropagation exists precisely to manufacture an error signal for units that have none.

---

## Notation

> [!EXAM]
> This notation is used unchanged through every backpropagation derivation, and it follows **Mitchell** exactly. Learn it before the equations.
>
> | Symbol | Meaning |
> |---|---|
> | $x_{ji}$ | the **$i$-th input to unit $j$** |
> | $w_{ji}$ | the **weight associated with the $i$-th input to unit $j$** |
> | $net_j = \sum_i w_{ji} x_{ji}$ | the **weighted sum of inputs for unit $j$** |
> | $o_j$ | the **output computed by unit $j$** |
> | $t_j$ | the **target output for unit $j$** — *applicable only to neurons in the output layer* |
> | $\sigma$ | the **sigmoid function** |
> | $outputs$ | the **set of units in the final layer** |
> | $Downstream(j)$ | the **set of units whose immediate inputs include the output of unit $j$** — *applicable only to neurons in the hidden layer* |

> [!TRAP]
> The two annotations on that table are doing real work.
>
> **$t_j$ exists only for output units** — a hidden unit has no target, so any formula containing $(t_j - o_j)$ can only ever be an **output-layer** formula.
>
> **$Downstream(j)$ is only needed for hidden units** — it is the replacement for the missing target. A hidden unit learns its error from **the units it feeds**, which is literally what $Downstream$ enumerates.
>
> Spotting which of the two appears in a formula instantly tells you which layer it applies to.

> [!TRAP]
> **Index order in $w_{ji}$ is $j$ first, then $i$** — *destination before source*. It reads backwards from the direction of data flow, and mixing it up transposes every weight matrix. Mnemonic: the subscripts match $net_j = \sum_i w_{ji}x_{ji}$, where $j$ is the unit you are computing.

---

## The weight matrix

> [!EXAM]
> **Weight matrix shape = (number of neurons in the previous layer) × (number of neurons in the current layer).**
>
> And within it, **$w_{ji}$: $j$ = current-layer neuron number, $i$ = previous-layer neuron number.**

Worked on the course's own network — inputs $x_1, x_2, x_3$ feed neurons **1, 2, 3**, which feed neurons **4, 5**, which feed neurons **6, 7** producing $o_6, o_7$:

$$W_1 = \begin{bmatrix} w_{41} & w_{51} \\ w_{42} & w_{52} \\ w_{43} & w_{53} \end{bmatrix}_{3 \times 2}$$

Three neurons in the previous layer, two in the current — hence $3 \times 2$. For the same network:

$$Downstream(4) = \{6, 7\}, \qquad Downstream(5) = \{6, 7\}, \qquad outputs = \{6, 7\}$$

> [!INTUITION]
> Notice the matrix is the **transpose** of how the subscripts read. $w_{41}$ (unit 4's weight on input 1) sits at **row 1, column 1** — row indexes the *source*, column the *destination*.
>
> That layout is what makes the forward pass a clean matrix product: with a **row vector** of layer inputs, $\text{layer output} = \mathbf{x}\,W$. If you write inputs as a column vector instead you need $W^T\mathbf{x}$. Both conventions appear in textbooks, so **always check whether the stated shape is (prev × curr) or (curr × prev)** before multiplying.

---

## The forward pass

For each unit $j$ in each layer, in order from input to output:

$$net_j = \sum_i w_{ji}\, x_{ji} \qquad\text{then}\qquad o_j = \sigma(net_j) = \frac{1}{1 + e^{-net_j}}$$

The outputs of one layer become the inputs $x_{ji}$ of the next, and the process repeats until the output layer produces the prediction.

> [!DERIVE]
> **A worked forward pass.** Take a 2-2-2 network with inputs $x_1 = 0.05$, $x_2 = 0.10$, hidden weights $w_1 = 0.15$, $w_2 = 0.20$ (into $h_1$) and $w_3 = 0.25$, $w_4 = 0.30$ (into $h_2$), hidden bias $b_1 = 0.35$.
>
> **Hidden unit 1:**
> $$net_{h_1} = 0.15(0.05) + 0.20(0.10) + 0.35 = 0.0075 + 0.020 + 0.35 = 0.3775$$
> $$o_{h_1} = \frac{1}{1 + e^{-0.3775}} = 0.5933$$
>
> **Hidden unit 2:**
> $$net_{h_2} = 0.25(0.05) + 0.30(0.10) + 0.35 = 0.0125 + 0.030 + 0.35 = 0.3925$$
> $$o_{h_2} = \frac{1}{1 + e^{-0.3925}} = 0.5969$$
>
> Now feed these forward with output weights $w_5 = 0.40$, $w_6 = 0.45$ and bias $b_2 = 0.60$:
> $$net_{o_1} = 0.40(0.5933) + 0.45(0.5969) + 0.60 = 1.1059 \;\Rightarrow\; o_1 = \boxed{0.7514}$$
>
> With $w_7 = 0.50$, $w_8 = 0.55$ and the same bias, the second output comes to $o_2 = \boxed{0.7729}$. **These are the numbers the backpropagation example uses** — carry them forward.

> [!EXAM]
> Forward-propagation problems are marked on **method, not arithmetic**. Always show, per unit: (1) the weighted sum **including the bias**, (2) the sigmoid applied to it, (3) the result carried into the next layer. Keep **4 decimal places** — the backprop stage that follows amplifies rounding error.

> [!TRAP]
> The most frequent error is **forgetting the bias in $net_j$**. It is a weight on a constant input of 1, so it is *always* part of the sum, and it is easy to drop because it has no visible input line in most diagrams.

---

**Next:** the principled method for adjusting those weights — **gradient descent**.
