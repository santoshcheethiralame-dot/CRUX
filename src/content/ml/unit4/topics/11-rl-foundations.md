---
subject: ml
unit: 4
order: 11
slug: rl-foundations
title: Reinforcement Learning — Foundations
summary: The agent–environment loop, history & state, the Markov property, MDPs, observability, and the maze/Atari examples.
minutes: 14
tags: [reinforcement-learning, agent, environment, MDP, markov-state]
---

# Reinforcement Learning — Foundations

**Reinforcement Learning (RL)** is learning **what to do** — mapping situations to actions — to **maximise cumulative reward**, through **trial-and-error interaction** with an environment.

> [!NOTE]
> **What makes RL different** from supervised/unsupervised learning:
> - no labelled dataset — feedback is a scalar **reward**, often **delayed**;
> - the agent's **actions affect the data** it subsequently sees;
> - the goal is **long-term** cumulative reward, not per-example correctness.

**Applications:** game playing (Atari 2600, StarCraft, DeepMind Lab — safe simulated worlds to explore/fail/improve), robotic **navigation** (learn paths, avoid obstacles).

## The agent–environment loop

At each time step $t$:
- the **agent** takes action $A_t$, observes $O_t$, receives reward $R_t$;
- the **environment** receives $A_t$, emits the next observation $O_{t+1}$ and reward $R_{t+1}$.

This loop repeats — RL is an **interactive** process where the agent continually **acts → observes → learns**.

## History & State

- **History** $H_t$ = the full sequence of observations, actions, and rewards up to $t$.
- **State** $S_t$ = the information used to decide what happens next — a **function of history**, a **compressed summary** sufficient to choose the next action.
- **Environment state $S_t^e$** — the environment's *private* representation (generates the next reward/observation); usually **not visible** to the agent.
- **Agent state $S_t^a$** — the agent's *internal* representation (its model of the world); the info the RL algorithm actually uses.

## The Markov state

> [!INTUITION]
> If you know your **current position and speed**, you can predict your next position — you don't need your entire travel history.

> [!NOTE]
> An **information (Markov) state** contains **all useful information from the history**: *"the future is independent of the past given the present."* The state is a **sufficient statistic** for the future. (Same Markov property as Unit 3's HMMs.)

## Markov Decision Process (MDP)

A **fully-observable** RL environment is formalised as an **MDP** — the tuple:

$$\langle S,\ A,\ P,\ R,\ \gamma\rangle$$

States $S$, Actions $A$, transition probabilities $P(s'\mid s,a)$, reward function $R(s,a)$, and **discount factor $\gamma\in[0,1]$**.

## Observability

| | Fully observable | Partially observable (POMDP) |
|---|---|---|
| Agent sees | the full true state: $O_t = S_t^a = S_t^e$ | only limited observations |
| Must | — | **infer the hidden state** (update internal state from prev state + current obs) |
| Modelled as | **MDP** (e.g. grid world) | POMDP (most real problems) |

> [!INTUITION]
> A self-driving car can't directly see other drivers' **intentions** (a hidden state), but **infers** them from observed behaviour — a partially-observable problem.

## Examples

- **Maze:** rewards −1 per step; actions N/E/W/S; states = agent location. Goal = reach the goal in **fewest steps** (each step costs −1, so a short path maximises total reward). A **policy** $\pi(s)$ gives the action per cell; the **value** $v_\pi(s)$ per cell ≈ expected steps-to-goal; a **model** captures transitions + rewards for **planning**.
- **Atari — learning vs planning:** *Learning* (rules **unknown**) → learn directly from pixels + score by trial and error. *Planning* (rules **known**) → use an **emulator/model** to simulate "if I act $a$ from $s$, what's the next state & score?" and **plan ahead with search trees** (like a chess engine).

> [!EXAM]
> Define the **agent–environment loop** ($A_t, O_t, R_t$), the **Markov state** (future independent of past given present), and the **MDP tuple $\langle S,A,P,R,\gamma\rangle$**. Distinguish **fully observable (MDP)** from **partially observable (POMDP)**, and **learning** (model-free, rules unknown) from **planning** (model-based, rules known).

---

**Next:** how the agent measures and learns "good" actions — **Value Functions & Q-Learning**.
