---
subject: se
unit: 2
order: 13
slug: api-abi-errors
title: API Design, ABI & Error Handling
summary: APIs as contracts and their design principles, the types of API (library/IPC/REST) and sync vs async, the ABI (binary-level contract), and defensive error handling.
minutes: 15
tags: [API, ABI, REST, error-handling, defensive-programming, modularity]
---

# API Design, ABI & Error Handling

## APIs — contracts for modularity

> [!NOTE]
> An **API (Application Programming Interface)** is a **formal contract** governing how software components communicate. It provides an **abstraction layer** that hides implementation complexity while exposing the functionality others need.

**Why APIs matter:** system integration, **modular architecture** (independent development/testing), cross-platform compatibility, service composition.

### Design principles
- **Clarity & consistency** — descriptive names (`createUserProfile()`, not `userOp()`), consistent parameter ordering, language conventions.
- **Simplicity & minimalism** — expose only essentials; avoid feature bloat; group related functions.
- **Error handling** — clear, actionable error info (code + message + context) without leaking sensitive data.
- **Versioning & evolution** — **URL versioning** (`/v1/users`), **header versioning**, **semantic versioning** (MAJOR.MINOR.PATCH), backward compatibility.

### Types of API

| Type | Description | Example |
|---|---|---|
| **Function/Library** | Direct invocation in-process. **Static libraries** (compiled in, fast, need recompile) vs **dynamic libraries** (loaded at runtime, updatable). | POSIX `open()`, `read()`, `close()` |
| **IPC-level** | Communication between processes on one machine: **message queues, shared memory, semaphores**. | POSIX IPC |
| **Network / REST** | Distributed systems. RESTful: **resource-based URLs, HTTP methods (GET/POST/PUT/DELETE), status codes, stateless**. Docs via **OpenAPI/Swagger**. | Web services |

**Synchronous vs Asynchronous:**
- **Sync** — caller **blocks** until done (simple model; e.g. Python `requests.get()`). Good for file ops, DB queries.
- **Async** — caller **continues immediately**, results via callbacks/promises/events (e.g. Node.js handling thousands of concurrent connections). Good for network ops, UIs, high concurrency.

> [!INTUITION]
> **Sync** is a phone call — you wait on the line for the answer. **Async** is a text message — you send it and carry on, getting notified when the reply arrives. Async scales far better for I/O-heavy work.

**Achieving modularity through APIs:** interface-based design + **dependency injection** (loose coupling); **contract-first development** via **OpenAPI/Swagger**; **gRPC + Protocol Buffers** (binary, strongly-typed, multi-language, streaming); **facade** patterns (hide complex subsystems).

## ABI — the binary-level contract

> [!NOTE]
> An **ABI (Application Binary Interface)** defines the interface between **compiled applications and the operating system/platform** — at the **binary** level. (**API = source-level** contract; **ABI = compiled/binary-level** contract.)

The ABI specifies: **data types & sizes** (and endianness) · **calling conventions** (how parameters are passed — registers vs stack — and cleaned up) · **register usage** · **stack structure** · **system-call interface** · **object/file formats & symbol tables** (dynamic linking) · **memory management** · **thread sync** · the **C++ ABI** (virtual-function layout, multiple inheritance).

> [!EXAM]
> **API vs ABI:** an **API** lets two programs compile/link against each other at the **source** level; an **ABI** lets a **compiled binary** run against an OS/another binary. Changing the ABI ("**ABI breakage**") breaks already-compiled programs **even if the source is unchanged** — critical for updates and backward compatibility.

## Error handling & defensive programming

**Error categories:** **Programming** (logic/resource bugs), **Environmental** (resource limits, network, hardware), **User input** (invalid/malicious), **Business-logic violations**.

**Defining & propagating errors:**
- **Error code systems** — centralised enumeration with **scoped prefixes** (`AUTH_INVALID_TOKEN`, `DB_CONNECTION_FAILED`), a central registry, hierarchical grouping.
- **Propagation patterns:** **return-code checking** (procedural), **exception-based** (OO), **result types** (functional — forces handling both cases), **HTTP status codes** (REST: 200/400/404/500).

**Logging & observability:** **structured logging** (machine-readable key-value, **log levels** DEBUG→FATAL); **correlation/tracing** (unique request/trace IDs propagated across services for end-to-end analysis).

**Defensive programming best practices:**
- **Fail-fast** — detect/report errors as early as possible: **input validation** on receipt, **precondition checking** (assertions), invariant/state-consistency checks.
- **Graceful degradation** — maintain **partial functionality** during failure: fallbacks (cached data, defaults), service isolation (no cascading), preserve core UX.
- **Consistent strategy** — uniform patterns, standard message formats and recovery procedures.

> [!TRAP]
> **Fail-fast vs graceful degradation** aren't contradictory — fail-fast applies at *development/boundary* time (catch bad inputs immediately so bugs surface early); graceful degradation applies at *runtime in production* (don't let one failure take down the whole system). Good systems do **both**.

---

**Next:** designing software for the humans who use it — **usability engineering**.
