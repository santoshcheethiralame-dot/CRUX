---
subject: ml
unit: 4
order: 9
slug: cnn
title: Convolutional Neural Networks (CNN)
summary: Why convolution, the CNN layers, filters & the convolution operation, stride/padding, output-size & parameter formulas, and pooling.
minutes: 18
tags: [CNN, convolution, filter, stride, padding, pooling]
---

# Convolutional Neural Networks (CNN)

CNNs are the deep network for **images**. A CNN chains two feature-extracting operations — **convolution** and **pooling** — then feeds the result to **fully-connected (FC)** layers (an MLP) for classification.

## Why convolution (not fully-connected)?

> [!TRAP]
> A "dense" (fully-connected) layer connects **every** input to every neuron. For a 224×224×3 image that's **150,528 input features**, needing **over a million weights in the first layer alone** — and it ignores spatial structure. A CNN is **sparse**: each neuron connects only to a **local patch** of pixels, and the same filter weights are **shared** across the image (**weight sharing**). Far fewer parameters, and translation-aware.

## Layers in a CNN

| Layer | Role |
|---|---|
| **Input** | the image (e.g. 28×28 → reshaped 784×1; with $m$ examples → $(784, m)$) |
| **Convolution (+ ReLU)** | apply filters → feature extraction |
| **Pooling** | down-sample feature maps |
| **Fully-Connected (FC)** | combine features → classify |
| **Softmax/Logistic** | logistic = binary, softmax = multi-class |
| **Output** | the label (one-hot encoded) |

## Filters / Kernels

A **kernel (filter)** is a small matrix (3×3, 5×5) that captures a pattern (edge, corner, texture). As it slides over the image it **multiplies and sums** overlapping pixels → one output value → a **feature map**. A CNN learns **many** filters (each a different feature), producing a stack of feature maps = a **volume**.

## The convolution operation

```
1. Slide the filter over all positions of the input tensor.
2. At each position, multiply each filter weight by the
   overlapping input cell (the "receptive field").
3. Sum the products (+ a bias) → one output cell.
4. Repeat for every position → the feature map.
```

**Numeric example** (filter sliding, with bias 2): e.g. $1\cdot2 - 1\cdot2 - 1\cdot3 + 0\cdot1 + 2 = -1$, then $\dots = 2,\ 0,\ 1$ at successive positions.

**Over volume (RGB):** for a colour image the filter is a **cube** (e.g. 3×3×3 = **27 values**); the 27 filter values multiply the 27 overlapping channel pixels → a single value; sliding yields a **2-D output**. **The filter's #channels must equal the input's #channels.**

**Edge detection:** convolving with specific filters (vertical/horizontal edge kernels, e.g. Sobel/Prewitt) highlights edges — an example of what a single learned filter can do.

## Stride & Padding

- **Stride $s$** — how many cells the filter moves each step. Larger stride → smaller output (more down-sampling).
- **Padding $p$** — add a border (usually **zeros**) around the input. Without it, border pixels barely influence the next layer and the image **shrinks every convolution**. Padding lets you (1) keep size, (2) build **deep** networks without H/W vanishing.
  - **Valid** convolution = no padding (output shrinks). **Same** convolution = pad so output = input size.

## Output size & parameter formulas

> [!NOTE]
> For an $n\times n$ input, $f\times f$ filter, padding $p$, stride $s$:
> $$O = \left\lfloor\frac{n - f + 2p}{s}\right\rfloor + 1$$
> (output height = width). For an input of $c$ channels and $k$ filters, the **number of parameters** is
> $$\text{params} = f\cdot f\cdot c\cdot k \quad(+\ k \text{ biases}).$$

## Pooling

**Pooling** applies an operation over regions of a feature map, taking one representative value per region — it **down-samples** (smaller maps, some translation invariance, fewer parameters):

- **Max-pool** — the **maximum** of each region (most common).
- **Average-pool** — the **mean** of each region.

> [!INTUITION]
> Convolution **finds** features; pooling **summarises** them, shrinking the map so deeper layers see a larger effective receptive field. Pooling has **no learnable parameters** — it's a fixed down-sampling.

## Popular CNN architectures

| Architecture | Contribution |
|---|---|
| **LeNet** (1995) | early small-image success |
| **AlexNet** (2012) | first large CNN to beat classical CV on ImageNet |
| **VGG** (2014) | deep, repeating 3×3 conv blocks |
| **GoogLeNet** (2015) | **Inception** modules (multi-branch) |
| **ResNet** (2016) | **residual connections** → fight vanishing gradients (Unit 2) |
| **DenseNet** (2017) | every layer connected to every other (feature reuse) |

> [!EXAM]
> Highest-yield: the **output-size formula** $O=\frac{n-f+2p}{s}+1$ and the **parameter count** $f\cdot f\cdot c\cdot k$. Know the layer order (Conv+ReLU → Pool → FC → Softmax), **why convolution** (sparse, weight-sharing vs millions of dense weights), **max vs average pooling**, and that **valid = no pad, same = preserve size**.

---

**Next:** the formulas in action — **CNN Examples (AlexNet & LeNet)**.
