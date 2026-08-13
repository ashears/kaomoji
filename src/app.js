import { faces } from "./data.js";

const nodes = {
  copyStatus: document.querySelector("#copy-status"),
  faces: document.querySelector("#faces"),
};

renderFaces();

function renderFaces() {
  nodes.faces.replaceChildren(...faces.map(renderFaceButton));
}

function renderFaceButton(face) {
  const button = document.createElement("button");
  button.className = "face-button";
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
