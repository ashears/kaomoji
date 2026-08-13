const corruptionMarks = ["̷", "̸", "̶", "̵", "͜", "͡", "̿", "͇", "̀", "́"];

export function filterFaces(items, query, category) {
  const normalizedQuery = query.trim().toLowerCase();

  return items.filter((item) => {
    if (category !== "All" && item.category !== category) return false;
    if (!normalizedQuery) return true;

    return [item.face, item.label, item.category, ...item.tags]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery);
  });
}

export function corruptText(value, level) {
  const intensity = Math.min(Math.max(Number(level), 0), 4);
  if (intensity === 0) return value;

  return Array.from(value)
    .map((character, index) => {
      if (character === " ") return character;

      const markCount = (index + intensity) % (intensity + 1);
      const marks = Array.from({ length: markCount }, (_, markIndex) => {
        return corruptionMarks[(index + markIndex + intensity) % corruptionMarks.length];
      }).join("");

      return `${character}${marks}`;
    })
    .join("");
}

export function createGag(template, face, corruptionLevel) {
  const output = template.template.replaceAll("{face}", face.face);
  return template.supportsCorruption ? corruptText(output, corruptionLevel) : output;
}
