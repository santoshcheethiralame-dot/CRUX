---
subject: iot
unit: 3
order: 9
slug: wifi
title: Wi-Fi for IoT
summary: The 802.11 family for IoT — bands and generations, Wi-Fi HaLow for low-power IoT, and the strengths and weaknesses for connected devices.
minutes: 8
tags: [WiFi, 802.11, HaLow, medium-range, throughput]
---

# Wi-Fi for IoT

> [!NOTE]
> **Wi-Fi** is the **IEEE 802.11** family of wireless LAN technologies — the medium-range, high-throughput workhorse of consumer IoT. It operates in unlicensed **2.4 GHz, 5 GHz, and 6 GHz** bands.

Wi-Fi is the natural choice when a device is **mains-powered**, needs **high data rate**, and sits within range of an access point — smart cameras, smart TVs, voice assistants, and appliances.

## Bands & generations

| Band | Trait |
|---|---|
| **2.4 GHz** | Longer range, better wall penetration, but crowded & lower speed |
| **5 GHz** | Higher speed, less congestion, shorter range |
| **6 GHz** (Wi-Fi 6E) | Newest, lots of clean spectrum, highest speed, shortest range |

Generations: Wi-Fi 4 (802.11n) → Wi-Fi 5 (802.11ac) → **Wi-Fi 6/6E** (802.11ax) — each improves speed, efficiency, and handling of **many simultaneous devices** (important as homes fill with IoT).

## Wi-Fi HaLow — the IoT-tuned variant

> [!NOTE]
> **Wi-Fi HaLow (802.11ah)** operates in **sub-GHz (~900 MHz)** to give **longer range and lower power** than standard Wi-Fi — purpose-built for IoT, bridging the gap toward LPWAN while keeping IP connectivity.

> [!INTUITION]
> Standard Wi-Fi is a **sprinter** — blazing fast but power-hungry and short-winded. **HaLow** trades raw speed for endurance: dropping to sub-GHz buys far more range and far less power, so battery sensors can use Wi-Fi-family networking without draining in a day.

## Strengths and weaknesses

| Strengths | Weaknesses |
|---|---|
| High data rates (video, images, firmware) | **High power** — best for plugged-in devices |
| Ubiquitous infrastructure (existing APs) | Limited range vs LPWAN |
| Native **IP** connectivity (no gateway translation) | **Star topology** — devices depend on the AP |
| Familiar security (WPA2/WPA3) | Congestion/packet loss in crowded 2.4 GHz |

> [!INTUITION]
> Wi-Fi's biggest IoT advantage is that it's **already IP and already everywhere** — a Wi-Fi device joins the existing network and reaches the cloud with no gateway translation (unlike Zigbee/BLE, which need a hub). Its biggest drawback is **power**: that's why you rarely see a coin-cell Wi-Fi sensor, and why HaLow exists.

> [!EXAM]
> Know Wi-Fi = **IEEE 802.11**, bands **2.4/5/6 GHz**, **star topology**, high throughput but **high power** (mains-powered devices); the key IoT advantage (**native IP, no gateway needed**); and **Wi-Fi HaLow (802.11ah, sub-GHz)** as the longer-range, lower-power IoT variant.

---

**Next:** the long-range LPWAN star — LoRaWAN.
