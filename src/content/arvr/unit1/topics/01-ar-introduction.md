---
subject: arvr
unit: 1
order: 1
slug: ar-introduction
title: Introduction to Augmented Reality
summary: What AR is, the ten historical milestones from the Sword of Damocles to Vuforia, and the seven application domains.
minutes: 12
tags: [AR, history, milestones, applications, sword-of-damocles, vuforia]
---

# Introduction to Augmented Reality

## What AR is

> **Augmented Reality (AR) creates a connection between the physical world and digital information**, enhancing real-world experiences through overlays of digital data.

It lets users interact with their surroundings in new ways by **integrating virtual elements into their environment**. The two examples the course opens with:

- **Location-based services** — provide contextual information based on a user's position.
- **Barcode applications** — enable quick access to digital content by scanning physical codes.

> [!INTUITION]
> The word that matters is **augmented**, not *replaced*. AR adds a layer to the world you can still see. Virtual Reality (Unit 3) removes the world entirely and substitutes its own. Everything else — the displays, the tracking, the maths — follows from that one difference: **if the user can still see reality, your virtual content has to line up with it**, which is why AR is fundamentally a *registration* problem and VR is not.

## Historical development — the ten milestones

This list is directly examinable. Learn the year, the name, and the *first* attached to it.

| Year | Milestone | Why it matters |
|---|---|---|
| **1968** | **Ivan Sutherland — The Sword of Damocles** | The **first head-mounted display (HMD)** |
| **1992** | The term **"Augmented Reality" coined** by **Caudell & Mizell at Boeing** | Named the field; built for **aircraft wire assembly guidance** |
| **1993** | **Feiner — KARMA** | AR system for **repair and maintenance guidance** |
| **1994** | Medical AR at the **University of North Carolina** | Used for **fetal observation** |
| **1996** | **Studierstube** | The **first collaborative AR system** |
| **1997–2001** | **Mixed Reality Systems Laboratory**, Japan | Japan's key role in AR research |
| **1997** | **Touring Machine** | The **first outdoor AR system** — GPS and orientation tracking |
| **1998** | **ARQuake** | The **first outdoor AR game** |
| **2003** | **Invisible Trains** | The **first handheld AR system** (on PDAs) |
| **2008** | **Vuforia AR Engine** | The **first practical AR tracking system for smartphones** |

> [!EXAM]
> The pattern is a sequence of *firsts*: first HMD (1968) → first named (1992) → first collaborative (1996) → first outdoor (1997) → first outdoor game (1998) → first handheld (2003) → first practical smartphone tracking (2008). If you are asked to "trace the historical development of AR", give the years **in order** with one clause each — that structure is worth more than prose.

> [!TRAP]
> Two 1992 facts get conflated. **Caudell & Mizell** coined the term at **Boeing**, and the application was **wire bundle assembly in aircraft** — not general manufacturing, and not Sutherland. Sutherland is 1968 and is the *Sword of Damocles*, which is an **HMD**, not an AR "system" in the modern sense.

## Applications

The seven domains named in the course:

| Domain | What AR does there |
|---|---|
| **Industry & Construction** | Project planning, assembly, safety training |
| **Maintenance & Training** | Helps workers and trainees **visualise repair instructions in real time** |
| **Medical Field** | Surgeries, diagnostics, medical training |
| **Navigation** | Real-time overlays for directions and route guidance |
| **Television & Entertainment** | Enhances broadcasting and live event coverage |
| **E-Commerce & Marketing** | Virtual try-on, interactive product visualisation |
| **Gaming** | **Pokémon GO** and **ARQuake** integrate digital elements into real-world environments |

> [!NOTE]
> Notice how the milestones and the applications map onto each other almost one-to-one: Boeing 1992 → *Industry*, KARMA 1993 → *Maintenance*, UNC 1994 → *Medical*, Touring Machine 1997 → *Navigation*, ARQuake 1998 → *Gaming*. The application list is the milestone list grown up. Learning them together halves the work.

## Why a graphics-maths unit follows

The rest of Unit 1 looks like pure mathematics — vectors, affine spaces, matrices, quaternions — and it is fair to ask what that has to do with overlaying a teapot on a table.

The answer is **registration**. To draw a virtual object so it appears to sit in the real world, the system must continuously answer:

1. *Where is the object, in its own coordinates?* → **object frame**
2. *Where is that in the room?* → **world frame**
3. *Where is the user's eye, and which way is it pointing?* → **camera frame**
4. *How do I express all three consistently and combine them cheaply?* → **homogeneous coordinates and matrix concatenation**
5. *How do I represent "which way is the head pointing" without it breaking?* → **quaternions**

Every topic in this unit is one of those five questions. Unit 1 is the coordinate machinery that makes the augmentation *stick* to the world.

---

**Next:** the primitive objects that machinery operates on — scalars, points and vectors.
