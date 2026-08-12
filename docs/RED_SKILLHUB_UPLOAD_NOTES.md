# Red SkillHub Upload Notes

These notes capture the current upload constraints for publishing this skill to Xiaohongshu SkillHub. They are not an instruction to upload.

## Current status

- Environment: production.
- Upload is intentionally not performed until the user explicitly asks for it.
- Final submission must not run until the user explicitly replies `提交`, `确认`, or `submit`.

## Dynamic uploader requirements received

- Trusted uploader source URL: `https://fe-video-qc.xhscdn.com/fe-platform-file/104101b8322sgl1d27u06b6titltg00000000038nokoa4`
- Download to a temporary directory and confirm the downloaded file is a ZIP.
- Never pipe downloaded content directly into a shell.
- Safely unzip by ignoring `__MACOSX`, hidden files, and symlinks.
- Reject absolute paths, parent-directory traversal, and ZIP Slip risks.
- Stop unless the extracted uploader contains both `skill/SKILL.md` and `skill/scripts/ensure-cli.mjs`.
- If native skill installation is unavailable, read the uploader `skill/SKILL.md` in full and treat it as mandatory task instructions.
- Check for `node` and `npm` before running uploader setup.
- If Node.js must be installed, explain the installation method, scope, directories, and required permissions before asking for authorization.
- Never run `sudo`, `su`, administrator commands, `chmod 777`, recursive `chown`, or system-directory modifications without explicit authorization.
- Run `ensure-cli.mjs` with user-writable npm prefix/cache directories and temporary process-local environment changes only.
- Continue only when CLI version status is `current`, `installed`, or `updated`.
- Use Xiaohongshu App QR authorization first when login is needed.
- If `qrCodePath` is returned, send the QR code as an image, not just a local path.
- Use `authorizeH5Url` only as fallback when QR scanning fails.
- Login waiting must support cancellation.
- Follow the uploader skill for version check, login, parameter confirmation, packaging, upload, and final submit.

## Packaging implications for this skill

- The upload package should identify `skill/project-handoff/SKILL.md` as the canonical skill entrypoint.
- Include `skill/project-handoff/references/` because `SKILL.md` references the execution receipt template.
- Include root `README.md`, `CHANGELOG.md`, `LICENSE`, `templates/`, `adapters/`, `install/`, and `docs/` as supporting artifacts if the uploader accepts supplementary files.
- Exclude local Git metadata, generated archives, logs, and temporary files.
- Run `npm run validate` before packaging.
- Re-check that no token, credential, personal session artifact, or machine-local path is included in the final upload package.
