---
subject: arvr
unit: 3
order: 4
slug: vr-introduction
title: Introduction to Virtual Reality
summary: What VR is, open-loop versus closed-loop systems, the modern VR experience, and the two named challenges — the uncanny valley and motion sickness.
minutes: 12
tags: [VR, presence, open-loop, closed-loop, uncanny-valley, motion-sickness, HMD]
---

# Introduction to Virtual Reality

## The definition

> **Virtual Reality (VR)** is a technology that creates **fully immersive, computer-generated environments** designed to **replace real-world sensory inputs**. By targeting the human senses — **primarily sight, sound, and sometimes touch** — VR induces a compelling **sense of presence**, where users feel as though they are **physically situated within a virtual space** rather than their actual surroundings.

> In contrast to AR, which **supplements** the physical environment with virtual elements, **VR fully disconnects users from the real world** and transports them into a simulated digital environment. These virtual worlds can range from **photorealistic recreations of real places** to **entirely imaginative, fantastical realms**.

| | **AR** | **VR** |
|---|---|---|
| The real world is | **Enhanced** | **Replaced** |
| User remains connected to reality? | ✅ | ❌ |
| Core technical problem | **Registration** — aligning virtual to real | **Presence** — convincing the senses |
| Display must be | See-through or passthrough | Fully occluding |
| Failure looks like | Content sliding off surfaces | Discomfort, sickness, broken immersion |

## The two system types

> **VR systems can be categorized into two main types:**
>
> **Non-interactive (Open-loop) Systems** — present **pre-recorded or passive** virtual experiences that **do not respond to user input**. The user simply views or observes the virtual environment **without influencing it**.
>
> **Interactive (Closed-loop) Systems** — **actively respond to user actions** such as head movement, hand gestures or controller inputs, **modifying the virtual environment in real time** to match the user's perspective and interactions. This responsiveness **significantly enhances the sense of immersion and engagement**.

> [!INTUITION]
> The terms come from control theory. An **open loop** has no feedback path: the system outputs regardless of what the user does — a 360° video is open loop, because turning your head changes what you *look at* but not what the system *does*. A **closed loop** feeds the user's state back into the system, which is what makes the world respond.
>
> **Closed-loop is what makes it VR rather than cinema**, and it is also what creates the latency problem — because now the system must complete the whole sense → compute → render → display cycle before the user notices the delay.

## The modern VR experience

> Modern VR relies on advanced **Head-Mounted Displays (HMDs)**, **precise motion tracking systems**, **haptic devices** and **high-fidelity 3D rendering engines** to deliver seamless and immersive virtual experiences.

Those four are exactly the hardware and software components broken down in the next topics — displays, sensors, computing platforms and the software stack.

## The two named challenges

> Notable challenges in VR development include **avoiding the uncanny valley** — where lifelike avatars evoke discomfort due to subtle imperfections — and **managing motion sickness** caused by **sensory discrepancies between visual motion and physical movement**.

### The uncanny valley

```
  affinity
     ▲
     │      ╭──╮                        ╭─── healthy human
     │     ╱    ╲                      ╱
     │    ╱      ╲                    ╱
     │   ╱        ╲                  ╱
     │  ╱          ╲                ╱
     │ ╱            ╲______________╱
     │╱                    ▲
     └──────────────────────────────────▶  human likeness
                    the uncanny valley
```

As a virtual character becomes **more** human-like, our affinity for it rises — then **collapses** just short of realism, because small imperfections in skin, eyes or motion read as *wrong* rather than *stylised*. Affinity recovers only at genuine realism.

> [!INTUITION]
> The practical lesson for a VR designer is counter-intuitive: **a stylised cartoon avatar is often more comfortable than a nearly-photoreal one**. Aiming for realism and missing lands you in the valley; deliberately staying on the left of it does not. This is why so many social VR platforms use deliberately abstract avatars.

### Motion sickness

Caused by **sensory discrepancies between visual motion and physical movement** — your eyes report movement your inner ear does not confirm (or vice versa).

| Trigger | Why it causes sickness |
|---|---|
| **Latency** | The world lags behind your head; vision and vestibular sense disagree |
| **Artificial locomotion** | You see yourself moving while sitting still |
| **Low frame rate** | Judder breaks the illusion of continuous motion |
| **Incorrect field of view / IPD** | The virtual scale conflicts with proprioception |

> [!NOTE]
> This is the **sensory conflict theory** of simulator sickness, and it explains the numbers you will meet later: **60–120 fps** rendering, and a motion-to-photon latency target of roughly **20 ms**. Those are not performance targets for their own sake — they exist because exceeding them makes people ill. The eye-movement topic explains why the threshold is so tight.

> [!EXAM]
> *"What is virtual reality? Differentiate open-loop and closed-loop VR systems."* — define VR as fully immersive, replacing real-world sensory input and inducing **presence**; contrast with AR's supplementing; then give the two system types with the feedback distinction and one example each (**360° video** vs **an interactive VR game**). Naming the two challenges (uncanny valley, motion sickness) with their causes rounds it off.

---

**Next:** the concepts that make an immersive experience actually work.
