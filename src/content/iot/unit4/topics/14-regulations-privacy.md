---
subject: iot
unit: 4
order: 14
slug: regulations-privacy
title: Security Regulations & Privacy
summary: The major IoT security regulations, what privacy means in IoT, de-identification, and the Privacy Impact Assessment (PIA) process.
minutes: 10
tags: [regulations, privacy, PIA, de-identification, CSIA]
---

# Security Regulations & Privacy

Because every part of an IoT system — sensor, module, device, connectivity, cloud, analytics — is vulnerable, regulation has emerged to set minimum standards.

## IoT security regulations

| Body / law | Focus |
|---|---|
| **DHS (US Dept. of Homeland Security)** | IoT security guidelines: **security by design**, best practices, **risk assessment**, secure-update processes, transparency |
| **FDA (US)** | Regulations for **smart medical devices** |
| **European Commission** | Minimal security requirements, best practices, and an IoT device **labelling** system |
| **IoT Cybersecurity Improvement Act (CSIA, 2020)** | Rules for IoT in **US federal buildings** |

The **CSIA** focuses on vendors: verify devices have **no known vulnerabilities**, use **advanced protocols**, contain **no hard-coded credentials**, and send **incident notifications**. It also acknowledges that some constrained IoT devices have limited capacity for robust security.

> [!INTUITION]
> Notice the common thread across all four: **security by design + no default/hard-coded credentials + a process for updates and breach notification.** That's the regulatory distillation of the vulnerabilities you just studied — they legislate against exactly the weaknesses (default passwords, unpatched firmware) that enabled Mirai.

## What is IoT privacy?

> [!NOTE]
> **IoT privacy** is the ability of users to **control the dissemination of their data** — how it's collected, stored, analysed, passed along, or sold — and to control the degree to which a person or system can be **identified**.

IoT makes this acute because devices constantly observe people: cameras (buildings, streets, drones), voice assistants (Echo, Google Home), health wearables, and GPS-tracking cars.

**Diagnostic questions** to surface privacy issues: *Who collects the data? For what purpose? Where is it stored? Who can access it? Is it shared with third parties? How long is it kept?* Bad answers (no consent, no breach process, no transparency) signal privacy problems.

## De-identification

> [!NOTE]
> Information is **personal** when it can identify an individual. It becomes **de-identified** when there's **no possibility** it can be used to identify a person. De-identified data is a recognised category in privacy law, usable by research, government, and healthcare institutions.

> [!TRAP]
> De-identification can be **undone by integration** — the same trap from the vulnerabilities topic. Data stripped of names can be **re-identified** when combined with other datasets. True de-identification means *no possibility* of re-identification, which is harder than just removing obvious identifiers.

## Privacy Impact Assessment (PIA)

> [!NOTE]
> A **Privacy Impact Assessment (PIA)** is a review process to **protect personal information** a system collects — addressing concerns **before** issues arise. Performed by privacy experts who **identify, evaluate, and control** privacy risks. It's **dynamic** — updated whenever the system changes.

A PIA examines:

- **Who can access the data**, and which laws apply where the data resides (different data centres → different regulations).
- **What information** originates, terminates, or transits the system → **minimise collection** of personally identifiable information; **destroy data when no longer needed**.
- **How data is shared** — with which third parties, under what agreements, and the resulting risks.
- **What breach policies** exist — compensation, redress, notification processes.
- **What consent/policies** exist — consent for collection, **opt-out** options, and letting users **see their own data**.

> [!INTUITION]
> The PIA's golden rules echo throughout privacy law: **collect the minimum**, **get consent**, **let people opt out and see their data**, and **delete when done**. A classic example is a **smart toy** that records children's conversations — it must respect child-protection law, minimise retention, and secure the data, or it becomes a privacy disaster.

> [!EXAM]
> Know the **regulations** (DHS guidelines, FDA medical, EU labelling, **CSIA 2020** — no hard-coded creds, incident notification), the **definition of IoT privacy** (control over data dissemination & identifiability), **de-identification** (and its re-identification-by-integration risk), and the **PIA** (purpose, that it's dynamic, and its principles: minimise collection, consent, opt-out, delete-when-done).

---

**Next:** these threats made real — landmark IoT security incidents.
