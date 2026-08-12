# Changelog

## 0.1.0 - Draft

- Adds the canonical `project-handoff` skill.
- Adds project protocol templates for `AGENTS`, `BRIEF`, `STATE`, `DECISIONS`, `TASK`, `ROADMAP`, review results, execution receipts, and context snapshots.
- Adds thin adapters for Browser ChatGPT, Codex, OpenCode, Claude Code, Qoder, TRAE, and WorkBuddy / CodeBuddy.
- Adds Windows installation support for user-level skill paths and optional project template bootstrap.
- Adds local validation for required files, skill frontmatter, and mirrored reference templates.
- Adds a manual bootstrap prompt for tools that do not automatically load Skills.
- Adds Lite and Full presets for different project sizes.
- Adds `check:staleness` to compare a target project's `STATE.md` branch/commit with git.
