# Ahmed Ali Ahmed — Security Fieldnotes

**Cybersecurity is about understanding what happens inside a system, recognizing what matters, and knowing how to respond.**

Security Fieldnotes is my personal cybersecurity portfolio, bringing together hands-on projects in detection engineering, security assessment, and network traffic analysis.

Rather than simply listing the tools I've used, this website shows the systems I've worked with, how they operate, and what I learned while building and exploring them.

**[Explore the Portfolio](https://ad-31.github.io/personal-portfolio/dist/)**

---

## The Work

Three projects, each exploring a different part of cybersecurity.

### 01 — Wazuh Detection Engineering

**From Linux activity to security investigation.**

Built a security monitoring workflow using Wazuh, Tetragon, custom detection rules, and runtime telemetry.

The project explores how security events are collected, decoded, correlated, and presented for investigation.

**What I worked on:** Endpoint monitoring, rule and decoder development, alert tuning, and security investigation workflows.

[Explore Detection Engineering](dist/work/wazuh.html)

### 02 — SME Security Assessment

**Understanding exposure before it becomes a security problem.**

Assessed a simulated SME environment to investigate network accessibility, exposed services, and Active Directory privilege relationships.

The project uses tools including pfSense, BloodHound, and CALDERA to explore network segmentation, directory permissions, and controlled security validation.

**What I worked on:** Network assessment, directory privilege analysis, and identifying potential security weaknesses.

[Explore Security Assessment](dist/work/assessment.html)

### 03 — DDoS Traffic Classification

**Exploring how network traffic can be classified using machine learning.**

Investigated preprocessing, feature engineering, and alternative machine-learning approaches for classifying DDoS-related network traffic.

The workflow explores Random Forest, SVM, and XGBoost as separate model candidates, with attention to how classification performance should be evaluated.

**What I worked on:** Traffic preparation, feature engineering, model comparison, and evaluation principles.

[Explore Traffic Classification](dist/work/ddos.html)

---

## More Than Static Project Pages

I wanted this portfolio to communicate the technical work visually, without turning each project into a lengthy report.

Every project has its own visualization, designed to make the underlying security process easier to understand.

- **Homepage:** An animated network transitions between a spherical structure and endpoint, network, and identity layers.
- **Detection Engineering:** A monitoring architecture illustrates the relationship between telemetry sources, detection processing, and analyst investigation.
- **Security Assessment:** Interactive views explore network zones and Active Directory privilege relationships.
- **DDoS Classification:** An abstract 3D workflow illustrates traffic preparation, alternative classifiers, and evaluation.

The visualizations are interactive, but they don't require interaction to understand the overall project.

The portfolio uses a consistent design throughout: an off-white canvas, floating navy navigation, minimal content, and technical visuals presented without unnecessary interface clutter.

## How It's Built

The entire website is built with **HTML, CSS, and vanilla JavaScript**.

There are no frontend frameworks, production package dependencies, databases, or backend services.

| Technology | Purpose |
|---|---|
| HTML5 | Semantic page structure and accessible content |
| CSS3 | Design system, responsive layouts, and animations |
| JavaScript | Navigation, terminal introductions, and interaction |
| Canvas API | Interactive technical visualizations |
| SVG | Lightweight architectural illustrations |
| DM Sans | Main typography |
| IBM Plex Mono | Terminal and technical typography |

The animations use the browser's native rendering capabilities. The website is designed to remain lightweight, responsive, and usable across desktop and mobile devices.

Motion preferences are respected, and interactive visualizations provide accessible descriptions and keyboard support where applicable.

## Portfolio Structure

The website follows a straightforward five-page architecture.

| Page | Purpose |
|---|---|
| `dist/index.html` | Homepage and introduction |
| `dist/work/index.html` | Overview of the three projects |
| `dist/work/wazuh.html` | Detection Engineering |
| `dist/work/assessment.html` | SME Security Assessment |
| `dist/work/ddos.html` | DDoS Traffic Classification |

Shared styling, scripts, fonts, and assets live inside `dist/`.

The main supporting files are:

- `design.md` — Website-wide design specifications and approved decisions.
- `dist/design-system.css` — Shared typography, colors, spacing, and controls.
- `dist/anatomy.js` — Interactive Wazuh and assessment models.
- `dist/project-diagrams.js` — Machine-learning workflow visualization.
- `dist/network.js` — Animated homepage network.
- `dist/system-sequences.js` — Technical visualization sequences.
- `dist/assets/evidence/` — Original project screenshots and supporting visuals.
- `evidence-sources.json` and `process-evidence.md` — Supporting evidence references and technical interpretation notes.

## Run Locally

No installation or build process is required.

**1. Clone the repository**

`git clone https://github.com/AD-31/personal-portfolio.git`

**2. Enter the project folder**

`cd personal-portfolio`

**3. Start a local server**

`python -m http.server 8000 --bind 127.0.0.1 --directory dist`

**4. Open the website**

[http://127.0.0.1:8000/](http://127.0.0.1:8000/)

Python is only used here to serve the static files locally. It is not part of the production website.

## Evidence and Technical Accuracy

The goal of this portfolio is to demonstrate actual technical work without overstating results.

The visualizations are **illustrative representations of technical systems**, not live telemetry, physical hardware inventories, or captured attack replays.

Original screenshots are included where available. Some supporting technical documentation is retained in the repository for context and provenance.

For the DDoS project, the original implementation files are unavailable. The visualization therefore illustrates the documented workflow without inventing accuracy scores, predictions, or performance measurements.

Security assessment findings are presented in the context of a controlled lab environment, without treating potential exposure as proof of exploitation.

Sensitive configurations, credentials, and unrelated private research materials are not intended for publication.

## Design Philosophy

The website is built around three principles:

**Show the work.** Technical visualizations should communicate meaningful processes rather than exist purely for decoration.

**Keep it focused.** Short explanations, consistent layouts, and minimal distractions allow visitors to understand each project quickly.

**Stay accurate.** Clearly distinguish implemented work, conceptual illustrations, original evidence, and lessons learned.

The complete visual and interaction specification is maintained in [`design.md`](design.md).

---

## Connect

I'm interested in cybersecurity, security operations, detection engineering, and the technologies that make security processes more effective.

If you'd like to discuss the projects, share feedback, or connect professionally:

- **Email:** [ahmed.ali.ahmed3110@gmail.com](mailto:ahmed.ali.ahmed3110@gmail.com)
- **LinkedIn:** [Ahmed Ali Ahmed](https://www.linkedin.com/in/ahmed-ali-ahmed-a91664334)
- **Portfolio:** [Security Fieldnotes](https://ad-31.github.io/personal-portfolio/dist/)

---

*Built and maintained by Ahmed Ali Ahmed · Bahrain*