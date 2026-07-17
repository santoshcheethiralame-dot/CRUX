---
subject: se
unit: 3
order: 2
slug: se4ai-mlops
title: SE for AI — ML Systems & MLOps
summary: ML model vs ML system, the 7-stage ML pipeline, MLOps and how it differs from DevOps, planning for ML mistakes (guardrails, the smart-toaster example), and architecting ML systems.
minutes: 15
tags: [SE4AI, ML-system, ML-pipeline, MLOps, guardrails, architecture]
---

# SE for AI — ML Systems & MLOps

## ML Model vs ML System

> [!NOTE]
> An **ML Model** is a *mathematical construct* trained on data that performs prediction. An **ML System** is the *complete ecosystem* around the model.

| ML Model | ML System |
|---|---|
| Mathematical construct trained on data | Complete ecosystem around the model |
| Performs prediction/inference | Includes data, deployment, monitoring, scaling |
| e.g. a CNN for image detection | e.g. an entire self-driving system |

> [!INTUITION]
> The **Apollo autonomous-driving system** integrates *many* ML models (lane detection, pedestrian detection, traffic-sign recognition…) plus tons of **non-ML** code. The model is just one component — engineers must plan how ML and non-ML parts interact, exchange data, and recover from errors.

## The Machine Learning Pipeline (7 stages)

1. **Model Requirements** — decide which features are feasible with ML and which model types suit the problem.
2. **Data Collection & Cleaning** — gather/integrate datasets (often using **transfer learning**, e.g. pretrain on ImageNet then specialise); remove noisy records.
3. **Data Labeling** — assign ground-truth labels.
4. **Feature Engineering** — extract and select informative features.
5. **Model Training & Tuning** — train/tune on clean labeled data.
6. **Model Evaluation** — measure on test/safeguard data (accuracy, F1, recall); critical domains add human evaluation.
7. **Deployment & Monitoring** — deploy inference and continuously monitor for real-world errors.

**Static vs Dynamic pipelines:** *Static* = train once, deploy once. *Dynamic* = continuous monitoring + retraining in production (this is **MLOps**).

## MLOps — Machine Learning Operations

> [!NOTE]
> **MLOps** is a set of practices to **automate and manage the ML lifecycle** — training, testing, deployment, monitoring and **retraining** — closing the gap between operations, model development and design.

### DevOps vs MLOps
| DevOps | MLOps |
|---|---|
| Focus on **software** deployment | Focus on **model lifecycle** automation |
| CI/CD | Continuous **training, validation, deployment** |
| Version control of **code** | Version control of **data and models** |

> [!EXAM]
> The headline difference: DevOps versions **code**; MLOps also versions **data and models** and adds **continuous training/retraining**. Applications of MLOps: **fraud detection**, **healthcare diagnosis**, **personalized content** — all needing models kept current as data drifts.

## Planning for mistakes — ML models are unreliable

ML errors are **expected**, not exceptional. Strategies to stay safe:
- **Fault-tolerant design** (redundancy, fail-safe rules)
- **Human-in-the-loop** validation
- **Undoable actions**
- **Mistake detection & recovery** (monitoring, doer-checker, fail-over)
- **Guardrails** and **containment/isolation**

> [!NOTE]
> **Guardrails** protect against **prompt injection / jailbreaks**, adversarial inputs that manipulate the model, and **sensitive-information (PII) exposure**.

### Example — the Smart Toaster
| In the model | Outside the model |
|---|---|
| Ensure max toasting time; use heat sensor + past outputs | Simple **non-ML code check** for max time |
| **Hard to guarantee** | Rule to shut down if too hot; **hardware thermal fuse** |

> [!INTUITION]
> Don't trust the ML model to be safe by itself. Put **non-ML guardrails outside** it — a plain code check, a hardware fuse. Safety comes from **layers**, assuming the model *will* eventually be wrong.

## Architecting ML systems

**Key decisions:** what components exist & how they communicate · **where inference runs — client, server, or edge** · where to store data/logs (security, privacy) · cost, latency, energy constraints.
**Quality drivers:** scalability, accuracy, response time, safety, security, **fairness**, maintainability.

| Trade-off | Example |
|---|---|
| **Accuracy vs Latency** | Real-time systems need low latency, not just accuracy |
| **Model Size vs Performance** | Large models need more computation |
| **Explainability vs Accuracy** | Simpler models are easier to explain but less powerful |

> [!TRAP]
> ML adds technical debt and complexity: **lack of clear specifications**, **testing difficulty** (you can't define exact expected outputs), and **model-dependency** debt (Sculley et al., 2015). Treat ML components as the *unreliable* parts of a system that must be engineered around.

---

**Next:** writing the code itself — **the implementation phase & code quality**.
