---
subject: ml
unit: 3
order: 11
slug: hmm
title: Hidden Markov Models (HMM)
summary: Hidden states emitting observations — the λ = {Q, Σ, π, A, B} parameters, the two assumptions, and the three problems.
minutes: 13
tags: [HMM, hidden-states, emission, lambda, three-problems]
---

# Hidden Markov Models (HMM)

## From visible to hidden states

In a Markov chain, the states themselves are **observable**. In a **Hidden Markov Model**, the states are **hidden** — we never see them directly; we only see **observations** that each state *emits*.

> [!INTUITION]
> **The classic story:** a woman indoors can't see the weather. She infers it from her husband's mood. **Hidden states** = the actual weather {Sunny, Rainy}; **observations** = his mood {Happy, Grumpy}. The HMM moves between hidden states (a Markov chain), and at each state it *emits* an observation according to **emission probabilities**.

## The parameters: λ = {Q, Σ, π, A, B}

| Symbol | Name | Definition |
|---|---|---|
| $Q = \{q_1,\dots,q_N\}$ | hidden **states** | the $N$ unobservable states |
| $\Sigma = \{o_1,\dots,o_M\}$ | observation **alphabet** | the $M$ possible emitted symbols |
| $\pi = \{\pi_i\}$ | **initial** distribution | $\pi_i = P(q_1 = i)$ |
| $A$ ($N\times N$) | **transition** matrix | $a_{ij} = P(q_{t+1}=j\mid q_t=i)$ |
| $B$ ($N\times M$) | **emission** matrix | $b_j(o_k) = P(o_t = o_k\mid q_t = j)$ |

So an HMM is a Markov chain ($\pi, A$) **plus** an emission model ($B$). *Example values:* $P(\text{Sunny}\mid\text{Sunny})=0.8$, $P(\text{Happy}\mid\text{Sunny})=0.8$, $P(\text{Happy}\mid\text{Rainy})=0.4$, etc.

> [!NOTE]
> **Why emissions are probabilistic.** A state can produce *several* observations with different likelihoods (mild illness → low fever 0.6, headache 0.3, none 0.1). This stochastic emission is what lets HMMs capture real-world variability; a deterministic state→observation map would be far too rigid.

## The two fundamental assumptions

> [!EXAM]
> 1. **Markov assumption** — the current *hidden state* depends only on the immediately preceding state: $P(q_t\mid q_{1:t-1}) = P(q_t\mid q_{t-1})$.
> 2. **Output (emission) independence** — the current *observation* depends only on the current hidden state: $P(o_t\mid q_{1:t}, o_{1:t-1}) = P(o_t\mid q_t)$.
>
> These two assumptions are what make the forward/Viterbi/Baum-Welch recursions possible.

## The three key HMM problems

| # | Problem | Given | Find | Solved by |
|---|---|---|---|---|
| **1** | **Likelihood** (Evaluation) | $O, \lambda$ | $P(O\mid\lambda)$ | Forward / Backward |
| **2** | **Decoding** | $O, \lambda$ | best state sequence $Q^*$ | Viterbi |
| **3** | **Learning** | $O$ (states unknown) | $\lambda = \{\pi, A, B\}$ | Baum-Welch (EM) |

> [!INTUITION]
> Problem 1: "How well does this model explain what I saw?" Problem 2: "What hidden states most likely produced what I saw?" Problem 3: "Given only observations, what model best fits?" The next three topics solve each in turn — all via **dynamic programming** to avoid the exponential $N^T$ brute force.

> [!EXAM]
> Memorise $\lambda = \{Q, \Sigma, \pi, A, B\}$ (especially: $A$ = transitions, $B$ = emissions), the two assumptions, and the three problems with their algorithms. Distinguish **state** (hidden) from **observation** (visible) — every HMM question hinges on it.

---

**Next:** Problem 1 — the **Forward & Backward algorithms**.
