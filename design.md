# Security Fieldnotes — Design Reference

**Portfolio:** Ahmed Ali Ahmed  
**Updated:** 21 October 2026  
**Design direction:** White Canvas + Floating Navy + Immersive Technical 3D  
**Architecture:** Homepage → Visual Work Selection → Dedicated Project Experiences  
**Status:** Approved design specification. New multipage architecture pending implementation.

---

## 1. Purpose of This Document

This document is the single source of truth for the portfolio's design, content structure, navigation, interactions, animations, technical visualizations, accessibility, and development decisions.

Every future design change must remain consistent with this document.

When a new decision is approved:

1. Review the existing design rules.
2. Identify which earlier decisions it replaces.
3. Update this document before or alongside the implementation.
4. Apply the changes consistently across all affected pages.
5. Verify the changes on desktop and mobile.
6. Document what was implemented, tested, and remains unverified.

**Do not silently overwrite established design decisions or introduce new visual patterns without documenting the change.**

This document distinguishes between approved requirements, existing implementations, and future work. An approved requirement is not evidence that the corresponding code has been implemented or tested.

---

# 2. Product Vision

## 2.1 Portfolio Objective

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

**Primary goal:** Make the projects the central experience.

**Secondary goal:** Make professional background, qualifications, contact details, and CV easily accessible without interrupting project exploration.

Keep the portfolio focused on cybersecurity, information technology, security operations, detection engineering, offensive security, and automation. Robotics and unrelated engineering projects are outside its scope.

## 2.2 Core Design Philosophy

**Aesthetic: White Canvas + Floating Navy + Immersive Technical 3D.**

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

**The website should feel sophisticated because its content and interactions are well designed, not because every element moves.**

---

# 3. New Information Architecture — 21 October 2026

## 3.1 Approved Architecture

The previous four-section scrolling homepage is superseded.

The website will now use three primary levels:

**Level 1 — Homepage**

A focused landing experience introducing Ahmed and providing an immediate entry into his work.

**Level 2 — My Work**

A dedicated visual project-selection screen presenting all three cybersecurity projects.

**Level 3 — Individual Project Pages**

A focused technical experience for each selected project, containing its existing models, workflows, animations, explanations, and evidence.

The intended visitor journey is:

Homepage → Explore My Work → Select Project → Explore System → Inspect Evidence → Next Project or Back to Work.

Do not require visitors to scroll through unrelated projects before reaching the one they want.

## 3.2 Route Structure

Use a maintainable static multipage architecture.

Proposed source structure:

```text
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
```

This is the target structure, not confirmation that these pages currently exist.

Do not introduce React, Next.js, or another framework simply to achieve page navigation.

Reuse the existing native HTML, CSS, and JavaScript implementation wherever practical.

Maintain working navigation using ordinary links.

The architecture must support direct links to each project.

## 3.3 Navigation Principles

Primary navigation:

- Home
- My Work
- Contact
- Download CV

The homepage's primary action is **Explore My Work**.

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

---

# 4. Homepage Design

## 4.1 Homepage Purpose

The homepage should establish personal identity and technical direction immediately.

It must not contain the complete project explorer, long case studies, a large experience timeline, or expanded evidence galleries.

The main focus is the hero.

The existing animated network visualization must remain.

## 4.2 Hero Content

**Eyebrow**

Detection · Automation · Offensive Security

**Primary headline**

Understand the attack.

*Engineer the detection.*

**Introduction**

I'm Ahmed Ali Ahmed.

I build detections, assess exposure, and automate security workflows.

**Primary action**

Explore My Work

**Secondary action**

Download CV

**Location**

Based in Bahrain

Preserve the existing wording unless a separate content revision is approved.

## 4.3 Hero Layout

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

## 4.4 Hero Motion

Preserve the existing 18-second signal → layers → evidence sequence.

The animation should:

- Run independently.
- Repeat automatically.
- Retain the existing signal-flow concept.
- Use restrained visual effects.
- Preserve pointer interaction.
- Avoid scroll-controlled playback.
- Respect reduced-motion preferences.

Do not replace it with an unrelated animation.

## 4.5 Homepage Scrolling

The homepage should be intentionally short.

However, do not force a single fixed-height screen.

Allow natural vertical scrolling when required by screen size, browser zoom, accessibility settings, or mobile orientation.

Never use clipping, scroll traps, or fixed viewport heights to artificially eliminate scrolling.

---

# 5. My Work — Visual Project Selection

## 5.1 Purpose

The My Work page is the primary navigation hub for the portfolio.

It should feel like an interactive project gallery rather than a résumé section or a long list of projects.

Visitors should immediately understand that there are three projects available to explore.

Do not place complete project explanations, evidence galleries, or full-sized technical animations on this screen.

## 5.2 Approved Projects

The initial Work selection contains three projects.

| Project | Professional title | Main focus |
|---|---|---|
| Wazuh | Detection Engineering | Security monitoring, event processing, rules, and alert investigation |
| SME | Security Assessment | Network exposure, Active Directory relationships, and assessment evidence |
| DDoS | Traffic Classification | Traffic preparation, feature engineering, model comparison, and evaluation |

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

## 5.3 Visual Selection Layout

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

## 5.4 Preview Visualizations

The previews should reference the existing project designs.

Examples:

**Wazuh Detection Engineering**

A simplified visual representation of endpoint telemetry, detection processing, and an analyst-facing alert.

**SME Security Assessment**

A simplified separated network architecture showing the relationship between the LAN, firewall, DMZ, and server infrastructure.

**DDoS Traffic Classification**

A simplified traffic-to-features-to-model-evaluation workflow.

Previews are navigation illustrations, not claims of observed evidence.

Reuse visual language and geometry from the established project models when practical.

Do not create three additional heavy continuous 3D renderers on the selection page.

Prefer lightweight static or very restrained interactive previews.

## 5.5 Project Selection Behavior

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

## 5.6 Hover, Focus, and Touch Behavior

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

---

# 6. Dedicated Project Page Architecture

## 6.1 Shared Project Template

All project pages must follow the same underlying structure.

Use the same typography, content spacing, navigation placement, technical metadata style, evidence system, and responsive behavior.

The technical visualization can differ according to the project's requirements.

Each project page contains the following sequence.

### A. Project Introduction

Display:

