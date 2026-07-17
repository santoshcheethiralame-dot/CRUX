---
subject: ml
unit: 2
order: 4
slug: sigmoid-neuron-loss
title: Sigmoid Neuron & Loss Functions
summary: Why thresholding is too harsh, the smooth differentiable sigmoid neuron, and MSE vs cross-entropy loss.
minutes: 10
tags: [sigmoid, differentiable, MSE, cross-entropy, loss]
---

# Sigmoid Neuron & Loss Functions

## The perceptron's thresholding is too harsh

A perceptron makes a **hard step** decision. Deciding to like a movie from `criticsRating ∈ [0,1]` with threshold 0.5:

- rating $= 0.51$ → **like**
- rating $= 0.49$ → **dislike**

A microscopic change flips the verdict. Worse, the step function is **not differentiable** at the threshold — so we can't use gradient-based learning. We want a *smooth* response.

## The sigmoid neuron

Replace the step with the **logistic (sigmoid)** function. With $z = w_0 + \sum_i w_i x_i$:

$$y = \sigma(z) = \frac{1}{1 + e^{-\left(w_0 + \sum_{i=1}^{n} w_i x_i\right)}}$$

| | Perceptron | Sigmoid neuron |
|---|---|---|
| Output | step: 0 or 1 | smooth: any value in $(0,1)$ |
| At the threshold | sharp jump | gentle S-curve |
| Continuous? | no | yes |
| **Differentiable?** | **no** | **yes** ✅ |
| Interpretation | hard class | **probability** of class 1 |

> [!INTUITION]
> Instead of a blunt "like / dislike," the sigmoid gives the **probability of liking**. A rating of 0.51 vs 0.49 now gives *almost the same* probability — small input change, small output change. That smoothness is what makes gradient descent possible.

## The artificial neuron (general form)

The fundamental unit of an ANN: it computes a **weighted sum + bias**, then applies an **activation function** $f$:

$$\text{output} = f\!\left(\sum_i w_i x_i + b\right)$$

The sigmoid is one choice of $f$ (more in *Activation Functions*).

## Loss / cost / error functions

Learning = **minimising the error** between prediction $\hat y$ and truth $y$. (The terms *objective / cost / loss / error* function are used interchangeably.) Because errors can be ±, we usually **square** them. The choice depends on the task:

**Mean Squared Error (MSE)** — for **regression**:

$$L = \frac{1}{m}\sum_{i=1}^{m}(y_i - \hat y_i)^2$$

**Cross-Entropy** — for **classification** with probability outputs:

$$L = -\sum y \log(\hat y)$$

> [!EXAM]
> Pair them correctly: **regression → MSE**, **classification → cross-entropy**. And know the headline reason we moved from perceptron to sigmoid: the step function is **non-differentiable**, blocking gradient descent; the sigmoid is smooth and differentiable.

---

**Next:** running an input through the network — **forward propagation**.
