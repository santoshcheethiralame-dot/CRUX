---
subject: arvr
unit: 3
order: 1
slug: ar-definition-scope
title: AR — Definition, Scope and the Requirements of Augmentation
summary: What AR is and is not, Azuma's three defining characteristics, the registration problem, and the reality–virtuality continuum.
minutes: 12
tags: [AR, definition, registration, azuma, reality-virtuality-continuum, requirements]
---

# AR — Definition, Scope and the Requirements of Augmentation

## The definition

> **Augmented Reality (AR)** is an **interactive technology that enhances the real-world environment by overlaying digital content** — images, animations, 3D models and contextual information — onto the user's physical surroundings.
>
> Unlike Virtual Reality, which **completely immerses users in a computer-generated environment**, AR allows users to **remain connected to the real world** while experiencing an enhanced, interactive and contextually enriched environment.

> AR **integrates virtual objects into the physical environment in real time**, creating a seamless blend between digital and physical worlds. This is achieved using a combination of **displays, sensors, tracking systems and processing software**. By recognizing physical surroundings and accurately tracking the position and orientation of the user and environment, AR applications can display digital content in a way that **appears to naturally coexist with the real world**.

Modern AR leverages **optical see-through displays, video see-through displays and sensor fusion techniques** to accurately align digital objects with real-world views. AR content can be experienced through **smartphones, tablets, head-mounted displays (HMDs) and smart glasses**.

## The three requirements of augmentation

The course's definition is Azuma's, and it is worth extracting the three conditions explicitly — an AR system must satisfy **all three**:

| # | Requirement | What it means |
|---|---|---|
| **1** | **Combines real and virtual** | Digital content is presented **together with** the real world, not instead of it |
| **2** | **Interactive in real time** | The system responds to the user **as they move**; a pre-rendered composite is not AR |
| **3** | **Registered in 3D** | Virtual objects are **aligned with the real world in three dimensions** and stay put as the viewpoint changes |

> [!EXAM]
> *"What are the requirements and characteristics of augmentation?"* — give all three, and note that **failing any one disqualifies a system**. A film with CGI combines real and virtual and is registered, but is **not interactive**. A heads-up display showing your speed is real-time and combined, but is **not registered in 3D** — it floats regardless of where you look.

## Registration — the defining hard problem

**Registration** is requirement 3, and it is what makes AR fundamentally harder than VR.

> [!INTUITION]
> In **VR** the user sees only what you draw, so if your tracking is slightly wrong, the whole world shifts together and the user rarely notices. In **AR** the user sees the real world **and** your content simultaneously — so any error in position or orientation shows up as the virtual object **visibly sliding off** the real surface it is supposed to sit on.
>
> The human visual system is extremely good at detecting this misalignment. **AR has no error budget that VR does not also have — it just has no place to hide.**

Registration error has two sources, and both matter:

| Source | Effect |
|---|---|
| **Static error** | Miscalibration — the virtual object sits at a constant offset from where it should be |
| **Dynamic error (latency)** | The world moves faster than the system can track it; content **lags behind** and swims during head motion |

This is why Units 3 and 4 are almost entirely about **tracking** — registration is a tracking problem, and everything else follows from it.

## The reality–virtuality continuum

AR and VR are not two categories but two regions of a spectrum (Milgram & Kishino, 1994):

```
  REAL              AUGMENTED           AUGMENTED            VIRTUAL
  ENVIRONMENT       REALITY             VIRTUALITY           ENVIRONMENT
  ──────────────────────────────────────────────────────────────────▶
  no virtual        mostly real,        mostly virtual,      no real
  content           some virtual        some real            content
                    │                                        │
                    └──────── MIXED REALITY (MR) ────────────┘
```

| Term | Meaning |
|---|---|
| **Augmented Reality** | The **real** world dominates; virtual content is added to it |
| **Augmented Virtuality** | The **virtual** world dominates; real elements (e.g. a video feed of your hands) are brought in |
| **Mixed Reality** | Everything strictly between the two extremes |

> [!TRAP]
> "Mixed Reality" is used loosely in marketing to mean "AR that is quite good". In the academic sense it is simply **the whole middle of the continuum**, and AR is a *part* of MR — not a sibling of it.

## Scope — what AR is not

| Not AR | Why |
|---|---|
| A CGI film | Not **interactive in real time** |
| A simple HUD or overlay | Not **registered in 3D** |
| A VR headset with passthrough video showing only virtual content | Real world is captured but not **combined** |
| A 360° photo viewer | No virtual content; no registration |

> [!NOTE]
> Note that AR does **not** require a head-mounted display, and does not require vision. AR is defined by the three requirements, not by the hardware — **audio AR** (spatially registered sound) and **haptic AR** satisfy the same definition. Unit 4's spatial audio section is AR by this definition.

---

**Next:** how the field got here.
