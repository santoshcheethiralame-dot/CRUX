---
subject: iot
unit: 3
order: 6
slug: unlicensed-bands
title: Unlicensed Spectrum & Wireless Range Classes
summary: Why IoT runs on unlicensed (ISM) bands, the unlicensed-vs-licensed distinction, and the short/medium/long-range technology classes.
minutes: 9
tags: [unlicensed, ISM, spectrum, range-classes, LPWAN]
---

# Unlicensed Spectrum & Wireless Range Classes

Wireless communication is the backbone of IoT — it lets billions of distributed sensors, actuators, and controllers connect without wires. But every wireless technology needs **radio spectrum**, and *which* spectrum it uses changes everything.

## Unlicensed vs licensed spectrum

> [!NOTE]
> **Unlicensed frequency bands** are portions of the spectrum anyone can use **without a special licence** from regulators (FCC, TRAI, ETSI). They're regulated only by basic technical rules (power limits, duty cycles). **Licensed spectrum** (cellular bands) is auctioned to and managed by telecom operators.

The most important unlicensed band is the **2.4 GHz ISM band**, harmonised worldwide.

### Why IoT uses unlicensed bands

- **Cost-free access** — no spectrum-licensing fees → affordable for startups, industry, consumers.
- **Global standards** — bands like 2.4 GHz ISM work across countries without modification.
- **Innovation-friendly** — Wi-Fi, Zigbee, LoRa, and Bluetooth were all built for unlicensed bands.
- **Scalability** — billions of devices coexist without operator agreements.

> [!INTUITION]
> IoT devices are **low-cost, low-power, and massively deployed** — they simply can't afford the expensive licensed spectrum telecom operators buy. Unlicensed bands are the "public commons" of the airwaves: free to use, globally available — which is exactly why nearly all consumer IoT lives there. The catch: it's a *crowded* commons, so interference is the price of free.

## The three wireless range classes

Unlicensed wireless technologies sort cleanly by **range** (which trades off against data rate and power):

| Class | Range | Technologies | Best for |
|---|---|---|---|
| **Short-range** | cm – ~100 m | **Bluetooth/BLE** (2.4 GHz), **Zigbee** (2.4 GHz/sub-GHz), **NFC/RFID** (13.56 MHz, <10 cm) | Wearables, smart homes, payments/access |
| **Medium-range** | ~100 m – few km | **Wi-Fi** (2.4/5/6 GHz), **Wi-Fi HaLow** (900 MHz), **Z-Wave** (868/915 MHz) | Smart appliances, campus/building automation |
| **Long-range (LPWAN)** | >5 km – tens of km | **LoRa** (sub-GHz), **Sigfox** (868/915 MHz) | Agriculture, smart cities, asset tracking, utilities |

Trade-offs by class:
- **Short-range:** low power, low cost, high device density — but limited coverage and interference-prone.
- **Medium-range:** higher data rates — but more power-hungry, still shorter than LPWAN.
- **Long-range:** ultra-low power, **10+ year battery**, deep coverage — but **extremely low data rates** (bytes per message).

## And cellular — the licensed exception

> [!TRAP]
> **Cellular IoT does NOT use unlicensed bands.** NB-IoT, LTE-M, 4G/5G operate in **licensed** spectrum bought and managed by operators. So if a question asks which IoT tech is *not* unlicensed, the answer is the cellular family (covered later).

> [!EXAM]
> Distinguish **unlicensed (free, ISM 2.4 GHz, e.g., Wi-Fi/Zigbee/BLE/LoRa) vs licensed (cellular, operator-managed)**, give the **reasons IoT favours unlicensed** (cost-free, global, scalable), and classify technologies into **short / medium / long (LPWAN)** range with the range↔data-rate↔power trade-off. Remember **cellular is the licensed exception.**

---

**Next:** the first short-range protocol in depth — Zigbee.
