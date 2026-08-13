import { pathToFileURL } from "node:url";
import assert from "node:assert/strict";
import test from "node:test";

const data = await import(
  pathToFileURL(new URL("../src/data.js", import.meta.url).pathname)
);

test("stores only copyable face strings", () => {
  assert.ok(data.faces.length > 0);
  assert.ok(data.faces.every((face) => typeof face === "string"));
  assert.ok(data.faces.includes("¯\\_(ツ)_/¯"));
});
