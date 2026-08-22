---
subject: erp
unit: 4
order: 8
slug: inventory-control-abc
title: Inventory Control & Classification Systems
summary: The six inventory control processes, cycle counting and why it beats an annual stock-take, stock valuation methods, ABC analysis with the deck's exact percentages, and the six-way classification table that exists only as an image.
minutes: 12
tags: [inventory-control, cycle-counting, physical-inventory, pareto, ABC-analysis, stock-valuation, moving-average, GOLF, SOS, HML, FSND, SDE]
---

# Inventory Control & Classification Systems

## The control processes

> [!EXAM]
> **Inventory Control Processes:**
> - **Quality Control**
> - **Physical Inventory** — *"to match System Inv is a challenge"*
> - **Cycle Counting** — **a method of physical inventory counting in periodic intervals**; **policy based on ABC class of items**; **Pareto analysis**
> - **Stock Overview** — **stocks at different levels, ERP enabled**
> - **Value Control / Stock Valuation** — **valuation methods available: Moving average price · Std price (in Material Master)**
> - **ABC Classification of Materials**

> [!INTUITION]
> **Control processes exist because the system's number and the shelf's number drift apart.** The deck says it plainly: *"to match System Inv is a challenge."*
>
> They drift for reasons no software can prevent — **breakage, pilferage, mis-picks, unrecorded issues, deterioration** (all of which reappear as the **shrinkage** KPI). So control is not about preventing drift; it is about **detecting and correcting it often enough that the planning layer above can trust the numbers.**
>
> **That is the pyramid's dependency made concrete:** an EOQ calculation on a stock figure that is wrong by 15% is worse than useless, because it is confidently wrong.

## Physical inventory vs cycle counting

> [!DERIVE]
> **Cycle counting is the exam-worthy idea here**, and the contrast makes it clear:
>
> | | **Physical inventory** (annual stock-take) | **Cycle counting** |
> |---|---|---|
> | Frequency | **once a year**, everything at once | **continuously**, a few items at a time |
> | Operations | **stop** — the warehouse shuts to count | **carry on** |
> | Error found after | **up to 12 months** | **days or weeks** |
> | Effort allocation | **uniform** — every item counted equally | **by ABC class** — A items counted most often |
>
> **Two independent wins.** First, **errors surface early**, while the cause is still traceable and correctable. Second, and more importantly, **effort is allocated by value rather than spread evenly.**
>
> That second point is the reason the deck couples cycle counting to **ABC class** and **Pareto analysis** in the same bullet. If **A items are 13.3% of items but 60.5% of value**, then counting them monthly and C items annually **catches most of the error for a fraction of the effort** — whereas an annual count spends 60% of its labour on the C items that carry 14.5% of the value.
>
> $$\textbf{count frequency} \propto \textbf{value at risk}$$
>
> **This is the same principle as risk prioritization, exception messages, and the item strategy matrix: put attention where the consequences are.**

## Stock valuation

> [!EXAM]
> **Value control / Stock Valuation** — two methods named:
> - **Moving average price**
> - **Standard price** *(held in the **Material Master**)*

> [!TRAP]
> **The two valuation methods behave oppositely when prices move, and that is the examinable difference.**
>
> | | **Moving average price** | **Standard price** |
> |---|---|---|
> | Stock value | **recalculated on every receipt** — follows actual purchase prices | **fixed** at a planned price |
> | Price differences | **absorbed into the stock value** | **posted to a variance account** |
> | Best for | items with **genuinely variable** costs — **commodities** | items where you want **stable costing** — **production components** |
>
> **Standard price is what makes the price-variance posting exist**, and the SAP GL document from Unit 3 shows exactly that: **Inventory 245.00 · Goods Received 275.00 · Price Variance 30.00.** The goods were received at 275 but valued at the standard 245, so **30 goes to variance.** With moving average, there would be no variance line — the stock would simply be revalued.
>
> **Why anyone would want the variance:** a stable standard price means the **cost of a manufactured product does not change every time a raw material is bought at a different price** — so product costing stays comparable month to month, and purchasing performance shows up visibly as a variance instead of being hidden inside the stock value.
>
> Note that **standard price lives in the Material Master** — the *Costing* / *Accounting* view of the segmented record from Unit 3.

## ABC classification

