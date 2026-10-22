
/*
 * Security Fieldnotes — Spherical Forensic Scan
 *
 * Sphere -> glass scan -> three grids
 * -> moving signals -> sphere -> repeat.
 *
 * Canvas 2D projection of a 3D network.
 * Conceptual visualization, not live telemetry.
 *
 * No external libraries required.
 */

(() => {
  const canvas = document.querySelector('#network-canvas');
  const figure = document.querySelector('.network-visual');
  const wrap = document.querySelector('.network-canvas-wrap');

  if (!canvas || !figure || !wrap) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const root = document.documentElement;

  const reduced = matchMedia(
    '(prefers-reduced-motion: reduce)'
  );

  const theme =
    window.FieldnotesTheme?.light ||
    window.FieldnotesTheme;

  // ---------------------------------------------
  // COLORS
  // ---------------------------------------------

  const rgb = (value, fallback) => {
    if (typeof value !== 'string') return fallback;

    const s = value.trim();

    if (/^\d+\s*,\s*\d+\s*,\s*\d+$/.test(s)) {
      return s;
    }

    const match = s.match(
      /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i
    );

    if (match) {
      return `${match[1]},${match[2]},${match[3]}`;
    }

    const h = s.replace(/^#/, '');

    if (/^[\da-f]{6}$/i.test(h)) {
      return [0, 2, 4]
        .map(i => parseInt(h.slice(i, i + 2), 16))
        .join(',');
    }

    return fallback;
  };

  const colors = [
    rgb(theme?.series?.[0], '58,115,137'),
    rgb(theme?.series?.[1], '96,143,168'),
    rgb(theme?.series?.[2], '67,128,135')
  ];

  const cyan = rgb(
    theme?.rgb?.cyan,
    '166,217,226'
  );

  const amber = rgb(
    theme?.rgb?.amber,
    '211,141,65'
  );

  const ink = rgb(
    theme?.rgb?.ink,
    '20,43,60'
  );

  const paper = rgb(
    theme?.rgb?.bg,
    '247,249,250'
  );

  const mono = theme?.fontMono || 'monospace';

  // ---------------------------------------------
  // MATH
  // ---------------------------------------------

  const clamp = (v, a = 0, b = 1) =>
    Math.max(a, Math.min(b, v));

  const mix = (a, b, t) =>
    a + (b - a) * t;

  const ease = v => {
    const t = clamp(v);
    return t * t * (3 - 2 * t);
  };

  const motion = () =>
    !reduced.matches &&
    !root.classList.contains('motion-off');

  // ---------------------------------------------
  // TIMING
  // ---------------------------------------------

  const INITIAL_REVEAL = 1600;
  const HERO_ENTRANCE = 850;

  const DURATIONS = [
    3600, // Sphere -> glass scan -> grids
    2200, // Endpoint signal
    2200, // Network signal
    2200, // Identity signal
    5000  // Gather into sphere and hold
  ];

  const LOOP = DURATIONS.reduce(
    (a, b) => a + b,
    0
  );

  // ---------------------------------------------
  // GEOMETRY
  // ---------------------------------------------

  const centers = [
    [-.77, .39, 0],
    [.77, .39, 0],
    [0, -.60, 0]
  ];

  const radius = .84;

  // Each group contains a flat 5 x 5 grid.
  // All grid nodes share Z = 0.

  const nodes = Array.from(
    { length: 75 },
    (_, i) => {
      const group = Math.floor(i / 25);
      const local = i % 25;

      const col = local % 5;
      const row = Math.floor(local / 5);

      // Fibonacci sphere coordinates.
      const y = 1 - i / 74 * 2;

      const ring = Math.sqrt(
        Math.max(0, 1 - y * y)
      );

      const a =
        i * Math.PI * (3 - Math.sqrt(5));

      return {
        group,
        key: local === 12,

        grid: [
          centers[group][0] +
            (col - 2) * .112,

          centers[group][1] +
            (row - 2) * .096,

          0
        ],

        globe: [
          Math.cos(a) * ring * radius,
          y * radius,
          Math.sin(a) * ring * radius
        ]
      };
    }
  );

  // ---------------------------------------------
  // GRID CONNECTIONS
  // ---------------------------------------------

  const gridEdges = [];

  nodes.forEach((_, i) => {
    if (i % 5 < 4) {
      gridEdges.push([i, i + 1]);
    }

    if (i % 25 < 20) {
      gridEdges.push([i, i + 5]);
    }
  });

  // ---------------------------------------------
  // SPHERICAL CONNECTIONS
  // ---------------------------------------------

  // Use nearby nodes instead of stretching grid
  // connections across the spherical surface.

  const globeEdges = [];

  nodes.forEach((n, i) => {
    const near = nodes
      .map((m, j) => ({
        j,

        d:
          (n.globe[0] - m.globe[0]) ** 2 +
          (n.globe[1] - m.globe[1]) ** 2 +
          (n.globe[2] - m.globe[2]) ** 2
      }))
      .filter(v => v.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 3);

    near.forEach(({ j }) => {
      if (i < j) {
        globeEdges.push([i, j]);
      }
    });
  });

  // ---------------------------------------------
  // STATE
  // ---------------------------------------------

  let w = 600;
  let h = 440;

  let raf = 0;
  let lastFrame = 0;

  let boot = 0;
  let elapsed = 0;

  let globeAngle = .15;

  let visible =
    !('IntersectionObserver' in window);

  let introDone =
    !root.classList.contains(
      'hero-intro-pending'
    );

  let startScheduled = introDone;

  let yaw = 0;
  let pitch = 0;

  let targetYaw = 0;
  let targetPitch = 0;

  // Remove narrative captions.
  figure.querySelector(
    '.network-caption'
  )?.remove();

  figure.setAttribute(
    'aria-label',
    'Illustrative 3D network. A sphere opens through a glass-like scan into Endpoint, Network, and Identity grids. The grids connect to evidence and gather back into a sphere. Not live telemetry.'
  );

  // ---------------------------------------------
  // TIMELINE
  // ---------------------------------------------

  function phaseAt(t) {
    let time = t % LOOP;

    for (
      let index = 0;
      index < DURATIONS.length;
      index++
    ) {
      if (time < DURATIONS[index]) {
        return {
          index,
          t: time / DURATIONS[index]
        };
      }

      time -= DURATIONS[index];
    }

    return {
      index: 4,
      t: 1
    };
  }

  // ---------------------------------------------
  // 3D ROTATION
  // ---------------------------------------------

  function turn(p, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);

    return [
      p[0] * c + p[2] * s,
      p[1],
      p[2] * c - p[0] * s
    ];
  }

  // ---------------------------------------------
  // CAMERA
  // ---------------------------------------------

  function project([px, py, pz], scale) {
    // Restrained camera perspective.
    const a = -.10 + yaw;
    const e = .18 + pitch;

    const x =
      px * Math.cos(a) +
      pz * Math.sin(a);

    const zz =
      pz * Math.cos(a) -
      px * Math.sin(a);

    const y =
      py * Math.cos(e) -
      zz * Math.sin(e);

    const z =
      py * Math.sin(e) +
      zz * Math.cos(e);

    const depth = 5 / (5 - z);

    return {
      x: w / 2 + x * scale * depth,
      y: h / 2 - y * scale * depth,
      z,
      depth
    };
  }

  // ---------------------------------------------
  // DRAWING HELPERS
  // ---------------------------------------------

  function line(
    a,
    b,
    color,
    alpha = .4,
    thickness = 1
  ) {
    if (alpha <= .005) return;

    ctx.beginPath();

    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);

    ctx.strokeStyle =
      `rgba(${color},${clamp(alpha)})`;

    ctx.lineWidth = thickness;
    ctx.stroke();
  }

  function square(
    p,
    half,
    color,
    alpha = 1,
    outline = null,
    width = 1
  ) {
    if (alpha <= .005) return;

    ctx.fillStyle =
      `rgba(${color},${clamp(alpha)})`;

    ctx.fillRect(
      p.x - half,
      p.y - half,
      half * 2,
      half * 2
    );

    if (outline) {
      ctx.strokeStyle =
        `rgba(${outline},${clamp(alpha)})`;

      ctx.lineWidth = width;

      ctx.strokeRect(
        p.x - half,
        p.y - half,
        half * 2,
        half * 2
      );
    }
  }

  function label(text, at, color) {
    ctx.font = `10px ${mono}`;

    const width = ctx.measureText(text).width;

    const x = clamp(
      at.x + 15,
      8,
      Math.max(8, w - width - 9)
    );

    const y = clamp(
      at.y - 12,
      15,
      h - 8
    );

    ctx.fillStyle =
      `rgba(${paper},.91)`;

    ctx.fillRect(
      x - 3,
      y - 12,
      width + 6,
      16
    );

    ctx.fillStyle = `rgb(${color})`;
    ctx.fillText(text, x, y);
  }

  function signal(a, b, t, color) {
    const p = {
      x: mix(a.x, b.x, t),
      y: mix(a.y, b.y, t)
    };

    const tail = clamp(t - .16);

    line(
      {
        x: mix(a.x, b.x, tail),
        y: mix(a.y, b.y, tail)
      },
      p,
      color,
      .88,
      1.8
    );

    square(p, 6.5, color, .13);
    square(p, 3, color, .97);
  }

  // ---------------------------------------------
  // GLASS SCANNING PLANE
  // ---------------------------------------------

  function scanPlane(x, scale, opacity) {
    if (opacity <= .005) return;

    const v = [
      [x, -1.04, -.89],
      [x, 1.04, -.89],
      [x, 1.04, .89],
      [x, -1.04, .89]
    ].map(p => project(p, scale));

    ctx.beginPath();

    v.forEach((p, i) => {
      if (i) {
        ctx.lineTo(p.x, p.y);
      } else {
        ctx.moveTo(p.x, p.y);
      }
    });

    ctx.closePath();

    ctx.fillStyle =
      `rgba(${cyan},${.10 * opacity})`;

    ctx.fill();

    ctx.strokeStyle =
      `rgba(${cyan},${.53 * opacity})`;

    ctx.lineWidth = 1;
    ctx.stroke();

    line(
      project([x, -1.04, -.89], scale),
      project([x, 1.04, -.89], scale),
      cyan,
      .78 * opacity,
      1.5
    );

    line(
      project([x, -1.04, .89], scale),
      project([x, 1.04, .89], scale),
      cyan,
      .30 * opacity,
      1
    );
  }

  // ---------------------------------------------
  // SPHERICAL RINGS
  // ---------------------------------------------

  function drawRing(
    latitude,
    scale,
    angle,
    opacity
  ) {
    let last = null;

    for (let i = 0; i <= 48; i++) {
      const a =
        i / 48 * Math.PI * 2;

      const r =
        radius * Math.cos(latitude);

      const p = project(
        turn(
          [
            r * Math.cos(a),
            radius * Math.sin(latitude),
            r * Math.sin(a)
          ],
          angle
        ),
        scale
      );

      if (last) {
        line(
          last,
          p,
          cyan,
          .12 * opacity,
          .8
        );
      }

      last = p;
    }
  }

  // ---------------------------------------------
  // MAIN RENDERER
  // ---------------------------------------------

  function draw() {
    ctx.clearRect(0, 0, w, h);

    const still = !motion();

    const booting =
      !still &&
      boot < INITIAL_REVEAL;

    const reveal = still
      ? 1
      : ease(boot / INITIAL_REVEAL);

    const phase = still
      ? { index: 2, t: .5 }
      : phaseAt(elapsed);

    const { index, t } = phase;

    // -----------------------------------------
    // MORPH TIMING
    // -----------------------------------------

    const scanProgress =
      index === 0
        ? ease((t - .18) / .65)
        : 1;

    const scanX = mix(
      -1.40,
      1.40,
      scanProgress
    );

    // How spherical each individual node is.
    const weights = nodes.map(node => {
      if (still) return 0;

      // Start with a full sphere.
      if (booting) return 1;

      // Final stage gathers back into a sphere.
      if (index === 4) {
        return ease(
          (t - .02) / .43
        );
      }

      // Scan uncovers the destination grid.
      if (index === 0) {
        const uncovered = ease(
          (scanX - node.grid[0] + .12) / .24
        );

        return 1 - uncovered;
      }

      return 0;
    });

    const sphereAmount = still
      ? 0
      : booting
        ? 1
        : index === 0
          ? 1 - ease(
              (scanProgress - .10) / .75
            )
          : index === 4
            ? ease(
                (t - .02) / .43
              )
            : 0;

    // -----------------------------------------
    // SPHERE / GRID COORDINATES
    // -----------------------------------------

    const coords = nodes.map((node, i) => {
      const sphere = turn(
        node.globe,
        globeAngle
      );

      return node.grid.map(
        (n, axis) =>
          mix(
            n,
            sphere[axis],
            weights[i]
          )
      );
    });

    // -----------------------------------------
    // RESPONSIVE CAMERA FIT
    // -----------------------------------------

    // Fixed fit across both geometric states.
    // Prevents zooming in and out every loop.

    const base = Math.min(
      w * .47,
      h * .72
    );

    let ex = 1;
    let ey = 1;

    for (const n of nodes) {
      for (const shape of [
        n.grid,
        n.globe
      ]) {
        const p = project(
          shape,
          base
        );

        ex = Math.max(
          ex,
          Math.abs(p.x - w / 2)
        );

        ey = Math.max(
          ey,
          Math.abs(p.y - h / 2)
        );
      }
    }

    const scale = base * Math.min(
      1,
      (w / 2 - 40) / ex,
      (h / 2 - 35) / ey
    );

    const pts = coords.map(
      p => project(p, scale)
    );

    const keys = [
      pts[12],
      pts[37],
      pts[62]
    ];

    const evidence = project(
      [0, -.025, .04],
      scale
    );

    const gridAmount =
      1 - sphereAmount;

    figure.dataset.phase = String(
      booting ? -1 : index
    );

    // -----------------------------------------
    // SPHERICAL GUIDES
    // -----------------------------------------

    if (sphereAmount > .015) {
      [-.50, 0, .50].forEach(lat => {
        drawRing(
          lat,
          scale,
          globeAngle,
          sphereAmount * reveal
        );
      });
    }

    // -----------------------------------------
    // SPHERICAL CONNECTIONS
    // -----------------------------------------

    globeEdges.forEach(([a, b]) => {
      line(
        pts[a],
        pts[b],
        cyan,

        .28 *
          sphereAmount *
          reveal,

        .85
      );
    });

    // -----------------------------------------
    // GRID CONNECTIONS
    // -----------------------------------------

    gridEdges.forEach(([a, b]) => {
      line(
        pts[a],
        pts[b],
        colors[nodes[a].group],

        .35 *
          (
            1 -
            (weights[a] + weights[b]) / 2
          ) *
          reveal,

        .85
      );
    });

    // -----------------------------------------
    // SQUARE GROUP FRAMES
    // -----------------------------------------

    centers.forEach((c, group) => {
      const alpha =
        gridAmount * reveal;

      if (alpha < .02) return;

      const corners = [
        [c[0] - .31, c[1] - .27, 0],
        [c[0] + .31, c[1] - .27, 0],
        [c[0] + .31, c[1] + .27, 0],
        [c[0] - .31, c[1] + .27, 0]
      ].map(v => project(v, scale));

      corners.forEach((p, i) => {
        line(
          p,
          corners[(i + 1) % 4],
          colors[group],
          .21 * alpha,
          .9
        );

        square(
          p,
          1.6,
          colors[group],
          .55 * alpha
        );
      });
    });

    // -----------------------------------------
    // EVIDENCE CONNECTIONS
    // -----------------------------------------

    keys.forEach((from, i) => {
      line(
        from,
        evidence,
        colors[i],

        .26 *
          gridAmount *
          reveal,

        1
      );
    });

    // -----------------------------------------
    // MOVING SQUARE SIGNALS
    // -----------------------------------------

    if (
      !booting &&
      !still &&
      index >= 1 &&
      index <= 3
    ) {
      if (index === 1) {
        const u = ease(t) * 2;

        const seg = Math.min(
          1,
          Math.floor(u)
        );

        const route = [
          pts[2],
          pts[7],
          pts[12]
        ];

        signal(
          route[seg],
          route[seg + 1],
          u - seg,
          amber
        );

      } else if (index === 2) {
        signal(
          keys[1],
          evidence,
          ease(t),
          cyan
        );

      } else {
        signal(
          keys[2],
          evidence,
          ease(t),
          cyan
        );
      }
    }

    // -----------------------------------------
    // GLASS SCAN
    // -----------------------------------------

    if (
      !booting &&
      !still &&
      index === 0 &&
      t > .12 &&
      t < .91
    ) {
      const fade =
        ease((t - .12) / .08) *
        (
          1 - ease(
            (t - .82) / .09
          )
        );

      scanPlane(
        scanX,
        scale,
        fade
      );
    }

    // -----------------------------------------
    // DEPTH-SORTED SQUARE NODES
    // -----------------------------------------

    pts
      .map((p, i) => ({
        ...p,
        i
      }))
      .sort((a, b) => a.z - b.z)
      .forEach(p => {
        const n = nodes[p.i];

        const half = (
          n.key ? 5.2 : 2.0
        ) * p.depth;

        const alpha = reveal;
        const col = colors[n.group];

        // Highlight the active main square.
        if (
          n.key &&
          index === n.group + 1 &&
          !booting &&
          !still
        ) {
          ctx.strokeStyle =
            `rgba(${amber},.48)`;

          ctx.lineWidth = 1;

          ctx.strokeRect(
            p.x - half - 4,
            p.y - half - 4,
            half * 2 + 8,
            half * 2 + 8
          );
        }

        square(
          p,
          half,
          paper,
          alpha,
          col,
          n.key ? 1.45 : .9
        );

        if (n.key) {
          square(
            p,
            2.1 * p.depth,
            col,
            alpha
          );
        }
      });

    // -----------------------------------------
    // LABELS
    // -----------------------------------------

    // Labels fade away when the sphere forms.
    if (
      gridAmount > .2 &&
      reveal > .25
    ) {
      ctx.save();

      ctx.globalAlpha =
        ease(
          (gridAmount - .2) / .5
        ) * reveal;

      [
        'ENDPOINT',
        'NETWORK',
        'IDENTITY'
      ].forEach((name, i) => {
        label(
          name,
          keys[i],
          colors[i]
        );
      });

      square(
        evidence,
        6.6,
        paper,
        1,
        amber,
        1.4
      );

      label(
        'EVIDENCE',
        {
          x: evidence.x - 52,
          y: evidence.y + 25
        },
        ink
      );

      ctx.restore();
    }
  }

  // ---------------------------------------------
  // FRAME SCHEDULER
  // ---------------------------------------------

  function queue() {
    if (
      !raf &&
      introDone &&
      visible &&
      !document.hidden &&
      motion()
    ) {
      raf = requestAnimationFrame(tick);
    }
  }

  function tick(now) {
    raf = 0;

    if (
      !introDone ||
      !visible ||
      document.hidden
    ) {
      lastFrame = 0;
      return;
    }

    const dt = lastFrame
      ? Math.min(now - lastFrame, 60)
      : 16.7;

    lastFrame = now;

    if (boot < INITIAL_REVEAL) {
      const step = Math.min(
        dt,
        INITIAL_REVEAL - boot
      );

      boot += step;

      elapsed = (
        elapsed + dt - step
      ) % LOOP;

    } else {
      elapsed = (
        elapsed + dt
      ) % LOOP;
    }

    // Maintain continuous sphere rotation.
    // The angle never resets at loop boundaries.
    globeAngle += dt * .00016;

    yaw = mix(
      yaw,
      targetYaw,
      .075
    );

    pitch = mix(
      pitch,
      targetPitch,
      .075
    );

    draw();
    queue();
  }

  // ---------------------------------------------
  // RESPONSIVE RESIZE
  // ---------------------------------------------

  function resize() {
    const r =
      wrap.getBoundingClientRect();

    w = Math.max(1, r.width);
    h = Math.max(1, r.height);

    const dpr = Math.min(
      devicePixelRatio || 1,
      1.6
    );

    canvas.width = Math.round(
      w * dpr
    );

    canvas.height = Math.round(
      h * dpr
    );

    ctx.setTransform(
      dpr,
      0,
      0,
      dpr,
      0,
      0
    );

    draw();
    queue();
  }

  // ---------------------------------------------
  // TERMINAL SYNCHRONIZATION
  // ---------------------------------------------

  function begin() {
    if (startScheduled) return;

    startScheduled = true;

    setTimeout(() => {
      introDone = true;
      lastFrame = 0;

      draw();
      queue();

    }, motion() ? HERO_ENTRANCE : 0);
  }

  window.addEventListener(
    'hero:intro-complete',
    begin,
    { once: true }
  );

  // Fallback if the completion event is missed.
  setTimeout(() => {
    if (
      !introDone &&
      !root.classList.contains(
        'hero-intro-pending'
      )
    ) {
      begin();
    }
  }, 15500);

  // ---------------------------------------------
  // REMOVE STATIC HTML FALLBACK
  // ---------------------------------------------

  const fallback = figure.querySelector(
    '.network-fallback'
  );

  if (fallback) {
    fallback.style.display = 'none';
  }

  root.classList.add('network-ready');

  // ---------------------------------------------
  // CAMERA INTERACTION
  // ---------------------------------------------

  figure.addEventListener(
    'pointermove',
    e => {
      if (
        !motion() ||
        e.pointerType !== 'mouse'
      ) return;

      const r =
        figure.getBoundingClientRect();

      targetYaw = (
        clamp(
          (e.clientX - r.left) /
          r.width
        ) - .5
      ) * .22;

      targetPitch = (
        clamp(
          (e.clientY - r.top) /
          r.height
        ) - .5
      ) * .13;

      queue();
    },
    { passive: true }
  );

  figure.addEventListener(
    'pointerleave',
    () => {
      targetYaw = 0;
      targetPitch = 0;

      queue();
    }
  );

  // ---------------------------------------------
  // VISIBILITY MANAGEMENT
  // ---------------------------------------------

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(
      entries => {
        visible =
          entries[0].isIntersecting;

        if (!visible && raf) {
          cancelAnimationFrame(raf);

          raf = 0;
          lastFrame = 0;
        } else {
          queue();
        }
      },
      {
        rootMargin: '80px'
      }
    ).observe(wrap);
  }

  if ('ResizeObserver' in window) {
    new ResizeObserver(
      resize
    ).observe(wrap);
  } else {
    window.addEventListener(
      'resize',
      resize,
      { passive: true }
    );
  }

  document.addEventListener(
    'visibilitychange',
    () => {
      if (
        document.hidden &&
        raf
      ) {
        cancelAnimationFrame(raf);

        raf = 0;
        lastFrame = 0;
      } else {
        queue();
      }
    }
  );

  window.addEventListener(
    'pageshow',
    queue
  );

  // ---------------------------------------------
  // MOTION PREFERENCES
  // ---------------------------------------------

  function preference() {
    if (raf) {
      cancelAnimationFrame(raf);
    }

    raf = 0;
    lastFrame = 0;

    root.classList.toggle(
      'network-motion',
      motion()
    );

    draw();
    queue();
  }

  reduced.addEventListener(
    'change',
    preference
  );

  document.addEventListener(
    'portfolio:motionchange',
    preference
  );

  // Initialize.
  resize();
})();
