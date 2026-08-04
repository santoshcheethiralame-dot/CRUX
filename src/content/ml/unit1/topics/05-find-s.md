---
subject: ml
unit: 1
order: 5
slug: find-s
title: The Find-S Algorithm
summary: The maximally-specific hypothesis search — pseudocode, the EnjoySport trace, two practice traces, and the four limitations with a concrete counter-example.
minutes: 20
tags: [find-s, concept-learning, maximally-specific, hypothesis, limitations, candidate-elimination]
---

# The Find-S Algorithm

## What it is

**Find-S is the first machine learning algorithm** — the basic concept-learning algorithm.

- It finds the **most specific hypothesis that fits all the positive examples**.
- It considers **only the positive** training examples.
- It moves **from the most specific hypothesis toward the most general** hypothesis.
- It starts at the most specific hypothesis and **generalises it each time it fails to classify an observed positive example correctly**.

> [!INTUITION]
> Find-S is a nervous witness. It starts by claiming *"nothing at all is a positive example"* (⟨Ø,Ø,…,Ø⟩). Every time it is shown a positive example it is forced to admit *"…fine, that one too"*, and it concedes **the smallest amount of generality it can get away with** — replacing the offending constraint with `?`. It never volunteers anything, and it flatly ignores negative examples.

## The algorithm

```
1. Initialise h to the most specific hypothesis in H:   h ← ⟨Ø, Ø, …, Ø⟩

2. For each POSITIVE training instance x:
       For each attribute constraint a_i in h:
            If the constraint a_i is satisfied by x
                 then do nothing
            else
                 replace a_i in h by the next more general constraint
                 that is satisfied by x          (i.e. value → ?, or Ø → the value)

3. Output hypothesis h
```

As a flow: *Initialise h → take a positive example → for each attribute, "attribute value equals hypothesis value?" → **Yes**: leave it; **No**: replace with `?` → next attribute → next positive example.*

> [!NOTE]
> Formally, Find-S climbs the **general-to-specific partial order** on $H$. We say $h_j \ge_g h_k$ ("$h_j$ is more-general-than-or-equal-to $h_k$") iff every instance satisfying $h_k$ also satisfies $h_j$. At each step Find-S moves to the **minimally more general** hypothesis that covers the new positive example.

---

## Worked example — EnjoySport (Mogli's favourite sport)

Target concept: find the day when **Mogli** enjoys his favourite sport. Attributes: Sky, Temperature, Humidity, Wind, Water, Forecast.

| # | sky | temp | humidity | wind | water | forecast | **enjoy** |
|---|---|---|---|---|---|---|---|
| 1 | sunny | warm | normal | strong | warm | same | **yes** |
| 2 | sunny | warm | high | strong | warm | same | **yes** |
| 3 | rainy | cold | high | strong | warm | change | **no** |
| 4 | sunny | warm | high | strong | cool | same | **yes** |

### Step 0 — initialise

$$h = \langle \varnothing, \varnothing, \varnothing, \varnothing, \varnothing, \varnothing \rangle$$

(*Assume everything is negative until proven otherwise.*)

### Step 1 — first positive example (row 1)

Every `Ø` must generalise to the observed value:

$$h = \langle \text{sunny},\ \text{warm},\ \text{normal},\ \text{strong},\ \text{warm},\ \text{same} \rangle$$

### Step 2 — second positive example (row 2)

```
h = { sunny, warm, normal, strong, warm, same }
x = { sunny, warm, high  , strong, warm, same }
──────────────────────────────────────────────
h = { sunny, warm,   ?   , strong, warm, same }
```

Only *humidity* disagreed → it becomes `?`.

### Step 3 — row 3 is NEGATIVE → **skip it entirely**

### Step 4 — third positive example (row 4)

```
h = { sunny, warm,  ? , strong, warm, same }
x = { sunny, warm, high, strong, cool, same }
──────────────────────────────────────────────
h = { sunny, warm,  ? , strong,  ?  , same }
```

