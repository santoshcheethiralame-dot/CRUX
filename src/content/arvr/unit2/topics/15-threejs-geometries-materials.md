---
subject: arvr
unit: 2
order: 15
slug: threejs-geometries-materials
title: Three.js — Geometries and Materials
summary: BufferGeometry and the built-in primitives, the material ladder from unlit to physically based, textures, and the PBR maps.
minutes: 14
tags: [threejs, geometry, BufferGeometry, material, PBR, textures, gap-fill]
---

# Three.js — Geometries and Materials

> [!NOTE]
> **Source note.** Gap-fill topic — not in the CAVE Lab booklet. Written against the syllabus item *"Working with Three.Js Material and Geometries"* from the prescribed O'Reilly text and current Three.js documentation.

A **Mesh** is always exactly two things: **geometry** (where the vertices are) and **material** (how they respond to light). Keeping them separate is what lets you reuse one geometry with twenty materials, or one material across twenty meshes.

## Geometries

### Built-in primitives

| Geometry | Key parameters |
|---|---|
| `BoxGeometry` | width, height, depth, + segment counts |
| `SphereGeometry` | radius, widthSegments, heightSegments |
| `PlaneGeometry` | width, height, + segments |
| `CylinderGeometry` | radiusTop, radiusBottom, height, radialSegments |
| `TorusGeometry` | radius, tube, radialSegments, tubularSegments |
| `TextGeometry` | text string + a loaded font |

```js
const sphere = new THREE.SphereGeometry(1, 32, 16);   // radius, widthSeg, heightSeg
```

> [!TRAP]
> **Segment counts are a polygon budget, not a quality dial.** `SphereGeometry(1, 128, 64)` has roughly **16× the triangles** of `(1, 32, 16)` and looks almost identical at typical sizes. Recall the *polygons per second* metric from the polygon-rendering topic — and that VR renders **two eyes at 90 fps**. Over-tessellating a background object is one of the most common causes of a VR app missing frame rate.

### BufferGeometry

Everything is ultimately a **`BufferGeometry`** — typed arrays of vertex attributes, uploaded to the GPU. This *is* the **vertex buffer object** from the graphics-architectures topic.

```js
const geometry = new THREE.BufferGeometry();

const vertices = new Float32Array([
  -1, -1, 0,    // v0
   1, -1, 0,    // v1
   1,  1, 0,    // v2
]);

geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
geometry.computeVertexNormals();
```

The `3` is the number of components per vertex — the same idea as the `3` in `glVertex3f`.

> [!NOTE]
> **Indexed geometry.** A cube has 8 corners but 36 vertex references (6 faces × 2 triangles × 3). Using an **index buffer** stores the 8 positions once and refers to them by number, cutting both memory and vertex-shader work. `geometry.setIndex([...])` does this — the modern equivalent of `GL_TRIANGLE_STRIP`'s vertex reuse.

## Materials — the ladder

Materials trade **cost against realism**, and choosing correctly matters far more in VR than on a desktop.

| Material | Lighting | Cost | Use for |
|---|---|---|---|
| `MeshBasicMaterial` | **None** — flat colour, ignores lights | Cheapest | UI, wireframes, debugging, unlit backgrounds |
| `MeshLambertMaterial` | **Diffuse only**, computed per-vertex | Cheap | Matte surfaces, mobile VR |
| `MeshPhongMaterial` | Diffuse + **specular**, per-fragment | Moderate | Shiny plastic, classic look |
| `MeshStandardMaterial` | **Physically based (PBR)** — roughness/metalness | Higher | The sensible default |
| `MeshPhysicalMaterial` | PBR + clearcoat, transmission, sheen | Highest | Glass, car paint, fabric |

```js
const mat = new THREE.MeshStandardMaterial({
  color: 0x2194ce,
  roughness: 0.4,     // 0 = mirror, 1 = fully matte
  metalness: 0.8,     // 0 = dielectric, 1 = metal
});
```

> [!INTUITION]
> These map directly onto the **material properties** from the camera-lights-materials topic. `MeshLambertMaterial` implements **diffuse scattering** only. `MeshPhongMaterial` adds **specular scattering**. `MeshStandardMaterial` replaces the ad-hoc shininess number with **roughness and metalness**, which are physically meaningful and behave consistently under any lighting — the reason PBR became standard.
>
> Note also that Lambert is **per-vertex** and Phong **per-fragment**, which is exactly the vertex-shader vs fragment-shader cost distinction from the programmable-pipelines topic.

## Textures

```js
const loader = new THREE.TextureLoader();
const tex = loader.load('/textures/brick.jpg');

tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
tex.repeat.set(4, 4);
tex.colorSpace = THREE.SRGBColorSpace;   // for colour maps only

const mat = new THREE.MeshStandardMaterial({ map: tex });
```

This is the **raster primitive** from earlier in the unit, applied to geometric primitives — geometry defines shape, raster data defines surface detail.

### The PBR map set

| Map | Controls | Colour space |
|---|---|---|
| `map` | Base colour (albedo) | **sRGB** |
| `normalMap` | Fake surface detail by perturbing normals | Linear |
| `roughnessMap` | Per-pixel roughness | Linear |
| `metalnessMap` | Per-pixel metalness | Linear |
| `aoMap` | Ambient occlusion — crevice darkening | Linear |
| `displacementMap` | **Actually moves vertices** (needs geometry segments) | Linear |
| `emissiveMap` | Self-illumination | sRGB |

> [!TRAP]
> **Only colour maps (`map`, `emissiveMap`) are sRGB.** Data maps — normal, roughness, metalness, AO — store *numbers*, not colours, and must stay **linear**. Marking a normal map as sRGB silently corrupts the lighting in a way that looks like "the shading is just a bit off" and is very hard to diagnose.
>
> Second trap: `normalMap` **fakes** detail by perturbing normals — it costs nothing geometrically but the silhouette stays flat. `displacementMap` genuinely moves vertices, so it changes the silhouette but **needs a densely segmented geometry** to have anything to move.

> [!NOTE]
> **Bump mapping**, listed in the course's fragment-processing step, is the ancestor of `normalMap` — same goal (simulate surface irregularities by adjusting lighting), better encoding.

## Disposal

```js
geometry.dispose();
material.dispose();
texture.dispose();
```

> [!TRAP]
> JavaScript's garbage collector **cannot free GPU memory**. Removing a mesh from the scene releases the JS object but leaves its buffers and textures resident on the GPU. In a long-running AR/VR session that loads and unloads content, failing to `dispose()` is a genuine memory leak that ends in a crashed tab.

> [!EXAM]
> *"Explain materials and geometries in Three.js"* — define Mesh = Geometry + Material, list four built-in geometries, explain `BufferGeometry` as the underlying vertex-buffer representation, then give the material ladder **with the lighting model each implements**, and connect it back to diffuse/specular/PBR. Mentioning the VR polygon-budget consequence shows applied understanding.

---

**Next:** making it move, and making it fall.
