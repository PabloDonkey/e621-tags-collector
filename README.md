# 🐾 e621 Tag Collector (Vue + TypeScript + Vite)

<img src="public/icon_1024.png" alt="e621 Tag Collector Icon" width="128" height="128" />

A Chrome extension that adds a Vue-powered sidebar to e621.net, allowing you to easily grab, select, and copy tags from posts.

## Features

- 🐾 **Sidebar UI**: Injects a sidebar on e621.net for tag collection
- 🔍 **Tag Extraction**: Automatically lists all tags from the current post
- ✅ **Tag Selection**: Click to select/deselect tags, select all, or clear selection
- 📋 **Copy to Clipboard**: Copy selected tags with a single click
- ♻️ **Refresh**: Reload tags from the page
- ⚡ **Fast & Modern**: Built with Vue 3, TypeScript, and Vite

## Installation

1. **Build the extension**
   ```bash
   npm install
   npm run build
   ```
2. **Load in Chrome**
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist/` folder

## Usage

- Visit any post page on [e621.net](https://e621.net/)
- The sidebar will appear on the right
- Click tags to select/deselect
- Use the "Copy Selected" button to copy tags to your clipboard
- Use "Select All", "Deselect", or "Refresh" as needed

## Development

- **Source code** is in `src/`
- Main Vue component: `src/components/TagSidebar.vue`
- Content script entry: `src/main.ts`
- Styles: `src/style.css` and component-scoped styles
- Build output: `dist/`

### Scripts

- `npm run dev` — Start Vite dev server (for popup UI testing)
- `npm run build` — Build the extension for production

### Notes
- The extension uses [Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/)
- Make sure to update the manifest to reference the correct bundled files in `dist/`
- For tag extraction, the extension looks for the `#tag-list` section on e621 post pages

## License

MIT
