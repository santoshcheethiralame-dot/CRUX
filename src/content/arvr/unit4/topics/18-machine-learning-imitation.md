---
subject: arvr
unit: 4
order: 18
slug: machine-learning-imitation
title: AI and Deep Learning in AR/VR
summary: The four learning paradigms, imitation learning through behaviour cloning, inverse RL and GAIL, and the five named applications.
minutes: 14
tags: [machine-learning, reinforcement-learning, imitation-learning, behaviour-cloning, inverse-RL, GAIL, YOLO, KLT]
---

# AI and Deep Learning in AR/VR

## The four learning paradigms

| Paradigm | What it learns from | AR/VR example |
|---|---|---|
| **Supervised learning** | **Mapping inputs to labelled outputs** | **Image → pose** |
| **Unsupervised learning** | **Structure discovery** | Clustering |
| **Reinforcement learning (RL)** | **Trial and error via rewards** | Adaptive NPCs |
| **Imitation learning** | **Human demonstration** | Behaviour cloning, inverse RL, GAIL |

---

## Reinforcement learning

> **Trial-and-error via rewards.**

An agent takes **actions** in an **environment**, observes the resulting **state**, and receives a **reward**. Over many episodes it learns a **policy** — a mapping from state to action — that maximises cumulative reward.

> [!TRAP]
> A course MCQ asks for **the primary mechanism for guiding an agent to learn behaviours in a dynamic, interactive environment**. The answer: **the agent is guided to the desired behaviour through a reward function, promoting positive outcomes for correct actions.**
>
> The distractors offer pre-programmed instructions (that is not learning at all), supervised learning without guidance (RL is not supervised — there are no labelled correct actions), and a **punishment** function. Rewards can of course be negative, but the mechanism is framed as a **reward function**, and that is the expected wording.

> [!INTUITION]
> The defining feature of RL, and what makes it hard, is that **feedback is delayed and evaluative rather than instructive**. Supervised learning is told *"the right answer was X"*. RL is told only *"that sequence of fifty actions eventually scored 7"* — and must work out **which** of the fifty deserved credit. That is the **credit assignment problem**, and it is why RL needs enormous numbers of trials.

## Imitation learning

> **Learning from human demonstration.** Three approaches:

### 1. Behaviour cloning — supervised imitation

Record an expert's **(state, action)** pairs and train a supervised model to reproduce the mapping. Simple and effective, and it needs no reward function at all.

> [!TRAP]
> Behaviour cloning suffers **compounding error / distribution shift**. The model is trained only on states the **expert visited**. The moment it makes a small mistake it enters a state the expert never occupied and has no idea what to do — so the next action is worse, and the error snowballs.
>
> The classic illustration: a self-driving policy cloned from perfect driving has **never seen the car drifting toward the kerb**, because the expert never did. It therefore never learned to recover.

### 2. Inverse Reinforcement Learning (IRL)

> **Derives reward functions from expert behaviour.**

Rather than copying the actions, IRL infers **what the expert was trying to achieve** — recovering the reward function that makes the demonstrated behaviour optimal — then runs ordinary RL on it.

> [!INTUITION]
> The distinction is *imitating the behaviour* versus *inferring the intention*. Behaviour cloning learns **"here, they turned left"**; IRL learns **"they were trying to stay in the lane"**. Because it recovers the **goal**, an IRL agent can act sensibly in situations the expert never demonstrated — including recovering from mistakes. It is more robust and far more expensive.

### 3. Generative Adversarial Imitation Learning (GAIL)

Applies the **GAN** idea to imitation. A **discriminator** learns to tell expert trajectories from the agent's; the **agent (generator)** is trained to produce trajectories the discriminator cannot distinguish.

> [!INTUITION]
> GAIL sidesteps IRL's expensive inner loop. IRL must **infer a reward and then solve the whole RL problem** with it; GAIL lets the discriminator **act as** the reward signal directly — *"how expert-like does this look?"* — and improves it as the agent improves. It gets IRL-quality robustness at closer to behaviour-cloning cost.

