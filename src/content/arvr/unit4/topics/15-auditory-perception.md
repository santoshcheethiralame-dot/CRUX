---
subject: arvr
unit: 4
order: 15
slug: auditory-perception
title: Auditory Perception and Psychoacoustics
summary: Monaural and binaural localisation cues, the cone of confusion, and the four psychoacoustic laws — Stevens' power law, JND, pitch discrimination and the precedence effect.
minutes: 13
tags: [auditory-perception, ITD, ILD, cone-of-confusion, psychoacoustics, stevens-law, JND, precedence-effect, HRTF]
---

# Auditory Perception and Psychoacoustics

## Localisation cues

> How the auditory system works out **where** a sound came from.

### Monaural cues — from one ear

> **Pinna effects · amplitude cues · spectrum attenuation**

| Cue | Mechanism |
|---|---|
| **Pinna effects** | The outer ear's folds **filter the sound differently depending on the direction** it arrives from, notching particular frequencies |
| **Amplitude cues** | Louder generally means **nearer** |
| **Spectrum attenuation** | Air absorbs **high frequencies** more than low over distance, so distant sounds are **duller** |

> [!INTUITION]
> The **pinna** is the cue that resolves *up versus down* and *front versus back* — directions where both ears receive identical signals, so binaural cues are useless. Its asymmetric folds impose a **direction-dependent frequency notch**, and your brain has learned *your* particular ears' signature over a lifetime.
>
> This is why **generic spatial audio often localises poorly**: the **HRTF** (head-related transfer function) used to synthesise it belongs to someone else's ears. Personalised HRTFs are a live research area for exactly this reason.

### Binaural cues — from comparing two ears

| Cue | Mechanism | Effective range |
|---|---|---|
| **Interaural Time Difference (ITD)** | Sound reaches the **nearer ear first** | **Low frequencies** (below ~1.5 kHz) |
| **Interaural Level Difference (ILD)** | The head **shadows** the far ear, so it hears the sound **quieter** | **High frequencies** (above ~1.5 kHz) |

> [!DERIVE]
> **Why each works in a different frequency band** — the duplex theory, and a favourite exam point.
>
> - **ITD** compares **phase**. Above ~1.5 kHz the wavelength (~22 cm) becomes shorter than the distance between the ears, so the phase difference wraps around and becomes **ambiguous** — the brain cannot tell a delay of one cycle from two.
> - **ILD** relies on the head **casting an acoustic shadow**. That requires the wavelength to be **smaller than the head**; long low-frequency waves simply **diffract around it** (the previous topic) and arrive at both ears at nearly equal level.
>
> **So low frequencies are localised by timing and high frequencies by loudness** — and together they cover the whole audible range. The maximum ITD is about **640 µs**, from the ~22 cm path difference at 343 m/s.

### The cone of confusion

> A **hyperboloid of ambiguous sound-source locations**, resolved via **head movements**.

For any given ITD and ILD there is a **whole surface of positions** producing identical cues — a cone extending from each ear. A sound directly in front and the same sound directly behind produce the **same** binaural cues.

```
        ●  front            Both positions give
       ╱                    IDENTICAL ITD and ILD
      ◉  ← ear              → the brain cannot
       ╲                      distinguish them
        ●  back              from binaural cues alone
```

**How it is resolved:**
1. **Head movements** — rotate slightly and the cues change **differently** for front and back, disambiguating instantly.
2. **Pinna filtering** — the monaural spectral notch differs front from back.

> [!INTUITION]
> This is a strong argument for **head-tracked spatial audio** in VR. Static headphone audio leaves the cone of confusion unresolved, so users routinely mistake front for back. Once the audio is **head-tracked**, a natural small head movement resolves it **exactly as it does in the real world** — and localisation accuracy improves dramatically for free. It is the auditory equivalent of motion parallax.

---

## Psychoacoustics

> The four principles the course names.

### Stevens' Power Law

