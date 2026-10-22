
(() => {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const elements = [...document.querySelectorAll("[data-terminal]")];
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  const jobs = elements.map(el => {
    const originalLabel = el.getAttribute("aria-label");

    const reserve = document.createElement("span");
    reserve.className = "terminal-reserve";
    reserve.setAttribute("aria-hidden", "true");

    while (el.firstChild) reserve.append(el.firstChild);

    const visual = reserve.cloneNode(true);
    visual.className = "terminal-visual";

    const walker = document.createTreeWalker(
      visual, NodeFilter.SHOW_TEXT
    );

    const letters = [];
    let node;

    while ((node = walker.nextNode())) {
      const content = node.textContent;
      node.textContent = "";
      for (const char of content) letters.push([node, char]);
    }

    if (originalLabel === null) {
      el.setAttribute("aria-label", reserve.textContent.trim());
    }

    el.classList.add("terminal-target");
    el.append(reserve, visual);

    return { el, reserve, letters, originalLabel };
  });

  async function start() {
    await wait(300);

    for (const job of jobs) {
      const caret = document.createElement("span");
      caret.className = "terminal-caret";
      caret.setAttribute("aria-hidden", "true");

      for (const [node, char] of job.letters) {
        node.textContent += char;
        node.after(caret);

        const speed = char === " " ? 12 :
          /[.!?]/.test(char) ? 130 :
          18 + Math.random() * 22;

        await wait(speed);
      }

      caret.remove();

      job.el.replaceChildren(...job.reserve.childNodes);
      job.el.classList.remove("terminal-target");

      if (job.originalLabel === null)
        job.el.removeAttribute("aria-label");
      else
        job.el.setAttribute("aria-label", job.originalLabel);

      await wait(180);
    }
  }


start()
  .catch(console.error)
  .finally(() => {
    document.documentElement.classList.remove("hero-intro-pending");
    document.documentElement.classList.add("hero-intro-finished");

    window.dispatchEvent(new Event("hero:intro-complete"));
  });

})();
