---
subject: se
unit: 1
order: 14
slug: testing-vv-terminology
title: Software Testing — V&V and Terminology
summary: Boehm's two questions, the three objectives of testing, verification as static and validation as dynamic testing with the full comparison table, the precise error/defect/bug/failure/fault/issue vocabulary, and the broad categorization of test types.
minutes: 14
tags: [testing, verification, validation, boehm, static-testing, dynamic-testing, defect, bug, failure, fault, black-box, white-box]
---

# Software Testing — V&V and Terminology

## What testing is

> [!EXAM]
> **Software testing is a process of examining the functionality and behavior of the software through verification and validation.**
>
> **Verification and Validation is the process of investigating that a software system satisfies specifications and standards and that it fulfills the required purpose.**
>
> **Barry Boehm described verification and validation as:**
>
> > **Verification: Are we building the product right?**
> > **Validation: Are we building the right product?**

> [!EXAM]
> - **Verification** is a process of determining if the software is **designed and developed as per the specified requirements**.
> - **Validation** is the process of checking if the software (end product) has **met the client's true needs and expectations**.
>
> **Software testing is incomplete until it undergoes verification and validation processes.** They are the main elements of the testing workflow because they:
> 1. **Ensure that the end product meets the design requirements**
> 2. **Reduce the chances of defects and product failure**
> 3. **Ensure that the product meets the quality standards and expectations of all stakeholders involved**
>
> The deck notes the industry scale: **software testing is estimated to grow from \$48 billion in 2025 to \$93 billion in 2030.**

> [!INTUITION]
> Boehm's two questions differ by **one word each**, and that word is the whole distinction.
>
> **"Right" as an adverb** (building it *right*) → conformance to the specification. Measured against a **document**.
>
> **"Right" as an adjective** (the *right* product) → fitness for the actual need. Measured against **reality**.
>
> The gap between them is where projects die: a system can pass every verification check — built exactly as specified — and still be the wrong product, because the specification itself was wrong. **Verification cannot detect a bad specification; only validation can.**
>
> This is the same pair the **SRS** topic applied to requirements documents. It is one idea used at two points in the lifecycle.

## The objectives of testing

> [!EXAM]
> **What are the real objectives of testing? Demonstration, Detection and Prevention.**
>
> | Objective | What it covers |
> |---|---|
> | **Demonstration** | **System used with acceptable risk** · **Functions under special conditions** · **Product ready for integration/use** |
> | **Detection** | **Discover defects, errors and deficiencies** · **Determine capabilities and limitations** · **Quality of components** |
> | **Prevention** | **Information to prevent/reduce errors** · **Reduce error propagation** · **Clarify system specifications and performance** |

> [!TRAP]
> **Prevention is the objective people do not associate with testing at all**, and it is the most valuable of the three.
>
> Detection finds bugs that exist. **Prevention stops them being written.** Testing prevents defects in two ways: the *act of writing tests* clarifies specifications (an untestable requirement is an unclear requirement — which is exactly what the **Verifiable** property in topic 8 was insisting on), and defect data feeds back to stop the same mistake recurring.
>
> Note **"clarify system specifications"** listed under Prevention. Trying to write a test for a requirement is one of the fastest ways to discover that the requirement is ambiguous — which is precisely the argument TDD makes in the XP topic.

## Testing shows presence, not absence

> [!EXAM]
> **Software testing also involves measuring attributes to build confidence in the software.**
>
> > **"Testing software shows only the presence of errors, not their absence"**

> [!INTUITION]
> This is **Dijkstra's dictum**, and it is the single most important sentence about testing.
>
> The logic is exhaustiveness. A test that passes tells you the software worked **for that input**. To prove no errors exist you would have to test **every possible input**, which for any real program is an astronomically large set.
>
> So a passing test suite is **evidence**, not proof — which is why the slide pairs it with *"measuring attributes to build confidence."* Testing buys **confidence**, and confidence is a quantity, not a guarantee.
>
> Two practical consequences follow: **you can never say "the software has no bugs,"** only "the tests we ran found none"; and **test adequacy criteria** (topic 15) become necessary, because if you cannot test everything, you need a defensible rule for when to stop.

