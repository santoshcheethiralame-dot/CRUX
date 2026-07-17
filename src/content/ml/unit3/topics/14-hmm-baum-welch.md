---
subject: ml
unit: 3
order: 14
slug: hmm-baum-welch
title: HMM Problem 3 — Baum-Welch (Learning)
summary: Learning λ = {π, A, B} from observations alone — the γ and ξ posteriors and the EM re-estimation equations.
minutes: 15
tags: [baum-welch, EM, gamma, xi, learning, re-estimation]
---

# HMM Problem 3 — Baum-Welch (Learning)

**Goal:** given only observation sequences (hidden states **unknown**), find the parameters $\lambda = \{\pi, A, B\}$ that best explain them. Baum-Welch is a special case of the **EM algorithm** for HMMs.

> [!INTUITION]
> Same chicken-and-egg as all EM: if we knew the hidden states we could count transitions/emissions directly; we don't, so we use the **forward ($\alpha$) and backward ($\beta$) variables** to compute *expected* (soft) counts, then re-estimate. E-step = compute $\gamma$ and $\xi$; M-step = re-estimate $A$ and $B$ from them.

## Two posterior quantities

**$\gamma_t(j)$ — state posterior:** probability of being in state $j$ at time $t$, given the whole sequence:

$$\gamma_t(j) = \frac{\alpha_t(j)\,\beta_t(j)}{P(O\mid\lambda)} = \frac{\alpha_t(j)\,\beta_t(j)}{\sum_i \alpha_t(i)\,\beta_t(i)}$$

**$\xi_t(i,j)$ — transition posterior:** probability of being in state $i$ at $t$ **and** $j$ at $t{+}1$:

$$\xi_t(i,j) = \frac{\alpha_t(i)\,a_{ij}\,b_j(o_{t+1})\,\beta_{t+1}(j)}{P(O\mid\lambda)}$$

> [!NOTE]
> Read $\xi_t(i,j)$ left to right: $\alpha_t(i)$ = reach state $i$ from the past · $a_{ij}$ = transition to $j$ · $b_j(o_{t+1})$ = emit the next observation · $\beta_{t+1}(j)$ = explain the rest of the future. Normalized by $P(O\mid\lambda)$, it's the expected use of edge $i\to j$ at time $t$.

## The re-estimation (M-step) equations

> [!DERIVE]
> Each parameter becomes *expected counts ÷ expected totals*:
> $$\hat a_{ij} = \frac{\sum_{t=1}^{T-1}\xi_t(i,j)}{\sum_{t=1}^{T-1}\gamma_t(i)} \quad\text{(expected } i\to j \text{ transitions ÷ expected times in } i\text{)}$$
> $$\hat b_j(k) = \frac{\sum_{t:\,o_t = k}\gamma_t(j)}{\sum_{t=1}^{T}\gamma_t(j)} \quad\text{(expected times in } j \text{ emitting } k \text{ ÷ expected times in } j\text{)}$$
> $$\hat\pi_i = \gamma_1(i) \quad\text{(expected times in } i \text{ at } t=1\text{)}$$

## The algorithm

```
initialize A, B (and π) randomly
while not converged:
    α ← forward(λ);  β ← backward(λ)         # uses current λ
    E-step:  compute γ_t(j) and ξ_t(i,j) for all t,i,j
    M-step:  re-estimate  â_ij,  b̂_j(k),  π̂_i   from γ and ξ
    λ ← (π̂, Â, B̂)                            # overwrite
return λ
```

## Multiple sequences

In practice we train on $K$ sequences. **Sum the expected counts (numerators and denominators) across all $K$ sequences before dividing** — a more robust estimate:

$$\hat a_{ij} = \frac{\sum_{k}\sum_{t}\xi_t^{k}(i,j)}{\sum_{k}\sum_{t}\gamma_t^{k}(i)}, \qquad \hat\pi_i = \frac{1}{K}\sum_{k}\gamma_1^{k}(i)$$

## Practical issues

> [!TRAP]
> - **Local optima:** like all EM, Baum-Welch only finds a *local* maximum — initialization matters; run several restarts.
> - **Numerical instability:** the $\alpha,\beta$ products underflow — implement in **log space** (or with scaling factors).
> - **How many hidden states?** No unique answer — choose by domain knowledge or by **comparing validation likelihood** across different $N$ (Alpaydin's exercise: watch how validation likelihood changes as $N$ grows — more states fit training better but can overfit).
> - **What do states mean?** Application-specific; the model won't label them for you.

> [!EXAM]
> The summary worth memorising — **the three HMM algorithms all share the $\alpha,\beta$ machinery**: Forward/Backward gives $P(O\mid\lambda)$; Viterbi (max instead of sum) gives $Q^*$; Baum-Welch (EM with $\gamma,\xi$) learns $\lambda$. Be able to write $\gamma$, $\xi$, and the three re-estimation formulas, and state that Baum-Welch = EM for HMMs.

---

🎉 **That completes Unit 3.** Lock it in with the **MCQ quiz** (incl. Mitchell & Alpaydin exercises) and **flashcards**.
