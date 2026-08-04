---
subject: ml
unit: 1
order: 12
slug: logistic-regression
title: Logistic Regression
summary: Why linear regression fails at classification, the sigmoid hypothesis, decision boundaries (linear and non-linear), why squared error is non-convex, log-loss, gradient descent, and one-vs-all.
minutes: 24
tags: [logistic-regression, sigmoid, decision-boundary, log-loss, cross-entropy, gradient-descent, one-vs-all]
---

# Logistic Regression

## The classification problem

**Binary classification:** Email: Spam / Not-Spam. Tumour: Malignant / Benign.

$$y \in \{0, 1\},\qquad 0 = \text{"negative class"},\quad 1 = \text{"positive class"}$$

**Multi-class classification:** $y \in \{0, 1, 2, 3, \dots\}$

---

## Why not just use linear regression?

Problem: **Tumour size vs Malignancy (0 or 1)**. We *could* use linear regression, fit $h_\theta(x) = \theta^T x$, and threshold the output:

- $h_\theta(x) \ge 0.5$ → predict $y = 1$
- $h_\theta(x) < 0.5$ → predict $y = 0$

On a tidy dataset this even works. Then **add one extra point further away** — a very large malignant tumour. The fitted line rotates to accommodate it, the point where it crosses 0.5 slides right, and **tumours that were previously classified correctly are now called benign.** The linear regression model provides a **bad fit**.

Two reasons linear regression is unsuitable for classification:

1. **It is not robust** — a single distant point (which is not even an error!) moves the decision threshold.
2. **The output range is wrong.** It gives a hypothesis function that can output **much more than 1 or less than 0**, i.e. $h_\theta(x) > 1$ and $h_\theta(x) < 0$ are possible, **but $y \in \{0,1\}$**. A "probability" of 1.7 is meaningless.

> **Thus, develop an algorithm whose output/predictions are in the range 0–1, i.e. $0 \le h_\theta(x) \le 1$ → *Logistic Regression*.**

---

## Hypothesis representation

The hypothesis of a linear regression is $h_\theta(x) = \theta^T x$. In logistic regression we push that through the **sigmoid (logistic) function** to squash it into $(0,1)$:

$$h_\theta(x) = g(\theta^T x), \qquad g(z) = \frac{1}{1 + e^{-z}}$$

$$\boxed{\ h_\theta(x) = \frac{1}{1 + e^{-\theta^T x}}\ }$$

The sigmoid is an **S-shaped curve that can take any real-valued number and map it into a value between 0 and 1, but never exactly at those limits**. It passes through **0.5 at $z = 0$** and is asymptotic to 0 and 1.

> [!NOTE]
> Useful properties: $g(0) = 0.5$; $g(-z) = 1 - g(z)$; and $g'(z) = g(z)\,(1 - g(z))$ — that last identity is why the gradient comes out so clean below.

## Interpreting the output

- **The hypothesis $h_\theta(x)$ is the estimated probability that $y = 1$ on input $x$.**
- $h_\theta(x) = 0.7$ → **there is a 70% chance that the tumour is malignant**.
- Formally: $h_\theta(x) = p(y = 1 \mid x; \theta)$ — *"given $x$ and $\theta$, $h_\theta(x)$ is the probability that $y = 1$."*
- Since $y$ can only be 0 or 1: $$p(y = 1 \mid x;\theta) + p(y = 0 \mid x;\theta) = 1$$

> [!TRAP]
> Quiz from the deck: *if $h_\theta(x) = 0.2$, which are true?* → **$P(y=1\mid x;\theta) = 0.2$ AND $P(y=0\mid x;\theta) = 0.8$.** The hypothesis always reports the probability of the **positive** class; the negative one is its complement.

## Threshold ⇄ sign: the same thing

| predict $y = 1$ | predict $y = 0$ |
|---|---|
| $h_\theta(x) \ge 0.5$ | $h_\theta(x) < 0.5$ |
| $g(z) \ge 0.5$ **when $z \ge 0$** | $g(z) < 0.5$ **when $z < 0$** |
| $g(\theta^T x) \ge 0.5$ **when $\theta^T x \ge 0$** | $g(\theta^T x) < 0.5$ **when $\theta^T x < 0$** |

> [!INTUITION]
> **Thresholding the probability at 0.5 is exactly the same as thresholding the linear score $\theta^T x$ at 0.** That is why the decision boundary is always the surface $\theta^T x = 0$ — the sigmoid never changes *where* the boundary is, only how confident you are as you move away from it.