| | **Behaviour cloning** | **Inverse RL** | **GAIL** |
|---|---|---|---|
| Learns | The **action mapping** | The **reward function** | A **discriminator** as implicit reward |
| Needs a reward function? | ❌ | ❌ (it infers one) | ❌ (it learns one) |
| Robust off-distribution | ❌ **compounding error** | ✅ | ✅ |
| Cost | **Low** | **Very high** | Moderate |

> [!EXAM]
> *"Differentiate imitation learning and reinforcement learning"* is question 9 in the course's question bank. The core distinction: **RL learns from a reward signal by trial and error, requiring a hand-designed reward and enormous exploration; imitation learning learns from expert demonstrations, requiring no reward function but needing good demonstrations.** Then give the three imitation approaches and note that **behaviour cloning is cheapest but suffers compounding error**, while **IRL and GAIL recover intent and are more robust**.

---

## The five applications

| Application | Method | Notes |
|---|---|---|
| **Object recognition** | **YOLO, SSD** for **AR scene labelling** | Single-pass detectors fast enough for real-time AR |
| **Gesture recognition** | **Optical flow, KLT tracker** | The same KLT from incremental tracking, applied to hands |
| **SLAM with neural networks** | Learning-based localisation and mapping | Learned features and depth prediction replacing hand-crafted ones |
| **Procedural content generation** | **GANs** for VR environment synthesis | Generating textures, terrain and layouts |
| **Adaptive NPCs** | **RL agents** for believable behaviours | Characters that improve or adapt to the player |

> [!NOTE]
> **Why YOLO and SSD specifically.** Earlier detectors (R-CNN and its successors) ran a classifier over many candidate regions — accurate but far too slow. **YOLO ("You Only Look Once") and SSD are single-pass**: one forward pass over the image produces all boxes and classes at once. That is what brings detection inside a frame budget, and it is the reason these two are the ones named for AR.

> [!INTUITION]
> Notice the pattern across the five: machine learning enters AR/VR at **exactly the points where hand-crafted methods hit their limits**.
> - Hand-crafted features (Harris, SIFT) fail under extreme appearance change → **learned features**.
> - Authored NPC behaviour hits combinatorial explosion → **RL and imitation learning**.
> - Hand-modelling every environment is unaffordable → **generative content**.
> - Rule-based gesture recognition cannot cope with human variability → **learned classifiers**.
>
> **ML is not replacing the pipeline — it is being inserted where the pipeline was weakest.**

---

## Where Unit 4 has arrived

```
   COMPUTER VISION ──▶ recovers the pose that inertial sensors cannot
        marker · IR · natural features · SLAM · visual odometry · outdoor

   3D SCANNING     ──▶ recovers the geometry that makes content inhabit the space

   INTERACTION     ──▶ the user acts (7 input modalities) and the system replies
                        (6 output modalities, including spatial audio and haptics)

   AI              ──▶ the world acts back
                        reactive (fast, predictable) · deliberative (plans)
                        · learned (adapts)
```

> [!INTUITION]
> The four units together tell one story. **Unit 1** built the coordinate mathematics; **Unit 2** turned it into pixels; **Unit 3** measured where the user is; **Unit 4** recovers what the world looks like, lets the user act on it, and gives it something to act back.
>
> And one architectural idea recurs at every level: **layer fast-and-approximate under slow-and-accurate**. IMU under vision. Incremental tracking under relocalisation. Tracking thread under mapping thread. GPS under bag-of-words under geometric verification. Reactive AI under deliberative AI. If you remember one thing from the subject beyond the formulas, make it that.

> [!EXAM]
> For *"AI and deep learning in AR/VR"*, cover: the **four paradigms**; **imitation learning's three approaches** with the compounding-error weakness of behaviour cloning; and the **five applications with their named methods** (**YOLO/SSD**, **optical flow/KLT**, learned SLAM, **GANs**, **RL** for NPCs). Naming the methods, not just the applications, is what the marks are for.

---

**End of Unit 4, and of the course.**
