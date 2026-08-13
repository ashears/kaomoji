import { categories, faces, gagTemplates } from "./data.js";
import { createGag, filterFaces } from "./utils.js";

const favoriteStorageKey = "textfaces:favorites";
const recentStorageKey = "textfaces:recent";

const state = {
  query: "",
  category: "All",
  favorites: readList(favoriteStorageKey),
  recent: readList(recentStorageKey),
  templateId: gagTemplates[0].id,
  faceId: faces[0].id,
  level: 1,
  seed: 7,
};

const $ = (selector) => document.querySelector(selector);
const nodes = {
  categories: $("#categories"),
  copyStatus: $("#copy-status"),
  corruption: $("#corruption"),
  empty: $("#empty-state"),
  faces: $("#faces"),
  favorites: $("#favorites"),
  gagFace: $("#gag-face"),
  gagOutput: $("#gag-output"),
  levelLabel: $("#level-label"),
  recent: $("#recent"),
  resultCount: $("#result-count"),
  search: $("#search"),
  template: $("#template"),
};

boot();

function boot() {
  renderCategories();
  renderGagControls();
  bindEvents();
  render();
}

function bindEvents() {
  nodes.search.addEventListener("input", (event) => {
    state.query = event.target.value;
    renderFaces();
  });

  nodes.template.addEventListener("change", (event) => {
    state.templateId = event.target.value;
    renderGag();
  });

  nodes.gagFace.addEventListener("change", (event) => {
    state.faceId = event.target.value;
    renderGag();
  });

  nodes.corruption.addEventListener("input", (event) => {
    state.level = Number(event.target.value);
    renderGag();
  });

  $("#random-gag").addEventListener("click", () => {
    state.seed += 11;
    state.faceId = faces[state.seed % faces.length].id;
    nodes.gagFace.value = state.faceId;
    renderGag();
  });

  $("#copy-gag").addEventListener("click", () => {
    copyValue(nodes.gagOutput.value || nodes.gagOutput.textContent, "Gag");
  });
}

function render() {
  renderFaces();
  renderShelves();
  renderGag();
}

function renderCategories() {
  nodes.categories.replaceChildren(
    ...["All", ...categories].map((category) => {
      const button = el("button", category);
      button.type = "button";
      button.setAttribute("aria-pressed", String(state.category === category));
      button.addEventListener("click", () => {
        state.category = category;
        renderCategories();
        renderFaces();
      });
      return button;
    }),
  );
}

function renderFaces() {
  const filtered = filterFaces(faces, state.query, state.category);
  nodes.resultCount.textContent = `${filtered.length} faces`;
  nodes.empty.hidden = filtered.length > 0;
  nodes.faces.replaceChildren(...filtered.map(renderFaceCard));
}

function renderFaceCard(face) {
  const card = el("article");
  card.className = "face-card";

  const copyButton = el("button", face.face);
  copyButton.className = "face-copy";
  copyButton.type = "button";
  copyButton.title = `Copy ${face.label}`;
  copyButton.addEventListener("click", () => copyFace(face));

  const meta = el("div");
  meta.className = "face-meta";
  meta.append(
    el("div", [
      el("div", face.label, "face-title"),
      el("div", face.category, "face-category"),
    ]),
    favoriteButton(face),
  );

  card.append(copyButton, meta);
  return card;
}

function favoriteButton(face) {
  const active = state.favorites.includes(face.id);
  const button = el("button", active ? "★" : "☆");
  button.className = "favorite";
  button.type = "button";
  button.title = active ? "Remove favorite" : "Favorite";
  button.setAttribute("aria-label", `${active ? "Remove" : "Add"} ${face.label} ${active ? "from" : "to"} favorites`);
  button.setAttribute("aria-pressed", String(active));
  button.addEventListener("click", () => {
    state.favorites = active
      ? state.favorites.filter((id) => id !== face.id)
      : [face.id, ...state.favorites];
    saveList(favoriteStorageKey, state.favorites);
    render();
  });
  return button;
}

function renderGagControls() {
  nodes.template.replaceChildren(
    ...gagTemplates.map((template) => option(template.id, template.label)),
  );
  nodes.gagFace.replaceChildren(...faces.map((face) => option(face.id, face.label)));
}

function renderGag() {
  const template = gagTemplates.find((item) => item.id === state.templateId) || gagTemplates[0];
  const face = faces.find((item) => item.id === state.faceId) || faces[0];
  const output = createGag(template, face, state.level);

  nodes.levelLabel.textContent = `Corruption level: ${state.level}`;
  nodes.gagOutput.textContent = output;
  nodes.gagOutput.value = output;
}

function renderShelves() {
  renderShelf(nodes.favorites, state.favorites);
  renderShelf(nodes.recent, state.recent);
}

function renderShelf(node, ids) {
  const shelfFaces = ids.map((id) => faces.find((face) => face.id === id)).filter(Boolean);
  node.replaceChildren(
    ...(shelfFaces.length
      ? shelfFaces.map((face) => {
          const button = el("button", face.face);
          button.type = "button";
          button.title = face.label;
          button.addEventListener("click", () => copyFace(face));
          return button;
        })
      : [el("p", "Nothing here yet.")]),
  );
}

async function copyFace(face) {
  const copied = await copyValue(face.face, face.label);
  if (!copied) return;

  state.recent = [face.id, ...state.recent.filter((id) => id !== face.id)].slice(0, 6);
  saveList(recentStorageKey, state.recent);
  renderShelves();
}

async function copyValue(value, label) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
    } else {
      fallbackCopy(value);
    }
    nodes.copyStatus.innerHTML = "";
    nodes.copyStatus.append("Copied ", label, ": ", el("strong", value));
    return true;
  } catch {
    nodes.copyStatus.textContent = "Copy failed. Select and copy manually.";
    return false;
  }
}

function fallbackCopy(value) {
  const input = el("textarea");
  input.value = value;
  input.readOnly = true;
  input.style.cssText = "position:fixed;left:-9999px";
  document.body.append(input);
  input.select();
  const copied = document.execCommand("copy");
  input.remove();
  if (!copied) throw new Error("Copy failed");
}

function readList(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function saveList(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function option(value, label) {
  const item = el("option", label);
  item.value = value;
  return item;
}

function el(tag, content, className) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (Array.isArray(content)) node.append(...content);
  else if (content) node.textContent = content;
  return node;
}
