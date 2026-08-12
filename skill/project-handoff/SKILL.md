---
name: project-handoff
description: Coordinate an existing project across browser/planning agents and local execution agents. Use when starting or continuing project work, switching agents, executing a TASK, reviewing an implementation, or handing work back to another agent. Do not use for unrelated one-off questions or pure ideation with no project state.
---

# Project Handoff Protocol

Use this protocol to keep project context portable across agents and sessions.

## 1. Identify the operating mode

Classify the current request as one of:

- **BOOTSTRAP** - a new agent is entering an existing project.
- **EXECUTE** - implement the current `TASK.md`.
- **REVIEW** - inspect an execution result, PR, commit, artifact, or receipt.
- **HANDOFF** - prepare the project for another agent or session.

Do not mix modes unless the user explicitly asks for a combined workflow.

## 2. Discover project context

From the project root, look for these files when they exist:

1. `AGENTS.md`
2. `BRIEF.md`
3. `STATE.md`
4. `DECISIONS.md`
5. `TASK.md`
6. `ROADMAP.md`

Then inspect the actual repository/files relevant to the task.

Do not require every file to exist. Missing optional files are not a reason to invent content.

For small projects, the Lite preset is enough: `AGENTS.md`, `BRIEF.md`, `STATE.md`, and `TASK.md`. Use the Full preset when durable decisions, roadmap separation, review artifacts, or snapshots are useful.

## 3. Use the authority map

Treat each source as authoritative only for its own question:

- **Repository + tests + git history** - what is actually implemented.
- **BRIEF.md** - why the project exists, target user, scope, success criteria.
- **DECISIONS.md** - durable decisions and rejected alternatives.
- **STATE.md** - current milestone, status, blockers, accepted recent work.
- **TASK.md** - the current execution scope and acceptance criteria.
- **ROADMAP.md** - possible future work; never treat it as authorization to execute.

Session history, chat summaries, scratch notes, and old prompts are supporting evidence only.

## 4. Run a context check before execution

Before editing or implementing, state briefly:

- current project goal;
- current milestone;
- current task;
- allowed scope;
- acceptance criteria;
- git branch, HEAD, and working tree state when available;
- whether `STATE.md` Branch / Commit matches current git branch / HEAD;
- any detected conflicts or stale state.

If project documents disagree with repository reality, identify the mismatch explicitly.
Preserve implementation facts. Do not silently rewrite project intent to fit the code.

If a conflict would materially change scope, architecture, or product intent, stop that change and surface the decision point.

If `STATE.md` is stale because its Branch or Commit does not match git, do not treat stale status as current implementation truth. Use git, tests, and real files for implementation facts, then update `STATE.md` after accepted work.

## 5. Execute only the current task

During EXECUTE mode:

- Work only within `TASK.md` and the minimum adjacent changes required to satisfy it.
- Do not expand scope because `ROADMAP.md` contains related work.
- Do not perform unrelated cleanup or redesign.
- Record newly discovered issues for later and keep the current task narrow.
- Prefer targeted context retrieval over rereading the entire project when the current task is narrow.

For code work:

- inspect the relevant implementation first;
- make the smallest coherent change;
- run relevant tests;
- run build/lint/type checks when appropriate;
- use git/worktrees as implementation evidence and isolation, not as a substitute for project state.

## 6. Handle exploration and branches

Exploratory sessions, forks, subagents, and worktrees may be used freely for alternatives.

Their outputs remain provisional until accepted.

Only accepted findings should update:

- `STATE.md`;
- `DECISIONS.md`;
- the main implementation branch;
- the next `TASK.md`.

Do not promote a branch conclusion into project truth merely because a session produced it.

## 7. Write back durable state

After meaningful execution:

### Update `STATE.md` when:
- a task or milestone changed status;
- an implementation was accepted;
- a blocker appeared or was removed;
- the next action changed.

When updating `STATE.md`, include the current branch, commit, working tree state, and verification date when available.

### Update `DECISIONS.md` only when:
- architecture changed;
- product scope changed;
- a contract or invariant changed;
- a meaningful alternative was deliberately rejected.

Do not turn `DECISIONS.md` into a session log.

## 8. Return an Execution Receipt

After EXECUTE or HANDOFF mode, return a concise receipt with:

- Task ID / task name
- Base state (branch / commit when relevant)
- Head state (branch / commit when relevant)
- Completed work
- Changed files or artifacts
- Verification performed
- `STATE.md` update
- `DECISIONS.md` update
- Open issues
- Review focus

Use `references/EXECUTION_RECEIPT_TEMPLATE.md` when available.

## 9. Review protocol

During REVIEW mode:

1. Read the receipt.
2. Inspect the actual changed artifact, diff, PR, tests, or files.
3. Compare the result with `TASK.md` acceptance criteria.
4. Check for scope creep, regressions, stale state, and unrecorded durable decisions.
5. Return one status:
   - `PASS`
   - `CONDITIONAL PASS`
   - `FAIL`
6. If more work is needed, produce a narrow next task or fix task.

A receipt is an index for review, not proof by itself.

## 10. Full Context Snapshot

Use a full snapshot only when useful:

- first local bootstrap;
- major agent/tool switch with no shared workspace;
- major milestone or product direction change;
- suspected context drift;
- archival/reproducibility checkpoint.

For ordinary iterations, exchange `TASK` and `EXECUTION RECEIPT` and reserve full snapshots for major transitions.

## 11. Handoff objective

A successful handoff means a new agent can answer, from project artifacts rather than prior chat:

- What is this project?
- Where is it now?
- What decisions are fixed?
- What is the current task?
- What has actually been implemented?
- What must be verified next?

If the answer depends on an old conversation that is unavailable to the next agent, the durable project context is incomplete.

## 12. Tools without automatic Skill loading

When the current tool does not automatically discover or load this Skill, use `references/BOOTSTRAP_PROMPT.md` or a project-level `BOOTSTRAP.md` as a short manual entrypoint. Keep that prompt thin and point back to the repository files.
