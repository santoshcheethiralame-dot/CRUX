---
subject: arvr
unit: 2
order: 10
slug: opengl-programs-callbacks
title: OpenGL Programs and Control Functions
summary: The GLUT program skeleton, callback functions, and the three worked listings — first window, Sierpinski gasket, and the coloured cube.
minutes: 16
tags: [GLUT, callbacks, glutMainLoop, code, coloured-cube, glPushMatrix, event-driven]
---

# OpenGL Programs and Control Functions

## The GLUT skeleton

Every GLUT program has the same shape:

```c
int main(int argc, char* argv[])
{
    glutInit(&argc, argv);                       /* 1. initialise GLUT      */

    glutInitWindowSize(500, 500);                /* 2. configure the window */
    glutInitWindowPosition(0, 0);
    glutInitDisplayMode(GLUT_RGB);

    glutCreateWindow("My First OpenGL Window");  /* 3. create it            */

    glutDisplayFunc(display);                    /* 4. register callbacks   */

    glutMainLoop();                              /* 5. hand over control    */
}
```

> [!TRAP]
> **`glutMainLoop()` never returns.** Control passes permanently to GLUT, which waits for events and calls **your** functions when they occur. Any code you write after it will never run. This inversion — *"don't call us, we'll call you"* — is what **event-driven** means, and it is why all the real work lives in callbacks.

> [!EXAM]
> A course MCQ: *"`glutInitWindowSize()` sets the window size. What happens if it is not set?"* → **it defaults to 300 × 300.** (Not an error, not the previous value.)

## Callback functions

A **callback** is a function *you* write and *register* with GLUT; GLUT invokes it when the corresponding event happens.

| Registration | Called when | Signature |
|---|---|---|
| `glutDisplayFunc(display)` | The window must be **redrawn** | `void display(void)` |
| `glutKeyboardFunc(key)` | A **key** is pressed | `void key(unsigned char k, int x, int y)` |
| `glutMouseFunc(mouse)` | A **mouse button** changes state | `void mouse(int btn, int state, int x, int y)` |
| `glutMotionFunc(motion)` | The mouse **moves while a button is held** | `void motion(int x, int y)` |
| `glutReshapeFunc(reshape)` | The window is **resized** | `void reshape(int w, int h)` |
| `glutIdleFunc(idle)` | **Nothing else is happening** — used for animation | `void idle(void)` |

`glutPostRedisplay()` asks GLUT to schedule a redraw — this is how a callback triggers a new frame.

> [!NOTE]
> Callbacks are **category 5 and 6** of the six API categories: **input functions** (keyboard, mouse) and **control functions** (window management, the main loop). The categorisation you memorised in the API topic is not abstract — it is literally how the GLUT surface is organised.

## Listing 1 — setting the scene

```c
#include <gl/glut.h>
#include <stdlib.h>
#include <math.h>
#include <time.h>
#include <stdio.h>

/* Display callback — draws the required visualization */
void display()
{
    glClear(GL_COLOR_BUFFER_BIT);
    glutWireTeapot(0.5);
    glFlush();
}

int main(int argc, char* argv[])
{
    glutInit(&argc, argv);

    glutInitWindowSize(500, 500);
    glutInitWindowPosition(0, 0);
    glutInitDisplayMode(GLUT_RGB);

    glutCreateWindow("My First OpenGL Window");

    glutDisplayFunc(display);
    glutMainLoop();
}
```

Three functions do the work every frame: **`glClear`** wipes the buffer, the drawing calls issue geometry, and **`glFlush`** forces queued commands to execute.

## Listing 2 — the Sierpinski gasket

The display callback plots the accumulated points, changing colour each iteration:

```c
#define MAX 100000
double array[MAX][2];

void display()
{
    glClear(GL_COLOR_BUFFER_BIT);
    glPointSize(2);

    glBegin(GL_POINTS);
    for (int i = 0; i < MAX; i++)
    {
        glColor3f((float)(rand() % 255) / 255.0,     /* new colour per point */
                  (float)(rand() % 255) / 255.0,
                  (float)(rand() % 255) / 255.0);
        glVertex2dv(array[i]);
    }
    glEnd();
    glFlush();
}
```

The generator implements the midpoint rule from the gasket topic:

