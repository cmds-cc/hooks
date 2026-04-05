#!/usr/bin/env node

import { program } from "commander";
import { fetchHooks } from "../lib/fetch.js";
import { selectHooks } from "../lib/prompt.js";
import { mergeHooks } from "../lib/merge.js";

program
  .name("cmds-hooks")
  .description("Install Claude Code hooks from any GitHub repo — cmds.cc/hooks")
  .version("1.0.0");

program
  .command("add")
  .argument("<repo>", "GitHub repo (owner/repo)")
  .option("--no-telemetry", "Don't register this install in the directory")
  .description("Install hooks from a GitHub repository")
  .action(async (repo, opts) => {
    try {
      const manifest = await fetchHooks(repo);
      const selected = await selectHooks(manifest);
      const result = await mergeHooks(selected, manifest, repo, {
        noTelemetry: opts.telemetry === false,
      });

      console.log();
      console.log(`  ✓ ${result.added} hook(s) installed to ${result.path}`);
      if (result.skipped > 0) {
        console.log(
          `  ⊘ ${result.skipped} hook(s) skipped (already installed)`,
        );
      }
      console.log();
    } catch (err) {
      console.error(`\n  ✗ ${err.message}\n`);
      process.exit(1);
    }
  });

program.parse();
