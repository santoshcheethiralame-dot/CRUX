---
subject: ml
unit: 2
order: 6
slug: backpropagation
title: Gradient Descent & Backpropagation
summary: Steepest-descent learning, the δ error terms for output & hidden units, vanishing gradients, and overfitting fixes.
minutes: 18
tags: [gradient-descent, backpropagation, delta-rule, vanishing-gradient, dropout]
---

# Gradient Descent & Backpropagation

## Gradient descent — traversing the error surface

We need to find weights that **minimise the loss** without brute force. Gradient descent uses calculus to walk downhill on the error surface.

**Taylor-series intuition.** For a small step $\boldsymbol{\epsilon}$, $\;f(\mathbf{x} + \boldsymbol{\epsilon}) \approx f(\mathbf{x}) + \boldsymbol{\epsilon}^T \nabla f(\mathbf{x})$. To *decrease* $f$, choose $\boldsymbol{\epsilon}$ opposite to the gradient.

- The **gradient** $\nabla v(x) = \big[\frac{\partial v}{\partial x_1}, \frac{\partial v}{\partial x_2}, \dots\big]$ points in the direction of **steepest increase**.
- The **directional derivative** $\frac{dv}{dt} = \nabla v \cdot u$ is the change along unit vector $u$.
- **Steepest descent** is therefore the **negative** gradient: $u^* = -\dfrac{\nabla v}{\lVert \nabla v\rVert}$.

**Update rule:**

$$x_{\text{new}} = x - \eta\,\nabla v(x)$$

where $\eta$ (eta) is the **learning rate** (step size).

### Learning rate $\eta$

- **Too small** → painfully slow (tiny steps).
- **Too large** → overshoots, may oscillate and never converge.
- At a **local minimum** the derivative is 0, so $x$ stops — it can get **stuck** short of the global minimum.
- **Learning-rate annealing**: start large (fast early progress), then shrink to fine-tune.

## Backpropagation

**Backpropagation** modifies the weights and biases to minimise the loss, working **backward** from the output layer through each hidden layer to the first. The error for one training instance over all output neurons:

$$E = \sum_{k\in\text{outputs}} \tfrac{1}{2}(t_k - o_k)^2$$

A weight $w_{ji}$ affects $E$ only through $\text{net}_j$, so we apply the **chain rule**:

$$\frac{\partial E}{\partial w_{ji}} = \frac{\partial E}{\partial \text{net}_j}\cdot\frac{\partial \text{net}_j}{\partial w_{ji}}, \qquad w_{\text{new}} = w_{\text{old}} - \eta\,\frac{\partial E}{\partial w_{ji}}$$

### The δ (error term) trick

Define $\delta_j = -\dfrac{\partial E}{\partial \text{net}_j}$ so every weight update is simply $\boxed{\Delta w_{ji} = \eta\,\delta_j\,x_{ji}}$.

**Output unit** $j$ (sigmoid, so $\sigma' = o(1-o)$):

$$\delta_j = (t_j - o_j)\,o_j(1 - o_j)$$

**Hidden unit** $j$ — sum the δ's of everything it feeds (its Downstream):

$$\delta_j = o_j(1 - o_j)\sum_{k\in\text{Downstream}(j)} \delta_k\,w_{kj}$$

This is applied **recursively** from the output layer back to the first hidden layer — each layer's δ is built from the next layer's δ's.

> [!INTUITION]
> The output δ measures "how wrong this neuron is." A hidden neuron has no target of its own, so it **inherits blame** from the neurons it feeds — weighted by how strongly ($w_{kj}$) it influenced each of them. That's the whole idea of *back*-propagation.

### Worked error (output layer)

| Neuron | Target $t$ | Output $o$ | $t-o$ | $(t-o)^2$ |
|---|---|---|---|---|
| 1 | 0.01 | 0.7513 | −0.7413 | 0.5495 |
| 2 | 0.99 | 0.7729 | 0.2171 | 0.0471 |

$E_{\text{total}} = \tfrac{0.5495 + 0.0471}{2} = \mathbf{0.2983}$. Propagating back gives tiny hidden-layer updates such as $\Delta w_1 \approx -0.00021$.

## The vanishing-gradient problem

> [!TRAP]
> As backprop moves from output toward input, gradients are **multiplied** layer by layer. The sigmoid derivative $\sigma'(x)=\sigma(x)(1-\sigma(x))$ peaks at just **0.25**. Multiply many sub-0.25 numbers and the product → **0**, so **early layers barely update** — yet those layers learn the most basic features. **Fix: use ReLU** (its gradient doesn't shrink like this).

## Avoiding overfitting in neural networks

Overfitting happens when weights are tuned to the **noise** of the training set (memorising quirks instead of the pattern). Three remedies:

1. **Validation set** — track accuracy on held-out data; keep the weights with lowest validation error.
2. **Dropout** — randomly **drop neurons** during training; it's like training many different sub-networks that overfit differently, so the ensemble effect cancels out.
3. **Early stopping** — halt training **before** validation error starts rising again.

> [!EXAM]
> Memorise the two δ formulas (output vs hidden) and the update $\Delta w_{ji}=\eta\delta_j x_{ji}$. State the vanishing-gradient cause (sigmoid derivative ≤ 0.25 multiplied across layers) and the three overfitting fixes (validation, dropout, early stopping).

---

**Next:** the family of **activation functions** beyond the sigmoid.
