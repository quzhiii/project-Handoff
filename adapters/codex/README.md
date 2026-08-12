# Codex adapter

Recommended:

1. Install the canonical Skill to the shared Agent Skills path when supported:
   - `~/.agents/skills/project-handoff/`
2. Keep project-level protocol files in the repository root:
   - `AGENTS.md`
   - `BRIEF.md`
   - `STATE.md`
   - `DECISIONS.md`
   - `TASK.md`
   - `ROADMAP.md`
3. Put a short rule in `AGENTS.md` telling Codex to use `project-handoff` for bootstrap, execution, review, continuation, and handoff.

Codex should inspect repository reality before implementation and should end execution rounds with an `EXECUTION RECEIPT`.
