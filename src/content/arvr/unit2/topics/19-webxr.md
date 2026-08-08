---
subject: arvr
unit: 2
order: 19
slug: webxr
title: WebXR — Putting the Scene on a Headset
summary: The WebXR Device API, immersive-vr versus immersive-ar, reference spaces, the XR frame loop, controllers and hit testing.
minutes: 14
tags: [webxr, immersive, reference-space, XR, hit-test, controllers, stereo, gap-fill]
---

# WebXR — Putting the Scene on a Headset

> [!NOTE]
> **Source note.** Gap-fill topic — not in the CAVE Lab booklet. Written against the syllabus item *"Three.JS with React and WebXR"* using the W3C WebXR Device API specification and current Three.js / `@react-three/xr` documentation. This is the bridge from Unit 2 into Units 3 and 4.

## What WebXR is

The **WebXR Device API** is the browser standard that gives a web page access to **headsets, AR-capable phones and their controllers**. It replaced the older WebVR API and covers both VR and AR through one interface.

What the browser gives you, and what it does **not**:

| WebXR provides | You still provide |
|---|---|
| The **pose** of the headset each frame (position + orientation) | The scene to render |
| One **viewport and projection matrix per eye** | The rendering (Three.js) |
| **Controller / hand poses** and button state | What interaction means |
| A **reference space** to express poses in | Application logic |
| **Hit testing** against the real world (AR) | Content placement |

> [!INTUITION]
> WebXR is essentially **a camera you do not control**. In Unit 1 you built the view matrix with `gluLookAt`; under WebXR the *headset* dictates it, twice per frame, one per eye. Your job shrinks to: *given this pose, draw the world.* Everything about frames, projection and concatenation still applies — you just no longer choose the camera.

## Enabling it in Three.js

```js
import { VRButton } from 'three/addons/webxr/VRButton.js';

renderer.xr.enabled = true;                     // 1. turn on XR
document.body.appendChild(VRButton.createButton(renderer));   // 2. entry UI

renderer.setAnimationLoop(() => {               // 3. XR-driven loop
  renderer.render(scene, camera);
});
```

> [!TRAP]
> **`requestAnimationFrame` must be replaced by `renderer.setAnimationLoop`.** In an immersive session the *headset* drives the frame timing — at 72, 90 or 120 Hz, independent of the browser's display refresh. Keeping `requestAnimationFrame` means the loop stops or runs at the wrong rate once the session starts. This is the single most common WebXR porting mistake.

## Session modes

| Mode | Meaning |
|---|---|
| `inline` | Rendered in the page, no immersion — a normal 3D canvas |
| **`immersive-vr`** | Fully immersive; the real world is replaced |
| **`immersive-ar`** | Immersive; the real world is **visible behind** the content (passthrough or see-through) |

```js
navigator.xr.isSessionSupported('immersive-ar').then((ok) => { /* ... */ });
```

> [!NOTE]
> The distinction is exactly Unit 3's **AR versus VR**, expressed as an API flag. In `immersive-ar` the renderer's clear colour becomes **transparent** so the real world shows through — which is why an AR scene must not draw a skybox or opaque background.

## Reference spaces — where is the origin?

A pose is meaningless without a frame (Unit 1, repeatedly). WebXR makes you choose one explicitly:

| Reference space | Origin | Use for |
|---|---|---|
| `viewer` | The **headset itself** — always at the origin | Head-locked content (rare; uncomfortable) |
| `local` | Roughly where the user was at session start | Seated experiences |
| `local-floor` | Same, but $y = 0$ is the **actual floor** | Standing experiences |
| `bounded-floor` | Floor-level with a **known safe polygon** | Room-scale with guardian bounds |
| `unbounded` | World-scale, may drift/re-localise | Large-area AR |

```js
const refSpace = await session.requestReferenceSpace('local-floor');
```

> [!INTUITION]
> This is the **world frame** of Unit 1, chosen at runtime — and the choice has real consequences. With `local`, a 1.7 m-tall avatar's feet may float or sink because the system does not know where the floor is. With `local-floor`, $y=0$ is genuinely the floor, so real-world scale is correct. **Picking the wrong reference space is the usual cause of "everything is the wrong height".**

