---
subject: ml
unit: 2
order: 20
slug: boosting
title: Boosting
summary: Sequential training where each model corrects its predecessors, how instance weights direct attention to misclassified points, how model quality becomes voting right, and the full comparison against bagging.
minutes: 10
tags: [boosting, sequential, instance-weights, voting-right, adaboost, bias-reduction, bagging-comparison]
---

# Boosting

## The core idea

> [!NOTE]
> **Instead of training the models in parallel (like in bagging), we can train them sequentially. This is the main idea of Boosting!**

### How boosting works

> [!NOTE]
> - It starts by **fitting an initial model** (e.g. a tree or linear regression) to the data.
> - Then a **second model is built that focuses on accurately predicting the cases where the first model performs poorly**.
> - The **combination of these models is expected to be better** than the individual models.
> - Then you **repeat this process of boosting many times**.
> - **Each successive model attempts to correct for the shortcomings of the combined boosted ensemble of all previous models.**
> - A **performance measure indicating the quality of the model is associated with every model and defines the voting right of the model.** **Better models will have better voting right.**

> [!TRAP]
> Read the fifth bullet precisely. Each new model corrects **the combined ensemble so far**, not merely the immediately preceding model. The target moves after every round, because what remains unexplained depends on everything built to date.

> [!INTUITION]
> Boosting is closer to **studying** than to voting. After each mock exam you do not start over — you look at what you got wrong and concentrate there. The next attempt is deliberately specialised toward your current weaknesses.
>
> This makes boosting inherently **sequential**: model $k+1$ cannot be built until model $k$ is finished and its errors known. That is a genuine engineering cost — **bagging parallelises across cores trivially, boosting cannot.**

---

## Weights associated with training instances

> [!NOTE]
> - **Weights are associated with each instance.**
> - The weight of an instance can be thought of as **the importance of getting that instance classified correctly.**
> - Can be used while **"resampling"** to get a **higher proportion of such instances in the training set**.
> - **Weak learners can make use of these weights (if they can) while classifying.**
> - **Weights are adjusted with each iteration, with misclassified instances getting more weight and correctly classified instances getting less weight.** This will ensure that **the next weak learner pays greater attention to classifying correctly those instances which were misclassified earlier.**
> - It is **convenient to normalize these weights — typically, they sum to 1.**

> [!EXAM]
> There are **two mechanisms** by which the weights take effect, and both are stated:
> 1. **Resampling** — draw the next training set with probability proportional to weight, so hard instances **appear more often**.
> 2. **Direct weighting** — a learner that supports weighted training uses them in its loss, so hard instances **count for more per appearance**.
>
> Which is used depends on whether the weak learner can accept weights.

> [!INTUITION]
> The weights are the **memory** of the ensemble. They are how information passes from one round to the next: nothing about model $k$ is handed to model $k+1$ except **a redistribution of attention across the training set**.
>
> Normalising to sum to 1 keeps them a **probability distribution**, which is what makes resampling well defined and stops the total weight drifting across rounds.

---

## Boosting vs bagging

```
   BAGGING — parallel, models are independent

              ┌── bootstrap sample 1 ──→ model 1 ──┐
              │                                    │
       D ─────┼── bootstrap sample 2 ──→ model 2 ──┼──→ majority vote ──→ y
              │                                    │    (equal weight)
              └── bootstrap sample 3 ──→ model 3 ──┘

       all three could be trained at the same time on three machines


   BOOSTING — sequential, each model depends on the last

       D ──→ model 1
                │  re-weight: the points model 1 got WRONG
                ▼  now matter more
              model 2
                │  re-weight again
                ▼
              model 3  ──→ weighted vote ──→ y
                            (better models get a bigger say)

       cannot be parallelised — model 2 needs model 1's mistakes first
```

> [!NOTE]
> - In the case of **Bagging**, **any element has the same probability to appear in a new dataset**.
> - However, for **Boosting**, **the observations are weighted and therefore some of them will take part in the new sets more often.**

> [!EXAM]
> | | **Bagging** | **Boosting** |
> |---|---|---|
> | Training | **Parallel**, independent | **Sequential**, each depends on the last |
> | Sampling | Every element has the **same probability** | Observations are **weighted** — some appear more often |
> | Focus of each model | The whole (resampled) dataset | The **previous ensemble's mistakes** |
> | Combining | **Equal-weight** voting / averaging | **Weighted** voting — better models get more **voting right** |
> | Primarily reduces | **Variance** | **Bias** |
> | Suits which base learner | **Unstable, high-variance** (deep trees) | **Weak, high-bias** (stumps) |
> | Overfitting risk | **Low** — averaging is stabilising | **Higher** — can eventually fit noise |
> | Parallelisable | **Yes** | **No** |
>
> Examples: bagging → **Random Forest**; boosting → **AdaBoost, Gradient Boosting, XGBoost**.

> [!TRAP]
> **Bagging reduces variance; boosting reduces bias.** This is the single most examined contrast, and it explains the base-learner rows above.
>
> Bagging averages away the sample-specific noise of models that are individually **unstable**. Boosting builds up expressive power from models that are individually **too simple**, adding capacity round by round — which is also why it can eventually **overfit** if run too long, whereas bagging essentially does not.

---

## AdaBoost — how the weights are actually set

> [!DERIVE]
> The course describes weight adjustment qualitatively; AdaBoost makes it concrete. At round $t$, with weighted error $\varepsilon_t$ (the total weight of the misclassified instances):
>
> $$\alpha_t = \frac{1}{2}\ln\!\left(\frac{1 - \varepsilon_t}{\varepsilon_t}\right)$$
>
> **This $\alpha_t$ is the "voting right"** the slides refer to. Its behaviour is exactly what you would want:
>
> | $\varepsilon_t$ | $\alpha_t$ | Interpretation |
> |---|---|---|
> | $\to 0$ (near perfect) | **large positive** | Strong say in the final vote |
> | $= 0.5$ (random guessing) | **0** | **No say at all** |
> | $> 0.5$ (worse than chance) | **negative** | Its vote is **inverted** |
>
> Instance weights are then updated by $w_i \leftarrow w_i \cdot e^{\pm\alpha_t}$ — increased for misclassified points, decreased for correct ones — and renormalised to sum to 1. The final prediction is $\text{sign}\bigl(\sum_t \alpha_t h_t(\mathbf{x})\bigr)$.

> [!INTUITION]
> The $\varepsilon_t = 0.5$ case is the elegant part. A learner that is right half the time carries **zero information**, and the formula gives it **exactly zero weight** — it is ignored automatically, with no special-casing.
>
> And a learner **worse** than chance is not discarded but **negated**: something reliably wrong is reliably informative once you flip it. This is also why boosting only needs its base learners to beat random guessing — hence the name *weak* learner, meaning "slightly better than chance."

---

**Next:** bagging plus feature randomisation, applied to trees — **random forest**.
