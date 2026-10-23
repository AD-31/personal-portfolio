
/*
 * SOC AUTOMATION — 3D CANVAS RENDERER
 *
 * Native HTML Canvas.
 * No Three.js or external dependencies.
 *
 * Illustrative stages:
 * 01 Wazuh
 * 02 n8n intake
 * 03 Triage and policy
 * 04 DFIR-IRIS
 * 05 Conditional IOC sync
 * 06 SOC-03 investigation handoff
 *
 * Separate high/critical SOC email branch.
 *
 * This visualization is conceptual;
 * it does not represent live SOC telemetry.
 */

(() => {
  "use strict";

  const canvas = document.querySelector(
    "[data-soc-renderer]"
  );

  if (!canvas) return;

  const ctx = canvas.getContext("2d", {
    alpha: true
  });

  const fallback = document.getElementById(
    "soc-render-fallback"
  );

  if (!ctx) {
    if (fallback) fallback.hidden = false;
    return;
  }

  const motion = matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  /* =====================================
     MODELS
     ===================================== */

  const stages = [
    {
      id: "01",
      name: "WAZUH",
      note: "Alert detected",
      x: -5.85,
      y: 0.25,
      z: -0.12,
      type: "monitor"
    },
    {
      id: "02",
      name: "n8n",
      note: "Normalize event",
      x: -3.5,
      y: 0.48,
      z: 0.32,
      type: "pipes"
    },
    {
      id: "03",
      name: "TRIAGE",
      note: "Risk and severity",
      x: -1.15,
      y: 0.18,
      z: -0.28,
      type: "decision"
    },
    {
      id: "04",
      name: "DFIR-IRIS",
      note: "Correlate cases",
      x: 1.25,
      y: 0.42,
      z: 0.16,
      type: "case"
    },
    {
      id: "05",
      name: "IOC SYNC",
      note: "Conditional write",
      x: 3.65,
      y: 0.12,
      z: -0.25,
      type: "ioc"
    },
    {
      id: "06",
      name: "SOC-03",
      note: "Context handoff",
      x: 5.95,
      y: 0.42,
      z: 0.22,
      type: "handoff"
    }
  ];

  const mail = {
    id: "↳",
    name: "SOC EMAIL",
    note: "High / critical",
    x: -1.1,
    y: -2.05,
    z: 1,
    type: "mail"
  };

  /*
   * Mobile arrangement:
   * three rows of two main modules,
   * with the notification branch below.
   */

  const mobile = [
    [-1.65, 2.65, 0],
    [1.65, 2.65, 0],
    [-1.65, 0.5, 0],
    [1.65, 0.5, 0],
    [-1.65, -1.65, 0],
    [1.65, -1.65, 0]
  ];

  /* =====================================
     VISUAL DESIGN TOKENS
     ===================================== */

  const C = {
    front: "#183447",
    side: "#34586d",
    top: "#7193a3",
    ink: "#142b3c",
    muted: "#536c7a",
    edge: "#87a7b5",
    cyan: "#a6d9e2",
    amber: "#cf924d",
    white: "#f7f9fa"
  };

  const LOOP = 24000;

  let width = 0;
  let height = 0;
  let dpr = 1;

  let yaw = -0.28;
  let pitch = 0.20;

  let drag = null;
  let running = false;
  let visible = true;
  let lastDraw = 0;
  let reduced = motion.matches;

  /* =====================================
     RESPONSIVE WORLD POSITIONS
     ===================================== */

  function positions() {
    const compact = width < 720;

    const items = stages.map((p, i) => {
      if (!compact) return { ...p };

      return {
        ...p,
        x: mobile[i][0],
        y: mobile[i][1],
        z: mobile[i][2]
      };
    });

    return {
      items,

      email: compact
        ? {
            ...mail,
            x: 0,
            y: -3.85,
            z: 0
          }
        : { ...mail },

      compact,

      scale: compact
        ? Math.min(
            width / 7.6,
            height / 11.2,
            48
          )
        : Math.min(
            width / 16,
            height / 8.2,
            70
          )
    };
  }

  /* =====================================
     PERSPECTIVE PROJECTION
     ===================================== */

  function project(p, scale) {
    const cy = Math.cos(yaw);
    const sy = Math.sin(yaw);

    const cx = Math.cos(pitch);
    const sx = Math.sin(pitch);

    // Rotate around Y.
    const x =
      p.x * cy +
      p.z * sy;

    const z =
      -p.x * sy +
      p.z * cy;

    // Rotate around X.
    const y =
      p.y * cx -
      z * sx;

    const depth =
      p.y * sx +
      z * cx;

    // Perspective scale.
    const perspective =
      12 / (12 + depth * 0.32);

    return {
      x:
        width / 2 +
        x * scale * perspective,

      y:
        height * 0.47 -
        y * scale * perspective,

      depth,
      k: perspective
    };
  }

  /* =====================================
     CANVAS DRAWING UTILITIES
     ===================================== */

  function polygon(
    points,
    fill,
    stroke,
    alpha = 1
  ) {
    if (!points.length) return;

    ctx.save();
    ctx.globalAlpha = alpha;

    ctx.beginPath();

    ctx.moveTo(
      points[0].x,
      points[0].y
    );

    for (
      let i = 1;
      i < points.length;
      i++
    ) {
      ctx.lineTo(
        points[i].x,
        points[i].y
      );
    }

    ctx.closePath();

    ctx.fillStyle = fill;
    ctx.fill();

    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    ctx.restore();
  }

  function line(
    points,
    color,
    size = 1,
    dash = []
  ) {
    if (points.length < 2) return;

    ctx.save();
    ctx.beginPath();

    ctx.moveTo(
      points[0].x,
      points[0].y
    );

    points.slice(1).forEach(p => {
      ctx.lineTo(p.x, p.y);
    });

    ctx.lineWidth = size;
    ctx.strokeStyle = color;
    ctx.setLineDash(dash);
    ctx.lineJoin = "miter";

    ctx.stroke();
    ctx.restore();
  }

  /* =====================================
     SQUARE-CORNER SIGNAL PATHS
     ===================================== */

  function pathBetween(
    a,
    b,
    compact,
    scale
  ) {
    const a0 = {
      x: a.x,
      y: a.y - 0.12,
      z: a.z
    };

    const b0 = {
      x: b.x,
      y: b.y - 0.12,
      z: b.z
    };

    const bend =
      compact && a.x > b.x
        ? a.x + 0.48
        : (a.x + b.x) / 2;

    return [
      a0,

      {
        x: bend,
        y: a0.y,
        z: a0.z
      },

      {
        x: bend,
        y: b0.y,
        z: b0.z
      },

      b0
    ].map(p => project(p, scale));
  }

  function pointOnPolyline(
    points,
    t
  ) {
    const lengths = [];
    let total = 0;

    for (
      let i = 1;
      i < points.length;
      i++
    ) {
      const distance = Math.hypot(
        points[i].x -
          points[i - 1].x,

        points[i].y -
          points[i - 1].y
      );

      lengths.push(distance);
      total += distance;
    }

    let remaining =
      total *
      Math.max(
        0,
        Math.min(1, t)
      );

    for (
      let i = 0;
      i < lengths.length;
      i++
    ) {
      if (
        remaining <= lengths[i] ||
        i === lengths.length - 1
      ) {
        const u = lengths[i]
          ? remaining / lengths[i]
          : 0;

        return {
          x:
            points[i].x +
            (
              points[i + 1].x -
              points[i].x
            ) * u,

          y:
            points[i].y +
            (
              points[i + 1].y -
              points[i].y
            ) * u
        };
      }

      remaining -= lengths[i];
    }

    return points.at(-1);
  }

  /* =====================================
     MOVING ALERT PACKETS
     ===================================== */

  function packet(
    p,
    active,
    small = false
  ) {
    if (!p) return;

    const s = small ? 6 : 8;

    ctx.save();

    ctx.shadowBlur = 15;

    ctx.shadowColor = active
      ? "rgba(207,146,77,.45)"
      : "rgba(166,217,226,.5)";

    ctx.fillStyle = active
      ? C.amber
      : "#5eacbe";

    ctx.fillRect(
      p.x - s / 2,
      p.y - s / 2,
      s,
      s
    );

    ctx.restore();
  }

  /* =====================================
     DRAW ONE THREE-DIMENSIONAL MODULE
     ===================================== */

  function drawNode(
    node,
    scale,
    isActive,
    compact
  ) {
    const center = {
      x: node.x,
      y: node.y,
      z: node.z
    };

    const w = compact ? 1.65 : 1.70;
    const h = 1.13;
    const d = 0.72;

    function vertex(
      dx,
      dy,
      dz
    ) {
      return project(
        {
          x: center.x + dx,
          y: center.y + dy,
          z: center.z + dz
        },
        scale
      );
    }

    // Eight physical box corners.
    const v = [
      vertex(-w / 2, -h / 2, -d / 2),
      vertex( w / 2, -h / 2, -d / 2),
      vertex( w / 2,  h / 2, -d / 2),
      vertex(-w / 2,  h / 2, -d / 2),

      vertex(-w / 2, -h / 2, d / 2),
      vertex( w / 2, -h / 2, d / 2),
      vertex( w / 2,  h / 2, d / 2),
      vertex(-w / 2,  h / 2, d / 2)
    ];

    // 3D faces.
    const faces = [
      {
        v: [0, 1, 2, 3],
        color: "#3b6171"
      },
      {
        v: [0, 4, 7, 3],
        color: "#486d7e"
      },
      {
        v: [1, 5, 6, 2],
        color: C.side
      },
      {
        v: [3, 2, 6, 7],
        color: C.top
      },
      {
        v: [4, 5, 6, 7],
        color: C.front
      }
    ];

    // Painter's algorithm:
    // draw farther surfaces first.
    faces.sort((a, b) => {
      const av =
        a.v.reduce(
          (sum, i) =>
            sum + v[i].depth,
          0
        ) / a.v.length;

      const bv =
        b.v.reduce(
          (sum, i) =>
            sum + v[i].depth,
          0
        ) / b.v.length;

      return av - bv;
    });

    /* Soft ground shadow */

    const shadow = project(
      {
        x: node.x,
        y: node.y - h / 2 - 0.15,
        z: node.z
      },
      scale
    );

    ctx.save();

    ctx.fillStyle =
      "rgba(20,43,60,.075)";

    ctx.beginPath();

    ctx.ellipse(
      shadow.x + 9,
      shadow.y + 13,
      w * scale * 0.40,
      scale * 0.10,
      0,
      0,
      Math.PI * 2
    );

    ctx.fill();
    ctx.restore();

    /* Draw shaded box */

    faces.forEach(face => {
      polygon(
        face.v.map(i => v[i]),
        face.color,
        "rgba(166,217,226,.32)"
      );
    });

    /* Technical traces on front face */

    const fA = vertex(
      -w * 0.36,
      h * 0.20,
      d / 2 + 0.01
    );

    const fB = vertex(
      w * 0.26,
      h * 0.20,
      d / 2 + 0.01
    );

    const fC = vertex(
      -w * 0.36,
      -h * 0.06,
      d / 2 + 0.01
    );

    const fD = vertex(
      w * 0.11,
      -h * 0.06,
      d / 2 + 0.01
    );

    const fE = vertex(
      -w * 0.36,
      -h * 0.30,
      d / 2 + 0.01
    );

    const fF = vertex(
      w * 0.34,
      -h * 0.30,
      d / 2 + 0.01
    );

    line(
      [fA, fB],
      C.cyan,
      Math.max(
        1,
        scale * 0.028
      )
    );

    line(
      [fC, fD],
      isActive
        ? C.amber
        : C.cyan,
      Math.max(
        1,
        scale * 0.035
      )
    );

    line(
      [fE, fF],
      C.edge,
      1.5
    );

    /* Status LED */

    const led = vertex(
      w * 0.37,
      -h * 0.28,
      d / 2 + 0.02
    );

    ctx.fillStyle = isActive
      ? C.amber
      : C.cyan;

    ctx.fillRect(
      led.x - 3,
      led.y - 3,
      6,
      6
    );

    /* Floating upper technical layer */

    const top = [
      vertex(
        -w * 0.40,
        h / 2 + 0.19,
        -d * 0.36
      ),

      vertex(
        w * 0.40,
        h / 2 + 0.19,
        -d * 0.36
      ),

      vertex(
        w * 0.40,
        h / 2 + 0.19,
        d * 0.36
      ),

      vertex(
        -w * 0.40,
        h / 2 + 0.19,
        d * 0.36
      )
    ];

    polygon(
      top,
      isActive
        ? "#bd9b72"
        : "#a0b9c5",
      "#a6d9e2",
      0.96
    );

    /* Screen-facing module label */

    const label = project(
      {
        x: node.x,
        y: node.y + h / 2 + 0.57,
        z: node.z
      },
      scale
    );

    ctx.save();

    ctx.textAlign = "center";
    ctx.fillStyle = C.ink;

    ctx.font =
      `600 ${compact ? 11 : 12}px ` +
      `"DM Sans",sans-serif`;

    ctx.fillText(
      node.name,
      label.x,
      label.y
    );

    /* Short technical annotation */

    const annotation = project(
      {
        x: node.x,
        y: node.y - h / 2 - 0.33,
        z: node.z
      },
      scale
    );

    ctx.fillStyle = C.muted;

    ctx.font =
      `${compact ? 9 : 10}px ` +
      `"IBM Plex Mono",monospace`;

    ctx.fillText(
      `${node.id} / ${node.note}`,
      annotation.x,
      annotation.y
    );

    ctx.restore();
  }

  /* =====================================
     COMPLETE ANIMATED SCENE
     ===================================== */

  function draw(timestamp) {
    const {
      items,
      email,
      compact,
      scale
    } = positions();

    ctx.clearRect(
      0,
      0,
      width,
      height
    );

    const t = reduced
      ? 0.14
      : (
          (timestamp % LOOP) /
          LOOP
        );

    const activeIndex = Math.min(
      5,
      Math.floor(t * 6)
    );

    /* Main route */

    const paths = items
      .slice(0, -1)
      .map(
        (item, i) =>
          pathBetween(
            item,
            items[i + 1],
            compact,
            scale
          )
      );

    /* Notification branch */

    const branch = pathBetween(
      items[2],
      email,
      compact,
      scale
    );

    // Main signal links and packets.
    paths.forEach((path, i) => {
      line(
        path,
        "rgba(95,136,153,.45)",
        1.5,
        [4, 5]
      );

      if (!reduced) {
        const segment =
          t * 6 - i;

        if (
          segment >= 0 &&
          segment < 1
        ) {
          packet(
            pointOnPolyline(
              path,
              segment
            ),
            true
          );
        }
      }
    });

    // SOC email notification branch.
    line(
      branch,
      "rgba(169,116,58,.52)",
      1.6,
      [3, 5]
    );

    if (
      !reduced &&
      t > 0.31 &&
      t < 0.52
    ) {
      packet(
        pointOnPolyline(
          branch,
          (t - 0.31) / 0.21
        ),
        true,
        true
      );
    }

    /* Draw physical modules */

    const sorted = [
      ...items,
      email
    ].sort(
      (a, b) =>
        project(a, scale).depth -
        project(b, scale).depth
    );

    sorted.forEach(item => {
      const isEmail =
        item === email;

      const isActive = isEmail
        ? (
            t > 0.31 &&
            t < 0.52
          )
        : (
            activeIndex ===
            items.indexOf(item)
          );

      drawNode(
        item,
        scale,
        isActive,
        compact
      );
    });
  }

  /* =====================================
     RESIZE & PIXEL DENSITY
     ===================================== */

  function resize() {
    const rect =
      canvas.getBoundingClientRect();

    width = Math.max(
      1,
      rect.width
    );

    height = Math.max(
      1,
      rect.height
    );

    dpr = Math.min(
      devicePixelRatio || 1,
      2
    );

    canvas.width = Math.round(
      width * dpr
    );

    canvas.height = Math.round(
      height * dpr
    );

    ctx.setTransform(
      dpr,
      0,
      0,
      dpr,
      0,
      0
    );

    draw(
      performance.now()
    );
  }

  /* =====================================
     INDEPENDENT ANIMATION CLOCK
     ===================================== */

  function frame(timestamp) {
    if (!running) return;

    // Render at approximately 30 FPS.
    if (
      timestamp -
      lastDraw >
      33
    ) {
      draw(timestamp);
      lastDraw = timestamp;
    }

    requestAnimationFrame(frame);
  }

  function startStop() {
    const shouldRun =
      !reduced &&
      visible &&
      !document.hidden;

    if (
      shouldRun &&
      !running
    ) {
      running = true;

      requestAnimationFrame(frame);
    } else if (!shouldRun) {
      running = false;

      draw(
        performance.now()
      );
    }
  }

  /* =====================================
     MOUSE / TOUCH ROTATION
     ===================================== */

  canvas.addEventListener(
    "pointerdown",
    event => {
      if (
        event.pointerType === "mouse" &&
        event.button !== 0
      ) return;

      drag = {
        x: event.clientX,
        y: event.clientY,
        yaw,
        pitch
      };

      canvas.setPointerCapture?.(
        event.pointerId
      );
    }
  );

  canvas.addEventListener(
    "pointermove",
    event => {
      if (!drag) return;

      yaw = Math.max(
        -0.85,
        Math.min(
          0.85,
          drag.yaw +
          (
            event.clientX -
            drag.x
          ) * 0.005
        )
      );

      pitch = Math.max(
        -0.1,
        Math.min(
          0.6,
          drag.pitch +
          (
            event.clientY -
            drag.y
          ) * 0.004
        )
      );

      if (
        reduced ||
        !running
      ) {
        draw(
          performance.now()
        );
      }
    }
  );

  function release() {
    drag = null;
  }

  canvas.addEventListener(
    "pointerup",
    release
  );

  canvas.addEventListener(
    "pointercancel",
    release
  );

  canvas.addEventListener(
    "lostpointercapture",
    release
  );

  /* =====================================
     KEYBOARD ROTATION
     ===================================== */

  canvas.addEventListener(
    "keydown",
    event => {
      const keys = [
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Home"
      ];

      if (
        keys.includes(event.key)
      ) {
        event.preventDefault();
      }

      if (
        event.key === "Home"
      ) {
        yaw = -0.28;
        pitch = 0.20;
      }

      if (
        event.key === "ArrowLeft"
      ) {
        yaw = Math.max(
          -0.85,
          yaw - 0.09
        );
      }

      if (
        event.key === "ArrowRight"
      ) {
        yaw = Math.min(
          0.85,
          yaw + 0.09
        );
      }

      if (
        event.key === "ArrowUp"
      ) {
        pitch = Math.min(
          0.6,
          pitch + 0.07
        );
      }

      if (
        event.key === "ArrowDown"
      ) {
        pitch = Math.max(
          -0.1,
          pitch - 0.07
        );
      }

      if (
        reduced ||
        !running
      ) {
        draw(
          performance.now()
        );
      }
    }
  );

  /* =====================================
     OBSERVERS & ACCESSIBILITY
     ===================================== */

  if (
    "ResizeObserver" in window
  ) {
    new ResizeObserver(
      resize
    ).observe(canvas);
  } else {
    window.addEventListener(
      "resize",
      resize
    );
  }

  if (
    "IntersectionObserver" in window
  ) {
    new IntersectionObserver(
      entries => {
        visible =
          entries[0]?.isIntersecting ??
          true;

        startStop();
      },
      {
        threshold: 0.01
      }
    ).observe(canvas);
  }

  document.addEventListener(
    "visibilitychange",
    startStop
  );

  const changed = () => {
    reduced = motion.matches;

    startStop();
  };

  if (motion.addEventListener) {
    motion.addEventListener(
      "change",
      changed
    );
  } else {
    motion.addListener(changed);
  }

  /* Start */

  resize();
  startStop();
})();

