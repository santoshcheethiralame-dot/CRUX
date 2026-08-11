---
subject: ml
unit: 2
order: 12
slug: momentum-rmsprop-adam
title: Momentum, RMSProp & Adam
summary: The three adaptive optimizers built on exponentially weighted averages — momentum's smoothed direction, RMSProp's per-parameter scaling, and Adam's combination of both with bias correction.
minutes: 12
tags: [momentum, RMSProp, Adam, adaptive, bias-correction, oscillation, EWMA]
---

# Momentum, RMSProp & Adam

## Gradient descent with momentum

> [!NOTE]
> **The problem:** the progression of the search **can bounce around the search space based on the gradient**. The search may progress downhill towards the minima, but during this progression **it may move in another direction, even uphill**, depending on the gradient of the specific points encountered.
>
> This slows the search, **especially where the broader trend or shape of the search space is more useful than specific gradients along the way**.
>
> **The approach: add history to the parameter update equation** based on the gradients encountered in previous updates. In this method we **compute the exponentially weighted average of the gradients** and use that value to update the weights instead.

### The momentum algorithm

$$\textbf{1.} \quad \text{compute } dW \text{ for the current mini-batch}$$
$$\textbf{2.} \quad V_{dW} = \beta \, V_{dW} + (1-\beta)\, dW$$
$$\textbf{3.} \quad W_{new} = W - \alpha \, V_{dW}$$

> [!EXAM]
> **"Using a very high value for $\beta$ we can dampen out the oscillations which arise in gradient descent!"**
>
> The figure shows a contour plot: plain GD **zig-zags violently** across the valley, while GD with momentum takes a **smooth, direct path** to the centre.

> [!INTUITION]
> Why averaging kills oscillation but preserves progress: in the direction **across** the ravine the gradient **alternates sign** on successive steps, so consecutive terms in the EWMA **cancel**. In the direction **along** the ravine the gradient keeps the **same sign**, so terms **accumulate**.
>
> The average therefore suppresses exactly the component that wastes effort and reinforces the one that makes progress. The name is apt — a heavy ball rolling downhill ignores small side-to-side bumps and keeps going in the direction it has been going.

**Upsides**
- Momentum **damps the change in the gradient and, in turn, the step size** with each new point.
- **Most useful where the objective function has a large amount of curvature** — where the gradient changes a lot over small regions.
- Helpful when the gradient is **estimated and may be noisy** (high variance).
- Helpful when the search space is **flat or nearly flat**: the momentum **allows the search to progress in the same direction as before the flat spot and cross the flat region**.

**Downsides**
- **It can overshoot the global minimum** and converge to a local minimum instead.
- The momentum term **can cause the optimization process to oscillate around the global minimum**.

> [!TRAP]
> Momentum both **damps** oscillation (across the ravine) and **causes** oscillation (around the final minimum) — the two are not contradictory. Early on, the accumulated velocity is a virtue; near the optimum, that same velocity carries the search past the target and back. Typical $\beta = 0.9$.

---

## RMSProp

The goal in the worked example: **dampen out oscillations in the $b$ direction and learn faster in the $W$ direction**.

$$S_{dW} = \beta_2 \, S_{dW} + (1 - \beta_2)(dW)^2 \qquad \leftarrow \textbf{SMALL}$$
$$S_{db} = \beta_2 \, S_{db} + (1 - \beta_2)(db)^2 \qquad \leftarrow \textbf{LARGE}$$

$$W_{new} = W - \alpha\,\frac{dW}{\sqrt{S_{dW}}} \qquad\qquad b_{new} = b - \alpha\,\frac{db}{\sqrt{S_{db}}}$$

> [!EXAM]
> The reasoning to reproduce: **"by dividing by a small $S_{dW}$ we can increase the magnitude of the update in the $W$ direction, and by dividing with a large $S_{db}$ we can dampen the oscillations in the $b$ direction."**
>
> **Note on numerical stability:** *if $S_{dW}$ is very close to zero, to avoid the $W$ term becoming very large we add a small term $\epsilon$ to the denominator:*
> $$W_{new} = W - \alpha\,\frac{dW}{\sqrt{S_{dW}} + \epsilon}$$