## Verification — static testing

> [!EXAM]
> **Verification: are we building the product right?**
>
> - **Process of checking that software achieves its goals**, to ensure that products and deliverables meet requirements
> - **Static testing — does not include execution of code**
> - **Checking documents, design, code** (reviews, walkthroughs, inspections)
> - **Finds the bugs early in development**
> - **Targets software architecture, design, database, etc.**
> - **Occurs before validation**

## Validation — dynamic testing

> [!EXAM]
> **Validation: are we building the right product?**
>
> - **Focuses on product-related activities** that determine if the system or project deliverables **meet customer/client expectations**
> - **Dynamic testing — includes execution of code**
> - **Validates the capabilities and features in project scope and requirements**
> - **Typically done by the testing team**
> - **Methods: Black Box testing, White Box testing, and non-functional testing**

> [!INTUITION]
> The **static / dynamic** split is the mechanical difference, and it explains everything else in the two lists.
>
> Because verification **does not run the code**, it can be applied to things that cannot be run — a requirements document, an architecture diagram, a design. That is why it **finds bugs early**: it works on artifacts that exist long before there is anything to execute.
>
> Because validation **does run the code**, it needs working software, so it happens later — and it can only test what has been built.
>
> **This is the entire economic argument for reviews.** Verification catches defects at the cheap end of the cost-of-repair curve. Both are needed, but only one of them is available before the code exists.

## The full comparison

> [!EXAM]
> | | **Verification** | **Validation** |
> |---|---|---|
> | **Definition** | A process of checking if a product is **developed as per the specifications** | A process of ensuring the product **meets the needs and expectations of stakeholders** |
> | **What it tests** | **The requirements, architecture, design, and code** of the software product | **The usability, functionalities, and reliability** of the end product |
> | **Coding requirement** | **Does not require executing the code** | **Emphasizes executing the code** to test usability and functionality |
> | **Activities include** | **Requirements verification, design verification, code verification** | **Usability testing, performance testing, system testing, security testing, functionality testing** |
> | **Types of testing methods** | **Inspection, code review, desk-checking, walkthroughs** | **Black box testing, white box testing, integration testing, acceptance testing** |
> | **Teams involved** | **The quality assurance (QA) team** | **The software testing team along with the QA team** |
> | **Target of test** | **Internal aspects** — requirements, design, software architecture, database, code | **The end product that is ready to be deployed** |

> [!NOTE]
> **V&V in different methodologies:** *"Different project management and software development methods use verification and validation in different ways. For instance, **both verification and validation happen simultaneously in agile development methodology** due to the need for continuous refinement of the system based on end-user feedback."*

> [!TRAP]
> **"Occurs before validation"** describes the **sequential** models, and the agile note is the explicit exception — a favourite exam contrast.
>
> In Waterfall or the V-model, verification and validation are **separate phases in order**. In agile, every short iteration does both: the team reviews (verification) and demonstrates working software to the customer (validation) **within the same sprint**.
>
> Recall from the Scrum topic that the **Sprint Review** *is* a validation activity — showing potentially shippable software to the Product Owner and asking, in effect, "is this the right product?"

## Testing terminology

> [!EXAM]
> **Testing is the process of identifying defects, where a defect is any variance between actual and expected results.**
>
> The deck's summary sentence, which is worth memorising verbatim:
>
> > **"A mistake in coding is called an Error, an error found by a tester is called a Defect, a defect accepted by the development team is called a Bug, and if a build does not meet the requirements, then it is a Failure."**

