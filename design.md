Security Fieldnotes — Design Reference
Portfolio: Ahmed Ali Ahmed  

Updated: 22 October 2026  

Design direction: White Canvas + Floating Navy + Immersive Technical 3D  

Architecture: Homepage → Visual Work Selection → Dedicated Project Experiences  

Status: Approved design specification. Homepage and My Work approved; Wazuh Detection Engineering visually approved and finalized by the user on 22 October 2026 (Concept 2). Independent device, interaction, and deployed-site verification are tracked separately.
1. Purpose of This Document
This document is the single source of truth for the portfolio's design, content structure, navigation, interactions, animations, technical visualizations, accessibility, and development decisions.

Every future design change must remain consistent with this document.

When a new decision is approved:
1. Review the existing design rules.
2. Identify which earlier decisions it replaces.
3. Update this document before or alongside the implementation.
4. Apply the changes consistently across all affected pages.
5. Verify the changes on desktop and mobile.
6. Document what was implemented, tested, and remains unverified.
Do not silently overwrite established design decisions or introduce new visual patterns without documenting the change.

This document distinguishes between approved requirements, existing implementations, and future work. An approved requirement is not evidence that the corresponding code has been implemented or tested.
2. Product Vision
2.1 Portfolio Objective
Create a professional cybersecurity portfolio that allows recruiters, SOC leads, cybersecurity engineers, and technical interviewers to understand:
- Who Ahmed Ali Ahmed is.
- His technical interests and areas of expertise.
- The security problems he has worked on.
- How his security systems and workflows operate.
- Which tools, methods, and technologies he used.
- His specific contribution to each project.
- The evidence supporting the presented work.
- The limitations of the projects and demonstrations.
The portfolio must communicate practical cybersecurity ability through technical storytelling, working visualizations, and genuine implementation evidence.

It should not resemble a generic résumé website or a collection of decorative technology cards.

Primary goal: Make the projects the central experience.

Secondary goal: Make professional background, qualifications, contact details, and CV easily accessible without interrupting project exploration.

Keep the portfolio focused on cybersecurity, information technology, security operations, detection engineering, offensive security, and automation. Robotics and unrelated engineering projects are outside its scope.
2.2 Core Design Philosophy
Aesthetic: White Canvas + Floating Navy + Immersive Technical 3D.

The interface remains clean, light, and restrained.

Technical complexity belongs inside the project visualizations, not the surrounding website.

The portfolio should feel like a carefully designed technical exhibition where visitors can choose a system, explore how it works, inspect real evidence, and understand the decisions behind it.

Maintain these principles:
- Clear information hierarchy.
- Minimal visual clutter.
- Strong typography.
- Generous but controlled whitespace.
- Meaningful 3D interaction.
- Evidence-based technical explanations.
- Consistent navigation.
- Responsive composition.
- Accessible interaction.
- No unnecessary scrolling or animations.
The website should feel sophisticated because its content and interactions are well designed, not because every element moves.
3. New Information Architecture — 21 October 2026
3.1 Approved Architecture
The previous four-section scrolling homepage is superseded.

The website will now use three primary levels:

Level 1 — Homepage

A focused landing experience introducing Ahmed and providing an immediate entry into his work.

Level 2 — My Work

A dedicated visual project-selection screen presenting all three cybersecurity projects.

Level 3 — Individual Project Pages

A focused technical experience for each selected project, containing its existing models, workflows, animations, explanations, and evidence.

The intended visitor journey is:

Homepage → Explore My Work → Select Project → Explore System → Inspect Evidence → Next Project or Back to Work.

Do not require visitors to scroll through unrelated projects before reaching the one they want.
3.2 Route Structure
Use a maintainable static multipage architecture.

Proposed source structure:

dist/

├── index.html

├── work/

│   ├── index.html

│   ├── wazuh.html

│   ├── assessment.html

│   └── ddos.html

├── assets/

├── design-system.css

├── styles.css

├── anatomy.css

├── anatomy.js

├── project-diagrams.css

├── project-diagrams.js

├── evidence.css

├── evidence.js

├── network.js

├── system-sequences.js

├── navigation.js

├── theme.js

└── other existing assets

This is the target structure, not confirmation that these pages currently exist.

Do not introduce React, Next.js, or another framework simply to achieve page navigation.

Reuse the existing native HTML, CSS, and JavaScript implementation wherever practical.

Maintain working navigation using ordinary links.

The architecture must support direct links to each project.
3.3 Navigation Principles
Primary navigation:
- Home
- My Work
- Contact
- Download CV
The homepage's primary action is Explore My Work.

It must navigate to the dedicated Work selection page rather than scrolling to a section on the homepage.

Project pages must provide:
- Back to Work
- Home
- Next Project
- Access to Contact and CV
Project navigation must not depend on JavaScript.

Use real URLs rather than simulated navigation that merely hides and reveals unrelated sections.

Keep previous public project links functional where practical, using a lightweight compatibility redirect or mapping for legacy anchors.

Never leave existing shared links pointing to empty or irrelevant sections.
4. Homepage Design
4.1 Homepage Purpose
The homepage should establish personal identity and technical direction immediately.

It must not contain the complete project explorer, long case studies, a large experience timeline, or expanded evidence galleries.

The main focus is the hero.

The existing animated network visualization must remain.
4.2 Hero Content
Eyebrow

Detection · Automation · Offensive Security

Primary headline

Understand the attack.

Engineer the detection.

Introduction

I'm Ahmed Ali Ahmed.

I build detections, assess exposure, and automate security workflows.

Primary action

Explore My Work

Secondary action

Download CV

Location

Based in Bahrain

Preserve the existing wording unless a separate content revision is approved.
4.3 Hero Layout
Desktop:
- Two-column composition.
- Text and actions on one side.
- Network visualization on the other.
- Existing white canvas background.
- No surrounding animation card.
- Strong visual balance between headline and animation.
Mobile:
- Headline and introduction first.
- Primary and secondary actions clearly visible.
- Network visualization below.
- No clipped text or animation overflow.
- Maintain a natural document flow.
Retain the previously established animation dimensions as starting targets:
- Desktop scene: approximately 440px.
- Tablet/narrow scene: approximately 340px.
- Mobile scene: approximately 300px.
These are preferred layout dimensions, not rigid height constraints under zoom or accessibility text enlargement.
4.4 Hero Motion — Final Approved Version (21 October 2026)
The homepage uses the sphere-first forensic scan network, rendered in the existing lightweight Canvas 2D perspective system. This supersedes the old 18-second network sequence, the temporary five-module exploded hardware hero, and the earlier scan-first / caption-driven variants. It does not replace the distinct technical anatomy models inside dedicated project pages.

The authoritative visual sequence is:
1. Complete the existing terminal typing introduction once per page load.
2. Reveal the Canvas figure with the existing approximately 850ms upward/scale entrance, followed by an approximately 1.6-second one-time spherical initialization.
3. Show a centered, gently rotating 3D sphere of square nodes.
4. Slide a restrained translucent cyan glass-like scan plane through the sphere, revealing three flat aligned 5×5 grids: Endpoint, Network, and Identity.
5. Animate an endpoint-origin amber signal and cyan contextual relationship signals toward a central Evidence destination.
6. Gather the nodes smoothly back into a coherent sphere, rotate and hold, then return to step 4 with no abrupt jump. The terminal introduction and initial entrance do not repeat.
Repeating loop: 15.2 seconds — Sphere → scan/grid reveal 3.6s; Endpoint 2.2s; Network context 2.2s; Identity context 2.2s; regroup/rotate/hold 5.0s. The loop returns continuously to its sphere-first phase.

Geometry and composition:
- 75 small square nodes, organized as three groups of 25 (5×5 each).
- Each deployed grid is perfectly planar (Z = 0); rows, columns, and outer frames are aligned instead of having randomized Z offsets.
- The three central markers and moving event tokens are crisp square shapes; avoid circular key-node halos.
- At the spherical stage, nodes are distributed over a 3D Fibonacci sphere and interconnected with nearby sphere neighbors to avoid wavy or cross-sphere grid lines.
- The view has a calm, nearly frontal 3/4 perspective: baseline yaw approximately −0.10 rad, elevation approximately 0.18 rad, with a centered fixed fit that does not pulse or zoom at the loop boundary.
- Amber means the active event, cyan supports scanning and contextual relationships, and the original three group tones remain distinguishable.
- Use only compact in-Canvas labels where they assist recognition: ENDPOINT, NETWORK, IDENTITY, EVIDENCE. Remove changing story captions and accompanying explanatory paragraphs from the hero itself.
- Maintain off-white #F7F9FA, borderless presentation, the floating navy shell, no fake live telemetry, no dark hero card, and no excessive bloom, sparks or particle clutter.
Behavior and accessibility:
- Scene runs automatically and independently of scrolling; subtle pointer-responsive camera movement remains.
- Rendering pauses when offscreen or hidden, and uses a static meaningful network view under reduced motion.
- The static HTML fallback must be hidden once the Canvas renderer has initialized successfully; restore or retain the fallback if rendering is unavailable.
- The hero is a conceptual illustration, not a measured production network topology, captured incident, or literal workflow trace.
- Confirm final appearance across desktop and mobile; a syntax or simulated-Canvas pass alone does not prove live browser correctness.
4.5 Homepage Scrolling
The homepage should be intentionally short.

However, do not force a single fixed-height screen.

Allow natural vertical scrolling when required by screen size, browser zoom, accessibility settings, or mobile orientation.