*Humidity* is already `?` (a `?` is satisfied by anything, so nothing to do); *water* now disagrees → `?`.

### Final hypothesis

$$C = \langle \text{sunny},\ \text{warm},\ ?,\ \text{strong},\ ?,\ \text{same} \rangle$$

### Using it

New day $x = \{$sunny, warm, high, strong, warm, same$\}$ → matches every constraint → $c(x) = \mathbf{1}$ (he will play).

> [!EXAM]
> Show the hypothesis **after every example**, and explicitly write *"negative example — ignored"* for the negatives. Markers give step marks for the trace, not just the final answer. Always start from ⟨Ø,…,Ø⟩, never from ⟨?,…,?⟩.

---

## Points to ponder (straight from the deck)

**1. Find-S ignores negative examples — is the answer still consistent with them?**

Find-S assumes by default that all instances are negative unless its present knowledge shows them positive, so it needs to examine **only** the positive instances. Check the final $C$ against row 3 (rainy, cold, high, strong, warm, change): *sky* is rainy ≠ sunny → rejected → predicted **no** → **correct**. ✔

**In general the output of Find-S will be consistent with the negative examples too, provided:**
1. the **correct target concept is in $H$** (i.e. it really is a conjunction of attribute values), **and**
2. there are **no errors in the training examples**.

**2. Why prefer $C$ over the more general $C_2 = \langle$sunny, ?, ?, strong, ?, same$\rangle$?**

$C_2$ is also consistent with this data. Find-S has no *evidence* for dropping *warm*, so it doesn't — the preference for the **most specific** consistent hypothesis is a design choice, and it is exactly what "S" in Find-S stands for. (Mitchell lists "why prefer the most specific hypothesis?" as one of the algorithm's genuinely unanswered questions.)

**3. Could we run it backwards?**

Yes: start at $C_2 = \langle ?,?,?,?,?,? \rangle$ and progressively **specialise** using only the **negative** examples. Combining both directions — a specific boundary $S$ pushed up by positives and a general boundary $G$ pushed down by negatives — gives the **Candidate Elimination algorithm**, which maintains the entire version space.

> [!NOTE]
> **Candidate Elimination is explicitly NOT IN THE SYLLABUS** — the slides say so in capitals. Know that it exists, know that it is the two-boundary generalisation of Find-S, and know that its inductive bias is *"the target concept c is contained in H"*. Don't spend exam time on the algorithm itself.

---

## Limitations of Find-S

