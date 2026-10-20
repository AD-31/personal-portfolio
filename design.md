# Security Fieldnotes — Design Reference

Portfolio: Ahmed Ali Ahmed  
Updated: 20 October 2026

This file is the source of truth for layout, typography, color, motion, and content decisions. Apply new user decisions here and in code together. The current White Canvas + Floating Navy direction evolves the focused four-section structure. The audit below preserves the reasons for earlier simplification. It does not change the projects' evidence or claim boundaries.

## Product, audience, and job

A cybersecurity / IT portfolio for recruiters, SOC leads, and technical interviewers. Its job is to make Ahmed's contribution, supporting evidence, and experience easy to assess without requiring a long scroll. Keep robotics and other engineering content outside this portfolio.

**Aesthetic: White Canvas + Floating Navy + Immersive Technical 3D.**

The interface is calm and light; technical complexity belongs inside the projects. The 20 October user decision supersedes the earlier all-navy page palette, while retaining solid colors, typography, focused navigation and source-grounded motion.

**Signature move:** source-linked System Anatomy models remain permanently separated while one record or relationship moves through their internal roles and repeats. The visitor can inspect components throughout. The hero is a smaller introduction to signals and evidence. Reading text, navigation, screenshots, experience, and contact remain still.

## A. Audit of the previous version

These are findings from the source and effective style rules, not a full-browser visual audit.

| Severity | Evidence before this pass | Why it was a problem | Implemented action |
| --- | --- | --- | --- |
| Critical | Three `.project` articles, three `[data-project-diagram]` canvases, followed by the separate `#system-anatomy` explorer. | Detection and network architecture were presented twice. Readers had to pass every project to reach experience. | One project workspace. Wazuh and assessment share the existing Anatomy explorer; only ML retains its distinct workflow diagram. |
| High | Eight canvases: hero, three projects, Anatomy, Approach, Experience, Contact. | Animation competed with animation, including where it added no evidence. | Three canvases remain in the document, with hero plus one project scene visible. Deleted the three supporting scenes and their `field.js` renderer. |
| High | `.evidence-collection[open]` in both thesis galleries; full-width featured figures and additional screenshots preceded the next project. | The archive determined the page length before the reader chose what to inspect. | Show one original figure at a time with a labeled select and previous/next controls. All 20 figures remain embedded and available at original size. |
| High | `body` and `.contact-section` radial gradients; `.site-header` and dialog backdrops used blur; `network.js` used broad radial glow. | The surrounding visual atmosphere carried more emphasis than its meaning justified. | Solid navy/slate section surfaces; no CSS gradients, backdrop blur, or canvas bloom. Flat translucent model faces remain for depth. |
| Medium | `#080d16` page background with `#8feef1` and `#c7adff`; the cursor used a violet/blue/cyan gradient trail. | The near-black neon treatment was a generic cyber shortcut. The earlier user-approved direction explains it, but the new solid-color request supersedes it. | Lighter navy and slate, restrained ice-blue interaction color, steel and amber diagram groups. Short single-color pointer feedback. |
| Medium | Chapter eyebrows `01 /` through `05 /`, project prefixes, evidence collection numbers, and part-button `01`–`06` prefixes. | These implied an order where visitors were simply choosing content. | Removed decorative numbering. Evidence `1 / 10` remains because it communicates the actual position in a collection. |
| Medium | Section gaps up to 96px, project padding up to 80px, plus repeated 48px internal gaps. | Compounded whitespace amplified the duplicated content. | Major section spacing 40–64px, ordinary groups 16–32px, compact model and evidence layouts. |
| Medium | Repeated role tags under each experience paragraph; standalone Approach principles repeated caveats already made in the projects. | Repetition diluted the useful evidence. | Deleted tags and the standalone Approach section. Retained the substantive experience paragraphs and project-specific limits. |
| Medium | Eight loaded stylesheets and large blocks for a removed Decision Lab and superseded card layouts. | Conflicting style layers made deliberate changes difficult to maintain. | Replaced the layered overrides with shared tokens followed by scoped component styles; removed `components.css`. |

