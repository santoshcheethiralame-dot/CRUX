---
subject: arvr
unit: 4
order: 13
slug: output-modalities-haptics
title: Output Modalities and Haptic Interaction
summary: Displays, magic lenses, projector AR, spatial audio and haptics — including the Phantom Omni and the tactile/kinaesthetic distinction.
minutes: 12
tags: [output, magic-lens, projector-AR, spatial-audio, haptics, phantom-omni, force-feedback, multimodal]
---

# Output Modalities and Haptic Interaction

> The six output channels the course names:

| Modality | Detail |
|---|---|
| **Head-referenced displays** | UI fixed relative to gaze |
| **Torso / hand / arm-referenced UI overlays** | Toolbelts, palm displays |
| **Magic Lenses** | **Augmented browsing overlays** — navigation, tourism |
| **Projector-based AR** | Content projected onto real surfaces |
| **Spatial Audio** | **3D sound cues** |
| **Haptics** | **Force feedback** via devices like the **Phantom Omni** |

The first two are the placement frames from the interaction-design topic, seen from the output side. The remaining four are new.

---

## Magic Lenses

> **Augmented browsing overlays** — used for **navigation and tourism**.

A **magic lens** is a movable window that reveals a different view of whatever is behind it — hold a device up to a building and see its name, its history, or its interior.

> [!INTUITION]
> The idea comes from the *see-through interface* work of the early 1990s: rather than augmenting **everything**, you augment **only what is inside the lens**. That solves the clutter problem — a city street annotated with every available label is unreadable, but a lens you point at one building is not.
>
> Every handheld phone AR app is a magic lens: **the screen is a window onto the augmented world**, and you move the window rather than the world. It also explains why phone AR feels different from headset AR — the lens is small and held at arm's length, so it frames rather than immerses.

## Projector-based AR

Content projected **directly onto real surfaces**, rather than displayed in front of the eye — the **spatial projection** display model from Unit 3, used as an output channel.

| | |
|---|---|
| **Advantages** | **No device worn**; naturally **multi-user** — everyone sees the same augmentation; content appears genuinely *on* the object |
| **Limitations** | Needs a **calibrated projector**; **ambient light** washes it out; **shadows** where the user blocks the beam; only works on surfaces facing the projector |

**Projection mapping** — projecting onto a known 3D surface with geometry-aware warping — is the technique behind architectural projection shows and industrial guidance systems that paint instructions directly onto a workpiece.

## Spatial audio

> **3D sound cues.**

Sound placed at a position in space, so it appears to come from a particular direction and distance. The mechanisms — **interaural time and level differences**, pinna filtering, the cone of confusion — are the subject of the next two topics.

> [!INTUITION]
> Spatial audio is **disproportionately valuable in AR/VR** for one reason: **hearing is omnidirectional and vision is not.** A visual cue outside the field of view (which is narrow on most headsets) is simply invisible; a **sound** behind you is heard immediately and tells you where to look. It is the natural channel for **notification and guidance**, and it is why telepresence systems pair panoramic video with spatial audio.

## Haptics

> **Force feedback** via devices like the **Phantom Omni**.

### The two families

| Type | Stimulates | Conveys | Example |
|---|---|---|---|
| **Tactile (cutaneous)** | Skin receptors | **Texture, vibration, contact** | Controller rumble, ultrasonic mid-air haptics |
| **Kinaesthetic (force)** | Muscles and joints | **Weight, resistance, stiffness, shape** | **Phantom Omni**, exoskeleton gloves |

> [!NOTE]
> **The Phantom Omni** is the canonical kinaesthetic device: a small **articulated stylus arm** that both **tracks** the pen's 6DOF pose and **applies forces** back through the linkage. Push the virtual stylus into a virtual surface and the arm pushes back — you feel a wall that is not there.
>
> Note that its tracking is **mechanical** (Unit 3): joint-angle sensors on articulated linkages, giving very high precision and very low latency at the cost of tethering the user. That is exactly the trade-off haptics demands — force feedback requires something to **push against**, so a ground-referenced mechanism is unavoidable.

### Why haptics is hard

| Challenge | Why |
|---|---|
| **Update rate** | Force feedback needs **~1000 Hz** to feel like a solid surface — roughly ten times the graphics rate. Below that, hard surfaces feel spongy or buzz |
| **Grounding** | To resist your hand, the device must brace against something — the desk, a frame, or your own body |
| **Workspace** | Mechanical linkages have a limited reach |
| **Fidelity vs safety** | A device strong enough to simulate a wall is strong enough to injure |

> [!INTUITION]
> The 1000 Hz figure is the haptic counterpart of the visual **20 ms latency budget** — and it exists for a similar reason. Touch is far more temporally acute than vision: you can feel a discontinuity of a millisecond as a buzz, whereas vision integrates over tens of milliseconds. **A surface that updates at 60 Hz does not feel solid; it feels like jelly.**

### Mid-air haptics

Focused **ultrasound** creates points of pressure in mid-air, giving tactile sensation with **nothing worn or held** — the missing piece for free-hand gesture interfaces, which otherwise offer no confirmation that a pinch registered. Currently limited in force and resolution.

---

## Multimodal interaction

**Combining output channels**, exactly as input modalities combine.

> [!INTUITION]
> Multimodal output is not decoration — it is **redundancy that improves reliability**. Confirming a selection **visually, audibly and haptically** at once means the user perceives it even if one channel is missed: the visual highlight may be outside the field of view, the sound may be masked by noise, but the buzz in the hand lands.
>
> It also **spreads load across senses**. Vision in AR is already saturated — it is carrying the real world *and* the virtual content. Moving confirmation to **audio and touch** frees the eyes for the task, which is precisely why haptic and audio feedback matter more in AR than on a desktop.

> [!EXAM]
> *"Explain the output modalities in AR/VR, including haptic and multimodal interaction"* — list all six named channels; define **magic lens** (augmented browsing overlay, navigation and tourism); distinguish **tactile from kinaesthetic** haptics and name the **Phantom Omni** as a force-feedback device; give the **~1000 Hz** haptic update requirement; and close with multimodal interaction as **redundancy plus load-spreading across senses**.

---

**Next:** the physics behind the audio channel.
