# Project Handoff

> A lightweight handoff protocol for multi-agent projects.

`project-handoff` helps browser-based planning agents and local execution agents share project context through repository files, task scopes, and execution receipts.

[中文](#中文) | [English](#english)

---

## 中文

### 简介

`project-handoff` 是一个面向多 Agent 项目的轻量协作协议。

当一个项目在 Browser ChatGPT、Codex、OpenCode、Claude Code、Qoder、TRAE、WorkBuddy / CodeBuddy 等工具之间切换时，它提供一套固定的项目文件、任务边界和回执格式，帮助新 Agent 快速接手当前工作。

### 适用场景

- 网页端 Agent 负责规划、研究、验收，本地 Agent 负责执行、测试、提交。
- 一个项目需要在多个 Agent 工具之间持续推进。
- 新会话开始时需要快速恢复项目背景和当前任务。
- 执行结果需要交给另一个 Agent 或人工进行复核。
- 项目长期状态需要沉淀在仓库里，方便后续追踪。

### 核心思路

```text
Project context
BRIEF / STATE / DECISIONS
        |
        v
Collaboration protocol
project-handoff Skill
        |
        v
Current execution scope
TASK
        |
   +----+----+
   |         |
Browser   Local agent
plan/review execute/test
   |         |
   +-- receipt
EXECUTION RECEIPT
```

### 文件职责

| File | Purpose |
| --- | --- |
| `AGENTS.md` | 项目级 Agent 协作入口和规则 |
| `BRIEF.md` | 项目目标、用户、边界和成功标准 |
| `STATE.md` | 当前里程碑、进度、阻塞项和下一步 |
| `DECISIONS.md` | 长期有效的产品、架构、接口和范围决策 |
| `TASK.md` | 当前这一轮执行任务、范围和验收标准 |
| `ROADMAP.md` | 未来计划和待排期事项 |
| `EXECUTION_RECEIPT.md` | 本地执行后的结果回执 |
| `REVIEW_RESULT.md` | 验收或审查结果 |
| `SNAPSHOT_MANIFEST.md` | 大切换或归档时的上下文快照索引 |

### 目录结构

```text
project-handoff-v0.1-draft/
  skill/project-handoff/        # Canonical Skill
  templates/                    # Project protocol templates
  adapters/                     # Tool-specific adapter notes
  install/                      # Windows install/bootstrap script
  docs/                         # Publishing and upload notes
  scripts/                      # Local validation
```

### 安装 Skill

Windows PowerShell:

```powershell
.\install\install-windows.ps1
```

脚本会把 canonical Skill 复制到常见用户级 Skill 目录：

- `.agents/skills/project-handoff`
- `.claude/skills/project-handoff`
- `.qoder/skills/project-handoff`

### 初始化项目模板

把协议模板复制到某个项目根目录：

```powershell
.\install\install-windows.ps1 -InstallTemplates -ProjectRoot "E:\path\to\project"
```

默认跳过已有文件。确实需要覆盖时再使用：

```powershell
.\install\install-windows.ps1 -InstallTemplates -ProjectRoot "E:\path\to\project" -ForceTemplates
```

### 本地校验

发布、同步 GitHub 或上传 SkillHub 前运行：

```powershell
npm run validate
```

校验内容包括：

- 必备文件是否存在；
- `skill/project-handoff/SKILL.md` frontmatter 是否完整；
- Skill 名称和目录名是否一致；
- `templates/` 与 `skill/project-handoff/references/` 中的镜像模板是否同步；
- Windows 安装脚本是否支持项目模板初始化。

### 推荐工作流

1. 在目标项目根目录放入 `AGENTS.md`、`BRIEF.md`、`STATE.md`、`DECISIONS.md`、`TASK.md` 和 `ROADMAP.md`。
2. 用 `BRIEF.md` 写清项目目标、目标用户、范围边界和成功标准。
3. 用 `STATE.md` 记录当前里程碑、分支、提交、阻塞项和下一步。
4. 用 `TASK.md` 定义一轮明确的执行任务和验收标准。
5. 本地 Agent 执行后返回 `EXECUTION RECEIPT`。
6. 审查方根据回执、真实代码、测试输出和验收标准给出 `REVIEW_RESULT`。

### 发布检查

1. 运行 `npm run validate`。
2. 检查 `SKILL.md` 的触发条件和边界描述。
3. 检查模板和 references 是否同步。
4. 检查仓库内是否包含凭据、会话文件、日志、压缩包或机器本地路径。
5. 更新 `CHANGELOG.md`。
6. 提交到 Git，再推送到 GitHub 或上传到 SkillHub。

### 小红书 SkillHub

上传注意事项见：`docs/RED_SKILLHUB_UPLOAD_NOTES.md`。

当前建议：

- SkillHub 如果只接受 Skill 包，上传 `skill/project-handoff/`。
- SkillHub 如果支持项目附件或补充文件，上传完整项目包，并确认入口为 `skill/project-handoff/SKILL.md`。
- 上传前运行 `npm run validate`。
- 最终提交需要人工明确确认。

---

## English

### Overview

`project-handoff` is a lightweight collaboration protocol for multi-agent projects.

It gives browser planning agents and local execution agents a shared set of project files, task boundaries, and receipt formats. A new agent can enter a project by reading repository artifacts and continue from the current task with less context loss.

### When To Use

- Browser agents handle planning, research, and review while local agents handle implementation and verification.
- A project moves across tools such as Browser ChatGPT, Codex, OpenCode, Claude Code, Qoder, TRAE, and WorkBuddy / CodeBuddy.
- A new session needs a quick and reliable project bootstrap.
- Completed work needs a compact execution receipt for review.
- Long-lived project facts should stay close to the repository.

### Core Flow

```text
Project context
BRIEF / STATE / DECISIONS
        |
        v
Collaboration protocol
project-handoff Skill
        |
        v
Current execution scope
TASK
        |
   +----+----+
   |         |
Browser   Local agent
plan/review execute/test
   |         |
   +-- receipt
EXECUTION RECEIPT
```

### File Roles

| File | Purpose |
| --- | --- |
| `AGENTS.md` | Shared project entrypoint for agent collaboration rules |
| `BRIEF.md` | Project intent, target user, scope, and success criteria |
| `STATE.md` | Current milestone, progress, blockers, and next action |
| `DECISIONS.md` | Durable product, architecture, interface, and scope decisions |
| `TASK.md` | Current execution task, allowed scope, and acceptance criteria |
| `ROADMAP.md` | Future work and parked ideas |
| `EXECUTION_RECEIPT.md` | Result receipt from an execution round |
| `REVIEW_RESULT.md` | Review or acceptance result |
| `SNAPSHOT_MANIFEST.md` | Context snapshot index for major switches or archives |

### Repository Layout

```text
project-handoff-v0.1-draft/
  skill/project-handoff/        # Canonical Skill
  templates/                    # Project protocol templates
  adapters/                     # Tool-specific adapter notes
  install/                      # Windows install/bootstrap script
  docs/                         # Publishing and upload notes
  scripts/                      # Local validation
```

### Install The Skill

Windows PowerShell:

```powershell
.\install\install-windows.ps1
```

The script copies the canonical Skill into common user-level Skill directories:

- `.agents/skills/project-handoff`
- `.claude/skills/project-handoff`
- `.qoder/skills/project-handoff`

### Bootstrap A Project

Copy protocol templates into a project root:

```powershell
.\install\install-windows.ps1 -InstallTemplates -ProjectRoot "E:\path\to\project"
```

Existing files are skipped by default. Use this when replacement is intentional:

```powershell
.\install\install-windows.ps1 -InstallTemplates -ProjectRoot "E:\path\to\project" -ForceTemplates
```

### Validate Locally

Run before local rollout, GitHub sync, or SkillHub packaging:

```powershell
npm run validate
```

The validator checks:

- required files;
- `skill/project-handoff/SKILL.md` frontmatter;
- skill name and directory alignment;
- mirrored templates under `templates/` and `skill/project-handoff/references/`;
- optional project template bootstrap support in the Windows installer.

### Recommended Workflow

1. Add `AGENTS.md`, `BRIEF.md`, `STATE.md`, `DECISIONS.md`, `TASK.md`, and `ROADMAP.md` to the target project root.
2. Describe project intent, target user, boundaries, and success criteria in `BRIEF.md`.
3. Track current milestone, branch, commit, blockers, and next action in `STATE.md`.
4. Define one execution round in `TASK.md` with clear acceptance criteria.
5. Have the local execution agent return an `EXECUTION RECEIPT`.
6. Review the receipt against the real artifacts, test output, and acceptance criteria.

### Release Checklist

1. Run `npm run validate`.
2. Review `SKILL.md` trigger conditions and scope boundaries.
3. Confirm templates and references are synchronized.
4. Check for credentials, session files, logs, archives, and machine-local paths.
5. Update `CHANGELOG.md`.
6. Commit to Git before pushing to GitHub or uploading to a SkillHub.

### Xiaohongshu SkillHub

Upload notes are maintained in `docs/RED_SKILLHUB_UPLOAD_NOTES.md`.

Current recommendation:

- If SkillHub expects a Skill package, upload `skill/project-handoff/`.
- If SkillHub accepts supporting materials, upload the full project package and keep `skill/project-handoff/SKILL.md` as the entrypoint.
- Run `npm run validate` before upload.
- Wait for explicit human confirmation before final submission.

## License

MIT License. See `LICENSE`.