---

## Decision boundary

### Linear

Let $h_\theta(x) = g(\theta_0 + \theta_1 x_1 + \theta_2 x_2)$ with $\theta = \begin{bmatrix}-3\\1\\1\end{bmatrix}$.

- Predict $y = 1$ if $-3 + x_1 + x_2 \ge 0$, i.e. $\mathbf{x_1 + x_2 \ge 3}$
- Predict $y = 0$ if $-3 + x_1 + x_2 < 0$, i.e. $x_1 + x_2 < 3$

The **decision boundary is the line $x_1 + x_2 = 3$** — through $(3,0)$ and $(0,3)$, with $y=1$ above-right and $y=0$ below-left.

> [!NOTE]
> **The decision boundary is a property of the hypothesis and its parameters — not of the training set.** Once $\theta$ is fixed, the boundary exists over the entire plane, whether or not any data is there.

### Non-linear

To get logistic regression to fit a complex non-linear data set, **add higher-order terms**. Let

$$h_\theta(x) = g\big(\theta_0 + \theta_1 x_1 + \theta_3 x_1^2 + \theta_4 x_2^2\big),\qquad \theta^T = [-1,\,0,\,0,\,1,\,1]$$

Then predict $y = 1$ if $-1 + x_1^2 + x_2^2 \ge 0$, i.e. $\mathbf{x_1^2 + x_2^2 \ge 1}$.

**Plotting $x_1^2 + x_2^2 = 1$ gives a circle of radius 1 around the origin** — inside is $y=0$, outside is $y=1$. **Higher-order polynomial terms yield even more complex decision boundaries.**

> [!TRAP]
> Adding polynomial features is precisely the "increase model complexity" knob from the bias–variance topic. It **could increase how well we fit the training data** — and it could just as easily overfit. This is the same dial as tree depth.

---

## The cost function

**Setup.** Given:
- training set of $m$ examples $\{(x^{(1)},y^{(1)}), \dots, (x^{(m)},y^{(m)})\}$
- $n$ dimensions: the feature vector contains $(n{+}1)$ elements, $\theta^T = [\theta_0\ \theta_1\ \dots\ \theta_n]$
- $x_0 = 1$ (the bias term), $y \in \{0,1\}$
- $h_\theta(x) = 1/(1+e^{-\theta^T x})$

**How do we choose the parameters $\theta$?**

### Why the squared error fails here

Linear regression uses $J(\theta) = \frac{1}{m}\sum_{i=1}^{m}\frac12\big(h_\theta(x^{(i)}) - y^{(i)}\big)^2$, i.e. $\text{Cost}(h_\theta(x),y) = \frac12(h_\theta(x)-y)^2$.

> **In logistic regression, if we use this cost function it will be a *non-convex* function of the parameters $\theta$. This is because $h_\theta(x)$ is no longer a linear function — it is a complex non-linear function (the sigmoid).**
>
> **Lots of local minima means gradient descent may not find the global optimum.**

### The log-loss (cross-entropy) cost

$$\text{Cost}\big(h_\theta(x), y\big) = \begin{cases} -\log\big(h_\theta(x)\big) & \text{if } y = 1\\[4pt] -\log\big(1 - h_\theta(x)\big) & \text{if } y = 0 \end{cases}$$

> [!INTUITION]
> **This captures the intuition that if $h_\theta(x) = 0$ (i.e. we predict $P(y{=}1\mid x;\theta) = 0$) but actually $y = 1$, this penalises the learning algorithm with a massive cost.** Concretely: if the patient is told the tumour is not malignant **with full certainty**, but the tumour **was** malignant, the penalty is **infinite**. Confident and wrong is the worst thing a probabilistic model can be — and log-loss is the function that says so.
>
> The two curves: for $y=1$ the cost rockets to $\infty$ as $h_\theta(x) \to 0$ and falls to 0 as $h_\theta(x)\to 1$; for $y=0$ it's the mirror image.

### Simplifying to one line

The cost function needs to be simplified to apply gradient descent. Since $y$ takes only the values $\{0,1\}$, the two cases can be folded together:

$$\text{Cost}\big(h_\theta(x),y\big) = -\,y\log\big(h_\theta(x)\big) - (1-y)\log\big(1 - h_\theta(x)\big)$$