Never use clipping, scroll traps, or fixed viewport heights to artificially eliminate scrolling.
5. My Work — Visual Project Selection
5.1 Purpose
The My Work page is the primary navigation hub for the portfolio. Its typography, terminal typing, white canvas, and floating navy navigation/footer must be a direct continuation of the finished homepage. Follow the sitewide contract in Section 32 rather than inventing page-local styles.

It should feel like an interactive project gallery rather than a résumé section or a long list of projects.

Visitors should immediately understand that there are three projects available to explore.

Do not place complete project explanations, evidence galleries, or full-sized technical animations on this screen.
5.2 Approved Projects
The initial Work selection contains three projects.
Project	Professional title	Main focus
Wazuh	Detection Engineering	Security monitoring, event processing, rules, and alert investigation
SME	Security Assessment	Network exposure, Active Directory relationships, and assessment evidence
DDoS	Traffic Classification	Traffic preparation, feature engineering, model comparison, and evaluation


Use descriptive professional titles.

Do not prominently label projects as:
- CLP Project
- CV Project
- In-house Project
- University Assignment
- Final Year Project
These labels describe provenance or academic context, not the technical purpose of the work.

Project source attribution must still be available within the relevant technical details or evidence sections.

Do not misrepresent academic or lab work as production deployment.
5.3 Visual Selection Layout
Desktop:

Three visually balanced project selections arranged horizontally when sufficient space is available.

Each selection contains:
- A technical preview illustration.
- Project title.
- One concise explanation of the problem or objective.
- Relevant core technologies.
- An Explore Project action.
Avoid conventional filled cards.

Instead, use an open editorial layout with the illustrations visually integrated into the page.

Use shared alignment, typography, and spacing to establish the relationship between projects.

Functional selection boundaries and keyboard focus indicators are allowed.

Mobile:

Project selections stack vertically.

Each remains visually distinct and easy to tap.

Avoid oversized illustrations that cause unnecessary scrolling.
5.4 Preview Visualizations
The previews should reference the existing project designs.

Examples:

Wazuh Detection Engineering

A simplified visual representation of endpoint telemetry, detection processing, and an analyst-facing alert.

SME Security Assessment

A simplified separated network architecture showing the relationship between the LAN, firewall, DMZ, and server infrastructure.

DDoS Traffic Classification

A simplified traffic-to-features-to-model-evaluation workflow.

Previews are navigation illustrations, not claims of observed evidence.

Reuse visual language and geometry from the established project models when practical.

Do not create three additional heavy continuous 3D renderers on the selection page.

Prefer lightweight static or very restrained interactive previews.
5.5 Project Selection Behavior
When visitors select a project:
1. Navigate to that project's dedicated page.
2. Show the selected project's title and purpose.
3. Present the technical visualization prominently.
4. Make project evidence and detailed explanations available below or beside it.
5. Provide clear navigation back to My Work.
Project selection is always manual.

Do not automatically cycle between the three projects.

Do not open projects in obstructive modal windows.

Do not force visitors to return to the homepage to change projects.
5.6 Hover, Focus, and Touch Behavior
Project selection should feel responsive but controlled.

Allowed:
- Subtle color changes.
- Clear focus indicators.
- Small directional indicators.
- Restrained diagram emphasis.
- Immediate touch feedback.
Avoid:
- Large hover scaling.
- Decorative glow.
- Bouncing elements.
- Heavy parallax.
- Animated card flips.
- Auto-playing unrelated sequences.
Hover is not the only means of understanding or selecting a project.
6. Dedicated Project Page Architecture
6.1 Binding Project Template — Portfolio First
All project pages share the completed homepage and My Work design tokens, terminal typing, floating header/footer, grid, and navigation. Each project has a distinctive technical model but should feel like one cohesive site.

Use this default visible page order:
1. Short terminal introduction — the two-line same-navy title with italic second line, one concise explanation, and relevant technologies.
2. Prominent project-specific technical visualization — meaningful animation, camera/component inspection where supported, no bulky card enclosure.
3. What I Built — preferably three short, concrete contributions.
4. What I Learned — one or two brief, technically grounded takeaways.
5. Original Evidence — a small number of directly accessible, genuine images where available; optional context, not an academic evidence archive by default.
6. Project navigation and shared contact footer.
Avoid visible report-style sections labeled Technical Breakdown, Methodology, long Inputs/Tools/Outputs, numbered source transcripts, academic-origin identifiers, and technical dropdowns unless a future project demonstrably requires them and a separate decision is approved. Do not repeat the 3D process in paragraphs.

Technical integrity still applies: keep claims precise; preserve original source files and provenance; clarify conceptual visuals versus captured evidence without filling the page with disclaimers. A hidden renderer data hook is not itself an accessible technical explanation. Provide concise semantic text outside Canvas describing what was built and its purpose.
6.2 Project Page Scrolling and Navigation
Use natural browser scrolling. Animations run automatically and independently of scroll position. Do not pin the project, force full-screen scenes, or require the user to follow mandatory steps. Back to My Work and Next Project remain clear and consistent. Longer pages may include Back to top.
6.3 Model and Evidence Independence
The homepage sphere network is unique to Home. Dedicated pages retain their own existing project-specific system anatomy, models, renderers, and meaningful loops. Do not replace Wazuh's larger exploded model with the separate miniature hero illustration. Neither the project hero illustration nor a simulated handoff is an original screenshot or production telemetry.
7. Wazuh Detection Engineering — Final Approved Page
Approved and visually finalized by the user: 22 October 2026. The authoritative implementation contract, actual page sections, and responsive rules are recorded in Section 33. Earlier Wazuh page drafts, long transcripts, evidence dropdowns, and the Floating Detection Record were superseded by Concept 2.
7.1 Project identity
- Title: Wazuh Detection Engineering.
- Category: Detection Engineering / Security Operations.
- Core tools: Wazuh, Tetragon, MISP.
- Files: dist/work/wazuh.html, dist/work/wazuh.css.
- Intro: “I built a security monitoring workflow using Wazuh, custom detections, and Linux runtime telemetry to support security investigations.”
7.2 Two separate visualizations
1. Final hero illustration — Concept 2: three miniature CSS 3D modules labeled Collect, Detect, Review, linked by an amber traveling event token. This small right-side animation is a conceptual overview; see Section 33.
2. Main System Anatomy: the existing large, permanently separated Wazuh system model, with its original component inspection and automatic nine-stage event processing. Preserve its geometry and renderer. The 48-second internal sequence remains part of the implementation but long stage narratives, inputs/outputs, CLP labels, and stage transcripts must not be displayed on the public page.
7.3 Main model sequence — retained internally
1. Record Linux runtime activity.
2. Collect the runtime event.
3. Receive the event at the manager.
4. Decode Tetragon JSON.
5. Evaluate rule 732011.
6. Form a structured alert.
7. Make the alert searchable through indexing.
8. Display the selected alert in the dashboard.
9. Present the record for analyst review.
Duration: 48 seconds. Keep the scene separated, reset the moving marker at the end, loop automatically, and do not scroll-link timing. Do not display a verbose transcript or extra reserved readout height.
7.4 Contribution and learning copy
What I Built contains exactly these three short contributions in the approved page:
- Endpoint monitoring — integrated Tetragon and Wazuh to collect Linux runtime events.
- Custom detections — built detection rules and decoders and improved alert relevance.
- Security investigation — connected monitoring with alert review and threat-intelligence context.
What I Learned uses one short paragraph emphasizing log quality, decoding, alert tuning, and investigation context. Do not replace this with an academic-style methodology section.
7.5 Evidence and accuracy boundaries
The finished visible evidence section has three original image links, without dropdowns:
- ../assets/evidence/wazuh-runtime-record.png — recorded runtime alert.
- ../assets/wazuh-rule-evidence.png — custom Wazuh detection rules.
- ../assets/evidence/wazuh-tetragon-decoder.png — Tetragon JSON decoder configuration.
These are original screenshots and open for direct inspection. Their source provenance should remain accurate in the underlying record, without CLP or figure numbers dominating the interface. Other screenshots may remain in the source asset archive but are not required as a visible ten-image gallery on this final page.

Maintain the following factual distinctions:
- Figure 59 supports recorded rule 732011, level 13, and ATT&CK T1053.003/Cron.
- The configured child decoder tetragon-json differs from the observed decoder.name=tetragon-base.
- A conceptual event path is not a captured transport trace.
- MISP integration is not proof of an IOC match for that event.
- A recorded alert is not a confirmed incident.
- The documented 14 functional and 8 acceptance checks are not a measured detection-accuracy score; they are not shown as hero statistics.
7.6 Final-page content rules
No hero Detection Record. No visible workflow dropdowns, CLP tags, nine-stage written process, long stage readout, simulated live telemetry claims, or excessive blank space below the Canvas. Preserve the shared navy floating header/footer, existing terminal introduction, simple What I Built / What I Learned sections and project navigation.
8. SME Security Assessment
8.1 Project Identity
Title: SME Security Assessment

Category: Offensive Security · Network Assessment

Core technologies: pfSense, Active Directory, BloodHound, CALDERA
8.2 Project Focus
Explain how network exposure and directory permissions were examined in an SME-style lab environment.

The project has two important technical views:
- Network Zones
- Directory Privileges
They belong to the same assessment project.
8.3 Network Zones Visualization
Preserve the existing network architecture and permanently separated models.

The original sequence follows:

Kali → pfSense → DMZ Host → Return Response → Assessment Review.

Retain the six-stage process.

Sequence duration: 31 seconds per port.

