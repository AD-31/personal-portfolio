
/*
 * SOC AUTOMATION — NATIVE 3D CANVAS
 *
 * Source-informed conceptual visualization.
 * Not live telemetry or an execution trace.
 *
 * Desktop:
 * - Six separated workflow modules
 * - Independent SOC email branch
 * - Technical annotations
 *
 * Mobile:
 * - Three rows of two modules
 * - Separate SOC email row
 * - Larger vertical gaps
 * - Clean component labels
 *
 * No external libraries.
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

  const motionQuery = matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  const colors = {
    front: "#183447",
    side: "#34586d",
    top: "#7898a7",
    ink: "#142b3c",
    muted: "#536c7a",
    edge: "#87a7b5",
    cyan: "#a6d9e2",
    amber: "#cf924d",
    paper: "#f7f9fa"
  };

  /* ==========================================
     WORKFLOW COMPONENTS
     ========================================== */

  const baseNodes = [
    {
      id: "01",
      name: "WAZUH",
      note: "Alert detected",
      x: -5.85,
      y: 0.25,
      z: -0.12
    },
    {
      id: "02",
      name: "n8n",
      note: "Normalize event",
      x: -3.50,
      y: 0.48,
      z: 0.32
    },
    {
      id: "03",
      name: "TRIAGE",
      note: "Risk and severity",
      x: -1.15,
      y: 0.18,
      z: -0.28
    },
    {
      id: "04",
      name: "DFIR-IRIS",
      note: "Correlate cases",
      x: 1.25,
      y: 0.42,
      z: 0.16
    },
    {
      id: "05",
      name: "IOC SYNC",
      note: "Conditional write",
      x: 3.65,
      y: 0.12,
      z: -0.25
    },
    {
      id: "06",
      name: "SOC-03",
      note: "Context handoff",
      x: 5.95,
      y: 0.42,
      z: 0.22
    }
  ];

  const desktopEmail = {
    id: "07",
    name: "SOC EMAIL",
    note: "High / critical",
    x: -1.1,
    y: -2.05,
    z: 1
  };

  /*
   * MOBILE ARRANGEMENT
   *
   * The previous layout used rows only 2.15
   * world units apart. Model labels and notes
   * collided at smaller screen widths.
   *
   * Rows are now 3.15 units apart.
   */

  const phonePositions = [
    [-1.72, 3.65, 0],
    [ 1.72, 3.65, 0],

    [-1.72, 0.50, 0],
    [ 1.72, 0.50, 0],

    [-1.72, -2.65, 0],
    [ 1.72, -2.65, 0]
  ];

  const LOOP_MS = 24000;

  let width = 1;
  let height = 1;
  let dpr = 1;

  let yaw = -0.28;
  let pitch = 0.20;

  let drag = null;
  let running = false;
  let visible = true;

  let reduced = motionQuery.matches;
  let lastFrame = 0;

  const clamp = (value, min, max) =>
    Math.max(min, Math.min(max, value));

  /* ==========================================
     RESPONSIVE SCENE
     ========================================== */

  function scene() {
    const compact = width < 720;

    const nodes = baseNodes.map((item, index) => {
      if (!compact) {
        return { ...item };
      }

      return {
        ...item,
        x: phonePositions[index][0],
        y: phonePositions[index][1],
        z: phonePositions[index][2]
      };
    });

    const email = compact
      ? {
          ...desktopEmail,
          x: 0,
          y: -5.8,
          z: 0
        }
      : {
          ...desktopEmail
        };

    /*
     * Mobile is scaled by both available width
     * and height, preventing clipped modules.
     */

    const scale = compact
      ? Math.min(
          width / 7.7,
          height / 12.6,
          44
        )
      : Math.min(
          width / 16,
          height / 8.2,
          70
        );

    return {
      nodes,
      email,
      compact,
      scale
    };
  }

  /* ==========================================
     PERSPECTIVE PROJECTION
     ========================================== */

  function project(position, scale) {
    const cy = Math.cos(yaw);
    const sy = Math.sin(yaw);

    const cx = Math.cos(pitch);
    const sx = Math.sin(pitch);

    const x =
      position.x * cy +
      position.z * sy;

    const z =
      -position.x * sy +
      position.z * cy;

    const y =
      position.y * cx -
      z * sx;

    const depth =
      position.y * sx +
      z * cx;

    const perspective =
      12 / (12 + depth * 0.32);

    return {
      x:
        width * 0.5 +
        x * scale * perspective,

      y:
        height * 0.49 -
        y * scale * perspective,

      depth,
      k: perspective
    };
  }

  /* ==========================================
     CANVAS HELPERS
     ========================================== */

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

    for (let i = 1; i < points.length; i++) {
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
    lineWidth = 1,
    dash = []
  ) {
    if (points.length < 2) return;

    ctx.save();
    ctx.beginPath();

    ctx.moveTo(
      points[0].x,
      points[0].y
    );

    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(
        points[i].x,
        points[i].y
      );
    }

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.setLineDash(dash);
    ctx.lineJoin = "miter";

    ctx.stroke();
    ctx.restore();
  }

  function vertex(
    node,
    dx,
    dy,
    dz,
    scale
  ) {
    return project(
      {
        x: node.x + dx,
        y: node.y + dy,
        z: node.z + dz
      },
      scale
    );
  }

  /* ==========================================
     SQUARE-CORNER CONNECTIONS
     ========================================== */

  function pathBetween(
    a,
    b,
    compact,
    scale,
    branch = false
  ) {
    /*
     * Desktop: use clean orthogonal connectors.
     */

    if (!compact) {
      const midpoint =
        (a.x + b.x) / 2;

      return [
        {
          x: a.x,
          y: a.y - 0.12,
          z: a.z
        },
        {
          x: midpoint,
          y: a.y - 0.12,
          z: a.z
        },
        {
          x: midpoint,
          y: b.y - 0.12,
          z: b.z
        },
        {
          x: b.x,
          y: b.y - 0.12,
          z: b.z
        }
      ].map(
        p => project(p, scale)
      );
    }

    /*
     * Mobile notification branch:
     * route around the left side.
     */

    if (branch) {
      const outer = -2.65;

      return [
        {
          x: a.x,
          y: a.y - 0.15,
          z: 0
        },
        {
          x: outer,
          y: a.y - 0.15,
          z: 0
        },
        {
          x: outer,
          y: b.y,
          z: 0
        },
        {
          x: b.x,
          y: b.y,
          z: 0
        }
      ].map(
        p => project(p, scale)
      );
    }

    /*
     * Connection within the same mobile row.
     */

    if (Math.abs(a.y - b.y) < 0.01) {
      return [
        {
          x: a.x + 0.8,
          y: a.y - 0.12,
          z: 0
        },
        {
          x: b.x - 0.8,
          y: b.y - 0.12,
          z: 0
        }
      ].map(
        p => project(p, scale)
      );
    }

    /*
     * Connection from the right component to
     * the left component in the next row.
     *
     * Route through an exterior corridor
     * rather than across the model faces.
     */

    const corridor = 2.66;

    return [
      {
        x: a.x + 0.85,
        y: a.y - 0.12,
        z: 0
      },
      {
        x: corridor,
        y: a.y - 0.12,
        z: 0
      },
      {
        x: corridor,
        y: b.y - 0.12,
        z: 0
      },
      {
        x: b.x - 0.85,
        y: b.y - 0.12,
        z: 0
      }
    ].map(
      p => project(p, scale)
    );
  }

  function pointOnPolyline(
    points,
    t
  ) {
    const lengths = [];
    let total = 0;

    for (let i = 1; i < points.length; i++) {
      const distance = Math.hypot(
        points[i].x - points[i - 1].x,
        points[i].y - points[i - 1].y
      );

      lengths.push(distance);
      total += distance;
    }

    let remaining =
      total * clamp(t, 0, 1);

    for (let i = 0; i < lengths.length; i++) {
      if (
        remaining <= lengths[i] ||
        i === lengths.length - 1
      ) {
        const factor = lengths[i]
          ? remaining / lengths[i]
          : 0;

        return {
          x:
            points[i].x +
            (
              points[i + 1].x -
              points[i].x
            ) * factor,

          y:
            points[i].y +
            (
              points[i + 1].y -
              points[i].y
            ) * factor
        };
      }

      remaining -= lengths[i];
    }

    return points[points.length - 1];
  }

  /* ==========================================
     MOVING ALERT PACKETS
     ========================================== */

  function packet(
    point,
    small = false
  ) {
    if (!point) return;

    const size =
      small ? 6 : 8;

    ctx.save();

    ctx.shadowBlur = 11;
    ctx.shadowColor =
      "rgba(207,146,77,.45)";

    ctx.fillStyle = colors.amber;

    ctx.fillRect(
      point.x - size / 2,
      point.y - size / 2,
      size,
      size
    );

    ctx.restore();
  }

  /* ==========================================
     THREE-DIMENSIONAL MODEL
     ========================================== */

  function drawNode(
    node,
    scale,
    active,
    compact
  ) {
    const w = compact
      ? 1.57
      : 1.70;

    const h = compact
      ? 1.02
      : 1.13;

    const d = 0.70;

    const v = [
      vertex(node, -w / 2, -h / 2, -d / 2, scale),
      vertex(node,  w / 2, -h / 2, -d / 2, scale),
      vertex(node,  w / 2,  h / 2, -d / 2, scale),
      vertex(node, -w / 2,  h / 2, -d / 2, scale),

      vertex(node, -w / 2, -h / 2, d / 2, scale),
      vertex(node,  w / 2, -h / 2, d / 2, scale),
      vertex(node,  w / 2,  h / 2, d / 2, scale),
      vertex(node, -w / 2,  h / 2, d / 2, scale)
    ];

    /* Ground shadow */

    const shadow = vertex(
      node,
      0,
      -h / 2 - 0.12,
      0,
      scale
    );

    ctx.save();
    ctx.fillStyle =
      "rgba(20,43,60,.075)";

    ctx.beginPath();

    ctx.ellipse(
      shadow.x + 7,
      shadow.y + 10,
      w * scale * 0.39,
      scale * 0.095,
      0,
      0,
      Math.PI * 2
    );

    ctx.fill();
    ctx.restore();

    /* Shaded 3D surfaces */

    const faces = [
      {
        ids: [0, 1, 2, 3],
        color: "#3b6171"
      },
      {
        ids: [0, 4, 7, 3],
        color: "#486d7e"
      },
      {
        ids: [1, 5, 6, 2],
        color: colors.side
      },
      {
        ids: [3, 2, 6, 7],
        color: colors.top
      },
      {
        ids: [4, 5, 6, 7],
        color: colors.front
      }
    ];

    faces.sort((a, b) => {
      const depthA =
        a.ids.reduce(
          (sum, i) => sum + v[i].depth,
          0
        ) / 4;

      const depthB =
        b.ids.reduce(
          (sum, i) => sum + v[i].depth,
          0
        ) / 4;

      return depthA - depthB;
    });

    faces.forEach(face => {
      polygon(
        face.ids.map(i => v[i]),
        face.color,
        "rgba(166,217,226,.32)"
      );
    });

    /* Front-facing technical traces */

    const frontZ =
      d / 2 + 0.01;

    function trace(
      y,
      left,
      right
    ) {
      line(
        [
          vertex(
            node,
            left,
            y,
            frontZ,
            scale
          ),
          vertex(
            node,
            right,
            y,
            frontZ,
            scale
          )
        ],
        active
          ? colors.amber
          : colors.cyan,
        compact ? 1.6 : 2
      );
    }

    trace(
      h * 0.18,
      -w * 0.33,
      w * 0.26
    );

    trace(
      -h * 0.05,
      -w * 0.33,
      w * 0.11
    );

    line(
      [
        vertex(
          node,
          -w * 0.33,
          -h * 0.28,
          frontZ,
          scale
        ),
        vertex(
          node,
          w * 0.31,
          -h * 0.28,
          frontZ,
          scale
        )
      ],
      colors.edge,
      1.4
    );

    /* Status indicator */

    const led = vertex(
      node,
      w * 0.34,
      -h * 0.27,
      d / 2 + 0.02,
      scale
    );

    ctx.fillStyle = active
      ? colors.amber
      : colors.cyan;

    ctx.fillRect(
      led.x - 2.6,
      led.y - 2.6,
      5.2,
      5.2
    );

    /* Separated upper technical plate */

    const topPlate = [
      vertex(
        node,
        -w * 0.40,
        h / 2 + 0.16,
        -d * 0.36,
        scale
      ),
      vertex(
        node,
        w * 0.40,
        h / 2 + 0.16,
        -d * 0.36,
        scale
      ),
      vertex(
        node,
        w * 0.40,
        h / 2 + 0.16,
        d * 0.36,
        scale
      ),
      vertex(
        node,
        -w * 0.40,
        h / 2 + 0.16,
        d * 0.36,
        scale
      )
    ];

    polygon(
      topPlate,
      active
        ? "#bc9b76"
        : "#a0b9c5",
      colors.cyan,
      0.95
    );
  }

  /* ==========================================
     CLEAR, NON-OVERLAPPING LABELS
     ========================================== */

  function drawLabels(
    node,
    scale,
    compact
  ) {
    /*
     * The main name is above the model.
     * Technical notes are displayed only
     * on larger screens.
     */

    const namePoint = vertex(
      node,
      0,
      compact ? 0.90 : 1.13,
      0,
      scale
    );

    ctx.save();

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.font =
      `600 12px "DM Sans", Arial, sans-serif`;

    /*
     * A subtle light outline keeps names readable
     * against crossing technical connectors.
     */

    ctx.lineWidth = 3.5;
    ctx.strokeStyle =
      "rgba(247,249,250,.94)";

    ctx.strokeText(
      node.name,
      namePoint.x,
      namePoint.y
    );

    ctx.fillStyle = colors.ink;

    ctx.fillText(
      node.name,
      namePoint.x,
      namePoint.y
    );

    /*
     * Hide secondary technical notes on mobile.
     * They are already described in the page.
     */

    if (!compact) {
      const note = vertex(
        node,
        0,
        -0.92,
        0,
        scale
      );

      const label =
        `${node.id} / ${node.note}`;

      ctx.font =
        '10px "IBM Plex Mono", monospace';

      ctx.lineWidth = 3;
      ctx.strokeText(
        label,
        note.x,
        note.y
      );

      ctx.fillStyle =
        colors.muted;

      ctx.fillText(
        label,
        note.x,
        note.y
      );
    }

    ctx.restore();
  }

  /* ==========================================
     ANIMATED SCENE
     ========================================== */

  function draw(time) {
    ctx.clearRect(
      0,
      0,
      width,
      height
    );

    const {
      nodes,
      email,
      compact,
      scale
    } = scene();

    const progress = reduced
      ? 0.14
      : (time % LOOP_MS) / LOOP_MS;

    const activeIndex = Math.min(
      5,
      Math.floor(progress * 6)
    );

    /* Main signal routes */

    const routes = nodes
      .slice(0, -1)
      .map((node, i) =>
        pathBetween(
          node,
          nodes[i + 1],
          compact,
          scale
        )
      );

    const notification = pathBetween(
      nodes[2],
      email,
      compact,
      scale,
      true
    );

    routes.forEach((points, i) => {
      line(
        points,
        "rgba(95,136,153,.50)",
        1.3,
        [3, 5]
      );

      const segment =
        progress * 6 - i;

      if (
        !reduced &&
        segment >= 0 &&
        segment < 1
      ) {
        packet(
          pointOnPolyline(
            points,
            segment
          )
        );
      }
    });

    /* Conditional SOC email branch */

    line(
      notification,
      "rgba(169,116,58,.43)",
      1.3,
      [3, 6]
    );

    if (
      !reduced &&
      progress > 0.31 &&
      progress < 0.52
    ) {
      packet(
        pointOnPolyline(
          notification,
          (progress - 0.31) / 0.21
        ),
        true
      );
    }

    /*
     * Draw all 3D geometry first.
     * Draw all labels afterward.
     *
     * This prevents a later component
     * from covering an earlier label.
     */

    const modules = [
      ...nodes,
      email
    ];

    modules.sort(
      (a, b) =>
        project(a, scale).depth -
        project(b, scale).depth
    );

    for (const node of modules) {
      const index =
        nodes.findIndex(
          item => item.id === node.id
        );

      const active = index >= 0
        ? activeIndex === index
        : (
            progress > 0.31 &&
            progress < 0.52
          );

      drawNode(
        node,
        scale,
        active,
        compact
      );
    }

    for (const node of modules) {
      drawLabels(
        node,
        scale,
        compact
      );
    }
  }

  /* ==========================================
     RESIZE
     ========================================== */

  function resize() {
    const bounds =
      canvas.getBoundingClientRect();

    if (
      !bounds.width ||
      !bounds.height
    ) return;

    width = bounds.width;
    height = bounds.height;

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

    draw(performance.now());
  }

  /* ==========================================
     RENDER LOOP
     ========================================== */

  function frame(time) {
    if (!running) return;

    if (time - lastFrame >= 32) {
      draw(time);
      lastFrame = time;
    }

    requestAnimationFrame(frame);
  }

  function updateRunning() {
    const shouldRun =
      !reduced &&
      visible &&
      !document.hidden;

    if (shouldRun && !running) {
      running = true;
      requestAnimationFrame(frame);
    } else if (!shouldRun) {
      running = false;
      draw(performance.now());
    }
  }

  /* ==========================================
     DRAG ROTATION
     ========================================== */

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
        pitch,
        type: event.pointerType
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

      const dx =
        event.clientX - drag.x;

      const dy =
        event.clientY - drag.y;

      /*
       * Allow normal vertical scrolling
       * on touchscreens.
       */

      if (
        drag.type === "touch" &&
        Math.abs(dy) >
          Math.abs(dx) * 1.3
      ) {
        return;
      }

      const compact =
        width < 720;

      yaw = clamp(
        drag.yaw + dx * 0.005,
        compact ? -0.58 : -0.85,
        compact ? 0.58 : 0.85
      );

      pitch = clamp(
        drag.pitch + dy * 0.004,
        compact ? -0.04 : -0.1,
        compact ? 0.42 : 0.6
      );

      if (reduced || !running) {
        draw(performance.now());
      }
    }
  );

  for (const name of [
    "pointerup",
    "pointercancel",
    "lostpointercapture"
  ]) {
    canvas.addEventListener(
      name,
      () => {
        drag = null;
      }
    );
  }

  /* ==========================================
     KEYBOARD ROTATION
     ========================================== */

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

      if (!keys.includes(event.key)) {
        return;
      }

      event.preventDefault();

      const step = 0.085;
      const compact = width < 720;

      if (event.key === "Home") {
        yaw = compact ? -0.18 : -0.28;
        pitch = compact ? 0.12 : 0.20;
      }

      if (event.key === "ArrowLeft") {
        yaw -= step;
      }

      if (event.key === "ArrowRight") {
        yaw += step;
      }

      if (event.key === "ArrowUp") {
        pitch += step;
      }

      if (event.key === "ArrowDown") {
        pitch -= step;
      }

      yaw = clamp(
        yaw,
        compact ? -0.58 : -0.85,
        compact ? 0.58 : 0.85
      );

      pitch = clamp(
        pitch,
        compact ? -0.04 : -0.1,
        compact ? 0.42 : 0.6
      );

      draw(performance.now());
    }
  );

  /* ==========================================
     OBSERVERS
     ========================================== */

  if ("ResizeObserver" in window) {
    new ResizeObserver(
      resize
    ).observe(canvas);
  } else {
    window.addEventListener(
      "resize",
      resize
    );
  }

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      entries => {
        visible =
          entries[0]?.isIntersecting ??
          true;

        updateRunning();
      },
      {
        threshold: 0.01
      }
    ).observe(canvas);
  }

  document.addEventListener(
    "visibilitychange",
    updateRunning
  );

  function onMotionChange() {
    reduced = motionQuery.matches;
    updateRunning();
  }

  if (motionQuery.addEventListener) {
    motionQuery.addEventListener(
      "change",
      onMotionChange
    );
  } else {
    motionQuery.addListener(
      onMotionChange
    );
  }

  /* ==========================================
     INITIAL CAMERA
     ========================================== */

  if (window.innerWidth < 720) {
    yaw = -0.18;
    pitch = 0.12;
  }

  resize();
  updateRunning();
})();
