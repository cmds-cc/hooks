import { checkbox } from "@inquirer/prompts";

const BANNER = `
  ██╗  ██╗ ██████╗  ██████╗ ██╗  ██╗███████╗
  ██║  ██║██╔═══██╗██╔═══██╗██║ ██╔╝██╔════╝
  ███████║██║   ██║██║   ██║█████╔╝ ███████╗
  ██╔══██║██║   ██║██║   ██║██╔═██╗ ╚════██║
  ██║  ██║╚██████╔╝╚██████╔╝██║  ██╗███████║
  ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝`;

export async function selectHooks(manifest) {
  console.log(BANNER);
  console.log();
  console.log(`  📦 ${manifest.name} v${manifest.version}`);
  console.log(`  ${manifest.description}`);
  console.log();

  const choices = manifest.hooks.map((hook) => ({
    name: `${hook.name} (${hook.event} → ${hook.matcher})`,
    value: hook,
    checked: hook.default !== false,
    description: hook.description,
  }));

  const selected = await checkbox({
    message: "Select hooks to install",
    choices,
    instructions: false,
  });

  if (selected.length === 0) {
    console.log("  No hooks selected. Nothing to install.");
    process.exit(0);
  }

  return selected;
}