Preserve these documented network details:
- LAN: 172.16.10.0/24
- DMZ: 172.16.40.0/24
- Server farm: 172.16.30.0/24
- Kali: 172.16.10.100
- Target host: 172.16.40.10
The source records ports 80, 443, and 5432 as open.

Each animated pass isolates one port while preserving the original combined scan as the evidence source.

Use directionally distinct visual treatment for outgoing probes and return responses.

Do not imply that the sequence is a recorded packet capture.
8.4 Directory Privileges Visualization
Preserve the existing group-membership and domain-permission model.

The visualization covers:
- ROOT account.
- Enterprise Admins.
- Administrators.
- Domain Admins.
- Documented domain-right relationships.
Sequence duration: 44 seconds.

Preserve the distinction between:
- MemberOf relationships.
- GenericAll permissions.
- AllExtendedRights permissions.
Every relationship branch begins independently at ROOT.

Do not join the groups into an invented lateral-movement or exploitation chain.

The visualized key represents a logical relationship, not a packet or credential.
8.5 Evidence Boundaries
Preserve the 13 documented assessment checks and original supporting figures.

Maintain these distinctions:
- An open port demonstrates exposure, not compromise.
- A scanner finding may require additional validation.
- Directory rights indicate relationships, not evidence of their exploitation.
- A passing assessment check may document a weakness.
- Demonstrated discovery activity is not proof of a complete attack chain.
- The project remains explicitly identified as a lab-based assessment.
9. DDoS Traffic Classification
9.1 Project Identity
Title: DDoS Traffic Classification

Category: Machine Learning · Network Security

Core model families:
- Random Forest
- Support Vector Machine
- XGBoost
9.2 Project Focus
Show the reported progression from network traffic through preprocessing, feature engineering, alternative model evaluation, and review.

The visualization must remain an abstract machine-learning workflow.

Do not turn the ML pipeline into fictional physical cybersecurity appliances.
9.3 Existing Workflow
Preserve the six-stage sequence:
1. Traffic sample.
2. Preprocessing.
3. Feature engineering.
4. Alternative model candidate.
5. Evaluation.
6. Review and reset.
Each stage lasts approximately five seconds.

A pass takes 30 seconds.

The complete set of three alternative candidate passes takes approximately 90 seconds.

Random Forest, SVM, and XGBoost remain alternative models.

Do not imply they formed a combined ensemble.
9.4 Existing Visualization
Preserve the existing:
- 3D workflow geometry.
- Model colors.
- Perspective.
- Rotational interaction.
- Stage labels.
- Automatic repeating sequence.
- Touch and keyboard interaction.
Do not redesign the visualization simply because the page structure changes.
9.5 Evidence Boundaries
The underlying ML implementation file is unavailable.

The current project description is supported by the existing CV material.

Preserve this limitation.

Do not invent:
- Dataset names or rows.
- Training/test split.
- Feature names or values.
- Model-specific predictions.
- Confusion matrices.
- Per-model accuracy scores.
- A winning model.
- A deployed production detector.
Any reported overall accuracy must retain its documented qualification and must not be silently attributed to individual models.

The visualization is illustrative, not a recreation of verified inference outputs.
10. Visual Design System
10.1 Color Palette
Maintain the established White Canvas + Floating Navy direction.
Role	Color	Usage
Page background	#F7F9FA	All primary pages
White	#FFFFFF	Reading surfaces
Primary navy	#142B3C	Header, footer, headings, actions
Existing dark scene color	#102637	Internal visual material and dark UI roles where necessary
Elevated navy	#1C384A	Functional dark controls and selected scene elements
Cyan	#A6D9E2	Technical accents
Light-page interactive accent	#2B6678	Links, focus and controls
Secondary text	#526978	Captions and metadata
Subtle border	#D8E3E9	Functional divisions
Dark-surface text	#F2F7FA	Text on navy surfaces
Control border	#7091A3	Functional controls


Keep the existing steel, mint, amber, and blue visual language within technical models.
10.2 Important Color Decision
Changing the website background must not automatically change the 3D model colors.

The page background and model material palette are separate concerns.

The existing 3D models retain their carefully established colors, face shading, connector colors, event markers, and depth representation.

Do not force all models into white, gray, or monochrome simply to match the light website.
10.3 Borderless Technical Presentation
The large dark-blue cards previously surrounding System Anatomy and DDoS Classification are no longer part of the approved design.

All primary project visualizations should appear directly on the light page canvas.

Remove unnecessary:
- Solid outer card backgrounds.
- Large rounded container panels.
- Decorative outer borders.
- Background shadows.
- Excessive enclosing padding.
Preserve any internal surfaces that are necessary to communicate a model's structure or function.

The intended separation is:

Transparent visual container + original colored model + readable technical information.

Do not remove functional controls or supporting content simply because a decorative outer card is removed.

The following established selectors should remain borderless unless a later scoped requirement explicitly supersedes this rule:
- .anatomy-region
- .project-diagram
Do not broadly strip backgrounds from all descendants.

Shared classes such as .scene-panel and .dark-surface should not be applied to the outer visualization containers when they recreate the unwanted dark card.

Inspect actual CSS specificity and any Canvas drawing before applying a fix.

The background may be produced by CSS or by the renderer; verify the responsible layer.
10.4 Surface Rules
Use:
- Solid backgrounds.
- Minimal functional borders.
- Restrained internal shadows.
- Clear alignment.
- Flat interface surfaces.
Avoid:
- Decorative gradients.
- Glassmorphism.
- Backdrop blur.
- Neon outlines.
- Excessive glow.
- Heavy outer shadows.
- Unnecessary nested cards.
Directional shading, translucent model faces, and subtle contact shadows are allowed inside the 3D models to communicate depth.

These effects must not imply measured operational performance.
11. Typography
11.1 Font Families
Maintain the existing typography.

DM Sans: Headings, introduction, body text, project explanations. Both lines of multi-line editorial headings use the same primary navy ink. Italic emphasis provides contrast; do not use teal on the second line.

IBM Plex Mono: Technical labels, metadata, timestamps, and source annotations.

Do not replace these fonts with generic design defaults.

Use locally hosted WOFF2 assets and maintain their existing licenses.
11.2 Type Scale
Element	Size	Line height
Homepage H1	26–48px	1.12
Page H1 / major heading	32–40px	1.15
Project section H2	26–32px	1.15
Local technical heading	20px	1.35
Evidence title	18px	1.35
Introductory text	16px	1.65
Body	16px	1.65
Controls/captions	14px	1.5–1.65
Technical metadata	12px	1.6


Use semantic HTML heading levels.

Do not assign heading levels based only on desired appearance.

Maintain:
- Display tracking: approximately −0.035em.
- Section tracking: approximately −0.025em.
- Local heading tracking: approximately −0.01em.
- Body weight: 400.
- Typical heading weight: 500.
11.3 Text Alignment
All primary text blocks must align to the shared page grid.

Maintain consistent:
- Heading baselines.
- Left edges.
- Content widths.
- Vertical spacing.
- Metadata placement.
- Caption alignment.
Technical labels inside Canvas scenes may use geometry-aware positioning.

They must remain readable and must not overlap important model components.
12. Layout and Shared Components
12.1 Page Grid
Maximum page shell width: 1280px.

Horizontal gutters: approximately 20–48px depending on viewport.

All pages share the same content grid.

The header, footer, page titles, and major content groups align to the same underlying layout.
12.2 Header
Retain the floating navy header.

Requirements:
- Solid brand navy.
- Approximately 20px outer corner radius.
- Approximately 12–20px outer gap.
- Desktop minimum height around 76px.
- Narrow minimum height around 68px.
- Sticky behavior where practical.
- Static positioning on very short viewports.
- No shrink animation.
- No blur.
Primary navigation remains consistent between pages.

At narrow widths, use the existing accessible menu disclosure.

Keyboard focus and Escape behavior must remain correct.
12.3 Footer
Retain the floating navy footer in normal document flow. It must never be fixed over content.

Keep contact heading, email, LinkedIn, Download CV, and attribution aligned to the shared site grid.

Short homepage: remove the visible Back to top ↑ link. It is unnecessary for the finalized short landing page and introduces avoidable interface clutter.

Longer Work/project pages: retain a Back to top link or equivalent contextual navigation only where it provides practical value. Scope any hide/removal to the homepage; never globally remove meaningful navigation from long project pages.
12.4 Shared Spacing
Use the established spacing scale:

4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 96px.

Recommended usage:
- Major groups: 40–64px.
- Ordinary content groups: 16–32px.
- Compact information: 8–16px.
Do not accumulate unnecessary padding at multiple nested levels.

Controls should have a comfortable interactive target of at least 44px where applicable.

Primary action buttons should maintain approximately 46px minimum height.

Functional control radius: approximately 6px.
13. System Anatomy and 3D Rendering
13.1 Signature Interaction
The signature technical interaction remains the permanently exploded System Anatomy.

Components stay separated throughout the animation.

The visitor can inspect the system while a meaningful event, probe, or relationship moves through its logical stages.

Do not reintroduce the old assembly/disassembly animation.
13.2 Existing Renderer
Preserve the current working perspective Canvas implementation unless a replacement is independently demonstrated to provide a meaningful improvement.

Keep:
- World-coordinate geometry.
- Perspective projection.
- Depth-sorted faces.
- Directional face shading.
- Internal geometric details.
- Component inspection.
- Touch rotation.
- Keyboard rotation.
- Source-linked stage information.
Do not replace the renderer with a flat image merely rotated in CSS.
13.3 Existing Experimental Renderer
The isolated Three.js/WebGL prototype is an experiment, not the approved production implementation.

