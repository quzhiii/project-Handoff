import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const errors = [];
const warnings = [];

function rel(...parts) {
  return path.join(...parts).replaceAll("\\", "/");
}

function abs(relativePath) {
  return path.join(root, relativePath);
}

function requireFile(relativePath) {
  if (!existsSync(abs(relativePath))) {
    errors.push(`Missing required file: ${relativePath}`);
    return false;
  }
  return true;
}

function readRequired(relativePath) {
  if (!requireFile(relativePath)) return "";
  return readFileSync(abs(relativePath), "utf8").replace(/\r\n/g, "\n");
}

const requiredFiles = [
  "README.md",
  "CHANGELOG.md",
  "LICENSE",
  "package.json",
  "skill/project-handoff/SKILL.md",
  "templates/AGENTS.md",
  "templates/BRIEF.md",
  "templates/STATE.md",
  "templates/DECISIONS.md",
  "templates/TASK.md",
  "templates/ROADMAP.md",
  "templates/EXECUTION_RECEIPT.md",
  "templates/REVIEW_RESULT.md",
  "templates/SNAPSHOT_MANIFEST.md",
  "skill/project-handoff/references/TASK_TEMPLATE.md",
  "skill/project-handoff/references/EXECUTION_RECEIPT_TEMPLATE.md",
  "skill/project-handoff/references/REVIEW_RESULT_TEMPLATE.md",
  "skill/project-handoff/references/SNAPSHOT_MANIFEST_TEMPLATE.md",
  "install/README.md",
  "install/install-windows.ps1",
  "adapters/browser-chatgpt/README.md",
  "adapters/codex/README.md",
  "adapters/opencode/README.md",
  "adapters/claude-code/README.md",
  "adapters/claude-code/CLAUDE.md",
  "adapters/qoder/README.md",
  "adapters/trae/README.md",
  "adapters/workbuddy-codebuddy/README.md"
];

for (const file of requiredFiles) requireFile(file);

const skillPath = "skill/project-handoff/SKILL.md";
const skill = readRequired(skillPath);
const frontmatter = skill.match(/^---\n([\s\S]*?)\n---\n/);

if (!frontmatter) {
  errors.push("skill/project-handoff/SKILL.md is missing YAML frontmatter.");
} else {
  const fields = Object.fromEntries(
    frontmatter[1]
      .split("\n")
      .map((line) => line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/))
      .filter(Boolean)
      .map((match) => [match[1], match[2]])
  );

  if (fields.name !== "project-handoff") {
    errors.push(`Expected skill name project-handoff, found ${fields.name || "<missing>"}.`);
  }

  if (!fields.description || fields.description.length < 80) {
    errors.push("Skill description must explain purpose and trigger conditions.");
  }

  for (const keyword of ["starting", "switching agents", "executing a TASK", "reviewing"]) {
    if (!fields.description?.includes(keyword)) {
      warnings.push(`Skill description does not include trigger phrase: ${keyword}`);
    }
  }
}

const mirroredTemplates = [
  ["templates/TASK.md", "skill/project-handoff/references/TASK_TEMPLATE.md"],
  ["templates/EXECUTION_RECEIPT.md", "skill/project-handoff/references/EXECUTION_RECEIPT_TEMPLATE.md"],
  ["templates/REVIEW_RESULT.md", "skill/project-handoff/references/REVIEW_RESULT_TEMPLATE.md"],
  ["templates/SNAPSHOT_MANIFEST.md", "skill/project-handoff/references/SNAPSHOT_MANIFEST_TEMPLATE.md"]
];

for (const [templatePath, referencePath] of mirroredTemplates) {
  const template = readRequired(templatePath);
  const reference = readRequired(referencePath);
  if (template && reference && template !== reference) {
    errors.push(`${referencePath} must exactly match ${templatePath}.`);
  }
}

const readme = readRequired("README.md");
for (const phrase of ["npm run validate", "GitHub", "Release Checklist"]) {
  if (!readme.includes(phrase)) warnings.push(`README.md does not mention: ${phrase}`);
}

const installScript = readRequired("install/install-windows.ps1");
for (const phrase of ["InstallTemplates", "ProjectRoot", "ForceTemplates"]) {
  if (!installScript.includes(phrase)) errors.push(`install-windows.ps1 missing ${phrase} support.`);
}

if (errors.length > 0) {
  console.error("project-handoff validation failed:\n");
  for (const error of errors) console.error(`- ${error}`);
  if (warnings.length > 0) {
    console.error("\nWarnings:");
    for (const warning of warnings) console.error(`- ${warning}`);
  }
  process.exit(1);
}

console.log("project-handoff validation passed.");
console.log(`Checked ${requiredFiles.length} required files and ${mirroredTemplates.length} mirrored templates.`);
if (warnings.length > 0) {
  console.log("Warnings:");
  for (const warning of warnings) console.log(`- ${warning}`);
}
