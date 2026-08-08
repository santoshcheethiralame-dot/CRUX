---
subject: arvr
unit: 2
order: 18
slug: react-three-fiber
title: Three.js with React — React Three Fiber
summary: The declarative reconciler for Three.js, how JSX maps to scene-graph objects, useFrame, and the drei helper library.
minutes: 12
tags: [react-three-fiber, R3F, react, declarative, useFrame, drei, gap-fill]
---

# Three.js with React — React Three Fiber

> [!NOTE]
> **Source note.** Gap-fill topic — not in the CAVE Lab booklet. Written against the syllabus item *"Three.JS with React and WebXR"* using current React Three Fiber documentation.

## The idea

**React Three Fiber (R3F)** is a **React renderer for Three.js**. Instead of imperatively creating objects and adding them to a scene, you **describe the scene as a component tree** and React keeps the Three.js scene graph in sync.

Crucially, **it is not a wrapper or a re-implementation** — R3F builds real Three.js objects. Anything you know from the previous topics still applies; only the way you express it changes.

## Imperative versus declarative

**Plain Three.js:**

```js
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 'orange' });
const mesh     = new THREE.Mesh(geometry, material);
mesh.position.set(0, 1, 0);
scene.add(mesh);
```

**React Three Fiber:**

```jsx
<mesh position={[0, 1, 0]}>
  <boxGeometry args={[1, 1, 1]} />
  <meshStandardMaterial color="orange" />
</mesh>
```

> [!INTUITION]
> **Every Three.js class becomes a lower-case JSX element.** `THREE.Mesh` → `<mesh>`, `THREE.BoxGeometry` → `<boxGeometry>`, `THREE.PointLight` → `<pointLight>`. There is no list of supported components to memorise — the whole Three.js namespace is available automatically, and so is anything you write yourself and register.

**The two conventions to learn:**

| Convention | Meaning |
|---|---|
| **`args={[...]}`** | Arguments to the **constructor** — `args={[1,1,1]}` is `new BoxGeometry(1,1,1)` |
| **props** | Anything you would **set on the instance** — `position`, `rotation`, `color`, `roughness` |

Nesting expresses both **the scene graph** (a `<mesh>` inside a `<group>` becomes a child) and **attachment** (a `<boxGeometry>` inside a `<mesh>` becomes its `geometry`).

## A complete app

```jsx
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';

function Box(props) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  // runs every frame — this is the render loop
  useFrame((state, delta) => {
    ref.current.rotation.y += delta;      // delta-time, as always
  });

  return (
    <mesh
      {...props}
      ref={ref}
      scale={hovered ? 1.4 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 7]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[ 1.2, 0, 0]} />
    </Canvas>
  );
}
```

`<Canvas>` creates the **scene, camera, renderer and render loop** — the three mandatory objects plus `requestAnimationFrame`, in one element.

## What R3F gives you for free

| Feature | Detail |
|---|---|
| **Render loop** | `useFrame(callback)` — receives `state` and **`delta`**, so frame-rate independence is the default |
| **Raycasting / events** | `onClick`, `onPointerOver`, `onPointerOut`, `onPointerMove` work on any mesh, with no manual `Raycaster` |
| **Automatic resize** | The canvas observes its container and updates aspect + projection matrix |
| **Automatic disposal** | Unmounting a component **disposes its geometries, materials and textures** — the GPU leak from the materials topic, solved structurally |
| **State integration** | Scene contents are driven by React state, so UI and 3D stay in sync with no glue code |

> [!TRAP]
> **`useFrame` runs up to 120 times a second — never call `setState` inside it.** Doing so triggers a React re-render every frame and destroys performance. Mutate the object directly through a **ref** (`ref.current.rotation.y += delta`), exactly as the example does. React state is for things that change *occasionally* (hovered, selected, level loaded); refs are for things that change *every frame*.

## drei

**`@react-three/drei`** is the companion helper library — the pieces almost every project needs:

```jsx
import { OrbitControls, Environment, useGLTF, Text, Html } from '@react-three/drei';

function Model() {
  const { scene } = useGLTF('/models/character.glb');
  return <primitive object={scene} />;     // drop a loaded Three.js object in
}

<Canvas>
  <Environment preset="sunset" />          {/* image-based lighting */}
  <Model />
  <Text fontSize={0.5}>Hello AR</Text>
  <OrbitControls />                        {/* mouse orbit/zoom/pan */}
</Canvas>
```

`<primitive object={...}>` is the escape hatch for inserting **any** existing Three.js object into the tree — the bridge back to imperative code.

> [!NOTE]
> **`<Suspense>` and loading.** `useGLTF` suspends while the model downloads, so wrap 3D content in `<Suspense fallback={...}>`. This matters in AR/VR, where models are large and you must show *something* rather than a frozen frame.

> [!EXAM]
> *"What is React Three Fiber and how does it differ from plain Three.js?"* — it is a **React renderer for Three.js** that builds **real Three.js objects** from a declarative component tree; `<Canvas>` supplies scene/camera/renderer/loop; Three.js classes map to lower-case JSX with **`args` for constructor arguments and props for instance properties**; `useFrame` replaces the manual `requestAnimationFrame`; and it adds events, resize handling and **automatic disposal**. The headline benefit is that the scene becomes a **function of application state** instead of something you mutate by hand.

---

**Next:** putting the scene on a headset.
