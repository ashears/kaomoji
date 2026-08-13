import assert from "node:assert/strict";
import test from "node:test";
import { pathToFileURL } from "node:url";

const utils = await import(
  pathToFileURL(new URL("../src/utils.js", import.meta.url).pathname)
);
const data = await import(
  pathToFileURL(new URL("../src/data.js", import.meta.url).pathname)
);

test("filters faces by category and free-text tags", () => {
  const cute = utils.filterFaces(data.faces, "", "Cute");
  assert.ok(cute.length > 0);
  assert.ok(cute.every((face) => face.category === "Cute"));

  const sparkle = utils.filterFaces(data.faces, "sparkle", "All");
  assert.deepEqual(
    sparkle.map((face) => face.id),
    ["sparkle-toss"],
  );
});

test("creates uncorrupted and corrupted gags", () => {
  const face = data.faces.find((item) => item.id === "shrug");
  const template = data.gagTemplates.find((item) => item.id === "status");
  assert.ok(face);
  assert.ok(template);

  const plain = utils.createGag(template, face, 0);
  const corrupted = utils.createGag(template, face, 3);

  assert.equal(plain, "current mood: ¯\\_(ツ)_/¯");
  assert.notEqual(corrupted, plain);
  assert.ok(corrupted.startsWith("c"));
  assert.match(corrupted, /[\u0300-\u036f]/u);
});