- Project title.
- Technical category.
- Short objective.
- Relevant technologies.
- What Ahmed specifically worked on.
- A concise, defensible outcome or project scope.

Avoid long introductions.

A visitor should understand the project's purpose before interacting with the visualization.

### B. Technical Visualization

Place the project's existing interactive 3D system or workflow prominently.

The visualization should remain the main visual focus.

Preserve:

- Existing model geometry.
- Original model colors.
- Camera rotation.
- Permanently separated components.
- Automatic sequence playback.
- Inspectable components.
- Source-grounded stage explanations.

### C. Technical Breakdown

Explain what the system does and how its components interact.

Where relevant, each stage describes:

- Input.
- Tool or component.
- Transformation or handling.
- Output.
- Supporting evidence.
- Limitations.

Use clear engineering language.

### D. Evidence

Provide relevant original implementation screenshots and explanatory captions.

Let visitors choose which evidence to inspect.

Do not display every screenshot in a long uninterrupted vertical stack.

### E. Methodology and Limitations

Explain important source limitations, uncertainty, illustrative elements, and what was not demonstrated.

This information must remain accessible even when academic-origin labels have been removed from prominent project headings.

### F. Project Navigation

Provide:

- Back to Work.
- Next Project.

Keep these actions consistent across all three project pages.

## 6.2 Project Page Scrolling

The initial project view should prioritize the title and technical visualization.

Detailed evidence may require normal scrolling.

Do not force the entire case study into a single screen.

Avoid scroll-jacking, pinned scenes, and mandatory step-by-step progression.

Scrolling reveals additional information but does not control animation playback.

---

# 7. Wazuh Detection Engineering

## 7.1 Project Identity

**Title:** Wazuh Detection Engineering

**Category:** Security Monitoring · Detection Engineering

**Core technologies:** Wazuh, Tetragon, MISP

## 7.2 Project Focus

Show how security telemetry is collected, decoded, evaluated against detection logic, indexed, and presented for analyst review.

The visualization should explain the system's logical processing sequence.

## 7.3 Existing Anatomy Model

Preserve the existing permanently exploded 3D architecture.

Do not compress the components into a single object.

Do not replace the current model with basic interconnected boxes or a flat infographic.

The separated computing elements are conceptual representations of software roles, not an exact hardware inventory.

## 7.4 Existing Sequence

Preserve the documented nine-stage sequence:

1. Record Linux runtime activity.
2. Collect the runtime event.
3. Receive the event at the manager.
4. Decode the Tetragon JSON.
5. Evaluate rule 732011.
6. Form a structured alert.
7. Make the alert searchable through indexing.
8. Display the selected alert in the dashboard.
9. Present the record for analyst review.

**Sequence duration:** 48 seconds.

The same amber event marker progresses through the logical stages, changing representation as appropriate.

The system geometry remains separated throughout.

At the end, reset the moving marker and repeat.

Do not collapse or rebuild the scene.

## 7.5 Evidence Boundaries

Preserve these distinctions:

- Configured decoder names are not necessarily identical to observed decoder fields.
- The child `tetragon-json` configuration is distinguished from the observed `decoder.name=tetragon-base`.
- Figure 59 supports the recorded rule 732011 event.
- Preserve level 13 and the T1053.003/Cron mapping.
- Collection and indexing stages are supported by their documented sources.
- Illustrative internal handoffs are not represented as captured transport traces.
- MISP integration does not establish an IOC match for this particular event.
- An alert does not establish a confirmed incident.

Preserve the documented 14 functional and 8 acceptance checks.

Do not describe these checks as measured detection accuracy.

---

# 8. SME Security Assessment

## 8.1 Project Identity

**Title:** SME Security Assessment

**Category:** Offensive Security · Network Assessment

**Core technologies:** pfSense, Active Directory, BloodHound, CALDERA

## 8.2 Project Focus

Explain how network exposure and directory permissions were examined in an SME-style lab environment.

The project has two important technical views:

- Network Zones
- Directory Privileges

They belong to the same assessment project.

## 8.3 Network Zones Visualization

Preserve the existing network architecture and permanently separated models.

The original sequence follows:

Kali → pfSense → DMZ Host → Return Response → Assessment Review.

Retain the six-stage process.

**Sequence duration:** 31 seconds per port.

Preserve these documented network details:

- LAN: `172.16.10.0/24`
- DMZ: `172.16.40.0/24`
- Server farm: `172.16.30.0/24`
- Kali: `172.16.10.100`
- Target host: `172.16.40.10`

The source records ports 80, 443, and 5432 as open.

Each animated pass isolates one port while preserving the original combined scan as the evidence source.

Use directionally distinct visual treatment for outgoing probes and return responses.

Do not imply that the sequence is a recorded packet capture.

## 8.4 Directory Privileges Visualization

Preserve the existing group-membership and domain-permission model.

The visualization covers:

- ROOT account.
- Enterprise Admins.
- Administrators.
- Domain Admins.
- Documented domain-right relationships.

**Sequence duration:** 44 seconds.

Preserve the distinction between:

- MemberOf relationships.
- GenericAll permissions.
- AllExtendedRights permissions.

Every relationship branch begins independently at ROOT.

Do not join the groups into an invented lateral-movement or exploitation chain.

The visualized key represents a logical relationship, not a packet or credential.

## 8.5 Evidence Boundaries

Preserve the 13 documented assessment checks and original supporting figures.

Maintain these distinctions:

- An open port demonstrates exposure, not compromise.
- A scanner finding may require additional validation.
- Directory rights indicate relationships, not evidence of their exploitation.
- A passing assessment check may document a weakness.
- Demonstrated discovery activity is not proof of a complete attack chain.
- The project remains explicitly identified as a lab-based assessment.

---

# 9. DDoS Traffic Classification

## 9.1 Project Identity

**Title:** DDoS Traffic Classification

**Category:** Machine Learning · Network Security

**Core model families:**

- Random Forest
- Support Vector Machine
- XGBoost

## 9.2 Project Focus

Show the reported progression from network traffic through preprocessing, feature engineering, alternative model evaluation, and review.

The visualization must remain an abstract machine-learning workflow.

Do not turn the ML pipeline into fictional physical cybersecurity appliances.

## 9.3 Existing Workflow

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

## 9.4 Existing Visualization

Preserve the existing:

