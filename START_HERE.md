# Start here — Ahmed Ali Ahmed | Security Fieldnotes

Final portfolio handoff · 18 October 2026

This folder contains the complete editable source of the published portfolio. It is a static HTML/CSS/JavaScript site. The files in `dist/` are the source you edit and the files you serve: there is no separate compilation step, framework setup, npm installation, or API key needed to run this version.

## Bring it onto your PC

1. Extract the ZIP into a fresh folder, for example `Documents\Portfolio\ahmed-security-fieldnotes`. Windows may add an outer ZIP-name folder; choose the inner folder containing this file, `AGENTS.md`, `design.md`, and `dist/`.
2. Open that root folder as your local project in Codex or in the editor containing the Codex extension. If you use Codex CLI, open a terminal in this folder and run `codex`.
3. Read `design.md` before any future design changes. Keep your earlier local project separately until you have reviewed this final copy. Do not merge old files into this export indiscriminately.

A useful first instruction for your next local session:

> Read START_HERE.md, AGENTS.md, and design.md. This is the finalized Security Fieldnotes portfolio. Treat it as the baseline, keep its existing buildless architecture, and follow the documented design and evidence boundaries for future edits.

## Preview locally

From this root folder, use a local static server. If Python 3 is already installed on Windows:

```powershell
py -m http.server 8000 --bind 127.0.0.1 --directory dist
```

On macOS or Linux with Python 3 installed:

```bash
python3 -m http.server 8000 --bind 127.0.0.1 --directory dist
```

Then open http://127.0.0.1:8000 in your browser. Stop the server with Ctrl+C. If Python is not installed, any local static server can serve `dist/`; no project dependencies need installing. Fonts, images, CV, scripts, and styles are included locally. Internet access is needed only for external links.

## What is included

| Path | Purpose |
| --- | --- |
| `dist/index.html` | Page content and document structure. |
| `dist/*.css` | Shared design tokens, responsive layouts, and component styling. |
| `dist/*.js` | Hero, project workspace, system walkthroughs, controls, and evidence viewer. |
| `dist/assets/` | CV and all 20 original project evidence images. |
| `design.md` | Design decisions, typography, colors, layout, and motion contract. |
| `AGENTS.md` | Project instructions for future coding sessions. |
| `README.md` | Architecture, accessibility, and content boundaries. |
| `evidence-sources.json` | Provenance for the additional thesis figures. |
| `.openai/hosting.json` | Existing Sites project identity and static directory; contains no login credential. |
| `.gitignore` | Ignore rules for future local version control. |

Git history, authentication tokens, MCP configuration, temporary renders, and development caches are not included. A 21st connection is not required to display or edit the included animations.

## Hosting and synchronization

Published site: https://ahmed-security-fieldnotes.mohd31.chatgpt.site

This export is a snapshot. It has not been copied into an existing folder on your computer, and it has no automatic Git or deployment connection. Editing this folder changes the local copy; it does not update the hosted portfolio. A later publish or deliberately configured repository workflow is a separate action.

For another static host, use the contents of `dist/` as the publish directory and leave its relative paths intact. `dist/` contains public-facing assets; the project documentation belongs outside the publish directory.

## Baseline and validation

Source commit: `d85777930d5f8dce7259865d2bd7d3956d347c67`

Published version: `appgprj_6ac11927707881919f386f388548fe04~appgver_00f1a08913a08191be4a600d449c3941`

The source files in this ZIP match that commit byte for byte. This guide is the only added file. The deployed version passed source/contrast checks, project and evidence navigation checks, native canvas checks at desktop and narrow dimensions, loop/reset checks, and touch/reduced-motion interaction checks. All 20 figures were preserved. Full-browser visual and device-performance QA was unavailable during that pass.

Before treating a local preview as your final device check, review the three projects, their source-image dialogs, and both desktop and mobile layouts in your own browser.

Official Codex folder guidance: https://learn.chatgpt.com/docs/projects
