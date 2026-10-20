# Ahmed Ali Ahmed — Security Fieldnotes

Buildless cybersecurity / IT portfolio. Serve `dist/` as a static website. Sites identity is in `.openai/hosting.json`. Read `design.md` before changing presentation.

## Current structure

Introduction → Selected work → Experience → Contact. The selected-work workspace shows one of three projects at a time. Wazuh uses its existing Anatomy machinery; the SME assessment offers network-zone and directory-permission models. ML keeps its separate CV-backed classification workflow and unchanged source limitations. Without JavaScript, all summaries and figures remain readable.

All 20 original thesis figures are embedded. The selected project's inline evidence browser shows one at a time with a labeled select and previous/next controls. Every image opens in the same-page fit/original-size viewer; case studies retain the complete relevant evidence. Original bytes and captions are preserved. `evidence-sources.json` records provenance for the 18 additional figures; two featured figures remain unchanged.

## Implementation

- `design-system.css` / `theme.js`: light canvas and scoped dark scene palette, shared type and control tokens; CSS loads before scoped styles.
- `index.html` / `styles.css`: focused content, shared page edges, responsive layout, case-study reader.
- `navigation.js`: floating header with an accessible mobile disclosure; contact is the matching page footer.
- `workspace.js`: manual project tabs, keyboard navigation, original-figure selection, deep links.
- `anatomy.js` / `anatomy.css`: source-linked models, original hardware silhouettes, component selection, rotation, directional activity, and permanently separated geometry and repeating causal records/relationships.
- `system-sequences.js`: source-backed input/tool/transformation/output contracts, active paths and independent per-model clocks.
- `network.js`: retained signal/layer/evidence hero with flat colors and spring-smoothed motion.
- `project-diagrams.js` / `project-diagrams.css`: abstract ML workflow with three alternative candidates, depth rotation and a complete CV-backed transcript.
- `evidence.js` / `evidence.css`: original-figure viewer and compact inline composition.
- `app.js`: case studies and retained illustrative examples, clearly separated from measured project results.
- `playback.js`, `motion.js`, `motion.css`: elapsed-time loops, preference handling, and short reader transitions.
- `neon-cursor.js` / `neon-cursor.css`: precise cyan pointer and restrained single-color feedback with native fallbacks.

## Motion and accessibility

The 18-second hero keeps its existing motion and uses contrasting materials on the light canvas. Wazuh (48s), one DMZ service check (31s), directory relationships (44s), and ML (30s per alternative) run independently of scroll. Components remain separated; only the active record or relationship repeats. Inspection and rotation do not pause the model. A source-linked explanation sits beneath the model, and the full process is available as a static transcript. Desktop uses a wide composition; narrow scenes arrange hosts in depth rows and prioritize relevant labels. No Motion or Play/Pause buttons. System reduced motion supplies stable views, while hidden/offscreen scenes preserve their clocks without rendering. All reading content is immediately available. Project and source-figure navigation are manual and never auto-advance.

Project tabs support Left/Right/Up/Down/Home/End. Mobile Menu supports Escape and same-page target focus. Component buttons and rotation controls have keyboard equivalents. Touch rotation preserves vertical scrolling and pinch gestures. Images retain their aspect ratio and can be inspected at original size. Native dialogs support Escape/focus restoration. The pointer yields to text selection, forms, dialogs, keyboard navigation, touch, high contrast, reduced motion, and 3D dragging.

## Content boundaries

Preserve cybersecurity/IT scope, source evidence, and claim limits. The models are illustrative logical systems, not hardware inventory, live telemetry, or attack replays. Preserve the ML claims because its source file is unavailable; its abstract process must not invent measurements or inference results. Detailed n8n workflows remain deferred. Complete thesis archives, unreviewed sensitive screenshots, and credentials are not public assets.

The existing native canvas architecture is retained; no production component, framework or dependency was added. Local QA-only canvas/DOM dependencies live under `.sites-runtime/process-review/`. Full-browser visual review was unavailable; source, interaction, contrast, and native canvas checks do not establish exact browser page height or device frame rates.

## Local review — not published

Read [.sites-runtime/light-review/review.md](.sites-runtime/light-review/review.md) for the current design change, verification and changed files. The isolated Three.js prototype is at `.sites-runtime/light-review/wazuh-prototype/index.html`, outside production. Serve the workspace root on a separate localhost port to open that experiment with its relative dependencies.

Read [process-evidence.md](process-evidence.md) for each stage and its source limits. Open [dist/index.html](dist/index.html), or run `python -m http.server 8000 --bind 127.0.0.1 --directory dist` and visit http://127.0.0.1:8000/. Native desktop/mobile previews are in `.sites-runtime/light-review/index.html`. These are actual renderer frames, not browser screenshots. Full-browser and real-device review remains outstanding. No hosted site, deployment identity, published checkout or remote repository was changed.

## Publishing the complete static site (only after review)

Deploy the entire contents of `dist/` together, including the local fonts and their OFL licenses in `assets/fonts/`. The GitHub Pages repository `AD-31/personal-portfolio` serves these files at its root; do not add an extra `dist/` folder there. Uploading only `index.html` leaves old typography and responsive rules in place.

Local stylesheet URLs include content hashes. Keep these URLs and their matching CSS files together. The existing Sites identity and private audience remain in `.openai/hosting.json`; that configuration is not needed in the public GitHub Pages directory.
