/* Reading content is always visible. Elapsed time drives scene motion. */
(() => {
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let transition = null;
  const enabled = () => !reduced.matches;
  function stopTransition(completeClose = false) {
    const previous = transition; transition = null;
    if (!previous) return;
    clearTimeout(previous.timer); previous.animation?.cancel();
    if (completeClose && previous.done) previous.done();
  }
  function openDialog(dialog) {
    stopTransition();
    if (!enabled() || typeof dialog.animate !== 'function') return;
    const animation = dialog.animate([{opacity:0, transform:'translateY(12px)'}, {opacity:1, transform:'translateY(0)'}], {duration:220, easing:'ease-out'});
    transition = {animation};
    animation.finished.then(() => { if (transition?.animation === animation) transition = null; }, () => {});
  }
  function closeDialog(dialog, done) {
    if (transition?.done) return;
    stopTransition();
    if (!enabled() || typeof dialog.animate !== 'function') { done(); return; }
    const state = {done}; transition = state;
    const finish = () => {
      if (transition !== state) return;
      transition = null; clearTimeout(state.timer); state.animation?.cancel(); done();
    };
    state.animation = dialog.animate([{opacity:1}, {opacity:0}], {duration:140, easing:'ease-in'});
    state.timer = setTimeout(finish, 200);
    state.animation.finished.then(finish, finish);
  }
  function applyPreference() {
    const on = enabled();
    root.classList.toggle('motion-active', on); root.classList.toggle('motion-off', !on);
    if (!on) stopTransition(true);
    document.dispatchEvent(new CustomEvent('portfolio:motionchange', {detail:{enabled:on}}));
  }
  reduced.addEventListener('change', applyPreference);
  window.portfolioMotion = {openDialog, closeDialog, endDialog:() => stopTransition()};
  applyPreference();
})();
