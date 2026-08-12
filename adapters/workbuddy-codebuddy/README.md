# WorkBuddy / CodeBuddy adapter

CodeBuddy Code supports reusable Skills under `.codebuddy/skills/` and persistent project memory/rules.

Recommended:

Project-local Skill:
`.codebuddy/skills/project-handoff/SKILL.md`

Project rule / memory:
Keep the tool-specific entrypoint thin and tell it to read the shared `AGENTS.md`.

Do not duplicate BRIEF / STATE / DECISIONS into CodeBuddy auto memory unless they are generated from the canonical project files.
