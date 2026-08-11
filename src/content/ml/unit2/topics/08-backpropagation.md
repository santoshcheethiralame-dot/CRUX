---
subject: ml
unit: 2
order: 8
slug: backpropagation
title: Backpropagation — The Three Training Rules
summary: The error at the output layer, the chain-rule decomposition, and the full derivation of the delta rules for output units, hidden layer 2 and hidden layer 1 — with the recursion that makes them one formula.
minutes: 13
tags: [backpropagation, chain-rule, delta-rule, downstream, training-rule, gradient, mitchell]
---

# Backpropagation — The Three Training Rules

## The error at the output layer

$$E_d(\vec{w}) \equiv \frac{1}{2}\sum_{k \in outputs} (t_k - o_k)^2$$

Worked on the network from the forward-propagation topic:

| Neuron $k \in outputs$ | Target $t$ | Predicted $O$ | $(t_k - O_k)$ | $(t_k - O_k)^2$ |
|---|---|---|---|---|
| 1 | 0.01 | 0.7513 | −0.7413 | 0.5495 |
| 2 | 0.99 | 0.7729 | 0.2171 | 0.0471 |

$$\sum_{k \in outputs}(t_k - o_k)^2 = 0.5966 \qquad\Longrightarrow\qquad E_d(\vec{w}) = \tfrac12(0.5966) = \mathbf{0.2983}$$

> [!TRAP]
> $E_d$ carries a subscript $d$ because it is the error for **one training example $d$**. The total error sums over the dataset. Most derivations work with $E_d$ and rely on the sum rule of differentiation — but be clear which one a question is asking for.

---

## The chain-rule spine

Weights are updated by gradient descent on $E_d$:

$$w_{new} = w + \Delta w, \qquad \Delta w = -\eta\,\frac{\partial E_d}{\partial w}$$

The whole of backpropagation is one repeated decomposition. For a weight $w_{kj}$ feeding output unit $k$:

$$\frac{\partial E_d}{\partial w_{kj}} = \underbrace{\frac{\partial E_d}{\partial O_k}}_{\text{how error responds to output}} \times \underbrace{\frac{\partial O_k}{\partial net_k}}_{\text{how output responds to net}} \times \underbrace{\frac{\partial net_k}{\partial w_{kj}}}_{\text{how net responds to weight}}$$

> [!INTUITION]
> Each factor is trivially computable, and that is the point:
> - $\partial E_d/\partial O_k = -(t_k - O_k)$ — from the squared error, where the $\tfrac12$ cancels;
> - $\partial O_k/\partial net_k = O_k(1 - O_k)$ — the **sigmoid derivative**, expressible entirely in terms of the output already computed in the forward pass;
> - $\partial net_k/\partial w_{kj} = O_j$ — because $net_k = \sum_j w_{kj}O_j$, so differentiating w.r.t. one weight leaves **just the input on that connection**.
>
> **Backpropagation is not a new idea — it is the chain rule plus bookkeeping.** Its contribution is *reusing* the shared prefixes so an $n$-layer network costs one backward sweep instead of a separate derivative per weight.

---

## Rule 1 — output unit weights

> [!DERIVE]
> $$\Delta w_{kj} = -\eta \; \frac{\partial E_d}{\partial O_k} \times \frac{\partial O_k}{\partial net_k} \times \frac{\partial net_k}{\partial w_{kj}}$$
>
> Substituting the three factors:
>
> $$\Delta w_{kj} = -\eta \; \bigl(-(t_k - O_k)\bigr) \times \bigl(O_k(1-O_k)\bigr) \times \bigl(O_j\bigr)$$
>
> The two minus signs cancel:
>
> $$\Delta w_{kj} = \eta \,(t_k - O_k)\, O_k(1 - O_k)\, O_j$$
>
> Now define $\displaystyle \delta_k \leftarrow -\frac{\partial E_d}{\partial net_k}$, which gives
>
> $$\boxed{\;\delta_k = (t_k - O_k)\, O_k(1 - O_k)\;}$$
>
> $$\boxed{\;\Delta w_{kj} = \eta\, \delta_k\, O_j\;}$$

> [!EXAM]
> Read the shape of $\Delta w = \eta \cdot \delta \cdot (\text{input on that connection})$ — **it is identical at every layer**. Only the definition of $\delta$ changes. If you remember that, you have two thirds of backpropagation.

