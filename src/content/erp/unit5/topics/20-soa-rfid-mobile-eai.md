---
subject: erp
unit: 5
order: 20
slug: soa-rfid-mobile-eai
title: SOA, RFID, Mobile & EAI
summary: Enterprise services and the seven SOA principles with their benefits, RFID's three components and its advantages over bar codes, mobile technology and m-commerce transactions, EAI and why the hub model beats point-to-point, and the journey to ERP II.
minutes: 12
tags: [SOA, web-services, reusability, loose-coupling, RFID, active-tag, passive-tag, bar-code, mobile, m-commerce, EAI, point-to-point, ERP-II]
---

# SOA, RFID, Mobile & EAI

## Enterprise services

> [!EXAM]
> **Service:**
> - **Services refer to the building blocks — the containers in which the data and programs from ERP, CRM, and so on are collected for use in creating new systems**
> - **These building blocks can be understood both by business executives and IT staff, because each of these services is actually a business function**
> - **Web Services are the building block for service-oriented architecture. These services are functional building-blocks accessible over standard Internet protocols, independent of platforms and programming languages**
> - **Today all leading ERP vendors have started building a repository of enterprise services for the different business processes / functionalities they offer**
>
> **Advantages of a Service:** **Re-usability · Easy Integration**

> [!INTUITION]
> **The defining phrase is *"each of these services is actually a business function."***
>
> A service is not a technical routine — it is something like ***"check credit"***, ***"create sales order"***, ***"post goods receipt."*** **That is what makes it *"understood both by business executives and IT staff"*** and what makes composing services into processes a business activity rather than a programming one.
>
> $$\textbf{business function} \;\equiv\; \textbf{callable service}$$
>
> **And *"independent of platforms and programming languages"* is what makes it work across vendors.** A service exposed by SAP can be called by a .NET application, because both speak standard internet protocols. **That is the property that lets an enterprise assemble a process from pieces of different systems** — which is exactly the *"any process can be made of separate services"* diagram the deck draws, showing an order flowing through **Order Management System, Inventory, Data Collection, ERP/Procurement, Web/E-Commerce** across **OEM, Users, Resellers and Suppliers.**

## Service Oriented Architecture

> [!EXAM]
> - **SOA is a flexible set of design principles that is used during system development and integration**
> - **SOA relies on a mesh of software services which are loosely coupled and can be combined to build any business process application**
> - **SOA defines how to integrate widely disparate applications for a world that is Web based and can use multiple platforms from different vendors like SAP (NetWeaver), Oracle, IBM (WebSphere) or Microsoft (.Net)**
> - **SOA helps in building large applications from existing software services, reducing the need for programming and testing to a bare minimum, as these web services from different applications are already tested**
>
> **SOA principles:**
> 1. **Re-usability**
> 2. **Modularity**
> 3. **Composability**
> 4. **Componentization**
> 5. **Interoperability**
> 6. **Loose Coupling**
> 7. **Standards-compliance**

> [!EXAM]
> **SOA Benefits:**
> - **SOA can help businesses respond more quickly and cost-effectively to changing market conditions**
> - **This style of architecture promotes reuse — what has been already developed can be reused, saving time and cost**
> - **Dramatically simplified testing, as services are independently fully tested by the vendor who publishes them, with full documentation of interfaces**
> - **Application integration savings**
> - **Because interfaces are platform-independent, a client from any device using any operating system in any coding language can supposedly access or use the service**
> - **SOA also opens up opportunities for thousands of small niche vendors who have specialized knowledge in a particular business process — now they can build applications which can be quickly integrated with SAP or Oracle, providing them a larger market opportunity**

