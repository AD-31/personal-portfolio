/* Canvas scenes read the same palette and typefaces as the interface. */
(() => {
  const styles = getComputedStyle(document.documentElement);
  const names = ['bg','surface','surface-raised','surface-hover','surface-active','ink','body','muted','border','border-strong','cyan','violet','mint','amber','blue','paper','black'];
  const rootSize = parseFloat(styles.fontSize) || 16;
  const type = {
    labelSize:parseFloat(styles.getPropertyValue('--text-sm')) * rootSize,
    metaSize:parseFloat(styles.getPropertyValue('--text-xs')) * rootSize,
    fontBody:styles.getPropertyValue('--font-body').trim(),
    fontMono:styles.getPropertyValue('--font-mono').trim()
  };
  function palette(prefix) {
    const rgb = {}, color = {};
    for (const name of names) {
      rgb[name] = styles.getPropertyValue(`--${prefix}rgb-${name}`).trim().split(/\s+/).join(',');
      color[name] = `rgb(${rgb[name]})`;
    }
    return Object.freeze({...type, rgb:Object.freeze(rgb), color:Object.freeze(color),
      series:Object.freeze(['cyan','violet','mint','amber','blue'].map(name=>rgb[name]))});
  }
  // Existing technical renderers retain their dark environment contract.
  window.FieldnotesTheme = Object.freeze({...palette('scene-'), light:palette('')});
})();
