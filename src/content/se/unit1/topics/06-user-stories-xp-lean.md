---
subject: se
unit: 1
order: 6
slug: user-stories-xp-lean
title: User Stories & the INVEST Criteria
summary: The user-story template and the three Cs, then each INVEST criterion with its definition, why it matters, a good example and a failing example from the college-events app the deck uses throughout.
minutes: 12
tags: [user-story, INVEST, independent, negotiable, valuable, estimable, small, testable, acceptance-criteria]
---

# User Stories & the INVEST Criteria

## What a user story is

> [!NOTE]
> From the Scrum cheat sheet:
> - **A very high level definition of what the customer wants the system to do.**
> - **Each story is captured as a separate item on the Product Backlog.**
> - **User stories are NOT dependent on other stories.**
>
> **Story template:**
> > **"As a `<User>` I want `<function>` so that `<desired result>`"**
>
> **Story example:** *"As a user, I want to print a recipe so that I can cook it."*

> [!EXAM]
> The three parts of the template each answer a different question — **who**, **what**, and **why**. The **"so that"** clause is the one students drop, and it is the most valuable: it captures the **motivation**, which is what lets the team propose a better solution than the one the customer literally asked for.

> [!INTUITION]
> Notice the story says nothing about *how*. "Print a recipe" does not specify a button, a page layout, or a file format.
>
> That is deliberate — a user story is **a placeholder for a conversation**, not a specification. This is why the classic description is the **three Cs**: **Card** (the short written story), **Conversation** (the discussion it triggers), and **Confirmation** (the acceptance criteria agreed at the end).

---

## INVEST

> [!NOTE]
> **Follow the INVEST guidelines for good user stories.** Each component ensures that user stories are **well-structured, facilitating better planning, execution, and delivery in Agile projects.**

The deck runs one example application throughout — **a mobile/web application for college students to view events, register, and receive notifications** — and gives a *failing* story for each letter. Those counter-examples are the most useful part.

---

### I — Independent

> [!NOTE]
> **Definition:** User stories should be **self-contained, with minimal dependencies on other stories.**
> **Importance:** Independence **allows teams to prioritize and implement stories in any order, reducing bottlenecks and complexities.**
> **Example:** Instead of *"Implement payment processing"* which might depend on *"User registration"*, break them into **separate, independent stories**.

> [!TRAP]
> **Failing story:** *"As a student, I want to register for events **after creating my profile** so I can get updates."*
> **Problem: depends on profile creation; not independent.**
>
> The tell is the word **"after"** — any story that names a prerequisite has a dependency built into it.

---

### N — Negotiable

> [!NOTE]
> **Definition:** User stories are **not contracts** but **starting points for discussions** between stakeholders and the development team.
> **Importance:** Flexibility **encourages collaboration**, allowing teams to **adapt and refine requirements as more information becomes available.**
> **Example:** *"As a user, I want to receive notifications"* is negotiable — it **allows the team to decide on the best implementation method.**

> [!TRAP]
> **Failing story:** *"As a student, I **must** receive **SMS** notifications for every event registration."*
> **Problem: rigid on SMS only; not open for discussion.**
>
> The story has pre-decided the **implementation**. Perhaps push notifications would serve students better and cost less — but the story has closed that conversation before it started.

---

### V — Valuable

> [!NOTE]
> **Definition:** Each user story should **deliver value to stakeholders or end-users.**
> **Importance:** Focusing on value ensures the team **works on features that provide tangible benefits, aligning with business goals.**
> **Example:** *"As a customer, I want to view my order history so I can track my past purchases."*

> [!TRAP]
> **Failing story:** *"As a student, I want to see the **college's logo** on the app's home screen."*
> **Problem: does not provide clear user value related to event management.**
>
> Note the phrasing — not *"no value at all"* but **no value related to the product's purpose**. Plenty of requests are legitimate wishes from somebody without being valuable to the user the product serves.

---

### E — Estimable

