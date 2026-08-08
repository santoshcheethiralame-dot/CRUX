---
subject: arvr
unit: 1
order: 10
slug: convexity-convex-hull
title: Convexity and the Convex Hull
summary: The definition of a convex object, the convex hull, the seven named hull algorithms, Graham's scan pseudocode, and why graphics cares.
minutes: 14
tags: [convexity, convex-hull, graham-scan, jarvis-march, quickhull, collision-detection]
---

# Convexity and the Convex Hull

## Convexity

> **A convex object is defined by the property that, for any two points within it, the entire line segment connecting those points also lies within the object.** This property is essential in computational geometry and optimization problems.

| Term | Definition |
|---|---|
| **Convex object** | Any **line segment between two points inside the object remains entirely within it** |
| **Convex hull** | The **smallest convex polygon that completely encloses a given set of points** |
| **Applications** | Computer graphics, **collision detection**, computational geometry |

```
        CONVEX                       NOT CONVEX
     ┌───────────┐                  ┌─────┐
     │  •─────•  │                  │  •──┼──╮
     │           │                  │     │  │   the segment leaves
     │           │                  │  ╭──┘  │   the object
     └───────────┘                  └──┴─────╯
   every segment stays in        some segment exits
```

> [!INTUITION]
> Convexity is exactly the **convex combination** condition from the previous topic. A set is convex if, whenever $P$ and $Q$ are in it, every affine sum $\alpha_1 P + \alpha_2 Q$ with $\alpha_1 + \alpha_2 = 1$ **and both coefficients in $[0,1]$** is also in it. Convexity is affine sums, made into a property of a shape.
>
> The physical picture for the **hull**: hammer a nail into every point and stretch a rubber band around the outside. What the band settles into is the convex hull.

## Convex hull algorithms

Seven named algorithms — worth knowing by name even if only one is examined in detail:

- **Gift-Wrapping Algorithm (Jarvis March)**
- **Quickhull**
- **Divide and Conquer**
- **Monotone Chain**
- **Incremental Convex Hull Algorithm**
- **Chan's Algorithm**
- **Graham's Scan**

> [!NOTE]
> Complexities, for context (not stated in the course notes but frequently asked as a follow-up): Jarvis March is $O(nh)$ where $h$ is the number of hull points — good when the hull is small; **Graham's scan is $O(n\log n)$**, dominated by the sort; Chan's algorithm is the optimal $O(n\log h)$, combining the two.

## Graham's algorithm

The pseudocode as given:

```
GRAHAM'S ALGORITHM

Let p0 be the first point (lowermost, left if tie)
Let {p1, p2, p3 ... pn} be the rest of the points in
    lexicographic polar sort order

Stack.push(p0)
Stack.push(p1)
Stack.push(p2)

for (int i = 3; i <= m; i++)
{
    while angle from pi, stack.top, and stack.second is non-left
        Stack.pop()

    Stack.push(pi)
}
return the stack
```

**How to read it:**

1. **Anchor.** Pick $p_0$ as the **lowermost point** (leftmost if there is a tie). This point is guaranteed to be on the hull.
2. **Sort.** Order all remaining points by the **polar angle** they make with $p_0$.
3. **Scan.** Walk the sorted list maintaining a stack of candidate hull vertices. At each new point, check the turn made by *(stack second-from-top → stack top → new point)*:
   - a **left turn** (counter-clockwise) → the stack top is still a valid hull vertex; **push** the new point;
   - a **non-left turn** (right or straight) → the stack top is **inside** the hull; **pop** it and re-check.
4. The stack, at the end, is the hull in order.

> [!INTUITION]
> The "non-left turn → pop" rule is the whole algorithm. Walking anticlockwise around a convex polygon, **you only ever turn left**. The moment you would have to turn right, the vertex you are standing on must be a dent — so it cannot be on the hull, and you discard it. The `while` loop matters because removing one dent can expose another.

> [!TRAP]
> The turn test is a **cross-product sign**, not an angle computation. For consecutive points $A, B, C$:
> $$(B-A)\times(C-B) \;>\; 0 \Rightarrow \text{left turn}, \qquad <0 \Rightarrow \text{right}, \qquad =0 \Rightarrow \text{collinear}$$
> In 2D that "cross product" is the scalar $(B_x{-}A_x)(C_y{-}B_y) - (B_y{-}A_y)(C_x{-}B_x)$. Using `atan2` instead is slower and introduces floating-point trouble. Note also that **collinear counts as non-left** and gets popped — otherwise you keep redundant vertices along a straight edge.

## Applications of the convex hull

As listed in the course:

- **Geometry**
- **Robotic path planning**
- **Computer graphics**
- **Collision detection**
- **Shadows and lighting calculations**

> [!INTUITION]
> **Why AR/VR in particular cares.** Exact collision tests between two detailed meshes are far too slow at 90 fps. So engines test the **convex hulls** (or simpler bounding volumes) first: hulls are cheap to intersect, and if two hulls do not overlap, the meshes inside them certainly do not. Only on a hull-level hit do you pay for the exact test.
>
> The same logic drives **shadow volumes** and **frustum culling** — every one of them is "replace an awkward shape with the smallest convex shape containing it, and reason about that instead."

> [!EXAM]
> A recurring question gives you ~9 scattered 2D points and asks you to **find and plot the convex hull**. Method: (1) mark the lowest point; (2) sort the rest by polar angle around it; (3) walk the sorted order, discarding any vertex at which you would turn right; (4) list the hull vertices **in order** and draw the polygon. Show the discarded points — the method marks are in the turn tests, not the picture.

---

**Next:** transformations proper — what they are, and the rigid vs non-rigid split.
