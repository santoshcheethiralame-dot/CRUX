---
subject: arvr
unit: 3
order: 9
slug: software-workflow
title: The Software Workflow — VWG, Rendering Engine and Input
summary: The three software modules of an AR/VR system, stereoscopic rendering, the 60–120 fps requirement, and the closed loop they form.
minutes: 12
tags: [software, virtual-world-generator, rendering-engine, stereoscopic, input-processing, unity, unreal]
---

# The Software Workflow

> The software stack in AR/VR systems **orchestrates the creation, management and rendering of virtual environments** while handling user input and system feedback.

Three modules. Together they form the **closed loop** from the VR introduction — and knowing which module does what is a reliable exam question.

```
        ┌────────────────────────────────────────────────┐
        │                                                │
        ▼                                                │
  ┌───────────┐      ┌──────────────┐      ┌────────────────────┐
  │ VIRTUAL   │─────▶│  RENDERING   │─────▶│ the user sees it   │
  │ WORLD     │      │  ENGINE      │      └────────────────────┘
  │ GENERATOR │      └──────────────┘                │
  │ (state,   │                                      │ user acts
  │  physics) │◀─────┌──────────────┐◀───────────────┘
  └───────────┘      │    INPUT     │
                     │  PROCESSING  │
                     └──────────────┘
```

---

## 1. Virtual World Generator (VWG)

> The **core application layer** that:
> - **Manages the state and behaviour of virtual objects.**
> - **Simulates environmental physics** — e.g. gravity, collisions, material interactions.
> - **Coordinates interactions** between the virtual environment and tracked user actions.
>
> **Example:** in a VR training simulator, the VWG manages **object positions, character behaviour and real-time scenario progression** based on user input.

> [!INTUITION]
> The VWG is **the authority on what is true** in the virtual world. It does not draw anything and it does not read sensors — it owns the *state*. This is exactly the separation you built in Unit 2 when the **physics engine owned position and orientation** while Three.js owned appearance: step, copy, render. The VWG is the "step".

## 2. Rendering engine

> Responsible for **converting 3D models and scenes into 2D images** displayed on the user's HMD or device screen. This involves:
>
> - **Stereoscopic rendering** — generating **separate images for each eye** to produce a sense of depth and spatial immersion.
> - **Real-time lighting and shading** — applying dynamic lighting models to improve visual realism.
> - **Optimized frame rendering** — **minimizing latency and maintaining consistent frame rates (usually 60–120 fps)** to **prevent motion sickness**.
>
> **Example:** game engines like **Unity 3D** and **Unreal Engine 5** are widely used as rendering engines in AR/VR due to their robust **physics, graphics and plugin ecosystems**.

> [!NOTE]
> **Stereoscopic rendering** is the whole Unit 2 pipeline, run **twice per frame** — two view matrices offset by the user's **inter-pupillary distance (IPD)**, two viewports, two projection matrices. This is why the polygon budget in VR is roughly **half** what the same GPU would allow on a monitor, and why the "polygons per second" metric from Unit 2 matters so much more here.

> [!TRAP]
> **Consistent** frame rate matters more than *high* frame rate. A steady 72 fps is far more comfortable than a rate that oscillates between 90 and 45 — the irregularity is itself a sickness trigger. This is why VR runtimes use techniques like **reprojection** (re-warping the last frame to the newest head pose) rather than simply dropping a frame.

## 3. Input processing system

> Manages data captured from user input devices such as:
> - **Motion controllers**
> - **Hand tracking systems**
> - **Voice recognition modules**
> - **Keyboards and traditional controllers**
>
> The system **queues, prioritizes and interprets input data** to update the virtual environment in real time, ensuring a **responsive, interactive experience**.
>
> **Example:** in a VR architectural walkthrough, moving a controller might **open a virtual door**, with the system instantly updating visuals and physics to reflect the change.

> [!NOTE]
> "Queues, prioritizes and interprets" is doing real work in that sentence. Inputs arrive at **wildly different rates** — an IMU at 1000 Hz, a controller at 250 Hz, hand tracking at 30 Hz, voice recognition after a delay of hundreds of milliseconds. The input system must reconcile all of them into one coherent view of what the user is doing, at frame time.

---

## The modules and the hardware

| Software module | Talks to | Owns |
|---|---|---|
| **Virtual World Generator** | — | **State**: object positions, behaviour, physics |
| **Rendering engine** | **Display** | **Pixels**: two eye images per frame |
| **Input processing** | **Sensors and controllers** | **Intent**: what the user is doing |

> [!EXAM]
> *"What is a Virtual World Generator? Explain the details of hardware and software"* is question 6 in the course's own question bank. Structure the answer as:
> 1. **VWG definition** — the core application layer owning state, physics and interaction coordination, with the training-simulator example.
> 2. **The other two software modules** — rendering engine (stereoscopic, real-time lighting, 60–120 fps, Unity/Unreal) and input processing (controllers, hand tracking, voice; queue/prioritise/interpret).
> 3. **The hardware they run on** — displays (OST/VST/spatial), sensors (IMU, GPS, external), computing (GPU, tethered vs standalone).
> 4. **The closed loop** they form, and the **latency budget** that constrains it.
>
> A labelled loop diagram earns the presentation mark.

> [!INTUITION]
> Notice that this is the **modelling–rendering paradigm** from Unit 2, with a third module bolted on. Modeller → interface file → renderer becomes **VWG → scene state → rendering engine**; what is new in VR is the **input system closing the loop back to the VWG**. That loop is the entire difference between watching and being present.

---

**Next:** the gap-fill topic — how the eye actually behaves, and why it sets every constraint above.
