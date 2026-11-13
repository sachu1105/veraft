// Copies the SVG flags for the countries in lib/countries.ts from
// country-flag-icons into public/flags, so they're served as small static
// images (lazy-loaded) instead of being bundled into JavaScript.
// Run after changing the country list or upgrading the package: npm run flags
import { copyFileSync, mkdirSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const src = join("node_modules", "country-flag-icons", "3x2");
const out = join("public", "flags");
const isos = [...readFileSync("lib/countries.ts", "utf8").matchAll(/^\s+\["([A-Z]{2})",/gm)].map((m) => m[1]);
const available = new Set(readdirSync(src));

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
const missing = [];
for (const iso of isos) {
  if (available.has(`${iso}.svg`)) copyFileSync(join(src, `${iso}.svg`), join(out, `${iso}.svg`));
  else missing.push(iso);
}
console.log(`Copied ${isos.length - missing.length} flags to ${out}.`, missing.length ? `Missing: ${missing.join(", ")}` : "");