DM Sans and IBM Plex Mono were not problems. Neither Inter nor Roboto was used as the brand voice. Arial was only a fallback; it is no longer explicitly named. The previous text contrast passed checks, so there is no fabricated contrast failure to justify this redesign. Open composition is a user requirement, not an excuse to add ornamental hairline rules.

## B. What stays

1. Recognizable Anatomy machinery, documented device relationships, and source-linked inspection.
2. Twenty original thesis figures, original image pixels, captions, source references, and the same-page fit/original-size viewer.
3. DM Sans for narrative and display, IBM Plex Mono for technical labels and dates.
4. Honest distinction between lab observations, configuration, illustrative models, and measured outcomes.
5. Independent automatic loops, system reduced-motion support, keyboard controls, and native vertical touch scrolling.

## C. Direction and design system

### Palette roles

| Role | Color | Use |
| --- | --- | --- |
| Page | `#F7F9FA` | Hero, project index, experience and reading canvas. |
| White | `#FFFFFF` | Reading surfaces. |
| Brand / primary ink | `#142B3C` | Floating header/footer, headings, body and primary actions on light. |
| 3D environment | `#102637` | Anatomy and abstract ML scene only. |
| Elevated dark | `#1C384A` | Dark-scene controls and functional surfaces. |
| Cyan | `#A6D9E2` | Dark-surface links, interaction and material accents. |
| Accessible light accent | `#2B6678` | Links, focus and interactive outlines on light. |
| Secondary text | `#526978` | Light-page metadata and captions. |
| Subtle border | `#D8E3E9` | Functional grouping; never essential text. |
| Dark-surface ink | `#F2F7FA` | Headings on navy; body `#D9E3E9`, secondary `#B5C6D0`. |
| Control border | `#7091A3` | Visible functional boundaries. |

`dist/design-system.css` owns every RGB, semantic, spacing and type token. `.dark-surface` resolves the shared semantic aliases in its own scope. Root tokens are light. `theme.js` exposes the dark scene palette through the existing `FieldnotesTheme` API and its light palette through `FieldnotesTheme.light`; the hero and pointer choose the appropriate palette. Diagram series remain steel/mint/amber/blue, with stronger dark equivalents on the light hero. Original screenshot pixels are untouched.

Use solid surfaces. No gradients, glass blur, bloom or neon outlines. Flat alpha faces, directional face shading and restrained layered contact shadows are allowed **inside models** to explain depth. They do not imply physically measured hardware or operational telemetry. Background shadows are not decorative framing. Color never establishes a security outcome.

### Typography

**Pairing:** DM Sans for display and body; IBM Plex Mono for technical annotation. Keeping the established reading family avoids replacing a working choice merely to appear different. Do not introduce Inter, Roboto, Arial, or system-ui as the brand typeface. Generic fallbacks remain for resilience.

| Role | Size at 16px root | Line height | Use |
| --- | --- | --- | --- |
| H1 | 26–48px | 1.12 | Hero only, sized to its text column; two sentences at the same level with an 8px gap. |
| H2 | 32–40px | 1.15 | Work, Experience, Contact. |
| Project H3 | 26–32px | 1.15 | Selected project; matching case-study H2. |
| Local title | 20px | 1.35 | Anatomy H3, selected component H4, experience roles, dialog groups. |
| Evidence title | 18px | 1.35 | An individual figure. |
| Intro | 16px | 1.65 | Short hero introduction, with the name on its own line. |
| Body | 16px | 1.65 | Narrative and experience. |
| UI / compact explanation | 14px | 1.5–1.65 | Controls, model inspector, evidence captions. |
| Metadata | 12px | 1.6 | Dates, source references, technical annotations. |

Headings and control labels use weight 500; body uses 400. Display tracking is −0.035em, section/project tracking −0.025em, local title tracking −0.01em. Use normal capitalization. Body copy is not monospace. Semantic heading levels express document structure; a local H3 may intentionally be smaller than a project H3.

### Hero copy and emphasis — 18 October 2026