```c
void findMidPoint(double p1[2], double p2[2], double mid[2]) {
    mid[0] = (p1[0] + p2[0]) / 2;
    mid[1] = (p1[1] + p2[1]) / 2;
}

void generatePoints()
{
    initializeArray(array);           /* 3 triangle vertices + start point */
    for (int i = 0; i < MAX; i++) {
        int randomIndex = rand() % 3;              /* pick a vertex at random */
        /* midpoint of (last point, chosen vertex) becomes the next point */
        findMidPoint(array[randomIndex], array[3 + i], array[4 + i]);
    }
}
```

`srand(clock())` seeds the generator in `main` before `generatePoints()` is called.

> [!TRAP]
> The course listing contains a small bug worth spotting: `initializeArray` sets `array[3][0] = 0;` **twice** instead of setting `array[3][0]` and `array[3][1]`. The starting point's $y$ coordinate is therefore left uninitialised. Harmless in practice — the attractor pulls the sequence onto the gasket within a few iterations — but it is exactly the kind of thing to notice, and it is why one conventionally **discards the first few points**.

## Listing 3 — the coloured cube

Six faces, each a `GL_POLYGON` with its own colour set beforehand:

```c
void coloredCube()
{
    glColor3f(1.0f, 0.0f, 0.0f);           /* front face — red */
    glBegin(GL_POLYGON);
      glVertex3f(-1.0, -1.0,  1.0);
      glVertex3f( 1.0, -1.0,  1.0);
      glVertex3f( 1.0,  1.0,  1.0);
      glVertex3f(-1.0,  1.0,  1.0);
    glEnd();

    glColor3f(0.0f, 1.0f, 0.0f);           /* right face — green */
    glBegin(GL_POLYGON);
      glVertex3f(1, -1,  1);  glVertex3f(1,  1,  1);
      glVertex3f(1,  1, -1);  glVertex3f(1, -1, -1);
    glEnd();

    /* ... back (blue), left (yellow), top (cyan), bottom (magenta) ... */

    glFlush();
}

void display()
{
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
    gluLookAt(0, 0, 10,   0, 0, 0,   0, 1, 0);   /* eye, centre, up */
    coloredCube();
    glTranslatef(3, 0, 6);                        /* move, then draw again */
    coloredCube();
    glFlush();
}
```

Note the setup in `main`:

```c
glutInitDisplayMode(GLUT_RGB | GLUT_DEPTH);   /* request a DEPTH buffer */

glMatrixMode(GL_PROJECTION);
glLoadIdentity();
glOrtho(-10, 10, -10, 10, 10, -10);
gluPerspective(90, 1, 0.001, 1000);
```

> [!TRAP]
> **Two things in this listing are instructive precisely because they are wrong.**
>
> 1. **`glOrtho` followed by `gluPerspective`.** Both multiply into the *current* matrix, so the second silently compounds the first — the projection is neither cleanly orthographic nor cleanly perspective. You want **one or the other**, each preceded by `glLoadIdentity()`.
> 2. **No `glPushMatrix`/`glPopMatrix` around the `glTranslatef`.** The translation accumulates into the model-view matrix and leaks into everything drawn afterwards — including the *next frame*, since `display` runs repeatedly. The second cube drifts further away each redraw.
>
> Both are the **state-machine trap** from the API topic. The fix is the standard idiom:
>
> ```c
> glPushMatrix();
>     glTranslatef(3, 0, 6);
>     coloredCube();
> glPopMatrix();            /* restore — the translation is undone */
> ```

## `glPushMatrix` and `glPopMatrix`

> - **`glPushMatrix()`** — saves a **copy** of the current matrix onto a stack.
> - **`glPopMatrix()`** — restores the most recently saved matrix, discarding any changes made in between.

This gives you **scoped transformations**: changes inside a push/pop pair affect only what is drawn inside it. It is how you draw a scene of many independently-positioned objects without each one's transform contaminating the next — and it is a standard exam question in its own right.

> [!EXAM]
> Likely asks: *"Explain callback functions in OpenGL with examples of registering and using them"* · *"Describe `glPushMatrix` and `glPopMatrix`"* · *"Which sequence of transformation calls will first rotate an object and then move it?"* — remembering Unit 1's rule that with column vectors the **last call issued is applied first**, so to rotate-then-translate you call `glTranslatef` **before** `glRotatef`.

---

**Next:** specifying the camera, lights and materials that this geometry is viewed under.
