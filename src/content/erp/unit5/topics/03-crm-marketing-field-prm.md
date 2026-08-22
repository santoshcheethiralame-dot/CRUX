---
subject: erp
unit: 5
order: 3
slug: crm-marketing-field-prm
title: CRM Applications II — Marketing, Field Service & PRM
summary: Enterprise marketing management with its six capabilities, field service applications and the scheduling problem they solve, partner relationship management and channel selling, and revenue, pricing and product configuration.
minutes: 12
tags: [marketing-management, campaign-management, loyalty, field-service, workforce-scheduling, reverse-logistics, PRM, channel-inventory, price-optimization, product-configuration]
---

# CRM Applications II — Marketing, Field Service & PRM

## Marketing management

> [!EXAM]
> - **These applications are used by companies to manage their end-to-end process from gathering and analyzing customer data across web sites and other channels, to planning, budgeting, to executing customer communications and measuring results / effectiveness**
> - **It helps the enterprise identify and target its best customers and generate qualified leads for the sales team**
> - **Marketing automation also encompasses capabilities for managing customer loyalty, lists, collateral, and internal marketing resources**
> - **These tools support an integrated approach to marketing strategy, development, delivery, and measurement across the marketing mix**
>
> **Typical capabilities of Marketing Management applications:**
> 1. **Campaign management**
> 2. **Customer interaction management**
> 3. **Marketing planning**
> 4. **Marketing resource and asset management**
> 5. **Opportunity / Lead management**
> 6. **Loyalty marketing**

> [!DERIVE]
> **The description is a closed loop, and reading it as one is the strongest way to answer *"how do enterprise marketing management applications help?"***
>
> $$\textbf{gather and analyse} \rightarrow \textbf{plan and budget} \rightarrow \textbf{execute communications} \rightarrow \textbf{measure results} \rightarrow \textit{(back to gather)}$$
>
> **The stage that distinguishes marketing *automation* from marketing is the last one — measurement.** Traditional marketing spend was famously unmeasurable; the whole point of running campaigns through a system is that **response is recorded against the customer record**, so effectiveness becomes a number.
>
> That is exactly what **marketing analytics** delivers in the next topic: *"tools to measure the effectiveness (**ROI**) of a marketing / sales promotion campaign."*
>
> **And notice the handoff: "generate qualified leads for the sales team."** Marketing's output is **SFA's input** — which is why *"opportunity / lead management"* appears in **both** application lists. **It is the seam between the two functions**, and unqualified leads dumped on a sales team is the classic form of that seam failing.

> [!TRAP]
> **Two capabilities are easy to misread.**
>
> **"Marketing resource and asset management"** is not about customers at all — it manages **the marketing department's own** resources: budgets, agencies, creative assets, brochures, campaign collateral. **It is internal administration**, and it appears because marketing spend is large and hard to track.
>
> **"Loyalty marketing"** is structurally different from the rest: campaigns target **acquisition**, loyalty targets **retention**. They pull on opposite ends of the funnel — and the benefits list names both, **"focused marketing"** and **"increased customer retention / loyalty."**
>
> ⚠️ **The economics favour loyalty and it is worth saying so:** retaining an existing customer costs far less than acquiring a new one, and the existing customer is already in the single customer view — you know what they bought and what they might buy next. **Which is why "better profitability / revenue per customer" is the first benefit listed.**

## Field service applications

> [!EXAM]
> - **These applications typically help in different after-sales service functions, i.e. help managing installation, service, or repairs of systems or equipment**
> - **These solutions also support scheduling workforce — i.e. which worker should go to which customer site and attend which type of equipment / problem, based on the worker's availability and skill**
> - **Some of these after-sales service activities need spares — managing reverse logistics and spare parts management are under the domain of these applications**
> - **As companies need to manage a large number of mobile technicians distributed across different customer sites, Mobile solutions are increasingly becoming an important component of field service applications**
>
> **Typical capabilities of field service applications:**
> 1. **Field service management**
> 2. **Scheduling workforce**
> 3. **Managing spares / service parts**
> 4. **Mobile Solutions capability**

> [!INTUITION]
> **Field service is genuinely hard, and the reason is that it is a *constrained assignment* problem, not a data problem.**
>
> The deck states the constraints precisely: **which worker → which site → which equipment / problem**, based on **availability and skill**. Every job needs:
>
> | Constraint | Meaning |
> |---|---|
> | **Skill** | not every engineer can service every machine |
> | **Availability** | they are already booked, or driving |
> | **Location** | travel time between sites is real and expensive |
> | **Parts** | the right spare must be **on the van**, or the visit is wasted |
>
> **Any three of those can be satisfied while the fourth fails — and the visit still achieves nothing.** An engineer with the skill, the time and the location but not the part has to come back tomorrow, doubling the cost of the repair.
>
> **This is why "managing spares / service parts" sits in a customer-relationship module at all.** It looks like inventory management, and it is — **but the inventory is distributed across vans**, and the service level it supports is *first-time fix rate*.
>
> **And "reverse logistics" is the direction that makes it distinctive:** the faulty part has to come **back** — to be repaired, refurbished or scrapped. Normal supply chains move goods outward; **service supply chains move them both ways**, which is exactly why **Oracle Inventory Management** was described in Unit 4 as supporting *"inbound, outbound **and reverse** logistics."*