Do not migrate to WebGL automatically.

Adoption requires comparison of:
- Browser rendering quality.
- Mobile performance.
- Accessibility.
- Initialization cost.
- Maintenance burden.
- Functional parity.
- Evidence fidelity.
The established prototype and its review documentation should remain separate from the production dist output until a migration is approved.
13.4 Model Geometry
Maintain recognizable technical geometry.

Components may include:
- Server-like enclosures.
- Processing trays.
- Interface boards.
- Connectors.
- Separated logical layers.
- Relevant internal details.
These are visual metaphors for computing functions, not claims about exact hardware.

Avoid adding unsupported physical details that imply a particular vendor or deployed hardware configuration.
14. Motion and Animation Contract
14.1 General Rules
All existing major animations operate independently of scrolling.

They loop automatically.

Animation must communicate a meaningful technical progression.

Do not add movement simply to make a static section appear interactive.
14.2 Established Timings
Visualization	Duration
Homepage sphere-first forensic network	15.2-second repeating loop + 1.6-second one-time initialization after terminal
Wazuh main Anatomy event sequence	48 seconds
Wazuh hero mini 3D Collect → Detect → Review	7.5 seconds, independent CSS-only loop
Network service check	31 seconds per port
Directory privilege traversal	44 seconds
ML alternative candidate	30 seconds
Complete ML candidate cycle	Approximately 90 seconds


Preserve these values unless a later tested design decision changes them.
14.3 Loop Behavior
At the end of a sequence:
- Reset the moving marker or active state.
- Restart the logical process.
- Preserve separated geometry on dedicated project models; the homepage network intentionally morphs into and out of a sphere.
- Preserve current camera orientation.
- Do not trigger page navigation.
- Do not automatically change evidence selection.
- Do not open dialogs.
- Do not advance to another project.
14.4 Manual Interaction
Component inspection and camera rotation must not interrupt the underlying process unnecessarily.

The active scene continues its established loop.

Project and evidence navigation remain user-controlled.

When an existing model offers several internal views, preserve their independent clocks during in-page switching where supported.

Cross-page clock persistence is not required. Reloading a dedicated project page may restart its sequence normally.
14.5 Visibility and Performance
Suspended or hidden canvases should stop unnecessary rendering.

Preserve the established performance intentions:
- Approximately 30fps active rendering target.
- Device pixel ratio capped near 1.6.
- Cached static geometry.
- Minimal repeated calculations.
- No unnecessary animation loops.
- Fonts and scene dimensions handled correctly after loading.
These are implementation targets, not claims of measured performance on every device.
14.6 Reduced Motion
When reduced motion is requested:
- Stop continuous animation.
- Show meaningful static geometry.
- Keep explanations accessible.
- Preserve manual selection.
- Preserve relevant keyboard controls.
- Preserve concise accessible textual descriptions even if a former long transcript has been intentionally removed from public view.
The project must remain understandable without animation.
15. Evidence and Technical Credibility
15.1 Evidence-First Integrity
Preserve original project screenshots, source masking, accurate captions and provenance in the repository. Never replace genuine configuration/alert screenshots with AI-generated images or imply conceptual renderings are observed production telemetry. The original material includes a larger historical collection (approximately twenty project figures); each dedicated page may present only a concise relevant selection.
15.2 Evidence Presentation — Project Specific
Final Wazuh exception (superseding the old universal evidence-browser rule): three genuine screenshots are directly linked, in a compact responsive three-column composition. No selector, slideshow, previous/next buttons, academic figure labels, or source dropdown is required on the finalized Wazuh public page. Clicking each preview opens the original asset separately for readable inspection. Keep a one-line project-source distinction unobtrusive.

SME and DDoS pages may use a different evidence treatment when that makes their material clearer. Do not blindly copy the older universal figure browser to every page. Where a custom evidence dialog remains, keep Escape, focus restoration, and fit/original-size access. Any gallery behavior must be user-controlled.
15.3 Technical Interpretation
Avoid overwhelming a recruiter with citations, research methods, or multi-paragraph technical transcripts. Preserve precise source attribution in project records and use short, accurate labels in the main UI.

Wazuh's hero 3D pipeline and large Anatomy are illustrations, while original Wazuh screenshots are implementation evidence. The project does not establish an IOC match for the recorded Tetragon alert, a confirmed incident, or production-scale detection performance.
15.4 Professional Project Names
Use professional headings: Wazuh Detection Engineering, SME Security Assessment, DDoS Traffic Classification. Do not surface academic labels such as “CLP,” “FYP,” or thesis figure numbers as decorative UI. This does not license falsifying the origin, deleting the underlying sources, or inventing production outcomes.
15.5 Accuracy
Distinguish configuration, observed event, interpretation, and illustrative animation. Do not invent dataset metrics, attack outcomes, detection accuracy, production systems, or live telemetry. Source limitations may be conveyed in a succinct unobtrusive sentence when needed; retain deeper context in the design/source record.
16. Professional Experience and CV
16.1 Approved Decision
Remove the long Experience section from the homepage.

Do not create another long scrolling résumé section on the My Work selection page.

The portfolio's central purpose is project exploration.
16.2 Retain Professional Credibility
Keep access to the existing CV from:
- Homepage.
- Floating navigation.
- Footer.
- Project pages where appropriate.
The CV remains the primary source for the complete education, internship, technical skills, certifications, and employment history.

Do not delete the actual résumé asset.
16.3 Optional Future Addition
A short About/Background page may be considered later if recruiters need more professional context beyond the homepage and CV.

This is not approved as part of the current architecture.

Do not build an additional page unless explicitly requested.
16.4 Claim Verification
Professional roles, certifications, dates, qualifications, and experience descriptions must remain accurate and consistent with the user's approved CV.

Do not automatically convert training, participation, research, or a planned certification into a completed credential.
17. Responsive Design
17.1 Supported Viewports
Review the website at representative widths:
- 360px
- 390px
- 768px
- 1024px
- 1440px
- 1920px
Also verify:
- Short landscape viewports.
- Browser zoom.
- Enlarged text.
- Touch interaction.
- Keyboard navigation.
These widths are checkpoints, not the only supported sizes.
17.2 Homepage
The two-column hero stacks below approximately 900px.

Text and actions come first.

The visualization follows naturally.

Never force a headline onto one line if the available width cannot support it.

Use the established container-relative headline sizing with accessible fallbacks.
17.3 Work Selection
Desktop: Three visually balanced selections.

Tablet: Reflow to an appropriate grid or stacked arrangement without crowding.

Mobile: Vertical selection layout.

All controls remain easy to tap.

No preview should force horizontal page scrolling.
17.4 Anatomy Layout
Preserve existing scene targets:
- Desktop: 520px.
- Below approximately 1000px: 440px.
- Below approximately 550px: 420px.
The inspector stacks when the available width becomes insufficient.

At scene widths below approximately 560px, recompose complex models into depth rows rather than blindly shrinking the desktop layout.

Preserve functional component access.
17.5 ML Layout
Preserve:
- Desktop viewport target: 480px.
- Narrow viewport target: 460px.
At scene widths below approximately 560px, arrange the preparation path and alternative candidate branches for legibility.

Do not obscure candidate labels or allow model components to overlap unnecessarily.
17.6 Touch Interaction
Preserve native vertical scrolling and pinch zoom.

Technical scenes may use horizontal dragging for rotation.

Use:

touch-action: pan-y pinch-zoom

Do not capture ordinary vertical swipes.

A second touch should cancel inappropriate rotation capture where supported.
18. Accessibility
All pages must remain operable without a mouse.

Requirements include:
- Semantic headings.
- Descriptive links.
- Visible keyboard focus.
- Accessible project selection.
- Proper navigation landmarks.
- Keyboard-accessible component controls.
- Screen-reader-readable project descriptions.
- Reduced-motion support.
- Native scrolling.
- Accessible image dialogs.
- Meaningful non-Canvas fallbacks.
Canvas visualizations require useful text descriptions or transcripts.

Arrow keys and Home retain their established camera behavior where applicable.

Do not rely only on color to convey direction, selection, model outcome, or security state.

Target WCAG AA text and control contrast.

Decorative animation must never obstruct reading.

Avoid forced focus changes on ordinary page load.
19. Technical Architecture and Maintainability
19.1 Shared Design System
dist/design-system.css remains the authority for shared (consume its CSS custom properties in page CSS; do not create competing hard-coded scales):
- Color tokens.
- Typography.
- Spacing.
- Control dimensions.
- Radius values.
- Semantic surfaces.
- Accessibility defaults.
Avoid duplicating design tokens in separate project pages.
19.2 Shared Styles
dist/styles.css should contain shared site layout, navigation, and page-level structure.

Use appropriately scoped styles for:
- Homepage.
- Work selection.
- Dedicated project templates.
- Evidence interfaces.
- Technical scenes.
Avoid broad overrides that affect unrelated projects.
19.3 Existing JavaScript
Retain and refactor relevant existing modules instead of recreating the entire renderer.

Important existing files include:
- network.js
- anatomy.js
- project-diagrams.js
- system-sequences.js
- workspace.js
- evidence.js
- navigation.js
- theme.js
Separate project routing from project animation behavior.

Do not initialize all three full technical visualizations on the Work selection page.

Only initialize the renderer required by the current page or active technical view.

Do not duplicate the original source-of-truth animation logic across multiple copied JavaScript files.
19.4 Shared Anatomy System
Wazuh and SME Assessment may continue using the same underlying Anatomy rendering architecture.

