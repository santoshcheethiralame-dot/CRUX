---
subject: ml
unit: 3
order: 12
slug: hmm-forward-backward
title: HMM Problem 1 — Forward & Backward
summary: Computing P(O|λ) — why brute force is exponential, and the O(N²T) forward and backward dynamic-programming recursions.
minutes: 15
tags: [forward-algorithm, backward-algorithm, likelihood, dynamic-programming]
---

# HMM Problem 1 — Forward & Backward

**Goal:** given an observation sequence $O$ and a model $\lambda(\pi, A, B)$, compute the **likelihood** $P(O\mid\lambda)$.

## Why brute force fails

The observations could have come from *any* hidden-state path $Q$. So sum over all paths:

$$P(O\mid\lambda) = \sum_{Q} P(O\mid Q)\,P(Q), \qquad P(O\mid Q) = \prod_{t} b_{q_t}(o_t)\,a_{q_{t-1}q_t}$$

> [!TRAP]
> With $N$ states and a length-$T$ sequence there are **$N^T$** possible paths, each costing ~$2T$ multiplications → total $\approx (2T+1)N^T$ operations — **exponential** and infeasible. *(Quiz: 4 states, length 5 → $4^5 = 1024$ paths.)* The fix is dynamic programming: stop re-computing shared sub-paths.

## The Forward algorithm

Define the **forward variable** — the probability of the observations *so far* **and** being in state $j$ at time $t$:

$$\alpha_t(j) = P(o_1, o_2, \dots, o_t,\ q_t = j\mid\lambda)$$

> [!DERIVE]
> Splitting on the previous state $i$ and applying the Markov + output-independence assumptions:
> $$\alpha_t(j) = \Big[\sum_{i=1}^{N}\alpha_{t-1}(i)\,a_{ij}\Big]\,b_j(o_t)$$
> Each $\alpha_t(j)$ reuses all $N$ values of $\alpha_{t-1}$ — collapsing the exponential path-sum into a small table.

**Three steps:**

- **Initialization:** $\alpha_1(j) = \pi_j\,b_j(o_1)$
- **Recursion:** $\alpha_t(j) = \big[\sum_i \alpha_{t-1}(i)\,a_{ij}\big]\,b_j(o_t)$
- **Termination:** $P(O\mid\lambda) = \sum_j \alpha_T(j)$

**Complexity: $O(N^2 T)$** — linear in $T$ instead of exponential.

*Example (weather/mood, $\pi(S)=\tfrac23, \pi(R)=\tfrac13$, $O$ = Happy, Grumpy, Happy):* $\alpha_1(S)=\tfrac23\cdot0.8=\tfrac{8}{15}$, $\alpha_1(R)=\tfrac13\cdot0.4=\tfrac{2}{15}$, then recurse forward.

## The Backward algorithm

The mirror image — the **backward variable** is the probability of the *future* observations given you're in state $i$ at time $t$:

$$\beta_t(i) = P(o_{t+1}, o_{t+2}, \dots, o_T\mid q_t = i, \lambda)$$

**Three steps:**

- **Initialization:** $\beta_T(i) = 1$ for all $i$
- **Recursion:** $\beta_t(i) = \sum_j a_{ij}\,b_j(o_{t+1})\,\beta_{t+1}(j)$
- **Termination:** $P(O\mid\lambda) = \sum_j \pi_j\,b_j(o_1)\,\beta_1(j)$

## The α–β relationship (key result)

> [!NOTE]
> $\alpha_t(j)$ covers the **past** (observations up to $t$, ending in state $j$); $\beta_t(j)$ covers the **future** (observations after $t$, starting from state $j$). Their **product** gives the probability of being in state $j$ at time $t$ while explaining the **whole** sequence:
> $$\alpha_t(j)\,\beta_t(j) = P(o_1\dots o_T,\ q_t = j\mid\lambda)$$
> Consequently $\sum_j \alpha_t(j)\beta_t(j) = P(O\mid\lambda)$ for **every** column $t$ — a handy consistency check, and the basis of $\gamma_t(j)$ used in Baum-Welch.

> [!EXAM]
> Reproduce the forward three steps (init $\pi_j b_j(o_1)$ → recursion → terminate by summing $\alpha_T$) and state the complexity $O(N^2T)$ vs brute-force $O(N^T)$. Know that $\beta_T(i)=1$, and that $\alpha_t(j)\beta_t(j)$ = probability of being in state $j$ at $t$ given the full $O$.

---

**Next:** Problem 2 — the **Viterbi algorithm** for the best path.
