---
subject: dbms
unit: 1
order: 8
slug: design-architecture-users
title: Database Architectures & Users
summary: The four database architectures from centralized to distributed, two-tier versus three-tier client-server with the security argument, the four classes of database user, and the functions of a DBA.
minutes: 11
tags: [architecture, centralized, client-server, parallel, distributed, two-tier, three-tier, ODBC, JDBC, users, dba]
---

# Database Architectures & Users

## Database architectures

| Architecture | Idea | Characteristics | Where it fits |
|---|---|---|---|
| **Centralized** | All data stored and managed on **one central server** | **Single location**; **shared memory** — suits multiple CPUs accessing a common memory space; **centralised resources** (CPU, memory, storage) so it is easier to manage and maintain | Small-to-medium applications with moderate data and user loads; **legacy systems** where scaling is not critical |
| **Client-Server** | A **client** interacts with a **server** to access and manage data | **Client** = user-facing (web browser, mobile app, desktop application); **Server** = backend managing the database, processing requests, handling storage and retrieval (**MySQL, Oracle, Postgres**) | The general model underlying the tiered architectures below |
| **Parallel** | Runs on a **cluster of multiple machines** | Better **scalability** and higher processing capability; **many cores, shared memory and shared disk** | High-performance workloads: **large-scale data warehousing, real-time analytics, high-throughput transactional systems**. Example: **NASA** uses parallel databases and **HPC** to handle satellite data for climate modelling |
| **Distributed** | Data stored across **multiple physical locations** — machines within one data centre, or across geographies | **Scalability** (spread load across nodes); **fault tolerance** and high availability via **replication**; **performance** by distributing queries and data access | Globally-used services with massive read/write volume |

> [!TRAP]
> **Parallel ≠ distributed.** Both use many machines, but parallel databases are about **one system going faster** (a tightly-coupled cluster, often shared memory or shared disk, in one place); distributed databases are about **data living in many places** (loosely coupled, geographically spread, replicated).
>
> The exam tell: *"cluster, high performance, analytics"* → **parallel**; *"multiple physical/geographic locations, fault tolerance, replication"* → **distributed**.

### Two-tier vs three-tier client-server

> [!EXAM]
> | | **Two-tier** | **Three-tier** |
> |---|---|---|
> | Tiers | **Client (UI)** ↔ **Server (database)** | **Client** ↔ **Application/Web server** ↔ **Database server** |
> | Middle tier | none | Stores **web-connectivity software and the business logic** used to access the data; acts as a **conduit** for partially processed data between database server and client |
> | Access path | Client programs send query and transaction requests via **ODBC / JDBC**; the server processes them and returns results, which the client then processes and displays | Clients **cannot directly access the database server** — only via the middle tier |
> | Security | Weaker — clients talk to the database directly | **Enhanced** — the database server is reachable **only** through the middle tier |
> | Typical use | Desktop/LAN applications | **Web applications** |
>
> The three tiers are also named by **layer**: **Presentation Layer** / **Business Logic Layer** / **Database Services Layer**.

Supporting detail on the two-tier model:

- **Clients** provide interfaces through a **client software module** to access server resources. They may be **diskless machines, PCs or workstations** with only the client software installed, connected to servers over a network.
- **Servers** provide **database query and transaction services**. Relational DBMS servers are often called **SQL servers, query servers, or transaction servers**.
- Applications use an **API** to reach server databases via a standard interface: **ODBC** (Open Database Connectivity) or **JDBC** (for Java). **Both client and server must install the appropriate ODBC/JDBC module.**

> [!INTUITION]
> The security argument for three tiers is stronger than it first sounds. In two-tier, **every client holds database credentials** — so the database's own permission system is your only defence, and a compromised laptop is a compromised database account. In three-tier the client holds credentials **for the application**, and only the application server can speak to the database. You have replaced *N* trust relationships with **one**.

> [!EXAM]
> Architecture-matching questions are common. Match on the **dominant requirement**:
> - Huge sensor/satellite data needing heavy computation → **parallel**
> - A web-based e-learning platform → **three-tier**
> - A global social-media platform, massive volume, must survive node failure → **distributed**
> - A small college's internal records system → **centralized**

---

## Database users

People who work with a database split into **database users** and **database administrators**. There are **four types of database-system user**, differentiated by **how they expect to interact with the system** — and different interfaces have been designed for each.

> [!NOTE]
> | User | Also called | Interacts via | Example |
> |---|---|---|---|
> | **Naïve users** | **Parametric end users** | **Predefined interfaces** provided by DBMS applications — no database knowledge needed | Booking a movie ticket. You are a naïve user: complex database operations happen behind the scenes and you need know nothing about them |
> | **Application programmers** | **Back-end developers** | **Write** the application programs | For an e-commerce site: connect the app to the database, write queries to display products, manage registrations and orders, handle database errors, secure user data |
> | **Sophisticated users** | — | **Query tools**; write their own **DDL and DML** directly | Data engineers and developers issuing SQL to fetch, delete, update or insert |
> | **Database administrators (DBA)** | — | **Administration tools** | Defines the schema and controls the database across the organisation |

### Functions of a DBA

> [!EXAM]
> One of the main reasons for using a DBMS is to have **central control of both the data and the programs that access it**. The DBA is the individual or team holding that control. The five functions, as listed:
>
> | Function | Detail |
> |---|---|
> | **Schema definition** | Creates the original database schema using **DDL** statements |
> | **Storage structure and access-method definition** | Specifies parameters for **physical organisation** and **index creation** |
> | **Schema and physical-organisation modification** | Makes changes to reflect the organisation's needs or to **enhance performance** |
> | **Granting authorization for data access** | Regulates user access by granting **different types of authorization** |
> | **Routine maintenance** | Periodic **backups**, ensuring **disk space** availability, **monitoring performance** |

> [!NOTE]
> Ramakrishnan & Gehrke group the same duties under four headings, which is a cleaner structure if you prefer it: **design of the conceptual and physical schemas**; **security and authorization**; **data availability and recovery from failures**; and **database tuning** — modifying the schemas as user needs evolve, to maintain adequate performance.

> [!TRAP]
> **The exam question the lecture plants explicitly:**
>
> > *"Application programmers are responsible for defining storage structures and access methods in the database."* — **FALSE.** That is the **DBA's** job.
>
> The rest of the same drill:
> - A **naïve** user interacts through predefined interfaces and does not need to write code.
> - The **Database Administrator** creates the original schema and manages user access.
> - The user most likely to write a **query language** to retrieve specific data is the **sophisticated user**.
>
> The recurring trap is the boundary between **application programmer** (writes *programs* that use the database) and **DBA** (defines the *database itself* — schema, storage, access, authorization).

> [!INTUITION]
> The four user types line up exactly with the four entry points in the component-modules diagram — parametric users → compiled transactions, casual/sophisticated users → interactive query → optimizer, application programmers → precompiler, DBA staff → DDL statements and privileged commands.
>
> **The user taxonomy is not sociology; it is a description of the four doors into the system**, and each door has different software behind it.

---

**Next:** the tool that does conceptual design — **the E-R model: entities & entity sets**.
