---
subject: ml
unit: 2
order: 7
slug: gradient-descent
title: Gradient Descent
summary: The Taylor-series and directional-derivative derivation of why we move opposite to the gradient, the update rule with the learning rate, and what goes wrong when the learning rate is too small or too large.
minutes: 11
tags: [gradient-descent, taylor-series, directional-derivative, learning-rate, steepest-descent, convergence]
---

# Gradient Descent

## The problem

We have a loss $\mathcal{L}(w, b)$ and want the weights that minimise it. Trying every weight vector is impossible, so we need a **principled way to take a step that reduces the loss**. Gradient descent answers a precise question: *given where I stand, which direction should I move?*

---

## Taylor series — the recap

> [!NOTE]
> - Used to **evaluate/approximate the value of a function at any point**.
> - The Taylor series of a function is an **infinite sum of terms expressed in terms of the function's derivatives at a single point**.
> - For a function of one parameter $f(x)$, to evaluate at $x + h$ where $h$ is a **small step in the direction of $x$**:
>
> $$f(x+h) = f(x) + h f'(x) + \frac{h^2}{2} f''(x) + \frac{h^3}{3!} f'''(x) + \cdots$$

> [!INTUITION]
> Gradient descent uses **only the first two terms**. For small $h$ the higher powers $h^2, h^3, \dots$ shrink far faster than $h$ itself, so
> $$f(x+h) \approx f(x) + h f'(x)$$
> is a good local approximation. **The change in $f$ is approximately $h f'(x)$** — and that is the quantity we now want to make as negative as possible. Everything below is that one idea in vector form.

---

## The directional derivative

> [!NOTE]
> **Step 3 — effect of moving in any direction.** For a direction $u$ (a unit vector), the rate of change is
>
> $$D_u v(x) = u \cdot \nabla v(x)$$
>
> - If $u \cdot \nabla v > 0$: **$v$ increases** along $u$.
> - If $u \cdot \nabla v < 0$: **$v$ decreases** along $u$.

> [!NOTE]
> **Step 4 — choosing the best direction (steepest descent).** Maximum decrease happens in the direction of the **negative gradient**:
>
> $$u = -\frac{\nabla v(x)}{\lVert \nabla v(x) \rVert}$$
>
> This gives the **steepest drop** in $v(x)$.

---

## Why 180° — the angle argument

> [!DERIVE]
> Let $\beta$ be the angle between $u^T$ and $\nabla\mathcal{L}(\theta)$. For the loss to **decrease** we require
>
> $$u^T \nabla \mathcal{L}(\theta) < 0 \quad\Longrightarrow\quad k \cdot \cos(\beta) < 0$$
>
> where $k = \lVert u \rVert \lVert \nabla\mathcal{L}(\theta) \rVert > 0$. Then
>
> $$\mathcal{L}(\theta + \eta u) - \mathcal{L}(\theta) = u^T \nabla\mathcal{L}(\theta) = k\cos(\beta)$$
>
> is **most negative when $\cos(\beta) = -1$, i.e. when $\beta$ is $180°$.**
>
> > **Gradient Descent Rule**
> > - The direction $u$ we intend to move in should be at **$180°$ w.r.t. the gradient**.
> > - In other words, **move in a direction opposite to the gradient**.
>
> $$\Delta\theta = u = -\nabla\mathcal{L}(\theta)$$

> [!EXAM]
> *"Derive the gradient descent rule"* wants exactly this chain: **Taylor expansion → the change in loss is $u^T\nabla\mathcal{L}$ → that is $k\cos\beta$ → minimised at $\cos\beta = -1$ → so move opposite to the gradient.** The phrase *"at 180° with respect to the gradient"* is the one to quote.

> [!INTUITION]
> It is worth noticing what the derivation does **not** claim. It identifies the best direction **locally**, from the first-order Taylor term alone. It says nothing about how far to go, and nothing about the global shape of the loss. That is why the step size has to be introduced separately, and why gradient descent can settle in a local minimum: **every step is locally optimal and the path as a whole is not**.

---

## The update rule

> [!NOTE]
> We would like to move in the direction of the gradient **only by a small step $\eta$ (eta) to avoid overshooting the minimum value**. $\eta$ is also called the **learning rate**. So the final equations become:
>
> $$w_{t+1} = w_t - \eta \nabla w_t$$
> $$b_{t+1} = b_t - \eta \nabla b_t$$
>
> $$\text{where } \nabla w_t = \left.\frac{\partial \mathcal{L}(w,b)}{\partial w}\right|_{w = w_t,\, b = b_t}, \qquad \nabla b_t = \left.\frac{\partial \mathcal{L}(w,b)}{\partial b}\right|_{w = w_t,\, b = b_t}$$

> [!TRAP]
> The gradients must be evaluated **at the current point $(w_t, b_t)$** — the subscript on the derivative is not decoration. And both weights and bias are updated **simultaneously** from the *same* old values; updating $w$ first and then computing $b$'s gradient from the new $w$ is a real and common bug.

---

## The learning rate

| $\eta$ | What happens |
|---|---|
| **Too small** | Steps are tiny; convergence is **very slow**, and training may stall before reaching the minimum |
| **Too large** | The step **overshoots** the minimum; the loss oscillates across the valley and may **diverge** |

> [!INTUITION]
> Picture a bowl-shaped loss. With $\eta$ too small you creep down one wall, taking thousands of steps to cross a short distance. With $\eta$ too large you leap from one wall straight past the bottom to a **higher** point on the opposite wall, then leap back further still — the loss grows instead of shrinking.
>
> The uncomfortable part is that the *right* $\eta$ is different **in different directions**: a loss surface that is a narrow ravine needs small steps across the ravine and large steps along it. **No single scalar $\eta$ can be right for both.** That observation is the direct motivation for the adaptive optimizers later in this unit.

> [!EXAM]
> *"Is there any ideal value for the learning rate?"* — the expected answer is **no single fixed value is ideal**. It is a **hyperparameter** that must be tuned, and the standard responses are:
> - **learning-rate schedules** (start large, decay over time),
> - **momentum**, to damp the oscillations a large $\eta$ causes,
> - **adaptive methods** (**RMSProp, Adam**) that effectively use a **different step size per parameter**.

---

## The problem gradient descent still faces

Even with a well-chosen $\eta$, plain gradient descent on a non-convex loss can:

- settle in a **local minimum** rather than the global one,
- stall on a **plateau** where the gradient is nearly zero in every direction,
- **oscillate** across a steep, narrow valley while creeping slowly along its floor.

> [!EXAM]
> Keep the three failure modes distinct — **local minima**, **flat regions/plateaus**, and **oscillation in ravines** — because each maps to a different fix: noise (SGD) escapes local minima, momentum crosses plateaus and damps oscillation, and per-parameter scaling (RMSProp) fixes the ravine.

---

**Next:** applying gradient descent through a whole network — **backpropagation**.
