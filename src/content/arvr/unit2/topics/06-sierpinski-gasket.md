---
subject: arvr
unit: 2
order: 6
slug: sierpinski-gasket
title: The Sierpinski Gasket
summary: The random midpoint algorithm, three display strategies (immediate, store-then-display, GPU), and the recursive three-dimensional variant.
minutes: 13
tags: [sierpinski, fractal, recursion, display-algorithm, GPU, self-similar]
---

# The Sierpinski Gasket

## What it is

> The **Sierpinski Gasket** is a well-known **fractal** shape with a long history, studied in areas such as **fractal geometry and chaos theory**.
>
> - It can be generated both **recursively and randomly**, but **in the limit it exhibits structured, non-random properties**.
> - The gasket is a **self-similar structure** — it looks the same at different levels of magnification.

> [!INTUITION]
> The gasket is the course's opening program for a reason: it produces something visually striking from **almost no code**, and it makes the point that **simple rules generate complex, structured patterns**. It also has the pleasing property that a *random* process converges to a *deterministic* shape — the randomness picks the path, not the destination.

## The basic algorithm

> **1. Start with a triangle**
> - Choose an initial point $p = (x, y, 0)$ randomly **inside** the triangle.
>
> **2. Iterate using a random process**
> - **Select one of the three vertices at random.**
> - Find a new point $q$, located **halfway between $p$ and the selected vertex**.
>
> **3. Mark and update**
> - Place a marker (e.g. a small circle) at $q$ to visualize the point.
> - **Set $p = q$** and repeat from Step 2.
>
> **4. Continue indefinitely**
> - As the number of iterations increases, the **Sierpinski Gasket pattern emerges**.
> - Despite the randomness in selecting vertices, the final structure is **highly ordered and predictable**.

> This process effectively demonstrates **how simple rules can generate complex, structured patterns** — a key concept in fractal geometry.

> [!NOTE]
> Why does it work? The midpoint step is exactly the **affine sum** $q = \tfrac12 p + \tfrac12 V$ from Unit 1 — a convex combination, so $q$ always stays inside the triangle. And the map halves every distance, so any point is pulled toward the fractal *attractor* and can never escape it. This is the **Chaos Game**, the simplest example of an iterated function system.

## Three display strategies

The same algorithm, written three ways — the difference is *when* the points reach the screen, and it maps directly onto the history of graphics hardware.

### 1. Basic display algorithm — draw immediately

```c
main()
{
    initialize_the_system();
    p = find_initial_point();
    for (some_number_of_points)
    {
        q = generate_a_point(p);
        display_the_point(q);      /* draw it right now */
        p = q;
    }
    cleanup();
}
```

### 2. Store and display later

```c
main()
{
    initialize_the_system();
    p = find_initial_point();
    for (some_number_of_points)
    {
        q = generate_a_point(p);
        store_the_point(q);        /* accumulate in memory */
        p = q;
    }
    display_all_points();          /* one bulk draw */
    cleanup();
}
```

### 3. Use the GPU for display

```c
main()
{
    initialize_the_system();
    p = find_initial_point();
    for (some_number_of_points)
    {
        q = generate_a_point(p);
        store_the_point(q);
        p = q;
    }
    send_all_points_to_GPU();      /* upload once */
    display_data_on_GPU();         /* GPU draws from its own memory */
    cleanup();
}
```

### Why the third version wins

| Strategy | Cost per frame | Analogy |
|---|---|---|
| **Immediate** | One draw call **per point** — the CPU talks to the graphics system 100,000 times | Posting 100,000 letters individually |
| **Store then display** | One bulk draw — but the data still crosses the bus each frame | Posting one parcel containing 100,000 letters, every day |
| **GPU** | Data lives in GPU memory; a **single draw call** replays it | Leaving the parcel at the destination and pointing at it |

> [!INTUITION]
> This is the **display list** idea from the graphics-architectures topic, reappearing exactly. *Stop re-sending the description; store it near the display and replay it.* In modern OpenGL the mechanism is a **vertex buffer object (VBO)**, and the "replay" is one `glDrawArrays` call.

## Polygons and recursion — the deterministic version

The random midpoint game is one way to generate the gasket. The other is **recursive subdivision**, which the syllabus lists as *Polygon and Recursion*:

```
subdivide(triangle T, int depth)
{
    if (depth == 0)
        draw(T);
    else {
        find the midpoints of T's three edges
        → this splits T into 4 sub-triangles
        discard the middle one
        for each of the 3 remaining corner triangles
            subdivide(that triangle, depth - 1)
    }
}
```

At depth $n$ this draws $3^n$ triangles and removes the middle one at every level — producing the same figure the random process converges to.

> [!NOTE]
> **The three-dimensional gasket** extends this to a **tetrahedron**: subdivide each of the four faces, discard the centre, and recurse — giving $4^n$ tetrahedra (the *Sierpinski tetrahedron*). This is where the course's **coloured cube** code becomes relevant: you need real 3D primitives, a depth buffer for hidden-surface removal, and per-face colours to see the structure at all.

> [!EXAM]
> Two reliable questions. *"Write the algorithm for generating the Sierpinski gasket"* — give the four numbered steps, and say explicitly that the randomness converges to an ordered, self-similar fractal. *"Compare the three display approaches"* — the table above, with the punchline that the **GPU version eliminates per-frame CPU–GPU traffic**.

> [!TRAP]
> The random version needs the initial point to be **inside** the triangle, and it is conventional to **discard the first few iterations** before plotting — early points may sit off the attractor and would show as stray dots. The course's own code uses the centroid as the starting point, which avoids the problem.

---

**Next:** the API this is all written against.
