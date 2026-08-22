---
subject: erp
unit: 4
order: 5
slug: commodity-item-strategy
title: Commodity Procurement & Item-Based Strategy
summary: What makes a commodity different, auctions and hedging as ERP's two commodity tools, and the four-quadrant procurement strategy matrix with the driver behind each item group.
minutes: 10
tags: [commodity, auction, reverse-auction, hedging, futures, MRO, critical-items, strategy-matrix, e-procurement]
---

# Commodity Procurement & Item-Based Strategy

## What a commodity is

> [!EXAM]
> - **Commodities are the items which are not branded and can see wide price variations depending on demand, supply and seasonal variations in price**
> - **Commodity procurement is a specialized procurement process**
> - **ERPs provide special procurement tools for managing commodity procurement. These are: E-procurement = Auction, and Hedging**

> [!INTUITION]
> **"Not branded" is the definition, and everything else follows from it.**
>
> If steel from vendor A is genuinely interchangeable with steel from vendor B, then **there is nothing to compete on except price** — no features, no service differentiation, no loyalty. And a market where the only variable is price is a market where **price moves with supply and demand**, continuously.
>
> **So the buying problem inverts.** For a branded component you ask *"which vendor?"* For a commodity the vendor barely matters and you ask **"at what price, and when?"** — which is why the two tools ERP offers are both about **price discovery** and **price risk**, not about vendor selection.

## The two ERP tools

> [!EXAM]
> **Auctions:** *"Leading ERPs provide **E-procurement / Auction** options that help to get the items at **best price of required quality**."*
>
> **Hedging:** *"**Hedging is a common strategy for managing commodity risk.** This is done by **taking a position in the futures market that is opposite to the one in the physical market**, with the objective of **reducing or limiting risks associated with price changes**."*

> [!DERIVE]
> **Auctions and hedging solve two different problems, and pairing them wrongly is the trap.**
>
> | | **Auction** | **Hedging** |
> |---|---|---|
> | Problem solved | *what is the **best price available right now**?* | *how do I stop **future price moves** from hurting me?* |
> | Market used | **the physical market** — real suppliers, real goods | **the futures market** — financial contracts |
> | Effect | **discovers** the price | **fixes** the price |
>
> **Auction = price discovery. Hedging = price certainty.**
>
> **How hedging actually works**, since *"opposite position"* is the phrase that needs unpacking: you are going to **buy** copper in six months, so a **price rise** hurts you. So you take the opposite position in futures — a contract that **gains value when copper rises**. If copper goes up, you pay more physically but the futures contract gains; if copper falls, you pay less physically but the contract loses.
>
> $$\textbf{physical loss} + \textbf{futures gain} \approx \textbf{0}$$
>
> **You have not made money — you have removed uncertainty.** That is the point: hedging does not seek a profit, it converts an unpredictable future cost into a known one, so the company can quote prices to *its* customers without gambling.
>
> **Reverse auctions**, listed at level 3 of the maturity model, are the buying-side form: **vendors bid the price *down* against each other** rather than buyers bidding up. That only works where the item is genuinely interchangeable — i.e. **exactly for commodities**.

## The item-based strategy matrix

> [!EXAM]
> **Procurement strategy for different item groups**, plotted on **Strategic Impact** (horizontal) against **Financial Impact** (vertical), each **Low → High**:
>
> | Item group | Position | **Driver** |
> |---|---|---|
> | **MRO** *(indirect goods / services)* | **low strategic, low financial** | **"Purchase admin cost should be low"** |
> | **Commodities** *(e.g. raw material)* | **low strategic, high financial** | **"Price is right"** |
> | **Critical Items** *(e.g. spares)* | **high strategic, low financial** | **"Should never be out of stock"** |
> | **Production Items** *(e.g. components)* | **high strategic, high financial** | **"Need closer collaboration with vendor"** |
>
> **MRO = Maintenance, Repair and Operation supplies**, per the deck's own footnote.

> [!INTUITION]
> **The two axes ask two different questions, and that is the whole matrix:**
>
> - **Financial impact** — *does this cost us a lot of money?*
> - **Strategic impact** — *does this stop the business if it goes wrong?*
>
> **They are genuinely independent, and the two off-diagonal quadrants prove it:**
>
> - A **commodity** is a huge line in the budget but strategically dull — anyone can supply it, so **squeeze the price**.
> - A **critical spare** may cost ₹2,000, but if it is missing the plant is down — so **the price is irrelevant and availability is everything**.
>
> **The insight the matrix exists to deliver: managing every item the same way is wrong in two different directions.** Negotiating hard on a critical spare is false economy; holding safety stock of commodities ties up cash for no reason. **Different quadrants deserve opposite behaviours.**

> [!TRAP]
> **The drivers are what get examined, not the quadrant names** — and each one implies a *different* mechanism from earlier topics:
>
> | Driver | Mechanism it points to |
> |---|---|
> | *"Purchase admin cost should be low"* | **blanket POs**, **employee self-service e-procurement**, **catalogue buying** |
> | *"Price is right"* | **auctions and reverse auctions**, **hedging** |
> | *"Should never be out of stock"* | **high safety stock**, **min-max models**, **service-level-based inventory** |
> | *"Need closer collaboration with vendor"* | **delivery schedules**, **quota arrangements**, **collaborative product development**, eventually **VMI** |
>
> **Read the matrix as a routing table**, not a classification: it tells you which of the chapter's tools to reach for.

> [!EXAM]
> Note the deliberate cross-reference: the **production items** driver — *"need closer collaboration with vendor"* — is the same statement as the **direct items** row *"involvement for procurement department is much higher here as they need to **collaborate with supplier to design** the component or product."*
>
> **Production items ≈ direct items; MRO ≈ indirect items.** The two tables are two views of one distinction, with the strategy matrix adding **commodities** and **critical spares** as the cases the direct/indirect split does not capture.

---

**Next:** how a procurement function grows up — **the procurement maturity model**.
