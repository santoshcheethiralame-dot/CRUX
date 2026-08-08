---
subject: arvr
unit: 4
order: 12
slug: input-modalities
title: Input Modalities
summary: The seven input channels — gestures, touch, voice, gaze, rigid-body manipulation, body tracking and multimodal fusion.
minutes: 12
tags: [input, gestures, touch, voice, gaze, body-tracking, multimodal, LucidTouch, leap-motion]
---

# Input Modalities

> The seven channels the course names:

| Modality | Detail |
|---|---|
| **Gestures** | **Pinch, swipe, frame, wave** — tracked by **depth sensors** |
| **Touch** | **LucidTouch** and **back-of-device** interactions |
| **Voice commands** | **Hands-free control via NLP** |
| **Gaze tracking** | **Eye-based selection / navigation** |
| **Rigid body manipulation** | **Tracked objects** — VR controllers |
| **Body tracking** | **Skeleton tracking** via **Kinect, Leap Motion** |
| **Multimodal** | **Combining voice, gaze, gestures and touch** |

---

## 1. Gestures

Hand poses and movements recognised from depth or camera data. The four named: **pinch** (select/grab), **swipe** (navigate), **frame** (define a region with both hands), **wave** (attention or dismiss).

> [!TRAP]
> Gestures suffer three chronic problems worth naming:
> - **Gorilla arm** — sustained mid-air use is exhausting.
> - **No haptic feedback** — pinching empty air gives no confirmation that the pinch registered, so users over-gesture.
> - **The "Midas touch" problem** — the system cannot tell an intentional gesture from an incidental hand movement, so it triggers when you did not mean it. **Pinch is popular precisely because it is unambiguous** — hands rarely pinch by accident.

## 2. Touch

Direct contact input. **LucidTouch** is the named research example: a **see-through** mobile device sensing touch on its **back**, so the fingers do not obscure the screen — the *"back-of-device"* idea.

> [!NOTE]
> The motivation is the **fat finger problem**: on a small screen, the finger hides the very target it is selecting. Moving input to the back keeps the display fully visible while preserving direct manipulation — and a **pseudo-transparency** effect shows the fingers' positions through the device.

## 3. Voice commands

**Hands-free control via natural language processing.**

| | |
|---|---|
| **Strengths** | Hands and eyes stay free (critical when repairing an engine); **large command vocabulary** without menus; naturally suits *naming* things |
| **Weaknesses** | **Noisy environments**; social awkwardness in public; **latency** of recognition; ambiguity and accent sensitivity; poor for **continuous** control ("move it a bit left… a bit more…") |

## 4. Gaze tracking

**Eye-based selection and navigation** — where you look is where you point.

> [!INTUITION]
> Gaze is the **fastest pointing modality available**, because the eye reaches a target before the hand starts moving — you look at something before you reach for it. It is also **effortless**, since you were going to look anyway.
>
> But gaze alone suffers the **Midas touch problem** acutely: **you cannot look at something without selecting it**. The standard fix is **gaze-and-commit** — gaze to *point*, and a separate channel (pinch, click, dwell timer, voice) to *confirm*. This is precisely why HoloLens pairs gaze with an air-tap and why gaze is almost never used alone.

> [!NOTE]
> Gaze tracking is also what makes **foveated rendering** possible (Unit 3) — the same eye-tracking hardware serves both interaction and rendering efficiency.

## 5. Rigid body manipulation

**Tracked physical objects** — the VR controller being the standard case, tracked at 6DOF and held in the hand.

> [!INTUITION]
> Controllers persist despite hand tracking existing because they solve exactly what gestures cannot: they provide **buttons** (unambiguous discrete input, no Midas touch), **haptic feedback** (you feel the click), **a physical object to grip** (proprioception tells you where your hand is without looking), and **support** — a hand holding a controller naturally rests lower, reducing gorilla arm.
>
> This is *rigid body* manipulation in the Unit 3 sense: a tracked rigid body whose **6DOF pose** is the input signal.

## 6. Body tracking

**Skeleton tracking** — recovering the pose of the user's whole body or hands.

| System | Approach |
|---|---|
| **Kinect** | **Depth camera** + machine learning to fit a skeleton to the depth image |
| **Leap Motion** | Close-range **stereo IR** cameras specialised for **hand and finger** tracking |

> [!NOTE]
> This is Unit 3's **tracking attached bodies** as an input modality — a kinematic chain of joints, with the same benefits (fewer parameters, physically plausible poses, robustness to occlusion) and the same **inverse kinematics** problem when only a few points are tracked.

## 7. Multimodal

**Combining voice, gaze, gestures and touch.**

> [!INTUITION]
> The canonical demonstration is **"Put that there"** (Bolt, 1980): the user says *"put"*, **points** at an object, says *"that"*, **points** at a location, says *"there"*. Neither channel is sufficient — speech cannot say *which* object without a name, and pointing cannot express the *action*. Together they are natural and fast.
>
> The general principle: **use each modality for what it is good at.** Speech is good at **verbs and names**; gaze and gesture are good at **deixis** — *this*, *that*, *there*. Combining them lets you drop the awkward parts of each.

> [!NOTE]
> Multimodal input is also **more robust**: if the voice recogniser is uncertain and the gaze is unambiguous, the combination still resolves. This is **sensor fusion** applied to intent rather than to pose — the same principle as Unit 3, one level up the stack.

---

## Choosing a modality

| If you need | Use | Because |
|---|---|---|
| Fast pointing | **Gaze** | Faster than the hand; effortless |
| Unambiguous confirmation | **Controller button** or **pinch** | No Midas touch; haptic feedback |
| Hands-free operation | **Voice** | The hands are busy with the real task |
| Precise manipulation | **Controller / rigid body** | 6DOF, buttons, proprioception |
| Natural, device-free | **Gestures / hand tracking** | Nothing to hold |
| Whole-body input | **Body tracking** | Skeleton, posture, locomotion |
| Robustness and speed | **Multimodal** | Channels cover each other's failures |

> [!EXAM]
> *"Explain the input modalities in AR/VR"* — list all seven with the course's own details (**pinch/swipe/frame/wave**, **LucidTouch**, **NLP**, **eye-based selection**, **VR controllers**, **Kinect/Leap Motion**, **multimodal combination**). To lift the answer, add **one weakness per modality** and name the two recurring failures: **gorilla arm** and the **Midas touch problem**.

---

**Next:** the channels the system uses to reply.
