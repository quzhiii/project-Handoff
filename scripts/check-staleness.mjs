import { existsSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";

const projectRoot = path.resolve(process.argv[2] || process.cwd());
const statePath = path.join(projectRoot, "STATE.md");

function runGit(args) {
  return execFileSync("git", ["-C", projectRoot, ...args], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  }).trim();
}

function stateValue(content, label) {
  const pattern = new RegExp(`^-\\s*${label}:\\s*(.*)$`, "im");
  return content.match(pattern)?.[1]?.trim() || "";
}

function fail(messages) {
  console.error("STATE.md freshness check failed:");
  for (const message of messages) console.error(`- ${message}`);
  process.exit(1);
}

if (!existsSync(statePath)) {
  fail([`Missing STATE.md at ${statePath}`]);
}

let currentBranch = "";
let currentCommit = "";
let status = "";

try {
  currentBranch = runGit(["branch", "--show-current"]);
  currentCommit = runGit(["rev-parse", "HEAD"]);
  status = runGit(["status", "--short"]);
} catch (error) {
  fail([`Could not read git state for ${projectRoot}.`, error.stderr?.toString().trim() || error.message]);
}

const state = readFileSync(statePath, "utf8");
const stateBranch = stateValue(state, "Branch");
const stateCommit = stateValue(state, "Commit");
const issues = [];

if (!stateBranch) {
  issues.push("STATE.md is missing a Branch value.");
} else if (currentBranch && stateBranch !== currentBranch) {
  issues.push(`STATE.md Branch is ${stateBranch}, current branch is ${currentBranch}.`);
}

if (!stateCommit) {
  issues.push("STATE.md is missing a Commit value.");
} else if (!currentCommit.startsWith(stateCommit) && !stateCommit.startsWith(currentCommit)) {
  issues.push(`STATE.md Commit is ${stateCommit}, current HEAD is ${currentCommit}.`);
}

if (issues.length > 0) fail(issues);

console.log("STATE.md freshness check passed.");
console.log(`Project: ${projectRoot}`);
console.log(`Branch: ${currentBranch || "<detached>"}`);
console.log(`Commit: ${currentCommit}`);
console.log(`Working tree: ${status ? "dirty" : "clean"}`);