> [!DERIVE]
> **The seven principles are not seven ideas — they are three ideas stated with different emphases**, and grouping them is how you reproduce them:
>
> | Idea | Principles |
> |---|---|
> | **Break it into pieces** | **modularity · componentization** |
> | **Make the pieces fit together** | **composability · interoperability · standards-compliance** |
> | **Keep the pieces independent** | **loose coupling · re-usability** |
>
> **Loose coupling is the load-bearing one.** It means a service can be **changed or replaced without breaking its callers**, because they depend on its *interface*, not its internals. **Without loose coupling, "composable" services become a tangle that cannot be changed** — which is exactly what tightly-integrated custom interfaces produce.
>
> **The last benefit is the most strategically interesting and is easy to skim past:**
>
> > *"SOA opens up opportunities for **thousands of small niche vendors** who have specialized knowledge in a particular business process — now they can build applications which can be **quickly integrated with SAP or Oracle**."*
>
> **That is a market-structure claim, not a technical one.** By making integration cheap, SOA **lowers the barrier to entry for specialists** — which is precisely the mechanism behind Unit 3's *"the specialized products are getting specialized further and maintain independent identity."* **SOA is part of why best-of-breed remained viable against the suites.**
>
> **And "simplified testing" deserves a sentence:** services are *"independently fully tested by the vendor who publishes them."* **You test the composition, not the components** — which is a real reduction in effort, and the same logic as buying a package instead of building one.

## RFID

> [!EXAM]
> **RFID technology components:**
>
> **Tags** — **RFID tags are affixed to objects and information is written to an embedded chip in the tag**
> - **Active** — **includes a power source to help transmit a signal**
> - **Passive** — **no power to transmit signal; relies on readers**
>
> **Reader** — **emits a radio signal via an antenna**
>
> **Antenna** — **device attached to a reader which helps transmit radio signals and capture "scan" readings**
>
> **How RFID operates:** **tags can be read remotely when they detect a radio frequency signal from a reader over a range of distances** · **readers then either send tag information to back-end systems for processing, or display it to the end user**

> [!EXAM]
> **Advantages of RFID over traditional Bar Code:**
> - **RFID's most talked about advantage is that it does not require a line of sight between reader and tag.** In case of bar code, **each item must be presented to the scanner in a particular orientation and brought sufficiently close** so that a person can scan each item with the laser beam
> - **RFID tags can hold lots of data — up to hundreds of characters — whereas bar codes can store only 12–15 digits**
> - **RFID tags can be rewritten thousands of times, whereas bar codes can be printed only once on a product label.** **On an RFID tag, at different nodes of the supply chain — factory, warehouse etc. — data can be continuously added, which is not possible for a bar code: once the bar code is printed it is frozen**
> - **Manual labor associated with reading bar-code data is reduced, because the RFID scanning device can gather data automatically from items kept deep inside boxes**
>
> **Disadvantages:**
> - **Bar codes have been there for some time now and have reached a high level of maturity, whereas RFID needs to stabilize on standards**
> - **The main barrier of RFID technology is the cost of the tag**

> [!DERIVE]
> **Three advantages, and each removes a different constraint — that structure is the answer to the question bank's *"what are the advantages and disadvantages of RFID over bar code?"***
>
> | Advantage | Constraint removed |
> |---|---|
> | **No line of sight** | **a human must handle each item** |
> | **Hundreds of characters vs 12–15 digits** | **the tag can only identify, not describe** |
> | **Rewritable thousands of times** | **the label is frozen at printing** |
>
> **The first is the transformative one.** No line of sight means **an entire pallet can be read as it passes through a doorway** — *"items kept deep inside boxes"* — instead of being unpacked and scanned one by one. **That converts goods receipt from a manual task into an automatic event**, which is exactly why Unit 4's GR process listed *"bar codes, RFID — simpler, faster process."*
>
> **The third is the subtle one and is worth spelling out.** Because a tag is **rewritable**, data can be **added at each node**: the factory writes the batch, the warehouse writes the location, the distributor writes the shipment. **The tag accumulates a history that travels with the object** — which is precisely what **e-pedigree** in pharma requires, and what **batch traceability** needs.
>
> $$\textbf{bar code: an identifier} \qquad\qquad \textbf{RFID tag: a travelling record}$$
>
> **And the two disadvantages are honest and decisive.** **Standards immaturity** is a temporary problem; **tag cost is a structural one.** A bar code is printed ink and costs essentially nothing; a tag costs real money **per item.** That is why RFID spread at **pallet and case level long before item level** — the tag cost is amortised over more value. **It is the same ABC logic: apply the expensive control where the value justifies it.**

