# Claude Code adapter

Recommended:

1. Keep the canonical Skill source under your shared Skill repository.
2. Copy or symlink `project-handoff` to:
   - `~/.claude/skills/project-handoff/`
3. Add the provided `CLAUDE.md` at the project root if the project primarily uses `AGENTS.md`.
4. Claude Code supports `@path` imports from `CLAUDE.md`, so this adapter points to `@AGENTS.md`.

The cross-agent project files remain in the project root.
