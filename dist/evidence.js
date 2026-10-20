/* Original project evidence stays in the portfolio, including enlarged views. */
(() => {
  const items = {
    wazuh: {
      src:'assets/wazuh-rule-evidence.png', width:1419,
      title:'Custom SSH detection rules', source:'CLP thesis · Figure 28 · page 53',
      alt:'Original Wazuh XML rules: successful SSH login rule 118007 at level 3, and a separate direct-root-login rule at level 15.',
      caption:'Rule 118007 preserves successful-login context at level 3. The separate direct-root-login rule shows how different conditions receive different priorities.'
    },
    topology: {
      src:'assets/sme-topology.png', width:1174,
      title:'The assessment’s original network diagram', source:'In-house thesis · Figure 1 · page 31',
      alt:'Original attacker-perspective lab topology showing a pfSense firewall and LAN, DMZ, and server-farm subnets, with host addresses and open or closed ports.',
      caption:'The original figure behind the 3D topology: pfSense interfaces, host addresses, and listed service exposure across three zones. Exposure alone does not demonstrate compromise.'
    }
  };
  Object.assign(items, {
  "wazuh-agents": {
    "src": "assets/evidence/wazuh-agents.png",
    "width": 1849,
    "title": "Endpoints, enrolled and active",
    "source": "CLP thesis · Figure 58 · page 84",
    "alt": "Wazuh agent table showing five active Ubuntu endpoints, with source annotations and masked IP addresses.",
    "caption": "Five agents are shown as active, with their groups, operating systems, and versions. The annotations and masked addresses are preserved from the thesis."
  },
  "wazuh-log-collection": {
    "src": "assets/evidence/wazuh-log-collection.png",
    "width": 1843,
    "title": "Endpoint events reach the dashboard",
    "source": "CLP thesis · Figure 20 · page 50",
    "alt": "Wazuh event histogram and event rows, with the agent name and rule IDs highlighted in the original screenshot.",
    "caption": "The event view shows records from the enrolled agent alongside rule IDs, connecting endpoint collection to analyst review."
  },
  "wazuh-tetragon-decoder": {
    "src": "assets/evidence/wazuh-tetragon-decoder.png",
    "width": 553,
    "title": "Parse runtime events",
    "source": "CLP thesis · Figure 32 · page 54",
    "alt": "Original XML defining tetragon-base and tetragon-json decoders with the JSON_Decoder plugin.",
    "caption": "A Tetragon base decoder identifies the event source; the child decoder uses JSON_Decoder to parse the record."
  },
  "wazuh-misp-decoder": {
    "src": "assets/evidence/wazuh-misp-decoder.png",
    "width": 522,
    "title": "Extract indicator fields",
    "source": "CLP thesis · Figure 31 · page 54",
    "alt": "Original MISP decoder XML with domain and url_noscheme prematch, regex, and order fields.",
    "caption": "The MISP test decoders extract domain and URL fields so that later rules can evaluate the parsed values."
  },
  "wazuh-runtime-record": {
    "src": "assets/evidence/wazuh-runtime-record.png",
    "width": 894,
    "title": "Inspect the decoded runtime record",
    "source": "CLP thesis · Figure 59 · page 85",
    "alt": "Expanded Wazuh document showing tetragon-base, the tetragon.log source, rule 732011, and a cron-related ATT&CK mapping.",
    "caption": "The expanded event exposes the Tetragon decoder, source log, rule 732011, and ATT&CK mapping. It is a recorded lab alert, not live telemetry."
  },
  "wazuh-noise-before": {
    "src": "assets/evidence/wazuh-noise-before.png",
    "width": 1262,
    "title": "Before tuning: repeated routine events",
    "source": "CLP thesis · Figure 34 · page 55",
    "alt": "Original before-tuning Wazuh event list with repeated session-open, session-close, and sudo events.",
    "caption": "The thesis’s before view contains repeated PAM session and sudo records. It illustrates the noise that motivated rule tuning."
  },
  "wazuh-noise-after": {
    "src": "assets/evidence/wazuh-noise-after.png",
    "width": 1846,
    "title": "After tuning: retained SSH context",
    "source": "CLP thesis · Figure 35 · page 56",
    "alt": "Original after-tuning Wazuh screenshot showing retained successful SSH login events and highlighted rule 118007.",
    "caption": "The after view retains the successful-login records. These screenshots illustrate the change; their different timestamps do not support a measured reduction percentage."
  },
  "wazuh-indicator-alerts": {
    "src": "assets/evidence/wazuh-indicator-alerts.png",
    "width": 1610,
    "title": "Indicator matches in the alert view",
    "source": "CLP thesis · Figure 38 · page 57",
    "alt": "Wazuh alert rows for a MISP URL match, a MISP domain match, and a known malicious SHA256 file-hash match.",
    "caption": "The captured alert rows include MISP URL and domain matches, plus a file-integrity hash match, with their rule IDs and priorities."
  },
  "wazuh-readonly-role": {
    "src": "assets/evidence/wazuh-readonly-role.png",
    "width": 703,
    "title": "Map the analyst to read-only access",
    "source": "CLP thesis · Figure 40 · page 57",
    "alt": "Original Wazuh role-mapping form connecting soc_analyst-1 to the readonly role, with numbered source annotations.",
    "caption": "The role mapping connects the lab SOC analyst account to the readonly role. This screenshot records the configuration; access testing is reported separately in the thesis."
  },
  "assessment-dmz-services": {
    "src": "assets/evidence/assessment-dmz-services.png",
    "width": 1121,
    "title": "LAN to DMZ: service exposure",
    "source": "In-house thesis · Figure 23 · page 48",
    "alt": "Nmap output for the DMZ host showing ports 80, 443, and 5432 open, highlighted in the original screenshot.",
    "caption": "The scan of 172.16.40.10 reports HTTP, HTTPS, and PostgreSQL reachable from the LAN assessment position."
  },
  "assessment-directory-services": {
    "src": "assets/evidence/assessment-directory-services.png",
    "width": 1401,
    "title": "LAN to directory services",
    "source": "In-house thesis · Figure 26 · page 49",
    "alt": "Nmap service scan of Active Directory host 172.16.30.10, listing open directory and Windows service ports.",
    "caption": "The directory-server scan records reachable DNS, Kerberos, LDAP, SMB, and related services. Open services establish exposure, not successful exploitation."
  },
  "assessment-backup-services": {
    "src": "assets/evidence/assessment-backup-services.png",
    "width": 1073,
    "title": "LAN to the backup host",
    "source": "In-house thesis · Figure 27 · page 50",
    "alt": "Nmap scan of 172.16.30.20 showing ports 22 and 51515 open and several other tested ports closed or filtered.",
    "caption": "The backup-host scan records SSH and an SSL/HTTP service on port 51515, alongside closed and filtered ports."
  },
  "assessment-phishing-setup": {
    "src": "assets/evidence/assessment-phishing-setup.png",
    "width": 696,
    "title": "Configure the controlled phishing exercise",
    "source": "In-house thesis · Figure 31 · page 54",
    "alt": "GoPhish campaign configuration for an initial-access simulation, using the lab address 172.16.10.100.",
    "caption": "The GoPhish campaign form connects an email template, landing page, and lab URL. This figure documents campaign setup, not its outcome."
  },
  "assessment-caldera-discovery": {
    "src": "assets/evidence/assessment-caldera-discovery.png",
    "width": 1223,
    "title": "Run the discovery profile",
    "source": "In-house thesis · Figure 35 · page 57",
    "alt": "CALDERA operation table showing successful discovery abilities on the win-3 lab host.",
    "caption": "CALDERA records successful discovery steps for users, processes, domain information, and security software. This is evidence of those steps, not a complete automated attack chain."
  },
  "assessment-directory-membership": {
    "src": "assets/evidence/assessment-directory-membership.png",
    "width": 1144,
    "title": "Inspect privileged group membership",
    "source": "In-house thesis · Figure 39 · page 59",
    "alt": "BloodHound graph and member-of panel showing the lab ROOT account linked to directory groups.",
    "caption": "BloodHound visualizes the lab account’s group relationships, making the directory privilege model reviewable."
  },
  "assessment-directory-paths": {
    "src": "assets/evidence/assessment-directory-paths.png",
    "width": 982,
    "title": "Trace relationships to domain control",
    "source": "In-house thesis · Figure 40 · page 60",
    "alt": "BloodHound graph showing Enterprise Admins, Administrators, and Domain Admins linked to the lab domain by permission relationships.",
    "caption": "The graph shows directory groups connected to the domain through GenericAll and AllExtendedRights relationships. The figure records analyzed permissions, not an exploit replay."
  },
  "assessment-zap-findings": {
    "src": "assets/evidence/assessment-zap-findings.png",
    "width": 1713,
    "title": "Review web scanner findings",
    "source": "In-house thesis · Figure 46 · page 63",
    "alt": "ZAP alerts panel listing disclosure, content-security-policy, hidden-file, and header findings for the lab web server.",
    "caption": "ZAP lists potential information-disclosure and configuration findings. Scanner observations require validation before being treated as confirmed vulnerabilities."
  },
  "assessment-tls-rating": {
    "src": "assets/evidence/assessment-tls-rating.png",
    "width": 639,
    "title": "Check certificate identity and trust",
    "source": "In-house thesis · Figure 51 · page 64",
    "alt": "Original testssl.sh rating output with domain-name mismatch and chain-of-trust grade-cap reasons.",
    "caption": "The testssl.sh output flags a domain-name mismatch and an incomplete chain of trust. Its displayed rating is explicitly marked experimental."
  }
});
  const dialog=document.querySelector('#evidence-dialog');
  if(!dialog || typeof dialog.showModal!=='function')return;
  const stage=dialog.querySelector('.evidence-viewer-stage'),image=stage.querySelector('img');
  const fit=dialog.querySelector('#evidence-fit'),original=dialog.querySelector('#evidence-original');
  let trigger=null,previousOverflow='';
  function setSize(full) {
    stage.classList.toggle('is-original',full);
    fit.setAttribute('aria-pressed',String(!full));original.setAttribute('aria-pressed',String(full));
    stage.scrollTop=0;stage.scrollLeft=0;
    stage.setAttribute('aria-label',full?'Original-size screenshot. Scroll horizontally and vertically to inspect.':'Screenshot fitted to the viewer.');
  }
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-evidence]');if(!button)return;
    const item=items[button.dataset.evidence];if(!item)return;
    event.preventDefault();trigger=button;
    dialog.querySelector('#evidence-title').textContent=item.title;
    dialog.querySelector('#evidence-source').textContent=item.source;
    dialog.querySelector('#evidence-caption').textContent=item.caption;
    image.src=item.src;image.alt=item.alt;stage.style.setProperty('--image-width',`${item.width}px`);setSize(false);
    previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';
    dialog.showModal();dialog.querySelector('#evidence-close').focus({preventScroll:true});
  });
  fit.addEventListener('click',()=>setSize(false));original.addEventListener('click',()=>setSize(true));
  dialog.querySelector('#evidence-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
  dialog.addEventListener('close',()=>{document.body.style.overflow=previousOverflow;setSize(false);if(trigger?.isConnected)trigger.focus({preventScroll:true});});
})();
