/* A disclosure on narrow screens; all links remain visible without JavaScript. */
(() => {
  const header = document.querySelector('.site-header');
  const toggle = header?.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-navigation');
  if (!toggle || !nav) return;
  const narrow = matchMedia('(max-width:700px)');
  let expanded = false;
  function measure() {
    document.documentElement.style.setProperty('--header-height', `${header.getBoundingClientRect().height}px`);
  }
  function render() {
    toggle.hidden = !narrow.matches;
    nav.hidden = narrow.matches && !expanded;
    toggle.setAttribute('aria-expanded', String(narrow.matches && expanded));
    measure();
  }
  toggle.addEventListener('click', () => { expanded = !expanded; render(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && narrow.matches && expanded) {
      expanded = false; render(); toggle.focus();
    }
  });
  nav.addEventListener('click', event => {
    if (!narrow.matches || !event.target.closest('a')) return;
    expanded = false; render();
    // Anchor navigation keeps native scrolling. Focus follows same-page targets.
    const href = event.target.closest('a').getAttribute('href');
    const target = href.startsWith('#') && document.getElementById(href.slice(1));
    if (target) { target.setAttribute('tabindex', '-1'); target.focus({preventScroll:true}); }
    else toggle.focus();
  });
  narrow.addEventListener('change', () => {
    const focusWasInNav = nav.contains(document.activeElement);
    const toggleHadFocus = document.activeElement === toggle;
    expanded = false; render();
    if (narrow.matches && focusWasInNav) toggle.focus();
    if (!narrow.matches && toggleHadFocus) nav.querySelector('a').focus();
  });
  if ('ResizeObserver' in window) new ResizeObserver(measure).observe(header);
  else window.addEventListener('resize', measure, {passive:true});
  window.addEventListener('pageshow', render);
  render();
})();
