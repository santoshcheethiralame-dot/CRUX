---
subject: ml
unit: 2
order: 3
slug: perceptron-learning
title: The Perceptron Learning Algorithm
summary: The update rule for positive and negative examples, and the angle argument that proves each update moves the weight vector the right way — the course's own convergence proof.
minutes: 10
tags: [perceptron, learning-algorithm, convergence, weight-update, cosine, geometry]
---

# The Perceptron Learning Algorithm

## The algorithm

> [!NOTE]
> ```
> P ← inputs with label 1;
> N ← inputs with label 0;
>
> Initialize w randomly;
>
> while !convergence do
>     Pick random x ∈ P ∪ N;
>     if x ∈ P and  Σ wᵢxᵢ < 0  then
>         w = w + x;
>     end
>     if x ∈ N and  Σ wᵢxᵢ ≥ 0  then
>         w = w − x;
>     end
> end
> // the algorithm converges when all the inputs are classified correctly
> ```

Read the two updates as one idea: **the weight vector only moves when a point is wrong**, and it moves **toward** a misclassified positive, **away from** a misclassified negative.

> [!TRAP]
> Both conditions have two parts — the **class** and the **current verdict**. A positive point that is already classified correctly ($\mathbf{w}\cdot\mathbf{x} \geq 0$) triggers **nothing**. This is what makes the perceptron an **error-driven** rule: correctly handled points contribute no update at all, which is quite different from gradient descent on a smooth loss, where every point contributes something on every step.

---

## Why the update works — the angle argument

This is the course's own justification, and it is a clean piece of geometry worth reproducing in full.

Recall that for the decision $\mathbf{w}^T\mathbf{x} \geq 0$, what matters is the **angle** between $\mathbf{w}$ and $\mathbf{x}$:

$$\cos\alpha = \frac{\mathbf{w}^T\mathbf{x}}{\lVert\mathbf{w}\rVert \, \lVert\mathbf{x}\rVert}$$

Since the denominator is always positive, **the sign of $\mathbf{w}^T\mathbf{x}$ is the sign of $\cos\alpha$**. So:

- $\mathbf{w}^T\mathbf{x} \geq 0 \iff \alpha \leq 90°$
- $\mathbf{w}^T\mathbf{x} < 0 \iff \alpha > 90°$

> [!DERIVE]
> **For $\mathbf{x} \in P$ with $\mathbf{w}\cdot\mathbf{x} < 0$:** the angle $\alpha$ between this $\mathbf{x}$ and the current $\mathbf{w}$ is **greater than 90°** — but for a positive example **we want $\alpha$ to be less than 90°**.
>
> Apply the update $\mathbf{w}_{new} = \mathbf{w} + \mathbf{x}$ and ask what happens to the new angle:
>
> $$\cos(\alpha_{new}) \propto \mathbf{w}_{new}^T\mathbf{x}$$
> $$\propto (\mathbf{w} + \mathbf{x})^T\mathbf{x}$$
> $$\propto \mathbf{w}^T\mathbf{x} + \mathbf{x}^T\mathbf{x}$$
> $$\propto \cos\alpha + \mathbf{x}^T\mathbf{x}$$
>
> Since $\mathbf{x}^T\mathbf{x} = \lVert\mathbf{x}\rVert^2 > 0$, we get
>
> $$\cos(\alpha_{new}) > \cos\alpha$$
>
> Cosine is **decreasing** on $[0°, 180°]$, so a larger cosine means a **smaller angle**:
>
> $$\alpha_{new} < \alpha \quad \text{— exactly what we want.}$$

The argument for $\mathbf{x} \in N$ is the mirror image: there $\mathbf{w}\cdot\mathbf{x} \geq 0$ means $\alpha \leq 90°$ when we want it **greater** than 90°, and the update $\mathbf{w}_{new} = \mathbf{w} - \mathbf{x}$ gives $\cos(\alpha_{new}) \propto \cos\alpha - \mathbf{x}^T\mathbf{x} < \cos\alpha$, so $\alpha_{new} > \alpha$.

> [!EXAM]
> *"Show that the perceptron update rule moves the weight vector in the correct direction"* is a standard derivation question. The four lines that earn the marks:
> 1. $\cos\alpha \propto \mathbf{w}^T\mathbf{x}$, so **sign of the dot product = which side of 90° the angle is on**;
> 2. substitute $\mathbf{w}_{new} = \mathbf{w} + \mathbf{x}$ and expand;
> 3. the extra term is $\mathbf{x}^T\mathbf{x} > 0$;
> 4. therefore $\cos\alpha_{new} > \cos\alpha \Rightarrow \alpha_{new} < \alpha$.

> [!TRAP]
> This shows each update is a **step in the right direction** — it does **not** by itself prove the algorithm terminates. A single update can fix one point while breaking another. The full **Perceptron Convergence Theorem** additionally requires that the data be **linearly separable**, and under that assumption guarantees convergence in a **finite** number of updates. On non-separable data the algorithm **never converges** and cycles forever, which is exactly the failure the next topic exploits.

---

## The geometric picture

The accompanying figure shows positive points $p_1, p_2, p_3$ (blue) and negative points $n_1, n_2, n_3$ (red) as vectors from the origin, with $\mathbf{w}$ drawn as an arrow and the decision boundary $\mathbf{w}^T\mathbf{x} = 0$ as a dashed line **perpendicular to $\mathbf{w}$**.

> [!INTUITION]
> Two things become obvious once you see the vectors rather than the algebra.
>
> First, **$\mathbf{w}$ is normal to the decision boundary** — the boundary is the set of points at exactly 90° to $\mathbf{w}$. So "rotating $\mathbf{w}$" and "rotating the boundary" are the same act.
>
> Second, the update **adds the misclassified point itself** to $\mathbf{w}$. That is why the rule needs no learning rate and no derivative: the data point *is* the direction you want to rotate toward. The perceptron is doing geometry, not calculus — which is precisely why it works with a hard, non-differentiable threshold, and why everything after this topic has to change the neuron before it can use gradients.

> [!EXAM]
> Given a small dataset and an initial $\mathbf{w}$, be ready to **trace a few updates by hand**: compute $\mathbf{w}\cdot\mathbf{x}$, check it against the point's label, apply $\mathbf{w} \pm \mathbf{x}$ only if wrong, and repeat. Include $x_0 = 1$ so the bias updates too — forgetting the bias component is the most common slip.

---

**Next:** the function a single perceptron cannot represent, and the network that can — **multilayer networks & XOR**.
