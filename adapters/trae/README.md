# TRAE adapter

TRAE supports Skills and persistent Rules, but its installation/import flow is product-UI specific.

Recommended v0.1 mapping:

- Skill: import/add the canonical `project-handoff` Skill.
- Project Rules: add a very short rule telling TRAE to read `AGENTS.md` and use `project-handoff` for project execution/handoff/review.
- Keep BRIEF / STATE / DECISIONS / TASK in the project folder, not in TRAE-only memory.

Do not duplicate the full protocol into TRAE Rules. The Rule should only be an entrypoint.