However, each dedicated project page should initialize only the relevant model and project-specific inspection behavior.

Within the SME Assessment page, retain access to both Network Zones and Directory Privileges.

Reusing the renderer does not mean presenting all unrelated project models at once.
19.5 Asset Handling
Preserve the existing:
- Images.
- Fonts.
- CV.
- Evidence assets.
- Model scripts.
- Provenance metadata.
Use correct relative paths on nested project pages.

For example, asset references from dist/work/wazuh.html differ from those in dist/index.html.

Do not use site-root absolute asset paths that break when the site is hosted under a GitHub Pages repository subpath.
19.6 GitHub Pages
The currently shared portfolio URL uses the repository subpath:

https\://ad-31.github.io/personal-portfolio/dist/

The new multipage structure must initially work under that existing deployment path.

If GitHub Pages is later configured to publish dist/ directly as the website artifact, update and verify the resulting URLs.

Do not assume that a deployment path has changed before confirming the hosting configuration.

Every direct project link must load correctly on refresh.

CSS, JavaScript, images, fonts, and CV assets must resolve from every page.

Cache-busting version parameters must be updated for changed assets when necessary.
20. Interaction Rules
20.1 No Unnecessary Controls
Do not add Play, Pause, or Motion toggles to the existing automatic visualizations unless an accessibility requirement explicitly justifies a control.

System reduced-motion settings remain supported.
20.2 No Scroll-Linked Animations
Scrolling is not an animation timeline.

Do not make technical process progression dependent on scroll position.

Visitors should be free to read, inspect, and navigate independently of animation timing.
20.3 No Automatic Page Navigation
Animations must never automatically:
- Select another project.
- Navigate to a different URL.
- Open an evidence image.
- Change a manually selected figure.
- Advance to the next project.
Navigation remains user-controlled.
20.4 Custom Cursor
Retain the established restrained custom pointer where supported.

Current visual contract:
- Accurate pointer location.
- Short single-color trail.
- Approximately 48px trail length.
- Approximately 110ms response duration.
- Small click feedback.
- No decorative halo.
The pointer must not intercept interactions.

Restore native cursor behavior for:
- Touch.
- Keyboard interaction.
- Text selection.
- Dialogs.
- Input elements.
- Reduced motion.
- High contrast.
- Model dragging where needed.
Scrolling should not fabricate movement trails or click effects.
21. Content Writing Standards
21.1 Voice
Use natural, confident, technically accurate language.

Prefer:
- Short explanations.
- Specific technical terms.
- Concrete implementation details.
- Clear outcomes.
- Evidence-backed claims.
Avoid:
- Generic cybersecurity slogans.
- Exaggerated achievements.
- Unsupported performance claims.
- Unnecessary corporate language.
- Academic report-style introductions.
- Excessive acronyms without context.
21.2 Project Structure
Every project should answer:

What problem was being addressed?

What did I build, configure, test, analyze, or integrate?

How does the system work?

What evidence supports the explanation?

What were the limitations?

What was the outcome?

The answer to the first three questions should be accessible without reading an entire technical report.
21.3 Terminology Consistency
Approved prominent naming:
- My Work
- Wazuh Detection Engineering
- SME Security Assessment
- DDoS Traffic Classification
- Explore the System
- What I Built
- What I Learned
- Original Evidence
Former prominent headings “Technical Breakdown” and “Methodology & Limitations” are superseded for the finalized Wazuh page.

Use the same names across navigation, headings, page metadata, and project previews.

Do not introduce competing labels for the same project.
22. Explicit Anti-Patterns
Do not introduce:
- Generic floating project cards.
- Dark outer visualization boxes.
- Excessive rounded panels.
- Decorative technology icons.
- Unnecessary number prefixes.
- Scroll-controlled animation sequences.
- Large hover scaling.
- Parallax storytelling.
- Full-page scroll snapping.
- Unnecessary animated text entrances (the approved one-time terminal intro is allowed).
- Unsupported live telemetry claims.
- Decorative charts without real data.
- Fake dashboards.
- Duplicated technical scenes.
- Forced fixed-height text containers.
- Project content hidden behind inaccessible controls.
- New frameworks without demonstrated need.
- Entirely new model designs when the task is only to modify surrounding UI.
Avoid rebuilding functional components for cosmetic changes.

Prefer targeted improvements over unnecessary rewrites.
23. Historical Decisions Preserved
18 October 2026 — Hero Simplification
Approved:
- Smaller headline.
- Short introduction.
- Clear eyebrow.
- Two balanced headline lines.
- Existing hero animation.
- DM Sans italic emphasis.
- Improved responsive wrapping.
These remain approved except for the homepage hero animation, which follows the later sphere-first decision.
19 October 2026 — Permanently Exploded Systems
Approved:
- Permanently separated models.
- Genuine 3D perspective.
- Continuous source-grounded processing sequences.
- No collapse/reassembly.
- Source-linked inspection.
- Independent process clocks.
- Keyboard and touch controls.
These remain approved for dedicated System Anatomy models; the homepage visual intentionally morphs between sphere and grids.
20 October 2026 — White Canvas + Floating Navy
Approved:
- White/light site background.
- Floating navy navigation and footer.
- Restrained accent colors.
- Solid interface surfaces.
- Existing model material palette.
- Reduced decorative effects.
- More precise Canvas geometry.
- Professional technical presentation.
These remain approved.
21 October 2026 — Borderless Technical Scenes
Approved:
- Remove the outer dark-blue cards from technical visualizations.
- Preserve 3D model colors and visual detail.
- Keep the underlying rendering behavior unchanged.
- Apply consistent light-page composition across projects.
This supersedes earlier requirements for dark, bounded outer technical environments.
21 October 2026 — Project-First Navigation
Approved:
- Replace the long scrolling homepage with a focused landing experience.
- Add a dedicated My Work selection page.
- Use visual selection for all three projects.
- Provide dedicated project pages.
- Keep the projects central to the portfolio.
- Remove the long Experience section from the homepage.
- Retain CV and contact access.
- Remove prominent academic-origin project labels.
- Preserve evidence attribution and limitations.
- Retain all existing technical animations and project models.
This supersedes the previous single-page, four-section structure and in-page project-tab architecture.
24. Implementation Plan — Pending Work
The architecture described above is approved but must be implemented and verified.
Phase 1 — Preserve the Existing Site
Before restructuring:
- Confirm the latest repository version.
- Create a recoverable backup or Git branch.
- Record the existing navigation and behavior.
- Inventory all evidence and model assets.
- Identify shared dependencies.
- Ensure no source assets will be accidentally deleted.
Phase 2 — Create Shared Multipage Structure
Implement:
- Short homepage.
- Dedicated My Work page.
- Three dedicated project pages.
- Shared navigation.
- Shared footer.
- Correct relative asset paths.
Keep the existing design system.
Phase 3 — Move Existing Project Experiences
Move or reuse the existing project content without degrading functionality.

Preserve:
- Wazuh Anatomy.
- SME network and directory models.
- DDoS classification workflow.
- Evidence viewers.
- Source references.
- Stage explanations.
- Case-study content.
- Accessibility fallbacks.
Do not rebuild the visualizations unnecessarily.
Phase 4 — Implement Visual Selection
Create the three visual project entries.

Reuse existing preview illustrations or carefully adapted lightweight alternatives.

Ensure the Work selection page does not initialize unnecessary heavy project renderers.
Phase 5 — Apply Borderless Visual Composition
Remove unwanted outer card styling.

Preserve original model materials, geometry, and animation.

Check label and connector visibility against the light background.

Avoid broad CSS overrides.
Phase 6 — Complete Responsive and Accessibility Testing
Test navigation, typography, project selection, technical scenes, evidence, keyboard interaction, touch behavior, and reduced motion.
Phase 7 — Deploy and Verify
Publish the updated site.

Confirm direct project URLs, refresh behavior, assets, animations, evidence images, CV links, and contact actions.

Only mark the migration complete after confirming the required behavior.
25. Regression Checklist
Every future substantial change must be checked against this list.
Architecture
- Homepage remains short and focused.
- Explore My Work opens the selection page.
- All three project selections navigate correctly.
- Dedicated pages load directly.
- Back to Work works.
- Next Project works.
- No irrelevant project content is displayed.
Visual Consistency
- Light page background.
- Floating navy header/footer.
- Original 3D model colors.
- No large blue visualization cards.
- Consistent typography.
- Consistent spacing.
- Aligned content edges.
- No horizontal overflow.
Animation
- Hero loop works.
- Wazuh 48-second main Anatomy process loop works.
- Wazuh 7.5-second miniature Collect → Detect → Review pipeline loops independently and honors reduced motion.
- Network sequence works.
- Directory sequence works.
- ML alternative cycle works.
- Animation timing remains independent of scrolling.
- Models remain separated.
- Camera rotation works.
- Component selection works.
- No unnecessary renderer runs offscreen.
Evidence
- The original project evidence collection remains preserved in source assets; Wazuh publicly showcases three selected originals.
- Original screenshots are not altered.
- Captions remain accurate.
- Source references remain accessible.
- Final Wazuh three direct evidence image links work; custom browsers/viewers on other pages work where actually used.
- Image enlargement works.
- No fabricated technical results.
- ML source limitations remain explicit.
Accessibility
- Keyboard navigation works.
- Focus indicators remain visible.
- Touch scrolling works.
- Pinch zoom works.
- Reduced motion works.
- Canvas fallbacks exist.
- Dialog focus restoration works.
- Content remains readable under zoom.
Responsive Design
Verify at:
- 360px.
- 390px.
- 768px.
- 1024px.
- 1440px.
- 1920px.
- Short landscape viewports.
- Enlarged text settings.
Deployment
- All routes work on GitHub Pages.
- Nested asset paths resolve.
- CSS and JavaScript versions are current.
- CV downloads correctly.
- Contact links work.
- LinkedIn link works.
- Homepage footer has no Back to top link; long-page navigation remains available as needed.
- Old links are handled appropriately.
- No credentials or sensitive unpublished data are exposed.
26. Verification Standards
Do not claim that a redesign is fully tested merely because:
- The HTML parses.
- The JavaScript executes in a test harness.
- A screenshot looks correct.
- A Canvas renderer produces an image.
- Automated checks pass.
Distinguish among:
- Source inspection.
- Static validation.
- Automated behavior tests.
- Rendered screenshots.
- Full browser testing.
- Physical-device testing.
Previous work included grouped native regression checks, cursor behavior checks, and Canvas previews at representative widths.

