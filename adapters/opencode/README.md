# OpenCode adapter

Recommended:

1. Install the canonical Skill to the shared Agent Skills path:
   - `~/.agents/skills/project-handoff/`
2. Keep the shared project protocol files in the repository root:
   - `AGENTS.md`
   - `BRIEF.md`
   - `STATE.md`
   - `DECISIONS.md`
   - `TASK.md`
   - `ROADMAP.md`
3. Put only a short project instruction in `AGENTS.md` that points to the `project-handoff` skill.

OpenCode sessions should treat `TASK.md` as the current execution boundary, inspect repository reality before changes, and return an `EXECUTION RECEIPT` after meaningful execution.
