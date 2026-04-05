# v2 Enhancements

## CLI (`@cmds-cc/hooks`)

- [ ] `list` command — show currently installed hooks with which repo they came from
- [ ] `remove` command — uninstall hooks by repo name
- [ ] `update` command — re-fetch and update hooks from a repo
- [ ] npm package support — resolve from npm in addition to GitHub
- [ ] `--yes` flag — skip interactive prompt, install all default hooks
- [ ] `--project` flag — install to `.claude/settings.json` instead of global

## Site (`cmds.cc`)

- [ ] ASCII art hero — Ghostty-style dense character animation. Pre-render frames offline as JSON, cycle at 30fps like the Ghostty CodePen. Tried bitmap font, canvas pixel sampling, and figlet approaches in v1 — none achieved the right density. Needs offline frame generation (e.g., Rust/Python script that renders text to high-res ASCII grid, outputs frame array)
- [ ] /hooks/docs page — was in vanilla TS version, needs React rebuild
- [ ] GitHub API token as Cloudflare secret for higher rate limits
- [ ] Register subpath hooks in directory (POST /api/register with path support)
- [ ] Search/filter hooks by name or keyword
- [ ] Install count tracking (increment on each CLI registration)
- [ ] Leaderboard — sort by installs, trending
- [ ] Hook detail expansion — click to see the actual commands each hook runs
- [ ] "Add your hooks" section — instructions for authors to add `claude-hooks.json`
- [ ] Open Graph / social preview image
- [ ] Submission form — anyone can submit a repo URL to register (validated server-side)
- [ ] RSS/Atom feed of newly registered hooks
- [ ] Cloudflare Pages GitHub integration for auto-deploy on push

## Convention (`claude-hooks.json`)

- [ ] `tags` field — categorize hooks (safety, formatting, quality, etc.)
- [ ] `requires` field — declare dependencies (e.g., "requires jq installed")
- [ ] Support for non-Bash matchers — `Write|Edit`, `Read`, etc.
- [ ] Schema validation — JSON schema for `claude-hooks.json` published to schemastore.org

## Ecosystem

- [ ] Add `claude-hooks.json` to cisco-ise, cisco-yang, audiocodes-cli
- [ ] GitHub Action for validating `claude-hooks.json` in CI
- [ ] Move hook collections from `sieteunoseis/cmds.cc/hooks/` to `cmds-cc/` org
