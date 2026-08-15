---
subject: se
unit: 1
order: 16
slug: test-cases-planning
title: Test Planning & Security Validation
summary: The nine-step planning process, test adequacy criteria as the answer to Dijkstra's dictum, the four strategy mindsets and the opposite weakness each carries, the test bed and automation, measures versus metrics, and security validation planning.
minutes: 14
tags: [test-planning, adequacy, strategy, test-bed, automation, risk, metrics, KLoC, security-validation, test-plan, triage]
---

# Test Planning & Security Validation

## What test planning is

> [!EXAM]
> **Software test planning is the process of evolving a test plan which discusses *what, when, how much and how* testing has to be done to ensure quality expectations can be met.**
>
> The outcome **serves as a blueprint to conduct software testing activities as a defined process**, so that **developers, business managers and customers can understand the details of testing**, and **is also used for monitoring and control.**

> [!EXAM]
> **The nine-step test planning process:**
> 1. **Ensuring the context and scope of the project is understood**
> 2. **Establish test adequacy criteria**
> 3. **Evolve a test strategy which will be followed**
> 4. **Evolving a list of deliverables**
> 5. **Creation of a detailed test schedule**
> 6. **Planning, identification and allocation of resources**
> 7. **Identification of milestones**
> 8. **Risk management**
> 9. **Establishment of measures and metrics**

## Step 1 — Determining scope

> [!EXAM]
> **Understand the context where the product is going to be used by:** reviewing **use case scenarios** in the product deployment environment · discussing with the **designer** · discussing with the **developer** · reviewing **project/product documentation** · **playing around with the product** or performing a **product walk-through**.
>
> **The optimal amount of testing is based on:** **customer requirement · project schedule · project budget · product specification · skills and talent of the test team.**

> [!TRAP]
> **Three of those five factors are constraints, not quality goals** — schedule, budget, and the team's skills.
>
> This is an honest admission that **how much you test is decided partly by what you can afford**, not purely by what the product deserves. It is also exactly why the next step exists: if testing is bounded by resources rather than by completeness, you need an explicit, defensible rule for **when to stop**.

## Step 2 — Test adequacy

> [!EXAM]
> - **Testing a subset of possible combinations does not guarantee the absence of issues.**
> - **Fixing issues found during testing may not be feasible due to:** volume or number of errors · schedule · resources · **some issues are enhancements**.
> - **Test Adequacy Criteria: criteria to determine when to stop testing** or consider testing complete for that iteration.
>
> **Examples:**
> - **Of the planned tests, x% of lines are executed and y% of branches**
> - **All planned test cases are complete with no critically high priority issues**
> - **Total number of severe defects is less than 5**

> [!INTUITION]
> This is **Dijkstra's dictum turned into a management decision**. Since *"testing shows only the presence of errors, not their absence,"* the rule "test until there are no bugs" never terminates — you can always run one more test.
>
> So "enough" must be **defined in advance**, and the three examples are three different kinds of answer:
> - **Coverage-based** — *x% of lines and branches* — measures **how much of the code** you exercised.
> - **Completion-based** — *all planned cases done, no critical issues* — measures **whether you did what you planned**.
> - **Defect-based** — *fewer than 5 severe defects* — measures **the quality of the result**.
>
> **Fixing the criterion before testing starts is what stops it being renegotiated under deadline pressure**, when everyone's incentive is to declare victory.

> [!TRAP]
> **"Some issues are enhancements"** is a quiet but important line. Not everything found during testing is a defect — some findings are requests for behaviour that was **never specified**.
>
> Those belong in the **change management process** from the SRS topic, not in the bug list. Letting enhancements enter as defects inflates the defect count, corrupts the adequacy criteria, and expands scope without approval.

## Step 3 — Testing strategy

> [!EXAM]
> **Also known as the test approach**, it defines **how testing is carried out** and deals with: **testing mindset or test models to be followed · test types which will be used · test environment · automation strategy · tools · risk analysis with contingency planning.**

### The four mindsets

> [!EXAM]
> | Mindset | Description |
> |---|---|
> | **Demonstration** | **Make sure software runs and solves the problem.** If it passes all tests, establishes satisfaction of specs. **Might only test what succeeds** |
> | **Preventive** | **Prevents faults in early phases through careful planning and design.** **Reviews and Test Driven Development** |
> | **Destruction** | **Try and make the software fail** to find as many faults as possible. **Good and effective test cases find faults.** **Difficult to decide when to stop testing** |
> | **Evaluation** | **Detects faults through the lifecycle phases.** Focuses on **analysis and review techniques** to detect faults in **requirements and design documents** |