---

## Rule 2 — hidden layer 2 weights

A hidden unit $j$ has **no target $t_j$**, so $\partial E_d/\partial O_j$ cannot be written directly. Instead the error arrives from every unit $j$ feeds — that is, from $Downstream(j)$.

> [!DERIVE]
> $$\Delta w_{ji} = -\eta \times \Biggl[\sum_{k \in Downstream(j)} -\delta_k\, w_{kj}\, O_j(1-O_j)\Biggr] \times O_i$$
>
> The bracketed quantity is $-\delta_j$, so
>
> $$\boxed{\;\delta_j = \sum_{k \in Downstream(j)} \delta_k\, w_{kj}\, O_j(1 - O_j)\;}$$
>
> $$\boxed{\;\Delta w_{ji} = \eta\, \delta_j\, O_i\;}$$
>
> with $\delta_k = (t_k - O_k)O_k(1-O_k)$ from Rule 1.

> [!INTUITION]
> Read $\delta_j = O_j(1-O_j)\sum_k \delta_k w_{kj}$ as a sentence: **"my responsibility is my own sensitivity, times the sum of my children's blame weighted by how strongly I influence each of them."**
>
> The weight $w_{kj}$ appears because a hidden unit that barely influences a downstream unit should barely be blamed for its error. And $\delta_k$ flows **backward along the very same edges** the activations flowed forward — which is exactly what the word *backpropagation* names.

---

## Rule 3 — hidden layer 1 weights

The recursion simply repeats one layer further back. For a first-hidden-layer unit $i$, its downstream set is the second hidden layer:

$$\boxed{\;\delta_i = \sum_{j \in Downstream(i)} \delta_j\, w_{ji}\, O_i(1 - O_i)\;}$$

$$\boxed{\;\Delta w_{im} = \eta\, \delta_i\, x_m\;}$$

where $\delta_j$ comes from Rule 2 and $\delta_k$ from Rule 1.

> [!EXAM]
> Note the input term is now **$x_m$, the raw input**, not an $O$ — because the first hidden layer's inputs *are* the network's inputs. Everything else is unchanged.
>
> The three rules together:
>
> | Layer | $\delta$ | Update |
> |---|---|---|
> | **Output** $k$ | $(t_k - O_k)\,O_k(1-O_k)$ | $\Delta w_{kj} = \eta\,\delta_k\,O_j$ |
> | **Hidden 2** $j$ | $O_j(1-O_j)\displaystyle\sum_{k \in Down(j)} \delta_k w_{kj}$ | $\Delta w_{ji} = \eta\,\delta_j\,O_i$ |
> | **Hidden 1** $i$ | $O_i(1-O_i)\displaystyle\sum_{j \in Down(i)} \delta_j w_{ji}$ | $\Delta w_{im} = \eta\,\delta_i\,x_m$ |

> [!TRAP]
> **The only structural difference between an output unit and a hidden unit** is what supplies the first factor:
> - output units get $(t_k - O_k)$ — a **direct** error, because a target exists;
> - hidden units get $\sum_{k} \delta_k w_{kj}$ — an **inherited** error, because none does.
>
> The $O(1-O)$ sigmoid factor is present in **both**. Dropping it for hidden units, or writing $(t_j - O_j)$ for a hidden unit, are the two classic exam errors.

---

## The algorithm

1. **Forward pass** — compute $net_j$ and $O_j$ for every unit, layer by layer, and store them.
2. **Compute output deltas** — $\delta_k = (t_k - O_k)O_k(1-O_k)$ for each $k \in outputs$.
3. **Propagate backward** — for each hidden layer in reverse order, compute $\delta$ from the deltas of $Downstream$.
4. **Update every weight** — $w \leftarrow w + \eta\,\delta_{\text{destination}}\,(\text{input on that edge})$.
5. **Repeat** for the next example or batch until convergence.

> [!INTUITION]
> Step 1 says *store them*, and that is not incidental. Every $\delta$ needs the $O$ values from the forward pass, so they must be **kept in memory** until the backward sweep consumes them. This is why training a deep network needs far more memory than running one — and why activation memory, not parameter count, is often what limits batch size in practice.

---

**Next:** the same rules on real numbers, plus what breaks in deep networks — **backpropagation in practice**.
