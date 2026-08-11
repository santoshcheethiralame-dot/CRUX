---
subject: ml
unit: 2
order: 10
slug: activation-functions
title: Activation Functions
summary: Sigmoid, tanh, ReLU, Leaky ReLU and Softmax — their formulas, ranges, derivatives, the specific problem each one fixes, and which to use where.
minutes: 11
tags: [activation, sigmoid, tanh, relu, leaky-relu, softmax, saturation, dying-relu]
---

# Activation Functions

> [!NOTE]
> The options covered: **Sigmoid, tanh, ReLU, Softmax** — plus **Leaky ReLU** as a variant of ReLU.

> [!INTUITION]
> First, why any non-linearity is needed at all. If every unit were linear, a whole network would collapse: $W_3(W_2(W_1x)) = (W_3W_2W_1)x = Wx$ — a **single linear layer**, no matter how deep. **The activation function is the only thing standing between a deep network and a glorified matrix multiply.** Every choice below is about *which* non-linearity costs least in gradient quality.

---

## Sigmoid (logistic)

$$\sigma(z) = \frac{1}{1 + e^{-z}}, \qquad \sigma'(z) = \sigma(z)\bigl(1 - \sigma(z)\bigr)$$

| | |
|---|---|
| **Range** | $(0, 1)$ |
| **Good** | Smooth, differentiable; output reads as a **probability**; derivative expressible in terms of the output |
| **Bad** | **Saturates** at both ends → gradient $\to 0$ → **vanishing gradients**; output is **not zero-centred**; $e^{-z}$ is expensive |

> [!TRAP]
> $\sigma'$ peaks at just **0.25** (at $z=0$). Even in the best case each layer quarters the gradient, which is precisely the vanishing-gradient mechanism from the previous topic.

---

## tanh

$$\tanh(z) = \frac{e^{z} - e^{-z}}{e^{z} + e^{-z}} = 2\sigma(2z) - 1, \qquad \tanh'(z) = 1 - \tanh^2(z)$$

> [!NOTE]
> - **tanh is also like sigmoid but better.**
> - The advantage: **negative inputs will be mapped strongly negative and zero inputs will be mapped near zero** in the tanh graph.

| | |
|---|---|
| **Range** | $(-1, 1)$ — **zero-centred** |
| **Max derivative** | **1** (at $z = 0$), four times sigmoid's |
| **Still bad** | **Saturates** at both ends, so vanishing gradients persist — merely less severely |

> [!INTUITION]
> Why does zero-centring matter? With sigmoid, every output is **positive**, so every weight feeding a given unit receives a gradient of the **same sign** on any one example. The weights can then only all-increase or all-decrease together, forcing the optimiser along a **zig-zag** path instead of a direct one. tanh's negative outputs break that lockstep and let weights move independently.

---

## ReLU

$$\text{ReLU}(y) = \max(0, y) = \begin{cases} y & y \geq 0 \\ 0 & y < 0 \end{cases}, \qquad \text{ReLU}'(y) = \begin{cases} 1 & y > 0 \\ 0 & y < 0 \end{cases}$$

| | |
|---|---|
| **Range** | $[0, \infty)$ |
| **Good** | **Derivative is exactly 1** for positive inputs → **no vanishing gradient** on that side; trivially cheap (a comparison); produces **sparse** activations |
| **Bad** | **Dying ReLU** — a unit whose input is always negative outputs 0, has **zero gradient**, and can never recover; not zero-centred; undefined derivative at exactly 0 (taken as 0 in practice) |

> [!EXAM]
> *"Why does ReLU solve the vanishing gradient problem?"* — because its derivative is **1**, not a fraction, so backpropagating through many layers **does not shrink the gradient**. Contrast directly with $\sigma' \leq 0.25$.

---

## Leaky ReLU

$$\text{LeakyReLU}(y) = \begin{cases} y & y \geq 0 \\ a\,y & y < 0 \end{cases}$$

> [!NOTE]
> - **The leak helps to increase the range of the ReLU function. Usually, the value of $a = 0.01$.**
> - **Instead of setting some default value of $a$, we can set it as a parameter of a neural network and the network can be trained to learn the optimal value for it!**

> [!EXAM]
> That second bullet names a distinct activation: when $a$ is **learned** rather than fixed, it is called **Parametric ReLU (PReLU)**. Both the value **$a = 0.01$** and the learnable-$a$ variant are examinable details.

> [!INTUITION]
> The leak is a small fix for a specific failure. A dead ReLU has gradient **exactly zero**, so no update can ever revive it — the unit is permanently lost. Giving the negative side a slope of $0.01$ makes the gradient **small but non-zero**, so a dead unit retains a path back to life. That is the whole idea: not to change what the function does for positive inputs, but to **stop the negative side from being an absorbing state**.

---

## Softmax

$$\text{softmax}(z)_i = \frac{e^{z_i}}{\sum_{j} e^{z_j}}$$

| | |
|---|---|
| **Range** | Each output in $(0,1)$, and **all outputs sum to 1** |
| **Used at** | The **output layer for multi-class classification**, paired with **cross-entropy** loss |

> [!TRAP]
> Softmax is **not** an element-wise function — each output depends on **every** input through the denominator. Raising one score lowers all the others. That is exactly what makes it a distribution over **mutually exclusive** classes.
>
> The distinction to keep straight:
> - **Sigmoid** on each output independently → **multi-label** (an image can be both *beach* and *sunset*);
> - **Softmax** across outputs → **multi-class** (a digit is exactly one of 0–9).

---

## Choosing

> [!EXAM]
> | Situation | Use |
> |---|---|
> | **Hidden layers**, default choice | **ReLU** |
> | Hidden layers, dying-ReLU suspected | **Leaky ReLU / PReLU** |
> | Hidden layers where zero-centring helps | **tanh** |
> | **Output**, binary classification | **Sigmoid** |
> | **Output**, multi-class classification | **Softmax** |
> | **Output**, regression | **Linear** (no activation) |

> [!INTUITION]
> The historical arc is worth carrying: **sigmoid → tanh → ReLU** is one long retreat from saturation. Sigmoid saturates on both sides; tanh does too but is at least centred; ReLU refuses to saturate on the positive side at all — and that single change is what made training genuinely deep networks practical.

---

**Next:** how the weight updates are actually scheduled — **optimization: batch, stochastic & mini-batch**.
