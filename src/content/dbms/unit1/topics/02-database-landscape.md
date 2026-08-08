---
subject: dbms
unit: 1
order: 2
slug: database-landscape
title: Why Databases, Applications & OLTP vs OLAP
summary: The six reasons databases are worth studying mapped to the sub-fields that deliver them, the six application domains with their named examples, the OLTP versus OLAP split, and the view of data through data models and abstraction.
minutes: 9
tags: [applications, OLTP, OLAP, data-mining, data-model, semantic-data-model, view-of-data]
---

# Why Databases, Applications & OLTP vs OLAP

## Why study databases?

The lecture's own list — each item names the sub-field of the course that delivers it:

| Databases help us to… | Delivered by |
|---|---|
| Store **large amounts** of data | file structures, disk management |
| **Understand** the data | data models |
| Keep data **secure** | security, recovery |
| **Find and manipulate** required data | query languages, concurrency control, analysis tools |
| Get **accurate** information | built-in constraints and checks |
| Maintain **data integrity** | ensuring data stays accurate and consistent |

> [!INTUITION]
> Read the right-hand column as a **syllabus**. Every one of those six sub-fields becomes a block of this course: file structures and indexing, the ER and relational data models, transactions and recovery, relational algebra and SQL, constraints and keys, normalization. The list is not motivational filler — it is the course map in disguise.

---

## Database applications

> [!NOTE]
> | # | Domain | Uses | Named example |
> |---|---|---|---|
> | 1 | **Enterprises** | CRM, supply chain, HR/payroll, financial systems | **Salesforce** CRM |
> | 2 | **Manufacturing** | Production tracking, supply chain, product lifecycle management | **Toyota** — Just-In-Time (JIT) manufacturing |
> | 3 | **Banking & Finance** | Account management, loan processing, fraud detection | **JPMorgan Chase** |
> | 4 | **Web-based services** | User data, content management, analytics | **Netflix** — preferences, recommendations, streaming |
> | 5 | **Document databases** | Semi-structured data as **JSON / BSON / XML**, flexible schema, horizontal scale | **MongoDB** — used by *The New York Times* |
> | 6 | **Navigation systems** | Location data, real-time traffic, route optimisation | **Google Maps** |

Some detail worth carrying into an answer:

- **Enterprises** — CRM stores customer interactions, preferences and sales data; supply chain tracks inventory, suppliers and logistics; HR manages employee data, payroll and benefits; financial systems handle accounting, budgeting and reporting.
- **Manufacturing** — production tracking monitors schedules, inventory levels and quality control; product lifecycle management tracks design, development and updates.
- **Document databases** — used for content management systems, catalogues and data lakes, **where data doesn't fit neatly into relational models**. They scale **horizontally across multiple servers**.
- **Navigation** — often **integrated with other systems** such as weather services, local businesses and emergency services.

> [!EXAM]
> *"List and describe three real-world applications of databases in different industries"* is asked directly in the deck's own review questions. Give the **domain, the specific database task, and the named company** — the named example is what separates a full-mark answer from a generic one.

> [!INTUITION]
> Item 5 is the odd one out and is there deliberately. Domains 1–4 and 6 are *industries*; **document databases are a different kind of database**. The slide is planting the idea that not all data fits the relational model — content, catalogues and data lakes are **semi-structured**. That thread is picked up properly in **Unit 4 (NoSQL)**; here it is just a flag that the relational model is a choice, not a law.

---

## How databases are used: OLTP vs OLAP

> [!EXAM]
> Two modes of database use today:
>
> | | **OLTP** | **OLAP / Data Analytics** |
> |---|---|---|
> | Stands for | **Online Transaction Processing** | **Online Analytical Processing** |
> | Workload | A **large number of users** doing **small** retrievals and updates | Processing data to **draw conclusions** and build **predictive models** for business decisions |
> | Typical of | Banking, universities, airlines — most database applications | Loan approval, targeted advertisements, manufacturing decisions |
> | Related technique | — | **Data mining** — AI + statistical techniques for efficient analysis of large databases |

> [!INTUITION]
> The distinction is **many small writes** versus **few enormous reads**. An OLTP query touches one account and must finish in milliseconds; an OLAP query may scan every transaction of the last five years and can afford to take minutes. Because the two access patterns are so different, they end up wanting **opposite physical designs** — which is why organisations often run separate systems for each rather than one database serving both.

> [!TRAP]
> A question naming *"a large number of users making small updates"* wants **OLTP**. A question naming *"predictive models"*, *"business decisions"* or *"data mining"* wants **OLAP**. The giveaway is never the size of the database — both can be huge — it is **the shape of the workload**.

---

## View of data

A database system is a collection of interrelated data plus a set of programs to access and modify it. A **major purpose** of a database system is to give users an **abstract view** of the data. Two ideas deliver that:

| Idea | Meaning |
|---|---|
| **Data model** | A collection of **conceptual tools** for describing **data, data relationships, data semantics and consistency constraints**. The structure of a database *is* defined by its data model. |
| **Data abstraction** | **Hiding the complexity** of the underlying data structures from users, through several **levels of abstraction**. |

> [!EXAM]
> The definition of a data model is a standard short-answer question, and it has **four** components — *data, data relationships, data semantics, and consistency constraints*. Dropping "semantics" or "constraints" is the usual way marks are lost.

> [!NOTE]
> **Where the data model sits.** Ramakrishnan & Gehrke draw a useful distinction: a **data model** (like the relational model) is what the DBMS actually implements, while a **semantic data model** is *more abstract, higher-level*, designed to make it easy for a human to first describe an enterprise.
>
> The **ER model is a semantic data model** — you design in ER because it is close to how people think, then **translate** that design into the relational model the DBMS supports. That translation is precisely the *"reducing ER to a relational schema"* item in the Unit 1 syllabus.

> [!INTUITION]
> This is worth holding onto because it explains the shape of the whole unit. You will learn **two** models back to back and it can feel redundant — why draw diamonds and ellipses if the answer is tables anyway? Because the ER model is optimised for **thinking**, and the relational model for **implementing**. The unit teaches you to design in the first and deliver in the second, and the reduction step between them is where the marks live.

---

**Next:** why we don't simply use files — **file-processing problems and the purpose of a DBMS**.
