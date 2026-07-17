---
subject: iot
unit: 4
order: 16.3
slug: firmware-binwalk
title: Firmware Analysis & Binwalk
summary: Why firmware is a security goldmine, how analysts use Binwalk to inspect a firmware image, and the defensive practices that protect it.
minutes: 10
tags: [firmware, Binwalk, reverse-engineering, secrets, secure-boot]
---

# Firmware Analysis & Binwalk

A device's **firmware** — the software burned into its flash — often hides the keys to the kingdom. Understanding how it's analysed is essential for **defending** IoT.

> [!NOTE]
> **Firmware analysis** is examining a device's firmware image to understand its contents and find security weaknesses. Both **attackers** (to find a way in) and **defenders / security researchers** (to find and fix flaws before attackers do) do it — it's a core skill in IoT security testing.

## Why firmware is a goldmine

Firmware images frequently contain — accidentally — sensitive material:

- **Hardcoded credentials** — default usernames/passwords or admin keys baked in (OWASP IoT **#1**).
- **Private keys & certificates** — sometimes the *same* key across every unit shipped.
- **API endpoints & tokens** — URLs and secrets for cloud services.
- **An embedded filesystem & OS** — often a full Linux root filesystem with config files.
- **Known-vulnerable components** — outdated libraries with public exploits (OWASP IoT **#5**).

> [!INTUITION]
> The danger is **scale and uniformity**. If a manufacturer hardcodes one admin password or one private key into the firmware, **every device of that model shares it** — extract it once from a single unit and you potentially unlock the entire fleet. That's why "secrets in firmware" is such a serious, repeated IoT failure.

## How Binwalk is used

> [!NOTE]
> **Binwalk** is the standard open-source tool for **analysing and extracting** the contents of firmware images. It scans a binary for **signatures** of known file types and embedded data.

Conceptually, an analyst uses it to:

1. **Identify** — scan the image for signatures of embedded components (a **bootloader**, a **Linux kernel**, a compressed **filesystem** like SquashFS/JFFS2).
2. **Extract** — carve out and **decompress** the embedded filesystem.
3. **Inspect** — browse the extracted files for **hardcoded secrets**, keys, configs, and outdated software (often with helper tools that grep for passwords/keys).
4. **Assess** — judge the security posture and report the flaws.

This is the same process a **defender** runs on their own firmware before shipping — to catch a leaked key or default password *first*.

> [!INTUITION]
> Think of a firmware image as a **shipping container** and Binwalk as the **X-ray scanner**: it reveals the separate boxes packed inside (bootloader, kernel, filesystem) and lets you open them. The lesson isn't "how to break in" — it's that **whatever you embed in firmware is recoverable**, so you must never put plaintext secrets there.

## Defensive practices (the real takeaway)

Because firmware *can* be extracted and inspected, secure development must assume it **will** be:

- **No hardcoded secrets** — never embed plaintext passwords/keys; provision unique credentials per device.
- **Encrypt the firmware** image so its contents can't be trivially extracted.
- **Sign firmware + secure boot** — the device only runs firmware with a valid signature (stops tampered images; the LockState/Jeep lesson).
- **Secure update mechanism** — authenticated, signed OTA updates (OWASP IoT #4).
- **Keep components current** — no outdated, known-vulnerable libraries (OWASP IoT #5).
- **Hardware root of trust** — store keys in a secure element/TPM, not in flash.

> [!EXAM]
> Know that **firmware analysis** (with **Binwalk**) extracts and inspects a firmware image's embedded components (bootloader, kernel, **filesystem**) to find **hardcoded secrets/keys, configs, and vulnerable components** — done by attackers *and* defenders. The exam point is the **defensive lesson**: assume firmware is extractable, so **never hardcode secrets**, **encrypt + sign firmware (secure boot)**, and use a **hardware root of trust**.

---

**Next:** the cryptographic identity that secures devices properly — X.509 & PKI.
