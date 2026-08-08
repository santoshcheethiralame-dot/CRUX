---
subject: arvr
unit: 4
order: 9
slug: outdoor-tracking
title: Outdoor Tracking
summary: Why outdoor AR is hard, and the three techniques the course names — sensor fusion, GIS data integration and bag-of-words scalable visual matching.
minutes: 12
tags: [outdoor-tracking, sensor-fusion, GIS, bag-of-words, place-recognition, scalable-matching]
---

# Outdoor Tracking

## Why outdoors is a different problem

Every technique so far has assumed something that fails outside:

| Assumption | Outdoors |
|---|---|
| Controlled lighting | **Sun, cloud, shadow, night** — appearance changes hourly |
| Bounded working volume | The area is **unbounded** — a city |
| A map that fits in memory | A city-scale map does **not** |
| Static scene | **Traffic, pedestrians, foliage, seasons** |
| Infrastructure can be installed | Nobody will place markers across a city |

> [!INTUITION]
> The core difficulty is **scale**, in both senses. The **area** is unbounded, so a SLAM map cannot simply grow forever; and the **appearance** of a place varies enormously with time of day, weather and season, so a descriptor recorded in July may not match the same building in December. Indoor SLAM never faces either.

The course names three techniques.

---

## 1. Sensor fusion

> **Combining GPS, IMU and visual data.**

Each covers the others' failures — the Unit 3 argument, now with three participants:

| Sensor | Provides | Fails at |
|---|---|---|
| **GPS** | **Absolute global position**, no drift, unbounded area | **1–100 m** accuracy; blocked by buildings; useless indoors |
| **IMU** | **Fast orientation**, fills gaps at 1000 Hz | Drifts; cannot give position |
| **Vision** | **Precise local registration** — centimetre alignment | Needs texture and light; drifts without loop closure |

> [!INTUITION]
> The division of labour is clean and worth stating in an exam: **GPS says which building you are near; vision says exactly where on it to draw.** GPS bounds the error globally so vision never has to search the whole city; vision refines locally so the content actually lines up. Neither could do the job alone — GPS is far too coarse for registration, and vision has no way to know which city it is in.

**Differential GPS (DGPS)** improves the coarse layer from metres to **sub-metre** using a ground-station correction, which shrinks the region vision must search.

---

## 2. GIS data integration

> **Integrates building outlines and elevation models from GIS services.**

Rather than building a map from scratch, use one that **already exists**. Geographic Information Systems provide:

| Data | Use in AR |
|---|---|
| **Building footprints** | Predict which façades should be visible from a GPS position |
| **Elevation models (DEM/DTM)** | Terrain height — where the ground is, what is occluded by a hill |
| **3D city models** | Coarse geometry to register camera view against |
| **Road networks, POIs** | Semantic anchors for navigation content |

> [!INTUITION]
> This is a **prior**, in exactly the sense the skeleton was a prior for attached bodies in Unit 3. **Constraints are information.** Knowing there is a building of known footprint and height 30 m north of you turns an open-ended pose search into fitting the observed skyline to a known model — far fewer unknowns, far more robust.
>
> It also solves **occlusion**, which is otherwise nearly impossible outdoors: with building geometry you know a virtual arrow should be **hidden** behind the corner, rather than floating implausibly through it.

---

## 3. Scalable visual matching

> Uses **bag-of-words models for robust, large-scale place recognition**.

**The problem:** a city-scale database holds **millions** of images and **billions** of descriptors. Comparing the current frame against all of them, descriptor by descriptor, is hopeless.

**The bag-of-words solution**, borrowed from text retrieval:

| Step | Text analogy | Vision |
|---|---|---|
| **1. Build a vocabulary** | Dictionary of words | **Cluster** millions of training descriptors (k-means) into ~$10^6$ **visual words** |
| **2. Quantise** | Map each word to a dictionary entry | Map each descriptor to its **nearest visual word** |
| **3. Represent** | Document → word-frequency vector | Image → **histogram of visual words** |
| **4. Index** | Inverted index | **Inverted file**: visual word → images containing it |
| **5. Retrieve** | Rank documents by similarity | Rank candidate places by histogram similarity (**TF-IDF** weighted) |
| **6. Verify** | — | **Geometric verification** on the top candidates via RANSAC |

> [!INTUITION]
> **The trick is throwing away the geometry, then putting it back.** A bag of words discards *where* the features are and keeps only *which* features are present — which makes an image a sparse vector that an inverted index can search in milliseconds, exactly as a search engine finds documents. That gets you from millions of candidates to a shortlist of ten.
>
> Then **geometric verification** restores the discarded information: run RANSAC on the shortlist and keep only the candidate whose features are also **spatially consistent**. Cheap-and-approximate to shortlist, expensive-and-exact to confirm. It is the same two-tier strategy as convex hulls before exact collision tests in Unit 1.

> [!NOTE]
> **TF-IDF** matters here for the same reason it does in search. A visual word corresponding to generic brickwork appears in **every** image and carries almost no information; a distinctive architectural detail appears in few and is highly diagnostic. Weighting by **inverse document frequency** stops the common features drowning out the useful ones.

---

## The layered outdoor architecture

```
   GPS + DGPS      ──▶  which district am I in?     (100 m → 1 m)
        │
        ▼
   BAG-OF-WORDS    ──▶  which place is this?        (shortlist of candidates)
        │
        ▼
   GEOMETRIC       ──▶  verify and get exact pose   (RANSAC + PnP)
   VERIFICATION
        │
        ▼
   GIS MODEL       ──▶  occlusion, ground plane, semantics
        │
        ▼
   IMU + VISUAL    ──▶  frame-to-frame stability at 1000 Hz
   ODOMETRY
```

> [!INTUITION]
> Notice the pattern that has now recurred four times in this unit: **coarse and cheap narrows the search; fine and expensive confirms.** GPS narrows for bag-of-words; bag-of-words narrows for geometric verification; the map narrows for incremental tracking. Building systems this way is the single most transferable idea in the unit.

## Remaining difficulties

- **Urban canyons** — tall buildings block and reflect GPS signals (multipath), degrading accuracy exactly where content is densest.
- **Appearance change** — day/night, weather, seasons; a database built in summer may not match in winter.
- **Dynamic objects** — vehicles and pedestrians produce features that violate the static-world assumption.
- **Map maintenance** — cities change; the database ages.
- **Repetitive architecture** — identical façades cause false matches.

> [!EXAM]
> *"Explain outdoor tracking in AR"* — give the **three named techniques** (sensor fusion of GPS/IMU/visual · **GIS data integration** of building outlines and elevation models · **scalable visual matching with bag-of-words**), explain **why each is needed** (coarse absolute position · prior geometry and occlusion · searching a city-scale database), and close with the **layered architecture** and the difficulties. The sentence that shows understanding: **GPS says which building; vision says where on it.**

---

**Next:** capturing the environment's geometry rather than just localising within it.
