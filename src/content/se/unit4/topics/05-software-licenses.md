---
subject: se
unit: 4
order: 5
slug: software-licenses
title: Software Licenses
summary: The major open-source licenses (GPL, LGPL, MIT, Apache, BSD, Creative Commons), the dual-license business model, the risk of incompatible licenses, copyright vs IP, and contributor license agreements.
minutes: 12
tags: [licenses, GPL, LGPL, MIT, apache, BSD, copyleft, CLA]
---

# Software Licenses

## The major licenses

| License | Type | Key properties |
|---|---|---|
| **GPL** | **Copyleft** | The 4 freedoms; source **must be made available**; modifications **must be relicensed under GPL**. **Viral** — depending on GPL from proprietary code "pollutes" everything → **companies avoid it** |
| **LGPL** (Lesser GPL) | Weak copyleft | For **libraries**; **dynamic linking is *not* a derivative work**, so proprietary code may depend on (unmodified) LGPL libraries |
| **MIT** | Permissive | Simple, commercial-friendly; must retain copyright credit; as-is, no liability, no other restrictions |
| **Apache** | Permissive | Like MIT (not copyleft); also does **not grant trademark** rights |
| **BSD** | Permissive | No liability, as-is; copyright statement in source + binary; no endorsement without consent |
| **Creative Commons (CC)** | Content | For **datasets/media**: **CC-BY** (attribution), **CC-BY-SA** (share-alike), **CC-BY-ND** (no derivatives) |

> [!EXAM]
> The headline split: **GPL is copyleft (viral)**; **MIT, Apache, BSD are permissive**; **LGPL** is the middle ground (proprietary code may *link* to it). **Creative Commons** is for data/media, not code. A "which license is copyleft?" question is almost guaranteed.

> [!TRAP]
> **GPL's "viral" effect:** if you statically link a GPL library into your proprietary app, your **whole app** must become GPL (open-sourced). This is *intentional* — but it's why most companies have a **vetting process** before engineers use third-party GitHub libraries.

## Business models & risks

- **Dual-license model:** the product is released as **GPL** (forcing users to open-source their app) **or** companies **pay** for a commercial license. *(e.g. **MySQL**: $2k–$10k/year for the business-friendly license.)*
- **Incompatible licenses:** when Oracle acquired Sun and stalled **OpenOffice**, the community forked **LibreOffice**. Due to license conflict, **LibreOffice can copy from OpenOffice but not vice-versa**.

## Copyright vs Intellectual Property

> [!NOTE]
> - **Copyright** covers a *particular expression* of a work (books, music, **source code**). It is **automatic** for all new work.
> - **IP / Patents** cover an *idea* for solving a problem (machine designs, processes, controversially algorithms). They must be **applied for**, have **expiry dates**, and can be **licensed/sold**.

> [!INTUITION]
> Copyright protects **how** you wrote it; a patent protects the **idea** itself. Two people can independently write the same function (each owns their copyright), but if one *patented the idea*, the other may still infringe.

## Contributor License Agreements (CLA)

> [!NOTE]
> A **CLA** is often required before you can contribute to an OSS project. It **assigns the maintainers specific rights** over the code you contribute (scoped to that project). Without it, *you* retain the copyright/IP for even small bug fixes — which can create legal headaches for the project later.

---

**Next:** the most contentious form of software IP — **software patents**.