> [!DERIVE]
> **Each mindset carries its own stated weakness, and two of them are exact opposites.**
>
> **Demonstration** *"might only test what succeeds"* — if your goal is to show the software works, you will unconsciously choose inputs that make it work. That is **confirmation bias built into a test strategy**, and it is why a demo is not a test.
>
> **Destruction** has the mirror problem: *"difficult to decide when to stop."* If your goal is to break it, you can always try harder, and there is no natural end point — which is precisely why **test adequacy criteria** are step 2.
>
> The two failure modes are **stopping too early** and **never stopping**. Real strategies mix mindsets and use adequacy criteria to bound the destructive one.

> [!INTUITION]
> **Preventive and Evaluation both operate before code exists** — reviews, TDD, and analysis of requirements and design documents.
>
> They are **verification / static testing** from the previous topic, reappearing here as *strategic choices* rather than as techniques. Choosing a preventive strategy is choosing to spend effort at the cheap end of the cost-of-repair curve.

### Testing types by phase

> [!EXAM]
> **Each lifecycle phase has outcomes which can be tested:** feasibility → **acceptance test cases** · requirements → **functional and system test cases** · architecture/design → **integration test cases** · implementation → **code unit test cases** · testing → reviews and execution · maintenance → **regression** and other tests.
>
> **Strategies in terms of:** begin by **"testing-in-the-small"** and move towards **"testing-in-the-large"** · **top down and bottom up** · **positive and negative testing** · **dynamic and heuristics-based approach**.

> [!TRAP]
> **Positive and negative testing** is the pairing most often half-done. Positive testing confirms the system does what it should with valid input; **negative testing confirms it correctly refuses invalid input.**
>
> This is the testing counterpart of the requirements topic's note that a functional requirement *"may state what the system should not do."* A system tested only with valid data is untested against every user mistake and every attack.

### Test environment

> [!EXAM]
> **Testing Environment / Test Execution Environment / Test Bed:** the **setup of software and hardware for testing teams to execute**.
> - **Configured as per the need of the application**
> - Could include **test data, database, front end, operating system, servers, storage, and network**
> - **Correct setup ensures success of testing, or results in delay, cost escalations and so on**
> - **Environment management involves maintenance and upkeep of the test bed, monitoring and modifying components**
> - **Challenges:** planning resource usage · remote environment · setup time · **sharing of environment** · setup of complex configurations

> [!INTUITION]
> **"Sharing of environment"** is listed as a challenge for a specific reason: if two teams test on the same test bed at once, each sees the other's data and changes, and **failures become unreproducible**.
>
> That connects straight back to the test-case format's **preconditions** and **testing environment** fields. Those fields exist because the environment is state, and shared state that nobody records is the most common source of "it worked yesterday."

### Automation and tools

> [!EXAM]
> **Automation strategy:** defining goals · planning the test approach · **selection of automation framework** · selecting test tool · test case design and execution · test result generation and analysis · **maintaining scripts**.
>
> **Tool selection criteria:**
> - **The technology of the Application Under Test (AUT) must be compatible** with the tools, and drives their selection
> - **Testers need to be comfortable with the tool**, else it may not be used effectively
> - **Balanced** in features, reporting for different stakeholders, and **ease of use**
> - **Cross-platform support** is an expectation
> - **Acceptability/popularity/prevalence in the industry** indicates availability of **support, quality documentation, technical forums and trained personnel**
> - **Cost** — **open source or proprietary** have different characteristics of cost, features and support

> [!TRAP]
> **"Maintaining scripts"** is the last item in the automation list and the one that sinks automation efforts.
>
> Automated tests are **software**, and they rot exactly like software: the UI changes and a hundred scripts break at once. Teams routinely budget for *writing* automation and not for *maintaining* it, then abandon the suite when the maintenance bill arrives — having paid the cost and lost the benefit.
>
> Note also why **industry popularity** is a listed criterion. It is not fashion-following: a widely used tool comes with documentation, forums, and **people you can hire who already know it** — all real costs avoided.

## Steps 4–8 — Deliverables, schedule, resources, milestones, risk

> [!EXAM]
> **Deliverables** — test specifications for each module of the product, and test cases for the different conditions planned.
>
> **Schedule** — estimates for building test strategy/specification/test cases/test environment setup, execution and reporting; includes a **Work Breakdown Schedule** and estimation, then **calendarize** the estimates.
>
> **Resources** — estimation and resource allocation are performed **together or iteratively**, so the schedule factors in the characteristics of the planned resources. Identify servers, storage, test tools and network — and people: **Test Manager, Testers, Test Developers, Test Administrators, and SQA**. **The schedule is reworked after resource and skill identification.**
>
> **Milestones** — identified from expected deliverables, schedule and commitments. They **track or monitor progress and control overruns**, and are **used to identify risk triggers**.
>
> **Risk** — **the probability of an unwanted incident during or towards testing.** Risks may lie in: **changes to business, technology or competition directions · resources · quality of the software product being developed · the test models not being usable · some type of testing chosen cannot be used · test environment and its state · automation or tool issues.** Any risk found **needs to be planned for as part of mitigation and contingency**.

