---
subject: erp
unit: 4
order: 9
slug: inventory-planning-models
title: Inventory Planning & the Four Models
summary: The two drivers of inventory planning and their costs, the three solutions, and the Q, P, min-max and two-bin models with the EOQ cost curve and the reorder point formula.
minutes: 12
tags: [inventory-planning, stock-out, EOQ, Q-model, P-model, periodic-review, min-max, two-bin, reorder-point, safety-stock]
---

# Inventory Planning & the Four Models

## The two drivers

> [!EXAM]
> **Two basic drivers for better inventory planning:**
>
> **(i) Never have a stock out**
> - **for finished goods** — **customer dissatisfaction**, **lost sales**
> - **for raw materials** — **production loss**
>
> **(ii) Never carry excess inventory**
> - **increases cost of operation**
> - **chance of obsolescence**
> - **heavy markdown**

> [!INTUITION]
> **The two drivers point in opposite directions, and the whole of inventory planning is the compromise between them.**
>
> $$\textbf{Never stock out} \;\Longrightarrow\; \text{hold more} \qquad\qquad \textbf{Never carry excess} \;\Longrightarrow\; \text{hold less}$$
>
> **You cannot satisfy both, so the models exist to find the least-bad point between them.**
>
> Note that the deck **prices both failures**, which is what makes the trade-off computable:
>
> | Failure | Costs you |
> |---|---|
> | **Stock out** | **lost sales and unhappy customers** (finished goods) · **production loss** (raw materials) |
> | **Excess stock** | **operating cost**, **obsolescence**, **heavy markdown** |
>
> **"Heavy markdown" is the sharpest of these** — excess inventory does not merely sit there costing storage; eventually you **sell it below cost to clear it**, which converts a working-capital problem into a realised loss. Apparel is the standard example, and *"markdowns (mainly for apparel industry)"* duly appears in Unit 5's consumer-goods industry processes.
>
> This is the **same service-vs-cost tension** as **Level vs Chase** in S&OP and as **central vs local stock** in DRP. **Three chapters, one trade-off** — and an answer that says so is a strong answer.

## The three solutions

> [!EXAM]
> **Solutions to overcome / prevent:**
> 1. **Design better process for replenishment**
> 2. **Support processing / handling of exceptions**
> 3. **Scientific approach to reordering — when & how much (quantity)**
>    - **Q model, P model, Min-Max model, 2-bins model**

> [!TRAP]
> **The third solution names the two questions that every inventory model answers**, and every model is just a different pair of answers:
>
> $$\textbf{WHEN do we order?} \qquad\qquad \textbf{HOW MUCH do we order?}$$
>
> | Model | **When** | **How much** |
> |---|---|---|
> | **Q model (EOQ)** | when stock hits the **reorder point** — *variable timing* | **fixed quantity** |
> | **P model (periodic review)** | at **fixed intervals** — *every Monday* | **variable quantity** — top up to target |
> | **Min-max** | when stock reaches **min** | enough to reach **max** |
> | **Two-bin** | when the **first bin empties** | **one bin's worth** |
>
> **Q and P are exact opposites, and that is the single most examinable fact in this topic.** The deck says it outright: the P model is *"opposite of Q model — qty differs, freq is constant."*
>
> **Q fixes the quantity and lets the timing float. P fixes the timing and lets the quantity float.**

## The four models

> [!EXAM]
> **Inventory models supported by ERPs:**
>
> - **Q model** — **EOQ model** — **reorder point ordering, qty is constant**
> - **P model** — **periodic review** — **opposite of Q model: qty differs, freq is constant**
> - **Min-max model** — **pre-define min and max stock level**; **order when stock on hand is at / near min level**
> - **Two bin model** — **use 2 bins**; **order when first bin is empty**

### The Q model and EOQ

> [!EXAM]
> **EOQ Inventory Model:**
>
> $$\textbf{Total annual cost} = \textbf{annual ordering cost} + \textbf{annual holding cost}$$
>
> **Reorder Point:**
>
> $$\textbf{Reorder Point} = \textbf{Daily Demand} \times \textbf{Lead Time} = D \times LT \textbf{ units}$$
>
> The deck's cost curve plots **Annual cost** against **Order quantity**, with:
> - **Ordering cost** falling as order quantity rises
> - **Holding cost** rising linearly with order quantity
> - **Total cost** as their sum — a **U-shaped curve whose minimum is the EOQ**

