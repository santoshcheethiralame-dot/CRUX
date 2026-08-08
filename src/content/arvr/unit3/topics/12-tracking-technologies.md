---
subject: arvr
unit: 3
order: 12
slug: tracking-technologies
title: Stationary Tracking Systems
summary: Mechanical, electromagnetic, ultrasonic and optical tracking — how each works, its advantages, its limitations and its named example.
minutes: 14
tags: [tracking, mechanical, electromagnetic, ultrasonic, optical, ARToolKit, SLAM, polhemus]
---

# Stationary Tracking Systems

Four technologies. For each, the course gives **mechanism → advantages → limitations → example**, and that is exactly the structure an exam answer should take.

---

## 1. Mechanical tracking

> Mechanical tracking involves **physical, articulated linkages connected to a base station**. These linkages are equipped with **joint angle sensors** to precisely calculate the position and orientation of the tracked object.

| | |
|---|---|
| **Advantages** | **Very high precision and low latency.** **Reliable in controlled, fixed environments.** |
| **Limitations** | **Limited degrees of freedom** due to mechanical constraints. **Restricted user mobility** — users remain **tethered to the tracking arms**. |
| **Example** | Early VR systems and **medical simulators** used mechanical tracking for highly controlled precision applications. |

> [!INTUITION]
> Mechanical tracking is the only method that is **not really measuring** anything — it **computes** the pose from known link lengths and measured joint angles, by forward kinematics. That is why it is so precise and so fast: there is no signal to be noisy, no line of sight to be blocked, no field to be distorted. And it is why it is so restrictive: you are physically bolted to the reference point.
>
> The arm-position question in Unit 1 was exactly this computation.

## 2. Electromagnetic tracking

> Electromagnetic (EM) tracking systems use a **base station that generates a magnetic field**, and **sensors attached to the object measure the field's strength and orientation** to determine position and orientation.

| | |
|---|---|
| **Advantages** | **No line-of-sight requirement** between sensor and transmitter. **Capable of tracking objects through obstructions.** |
| **Limitations** | **Highly sensitive to nearby metallic objects and electronic interference.** **Limited range and reduced precision** in complex environments. |
| **Example** | **Polhemus** tracking systems, widely used in VR and motion capture. |

> [!INTUITION]
> The no-line-of-sight property is genuinely valuable and rare — EM can track a sensor **inside** the body or behind a wall, which is why it survives in **surgical navigation** where an instrument tip is hidden inside a patient. The price is that it is defeated by exactly what a hospital or lab is full of: **metal**. A steel table distorts the field and the tracker reports confidently wrong positions.

## 3. Ultrasonic tracking

> Ultrasonic systems use **sound waves emitted by transmitters and received by microphones** (or vice versa). By calculating the **time-of-flight** of sound waves, these systems determine the position of objects in three-dimensional space.

| | |
|---|---|
| **Advantages** | **Relatively low cost.** **Good accuracy in small, enclosed environments.** |
| **Limitations** | **Prone to noise interference and reflections.** **Limited range and line-of-sight dependency.** **Slower update rates** than optical or electromagnetic systems. |
| **Example** | Early head-tracking systems in VR labs. |

> [!NOTE]
> The **slow update rate** is a physical limit, not an engineering one: sound travels at ~343 m/s, so a 3 m round trip takes ~9 ms **before any computation**. Against a 20 ms motion-to-photon budget, that is most of it spent waiting. **Reflections** compound the problem — an echo arriving later is indistinguishable from a farther object.

## 4. Optical tracking

> Optical systems use **cameras to track markers or recognizable features** in the environment or on tracked objects.

### Marker-based tracking

> Relies on **fiducial markers** — printed patterns like QR codes or **ARToolKit markers** — placed in the environment or on objects. The system **detects these markers through image processing** and estimates position and orientation **relative to the camera**.

| | |
|---|---|
| **Advantages** | **High accuracy and reliability in controlled environments.** |
| **Limitations** | **Requires clear line-of-sight; affected by lighting conditions.** |
| **Example** | **ARToolKit**, the open-source AR library that popularised marker-based tracking. |

### Markerless (natural feature) tracking

> Detects and tracks **natural visual features** — corners, edges, textures — in real-world scenes **without relying on markers**. Algorithms like **SLAM (Simultaneous Localization and Mapping)** and **Natural Feature Tracking (NFT)** enable tracking in **dynamic, unprepared environments**.

| | |
|---|---|
| **Advantages** | **No need for physical markers.** |
| **Limitations** | **Computationally intensive and lighting-dependent; may experience drift over time.** |
| **Example** | **Vuforia** and **ARKit** use markerless tracking on mobile AR platforms. |

> [!INTUITION]
> The marker/markerless split is the **1997 → 2008 story** from the history topic, in technical form. A marker is a **guaranteed, high-contrast, known-geometry** target — easy to find, easy to solve, but somebody has to put it there. Natural features are **already present everywhere**, but you must find them, match them frame to frame, and cope with them changing under lighting and viewpoint.
>
> **Markers moved AR out of the lab; markerless moved it out of prepared environments.** Unit 4 is largely the mechanics of the second.

---

## The comparison table

| | **Mechanical** | **Electromagnetic** | **Ultrasonic** | **Optical** |
|---|---|---|---|---|
| Principle | Joint angles on linkages | Magnetic field strength | **Time-of-flight** of sound | Camera + image processing |
| Precision | **Very high** | Moderate | Moderate | High |
| Latency | **Very low** | Low | **High** (speed of sound) | Moderate (processing) |
| Line of sight needed? | No | **No** | Yes | **Yes** |
| Main enemy | Physical constraint | **Metal & EM interference** | **Noise & reflections** | **Occlusion & lighting** |
| Mobility | **Tethered** | Limited range | Limited range | Good (esp. markerless) |
| Cost | High | High | **Low** | Low–moderate |
| Example | Medical simulators | **Polhemus** | Early VR head trackers | **ARToolKit**, Vuforia, ARKit |

> [!EXAM]
> *"What is tracking in a 3D environment? What are the various types of tracking?"* is question 7 in the course's own question bank. Structure: (1) define tracking as determining **6DOF pose in real time**, and say why it matters (registration, immersion); (2) the **four technologies**, each with mechanism, one advantage, one limitation and its example; (3) the **marker vs markerless** split within optical; (4) close with the trade-off sentence — **precision, mobility, cost and susceptibility to interference** — and note that **modern systems combine several via sensor fusion**, because no single technology wins on every axis.

> [!TRAP]
> These are labelled **stationary** tracking systems because each depends on **fixed infrastructure**: a base station, a transmitter, a microphone array, or prepared markers. That is precisely what the **mobile sensors** in the next topic do without — and precisely why they are so much worse at it.

---

**Next:** what you get when you throw the infrastructure away.
