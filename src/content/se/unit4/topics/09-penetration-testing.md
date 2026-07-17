---
subject: se
unit: 4
order: 9
slug: penetration-testing
title: Security Testing — Penetration Testing
summary: What penetration testing is, the white/black/gray-box types, the five-phase process, the value (compliance, red-teaming), open-source tools, and real case studies.
minutes: 12
tags: [penetration-testing, security, white-box, black-box, nmap, OWASP]
---

# Security Testing — Penetration Testing

## Overview

> [!NOTE]
> **Penetration testing ("pentesting")** is an **authorized, simulated cyberattack** on a system to evaluate its security — identifying and exploiting vulnerabilities **before real attackers do**, using the same tools and techniques (automated scanning + manual exploitation), then reporting findings with recommended fixes.

It **complements** other testing (e.g. vulnerability scans) by **mimicking attacker behaviour**, finding weaknesses in networks, applications, configurations, or **human factors**.

## Types — by tester knowledge

| Type | Tester knows | Best for |
|---|---|---|
| **White-box** | Full knowledge (source, architecture) | Most **thorough** (uses internal insights) |
| **Black-box** | Only public information | Best **simulates a real external attacker** |
| **Gray-box** | Partial (some credentials/architecture) | A **hybrid** that balances both |

> [!EXAM]
> Map the box colours: **White-box = full internal knowledge** (thorough); **Black-box = no internal knowledge** (realistic external attacker); **Gray-box = partial** (balance). Note these mirror the same terms in functional testing but applied to *security*.

## The 5-phase process (OWASP-style)

1. **Reconnaissance** — gather info (domains, IPs, tech stack) via public sources (**WHOIS, Shodan**).
2. **Scanning** — probe for open ports, services, known vulnerabilities (**Nmap**, vuln scanners).
3. **Vulnerability Assessment** — analyse scan results, identify & **prioritise** high-risk issues.
4. **Exploitation** — attempt to exploit confirmed vulnerabilities (SQL injection, XSS) to **prove impact**.
5. **Reporting** — document findings, evidence of exploitation, and remediation advice.

## Value

- **Prevents breaches** — finds critical flaws before attackers do.
- **Compliance & assurance** — e.g. **PCI-DSS mandates regular pentests**; boosts stakeholder confidence.
- **Red-teaming & risk assessment** — reveals not just technical bugs but **process issues** (weak passwords, unpatched servers).
- A **reality check** of the organisation's security.

> [!NOTE]
> **Open-source tools:** **Nmap** (network scanner), **Metasploit** (exploitation framework), **OWASP ZAP** (web-app DAST scanner), **SQLMap** (automated SQL injection), **Wireshark** (packet capture/analysis).

> [!INTUITION]
> Case studies show the value: a 2023 engagement found **372 vulnerabilities** (potential **$2.59 M/day** downtime if exploited); the **Marriott breach (2020, 5.2 M records)** might have been caught by pentesting in advance; IoT firmware routinely reveals **hardcoded credentials**.

---

**Next:** the automated input-bombardment technique — **fuzzing**.
