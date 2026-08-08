---
subject: arvr
unit: 1
order: 7
slug: coordinate-free-geometry
title: Coordinate-Free Geometry
summary: Why geometry does not depend on a reference system, which properties are invariant, and what this buys an AR system in practice.
minutes: 9
tags: [coordinate-free, invariance, reference-system, orthogonality]
---

# Coordinate-Free Geometry

## The principle

> **Geometry is inherently independent of any specific reference system**, as its fundamental properties do not rely on a particular choice of coordinates. While coordinate systems provide context for representation by defining aspects like the origin and axes, **they are ultimately arbitrary**. The essential relationships within geometry — such as distances and angles — **remain consistent regardless of the coordinate system used**.

The three claims to reproduce:

| Claim | Meaning |
|---|---|
| **Independence from reference systems** | Geometric principles hold true regardless of the chosen coordinate system |
| **Arbitrary coordinate systems** | Elements like the **origin and axes serve as references but do not alter fundamental geometric properties** |
| **Consistency of relative properties** | Measurements such as **distance and orthogonality remain unchanged** across different coordinate systems |

> [!INTUITION]
> Two people describe the same room. One measures from the left doorframe in metres; the other from the right corner in feet, with the axes rotated 30°. **Every number they write down differs. Every geometric fact they can state agrees** — the table is still 2 m long, the walls still meet at right angles, the lamp is still between the sofa and the window.
>
> The numbers are the *description*. The geometry is the *thing*. Coordinate-free geometry is the discipline of reasoning about the thing.

## What is invariant and what is not

| Invariant under change of frame | Depends on the frame |
|---|---|
| **Distance** between two points | The **coordinates** of a point |
| **Angle** between two vectors | The **components** of a vector |
| **Orthogonality** (perpendicularity) | Which direction is "up" or "x" |
| Whether a point lies **inside** a shape | The numeric position of the origin |
| **Ratios** along a line (e.g. midpoint-ness) | Units of measurement |

> [!TRAP]
> "Invariant under change of frame" means under **rigid** changes — translation and rotation. Introduce **scaling** and distances change (though ratios and angles survive); introduce **shear** and angles change too. When a question says "which properties are preserved", check *which class of transformation* it is asking about. Rigid-body transformations preserve everything in the left column; general affine transformations preserve only **straightness, parallelism and ratios along a line**.

## Why an AR system cares

This is not philosophy — it is a design constraint, and it is the reason Unit 1 exists.

An AR headset has **no canonical origin**. The world frame is wherever the tracker happened to initialise. The user walks, and the camera frame moves continuously. The object frame belongs to whoever authored the model. **If your geometry only worked in one particular coordinate system, the augmentation would break the instant the user turned their head.**

So the useful statements are the coordinate-free ones:

- *"the virtual lamp is 1.2 m from the table edge"* — survives any reframing;
- *"the virtual lamp is at $(3.4, 0.9, -2.1)$"* — true only until the tracker re-localises.

> [!NOTE]
> This is why the course insists so hard on the **point vs vector** type distinction, and on **affine spaces having no privileged origin**. Both are the same principle enforced at different levels: write geometry in a form whose meaning does not evaporate when the frame changes.

## In practice

You still need coordinates to compute — a GPU multiplies numbers, not ideas. The working discipline is:

1. **Reason** about the problem coordinate-free (what is perpendicular to what, what distance must be preserved).
2. **Choose** a convenient frame — usually the one that makes the most terms zero.
3. **Compute** in that frame.
4. **Check** that the answer is expressed in the frame the caller expects.

Step 4 is where most bugs live, and step 1 is where most exam marks live.

> [!EXAM]
> Short answer: *"What is coordinate-free geometry and why is it important?"* — geometry's essential relationships (distance, angle, orthogonality, betweenness) **do not depend on the arbitrary choice of origin and axes**; coordinate systems are a representation, not the geometry itself. Importance: in AR/VR the frames **move continuously**, so only frame-independent statements stay true.

---

**Next:** the concrete chain of frames a vertex actually travels through in OpenGL.
