---
subject: ml
unit: 4
order: 14
slug: gpt
title: GPT Evolution
summary: The GPT timeline (GPT-1 → GPT-5), the scaling story, and the key architectural milestones (pretraining, RLHF, multimodality).
minutes: 9
tags: [GPT, scaling, RLHF, multimodal, pretraining]
---

# GPT Evolution

**GPT** (Generative Pre-trained Transformer) is a **decoder-only** Transformer trained by **next-token prediction** on huge text corpora. Its story is largely one of **scaling** — more parameters + data → qualitatively new capabilities.

## Timeline

| Year | Model | Core advance |
|---|---|---|
| 2018 | **GPT-1** | Transformer for **generative pre-training**: unsupervised pretrain + supervised fine-tune. |
| 2019 | **GPT-2** | Scale-up → **zero-shot & few-shot** abilities emerge. |
| 2020 | **GPT-3** | Massive scaling → **few-shot reasoning, no fine-tuning** needed. |
| 2022 | **GPT-3.5** | **Instruction-tuning + RLHF** → human-aligned dialogue (**ChatGPT**). |
| 2023 | **GPT-4** | **Multimodal** (text + image); better reliability & factual grounding. |
| 2024 | **GPT-4o** | Unified multimodal (text + image + audio); real-time. |
| 2025 | **GPT-5** | Toward **agentic AI** — memory, temporal reasoning, multimodal across contexts. |

## The scaling story (architecture)

| Model | Params (approx.) | Training data | Key advancement |
|---|---|---|---|
| GPT-1 | 117M | BooksCorpus | Proof of concept: unsupervised pretrain + supervised fine-tune |
| GPT-2 | 1.5B | WebText (~8M docs) | Strong zero/few-shot; no fine-tuning needed |
| GPT-3 | 175B | ~570 GB corpus | Few-shot generalisation; task-agnostic NLP |
| GPT-3.5 | ~175B + tuning | curated + RLHF | Coherence, safety, conversation (ChatGPT) |
| GPT-4 | ~1–2T (Mixture-of-Experts) | text + images | Multimodal input; stronger reasoning |
| GPT-4o | optimised | text + image + audio | Real-time multimodal; faster inference |

> [!NOTE]
> **Two milestones beyond raw scale:**
> 1. **RLHF (Reinforcement Learning from Human Feedback)** — fine-tune the model on human preference rankings (an RL signal — ties back to Unit-4 RL). This turned a raw text predictor into an **aligned, instruction-following** assistant (GPT-3.5 / ChatGPT).
> 2. **Multimodality** — from GPT-4 onward, models accept **images/audio**, not just text.

> [!INTUITION]
> **Emergence:** capabilities like few-shot reasoning weren't explicitly programmed — they **appeared as side effects of scale**. GPT-2 hinted at few-shot, GPT-3 made it reliable without any fine-tuning. Bigger model + more data → qualitatively new behaviour.

> [!EXAM]
> Match each model to its **headline advance**: GPT-1 = generative pretraining; GPT-2 = zero/few-shot emerges; GPT-3 = few-shot at scale (no fine-tuning); GPT-3.5 = **instruction-tuning + RLHF** (ChatGPT); GPT-4 = **multimodal**. Know that GPT is a **decoder-only Transformer** trained by **next-token prediction**.

---

**Next:** the broader category — **Large Language Models**.
