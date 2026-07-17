---
subject: ml
unit: 4
order: 10
slug: cnn-examples
title: CNN Examples — AlexNet & LeNet-5
summary: Working the dimension and parameter calculations through AlexNet and LeNet-5 layer by layer.
minutes: 12
tags: [AlexNet, LeNet, dimension-calculation, parameters]
---

# CNN Examples — AlexNet & LeNet-5

The exam loves **dimension calculations** — tracing the output size and parameters through a real CNN using $O=\frac{n-f+2p}{s}+1$ and depth = #filters.

## AlexNet (Krizhevsky et al., 2012)

Input **227 × 227 × 3**. Trace each layer:

| Layer | Filter / Stride / Pad / K | Output |
|---|---|---|
| **Conv1** | 11×11, S=4, K=96 | $\frac{227-11}{4}+1=55$ → **55 × 55 × 96** |
| **MaxPool1** | 3×3, S=2 | $\frac{55-3}{2}+1=27$ → **27 × 27 × 96** |
| **Conv2** | 5×5, P=2, S=1, K=256 | **27 × 27 × 256** |
| **MaxPool2** | 3×3, S=2 | $\frac{27-3}{2}+1=13$ → **13 × 13 × 256** |
| **Conv3** | 3×3, same, K=384 | **13 × 13 × 384** |
| **Conv4** | 3×3, same, K=384 | **13 × 13 × 384** |
| **Conv5** | 3×3, same, K=256 | **13 × 13 × 256** |
| **MaxPool3** | 3×3, S=2 | $\frac{13-3}{2}+1=6$ → **6 × 6 × 256** |
| **Flatten** | — | 9216 × 1 |
| **FC1 → FC2 → FC3** | — | 4096 → 4096 → **1000** |
| **Softmax** | — | 1000 classes |

> [!INTUITION]
> Watch the pattern: as you go **deeper, height & width shrink** (227→55→27→13→6) while **depth (#channels) grows** (3→96→256→384). CNNs trade spatial resolution for richer, more abstract feature channels.

**Parameter example — Conv1:** $f\cdot f\cdot c\cdot k = 11\times11\times3\times96 = 34{,}848$ weights ($+96$ biases). (The FC layers dominate the total parameter count — e.g. FC1 alone is $9216\times4096 \approx 37.7$M.)

## LeNet-5 (LeCun et al.)

The classic digit recogniser. Input **32 × 32 × 1** (grayscale digit):

| Layer | Op | Output |
|---|---|---|
| **C1** | conv 6@5×5 | 28 × 28 × 6 |
| **S2** | avg-pool 2×2 | 14 × 14 × 6 |
| **C3** | conv 16@5×5 | 10 × 10 × 16 |
| **S4** | avg-pool 2×2 | 5 × 5 × 16 |
| **C5** | conv/FC 120 | 1 × 1 × 120 |
| **F6** | FC | 84 |
| **Output** | softmax/RBF | 10 classes |

> [!NOTE]
> LeNet uses **average** pooling and `tanh`/sigmoid activations (its era); AlexNet popularised **max** pooling, **ReLU**, dropout, and GPU training — the jump that made deep CNNs win ImageNet.

> [!EXAM]
> Practise the trace: for each conv/pool, apply $O=\frac{n-f+2p}{s}+1$, set depth = #filters (conv) or carry it through (pool). A "same" conv keeps H×W; pooling shrinks it. Be able to compute a layer's **parameters** $= f\cdot f\cdot c\cdot k$. AlexNet input is **227×227×3**, LeNet **32×32×1**.

---

**Next:** learning by interacting with an environment — **Reinforcement Learning**.
