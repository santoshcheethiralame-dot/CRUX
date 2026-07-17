---
subject: ml
unit: 4
order: 13
slug: transformers
title: Transformers
summary: Encoder–decoder structure, positional encoding, self-attention (Q/K/V), multi-head attention, masking, and the output softmax.
minutes: 16
tags: [transformer, self-attention, positional-encoding, multi-head, masking]
---

# Transformers

The Transformer (Vaswani et al., *Attention Is All You Need*, 2017) replaced recurrence (RNNs) with **self-attention**, letting models capture **long-range dependencies efficiently** and process all positions **in parallel**. It is the foundation of modern LLMs (GPT, BERT).

## Architecture

An **encoder–decoder** stack — Vaswani used **6 encoders + 6 decoders** (identical structure, **not** weight-shared).

- **Encoder** = (1) **Self-Attention** sublayer (look at other words while encoding each word) → (2) a position-wise **Feed-Forward NN** (same FFN applied independently at each position).
- **Decoder** = both of those, **plus** an **encoder–decoder attention** layer between them (focuses on relevant parts of the *input* sequence).

## Positional encoding

Transformers process words **in parallel**, so — unlike RNNs — they have **no inherent sense of word order**. The fix: add a **positional encoding** vector to each word embedding.

> [!NOTE]
> For position $k$, embedding dimension $d$, with scalar $n=10{,}000$ and index $i$ ($0\le i< d/2$):
> $$PE_{(k,2i)} = \sin\!\Big(\frac{k}{n^{2i/d}}\Big), \qquad PE_{(k,2i+1)} = \cos\!\Big(\frac{k}{n^{2i/d}}\Big)$$
> The PE has the **same dimension as the word embedding**, so they are **summed** — each input row now carries **meaning + position**, with smooth, learnable distances between positions.

## Self-attention

> [!INTUITION]
> In *"The animal didn't cross the street because **it** was too tired,"* self-attention lets the model link **"it" → "animal."** It looks at **all** words at once (vs an RNN's sequential hidden state) to build context-rich representations.

**Step 1 — Q, K, V.** From each input embedding create three vectors by multiplying by trained matrices: **Query** $q=xW^Q$, **Key** $k=xW^K$, **Value** $v=xW^V$.

**Step 2 — scores.** Score how much a word attends to each other word = **dot product of its query with each key**.

**Step 3 — the attention formula** (matrix form: pack embeddings into $X$, compute $Q=XW^Q,\ K=XW^K,\ V=XW^V$):

$$\boxed{\,\text{Attention}(Q,K,V) = \text{softmax}\!\Big(\frac{QK^T}{\sqrt{d_k}}\Big)V\,}$$

Divide by $\sqrt{d_k}$ (scale for stable gradients), softmax → weights summing to 1, then weight the **values** $V$.

## Multi-head attention

> [!INTUITION]
> Instead of one attention, use **multiple "heads"**, each with its **own** learned $W^Q,W^K,W^V$ projecting into smaller dimensions. Each head can focus on a **different relationship** (syntax, coreference, …). Heads run **in parallel**; their outputs are **concatenated** and linearly projected.

## Masked attention & output

> [!TRAP]
> The decoder is **autoregressive** (generates one token at a time), so it must **not peek at future words**. A **look-ahead mask** adds **$-\infty$** to future positions in the score matrix (after scaling, before softmax) → those get **zero** probability. So each position attends only to **itself and earlier** tokens (predicting "am" sees "I", not "fine").

**Final layer:** a **Linear** layer maps the decoder output to a **logits** vector of vocabulary size (e.g. 10,000); **Softmax** → probabilities; the **highest-probability word** is the output for that step.

> [!EXAM]
> Reproduce the **attention formula** $\text{softmax}(QK^T/\sqrt{d_k})V$ and explain **Q/K/V**. Know **why positional encoding** is needed (parallel processing loses order), what **multi-head** adds (different relationships in parallel), and why the decoder uses **masking** (autoregressive — no looking ahead). One-liner: Transformers replaced **recurrence with self-attention**.

---

**Next:** scaling Transformers into language models — **GPT Evolution**.
