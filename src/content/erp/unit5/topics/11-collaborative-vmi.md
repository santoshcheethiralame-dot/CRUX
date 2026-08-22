---
subject: erp
unit: 5
order: 11
slug: collaborative-vmi
title: Collaborative Planning & VMI
summary: Why collaboration pays, the three kinds of collaborative planning, the five-stage evolution of collaboration, and VMI in full — its process, its EDI message flow, its seven benefits and its two difficulties.
minutes: 12
tags: [collaborative-planning, collaborative-forecasting, collaborative-replenishment, VMI, EDI, POS, bullwhip, Wal-Mart, P&G, ASN, CRP]
---

# Collaborative Planning & VMI

## Why collaborate

> [!EXAM]
> **Collaborative Planning:**
> - **Businesses are getting sophisticated and integrated**
> - **A supplier of a business may be a customer of another business** *(the deck cross-references its own SCOR slide)*
> - **Supply chain will have to ultimately cover the entire chain — value chain**
> - **Collaboration amongst multiple stakeholders in the supply chain brings significant benefits**
>
> The deck's note: *"at times **customer businesses force the supplier** to adopt automated collaboration channels."*

> [!INTUITION]
> **The argument is one sentence long: *a supplier of a business may be a customer of another business.***
>
> That is the SCOR recursion — *suppliers' supplier → supplier → your company → customer → customer's customer* — and it means **optimising your own link is optimising a fragment.** If your supplier is holding excess stock because you never tell them your plans, **you pay for that stock in their price.**
>
> $$\textbf{local optimum at every link} \;\neq\; \textbf{optimum for the chain}$$
>
> **That is the whole case for collaboration**, and it is why the deck says the supply chain *"will ultimately have to cover the entire chain — value chain."*
>
> ⚠️ **And the note about coercion is worth keeping, because it is candid:** *"customer businesses **force** the supplier to adopt automated collaboration channels."* Collaboration in practice is often **asymmetric** — a Wal-Mart or a Big Bazaar can require its suppliers to connect, and a small supplier cannot refuse. **The benefits are shared; the choice frequently is not.**

## The three kinds of collaboration

> [!EXAM]
> **Collaborative Planning Benefits:**
>
> **Collaborative forecasting**
> - **A customer company in the supply chain can provide useful forecast / demand input to the supplier company**
> - Example: *"a **tyre manufacturer** can have an idea of the number of vehicles planned for the next quarter by its customer companies"*
>
> **Collaborative replenishment**
> - **Replenishment orders can be picked up / sensed by supplier companies, being part of an intelligent supply chain**
> - **Rate Contract** · *see **VMI***
>
> **Collaborative product development**
> - **When complex products are produced — especially new models — hundreds of sub-part suppliers involved will have to closely co-operate based on status of completion across the supply chain**

> [!DERIVE]
> **The three kinds share information at three different points in time, and that is the cleanest way to hold them:**
>
> | Kind | Shares | When |
> |---|---|---|
> | **Collaborative forecasting** | **what we expect to need** | **before** anything is ordered |
> | **Collaborative replenishment** | **what we are actually consuming** | **as** it happens |
> | **Collaborative product development** | **what we are designing** | **before the product exists** |
>
> **The tyre example makes the forecasting case unanswerable.** A tyre manufacturer's demand is **completely determined** by its customers' vehicle production plans — it is **dependent demand across a company boundary.** Forecasting it statistically from tyre sales history is guessing at something that is already known, **by someone else.**
>
> **That is the deep point: collaboration converts an independent-demand problem into a dependent-demand one.** Unit 3 drew that line at the company's edge — MRP for dependent demand inside, forecasting for independent demand outside. **Collaboration moves the line outward.**
>
> **And collaborative product development is where this connects to PLM** — *"hundreds of sub-part suppliers… closely co-operate based on status of completion across supply chain"* is exactly PLM's driver *"collaboration needs with local and global partners"* seen from the supply-chain side. It is also **level 3 of the procurement maturity model**: *"advanced collaboration with suppliers **for product development**."*

