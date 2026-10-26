# CLAUDE.md — China Field Guide

Read **README.md** first: it is the complete handoff (what exists, design, data model, photos, maps, publishing, roadmap).

Working rules for this project:
- The owner is not a developer: plain language, no jargon, don't make them use the terminal. Run interactive steps (like GitHub sign-in) in the background and hand them the code/link.
- Content: history-first, facts and stories, food tips yes, **hotels never**.
- Keep the established design (green banner, Anton/Archivo/IBM Plex Mono, small images). Own brand only — never copy Lonely Planet's name/logo.
- Plain HTML/CSS/JS, no build step. Content lives in `data/*.js` (not JSON).
- Preview with `serve.ps1` (localhost:8080) and verify in the browser (desktop + phone width, images, console) before reporting success.
- **Never publish without the owner saying so.** Publish = `git add -A; git commit; git push` → GitHub Pages rebuilds.
- Git/gh live at `C:\Program Files\Git\cmd` and `C:\Program Files\GitHub CLI` (Windows PowerShell 5.1).
- Photos: Wikimedia Commons with credits; batch API requests. Map coordinates: verify against Wikipedia.
