---
subject: ml
unit: 2
order: 9
slug: backprop-practice
title: Backpropagation in Practice — Worked Example, Vanishing Gradients & Overfitting
summary: A fully worked numeric weight update at both an output and a hidden weight, why gradients vanish in deep sigmoid networks, and the two regularization methods the course names — dropout and early stopping.
minutes: 12
tags: [backpropagation, worked-example, vanishing-gradients, overfitting, dropout, early-stopping, regularization]
---

# Backpropagation in Practice

## The worked example

Continuing the network from forward propagation: inputs $x_1 = 0.05$, $x_2 = 0.10$; hidden outputs $o_{h_1} = 0.5933$, $o_{h_2} = 0.5969$; network outputs $O_1 = 0.7514$, $O_2 = 0.7729$; targets $t_1 = 0.01$, $t_2 = 0.99$; learning rate $\eta = 0.5$. Output weights $w_5 = 0.40$, $w_6 = 0.45$, $w_7 = 0.50$, $w_8 = 0.55$.

### Updating an output-layer weight ($w_5$)

> [!DERIVE]
> $w_5$ connects hidden unit $h_1$ to output unit $O_1$, so $\Delta w_5 = \eta\,\delta_{O_1}\,o_{h_1}$.
>
> **Step 1 — the delta at $O_1$:**
> $$\delta_{O_1} = (t_1 - O_1)\,O_1(1 - O_1)$$
> $$= (0.01 - 0.7514)(0.7514)(1 - 0.7514)$$
> $$= (-0.7414)(0.7514)(0.2486) = \mathbf{-0.13850}$$
>
> **Step 2 — the update:**
> $$\Delta w_5 = \eta\,\delta_{O_1}\,o_{h_1} = 0.5 \times (-0.13850) \times 0.5933 = -0.04109$$
>
> **Step 3 — the new weight:**
> $$w_5^{new} = 0.40 + (-0.04109) = \boxed{0.35891}$$
>
> The weight **decreased**, which is right: $O_1 = 0.75$ is far above its target of $0.01$, so the connection driving it up must be weakened.

By the identical route, $\delta_{O_2} = (0.99 - 0.7729)(0.7729)(0.2271) = +0.03810$, and $w_7$ — which connects $h_1$ to $O_2$ — **increases**, because $O_2$ sits below its target.

### Updating a hidden-layer weight ($w_1$)

> [!DERIVE]
> $w_1$ connects input $x_1$ to hidden unit $h_1$, so $\Delta w_1 = \eta\,\delta_{h_1}\,x_1$ — and $\delta_{h_1}$ must be **inherited** from both output units.
>
> **Step 1 — sum the blame from $Downstream(h_1) = \{O_1, O_2\}$:**
> $$\sum_k \delta_k w_{k h_1} = \delta_{O_1}w_5 + \delta_{O_2}w_7$$
> $$= (-0.13850)(0.40) + (0.03810)(0.50)$$
> $$= -0.05540 + 0.01905 = -0.03635$$
>
> **Step 2 — multiply by $h_1$'s own sigmoid derivative:**
> $$\delta_{h_1} = o_{h_1}(1 - o_{h_1}) \sum_k \delta_k w_{k h_1}$$
> $$= (0.5933)(0.4067)(-0.03635) = \mathbf{-0.008771}$$
>
> **Step 3 — the update:**
> $$\Delta w_1 = 0.5 \times (-0.008771) \times 0.05 = -0.0002193$$
> $$w_1^{new} = 0.15 - 0.0002193 = \boxed{0.14978}$$

> [!TRAP]
> Compare the two magnitudes: the output weight moved by **0.041**, the hidden weight by **0.00022** — roughly **190× smaller**. Two causes compound: the small input $x_1 = 0.05$, and the extra factor of $o(1-o) \approx 0.24$ picked up in the hidden layer.
>
> That disparity is not a quirk of these numbers. It is the **vanishing gradient problem** appearing in a two-layer network, and it is the subject of the next section.

