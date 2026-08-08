---
subject: arvr
unit: 3
order: 5
slug: vr-core-concepts
title: Core Concepts in Virtual Reality
summary: Presence, interactivity, first- versus third-person perspective, and synthetic versus captured worlds — each with its named example.
minutes: 12
tags: [presence, interactivity, first-person, synthetic-worlds, captured-worlds, birdly, photogrammetry]
---

# Core Concepts in Virtual Reality

> To create convincing and immersive VR experiences, several **fundamental concepts underpin system design and user interaction**.

Four concepts, each with a named example the course expects you to reproduce.

## 1. Presence

> **Presence** refers to the **psychological sensation of *being there*** in the virtual environment. A high sense of presence makes users **perceive the virtual world as real**, eliciting **genuine emotional and physical reactions**.
>
> **Example: the Birdly flight simulator** allows users to experience the sensation of flying over cities by simulating **wind, motion and visual feedback**, generating a strong sense of presence.

> [!INTUITION]
> Presence is a **psychological** property, not a technical one — which is why it cannot be bought with resolution alone. The test is behavioural: does the user **duck** when something flies at them? **flinch** at a virtual ledge? Those reflexes are involuntary, and they are the strongest evidence that presence has been achieved.
>
> Notice what Birdly adds: **wind and motion**. Engaging senses beyond vision buys more presence than adding pixels does, because a mismatch in *any* sense breaks the illusion — which is the same sensory-conflict principle behind motion sickness.

## 2. Interactivity

> **Interactivity** is the extent to which a VR system can **respond to a user's actions in real time**. Interactive (closed-loop) systems track inputs like **head movements, hand gestures or voice commands** and **dynamically update the virtual environment** accordingly.
>
> **Example:** in VR games like **Half-Life: Alyx**, users can **manipulate virtual objects, interact with characters and navigate the environment** in a highly responsive and immersive manner.

This is the **closed-loop** property from the previous topic, named as a design goal rather than a system category.

## 3. First-person vs third-person perspectives

> VR experiences can be delivered from a **first-person perspective**, where the user views the environment **through the eyes of their virtual avatar**, enabling **direct participation**. Alternatively, a **third-person perspective** positions the user as an **external observer** of their avatar within the virtual world.
>
> **First-person VR experiences are generally more immersive**, while **third-person VR can be advantageous for training or narrative storytelling**.

| | **First person** | **Third person** |
|---|---|---|
| Viewpoint | Through the avatar's eyes | Observing the avatar |
| Immersion | **Higher** | Lower |
| Best for | Presence, embodiment, simulation | **Training, narrative storytelling** |
| Motion sickness risk | **Higher** — visual motion is your own | Lower — you are watching, not moving |

> [!NOTE]
> The training advantage of third person is genuine and slightly counter-intuitive: to learn a **whole-body movement**, seeing your own posture from outside is more informative than seeing what you would actually see. Sports and physiotherapy applications often deliberately choose the less immersive option.

## 4. Synthetic vs captured worlds

> VR environments are either **synthetic (programmed)** or **captured (real-world scans)**.
>
> - **Synthetic worlds:** entirely computer-generated environments designed with **3D modelling and graphics software**, allowing for **limitless creativity**.
> - **Captured worlds:** **360° video or photogrammetry-based reconstructions** of real-world locations, offering **highly realistic virtual experiences**.
>
> **Example:** VR experiences like **Nimrud Palace** digitally recreate historical landmarks, enabling **virtual tourism and education**.

| | **Synthetic** | **Captured** |
|---|---|---|
| Built by | 3D modelling (Blender, Unit 2) | **360° video** or **photogrammetry** |
| Realism | Bounded by artist skill and budget | **Photorealistic by construction** |
| Freedom | **Limitless** — anything imaginable | Limited to what exists and was scanned |
| Interactivity | Full — geometry is known and editable | **Often limited**; 360° video is open-loop |
| Effort scales with | Scene complexity | Capture area |

> [!INTUITION]
> The trade-off is **realism versus agency**. A 360° video of Nimrud looks exactly like Nimrud — but you cannot pick anything up, because there is no geometry, only pixels on a sphere. A synthetic reconstruction can be walked through and interacted with, but someone had to model every stone.
>
> **Photogrammetry sits in between**: photograph a real place from many angles and reconstruct actual 3D geometry from it — real appearance *and* real geometry. It is the technique behind most modern heritage VR, and it is a close cousin of the **3D scanning** covered in Unit 4.

## The four, together

```
   PRESENCE          ─── the psychological goal      (Birdly)
        ▲
        │ supported by
        │
   INTERACTIVITY     ─── the system property         (Half-Life: Alyx)
   PERSPECTIVE       ─── the framing choice          (first vs third person)
   WORLD TYPE        ─── the content choice          (synthetic vs Nimrud)
```

> [!EXAM]
> *"Explain the core concepts of virtual reality"* is a reliable 6–8 marker. Give all four with **definition + named example**, and add the framing above: **presence is the goal; interactivity, perspective and world type are the levers you pull to achieve it.** That structure is worth more than four disconnected definitions.

---

**Next:** where VR is being used.
