---
subject: arvr
unit: 3
order: 10
slug: eye-movement
title: Eye Movement and its Implications for VR
summary: The six eye movements, the fovea and acuity, and the four VR consequences — latency, low persistence, foveated rendering and vergence–accommodation conflict.
minutes: 16
tags: [eye-movement, saccade, VOR, fovea, foveated-rendering, vergence-accommodation, persistence, gap-fill]
---

# Eye Movement and its Implications for VR

> [!NOTE]
> **Source note.** The CAVE Lab booklet lists this syllabus item but contains **no explanatory content** for it — only a question-bank prompt (*"What are the different eye movements? Explain each with examples"*) and one MCQ. This topic is written from the prescribed text **Steven M. LaValle, *Virtual Reality* (Cambridge, 2016)**, Chapter 5, which covers it thoroughly. If your lecturer issues slides for this item, treat those as authoritative.

## Why the eye sets the specification

Almost every number in Unit 3 — 90 fps, 20 ms latency, low-persistence displays — is a consequence of how the eye works. This topic is the explanation for the rest of the unit.

## The retina and acuity

| Photoreceptor | Count | Where | Sensitive to |
|---|---|---|---|
| **Cones** | ~6 million | Concentrated in the **fovea** | **Colour**, fine detail, bright light |
| **Rods** | ~120 million | **Periphery** | Motion and low light; **no colour** |

The **fovea** is a tiny pit at the centre of the retina — roughly **2° of visual angle**, about the width of your thumbnail at arm's length. Within it, acuity is about **1 arc-minute** (1/60°). Outside it, acuity **falls off steeply**.

> [!INTUITION]
> **You see almost nothing sharply.** High-resolution vision covers about 2° of a roughly 200° field. The impression of a detailed world is a reconstruction — your eyes dart around several times a second and your brain assembles the results. That single fact is what makes **foveated rendering** possible, and it is the most exploitable property of human vision in VR.

---

## The six eye movements

### 1. Saccades

**Rapid, ballistic jumps** that reposition the fovea onto a new target.

- Speed up to **~900°/s**; duration **20–200 ms**.
- **Ballistic** — once launched, the trajectory cannot be corrected mid-flight.
- **Saccadic suppression (masking):** vision is largely **switched off during the jump**, which is why you never perceive the blur.

*Example:* reading this line — your eyes are making 3–4 saccades per second, not sweeping smoothly.

### 2. Smooth pursuit

**Smoothly tracks a moving target** to keep its image on the fovea.

- Works up to roughly **30°/s**; beyond that it breaks down into catch-up saccades.
- **Cannot be performed voluntarily without a target** — you cannot smoothly sweep your eyes across a blank wall, only jump.

*Example:* following a bird across the sky, or a controller as you move it.

### 3. Vestibulo-Ocular Reflex (VOR)

The eyes **counter-rotate to compensate for head movement**, holding the gaze fixed on a target.

- Driven by the **vestibular system** (the inner ear), not by vision.
- **Extremely fast — latency around 10 ms**, faster than any visually-driven response.

*Example:* fix your gaze on a word on this screen and shake your head. The word stays readable — your eyes are counter-rotating precisely.

> [!TRAP]
> **The VOR is the single most important eye movement for VR**, and it is what a course MCQ is asking about when it says *"which eye movement is essential for maintaining a stable visual field and is particularly relevant in the design of VR hardware to prevent motion sickness?"* — the answer is the **Vestibulo-Ocular Reflex**.
>
> Here is why. Your VOR is **calibrated to the real world**, where the world is perfectly stable and the compensation is exact. In a headset, if the display lags behind your head by even 20 ms, your eyes counter-rotate correctly but the **image has not yet updated** — so the world **slips across your retina**. Your brain receives a vestibular signal and a visual signal that disagree, which is precisely the **sensory conflict** that causes sickness.

### 4. Optokinetic Reflex (OKR)

Tracks a **large moving visual field**, stabilising the image when the *scene* moves rather than the head.

- Produces **optokinetic nystagmus**: slow pursuit in the direction of motion, then a fast saccade back.

*Example:* looking out of a moving train — your eyes drift with the scenery, then flick back.

> [!NOTE]
> OKR is directly implicated in **vection** — the illusion of self-motion caused by a large moving visual field. Vection is what makes artificial locomotion in VR feel like movement, **and** what makes it nauseating: your eyes and visual system insist you are moving while your vestibular system reports that you are sitting still.

### 5. Vergence

The eyes rotate **inward (convergence) or outward (divergence)** so that both foveas land on the same object at a given depth.

