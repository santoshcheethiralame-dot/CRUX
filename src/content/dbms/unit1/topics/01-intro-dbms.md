---
subject: dbms
unit: 1
order: 1
slug: intro-dbms
title: Data, Information, Database & DBMS
summary: The difference between data and information, what a database and a DBMS really are, the four core DBMS functions worked through a student database, and the kind of data database systems exist to manage.
minutes: 9
tags: [database, dbms, data, information, miniworld, metadata, define]
---

# Data, Information, Database & DBMS

## The motivating questions

The lecture opens with a set of questions that all have the same one-word answer:

- How does **Amazon** retrieve exactly the products you might want to buy?
- How does **Instagram** store every post, and pull up a whole profile from a name?
- How does a **bank** keep two simultaneous transactions on one account from corrupting the balance?
- How does your **doctor** see your entire medical history from your ID?
- How does **Google** find relevant pages among millions?

> [!INTUITION]
> The answer to all five is **a database** — but notice that each question stresses a *different* capability: **retrieval**, **storage and relationships**, **concurrency**, **fast lookup**, **search at scale**. Those five capabilities are the skeleton of this entire course. Every later topic — indexes, ER modelling, transactions, normalisation — is a detailed answer to one of them.

---

## Data vs Information

| Term | Meaning |
|---|---|
| **Data** | Raw, unorganised **facts** — the individual puzzle pieces. Must be **processed** to become meaningful. |
| **Information** | Data that has been **processed, organised, structured, or placed in a context** so that it is **useful** — something a human can act on, decide from, or draw a conclusion from. |

> [!EXAM]
> The one-line discriminator the slides state explicitly:
>
> **Data does not depend on information; information depends on data.**
>
> Data is a *collection of facts*; information *puts those facts into context*.

> [!INTUITION]
> `123456789, 1965-01-09, 5` is **data** — three values, no meaning. *"Employee John B. Smith, SSN 123456789, born 9 Jan 1965, works in department 5"* is **information**: the same facts, now carrying structure and context.
>
> This is exactly why a schema matters. The **schema is what converts data into information** — it is the context, attached once, that makes every row afterwards interpretable.

---

## What is a Database?

> [!NOTE]
> A **database** is a **collection of *related* data** representing some aspect of the real world — called the **mini-world** or the **Universe of Discourse (UoD)**.

Four properties, each of which is doing real work in the definition:

| Property | What it rules out |
|---|---|
| **Related** data | An arbitrary pile of unconnected files is not a database |
| **Logically coherent** — organised with inherent meaning and structure | A random assortment of values is not a database |
| **Designed, built and populated for a specific purpose**, with an intended audience and set of applications | Data with no purpose or user is not a database |
| Varies in **size and complexity** — from a small single-app store to a huge enterprise system | Being small does not disqualify something from being a database |

> [!TRAP]
> "A database is just a collection of data" loses marks. The examiner is looking for **related**, **logically coherent**, and **built for a specific purpose** — those three phrases carry the definition. The **mini-world / Universe of Discourse** term is also frequently asked by name.

> [!INTUITION]
> The **mini-world** idea is worth pausing on. A database never models *the world* — it models a deliberately cut-down slice of it. A university database knows a student's SRN and total credits and knows nothing about their height, because height is outside the mini-world. **Deciding where the boundary of the mini-world falls is the very first act of database design**, and it is a design decision, not a discovery.

---

## What is a DBMS?

> [!NOTE]
> A **Database Management System (DBMS)** is a **general-purpose software system** that facilitates the processes of **defining, constructing, manipulating, and sharing** databases among various users and applications.

A modern database system is complex software whose task is to manage a **large, complex collection of data**. It contains:

- information about a particular **enterprise**,
- a collection of **interrelated data**,
- a set of **programs to access** that data,
- an environment that is both **convenient and efficient** to use.

### The four core functions, worked through a student database

| Function | What it means | Student-database example |
|---|---|---|
| **Defining** | Specify the **data types, structures and constraints** of the data to be stored. This description is itself stored — as **metadata** in the DBMS catalog — and it is what lets the DBMS guarantee consistency and integrity. | `Students(Student_ID` numeric, `Name` text, `Email` text, `Date_of_Birth` date, `Major` text`)`; `Courses(Course_ID` numeric, `Course_Name` text, `Credits` numeric, `Instructor` text`)` |
| **Constructing** | **Storing** the data on a storage medium **controlled by the DBMS**, organised for efficient retrieval and manipulation, securely and accessibly. | The DB is placed on a server sized for the required capacity and performance |
| **Manipulating** | **Querying** to retrieve, **updating** to reflect changes in the mini-world, and **generating reports** — all while enforcing the declared constraints so consistency is preserved. | *"Retrieve all students enrolled in Computer Science courses"*; an authorised user adds a student or updates a grade |
| **Sharing** | Allowing **multiple users and programs concurrent access**, subject to permissions. | Faculty see their own courses' students; administrators update and maintain the whole database — at the same time |

> [!EXAM]
> Learn the four verbs verbatim — **defining, constructing, manipulating, sharing** — they are the standard one-mark answer to *"define a DBMS"*. And keep the distinction straight:
>
> **Database system = the database + the DBMS software.** The database is the *data*; the DBMS is the *software that manages it*.

> [!INTUITION]
> Notice that "**defining**" is listed first and is stored *inside* the system. That single design choice is what separates a DBMS from a filing cabinet. Because the DBMS **holds the description of the data alongside the data**, it can check types, enforce constraints, optimise queries, and let programs discover the structure at runtime — none of which a plain file can do. This property has a name you will meet shortly: the **self-describing nature** of a database system.

---

## What kind of data do database systems manage?

Database systems are used for collections of data that are:

- **Highly valuable** — a bank's accounts, a hospital's records, a university's transcripts;
- **Relatively large**;
- **Accessed by multiple users and applications, often at the same time**.

> [!TRAP]
> All three conditions matter together. A small, private, single-user spreadsheet is not a good DBMS candidate — and the reverse is the real point of the criterion: it is **concurrency plus value** that justifies the machinery of a DBMS, not volume alone. A large but read-only, single-user archive may be perfectly well served by files.

---

**Next:** what databases are actually used for, and the two modes of use — **the database landscape**.
