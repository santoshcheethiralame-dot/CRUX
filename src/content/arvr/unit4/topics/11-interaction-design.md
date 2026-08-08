---
subject: arvr
unit: 4
order: 11
slug: interaction-design
title: Interaction Design in AR/VR
summary: The five design considerations including gorilla arm, and the three reference frames for placing an AR interface.
minutes: 11
tags: [interaction, ergonomics, gorilla-arm, multimodality, occlusion, latency, head-referenced, torso-referenced]
---

# Interaction Design in AR/VR

> **Interaction mechanisms connect user inputs to system responses**, ensuring **immersive and usable experiences**.

## The five design considerations

| Consideration | What it means |
|---|---|
| **Ergonomics** | Avoid fatigue — notably **"gorilla arm"** |
| **Input multimodality** | **Gestures, voice, gaze, touch** — more than one channel |
| **Output diversity** | **Visual, auditory, haptic** |
| **Occlusion and physical–virtual coherence handling** | Virtual and real must behave consistently toward each other |
| **Latency reduction** | The response must feel immediate |

### Gorilla arm

> [!INTUITION]
> **"Gorilla arm"** is the fatigue that sets in when a user must hold their arm **unsupported in mid-air** to interact. It is why touchscreen-in-the-air interfaces feel magical for thirty seconds and exhausting after two minutes — the deltoid is not built for sustained static load.
>
> The consequences for design are concrete: keep interaction **below shoulder height**, allow **short gestures rather than sustained poses**, support **resting the arm** (hand-referenced interfaces on the palm, or controllers held low), and prefer **gaze or voice** for anything frequent. It is the single most-cited ergonomic failure in AR interface design, and it is a favourite exam term.

### Occlusion and physical–virtual coherence

For the illusion to hold, the two worlds must respect each other:

- A real hand passing in front of a virtual object must **hide** it — which needs the depth data from **3D scanning**.
- A virtual ball must **bounce off** a real table, not through it.
- Shadows and lighting should be **mutually consistent**.

> [!NOTE]
> Recall from Unit 3 that **optical see-through displays cannot occlude at all** — they add light and cannot subtract it. On an OST headset, physical–virtual coherence is fundamentally limited, which is a large part of why **video see-through** has gained ground commercially.

### Latency

The same **~20 ms** budget from Unit 3, now applied to interaction rather than head tracking. Delay between a gesture and its effect breaks the sense of **agency** — the feeling that *you* caused the outcome — which is as important to presence as visual fidelity.

---

## AR interaction placement — the three reference frames

> **AR interaction placement:**
> - **Head-referenced display** — UI fixed relative to the user's gaze
> - **Torso-referenced** — virtual toolbelts
> - **Hand/arm-referenced** — palm displays or gesture UIs

```
   HEAD-REFERENCED          TORSO-REFERENCED         HAND-REFERENCED
   moves with your gaze     moves with your body     moves with your hand
   ┌─────────────┐              ╭───╮                     ╭───╮
   │  ▣ status   │              │ ☺ │                     │ ☺ │
   │      ☺      │           ▣──┤   ├──▣                  │   │
   └─────────────┘   tool belt  ╰───╯                     ╰─┬─╯
   always visible;              turn to reach it;          ▣ on the palm
   occludes the world           doesn't block the view     both hands busy
```

| Frame | Content stays fixed relative to | Good for | Problem |
|---|---|---|---|
| **Head-referenced** | The **user's gaze** | Persistent status, always available | **Occludes the world**; uncomfortable if dense; cannot be looked away from |
| **Torso-referenced** | The **user's body** | **Virtual toolbelts** — reach down to grab a tool | Requires body tracking; needs a deliberate turn or look to access |
| **Hand/arm-referenced** | The **user's hand or arm** | **Palm displays**, wrist menus, gesture UIs | Occupies a hand; contributes to gorilla arm |
| **World-referenced** | The **environment** *(Unit 3)* | Content that belongs to a real place | Needs full 6DOF registration; may be out of view |

> [!INTUITION]
> This is the **world-fixed vs user-fixed** distinction from Unit 3, refined. All three placements here are **user-fixed** — they differ only in *which part* of the user they are pinned to, and that choice trades **availability against intrusiveness**.
>
> **Head-referenced is always there** and therefore always in the way. **Torso-referenced is out of the way** and therefore requires effort to reach. Hand-referenced sits between the two, at the cost of a hand. Good AR interfaces mix all four: critical alerts head-referenced, tools torso-referenced, controls hand-referenced, and content world-referenced.

> [!TRAP]
> **Head-referenced ≠ head-tracked.** *Head-referenced* means the content moves **with** the head so it stays in the same place in your view. *World-referenced* content also uses head tracking, but to keep the content **still in the world** while your view moves. The tracking is the same; what differs is the frame the content is attached to.

> [!EXAM]
> A likely 5–6 marker: *"What are the design considerations for interaction in AR/VR?"* — give all five (**ergonomics/gorilla arm, input multimodality, output diversity, occlusion and physical–virtual coherence, latency reduction**), then the **three placement frames** with what each suits and its drawback. Defining **gorilla arm** precisely and giving one mitigation is what marks out a real answer.

---

**Next:** the input channels themselves.
