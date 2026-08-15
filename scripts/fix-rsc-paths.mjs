import { copyFile, mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";

const outDir = path.resolve("out");

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

function flattenedPath(filePath) {
  const relative = path.relative(outDir, filePath);
  const parts = relative.split(path.sep);
  const nextIndex = parts.findIndex((part) => part.startsWith("__next"));

  if (nextIndex < 0 || nextIndex === parts.length - 1) {
    return null;
  }

  const prefix = parts.slice(0, nextIndex);
  const flattened = parts.slice(nextIndex).join(".");
  return path.join(outDir, ...prefix, flattened);
}

const files = await walk(outDir);
let copied = 0;

for (const file of files) {
  const target = flattenedPath(file);
  if (!target) continue;

  await mkdir(path.dirname(target), { recursive: true });
  await copyFile(file, target);
  copied += 1;
}

const extra = path.join(outDir, ".nojekyll");
try {
  await stat(extra);
} catch {
  await mkdir(outDir, { recursive: true });
}

console.log(`RSC paths flattened: ${copied} files`);
