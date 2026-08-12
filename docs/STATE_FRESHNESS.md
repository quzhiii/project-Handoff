# State Freshness

`STATE.md` is useful only when it stays aligned with repository reality.

Before execution, compare the `STATE.md` branch and commit with the current git branch and `HEAD`. A mismatch means the state file may describe an older version of the project.

## Manual check

```powershell
git branch --show-current
git rev-parse HEAD
git status --short
```

Compare the output with `STATE.md`:

```text
## Relevant implementation state

- Repository:
- Branch:
- Commit:
- Working tree:
- Last verified:
```

## Scripted check

From this repository:

```powershell
npm run check:staleness -- "E:\path\to\target-project"
```

The script reads `STATE.md`, compares `Branch` and `Commit` to git, and reports stale state before an agent starts implementation.

## Handling stale state

1. Trust git, tests, and real files for implementation facts.
2. Report the mismatch before editing.
3. Update `STATE.md` after accepted work or ask for a narrower task when the mismatch changes scope.