Those historical results do not automatically validate the new multipage architecture.

Run fresh regression checks after implementation.

Record:
- What changed.
- What was tested.
- What passed.
- What remains unverified.
- Known limitations.
- Any performance regressions.
- Any deviations from the approved specification.
Do not invent measured performance improvements or claim pixel-perfect layout without actual evidence.
27. Rules for Codex and Future Development
When working on this portfolio, Codex or any other development assistant must follow these requirements.
1. Read design.md before making substantial changes.
2. Treat the latest approved decision as authoritative when it explicitly supersedes an earlier rule.
3. Preserve the site's established visual identity.
4. Preserve working 3D models unless modification is explicitly required.
5. Prefer reusing working components over building replacements.
6. Keep shared styles, scripts, and tokens centralized.
7. Do not introduce broad CSS overrides without checking their impact.
8. Do not remove project evidence, limitations, or source references merely to simplify the interface.
9. Maintain accessibility, mobile support, and normal browser behavior.
10. Use existing libraries and project architecture where reasonable.
11. Do not introduce a framework without a clear technical reason.
12. Update design.md whenever an approved decision changes architecture, visual style, motion, navigation, project scope, or evidence treatment.
13. Explain what existing decisions were retained, which were superseded, and why.
14. Report changed files and verification results after implementation.
15. Do not mark future work as completed before it has been implemented and tested.
Primary development principle:

Change only what is needed to deliver the approved experience. Preserve the working technical substance of the portfolio.
28. Final Design Objective
The completed portfolio should give visitors a clear, intentional journey. All pages must follow the binding typography, color, spacing and terminal contract in Section 32.

Homepage

Meet Ahmed and understand his technical focus.

My Work

Choose which cybersecurity project to explore.

Project Experience

Understand the system through detailed, interactive technical visualizations.

Technical Evidence

Inspect original implementation material, source references, and limitations.

Next Action

Explore another project, download the CV, or make contact.

The website should remain:
- Visually clean.
- Technically credible.
- Professionally presented.
- Easy to navigate.
- Immersive without being overwhelming.
- Consistent across every page.
- Maintainable as new projects are added.
Final principle: The portfolio exists to demonstrate cybersecurity work. Design, animation, and interaction should make that work easier to understand and verify—not compete with it.
29. Final Homepage Hero — Sphere-First Forensic Scan (21 October 2026)
Status: Final approved homepage visual direction from this conversation. User visually approved the current homepage; source integration, mobile, reduced-motion, and deployed-browser checks should still be verified before claiming complete QA.
29.1 Visual identity
- Name: Spherical Forensic Scan.
- Native Canvas 2D renderer with perspective projection, not required Three.js/WebGL.
- The image/industrial exploded-hardware concept was explored, then explicitly superseded. Do not rebuild the five-module hardware hero unless separately requested.
- Use original Endpoint, Network, and Identity visual language and a central Evidence marker; flat 5×5 groups appear clean and engineered.
- The layout is centered with mild 3D tilt and deliberate spacing. Three main markers, signal tokens and network nodes are square, not circular or wavy.
- Palette: off-white canvas #F7F9FA, navy #142B3C, original steel/cyan supporting colors, restrained amber for event signal.
- No enclosing visual card, fake metrics, decorative code rain, unsolicited captions, or narrative overlay.
29.2 Motion timeline
Phase	Duration	Repeat?
Terminal introduction	Existing typing duration	Once after page load
Hero entrance	~850ms	Once
Spherical initialization	~1.6s	Once
Sphere → glass scan → 3 grids	3.6s	Every cycle
Endpoint signal	2.2s	Every cycle
Network context	2.2s	Every cycle
Identity context	2.2s	Every cycle
Three grids → rotating sphere → hold	5.0s	Every cycle
Total repeating sequence	15.2s	Continuous


The sphere appears at startup and at the end of each loop. One translucent sliding cyan scan plane repeats with the sphere-opening phase; only the initial sphere reveal and terminal typing remain one-time effects. Maintain continuous globe rotation and no abrupt reset at the loop boundary.

The final sphere stage is 5 seconds, superseding earlier 2.1-second, 4.8-second, and 2.6-second experimental values. Earlier 11.7-, 12.5-, and 18-second homepage workflows are historical, not current requirements.
29.3 Geometric and rendering rules
- Exactly three planar 5×5 groups, 75 nodes total, on the grid side of the transition.
- No node-level random Z displacement on flat grids. Outer frames share the grid plane and maintain clean straight connections.
- Sphere positions use a Fibonacci distribution over a rotating 3D sphere, with locally adjacent sphere edges rather than blindly transferring grid links across the globe.
- Morph nodes individually from sphere coordinates into the matching grid positions as the scan passes.
- The scanned transition should feel like a sliding glass plane, light and technical, not a full-screen bright rectangle or heavy hologram.
- Fix fit/scale through the loop so the image does not zoom or drift with morphing geometry. Favor a nearly frontal projection (yaw ~−0.10 rad; elevation ~0.18 rad), with a small pointer range.
- Markers, core centers, and signal particles are square. The evidence destination may be depicted with an outlined geometric square/diamond.
- Keep only small, useful technical labels inside the Canvas. Do not show timed prose descriptions beneath the hero.
29.4 Interaction, fallback, and verification
- Complete terminal typing first; do not restart it when the sphere resets.
- The loop runs without scroll-based timing or player controls.
- On-screen/offscreen lifecycle and device-pixel-ratio cap should remain in place for performance.
- Respect reduced-motion preferences by showing a readable static three-grid network and explanatory accessibility text.
- The three-word HTML fallback (Endpoints, Network, Identity) is not the finished Canvas animation. It should appear only if the renderer is unavailable; the renderer should hide it when working.
- A prior broken pasted script had an extra closing brace in draw(), resulting in a blank Canvas and visible fallback words. Keep syntax checks and startup smoke tests in the regression process.
- Check desktop/mobile fit, terminal event synchronization, full-cycle continuity, pointer response, reduced-motion behavior and deployment asset caching.
29.5 Homepage footer finalization
The short homepage must not show “Back to top ↑”. Keep the floating navy footer, contact information, CV action and other links. The removal should be scoped to the homepage; longer pages can keep this utility if helpful.
29.6 Relationship to project pages
The homepage is a conceptual visual identity piece. Dedicated project pages retain their existing permanently separated technical models and source-grounded factual claims. The Wazuh page has its own miniature CSS 3D hero pipeline but keeps its full large-scale Anatomy below. Its original stage narrative and evidence browser are intentionally not exposed in the public page; it uses concise copy and three direct evidence links as approved 22 October 2026. The homepage sphere morph is not permission to collapse project-specific models.
30. Superseded Homepage Explorations (Historical Record)
The following proposals were explored on 21 October 2026 but are not active homepage requirements:
1. Original 18-second hero signal-to-evidence loop — superseded by the 15.2-second sphere-first loop.
2. 11.7–12.5-second initialization + processing narratives — superseded; current hero carries no timed explanatory prose captions.
3. Five-module Exploded Digital Investigation hardware scene — generated image and Three.js proof of concept served as visual exploration. The user chose to return to the original node-based 3D network.
4. Scan-first intro with final 2.1-second sphere — superseded by starting in a sphere, repeating the glass scan each cycle, and holding the closing sphere longer.
5. Over-enlarged model/canvas desktop overrides — not approved in the final balanced hero. Use the native two-column layout and test sizing responsively.
6. Random-Z grid distortion — removed to achieve straight square grids and frames.
The white canvas/floating navy design, terminal typing, natural document scrolling, borderless scenes, and independent project animations remain approved.
31. Current Change Status and Verification
Updated in this design.md: the authoritative homepage motion contract, all past contradictory hero timings, footer navigation rule, geometric details, and historical decision record.

Not modified by this document update: the website’s actual dist/index.html, dist/network.js, dist/home.css, and the project pages. This file documents approved behavior rather than asserting those source files have been changed in this step.

