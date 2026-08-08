---
subject: arvr
unit: 2
order: 16
slug: threejs-animation-physics
title: Three.js — Animation and Physics
summary: Frame-rate-independent animation, the Clock, skeletal animation with AnimationMixer, and adding a physics engine.
minutes: 14
tags: [threejs, animation, AnimationMixer, delta-time, physics, rapier, collision, gap-fill]
---

# Three.js — Animation and Physics

> [!NOTE]
> **Source note.** Gap-fill topic — not in the CAVE Lab booklet. Written against the syllabus items *"Animations"* and *"Adding Physics"* from the prescribed O'Reilly text and current library documentation.

## The frame-rate problem

The naïve render loop from the scene topic contains a bug:

```js
cube.rotation.y += 0.01;   // ❌ speed depends on frame rate
```

At 60 fps this rotates 0.6 rad/s; at 144 fps, 1.44 rad/s. The same code runs at **different speeds on different machines** — and in VR, where headsets run at 72, 90 or 120 Hz, that is guaranteed to matter.

**The fix: scale by elapsed time.**

```js
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();      // seconds since the last frame
  cube.rotation.y += 1.0 * delta;      // ✅ 1 radian per SECOND, always

  renderer.render(scene, camera);
}
```

> [!INTUITION]
> **Animate against time, never against frames.** `delta` is the contract between your simulation and whatever hardware it lands on. Every animation, physics step and interpolation in this topic depends on it, and it is the first thing to check when something "runs too fast on the good PC".

> [!TRAP]
> `clock.getDelta()` **resets the internal timer each call** — calling it twice in one frame gives the second caller ≈0. Call it **once**, store the result, pass it around. Use `clock.getElapsedTime()` when you want total time instead.

## Interpolation and easing

For moving between two states, interpolate:

```js
// linear interpolation toward a target
cube.position.lerp(targetPosition, 0.1);

// spherical interpolation for ROTATIONS — use quaternions
cube.quaternion.slerp(targetQuaternion, 0.1);
```

> [!NOTE]
> `slerp` is Unit 1's **spherical linear interpolation**, and the reason for it is unchanged: interpolating quaternions along the 4D unit sphere gives **constant angular velocity**, while lerping Euler angles or matrices produces uneven, sometimes wildly wrong motion. Three.js also handles the **double-cover sign check** internally so rotations take the short way round.

## Skeletal animation — AnimationMixer

Animations authored in Blender and exported in a glTF file arrive as **AnimationClips**:

```js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let mixer;
new GLTFLoader().load('/models/character.glb', (gltf) => {
  scene.add(gltf.scene);

  mixer = new THREE.AnimationMixer(gltf.scene);
  const action = mixer.clipAction(gltf.animations[0]);   // e.g. "Walk"
  action.play();
});

// in the render loop
if (mixer) mixer.update(delta);      // the mixer is driven by delta too
```

| Object | Role |
|---|---|
| **AnimationClip** | The authored data — keyframes for a named animation ("Walk", "Idle") |
| **AnimationMixer** | The per-model player that advances time and blends clips |
| **AnimationAction** | One clip playing on one mixer — has `play()`, `stop()`, `fadeIn()`, weight, loop mode |

Blending between clips is what makes character motion look continuous:

```js
walkAction.crossFadeTo(runAction, 0.3, true);   // blend over 0.3 s
```

## Adding physics

Three.js **renders**; it does not simulate. Physics needs a separate engine, and the two are joined by copying transforms each frame.

| Engine | Notes |
|---|---|
| **Rapier** (`@dimforge/rapier3d`) | Rust/WASM, fast, actively developed — the current default choice |
| **Cannon-es** | Pure JS, simple, good for teaching |
| **Ammo.js** | Bullet compiled to WASM — powerful, heavier API |

### The integration pattern

```js
import RAPIER from '@dimforge/rapier3d-compat';

await RAPIER.init();
const world = new RAPIER.World({ x: 0, y: -9.81, z: 0 });   // gravity

// a dynamic body + its collider
const body = world.createRigidBody(
  RAPIER.RigidBodyDesc.dynamic().setTranslation(0, 5, 0)
);
world.createCollider(RAPIER.ColliderDesc.cuboid(0.5, 0.5, 0.5), body);

// a static floor
const floor = world.createRigidBody(RAPIER.RigidBodyDesc.fixed());
world.createCollider(RAPIER.ColliderDesc.cuboid(10, 0.1, 10), floor);

function animate() {
  requestAnimationFrame(animate);

  world.step();                            // 1. advance the simulation

  const t = body.translation();            // 2. copy transform → mesh
  const r = body.rotation();
  cube.position.set(t.x, t.y, t.z);
  cube.quaternion.set(r.x, r.y, r.z, r.w);

  renderer.render(scene, camera);          // 3. draw
}
```

> [!INTUITION]
> **The physics world and the scene graph are two separate universes** that you keep in sync by copying. The physics engine owns the truth about position and orientation; Three.js owns the truth about appearance. Every frame: **step, copy, render.** Almost every physics bug in a Three.js app is a synchronisation mistake — copying in the wrong order, or forgetting to copy rotation.
>
> Note the rotation is copied as a **quaternion** — physics engines use them for exactly the reasons from Unit 1.

### Body types

| Type | Moves? | Affected by forces? | Use for |
|---|---|---|---|
| **Dynamic** | ✅ | ✅ | Falling, colliding objects |
| **Fixed / static** | ❌ | ❌ | Floors, walls, terrain |
| **Kinematic** | ✅ (you set it) | ❌ | Moving platforms, **the VR controller** |

> [!NOTE]
> **Colliders are not the render mesh.** You attach a simple convex shape — cuboid, sphere, capsule, or a convex hull — because exact mesh-vs-mesh intersection is far too slow at 90 fps. This is precisely the **convex hull** argument from Unit 1: replace an awkward shape with the smallest convex shape containing it and reason about that instead.

> [!TRAP]
> **Fixed vs variable timestep.** Physics engines are stable only at a **fixed** step (typically 1/60 s). Feeding a variable `delta` straight into `world.step()` makes the simulation behave differently on different hardware and can explode at low frame rates. The standard fix is an **accumulator**:
>
> ```js
> accumulator += delta;
> while (accumulator >= 1/60) { world.step(); accumulator -= 1/60; }
> ```
>
> This decouples the physics rate from the render rate — essential in VR, where the render rate is dictated by the headset.

> [!EXAM]
> *"How are animations and physics added to a Three.js scene?"* — cover: (1) **delta-time** animation and why frame-dependent updates are wrong; (2) `AnimationMixer` / clip / action for skeletal animation from glTF; (3) physics as a **separate engine** with the **step → copy → render** loop; (4) body types and why colliders are simplified shapes.

---

**Next:** where the models and animations come from.
