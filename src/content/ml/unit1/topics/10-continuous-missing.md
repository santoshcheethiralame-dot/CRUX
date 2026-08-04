---
subject: ml
unit: 1
order: 10
slug: continuous-missing
title: Continuous, Missing & Costly Attributes
summary: Dynamic threshold attributes with the full 6-point worked gain computation, three strategies for missing values, and the two published cost-sensitive selection measures.
minutes: 16
tags: [continuous-attributes, threshold, missing-values, attribute-costs, C4.5]
---

# Continuous, Missing & Costly Attributes

Three practical extensions that turn textbook ID3 into something usable — and three near-certain short-answer questions.

---

## 1. Dealing with continuous values

**The problem.** Our initial definition of ID3 is **restricted to attributes that take on a discrete set of values**. Entropy is computed over branches, and a continuous attribute like Temperature has as many "values" as it has rows.

**The fix.** This restriction can easily be removed by **dynamically defining new discrete-valued attributes that partition the continuous attribute value into a discrete set of intervals**.

> For an attribute $A$ that is continuous-valued, the algorithm can dynamically create a **new Boolean attribute $A_c$, that is true if $A < c$ and false otherwise.** **The only question is how to select the best value for the threshold $c$.**

### How to choose the threshold

- Clearly, we would like to pick a threshold **that produces the greatest information gain**.
- **By sorting the examples according to the continuous attribute $A$, then identifying adjacent examples that differ in their target classification**, we can generate a set of **candidate thresholds midway between the corresponding values of $A$**.
- These candidate thresholds are then evaluated by **computing the information gain associated with each**, and the best is selected.
- The new boolean attribute then **competes with the other discrete-valued candidate attributes** for that node.

> [!NOTE]
> **Why only the class-change boundaries?** Fayyad (1991) proved that the value of $c$ maximising information gain **always lies at such a boundary**. So you never need to test a threshold in the middle of a run of same-labelled examples — an enormous saving, and a one-line answer worth a mark.

### Full worked example

| **TEMP** | 40 | 48 | 60 | 72 | 80 | 90 |
|---|---|---|---|---|---|---|
| **Play Sport** | no | no | **yes** | yes | yes | **no** |

The class changes twice — between 48 and 60, and between 80 and 90 — so there are **two candidate thresholds**:

$$c_1 = \frac{48+60}{2} = \mathbf{54} \qquad c_2 = \frac{80+90}{2} = \mathbf{85}$$

giving candidate attributes $\text{Temperature}_{>54}$ and $\text{Temperature}_{>85}$.

**Base entropy.** $S = [3+, 3-]$:

$$H(S) = -\tfrac36\log_2\tfrac36 - \tfrac36\log_2\tfrac36 = \mathbf{1.0}$$

**Candidate 1: $\text{Temp}_{>54}$** — Values = $\{<54,\ >54\}$

- $S_{<54} \leftarrow [0+, 2-] \Rightarrow H = \mathbf{0.0}$
- $S_{>54} \leftarrow [3+, 1-] \Rightarrow H = -\tfrac34\log_2\tfrac34 - \tfrac14\log_2\tfrac14 = \mathbf{0.8113}$

$$\text{Gain}(S,\text{Temp}_{>54}) = 1.0 - \tfrac26(0.0) - \tfrac46(0.8113) = \mathbf{0.4591}$$

**Candidate 2: $\text{Temp}_{>85}$** — Values = $\{<85,\ >85\}$

- $S_{<85} \leftarrow [3+, 2-] \Rightarrow H = -\tfrac35\log_2\tfrac35 - \tfrac25\log_2\tfrac25 = \mathbf{0.971}$
- $S_{>85} \leftarrow [0+, 1-] \Rightarrow H = \mathbf{0.0}$

$$\text{Gain}(S,\text{Temp}_{>85}) = 1.0 - \tfrac56(0.971) - \tfrac16(0.0) = \mathbf{0.1908}$$

**Verdict:** $0.4591 > 0.1908$ → **choose 54 as the threshold.** ✅

> [!EXAM]
> This exact computation is a favourite 6-marker. The marks are for: (1) sorting; (2) identifying **only** the class-change boundaries; (3) taking midpoints; (4) computing $H$ for each side; (5) the weighted subtraction; (6) picking the max. Show the split counts as $[p+,\,n-]$ — it makes the entropies obvious.