> [!NOTE]
> **Definition:** The team should be able to **estimate the effort required** to complete a user story.
> **Importance:** Estimations **help in planning and resource allocation.** If a story is **too vague to estimate, it might need to be broken down or clarified.**
> **Example:** *"Improve website performance"* is **too broad**. Specifying **"Reduce homepage load time by 2 seconds"** makes it estimable.

> [!TRAP]
> **Failing story:** *"As a student, I want the app to load **extremely fast** and be **secure**."*
> **Problem: vague; no clear criteria for "fast" or "secure."**
>
> This is the same defect that **non-functional requirements** suffer from generally — and the same fix applies: **attach a metric.** "Fast" is unestimable; "under 2 seconds on 4G" is a day's work you can plan.

---

### S — Small

> [!NOTE]
> **Definition:** User stories should be **concise enough to be completed within a single iteration.**
> **Importance:** Smaller stories are **easier to estimate, test, and deliver, promoting continuous progress.**
> **Example:** Instead of *"Develop user account management"*, break it into **"Implement user login"**, **"Implement password reset"**, etc.

> [!TRAP]
> **Failing story:** *"As a student, I want to **view upcoming events, register, and see my registration history** in one place."*
> **Problem: multiple features in one story; difficult to complete in one sprint.**
>
> The tell is the **list of verbs joined by "and"**. Three capabilities in one sentence is three stories.

---

### T — Testable

> [!NOTE]
> **Definition:** A user story should have **clear acceptance criteria to determine when it's complete.**
> **Importance:** Testability ensures the team can **verify the functionality, maintaining quality and reliability.**
> **Example:** *"As a user, I want to receive a confirmation email after registration"*, with **acceptance criteria detailing the email's content and delivery time.**

> [!TRAP]
> **Failing story:** *"As a student, I want the app to be **fun and easy to use**."*
> **Problem: no acceptance criteria or test conditions.**
>
> "Testable" is really asking: **how would two people disagree about whether this is done?** If they could, the story is not testable yet.

---

## The six at a glance

> [!EXAM]
> | Letter | Means | Failing example from the deck |
> |---|---|---|
> | **I** — Independent | Self-contained, minimal dependencies | *"…register for events **after creating my profile**"* |
> | **N** — Negotiable | A starting point for discussion, not a contract | *"…**must** receive **SMS** notifications"* |
> | **V** — Valuable | Delivers value to stakeholders or end-users | *"…see the college's **logo** on the home screen"* |
> | **E** — Estimable | The team can estimate the effort | *"…load **extremely fast** and be **secure**"* |
> | **S** — Small | Completable within a single iteration | *"…view events, **and** register, **and** see history"* |
> | **T** — Testable | Has clear acceptance criteria | *"…be **fun and easy to use**"* |

> [!INTUITION]
> The six are not independent of each other, and seeing how they interact helps you remember them.
>
> **Small usually produces Estimable** — a story you can finish in a sprint is one you can size. **Testable usually produces Negotiable** — once you have written acceptance criteria, you have had the conversation. And **failing Independent often means failing Small**, because bundled stories tend to drag their prerequisites along.
>
> So in practice, when a story fails INVEST, **the fix is almost always to split it** and then write acceptance criteria for the pieces.

---

## Applying INVEST in practice

> [!EXAM]
> The deck's four working rules:
>
> - **Start with the user** — frame stories from the **end-user's perspective** to ensure relevance and value.
> - **Collaborate** — engage stakeholders in discussions to refine stories, ensuring they are **negotiable and valuable**.
> - **Break down large stories** — if a story seems **too big or complex**, divide it into **smaller, more manageable pieces**.
> - **Define clear acceptance criteria** — this makes stories **testable** and **sets clear expectations for completion**.

> [!TRAP]
> Recall from the Scrum cheat sheet that **"DONE" = Potentially Shippable**, and that **functionality not "done" is not shown** at the Sprint Review.
>
> Those two rules only work if stories are **Testable** — because "done" has to mean something checkable, agreed in advance. **INVEST is what makes the definition of done enforceable**, rather than a matter of opinion at the end of a sprint.

---

**Next:** two more agile methods in detail — **Extreme Programming & Lean Agile**.
