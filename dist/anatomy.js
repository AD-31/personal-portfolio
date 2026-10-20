/* Evidence-linked 3D system anatomy. Device forms illustrate documented host and service roles; they are not hardware inventory.
   Perspective projection, depth-sorted faces, native controls, no dependencies. */
(() => {
  const theme=window.FieldnotesTheme, sequences=window.FieldnotesSequences; if(!theme||!sequences)return;
  const shell=document.querySelector('#anatomy-explorer'); if(!shell)return;
  const stage=shell.querySelector('.anatomy-stage'), canvas=stage.querySelector('canvas');
  const ctx=canvas.getContext('2d'); if(!ctx)return;
  if(typeof ctx.roundRect!=='function')ctx.roundRect=(x,y,width,height)=>ctx.rect(x,y,width,height);
  const baseCanvas=document.createElement('canvas'),baseContext=baseCanvas.getContext('2d');
  let baseKey='';
  const root=document.documentElement, reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const allowed=()=>!reduced.matches&&!root.classList.contains('motion-off');
  const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n));
  const lerp=(a,b,t)=>a+(b-a)*t;
  const palette=theme.series;
  const records={
    detection:{link:'#detection',parts:[
      ['Endpoints & Wazuh agents','The thesis records five enrolled Ubuntu agents. The endpoint stations represent their host role: agents collect and forward events to the manager. Their physical chassis are illustrative.','wazuh-agents','wazuh-agents.png',1849,481,'CLP · Figure 58 · page 84','Endpoints / agents'],
      ['Linux runtime · Tetragon','Tetragon provides Linux runtime observations. The runtime sensor and agent are shown as separated logical roles on the monitored endpoint, not an extra network hop. Figure 59 preserves the event and its observed fields.','wazuh-runtime-record','wazuh-runtime-record.png',894,850,'CLP · Figure 59 · page 85','Tetragon'],
      ['Wazuh manager · parsing & rules','The manager turns collected events into structured fields and applies detection rules. The opened service trays represent that processing; the original Tetragon decoder shows the actual parsing work.','wazuh-tetragon-decoder','wazuh-tetragon-decoder.png',553,157,'CLP · Figure 32 · page 54','Wazuh manager'],
      ['MISP indicator context','MISP supplies indicator context for matching. The original decoder extracts fields from MISP integration output; it is a software integration, not a standalone physical security appliance.','wazuh-misp-decoder','wazuh-misp-decoder.png',522,249,'CLP · Figure 31 · page 54','MISP'],
      ['Wazuh indexer · searchable events','The indexer supports stored, searchable events. The linked evidence is the thesis dashboard event view; it demonstrates reviewable records, not storage performance or a specific hardware configuration.','wazuh-log-collection','wazuh-log-collection.png',1843,898,'CLP · Figure 20 · page 50','Indexer'],
      ['Dashboard · analyst review','The analyst console connects to the indexed evidence. Access is scoped separately: the original configuration maps the SOC analyst to the readonly role.','wazuh-readonly-role','wazuh-readonly-role.png',703,751,'CLP · Figure 40 · page 57','Dashboard']
    ]},
    network:{link:'#assessment',parts:[
      ['pfSense boundary','The original topology places pfSense between three subnets. This model separates those zones so their hosts and connections can be inspected; a drawn boundary alone does not establish isolation.','topology','../sme-topology.png',1174,665,'In-house · Figure 1 · page 31','pfSense'],
      ['LAN · 172.16.10.0/24','Kali at 172.16.10.100 and the Windows host at 172.16.10.10 sit in the LAN. The assessment used this position to check which services could be reached in other zones.','topology','../sme-topology.png',1174,665,'In-house · Figure 1 · page 31','LAN'],
      ['DMZ · 172.16.40.0/24','The web/database host is 172.16.40.10. The source scan records HTTP, HTTPS, and PostgreSQL reachable from the LAN position—concrete exposure to compare against the intended policy.','assessment-dmz-services','assessment-dmz-services.png',1121,430,'In-house · Figure 23 · page 48','DMZ'],
      ['Server farm · 172.16.30.0/24','DC01 at 172.16.30.10 and the backup host at 172.16.30.20 share this zone. The source scan exposes directory services; separate evidence below the project records backup-host exposure.','assessment-directory-services','assessment-directory-services.png',1401,538,'In-house · Figure 26 · page 49','Server farm']
    ]},
    identity:{link:'#assessment',parts:[
      ['The lab ROOT account','BloodHound records the account’s privileged group memberships. The model follows only relationships visible in the supplied figures, without inventing an exploit sequence.','assessment-directory-membership','assessment-directory-membership.png',1144,535,'In-house · Figure 39 · page 59','ROOT account'],
      ['Enterprise Admins','The membership figure connects the lab account to this group. The permissions figure shows a GenericAll relationship from Enterprise Admins to the lab domain.','assessment-directory-paths','assessment-directory-paths.png',982,304,'In-house · Figure 40 · page 60','Enterprise Admins'],
      ['Administrators','The source records membership in Administrators and an AllExtendedRights relationship from this group to the domain. Review the actual permission graph alongside the model.','assessment-directory-paths','assessment-directory-paths.png',982,304,'In-house · Figure 40 · page 60','Administrators'],
      ['Domain Admins','The lab account belongs to Domain Admins. The second source graph records AllExtendedRights between this group and the domain; that relationship is what the model illustrates.','assessment-directory-paths','assessment-directory-paths.png',982,304,'In-house · Figure 40 · page 60','Domain Admins'],
      ['The domain object','The domain is the common destination of the three displayed permission relationships. This is an analyzed privilege model, not evidence that each path was exploited.','assessment-directory-paths','assessment-directory-paths.png',982,304,'In-house · Figure 40 · page 60','Domain']
    ]}
  };
  let model='detection', selected=0, separation=1,target=1;
  let yaw=-.62,yawTarget=-.62,pitch=.43,tiltTarget=.43,w=1,h=1,unit=1;
  let raf=0,last=0,visible=false,loopClock=0;
  const clocks={detection:0,network:0,identity:0};
  let anchors={};
  let labels=[],faces=[],details=[],shadows=[],links=[],processing=[],annotations=[],drag=null,hover=-1,cameraManual=false,currentPart=-1,inspectionActive=false;
  let story=sequences.at(model,0),readoutKey='';
  const cue=window.FieldnotesPlayback.cue();
  const modelButtons=[...shell.querySelectorAll('[data-anatomy-model]')];
  const partList=shell.querySelector('.anatomy-part-list');
  const readout=shell.querySelector('.sequence-readout'),transcript=document.querySelector('.sequence-transcript');

  function describeProcess(){
    const key=model+':'+(allowed()?story.phase+':'+(story.port?.port||''):'static');
    if(key===readoutKey)return;
    readoutKey=key;readout.hidden=false;
    readout.querySelector('.sequence-title').textContent=allowed()?story.title:'Read this permanently separated system';
    readout.querySelector('.sequence-description').textContent=allowed()?story.caption:sequences.definitions[model].summary;
    readout.querySelector('.sequence-lineage').textContent=story.lineage;
    readout.querySelector('.sequence-form').textContent=allowed()?story.form.replace('raw','raw event record'): 'Static overview';
    readout.querySelector('.sequence-fields').textContent=allowed()?story.fields.join(' · '):'The complete process and its sources are available below.';
    const io=readout.querySelector('.sequence-io');readout.querySelector('.sequence-contract').hidden=!allowed();
    for(const name of ['input','tool','output'])io.querySelector('[data-sequence-'+name+']').textContent=story[name];
    const source=readout.querySelector('.sequence-source');
    source.dataset.evidence=story.evidence;source.textContent='Inspect source';
    source.setAttribute('aria-label','Inspect '+story.source);
    readout.querySelector('.sequence-citation').textContent=story.source;
  }
  function describeAllSteps(){
    transcript.replaceChildren();
    const def=sequences.definitions[model];
    def.stages.forEach(step=>{
      const item=document.createElement('li'),title=document.createElement('strong'),text=document.createElement('p'),io=document.createElement('p'),source=document.createElement('button');
      title.textContent=step.title;text.textContent=step.change;
      io.textContent='Input: '+step.input+' · Tool: '+step.tool+' · Output: '+step.output;
      source.type='button';source.className='sequence-source';source.dataset.evidence=step.evidence;source.textContent=step.source;
      item.append(title,text,io,source);transcript.append(item);
    });
    if(def.ports){
      const item=document.createElement('li');
      item.textContent='Figure 23 observations: '+def.ports.map(p=>p.port+'/tcp open '+p.service+' — '+p.version).join('; ')+'. The loop reviews each port separately.';
      transcript.append(item);
    }
  }

  function selectPart(i,announce=true){
    selected=i;if(announce)inspectionActive=true;if(announce&&allowed())cue.trigger();const p=records[model].parts[i];
    partList.querySelectorAll('button').forEach((b,j)=>b.setAttribute('aria-pressed',String(i===j)));
    shell.querySelector('.anatomy-part-copy').setAttribute('aria-live',announce?'polite':'off');
    shell.querySelector('.anatomy-inspector h4').textContent=p[0];
    shell.querySelector('.anatomy-description').textContent=p[1];
    const evidence=shell.querySelector('.anatomy-evidence'),img=evidence.querySelector('img');
    evidence.dataset.evidence=p[2];evidence.setAttribute('aria-label',`Inspect original evidence for ${p[0]}`);
    img.src=p[3].startsWith('../')?'assets/'+p[3].slice(3):'assets/evidence/'+p[3];
    img.width=p[4];img.height=p[5];img.alt=`Original thesis evidence for ${p[0]}. ${p[6]}.`;
    evidence.querySelector('small').textContent=p[6];
    const relations=shell.querySelector('.anatomy-relations');
    relations.replaceChildren();
    if(model==='identity'&&i>0&&i<4){
      [['assessment-directory-membership','Inspect MemberOf · Figure 39'],['assessment-directory-paths','Inspect '+(i===1?'GenericAll':'AllExtendedRights')+' · Figure 40']].forEach(([key,label])=>{
        const button=document.createElement('button');button.type='button';button.className='sequence-source';button.dataset.evidence=key;button.textContent=label;relations.append(button);
      });
    }
    draw();schedule();
  }
  function chooseModel(key){
    clocks[model]=loopClock;model=key;selected=0;hover=-1;loopClock=clocks[key];last=0;inspectionActive=false;separation=target=1;
    yawTarget=-.62;tiltTarget=.43;cameraManual=false;readoutKey='';
    modelButtons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.anatomyModel===key)));
    partList.replaceChildren();
    records[key].parts.forEach((p,i)=>{const b=document.createElement('button');b.type='button';b.textContent=key==='network'&&i>0?p[0]:p[7];b.setAttribute('aria-label',`Inspect ${p[0]}`);b.addEventListener('click',()=>selectPart(i));partList.append(b);});
    shell.querySelector('.anatomy-project-link').href=records[key].link;
    if(!allowed())separation=target;
    describeAllSteps();measure();selectPart(0,false);draw();schedule();
    document.dispatchEvent(new CustomEvent('portfolio:modelchange',{detail:{model:key}}));
  }
  function measure(){
    story=sequences.at(model,loopClock);
    target=separation=1;
    if(!cameraManual){yawTarget=w<560?-.08:-.46;tiltTarget=w<560?.68:.48;}
    describeProcess();
  }
  function resize(){const r=stage.getBoundingClientRect();w=Math.max(1,r.width);h=Math.max(1,r.height);unit=Math.min(w/7.4,h/5.7);const dpr=Math.min(devicePixelRatio||1,1.6);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);measure();draw();schedule();}
  function project(p){
    const x=p[0]*Math.cos(yaw)+p[2]*Math.sin(yaw),z=-p[0]*Math.sin(yaw)+p[2]*Math.cos(yaw);
    const y=p[1]*Math.cos(pitch)-z*Math.sin(pitch),depth=p[1]*Math.sin(pitch)+z*Math.cos(pitch),f=11/(11-depth);
    return {x:w*.5+x*unit*f,y:h*.44-y*unit*f,depth,f};
  }
  function polygon(points,fill,stroke,width=1){ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.closePath();if(fill){ctx.fillStyle=fill;ctx.fill();}if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=width;ctx.stroke();}}
  function addFace(points,fill,stroke,lineWidth=1,cull=false){
    const ps=points.map(project);
    // Cuboids use inward winding. Positive screen area is their visible exterior.
    // Cull closed chassis backs; software planes remain two-sided for inspection.
    if(cull&&ps.reduce((area,p,i)=>{const next=ps[(i+1)%ps.length];return area+p.x*next.y-next.x*p.y;},0)<=0)return;
    faces.push({world:points,points:ps,depth:ps.reduce((s,p)=>s+p.depth,0)/ps.length,fill,stroke,lineWidth,part:currentPart});
  }
  const channels=value=>value.split(',').map(Number);
  const mix=(a,b,amount)=>a.map((value,i)=>Math.round(lerp(value,b[i],amount)));
  const surface=channels(theme.rgb['surface-raised']),paper=channels(theme.rgb.paper);
  // Fixed world-space key light: top/left facets catch light while the underside stays dark.
  // This is solid per-face shading, not a gradient, bloom, or a claim of PBR rendering.
  const facetLight=[.23,.47,.06,.89,.66,.31];
  const materialCache=new Map();
  function material(group,face,active){
    const key=group+':'+face+':'+active;
    if(!materialCache.has(key)){
      const tinted=mix(surface,channels(palette[group%palette.length]),.09);
      const lit=mix(tinted,paper,.025+facetLight[face]*(active?.22:.16));
      materialCache.set(key,'rgb('+lit.join(',')+')');
    }
    return materialCache.get(key);
  }
  function cuboid(center,size,g,active=false){
    active=active||(story.parts.includes(currentPart)&&story.emphasis>.4);
    const [x,y,z]=center,[a,b,c]=size.map(v=>v/2),col=palette[g%palette.length];
    const p=[[-a,-b,-c],[a,-b,-c],[a,b,-c],[-a,b,-c],[-a,-b,c],[a,-b,c],[a,b,c],[-a,b,c]].map(v=>[v[0]+x,v[1]+y,v[2]+z]);
    [[0,1,2,3],[4,7,6,5],[0,4,5,1],[3,2,6,7],[0,3,7,4],[1,5,6,2]].forEach((ids,i)=>{
      const top=i===3;
      addFace(ids.map(k=>p[k]),material(g,i,active),`rgba(${col},${active?(top?.78:.36):(top?.34:.14)})`,active&&top?1.2:.65,true);
    });
  }
  function footprint(p,width,depth){
    const [x,y,z]=p;
    // Small layered, unblurred contact shadows anchor each illustrative host.
    // They are static and are cached with geometry; no extra overlay animation.
    for(const [scale,alpha] of [[1.14,.07],[1,.15]]){
      const a=width*scale/2,b=depth*scale/2;
      shadows.push({points:[[x-a,y-.07,z-b],[x+a,y-.07,z-b],[x+a,y-.07,z+b],[x-a,y-.07,z+b]],alpha});
    }
  }
  function line(points,color,alpha=.5,width=1,dashed=false){const p=points.map(project);ctx.beginPath();p.forEach((v,i)=>i?ctx.lineTo(v.x,v.y):ctx.moveTo(v.x,v.y));ctx.strokeStyle=`rgba(${color},${alpha})`;ctx.lineWidth=width;ctx.setLineDash(dashed?[4,5]:[]);ctx.stroke();ctx.setLineDash([]);return p;}
  function lerp3(a,b,t){return a.map((n,i)=>lerp(n,b[i],t));}
  function connect(a,b,g,key,parts){links.push({a,b,g,key,parts});}
  function addLabel(p,index){const text=model==='network'&&index===1?'LAN / Kali':model==='network'&&index===2?'DMZ host':records[model].parts[index][7];labels.push({world:p,p:project(p),index,text,color:palette[index%5]});}
  function owned(index,drawPart){currentPart=index;drawPart();currentPart=-1;}
  function plate(x,y,z,width,height,g,fill=theme.color.bg){
    addFace([[x-width/2,y-height/2,z],[x+width/2,y-height/2,z],[x+width/2,y+height/2,z],[x-width/2,y+height/2,z]],fill,`rgba(${palette[g%5]},.55)`,.85);
  }
  function light(x,y,z,g,size=.035){
    plate(x,y,z,size,size,g,`rgba(${palette[g%5]},.9)`);
  }
  function server(p,g,{width=.95,height=1.35,depth=.9,rows=3,open=0,name='',process=false}={}){
    const [x,y,z]=p,front=z+depth/2;
    footprint([x,y,z+.12],width,depth+.24);
    // Rack rails, a removable lid, and front-access service trays identify a host.
    cuboid([x,y+.05,z],[width+.08,.1,depth+.08],g,g===selected);
    for(const side of [-1,1])cuboid([x+side*(width/2-.045),y+height/2,z],[.09,height,depth],g,g===selected);
    const lidLift=open*(process?.9:.3);
    cuboid([x,y+height+.035+lidLift,z-open*.12],[width,.07,depth],g,g===selected);
    cuboid([x,y+height/2,z-depth/2+.035],[width,.95*height,.07],g,false);
    // Folded rack lips and isolated fasteners give the separated enclosure a readable thickness.
    for(const side of [-1,1]){
      cuboid([x+side*(width/2+.018),y+height/2,front+.015],[.05,height,.055],g,false);
      for(const fraction of [.12,.88])plate(x+side*(width/2+.018),y+height*fraction,front+.046,.025,.025,g,theme.color['border-strong']);
    }
    for(let row=0;row<rows;row++){
      const sy=y+.17+(height-.3)*row/Math.max(1,rows-1)+(process?open*row*.17:0),sz=front+open*(process?.22+row*.14:row===1?.33:.12);
      cuboid([x,sy,sz-depth*.38],[width-.17,.19,depth*.76],g,g===selected);
      plate(x,sy,sz+.012,width-.19,.14,g);
      // Two drive/port apertures, a handle and a small activity light per tray.
      for(let port=0;port<2;port++){
        const px=x-width*.23+port*width*.21;
        plate(px,sy,sz+.022,width*.14,.072,g,theme.color.black);
        plate(px,sy-.023,sz+.026,width*.105,.009,g,theme.color['border-strong']);
      }
      plate(x+width*.24,sy,sz+.025,.08,.032,g,theme.color['border-strong']);
      light(x+width*.34,sy+.033,sz+.031,g);
      if(process){
        // Physical board shapes illustrate four logical software stages; they are not Wazuh hardware.
        cuboid([x,sy+.111,sz-depth*.38],[width*.64,.025,depth*.48],g,false);
        cuboid([x-.13,sy+.151,sz-depth*.4],[.23,.055,.22],g,false);
        for(let bank=0;bank<2;bank++)cuboid([x+.2,sy+.142,sz-depth*(.27+bank*.18)],[.19,.035,.075],g,false);
        processing.push({world:[x,sy,sz+.07],index:row,label:['Collection','JSON decoder','Rule 732011','Alert'][row],g});
      }
    }
    for(let vent=0;vent<5;vent++){
      const vx=x-width*.26+vent*width*.13;
      cuboid([vx,y+height+.08+lidLift,z-open*.12],[width*.065,.015,depth*.48],g,false);
    }
    return [x,y+height*.44,front+.04];
  }
  function workstation(p,g,kind='terminal',name=''){
    const [x,y,z]=p;
    footprint([x+.18,y,z+.12],1.5,.9);
    cuboid([x,y+.025,z+.23],[1.02,.05,.65],g,g===selected);
    cuboid([x,y+.24,z-.08],[.13,.4,.13],g,g===selected);
    cuboid([x,y+.72,z-.11],[1.03,.65,.12],g,g===selected);
    plate(x,y+.73,z-.038,.9,.5,g,theme.color.black);
    plate(x,y+1.025,z-.029,.9,.018,g,theme.color['border-strong']);
    // Terminal/event rows are symbolic UI, with no invented readings or metrics.
    if(kind==='dashboard'){
      const reviewed=model==='detection'&&story.phase>=7;
      for(let row=0;row<3;row++){
        plate(x-.08,y+.87-row*.12,z-.03,.63,.043,g,reviewed&&row===0?theme.color.cyan:theme.color['surface-hover']);
        plate(x+.32,y+.87-row*.12,z-.029,.045,.043,g,theme.color['border-strong']);
      }
      plate(x,y+.52,z-.029,.77,.035,g,theme.color['border-strong']);
    }else{
      for(let row=0;row<4;row++)plate(x-.1+(row%2)*.08,y+.87-row*.105,z-.03,.55-(row%3)*.1,.026,g,`rgba(${palette[g%5]},${.7-row*.12})`);
    }
    // A keyboard and side-mounted host make the station legible in silhouette.
    for(let row=0;row<3;row++)for(let col=0;col<7;col++)cuboid([x-.31+col*.1,y+.065,z+.14+row*.11],[.065,.02,.055],g,false);
    cuboid([x+.68,y+.32,z-.04],[.22,.6,.47],g,g===selected);
    for(let row=0;row<4;row++)plate(x+.68,y+.22+row*.08,z+.202,.13,.018,g,theme.color['border-strong']);
    light(x+.68,y+.53,z+.205,g);
    plate(x+.68,y+.12,z+.205,.07,.032,g,theme.color.black);
    return [x+.68,y+.24,z+.24];
  }
  function firewall(p,g,open){
    const [x,y,z]=p;
    footprint([x,y,z],1.5,.9);
    cuboid([x,y+.2,z],[1.42,.4,.83],g,g===selected);
    cuboid([x,y+.43+open*.66,z-.08*open],[1.44,.07,.85],g,g===selected);
    for(let i=0;i<3;i++){
      const px=x-.45+i*.45;
      // Three interface boards lift with the chassis; the attached ports retain their routes.
      cuboid([px,y+.35+open*(.2+i*.06),z],[.32,.055,.55],i+1,false);
      cuboid([px,y+.39+open*(.2+i*.06),z],[.13,.04,.16],i+1,false);
      plate(px,y+.22,z+.43,.24,.16,i+1);
      for(let pin=0;pin<5;pin++)plate(px-.074+pin*.037,y+.275,z+.439,.012,.048,i+1,theme.color['paper']);
      light(px+.09,y+.35,z+.44,i+1);
    }
    for(let vent=0;vent<7;vent++)cuboid([x-.51+vent*.17,y+.475+open*.66,z-.08*open],[.055,.013,.44],g,false);
    return [0,1,2].map(i=>[x-.45+i*.45,y+.22,z+.47]);
  }
  function permissionGate(p,g){
    const [x,y,z]=p;
    footprint([x,y,z],.84,.4);
    // Software memberships are transparent permission gates, not extra servers.
    for(const side of [-1,1])cuboid([x+side*.35,y+.5,z],[.035,.82,.07],g,g===selected);
    cuboid([x,y+.9,z],[.74,.045,.07],g,g===selected);
    plate(x,y+.51,z+.04,.62,.7,g,`rgba(${palette[g%5]},.045)`);
    plate(x-.09,y+.59,z+.06,.19,.16,g,theme.color['surface-active']);
    cuboid([x+.08,y+.59,z+.075],[.24,.045,.035],g,g===selected);
    cuboid([x+.13,y+.54,z+.075],[.04,.1,.035],g,g===selected);
    cuboid([x,y+.06,z],[.8,.05,.35],g,false);
    return [x,y+.5,z+.09];
  }
  function detectionGeometry(e){
    const narrow=w<560;
    const compact=narrow?[[-.95,-1.23,-1.55],[.85,-1.23,-1.7],[.25,-1.23,0],[-1.25,-1.23,-.1],[-.85,-1.23,1.7],[.85,-1.23,1.65]]:[[-2.5,-1.23,1.15],[-2.35,-1.23,-1.4],[0,-1.23,.1],[.1,-1.23,-2.05],[2.15,-1.23,-1],[2.3,-1.23,1.45]];
    const expanded=narrow?[[-1.4,-1.23,-2.7],[1.7,-1.23,-2.75],[.3,-1.1,.05],[-1.5,-1.23,.15],[-1.3,-1.23,2.7],[1.3,-1.23,2.65]]:[[-3,-1.23,1.65],[-2.85,-1.23,-2.05],[0,-.95,.05],[.18,-1.23,-2.65],[2.65,-1.23,-1.3],[2.7,-1.23,1.95]];
    const p=compact.map((v,i)=>lerp3(v,expanded[i],e)),ports=[];
    owned(0,()=>ports[0]=workstation(p[0],0));
    owned(1,()=>ports[1]=server(p[1],1,{width:.7,height:.97,depth:.7,rows:2,open:e*.4}));
    owned(2,()=>ports[2]=server(p[2],2,{width:1.14,height:1.64,rows:4,open:story.managerOpen,process:true}));
    owned(3,()=>ports[3]=server(p[3],3,{width:.76,height:.92,depth:.68,rows:2,open:e*.3}));
    owned(4,()=>ports[4]=server(p[4],4,{width:.92,height:1.25,rows:3,open:e*.6}));
    owned(5,()=>ports[5]=workstation(p[5],5,'dashboard'));
    const keys=['agents-manager','runtime-agent','misp-manager','manager-indexer','indexer-dashboard'];
    [[0,2],[1,0],[3,2],[2,4],[4,5]].forEach(([a,b],i)=>connect(ports[a],ports[b],a,keys[i],[a,b]));
    anchors={runtime:ports[1],agent:ports[0],records:processing[0].world,decoder:processing[1].world,rules:processing[2].world,output:processing[3].world,indexer:ports[4],dashboard:[p[5][0]-.08,p[5][1]+.87,p[5][2]-.025]};
    p.forEach((v,i)=>addLabel([v[0],v[1]+(i===2?2+story.managerOpen*.9:i===4?1.65:1.4),v[2]],i));
  }
  function networkGeometry(e){
    const narrow=w<560;
    const compact=narrow?[[0,-.48,0],[-.45,-1.25,1.65],[1.1,-1.25,-.65],[-.65,-1.25,-1.6]]:[[0,-.48,-.1],[-1.45,-1.25,1.02],[1.3,-1.25,.9],[.3,-1.25,-1.28]];
    const expanded=narrow?[[.3,-.34,-.35],[-.45,-1.25,3.1],[1.5,-1.25,.8],[-.9,-1.25,-3.35]]:[[0,-.34,0],[-2.15,-1.25,1.6],[2.05,-1.25,1.35],[.5,-1.25,-2.65]];
    const p=compact.map((v,i)=>lerp3(v,expanded[i],e));let ports,lan=[],dmz,farm=[];
    // The zone platforms move with their hosts; they never imply an observed block.
    for(let i=1;i<4;i++)owned(i,()=>cuboid([p[i][0]+(i===1?.2:0),p[i][1]-.09,p[i][2]+.08],[i===2?1.22:2.15,.055,i===1?1.75:1.35],i,false));
    owned(0,()=>ports=firewall(p[0],0,story.firewallOpen));
    owned(1,()=>{
      lan.push(workstation([p[1][0]-.47,p[1][1],p[1][2]-.34],1,'terminal','Kali .100'));
      lan.push(workstation([p[1][0]+.65,p[1][1],p[1][2]+.45],1,'terminal','Windows .10'));
    });
    owned(2,()=>dmz=server(p[2],2,{width:.92,height:1.3,rows:3,open:e*.4,name:'Web / DB .10'}));
    owned(3,()=>{
      farm.push(server([p[3][0]-.53,p[3][1],p[3][2]],3,{width:.8,height:1.48,rows:3,open:e*.3,name:'DC01 .10'}));
      farm.push(server([p[3][0]+.5,p[3][1],p[3][2]+.35],3,{width:.8,height:.99,rows:3,open:e*.6,name:'Backup .20'}));
    });
    lan.forEach((host,i)=>connect(ports[0],host,1,i?'firewall-windows':'firewall-kali',[0,1]));connect(ports[1],dmz,2,'firewall-dmz',[0,2]);farm.forEach((host,i)=>connect(ports[2],host,3,i?'firewall-backup':'firewall-directory',[0,3]));
    anchors={kali:lan[0],'firewall-lan':ports[0],'firewall-dmz':ports[1],dmz};
    p.forEach((v,i)=>addLabel([v[0],v[1]+(i===0?1.02+story.firewallOpen*.5:i===3?2:1.65),v[2]],i));
  }
  function identityGeometry(e){
    const narrow=w<560;
    const compact=narrow?[[0,-1.23,1.6],[-1,-1.18,0],[0,-1.18,.1],[1,-1.18,.2],[0,-1.23,-1.55]]:[[-1.65,-1.23,.5],[-.25,-1.18,-.95],[-.1,-1.18,.1],[.2,-1.18,1.2],[1.55,-1.23,-.6]];
    const expanded=narrow?[[0,-1.23,2.5],[-1.45,-1.1,0],[0,-1.1,.1],[1.45,-1.1,.2],[0,-1.23,-2.45]]:[[-2.5,-1.23,.1],[0,-1.1,-1.85],[0,-1.1,0],[0,-1.1,1.85],[2.15,-1.23,-.3]];
    const p=compact.map((v,i)=>lerp3(v,expanded[i],e)),ports=[];
    owned(0,()=>ports[0]=workstation(p[0],0));
    for(let i=1;i<4;i++)owned(i,()=>ports[i]=permissionGate(p[i],i));
    owned(4,()=>ports[4]=server(p[4],4,{width:1.15,height:1.85,rows:4,open:e*.6}));
    anchors={root:ports[0],enterprise:ports[1],administrators:ports[2],'domain-admins':ports[3],domain:ports[4]};
    for(let i=1;i<=3;i++){connect(ports[0],ports[i],i,`membership-${i}`,[0,i]);connect(ports[i],ports[4],i,`permission-${i}`,[i,4]);}
    p.forEach((v,i)=>addLabel([v[0],v[1]+(i===4?2.25:1.4),v[2]],i));
  }
  function route(link){
    const {a,b}=link,lift=Math.min(a[1],b[1])-.18;
    return [a,[a[0],lift,a[2]+.2],[b[0],lift,b[2]+.2],b];
  }
  function pointAlong(points,progress){
    const lengths=points.slice(1).map((p,i)=>Math.hypot(p.x-points[i].x,p.y-points[i].y));
    let distance=clamp(progress)*lengths.reduce((a,b)=>a+b,0);
    for(let i=0;i<lengths.length;i++){
      if(distance>lengths[i]&&i<lengths.length-1){distance-=lengths[i];continue;}
      const a=points[i],b=points[i+1],f=distance/Math.max(.001,lengths[i]);
      return {x:lerp(a.x,b.x,f),y:lerp(a.y,b.y,f),angle:Math.atan2(b.y-a.y,b.x-a.x)};
    }
    return {...points[0],angle:0};
  }
  function glyph(pos,kind,color){
    ctx.save();ctx.translate(pos.x,pos.y);ctx.fillStyle=theme.color.bg;ctx.strokeStyle=color;ctx.lineWidth=1.8;
    if(kind==='probe'||kind==='response'){
      ctx.rotate(pos.angle||0);ctx.beginPath();ctx.moveTo(10,0);ctx.lineTo(-7,-6);ctx.lineTo(-3,0);ctx.lineTo(-7,6);ctx.closePath();ctx.fill();ctx.stroke();
      if(kind==='response'){ctx.beginPath();ctx.moveTo(-10,-5);ctx.lineTo(-6,0);ctx.lineTo(-10,5);ctx.stroke();}
    }else if(['key','membership','permission'].includes(kind)){
      ctx.beginPath();ctx.arc(-6,0,5,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.beginPath();ctx.moveTo(-1,0);ctx.lineTo(14,0);ctx.moveTo(9,0);ctx.lineTo(9,5);ctx.moveTo(14,0);ctx.lineTo(14,5);ctx.stroke();
      if(kind==='permission'){ctx.beginPath();ctx.arc(-6,0,1.5,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();}
    }else{
      const row=kind==='row'||kind==='result';
      ctx.beginPath();ctx.roundRect(row?-23:-12,row?-8:-16,row?46:24,row?16:32,2);ctx.fill();ctx.stroke();
      // The same amber spine remains through every representation of the event.
      ctx.fillStyle=color;ctx.fillRect(row?-20:-10,row?-5:-12,3,row?10:24);
      ctx.beginPath();
      if(kind==='raw'){
        ctx.moveTo(-1,-8);ctx.lineTo(-4,-8);ctx.lineTo(-4,8);ctx.lineTo(-1,8);ctx.moveTo(4,-8);ctx.lineTo(7,-8);ctx.lineTo(7,8);ctx.lineTo(4,8);
      }else if(kind==='match'||kind==='alert'){
        ctx.moveTo(-3,0);ctx.lineTo(0,4);ctx.lineTo(7,-5);
        if(kind==='alert'){ctx.moveTo(-2,10);ctx.lineTo(7,10);}
      }else{
        for(let i=0;i<(row?2:3);i++){ctx.moveTo(row?-12:-4,(row?-3:-7)+i*7);ctx.lineTo(row?17:7,(row?-3:-7)+i*7);}
        if(kind==='indexed'){ctx.moveTo(10,-13);ctx.lineTo(16,-13);ctx.lineTo(16,13);ctx.lineTo(10,13);}
      }
      ctx.stroke();
    }
    ctx.restore();
  }
  function drawLinks(){
    links.forEach(link=>{
      const inspecting=link.parts.includes(selected);
      line(route(link),palette[link.g%5],inspecting?.22:.10,1,model==='identity'||link.key==='misp-manager');
    });
  }
  function markerPoints(){
    const points=story.path.map(key=>anchors[key]).filter(Boolean);
    if(points.length<2)return points.map(project);
    const routed=[];
    for(let i=1;i<points.length;i++){
      const segment=model==='identity'||model==='detection'&&story.parts.length===1? [points[i-1],points[i]] :route({a:points[i-1],b:points[i]});
      if(i>1)segment.shift();routed.push(...segment);
    }
    return routed.map(project);
  }
  function drawActivity(){
    if(!allowed())return;
    const points=markerPoints();if(!points.length)return;
    const color=model==='detection'?theme.color.amber:story.form==='response'||story.form==='result'?theme.color.amber:theme.color.cyan;
    const progress=clamp((story.progress-.16)/.66),smooth=progress*progress*(3-2*progress);
    if(points.length>1){
      ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.strokeStyle=color;ctx.globalAlpha=.6;ctx.lineWidth=1.7;ctx.setLineDash(model==='identity'?[4,5]:[]);ctx.stroke();ctx.setLineDash([]);ctx.globalAlpha=1;
      const direction=pointAlong(points,.62);ctx.save();ctx.translate(direction.x,direction.y);ctx.rotate(direction.angle);ctx.beginPath();ctx.moveTo(-5,-4);ctx.lineTo(0,0);ctx.lineTo(-5,4);ctx.stroke();ctx.restore();
    }
    const pos=points.length===1?{...points[0],angle:0}:pointAlong(points,smooth);
    glyph(pos,story.form,color);
  }
  function drawProcessing(){
    if(model!=='detection'||processing.length!==4)return;
    const active=allowed()?['records','decoder','rules','output'].indexOf(story.path.at(-1)):1;
    processing.forEach((tray,i)=>{
      if(i!==active)return;
      const pos=project(tray.world),text=tray.label;
      ctx.font='500 '+theme.labelSize+'px '+theme.fontBody;ctx.textAlign='left';
      const width=ctx.measureText(text).width+12,height=24,box=placeLabel(pos,width,height,[]);
      ctx.beginPath();ctx.moveTo(pos.x,pos.y);ctx.lineTo(box.x+width/2,box.y+height/2);ctx.strokeStyle=theme.color.amber;ctx.lineWidth=.8;ctx.stroke();
      ctx.fillStyle=theme.color.surface;ctx.fillRect(box.x,box.y,width,height);ctx.fillStyle=theme.color.ink;ctx.fillText(text,box.x+6,box.y+17);
      annotations.push({...box,width,height});
    });
  }
  function placeLabel(p,width,height,placed){
    const bounds=records[model].parts.map((_,part)=>{
      const points=faces.filter(f=>f.part===part).flatMap(f=>f.points);
      const xs=points.map(p=>p.x),ys=points.map(p=>p.y);
      return{x:Math.min(...xs),y:Math.min(...ys),width:Math.max(...xs)-Math.min(...xs),height:Math.max(...ys)-Math.min(...ys)};
    });
    const overlap=(x,y,r)=>x<r.x+r.width+6&&x+width+6>r.x&&y<r.y+r.height+6&&y+height+6>r.y;
    const candidates=[];
    for(let y=12;y<=h-height-12;y+=18)for(let x=12;x<=w-width-12;x+=18){
      candidates.push({x,y,cost:placed.filter(r=>overlap(x,y,r)).length*100000+bounds.filter(r=>overlap(x,y,r)).length*2000+Math.hypot(x+width/2-p.x,y+height/2-p.y)});
    }
    return candidates.sort((a,b)=>a.cost-b.cost)[0]||{x:12,y:12};
  }
  function drawLabels(){
    // Sort projected labels into rows, then resolve overlap without moving geometry.
    const priority=[hover,...(inspectionActive||!story.parts.length?[selected]:[]),...story.parts].filter((v,i,a)=>v>=0&&a.indexOf(v)===i).slice(0,3);
    const sorted=labels.filter(label=>w>=560||priority.includes(label.index)).sort((a,b)=>a.p.y-b.p.y),placed=[...annotations];
    sorted.forEach(label=>{
      const full=w>=560,font=theme.labelSize,text=full?label.text:label.text.replace('Endpoints / agents','Agents').replace('Wazuh manager','Manager').replace('Enterprise Admins','Enterprise').replace('Administrators','Admins').replace('Domain Admins','Domain admins').replace('Server farm','Servers');
      ctx.font=`500 ${font}px ${theme.fontBody}`;const width=ctx.measureText(text).width+24,height=34;
      const {x,y}=placeLabel(label.p,width,height,placed);
      const active=label.index===selected||label.index===hover;
      ctx.beginPath();ctx.moveTo(label.p.x,label.p.y);ctx.lineTo(x+width/2,y+height/2);ctx.strokeStyle=`rgba(${label.color},.36)`;ctx.lineWidth=.8;ctx.stroke();
      ctx.fillStyle=active?theme.color['border']:`rgba(${theme.rgb['surface']},0.9373)`;ctx.strokeStyle=`rgba(${label.color},${active?.95:.45})`;ctx.lineWidth=1;
      ctx.beginPath();ctx.roundRect(x,y,width,height,8);ctx.fill();ctx.stroke();ctx.textAlign='left';ctx.fillStyle=active?theme.color['ink']:`rgb(${label.color})`;ctx.fillText(text,x+12,y+23);
      label.rect={x,y,width,height};placed.push(label.rect);
    });
  }
  function draw(){
    const key=[model,w,h,yaw.toFixed(4),pitch.toFixed(4),selected,hover,inspectionActive,story.phase,allowed()].join(':');
    if(baseContext&&key===baseKey){ctx.clearRect(0,0,w,h);ctx.drawImage(baseCanvas,0,0,w,h);drawActivity();return;}
    ctx.clearRect(0,0,w,h);faces=[];details=[];shadows=[];links=[];labels=[];processing=[];annotations=[];anchors={};
    unit=w<560?Math.min(w/4.5,h/6.3):Math.min(w/7.5,h/5.7);
    // No ambient grid or decorative traffic. The separated machinery supplies depth.
    const e=separation;
    if(model==='detection')detectionGeometry(e);else if(model==='network')networkGeometry(e);else identityGeometry(e);
    // Fit actual projected device geometry at any orbit angle, including touch rotation.
    const cx=w*.5,cy=h*.44;
    let left=0,right=0,above=0,below=0;
    faces.forEach(face=>face.points.forEach(p=>{left=Math.max(left,cx-p.x);right=Math.max(right,p.x-cx);above=Math.max(above,cy-p.y);below=Math.max(below,p.y-cy);}));
    const fit=Math.min(1,(cx-28)/Math.max(1,left),(w-cx-28)/Math.max(1,right),(cy-48)/Math.max(1,above),(h-cy-48)/Math.max(1,below));
    if(fit<1){unit*=fit;faces.forEach(face=>face.points=face.world.map(project));labels.forEach(label=>label.p=project(label.world));}
    // Rear connectivity sits under the solid geometry; labels stay above it.
    shadows.forEach(shadow=>polygon(shadow.points.map(project),`rgba(${theme.rgb.black},${shadow.alpha})`));
    drawLinks();
    faces.sort((a,b)=>a.depth-b.depth).forEach(f=>polygon(f.points,f.fill,f.stroke,f.lineWidth));
    details.forEach(fn=>fn());
    drawProcessing();drawLabels();
    if(baseContext){baseCanvas.width=canvas.width;baseCanvas.height=canvas.height;baseContext.drawImage(canvas,0,0);baseKey=key;}
    drawActivity();
  }
  function schedule(){if(!raf&&visible&&!document.hidden)raf=requestAnimationFrame(tick);}
  function tick(now){
    raf=0;if(document.hidden||!visible){last=0;return;}
    if(last&&now-last<32&&allowed()){schedule();return;}
    const dt=last?Math.max(0,now-last):0;last=now;
    if(allowed()){
      loopClock+=dt;clocks[model]=loopClock;cue.step(dt);measure();separation=target;
      yaw+=(yawTarget-yaw)*(1-Math.exp(-dt/150));pitch+=(tiltTarget-pitch)*(1-Math.exp(-dt/150));
    }else{separation=target;yaw=yawTarget;pitch=tiltTarget;}
    draw();if(allowed())schedule();else last=0;
  }
  function preference(){if(raf)cancelAnimationFrame(raf);raf=0;last=0;cue.clear();measure();if(!allowed())separation=target;draw();schedule();}
  modelButtons.forEach(b=>b.addEventListener('click',()=>{if(b.dataset.anatomyModel!==model)chooseModel(b.dataset.anatomyModel);}));
  shell.querySelectorAll('[data-orbit]').forEach(b=>b.addEventListener('click',()=>{cameraManual=true;yawTarget+=Number(b.dataset.orbit)*.35;if(!allowed())yaw=yawTarget;draw();schedule();}));
  function insidePolygon(x,y,points){
    let inside=false;
    for(let i=0,j=points.length-1;i<points.length;j=i++){
      const a=points[i],b=points[j];
      if((a.y>y)!==(b.y>y)&&x<(b.x-a.x)*(y-a.y)/(b.y-a.y)+a.x)inside=!inside;
    }
    return inside;
  }
  function hit(x,y){
    const label=labels.find(l=>l.rect&&x>=l.rect.x&&x<=l.rect.x+l.rect.width&&y>=l.rect.y&&y<=l.rect.y+l.rect.height);
    if(label)return label;
    // Depth-sorted faces give the visible device priority over anything behind it.
    for(let i=faces.length-1;i>=0;i--)if(faces[i].part>=0&&insidePolygon(x,y,faces[i].points))return {index:faces[i].part};
    return null;
  }
  canvas.addEventListener('keydown',e=>{
    if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'].includes(e.key))return;
    e.preventDefault();cameraManual=true;
    if(e.key==='ArrowLeft')yawTarget-=.25;if(e.key==='ArrowRight')yawTarget+=.25;
    if(e.key==='ArrowUp')tiltTarget=clamp(tiltTarget-.08,.12,.76);
    if(e.key==='ArrowDown')tiltTarget=clamp(tiltTarget+.08,.12,.76);
    if(e.key==='Home'){cameraManual=false;measure();}
    if(!allowed()){yaw=yawTarget;pitch=tiltTarget;}draw();schedule();
  });
  stage.addEventListener('pointerdown',e=>{
    if(e.isPrimary===false){if(drag)release({pointerId:drag.id},true);return;}
    if(e.target!==canvas||e.button>0||drag)return;
    drag={id:e.pointerId,x:e.clientX,y:e.clientY,yaw:yawTarget,pitch:tiltTarget,moved:false,axis:null,touch:e.pointerType!=='mouse'};
    if(!drag.touch)canvas.setPointerCapture(e.pointerId);
  });
  stage.addEventListener('pointermove',e=>{
    if(drag&&drag.id!==e.pointerId)return;
    const r=stage.getBoundingClientRect(),part=hit(e.clientX-r.left,e.clientY-r.top);
    hover=part?part.index:-1;
    if(drag){
      const dx=e.clientX-drag.x,dy=e.clientY-drag.y;
      if(drag.touch&&!drag.axis){
        if(Math.abs(dy)>9&&Math.abs(dy)>=Math.abs(dx)){drag=null;hover=-1;draw();return;}
        if(Math.abs(dx)>9&&Math.abs(dx)>Math.abs(dy)*1.25){drag.axis='horizontal';canvas.setPointerCapture(e.pointerId);}
      }
      const rotate=drag&&(!drag.touch||drag.axis==='horizontal')&&Math.abs(dx)+Math.abs(dy)>9;
      if(rotate){
        if(!drag.moved){cameraManual=true;drag.moved=true;}
        yawTarget=drag.yaw+dx*.006;
        if(!drag.touch)tiltTarget=clamp(drag.pitch+dy*.003,.12,.76);
        if(!allowed()){yaw=yawTarget;pitch=tiltTarget;}
      }
    }
    canvas.style.cursor=drag?.moved?'grabbing':part?'pointer':'grab';draw();schedule();
  },{passive:true});
  function release(e,cancelled=false){
    if(!drag||drag.id!==e.pointerId)return;
    const previous=drag;drag=null;
    if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);
    if(!cancelled&&!previous.moved&&Math.hypot(e.clientX-previous.x,e.clientY-previous.y)<=9){
      const r=stage.getBoundingClientRect(),part=hit(e.clientX-r.left,e.clientY-r.top);
      if(part)selectPart(part.index);
      else if(allowed()){cue.trigger();schedule();}
    }
    canvas.style.cursor='grab';
  }
  stage.addEventListener('pointerup',e=>release(e));
  stage.addEventListener('pointercancel',e=>release(e,true));
  canvas.addEventListener('lostpointercapture',e=>release(e,true));
  stage.addEventListener('pointerleave',()=>{hover=-1;if(!drag)canvas.style.cursor='grab';draw();});
  if('ResizeObserver' in window){new ResizeObserver(resize).observe(stage);}else window.addEventListener('resize',resize,{passive:true});
  if('IntersectionObserver' in window){new IntersectionObserver(entries=>{const entering=entries[0].isIntersecting&&!visible;visible=entries[0].isIntersecting;if(entering&&allowed())cue.trigger(null,false);if(!visible&&raf){cancelAnimationFrame(raf);raf=0;last=0;}if(visible){measure();draw();schedule();}},{rootMargin:'60px'}).observe(stage);}else visible=true;
  document.addEventListener('portfolio:motionchange',preference);reduced.addEventListener('change',preference);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){if(raf)cancelAnimationFrame(raf);raf=0;last=0;}else schedule();});
  window.FieldnotesAnatomy=Object.freeze({
    selectModel:key=>{if(records[key]&&key!==model)chooseModel(key);},
    snapshot:()=>{
      const bounds=records[model].parts.map((part,index)=>{
        const points=faces.filter(face=>face.part===index).flatMap(face=>face.points);
        const xs=points.map(p=>p.x),ys=points.map(p=>p.y);
        return {name:part[7],x:Math.min(...xs),y:Math.min(...ys),width:Math.max(...xs)-Math.min(...xs),height:Math.max(...ys)-Math.min(...ys)};
      });
      return {model,clock:loopClock,phase:story.phase,separation,managerOpen:story.managerOpen,firewallOpen:story.firewallOpen,yaw,pitch,selected,visible,labels:labels.filter(l=>l.rect).map(l=>({text:l.text,...l.rect})),markerPath:story.path.slice(),bounds,faceCount:faces.length};
    }
  });
  shell.querySelectorAll('.anatomy-tabs,.anatomy-orbit').forEach(e=>e.hidden=false);
  shell.classList.add('anatomy-ready');
  document.querySelector('.sequence-transcript-fallback').hidden=true;
  resize();chooseModel('detection');
  document.fonts?.ready.then(()=>{baseKey='';draw();});
})();