> [!EXAM]
> In a numeric backprop question, always **use the old weights throughout**. Compute *every* delta and *every* $\Delta w$ from the pre-update values, and apply them only at the end. Updating $w_5$ before using it to compute $\delta_{h_1}$ is the single most common mistake, and it corrupts every hidden-layer answer that follows.

---

## Vanishing gradients

> [!NOTE]
> As the backpropagation algorithm advances **downwards (backward) from the output layer towards the input layer**, the **gradients often get smaller and smaller and approach zero**, which eventually leaves the weights of the **initial or lower layers nearly unchanged**.
>
> As a result, **gradient descent never converges to the optimum**. This is known as the **vanishing gradients** problem.

> [!DERIVE]
> **Why sigmoid causes it.** Each backward step through a layer multiplies the gradient by $\sigma'(net) = O(1-O)$. This factor is maximised at $O = 0.5$, where
> $$\sigma'_{\max} = 0.5 \times 0.5 = 0.25$$
> and it shrinks toward 0 as $O$ approaches either 0 or 1 (i.e. whenever the unit **saturates**).
>
> Across $n$ layers the gradient is therefore scaled by **at most** $(0.25)^n$:
>
> | Layers back | Best-case surviving fraction |
> |---|---|
> | 1 | $0.25$ |
> | 3 | $0.0156$ |
> | 5 | $\approx 0.001$ |
> | 10 | $\approx 10^{-6}$ |
>
> And that is the **optimistic** bound, assuming every unit sits at its most favourable point.

> [!EXAM]
> The remedies, in the order they appear historically:
> - **ReLU** activations — derivative is exactly **1** for positive inputs, so nothing shrinks;
> - **careful weight initialisation** (Xavier/He) — keeps activations out of the saturated tails;
> - **batch normalisation** — re-centres activations each layer;
> - **residual/skip connections** — give the gradient a path that bypasses the multiplications entirely.
>
> For this unit, **"switch from sigmoid to ReLU"** is the expected answer, and the reason is that $\sigma' \leq 0.25$ while $\text{ReLU}' = 1$.

---

## Overfitting

The course notes this is **analogous to the decision-trees case** — a model with enough capacity will memorise the training set, driving training error down while generalisation gets worse.

### Dropout

> [!NOTE]
> - A **regularization technique that prevents the neural network from overfitting**.
> - It **randomly drops neurons from the neural network during training, which is equivalent to training different neural networks**.
> - **The different networks will overfit differently**, so the net effect of dropout is to **reduce overfitting**, so the model is good for predictive analysis.

> [!INTUITION]
> The phrase *"equivalent to training different neural networks"* is the real justification. A network with $n$ droppable units defines $2^n$ possible sub-networks, and each training step samples one. At test time, using all units approximates **averaging over that whole ensemble** — which is why dropout belongs to the same intellectual family as **bagging**, met later in this unit.
>
> There is a second, more local effect: no unit can rely on any particular partner being present, so the network cannot build **fragile co-adapted chains** and is pushed toward redundant, robust features.

### Early termination (early stopping)

> [!NOTE]
> - The technique updates the model to **better fit the training data with each iteration**.
> - After a certain number of iterations, new iterations improve the model.
> - **After that point, however, the model begins to overfit the training data.**
> - **Early stopping refers to stopping the training process before that point.**

The figure shows **training error falling monotonically** while **validation error falls, bottoms out, then turns upward** — training is stopped at that minimum.

> [!TRAP]
> The stopping point is chosen on the **validation** curve, never the training curve — training error keeps improving right through the overfitting regime, so it can never tell you when to stop. In practice you keep the weights from the **best validation epoch**, not the last one, and allow some *patience* before stopping since validation error is noisy.

> [!EXAM]
> Both named methods are **regularization techniques**. If asked for more, the standard additions are **L1/L2 weight decay**, **data augmentation**, and **reducing network size** — but **dropout** and **early stopping** are the two the course names explicitly.

---

**Next:** the functions that replace the sigmoid and fix its worst problem — **activation functions**.