> [!TRAP]
> Notice that the *intuitively appealing* threshold 85 loses badly. Don't eyeball it — a boundary that isolates one example gives a pure but **tiny** subset, and the $|S_v|/|S|$ weight makes it nearly worthless. Compute both.

> [!NOTE]
> Extensions: Fayyad & Irani (1993) split a continuous attribute into **multiple intervals** rather than two; Utgoff & Brodley (1991) and Murthy et al. (1994) threshold **linear combinations** of several continuous attributes (oblique trees).

---

## 2. Handling attributes with missing values

**Example:** *Blood-test results may only be available for some patients in a hospital.*

**The missing attribute value can be estimated based on other values this attribute has taken in other instances.** Three strategies, in increasing sophistication:

| # | Strategy | Detail |
|---|---|---|
| **1** | **Most common value at the node** | Assign the value that is **most common among training examples at node $n$** (the node where we are calculating $\text{Gain}(S,A)$, $A$ being the attribute whose value is unknown). |
| **2** | **Most common value *among examples of the same class*** | Assign the most common value among examples at node $n$ **that have the classification $c(x)$**. Uses the label as extra evidence, so it's usually a better guess. |
| **3** | **Fractional instances (C4.5)** | Assign a **probability to each possible value of $A$** from the observed frequencies at node $n$ — e.g. if node $n$ has 6 known examples with $A=1$ and 4 with $A=0$, then $P(A{=}1) = 0.6$, $P(A{=}0) = 0.4$. Now send a **fractional 0.6 of instance $x$ down the $A{=}1$ branch and 0.4 down the other**. These fractional examples are used in the Gain computation and can be subdivided again further down. |

**At classification time** (strategy 3), a new instance with unknown attributes is also fractioned; its label is **the most probable classification, computed by summing the weights of the instance fragments** that land in the different leaves.

> [!INTUITION]
> Strategy 1 says "assume the typical patient". Strategy 2 says "assume the typical *sick* patient, since we know this one is sick". Strategy 3 refuses to guess at all and instead sends 60% of the patient one way and 40% the other, letting the arithmetic carry the uncertainty. That's why C4.5 uses it.

> [!NOTE]
> Recall that ID3 is comparatively **robust to noise and missing data precisely because its decisions are statistical** — they use all examples at a node, so one imputed value moves a gain by very little.

---

## 3. Handling attributes with differing costs

**In some learning tasks the instance attributes may have associated costs.**

For example, in learning to classify medical diseases we might describe patients by **Temperature, BiopsyResult, Pulse, BloodTestResults**, etc. These **vary significantly in cost — both monetary cost and cost to patient comfort**. A biopsy is not a thermometer.

> In such tasks, we would prefer decision trees that **use low-cost attributes where possible, relying on high-cost attributes only when needed** to produce reliable classifications.

**ID3 can be modified to take attribute costs into account by introducing a cost term into the attribute selection measure.** The two published measures:

**Tan & Schlimmer (1990)** — developed for a robot-perception task where attributes are sonar readings and cost is the number of seconds needed to position and operate the sonar:

$$\frac{\text{Gain}^2(S,A)}{\text{Cost}(A)}$$

**Núñez (1988)** — for learning medical diagnosis rules, where attributes are symptoms and lab tests:

$$\frac{2^{\text{Gain}(S,A)} - 1}{\big(\text{Cost}(A) + 1\big)^{w}}, \qquad w \in [0,1]$$

where **$w$ determines the relative importance of cost versus information gain** ($w = 0$ ignores cost entirely; $w = 1$ weighs it fully).

> [!NOTE]
> Such cost-sensitive measures **do not guarantee finding an optimal cost-sensitive tree** — they simply **bias the search in favour of low-cost attributes**. Tan & Schlimmer demonstrated that more efficient recognition strategies were learned **without sacrificing classification accuracy**.

> [!EXAM]
> If asked to "modify ID3 for costly attributes", it is enough to (1) state the motivation with the medical example, (2) write **one** of the two formulas correctly, (3) note the caveat that optimality isn't guaranteed. Getting $\text{Gain}^2$ (squared!) right in the Tan–Schlimmer form is the detail that separates answers.

---

**Next:** stepping back from trees — the bias–variance decomposition that explains *why* overfitting and underfitting are two ends of one dial.
