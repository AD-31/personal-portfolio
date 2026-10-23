
/*
 * SHARED MOTION PREFERENCES
 *
 * Manages:
 * - System reduced-motion preferences
 * - Dialog entrance and exit transitions
 * - Sitewide motion-active / motion-off state
 *
 * Text reveals are coordinated by terminal-type.js.
 * Canvas renderer clocks remain independent.
 */

(() => {
  "use strict";

  const root = document.documentElement;

  const reduced = matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  let transition = null;

  const enabled = () => !reduced.matches;

  /* =====================================
     TRANSITION CLEANUP
     ===================================== */

  function stopTransition(
    completeClose = false
  ) {
    const previous = transition;

    transition = null;

    if (!previous) {
      return;
    }

    clearTimeout(previous.timer);

    previous.animation?.cancel();

    if (
      completeClose &&
      previous.done
    ) {
      previous.done();
    }
  }

  /* =====================================
     DIALOG OPEN
     ===================================== */

  function openDialog(dialog) {
    stopTransition();

    if (
      !enabled() ||
      typeof dialog.animate !== "function"
    ) {
      return;
    }

    const animation = dialog.animate(
      [
        {
          opacity: 0,
          transform: "translateY(10px)"
        },
        {
          opacity: 1,
          transform: "translateY(0)"
        }
      ],
      {
        duration: 190,
        easing:
          "cubic-bezier(.22, 1, .36, 1)"
      }
    );

    transition = {
      animation
    };

    animation.finished.then(
      () => {
        if (
          transition?.animation ===
          animation
        ) {
          transition = null;
        }
      },
      () => {}
    );
  }

  /* =====================================
     DIALOG CLOSE
     ===================================== */

  function closeDialog(
    dialog,
    done
  ) {
    if (transition?.done) {
      return;
    }

    stopTransition();

    if (
      !enabled() ||
      typeof dialog.animate !== "function"
    ) {
      done();
      return;
    }

    const state = {
      done
    };

    transition = state;

    const finish = () => {
      if (transition !== state) {
        return;
      }

      transition = null;

      clearTimeout(state.timer);

      state.animation?.cancel();

      done();
    };

    state.animation = dialog.animate(
      [
        { opacity: 1 },
        { opacity: 0 }
      ],
      {
        duration: 125,
        easing: "ease-in"
      }
    );

    state.timer = setTimeout(
      finish,
      190
    );

    state.animation.finished.then(
      finish,
      finish
    );
  }

  /* =====================================
     MOTION PREFERENCES
     ===================================== */

  function applyPreference() {
    const on = enabled();

    root.classList.toggle(
      "motion-active",
      on
    );

    root.classList.toggle(
      "motion-off",
      !on
    );

    if (!on) {
      stopTransition(true);
    }

    document.dispatchEvent(
      new CustomEvent(
        "portfolio:motionchange",
        {
          detail: {
            enabled: on
          }
        }
      )
    );
  }

  if (reduced.addEventListener) {
    reduced.addEventListener(
      "change",
      applyPreference
    );
  } else {
    reduced.addListener(
      applyPreference
    );
  }

  /* =====================================
     PUBLIC API — PRESERVED
     ===================================== */

  window.portfolioMotion = {
    openDialog,

    closeDialog,

    endDialog: () =>
      stopTransition()
  };

  applyPreference();
})();