> [!EXAM]
> **ABC classification helps in classifying inventory and allocating control efforts as per importance:**
>
> **A — Very Important · B — Moderately Important · C — Least Important**
>
> **The deck's worked figures:**
>
> | Class | **% of value** | **% of items** |
> |---|---|---|
> | **A** | **60.5%** | **13.3%** |
> | **B** | **25%** | **26.7%** |
> | **C** | **14.5%** | **60%** |
>
> The accompanying image adds the definition: **"classifying inventory according to annual value of consumption of the items"**, plotted as **Annual \$ value of items (High → Low)** against **Number of Items (Few → Many)**.

> [!DERIVE]
> **Check the arithmetic and the shape of the distribution appears:**
>
> $$\underbrace{13.3\%}_{\text{A items}} \text{ of items carry } \underbrace{60.5\%}_{\text{of value}} \qquad\qquad \underbrace{60\%}_{\text{C items}} \text{ of items carry } \underbrace{14.5\%}_{\text{of value}}$$
>
> **Roughly an order of magnitude difference in value-per-item between an A and a C.** That is the Pareto principle — *"the vital few and the trivial many"* — measured.
>
> **Note the criterion carefully: annual value of *consumption*, which is *consumption per period × price per unit*.** Not unit price alone.
>
> That distinction is exactly what the classification table below turns into a separate scheme: a **cheap item consumed constantly can be class A**, while an **expensive item bought once a year can be class C**. Getting this wrong is the standard mistake — **HML classifies by unit price and *"does not take consumption into account"*; ABC does.**
>
> And the reason it matters practically: **A items justify tight control** — frequent cycle counts, careful reordering, negotiated contracts. **C items justify the opposite** — bulk buying, two-bin systems, minimal attention. **Spending equal effort on both wastes most of it.**

## The six classification systems

> [!EXAM]
> **The deck's full classification table** *(this slide has **no text layer at all** — it exists only as an image, so it is easy to miss entirely):*
>
> | Classification | **Full form** | **Criterion employed** |
> |---|---|---|
> | **ABC Analysis** | **Always Better Control** | **Usage Value** *(i.e. consumption per period × price per unit)* |
> | **GOLF Analysis** | **Govt, ordinary, local, foreign** | **Source of procurement** |
> | **SOS Analysis** | **Seasonal, off seasonal** | **Seasonality** |
> | **HML Analysis** | **High, Medium, Low** | **Unit price — i.e. does not take consumption into account** |
> | **FSND Analysis** | **Fast, slow, non-monetary, material demands** | **Issues from store** |
> | **SDE Analysis** | **Scarce, difficult, easy** | **Procurement difficulties** |

> [!INTUITION]
> **Six schemes, six different questions about the same item** — and each one exists because a different department needs a different answer:
>
> | Scheme | Asks | Whose problem |
> |---|---|---|
> | **ABC** | *how much money flows through this?* | **finance / inventory control** |
> | **HML** | *how expensive is one unit?* | **security and storage** — lock up the high-value ones |
> | **FSND** | *how often does it move?* | **warehouse layout** — fast movers near the door; **and obsolescence** |
> | **SDE** | *how hard is it to get?* | **procurement** — scarce items need more safety stock |
> | **GOLF** | *where does it come from?* | **procurement** — foreign sourcing means long lead times, duties, currency |
> | **SOS** | *does demand come in a season?* | **planning** — build stock ahead of the season |
>
> **ABC and HML are the pair most often confused, and the table itself flags the difference:** HML's criterion is stated as *"unit price, i.e. **does not take consumption into account**."* **A gold-plated bolt bought twice a year is H under HML and C under ABC.**
>
> **The practical use is to combine them.** An item that is **A (high value), S (scarce) and F (fast moving)** is the one that most deserves a long-term contract and a generous safety stock — and no single scheme would have told you that.

> [!TRAP]
> **"FSND = Fast, slow, non-monetary, material demands"** is how the deck's table reads, and it is worth reproducing as given.
>
> The far more common industry expansion is **FSN = Fast moving, Slow moving, Non-moving**, classified by **issues from store** — which matches the criterion column the deck itself gives. **The criterion is the reliable part; treat the expansion as the deck's wording.**
>
> **Non-moving items are the obsolescence risk** — which is exactly the **"Inventory Obsolescence as a % of Total Inventory"** KPI, defined as *obsolete and scrap inventory / gross inventory value*. **FSND is how you find them before they become a write-off.**

---

**Next:** deciding when and how much to order — **inventory planning & the four models**.
