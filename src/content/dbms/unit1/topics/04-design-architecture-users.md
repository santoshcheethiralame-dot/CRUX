---
subject: dbms
unit: 1
order: 4
slug: design-architecture-users
title: Database Design, Architectures & Users
summary: The four phases of database design, the DBMS component modules and utilities, the database architectures (centralized to distributed, two- vs three-tier), and the types of database user.
minutes: 13
tags: [database-design, architecture, client-server, three-tier, users, dba]
---

# Database Design, Architectures & Users

## Database design phases

> [!NOTE]
> | # | Phase | Activity |
> |---|---|---|
> | **1** | **Requirements specification** | Interact with users/domain experts to capture data needs + operations |
> | **2** | **Conceptual design** | Build a high-level model (the **E-R model**) → conceptual schema |
> | **3** | **Logical design** | Map the conceptual schema to the implementation model (**relational**); apply **normalization** to group attributes & reduce redundancy |
> | **4** | **Physical design** | Specify file organisation, **indexing**, storage structures for performance |

> [!INTUITION]
> Design flows from *abstract to concrete*: **what the users need** → an **ER model** (conceptual) → **tables** (logical) → **storage & indexes** (physical). Each phase is reviewed before the next.

## DBMS components & utilities

**Component modules:** **SDM (Stored Data Manager)** — controls disk access; **DDL compiler** — processes schema definitions, stores metadata in the catalog; **Query compiler** — parses/optimises queries; **Pre-compiler** — extracts DML from application programs; **Runtime DB processor** — executes queries/transactions.

**Utilities:** **Loading** (import/convert data), **Backup** (incremental/total), **Storage reorganisation**, **Performance monitoring**.

## Database architectures

| Architecture | Idea |
|---|---|
| **Centralized** | All data on one central server / shared memory — simple; small-to-medium or legacy systems |
| **Client-Server** | A **client** (browser/app) requests; a **server** (MySQL, Oracle, Postgres) manages and serves data |
| **Parallel** | Runs on a **cluster** (many cores, shared memory/disk) — high-performance analytics & data warehousing (*NASA HPC*) |
| **Distributed** | Data spread across **multiple physical locations** — scalability, fault tolerance (replication), performance |

### Two-tier vs Three-tier client-server

> [!EXAM]
> - **Two-tier:** **Client (UI)** ↔ **Server (DB)**. Clients send queries via **ODBC / JDBC** APIs; the server processes and returns results.
> - **Three-tier:** **Client** ↔ **Application/Web server** (business logic) ↔ **Database server**. Common for web apps; **enhances security** — clients **cannot directly access** the DB server, only via the middle tier.

> [!INTUITION]
> Match the architecture to the need: a weather-forecasting system (huge sensor data) → **parallel**; an e-learning platform → **3-tier**; a global social-media platform (massive read/write, huge content) → **distributed**.

## Database users

> [!NOTE]
> | User | Description |
> |---|---|
> | **Naïve / Parametric** | Use **predefined interfaces** without DB knowledge (e.g. booking a movie ticket) |
> | **Application Programmers** | **Back-end developers** who write the application programs/queries |
> | **Sophisticated Users** | Analysts/engineers who write their own **DDL/DML** SQL directly |
> | **Database Administrator (DBA)** | Manages the DB: **schema, access control, performance, backup/recovery** |

> [!EXAM]
> The four user types: **Naïve, Application Programmers, Sophisticated, DBA.** A *naïve/parametric* user interacts through a canned interface (movie booking); the **DBA** has the highest authority over the database.

---

**Next:** the conceptual design tool — **the E-R model: entities & attributes**.