## The XR frame loop

```js
renderer.setAnimationLoop((timestamp, frame) => {
  if (frame) {
    const pose = frame.getViewerPose(refSpace);
    if (pose) {
      for (const view of pose.views) {
        // one view per eye: view.transform, view.projectionMatrix
      }
    }
  }
  renderer.render(scene, camera);
});
```

Three.js consumes `pose.views` internally and renders once per eye into the correct viewport — this is **stereoscopic rendering** from Unit 3's software-workflow topic, and the reason the polygon budget is roughly halved.

> [!NOTE]
> `pose` **can be null** — tracking is lost when the headset is covered, the room goes dark, or the user leaves the tracked area. Robust applications check for null and hold the last known pose rather than snapping to the origin.

## Controllers and input

```js
const controller = renderer.xr.getController(0);
controller.addEventListener('selectstart', onSelectStart);
controller.addEventListener('selectend',   onSelectEnd);
scene.add(controller);

// a ray to point with
const ray = new THREE.Line(rayGeometry, rayMaterial);
controller.add(ray);
```

`getControllerGrip(i)` returns the grip pose (for rendering a controller model) while `getController(i)` returns the **pointing ray** pose. The `select` event is the standard "trigger pulled" action across all devices, including **hand tracking pinch** and gaze-and-tap on phones.

## Hit testing — anchoring AR content to the real world

```js
const session = await navigator.xr.requestSession('immersive-ar', {
  requiredFeatures: ['hit-test', 'local-floor']
});

const viewerSpace   = await session.requestReferenceSpace('viewer');
const hitTestSource = await session.requestHitTestSource({ space: viewerSpace });

// in the frame loop
const results = frame.getHitTestResults(hitTestSource);
if (results.length > 0) {
  const hitPose = results[0].getPose(refSpace);
  reticle.matrix.fromArray(hitPose.transform.matrix);   // show a placement ring
}
```

> [!INTUITION]
> Hit testing is the browser casting a ray from the device **into its understanding of the real world** and reporting where it lands — on a detected floor, table or wall. It is the mechanism behind every "tap to place the sofa" AR app, and it depends entirely on the **SLAM-based world model** the device maintains. **Unit 4 is the explanation of how that model is built**; WebXR is the interface that hands you the result.

## In React Three Fiber

```jsx
import { XR, createXRStore, XROrigin } from '@react-three/xr';

const store = createXRStore();

<button onClick={() => store.enterAR()}>Enter AR</button>

<Canvas>
  <XR store={store}>
    <XROrigin />
    <ambientLight />
    <Model />
  </XR>
</Canvas>
```

The `@react-three/xr` package wires WebXR into the R3F tree — controllers, hands and origin become components, and `store.enterVR()` / `store.enterAR()` start the session.

> [!TRAP]
> **WebXR requires a secure context — HTTPS or `localhost`.** An AR page served over plain HTTP will silently report no XR support. During development, use `localhost` or an HTTPS tunnel; this catches almost everyone once.

> [!EXAM]
> *"What is WebXR and how is it used with Three.js?"* — the browser API for headsets and AR devices, superseding WebVR; enabled with `renderer.xr.enabled` plus `VRButton`/`ARButton`; **`setAnimationLoop` replaces `requestAnimationFrame`** because the headset drives timing; **session modes** `immersive-vr` vs `immersive-ar`; **reference spaces** define the origin (`local-floor` for standing); the loop gets a **pose with one view per eye** for stereo rendering; input via `select` events; and **hit testing** anchors AR content to real surfaces.

---

**End of Unit 2.** The arc: an application talks to the graphics system through an **API**, the hardware runs a **pipeline** whose vertex and fragment stages you can program, geometry is **projected** from 3D to 2D, and the same ideas reappear in the browser as **Three.js**, authored in **Blender**, composed in **React**, and delivered to a headset through **WebXR**. Units 3 and 4 turn to the headset itself — how it knows where it is, and what it does with that knowledge.