## How collaboration evolved

> [!EXAM]
> **Collaborative Planning Evolution — five stages:**
>
> 1. **Customers interacted through hard copy documents**
> 2. **Customers expose material requirement to suppliers through portals**
> 3. **Suppliers expose to customers next delivery schedule etc.**
> 4. **Sharing of [Goods accepted — Payment status], electronically**
> 5. **VMI & collaborative forecasting**
>
> **The deck's evolution chart plots *collaboration / trust* against time:**
>
> $$\textbf{Paper based updates} \rightarrow \textbf{Portals} \rightarrow \textbf{Collaborative Forecasting, VMI} \rightarrow \textbf{CPFR}$$

> [!INTUITION]
> **The chart's vertical axis is labelled *collaboration / trust*, and that word is the whole explanation.**
>
> Each stage requires the parties to reveal more:
>
> | Stage | What you must reveal | Risk if the partner is untrustworthy |
> |---|---|---|
> | **Paper** | nothing beyond the order | none |
> | **Portals — requirements** | **what you will need** | they see your production plans |
> | **Portals — delivery schedules** | **when they will deliver** | they see their own commitments *(low risk)* |
> | **Goods accepted / payment status** | **your acceptance and payment behaviour** | disputes become visible |
> | **VMI / collaborative forecasting** | **your inventory and daily sales** | **they see everything about your business** |
>
> **Technology was never the constraint** — EDI existed for decades. **Trust was.** A supplier who can see your daily sales can also infer your margins, your promotions and your relationship with their competitors.
>
> **The deck's own note is unusually reflective about this:** *"many of these may look trivial in the current age of on-line access, SMS alerts etc. **But it was a big deal not too long ago.** Also, businesses won't embrace technology so quickly."*
>
> **Note the direction of stage 3.** Stages 2, 4 and 5 are the **customer** revealing things; stage 3 is the **supplier** revealing their delivery schedule. **Collaboration has to be reciprocal or it is just surveillance** — which is exactly why it takes trust rather than software.

## Vendor Managed Inventory

> [!EXAM]
> **VMI — the QnA's model answer, which is the version to reproduce:**
>
> - **VMI is a process where the supplier makes inventory replenishment decisions for the customer**
> - **Vendor monitors the buyer's inventory levels and makes decisions as to which items to send, how much quantity and when**
> - **Customer sends demand and inventory information on a prearranged schedule, typically daily / weekly**
> - **In VMI, the customer does not generate a P.O.** — **instead the supplier drives replenishment of products and creates the order**
> - **Customer sends inventory, daily sales data (in case of retail industry this can be POS data) and promotion information to supplier via EDI message**
> - **Supplier's fulfilment system does the order processing — including invoicing**
> - **Payment is made with an electronic fund transfer from the customer's bank**
>
> **History:** **VMI was popularized in the late 1980s by Wal-Mart, Procter & Gamble.** *"The success of Procter and Gamble's program with Wal-Mart helped VMI to become a globally accepted replenishment practice."*
>
> **VMI is "one of the value adds by ERP / SCP apps."**

> [!EXAM]
> **The VMI process, as the deck's diagram draws it:**
>
> **Customer side** — daily stock data from inventory system · daily sales data · planned future promotions
> $$\xrightarrow{\textbf{EDI (Stock data)}} \xrightarrow{\textbf{EDI (Past Sales data)}} \xrightarrow{\textbf{EDI (Planned Promotions)}}$$
> **Supplier side** — **Sales Forecast** → **Decide Replenishment of Inventory** → **Determine Replenishment Qty** *(considering **Transport Load Qty**)* → **CRP order generated and sent to retailer via EDI**
> $$\xrightarrow{\textbf{EDI (Order Confirmation)}}$$
> **Customer** — **review the order, if required make changes** → $$\xrightarrow{\textbf{EDI (Order Acknowledgement)}}$$ → **Supplier processes the order and sends Advance Shipping Notification (ASN)** → **Customer receives ASN and prepares for receipt of material**
>
> *(**EDI = Electronic Data Interchange**, "a standard of communication for business and trade; there are specific standards such as **EDIFACT**." **Vendor = Supplier.**)*

