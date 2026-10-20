/* Original neon pointer: precise cyan hotspot, short solid trail, and click feedback.
   No external component source or dependencies. Native pointing always works. */
(() => {
  const theme=window.FieldnotesTheme; if(!theme)return;
  let palette=theme.light||theme;
  const setPalette=target=>{palette=target?.closest?.('.dark-surface')?theme:(theme.light||theme);};
  const root=document.documentElement;
  const fine=matchMedia('(hover: hover) and (pointer: fine)');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const contrast=matchMedia('(forced-colors: active)');
  const allowed=()=>fine.matches&&!reduced.matches&&!contrast.matches&&!root.classList.contains('motion-off')&&!document.hidden;
  const canvas=document.createElement('canvas');
  const ctx=canvas.getContext('2d',{alpha:true}); if(!ctx)return;
  canvas.className='neon-cursor';canvas.setAttribute('aria-hidden','true');canvas.hidden=true;
  document.body.append(canvas);
  const SIZE=160,C=SIZE/2,LIFE=110,MAX_TRAIL=48;
  let frame=0,point=null,trail=[],ripples=[],hot=false,hover=0,lastTime=0,visible=false;
  let pressed=false,mouse=null,targetDirty=false,nativeDrag=false;
  // Preserve precision tools, text selection, and the 3D model's native grab cue.
  const nativeSelector='input,textarea,select,option,[contenteditable]:not([contenteditable="false"]),.anatomy-stage canvas,.diagram-viewport canvas,[data-native-cursor]';
  const actionSelector='a[href],button:not(:disabled),summary,[role="button"]';
  function useNative(){
    if(frame)cancelAnimationFrame(frame);frame=0;lastTime=0;
    point=null;trail=[];ripples=[];pressed=false;visible=false;hover=0;
    canvas.hidden=true;root.classList.remove('neon-cursor-active');ctx.clearRect(0,0,SIZE,SIZE);
  }
  function hide(){mouse=null;targetDirty=false;nativeDrag=false;useNative();}
  function resize(){
    hide();const dpr=Math.min(devicePixelRatio||1,1.5);
    canvas.width=Math.round(SIZE*dpr);canvas.height=Math.round(SIZE*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  function blocked(target){return !allowed()||nativeDrag||document.getSelection()?.type==='Range'||document.querySelector('dialog[open]')||target?.closest?.(nativeSelector);}
  function schedule(){if(!frame&&mouse&&allowed())frame=requestAnimationFrame(draw);}
  function refreshTarget(now){
    const target=document.elementFromPoint(mouse.x,mouse.y);
    if(!target||blocked(target)){useNative();return;}
    // Scrolling changes the hit target, not the physical pointer or its trail.
    if(!point)point={x:mouse.x,y:mouse.y,time:now};
    setPalette(target);hot=!!target.closest?.(actionSelector);
  }
  function refreshOnScroll(){
    if(!mouse||!allowed())return;
    targetDirty=true;schedule();
  }
  function update(event){
    if(event.pointerType!=='mouse'){hide();return;}
    // Native pickers can consume pointerup; a released mouse ends that drag.
    if(event.buttons===0)nativeDrag=false;
    mouse={x:event.clientX,y:event.clientY};targetDirty=false;
    if(blocked(event.target)){useNative();return;}
    const now=performance.now(),x=event.clientX,y=event.clientY;
    // A new entry starts at the real pointer, never from a stale screen position.
    if(!point||Math.hypot(x-point.x,y-point.y)>350)trail=[];
    point={x,y,time:now};trail.push(point);
    if(trail.length>28)trail.splice(0,trail.length-28);
    setPalette(event.target);hot=!!event.target.closest?.(actionSelector);
    schedule();
  }
  function path(points){
    ctx.beginPath();ctx.moveTo(points[0].x,points[0].y);
    for(let i=1;i<points.length-1;i++)ctx.quadraticCurveTo(points[i].x,points[i].y,(points[i].x+points[i+1].x)/2,(points[i].y+points[i+1].y)/2);
    ctx.lineTo(points.at(-1).x,points.at(-1).y);
  }
  function draw(now){
    frame=0;if(!mouse||!allowed()||document.querySelector('dialog[open]')){hide();return;}
    if(targetDirty){targetDirty=false;refreshTarget(now);}
    if(!point)return;
    const dt=lastTime?Math.min(now-lastTime,50):16;lastTime=now;
    hover+=((hot?1:0)-hover)*(1-Math.exp(-dt/65));
    canvas.style.transform=`translate3d(${point.x-C}px,${point.y-C}px,0)`;
    ctx.clearRect(0,0,SIZE,SIZE);ctx.lineCap='round';ctx.lineJoin='round';
    trail=trail.filter(p=>now-p.time<LIFE);
    let length=0,first=trail.length-1;
    for(let i=trail.length-2;i>=0;i--){length+=Math.hypot(trail[i+1].x-trail[i].x,trail[i+1].y-trail[i].y);if(length>MAX_TRAIL)break;first=i;}
    if(first>0)trail=trail.slice(first);
    if(trail.length>1){
      const points=trail.map(p=>({x:C+p.x-point.x,y:C+p.y-point.y}));
      const tail=points[0],head=points.at(-1),distance=Math.hypot(head.x-tail.x,head.y-tail.y);
      if(distance>1){
        const fade=Math.max(0,1-(now-point.time)/LIFE);
        ctx.strokeStyle=palette.color.cyan;ctx.lineWidth=1.5;ctx.globalAlpha=fade*.6;path(points);ctx.stroke();
        ctx.globalAlpha=1;
      }
    }
    ripples=ripples.filter(r=>now-r.time<430&&Math.hypot(r.x-point.x,r.y-point.y)<120);
    ripples.forEach(r=>{
      const age=(now-r.time)/430,t=1-(1-age)**3;
      ctx.beginPath();ctx.arc(C+r.x-point.x,C+r.y-point.y,7+t*12,0,Math.PI*2);
      ctx.lineWidth=1.3*(1-age)+.3;ctx.strokeStyle=`rgba(${palette.rgb['cyan']},${(1-age)*.55})`;ctx.shadowColor=palette.color['cyan'];ctx.shadowBlur=0;ctx.stroke();ctx.shadowBlur=0;
    });
    // The arrow tip is the actual click hotspot; only the trail lags behind it.
    ctx.save();ctx.translate(C,C);const size=pressed?.9:1;ctx.scale(size,size);
    ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(.5,18);ctx.lineTo(5,13.9);ctx.lineTo(8.3,21);ctx.lineTo(11.8,19.3);ctx.lineTo(8.4,12);ctx.lineTo(15,11.5);ctx.closePath();
    ctx.shadowColor=palette.color['cyan'];ctx.shadowBlur=0;
    ctx.fillStyle=hot?palette.color['cyan']:palette.color['surface-active'];ctx.strokeStyle=palette.color['paper'];ctx.lineWidth=1.3;ctx.fill();ctx.stroke();ctx.restore();
    if(!visible){canvas.hidden=false;root.classList.add('neon-cursor-active');visible=true;}
    // Keep a still cursor visible but stop rendering once all movement settles.
    if(trail.length>1||ripples.length||Math.abs((hot?1:0)-hover)>.002)schedule();else lastTime=0;
  }
  document.addEventListener('pointermove',update,{passive:true});
  document.addEventListener('pointerover',event=>{
    if(event.pointerType!=='mouse'||!mouse)return;
    if(blocked(event.target))useNative();
    refreshOnScroll();
  },{passive:true});
  document.addEventListener('pointerdown',event=>{
    if(event.button!==0||event.pointerType!=='mouse'){hide();return;}
    nativeDrag=!!event.target.closest?.(nativeSelector);
    update(event);if(!point)return;
    pressed=true;ripples.push({x:event.clientX,y:event.clientY,time:performance.now()});ripples=ripples.slice(-3);schedule();
  },{passive:true});
  document.addEventListener('pointerup',event=>{
    pressed=false;nativeDrag=false;
    if(event.pointerType!=='mouse'){hide();return;}
    if(blocked(event.target))useNative();
    refreshOnScroll();
  },{passive:true});
  document.addEventListener('pointerout',event=>{if(!event.relatedTarget)hide();});
  document.addEventListener('pointercancel',hide);
  document.addEventListener('keydown',event=>{if(event.key==='Tab'||event.key==='Escape')hide();});
  document.addEventListener('selectionchange',()=>{if(document.getSelection()?.type==='Range')useNative();});
  document.addEventListener('portfolio:motionchange',hide);
  document.addEventListener('visibilitychange',hide);
  window.addEventListener('blur',hide);
  window.addEventListener('scroll',refreshOnScroll,{passive:true,capture:true});
  window.addEventListener('resize',resize,{passive:true});
  window.addEventListener('pagehide',hide);
  [fine,reduced,contrast].forEach(query=>query.addEventListener('change',hide));
  // Native dialogs live above document overlays. Restore the native pointer as
  // soon as either viewer opens, including a dialog opened from the keyboard.
  const dialogs=[...document.querySelectorAll('dialog')];
  if('MutationObserver' in window){const observer=new MutationObserver(()=>{if(document.querySelector('dialog[open]'))hide();});dialogs.forEach(dialog=>observer.observe(dialog,{attributes:true,attributeFilter:['open']}));}
  resize();
})();
