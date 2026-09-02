---
subject: ml
unit: 2
order: 2
slug: perceptron
title: The Perceptron
summary: Rosenblatt's model, the two primary differences from the MP neuron, the bias-as-prior trick that makes the threshold learnable, and the restaurant example that gives w0 its meaning.
minutes: 9
tags: [perceptron, rosenblatt, weights, bias, threshold, prior]
---

# The Perceptron

## What Rosenblatt added

> [!NOTE]
> **Frank Rosenblatt proposed the classical perceptron model in 1958** — *a more general computational model than the MP neuron.*
>
> **The two primary differences:**
> 1. **Introduction of numerical weights for the inputs, and a mechanism for learning those weights and the bias.**
> 2. **Inputs are no longer limited to Boolean values.**

That single slide answers **three of the MP neuron's five limitations** at once: real-valued inputs (limitation 1), unequal treatment of inputs (limitation 2), and a threshold that need not be hand-coded (limitation 3).

---

## The model

```
   x0 = 1 ──w0──┐          w0 is the bias (= −θ)
                │
   x1 ──────w1──┤      ┌──────────────────┐
                ├─────→│   z = Σ wi · xi  │──→ z ──→ step(z) ──→ y ∈ {0, 1}
   x2 ──────w2──┤      └──────────────────┘             ▲
                │                                       │
   xn ──────wn──┘                            fires when  z ≥ 0
```

$$y = \begin{cases} 1 & \text{if } \sum_{i=0}^{n} w_i x_i \geq 0 \\[4pt] 0 & \text{if } \sum_{i=0}^{n} w_i x_i < 0 \end{cases}$$

The sum starts at $i = 0$, not $i = 1$, and that is the whole trick:

> [!EXAM]
> **$w_0 = -\theta$ is the bias, and $x_0 = 1$ always.**
>
> Starting from the MP-style condition $\sum_{i=1}^{n} w_i x_i \geq \theta$, move $\theta$ to the left:
>
> $$\sum_{i=1}^{n} w_i x_i - \theta \geq 0 \;\;\Longrightarrow\;\; \sum_{i=1}^{n} w_i x_i + w_0 x_0 \geq 0 \;\;\text{with } w_0 = -\theta,\; x_0 = 1$$
>
> The threshold has become **an ordinary weight on a constant input**. That is *why* it can now be learned — the learning rule updates $w_0$ exactly as it updates every other weight, with no special case.

$w_1 \dots w_n$ are the weights on inputs $x_1 \dots x_n$, and $y$ is the output.

> [!TRAP]
> Watch the sign. $w_0 = -\theta$, so a **large threshold is a large negative bias**. If a question gives you $w_0 = -0.3$ and asks for the threshold, the answer is $\theta = 0.3$, not $-0.3$.

---

## What the bias means

The restaurant example is worth keeping, because it gives $w_0$ an interpretation rather than leaving it as an algebraic convenience.

Task: predict whether we would like to **dine at a restaurant**, based on three inputs — $x_1 = $ **Service**, $x_2 = $ **Ambience**, $x_3 = $ **Taste**.

- Based on **past dining experience (the data)**, we give a **high weight to taste** compared with the other inputs.
- **$w_0$ is called the bias, as it represents the prior (prejudice).**

> [!EXAM]
> The two characters the slides use to make the threshold concrete:
>
> - **A foodie** has a **very low threshold** and may dine at any restaurant irrespective of service, ambience or taste — $\theta = 0$.
> - **A food critic** may only dine at restaurants with **≥ 4-star ratings** for service, taste and ambience — $\theta = 3$.
>
> Same weights, different bias, completely different behaviour.

> [!INTUITION]
> The split is genuinely meaningful. **The weights encode what the evidence says** — how much taste matters relative to ambience, learned from data. **The bias encodes how much evidence you demand before acting** — your standing disposition, independent of any particular restaurant.
>
> This is why calling $w_0$ a *prior* is apt rather than decorative: it shifts the decision boundary without changing its orientation. Two people can weigh the same evidence identically and still disagree, purely because one is harder to please.

---

## Perceptron as a linear unit

> [!NOTE]
> - A perceptron is a **threshold linear unit (discrete-valued)**.
> - **What is a linear unit?** A **linear combination of weighted inputs (real-valued)**.
> - A perceptron offers **linear decision surfaces**, which means a single perceptron can easily represent simple Boolean functions like **AND, OR, NAND and NOR**.

> [!TRAP]
> Read that first bullet carefully — there are **two** components. The *linear unit* is the real-valued weighted sum $\sum w_i x_i$; the *threshold* is the step applied on top of it that squashes the result to $\{0, 1\}$.
>
> The distinction matters later: the sum is smooth and differentiable, the threshold is neither. When the sigmoid neuron arrives, it keeps the linear unit **unchanged** and replaces only the threshold.

---

## Worked example — OR

Given the truth table for OR and the perceptron equation, find $w_0$, $w_1$, $w_2$.

| $x_1$ | $x_2$ | OR |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

> [!DERIVE]
> **One possible solution is $w_0 = -0.3$, $w_1 = w_2 = 0.5$.** Verify all four rows using $y = 1 \iff w_0 + w_1x_1 + w_2x_2 \geq 0$:
>
> | $(x_1, x_2)$ | $w_0 + w_1x_1 + w_2x_2$ | Sign | $y$ | Required |
> |---|---|---|---|---|
> | $(0,0)$ | $-0.3$ | $< 0$ | 0 | 0 ✓ |
> | $(0,1)$ | $-0.3 + 0.5 = 0.2$ | $\geq 0$ | 1 | 1 ✓ |
> | $(1,0)$ | $-0.3 + 0.5 = 0.2$ | $\geq 0$ | 1 | 1 ✓ |
> | $(1,1)$ | $-0.3 + 1.0 = 0.7$ | $\geq 0$ | 1 | 1 ✓ |
>
> All four correct. Note the solution is **not unique** — any weights placing the line between $(0,0)$ and the other three points work. The threshold here is $\theta = 0.3$, i.e. *"at least one input must be on."*

> [!EXAM]
> For **AND** with the same $w_1 = w_2 = 0.5$, you need $\theta$ between $0.5$ and $1.0$ — so $w_0 = -0.8$ works: only $(1,1)$ gives $-0.8 + 1.0 = 0.2 \geq 0$. Being able to hand-construct weights for AND, OR, NAND and NOR is a standard short question.

---

**Next:** how those weights are found automatically — **the perceptron learning algorithm**.
