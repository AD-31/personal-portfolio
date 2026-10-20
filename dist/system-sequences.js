/* Evidence-grounded process contracts. Geometry stays separated; only the marker repeats. */
(() => {
  const S=(title,tool,input,change,output,evidence,source,parts,path,form,fields,seconds=5)=>
    ({title,tool,input,change,output,evidence,source,parts,path,form,fields,seconds,text:change});
  const record='wazuh-runtime-record',decoded='wazuh-tetragon-decoder',dmz='assessment-dmz-services';
  const member='assessment-directory-membership',rights='assessment-directory-paths';
  const definitions={
    detection:{
      lineage:'Figure 59 event record',
      summary:'Follow one Linux event through collection, decoding, a documented correlation alert, indexing and review. Machinery, transport and internal transformations are illustrative. No IOC match or confirmed incident is claimed.',
      stages:[
        S('Record Linux runtime activity','Tetragon','Linux activity on mvp-001','The visible full_log contains process_exec and /usr/bin/sh. This token is an event record, never a network packet.','Runtime log record',record,'CLP · Figure 59 · p.85',[1],['runtime'],'raw',['process_exec','binary: /usr/bin/sh']),
        S('Collect the runtime record','Wazuh log collection','/var/log/tetragon/tetragon.log','Figure 56 configures collection from the Tetragon log; Figure 59 records input.type=log and the same location. Movement illustrates the logical handoff, not a captured transport.','Collected event record',record,'CLP · Figures 56 / 59 · pp.83 / 85',[1,0],['runtime','agent'],'raw',['input.type: log','location: /var/log/tetragon/tetragon.log']),
        S('Receive the record','Wazuh manager','Collected Tetragon record','The document names elastic-siem as manager. The collection tray represents a software stage, not physical Wazuh hardware.','Record ready for decoding',record,'CLP · Figure 59 · p.85',[0,2],['agent','records'],'raw',['manager.name','elastic-siem']),
        S('Decode the Tetragon JSON','tetragon-base / tetragon-json','tetragon-events message','Figure 32 configures program_name ^tetragon-events$, child tetragon-json and JSON_Decoder. Figure 59 reports decoder.name=tetragon-base; the child name is configuration, not an observed event field.','Structured context for rules',decoded,'CLP · Figure 32 · p.54; Figure 59 · p.85',[2],['records','decoder'],'fields',['decoder.name: tetragon-base','predecoder.hostname: mvp-001'],6),
        S('Observe rule 732011','Wazuh correlation rule','Decoded event and prior context','The alert describes recent SSH success followed by cron persistence modification. Figure 59 shows frequency 2 and level 13, but not the full rule XML or correlation window.','Documented rule 732011 match',record,'CLP · Figure 59 · p.85',[2],['decoder','rules'],'match',['rule.id: 732011','rule.level: 13'],6),
        S('Form the structured alert','Wazuh alert processing','Recorded correlation result','The document retains source context and maps rule.mitre.id to T1053.003, technique Cron. An alert still needs investigation.','Structured alert',record,'CLP · Figure 59 · p.85',[2],['rules','output'],'alert',['rule.mitre.id: T1053.003','rule.mitre.technique: Cron']),
        S('Make the alert searchable','Wazuh indexer','Structured alert','Figure 43 and its explanation assign alert storage to the indexer. The internal write is illustrative: the source does not show an index name, latency, or a storage trace for this record.','Searchable alert document',record,'CLP · Figure 43 · p.73; Figure 59 · p.85',[2,4],['output','indexer'],'indexed',['Searchable document','Internal handoff illustrative']),
        S('Select the alert in the dashboard','Wazuh dashboard','Searchable alert document','The same record becomes a selected row and an expanded document. The simplified row explains Figure 59; it is not a live dashboard.','Alert selected for review',record,'CLP · Figure 59 · p.85',[4,5],['indexer','dashboard'],'row',['732011 · level 13','Analyst review']),
        S('Review before concluding','Analyst','Selected alert and context','The rule requests review of login source, cron entry, target user, scheduled payload and authorization. MISP is separate context; this event does not prove an IOC match.','Reviewable alert; incident unconfirmed',record,'CLP · Figure 59 · p.85',[5],['dashboard'],'row',['Alert ≠ confirmed incident','No MISP match established'],6)
      ]
    },
    network:{
      lineage:'LAN → DMZ service check',
      summary:'Separate passes explain ports 80, 443 and 5432 observed open at 172.16.40.10. Arrows show illustrative probe/response directions, not a packet capture. The server farm remains separate and inactive.',
      ports:[{port:'80',service:'http',version:'nginx'},{port:'443',service:'ssl/http',version:'nginx'},{port:'5432',service:'postgresql',version:'PostgreSQL DB 9.6.0 or later'}],
      stages:[
        S('Begin at the LAN vantage','Nmap on Kali','Kali 172.16.10.100','Figure 23 tests 172.16.40.10. Each pass isolates one listed port; the original scan tested all three.','DMZ-directed service probe',dmz,'In-house · Figures 1 / 23 · pp.31 / 48',[1],['kali'],'probe',[]),
        S('Cross the routed boundary','pfSense','Probe from the LAN','Figure 1 connects LAN 172.16.10.0/24 and DMZ 172.16.40.0/24 through pfSense. The route is explanatory, not captured traffic.','Probe on the DMZ route','topology','In-house · Figure 1 · p.31',[1,0],['kali','firewall-lan','firewall-dmz'],'probe',[]),
        S('Reach the tested service','DMZ host 172.16.40.10','Targeted service probe','The scan provides the observed service state. No firewall block or compromise is invented.','Observed service response',dmz,'In-house · Figure 23 · p.48',[0,2],['firewall-dmz','dmz'],'probe',[]),
        S('Return toward the boundary','DMZ host / pfSense','Response from the DMZ','The amber arrow reverses toward pfSense. This explains the reported open state, not a recorded TCP exchange or payload.','Response at pfSense',dmz,'In-house · Figure 23 · p.48',[2,0],['dmz','firewall-dmz','firewall-lan'],'response',[]),
        S('Return to the assessment position','Nmap on Kali','Response at the boundary','The returning arrow reaches Kali. Reachability establishes exposure, not successful lateral movement.','Open-port observation',dmz,'In-house · Figure 23 · p.48',[0,1],['firewall-lan','kali'],'response',[]),
        S('Review observed service exposure','Assessor','Completed service check','Figure 23 records these service states. Directory and backup scans are separate checks, never the same marker or an attack chain.','Documented service exposure',dmz,'In-house · Figure 23 · p.48',[1],['kali'],'result',[],6)
      ]
    },
    identity:{
      lineage:'ROOT directory relationship',
      summary:'A key traces three selected ROOT memberships and the independently recorded domain rights. Figure 39 lists eight memberships; these are three of them. Every group-to-domain edge is independent, not a chain between groups.',
      stages:[
        S('Locate the lab account','BloodHound','ROOT@POLYTECHNIC-MSP.ORG','Figure 39 records eight memberships. The scene selects three privileged groups without claiming they are the only memberships.','Account selected',member,'In-house · Figure 39 · p.59',[0],['root'],'key',['ROOT','8 memberships recorded']),
        S('Trace Enterprise Admins membership','BloodHound MemberOf','ROOT account','The key traverses the documented account-to-group relationship. No packet or credential use is shown.','Enterprise Admins membership',member,'In-house · Figure 39 · p.59',[0,1],['root','enterprise'],'membership',['MemberOf','Enterprise Admins']),
        S('Inspect GenericAll independently','BloodHound permission graph','Enterprise Admins','Figure 40 separately records GenericAll from Enterprise Admins to POLYTECHNIC-MSP.ORG. It is not proof that the account exploited the right.','Documented GenericAll edge',rights,'In-house · Figure 40 · p.60',[1,4],['enterprise','domain'],'permission',['GenericAll','POLYTECHNIC-MSP.ORG'],6),
        S('Trace Administrators membership','BloodHound MemberOf','ROOT account, separate branch','Restart this branch at ROOT. The source does not connect Enterprise Admins to Administrators.','Administrators membership',member,'In-house · Figure 39 · p.59',[0,2],['root','administrators'],'membership',['MemberOf','Administrators']),
        S('Inspect Administrators domain rights','BloodHound permission graph','Administrators','Figure 40 records AllExtendedRights from Administrators to the domain. The key denotes a permission, not executed privilege escalation.','Documented AllExtendedRights edge',rights,'In-house · Figure 40 · p.60',[2,4],['administrators','domain'],'permission',['AllExtendedRights','Administrators → domain'],6),
        S('Trace Domain Admins membership','BloodHound MemberOf','ROOT account, separate branch','Begin again at ROOT. This is not lateral movement between the privileged groups.','Domain Admins membership',member,'In-house · Figure 39 · p.59',[0,3],['root','domain-admins'],'membership',['MemberOf','Domain Admins']),
        S('Inspect Domain Admins domain rights','BloodHound permission graph','Domain Admins','Figure 40 independently records AllExtendedRights from Domain Admins to POLYTECHNIC-MSP.ORG.','Documented AllExtendedRights edge',rights,'In-house · Figure 40 · p.60',[3,4],['domain-admins','domain'],'permission',['AllExtendedRights','Domain Admins → domain'],6),
        S('Review the relationship model','Assessor','Membership and permission observations','Figures 39 and 40 are separate observations. They identify relationships to inspect; neither is an exploit replay or proof of takeover.','Inspectable privilege paths',rights,'In-house · Figures 39–40 · pp.59–60',[4],['domain'],'key',['Relationships, not traffic','No takeover established'],6)
      ]
    }
  };
  const captions={
    detection:[
      'Tetragon records process_exec activity. Follow the amber record through each representation.',
      'Wazuh collects the record from /var/log/tetragon/tetragon.log. Transport is illustrative.',
      'The collected event reaches the manager named elastic-siem.',
      'The configured JSON decoder exposes fields. The observed decoder.name is tetragon-base.',
      'The recorded alert matches rule 732011. Its full correlation conditions are not supplied.',
      'The alert retains the event context and T1053.003 mapping. It still needs investigation.',
      'The indexer makes alerts searchable. This internal write is illustrative.',
      'The same record becomes a selected dashboard row for analyst review.',
      'Review the login and cron context before concluding. No IOC match or incident is established.'
    ],
    network:[
      'Kali 172.16.10.100 begins one of the three documented DMZ service checks.',
      'The outward probe crosses pfSense from LAN to DMZ. This is an explanatory route.',
      'The probe reaches 172.16.40.10. The scan records this port as open.',
      'The response reverses toward pfSense. Arrow direction distinguishes the return path.',
      'The response returns to Kali. Reachability establishes exposure, not compromise.',
      'Record the observed open service, then reset the marker for the next port.'
    ],
    identity:[
      'Begin with ROOT. Figure 39 lists eight memberships; this model inspects three.',
      'Trace ROOT → Enterprise Admins through the documented MemberOf edge.',
      'A separate figure records Enterprise Admins → domain through GenericAll.',
      'Begin a separate branch: ROOT → Administrators through MemberOf.',
      'Inspect Administrators → domain through AllExtendedRights.',
      'Begin a separate branch: ROOT → Domain Admins through MemberOf.',
      'Inspect Domain Admins → domain through its own AllExtendedRights edge.',
      'The result is an inspectable set of directory relationships, not proof of takeover.'
    ]
  };
  for(const [key,d] of Object.entries(definitions)){
    d.stages.forEach((stage,i)=>stage.caption=captions[key][i]);
    d.duration=d.stages.reduce((n,s)=>n+s.seconds*1000,0);
  }
  function at(model,ms){
    const d=definitions[model],cycle=Math.floor(Math.max(0,ms)/d.duration);
    let t=((ms%d.duration)+d.duration)%d.duration,phase=0;
    while(phase<d.stages.length-1&&t>=d.stages[phase].seconds*1000){t-=d.stages[phase].seconds*1000;phase++;}
    const s=d.stages[phase],port=model==='network'?d.ports[cycle%d.ports.length]:null;
    return {...s,phase,cycle,progress:t/(s.seconds*1000),port,lineage:d.lineage,
      title:port?s.title+' · '+port.port+'/tcp':s.title,
      fields:port?[port.port+'/tcp · '+(phase>=3?'open':port.service),phase>=3?port.version:'172.16.40.10']:s.fields,
      output:port&&phase===5?port.port+'/tcp open · '+port.service+' · '+port.version:s.output,
      separation:1,managerOpen:1,firewallOpen:1,emphasis:1};
  }
  window.FieldnotesSequences=Object.freeze({definitions,at});
})();