> [!EXAM]
> | Term | Definition |
> |---|---|
> | **Error** | **A mistake, misconception, or misunderstanding on the part of a software developer** (including engineers, programmers, analysts and testers). E.g. misunderstanding a design notation, or typing a variable name incorrectly. **Generated because of wrong logic, loop or syntax** |
> | **Bug** | **The result of a coding error.** An error found **in the development environment before the product is shipped** to the customer. A programming error that causes a program to **work poorly, produce incorrect results or crash**. **A bug is the terminology of a Tester** |
> | **Defect** | **A variance between expected and actual.** An error found **AFTER the application goes into production**. **The deviation from the customer requirement** |
> | **Failure** | **The inability of a software system or component to perform its required functions within specified performance requirements.** **When a defect reaches the end customer it is called a Failure.** During development, failures are usually observed by testers |
> | **Fault** | **An incorrect step, process or data definition** that causes the program to perform in an **unintended or unanticipated manner**. **A fault is introduced into the software as the result of an error.** An anomaly that may cause it to behave incorrectly and not according to its specification. **It is the result of the error** |
> | **Issue** | **Raised by an end user when the product doesn't meet expectations** |

> [!INTUITION]
> The vocabulary is really **one problem tracked through its lifetime**, and organising it by *who notices and when* makes it far easier to recall:
>
> $$\textbf{Error} \;(\text{human mistake}) \rightarrow \textbf{Fault} \;(\text{in the code}) \rightarrow \textbf{Failure} \;(\text{observed behaviour})$$
>
> A developer **makes an error**; that error **introduces a fault** into the software; when the faulty code is executed under the right conditions it **produces a failure**.
>
> Then **Bug** and **Defect** are the same thing labelled by **where it was caught** — a bug is found **before** shipping, a defect **after** it reaches production. **Issue** is the end user's word for it.
>
> Note the causal chain has a gap that matters: **a fault does not always cause a failure.** Faulty code on a path nobody executes produces no failure at all — which is another way of saying that testing shows only the presence of errors.

> [!TRAP]
> **These definitions are not universal**, and this deck's are narrower than common industry usage — where "bug" and "defect" are used interchangeably and "defect" is not restricted to production.
>
> Answer with **this deck's** distinction, because it is what is being examined: **bug = found before shipping (tester's word); defect = found after going into production.**

## Characterizing testing

> [!EXAM]
> **How do we characterize the different types of testing?**
>
> - **Why?** — **observations based on test objective**: fault identification, fitness for use
> - **How did we arrive at test cases?** — **based on test strategy or approach**
> - **Which of the samples should we observe based on test selection?** — **Random, Ad-Hoc, Algorithmic, Statistical**

## Broad categorization of test types

> [!EXAM]
> The deck's tree of **Test Types**:
>
> - **Functional** → **Black box**
> - **Structural** → **White box**
> - **Static** — *"a form of software testing where the software isn't actually used. Checks mainly for the sanity of the code, algorithm, or document"*
> - **Dynamic** — *"based on specific test cases by execution of the test object or running programs"*
>
> Alongside, three further axes:
>
> | Axis | Values |
> |---|---|
> | **Levels (lifecycle) of testing types** | **Unit · Integration · System/Functional · Acceptance** |
> | **Technique-based testing type** | **Coverage based testing · Fault based testing** |
> | **Execution** | **Manual · Automatic** |

> [!DERIVE]
> **Functional pairs with black box; structural pairs with white box** — and the pairing is not arbitrary.
>
> - **Functional testing** asks *does it do the right thing?* You only need the **specification**, not the source — so you treat the program as a **black box**, seeing inputs and outputs only.
> - **Structural testing** asks *does every part of it work?* That requires seeing **inside** the code to know which branches and paths exist — a **white box**.
>
> This also explains the technique axis. **Coverage-based** testing is inherently structural: "have we executed every branch?" is a question about code you can see. **Fault-based** testing targets suspected failure classes and can be done either way.
>
> **The four axes are independent, not competing.** A single test can be functional, dynamic, at system level, and automated — all four at once. Exam questions that ask you to "classify" a test usually want more than one axis.

---

**Next:** writing the tests and planning the effort — **test cases, test planning & security validation**.
