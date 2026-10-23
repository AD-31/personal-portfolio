
/*
 * PORTFOLIO ENTRANCE SYSTEM
 *
 * Only the terminal command is typed.
 * Headings and reading content use short float-up reveals.
 *
 * Shared by:
 * - Home
 * - My Work
 * - Wazuh Detection Engineering
 * - SME Security Assessment
 * - DDoS Traffic Classification
 * - SOC Automation
 *
 * No external dependencies.
 */

(() => {
  "use strict";

  const root = document.documentElement;

  const reducedQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  const pause = ms =>
    new Promise(resolve =>
      window.setTimeout(resolve, ms)
    );

  /*
   * Previous pages marked headings, introductions
   * and other text with data-terminal.
   *
   * Keep that attribute only on the terminal command.
   * No page-specific HTML changes are required.
   */

  document
    .querySelectorAll(
      "[data-terminal]:not(.terminal-command)"
    )
    .forEach(element => {
      element.removeAttribute("data-terminal");
    });

  /* ==========================================
     INTRODUCTION ELEMENTS
     ========================================== */

  const introSelectors = [
    // Homepage
    ".page-home .hero-eyebrow",
    ".page-home .hero h1",
    ".page-home .hero-intro",
    ".page-home .hero-actions",
    ".page-home .hero-location",

    // My Work
    ".page-work .work-intro h1",
    ".page-work .work-lede",

    // Detection Engineering
    ".page-wazuh .wazuh-intro h1",
    ".page-wazuh .wazuh-lede",

    // Assessment, DDoS and SOC Automation
    ".page-case .case-intro h1",
    ".page-case .case-lede"
  ];

  /* ==========================================
     SCROLL-REVEALED READING CONTENT
     ========================================== */

  const sectionSelectors = [
    "main > section > h2:not(.sr-only)",

    // Work gallery
    "main .work-project",

    // Project contributions
    "main .wazuh-columns > section",
    "main .case-columns > section",

    // Optional detailed SOC workflow content
    "main .soc-process-grid > div",

    // Lessons learned
    "main .wazuh-learning-copy",
    "main .case-learning-copy",

    // Evidence
    "main .wazuh-proof",
    "main .case-proof",
    "main .soc-proof",
    "main .soc-source-note",

    // Shared footer
    "footer .contact-copy > h2",
    "footer .contact-actions",
    "footer .email-address"
  ];

  function isEligible(element) {
    return !element.closest(
      '[hidden], [aria-hidden="true"], .sr-only'
    );
  }

  const intro = [
    ...document.querySelectorAll(
      introSelectors.join(",")
    )
  ].filter(isEligible);

  const sections = [
    ...document.querySelectorAll(
      sectionSelectors.join(",")
    )
  ].filter(element => {
    return (
      isEligible(element) &&
      !intro.includes(element)
    );
  });

  /*
   * The animation is progressively enhanced.
   *
   * When JavaScript is disabled or fails before
   * initialization, all reading content is visible.
   */

  if (!reducedQuery.matches) {
    for (const element of [
      ...intro,
      ...sections
    ]) {
      element.classList.add("portfolio-reveal");
    }

    root.classList.add(
      "portfolio-reveal-ready"
    );
  }

  const show = element => {
    element.classList.add("is-visible");
  };

  let introDone = false;

  /* ==========================================
     INTRO COMPLETION
     ========================================== */

  function finishIntro() {
    if (introDone) return;

    introDone = true;

    /*
     * Preserve compatibility with the existing
     * homepage and project hero animations.
     */

    root.classList.remove(
      "hero-intro-pending"
    );

    root.classList.add(
      "hero-intro-finished"
    );

    /*
     * Headline, introduction and actions reveal
     * in order with a very short stagger.
     */

    intro.forEach((element, index) => {
      if (reducedQuery.matches) {
        show(element);
      } else {
        window.setTimeout(
          () => show(element),
          index * 55
        );
      }
    });

    window.dispatchEvent(
      new Event("hero:intro-complete")
    );
  }

  /* ==========================================
     SCROLL REVEALS
     ========================================== */

  function revealSectionContent() {
    if (
      reducedQuery.matches ||
      !("IntersectionObserver" in window)
    ) {
      sections.forEach(show);
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          show(entry.target);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -20px 0px"
      }
    );

    sections.forEach((element, index) => {
      const delay =
        Math.min(index % 3, 2) * 45;

      element.style.setProperty(
        "--portfolio-reveal-delay",
        `${delay}ms`
      );

      observer.observe(element);
    });

    /*
     * Keyboard focus must never land in a visually
     * hidden project, link, or reading section.
     */

    document.addEventListener(
      "focusin",
      event => {
        const target = event.target;

        if (!(target instanceof Element)) {
          return;
        }

        const parent = target.closest(
          ".portfolio-reveal"
        );

        if (parent) {
          show(parent);
        }
      }
    );
  }

  revealSectionContent();

  /* ==========================================
     TERMINAL COMMAND ONLY
     ========================================== */

  const commands = [
    ...document.querySelectorAll(
      ".terminal-command[data-terminal]"
    )
  ];

  function prepareCommand(element) {
    const originalLabel =
      element.getAttribute("aria-label");

    /*
     * Keep the original DOM in a hidden reserve
     * so text animation doesn't move the layout.
     */

    const reserve =
      document.createElement("span");

    reserve.className = "terminal-reserve";

    reserve.setAttribute(
      "aria-hidden",
      "true"
    );

    while (element.firstChild) {
      reserve.append(element.firstChild);
    }

    /*
     * The visible duplicate is the only content
     * gradually revealed during typing.
     */

    const visual = reserve.cloneNode(true);

    visual.className = "terminal-visual";

    const walker =
      document.createTreeWalker(
        visual,
        NodeFilter.SHOW_TEXT
      );

    const characters = [];

    let node;

    while ((node = walker.nextNode())) {
      const original =
        node.textContent || "";

      node.textContent = "";

      for (const char of original) {
        characters.push([
          node,
          char
        ]);
      }
    }

    element.setAttribute(
      "aria-label",
      reserve.textContent.trim()
    );

    element.classList.add(
      "terminal-target"
    );

    element.append(
      reserve,
      visual
    );

    return {
      element,
      reserve,
      visual,
      characters,
      originalLabel
    };
  }

  /* ==========================================
     FAST TYPEWRITER EFFECT
     ========================================== */

  async function typeCommand(element) {
    const job = prepareCommand(element);

    const caret =
      document.createElement("span");

    caret.className =
      "terminal-caret";

    caret.setAttribute(
      "aria-hidden",
      "true"
    );

    try {
      for (
        const [textNode, char]
        of job.characters
      ) {
        textNode.textContent += char;

        textNode.after(caret);

        /*
         * Short, predictable timing.
         * No lengthy heading or paragraph typing.
         */

        const duration =
          char === " "
            ? 8
            : /[.!?]/.test(char)
              ? 35
              : 14;

        await pause(duration);
      }
    } finally {
      caret.remove();

      element.replaceChildren(
        ...job.reserve.childNodes
      );

      element.classList.remove(
        "terminal-target"
      );

      if (job.originalLabel === null) {
        element.removeAttribute(
          "aria-label"
        );
      } else {
        element.setAttribute(
          "aria-label",
          job.originalLabel
        );
      }
    }
  }

  /* ==========================================
     MOTION PREFERENCES
     ========================================== */

  const onPreferenceChange = () => {
    if (!reducedQuery.matches) {
      return;
    }

    root.classList.remove(
      "portfolio-reveal-ready"
    );

    [
      ...intro,
      ...sections
    ].forEach(show);

    finishIntro();
  };

  if (reducedQuery.addEventListener) {
    reducedQuery.addEventListener(
      "change",
      onPreferenceChange
    );
  } else if (reducedQuery.addListener) {
    reducedQuery.addListener(
      onPreferenceChange
    );
  }

  /* ==========================================
     START
     ========================================== */

  async function run() {
    if (
      !reducedQuery.matches &&
      commands.length
    ) {
      await pause(80);

      // Normally each page has one command.
      for (const command of commands) {
        await typeCommand(command);
      }
    }
  }

  run()
    .catch(error => {
      console.error(
        "Terminal intro:",
        error
      );
    })
    .finally(finishIntro);
})();
