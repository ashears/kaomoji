import { faceTypes, textfaces } from "./data.js";

const nodes = {
  copyStatus: document.querySelector("#copy-status"),
  faces: document.querySelector("#faces"),
  filters: document.querySelector("#face-filters"),
};

let activeType = "All";

renderFilters();
renderFaces();

function renderFilters() {
  nodes.filters.replaceChildren(...faceTypes.map(renderFilterButton));
}

function renderFaces() {
  const visibleFaces =
    activeType === "All"
      ? textfaces
      : textfaces.filter(({ type }) => type === activeType);

  nodes.faces.replaceChildren(...visibleFaces.map(renderFaceButton));
}

function renderFilterButton(type) {
  const button = document.createElement("button");
  button.className = "filter-button";
  button.type = "button";
  button.textContent = type;
  button.setAttribute("aria-pressed", String(type === activeType));
  button.addEventListener("click", () => {
    activeType = type;
    renderFilters();
    renderFaces();
  });
  return button;
}

function renderFaceButton({ face }) {
  const button = document.createElement("button");
  button.className = "face-button";
  if (face.length > 26) {
    button.classList.add("is-extra-long");
  } else if (face.length > 16) {
    button.classList.add("is-long");
  }
  button.type = "button";
  button.title = "Copy to clipboard";
  button.textContent = face;
  button.addEventListener("click", () => copyFace(face));
  return button;
}

async function copyFace(face) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(face);
    } else {
      fallbackCopy(face);
    }

    nodes.copyStatus.innerHTML = "";
    nodes.copyStatus.append("Copied: ", strong(face));
  } catch {
    nodes.copyStatus.textContent = "Copy failed. Select and copy manually.";
  }
}

function fallbackCopy(value) {
  const input = document.createElement("textarea");
  input.value = value;
  input.readOnly = true;
  input.style.cssText = "position:fixed;left:-9999px";
  document.body.append(input);
  input.select();
  const copied = document.execCommand("copy");
  input.remove();
  if (!copied) throw new Error("Copy failed");
}

function strong(value) {
  const node = document.createElement("strong");
  node.textContent = value;
  return node;
}