- User feedback: the hero looked jumbled and too text-heavy. Use a smaller headline, shorter copy, and distinct reading groups.
- Eyebrow: “Detection · Automation · Offensive Security”.
- One H1: “Understand the attack.” followed by “Engineer the detection.” on a new line with an 8px gap. Both sentences use the shared 26–48px display scale and 1.12 line height. Each is an explicit block within the same H1. The second sentence uses DM Sans italic at the same heading size and weight; keep the italic treatment scoped to this heading.
- Introduction: “I'm Ahmed Ali Ahmed.” on its own line, then “I build detections, assess exposure, and automate security workflows.” Leave 8px between the name and summary and 32px between the heading and introduction.
- Primary action: “Explore My Work”, linking to `#work`. Secondary action: “Download CV”, downloading the existing PDF. Retain “Based in Bahrain” beneath the actions.
- Let the eyebrow and headline use the available column width, with natural wrapping on narrow screens. Use ordinary wrapping for the H1 instead of balancing each sentence into short lines; never force single-line text or clip overflow. Preserve the existing hero scene and motion.

### Consistency across browsers and screen sizes — 18 October 2026

- Keep the same hierarchy and proportions across phones, landscape screens, tablets, and desktops. The existing two-column hero stacks at 900px; neither orientation nor viewport height forces a fixed-height layout.
- Size the headline from the actual `.hero-copy` width using `8.5cqi`, bounded by `1.625rem` and `3rem`. Shared tokens provide viewport-based fallbacks where container units are unavailable. Text still wraps under zoom or enlarged accessibility text; never use `nowrap`, fixed text heights, or clipping to simulate consistency.
- Serve DM Sans normal 400/500, DM Sans italic 500, and IBM Plex Mono 400 from local WOFF2 assets with their OFL licenses. Use the same font files on each host, without depending on a third-party font request. Preload the two narrative font faces used above the fold and retain generic fallbacks.
- Set text-size-adjust to 100% to avoid mobile orientation text inflation while retaining native pinch and browser zoom. Header identity, navigation, and project tabs can wrap within their available width. The header stays in normal flow when the viewport is at most 500px high so it does not cover short landscape screens.
- Publish HTML, all CSS/JS, fonts, and images together from `dist/`. Version local stylesheet references from their content hashes. A new HTML file with old CSS is an incomplete deployment even if the query string has changed. The GitHub Pages repository serves the contents of `dist/` at its root.

### Layout, shared components and dimensions

- Four logical sections remain: Introduction, Selected work, Experience, Contact. Contact is the semantic page footer after `main`, containing the original actions and attribution. No new routes or framework.
- Maximum shell 1280px including 20–48px gutters. Header/footer outer edges align with the shell's content edges. A 20px floating radius and 12–20px outer gap come from shared tokens.
- Header: solid brand navy, minimum 76px desktop / 68px narrow, sticky beneath the outer gap. The measured height plus outer gap determines anchor clearance. At viewport height ≤500px it becomes static. There is no animated shrink or blur.
- At ≤700px a Menu disclosure replaces the desktop link row. Expanded navigation has two columns of comfortable controls. Escape closes and returns focus; same-page actions reveal/focus their target. All links remain visible without JavaScript. No hamburger-only mystery control.
- Footer: one floating navy container at the end, with contact heading/actions, email, attribution and Back to top. It is never viewport-fixed. At ≤650px contact content stacks.
- Hero: equal desktop columns, 440px animation directly on the light canvas, 48px top / 64px bottom spacing. At ≤900px introduction/actions come first and the scene follows at 340px; ≤650px scene is 300px. Headline and existing copy remain unchanged.
- Project index: three unboxed editorial tabs. Each has a small code-native schematic, problem, tools, defensible result/limit and Inspect project action. Previews are navigation illustrations, never evidence screenshots. At ≤700px these become compact vertical rows; arrow keys work on either axis. Only one complete project workspace is shown.
- Project summaries use 5:6 columns and stack at ≤650px. Existing case-study dialogs and `#detection`, `#assessment`, `#classification` anchors serve focused/shareable reading without additional routes. Case text uses the common 60ch reading width.
- Anatomy: a dark, bounded interactive environment, 16–32px shared internal padding, 520px scene and 320px inspector with 32px gap. At ≤1000px inspector stacks and scene becomes 440px; ≤550px scene is 420px. A scene narrower than 560px recomposes machines into depth rows. Stage descriptions remain below the scene, with inspection and source evidence stable beside/beneath it.
- ML: the same dark environment and padding, with an abstract 480px decision pipeline; ≤650px it is 460px. It remains an alternative-model workflow, never hardware machinery.
- Evidence: all select controls use shared control height/radius tokens. Wazuh initially shows the informative Figure 59 event record; the assessment opens on its original topology. Selection stays manual. One original figure at a time, 3:2 image/caption grid, image max-height 260px without cropping. At ≤650px it stacks with 220px image maximum. Fit/original-size enlargement, complete gallery and provenance remain intact.
- Experience: factual rows and education/certification column. No cards, tags, timeline decoration or animation.
- Shared spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 96px; major sections use 40–64px and ordinary groups 16–32px. Controls ≥44px, action buttons ≥46px, control radius 6px. Reader dialogs use the 20px radius family.
- Never force fixed-height text, viewport-height stories, clipped copy, scroll snapping or wheel/touch traps. Minimum narration heights reserve flow space but can grow under zoom.

