// main.ts — "The joke the reviewer laughs at" (make.fun)
// Writes one one-line joke about working beside an AI coding agent
// to /output/entry.txt. Node 22, stdlib only, no network.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "The AI wrote the code, reviewed the code, and merged the code — I just pay the API bill.";

function buildEntry(): string {
  // Exactly one line: the joke, plus a trailing newline.
  // Guard the gate: 1-280 Unicode code points, not only whitespace.
  const chars = [...JOKE].length;
  if (chars < 1 || chars > 280 || JOKE.trim().length === 0) {
    throw new Error(`joke must be 1-280 chars, got ${chars}`);
  }
  if (JOKE.includes("\n")) {
    throw new Error("joke must be a single line");
  }
  return JOKE + "\n";
}

function main(): void {
  const outDir = "/output";
  mkdirSync(outDir, { recursive: true });
  const text = buildEntry();
  writeFileSync(join(outDir, "entry.txt"), text, "utf8");
  process.stdout.write(`wrote /output/entry.txt (${text.length} chars)\n`);
}

main();
