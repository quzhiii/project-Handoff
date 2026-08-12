# BOOTSTRAP PROMPT

Use this when the current agent or tool does not automatically load the `project-handoff` skill.

```text
Use the project-handoff protocol for this repository.
Read AGENTS.md, BRIEF.md, STATE.md, DECISIONS.md if present, and TASK.md.
Treat TASK.md as the current execution scope and ROADMAP.md as future planning only.
Before editing, compare STATE.md Branch/Commit with the current git branch/HEAD and report stale state.
After meaningful execution, update STATE.md when appropriate and return an EXECUTION RECEIPT.
```
