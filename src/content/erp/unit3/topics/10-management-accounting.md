---
subject: erp
unit: 3
order: 10
slug: management-accounting
title: Management Accounting
summary: The six areas of management accounting, cost centres versus profit centres, COGM and COGS, the three manufacturing strategies that determine how product cost is computed, and transfer pricing.
minutes: 11
tags: [management-accounting, cost-centre, profit-centre, COGM, COGS, transfer-pricing, make-to-order, make-to-stock, engineer-to-order]
---

# Management Accounting

## The six areas

> [!EXAM]
> **Management Accounting areas:**
>
> 1. **Profit Centre Accounting**
> 2. **Cost Centre Accounting and Budgeting**
> 3. **Project Accounting and Budgeting**
> 4. **Product Cost Accounting**
> 5. **Transfer Pricing**
> 6. **Management Dashboard / Reports**

> [!INTUITION]
> **Mnemonic — the first four are "cost by four different slices":**
>
> | Slice | Question it answers |
> |---|---|
> | **Cost centre** | *What did this **department** spend?* |
> | **Profit centre** | *What did this **business unit** earn?* |
> | **Project** | *What did this **initiative** cost?* |
> | **Product cost** | *What does this **item** cost to make?* |
>
> **Department, unit, project, product.** The same underlying transactions, aggregated four ways — which is only possible because each GL line carries the **non-financial data** (cost centre, profit centre, project code) that the previous topic flagged.
>
> **Transfer pricing** is the fifth because it is what happens when two of these slices **trade with each other**.

## Cost centres vs profit centres

> [!EXAM]
> - **Cost Centre Accounting and Budgeting**
> - **Profit Centre Accounting**

> [!DERIVE]
> **The distinction is about what the unit is held responsible for**, and it is a favourite exam contrast:
>
> | | **Cost centre** | **Profit centre** |
> |---|---|---|
> | **Accountable for** | **costs only** | **costs *and* revenue** |
> | **Typical example** | HR, IT, the maintenance department | a product line, a region, a division |
> | **Measured on** | staying within budget | **profit** |
>
> An HR department cannot sell anything, so judging it on revenue is meaningless — it is a **cost centre**, measured on spending its budget well. A regional sales division earns revenue and incurs cost, so it can be judged on the difference — a **profit centre**.
>
> Note the link forward: **Work Centers in production are "closely linked to the cost center of the finance module."** Machines and production lines are where manufacturing cost accumulates, so the production module's work centre and the finance module's cost centre are two views of the same thing.

## Product cost accounting

> [!EXAM]
> **Two definitions to know:**
>
> - **COGM = Cost of Goods Manufactured**
> - **COGS = Cost of Goods Sold**

> [!TRAP]
> **COGM and COGS are not the same, and the difference is inventory.**
>
> **COGM** is what it cost to **produce** the goods in a period. **COGS** is what it cost to produce the goods you actually **sold** in that period.
>
> They differ whenever you make more than you sell (the excess goes into inventory) or sell more than you make (you are drawing inventory down). **Manufacture 10,000 units and sell 6,000, and COGM covers 10,000 while COGS covers 6,000.**
>
> Recall Unit 1's Nestlé outcome: *"the favourable evolution of **COGS** continues"* — COGS is the figure that appears on the profit and loss statement, so it is the one savings show up in.

### The three manufacturing strategies

> [!EXAM]
> Product cost accounting must handle different production strategies:
>
> | Strategy | Examples |
> |---|---|
> | **Engineer to Order** | **ship building, office interiors** |
> | **Make to Order** | **high grade steel** |
> | **Make to Stock** | *(the deck asks for examples — e.g. beverages such as cola, FMCG)* |

> [!EXAM]
> **"Customer specific products are also known as make-to-order"** — a stated MCQ answer, and one of the pasted questions.

> [!INTUITION]
> The three strategies form a **spectrum of how late the customer enters the process**, and that determines how you cost the product:
>
> $$\underbrace{\textbf{Engineer to Order}}_{\text{customer enters at } design} \rightarrow \underbrace{\textbf{Make to Order}}_{\text{customer enters at } production} \rightarrow \underbrace{\textbf{Make to Stock}}_{\text{customer enters at } sale}$$
>
> - **Engineer to Order** — every unit is unique, so cost must be tracked **per order**, and this is really **project accounting**. A ship is not a product with a standard cost; it is a project.
> - **Make to Order** — the design is standard, production is triggered by the order.
> - **Make to Stock** — you produce to a **forecast** before any customer exists, so a **standard cost** per unit makes sense.
>
> This spectrum returns in **Production Planning**: MRP's stated limitation is that it is *"not appropriate for Project or Engineer-to-Order type of manufacturing, as here **every new order has a unique Bill of Material**."* **The same distinction constrains both costing and planning.**

## Transfer pricing

> [!EXAM]
> **Transfer Pricing** — **goods/services are shipped/exchanged — value.**

> [!INTUITION]
> Transfer pricing is the price **one internal unit charges another** when goods or services move between them — a component plant selling to an assembly plant, or a shared IT function billing a division.
>
> It exists because of **profit centre accounting**. Once you make each division accountable for its own profit, you **must** put a price on internal transfers — otherwise the supplying division shows all the cost and none of the revenue, and looks like it is failing.
>
> Two things make it consequential and exam-worthy:
>
> - **It changes reported profit per unit without changing group profit at all.** Raise the transfer price and the supplying division looks better while the receiving one looks worse; the group total is unchanged.
> - **Across borders, it moves taxable profit between countries**, which is why transfer pricing is heavily regulated — and why it sits under **Tax Planning** as well as management accounting.
>
> This is the **"Multi" problem** again: multi-division plus multi-country makes transfer pricing unavoidable.

## Why management accounting is discretionary

> [!EXAM]
> Management accounting produces **Management Reports and Dashboards** — for internal decision-making.

> [!DERIVE]
> **The defining contrast with financial accounting** is worth stating plainly in an answer:
>
> | | **Financial Accounting** | **Management Accounting** |
> |---|---|---|
> | **Audience** | external — regulators, shareholders, auditors | **internal — managers** |
> | **Format** | fixed by **GAAP / IFRS, company law** | **whatever is useful** |
> | **Frequency** | statutory periods | **as often as decisions are made** |
> | **Basis** | **historical, verified** | may include estimates and forecasts |
> | **Aggregation** | whole legal entity | **by cost centre, profit centre, project, product** |
>
> **Same transactions, two purposes.** And both are only possible from **one set of source data** — which is the *single database* argument arriving in Finance. Before integration, management reporting was a separate spreadsheet exercise that never quite reconciled to the statutory accounts.

---

**Next:** getting paid, and managing the cash — **financial SCM & treasury**.
