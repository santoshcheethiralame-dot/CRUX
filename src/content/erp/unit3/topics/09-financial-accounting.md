---
subject: erp
unit: 3
order: 9
slug: financial-accounting
title: Financial Accounting
summary: The seven areas of financial accounting, the General Ledger defined with what an account actually is, why the GL is called the backbone, and a worked GL document showing how one transaction posts.
minutes: 11
tags: [financial-accounting, general-ledger, GL, AR, AP, asset-accounting, tax, contract, inventory-accounting]
---

# Financial Accounting

## The seven areas

> [!EXAM]
> **Financial Accounting areas:**
>
> 1. **General Ledger (GL)**
> 2. **Accounts Receivable (AR)**
> 3. **Accounts Payable (AP)**
> 4. **Asset Accounting**
> 5. **Contract Accounting**
> 6. **Inventory Accounting**
> 7. **Tax Accounting**
>
> Plus:
> - **Financial Statements** — **company laws, country specific regulations**
> - **Management Reports and Dashboards**
>
> The deck's fuller diagram also shows **Bank Accounting** and **Cash Journal**.

> [!INTUITION]
> **Mnemonic — the areas are the GL plus "one per kind of thing you account for":**
>
> | Area | What it accounts for |
> |---|---|
> | **AR** | money owed **by customers** |
> | **AP** | money owed **to suppliers** |
> | **Asset Accounting** | **things you own** — machines, buildings |
> | **Inventory Accounting** | **stock** |
> | **Contract Accounting** | **long-running agreements** |
> | **Tax Accounting** | what you owe **the government** |
> | **Bank Accounting** | what sits **at the bank** |
>
> **And all seven post into the General Ledger.** That is the shape to hold: **six or seven subsidiary ledgers feeding one general one.**

> [!EXAM]
> **The elements of financial accounting**, as the deck's diagram lays them out:
>
> **General Ledger** at the centre, with **Bank Accounts · Payables · Receivables · Consolidation** around it, and the supporting functions: **Accounts Payable · Invoice Verification · Accounts Receivable · Credit Management · Foreign Exchange Management · Cash Management and Forecast · Financial Analysis.**

## The General Ledger

> [!EXAM]
> **Definition — learn it:**
>
> > **"A general ledger (GL) is a chronological accounting record a business uses to keep track of financial transactions. Transactions are categorized and summarized into general ledger accounts. An account is a unique record for each type of asset, liability, equity, revenue and expense."**
> >
> > **"The general ledger is the backbone of any accounting system, which holds financial and non-financial data for an organization. The collection of all accounts is known as ledger account."** *(Source: Wikipedia)*

> [!TRAP]
> **GL stands for General Ledger, not "Grand Ledger."** One of the pasted MCQs states the latter — **FALSE**. It is a stated expansion in the MCQ bank.

> [!DERIVE]
> **The definition contains the five account types, and they are worth extracting** because they are the whole of double-entry accounting:
>
> $$\textbf{Asset} \;\cdot\; \textbf{Liability} \;\cdot\; \textbf{Equity} \;\cdot\; \textbf{Revenue} \;\cdot\; \textbf{Expense}$$
>
> The first three form the **balance sheet** — *what you own, what you owe, what's left over for the owners.* The last two form the **profit and loss statement** — *what came in, what went out.*
>
> So *"an account is a unique record for each type of asset, liability, equity, revenue and expense"* is saying: **every account in the entire enterprise is one of five kinds**, and which kind it is determines which statement it lands on.

> [!INTUITION]
> Two phrases in the definition do real work.
>
> **"Chronological"** — the GL is a record *in time order*. It is not a summary you can recompute; it is a **running log of what happened when**, which is what makes it auditable and what makes *"data tracking"* (Unit 1's third single-database advantage) possible.
>
> **"Holds financial and non-financial data"** — this surprises people. A GL entry carries the amount, but also the **cost centre, profit centre, document number, posting date and reference** — the context needed to answer *why* the amount exists. That non-financial data is what **management accounting** later slices by.

## A GL document

> [!EXAM]
> The deck's worked example shows an SAP **"Display Document: General Ledger View"**, and the structure is the examinable part:
>
> **Header (data entry view):** **Document Number** 5000000018 · **Company Code** V001 · **Fiscal Year** 2011 · **Document Date** and **Posting Date** 20.08.2011 · **Period** 2 · **Currency** AUD
>
> **Line items:**
>
> | Item | Account | Description | Amount | Cur. |
> |---|---|---|---|---|
> | 1 | 131000 | **Inventory – Raw Mat** | 245.00 | AUD |
> | 2 | 211200 | **Goods Received / Invoice** | 275.00 | AUD |
> | 3 | 530000 | **Gain/Loss Price Variance** | 30.00 | AUD |
> | 4 | 690001 | PC Self Balancing | 30.00 | AUD |
> | 5 | 690001 | PC Self Balancing | 30.00 | AUD |
>
> Each line also carries a **Profit Centre** and a **Purchasing Document** reference.

> [!DERIVE]
> **Read the first three lines and the whole of financial integration is visible in one screen.**
>
> The goods were **received at 275.00** but the inventory was **valued at 245.00**, leaving a **30.00 price variance**:
>
> $$275.00 - 245.00 = 30.00$$
>
> That is one physical event — **a goods receipt** — producing **three accounting entries automatically**, and the difference posting itself to a variance account rather than being lost or manually reconciled.
>
> Note the **Purchasing Document reference (4500017200)** on every line: the GL entry **points back to the purchase order that caused it.** That is the audit trail, and it is exactly what a non-integrated system cannot provide — the PO would be in purchasing, the receipt in the warehouse, and the journal entry keyed by hand in accounts.
>
> **This single document is the *"one business event updates multiple modules"* claim from Unit 1, shown in the ledger.**

> [!TRAP]
> Note the entries **balance** — that is what "double entry" means, and it is why line items 4 and 5 exist as **"PC Self Balancing"** postings. An ERP will not let you post a document that does not balance, which is a **built-in control** rather than a report you run afterwards.
>
> This is the concrete form of *"internal control and audits — checks and balances"* from the application categories.

## Financial statements and reporting

> [!EXAM]
> **Financial Statements** are produced under **company laws and country specific regulations** — and reported per **GAAP** and **IFRS** standards.
>
> Financial accounting also produces **Management Reports and Dashboards**.

> [!INTUITION]
> **The constraint that defines financial accounting is that its output format is not yours to choose.** GAAP and IFRS specify what a balance sheet must contain and how items must be classified.
>
> That is the sharpest contrast with **management accounting**, which follows next: same underlying transactions, but **the internal reports can be cut any way management finds useful**, because no regulator reads them.

---

**Next:** the same data, cut for managers — **management accounting**.
