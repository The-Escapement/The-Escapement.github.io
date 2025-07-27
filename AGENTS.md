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
├── index.html            # Site markup
├── src/
│   └── tailwind.css      # Tailwind CSS entrypoint
├── dest/
│   └── style.css         # Generated stylesheet
├── tailwind.config.cjs   # Tailwind configuration
├── postcss.config.cjs    # PostCSS configuration
├── package.json          # Build scripts and dependencies
└── AGENTS.md             # Developer instructions
```
