# AGENTS.md

## Project Goals

This site is a simple, accessible, and responsive static website that:

- Looks great on both mobile and desktop
- Keeps **style (CSS)** separate from **content (HTML/Markdown)**
- Uses modern tools that eliminate browser-specific quirks
- Prioritizes accessibility, SEO, and performance

## 🛠️ Tech Stack

We follow a lightweight, standards-friendly tech stack:

| Layer         | Tool / Standard                                                     | Notes                                                                |
| ------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Markup        | HTML5, Markdown                                                     | Clean, semantic HTML only                                            |
| Styling       | [Tailwind CSS](https://tailwindcss.com/)                            | Handles all modern browser quirks and mobile-first responsive design |
| Hosting       | GitHub Pages                                                        | Static hosting only                                                  |
| Linting       | [Prettier](https://prettier.io/) + [HTMLHint](https://htmlhint.io/) | Auto-formatting and linting                                          |
| Accessibility | WCAG 2.1 AA minimum                                                 | Via semantic HTML and lint rules                                     |

## 📁 Project Structure

```plaintext
.
├── src/
│   └── tailwind.css      # Tailwind CSS entrypoint
├── public/               # Static files (no processing needed)
│   ├── index.html        # Site markup
│   ├── images/           # Images, icons, etc.
│   └── fonts/            # Web fonts
├── dist/                 # Built files (deployable site)
│   ├── css/              # Compiled CSS from Tailwind
│   ├── js/               # Compiled JavaScript (future)
│   ├── images/           # Copied from public/images/
│   ├── fonts/            # Copied from public/fonts/
│   └── index.html        # Copied from public/
├── tailwind.config.cjs   # Tailwind configuration
├── postcss.config.cjs    # PostCSS configuration
├── package.json          # Build scripts and dependencies
└── AGENTS.md             # Developer instructions
```

## 🚀 Build Process

This project follows **Approach 1** where `dist/` is the integration point:

- **Source files** (`src/`, `public/`) contain unprocessed files
- **Build process** compiles and copies everything to `dist/`
- **Deployment** uses the complete `dist/` folder

### Build Commands:
- `npm run build:css` - Compile Tailwind CSS only
- `npm run copy-public` - Copy static files from public/ to dist/
- `npm run build` - Full build (CSS + copy public files to dist)
- `npm run dev` - Watch mode for development

### Build Process:
1. **CSS Compilation**: Tailwind processes `src/tailwind.css` → `dist/css/style.css`
2. **File Copying**: All files from `public/` are copied to `dist/` maintaining directory structure
3. **Result**: `dist/` contains the complete, deployable site
