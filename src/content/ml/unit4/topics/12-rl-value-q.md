---
subject: ml
unit: 4
order: 12
slug: rl-value-q
title: RL — Value Functions & Q-Learning
summary: Return, policy, state- and action-value functions, Bellman equations, the Q-learning update, Deep Q-Networks, and exploration vs exploitation.
minutes: 15
tags: [value-function, Q-learning, bellman, deep-Q, exploration-exploitation]
---

# RL — Value Functions & Q-Learning

## Return, policy, and value

The agent maximises the **return** — cumulative **discounted** reward from time $t$:

$$G_t = R_{t+1} + \gamma R_{t+2} + \gamma^2 R_{t+3} + \dots = \sum_{k=0}^{\infty}\gamma^k R_{t+k+1}$$

> [!INTUITION]
> The **discount factor $\gamma\in[0,1]$** weights the future: $\gamma\to0$ = **myopic** (only immediate reward matters); $\gamma\to1$ = **far-sighted** (future rewards count almost fully). It also keeps the infinite sum finite.

A **policy $\pi$** is the agent's behaviour — a map from state to action ($\pi(s)=a$, or a distribution $\pi(a\mid s)$).

### State-value and action-value functions

$$V^\pi(s) = \mathbb{E}_\pi[\,G_t \mid S_t=s\,] \qquad\text{(how good is state }s\text{ under }\pi)$$
$$Q^\pi(s,a) = \mathbb{E}_\pi[\,G_t \mid S_t=s, A_t=a\,] \qquad\text{(how good is action }a\text{ in state }s)$$

Both satisfy **Bellman equations** (value now = immediate reward + discounted value next):

$$V^\pi(s) = \mathbb{E}_\pi[\,R_{t+1} + \gamma V^\pi(S_{t+1}) \mid S_t=s\,]$$
$$Q^\pi(s,a) = \mathbb{E}_\pi[\,R_{t+1} + \gamma Q^\pi(S_{t+1}, A_{t+1}) \mid S_t=s, A_t=a\,]$$

> [!NOTE]
> The **optimal** value/policy: $V^*(s)=\max_a Q^*(s,a)$ and $\pi^*(s)=\arg\max_a Q^*(s,a)$. An MDP **always has an optimal policy $\pi^*$** that is best from **every** state simultaneously (Mitchell, Ex 13.4).

## Q-Learning

A **model-free, off-policy** algorithm that learns $Q$ directly from experience, without knowing the transition/reward model:

$$\boxed{\,Q(s,a) \leftarrow Q(s,a) + \alpha\big[\,r + \gamma\max_{a'}Q(s',a') - Q(s,a)\,\big]\,}$$

The bracket is the **temporal-difference (TD) error**: the gap between the current estimate $Q(s,a)$ and the better target $r+\gamma\max_{a'}Q(s',a')$. $\alpha$ is the learning rate.

> [!INTUITION]
> **Mitchell's deterministic grid world (Ex 13.2):** with rewards 0/100 and $\gamma=0.8$, $Q$ starts at 0; each episode **backs up** value from the goal one step further along the path. After enough episodes, $Q$ converges and $\pi^*(s)=\arg\max_a Q(s,a)$ traces the shortest path. *Tic-Tac-Toe vs a random opponent (Ex 13.3)* is a non-deterministic MDP: states = board positions, rewards on win/lose/draw.

## Deep Q-Learning (DQN)

When the state space is huge (e.g. Atari pixels), a Q-**table** is infeasible. **Approximate** $Q$ with a neural network $Q(s,a;\theta)$ and minimise the TD loss:

$$L(\theta) = \Big(\,r + \gamma\max_{a'}Q(s',a';\theta^-) - Q(s,a;\theta)\,\Big)^2$$

(where $\theta^-$ are periodically-frozen target weights). DQN learns Atari **directly from pixels and score** — the breakthrough of Mnih et al. (2015).

## Exploration vs Exploitation

> [!TRAP]
> RL is trial-and-error, so the agent faces a dilemma:
> - **Exploitation** — take the **best-known** action to maximise immediate reward (safe, but may miss better options).
> - **Exploration** — try a **new** action to gather information (risky, but needed to discover better rewards).
>
> You **must trade off** the two (e.g. $\varepsilon$-greedy). *Restaurant:* exploit = favourite place; explore = try a new one. *Game:* exploit = best-believed move; explore = an experimental move.

> [!EXAM]
> Write the **return** $G_t=\sum\gamma^k R_{t+k+1}$, the **Bellman** equations, and the **Q-learning update** $Q(s,a)\leftarrow Q(s,a)+\alpha[r+\gamma\max_{a'}Q(s',a')-Q(s,a)]$. State $\pi^*(s)=\arg\max_a Q^*(s,a)$, what $\gamma$ does, that **DQN** approximates $Q$ with a neural net, and the **exploration–exploitation** trade-off. Be able to run a few Q-learning backups on a grid world with $\gamma=0.8$.

---

**Next:** the architecture behind modern AI — **Transformers**.