> [!INTUITION]
> Steps 5 and 6 being done **"together or iteratively"** is the realistic part of this process, and worth saying in an exam.
>
> You cannot schedule work without knowing who will do it, and you cannot decide who is needed without knowing the work — so the two steps constrain each other and the deck explicitly says **the schedule is reworked** afterwards. A plan produced in one straight pass through nine steps would be fiction.
>
> Note too that **milestones double as risk triggers**. A missed milestone is not just a slipped date — it is the earliest *evidence* that a risk is materialising, which is what makes it actionable rather than merely embarrassing.

## Step 9 — Measures and metrics

> [!EXAM]
> | | Examples |
> |---|---|
> | **Measurements** | **Number of test cases planned and created · number of test cases run · amount of time spent on creation and execution · number of errors found** |
> | **Metrics** | **Number of test cases executed/day · % of test cases executed · number of issues/KLoC · number of critical issues/KLoC** |
>
> **Errors are classified into critical, serious, medium or low impact.**

> [!INTUITION]
> The distinction is exact and worth stating precisely: **a measure is a raw count; a metric is a measure normalised by something** — per day, per thousand lines of code, or as a percentage.
>
> Normalisation is what makes numbers **comparable**. *"We found 40 defects"* is meaningless alone — in 1,000 lines it is alarming, in 500,000 it is excellent. **"Issues/KLoC" can be compared across modules, releases and teams; "issues" cannot.**
>
> The severity classification does the same job in the other dimension: 40 low-impact defects and 40 critical ones are not the same result, so counting defects without weighting them hides the thing you most need to know.

## Security validation planning

> [!EXAM]
> **Ensure that security controls and objectives are measurable, verifiable, and tested throughout the SDLC.** It **defines how and when security features and controls will be tested or validated.**
>
> **Why it's important in the Requirements Phase:**
> - **Helps ensure testability of security requirements**
> - **Aligns development, QA, and security teams early**
> - **Reduces last-minute changes or surprises during testing**
>
> **Results in a documented plan tied to both requirements and design artifacts.**

> [!EXAM]
> **Key elements of a good security validation plan:**
>
> | Element | Detail |
> |---|---|
> | **Security requirements traceability** | **Which security requirement is being validated and how** |
> | **Validation objectives** | **What needs to be confirmed** — e.g. encryption enabled, PII masked |
> | **Validation methods** | **Review, penetration test, fuzzing, static analysis** — for which component/requirement |
> | **Ownership** | **Who validates** — QA, security team, or external auditor? |
> | **Timing** | **At which SDLC stages will validation occur?** |
> | **Tools & environments** | Any tools, testbeds, or configurations needed |

> [!INTUITION]
> Notice this is planned **during the requirements phase**, which seems early for a testing activity — and that is exactly the point.
>
> *"Helps ensure testability of security requirements"* means the plan is written early **so that untestable security requirements are caught while they can still be rewritten**. If you cannot say how you would validate *"the system shall be secure"*, you have discovered that it fails the **Verifiable** property — at the cheapest possible moment on the cost-of-repair curve.
>
> **Ownership** deserves note too: listing **external auditor** as an option echoes the Secure SDLC topic's rule that **penetration testers be external to the project team**. You cannot impartially audit your own work — which is the same reason acceptance testing is done by the customer.

## Typical test plan contents

> [!EXAM]
> **1. Introduction**
> i. **Scope** — a) In Scope, b) Out of Scope
> ii. **Quality Objective**
> iii. **Roles and Responsibilities**
>
> **2. Test Methodology**
> i. Overview · ii. **Test Levels** · iii. **Bug Triage** *(sorting of bugs based on criticality)* · iv. **Suspension Criteria and Resumption Requirements** · v. **Test Completeness**
>
> **3. Test Deliverables**
>
> **4. Resource & Environment Needs**
> i. Testing Tools · ii. Test Environment

> [!TRAP]
> Two entries repay attention.
>
> **"Out of Scope" is listed explicitly alongside "In Scope"** — the same discipline as the SRS defining *"what the product will and will not do"*, and for the same reason: **stating what you are not testing prevents a false sense of coverage.** A stakeholder reading a test plan will otherwise assume anything unmentioned was covered.
>
> **"Suspension Criteria and Resumption Requirements"** is the one nobody expects. It answers: *when do we stop testing early because the build is too broken to continue, and what must be fixed before we restart?* Without it, testers burn an entire cycle logging hundreds of defects that all stem from one broken build — and the defect count then poisons the metrics from step 9.

---

That closes Unit 1. The unit moved from **what software engineering is and why it fails** (the CrowdStrike case), through **process models** and **agile methods**, into **requirements** — eliciting, classifying, securing, specifying and controlling them — and finally to **verifying that what was built is both right and the right thing**.
