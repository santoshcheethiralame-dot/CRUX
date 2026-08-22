---
subject: erp
unit: 5
order: 10
slug: production-gatp-transportation
title: Production Planning, GATP & Transportation
summary: Supply network planning and production scheduling capabilities, Global Available-to-Promise and capable-to-promise, and transportation planning with its constraints and three optimisation areas.
minutes: 12
tags: [supply-network-planning, detailed-scheduling, heuristics, bottleneck-scheduling, GATP, capable-to-promise, transport-optimizer, route-optimization, load-building]
---

# Production Planning, GATP & Transportation

## Supply network planning

> [!EXAM]
> **Supply Network Planning Tool Capabilities:**
>
> **Feasible plan considering constraints · Medium term planning with day bucket · Critical component planning · Prioritization · Simultaneous planning · Simulation · Collaborative planning · Detailed distribution planning and Transport Load Building · Different planning approaches**

> [!INTUITION]
> **Two phrases in that list carry most of the weight.**
>
> **"Medium term planning with day bucket"** names both the horizon and the granularity. **Medium term** places it at the **tactical** level; **day bucket** means the plan is stated per day rather than per week or month. **Finer buckets mean a more actionable plan and a much larger computation** — which is why ERP typically plans in weekly or monthly buckets and SCP can afford daily ones.
>
> **"Critical component planning"** is the practical answer to a real problem: a product may have **thousands of components**, but only a handful are genuinely scarce — a single-sourced chip, a long-lead-time casting. **Planning everything at maximum detail is wasteful; planning the constraints at maximum detail is what actually determines the outcome.**
>
> **That is Rough Cut Capacity Planning's logic reappearing** — *"at MPS level you check capacity only against the few **critical resources**"* — applied to materials instead of machines. **Both are instances of: optimise the bottleneck, approximate the rest.**

## Production planning and detailed scheduling

> [!EXAM]
> **Production Planning and Scheduling Tool Capabilities:**
>
> - **Up to the minute production schedule and material requirement planning**
> - **Simultaneous quantity and capacity requirement planning**
> - **Multi-level material and capacity availability check capability**
> - **Optimization capability for set-up optimization and sequence optimization**
> - **Automatic replanning in case there is any change in requirement — say a change in sales order. Replanning is very fast**
> - **Simulation and what-if capability**
> - **Can create automatic exception messages**
>
> **These tools do planning at a much more detailed level, considering everyday factory constraints (like machine breakdown, delay in supply from a particular supplier, or change in customer order), detailed up to the minute with specific start and end time for each operation.**
>
> **By optimizing order sequences, these tools help in reducing lead times, reduce stocks and at the same time improve on-time delivery performance.**
>
> **Different approaches supported: Heuristics based planning · Optimization algorithms · Bottleneck scheduling**
>
> **Leading Vendors: SAP APO Production Planning – Detailed Scheduling · i2 Factory planner**

> [!DERIVE]
> **"Set-up optimization and sequence optimization" is the capability that most clearly does something MRP cannot, and it is worth explaining.**
>
> On many machines, **the time to change over between jobs depends on what ran before.** A paint line changing from white to black is quick; **black to white requires a deep clean.** So the *order* in which jobs run changes total capacity consumed.
>
> $$\textbf{same jobs, different sequence} \;\Rightarrow\; \textbf{different total setup time} \;\Rightarrow\; \textbf{different capacity available}$$
>
> **MRP cannot see this at all** — it schedules by due date and treats setup as a fixed number. A scheduler that sequences light-to-dark **creates capacity out of nothing but ordering.**
>
> **That is why the benefits listed are three at once — *reduced lead times, reduced stocks, improved on-time delivery*.** Normally those trade against each other; **better sequencing improves all three simultaneously because it removes waste rather than reallocating it.**
>
> **The three approaches are three different answers to an intractable problem:**
>
> | Approach | What it does |
> |---|---|
> | **Heuristics** | apply sensible rules — *earliest due date first*, *shortest job first*. **Fast, good enough, no guarantee** |
> | **Optimization algorithms** | search for the mathematically best sequence. **Better result, much more computation** |
> | **Bottleneck scheduling** | **schedule the constraint resource first** and fit everything else around it |
>
> **Bottleneck scheduling is the most practical of the three** and rests on one observation: **the bottleneck determines the plant's output, so an hour lost at the bottleneck is an hour lost by the whole factory, while an hour lost anywhere else costs nothing.** Optimise the constraint; the rest has slack.

> [!TRAP]
> ***"Automatic replanning in case there is any change in requirement… replanning is very fast"*** is the row that answers MRP's limitation ⑤ — *"cannot replan fast enough."*
>
> **Why it matters operationally:** a customer changes an order at 10 a.m. If replanning takes overnight, **the shop floor spends the day executing a plan that is already wrong.** If it takes minutes, the change propagates before anything is wasted.
>
> **And that speed is what makes simulation possible at all.** *"Simulation and what-if capability"* is only useful if you can run a scenario in seconds — **a what-if that takes eight hours is not a what-if, it is a project.** The two capabilities are the same capability.

## Global Available-to-Promise

