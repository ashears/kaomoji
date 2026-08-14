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

test("categorizes faces by the available filters", () => {
  assert.deepEqual(data.faceTypes, [
    "All",
    "Cute",
    "Animals",
    "Wat",
    "Happy",
    "OMG",
  ]);
  assert.equal(data.faces.length, data.textfaces.length);

  const filterTypes = new Set(data.faceTypes.slice(1));
  assert.ok(data.textfaces.every(({ face }) => data.faces.includes(face)));
  assert.ok(data.textfaces.every(({ type }) => filterTypes.has(type)));
});

test("includes animal faces", () => {
  const animals = data.textfaces.filter(({ type }) => type === "Animals");

  assert.ok(animals.length >= 10);
  assert.ok(data.faces.includes("ฅ^•ﻌ•^ฅ"));
  assert.ok(data.faces.includes("くコ:彡"));
});
