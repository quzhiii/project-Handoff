param(
    [string]$Source = "$(Split-Path -Parent $PSScriptRoot)\skill\project-handoff",
    [string]$ProjectRoot = "",
    [switch]$InstallTemplates,
    [switch]$ForceTemplates
)

$ErrorActionPreference = "Stop"

$RepoRoot = Split-Path -Parent $PSScriptRoot
$TemplateRoot = Join-Path $RepoRoot "templates"

function Copy-Skill {
    param(
        [string]$Target
    )

    $parent = Split-Path -Parent $Target
    New-Item -ItemType Directory -Force -Path $parent | Out-Null

    if (Test-Path $Target) {
        Remove-Item -Recurse -Force $Target
    }

    Copy-Item -Recurse -Force $Source $Target
    Write-Host "Installed: $Target"
}

function Copy-ProjectTemplates {
    param(
        [string]$TargetRoot
    )

    if (-not (Test-Path -LiteralPath $TargetRoot)) {
        throw "ProjectRoot does not exist: $TargetRoot"
    }

    $templateFiles = @(
        "AGENTS.md",
        "BOOTSTRAP.md",
        "BRIEF.md",
        "STATE.md",
        "DECISIONS.md",
        "TASK.md",
        "ROADMAP.md",
        "EXECUTION_RECEIPT.md",
        "REVIEW_RESULT.md",
        "SNAPSHOT_MANIFEST.md"
    )

    foreach ($file in $templateFiles) {
        $sourceFile = Join-Path $TemplateRoot $file
        $targetFile = Join-Path $TargetRoot $file

        if ((Test-Path -LiteralPath $targetFile) -and (-not $ForceTemplates)) {
            Write-Host "Skipped existing template: $targetFile"
            continue
        }

        Copy-Item -Force -LiteralPath $sourceFile -Destination $targetFile
        Write-Host "Copied template: $targetFile"
    }
}

$homeDir = [Environment]::GetFolderPath("UserProfile")

# Codex + OpenCode shared Agent Skills path
Copy-Skill (Join-Path $homeDir ".agents\skills\project-handoff")

# Claude Code
Copy-Skill (Join-Path $homeDir ".claude\skills\project-handoff")

# Qoder
Copy-Skill (Join-Path $homeDir ".qoder\skills\project-handoff")

Write-Host ""
Write-Host "Done."
Write-Host "TRAE and WorkBuddy/CodeBuddy may require tool-specific import/project setup; see adapters/."

if ($InstallTemplates) {
    if ([string]::IsNullOrWhiteSpace($ProjectRoot)) {
        throw "-ProjectRoot is required when using -InstallTemplates."
    }

    Write-Host ""
    Write-Host "Installing project templates..."
    Copy-ProjectTemplates $ProjectRoot
}
