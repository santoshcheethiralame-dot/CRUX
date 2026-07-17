---
subject: ml
unit: 1
order: 11
slug: logistic-regression
title: Logistic Regression
summary: Sigmoid hypothesis, decision boundaries, the log-loss cost function, gradient descent, and one-vs-all.
minutes: 16
tags: [logistic-regression, sigmoid, decision-boundary, log-loss, gradient-descent]
---

# Logistic Regression

Despite the name, logistic regression is a **classification** algorithm. It is a **discriminative** model that outputs a **probability**.

## Why not linear regression for classification?

For a binary target $y \in \{0,1\}$ (0 = negative class, 1 = positive class), you *could* fit a line $h_\theta(x) = \theta^\top x$ and threshold at 0.5. Two problems:

1. The line's output can be **> 1 or < 0**, which is meaningless as a class/probability.
2. A single **outlier** drags the line and shifts the 0.5 crossing, **misclassifying** previously-correct points.

We need a hypothesis bounded in $[0,1]$: $\;0 \le h_\theta(x) \le 1$.

## The sigmoid (logistic) hypothesis

Wrap the linear score in the **sigmoid / logistic** function $g$:

$$h_\theta(x) = g(\theta^\top x), \qquad g(z) = \frac{1}{1 + e^{-z}}, \qquad \boxed{\,h_\theta(x) = \frac{1}{1 + e^{-\theta^\top x}}\,}$$

The sigmoid is an **S-curve**: $g(0)=0.5$, $g(\to+\infty)\to 1$, $g(\to-\infty)\to 0$. It squashes any real score into $(0,1)$.

### Probabilistic interpretation

$h_\theta(x)$ is the **estimated probability that $y=1$** given $x$:

$$h_\theta(x) = P(y=1 \mid x; \theta), \qquad P(y=1\mid x;\theta) + P(y=0\mid x;\theta) = 1$$

*Example:* $h_\theta(x) = 0.7$ ⇒ 70% chance the tumour is malignant (and 30% benign).

## Decision boundary

Predict $y=1$ when $h_\theta(x) \ge 0.5$. Since $g(z)\ge 0.5 \iff z \ge 0$:

$$\hat y = 1 \iff \theta^\top x \ge 0, \qquad \hat y = 0 \iff \theta^\top x < 0$$

The boundary $\theta^\top x = 0$ is set entirely by $\theta$; the data only *fixes* $\theta$.

**Linear boundary example.** $h_\theta(x) = g(\theta_0 + \theta_1 x_1 + \theta_2 x_2)$ with $\theta = [-3, 1, 1]$:
$$\hat y = 1 \iff -3 + x_1 + x_2 \ge 0 \iff x_1 + x_2 \ge 3$$
The line $x_1 + x_2 = 3$ separates the classes.

**Non-linear boundary.** Add higher-order features. With $h_\theta(x)=g(\theta_0 + \theta_1 x_1^2 + \theta_2 x_2^2)$ and $\theta=[-1,1,1]$:
$$\hat y = 1 \iff x_1^2 + x_2^2 \ge 1$$
a **circle** of radius 1 — points outside are class 1. Higher-order terms ⇒ more complex boundaries.

> [!INTUITION]
> Logistic regression is still a **linear classifier in its features**: the boundary is linear in whatever features you feed it. You get curved boundaries only by *engineering* non-linear features ($x_1^2$, $x_1 x_2$, …).

## The cost function

Linear regression's squared-error cost, applied to the sigmoid, is **non-convex** in $\theta$ (many local minima) — gradient descent could get stuck. So we use a different per-example cost:

$$\text{Cost}(h_\theta(x), y) = \begin{cases} -\log(h_\theta(x)) & \text{if } y = 1 \\ -\log(1 - h_\theta(x)) & \text{if } y = 0 \end{cases}$$

> [!INTUITION]
> If $y=1$ but the model confidently predicts $h_\theta(x)\to 0$, then $-\log(h_\theta(x)) \to \infty$ — an **enormous penalty** for being confidently wrong (e.g. telling a patient a malignant tumour is certainly benign). Confident-and-correct costs ~0.

Because $y \in \{0,1\}$, the two cases collapse into one smooth expression:

$$\text{Cost}(h_\theta(x), y) = -y\log h_\theta(x) - (1-y)\log(1 - h_\theta(x))$$

Averaging over $m$ training examples gives the **(convex) log-loss / cross-entropy** cost:

$$\boxed{\,J(\theta) = -\frac{1}{m}\sum_{i=1}^{m}\Big[\,y^{(i)}\log h_\theta(x^{(i)}) + (1-y^{(i)})\log\big(1 - h_\theta(x^{(i)})\big)\,\Big]\,}$$

This $J(\theta)$ is **convex**, so gradient descent finds the **global** minimum.

## Gradient descent

Minimise $J(\theta)$ by repeatedly stepping downhill (learning rate $\alpha$), updating all $\theta_j$ **simultaneously**:

$$\theta_j := \theta_j - \alpha\,\frac{\partial J}{\partial \theta_j} = \theta_j - \alpha \sum_{i=1}^{m}\big(h_\theta(x^{(i)}) - y^{(i)}\big)\,x_j^{(i)}$$

> [!TRAP]
> This update looks **identical** to linear regression's — *but it isn't the same algorithm*, because $h_\theta(x)$ is now the **sigmoid**, not $\theta^\top x$. Use a **vectorised** implementation and apply **feature scaling** so gradient descent converges faster.

## Multi-class: One-vs-All (One-vs-Rest)

For $K$ classes, train **$K$ separate** binary logistic classifiers. Classifier $i$ treats **class $i$ as positive** and **all others as negative**, learning $h_\theta^{(i)}(x) = P(y=i\mid x;\theta)$. To predict a new $x$, run all $K$ classifiers and pick the class with the **highest** probability:

$$\hat y = \arg\max_{i}\; h_\theta^{(i)}(x)$$

> [!EXAM]
> Likely asked: (1) why linear regression fails for classification, (2) write the sigmoid and the **log-loss** $J(\theta)$, (3) derive a decision boundary from given $\theta$ (e.g. $\theta=[-3,1,1]\Rightarrow x_1+x_2=3$), (4) explain why squared error is avoided (**non-convex**), (5) describe **one-vs-all**.

---

**Next:** a different philosophy — **lazy** learners that skip the model entirely.
