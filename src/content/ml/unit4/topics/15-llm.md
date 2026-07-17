---
subject: ml
unit: 4
order: 15
slug: llm
title: Large Language Models (LLMs)
summary: What LLMs are, language modelling & autoregression, key characteristics, closed vs open, LLM vs SLM, and RAG / prompting / fine-tuning.
minutes: 12
tags: [LLM, language-model, RAG, prompt-engineering, fine-tuning]
---

# Large Language Models (LLMs)

## What is an LLM?

**Large Language Models** are neural networks (built on the **Transformer**) trained on **massive text data** to **process and generate human-like text** — for generation, summarization, translation, classification, sentiment analysis, and more. They are the engine of modern **Generative AI** (content creation across text, image, audio, video).

## Language modelling & autoregression

> [!NOTE]
> A **language model** predicts the **next token** given the previous context — producing a **probability distribution** over possible next tokens and (typically) picking the most likely. Words are split into **tokens** ("Going" → "Go"+"ing"). For *"I ate bread and ___"* it predicts "butter."
> **Autoregressive:** generate one token at a time, **feeding each prediction back** as input for the next — maintaining coherence across a passage.

## Characteristics

- **Text in, text out** (initial LLMs) — broadly applicable to NLP tasks.
- **Open-ended / variable-length** outputs depending on the prompt.
- **Knowledge embedded** in the parameters (learned from vast training text).
- **Domain-adaptable** — can be **fine-tuned** for medicine, law, education, etc.

## Closed vs Open LLMs

| Aspect | **Closed** (GPT-4, Gemini) | **Open** (LLaMA, BLOOM) |
|---|---|---|
| Accessibility | API/platform only, **no weights** | weights/code public — download, fine-tune, modify |
| Licensing | proprietary, commercial limits | open-source (Apache/MIT/GPL) |
| Transparency | undisclosed → **black box** | documented → reproducible |
| Development | centralized companies | community / collaborative |
| Fine-tuning | API-level only | **full control** |

## LLM vs SLM

| | Large LM (e.g. GPT-4) | Small LM (e.g. Vicuna-1B) |
|---|---|---|
| Parameters | billions–trillions | millions–hundreds of millions |
| Training data | massive | small corpus |
| Use case | generic | specific |
| Hardware | high-end GPUs | consumer CPU/GPU |
| Cost | high | low |

> [!INTUITION]
> Bigger isn't always better in practice: a small, **fine-tuned** model can beat a giant general one on a **narrow domain**, at a fraction of the cost and hardware. Match model size to the task.

## Working with LLMs

> [!EXAM]
> Three techniques to adapt/control LLMs (know the distinctions):
> - **RAG (Retrieval-Augmented Generation):** combine the LLM with **external knowledge** — *retrieve* relevant documents from a database, *then* generate. Overcomes the **knowledge cutoff** and improves factual accuracy. Two stages **Retrieval → Generation**. Great for QA, chatbots, enterprise search. *(Changes the **input**, not the weights.)*
> - **Prompt Engineering:** craft effective **inputs** to steer behaviour — context framing, examples, clear instructions. Techniques: **zero-shot, few-shot, chain-of-thought**. *(No training at all.)*
> - **Fine-Tuning:** further-train the model on a **smaller curated dataset** to specialise a domain/tone. Variants: **full fine-tuning, LoRA, QLoRA**. *(Changes the **weights**.)*

> [!TRAP]
> Don't confuse the three: **prompting** changes only the input (no training); **RAG** augments the input with retrieved context (no training); **fine-tuning** actually **updates the model's weights**. Use RAG for fresh/factual knowledge, fine-tuning for domain style/skills.

---

🎉 **That completes Unit 4 — and the full Machine Learning course (Units 1–4).** Consolidate with the **MCQ quiz** (incl. Alpaydin & Mitchell exercises) and **flashcards**.