1. **It can output a hypothesis that misclassifies a negative example.** It finds the most specific hypothesis consistent with the *positive* examples; if the target concept is not conjunctive, the final hypothesis **may give a positive output for a negative example**.
2. **It cannot tell you it has converged.** The output is consistent with the training examples — but it is just **one of many hypotheses** that fit the data equally well. Find-S has no way to say "I'm done" or to quantify its remaining uncertainty (that's what the version space is for).
3. **Inconsistent / noisy training sets mislead it**, because it ignores negative examples entirely and therefore has no mechanism to *detect* a contradiction.
4. **No backtracking.** There is no technique to reconsider earlier generalisation choices, so if several maximally specific hypotheses exist it cannot explore the alternatives.

### The counter-example that proves limitation 1

*3 attributes: $a_1$ has 3 values (Low/Medium/High), $a_2$ and $a_3$ are binary.*

| $a_1$ | $a_2$ | $a_3$ | value |
|---|---|---|---|
| Low | 1 | 0 | **YES** |
| Low | 0 | 0 | **YES** |
| Medium | 1 | 0 | **NO** |
| High | 1 | 1 | **YES** |

Trace:

| Step | Hypothesis | Why |
|---|---|---|
| init | $\langle \varnothing,\varnothing,\varnothing\rangle$ | |
| after (Low, 1, 0) + | $\langle \text{LOW},\ 1,\ 0\rangle$ | first positive |
| after (Low, 0, 0) + | $\langle \text{LOW},\ ?,\ 0\rangle$ | $a_2$ disagrees |
| *(Medium, 1, 0) −* | *skipped* | negative |
| after (High, 1, 1) + | $\langle\ ?,\ ?,\ ?\ \rangle$ | $a_1$ and $a_3$ both disagree |

**Final $h = \langle ?, ?, ? \rangle$ — it accepts everything, including the negative row (Medium, 1, 0).** The learned concept is useless *and* wrong, and Find-S never noticed.

> [!TRAP]
> Notice **why** it broke: the true concept here is genuinely **disjunctive** ("Low, or High-with-$a_3$=1"), and a conjunction cannot express it. The failure is the **restriction bias** biting, exactly as predicted in the previous topic — not a bug in the algorithm.

---

## Practice problem 1 — remote work

| Experience | Location | Tech Stack | Team Size | **Remote** |
|---|---|---|---|---|
| Junior | City | Frontend | Small | **No** |
| Senior | Suburb | Fullstack | Medium | **Yes** |
| Senior | City | Fullstack | Large | **Yes** |
| Mid | Suburb | Backend | Small | **No** |
| Senior | Rural | Fullstack | Medium | **Yes** |

*(1) concepts, (2) hypotheses, (3) trace Find-S in order.*

1. Instance space $= 3\times3\times3\times3 = 81$; the concept is boolean-valued → **$2^{81}$ concepts**
2. Semantically distinct hypotheses $= (4\times4\times4\times4)+1 = \mathbf{257}$
3. Trace:

| Example | Hypothesis after |
|---|---|
| init | $\langle\varnothing,\varnothing,\varnothing,\varnothing\rangle$ |
| $X_1$ | **Negative — ignore** |
| $X_2$ | ⟨Senior, Suburb, Fullstack, Medium⟩ |
| $X_3$ | ⟨Senior, **?**, Fullstack, **?**⟩ |
| $X_4$ | **Negative — ignore** |
| $X_5$ | ⟨Senior, ?, Fullstack, ?⟩ *(no change — already covered)* |

**Final maximally specific hypothesis: $h = \langle$ Senior, ?, Fullstack, ? $\rangle$**

## Practice problem 2 — subscription

| Age Group | Device Used | Trial Used | Engagement Level | **Buys Subscription** |
|---|---|---|---|---|
| Teen | Mobile | No | Low | **No** |
| Adult | Laptop | Yes | High | **Yes** |
| Senior | Laptop | Yes | Medium | **Yes** |
| Adult | Tablet | No | Low | **No** |
| Teen | Laptop | Yes | High | **Yes** |

Positives are rows 2, 3, 5. Start ⟨Ø,Ø,Ø,Ø⟩ → ⟨Adult, Laptop, Yes, High⟩ → ⟨**?**, Laptop, Yes, **?**⟩ → unchanged by row 5.

**Final hypothesis: $h = \langle\ ?,\ \text{Laptop},\ \text{Yes},\ ?\ \rangle$** — *"anyone on a laptop who used the trial buys."*

> [!EXAM]
> Watch the row order: Find-S is **order-sensitive in its trace** (though not in its final answer, for clean conjunctive data). If asked to "write the hypothesis after observing each example in the specified order", the intermediate lines carry the marks.

---

## From concept learning to decision making

The slides close this deck with a genuine question: *we've learned several concepts — can any of them be seen as "making a decision"? Is there a difference between concept learning and decision making?*

The answer sets up the next topic. Find-S can only express a **single conjunction**. A **decision tree** can express a **disjunction of conjunctions** — one conjunction per root-to-leaf path — which is strictly more expressive, and which is why the disjunctive counter-example above stops being a problem.

---

**Next:** decision trees — a hypothesis language that can finally say "or".