> [!TRAP]
> **"Mobile solutions" is listed as a capability, not a delivery preference, and the reason is structural.**
>
> A field engineer is **by definition never at a desk.** If the system can only be updated from an office, then either the engineer drives back to update it — losing half a day — or **updates it from memory at the end of the week**, which produces late and inaccurate data.
>
> $$\textbf{no mobile access} \;\Rightarrow\; \textbf{data entered late from memory} \;\Rightarrow\; \textbf{the single customer view is wrong}$$
>
> **This is the same argument as ESS and as e-procurement for indirect items**, and it reappears in the emerging-technologies chapter as one of **mobile technology's stated advantages**: *"it is very useful for sales staff or service / maintenance staff who most of the time remain in the field and for whom it is difficult to come to office for doing transactions."*

## Partner Relationship Management

> [!EXAM]
> - **PRM applications help companies to manage relationships with different channel partners and thus optimize sales opportunity**
> - **PRM solutions can help in activities like: partner recruitment and profiling, lead distribution and forecasting, taking partner orders, marketing promotion, partner training, joint business planning, collaborative sales, partner performance management**
>
> **Typical capabilities of Partner Relationship Management applications:**
> 1. **Partner addition**
> 2. **Distributing leads**
> 3. **Partner profiling**
> 4. **Managing different partner programs**
> 5. **Partner opportunity tracking**
> 6. **Special partner discounts and approvals**
> 7. **Partner service**
> 8. **Managing channel inventory / partner pipeline**

> [!DERIVE]
> **PRM exists because many companies do not sell to their customers directly** — they sell **through** dealers, distributors, resellers and system integrators. That creates a problem CRM alone cannot solve.
>
> | | **Direct selling (CRM)** | **Channel selling (PRM)** |
> |---|---|---|
> | Who meets the customer | **your** salesperson | **the partner's** salesperson |
> | Who controls them | you — they are employees | **nobody** — the partner is an independent business |
> | Who sees the end customer | you | **the partner** |
>
> **The core difficulty: you cannot instruct a partner, you can only make it attractive for them to sell your product rather than a competitor's.** Every PRM capability is a lever for that:
>
> - **Distributing leads** — you give them business; they reciprocate with attention
> - **Special partner discounts** — margin is the direct incentive
> - **Partner training** and **partner service** — you make it *easy* to sell your product
> - **Partner performance management** — you find out which partners deserve more leads
>
> **"Managing channel inventory / partner pipeline" is the most valuable and the most difficult capability.** Once goods ship to a distributor you have booked the revenue — but **you no longer know whether they have been sold to an end customer or are sitting in the distributor's warehouse.**
>
> $$\textbf{sold to the channel} \;\neq\; \textbf{sold to the customer}$$
>
> **That gap is where the bullwhip effect is born**, and it is precisely what **VMI** and **CPFR** exist to close on the supply side. **Channel inventory visibility is the demand-side version of the same problem** — and mistaking channel stocking for real demand is how a company keeps producing into a market that has already stopped buying.

## Revenue, pricing and product configuration

> [!EXAM]
> **Revenue and Pricing Management applications:**
> - **Help companies to optimize and manage prices throughout the product life cycle, including initial pricing, promotional, and markdown or clearance pricing**
> - **Price optimization solutions analyze historical data and incorporate competitive and market information to determine the price sensitivity of a product or a market segment. These models are then used to generate the optimal pricing policy**
> - **Price analytics solutions analyze market and historical data and can provide price insights that might otherwise be hard to identify**
>
> **Typical capabilities:** **Trade promotion management · Promotions · Pricing and promotion optimization**
>
> **Product Configuration applications:**
> - **Help customers to configure a product as per their desired specification on the web**
> - **Based on this configuration, the company's sales staff can quote and generate a price proposal quickly**
> - **These applications can automate sales and product configuration, proposal configuration, cost estimation and pricing, and can compress the entire lead-to-order process**
> - **These tools are popular for complex products and services**

> [!INTUITION]
> **Pricing is treated as a *life-cycle* decision, and that is the point of the phrase "throughout the product life cycle."**
>
> $$\textbf{initial pricing} \rightarrow \textbf{promotional} \rightarrow \textbf{markdown / clearance}$$
>
> **The same product has three different correct prices at three different moments** — full price when it is new, discounted during a promotion, and cleared at whatever it will fetch at end of life. **Getting the third one right is worth a great deal**, which is why *"markdowns (mainly for apparel industry)"* appears as an industry-exclusive process later in this unit.
>
> **"Price sensitivity of a product or a market segment" is the concept underneath it all:** how much does demand fall when the price rises? **If demand is insensitive you are leaving money on the table; if it is sensitive, a small cut can pay for itself in volume.** That is not knowable by intuition, which is why it is computed from historical and competitive data.
>
> **Product configuration solves a different problem — the *quoting* bottleneck.** For a complex product with thousands of valid combinations, a salesperson historically had to go back to engineering to find out **whether a requested configuration was even buildable**, and then to finance for a price. That round trip took days.
>
> **The application compresses "the entire lead-to-order process"** by encoding the valid combinations and the pricing rules so the answer is immediate — and by putting it **on the web**, so the *customer* can do it themselves. **It is the configuration counterpart of the e-commerce channel: self-service applied to a task that used to need an expert.**

---

**Next:** measuring it and buying it — **CRM analytics & the vendor landscape**.