### What not to do

Do not rebuild three vertical project stories, duplicate the same architecture in two visualizations, add generic cards, decorative sequence numbers, corner captions, skill pills, bouncing hovers, hover-scale screenshots, animated text entrances, progress bars, parallax, or pinned sections. Do not add more animation to compensate for weak content. Do not claim a measured scroll-height reduction without browser measurements.

## D. Rewrite priorities — implemented

1. **Must-fix:** consolidate project selection; remove redundant scenes and the Approach section; replace expanded screenshot stacks with manual inline browsing; preserve all evidence and claim limits.
2. **High-impact:** solid surfaces, less neon, consistent narrower type scale, shared page edges, compact meaningful spacing, one signature Anatomy interaction.
3. **Craft:** named component labels instead of number codes, shorter single-color cursor trail, keyboard tab navigation, same-page deep links, no duplicate featured screenshot in a case-study gallery, smaller and simpler CSS.

## E. Concrete implementation

| File | Change |
| --- | --- |
| `dist/index.html` | Four primary sections; three project choices; shared Anatomy; 20 inline figures; compact experience/contact. |
| `dist/workspace.js` | Manual project tabs with arrow/Home/End keys, one figure at a time, evidence select/previous/next, and deep-link handling. |
| `dist/design-system.css` | Light canvas and scoped dark palette and shared role-based tokens; global accessibility/control rules. Loads before scoped styles. |
| `dist/styles.css` | One page layout; 1280px shell; compact hierarchy; case-study reader. |
| `dist/system-sequences.js` | Source-grounded stage contracts: input, tool, transformation, output and source; independent timings and one causal marker path. |
| `dist/anatomy.css`, `anatomy.js` | Permanently separated machines with processing trays/interface boards, cached static geometry, contextual inspection, responsive depth rows, legible labels and a project-selection API. |
| `dist/evidence.css`, `app.js` | Inline evidence composition; case-study gallery clones restore all figures and omit duplicate featured figures. |
| `dist/network.js` | Existing layers, routes, and convergence retained; flat planes and signal dots replace gradients; particles reduced to 500 desktop / 240 narrow. |
| `dist/neon-cursor.js`, `neon-cursor.css` | Accurate pointer, 48px/110ms single-color trail, small click response, no diffuse halo. |
| Removed `dist/components.css`, `dist/field.js` | Deleted old Decision Lab styles and unnecessary supporting scenes. |

Canonical examples:

```css
--rgb-bg: 247 249 250;
--scene-rgb-bg: 16 38 55;
--page-max: 80rem;
--section-space: clamp(2.5rem,5vw,4rem);
```

```js
panels.forEach(panel => panel.hidden = panel.dataset.projectPanel !== key);
galleries.forEach(gallery => gallery.hidden = gallery.dataset.evidenceGallery !== key);
```

These are content choices, not scroll-linked animation. A hidden project is still available through an explicit tab. Without JavaScript, all project summaries and original figures remain readable.

## Interaction and motion contract

