---
subject: se
unit: 1
order: 1
slug: introduction-to-se
title: Introduction to Software Engineering
summary: Why software matters at scale, the failure case studies, the full terminology set, the software crisis and where the term came from, computer science versus software engineering, and the fundamental drivers.
minutes: 13
tags: [software-engineering, software-crisis, terminology, NATO-1968, FLURPS, drivers, case-studies]
---

# Introduction to Software Engineering

## Software is everywhere

> [!NOTE]
> **What is the most obvious driving force behind all these systems? SOFTWARE — lots of lines of code.**
>
> | System | Scale |
> |---|---|
> | **Boeing 787** avionics and online support | **6.5 million lines** — *more than the sum of all mechanical parts including nuts and bolts* |
> | **Google Chrome** | **6.7 million lines** (upper estimate) |
> | **Facebook** | **62 million lines** (minus backend) |
> | **A 90-minute outage at Amazon** | **\$2.8 million revenue loss** and lots of customers lost |

> [!INTUITION]
> The Boeing comparison is the one worth carrying. An aircraft is the archetypal *physical* engineering achievement — and yet **there is more engineering in its software than in every physical part combined**.
>
> That inverts where you would expect the difficulty to lie, and it is the whole reason this subject exists. Once software becomes the largest and most complex part of a system, **the discipline for building it has to be as serious as the discipline for building the wings.**

### What high-quality software needs

> [!NOTE]
> Any software system should have **all functionality up and running with minimum downtime**. To build software of high quality we need:
>
> - **Interaction with customers and stakeholders** on what exactly is needed
> - A **clear understanding of the end users** — who they are and how they will use the system
> - **Experts in multiple domains**
> - **Good planning**
> - **Team work**
> - **Ability to scale and support**
>
> Hence the need for **lots of engineers working in teams — teamwork is most important.**

---

## When software fails

The deck opens with real disasters, because they make the argument better than any definition can.

| Case | What happened |
|---|---|
| **Boeing 737 Max** | *"The many human errors that brought down the Boeing 737 Max"* — the MCAS control software and the decisions around it |
| **Ariane 5** | The European heavy-lift launcher developed by Arianespace for ESA — lost to a software exception |
| **Zenit 3SL (2000)** | Launch failed due to **faulty ground software not closing a valve** in the rocket's second-stage pneumatic system |
| **CryoSat-1 (2005)** | ESA satellite lost in launch failure due to a **missing shutdown command** in the flight control system of its Rokot carrier rocket |

> [!NOTE]
> The deck's chosen quote:
>
> > **"To err is human, but to really foul things up you need a computer."** — *Paul Ehrlich*

> [!INTUITION]
> Look at what actually failed in the last two: **a valve that did not close** and **a command that was not sent**. Not exotic algorithmic errors — small omissions, in software that had presumably been tested.
>
> That is the honest lesson of the case studies. **Catastrophic failures rarely come from hard problems handled badly; they come from easy problems handled carelessly at scale.** Everything in this unit — process models, requirements engineering, test planning — exists to catch exactly that kind of small omission before it reaches a rocket.

---

## Terminology

> [!EXAM]
> **Software — the comprehensive definition:**
> **Software is not just the programs, but also the associated documentation and configuration data needed to make those programs operate correctly, serving a computational purpose.**
>
> The "not just the programs" clause is the examinable part.

> [!NOTE]
> **What is a software system?** A software system usually consists of:
> - a number of **separate programs**,
> - **configuration files** used to set up those programs,
> - **system documentation** describing the structure of the system,
> - **user documentation** explaining how to use the system,
> - and **web sites** for users to download recent product information.

> [!NOTE]
> **Software product:** software that has been **developed and maintained for the benefit of a user base**, often to **satisfy a need in the market**.

### The two classifications

> [!EXAM]
> **Categories of software — two independent splits:**
>
> | | **System software** | **Application software** |
> |---|---|---|
> | Definition | Software designed to **provide a platform for other software** | Software that **allows users to do user-oriented tasks** |
> | Examples | Operating systems (macOS, Linux, Android), **game engines, search engines, industrial automation**, software-as-a-service | Create text documents, play or develop games, create presentations, listen to music, draw pictures, browse the web |
>
> | | **Generic / General software** | **Custom software** |
> |---|---|---|
> | Definition | **Stand-alone systems developed by a development organization and sold on the open market** to any customer able to buy them | A **bespoke design developed to meet one client's specific needs**, based on a budget and requirements predefined by them |
> | Fits | **Many clients' general requirements** | **One** client |

> [!TRAP]
> These are **two separate axes, not one four-way list**. An operating system is *system* software and also *generic*; a bank's in-house trading platform is *application* software and *custom*. A question asking you to classify something wants **both** labels.

### Engineering and software engineering

> [!NOTE]
> **Engineering** is the **application of science and mathematics to solve problems**. *While scientists come up with inventions, it is engineers who apply these discoveries to the real world. Engineers innovate.*
>
> **What is software engineering?**
> - An **approach to the development, operation, and maintenance of software, and the study of these approaches** — that is, **the application of engineering to software**.
> - Also defined as **a systematic approach to the analysis, design, assessment, implementation, testing, maintenance and re-engineering of software.**

Two further points the deck makes:

- The software engineering principle **drives usage of appropriate tools and techniques depending on the problem to be solved**, while **considering the constraints and resources available**.
- It **focuses more on techniques for developing and maintaining software that is correct from its inception.**

