/* Time-based scene choreography. Viewport position never seeks the main timeline.
   21st motion references and adaptation decisions are recorded in design.md. */
(() => {
  const smooth = t => t * t * (3 - 2 * t);
  const smoother = t => t * t * t * (t * (t * 6 - 15) + 10);
  const cycle = (milliseconds, keys, easing = smooth) => {
    const duration = keys[keys.length - 1][0];
    const time = (milliseconds / 1000) % duration;
    for (let i = 1; i < keys.length; i++) {
      if (time <= keys[i][0]) {
        const [start, from] = keys[i - 1], [end, to] = keys[i];
        return from + (to - from) * easing((time - start) / (end - start));
      }
    }
    return keys[0][1];
  };
  window.FieldnotesPlayback = Object.freeze({
    // Adapted from the target/spring separation in 21st's CSS Box (100 stiffness, 30 damping).
    // Small integration steps keep the same response at variable frame rates.
    spring: (initial = 0) => ({
      value:initial,target:initial,velocity:0,
      step(milliseconds) {
        let remaining=Math.min(80,milliseconds)/1000;
        while(remaining>0){const dt=Math.min(remaining,1/120);this.velocity+=(100*(this.target-this.value)-30*this.velocity)*dt;this.value+=this.velocity*dt;remaining-=dt;}
        return this.value;
      },
      reset(){this.value=0;this.target=0;this.velocity=0;}
    }),
    // Entry/tap accents are timed overlays. They never seek the base loop.
    cue: () => ({
      age: 1800, duration: 1800, point: null,
      get active() { return this.age < this.duration; },
      get progress() { return Math.min(1, this.age / this.duration); },
      get strength() { return this.active ? Math.sin(Math.PI * this.progress) : 0; },
      trigger(point = null, restart = true) { if (!restart && this.active) return; this.age = 0; this.point = point; },
      step(dt) { this.age = Math.min(this.duration, this.age + dt); },
      clear() { this.age = this.duration; this.point = null; }
    }),
    // A tap is distinct from a scroll or pinch. Native vertical scrolling wins.
    bindTap: (element, callback) => {
      let pointer = null;
      element.addEventListener('pointerdown', event => {
        if (event.isPrimary === false || event.button > 0) { pointer = null; return; }
        pointer = {id:event.pointerId, x:event.clientX, y:event.clientY, moved:false};
      }, {passive:true});
      element.addEventListener('pointermove', event => {
        if (pointer?.id === event.pointerId && Math.hypot(event.clientX-pointer.x,event.clientY-pointer.y)>9) pointer.moved=true;
      }, {passive:true});
      element.addEventListener('pointerup', event => {
        const previous=pointer; pointer=null;
        if (!previous || previous.id!==event.pointerId || previous.moved || Math.hypot(event.clientX-previous.x,event.clientY-previous.y)>9) return;
        const bounds=element.getBoundingClientRect();
        callback(event.clientX-bounds.left,event.clientY-bounds.top,event);
      }, {passive:true});
      element.addEventListener('pointercancel', () => { pointer=null; }, {passive:true});
    },
    hero: clock => cycle(clock, [[0,0],[1.8,0],[5.4,.52],[7.4,.52],[11.2,1],[14.2,1],[18,0]], smoother),
    diagram: clock => cycle(clock, [[0,.25],[1,.25],[5,.85],[13,.85],[17,.25],[18,.25]]),
    ambient: clock => .55 + .35 * (1 - Math.cos(clock / 12000 * Math.PI * 2)) / 2,
    stage: clock => Math.floor((clock % 18000) / 6000)
  });
})();
