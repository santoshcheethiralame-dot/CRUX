---
subject: ml
unit: 1
order: 9
slug: continuous-missing
title: Continuous, Missing & Costly Attributes
summary: Thresholding continuous attributes by information gain, plus handling missing values and costs.
minutes: 9
tags: [continuous-attributes, thresholding, missing-values, cost]
---

# Continuous, Missing & Costly Attributes

ID3 as defined only handles **discrete** attributes. Three practical extensions make it usable on real data.

## 1. Continuous-valued attributes

Idea: **dynamically create a Boolean attribute** $A_c$ that is true when $A < c$ (or $A > c$) for some threshold $c$, then treat it like any discrete attribute. The question is **how to choose $c$** — and the answer is: the threshold that **maximises information gain**.

**Procedure:**

1. **Sort** the examples by the continuous attribute.
2. Find adjacent pairs where the **target class changes**.
3. A **candidate threshold** is the **midpoint** between each such pair.
4. Compute information gain for each candidate; pick the best.

### Worked example — Temperature

| Temp | 40 | 48 | 60 | 72 | 80 | 90 |
|---|---|---|---|---|---|---|
| Play | No | No | Yes | Yes | Yes | No |

The class changes between **48→60** (No→Yes) and **80→90** (Yes→No). Candidate thresholds:

$$c_1 = \tfrac{48+60}{2} = 54, \qquad c_2 = \tfrac{80+90}{2} = 85$$

Total set: 3 Yes, 3 No → $H(S) = 1.0$.

**Gain for `Temp > 54`** — splits into $\{\le 54\}=[0+,2-]$ and $\{>54\}=[3+,1-]$:

- $H(\le 54) = 0$, $H(>54) = H(\tfrac34,\tfrac14) = 0.811$
- $\text{Gain} = 1.0 - \big[\tfrac{2}{6}(0) + \tfrac{4}{6}(0.811)\big] = 1.0 - 0.541 = \mathbf{0.459}$

**Gain for `Temp > 85`** — splits into $\{\le 85\}=[3+,2-]$ and $\{>85\}=[0+,1-]$:

- $H(\le 85) = H(\tfrac35,\tfrac25)=0.971$, $H(>85) = 0$
- $\text{Gain} = 1.0 - \big[\tfrac{5}{6}(0.971) + \tfrac{1}{6}(0)\big] = 1.0 - 0.809 = 0.191$

**Compare:** $0.459 > 0.191$ → choose threshold **$c = 54$** (`Temp > 54`).

> [!EXAM]
> Only test thresholds at **class-boundary midpoints** — never every value. Sort, find label changes, take midpoints, pick the max-gain threshold. This is a common 5–6 mark question.

## 2. Missing attribute values

Sometimes an instance lacks a value for the attribute being tested (e.g. a blood test only run on some patients). We **estimate** it from the values the attribute takes elsewhere:

- **Strategy 1:** assign the **most common value** of that attribute among the training examples at that node.
- **Strategy 2:** assign the most common value among examples **of the same class** $c(x)$ at that node.
- **Strategy 3 (fractional):** split the instance into fractional pieces, one per value, weighted by the value's observed frequency (C4.5's approach).

## 3. Attributes with differing costs

Some attributes are **expensive** to measure (money, time, patient discomfort — e.g. *BiopsyResult* vs *Temperature*). We prefer trees that rely on **cheap** attributes and use costly ones only when necessary for reliable classification.

ID3 is modified by folding cost into the selection measure, e.g. choosing the attribute that maximises

$$\frac{\text{Gain}(S,A)^2}{\text{Cost}(A)} \qquad\text{or}\qquad \frac{2^{\text{Gain}(S,A)} - 1}{(\text{Cost}(A)+1)^w}$$

so a high-cost attribute must deliver *proportionally* more gain to be chosen.

> [!NOTE]
> All three extensions keep ID3's core loop intact — they only change how an attribute is *prepared* (thresholding), *imputed* (missing values), or *scored* (cost-sensitive gain).

---

**Next:** the deeper reason models overfit or underfit — the **bias–variance** decomposition.
