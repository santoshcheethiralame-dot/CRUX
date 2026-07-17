---
subject: ml
unit: 3
order: 13
slug: hmm-viterbi
title: HMM Problem 2 — Viterbi (Decoding)
summary: Finding the single most-likely hidden-state sequence via dynamic programming with back-pointers.
minutes: 12
tags: [viterbi, decoding, dynamic-programming, back-pointer]
---

# HMM Problem 2 — Viterbi (Decoding)

**Goal:** given observations $O$ and model $\lambda$, find the **single most likely hidden-state sequence** $Q^*$ that produced $O$:

$$Q^* = \arg\max_{Q} P(Q\mid O, \lambda)$$

Brute force again means scoring all $N^T$ paths — rejected. **Viterbi** solves it in $O(N^2 T)$.

## Forward algorithm vs Viterbi — the one-word difference

> [!INTUITION]
> The Forward algorithm **sums** over previous states to get a total probability; Viterbi **maximizes** over them to find the single best path. Replace $\sum$ with $\max$ — and add **back-pointers** so you can reconstruct *which* path won.

## The Viterbi variables

- $\delta_t(j)$ — the probability of the **most likely path** that ends in state $j$ at time $t$ (having emitted $o_1\dots o_t$).
- $\psi_t(j)$ — a **back-pointer**: which previous state led to that best path.

## The algorithm

- **Initialization:** $\delta_1(j) = \pi_j\,b_j(o_1)$, $\quad\psi_1(j) = 0$
- **Recursion:**
$$\delta_t(j) = \max_{i}\big[\delta_{t-1}(i)\,a_{ij}\big]\,b_j(o_t), \qquad \psi_t(j) = \arg\max_{i}\big[\delta_{t-1}(i)\,a_{ij}\big]$$
- **Termination:** $P^* = \max_j \delta_T(j)$, $\quad q_T^* = \arg\max_j \delta_T(j)$
- **Backtrack:** $q_t^* = \psi_{t+1}(q_{t+1}^*)$ for $t = T{-}1, \dots, 1$

> [!NOTE]
> The forward pass fills the $\delta$ table and records the best predecessor at each cell ($\psi$). Once we reach the end, we read off the best final state and **walk the back-pointers backwards** to recover the whole optimal path. Without $\psi$ you'd know the best *score* but not the best *sequence*.

## Worked example

Weather/mood HMM, $O$ = (Happy, Grumpy, Happy), $\pi(S)=\tfrac23,\pi(R)=\tfrac13$:

| | $t{=}1$ (Happy) | $t{=}2$ (Grumpy) | $t{=}3$ (Happy) |
|---|---|---|---|
| Sunny | $\tfrac23\cdot0.8 = \tfrac{8}{15}$ | $\tfrac{32}{375}$ | $\tfrac{512}{9375}$ |
| Rainy | $\tfrac13\cdot0.4 = \tfrac{2}{15}$ | $\tfrac{8}{125}$ | $\tfrac{144}{9375}$ |

Each cell took the **max** (not sum) over predecessors. Backtracking the pointers gives the optimal path **Sunny → Sunny → Sunny**.

> [!TRAP]
> Viterbi finds the best **whole-sequence** path — which is *not* the same as picking the most-probable state at each time independently (that could yield a path with a zero-probability transition). Decoding must respect the transition structure, which is exactly what the $\delta$ recursion does.

> [!EXAM]
> Contrast Forward (uses $\sum$, gives $P(O\mid\lambda)$) with Viterbi (uses $\max$ + back-pointers, gives $Q^*$). Reproduce the three steps and the **backtracking** via $\psi$. Both are $O(N^2T)$ dynamic programming.

---

**Next:** Problem 3 — learning the model with **Baum-Welch**.
