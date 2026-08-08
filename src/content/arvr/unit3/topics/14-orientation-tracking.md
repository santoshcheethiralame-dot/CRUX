---
subject: arvr
unit: 3
order: 14
slug: orientation-tracking
title: Tracking 2D and 3D Orientation
summary: From angular velocity to orientation — the incremental rotation quaternion, recursive composition, and the worked gyroscope integration.
minutes: 14
tags: [orientation, quaternion, gyroscope, integration, 2D-rotation, dead-reckoning, worked-example]
---

# Tracking 2D and 3D Orientation

## The problem

A gyroscope reports **angular velocity**, not orientation. Tracking orientation means **integrating** that stream into a running estimate — and doing it in a representation that does not degenerate.

## 2D orientation

In 2D there is only **one** rotational degree of freedom, so integration is scalar addition:

$$\theta_{k+1} = \theta_k + \omega_k \,\Delta t$$

A point at radius $r$ then sits at $(r\cos\theta,\ r\sin\theta)$.

> [!EXAM]
> The course asks this directly: *"The 1D gyroscope readings for 10 seconds are $\omega_1 \dots \omega_{10}$; with the initial position of the rigid body at $(1,0)$, what is the final position, with a time step of 1 second?"*
>
> **Method:**
> 1. **Sum** the readings — with $\Delta t = 1$ s, the total rotation is simply $\theta = \sum_k \omega_k$ (in degrees, if the readings are °/s).
> 2. **Reduce modulo 360°** if needed.
> 3. **Rotate the initial point** by that angle: $(1,0) \to (\cos\theta,\ \sin\theta)$.
>
> For the deck's values $8.01, 0.27, 5.04, 5.85, 3.06, 4.05, 2.88, 8.28, 4.59, 2.97$ the sum is **45.0°**, giving
> $$(\cos 45°,\ \sin 45°) = \mathbf{(0.707,\ 0.707)}$$
> which is option (a). The numbers are chosen to sum to exactly 45 — if your total is not a recognisable angle, re-add them.

## 3D orientation — why quaternions

In 3D there are **three** rotational degrees of freedom and rotations **do not commute**, so you cannot simply add angles. The course's answer, and the standard one:

> To accurately track user orientation and object rotations in 3D, complex mathematical representations like **quaternions** are used instead of traditional Euler angles, as they help **avoid issues like gimbal lock** and provide **smooth, continuous rotational transitions**.

## The incremental rotation quaternion

> In AR/VR systems, **gyroscopes measure angular velocity $\omega$**, which can be **converted into a quaternion to update the orientation** of a virtual object or the user's viewpoint.
>
> The **incremental change in orientation, or rotation quaternion $\Delta q$**, for a small angular displacement over a time interval is:
>
> $$\Delta q = \left(\cos\tfrac{\theta}{2},\ \ \sin\tfrac{\theta}{2}\cdot\hat{\mathbf{u}}\right)$$
>
> where **$\theta$ is the rotation angle** (derived from **integrating angular velocity over time**) and **$\hat{\mathbf u}$ is the unit vector along the axis of rotation**.

This is exactly Unit 1's axis-angle → quaternion formula, applied per sample.

### Building $\theta$ and $\hat{\mathbf u}$ from the gyro

Given a gyroscope reading $\boldsymbol\omega = (\omega_x, \omega_y, \omega_z)$ over an interval $\Delta t$:

$$\theta = \lVert\boldsymbol\omega\rVert\,\Delta t \qquad\qquad \hat{\mathbf u} = \frac{\boldsymbol\omega}{\lVert\boldsymbol\omega\rVert}$$

The **magnitude** of the angular-velocity vector is the rotation *rate*; its **direction** is the axis.

## Composing — the recursive update

Each new $\Delta q$ is **multiplied** onto the running orientation:

$$q_{k+1} = q_k \otimes \Delta q_k$$