- Hero repeats an 18-second signal → layers → evidence sequence, retaining spring-smoothed pointer response. No scroll scrubbing.
- Anatomy keeps its components permanently separated. Wazuh takes 48 seconds, a network service check 31 seconds, and directory traversal 44 seconds. Only the active record/key/probe repeats. Component inspection and camera gestures never pause or reset time. Each model preserves its own clock when switching manually.
- ML uses a 30-second abstract workflow, selecting one alternative per pass (90 seconds across Random Forest, SVM and XGBoost). Candidates remain alternatives, never a claimed ensemble. No sample prediction or model-specific metric is fabricated.
- Project scenes have no entry traffic or decorative connection pulses. Offscreen scenes and hidden tabs suspend rendering and preserve their clocks. Re-entry never seeks or resets the base clock. The hero keeps its loop and interaction; its contrast palette adapts to the light page.
- No Motion, Play, or Pause controls. System reduced motion supplies useful static views and immediate selection controls.
- Project tabs and evidence images are **manual navigation**. Do not auto-cycle the selected project or source figure while someone reads it.
- Work tabs support click/tap, Left/Right or Up/Down, Home/End, and a single tab stop. Project hash links reveal the corresponding content before normal anchor navigation.
- Anatomy drag rotates; vertical touch scrolling and pinch gestures remain native. Named component and rotation buttons provide keyboard equivalents.
- All 20 figures open the existing native dialog with Fit image / Original size, Escape, focus restoration, and nested case-study compatibility.
- Custom pointer never intercepts input, and yields to native pointing for form inputs, text selection, dialogs, keyboard use, touch, reduced motion, high contrast, and model dragging.
- Keep the custom pointer visible at its physical viewport position during wheel/trackpad scrolling. Recheck the content underneath once per animation frame so hover feedback stays accurate. Scrolling does not manufacture movement trails or click ripples. Native targets may temporarily restore the normal cursor; scrolling away restores the custom pointer. Keyboard use, leaving the window, and accessibility preferences retain their native fallbacks.

## Permanently exploded processes — 19 October 2026

This explicit user decision supersedes the previous collapse/reassembly story. Components remain separated for the entire loop. The camera may rotate genuine world-coordinate geometry with perspective projection and depth-sorted faces; a concept image or flat rotation of a raster is not a substitute. Hardware silhouettes express logical roles, not exact inventory. ML uses abstract separated planes rather than physical machinery.

| View | Beginning → transformation → meaningful result | Evidence and boundaries |
| --- | --- | --- |
| Wazuh | Linux/Tetragon event record → collection → manager → configured JSON decoding → rule 732011 → structured alert → indexing → selected dashboard document → analyst review. Nine stages, 48 seconds. | Figures 32 and 59 distinguish configured child `tetragon-json` from observed `decoder.name=tetragon-base`. Figure 56 supports collection; Figure 43/p.73 documents indexer storage. Preserve actual rule ID, level 13 and T1053.003/Cron mapping. Internal writes and simplified row are illustrative. No MISP IOC match or confirmed incident is claimed. |
| Network zones | Kali 172.16.10.100 → pfSense → DMZ 172.16.40.10 → reverse response → open-service review. Six stages, 31 seconds per port. | Figure 23 reports 80/http/nginx, 443/ssl-http/nginx and 5432/postgresql/PostgreSQL DB 9.6.0 or later, all open. Each pass isolates one port from the original combined scan. Figure 1 supplies separated LAN10, DMZ40 and server30 subnets. Server-farm directory/backup checks remain separate evidence and never join this marker path. No invented block, capture or compromise. |
| Directory privileges | ROOT → MemberOf → Enterprise Admins, Administrators or Domain Admins → independently observed domain rights → relationship review. Eight stages, 44 seconds. | Figure 39 records eight memberships; three are inspected. Figure 40 separately shows Enterprise Admins/GenericAll and the two AllExtendedRights edges. Begin each branch at ROOT, never join the groups into an exploit chain. Key motion represents relationships, not packets or takeover. |
| ML classification | Abstract traffic sample → preprocessing → feature engineering → one alternative candidate → evaluation → review. Six five-second stages. | CV project, May–June 2024, only. Random Forest/SVM/XGBoost are alternative candidates. No invented feature values, true/predicted class, per-model scores, confusion matrix, ensemble, winning model or live dashboard. |

