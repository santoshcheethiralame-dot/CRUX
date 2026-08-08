---
subject: arvr
unit: 1
order: 4
slug: coordinate-systems-frames
title: Coordinate Systems and Frames
summary: Basis vectors, linear combinations, why a point needs an origin but a vector does not, and the definition of a frame.
minutes: 12
tags: [coordinate-system, basis-vectors, frame, linear-combination, origin]
---

# Coordinate Systems and Frames

## Representing a vector

> **Vectors and points can be uniquely represented in a coordinate system using linearly independent basis vectors.**

A vector $\mathbf w$ is expressed as a **linear combination** of basis vectors, where the coefficients determine its representation relative to that basis:

$$\mathbf{w} = \alpha_1\mathbf{v}_1 + \alpha_2\mathbf{v}_2 + \alpha_3\mathbf{v}_3$$

- **Basis vectors $(\mathbf v_1, \mathbf v_2, \mathbf v_3)$** define the coordinate system and **span the space**.
- The triple $(\alpha_1, \alpha_2, \alpha_3)$ is *the representation of* $\mathbf w$ — not $\mathbf w$ itself.

> **The same vector can have different representations depending on the chosen basis.**

> [!INTUITION]
> This distinction is the whole point of the topic. **The vector is a geometric fact; the numbers are a description of it in one particular language.** "Three metres north-east" and "2.12 m north plus 2.12 m east" describe the same arrow. Change the basis and every number changes while nothing geometric moves. AR systems juggle several such languages at once, which is why the next topic is about translating between them.

## Representing a point

> **Points, unlike vectors, require both a reference point (origin) and basis vectors for unique representation.**

- **In an affine space, points can be uniquely represented if a reference point (origin) is defined.**
- Every point in a frame can be written as a unique combination of the basis vectors **and the origin**.

$$Q = \alpha_1\mathbf{v}_1 + \alpha_2\mathbf{v}_2 + \alpha_3\mathbf{v}_3 + P_0$$

## The definition of a frame

> **A frame consists of:**
> - **an origin $P_0$**
> - **three basis vectors $(\mathbf v_1, \mathbf v_2, \mathbf v_3)$**

$$\text{frame} = (\mathbf v_1,\ \mathbf v_2,\ \mathbf v_3,\ P_0)$$

**A coordinate system is basis vectors alone; a frame is a coordinate system plus an origin.** Vectors need only the former; points need the latter.

> [!TRAP]
> "Coordinate system" and "frame" are used loosely in most textbooks and sometimes interchangeably in the course notes — but if an exam question asks what a frame *consists of*, the expected answer is **four things: three basis vectors and one origin**. Answering "three axes" loses the mark.

## Why this matters in one picture

```
        A VECTOR needs               A POINT needs
        only a basis                 a basis AND an origin

             ↑ v2                         ↑ v2
             │      ↗ w                   │      • Q
             │    ↗                       │
             └────────→ v1          P0 ●──┴────────→ v1

     w = α1v1 + α2v2               Q = α1v1 + α2v2 + P0
     (move the origin —            (move the origin —
      w's numbers don't change)     Q's numbers DO change)
```

> [!EXAM]
> A frequently asked short question: *"Why do points require a reference point while vectors do not?"* The answer in one sentence: **a vector encodes only displacement, which is unaffected by where you place the origin, whereas a point encodes absolute location, which is meaningless until you say "relative to what".**

## Linear independence

The basis must be **linearly independent** — no basis vector may be expressible as a combination of the others. If they were dependent, they would not **span** the space (you would lose a dimension) and representations would not be **unique** (the same vector could be written many ways).

> [!NOTE]
> In practice, graphics bases are not merely independent but **orthonormal** — mutually perpendicular and of unit length. That buys you two things worth knowing: the coefficients can be recovered by a simple dot product, $\alpha_i = \mathbf w\cdot\mathbf v_i$, and the change-of-basis matrix becomes **orthogonal**, so its **inverse is just its transpose**. You will use that second fact when you meet rotation matrices.

## The frames an AR system carries at once

This is where the abstraction earns its keep. A single frame drawn in an AR headset involves, at minimum:

| Frame | Origin sits at | Answers |
|---|---|---|
| **Object (model) frame** | the object's own centre | "what shape is this teapot?" |
| **World frame** | a fixed point in the room | "where is the teapot in the room?" |
| **Camera (eye) frame** | the user's eye | "where is the teapot relative to the user's gaze?" |

Each is a legitimate $(\mathbf v_1,\mathbf v_2,\mathbf v_3,P_0)$. The same physical teapot vertex has **three different coordinate triples**, one per frame — and none of them is more "correct" than the others.

Converting between them is the subject of the next topic.

---

**Next:** change of basis — the transformation matrix that moves a representation from one frame to another.