Previously reported: JavaScript syntax and simulated Canvas checks for the replacement network code; the user visually approved the homepage during local iteration. Still to verify independently: final deployed build, screenshots at all responsive breakpoints, performance on mobile hardware, keyboard and reduced-motion behavior, whether the homepage footer link has actually been removed, and whether direct project routes are complete.
32. Sitewide UI and Terminal Contract — 21 October 2026
Status: Approved design standard for the homepage, My Work, and all future dedicated project pages. This section supersedes any conflicting exploratory styling suggestions and must be checked before adding a new page.
32.1 Shared single source of truth
- dist/design-system.css defines global design tokens and semantic element rules; dist/styles.css defines shared layout, floating navigation and footer. Do not copy a new font system, palette or spacing scale into a project page.
- Every page loads the same locally hosted assets/fonts/fonts.css, design-system.css, styles.css, motion.css, and existing cursor assets using correct relative paths. A nested page in dist/work/ uses ../ for these references.
- Load a page-specific stylesheet after shared styles and scope its selectors under the page's body class (.page-work, .page-project etc.). Page-specific styles only set composition and exceptions that are documented here.
- Shared header and footer markup, navigation names, CV and Contact links, accessible mobile navigation, skip link, focus appearance, and natural page scrolling must remain consistent. The short homepage omits Back to top; longer pages include it only when useful.
- Technical models retain their existing internal colors rather than being recolored to match surrounding page chrome.
32.2 Exact design-token roles
Role	Sitewide token	Resolved reference
Light canvas	var(--color-bg)	#F7F9FA
Heading and body ink	var(--color-ink) / var(--color-body)	#142B3C
Secondary reading text	var(--color-muted)	#526978
Action/link accents	var(--color-cyan) (light scope)	#2B6678
Supporting technical accent	--rgb-brand-accent / dark-scene cyan	#A6D9E2
Borders where functional	var(--color-border)	#D8E3E9
Header/footer	rgb(var(--rgb-brand))	#142B3C


Do not confuse the dark-scene cyan #A6D9E2 with the light-page interactive accent #2B6678; use semantic aliases rather than custom hex values in page typography. Avoid gradient headlines, neon, decorative shadow panels and arbitrary colors.
32.3 Binding typography system
- All reading typography uses var(--font-body) = DM Sans. Terminal commands, eyebrows, technology listings, technical metadata, source labels and counters use var(--font-mono) = IBM Plex Mono. No third font family.
- Homepage H1: existing --type-display / --type-display-fit responsive rules, max approximately 48px; other page H1: var(--type-section) (32–40px), --leading-title, --tracking-title, weight 500.
- Project H2: var(--type-feature) (26–32px), --leading-title, weight 500. Local technical H3 uses --type-card at 20px.
- Body and introduction: var(--text-base) (16px), --leading-body (1.65), regular 400. Controls: var(--text-sm) (14px), --leading-ui. Metadata: var(--text-xs) (12px), --leading-meta.
- Two-line editorial headings must use the same var(--color-ink) on both lines. Use italic on the second line, aligned with the home hero; do not change that second line to teal or invent a different text gradient.
- Shared grid is --page-max (1280px) and --page-gutter; use --space-*, --layout-gap, and --section-space before inventing new measurements.
- Use the same consistent weight, hierarchy and text alignment on desktop, tablet, narrow mobile, zoom and enlarged text. Do not set white-space: nowrap on primary headings.
32.4 Terminal introduction on every main page
- Reuse the existing terminal-type.js?v=3 and terminal-type.css?v=2, rather than implementing a second typing engine per page.
- Each page introduction follows terminal command → eyebrow → two separately typed heading lines → a concise typed introductory paragraph. The terminal command is decorative (aria-hidden="true"); meaningful heading and intro copy remain semantic and accessible.
- Use data-terminal on exactly these visible sections and reuse the homepage's hero-intro-pending lifecycle initialization only where required by the existing terminal script. Provide the 15-second failure guard; no permanently hidden content.
- Commands are page-scoped: homepage $ cat intro.txt, My Work $ cat work.txt; future project pages use one relevant command and must not create fabricated terminal logs.
- Run once per page load, preserve completed copy, never scroll-link typing or restart it on animation loops. Reduced-motion users immediately receive static readable content. Navigation and project links remain operable while text types.
- Avoid animating every other paragraph and do not combine large entrance motion with unrelated visual effects.
32.5 My Work — implementation contract
- Source: dist/work/index.html and dist/work/work.css (full V2 replacement prepared 21 October 2026). The prior teal second-line headline and 62px page H1 are superseded.
- Hero reads “Explore the systems” + italic “behind the work.” in identical primary navy ink. Command and eyebrow precede it; the descriptive paragraph types. The static 03 projects counter is secondary, not another H1.
- Three open, borderless technical project showcases with project-specific lightweight SVG diagrams; no filled cards, auto-changing selection, invented metrics, or full 3D engines on the hub page.
- Entire preview and text group forms a real anchor linking to wazuh.html, assessment.html, and ddos.html, with a visible focus state. Destinations require separate project-page implementation before claiming working navigation.
- Desktop: three columns; tablet: concise side-by-side preview/text per project; mobile: stacked reading order with no horizontal overflow. Animate only restrained preview emphasis, and disable decorative motion under the user's reduced-motion setting.
- Navbar/footer, contact address, CV path, and location are identical in visual treatment to the homepage and use correct ../ paths. No home.css, network.js, or homepage animation is loaded on the Work page.
32.6 Forward-development acceptance checks
Before declaring any next page finished, review that page's H1/H2/H3, primary and secondary colors, fonts, header/footer, responsive widths (360/390/768/1024/1440/1920), links, and focus states against the completed homepage and this section. Confirm all nested paths under GitHub Pages and do not report browser/mobile verification without performing it. Any new approved design decision must be recorded here or in a newer superseding numbered section.

Implementation status: Homepage and My Work approved; Wazuh Concept 2 visually approved by the user on 22 October 2026. Do not infer that independent responsive, full-browser, or deployed-site verification was performed solely from user approval.
33. Wazuh Detection Engineering — Finalized Concept 2 (22 October 2026)
Decision: Approved and visually finalized by the user. This is now the binding Wazuh project-page design. The earlier right-side Floating Detection Record (rule.id/level/decoder/ATT&CK fields), long workflow transcripts, CLP-style citations, dropdowns, dense stage readouts and earlier hero alternatives are superseded. Do not restore them during later revisions.
33.1 Files and unchanged dependencies
- Public page: dist/work/wazuh.html.
- Page-scoped styles: dist/work/wazuh.css.
- Shared unchanged styles: design-system.css, styles.css, motion.css, neon-cursor.css, terminal-type.css, assets/fonts/fonts.css.
- Existing project integration: anatomy.css, anatomy.js, system-sequences.js, evidence.css, evidence.js where still used, plus shared navigation and motion scripts.
- This design does not require React, Three.js, new vendor libraries, or new JavaScript for the mini hero. Use correct nested ../ asset references.
33.2 Final visual composition
The intro is a two-column white-canvas composition:

Left: “← Back to My Work,” terminal command $ cat detection.txt, technical eyebrow DETECTION ENGINEERING / SECURITY OPERATIONS, same-navy two-line H1 “Wazuh Detection” / italic “Engineering.”, one short first-person project summary, and the muted Wazuh · Tetragon · MISP tool line.

Right: an open, borderless miniature 3D Detection Pipeline with exactly three isometric CSS 3D modules named Collect, Detect, and Review (01/02/03), connected by subtle channels and a moving amber square event marker. Label DETECTION PIPELINE and a small Collect → Detect → Review note are sufficient. No filled cards, glassmorphism, dramatic lighting, extra data panels, fake output, or metrics.

The pipeline is an illustrative process summary, not a captured alert, live SOC dashboard, or second full-fledged System Anatomy.
33.3 Hero 3D geometry, motion and accessibility
- Create simple dimensional modules through CSS perspective, transform-style: preserve-3d, front/top/side faces and minimal telemetry-line details.
- Use existing navy, muted steel, light cyan and restrained amber; all outer UI fonts, colors and spacing use the tokens in Section 32. Avoid independent palettes.
- The amber event marker travels Collect → Detect → Review; stage LEDs subtly reflect the active phase.
- Loop period: 7.5 seconds, automatic, no play/pause controls, no scroll trigger. Small module floats are restrained. It is a separate loop from the large 48-second Anatomy model and does not claim to be time-synchronized with it.
- Reveal the right-side pipeline once after the existing terminal introduction finishes using hero-intro-pending / hero-intro-finished, then keep the pipeline running without repeating the text.
- At prefers-reduced-motion: reduce: show all three legible static dimensional modules immediately, with no moving event token or float animation. The words Collect / Detect / Review convey the process without motion.
- Desktop: right-aligned in the introduction's second column, inside the original --page-max / --page-gutter grid. At tablet sizes (approximately 900px and below) stack below the intro. On mobile keep the component compact, avoid horizontal overflow and excessive extra scrolling.
33.4 Main interactive Wazuh System Anatomy — unchanged
- Keep the existing large, permanently separated 3D Wazuh component model immediately after the intro, introduced by EXPLORE THE SYSTEM / “From event to investigation.”
- Preserve recognizable endpoint/agent, Tetragon, Wazuh manager, MISP, indexer and dashboard models; preserve component selection and orbit/drag/keyboard controls where provided by the renderer.
- Preserve the nine-stage, 48-second internal event sequence, looped independently from scroll and the mini pipeline. Do not shrink it into generic connected boxes or collapse the geometry between loops.
- Remove visible long sequence-readout text and its reserved white-space height. Do not show technical dropdowns, Input/Tool/Output panes, CLP identifiers, rule-by-rule paragraphs, or an expanded nine-stage transcript in the default public design.
- Retain compatibility DOM hooks for anatomy.js where required, but hidden technical hooks must not create blank vertical space. The user must be able to understand the project from the semantic intro and contributions, even if Canvas is unavailable.
- Inspector: compact text-based component choices, short selected-component title, single View evidence action, minimal/no repetitive description. Fix actual image-path bugs rather than introducing visible broken thumbnails.
- A single unobtrusive note can distinguish the conceptual visualization from real telemetry. No lengthy disclaimers.
33.5 Approved visible portfolio copy and content hierarchy
1. Terminal introduction with the sentence: “I built a security monitoring workflow using Wazuh, custom detections, and Linux runtime telemetry to support security investigations.”
2. EXPLORE THE SYSTEM — “From event to investigation.” / interactive Anatomy.
3. WHAT I BUILT — “Making security events useful.” Three short contributions:
   - Endpoint monitoring: “Integrated Tetragon and Wazuh to collect Linux runtime events.”
   - Custom detections: “Built detection rules and decoders and improved alert relevance.”
   - Security investigation: “Connected monitoring with alert review and threat-intelligence context.”