- The **only** movement in which the eyes rotate in **opposite directions** — all the others are conjugate (both eyes move together).
- Provides a **depth cue** at close range.

### 6. Microsaccades

**Tiny involuntary movements** (well under 1°) occurring continuously even during fixation.

- **Prevent perceptual fading:** a perfectly stabilised retinal image **fades from perception within seconds**, because the receptors adapt. Microsaccades keep refreshing the stimulus.

---

## The four implications for VR

### Implication 1 — latency must beat the VOR

Because the VOR responds in ~10 ms and expects a perfectly stable world, **motion-to-photon latency must be under roughly 20 ms**. This single requirement drives:

- high **sensor sample rates** (IMUs at 500–1000 Hz),
- **90 fps or more** rendering,
- **pose prediction** — rendering for where the head *will* be, not where it was,
- **late-stage reprojection** — re-warping the finished frame to the newest pose just before scan-out.

### Implication 2 — displays must be low-persistence

If a display holds each frame lit for the whole frame period (**sample-and-hold**), then while your eye smoothly pursues a moving object, the **static image smears across the retina** — perceived as motion blur or **judder**.

**The fix: low persistence.** Illuminate each frame for only **1–2 ms** and keep the panel dark the rest of the time. The image is a brief flash at the correct position, so the eye integrates a sharp picture.

> [!INTUITION]
> This is counter-intuitive — the fix for blur is to show the image *less*. But the blur is caused by the **eye moving while the image stays still**; shortening the exposure gives the eye no time to smear it. It is the same reason a fast camera shutter freezes motion.

### Implication 3 — foveated rendering

Since acuity collapses outside the central ~2°, rendering the periphery at full resolution is **wasted work**. With **eye tracking**, render:

- **full resolution** in a small region around the gaze point,
- **progressively lower resolution** further out.

Savings of **50–70%** in shading cost are achievable with no perceptible loss — provided the eye tracker is fast enough to keep the high-resolution region under the fovea **through a saccade**.

> [!NOTE]
> **Saccadic suppression** is exploited here too, and in **redirected walking**: because vision is suppressed during a saccade, a system can subtly rotate the virtual world mid-saccade and the user will not notice — letting them walk in circles in a small room while believing they walk in a straight line.

### Implication 4 — the vergence–accommodation conflict

This is the deepest unsolved problem in headset design.

| In the real world | In a headset |
|---|---|
| **Vergence** (eye rotation) and **accommodation** (lens focus) change **together** and consistently | **Vergence varies** with the virtual object's depth, but **accommodation is fixed** — the physical screen is always at the same optical distance |

Your eyes converge on a virtual object 30 cm away, but must stay focused at the display's fixed focal distance (typically ~2 m). The two cues **disagree**.

**Consequences:** eye strain, fatigue, headaches, and difficulty with close-up virtual work — a major reason extended headset sessions are tiring.

> [!NOTE]
> Approaches being pursued: **varifocal** displays (physically move the screen or lens to match vergence, requiring eye tracking), **light-field** displays (reproduce the actual light rays so accommodation works naturally) and **multi-focal** displays (several focal planes at once). None is solved in a consumer product.

---

## The summary table

| Movement | What it does | Speed / range | Why VR cares |
|---|---|---|---|
| **Saccade** | Ballistic jump to a new target | up to **900°/s**, 20–200 ms | **Saccadic suppression** enables foveated rendering and redirected walking |
| **Smooth pursuit** | Tracks a moving target | up to **~30°/s** | Causes **judder** on sample-and-hold displays → needs **low persistence** |
| **VOR** | Counter-rotates against head motion | **~10 ms latency** | Sets the **~20 ms latency budget**; failure ⇒ **motion sickness** |
| **OKR** | Tracks a large moving field | slow phase + fast reset | Causes **vection** — the illusion of self-motion, and its nausea |
| **Vergence** | Eyes rotate oppositely for depth | close range | **Vergence–accommodation conflict** ⇒ eye strain |
| **Microsaccades** | Tiny involuntary tremor during fixation | < 1° | Prevent **perceptual fading**; a perfectly stabilised image disappears |

> [!EXAM]
> The course question bank asks *"What are the different eye movements? Explain each with examples"* — give all six with **mechanism + example**, then add the four implications. Very few candidates connect the physiology to the engineering; doing so (**VOR ⇒ latency budget**, **pursuit ⇒ low persistence**, **fovea ⇒ foveated rendering**, **vergence ⇒ accommodation conflict**) is what makes the answer complete.

---

**Next:** tracking — the mechanism that has to satisfy all of these constraints.
