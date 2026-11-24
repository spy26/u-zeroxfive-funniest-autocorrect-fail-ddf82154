// makefun anchor 240727763f1d8def14747bb55031182d48d2907c round 34248320
// I Got the Mob — one-line autocorrect-fail entry for make.fun.
// Writes the entry to $MAKEFUN_OUTPUT_DIR/entry.txt (fallback /output/entry.txt).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "I got the mob! Starting Monday, 9 to 5, great benefits.";

function main(): void {
  // Gate: single line, 1-199 characters, no surrounding whitespace,
  // no control characters, no trailing newline in the output.
  if (ENTRY.length < 1 || ENTRY.length > 199) {
    throw new Error(`entry length ${ENTRY.length} outside 1-199`);
  }
  if (ENTRY !== ENTRY.trim()) {
    throw new Error("entry must not have surrounding whitespace");
  }
  if (/[\r\n]/.test(ENTRY)) {
    throw new Error("entry must be a single line");
  }
  if (/[\u0000-\u001F\u007F]/.test(ENTRY)) {
    throw new Error("entry must not contain control characters");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY, "utf8");
  console.log(`wrote ${ENTRY.length} chars to ${outPath}`);
}

main();