4. WHAT I LEARNED — “Detection is more than a rule.” One brief paragraph about log quality, decoding, alert tuning and investigation context.
5. ORIGINAL EVIDENCE — “A look at the implementation.” Three original screenshots, presented openly in a concise responsive grid.
6. Project navigation — Back to My Work, Next: Security Assessment, Back to top on this longer page.
7. Floating navy contact footer — same sitewide content and behavior as Home/My Work.
Do not introduce extra sections, academic terminology, repeated descriptions, unsupported numbers or generic promotional copy. User-approved concision is intentional.
33.6 Original evidence layout
The public page links directly to these original local files:
Visible name	Asset
Recorded runtime alert	../assets/evidence/wazuh-runtime-record.png
Custom detection rules	../assets/wazuh-rule-evidence.png
Tetragon decoder	../assets/evidence/wazuh-tetragon-decoder.png


- Desktop: three columns; tablet: two where practical; mobile: one.
- Previews must never stretch or crop source content deceptively; visitors can open the underlying screenshot directly.
- Avoid evidence dropdowns, carousel controls, academic figure labels and ten-screenshot long archives on this finalized public page.
- Preserve accurate source provenance and full archive outside the primary visible UI. Never claim the conceptual 3D image is a recorded dashboard screenshot.
33.7 Shared visual rules and non-regression requirements
- White page canvas var(--color-bg); navy headers var(--color-ink); floating navy shared navigation/footer.
- DM Sans for reading; IBM Plex Mono for technical labels, in accordance with Section 32.
- H1 both lines same navy, second italic. H2/H3 sizes, gutters and compact section rhythm use shared tokens.
- No colored second H1 line, new font family, decorative cards, gradient, oversized empty section, long inspector, source dropdown, or bright standalone mini-app.
- Keep responsive controls, touch scroll and reduced motion intact; no full-page horizontal overflow.
- On any later Wazuh work, modify only the necessary page and shared files after checking these approved rules. Do not alter the finalized homepage or My Work unnecessarily.
33.8 Verification and release status
User review: The user explicitly approved the Concept 2 page design on 22 October 2026, describing Detection Engineering as finalized and perfect. This is a valid visual/content acceptance decision.

Not independently verified in this design.md update: full browser interaction against the repository's current anatomy.js, timing observation of the 48-second loop, direct-linked evidence behavior on deployed GitHub Pages, responsive breakpoint screenshots, keyboard behavior, or reduced-motion behavior. Verify those before claiming comprehensive technical QA is complete.
33.9 What future pages should inherit
SME Security Assessment and DDoS Traffic Classification inherit the two-line terminal H1 pattern, typography, whitespace discipline, brief What I Built / What I Learned content, original evidence integrity, responsive navigation and shared header/footer. They should not copy Wazuh's specific Collect → Detect → Review devices, project terminology or code. Build each visual from its own source-grounded process and evidence.

## Global Portfolio Design — Final Direction
Approved: 22 October 2026

### Core Principle
Show the work. Explain what was achieved.
Let the technical visualizations speak for themselves.

### Scope
Applies to every page:
- Homepage
- My Work
- Wazuh Detection Engineering
- SME Security Assessment
- DDoS Traffic Classification
- Any future portfolio projects

### Page Composition
1. Shared floating navy navigation.
2. Terminal-style project introduction.
3. Concise project title and summary.
4. Distinctive technical visualization.
5. What I Built.
6. What I Learned.
7. Genuine evidence, where available.
8. Shared contact footer.

### Visual Rules
- Solid off-white canvas.
- Navy headings using DM Sans.
- IBM Plex Mono for technical metadata.
- All typography uses shared design-system tokens.
- Consistent page gutters and section alignment.
- Borderless technical 3D visualizations.
- Minimal cyan and amber accents.
- No unnecessary cards, backgrounds, or shadows.
- No excessive whitespace or oversized sections.

### Content Rules
- Keep explanations short, direct, and professional.
- Describe actual work, achievements, and learning.
- Avoid academic-project labels unless necessary
  for accurate evidence attribution.
- No decorative section labels or taglines.
- No redundant captions or navigation guides.
- No long workflow transcripts or report-style dropdowns.
- Do not invent results, evidence, metrics, or outcomes.

### Animation Rules
- Animations explain real technical processes.
- Automatic, independently looping playback.
- Do not depend on scrolling.
- Maintain distinct visualizations for each project.
- Support mouse, touch, and keyboard where applicable.
- Respect reduced-motion accessibility settings.
- Never sacrifice model visibility for decorative effects.

### Consistency Rules
- Reuse the global design system.
- Keep all major content sections aligned.
- Use the same typography hierarchy across pages.
- Keep mobile and desktop experiences equally polished.
- Do not redesign finalized animations without approval.
- Remove older page-specific rules that contradict
  this approved portfolio-wide direction.

### Final Design Test
For every element, ask:

1. Does it communicate my work or achievements?
2. Does it improve understanding or usability?
3. Is it visually consistent with the rest of the site?

If the answer is no to all three, remove it.

## 35. Final Portfolio-Wide Motion System

**Approved: 23 October 2026**

This section supersedes previous instructions that
specified typewriter animations for headings,
introductions, section titles or body copy.

### 35.1 Core principle

Terminal typing is reserved exclusively for the
Linux-style command prompt at the beginning of
each page.

All other text uses short, restrained float-up
entrance animations.

Motion should help visitors understand the
interface without delaying access to content.

### 35.2 Terminal animation

The only element permitted to use a typewriter
animation is:

`.terminal-command[data-terminal]`

Examples:

- Home: `cat intro.txt`
- My Work: `cat work.txt`
- Wazuh: `cat detection.txt`
- SME Assessment: `cat assessment.txt`
- DDoS: `cat classification.txt`
- SOC Automation: `cat soc-automation.txt`

Requirements:

- Run once on page entry.
- Use IBM Plex Mono.
- Preserve existing user and path colors.
- Complete in approximately one second.
- Do not type headings or paragraphs.
- Do not replay typing while scrolling.
- Preserve the `hero:intro-complete` event.
- Never delay content for the old long
  sequential typing animation.

### 35.3 Heading and introduction motion

Use the shared float-up system.

- Starting offset: 14px downward.
- Opacity transition: 360ms.
- Transform transition: 400ms.
- Easing: cubic-bezier(.22, 1, .36, 1).
- Stagger between intro elements: 55ms.
- Direction: vertical only.
- No bounce, parallax or horizontal movement.

Reveal elements as complete semantic units.

Examples:

- Entire H1, not one character at a time.
- Entire introductory paragraph.
- Entire project card.
- Entire contribution item.

### 35.4 Section motion

Section content may reveal once when entering
the viewport.

Applicable elements:

- Section headings
- Project summaries
- Contribution blocks
- Lessons learned
- Evidence screenshots
- Footer contact content

Requirements:

- One entrance per element.
- No scroll-scrubbing or repeated animation.
- No large movement.
- Maximum stagger: 90ms.
- Never animate each paragraph word separately.
- Never delay interactive functionality.

### 35.5 Technical 3D models

Do not change the existing model architecture
or internal animation timelines.

Preserve:

- Homepage spherical/network animation.
- Wazuh mini detection pipeline.
- Wazuh interactive System Anatomy.
- SME Network Zones model.
- SME Directory Privileges model.
- DDoS classification model.
- SOC Automation 3D orchestration model.

The 3D renderers maintain their independent
timelines and controls.

Scroll-based reading-content reveals must not
pause or reset a technical renderer.

Do not introduce component inspector panels,
play/pause buttons or decorative UI.

### 35.6 Accessibility and performance

- Respect prefers-reduced-motion.
- All content must remain readable without JS.
- Do not animate the actual Canvas geometry
  using the shared text reveal classes.
- Preserve keyboard focus and interaction.
- Reveal an element when keyboard focus enters it.
- Use IntersectionObserver only for lightweight
  reading-content entrances.
- Keep animations short and inexpensive.
- Never invent telemetry or system activity
  to justify an animation.

### 35.7 Implementation ownership

- terminal-type.js:
  command typing and reveal coordination.
- terminal-type.css:
  command and caret styling.
- motion.css:
  shared float-up presentation.
- motion.js:
  motion preferences and dialog transitions.

Project-specific CSS and JavaScript remain
responsible for their own technical visualizations.

New portfolio pages must inherit the global
motion system rather than creating separate
typewriter or reveal implementations.

### 35.8 Non-regression requirements

Do not modify previously approved:

- Floating navy header and footer
- Off-white page canvas
- DM Sans and IBM Plex Mono typography
- Project navigation
- Source-backed evidence
- Interactive 3D models
- Independent renderer clocks
- Responsive model layouts
- Reduced-motion behavior

This motion policy applies to every current
and future portfolio page.