- 3D workflow geometry.
- Model colors.
- Perspective.
- Rotational interaction.
- Stage labels.
- Automatic repeating sequence.
- Touch and keyboard interaction.

Do not redesign the visualization simply because the page structure changes.

## 9.5 Evidence Boundaries

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

---

# 10. Visual Design System

## 10.1 Color Palette

Maintain the established White Canvas + Floating Navy direction.

| Role | Color | Usage |
|---|---|---|
| Page background | `#F7F9FA` | All primary pages |
| White | `#FFFFFF` | Reading surfaces |
| Primary navy | `#142B3C` | Header, footer, headings, actions |
| Existing dark scene color | `#102637` | Internal visual material and dark UI roles where necessary |
| Elevated navy | `#1C384A` | Functional dark controls and selected scene elements |
| Cyan | `#A6D9E2` | Technical accents |
| Light-page interactive accent | `#2B6678` | Links, focus and controls |
| Secondary text | `#526978` | Captions and metadata |
| Subtle border | `#D8E3E9` | Functional divisions |
| Dark-surface text | `#F2F7FA` | Text on navy surfaces |
| Control border | `#7091A3` | Functional controls |

Keep the existing steel, mint, amber, and blue visual language within technical models.

## 10.2 Important Color Decision

**Changing the website background must not automatically change the 3D model colors.**

The page background and model material palette are separate concerns.

The existing 3D models retain their carefully established colors, face shading, connector colors, event markers, and depth representation.

Do not force all models into white, gray, or monochrome simply to match the light website.

## 10.3 Borderless Technical Presentation

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

**Transparent visual container + original colored model + readable technical information.**

Do not remove functional controls or supporting content simply because a decorative outer card is removed.

The following established selectors should remain borderless unless a later scoped requirement explicitly supersedes this rule:

- `.anatomy-region`
- `.project-diagram`

Do not broadly strip backgrounds from all descendants.

Shared classes such as `.scene-panel` and `.dark-surface` should not be applied to the outer visualization containers when they recreate the unwanted dark card.

Inspect actual CSS specificity and any Canvas drawing before applying a fix.

The background may be produced by CSS or by the renderer; verify the responsible layer.

## 10.4 Surface Rules

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

---

# 11. Typography

## 11.1 Font Families

Maintain the existing typography.

**DM Sans:** Headings, introduction, body text, project explanations.

**IBM Plex Mono:** Technical labels, metadata, timestamps, and source annotations.

Do not replace these fonts with generic design defaults.

Use locally hosted WOFF2 assets and maintain their existing licenses.

## 11.2 Type Scale

| Element | Size | Line height |
|---|---|---|
| Homepage H1 | 26–48px | 1.12 |
| Page H1 / major heading | 32–40px | 1.15 |
| Project section H2 | 26–32px | 1.15 |
| Local technical heading | 20px | 1.35 |
| Evidence title | 18px | 1.35 |
| Introductory text | 16px | 1.65 |
| Body | 16px | 1.65 |
| Controls/captions | 14px | 1.5–1.65 |
| Technical metadata | 12px | 1.6 |

Use semantic HTML heading levels.

Do not assign heading levels based only on desired appearance.

Maintain:

- Display tracking: approximately −0.035em.
- Section tracking: approximately −0.025em.
- Local heading tracking: approximately −0.01em.
- Body weight: 400.
- Typical heading weight: 500.

## 11.3 Text Alignment

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

---

# 12. Layout and Shared Components

## 12.1 Page Grid

Maximum page shell width: 1280px.

Horizontal gutters: approximately 20–48px depending on viewport.

All pages share the same content grid.

The header, footer, page titles, and major content groups align to the same underlying layout.

## 12.2 Header

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

## 12.3 Footer

Retain the floating navy footer.

It contains:

- Contact heading.
- Email action.
- LinkedIn.
- Download CV.
- Attribution.
- Back to top or appropriate page navigation.

The footer remains in normal document flow.

It must not be fixed over content.

## 12.4 Shared Spacing

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

---

# 13. System Anatomy and 3D Rendering

## 13.1 Signature Interaction

The signature technical interaction remains the permanently exploded System Anatomy.

Components stay separated throughout the animation.

The visitor can inspect the system while a meaningful event, probe, or relationship moves through its logical stages.

Do not reintroduce the old assembly/disassembly animation.

## 13.2 Existing Renderer

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

## 13.3 Existing Experimental Renderer

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

The established prototype and its review documentation should remain separate from the production `dist` output until a migration is approved.

## 13.4 Model Geometry

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

---

# 14. Motion and Animation Contract

## 14.1 General Rules

All existing major animations operate independently of scrolling.

They loop automatically.

Animation must communicate a meaningful technical progression.

Do not add movement simply to make a static section appear interactive.

## 14.2 Established Timings

| Visualization | Duration |
|---|---|
| Hero network | 18 seconds |
| Wazuh event sequence | 48 seconds |
| Network service check | 31 seconds per port |
| Directory privilege traversal | 44 seconds |
| ML alternative candidate | 30 seconds |
| Complete ML candidate cycle | Approximately 90 seconds |

Preserve these values unless a later tested design decision changes them.

## 14.3 Loop Behavior

At the end of a sequence:

- Reset the moving marker or active state.
- Restart the logical process.
- Preserve separated geometry.
- Preserve current camera orientation.
- Do not trigger page navigation.
- Do not automatically change evidence selection.
- Do not open dialogs.
- Do not advance to another project.

## 14.4 Manual Interaction

Component inspection and camera rotation must not interrupt the underlying process unnecessarily.

The active scene continues its established loop.

Project and evidence navigation remain user-controlled.

When an existing model offers several internal views, preserve their independent clocks during in-page switching where supported.

**Cross-page clock persistence is not required.** Reloading a dedicated project page may restart its sequence normally.

## 14.5 Visibility and Performance

Suspended or hidden canvases should stop unnecessary rendering.

Preserve the established performance intentions:

- Approximately 30fps active rendering target.
- Device pixel ratio capped near 1.6.
- Cached static geometry.
- Minimal repeated calculations.
- No unnecessary animation loops.
- Fonts and scene dimensions handled correctly after loading.

These are implementation targets, not claims of measured performance on every device.

## 14.6 Reduced Motion

When reduced motion is requested:

- Stop continuous animation.
- Show meaningful static geometry.
- Keep explanations accessible.
- Preserve manual selection.
- Preserve relevant keyboard controls.
- Preserve readable transcripts.

The project must remain understandable without animation.

---

# 15. Evidence and Technical Credibility

## 15.1 Evidence-First Presentation

The portfolio's strongest technical differentiator is its relationship between visual storytelling and real supporting material.

Preserve the original project evidence.

The previous verified content inventory consists of twenty original thesis figures.

Keep:

- Original image pixels.
- Source annotations.
- Existing masking.
- Accurate captions.
- Evidence references.
- Figure provenance.
- Original-size inspection capability.

Do not silently replace implementation screenshots with generated illustrations.

## 15.2 Evidence Browser

Use manual evidence selection.

Preserve:

- Figure selection.
- Previous/Next controls.
- Image captions.
- Fit-image display.
- Original-size display.
- Accessible dialog behavior.
- Focus restoration.
- Escape handling.

Only one main original figure is displayed at a time.

The evidence archive must not determine the entire page length.

## 15.3 Default Evidence

Wazuh initially shows the documented event record from Figure 59.

The SME Assessment initially shows the original network topology.

Additional evidence remains available through explicit visitor selection.

The ML project continues to disclose its source limitations rather than presenting fabricated implementation screenshots.

## 15.4 Evidence Layout

Retain the existing evidence composition as a starting point:

- Approximately 3:2 image/caption layout on desktop.
- Image maximum height around 260px without cropping.
- Stacked layout on mobile.
- Mobile image maximum height around 220px.
- Readable captions and source metadata.

Actual dimensions may adapt to the dedicated page layout.

Do not reduce evidence readability merely to fit an arbitrary viewport.

## 15.5 Professional Project Naming

Remove academic-origin labels from prominent project headings.

However, this decision does not authorize removal of accurate provenance.

For example:

**Public heading:** DDoS Traffic Classification

**Technical disclosure:** Original project description based on the May–June 2024 CV; underlying implementation source unavailable.

This separates professional presentation from verifiable technical attribution.

## 15.6 Claims and Accuracy

Maintain clear distinctions between:

- Fact.
- Recorded observation.
- Source-backed configuration.
- Interpretation.
- Illustration.
- Unverified implementation detail.
- Measured performance.

Do not invent performance claims, test results, datasets, detections, attacks, or production outcomes.

A visually sophisticated simulation is not proof that the underlying production workflow was implemented exactly as shown.

---

# 16. Professional Experience and CV

## 16.1 Approved Decision

Remove the long Experience section from the homepage.

Do not create another long scrolling résumé section on the My Work selection page.

The portfolio's central purpose is project exploration.

## 16.2 Retain Professional Credibility

Keep access to the existing CV from:

- Homepage.
- Floating navigation.
- Footer.
- Project pages where appropriate.

The CV remains the primary source for the complete education, internship, technical skills, certifications, and employment history.

Do not delete the actual résumé asset.

## 16.3 Optional Future Addition

A short About/Background page may be considered later if recruiters need more professional context beyond the homepage and CV.

This is not approved as part of the current architecture.

Do not build an additional page unless explicitly requested.

## 16.4 Claim Verification

Professional roles, certifications, dates, qualifications, and experience descriptions must remain accurate and consistent with the user's approved CV.

Do not automatically convert training, participation, research, or a planned certification into a completed credential.

---

# 17. Responsive Design

## 17.1 Supported Viewports

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

## 17.2 Homepage

The two-column hero stacks below approximately 900px.

Text and actions come first.

The visualization follows naturally.

Never force a headline onto one line if the available width cannot support it.

Use the established container-relative headline sizing with accessible fallbacks.

## 17.3 Work Selection

Desktop: Three visually balanced selections.

Tablet: Reflow to an appropriate grid or stacked arrangement without crowding.

Mobile: Vertical selection layout.

All controls remain easy to tap.

No preview should force horizontal page scrolling.

## 17.4 Anatomy Layout

Preserve existing scene targets:

- Desktop: 520px.
- Below approximately 1000px: 440px.
- Below approximately 550px: 420px.

The inspector stacks when the available width becomes insufficient.

At scene widths below approximately 560px, recompose complex models into depth rows rather than blindly shrinking the desktop layout.

Preserve functional component access.

## 17.5 ML Layout

Preserve:

- Desktop viewport target: 480px.
- Narrow viewport target: 460px.

At scene widths below approximately 560px, arrange the preparation path and alternative candidate branches for legibility.

Do not obscure candidate labels or allow model components to overlap unnecessarily.

## 17.6 Touch Interaction

Preserve native vertical scrolling and pinch zoom.

Technical scenes may use horizontal dragging for rotation.

Use:

`touch-action: pan-y pinch-zoom`

Do not capture ordinary vertical swipes.

A second touch should cancel inappropriate rotation capture where supported.

---

# 18. Accessibility

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

---

# 19. Technical Architecture and Maintainability

## 19.1 Shared Design System

`dist/design-system.css` remains the authority for shared:

- Color tokens.
- Typography.
- Spacing.
- Control dimensions.
- Radius values.
- Semantic surfaces.
- Accessibility defaults.

Avoid duplicating design tokens in separate project pages.

## 19.2 Shared Styles

`dist/styles.css` should contain shared site layout, navigation, and page-level structure.

Use appropriately scoped styles for:

- Homepage.
- Work selection.
- Dedicated project templates.
- Evidence interfaces.
- Technical scenes.

Avoid broad overrides that affect unrelated projects.

## 19.3 Existing JavaScript

Retain and refactor relevant existing modules instead of recreating the entire renderer.

Important existing files include:

- `network.js`
- `anatomy.js`
- `project-diagrams.js`
- `system-sequences.js`
- `workspace.js`
- `evidence.js`
- `navigation.js`
- `theme.js`

Separate project routing from project animation behavior.

Do not initialize all three full technical visualizations on the Work selection page.

Only initialize the renderer required by the current page or active technical view.

Do not duplicate the original source-of-truth animation logic across multiple copied JavaScript files.

## 19.4 Shared Anatomy System

Wazuh and SME Assessment may continue using the same underlying Anatomy rendering architecture.

However, each dedicated project page should initialize only the relevant model and project-specific inspection behavior.

