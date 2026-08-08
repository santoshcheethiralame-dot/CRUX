---
subject: arvr
unit: 2
order: 17
slug: working-with-blender
title: Working with Blender
summary: Blender's role as the modeller, the modelling workflow, UV unwrapping, rigging, and exporting to glTF for the web.
minutes: 13
tags: [blender, modelling, UV-unwrapping, rigging, glTF, baking, export, gap-fill]
---

# Working with Blender

> [!NOTE]
> **Source note.** Gap-fill topic — not in the CAVE Lab booklet. Written against the syllabus item *"Working with Blender"*, informed by the reference text **Gordon Fisher, *Blender 3D Basics*** (noting the course's own caveat that recent versions differ and web material may be substituted) and current Blender/glTF documentation.

## Where Blender sits

Blender is a free, open-source 3D creation suite. In the vocabulary of this unit it is **the modeller** in the **modelling–rendering paradigm**:

```
   ┌──────────┐    ┌──────────────────┐    ┌───────────┐
   │ BLENDER  │──▶ │  .glb / .gltf    │──▶ │ THREE.JS  │──▶ image
   │ modeller │    │  interface file  │    │ renderer  │
   └──────────┘    └──────────────────┘    └───────────┘
```

> [!INTUITION]
> The paradigm the course describes from the 1990s is, unchanged, the modern web-AR pipeline. **Blender is the modeller, glTF is the interface file, Three.js is the renderer** — and the interface file carries exactly what that topic said it must: *objects, light sources and viewer location*, plus materials and animations.

## The modelling workflow

| Stage | What happens | Key idea |
|---|---|---|
| **1. Block out** | Start from primitives (cube, sphere, cylinder) and shape them | Establish proportion before detail |
| **2. Box modelling** | **Extrude**, **loop cut**, **bevel** and **inset** faces to build form | Most hard-surface modelling is these four operations |
| **3. Modifiers** | Non-destructive operations — **Subdivision Surface**, **Mirror**, **Array**, **Solidify** | Editable at any time; **applied** only at export |
| **4. UV unwrapping** | Flatten the 3D surface into 2D so textures can be painted onto it | Mark **seams**, then unwrap |
| **5. Texturing / shading** | Assign materials, usually via the **Principled BSDF** node | Maps directly onto PBR maps in Three.js |
| **6. Rigging** | Build an **armature** (skeleton) and **skin** the mesh to it via weights | Required for character animation |
| **7. Animation** | Keyframe bones or objects on the timeline; curves in the Graph Editor | Exports as glTF **AnimationClips** |
| **8. Export** | Write **.glb** for the web | See the checklist below |

> [!NOTE]
> **Modifiers are the important idea.** A Subdivision Surface modifier lets you model a simple low-poly cage and preview it smooth. The cage stays editable; the smoothing is computed on demand. At export the modifier is *applied*, producing the dense mesh — so you keep an editable source and ship an optimised result.

## UV unwrapping

A texture is a 2D image; a model is a 3D surface. **UV unwrapping** defines the mapping between them — literally flattening the mesh into a 2D layout, the way a paper model unfolds.

- **Mark seams** along edges where the surface may be cut (under an arm, behind a mesh).
- **Unwrap**, then arrange the resulting **UV islands** to use the texture space efficiently.
- Distortion in the UV layout shows up as **stretched texture** on the model.

> [!TRAP]
> **A model without UVs cannot be textured** — it will import into Three.js and render as flat colour no matter what maps you assign. If a `map` appears to do nothing, missing or broken UVs is the first thing to check.

## Rigging and skinning

- **Armature** — a hierarchy of **bones**; a scene graph in its own right, with each bone's transform relative to its parent (Unit 1's frame hierarchy again).
- **Skinning / weight painting** — each vertex is assigned **weights** saying how much each bone influences it. A vertex near the elbow is influenced by both upper- and lower-arm bones, so the mesh deforms smoothly.
- **Inverse kinematics (IK)** — pose a chain by moving its end (place the hand; the elbow and shoulder follow), rather than rotating each joint by hand (**forward kinematics**).

> [!NOTE]
> The forward/inverse kinematics distinction returns in Unit 4 under body tracking, and it is the same idea as Unit 1's arm-position question — that problem was **forward kinematics** worked by hand.

## Exporting to glTF — the checklist

**glTF** (`.gltf` text, `.glb` binary) is the standard 3D interchange format for the web — often called "the JPEG of 3D". It carries meshes, materials, textures, skeletons and animations in one file.

Before exporting:

| Check | Why |
|---|---|
| **Apply transforms** (Ctrl+A → All Transforms) | Un-applied scale/rotation arrives baked into the node and breaks physics and child transforms |
| **Triangulate** (or let the exporter do it) | glTF stores triangles; leaving it to the exporter is fine but explicit is safer |
| **Use the Principled BSDF** | It is what maps cleanly to `MeshStandardMaterial`; arbitrary node graphs do **not** export |
| **Bake procedural materials to textures** | Blender's procedural nodes have no glTF equivalent — bake them to image maps |
| **Decimate / check polycount** | Remember the VR budget: two eyes at 90 fps |
| **Pack or reference textures** | `.glb` embeds everything in one file — simplest for the web |
| **Name your animations** | They arrive in Three.js as `gltf.animations` and you will select them by name |
| **Set the origin sensibly** | The object's origin becomes its pivot — put it where rotation should occur |

> [!TRAP]
> **Coordinate system difference.** Blender is **Z-up**; glTF and Three.js are **Y-up**. The glTF exporter converts automatically, but if you write your own exporter, apply transforms strangely, or move data by hand, models arrive **lying on their back**. Rotating by −90° about X in Three.js to "fix" this is a symptom, not a cure — fix it at export.

> [!TRAP]
> **Blender's renderers (EEVEE, Cycles) are not what runs on the web.** A material that looks perfect in a Cycles render may export to something quite different, because Cycles supports a full node graph and glTF supports the PBR metallic-roughness model. **Preview your export**, not your Blender viewport — the [glTF viewer](https://gltf-viewer.donmccurdy.com) is the usual sanity check.

> [!EXAM]
> *"Explain the role of Blender in an AR/VR pipeline"* — position it as **the modeller** in the modelling–rendering paradigm, give the workflow stages (model → UV unwrap → texture → rig → animate → export), name **glTF/.glb** as the interface file, and cite two export concerns (**apply transforms**, **bake procedural materials**, **Y-up vs Z-up**, **polygon budget** — any two).

---

**Next:** Three.js inside a React application.
