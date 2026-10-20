/* One project at a time. Evidence navigation is manual; model clocks remain independent. */
(() => {
  const work = document.querySelector('#work');
  if (!work) return;
  const tabs = [...work.querySelectorAll('[data-work-tab]')];
  const panels = [...work.querySelectorAll('[data-project-panel]')];
  const galleries = [...work.querySelectorAll('[data-evidence-gallery]')];
  const anatomy = work.querySelector('#system-anatomy');
  const modelTabs = anatomy.querySelector('.anatomy-tabs');
  const projectForHash = {detection:'clp',assessment:'assessment',classification:'ml','wazuh-evidence':'clp','assessment-evidence':'assessment'};
  let active = 'clp', assessmentModel = 'network';

  galleries.forEach(gallery => {
    const figures = [...gallery.querySelectorAll('[data-evidence-slide]')];
    const select = gallery.querySelector('select');
    const count = gallery.querySelector('[data-evidence-count]');
    let index = 0;
    figures.forEach((figure, i) => {
      const option = document.createElement('option');
      option.value = String(i); option.textContent = figure.querySelector('h4').textContent;
      select.append(option);
    });
    function show(next) {
      index = (next + figures.length) % figures.length;
      figures.forEach((figure, i) => figure.hidden = i !== index);
      select.value = String(index); count.textContent = `${index + 1} / ${figures.length}`;
    }
    select.addEventListener('change', () => show(Number(select.value)));
    gallery.querySelector('[data-evidence-prev]').addEventListener('click', () => show(index - 1));
    gallery.querySelector('[data-evidence-next]').addEventListener('click', () => show(index + 1));
    gallery.querySelector('.evidence-browser').hidden = false;
    gallery.classList.add('evidence-paged'); gallery.showFigure = show;
    const featured = figures.findIndex(figure => figure.querySelector('[data-evidence="wazuh-runtime-record"]'));
    show(featured >= 0 ? featured : 0);
  });

  function choose(key) {
    if (!tabs.some(tab => tab.dataset.workTab === key)) return;
    active = key;
    tabs.forEach(tab => {
      const selected = tab.dataset.workTab === key;
      tab.setAttribute('aria-selected', String(selected)); tab.tabIndex = selected ? 0 : -1;
    });
    panels.forEach(panel => {
      panel.hidden = panel.dataset.projectPanel !== key;
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', `work-tab-${panel.dataset.projectPanel}`);
      panel.tabIndex = 0;
    });
    galleries.forEach(gallery => gallery.hidden = gallery.dataset.evidenceGallery !== key);
    anatomy.hidden = key === 'ml';
    if (key !== 'ml') {
      window.FieldnotesAnatomy?.selectModel(key === 'clp' ? 'detection' : assessmentModel);
      modelTabs.hidden = key !== 'assessment';
      modelTabs.querySelectorAll('[data-anatomy-model]').forEach(button => button.hidden = button.dataset.anatomyModel === 'detection');
    }
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => choose(tab.dataset.workTab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault(); choose(tabs[next].dataset.workTab); tabs[next].focus();
    });
  });
  document.addEventListener('portfolio:modelchange', event => {
    if (event.detail.model !== 'detection') assessmentModel = event.detail.model;
  });
  function revealTarget(id) {
    const key = projectForHash[id];
    if (!key) return;
    choose(key);
    const figure = document.getElementById(id);
    const gallery = figure?.closest('[data-evidence-gallery]');
    if (gallery) gallery.showFigure([...gallery.querySelectorAll('[data-evidence-slide]')].indexOf(figure));
  }
  const followHash = () => revealTarget(location.hash.slice(1));
  // Reveal an addressed panel before the browser's normal anchor navigation.
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (link) revealTarget(link.getAttribute('href').slice(1));
  });
  window.addEventListener('hashchange', followHash);
  const tablist = work.querySelector('.work-tabs');
  const narrow = matchMedia('(max-width:700px)');
  const orient = () => tablist.setAttribute('aria-orientation', narrow.matches ? 'vertical' : 'horizontal');
  narrow.addEventListener('change', orient); orient();
  tablist.hidden = false;
  choose(projectForHash[location.hash.slice(1)] || active);
  // This only compensates for an initially hidden deep-link target becoming visible.
  if (projectForHash[location.hash.slice(1)]) requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView({block:'start'}));
})();