Within the SME Assessment page, retain access to both Network Zones and Directory Privileges.

Reusing the renderer does not mean presenting all unrelated project models at once.

## 19.5 Asset Handling

Preserve the existing:

- Images.
- Fonts.
- CV.
- Evidence assets.
- Model scripts.
- Provenance metadata.

Use correct relative paths on nested project pages.

For example, asset references from `dist/work/wazuh.html` differ from those in `dist/index.html`.

Do not use site-root absolute asset paths that break when the site is hosted under a GitHub Pages repository subpath.

## 19.6 GitHub Pages

The currently shared portfolio URL uses the repository subpath:

`https://ad-31.github.io/personal-portfolio/dist/`

The new multipage structure must initially work under that existing deployment path.

If GitHub Pages is later configured to publish `dist/` directly as the website artifact, update and verify the resulting URLs.

Do not assume that a deployment path has changed before confirming the hosting configuration.

Every direct project link must load correctly on refresh.

CSS, JavaScript, images, fonts, and CV assets must resolve from every page.

Cache-busting version parameters must be updated for changed assets when necessary.

---

# 20. Interaction Rules

## 20.1 No Unnecessary Controls

Do not add Play, Pause, or Motion toggles to the existing automatic visualizations unless an accessibility requirement explicitly justifies a control.

System reduced-motion settings remain supported.

## 20.2 No Scroll-Linked Animations

Scrolling is not an animation timeline.

Do not make technical process progression dependent on scroll position.

Visitors should be free to read, inspect, and navigate independently of animation timing.

## 20.3 No Automatic Page Navigation

Animations must never automatically:

- Select another project.
- Navigate to a different URL.
- Open an evidence image.
- Change a manually selected figure.
- Advance to the next project.

Navigation remains user-controlled.

## 20.4 Custom Cursor

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

---

# 21. Content Writing Standards

## 21.1 Voice

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

## 21.2 Project Structure

Every project should answer:

**What problem was being addressed?**

**What did I build, configure, test, analyze, or integrate?**

**How does the system work?**

**What evidence supports the explanation?**

**What were the limitations?**

**What was the outcome?**

The answer to the first three questions should be accessible without reading an entire technical report.

## 21.3 Terminology Consistency

Approved prominent naming:

- My Work
- Detection Engineering
- SME Security Assessment
- DDoS Traffic Classification
- System Anatomy
- Technical Breakdown
- Evidence
- Methodology & Limitations

Use the same names across navigation, headings, page metadata, and project previews.

Do not introduce competing labels for the same project.

---

# 22. Explicit Anti-Patterns

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
- Animated text entrances.
- Unsupported live telemetry claims.
- Decorative charts without real data.
- Fake dashboards.
- Duplicated technical scenes.
- Forced fixed-height text containers.
- Project content hidden behind inaccessible controls.
- New frameworks without demonstrated need.
- Entirely new model designs when the task is only to modify surrounding UI.

Avoid rebuilding functional components for cosmetic changes.

**Prefer targeted improvements over unnecessary rewrites.**

---

# 23. Historical Decisions Preserved

## 18 October 2026 — Hero Simplification

Approved:

- Smaller headline.
- Short introduction.
- Clear eyebrow.
- Two balanced headline lines.
- Existing hero animation.
- DM Sans italic emphasis.
- Improved responsive wrapping.

These remain approved.

## 19 October 2026 — Permanently Exploded Systems

Approved:

- Permanently separated models.
- Genuine 3D perspective.
- Continuous source-grounded processing sequences.
- No collapse/reassembly.
- Source-linked inspection.
- Independent process clocks.
- Keyboard and touch controls.

These remain approved.

## 20 October 2026 — White Canvas + Floating Navy

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

## 21 October 2026 — Borderless Technical Scenes

Approved:

- Remove the outer dark-blue cards from technical visualizations.
- Preserve 3D model colors and visual detail.
- Keep the underlying rendering behavior unchanged.
- Apply consistent light-page composition across projects.

This supersedes earlier requirements for dark, bounded outer technical environments.

## 21 October 2026 — Project-First Navigation

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

---

# 24. Implementation Plan — Pending Work

The architecture described above is approved but must be implemented and verified.

## Phase 1 — Preserve the Existing Site

Before restructuring:

- Confirm the latest repository version.
- Create a recoverable backup or Git branch.
- Record the existing navigation and behavior.
- Inventory all evidence and model assets.
- Identify shared dependencies.
- Ensure no source assets will be accidentally deleted.

## Phase 2 — Create Shared Multipage Structure

Implement:

- Short homepage.
- Dedicated My Work page.
- Three dedicated project pages.
- Shared navigation.
- Shared footer.
- Correct relative asset paths.

Keep the existing design system.

## Phase 3 — Move Existing Project Experiences

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

## Phase 4 — Implement Visual Selection

Create the three visual project entries.

Reuse existing preview illustrations or carefully adapted lightweight alternatives.

Ensure the Work selection page does not initialize unnecessary heavy project renderers.

## Phase 5 — Apply Borderless Visual Composition

Remove unwanted outer card styling.

Preserve original model materials, geometry, and animation.

Check label and connector visibility against the light background.

Avoid broad CSS overrides.

## Phase 6 — Complete Responsive and Accessibility Testing

Test navigation, typography, project selection, technical scenes, evidence, keyboard interaction, touch behavior, and reduced motion.

## Phase 7 — Deploy and Verify

Publish the updated site.

Confirm direct project URLs, refresh behavior, assets, animations, evidence images, CV links, and contact actions.

Only mark the migration complete after confirming the required behavior.

---

# 25. Regression Checklist

Every future substantial change must be checked against this list.

## Architecture

- Homepage remains short and focused.
- Explore My Work opens the selection page.
- All three project selections navigate correctly.
- Dedicated pages load directly.
- Back to Work works.
- Next Project works.
- No irrelevant project content is displayed.

## Visual Consistency

- Light page background.
- Floating navy header/footer.
- Original 3D model colors.
- No large blue visualization cards.
- Consistent typography.
- Consistent spacing.
- Aligned content edges.
- No horizontal overflow.

## Animation

- Hero loop works.
- Wazuh process loop works.
- Network sequence works.
- Directory sequence works.
- ML alternative cycle works.
- Animation timing remains independent of scrolling.
- Models remain separated.
- Camera rotation works.
- Component selection works.
- No unnecessary renderer runs offscreen.

