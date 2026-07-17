---
subject: se
unit: 3
order: 1
slug: ai-ml-for-se
title: AI & Machine Learning for Software Engineering
summary: ML fundamentals and the black-box problem, how SE and ML differ, the two integration directions (AI4SE vs SE4AI), AI's role across the SDLC, and its benefits and risks.
minutes: 14
tags: [machine-learning, AI4SE, SE4AI, SDLC, generative-AI]
---

# AI & Machine Learning for Software Engineering

## ML & AI fundamentals

> [!NOTE]
> **Machine Learning (ML)** is a branch of **Artificial Intelligence** that enables systems to **learn automatically from data and improve with experience without being explicitly programmed** — *"systems learn from data patterns instead of explicit instructions."*

The goal: make computers **mimic human learning/decision-making** and turn traditional programming into **data-driven** problem solving.

### Types of ML
| Type | Learns from | Example |
|---|---|---|
| **Supervised** | **Labeled** data (input + known output) | Predicting house prices |
| **Unsupervised** | **Unlabeled** data (finds patterns) | Customer segmentation |
| **Reinforcement** | **Trial & error**, maximizing rewards | Autonomous vehicles, game AI |

### The black-box problem & trade-offs
ML systems are often **non-transparent**: inputs and outputs are visible, but the internal reasoning is hidden (e.g. a neural network). The challenge is **explainability and trust**. Key trade-offs to balance: **accuracy**, **capabilities**, **training-data needed**, **explainability**, **inference latency** (time to predict on new input), **learning latency** (time to train), and **model size** (number of parameters).

> [!INTUITION]
> A **black box** takes input and gives output, but you can't easily see *why*. That's fine for recommending a movie, but dangerous for approving a loan or driving a car — which is exactly why **explainability** is a first-class quality attribute in ML systems.

## SE vs ML — two different worlds

| Aspect | Software Engineering | Machine Learning |
|---|---|---|
| **Basis** | Requirements & specifications | Data & algorithms |
| **Approach** | Structured (Waterfall, Agile) | Experimental & iterative |
| **Evaluation** | Functional correctness | Accuracy, precision, recall |
| **Output** | Predictable, **deterministic** code | Probabilistic, **data-driven** model |
| **Focus** | System design, maintainability | Model accuracy, adaptability |

> [!EXAM]
> The one-line contrast: **ML is data-driven; SE is process-driven.** Traditional code is *deterministic* (same input → same output); an ML model is *probabilistic*. Integrating both needs new methods, tools and mindsets.

## Two ways SE and ML connect

> [!NOTE]
> - **AI for Software Engineering (AI4SE)** — using **AI tools to improve SE tasks** (code completion, test automation, project management).
> - **Software Engineering for AI (SE4AI)** — applying **SE principles to build reliable AI systems** (scalability, safety, maintainability of models).

This topic and the next cover **AI4SE**; the following topic covers **SE4AI**.

## AI *in* Software Engineering (AI4SE)

Generative AI **accelerates routine tasks and augments human judgment — it does not replace the SDLC.** Ten application areas: ① code generation ② bug detection & fixing ③ testing automation ④ project management ⑤ documentation ⑥ refactoring & optimization ⑦ security enhancement ⑧ DevOps & CI/CD ⑨ UX design ⑩ architecture design.

### AI across the SDLC
| Phase | AI-Enhanced method | Human responsibility |
|---|---|---|
| Requirements | AI chatbots for elicitation, auto-specs | **Validate** AI output |
| Design | Pattern recommendation, auto-diagramming | Assess trade-offs |
| Implementation | AI pair programmers (Copilot) | **Review/verify** code |
| Testing | AI test generation, fuzzing | Define acceptance tests |
| Deployment | Predictive CI/CD optimization | Define rollback policies |
| Maintenance | AI bug triage, refactoring suggestions | Prioritize fixes |

### Benefits & risks
**Benefits:** boosts productivity/speed, helps new programmers, automates repetitive work, improves code quality & test coverage.
**Risks:** generated code may be **incorrect or insecure**; **over-reliance** on tools; **reduced critical thinking** (Lee et al., 2025); legal/ethical issues (bias, privacy, plagiarism).

> [!EXAM]
> Three key takeaways: **(1)** the **SDLC still governs** the process — AI accelerates subtasks; **(2)** **human oversight is non-negotiable** — every AI suggestion must be validated; **(3)** you need **new skills, not new fundamentals** — learn to prompt and critically interpret AI, but core engineering judgment is your leverage.

> [!TRAP]
> AI does **not** make the SDLC, requirements, testing, or human accountability obsolete. It *augments* engineers; a developer who blindly ships AI-generated code without review is the risk, not the AI.

---

**Next:** the other direction — engineering reliable systems *around* ML models, and **MLOps**.
