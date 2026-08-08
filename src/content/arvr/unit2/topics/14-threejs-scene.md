---
subject: arvr
unit: 2
order: 14
slug: threejs-scene
title: Three.js — Creating a Scene
summary: The scene graph, the three mandatory objects, the render loop, and how each maps onto the OpenGL concepts from earlier in the unit.
minutes: 14
tags: [threejs, WebGL, scene-graph, camera, renderer, render-loop, gap-fill]
---

# Three.js — Creating a Scene

> [!NOTE]
> **Source note.** This topic and the four that follow (geometries & materials, animation & physics, Blender, React Three Fiber, WebXR) are **not covered by the CAVE Lab booklet**, which stops at classical OpenGL. They are written against the syllabus items *"Creating Scene on ThreeJS, Working with Three.Js Material and Geometries, Animations, Adding Physics, Working with Blender, Three.JS with React and WebXR"* using the prescribed text **Pangilinan, Lukas & Mohan, *Creating Augmented and Virtual Realities*** and current library documentation. **If your lecturer issues slides for this half, treat those as authoritative over this.**

## What Three.js is

**Three.js** is a JavaScript library that sits on top of **WebGL** — the browser's implementation of OpenGL ES. Everything from the first half of this unit is still there underneath: vertices, matrices, a pipeline, vertex and fragment shaders. Three.js supplies the scaffolding so you write scene descriptions instead of buffer management.

| Classical OpenGL | Three.js equivalent |
|---|---|
| `gluLookAt(...)` | `THREE.PerspectiveCamera` + `camera.position` / `camera.lookAt()` |
| `gluPerspective(fovy, aspect, near, far)` | `new THREE.PerspectiveCamera(fov, aspect, near, far)` |
| `glOrtho(...)` | `new THREE.OrthographicCamera(...)` |
| Vertex/index arrays, VBOs | `BufferGeometry` |
| `glMaterialfv`, `glLight*` | `Material` and `Light` objects |
| `glutDisplayFunc` + `glutMainLoop` | `requestAnimationFrame` + `renderer.render()` |
| `glPushMatrix` / `glPopMatrix` | **the scene graph** — parent/child transforms |

> [!INTUITION]
> The single biggest conceptual shift: OpenGL is **imperative** ("set this state, draw that"), Three.js is **declarative** ("here is a tree of objects; render it"). The push/pop matrix discipline you needed to avoid state leaking is replaced by **the hierarchy itself** — a child's transform is automatically relative to its parent, which is Unit 1's frame composition made structural.

## The three mandatory objects

Nothing renders without all three.

```js
import * as THREE from 'three';

// 1. SCENE — the container / scene graph root
const scene = new THREE.Scene();

// 2. CAMERA — the viewer  (fov, aspect, near, far)
const camera = new THREE.PerspectiveCamera(
  75,                                     // field of view, degrees (vertical)
  window.innerWidth / window.innerHeight, // aspect ratio
  0.1,                                    // near clipping plane
  1000                                    // far clipping plane
);
camera.position.z = 5;

// 3. RENDERER — draws the scene from the camera into a canvas
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
```

Those four arguments to `PerspectiveCamera` are **exactly `gluPerspective`'s arguments**, in the same order.

## Adding an object

A visible object is a **Mesh** = **Geometry** (the shape) + **Material** (the appearance):

```js
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube     = new THREE.Mesh(geometry, material);
scene.add(cube);

// MeshStandardMaterial responds to light, so the scene needs some
scene.add(new THREE.AmbientLight(0xffffff, 0.4));
const key = new THREE.DirectionalLight(0xffffff, 1);
key.position.set(5, 10, 7);
scene.add(key);
```

> [!TRAP]
> **The most common beginner failure is a black screen**, and it has three usual causes:
> 1. **No light**, while using a material that needs one (`MeshStandardMaterial`, `MeshPhongMaterial`, `MeshLambertMaterial`). `MeshBasicMaterial` is unlit and will always show — use it to test.
> 2. **The camera is inside the object.** Both default to the origin, so the cube surrounds the camera and back-face culling hides it. Move the camera back (`camera.position.z = 5`).
> 3. **The render loop was never started**, so exactly zero frames were drawn.

## The render loop

```js
function animate() {
  requestAnimationFrame(animate);   // schedule the next frame

  cube.rotation.x += 0.01;          // update state
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);   // draw this frame
}
animate();
```

> [!INTUITION]
> `requestAnimationFrame` is the browser's `glutMainLoop` — but *cooperative* rather than blocking. It hands control back after each frame, syncs to the display's refresh rate, and **pauses automatically when the tab is hidden**. In OpenGL you owned the loop; in the browser you request a slot in the browser's loop.

## The scene graph

`Scene` is the root of a **tree**, and every `Object3D` can have children. A child's transform is **relative to its parent**:

```js
const solarSystem = new THREE.Group();
scene.add(solarSystem);

const earth = new THREE.Mesh(earthGeo, earthMat);
earth.position.x = 10;
solarSystem.add(earth);          // earth orbits with the group

const moon = new THREE.Mesh(moonGeo, moonMat);
moon.position.x = 2;
earth.add(moon);                 // moon is positioned RELATIVE to earth

solarSystem.rotation.y += 0.01;  // rotates earth AND moon together
```

> [!NOTE]
> This is Unit 1's **frame hierarchy** made concrete. The moon's position is expressed in the earth's frame; the earth's in the solar system's frame; the solar system's in world coordinates. Three.js composes the matrices for you — the `worldMatrix` of any node is the product of every `matrix` up the chain to the root, which is exactly the **concatenation** you did by hand.

## Handling resize

```js
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();          // aspect changed → rebuild it
  renderer.setSize(window.innerWidth, window.innerHeight);
});
```

> [!TRAP]
> Changing `camera.aspect` alone does nothing — the **projection matrix is cached** and must be rebuilt with `updateProjectionMatrix()`. Forgetting this produces a stretched image after a resize, and it is the Three.js equivalent of forgetting `glutReshapeFunc`.

> [!EXAM]
> *"Explain the steps to create a scene in Three.js"* — the three mandatory objects (**Scene, Camera, Renderer**), then Mesh = **Geometry + Material**, then adding lights, then the **render loop** via `requestAnimationFrame`. Being able to say which classical OpenGL call each replaces is what turns a description into an answer.

---

**Next:** the two halves of a mesh — geometries and materials.
