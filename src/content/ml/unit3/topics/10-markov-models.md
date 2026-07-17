---
subject: ml
unit: 3
order: 10
slug: markov-models
title: Markov Models
summary: The Markov property, Markov chains, transition matrices, sequence likelihood, and estimating the parameters.
minutes: 12
tags: [markov-property, markov-chain, transition-matrix, stochastic-process]
---

# Markov Models

## Beyond IID: modelling sequences

The **IID assumption fails** for sequential data — audio/video, words in a sentence, base-pairs in DNA, daily weather. Here the *order matters* and successive values are correlated. A **stochastic process** is a collection of random variables indexed by time, drawing from a shared state space.

## The Markov property

The trouble with sequences is that the future could depend on the **entire** past. The **Markov assumption** is a powerful simplification:

> [!NOTE]
> **(First-order) Markov property:** the next state depends *only on the current state*, not the full history:
> $$P(q_n = a\mid q_1 q_2 \dots q_{n-1}) = P(q_n = a\mid q_{n-1})$$
> An **order-$k$** chain conditions on the last $k$ states instead.

> [!INTUITION]
> "The future depends only on the present, not the past." Tomorrow's weather depends on today's, not on last week's. This memorylessness is what makes sequence models tractable.

## Markov chains

A discrete-time stochastic process with the Markov property, specified by $\lambda(\pi, A)$:

| Component | Meaning |
|---|---|
| **States** $Q$ | the possible values |
| **Initial distribution** $\pi$ | $\pi_{q_i} = P(q_1 = q_i)$ — probability of *starting* in state $q_i$ |
| **Transition matrix** $A$ ($N\times N$) | $a_{ij} = P(q_{t+1}=j\mid q_t=i)$ |

> [!TRAP]
> **Every row of $A$ must sum to 1** — from any state, the probabilities of going *somewhere* next must total 1. A common exam slip is forgetting to normalise rows.

## Likelihood of a state sequence

Given a chain and an observed sequence $Q = \{q_0, q_1, \dots, q_m\}$, its probability factorises by the chain rule + Markov property:

$$P(Q) = P(q_0)\,P(q_1\mid q_0)\,P(q_2\mid q_1)\cdots P(q_m\mid q_{m-1})$$

$P(q_0)$ comes from $\pi$; each $P(q_i\mid q_{i-1})$ from $A$. This *evaluating a sequence* is the second main use of a Markov chain (the first being prediction).

## Estimating the parameters from data

Just **count**:

$$\pi_{q_i} = \frac{\#\text{ sequences starting in } q_i}{\#\text{ sequences}}, \qquad a_{ij} = \frac{\#\text{ transitions } q_i\to q_j}{\#\text{ transitions out of } q_i}$$

**Example — weather** with states {Sunny, Cloudy, Windy}: counting transitions gives a row-stochastic matrix like

| From\To | Sunny | Cloudy | Windy |
|---|---|---|---|
| Sunny | 2/15 | 4/15 | 9/15 |
| Cloudy | 9/19 | 4/19 | 6/19 |
| Windy | 9/22 | 12/22 | 1/22 |

each row summing to 1.

> [!NOTE]
> **Order reduction (Alpaydin, Exercise):** any second- (or higher-) order Markov model can be converted to an equivalent **first-order** model — by defining new states that are *pairs* of original states. So first-order chains lose no expressive power in principle.

> [!EXAM]
> Be able to: write the Markov property; build $A$ and $\pi$ from sequence counts (check rows sum to 1); and compute a sequence likelihood $P(q_0)\prod_t P(q_t\mid q_{t-1})$. In a plain Markov chain **the states are observable** — the next topic *hides* them.

---

**Next:** when the states are hidden — **Hidden Markov Models**.
