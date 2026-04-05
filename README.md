# @cmds-cc/hooks

Install Claude Code hooks from any GitHub repo.

**Docs:** [cmds.cc/hooks](https://cmds.cc/hooks)

```bash
npx @cmds-cc/hooks add sieteunoseis/spok-api
```

## How it works

1. Fetches `claude-hooks.json` from the target repo
2. Shows an interactive prompt to select which hooks to install
3. Merges selected hooks into `~/.claude/settings.json`

## Install from hook collections

```bash
# Essential safety guardrails
npx @cmds-cc/hooks add sieteunoseis/hooks.automate.builders/hooks/safety-essentials

# Cloud protection (AWS, GCP, Azure)
npx @cmds-cc/hooks add sieteunoseis/hooks.automate.builders/hooks/cloud-safety

# Kubernetes safety
npx @cmds-cc/hooks add sieteunoseis/hooks.automate.builders/hooks/kubernetes-safety

# Cisco UC CLI protection
npx @cmds-cc/hooks add sieteunoseis/hooks.automate.builders/hooks/cisco-cli-safety
```

Browse all collections at [cmds.cc/hooks](https://cmds.cc/hooks).

## Install from any repo

Any GitHub repo with a `claude-hooks.json` at root is installable:

```bash
npx @cmds-cc/hooks add owner/repo
```

Subdirectories work too:

```bash
npx @cmds-cc/hooks add owner/repo/path/to/hooks
```

## For CLI authors

Add a `claude-hooks.json` to your repo root:

```json
{
  "name": "my-tool",
  "description": "Hooks for my CLI tool",
  "author": "your-username",
  "version": "1.0.0",
  "hooks": [
    {
      "name": "Block write operations",
      "description": "Prevents write commands without approval",
      "default": true,
      "event": "PreToolUse",
      "matcher": "Bash",
      "hook": {
        "type": "command",
        "command": "your hook command here"
      }
    }
  ]
}
```

See the [docs](https://cmds.cc/hooks/docs) for the full authoring guide.

## Telemetry

After a successful install, the CLI registers the repo in the [directory](https://cmds.cc/hooks) so others can discover it. Only the repo name is sent — no personal data.

Opt out:

```bash
npx @cmds-cc/hooks add owner/repo --no-telemetry
CC_HOOKS_NO_TELEMETRY=1 npx @cmds-cc/hooks add owner/repo
```

## Migrating from cc-hooks-install

This package replaces `cc-hooks-install`. Same code, new name:

```bash
# Old
npx cc-hooks-install add owner/repo

# New
npx @cmds-cc/hooks add owner/repo
```

## License

MIT
