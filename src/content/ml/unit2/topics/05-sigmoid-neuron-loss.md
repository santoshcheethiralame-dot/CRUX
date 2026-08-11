---
subject: ml
unit: 2
order: 5
slug: sigmoid-neuron-loss
title: The Sigmoid Neuron & Loss Functions
summary: Why the perceptron's thresholding logic is too harsh, the logistic sigmoid and its probabilistic reading, the perceptron-versus-sigmoid comparison that makes gradient descent possible, and the two loss functions used in this unit.
minutes: 10
tags: [sigmoid, logistic, differentiable, loss-function, MSE, cross-entropy, probability]
---

# The Sigmoid Neuron & Loss Functions

## "Perceptron thresholding logic is harsh"

The motivating example uses a single input — deciding whether we will like a movie from $x_1 = \textit{criticsRating} \in [0,1]$, with bias $w_0 = -0.5$ and $w_1 = 1$, i.e. **threshold 0.5**.

| criticsRating | Perceptron output |
|---|---|
| 0.51 | **like** |
| 0.49 | **dislike** |

> [!NOTE]
> **"It seems harsh that we would like a movie with rating 0.51 but not one with a rating of 0.49."**

> [!INTUITION]
> The complaint is not really about fairness — it is about **the shape of the function**. A step function has a derivative of **zero everywhere except one point, where it is undefined**. So the question *"if I nudge this weight slightly, does the output improve?"* has no useful answer: almost always the answer is *"nothing changes"*, and exactly at the threshold it is *"undefined"*.
>
> Without a usable derivative there is **no gradient to descend**. Making the transition gradual is what converts learning from a geometric search into a **calculus** problem.

---

## The sigmoid neuron

> [!NOTE]
> Introducing sigmoid neurons, where the output function is **much smoother than the step function**. One form of the sigmoid function is called the **logistic function**:
>
> $$y = \frac{1}{1 + e^{-\left(w_0 + \sum_{i=1}^{n} w_i x_i\right)}}$$

- We **no longer see a sharp transition** around the threshold $-w_0$.
- The output $y$ is **no longer binary but a real value between 0 and 1, which can be interpreted as a probability**.
- Instead of a like/dislike decision, we get the **probability of liking the movie**.

Writing $z = w_0 + \sum_i w_i x_i$, the curve $\sigma(z) = 1/(1+e^{-z})$ passes through $\sigma = 0.5$ exactly at $z = 0$, i.e. at the threshold $-w_0$, and flattens toward 0 and 1 at the extremes.

> [!EXAM]
> **The derivative is the reason the sigmoid is chosen**, and it has a famously convenient form:
>
> $$\sigma'(z) = \sigma(z)\bigl(1 - \sigma(z)\bigr)$$
>
> In backpropagation notation this appears as **$O(1-O)$** — the network's own output is all you need to compute its gradient, with **no extra exponentials to evaluate**. Every $\delta$ term in the next topics carries this factor.

> [!TRAP]
> $\sigma'(z) = \sigma(z)(1-\sigma(z))$ takes its **maximum at $z = 0$, where it equals $0.25$** — and decays toward 0 in both tails. So every layer a gradient passes through multiplies it by **at most a quarter**. That innocuous fact is the entire mechanism behind the **vanishing gradient problem** met later in this unit.

---

## Perceptron vs sigmoid neuron

> [!EXAM]
> | | **Perceptron** | **Sigmoid neuron** |
> |---|---|---|
> | Output function | **Step** at $-w_0$ | **Smooth S-curve** |
> | Mathematical properties | **Not smooth, not continuous (at $w_0$), NOT differentiable** | **Smooth, continuous, differentiable** |
> | Output range | $\{0, 1\}$ — binary | $(0, 1)$ — a real value, readable as a **probability** |
> | Learning | Error-driven geometric rule | **Gradient descent** on a loss |
>
> The row that matters is **differentiability**. Everything else in this unit — gradient descent, backpropagation, deep networks — is downstream of it.

> [!INTUITION]
> The sigmoid neuron keeps the **linear unit** $\sum w_i x_i$ completely unchanged and swaps out only the **threshold** applied on top. That is why the perceptron's whole geometric story — weights as a normal vector, bias as a shifted boundary — carries over intact. We have not changed *what the neuron computes about the data*, only **how sharply it commits to an answer**.
>
> It also resolves the **fifth and last** of the MP neuron's limitations: the output is no longer categorical.

---

## The loss function

> [!NOTE]
> Also called the **objective function, cost function, or error function**.
>
> - The search for weights is driven by the objective of **minimizing the error between prediction and true value**.
> - Because the error can be **positive or negative**, most often we **take the square**.
> - Depending on the problem, a **suitable loss function can be chosen**.

### Mean squared error

$$\text{MSE} = \frac{1}{2}\sum_{i=1}^{n} (\hat{y}_i - y_i)^2$$

> [!TRAP]
> Note the **$\tfrac{1}{2}$** — it is not part of the statistical definition of MSE, it is there so that **differentiating the square cancels it**: $\frac{d}{dy}\bigl[\tfrac12 (y-t)^2\bigr] = (y-t)$. Every backpropagation derivation in this unit relies on that cancellation, which is why the same $\tfrac12$ reappears in $E_d(\vec{w}) \equiv \tfrac12 \sum_{k \in outputs}(t_k - o_k)^2$.

### Cross entropy

> [!NOTE]
> **Cross entropy measures the performance of a classification model whose output is a probability value between 0 and 1.**
>
> $$L = -\sum_{i=1}^{N} y^{(i)} \cdot \log \hat{y}^{(i)}$$

> [!INTUITION]
> Cross entropy punishes **confident wrongness** far more harshly than MSE does. If the true label is 1 and the model predicts $\hat y = 0.01$, MSE charges $(0.99)^2 \approx 0.98$, while cross entropy charges $-\log(0.01) \approx 4.6$ — and the penalty grows **without bound** as $\hat y \to 0$.
>
> That is exactly the behaviour you want from a probability: claiming something is nearly impossible when it in fact happened should be close to unforgivable.

> [!EXAM]
> **Which loss for which problem:**
> - **Regression** (real-valued target) → **MSE**
> - **Classification** (output is a probability) → **cross entropy**, paired with a **sigmoid** output for binary problems or a **softmax** output for multi-class
>
> The phrase to reproduce for cross entropy is *"measures the performance of a classification model whose output is a probability value between 0 and 1."*

---

**Next:** how a network turns inputs into predictions — **forward propagation**.