> [!DERIVE]
> **The single most examinable sentence about VMI is *"the customer does not generate a P.O."*** — because it inverts the entire procurement cycle from Unit 4.
>
> | | **Normal procurement** | **VMI** |
> |---|---|---|
> | Who decides what to order | **the customer** | **the supplier** |
> | Who raises the order | **customer** → PO | **supplier** → CRP order |
> | Direction of the trigger | customer **pulls** | supplier **pushes**, informed by consumption |
> | What the customer sends | **a purchase order** | **stock, sales and promotion data** |
>
> **Everything Unit 4's procurement chapter described — requirement determination, source determination, order processing — is done by the *vendor*.** The customer's remaining role is **to send data and to review**.
>
> **Why this is better rather than merely different:** the supplier now sees **actual consumption** rather than **a filtered order signal**. In normal procurement, the retailer's ordering pattern is the *only* thing the supplier can see — and that pattern is distorted by the retailer's own batching, safety stock and lot sizing. **VMI removes the distortion by sharing the underlying data**, which is exactly why *"eliminating bullwhip effect"* is the first benefit listed.
>
> **Note the "review the order, if required make changes" step.** VMI is not blind — **the customer retains a veto**, which is what makes it acceptable. And **payment by electronic fund transfer without an invoice-driven cycle** is essentially **ERS from Unit 4** — the supplier's system invoices itself, because both parties already agree on quantity and price.

> [!EXAM]
> **Benefits of VMI:**
> 1. **Eliminating Bullwhip effect — less variability**
> 2. **Uniform production for supplier**
> 3. **Lower administration cost**
> 4. **Lower transportation costs**
> 5. **Lower inventories**
> 6. **Increased sales and service**
> 7. **Suppliers know real market demand information**
>
> **Difficulties faced in VMI:**
> - **Unstable pricing environment / sudden surge in demand are difficult to handle**
> - **VMI requires a critical volume of business (% of supply)**

> [!TRAP]
> **The seven benefits are not independent — six of them follow from the seventh, and showing that chain is what earns marks.**
>
> $$\textbf{suppliers know real market demand} \Rightarrow \textbf{less variability (bullwhip gone)} \Rightarrow \textbf{uniform production} \Rightarrow \textbf{lower inventories and transport costs}$$
>
> **"Suppliers know real market demand information" is the cause; the rest are effects.** And *"lower administration cost"* comes from a different cause — **no PO, no invoice matching, no order chasing** — while *"increased sales and service"* comes from better availability.
>
> **The two difficulties are equally worth understanding rather than memorising:**
>
> **① "Unstable pricing environment / sudden surge in demand."** VMI works by extrapolating consumption. **A price change or a demand spike breaks the extrapolation** — and because the customer is no longer ordering, **there is no signal to say the world changed** except the data itself, arriving after the fact. *(This is exactly why *planned future promotions* is one of the three EDI feeds — it is the mechanism for warning the supplier about a deliberate demand spike.)*
>
> **② "VMI requires a critical volume of business (% of supply)."** Setting up VMI costs both parties real integration effort. **A supplier providing 2% of your purchases cannot justify it, and neither can you** — the saving is proportional to volume while the setup cost is fixed.
>
> ⚠️ **That threshold is why VMI is a Wal-Mart-and-P&G story rather than a universal practice**, and why the procurement chapter places supplier collaboration at **level 2 and 3 of the maturity model** rather than level 1. **It is available only to relationships large enough to pay for it.**

---

**Next:** the standard that formalises collaboration — **CPFR & the bullwhip effect**.