## Evidence

- All twenty original thesis figures remain available.
- Original screenshots are not altered.
- Captions remain accurate.
- Source references remain accessible.
- Evidence browser works.
- Image enlargement works.
- No fabricated technical results.
- ML source limitations remain explicit.

## Accessibility

- Keyboard navigation works.
- Focus indicators remain visible.
- Touch scrolling works.
- Pinch zoom works.
- Reduced motion works.
- Canvas fallbacks exist.
- Dialog focus restoration works.
- Content remains readable under zoom.

## Responsive Design

Verify at:

- 360px.
- 390px.
- 768px.
- 1024px.
- 1440px.
- 1920px.
- Short landscape viewports.
- Enlarged text settings.

## Deployment

- All routes work on GitHub Pages.
- Nested asset paths resolve.
- CSS and JavaScript versions are current.
- CV downloads correctly.
- Contact links work.
- LinkedIn link works.
- Old links are handled appropriately.
- No credentials or sensitive unpublished data are exposed.

---

# 26. Verification Standards

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

---

# 27. Rules for Codex and Future Development

When working on this portfolio, Codex or any other development assistant must follow these requirements.

1. Read `design.md` before making substantial changes.
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
12. Update `design.md` whenever an approved decision changes architecture, visual style, motion, navigation, project scope, or evidence treatment.
13. Explain what existing decisions were retained, which were superseded, and why.
14. Report changed files and verification results after implementation.
15. Do not mark future work as completed before it has been implemented and tested.

**Primary development principle:**

Change only what is needed to deliver the approved experience. Preserve the working technical substance of the portfolio.

---

# 28. Final Design Objective

The completed portfolio should give visitors a clear, intentional journey.

**Homepage**

Meet Ahmed and understand his technical focus.

**My Work**

Choose which cybersecurity project to explore.

**Project Experience**

Understand the system through detailed, interactive technical visualizations.

**Technical Evidence**

Inspect original implementation material, source references, and limitations.

**Next Action**

Explore another project, download the CV, or make contact.

The website should remain:

- Visually clean.
- Technically credible.
- Professionally presented.
- Easy to navigate.
- Immersive without being overwhelming.
- Consistent across every page.
- Maintainable as new projects are added.

**Final principle:** The portfolio exists to demonstrate cybersecurity work. Design, animation, and interaction should make that work easier to understand and verify—not compete with it.
## 29. Terminal Entrance and 3D Hero Reveal — Updated 21 October 2026

**Status:** Approved design behavior. Visual reveal implementation defined; network renderer synchronization requires integration.

### Homepage startup sequence

1. Start the existing terminal typing animation.
2. Complete the command, headline, introduction, and location text.
3. Allow a short transition into the technical visualization.
4. Reveal the network figure with a smooth upward movement and scale transition lasting approximately 850ms.
5. Start the network process sequence from its initial phase after the figure is revealed.
6. Continue the existing 18-second automatic network loop without repeating the terminal introduction.

### Visual rules

- Make the desktop network figure approximately 12% wider, subject to responsive layout and overflow testing.
- Preserve the white canvas and floating navy design.
- Preserve the original network geometry, model colors, and animation.
- Do not introduce dark outer cards, decorative glow, spinning entrances, or bounce effects.
- Keep the existing layout on smaller screens unless responsive testing justifies a change.

### Interaction and accessibility

- Navigation, contact, and CV controls remain usable immediately.
- Terminal typing runs once per page load.
- The figure reveal runs once per page load.
- The network process then loops independently.
- Respect reduced-motion preferences.
- Do not hide content permanently if JavaScript fails.
- Maintain natural page scrolling and functional Canvas interactions.

### Sitewide consistency

Use the same terminal typing pattern for short introductory text on My Work and dedicated project pages.

Reserve the expanding 3D reveal for pages with meaningful technical visualizations. Do not automatically apply the hero effect to every image or project preview.

**Design principle:** The introduction establishes identity; the visualization demonstrates technical work. Motion should create a deliberate transition between the two rather than compete for attention.

## 30. Homepage System Initialization + Signal Workflow — 21 October 2026

**Status: Approved homepage hero behavior.**

### Direction

The homepage hero now uses a two-stage motion system:

1. **System initialization** on first page load.
2. **Signal workflow loop** as the persistent hero animation.

The terminal typing introduction remains the first interaction. Once typing is complete, the network figure is revealed through a system-initialization sequence. After initialization, the figure transitions into a repeating signal workflow.

### Timing

**First-load sequence target:** approximately 13.5 to 14 seconds total.

- Terminal typing completes first.
- System initialization: approximately 1.8 seconds.
- Signal workflow: approximately 11.7 seconds.

**Repeating loop after first load:** signal workflow only, approximately 11.7 seconds.

### System initialization

System initialization is a one-time reveal and must not repeat in every cycle.

Stages:
- Short pause after typing.
- Wireframe / scanline reveal.
- Existing 3D network resolves into full form.
- One subtle activation pulse.
- Transition into signal workflow.

### Signal workflow

The repeating hero workflow follows this sequence:

1. Endpoint signal appears.
2. Signal travels through network context.
3. Identity / context layer activates.
4. Evidence / analyst destination activates.
5. Reset active highlights and repeat.

The full signal workflow loop should remain between 12 and 15 seconds, with the preferred active loop around 11.7 to 12 seconds.

### Visual rules

- Preserve the existing 3D model and color palette.
- Preserve the white canvas and floating navy interface.
- Use amber for the active moving signal.
- Keep the structure visible throughout the loop.
- Do not collapse or rebuild the model during reset.
- Do not replay terminal typing automatically.
- Do not add excessive glow, bounce, or decorative particles.

### Interaction

- Terminal typing runs once on page load.
- System initialization runs once after typing.
- Signal workflow loops continuously afterward.
- Reduced-motion users should see the fully visible figure without staged animation.

## 31. Homepage Hero Concept — Exploded Digital Investigation — 21 October 2026

**Status: Approved homepage visual direction.**

### Direction

Replace the previous abstract network-node hero visualization with a new homepage hero concept titled **Exploded Digital Investigation**.

This figure becomes the signature visual for the homepage.

### Purpose