> [!TRAP]
> A course MCQ asks: *"if a rigid body undergoes a series of rotations each represented by a delta quaternion, how is the final orientation computed recursively?"* The answer is **by multiplying each delta quaternion with the running quaternion** — **not** by adding, subtracting or dividing.
>
> Quaternions **compose by multiplication**, exactly like rotation matrices, because that is what composing rotations means. Adding two unit quaternions does not even produce a unit quaternion, let alone the right rotation.
>
> **Order matters**, and it encodes the frame: $q_k \otimes \Delta q$ applies the increment in the **body frame** (the gyro is bolted to the body, so this is the usual choice); $\Delta q \otimes q_k$ would apply it in the **global frame**.

## Re-normalisation

Repeated multiplication accumulates floating-point error, so $\lVert q\rVert$ drifts away from 1 and the "rotation" begins to scale as well as rotate. Every implementation therefore periodically:

$$q \leftarrow \frac{q}{\lVert q \rVert}$$

This is **step 4 of the sensor-fusion pipeline** two topics from now.

---

## Worked example

*"You are provided with calibrated rates from a gyroscope: $\boldsymbol\omega = (5.73,\ 11.46,\ 17.19)$ degrees per second, representing the angular rates around the $x$, $y$ and $z$ axes. What is the orientation of the rigid body? Represent it as a quaternion $(w,x,y,z)$."*

**Step 1 — magnitude (the rotation rate).**

$$\lVert\boldsymbol\omega\rVert = \sqrt{5.73^2 + 11.46^2 + 17.19^2} = \sqrt{32.83 + 131.33 + 295.50} = \sqrt{459.66} = 21.44°/\text{s}$$

**Step 2 — axis.**

$$\hat{\mathbf u} = \frac{(5.73,\ 11.46,\ 17.19)}{21.44} = (0.267,\ 0.535,\ 0.802)$$

**Step 3 — angle over the interval.** Taking $\Delta t = 1$ s:

$$\theta = 21.44° \qquad \theta/2 = 10.72°$$

**Step 4 — assemble.**

$$w = \cos 10.72° = 0.9826$$
$$(x, y, z) = (0.267,\ 0.535,\ 0.802) \times \sin 10.72° = (0.267,\ 0.535,\ 0.802) \times 0.1860$$
$$= (0.0497,\ 0.0995,\ 0.1492)$$

$$\boxed{q = (0.983,\ 0.050,\ 0.100,\ 0.149)}$$

**Check:** $0.9655 + 0.0025 + 0.0099 + 0.0223 = 1.0002 \approx 1$ ✔ And $w$ close to 1 matches a small (21°) rotation ✔

> [!NOTE]
> Notice the axis $(0.267, 0.535, 0.802)$ is in the ratio $1 : 2 : 3$ — the input rates were chosen as multiples of 5.73°/s ($\approx 0.1$ rad/s). Spotting that ratio is a quick sanity check on your normalisation.

> [!EXAM]
> For any "gyro → quaternion" problem, always: (1) compute $\lVert\boldsymbol\omega\rVert$ — this is the **rate**; (2) normalise to get the **axis**; (3) multiply by $\Delta t$ for the **angle**, and **halve it**; (4) assemble $(\cos\frac\theta2,\ \hat{\mathbf u}\sin\frac\theta2)$; (5) **check the norm is 1**. State $\Delta t$ explicitly if the question leaves it implicit.

## Dead reckoning and its limit

Integrating sensor readings forward from a known start is **dead reckoning**. It works beautifully for a few seconds and then fails, because — as the previous topic derived — the gyro's bias integrates into **linearly growing drift**.

> [!INTUITION]
> Orientation tracking by gyroscope alone is like navigating by counting your steps with your eyes closed. Accurate at first; hopeless after a minute. **You need to open your eyes occasionally** — which is what the accelerometer (gravity) and magnetometer (north) provide, and why fusion is not optional.

---

**Next:** the harder half of the pose — position.
