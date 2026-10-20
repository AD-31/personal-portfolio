/* An illustrative 3D network, projected onto Canvas. No telemetry is collected. */
(() => {
  const theme=window.FieldnotesTheme?.light||window.FieldnotesTheme; if(!theme)return;
  const canvas = document.querySelector('#network-canvas');
  const ctx = canvas?.getContext('2d');
  if (!ctx) return;
  const root = document.documentElement;
  const visual = document.querySelector('.network-visual');
  const wrap = document.querySelector('.network-canvas-wrap');
  const header = document.querySelector('.site-header');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  const lerp = (a, b, t) => a + (b - a) * t;
  const smooth = x => { const t = clamp(x); return t * t * (3 - 2 * t); };
  let seed = 7348;
  const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  let width = 600, height = 490, progress = 0;
  let visible = !('IntersectionObserver' in window), frame = 0, lastFrame = 0, clock = 0, phase = -1;
  const cue = window.FieldnotesPlayback.cue();
  const pointerYaw=window.FieldnotesPlayback.spring(),pointerPitch=window.FieldnotesPlayback.spring();
  let pointerX=0,pointerY=0;
  const enabled = () => !reduce.matches && !root.classList.contains('motion-off');
  const colors = theme.series.slice(0,3);
  const centers = [[-.82, .44, 0], [.82, .44, 0], [0, -.7, 0]];
  const nodes = Array.from({ length: 75 }, (_, i) => {
    const group = Math.floor(i / 25), col = i % 5, row = Math.floor((i % 25) / 5);
    return {
      group, key: i % 25 === 12,
      cloud: [(random() - .5) * 2.7, (random() - .5) * 2, (random() - .5) * 2],
      layer: [(col - 2) * .45, (group - 1) * .78, (row - 2) * .4],
      cluster: [centers[group][0] + (col - 2) * .11, centers[group][1] + (row - 2) * .085, (random() - .5) * .15]
    };
  });
  const edges = [];
  nodes.forEach((node, i) => {
    if (i % 5 < 4) edges.push([i, i + 1]);
    if (i % 25 < 20) edges.push([i, i + 5]);
    if (i < 50 && i % 6 === 0) edges.push([i, i + 25]);
  });
  const dust = Array.from({ length: 500 }, (_, i) => ({
    node: i % nodes.length, offset: [(random() - .5) * .5, (random() - .5) * .5, (random() - .5) * .5],
    size: .35 + random() * .8, phase: random() * Math.PI * 2
  }));
  const route = [2, 7, 12, 37, 62];

  function setChapter(next) {
    if (next === phase) return;
    phase = next;
    visual.dataset.phase = String(next);
  }

  function requestFrame() {
    if (!frame && visible && !document.hidden) frame = requestAnimationFrame(tick);
  }

  function resize() {
    const bounds = wrap.getBoundingClientRect();
    width = Math.max(1, bounds.width);
    height = Math.max(1, bounds.height);
    const ratio = Math.min(window.devicePixelRatio || 1, 1.75);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    const headerHeight = header.getBoundingClientRect().height;
    root.style.setProperty('--header-height', `${headerHeight}px`);
    progress = enabled() ? window.FieldnotesPlayback.hero(clock) : .48;
    draw();
    requestFrame();
  }

  function project(point, yaw, pitch, scale) {
    const x = point[0] * Math.cos(yaw) + point[2] * Math.sin(yaw);
    const z0 = point[2] * Math.cos(yaw) - point[0] * Math.sin(yaw);
    const y = point[1] * Math.cos(pitch) - z0 * Math.sin(pitch);
    const z = point[1] * Math.sin(pitch) + z0 * Math.cos(pitch);
    const perspective = 4.4 / (4.4 - z);
    return { x: width * .5 + x * scale * perspective, y: height * .5 - y * scale * perspective, z, size: perspective };
  }

  function stroke(a, b, color, alpha, thickness = 1) {
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
    ctx.strokeStyle = `rgba(${color},${clamp(alpha)})`; ctx.lineWidth = thickness; ctx.stroke();
  }

  function signalMark(point, color, size, alpha) {
    ctx.beginPath(); ctx.arc(point.x, point.y, Math.min(5,size*.15), 0, Math.PI*2);
    ctx.fillStyle = `rgba(${color},${alpha})`; ctx.fill();
  }

  function label(text, point, color, offset = 18) {
    ctx.font = `${theme.metaSize}px ${theme.fontMono}`;
    const textWidth = ctx.measureText(text).width;
    const x = clamp(point.x + offset, 10, Math.max(10, width - textWidth - 20));
    const y = clamp(point.y - 12, 18, height - 16);
    ctx.fillStyle = `rgba(${theme.rgb['bg']},.9)`; ctx.fillRect(x - 6, y - 13, textWidth + 12, 21);
    ctx.fillStyle = `rgb(${color})`; ctx.fillText(text, x, y + 2);
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    const unfold = smooth(progress / .52);
    const converge = smooth((progress - .56) / .44);
    const idle = enabled() ? Math.sin(clock * Math.PI * 2 / 18000) * .075 : 0;
    const yaw = lerp(-.68 + unfold * .4 + idle, 0, converge) + pointerX;
    const pitch = lerp(.42 + unfold * .09 + idle * .4, 0, converge) + pointerY;
    let scale = Math.min(width * .325, height * .35) * lerp(.96, 1.08, converge);
    const p3 = nodes.map(node => node.cloud.map((value, axis) => lerp(lerp(value, node.layer[axis], unfold), node.cluster[axis], converge)));
    const planeAlpha = unfold * (1 - converge);
    const bounds=p3.slice();
    if(planeAlpha>.01)for(let group=0;group<3;group++)for(const x of [-1.05,1.05])for(const z of [-.95,.95])bounds.push([x,(group-1)*.78,z]);
    let extentX=1,extentY=1;
    bounds.forEach(point=>{const p=project(point,yaw,pitch,scale);extentX=Math.max(extentX,Math.abs(p.x-width/2));extentY=Math.max(extentY,Math.abs(p.y-height/2));});
    scale*=Math.min(1,Math.max(1,width/2-24)/extentX,Math.max(1,height/2-24)/extentY);
    const points = p3.map(point => project(point, yaw, pitch, scale));
    // Three transparent planes reveal the layers behind a flat network map.
    if (planeAlpha > .01) {
      [0, 1, 2].forEach(group => {
        const y = (group - 1) * .78;
        const corners = [[-1.05, y, -.95], [1.05, y, -.95], [1.05, y, .95], [-1.05, y, .95]].map(p => project(p, yaw, pitch, scale));
        ctx.beginPath(); corners.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)); ctx.closePath();
        ctx.fillStyle = `rgba(${colors[group]},${.075 * planeAlpha})`; ctx.fill();
        ctx.strokeStyle = `rgba(${colors[group]},${.48 * planeAlpha})`; ctx.lineWidth = 1; ctx.stroke();
      });
      const scanY = enabled()?Math.sin(clock*Math.PI*2/9000)*.9:0;
      const scan = [[-1.05, scanY, -.95], [1.05, scanY, -.95], [1.05, scanY, .95], [-1.05, scanY, .95]].map(p => project(p, yaw, pitch, scale));
      ctx.beginPath(); scan.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)); ctx.closePath();
      ctx.fillStyle = `rgba(${theme.rgb['cyan']},${planeAlpha * .035})`; ctx.fill();
      ctx.strokeStyle = `rgba(${theme.rgb['cyan']},${planeAlpha * .5})`; ctx.lineWidth = 1.5; ctx.stroke();
    }
    edges.forEach(([a, b]) => {
      const depth = clamp((points[a].z + 2) / 4, .2, 1);
      stroke(points[a], points[b], colors[nodes[a].group], (.12 + depth * .2) * (1 - converge * .3) + cue.strength * .22, .7 + cue.strength * .7);
    });
    // Signal traces travel along existing links instead of free-floating ornaments.
    const movingTime = enabled() ? clock : 3200;
    edges.forEach(([a, b], i) => {
      if (i % 7 !== 0) return;
      const part = cue.active ? cue.progress : (movingTime * .00015 + i * .137) % 1;
      const end = { x: lerp(points[a].x, points[b].x, part), y: lerp(points[a].y, points[b].y, part) };
      const tail = { x: lerp(points[a].x, points[b].x, Math.max(0, part - .12)), y: lerp(points[a].y, points[b].y, Math.max(0, part - .12)) };
      stroke(tail, end, colors[nodes[a].group], .8, 1.2);
      ctx.fillStyle = theme.color['paper']; ctx.fillRect(end.x - 1, end.y - 1, 2, 2);
    });
    const dustCount = width < 450 ? 240 : dust.length;
    const dispersion = lerp(1, .45, unfold);
    for (let i = 0; i < dustCount; i++) {
      const particle = dust[i], center = p3[particle.node];
      const drift = enabled() ? Math.sin(clock * .00045 + particle.phase) * .015 : 0;
      const p = project(center.map((n, axis) => n + particle.offset[axis] * dispersion + (axis === 1 ? drift : 0)), yaw, pitch, scale);
      const alpha = clamp((p.z + 2) / 4.5, .14, .72) * (1 - converge * .25);
      ctx.fillStyle = `rgba(${colors[nodes[particle.node].group]},${alpha})`;
      const size = particle.size * p.size;
      ctx.fillRect(p.x, p.y, size, size);
    }
    // A warm route is the selected event, not a claim of a detected attack.
    const gold = theme.rgb.amber;
    for (let i = 0; i < route.length - 1; i++) {
      stroke(points[route[i]], points[route[i + 1]], gold, .55 * (1 - converge), 1.15);
    }
    const travel = (movingTime * .00025) % (route.length - 1);
    const a = points[route[Math.floor(travel)]], b = points[route[Math.floor(travel) + 1]];
    if (converge < .95) signalMark({ x: lerp(a.x, b.x, travel % 1), y: lerp(a.y, b.y, travel % 1) }, gold, 17, .75 * (1 - converge));
    points.map((p, i) => ({ ...p, i })).sort((a, b) => a.z - b.z).forEach(p => {
      const node = nodes[p.i], radius = (node.key ? 5.6 : 2.3) * p.size;
      const color = node.key ? gold : colors[node.group];
      if (node.key) signalMark(p, color, 28, .48);
      ctx.strokeStyle = `rgba(${color},${node.key ? .95 : .65})`;
      ctx.fillStyle = theme.color['surface']; ctx.lineWidth = node.key ? 1.3 : .8;
      ctx.beginPath(); ctx.rect(p.x - radius, p.y - radius, radius * 2, radius * 2); ctx.fill(); ctx.stroke();
      if (node.key) { ctx.fillStyle = `rgb(${color})`; ctx.fillRect(p.x - 1.4, p.y - 1.4, 2.8, 2.8); }
    });
    if (progress > .22) {
      const labels = ['ENDPOINT', 'NETWORK', 'IDENTITY'];
      labels.forEach((text, group) => label(text, points[group * 25 + 12], colors[group], converge > .5 ? 14 : 20));
    } else {
      label('SELECTED EVENT', points[12], gold);
    }
    if (converge > .02) {
      const hub = project([0, -.02, .2], yaw, pitch, scale);
      [12, 37, 62].forEach((i, group) => {
        stroke(points[i], hub, colors[group], converge * .7, 1.4);
        const t = (movingTime * .00024 + group / 3) % 1;
        const signal = { x: lerp(points[i].x, hub.x, t), y: lerp(points[i].y, hub.y, t) };
        signalMark(signal, colors[group], 9, converge * .8);
      });
      signalMark(hub, theme.rgb.cyan, 56, converge * .7);
      ctx.strokeStyle = `rgba(${theme.rgb['paper']},${converge})`; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(hub.x, hub.y - 10); ctx.lineTo(hub.x + 10, hub.y); ctx.lineTo(hub.x, hub.y + 10); ctx.lineTo(hub.x - 10, hub.y); ctx.closePath(); ctx.stroke();
      if (converge > .75) label('EVIDENCE', { x: hub.x - 33, y: hub.y + 42 }, theme.rgb.ink, 0);
    }
    setChapter(progress < .29 ? 0 : progress < .76 ? 1 : 2);
  }

  function tick(time) {
    frame = 0;
    if (!visible || document.hidden) { lastFrame = 0; return; }
    if (!enabled()) { progress = .48; draw(); lastFrame = 0; return; }
    if (!lastFrame || time - lastFrame >= 15) {
      const dt = lastFrame ? Math.min(time - lastFrame, 50) : 16.67;
      clock += dt; cue.step(dt);
      pointerX=pointerYaw.step(dt);pointerY=pointerPitch.step(dt);
      progress = window.FieldnotesPlayback.hero(clock);
      lastFrame = time;
      draw();
    }
    requestFrame();
  }

  function preference() {
    root.classList.toggle('network-motion', enabled());
    pointerX = 0; pointerY = 0; pointerYaw.reset();pointerPitch.reset();cue.clear();
    if (frame) cancelAnimationFrame(frame);
    frame = 0; lastFrame = 0;
    resize();
  }
  root.classList.add('network-ready');
  document.addEventListener('portfolio:motionchange', preference);
  reduce.addEventListener('change', preference);
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('pageshow', requestFrame);
  window.FieldnotesPlayback.bindTap(canvas, (x,y) => {
    if(enabled()){cue.trigger();pointerYaw.velocity+=((x/width)-.5)*.8;pointerPitch.velocity+=((y/height)-.5)*.35;requestFrame();}
  });
  visual.addEventListener('pointermove', event => {
    if (!enabled() || event.pointerType !== 'mouse') return;
    const bounds = visual.getBoundingClientRect();
    pointerYaw.target = (clamp((event.clientX - bounds.left) / bounds.width) - .5) * .24;
    pointerPitch.target = (clamp((event.clientY - bounds.top) / bounds.height) - .5) * .14;
    requestFrame();
  }, { passive: true });
  visual.addEventListener('pointerleave', () => { pointerYaw.target=0;pointerPitch.target=0;requestFrame(); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && frame) { cancelAnimationFrame(frame); frame = 0; lastFrame = 0; }
    else requestFrame();
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      const entering=entries[0].isIntersecting&&!visible;
      visible = entries[0].isIntersecting;if(entering&&enabled())cue.trigger(null,false);
      if (!visible && frame) { cancelAnimationFrame(frame); frame = 0; lastFrame = 0; }
      else requestFrame();
    }, { rootMargin: '80px' }).observe(wrap);
  }
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(wrap);
  preference();
})();