`system-sequences.js` records each Anatomy stage's input, handling tool, transformation, output, supporting source and active path. The complete audit is in [process-evidence.md](process-evidence.md). The ML transcript records the same fields and its CV-only evidence boundary. No rule conditions or transport behavior may be inferred from an image beyond what it actually documents.

The same amber spine identifies the Wazuh record as its symbol changes from raw message to fields, match, alert, indexed document and selected row. The network probe and return response have distinct directional chevrons and colors; direction never depends on color alone. A key follows one directory relationship at a time. Only one ML candidate branch is active per pass. Neutral connections may show the system structure, but no particles run across inactive paths. At the end, reset only the moving token and repeat; never collapse the geometry.

Short stage descriptions, record fields and source references sit below the scene in normal flow. Inputs/tool/output are available in the “Stage inputs and outputs” disclosure; the full source-backed transcript remains available independently of the clock. Live narration uses `aria-live="off"`. Manual component inspection uses a separate stable explanation and evidence screenshot. The process must never select a project, open a viewer or advance the reader's chosen screenshot. Every directory group offers separate membership and permission evidence actions.

### Responsive composition and accessibility

- Keep desktop Anatomy at 520px; use 440px below 1000px and 420px below 550px. A scene narrower than 560px rearranges machines into depth rows, separates the runtime host from the manager, and gives network zones additional depth space. It does not merely scale the desktop positions down.
- ML uses 480px on desktop and 460px below 650px. Below 560px scene width, it changes to a staggered preparation path with three vertically separated, individually labeled alternative branches. Candidate labels stay visible.
- Use shared 14px model labels and source/field text that wraps. Place labels outside model bounds and other labels; all Anatomy components remain available through named buttons when mobile prioritizes active participants. Network component controls include each full /24 subnet. No corner captions or generic content cards.
- Readout minimum heights reserve ordinary flow space; no text is clipped or fixed-height. At narrow widths, the inspector stacks and the transcript becomes a single column. Zoom and enlarged text may reflow naturally.
- Canvas is keyboard focusable. Arrow keys rotate, Home restores the initial camera, and visible rotation buttons provide a second keyboard path. These actions never pause/restart the record. Selection controls remain ordinary buttons with visible focus.
- Touch rotation accepts deliberate horizontal drags only. Vertical swipes yield without pointer capture; a second touch cancels a captured rotation. Keep `touch-action: pan-y pinch-zoom`, passive pointer movement and native browser zoom. No wheel interception or scroll-progress motion.
- Reduced motion shows a useful, permanently separated static anatomy and complete transcript. Selection and camera rotation still work immediately. No continuous animation frame loop runs. If canvas initialization fails, leave the static HTML explanations visible. With JavaScript disabled, all summaries, original figures and fallback process transcripts remain readable.
- Suspend rendering when offscreen or the document is hidden, preserving elapsed clocks. Resume without accounting for hidden wall time. Limit active rendering to about 30 fps, cap pixel ratio at 1.6, and cache unchanged Anatomy geometry/labels; animate only the moving overlay between camera/selection/stage changes. Invalidate geometry after fonts settle. No production presentation dependency or framework is added. The isolated WebGL experiment is outside `dist`.

## Sources and boundaries

| Work | Preserved facts | Limits |
| --- | --- | --- |
| Wazuh | Agents, logs, Tetragon, XML rules/decoders, MISP, indexing, dashboard/RBAC; 14 functional and 8 acceptance checks. | Lab validation is not production detection accuracy. Tuning screenshots are qualitative, with different timestamps. |
| SME assessment | pfSense; LAN `172.16.10.0/24`, DMZ `172.16.40.0/24`, server farm `172.16.30.0/24`; 13 assessment checks; source-backed hosts and service exposure. | A passing assessment check may demonstrate a weakness. Reachability and scanner output do not alone prove compromise. |
| Directory permissions | ROOT group memberships; Enterprise Admins/GenericAll; Administrators and Domain Admins/AllExtendedRights. | Analyzed relationships, not an exploit replay. |
| ML | Existing CV-backed description and comparison of Random Forest, SVM, XGBoost. | Source file remains unavailable. Do not invent datasets, splits, confusion matrices, or per-model scores. |