The homepage hero must communicate Ahmed’s core cybersecurity identity through a visual investigation workflow rather than a generic network diagram.

The visual should show how an event moves through a security workflow and becomes reviewable evidence.

### Structure

The hero figure uses a permanently exploded 3D composition made of five conceptual modules:

1. Endpoint source
2. Collection / telemetry layer
3. Detection / processing engine
4. Context / enrichment layer
5. Evidence / analyst destination

These modules remain separated in space and do not collapse into one object.

### Motion

The homepage hero uses three motion stages:

1. Terminal typing intro
2. One-time system initialization
3. Repeating investigation workflow loop

### Timing

- System initialization: approximately 1.6 seconds
- Investigation workflow loop: approximately 12 to 13 seconds
- Reset: approximately 1 second
- Initialization runs only once
- Workflow loop repeats continuously

### Workflow sequence

The looping workflow follows this order:

1. Endpoint event
2. Telemetry collection
3. Detection / processing
4. Context enrichment
5. Evidence / analyst review
6. Reset

### Visual rules

- Preserve white canvas and floating navy interface
- Use navy, steel, graphite, cyan, and amber accents
- Use amber for the moving active signal
- Keep the model borderless with no dark card container
- Preserve a premium technical product-visualization feel
- Avoid exaggerated glow, spinning, or decorative effects
- Preserve subtle pointer-responsive floating 3D inspection

### Interaction

- The figure remains stable and readable
- Pointer movement may gently influence camera angle
- The model must feel like a technical system, not a decorative gadget
- Reduced-motion users should see the figure without staged motion

### Important distinction

This homepage hero is a conceptual portfolio visualization. It should not be presented as a literal reproduction of any one implementation or a claim of live telemetry.

## 32. Sitewide Design and Terminal Contract

**Approved: 21 October 2026**

The completed homepage is the visual reference for My Work
and every subsequent cybersecurity project page.

### Source of truth

- `design-system.css`: fonts, colors, type scales,
  spacing, control sizes, and accessibility defaults.
- `styles.css`: shared header, footer, site layout,
  responsive navigation, and major components.
- Page-specific CSS: composition only, scoped using
  the page's body class.
- Always reuse the established tokens.
- Avoid introducing independent design systems.

### Typography

- DM Sans: headings, introductions, body paragraphs.
- IBM Plex Mono: terminal text, eyebrow labels,
  technical metadata, technology lists.
- Page H1: 32–40px, weight 500, line-height 1.15.
- Project H2: 26–32px, weight 500, line-height 1.15.
- Technical H3: 20px.
- Body text: 16px, line-height 1.65.
- Controls: 14px.
- Technical metadata: 12px.

Both lines of a multi-line heading must use the same
primary navy color. The secondary line may be italic,
but must not switch to teal, use a gradient, or
introduce a different font.

### Shared colors

- Canvas: #F7F9FA
- Primary navy: #142B3C
- Interactive accent: #2B6678
- Cyan technical accent: #A6D9E2
- Secondary text: #526978
- Functional borders: #D8E3E9

Use semantic CSS variables instead of repeating raw
hex values in page-specific CSS.

### Terminal introduction

Use the established terminal-type.js and
terminal-type.css files.

The introduction order is:

1. Terminal command.
2. Eyebrow / technical category.
3. Main heading first line.
4. Main heading italic second line.
5. Introductory paragraph.

Typing occurs once per page load and remains visible.
Never make navigation or accessibility dependent on
the typing animation.

Reduced-motion users receive readable static text.

### Site structure

Preserve the existing:

- White canvas.
- Floating navy header and footer.
- Shared page grid and spacing.
- Contact information.
- Download CV action.
- Accessible mobile navigation.
- Natural page scrolling.
- Consistent focus indicators.

Do not create generic cards, decorative gradients,
unnecessary shadows, fake statistics, or repeated
full-size 3D renderers.

### My Work

The approved page uses three open technical showcases:

- Detection Engineering
- SME Security Assessment
- DDoS Traffic Classification

They must reflect the design and technical subject of
the corresponding project pages.

Use lightweight illustrative previews only.
Do not treat illustrations as recorded evidence.

### Future development

Before finalizing any page, verify:

- Fonts and heading hierarchy match the homepage.
- Heading colors are consistent.
- All typography uses shared design tokens.
- Header and footer match.
- Layout works on desktop, tablet, and mobile.
- Terminal typing follows the same behavior.
- No unsupported technical claims were introduced.
- All page links and assets resolve correctly.

Record every subsequent approved design change
in design.md before treating it as final.



## 33. Wazuh Dedicated Project Page — 21 October 2026

**Status:** Dedicated page implementation prepared.
Final browser and renderer integration remain to be verified.

### 33.1 Design consistency

The Wazuh page uses the same design language as
the completed homepage and My Work page.

Files:
- dist/work/wazuh.html
- dist/work/wazuh.css

Reuse:
- design-system.css
- styles.css
- terminal-type.css
- terminal-type.js
- anatomy.css
- anatomy.js
- system-sequences.js
- evidence.css
- evidence.js

Do not create a separate visual theme.

Use:
- White canvas: #F7F9FA
- Floating navy header and footer: #142B3C
- Shared interactive accent: #2B6678
- DM Sans for heading and reading typography
- IBM Plex Mono for technical metadata and terminal text
- Shared spacing, control and typography CSS variables

Project styles must be scoped under .page-wazuh.

### 33.2 Typography and terminal introduction

H1:
- var(--type-section)
- var(--leading-title)
- var(--tracking-title)
- Weight 500
- Primary navy on both lines

H2:
- var(--type-feature)
- var(--leading-title)

H3:
- var(--type-card)
- var(--leading-card)

Body:
- var(--text-base)
- var(--leading-body)

Metadata:
- var(--text-xs)
- var(--leading-meta)
- IBM Plex Mono

Follow the homepage terminal introduction:

1. $ cat detection.txt
2. Project category
3. Wazuh Detection
4. Engineering. (italic, same navy color)
5. Short introductory paragraph

The terminal animation runs once and remains visible.
Use the existing terminal-type.js.
Do not create a new typing animation implementation.

Keep navigation usable during typing.
Respect reduced-motion preferences.

### 33.3 Project structure

Follow this exact section order:

