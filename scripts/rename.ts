import { $ } from 'bun';
import * as fs from 'fs/promises';
import path from 'path';
import { parseArgs } from 'util';

type Replacements = Record<`{${string}}`, string>;

const replaceFilePlaceholders = async (file: string, replacements: Replacements) => {
  if (file === __filename) {
    return;
  }

  let content = await fs.readFile(file, 'utf-8');
  if (!Object.keys(replacements).some(placeholder => content.includes(placeholder))) {
    return;
  }
  for (const [placeholder, replacement] of Object.entries(replacements)) {
    content = content.replaceAll(placeholder, replacement);
  }
  return fs.writeFile(file, content, 'utf-8');
};

const ignoredDirs = ['.git', 'node_modules'];

const replaceDirPlaceholders = async (dir: string, replacements: Replacements) => {
  if (ignoredDirs.includes(path.basename(dir))) {
    return;
  }
  const files = await fs.readdir(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = await fs.stat(fullPath);

    if (stat.isDirectory()) {
      await replaceDirPlaceholders(fullPath, replacements);
    } else if (stat.isFile()) {
      await replaceFilePlaceholders(fullPath, replacements);
    }
  }
};

const main = async () => {
  const args = parseArgs({
    options: {
      workspace: { type: 'string', short: 'w' },
      app: { type: 'string', short: 'a' },
    },
  });

  const { workspace, app } = args.values;
  if (!workspace || !app) {
    console.error('Usage: rename.ts -w <workspace> -a <app>');
    process.exit(1);
  }
  const replacements = {
    '{workspace}': workspace,
    '{app}': app,
  };

  const root = path.resolve(__dirname, '..');

  console.log(`replacing placeholders...`, replacements);
  await replaceDirPlaceholders(root, replacements);

  $.cwd(root);
  const src = 'apps/{app}';
  const dest = `apps/${app}`;
  console.log(`renaming ${src} to ${dest}...`);
  await $`cp -r ${src} ${dest} && rm -R ${src}`;

  console.log(`done!`);
};

main();