Original image bytes, annotations, masking, captions, and `evidence-sources.json` provenance remain authoritative. Complete thesis archives, unreviewed screenshots, and credentials are not public assets. Device shapes illustrate logical roles; they are not exact physical inventory or live telemetry. Detailed internship n8n workflows remain deferred until supplied. Existing experience descriptions are preserved.

The earlier 21st references remain the basis for adapted motion patterns: 3D CSS Box by danielpetho (demo 29560) informed the earlier separation behavior and drag settling; In view by ibelick (demo 1661) informed entry cues. Branch Tree Build and Radial Workflow Cycle informed repeat patterns. The current pass uses the existing native canvas implementation, with no new 21st download or React/Framer dependency. Keep credentials out of the repository and browser assets.

## Verification and limits

The completed native regression suite passes 23 grouped checks, with 33 additional cursor regression checks. Verification covers parsed HTML/CSS, palette contrast, preserved source assets/captions, project/evidence navigation, model selection, continued loops, touch cancellation, hidden/offscreen behavior, and native canvas rendering at desktop/narrow dimensions. Full-browser layout QA and physical-device testing are unavailable in this environment (no connected browser surface). Native canvas checks validate scene rendering and behavior, not browser font loading, complete page height, or device frame rates. There is no claim of pixel-perfect alignment or a measured percentage reduction in scrolling.

## Renderer evolution and decision history — 20 October 2026

**Decision:** retain the working perspective Canvas renderer in production and improve its model construction. Closed chassis faces are culled and shaded from a fixed directional light; software processing planes remain two-sided. Vents, connectors, board detail and restrained unblurred contact shadows give roles more depth. These are illustrative computing modules, not a hardware inventory or literal Wazuh/MISP appliances. The shared construction improvements apply to relevant network/identity host geometry; the ML workflow stays abstract.

**Experiment:** the local prototype uses the same palette/type/control tokens and distinguishes raw, parsed, matched, alerted, indexed and dashboard-row forms. `.sites-runtime/light-review/wazuh-prototype/` contains an isolated, real Three.js/WebGL Wazuh prototype with physically based materials, lights, shadow support, permanently separated computing roles, the same source-grounded phase clock, inspection, touch/keyboard controls and static transcript. It is excluded from production `dist`. Read `renderer-review.md` there for comparison, measurements and limitations. A new renderer may be adopted only after real-browser visual, accessibility and device performance comparison demonstrates a benefit.

**Preserved:** original hero behavior and headline, all four process contracts, selected project/evidence stability, original 20 figures/captions, CV and contact links, clocks and reduced-motion transcripts. No ensemble, IOC match, compromise or incident confirmation was added.

**Verification:** see `.sites-runtime/light-review/qa/verification.json` and `.sites-runtime/light-review/review.md`. Native Canvas previews and simulated event tests cover six CSS-derived viewport sizes (360, 390, 768, 1024, 1440, 1920). These are not whole-page browser screenshots. No browser surface was available; actual browser cascade/font loading, sticky-header layout, physical pinch and WebGL GPU quality remain unverified. The design is implemented locally and is not published during this review.

### Verification checklist for every future design change

- Read this specification, record the user decision and update the relevant rules with the code.
- Check shared tokens on both light and dark surfaces; text contrast targets WCAG AA.
- Check all three projects, four sequences, manual evidence choices and all original source assets.
- Verify automatic loop completion/reset, independent clocks, rotation without interruption, hidden/offscreen suspension and reduced-motion/no-canvas transcripts.
- Verify keyboard focus/selection, menu Escape and anchor clearance, touch scroll/pinch, dialogs and CV/contact destinations.
- Review 360, 390, 768, 1024, 1440 and 1920px, enlarged text and short landscape viewports. Distinguish source-derived checks from actual browser/device tests.
- Measure dependency/render cost where possible; never call a CPU harness result a device FPS result.
- Check relative GitHub Pages asset paths and version changed local CSS/JS together.
- Save reviewable previews, changed-file list, evidence/illustration limits and unresolved verification limits before publishing.
