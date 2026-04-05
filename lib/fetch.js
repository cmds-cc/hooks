export async function fetchHooks(repo) {
  const parts = repo.split("/");
  if (parts.length < 2) {
    throw new Error(
      `Invalid repo format: "${repo}". Expected owner/repo or owner/repo/path`,
    );
  }

  const owner = parts[0];
  const name = parts[1];
  const subpath = parts.length > 2 ? parts.slice(2).join("/") + "/" : "";

  const url = `https://raw.githubusercontent.com/${owner}/${name}/HEAD/${subpath}claude-hooks.json`;
  const res = await fetch(url, {
    headers: { "User-Agent": "cc-hooks-install" },
  });

  if (res.status === 404) {
    throw new Error(`No claude-hooks.json found in ${repo}`);
  }
  if (!res.ok) {
    throw new Error(`GitHub error (${res.status}): ${res.statusText}`);
  }

  const data = await res.json();

  if (!data.name || !Array.isArray(data.hooks) || data.hooks.length === 0) {
    throw new Error(
      `Invalid claude-hooks.json in ${repo}: missing name or hooks array`,
    );
  }

  for (const hook of data.hooks) {
    if (!hook.name || !hook.event || !hook.matcher || !hook.hook) {
      throw new Error(
        `Invalid hook entry "${hook.name || "unnamed"}": missing required fields (name, event, matcher, hook)`,
      );
    }
  }

  return data;
}
