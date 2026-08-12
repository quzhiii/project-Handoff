# Install

`install-windows.ps1` is intentionally simple:

- copies the canonical Skill to the shared `.agents/skills/` path used by Codex/OpenCode;
- copies it to Claude Code's user Skill path;
- copies it to Qoder's user Skill path.

Run from PowerShell:

```powershell
.\install\install-windows.ps1
```

Optionally bootstrap project protocol templates into a repository:

```powershell
.\install\install-windows.ps1 -InstallTemplates -ProjectRoot "E:\path\to\project"
```

Existing project files are not overwritten unless `-ForceTemplates` is passed:

```powershell
.\install\install-windows.ps1 -InstallTemplates -ProjectRoot "E:\path\to\project" -ForceTemplates
```

It does not:
- modify repositories;
- install plugins;
- write TRAE/WorkBuddy settings;
- grant tool permissions;
- create hooks;
- push commits.

Template bootstrap only copies Markdown files into the `-ProjectRoot` directory. It does not initialize git, stage, commit, push, or modify tool settings.

The template set includes `BOOTSTRAP.md` for tools that do not automatically load Skills.

Review the script before running it.