> [!EXAM]
> **RFID benefits in the supply chain**, as the deck's diagram shows across **Manufacturer Plant → Manufacturer DC → Retailer DC → Retail Store**:
>
> **Tracking of items · Reduced Shrinkage · Better Replenishment · Efficient Reverse Logistics · Improved Inventory, Receiving, and Shipping Accuracy**
>
> with **demand / information flow** running one way and **physical product flow** the other.

> [!TRAP]
> **Every RFID benefit on that diagram is a Unit 4 KPI improved**, and pairing them makes the answer concrete:
>
> | RFID benefit | KPI it improves |
> |---|---|
> | **Reduced shrinkage** | **Shrinkage** — *costs of breakage, pilferage, deterioration* |
> | **Improved inventory accuracy** | **Inventory Cycle Counting Accuracy** |
> | **Better replenishment** | **Stock outs** · **Inventory Turn** |
> | **Efficient reverse logistics** | the **Return** process of SCOR |
>
> **And "improved inventory accuracy" is the one with knock-on value**, because the inventory pyramid's whole point was that **the planning layer runs on the control layer's numbers.** Better counts do not just reduce shrinkage — **they make every model above them trustworthy.**

## Mobile technology

> [!EXAM]
> **Mobile Technology Advantages:**
> - **Very useful for sales staff or service / maintenance staff who most of the time remain in the field, and for whom it is difficult to come to office for doing transactions in ERP or enterprise applications**
> - **Sales associates can provide quick real-time service to customers using a mobile device**
> - **Mobile devices increase sales people's productivity — while visiting a customer they can quickly get access to all information related to the customer, past transactions etc.**
> - **Mobile devices also make life simple for field staff like maintenance crew**
> - **Mobile devices can be used effectively to provide an extra high level of service for a company's special customers, for whom service is a clear differentiator**
> - **Mobile commerce is somewhat similar to e-commerce, where instead of internet, mobile phones, PDAs or other wireless devices are used either to purchase an item / service directly or for accessing shopping information**
>
> **Typical M-Business Transactions:**
> 1. **Inventory Management**
> 2. **Price check**
> 3. **Supply Chain Management**
> 4. **Stock Management**
> 5. **Customer Service**
> 6. **Payment via Mobile phone**
> 7. **Product ordering**

> [!EXAM]
> **ERPs can now be accessed from different channels**, as the deck's diagram shows:
> - **Mobile** — *"sales guy can access ERP from his mobile to get needed info"* · *"ERP can instruct the field staff on his PDA regarding his next job"*
> - **Internet** — *"customer orders online and that creates an order in the back-end ERP system"*
> - **Contact Center** — *"contact center staff can take a service request on phone and create a service order in back-end ERP"*
> - **VPN** and **within company (face-to-face)**

> [!INTUITION]
> **Notice that the mobile advantages are exactly the CRM field-service and SFA arguments, restated.**
>
> **Field service** said mobile solutions were *"increasingly an important component"* because engineers are never at a desk. **SFA** said its whole point was that salespeople *"need not remember or store contact information of thousands."* **Mobile is what makes both real.**
>
> $$\textbf{the transaction happens where the work happens}$$
>
> **That single principle appears five times in this course** — **ESS** (employees update their own data), **e-procurement for indirect items** (the requester orders), **self-service in call centres** (the customer solves it), **mobile field service**, and **e-commerce**. **Every one moves the transaction to the person or place that has the information, and removes an intermediary.**
>
> **And the multi-channel diagram is what ERP II actually looks like in practice:** the same back-end ERP, reached through **mobile, internet, contact centre and VPN.** **The system did not change; the number of doors into it did.**

## Enterprise Application Integration

