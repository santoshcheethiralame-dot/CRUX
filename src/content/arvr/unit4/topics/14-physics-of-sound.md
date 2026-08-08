---
subject: arvr
unit: 4
order: 14
slug: physics-of-sound
title: The Physics of Sound
summary: Longitudinal waves, the speed of sound, the three frequency ranges, and the four wave behaviours that shape virtual acoustics.
minutes: 11
tags: [sound, longitudinal-waves, frequency, infrasound, ultrasound, reflection, diffraction, reverberation]
---

# The Physics of Sound

> **Sound enhances immersion, spatial awareness and realism in AR/VR.**

## Longitudinal waves

> **Longitudinal waves** — propagate via **air molecule compression**.

Sound is a **pressure wave**: molecules oscillate **back and forth along the direction of travel**, creating alternating compressions and rarefactions. This is unlike light, which is **transverse** (oscillating perpendicular to travel).

```
   compression   rarefaction   compression
   ▓▓▓▓░░░░▓▓▓▓░░░░▓▓▓▓░░░░▓▓▓▓  ──▶ direction of travel
   ↔    ↔    ↔    ↔    ↔          molecules oscillate ALONG the wave
```

> [!TRAP]
> A course MCQ asks how sound is produced and how the perceptual experience arises. The correct answer: **sound is produced by the displacement of molecules in a medium, causing pressure variations; the perceptual experience arises from the displacement of the eardrum, converted into sound pressure levels in decibels.**
>
> The distractors invoke electromagnetic waves, particles in a vacuum, or light waves — all wrong. **Sound requires a medium**; it cannot travel through a vacuum, precisely because it *is* the motion of the medium.

## Speed

> **343.2 m/s at 20 °C.**

Speed depends on the medium and, in air, on temperature — roughly $331 + 0.6T$ m/s for temperature $T$ in °C.

> [!NOTE]
> This number has direct engineering consequences, both of which you have already met:
> - **Ultrasonic tracking** (Unit 3) is slow because a 3 m round trip takes ~9 ms — most of a 20 ms latency budget — **before any computation**.
> - **Interaural time difference** works because the ~22 cm between your ears corresponds to a maximum delay of about **640 µs**, which your auditory system can resolve. Sound is slow enough for the delay to be measurable — light is not, which is why we have no equivalent visual mechanism.

## The three frequency ranges

| Range | Frequency | Notes |
|---|---|---|
| **Infrasound** | **< 20 Hz** | Below hearing; felt rather than heard — earthquakes, large machinery |
| **Audible** | **20 Hz – 20 kHz** | Human hearing; the upper limit falls with age |
| **Ultrasound** | **> 20 kHz** | Above hearing — medical imaging, **mid-air haptics**, ultrasonic tracking |

> [!NOTE]
> Both ends matter in AR/VR. **Infrasound and low frequencies** are what a subwoofer or haptic vest delivers as *felt* rumble, contributing strongly to presence. **Ultrasound** is what mid-air haptic devices focus into pressure points, and what early ultrasonic trackers used — chosen precisely **because it is inaudible**.

## The four wave behaviours

> **Reflection · Transmission · Refraction · Diffraction**

| Behaviour | What happens | In a virtual environment |
|---|---|---|
| **Reflection** | The wave **bounces** off a surface | **Echoes and reverberation** — the primary cue for room size and material |
| **Transmission** | The wave **passes through** a barrier, attenuated | Hearing a voice **through a wall**, muffled |
| **Refraction** | The wave **bends** when the medium's properties change | Bending through temperature gradients; minor indoors |
| **Diffraction** | The wave **bends around** obstacles and through openings | **Hearing around a corner** — why sound is not blocked like light |

> [!INTUITION]
> **Diffraction is the one that makes audio behave unlike graphics**, and it is worth being able to explain. Audible wavelengths run from about **1.7 cm (20 kHz) to 17 m (20 Hz)** — comparable to the size of doors, furniture and people. A wave diffracts strongly around objects **comparable to or smaller than its wavelength**, so **low frequencies bend around obstacles while high frequencies are blocked**.
>
> That is why a distant bass line is audible through a wall while the vocals are not — and why a voice from around a corner sounds **muffled** rather than **silent**. Light, with a wavelength of ~500 nm, never diffracts around anything at human scale, which is why occlusion in graphics is a hard yes/no and occlusion in audio is a **frequency-dependent filter**.

## Why this matters for VR audio

Simulating these behaviours is what makes a virtual space **sound** like a space:

| Effect | Produced by | Perceptual result |
|---|---|---|
| **Direct sound** | Straight-line path | Direction and distance |
| **Early reflections** | First bounces off nearby surfaces | **Room size and shape** |
| **Late reverberation** | Dense accumulation of later reflections | **Material and volume** — tiled bathroom vs carpeted room |
| **Occlusion / obstruction** | Transmission and diffraction | Low-pass filtering when something is in the way |

> [!NOTE]
> Just as graphics uses **ray tracing**, audio engines use **ray or beam tracing** through the scene geometry to compute reflection paths — which is another reason **3D scanning** matters: without a mesh of the real room, an AR system cannot make virtual sounds reverberate correctly in it. Convincing AR audio needs the same scene model as convincing AR occlusion.

> [!EXAM]
> *"Explain the physics of sound as relevant to AR/VR"* — cover: **longitudinal pressure waves** requiring a medium; **343.2 m/s at 20 °C**; the **three frequency ranges** with their boundaries; and the **four wave behaviours** with an AR/VR consequence for each. The strongest single point to add: **diffraction is frequency-dependent, so audio occlusion is a filter rather than a binary block** — unlike visual occlusion.

---

**Next:** how the ear turns these waves into a sense of direction.