1. Terminal introduction and project scope
2. Interactive exploded System Anatomy
3. Technical breakdown
4. Original evidence gallery
5. Methodology and limitations
6. Project navigation
7. Shared contact footer

Use normal scrolling.
Do not pin the entire page or control the workflow through
the visitor's scroll position.

### 33.4 Original Wazuh 3D visualization

Preserve the existing permanently exploded system model.

Do not replace the model with:
- Flat boxes connected by lines
- A generic node cloud
- An illustrative image
- A new unrelated Three.js architecture
- A simplified diagram that loses original components

Keep the original:
- Camera interaction
- Model materials
- Exploded geometry
- Component inspection
- Source-linked explanations
- Touch and keyboard interactions
- Automatic workflow playback

This dedicated page displays the Wazuh model only.
SME network and directory models belong on their own page.

The anatomy.js integration retains original DOM hooks:
- #anatomy-explorer
- .anatomy-stage canvas
- .anatomy-inspector
- .anatomy-part-list
- .sequence-readout
- .sequence-transcript

The existing JavaScript must initialize correctly
when loaded from the dedicated /work/wazuh.html route.

### 33.5 Wazuh workflow

Retain the nine-stage process:

1. Record Linux runtime activity.
2. Collect the runtime event.
3. Receive the event at the manager.
4. Decode the Tetragon JSON.
5. Evaluate rule 732011.
6. Form a structured alert.
7. Make the alert searchable through indexing.
8. Display the selected alert in the dashboard.
9. Present the record for analyst review.

Total duration: 48 seconds.

One amber event marker represents the evolving record.
The complete animation runs automatically.

The system components remain permanently separated.
At the end of the sequence, reset only the moving marker.
Do not collapse and rebuild the architecture.

The animated workflow must not depend on scrolling.

### 33.6 Technical evidence boundaries

Preserve:

- Figure 59 supports the recorded rule 732011 event.
- Observed rule level: 13.
- ATT&CK mapping: T1053.003 / Cron.
- Configured child decoder: tetragon-json.
- Observed decoder field: decoder.name=tetragon-base.
- Figure 56 supports collection configuration.
- Figure 43 documents the indexer's storage role.
- Figure 32 documents decoder configuration.

Do not conflate configured and observed decoder names.

Do not present an illustrative internal handoff as
a captured packet or transport trace.

MISP integration does not prove an IOC match
for this particular Tetragon event.

The recorded alert does not prove a confirmed incident.

The lab records:
- 14 functional checks
- 8 acceptance checks

These counts must not be presented as measured
detection accuracy, detection rate, or precision.

### 33.7 Original evidence

Retain the ten original source screenshots.

Lead with Figure 59, the expanded Wazuh event.

Preserve:
- Original image pixels
- Accurate image descriptions
- Figure references
- Source captions
- Existing image dialog
- Fit image control
- Original size control
- Close and Escape behavior
- Focus restoration, where supported

Use the existing evidence.js and evidence.css.

Evidence controls allow the visitor to select a figure.
Do not auto-cycle figures while the visitor reads.

Do not present generated illustration as source evidence.

Do not stack all ten full-resolution images vertically.

### 33.8 Responsive behavior

Desktop:
- Main 3D model beside the component inspector
- Model stage approximately 520px tall
- Clear source-evidence navigation

Narrow desktop:
- Maintain readable model and inspector
- Stage approximately 440px tall

Tablet:
- Stack inspector beneath the model
- Preserve comfortable reading widths

Mobile:
- Stage approximately 420px tall
- Preserve touch-based camera inspection
- Allow native vertical scrolling and pinch
- Avoid horizontal page overflow

No card-like dark enclosure around the model.

Use page-specific CSS for layout composition only;
continue using shared design tokens for typography
and UI controls.

### 33.9 Navigation and footer

Use consistent routes:

Home:
../index.html

Back to Work:
index.html

Next Project:
assessment.html

Contact:
#contact

CV:
../assets/ahmed-ali-ahmed-cv.pdf

The project page may retain Back to top because
it is significantly longer than the homepage.

The floating navy header and contact footer
must match the completed homepage.

### 33.10 Verification requirements

Before calling this project page finalized:

1. Confirm anatomy.js initializes from /work/wazuh.html.
2. Confirm the original 3D model renders.
3. Confirm all nine stages and 48-second timing.
4. Verify model drag, touch, arrow keys and Home reset.
5. Verify component selection and source-linked inspection.
6. Verify all ten evidence image assets load.
7. Verify the image viewer and keyboard controls.
8. Verify terminal typing and reduced motion.
9. Verify project navigation and contact links.
10. Verify desktop, tablet and mobile layout.
11. Verify deployment under the GitHub Pages subpath.
12. Confirm all statements remain source-grounded.

Do not claim a successful live test unless the page
and original scripts have actually been tested.

### 33.11 Rules for future project pages

SME Security Assessment and DDoS Classification must reuse:

- The same floating header and footer
- The same typography scale
- The same colors and CSS design tokens
- The same terminal introduction structure
- The same section hierarchy
- The same evidence interaction pattern
- The same responsive reading behavior
- The same Back to Work / Next Project navigation

Only project-specific technical visualizations and
source-supported content should differ.

Any subsequent approved change must be documented
in design.md before that page is finalized.


## 34. Project Page Content Simplification

**Approved direction: Portfolio-first presentation**

All dedicated project pages should focus primarily on:

1. What the project is.
2. What I built or achieved.
3. What I learned.
4. A meaningful technical visualization.
5. Optional original implementation evidence.

### Writing standards

- Use natural, professional first-person language.
- Keep introductions to one or two sentences.
- Present three concise, meaningful achievements.
- Explain practical technical learning outcomes.
- Avoid academic-report language in primary content.
- Do not emphasize university, thesis or project
  classification labels.
- Avoid long methodology explanations in the main layout.
- Do not repeat the same technical explanation across sections.
- Do not invent metrics or overstate outcomes.

### Technical detail

Detailed workflows, original evidence, source references
and limitations must remain accessible where relevant.

Place optional technical details in expandable sections
or evidence viewers rather than overwhelming the page.

### Visual consistency

Preserve the approved typography, white canvas,
floating navy header/footer, terminal introduction,
spacing and technical visualizations.

### Apply to

- Wazuh Detection Engineering
- SME Security Assessment
- DDoS Traffic Classification
