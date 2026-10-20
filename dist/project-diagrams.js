/* Abstract CV-backed ML workflow. Permanently separated 3D planes; no invented data or predictions. */
(() => {
  const theme=window.FieldnotesTheme,el=document.querySelector('[data-project-diagram="classifier"]');
  if(!theme||!el)return;
  const viewport=el.querySelector('.diagram-viewport'),canvas=el.querySelector('canvas'),ctx=canvas.getContext('2d');
  if(!ctx)return;
  if(typeof ctx.roundRect!=='function')ctx.roundRect=(x,y,width,height)=>ctx.rect(x,y,width,height);
  const baseCanvas=document.createElement('canvas'),baseContext=baseCanvas.getContext('2d');let baseKey='';
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'),root=document.documentElement;
  const enabled=()=>!reduced.matches&&!root.classList.contains('motion-off');
  const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),mix=(a,b,t)=>a+(b-a)*t;
  const nodes=[
    ['traffic','Traffic sample','Abstract input',0],['prepare','Preprocessing','Preparation, not specified',0],
    ['features','Feature engineering','No feature values supplied',0],['rf','Random Forest','Alternative candidate',1],
    ['svm','SVM','Alternative candidate',1],['xgb','XGBoost','Alternative candidate',1],
    ['evaluate','Evaluation / review','No per-model scores supplied',2]
  ];
  const phases=[
    ['Network-traffic sample','Follow one abstract sample from the CV-reported traffic data. No measured row or true class is supplied.','raw'],
    ['Preprocess the sample','The sample becomes a prepared representation. Cleaning, scaling and sampling operations are unspecified.','prepared'],
    ['Engineer a feature representation','The prepared sample becomes modeling input. The marks represent features without inventing names or values.','features'],
    ['Explore one model alternative','Follow one candidate. Random Forest, SVM and XGBoost are alternatives; their outputs are never combined.','candidate'],
    ['Evaluate the candidate','Review model performance, including precision, recall and false positives. This token carries no sample prediction.','evaluation'],
    ['Review the reported workflow','The result is a workflow for reviewing candidate performance. Reset the token and illustrate another alternative.','review']
  ];
  const insights=[
    ['Preparation','Traffic data → preprocessing → feature engineering. The specific dataset, split, operations and features are unavailable.'],
    ['Three alternatives','Random Forest, SVM and XGBoost are separate candidates. Each pass uses one branch; the figure never combines their predictions.'],
    ['Evaluation and review','The CV reports accuracy, precision, recall and false-positive evaluation. Per-model values and the underlying ML file are unavailable.']
  ];
  let w=1,h=1,unit=1,yaw=-.32,yawTarget=-.32,pitch=.38,pitchTarget=.38,manual=false;
  let clock=0,last=0,raf=0,visible=false,drag=null,selected=0,positions=[],labels=[],phase=0,branch=0,phaseKey='',faces=[];
  function project(p){
    const x=p[0]*Math.cos(yaw)+p[2]*Math.sin(yaw),z=-p[0]*Math.sin(yaw)+p[2]*Math.cos(yaw);
    const y=p[1]*Math.cos(pitch)-z*Math.sin(pitch),depth=p[1]*Math.sin(pitch)+z*Math.cos(pitch),f=14/(14-depth);
    return{x:w/2+x*unit*f,y:h/2-y*unit*f,depth};
  }
  function geometry(){
    positions=w<560?
      [[-.85,2.5,-.45],[.85,1.55,-.25],[-.85,.55,0],[.9,-.2,-.5],[.9,-1,.15],[.9,-1.8,.8],[-.85,-2.55,.2]]:
      [[-4,0,.3],[-2.45,0,.2],[-.85,0,.1],[1.1,.15,-1.65],[1.1,.15,0],[1.1,.15,1.65],[3.55,0,.2]];
    unit=w<560?Math.min(w/4.7,h/6.8):Math.min(w/9.6,h/5.6);
    const points=positions.map(project),mx=Math.max(...points.map(p=>Math.abs(p.x-w/2))),my=Math.max(...points.map(p=>Math.abs(p.y-h/2)));
    unit*=Math.min(1,(w/2-64)/Math.max(1,mx),(h/2-52)/Math.max(1,my));
  }
  function plate(i){
    const p=positions[i],a=i>=3&&i<=5?.62:.7,b=.12,c=.40;
    const pts=[[-a,-b,-c],[a,-b,-c],[a,b,-c],[-a,b,-c],[-a,-b,c],[a,-b,c],[a,b,c],[-a,b,c]].map(q=>q.map((v,j)=>v+p[j]));
    const active=[0,1,2,3+branch,6,6][phase]===i;
    [[0,1,2,3],[4,7,6,5],[0,4,5,1],[3,2,6,7],[0,3,7,4],[1,5,6,2]].forEach((ids,j)=>{
      const world=ids.map(k=>pts[k]),screen=world.map(project);
      faces.push({index:i,screen,depth:screen.reduce((n,q)=>n+q.depth,0)/4,fill:j===3?theme.color['surface-hover']:theme.color['surface-raised'],stroke:active?theme.color.amber:theme.color['border-strong'],alpha:active?1:.65});
    });
  }
  function path(a,b,active=false){
    const A=project(positions[a]),B=project(positions[b]);
    ctx.beginPath();ctx.moveTo(A.x,A.y);ctx.lineTo(B.x,B.y);ctx.strokeStyle=active?theme.color.amber:theme.color['border-strong'];ctx.globalAlpha=active?.75:.25;ctx.lineWidth=active?1.8:1;ctx.stroke();ctx.globalAlpha=1;
    return[A,B];
  }
  function token(p,kind){
    ctx.save();ctx.translate(p.x,p.y);ctx.fillStyle=theme.color.bg;ctx.strokeStyle=theme.color.amber;ctx.lineWidth=1.8;
    ctx.beginPath();ctx.roundRect(-11,-13,22,26,2);ctx.fill();ctx.stroke();
    ctx.fillStyle=theme.color.amber;ctx.fillRect(-9,-9,2,18);
    ctx.beginPath();
    if(kind==='raw'){ctx.moveTo(-3,-7);ctx.lineTo(6,-7);ctx.moveTo(-3,0);ctx.lineTo(3,0);ctx.moveTo(-3,7);ctx.lineTo(7,7);}
    else if(kind==='features'||kind==='prepared'){for(let i=0;i<3;i++){ctx.rect(-3+i*4,-7,2,14);}}
    else if(kind==='candidate'){ctx.arc(2,0,5,0,Math.PI*2);ctx.moveTo(-3,8);ctx.lineTo(7,8);}
    else{ctx.moveTo(-3,1);ctx.lineTo(0,5);ctx.lineTo(7,-5);}
    ctx.stroke();ctx.restore();
  }
  function drawLabels(){
    const active=[0,1,2,3+branch,6,6][phase],visibleNodes=nodes.map((_,i)=>i),occupied=[];
    const bounds=nodes.map((_,i)=>{const points=faces.filter(f=>f.index===i).flatMap(f=>f.screen),xs=points.map(p=>p.x),ys=points.map(p=>p.y);return{x:Math.min(...xs),y:Math.min(...ys),width:Math.max(...xs)-Math.min(...xs),height:Math.max(...ys)-Math.min(...ys)};});
    labels=[];
    visibleNodes.forEach(i=>{
      const p=project(positions[i]),name=nodes[i][1];
      ctx.font='500 '+theme.labelSize+'px '+theme.fontBody;
      const width=ctx.measureText(name).width+12,height=24;
      const candidates=[];
      for(let y=8;y<=h-height-8;y+=16)for(let x=8;x<=w-width-8;x+=16){
        const overlap=r=>x<r.x+r.width+4&&x+width+4>r.x&&y<r.y+r.height+4&&y+height+4>r.y;
        candidates.push({x,y,cost:occupied.filter(overlap).length*100000+bounds.filter(overlap).length*2000+Math.hypot(x+width/2-p.x,y+height/2-p.y)});
      }
      const box=candidates.sort((a,b)=>a.cost-b.cost)[0];
      ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(box.x+width/2,box.y+height/2);ctx.strokeStyle=theme.color['border-strong'];ctx.lineWidth=.7;ctx.stroke();
      ctx.fillStyle=theme.color.surface;ctx.fillRect(box.x,box.y,width,height);
      ctx.fillStyle=i===active?theme.color.amber:theme.color.ink;ctx.textAlign='left';ctx.fillText(name,box.x+6,box.y+17);
      labels.push({index:i,...box,width,height});occupied.push({...box,width,height});
    });
  }
  function updateText(){
    const key=enabled()?phase+':'+branch:'static';if(key===phaseKey)return;phaseKey=key;
    const title=el.querySelector('[data-diagram-process-title]'),text=el.querySelector('[data-diagram-process-description]');
    title.textContent=enabled()?phases[phase][0]+(phase===3?' · '+nodes[3+branch][1]:''):'Static workflow · three alternative candidates';
    text.textContent=enabled()?phases[phase][1]:'Traffic sample → preprocessing → feature engineering → one alternative candidate → evaluation/review. Read the full source-backed workflow below. No values, predictions or per-model scores are supplied.';
  }
  function inspect(index){
    selected=index;el.querySelectorAll('[data-diagram-stage]').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));
    const insight=el.querySelector('.diagram-insight');insight.querySelector('strong').textContent=insights[index][0];insight.querySelector('p').textContent=insights[index][1];
    // Inspection changes only this explanation, never the process clock or branch.
    draw();
  }
  function draw(){
    phase=Math.floor((clock%30000)/5000);branch=Math.floor(clock/30000)%3;updateText();
    const key=[w,h,yaw.toFixed(4),pitch.toFixed(4),phase,branch,enabled()].join(':');
    if(baseContext&&baseKey===key){ctx.clearRect(0,0,w,h);ctx.drawImage(baseCanvas,0,0,w,h);drawMarker();return;}
    geometry();ctx.clearRect(0,0,w,h);faces=[];
    [[0,1],[1,2],[2,3],[2,4],[2,5],[3,6],[4,6],[5,6]].forEach(([a,b])=>path(a,b));
    nodes.forEach((_,i)=>plate(i));
    faces.sort((a,b)=>a.depth-b.depth).forEach(f=>{
      ctx.beginPath();f.screen.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.closePath();ctx.fillStyle=f.fill;ctx.fill();ctx.globalAlpha=f.alpha;ctx.strokeStyle=f.stroke;ctx.lineWidth=1;ctx.stroke();ctx.globalAlpha=1;
    });
    drawLabels();
    if(baseContext){baseCanvas.width=canvas.width;baseCanvas.height=canvas.height;baseContext.drawImage(canvas,0,0);baseKey=key;}
    drawMarker();
  }
  function drawMarker(){
    // Only one candidate's path is active during a pass; no ensemble fan-out.
    if(enabled()){
      const chain=[0,0,1,2,3+branch,6,6],from=chain[phase],to=chain[phase+1];
      const [a,b]=from===to?[project(positions[from]),project(positions[to])]:path(from,to,true);
      const p=clamp(((clock%5000)/5000-.12)/.7),t=p*p*(3-2*p);
      token({x:mix(a.x,b.x,t),y:mix(a.y,b.y,t)},phases[phase][2]);
    }
  }
  function schedule(){if(!raf&&visible&&!document.hidden)raf=requestAnimationFrame(tick);}
  function tick(now){
    raf=0;if(!visible||document.hidden){last=0;return;}
    if(last&&now-last<32&&enabled()){schedule();return;}
    const dt=last?Math.max(0,now-last):0;last=now;
    if(enabled())clock+=dt;
    const k=enabled()?1-Math.exp(-dt/150):1;yaw+=(yawTarget-yaw)*k;pitch+=(pitchTarget-pitch)*k;
    draw();if(enabled())schedule();else last=0;
  }
  function resize(){
    const b=viewport.getBoundingClientRect();w=Math.max(1,b.width);h=Math.max(1,b.height);
    const ratio=Math.min(devicePixelRatio||1,1.6);canvas.width=Math.round(w*ratio);canvas.height=Math.round(h*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);
    if(!manual){yaw=yawTarget=w<560?-.12:-.32;pitch=pitchTarget=w<560?.18:.38;}
    draw();schedule();
  }
  function rotate(direction){
    manual=true;
    if(direction==='left')yawTarget-=.25;else if(direction==='right')yawTarget+=.25;
    else if(direction==='up')pitchTarget=clamp(pitchTarget-.08,-.2,.75);
    else if(direction==='down')pitchTarget=clamp(pitchTarget+.08,-.2,.75);
    else{manual=false;yawTarget=w<560?-.12:-.32;pitchTarget=w<560?.18:.38;}
    if(!enabled()){yaw=yawTarget;pitch=pitchTarget;}draw();schedule();
  }
  el.querySelectorAll('[data-diagram-stage]').forEach(b=>b.addEventListener('click',()=>inspect(Number(b.dataset.diagramStage))));
  el.querySelectorAll('[data-diagram-rotate]').forEach(b=>b.addEventListener('click',()=>rotate(b.dataset.diagramRotate)));
  canvas.addEventListener('keydown',e=>{
    const directions={ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'down',Home:'reset'};
    if(directions[e.key]){e.preventDefault();rotate(directions[e.key]);}
  });
  function release(e,cancelled=false){
    if(!drag||drag.id!==e.pointerId)return;
    const previous=drag;drag=null;if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);
    if(!cancelled&&!previous.moved){
      const b=viewport.getBoundingClientRect(),x=e.clientX-b.left,y=e.clientY-b.top;
      const label=labels.find(l=>x>=l.x&&x<=l.x+l.width&&y>=l.y&&y<=l.y+l.height);
      if(label)inspect(nodes[label.index][3]);
    }
    canvas.style.cursor='grab';
  }
  canvas.addEventListener('pointerdown',e=>{
    if(e.isPrimary===false){if(drag)release({pointerId:drag.id},true);return;}
    if(e.button>0||drag)return;
    drag={id:e.pointerId,x:e.clientX,y:e.clientY,yaw:yawTarget,pitch:pitchTarget,moved:false,axis:null,touch:e.pointerType!=='mouse'};
    if(!drag.touch)canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener('pointermove',e=>{
    if(!drag||drag.id!==e.pointerId)return;
    const dx=e.clientX-drag.x,dy=e.clientY-drag.y;
    if(drag.touch&&!drag.axis){
      if(Math.abs(dy)>9&&Math.abs(dy)>=Math.abs(dx)){drag=null;return;}
      if(Math.abs(dx)>9&&Math.abs(dx)>Math.abs(dy)*1.25){drag.axis='horizontal';canvas.setPointerCapture(e.pointerId);}
    }
    if((!drag.touch||drag.axis==='horizontal')&&Math.abs(dx)+Math.abs(dy)>9){
      manual=true;drag.moved=true;yawTarget=drag.yaw+dx*.006;if(!drag.touch)pitchTarget=clamp(drag.pitch+dy*.003,-.2,.75);
      if(!enabled()){yaw=yawTarget;pitch=pitchTarget;}canvas.style.cursor='grabbing';draw();schedule();
    }
  },{passive:true});
  canvas.addEventListener('pointerup',e=>release(e));canvas.addEventListener('pointercancel',e=>release(e,true));
  canvas.addEventListener('lostpointercapture',e=>release(e,true));
  function preference(){if(raf)cancelAnimationFrame(raf);raf=0;last=0;phaseKey='';draw();schedule();}
  reduced.addEventListener('change',preference);document.addEventListener('portfolio:motionchange',preference);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){if(raf)cancelAnimationFrame(raf);raf=0;last=0;}else schedule();});
  if('ResizeObserver' in window)new ResizeObserver(resize).observe(viewport);else window.addEventListener('resize',resize,{passive:true});
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{
    visible=entries[0].isIntersecting;if(!visible){if(raf)cancelAnimationFrame(raf);raf=0;last=0;}else{draw();schedule();}
  },{rootMargin:'60px'}).observe(viewport);else visible=true;
  window.FieldnotesML=Object.freeze({snapshot:()=>({clock,phase,branch,candidate:nodes[3+branch][1],yaw,pitch,visible,selected,labels:labels.map(l=>({...l}))})});
  el.classList.add('diagram-ready');el.querySelector('.diagram-toolbar').hidden=false;resize();inspect(0);
  document.fonts?.ready.then(()=>{baseKey='';draw();});
})();
