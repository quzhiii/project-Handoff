# AGENTS.md

## Required collaboration protocol

When starting, continuing, handing off, executing, or reviewing project work, use the `project-handoff` skill if available.

If the skill is unavailable, follow the same rules below.

## Source of truth

- Project intent: `BRIEF.md`
- Current state: `STATE.md`
- Durable decisions: `DECISIONS.md`
- Current execution scope: `TASK.md`
- Future plan: `ROADMAP.md`
- Implementation facts: repository + tests + git history

## Start rule

Before meaningful execution:

1. Read this file.
2. Read `BRIEF.md`, `STATE.md`, `DECISIONS.md`, and `TASK.md` when present.
3. Inspect the actual relevant repository/files.
4. Check git branch / HEAD / working tree when applicable.
5. Briefly restate current goal, state, task, scope, and acceptance criteria.

## Scope rule

Only `TASK.md` authorizes current execution.

`ROADMAP.md`, old prompts, archived plans, and prior sessions do not authorize additional work.

## Conflict rule

If documents and repository reality disagree:

- identify the conflict;
- preserve implementation facts;
- do not silently change project intent;
- escalate scope/architecture conflicts before implementing them.

## Verification rule

A task is not complete merely because files were edited.

Run relevant tests/build/lint/type checks where applicable.

## Write-back rule

Update `STATE.md` after meaningful accepted progress.

Update `DECISIONS.md` only for durable product, architecture, contract, or scope decisions.

## Return rule

End an execution round with an `EXECUTION RECEIPT`.
