---
subject: dbms
unit: 1
order: 1
slug: intro-dbms
title: Data, Information, Database & DBMS
summary: The difference between data and information, what a database and a DBMS are, the four core DBMS functions, and why databases manage valuable, large, multi-user data.
minutes: 11
tags: [database, dbms, data, information, define]
---

# Data, Information, Database & DBMS

## Data vs Information

| Term | Meaning |
|---|---|
| **Data** | Raw, unorganised **facts** (the "puzzle pieces") that must be processed to become meaningful |
| **Information** | Data that has been **processed, organised, structured or given context** so it is useful for decisions |

> [!INTUITION]
> *"22, Dustin, 7, 45"* is **data** — meaningless on its own. *"Sailor Dustin (id 22) has a rating of 7 and is 45 years old"* is **information**. The key relationship: **information depends on data; data does not depend on information.**

## What is a Database?

> [!NOTE]
> A **Database** is a **collection of *related* data** representing some aspect of the real world — the **mini-world** or **Universe of Discourse (UoD)**. It is:
> - **Logically coherent** — organised with inherent meaning (not a random assortment),
> - **Designed, built and populated** for a **specific purpose** and audience,
> - of varying **size and complexity** (a small app DB to a huge enterprise DB).

## What is a DBMS?

> [!NOTE]
> A **Database Management System (DBMS)** is a **general-purpose software system** that facilitates **defining, constructing, manipulating, and sharing** databases among users and applications.

The **four core functions**:

| Function | What it does |
|---|---|
| **Defining** | Specify the data **types, structures and constraints** — stored as **metadata** in the DBMS catalog |
| **Constructing** | **Store** the data on a DBMS-controlled storage medium |
| **Manipulating** | **Query, update, and report** — while enforcing constraints to keep data consistent |
| **Sharing** | Allow multiple users/programs **concurrent** access (with permissions) |

> [!EXAM]
> Know the definition verbatim: a DBMS facilitates **defining, constructing, manipulating and sharing** databases. A **database system** = the database **+** the DBMS software.

## What kind of data do DB systems manage?

Database systems are used to manage collections of data that are:
- **Highly valuable** (a bank's accounts, a university's records),
- **Relatively large**,
- **Accessed by multiple users and applications, often simultaneously.**

> [!INTUITION]
> Think of the questions a DBMS answers: How does **Amazon** retrieve the products you want? How does a **bank** keep accounts correct even with simultaneous transactions? How does a **doctor** pull up your entire medical history by typing your ID? The single answer behind all of them is **a database**.

---

**Next:** why we don't just use files — **file-processing problems & the purpose of a DBMS**.
