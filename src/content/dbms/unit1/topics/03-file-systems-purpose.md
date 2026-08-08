---
subject: dbms
unit: 1
order: 3
slug: file-systems-purpose
title: File-Processing Problems & the Purpose of a DBMS
summary: The university file-processing scenario, the five questions it cannot answer, and the seven drawbacks of file-processing systems with the DBMS solution to each — including the lost-update arithmetic.
minutes: 10
tags: [file-systems, purpose, redundancy, isolation, atomicity, concurrency, security, lost-update]
---

# File-Processing Problems & the Purpose of a DBMS

## The setting

> [!NOTE]
> In a **file-processing (file-based) system**, information is kept in **permanent operating-system files**. A company has a number of **application programs**, each written to manipulate those files, each written on request as some user's need arose, with **new applications added as new needs appear**.

Take a **university**. We must store information about **instructors, students, departments, and courses offered**. Kept in OS files, the system needs application programs to:

- add new students, instructors and courses,
- register students for courses,
- assign grades, compute GPA, and generate transcripts.

### The scenario that exposes the problem

*The university decides to add a new major.* What must actually happen?

1. **Create a new department** — and with it, **new permanent files** for the department's information.
2. **Develop new application programs** — to manage the rules of the new major, and to handle course registration, grading and transcripts *for it*.

> [!INTUITION]
> Notice what just happened: **a change in the mini-world forced a change in program code.** That is the disease, and every one of the seven drawbacks below is a symptom of it. In a file-processing system the **structure of the data lives inside the programs**, so the data and the programs are welded together. The entire purpose of a DBMS is to **prise them apart**.

### Five questions the design cannot answer well

| Question | Trouble |
|---|---|
| A student takes a **double major** (Physics *and* Computer Science) — how many times are their details stored? | Duplication |
| A student **changes address or phone** — is the update guaranteed to reach every relevant file across departments? | Inconsistency |
| Transport wants **all students in a given postal code** — quick retrieval, or another program to write? | Rigid access |
| The files are **written in different formats** — is the data easy to combine? | Isolation |
| A **new constraint** must be added — can it be done without extensive changes to existing programs? | Buried rules |

---

## The seven drawbacks — and the DBMS answer to each

> [!EXAM]
> This is the single most reliably examined list in the topic. Memorise the **seven names in order**, because the *"purpose of a database system"* is nothing more than **the solution to each one**. Both directions are asked: *"list the drawbacks of file systems"* and *"state the purpose of a DBMS"*.

| # | Problem | What goes wrong | The DBMS solution |
|---|---|---|---|
| **1** | **Data redundancy & inconsistency** | The double-major student's details are duplicated per department. Costs **storage space**, and any change risks leaving copies **disagreeing**. | Store information in a **centralised location** → minimises redundancy; changes are made **at a single spot** → consistency |
| **2** | **Difficulty in accessing the data** | *"All students in this postal code"* means either manually sifting a full list or writing a **special program**. Conventional file systems are **not designed for quick retrieval when new kinds of query arise**. | A **central store** for fast retrieval, a **powerful query language** to answer new queries, and efficient **search and filter** mechanisms |
| **3** | **Data isolation** | New applications must gather data that is **scattered across various files**, in **different formats**. A file-based system must also manage or prevent concurrency itself — when a program opens a file it **locks** it, so no one else may access it at the same time. | Allow **multiple transactions on the same data without interference**, and give each a **consistent view** of the data |
| **4** | **Integrity problems** | *Each department's research-fund balance must stay above 0.* The rule lives inside every application program, so **adding a new constraint means editing them all**. | Declare **integrity constraints in the schema**, at the database level; the system **enforces them automatically**. Adding a constraint = **updating the schema only** |
| **5** | **Atomicity problems** | Transfer ₹5000 from A to B = *debit A* then *credit B*. A crash between the two leaves money **missing from one account and not added to the other** — an inconsistent state. | **Atomicity**: either both steps happen or neither. **Automatic rollback** on failure keeps the database reliable and consistent |
| **6** | **Concurrent-access anomalies** | Account A holds ₹10,000. Two clerks deduct ₹500 and ₹100 at nearly the same moment. Both **read 10,000**, both subtract, both write back — the account ends at **9,500 or 9,900** depending on who writes last, instead of the correct **9,400**. | **Transactions** ensure atomicity; **locking** prevents conflicting changes. Together they maintain consistency and integrity |
| **7** | **Security problems** | Programs accumulated over years with no central security. **Payroll staff might see and even change academic records**, because everyone has the same permissions. | An **administrator defines access controls and permissions** per user or group, **enforced at the database level regardless of which program is used**. Supported by **authentication, encryption, auditing and logging, centralised security management** |

> [!DERIVE]
> **Work the lost-update arithmetic (#6) — it is a standard 2-mark question.**
>
> Start: $\text{balance} = 10{,}000$. Clerk $T_1$ deducts $500$; clerk $T_2$ deducts $100$. The correct final balance is $10{,}000 - 500 - 100 = 9{,}400$.
>
> Interleaved without control:
>
> | Step | $T_1$ | $T_2$ |
> |---|---|---|
> | 1 | read balance → $10{,}000$ | |
> | 2 | | read balance → $10{,}000$ |
> | 3 | compute $10{,}000-500 = 9{,}500$ | |
> | 4 | | compute $10{,}000-100 = 9{,}900$ |
> | 5 | **write $9{,}500$** | |
> | 6 | | **write $9{,}900$** |
>
> Final balance $= 9{,}900$. $T_1$'s update has been **overwritten and lost** — hence the name **lost update**. Had $T_2$ written first, the answer would be $9{,}500$. **Neither is correct**, and *which* wrong answer you get depends on timing — that is what makes the bug so dangerous.

> [!TRAP]
> **The lecture's definition of "data isolation" is unusual — know both readings.**
>
> The **standard** meaning (Silberschatz, E&N) is the one in the table's first sentence: data is **scattered across files in different formats**, so writing a program that combines it is hard. The lecture then goes on to describe **file locking and concurrency**, which properly belongs under *concurrent-access anomalies* (#6).
>
> In an exam, lead with the standard meaning — **scattered data, incompatible formats, hard to write new applications** — and mention file-level locking as a secondary point. If a question offers a concurrency scenario, the expected answer is **#6**, not #3.

> [!INTUITION]
> Group the seven and they are easier to hold: **1–3 are about structure** (data in the wrong shape, in the wrong places), **4 is about rules**, **5–6 are about time** (failures and simultaneity), and **7 is about people**. A DBMS is essentially four separate pieces of machinery answering those four categories — the storage engine, the constraint system, the transaction manager, and the authorization system.

---

**Next:** what the database approach gives you in return — **characteristics, advantages & data integrity**.
