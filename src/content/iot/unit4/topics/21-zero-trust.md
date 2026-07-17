---
subject: iot
unit: 4
order: 16.2
slug: zero-trust
title: Zero Trust Architecture
summary: "Never trust, always verify" — the shift from perimeter-based security to per-request verification, and the device-authentication methods it relies on.
minutes: 10
tags: [zero-trust, perimeter, authentication, identity, least-privilege]
---

# Zero Trust Architecture

The traditional way to secure a network — a strong wall around the edge — fails badly for IoT. **Zero Trust** is the modern alternative.

## The old way: perimeter-based security

> [!NOTE]
> **Perimeter-based ("castle-and-moat") security** builds a strong boundary (firewall) around the network. Anything **outside** is untrusted; anything **inside** is trusted and granted broad access.

Its fatal flaw: **once an attacker is inside, they roam freely.**

> [!INTUITION]
> Perimeter security is a **castle with a moat**: a hard outer wall, but a soft, trusting interior. The problem with IoT is the wall is full of holes — thousands of devices, many compromised (a hacked bulb, a phished laptop). The moment one is breached, the attacker is *inside the trusted zone* and can move laterally to everything. For an IoT estate of countless weak endpoints, "trusted inside" is a fantasy.

## The new way: Zero Trust

> [!NOTE]
> **Zero Trust** assumes **no implicit trust** based on network location. Its principle is **"Never Trust, Always Verify"** — every request, from inside or outside, must be authenticated, authorized, and continuously validated before access is granted.

Core ideas:
- **Verify explicitly** — authenticate and authorize **every** request, every time (not once at the gate).
- **Least-privilege access** — grant only the minimum each device/user needs (limits blast radius).
- **Assume breach** — design as if attackers are already inside; **segment** so one compromised device can't reach others (micro-segmentation).
- **Identity-centric** — trust is based on **verified identity**, not which network you're on.

| | Perimeter-based | Zero Trust |
|---|---|---|
| **Trust model** | Trust inside, distrust outside | **Trust nothing**, verify everything |
| **Granted on** | Network location | **Verified identity per request** |
| **If breached** | Attacker roams freely | Contained (least privilege + segmentation) |
| **Fit for IoT** | Poor (many weak endpoints) | **Strong** |

## Identity-based vs network-based security

> [!INTUITION]
> This is the heart of Zero Trust. **Network-based** security asks *"are you on the trusted network?"* (easy to spoof, useless once inside). **Identity-based** security asks *"can you cryptographically prove who you are?"* — every time. Zero Trust replaces *where you are* with *who you are*. A device on the corporate VLAN gets no free pass; it must prove its identity like everyone else.

## Device authentication methods

Zero Trust leans on strong **device authentication** (proving a device is what it claims):

| Method | Strength |
|---|---|
| **Username/password / pre-shared key** | Weak (the #1 IoT flaw — guessable/shared) |
| **API tokens / keys** | Better, but can be stolen if stored insecurely |
| **Certificate-based (X.509)** | **Strong** — cryptographic device identity (next topic) |
| **Hardware root of trust (TPM/secure element)** | Strongest — keys locked in tamper-resistant hardware |
| **Multi-factor / mutual TLS** | Both sides prove identity |

> [!EXAM]
> Contrast **perimeter security** (trust inside / castle-and-moat — fails once breached) with **Zero Trust** ("**Never Trust, Always Verify**": verify every request, **least privilege**, assume breach, **identity- not network-based**). Know why it suits IoT (many weak endpoints make "trusted inside" untenable) and the **device-auth methods** (passwords → tokens → **X.509 certificates** → hardware root of trust).

---

**Next:** looking inside a device's firmware — firmware analysis with Binwalk.
