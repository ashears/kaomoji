import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("serves a static GitHub Pages entry point", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

  assert.match(html, /<title>Textfaces<\/title>/);
  assert.match(html, /<link rel="stylesheet" href="styles\.css\?v=[0-9a-f]+">/);
  assert.match(html, /<script type="module" src="src\/app\.js\?v=[0-9a-f]+"><\/script>/);
  assert.match(html, /Click to copy to clipboard/);
  assert.doesNotMatch(html, /Gag Lab|Favorites|Recently copied|search/i);
  assert.doesNotMatch(html, /next|vinext|wrangler|cloudflare/i);
});
