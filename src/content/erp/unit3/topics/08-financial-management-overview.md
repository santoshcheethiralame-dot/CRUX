---
subject: erp
unit: 3
order: 8
slug: financial-management-overview
title: Financial Management — Overview & Categories
summary: Why Finance is the most integrated ERP module and what feeds it, the four broad categories of financial application, and the twelve application areas with what each one does.
minutes: 11
tags: [financial-management, integration, GL, categories, accounts-payable, accounts-receivable, treasury, FSCM]
---

# Financial Management — Overview & Categories

## Finance is the most integrated module

> [!EXAM]
> **Finance is a highly integrated ERP module.** The deck's diagram shows what feeds it:
>
> | Source module | What flows into Finance |
> |---|---|
> | **HR** | **Payroll** |
> | **Purchase** | **Purchase Orders** |
> | **Production** | **Production Orders** |
> | **Sales** | **Sales Revenues** |
>
> And the Finance module itself contains **General Ledger · Accounts Payable · Accounts Receivable · Asset Accounting.**

> [!INTUITION]
> **Every transaction anywhere in the enterprise eventually becomes a number in Finance**, and that is the structural fact behind the whole chapter.
>
> Hire someone → payroll cost. Raise a purchase order → a payable. Run a production order → a cost. Ship an order → revenue and a receivable. **No other module receives input from all the others.**
>
> This is why the chapter summary says **"FM is a highly integrated ERP module — other areas of ERP transactions have financial implications"**, and why Unit 1's banking example had step 6 as *"Accounting for Banking records the loan disbursement in the **General Ledger**."*
>
> Two practical consequences follow, and both are exam-worthy: **Finance is almost always in the first implementation wave**, because everything posts into it; and **the General Ledger is the single point where the whole enterprise's activity is visible in one currency** — which is exactly why Nestlé having **nine different general ledgers** was so damaging.

## The four broad categories

> [!EXAM]
> The QnA asks directly: **"What are the four broad categories of applications under the financial module?"**
>
> 1. **Financial Accounting**
> 2. **Management Accounting**
> 3. **Financial Supply Chain Management (FSCM)**
> 4. **Treasury Applications**

> [!INTUITION]
> **Mnemonic — the four answer four different questions, and grouping them that way makes the split obvious:**
>
> | Category | The question it answers | Audience |
> |---|---|---|
> | **Financial Accounting** | *What happened?* — the statutory record | **outside** — regulators, shareholders, auditors |
> | **Management Accounting** | *Where did the money go, and was it worth it?* | **inside** — managers |
> | **Financial SCM** | *Will the customer actually pay us?* | **customers** |
> | **Treasury** | *Do we have cash, and what is it doing?* | **banks and markets** |
>
> The first two are the classic accounting split — **external vs internal reporting**. Financial accounting is **legally mandated and format-constrained** (GAAP, IFRS); management accounting is **discretionary and shaped to whatever the business needs to decide.**
>
> FSCM and Treasury are the two that look **outward with money**: one at money coming in from customers, one at money held with banks.

> [!EXAM]
> The deck's own module map:
>
> | Category | Areas |
> |---|---|
> | **Financial Accounting** | **GL, AP, AR, Asset Accounting, Tax, Inventory A/C, Contract A/C** |
> | **Management Accounting** | **Profit centre accounting, Cost centre accounting, Product cost accounting, Project accounting, Transfer Pricing** |
> | **Financial Supply Chain Management** | **Collection Management, Credit Management, Dispute Management, Customer self service portal** |
> | **Treasury Management** | **Cash and Liquidity Management, Financial Risk Management** |

## The twelve application areas

> [!EXAM]
> **Finance: Application Categories List**
>
> **Accounts Payable · Accounts Receivable / Collection Management · Accounting · Costing and Profitability · Expenses Management · Budgeting · Consolidation · Financial Reporting · Internal Control And Audits · Tax Planning · Treasury · Cash Management**

> [!EXAM]
> **What each one does:**
>
> | Area | Purpose |
> |---|---|
> | **Accounts Payable** | **Automates & streamlines the Invoice-to-Payment cycle** |
> | **Accounts Receivable / Collection Management** | **Payment receipt process from customer** · **credit checks, risk management, customer service** |
> | **Accounting** | **GL — trial balance, balance sheets, audit reports** |
> | **Costing and Profitability** | **Analyse production/operating costs, ABCs, product profitability** |
> | **Expense & Budget Management** | **Enterprise annual budgets, project-wise budgets, revenue & expense forecasts** |
> | **Consolidation (Financial)** | **For conglomerates — across companies, BUs** |
> | **Financial Reporting** | **GAAP, IFRS** |
> | **Internal Control And Audits** | **Compliance reporting, internal controls, audit reporting (checks and balances)** |
> | **Tax Planning** | **IT compliance reporting / liability estimations** |
> | **Treasury** | **Bank / FI transaction management** |
> | **Cash Management** | **Cash flow, investments, liquidity, financial risks** |

> [!DERIVE]
> **Accounts Payable and Accounts Receivable are mirror images**, and getting them the right way round is the single most common slip:
>
> $$\textbf{AP} = \text{money we } \textbf{owe} \text{ (invoice-to-payment)} \qquad \textbf{AR} = \text{money } \textbf{owed to us} \text{ (payment receipt)}$$
>
> They sit at opposite ends of the two big processes from Unit 1:
>
> - **AP is the end of Procure-to-Pay** — the supplier invoices us and we pay.
> - **AR is the end of Order-to-Cash** — we invoice the customer and they pay.
>
> **Mnemonic: A**c**c**ounts **P**ayable = we **P**ay. **A**ccounts **R**eceivable = we **R**eceive.
>
> And note **AR carries "credit checks, risk management"** while AP does not — because the risk in AR is that **the customer might not pay**, which is precisely what **Financial SCM** is built to manage.

> [!TRAP]
> **"Consolidation" is specifically for conglomerates — "across companies, BUs."**
>
> A group with twenty legal entities must produce **one set of accounts** for the group while each entity keeps its own books, possibly in different currencies and under different local rules. Consolidation is the machinery that combines them and eliminates inter-company transactions.
>
> This is the **"Multi" problem** of Unit 1 landing in Finance — multi-division, multi-country and multi-currency all at once — and it is why **Consolidation** also appears in the **emerging areas** list.

> [!EXAM]
> **Chapter 8 objectives**, for orientation:
> - **ERP Financial Application** and **Financial Modules in detail** — Financial Accounting · Management Accounting · Financial SCM · Treasury Applications
> - **Emerging areas in Financial Management** — Budgeting/Planning · Consolidation · **Business Performance Management (BPM) and Balanced Scorecard** · **Activity Based Costing (ABC)**

---

**Next:** the statutory record — **financial accounting**.