> [!EXAM]
> - **Enterprise Application Integration is an integration framework composed of a collection of technologies and services that form a middleware to enable integration of systems and applications across the enterprise**
> - **EAI needs to link various applications that reside on different operating systems, use different database solutions and different computer languages**
>
> **Leading EAI products:**
> **IBM (WebSphere Business Integration) · Microsoft (BizTalk Server) · SAP (NetWeaver Process Integration — PI) · Oracle (Fusion Middleware) · Sterling Commerce · Tibco Software**
>
> The deck contrasts **Point-to-Point connection vs EAI.**

> [!DERIVE]
> **The point-to-point versus hub comparison is the question bank's *"how is the EAI hub model better than point-to-point connection?"*, and the arithmetic is the answer.**
>
> With **point-to-point**, every pair of systems that must talk needs its own interface. For $n$ systems, connecting all of them takes:
>
> $$\frac{n(n-1)}{2} \textbf{ interfaces}$$
>
> **With an EAI hub, each system connects once to the middleware:**
>
> $$n \textbf{ interfaces}$$
>
> | Systems | **Point-to-point** | **Hub** |
> |---|---|---|
> | 5 | **10** | **5** |
> | 10 | **45** | **10** |
> | 20 | **190** | **20** |
>
> **The gap widens quadratically**, and the maintenance burden widens with it: in point-to-point, **changing one system's format means changing every interface that touches it.** In a hub, **you change one connection.**
>
> **And EAI is what makes ERP II possible.** *"ERPs now can be integrated with best-of-breed vendors seamlessly with one interface"* is a named driver of the journey from ERP to ERP II — and *"with one interface"* is precisely the hub model. **Without it, the co-existence of ERP, CRM, SRM, SCP and PLM that this whole course describes would be unmanageable.**
>
> **Note that SOA and EAI answer the same problem from two directions:** **EAI is middleware that connects existing applications**; **SOA is a design principle that makes applications connectable in the first place.** SAP's **NetWeaver PI** appears as an EAI product, and **NetWeaver** appears in the SOA slide as a platform — **the same product family serving both.**

## The journey to ERP II

> [!EXAM]
> - **ERP's focus was totally enterprise-centric and focused on internal resource optimization and transactional processing.** **ERP II has a new focus on process integration and external collaboration**
> - **Collaborative commerce with suppliers and customers is the heart of ERP II**
> - **ERP II also showed the strength of the internet. Applications like SRM, CRM and PLM today depend much on the internet for most of their functionalities**
>
> **Major drivers for the journey from ERP to ERP II:**
> 1. **ERPs are extending outside the organization**
> 2. **ERPs now can be accessed from anywhere anytime**
> 3. **ERP now can be integrated with best-of-breed vendors seamlessly with one interface**

> [!INTUITION]
> **The three drivers are the three technologies of this topic, one each:**
>
> | Driver | Technology |
> |---|---|
> | **extending outside the organization** | **SOA and web services** — cross-company process composition |
> | **accessed from anywhere anytime** | **mobile, internet, cloud** |
> | **integrated with best-of-breed with one interface** | **EAI** |
>
> **That is why these four technologies are taught together.** They are not a miscellany of trends — **they are the specific enablers that turned ERP into ERP II.**
>
> **And the closing contrast is the unit's own summary:**
>
> $$\textbf{ERP: internal resource optimization} \;\longrightarrow\; \textbf{ERP II: process integration and external collaboration}$$
>
> **"Collaborative commerce with suppliers and customers is the heart of ERP II"** — and this unit has shown exactly what that means in practice: **VMI and CPFR** with suppliers, **CRM and e-commerce** with customers, **SCM** across the network, and **DW-BI** to understand all of it.

---

**Unit 5 complete.** From **the customer** (CRM) through **the product** (PLM) and **the network** (SCM) to **the data about all of it** (DW-BI), then **how it differs by industry** and **how it is delivered now** — cloud, SaaS, SOA, RFID, mobile and EAI, which together are the journey from ERP to **ERP II**.