> **Perceived loudness scales non-linearly.**

$$\psi = k\,\phi^{\,a}$$

Perceived magnitude $\psi$ is a **power function** of physical intensity $\phi$. For loudness the exponent $a \approx 0.67$, so **doubling perceived loudness requires roughly ten times the acoustic power**.

> [!NOTE]
> This is why sound is measured in **decibels**, a logarithmic scale — it compresses an enormous physical range into one that tracks perception. Practically: an audio mixer that maps a **linear** slider to **linear** gain feels wrong, because half the slider travel produces nearly all the perceived change. Volume controls are logarithmic for this reason.

### JND — Just Noticeable Difference

> **The smallest perceivable change in a stimulus.**

By **Weber's law**, the JND is roughly a **constant fraction** of the stimulus, not a constant amount:

$$\frac{\Delta I}{I} \approx \text{constant}$$

> [!INTUITION]
> A 1 dB change is noticeable whether the sound is quiet or loud, because it is a **ratio**, not an absolute difference. The design consequence: **there is no point rendering audio detail below the JND** — a 0.1 dB difference in a reflection is computation nobody can hear. The same reasoning as **foveated rendering** in Unit 3: find the perceptual threshold, then stop spending below it.

### Pitch discrimination

> **Detectable differences decrease as frequency rises.**

Frequency resolution is finest at low and mid frequencies and coarsens toward the top of the range — humans distinguish 200 Hz from 203 Hz far more readily than 8000 Hz from 8003 Hz.

### The precedence effect

> **Early-arriving sound dominates perception despite echoes.** *(Also called the Haas effect or the law of the first wavefront.)*

When a direct sound is followed within roughly **1–40 ms** by reflections, the auditory system localises the source **entirely from the first arrival** and fuses the later copies into it — perceived as a single sound with added spaciousness, not as echoes.

> [!INTUITION]
> The precedence effect is why you can localise a speaker in a reverberant room at all. Reflections arrive from **every wall**, each a plausible direction — without this mechanism, the source would seem to come from everywhere at once. The brain resolves it by trusting **only the first wavefront**, since that alone travelled the direct path.
>
> For VR audio this is licence to be economical: **the direct path must be accurate and low-latency, while reflections can be approximated** — they contribute *spaciousness*, not *direction*. Get the first arrival right and the rest can be cheap.

---

## Summary table

| Principle | Statement | AR/VR consequence |
|---|---|---|
| **ITD** | Nearer ear hears it first; **low frequencies** | Requires accurate sub-millisecond timing between channels |
| **ILD** | Head shadows the far ear; **high frequencies** | Requires head-shadow modelling (HRTF) |
| **Pinna / monaural** | Direction-dependent spectral filtering | Resolves up/down and front/back; needs an **HRTF**, ideally personalised |
| **Cone of confusion** | A surface of positions with identical binaural cues | Resolved by **head-tracked audio** and head movement |
| **Stevens' power law** | Loudness $\propto$ intensity$^{0.67}$ | Use **logarithmic** gain controls |
| **JND** | Smallest perceivable change, a constant **ratio** | Do not render detail below threshold |
| **Pitch discrimination** | Resolution worsens at high frequency | Spend spectral precision where it is perceptible |
| **Precedence effect** | The **first wavefront** determines direction | Direct path accurate; **reflections can be approximated** |

> [!EXAM]
> *"Explain auditory perception and its relevance to AR/VR"* — give the **monaural cues** (pinna, amplitude, spectral attenuation) and **binaural cues** (**ITD low frequency, ILD high frequency** — with the duplex-theory reason), then the **cone of confusion** and how head movement resolves it, then all **four psychoacoustic principles**. The two facts that most answers miss: **why ITD and ILD split by frequency**, and that the **precedence effect** licenses cheap reflections but demands an accurate direct path.

---

**Next:** the intelligence behind the characters that inhabit these worlds.
