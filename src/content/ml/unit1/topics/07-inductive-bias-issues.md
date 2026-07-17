---
subject: ml
unit: 1
order: 7
slug: inductive-bias-issues
title: ID3 — Hypothesis Space, Inductive Bias & Issues
summary: ID3's search through tree-space, preference vs restriction bias, and the issues in DT learning.
minutes: 9
tags: [ID3, inductive-bias, occams-razor, search]
---

# ID3 — Hypothesis Space, Inductive Bias & Issues

## ID3's hypothesis space

The hypothesis space of ID3 is the **set of all possible decision trees**. ID3 performs a **simple-to-complex, greedy, hill-climbing search** through this space, guided by information gain, and outputs a **single** tree.

Key properties of that search:

- **Complete hypothesis space.** Because *any* finite discrete function can be written as a decision tree, the target function is **guaranteed to be expressible** in $H$ — unlike Find-S's conjunctive bias, which can miss the target.
- **Single hypothesis, no backtracking.** ID3 keeps only one current tree and never reconsiders past splits → it can settle in a **local optimum** (no guarantee of the globally smallest/optimal tree).
- **Incomplete search.** It does *not* explore all trees — it greedily commits to the highest-gain attribute at each step.
- **Statistically-based choices.** Each split uses *all* examples under that branch (gain is a statistic over many instances), which makes ID3 **robust to noise** — contrast Find-S, which reacts to one example at a time. Missing values can be filled with the average/mode at that node.

## ID3's inductive bias

> [!NOTE]
> ID3's bias is a **PREFERENCE bias** (a.k.a. *search bias*): it searches the *complete* space but **prefers** certain hypotheses. Specifically it prefers **shorter trees**, and trees that place **high-information-gain attributes near the root** — an approximate form of **Occam's Razor** ("prefer the simplest hypothesis that fits the data").

Contrast with Find-S / Candidate-Elimination, whose bias is a **RESTRICTION bias** (a.k.a. *language bias*): they search an *incomplete* space (only conjunctions), so some hypotheses can never be considered.

> [!EXAM]
> The one-line distinction worth memorising:
> - **ID3 bias** comes from its **search strategy** → *preference* bias → complete space, incomplete search.
> - **Find-S / Candidate-Elimination bias** comes from the **definition of the search space** → *restriction* bias → incomplete space, complete search.
>
> Also note a known quirk: information gain is **biased toward attributes with many values** (more values → easier to drive entropy to 0), which is why successors like C4.5 use *gain ratio*.

## Issues in decision-tree learning

A frequently asked list — know all five:

1. **Overfitting** — the tree becomes too specific to the training data (covered in depth next topic).
2. **Continuous-valued attributes** — ID3 natively handles only discrete attributes; continuous ones need thresholding.
3. **Attributes with missing values** — e.g. a blood test recorded for only some patients.
4. **Attributes with differing costs** — some tests are expensive (money, patient comfort); prefer cheap attributes.
5. **No guarantee of small runtime** — with many attributes/values the search can blow up; ID3 doesn't bound execution time.

---

**Next:** the most important of these issues — **overfitting**, and how **pruning** fixes it.