> [!DERIVE]
> **Read the graph and the formula falls out of it.**
>
> **Why ordering cost falls:** each order costs a fixed amount regardless of size — a delivery, paperwork, a setup. Order in **bigger** lots and you place **fewer** orders per year, so that fixed cost is spread thinner.
>
> $$\textbf{annual ordering cost} = \frac{\text{annual demand}}{\text{order quantity}} \times \text{cost per order} \;\;\propto\; \frac{1}{Q}$$
>
> **Why holding cost rises:** bigger orders mean more stock sitting in the warehouse on average, and storage, insurance and tied-up capital all scale with it.
>
> $$\textbf{annual holding cost} = \frac{Q}{2} \times \text{holding cost per unit} \;\;\propto\; Q$$
>
> **One term falls as $Q$ rises, the other rises. Their sum therefore has a minimum — and that minimum is the EOQ.** The two curves cross at the optimum, which is why the deck's diagram draws the crossing point directly beneath the total-cost trough.
>
> **This is the same fixed-cost-vs-holding-cost trade-off as lot sizing in Unit 3** — *"lot sizing is primarily for optimizing: transportation / packing costs and other overheads."* **EOQ is lot sizing with the arithmetic written down.**

> [!TRAP]
> **The reorder point formula answers "when", not "how much" — do not mix them up.**
>
> $$\textbf{ROP} = D \times LT$$
>
> **The logic:** you must reorder while you still have enough stock to survive the lead time. If you use 50 units a day and the vendor takes 6 days, you need **300 units** left when you place the order — they will be exactly consumed as the delivery arrives.
>
> **This is backward scheduling from Unit 3 applied to stock instead of dates**, and the same trap applies: **it assumes demand and lead time are both certain.** They are not, which is why real systems add **safety stock**:
>
> $$\textbf{ROP} = (D \times LT) + \textbf{safety stock}$$
>
> The deck's own P-model diagram shows a **safety stock (SS)** line explicitly, and *"scientific determination of safety stock, cycle stock etc."* is named as the planning level's job. **The bare $D \times LT$ formula is the version to reproduce; knowing why safety stock is added on top is what earns the extra marks.**

### The P model

> [!EXAM]
> **Periodic Review System (P Model)** — the deck's diagram labels:
>
> **Review period $T$** *(repeating)* · **Target inventory level $M$** · **Safety stock $SS$** · order quantities **$Q_1, Q_2, Q_3$** · demands **$d_1, d_2, d_3$** · lead times **$LT_1, LT_2, LT_3$** · *"amount used during first lead time"* · **Order placed** → **Shipment received**, three times over, plotted as **Inventory on Hand (OH)** against **Time**.

> [!INTUITION]
> **The P model's mechanic in one line: at every review, order enough to bring stock back up to the target level $M$.**
>
> $$Q = M - (\textbf{stock on hand at review})$$
>
> Because the stock on hand differs each time, **$Q_1 \neq Q_2 \neq Q_3$** — that is the "qty differs" half of *"opposite of Q model."*
>
> **When you would choose P over Q:**
>
> | Choose **Q (EOQ)** when… | Choose **P (periodic)** when… |
> |---|---|
> | you can **monitor stock continuously** | monitoring is **expensive or manual** |
> | items are ordered **independently** | you order **many items from one vendor** and want one combined delivery |
> | demand is steady | you want **predictable, plannable ordering days** |
>
> **The practical argument for P is consolidation.** If you review every item from a vendor on the same Monday, you place **one order and take one delivery** instead of forty — which collapses exactly the fixed ordering and transport cost that EOQ is trying to minimise anyway.
>
> **The cost of P:** because you only look on review days, a demand spike just *after* a review goes unnoticed until the next one. **P models therefore need more safety stock than Q models** — you must cover the review period *plus* the lead time, not just the lead time.

### Min-max and two-bin

> [!DERIVE]
> **Min-max and two-bin are the practical, low-tech members of the family** — and both are really simplifications of the models above.
>
> **Min-max** is a **Q/P hybrid**: order when stock hits **min** (a reorder point, like Q), order up to **max** (a target level, like P). It is the model most ERP systems actually implement as *"reorder point planning"*, and it appears in Unit 3's CBP list as **automatic / manual reorder point**.
>
> **Two-bin is min-max with the calculation replaced by a physical fact.** Stock sits in two bins; you draw from the first; **when it empties, that *is* the reorder signal** and you order one bin's worth while living off the second.
>
> **The second bin is literally the safety stock and the lead-time cover**, sized so that it lasts as long as the replenishment takes.
>
> **Its genius is that it needs no system at all** — no counting, no stock record, no calculation. An empty bin is visible from across the room. That makes it ideal for **class C items**, where the cost of running a planning calculation would exceed the value of the stock being planned.
>
> **And it is a pull system:** consumption triggers replenishment, nobody schedules it. **Two-bin is Kanban with bins instead of cards** — the same idea Unit 3 attributed to Toyota, arrived at independently.

---

**Next:** the top of the pyramid — **strategic inventory management, KPIs & vendor solutions**.