> [!EXAM]
> - **Available-To-Promise (ATP) check is an online search to verify the company's ability to provide the requested product, in the requested quantity, and on the date requested by the customer**
> - **Limited, based on static info**
>
> **Supply chain solutions provide advanced capabilities in this area. Some of the important capabilities are:**
> 1. **Alternate products**
> 2. **Alternate location**
> 3. **Multi-site multi-product availability check**
> 4. **Multi-level component and capacity check (Capable to promise)**
> 5. **Rule based availability check**
> 6. **Calendars**
>
> The deck's note: *"with only ERP, advanced ATP can be achieved to some degree **with manual analysis**."*

> [!DERIVE]
> **The six capabilities are an escalating sequence of answers to one customer question — *"can I have it by Friday?"***
>
> | If… | GATP tries |
> |---|---|
> | it is not in **this** warehouse | **alternate location** — check the others |
> | **this exact product** is unavailable | **alternate products** — a substitute the customer would accept |
> | **nothing finished** exists anywhere | **capable-to-promise** — can we *make* it in time? |
> | the answer depends on **who is asking** | **rule based availability check** |
> | the date depends on **working days and shifts** | **calendars** |
>
> **Available-to-promise vs capable-to-promise is the distinction worth knowing:**
>
> $$\textbf{ATP: is there stock or a planned receipt?} \qquad\qquad \textbf{CTP: could we produce it, given components and capacity?}$$
>
> **CTP requires exactly what SCP has and ERP lacks — finite capacity and multi-level component visibility.** That is why the deck calls it *"multi-level component and **capacity** check."* **You cannot promise to make something without knowing whether the machine is free.**
>
> **"Rule based availability check" is the commercially interesting one.** When stock is short, **who gets it?** A rule can reserve stock for **strategic customers**, or allocate by **contract commitment**, rather than serving whoever ordered first. **First-come-first-served is a policy, not a law of nature** — and this is the same **prioritization** capability the ERP-vs-SCP table said ERP *"cannot handle."*
>
> **And "limited, based on static info" is the honest description of ERP's ATP:** it looks up a number. **GATP conducts a search** — which is why it needs the network, the capacity model and the rules.

## Transportation planning

> [!EXAM]
> **Transport Optimizer Constraints:**
>
> **Vehicle Capacity · Depot Location · Limits of Distance, Duration, Stopovers · Handling Resources · Maximum Storage Time at Location · Vehicle Types (Trains, Ships, Aircraft, Trucks) · Opening Hours of Locations · Drop Sequence · Stacking Constraint · Access Restriction**
>
> The deck's note adds more: *"**access restriction** could be something related to **border crossing**, which is allowed only at certain times of the day… we can add other constraints such as **governmental quota restrictions**, material-related constraints — **perishable, hazardous**… **stacking constraints** itself can be a long list — this side up, hazardous, **LIFO**, interchange with another vehicle. **Most long distance transportation happens through containers.**"*

> [!EXAM]
> **Transport Planning and Optimization Areas:**
>
> | **Technology Used** | **Business Need** | **What it does** |
> |---|---|---|
> | **Transport planning and Vehicle scheduling** | **Minimize number of vehicles used** | **Help in better planning of vehicles — i.e. when and what size vehicle needs to be ordered, looking at the daily shipment plan, service level required and vehicle capacity** |
> | **Route optimization** | **Minimize vehicle travel distance** | **Help in building an optimum route keeping multiple drop points in mind, and ensure that the trucks travel the shortest route while dropping at all the points** |
> | **Optimum truck load building** | **Minimize unloading labour, and also so the truck does not run empty** | **Help in building an optimum load for the truck. Takes into account drop sequence and properties of materials (i.e. light materials should not be below heavy material)** |

> [!INTUITION]
> **The three optimisation areas minimise three different things, and they interact:**
>
> $$\textbf{how many vehicles} \qquad \textbf{how far each travels} \qquad \textbf{how well each is packed}$$
>
> **Load building and route optimisation are coupled through drop sequence, and that coupling is the elegant part.** The load must be packed so that **each drop's goods are reachable when the truck arrives** — which means **the last delivery is loaded first**, deepest in the truck. **You cannot decide the packing until you know the route, and the route affects how much fits.**
>
> **And the physical constraint on top of it — *"light materials should not be below heavy material"* — is a genuine safety and damage rule that the software must respect**, which is why *"stacking constraint"* appears in the constraint list and why the deck notes it *"itself can be a long list."*
>
> **This is why the deck says *"route optimization is one of the most complex problems in computer science."*** It is the **vehicle routing problem** — a generalisation of the travelling salesman problem — and adding capacity, time windows, stacking rules and access restrictions makes it dramatically harder.

> [!TRAP]
> **The deck's asides on transport planning are worth carrying because they are the kind of concrete detail that turns a generic answer into a good one:**
>
> - **"Optimizations based on seasons"** and *"case of Finland customer"* — routes that are valid in summer may be impassable, or conversely open across frozen ground, in winter
> - **"Problems of route operation permit"** and **"special item movement, long structures"** — an oversized load needs a permit and a cleared route, which is a planning constraint, not a driving one
> - **"Even airlines use some of these techniques while connecting multi-hop, multi-segment travel itineraries"** — the same mathematics, different vehicles
>
> ⚠️ **And "access restriction… border crossing allowed only at certain times of the day" is the best single example of why this cannot be solved by shortest-path alone.** The shortest route may be unusable at the hour the truck arrives — **so the optimiser is scheduling in time, not just routing in space.**

---

**Next:** working with partners rather than alone — **collaborative planning & VMI**.
