import { readFile, writeFile, mkdir } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";

const SETTINGS_PATH = join(homedir(), ".claude", "settings.json");

export async function mergeHooks(selected, manifest, repo, options) {
  let settings;
  try {
    const raw = await readFile(SETTINGS_PATH, "utf8");
    settings = JSON.parse(raw);
  } catch (err) {
    if (err.code === "ENOENT") {
      await mkdir(join(homedir(), ".claude"), { recursive: true });
      settings = {};
    } else {
      throw new Error(`Failed to read ${SETTINGS_PATH}: ${err.message}`);
    }
  }

  if (!settings.hooks) {
    settings.hooks = {};
  }

  let added = 0;
  let skipped = 0;

  for (const hook of selected) {
    const event = hook.event;
    if (!settings.hooks[event]) {
      settings.hooks[event] = [];
    }

    let matcherGroup = settings.hooks[event].find(
      (g) => g.matcher === hook.matcher,
    );
    if (!matcherGroup) {
      matcherGroup = { matcher: hook.matcher, hooks: [] };
      settings.hooks[event].push(matcherGroup);
    }

    const cmd = hook.hook.command;
    const isDuplicate = matcherGroup.hooks.some((h) => h.command === cmd);
    if (isDuplicate) {
      skipped++;
      continue;
    }

    matcherGroup.hooks.push(hook.hook);
    added++;
  }

  await writeFile(SETTINGS_PATH, JSON.stringify(settings, null, 2) + "\n");

  // Fire-and-forget registration — never blocks the user
  const noTelemetry =
    options?.noTelemetry || process.env.CC_HOOKS_NO_TELEMETRY === "1";
  if (repo && added > 0 && !noTelemetry) {
    fetch("https://hooks.automate.builders/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ repo }),
    }).catch(() => {});
  }

  return { added, skipped, path: SETTINGS_PATH };
}
