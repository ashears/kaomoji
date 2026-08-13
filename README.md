# Textfaces

A tiny static Unicode text-face board for GitHub Pages. Click any face to copy
it, search by mood or tag, save favorites, and generate small text gags for
chat.

## Features

- Copy-to-clipboard text-face grid
- Search across labels, categories, tags, and face text
- Category filters for common reaction types
- Favorites and recent copies saved in browser storage
- Gag Lab with templates, random face selection, and corruption intensity
- Responsive layout for desktop and mobile

## Local Preview

Run any static file server from the repo root, then open the local URL.

```bash
python3 -m http.server 8000
```

## Tests

```bash
npm test
```

## GitHub Pages

Serve the repository from the `main` branch root in GitHub Pages settings.

## Editing Content

Text faces, categories, tags, and gag templates live in `src/data.js`. Filtering
and gag corruption helpers live in `src/utils.js`.
