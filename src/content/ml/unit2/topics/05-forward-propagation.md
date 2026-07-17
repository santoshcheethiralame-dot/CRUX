---
subject: ml
unit: 2
order: 5
slug: forward-propagation
title: Forward Propagation
summary: Moving input to output layer — notation, weight-matrix shapes, pre-activation vs activation, and worked numerics.
minutes: 11
tags: [forward-propagation, pre-activation, weight-matrix, notation]
---

# Forward Propagation

**Forward propagation** is the process of moving from the **input layer to the output layer**, computing the weighted sum (*net*) and the activation at every neuron along the way.

## Notation (learn this — backprop reuses it)

| Symbol | Meaning |
|---|---|
| $x_{ji}$ | the $i$-th input to unit $j$ |
| $w_{ji}$ | weight on the $i$-th input to unit $j$ |
| $\text{net}_j = \sum_i w_{ji}x_{ji}$ | weighted sum (pre-activation) of unit $j$ |
| $o_j$ | output of unit $j$ |
| $t_j$ | target output of unit $j$ (output layer) |
| $\sigma$ | the sigmoid activation |
| **outputs** | the set of units in the final layer |
| **Downstream($j$)** | units that take $o_j$ as an input |

**Weight-matrix shape** between two layers:

$$\text{shape} = (\#\text{ neurons in previous layer}) \times (\#\text{ neurons in current layer})$$

> [!NOTE]
> Weights are **initialised randomly** — we don't know in advance which inputs matter. Forward prop then: multiply inputs by weights, add bias, apply the activation, and pass the result to the next layer.

## Pre-activation vs activation

At each neuron, two quantities are computed in order:

1. **Pre-activation** $a = \mathbf{w}^T\mathbf{x} + b$ (the linear part),
2. **Activation** $h = \sigma(a)$ (the non-linear part).

For any layer after the first hidden layer, its **inputs are the outputs $h$ of the previous layer**.

## Worked example

A network with 2 inputs $x_1, x_2$, a hidden layer ($a_1, a_2$), and an output node:

$$a_1 = w_1x_1 + w_2x_2 + b_1 = (1.76)(0.88) + (0.40)(-0.49) + 0 \approx \mathbf{1.37}, \qquad h_1 = \sigma(a_1)$$
$$a_2 = w_3x_1 + w_4x_2 + b_2 = (0.97)(0.88) + (2.24)(-0.49) + 0 \approx \mathbf{-2.29}, \qquad h_2 = \sigma(a_2)$$
$$a_3 = w_5h_1 + w_6h_2 + b_3 = (1.86)(0.8) + (-0.97)(0.44) + 0 \approx \mathbf{1.1}$$

Notice $a_3$ uses the **activations** $h_1, h_2$ — not the raw inputs.

## The role of the target

After forward prop, the outputs $(o_1, o_2)$ are compared to the targets $(t_1, t_2)$:

- **Error calculation** — difference scored by MSE or cross-entropy.
- **Learning** — that error is sent **backward** to adjust weights (next topic).

> [!INTUITION]
> The target is the *desired destination*; the error tells the network **how far off** it is and, via backprop, **which way to nudge** each weight.

> [!EXAM]
> A standard numerical asks you to forward-propagate given weights/biases and inputs. Always show **pre-activation $a$ then activation $h$** at each neuron, layer by layer. Remember the weight-matrix shape rule.

---

**Next:** how the error flows backward — **gradient descent & backpropagation**.
