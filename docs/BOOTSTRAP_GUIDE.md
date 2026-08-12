# Bootstrap Guide

Some tools discover `SKILL.md` automatically. Other tools need a short project rule, pinned note, or pasted prompt.

Use `templates/BOOTSTRAP.md` as the shared manual entrypoint. Keep the prompt short enough to paste at the start of a session and specific enough to anchor the agent on project files.

## Recommended use

1. Add `BOOTSTRAP.md` to the project root when the tool has no reliable Skill autoload path.
2. Paste the fenced prompt from `BOOTSTRAP.md` into a new session before asking for project work.
3. Keep `AGENTS.md` as the durable project rule file.
4. Keep tool-specific rules thin and point them back to `AGENTS.md` plus `BOOTSTRAP.md`.

## Minimal prompt

```text
Use the project-handoff protocol for this repository.
Read AGENTS.md, BRIEF.md, STATE.md, DECISIONS.md if present, and TASK.md.
Treat TASK.md as the current execution scope and ROADMAP.md as future planning only.
Before editing, compare STATE.md Branch/Commit with the current git branch/HEAD and report stale state.
After meaningful execution, update STATE.md when appropriate and return an EXECUTION RECEIPT.
```

## Adapter guidance

- Browser ChatGPT: paste the prompt with the project files or relevant excerpts.
- OpenCode / Codex: install the skill when supported and keep `AGENTS.md` in the repository root.
- Claude Code: use the skill plus a thin `CLAUDE.md` adapter when the project primarily uses `AGENTS.md`.
- Qoder / TRAE / WorkBuddy / CodeBuddy: use native skills where available and add a short project rule pointing to `AGENTS.md`.
