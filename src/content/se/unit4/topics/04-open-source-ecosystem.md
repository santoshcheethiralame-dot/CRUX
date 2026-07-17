---
subject: se
unit: 4
order: 4
slug: open-source-ecosystem
title: The Open-Source Ecosystem
summary: OSS vs proprietary software, the history (UNIX→BSD→GNU→Linux→Netscape), the free-software philosophy and four freedoms, copyleft vs permissive, the Cathedral and the Bazaar, governance and the pros/cons of going open source.
minutes: 14
tags: [open-source, free-software, copyleft, cathedral-bazaar, stallman, governance]
---

# The Open-Source Ecosystem

## Copyright, OSS & proprietary software

- **Copyright** protects creative/intellectual works (including software); **public domain** = no exclusive rights; **trademark** protects name/logo.
- OSS is **generally copyrighted** — copyright retained by contributors (or assigned to a maintaining entity) — and the holder grants a **license** with conditions.

> [!NOTE]
> **Open-Source Software (OSS)** = source-code **availability** + the right to **modify** / create derivatives + (often) the right to **redistribute** derivatives.
> **Proprietary software** is a **black box**: meant to be *used*, not inspected — no source, only a binary or web service, governed by an **EULA** that may even prohibit reverse-engineering.

## A short history

| Year | Event |
|---|---|
| 1970s | **Unix** created at AT&T Bell Labs in **C**; licenses initially included source |
| **1978** | UC Berkeley distributes its derivative, **BSD** |
| **1983** | AT&T broken up → stops Unix source releases; **Stallman starts GNU** ("GNU's Not Unix") |
| **1991** | **Linux** built with GNU utilities under the GPL → **GNU/Linux** |
| **1998** | **Netscape** open-sources its browser (Mozilla); the **Open Source Initiative** coins "open source"; MIT/Apache licenses follow |

## The free-software philosophy

> [!NOTE]
> Richard Stallman's **Free Software Foundation** — *"free as in speech, not as in beer"* — defines four freedoms:
> - **Freedom 0:** run the program for any purpose
> - **Freedom 1:** study and change the source
> - **Freedom 2:** redistribute copies to help others
> - **Freedom 3:** distribute your modified versions

> [!INTUITION]
> *"Open Source is a development methodology; free software is a social movement."* — Stallman. "Free software" is about **liberties** (the four freedoms); "open source" reframes the same practice around a pragmatic **development model** to appeal to business.

## Copyleft vs Permissive

> [!EXAM]
> - **Copyleft** (e.g. **GPL**): derivative works **must** be relicensed under the **same** license — *"protects the commons"* via transitive (viral) sharing.
> - **Permissive** (e.g. **BSD, MIT**): you **may** combine the OSS into a product under a **different** (even proprietary) license — encourages adoption.
>
> The philosophical question: *do we **force** participation (copyleft), or **incentivise** it (permissive)?*

## The Cathedral and the Bazaar

| **Cathedral** | **Bazaar** |
|---|---|
| Developed centrally by a **core group**, released when complete | Developed **openly & organically**, wide participation |
| e.g. GNU Emacs, GCC (1990s) | e.g. **Linux** |

*(Eric Raymond's essay — "the Bazaar won.")*

## Stakeholders & governance

**OSS stakeholders:** **core members** (push access), **external contributors** (bug reports, pull requests), supporters (beta testers, sponsors), and **spin-offs** (fork maintainers). Mature projects carry a **CONTRIBUTING.md** (style/linters, required tests, code reviews, CLAs).

**Governance** is either:
- **For-profit firms** controlling the roadmap — Chromium (Google), TensorFlow (Google), PyTorch (Meta).
- **Non-profit foundations** — Apache (ASF), Firefox (Mozilla), Python (PSF) — or **benevolent dictators** (Linux, Python).

## Why go open source?

| Advantages | Disadvantages |
|---|---|
| Transparency → user trust | Reveals implementation secrets |
| **Many eyes** → crowd-sourced bug fixes | **Many eyes** → users find faults more easily |
| Security: vulnerabilities found quickly | Security: others may find vulnerabilities first |
| Community, adoption, contributions | **Control:** you may lose influence over long-term direction |

> [!TRAP]
> "Many eyes make bugs shallow" cuts **both ways** — the same openness that lets *defenders* find and fix bugs lets *attackers* find them too. Open source isn't automatically more secure; it depends on an active community actually reviewing the code.

---

**Next:** the legal instruments that govern reuse — **software licenses**.