> [!INTUITION]
> *"Correct from its inception"* is doing a lot of work in that sentence. The alternative — write it, then find the defects — is exactly what the failure cases above show going wrong.
>
> Notice also that both definitions include **maintenance**. Software engineering is not "how to write a program"; it is **how to keep a system correct for years while people and requirements change around it.**

---

## The software crisis

> [!EXAM]
> **When did the term "Software Engineering" first appear?**
> At the **1968 NATO Software Engineering Conference**.
>
> **Why?** It was meant to **provoke thought regarding the perceived "software crisis"** at the time.
>
> **What was the software crisis?** The term described **the impact of rapid increases in computer power and the complexity of the problems that could be tackled** — in essence, **the difficulty of writing correct, understandable and verifiable computer programs**.
>
> **The roots of the software crisis are complexity, expectations, and change.**

> [!NOTE]
> The causes were linked to the **overall complexity of hardware and of the software development process**. It manifested in several ways:
>
> - Projects running **over-budget and over-time**
> - Software was **very inefficient and often of low quality**
> - Software **often did not meet requirements**
> - Projects were **unmanageable and code difficult to maintain**
> - Software was **never delivered**

> [!INTUITION]
> The crisis has a slightly counter-intuitive cause: **it was created by hardware getting better.** Cheaper, faster machines meant people attempted far more ambitious systems — and the methods that worked for small programs simply did not scale.
>
> The three roots are worth remembering as a triple. **Complexity** — the systems got bigger than one mind can hold. **Expectations** — capability grew faster than the ability to deliver it. **Change** — requirements would not stay still long enough to finish.

### The state of software projects

> [!EXAM]
> - **Only one in three software projects are truly successful.**
> - According to the **Standish Group's report** — based on analysis of **50,000 projects globally** — **66% of technology projects end in partial or total failure**, with **large projects most at risk**.
>
> **When is a software project defined as a failure?**
> - The software **did not satisfy the requirements** of the customer
> - The software release was **later than scheduled** (deadline violation)
> - The software had **too many bugs**

> [!TRAP]
> Note that **only one of those three failure criteria is about defects.** A project that works perfectly but arrives late, or arrives on time but solves the wrong problem, is counted as a failure just the same.
>
> That is why this unit spends far more time on **requirements** than on coding — the most expensive failure is building the wrong thing correctly.

---

## Computer science vs software engineering

> [!EXAM]
> **Is Computer Science the same as Software Engineering? NO.**
>
> - **Computer Science** is the **study of computation, automation and information**. It spans **theoretical disciplines** (algorithms, theory of computation, information theory, automation) to **practical disciplines** (the design and implementation of hardware and software).
> - **Software Engineering** typically deals with the **engineering principles of building, designing and testing software products.**
>
> The deck draws them as **two overlapping circles** — related and sharing ground, but neither contained in the other.

> [!INTUITION]
> A workable one-liner: **computer science asks what is possible and how efficiently; software engineering asks how to deliver it reliably, on time, with a team, and keep it working.**
>
> Sorting algorithms are computer science. Deciding which one your product needs, getting it reviewed, tested, documented and shipped without breaking the other 62 million lines — that is software engineering.

---

## Fundamental drivers of software engineering

> [!EXAM]
> **Industrial-strength software should:**
> - be **operational**
> - be **maintainable**
> - be **capable of being moved** (portable)
> - have **elaborate documentation**
> - have **no or minimal number of bugs**
> - be **impactful to the business**

The named drivers:

| Driver | What it demands |
|---|---|
| **Software is expensive** | Good software engineers are **at a premium and hence expensive**; **maintenance and rework cost money** |
| **Life-critical and mission-critical software** | Failure is not merely inconvenient |
| **Heterogeneity** | Systems should work as **distributed systems** |
| **Security and trust** | Software should be **trustworthy** and **secure** |
| **Diversity** | **Different types of software systems** |
| **Scale** | Software should be **scalable** |
| **Business and social changes** | Ability to **change existing software** and to **develop new software** |
| **Quality and productivity** | Measured through **FLURPS**, plus **portability, efficiency/maintainability** |
| **Consistency and repeatability** | Same process, same result |
| **Late and unreliable** | Typically **35% of computer-based projects are runaway** |

> [!EXAM]
> **FLURPS** — the quality attributes, worth memorising as an acronym:
>
> **F**unctionality · **L**ocalizability · **U**sability · **R**eliability · **P**erformance · **S**ecurity
>
> Plus **Portability** and **Efficiency/Maintainability** listed alongside.

> [!INTUITION]
> Read the driver list and notice how few entries are about *making the program work*. Almost all are about **the conditions around the software** — cost, teams, change, scale, distribution, security, business impact.
>
> That is the honest definition of the subject: **software engineering is what programming becomes once you add other people, a deadline, a budget, and a decade of maintenance.**

---

## Why software engineering is required — the summary

> [!EXAM]
> The deck's own closing list:
> - **Developing large programs**
> - **Mastering complexity** of big programs
> - **Efficient development of evolving software**
> - **Ensuring the software process supports users effectively** and that right choices and decisions are made
> - **Supporting large teams and team work**
> - **Ensuring visibility and continuity**

> [!NOTE]
> **About the course**, in its own words: *"This course will transform you from **programmers to Software Engineers**"* — working as a team; achieving **scale, maintainability, security, extensibility, compatibility and quality**; producing **deterministic and measurable results through structured methods**.
>
> And what it is **not** about: *"Programming, but more about **how** to program"*, and *"not rote learning, but becoming a better SW engineer"*.

---

**Next:** a failure that happened while this course was being written — **the CrowdStrike outage**.