> [!DERIVE]
> Substitute to check the equivalence:
> - $y = 1$: the second term is multiplied by $(1-1)=0$ → $-\log(h_\theta(x))$ ✔
> - $y = 0$: the first term is multiplied by $0$ → $-\log(1-h_\theta(x))$ ✔
>
> One expression, both branches. This is the standard **binary cross-entropy**.

Full objective over the training set:

$$\boxed{\ J(\theta) = -\frac{1}{m}\left[\sum_{i=1}^{m} y^{(i)}\log h_\theta(x^{(i)}) + \big(1-y^{(i)}\big)\log\big(1 - h_\theta(x^{(i)})\big)\right]\ }$$

- **To fit/optimise the parameters:** minimise $J(\theta)$ with respect to $\theta$.
- **To make a prediction on a new $x$:** output $h_\theta(x) = 1/(1+e^{-\theta^T x})$ using the optimised $\theta$, then threshold it.

> [!NOTE]
> $J(\theta)$ built this way is **convex**, so gradient descent is guaranteed to reach the **global** minimum. It is also **always $\ge 0$**, because it is a sum of $-\log$ of numbers in $(0,1)$.

---

## Minimising with gradient descent

Repeatedly update each parameter using a learning rate $\alpha$:

$$\text{Repeat}\ \Big\{\ \theta_j := \theta_j - \alpha\,\frac{\partial}{\partial \theta_j}J(\theta)\ \Big\}$$

Working out the partial derivative gives

$$\boxed{\ \text{Repeat}\ \Big\{\ \theta_j := \theta_j - \alpha \sum_{i=1}^{m}\big(h_\theta(x^{(i)}) - y^{(i)}\big)\,x_j^{(i)}\ \Big\}\quad \text{(simultaneously update all } \theta_j)}$$

Notes that carry marks:

- **This equation is identical in form to the linear regression update rule — the only difference is that the definition of the hypothesis has changed** (sigmoid instead of $\theta^T x$).
- All $\theta$ values ($\theta_0$ through $\theta_n$) must be updated **simultaneously**. You *could* use a for-loop; **a vectorised implementation is better**.
- **Feature scaling helps gradient descent run faster** for logistic regression, just as for linear regression.

> [!TRAP]
> The deck's quiz makes this exact point. A correct update is
> $\theta := \theta - \alpha\frac1m\sum\big(h_\theta(x^{(i)}) - y^{(i)}\big)x^{(i)}$ — or the same thing with $h_\theta$ written out as $\frac{1}{1+e^{-\theta^Tx^{(i)}}}$. Any version using $\theta^T x$ **in place of $h_\theta(x)$** is **wrong** — that's the linear-regression hypothesis.

> [!NOTE]
> Another quiz statement worth knowing is **false**: *"for logistic regression, gradient descent sometimes converges to a local minimum."* It does not — $J(\theta)$ is convex. (Advanced optimisers like conjugate gradient, BFGS and L-BFGS are preferred for **speed** and for avoiding manual tuning of $\alpha$, not to escape local minima.)

---

## Multi-class classification: One-vs-All

Examples: email foldering (work / friends / family / hobby); medical report (not-ill / flu / cold); weather (sunny / cloudy / rain / snow). $y \in \{1,2,3,\dots\}$.

**The One-vs-All (one-vs-rest) recipe:**

1. **Train a logistic regression classifier $h_\theta^{(i)}(x)$ for each class $i$** to predict the probability that $y = i$. For classifier $i$, class $i$ is the positive class and **all other classes are lumped together as negative**.
2. On a new input $x$, **pick the class $i$ that maximises $h_\theta^{(i)}(x)$.**

With three classes you build three binary problems:

$$h_\theta^{(1)}(x) = P(y{=}1 \mid x;\theta),\quad h_\theta^{(2)}(x) = P(y{=}2 \mid x;\theta),\quad h_\theta^{(3)}(x) = P(y{=}3 \mid x;\theta)$$

$$\text{prediction} = \arg\max_i\ h_\theta^{(i)}(x)$$

> [!EXAM]
> A worked-boundary question appears often: *"$\theta_0 = 6, \theta_1 = 0, \theta_2 = -1$ — which figure is the decision boundary?"* Predict $y=1$ when $6 + 0\cdot x_1 - x_2 \ge 0$, i.e. $\mathbf{x_2 \le 6}$. So the boundary is the **horizontal line $x_2 = 6$**, with **$y=1$ below it** and $y=0$ above. Always reduce to an inequality in the features first; the picture then follows mechanically.

---

**Next:** a completely different philosophy — models that don't build a model at all.