> [!INTUITION]
> The crucial difference from momentum: RMSProp averages the **squared** gradient, so signs are destroyed and only **magnitude** survives. It is not asking *"which way have I been going?"* but *"how violently has this parameter been changing?"*
>
> Dividing by that magnitude gives every parameter its **own effective learning rate** — parameters with large, erratic gradients take small steps; parameters with small, steady gradients take large ones. This directly answers the objection raised under gradient descent: **a single scalar $\eta$ cannot be right in every direction at once**. RMSProp makes it per-parameter.

---

## Adam

> [!NOTE]
> **Adam, or Adaptive Moment Estimation, is a combination of gradient descent with momentum and the RMSProp optimizer.**

### The Adam algorithm

**1.** Initialise $V_{dW} = 0$, $V_{db} = 0$, $S_{dW} = 0$, $S_{db} = 0$

**2.** For iteration $t$:

  a. Compute $dW$ and $db$ for the current mini-batch

  b. **A momentum-like update** (first moment):
$$V_{dW} = \beta_1 V_{dW} + (1-\beta_1)\,dW \qquad V_{db} = \beta_1 V_{db} + (1-\beta_1)\,db$$

  c. **An RMSProp-like update** (second moment):
$$S_{dW} = \beta_2 S_{dW} + (1-\beta_2)(dW)^2 \qquad S_{db} = \beta_2 S_{db} + (1-\beta_2)(db)^2$$

### Bias correction

> [!NOTE]
> **Adam optimization applies bias correction to the first and second moment estimates to ensure that they are unbiased estimates of the true values.**
>
> $$V^{C}_{dW} = \frac{V_{dW}}{1 - \beta_1^{\,t}} \qquad V^{C}_{db} = \frac{V_{db}}{1 - \beta_1^{\,t}}$$
> $$S^{C}_{dW} = \frac{S_{dW}}{1 - \beta_2^{\,t}} \qquad S^{C}_{db} = \frac{S_{db}}{1 - \beta_2^{\,t}}$$

**The final update:**

$$W = W - \alpha \, \frac{V^{C}_{dW}}{\sqrt{S^{C}_{dW}} + \epsilon}$$

> [!DERIVE]
> **Why bias correction is needed.** Both accumulators start at **zero**. After the very first step with $\beta_1 = 0.9$:
> $$V_{dW} = 0.9(0) + 0.1\,dW = 0.1\,dW$$
> — an estimate **ten times too small**, purely because of the initialisation. Training would crawl for its first several iterations.
>
> Dividing by $1 - \beta_1^{\,t}$ repairs exactly this. At $t = 1$: $1 - 0.9^1 = 0.1$, so
> $$V^{C}_{dW} = \frac{0.1\,dW}{0.1} = dW \quad\checkmark$$
> And as $t$ grows, $\beta_1^{\,t} \to 0$, so the divisor $\to 1$ and **the correction fades away on its own** once the accumulator has warmed up.

> [!EXAM]
> Standard defaults worth quoting: **$\beta_1 = 0.9$** (momentum), **$\beta_2 = 0.999$** (RMSProp), **$\epsilon = 10^{-8}$**, $\alpha = 0.001$. Adam is the **default optimizer** for most deep-learning work because it needs little tuning.

---

## Summary

> [!EXAM]
> | Optimizer | Tracks | Fixes |
> |---|---|---|
> | **Momentum** | EWMA of the **gradient** ($V$) | Oscillation across ravines; flat regions |
> | **RMSProp** | EWMA of the **squared gradient** ($S$) | Per-parameter step sizes; one $\eta$ can't suit all directions |
> | **Adam** | **Both $V$ and $S$**, with **bias correction** | Both problems at once |
>
> The one-line answer for *"what is Adam?"* — **momentum + RMSProp + bias correction**.

> [!INTUITION]
> Three questions, three answers, one mechanism:
> - Momentum asks *"which way have I consistently been heading?"* → smooth the **direction**.
> - RMSProp asks *"how big have this parameter's gradients been?"* → normalise the **magnitude**.
> - Adam asks **both**, and repairs the cold-start bias that using EWMAs from zero introduces.
>
> All three are **the same EWMA formula** from the previous topic, pointed at different quantities.

---

**Next:** a different classifier entirely, built on maximising a geometric margin — **SVM**.
