---
subject: se
unit: 4
order: 14
slug: ethics-cases
title: Ethics — Case Studies & Algorithmic Bias
summary: Real ethical failures in software engineering (Volkswagen, Therac-25, Uber, Instagram, Twitter) and the reach of algorithmic bias.
minutes: 11
tags: [ethics, volkswagen, therac-25, algorithmic-bias, fairness]
---

# Ethics — Case Studies & Algorithmic Bias

Engineering decisions have human consequences. These cases show how "just doing my job" can cause real harm.

## Case studies

| Case | What happened | The ethical lesson |
|---|---|---|
| **Volkswagen** | Engineers wrote a **defeat device** — code that **detected emissions tests**, ran clean during them, but emitted **up to 40×** the legal pollutant limit on the road | **$30 B** in fines, **criminal charges against engineers**, premature deaths, reputation destroyed |
| **Therac-25** | A software **race condition** (8-second window) caused **≥ 6 deaths**; engineers **removed hardware locks**, were overconfident, and didn't report bugs | They *knew* about the race condition and judged it "unlikely" — **negligent or just unlucky?** |
| **Uber** | An engineer discovers a serious bug | What would *you* do — report it, quit, or fix it quietly? |
| **Instagram** | A recommendation change boosted **engagement +15%** by surfacing toxic content | Do you investigate *why* engagement rose, or just **celebrate the win**? |
| **Twitter photo-cropping** | The auto-crop algorithm was **racially biased** — trained on biased data, never tested for fairness, deployed to millions | **Intent doesn't excuse impact** |

> [!EXAM]
> The two headline cases: **Volkswagen** (a *deliberate* defeat device — engineers actively wrote deceptive code) and **Therac-25** (negligence — known race condition, removed safety interlocks, deaths). Volkswagen = dishonesty; Therac-25 = failure of due diligence.

> [!TRAP]
> *"The engineers didn't INTEND to build a racist algorithm"* (Twitter) — but they **trained on biased data, didn't test for fairness, and deployed to millions.** In software ethics, **intent does not excuse impact.** You're responsible for outcomes, not just intentions.

## Algorithmic bias

> [!NOTE]
> Algorithms increasingly make consequential decisions — they affect **where we go to school, access to money, access to healthcare, parole, bail, and risk scores.**

> [!INTUITION]
> When an algorithm influences someone's freedom (parole/bail) or livelihood (a loan), a biased model isn't a "bug" — it's a **harm at scale**. Fairness testing and diverse, representative training data are ethical *requirements*, not nice-to-haves.

---

**Next:** the frameworks for doing better — **codes of ethics & human flourishing**.
