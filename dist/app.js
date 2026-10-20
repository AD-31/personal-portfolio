const $=selector=>document.querySelector(selector);
const dialog=$('#case-dialog');
let lastTrigger=null;

const caseStudies={
  clp:{label:'CLP project / Detection engineering',html:`
    <div class="case-body"><h2 id="case-title">Wazuh detection engineering</h2>
    <p class="case-lead">A detection-focused monitoring lab that brings endpoint activity, runtime telemetry, and threat indicators into an analyst’s view—and asks which events deserve attention.</p>
    <div class="case-scope"><span>Wazuh</span><span>Tetragon</span><span>MISP</span><span>Custom XML rules &amp; decoders</span><span>RBAC</span></div>
    <div class="case-columns"><section><h3>The implementation</h3><ul><li>Deployed the Wazuh manager, indexer, and dashboard, and enrolled endpoint agents.</li><li>Forwarded Linux runtime events from Tetragon into Wazuh.</li><li>Added custom rules and decoders, MISP indicator matching, and file-integrity/hash review.</li><li>Tuned low-value alerts and configured administrator and read-only analyst access.</li></ul></section><section><h3>What was validated</h3><p>The thesis reports <strong>14 functional checks</strong> and <strong>8 acceptance checks</strong> as passing. They cover collection, rule loading, selected detections, indicator matching, tuning, and role-based access.</p><p>These are lab validation results. Noise reduction is illustrated qualitatively; the report does not establish a percentage reduction, production detection rate, or observation-period benchmark.</p></section></div>
    <div data-case-evidence="clp"></div>
    <h3>A successful login can be useful context.</h3><p>Rule <strong>118007</strong> records a successful SSH login at <strong>level 3</strong>. The report describes it as informational context that may support a later investigation. This is a useful example of distinguishing an event from an incident.</p>
    <figure class="case-evidence"><button class="evidence-image" type="button" data-evidence="wazuh" aria-label="Enlarge the original project screenshot"><img src="assets/wazuh-rule-evidence.png" width="1419" height="352" alt="Original CLP thesis screenshot showing the informational successful SSH login rule 118007 and a separate direct-root-login rule." loading="lazy"><span class="evidence-action">Enlarge screenshot<span>Inspect at original size</span></span></button><figcaption>Original project evidence: custom rule content. CLP thesis, Figure 28, page 53. Select the screenshot to inspect it here at its original size.</figcaption></figure>
    <div class="demo-box"><span class="eyebrow">Illustrative alert review</span><h3>What changes when routine noise is filtered?</h3><p>This miniature feed illustrates the idea. Its event counts are invented for explanation and are not the project’s measured results.</p><label class="noise-controls"><input type="checkbox" id="show-routine" checked> Show routine notifications</label><div class="event-stream"><div class="routine" data-routine><span>CONTEXT</span>Expected service session</div><div class="routine" data-routine><span>ROUTINE</span>Repeated agent status update</div><div><span>REVIEW</span>Unexpected sensitive-file access</div><div class="routine" data-routine><span>ROUTINE</span>Repeated background status notification</div><div><span>REVIEW</span>Observed indicator match</div><div><span>CONTEXT</span>Successful login retained for investigation</div></div><p class="demo-caption">The retained context matters as much as the notifications removed.</p></div>
    <h3>Runtime visibility that makes context possible</h3><p>The appendices document a sensitive-credential-read policy and an external-egress policy. These collect different kinds of evidence: access to credential material and selected outbound connections. They support investigation; a connection alone is not proof of exfiltration.</p>
    <div class="case-lesson"><h3>What needed iteration</h3><p>Low-value alerts required tuning. XML syntax errors and duplicate rule IDs required validation. Decoder field parsing mattered for matching MISP indicators correctly.</p></div>
    <h3>Scope and next steps</h3><p>The project was evaluated in an isolated lab. Containment, eradication, recovery, and a complete incident-response workflow were outside its demonstrated scope. Automated rule testing, longer monitoring, wider telemetry, and a fuller detection catalogue are future work.</p>
    <p class="source-note">Source: <cite>Wazuh SIEM Detection Engineering and Noise Reduction</cite>, implementation pp. 44–58; validation pp. 59–62; limitations pp. 63–65; Tetragon policies pp. 77–81. Internship work involving IRIS, OpenCTI, n8n, and AI/LLMs is listed separately under experience.</p></div>`},
  assessment:{label:'In-house project / Security assessment',html:`
    <div class="case-body"><h2 id="case-title">SME security assessment</h2><p class="case-lead">A ransomware-focused assessment of an SME-style lab, examining how network exposure, an initial foothold, and directory privileges could combine into wider impact.</p>
    <div class="case-scope"><span>Three network zones</span><span>Network &amp; web assessment</span><span>Active Directory</span><span>CALDERA</span><span>BloodHound</span></div>
    <h3>The assessment perspective</h3><p>The thesis describes penetration testing and evaluation within a team project. It documents cross-zone reachability, controlled phishing and discovery, directory relationship analysis, web security checks, and a controlled impact demonstration.</p>
    <figure class="case-evidence"><button class="evidence-image" type="button" data-evidence="topology" aria-label="Enlarge the original project screenshot"><img src="assets/sme-topology.png" width="1174" height="665" alt="Original SME lab topology showing LAN, DMZ, and server farm zones, a pfSense firewall, workstation, directory server, backup host, and web/database host." loading="lazy"><span class="evidence-action">Enlarge screenshot<span>Inspect at original size</span></span></button><figcaption>Original project evidence: Network Diagram, Attacker’s Perspective. In-house thesis, Figure 1, page 31. The diagram records lab exposure; it does not establish that every path was exploited.</figcaption></figure>
    <div class="case-columns"><section><h3>What the assessment found</h3><ul><li>Cross-zone access to services that increased the reach of a compromised position.</li><li>Directory privileges and relationships relevant to domain-level impact.</li><li>Web configuration findings, including TLS trust and information-exposure concerns.</li></ul></section><section><h3>How to read the results</h3><p>The report lists <strong>13 assessment checks</strong> as passing. Many passes mean that an expected exposure or compromise condition was demonstrated. They do not mean the defenses stopped an attack.</p><p>Some web findings were conditional scanner observations and needed further validation.</p></section></div>
    <div class="case-lesson"><h3>The toolchain did not work as planned.</h3><p>CALDERA custom-command execution and data collection were unreliable for parts of the intended workflow. The assessment adapted its tooling, including NetExec for relationship-data collection, while preserving supporting evidence.</p></div>
    <div data-case-evidence="assessment"></div>
    <h3>The defensive question</h3><p>Which paths are operationally necessary, which privileges are excessive, and what should be tested again after a change? The project’s value is in making those questions concrete and reviewable.</p>
    <h3>Scope and next steps</h3><p>This was a controlled assessment of a weak SME-style baseline, not a production ransomware-protection product. The thesis describes impact testing with synthetic files. It does not establish a measured risk reduction, restoration time, or fully automated end-to-end adversary chain. Remediation, retesting, and deeper recovery validation remain distinct follow-up work.</p>
    <p class="source-note">Source: <cite>Ransomware Protection for IT SMEs</cite>, Figure 1; network segmentation results, Table 8; functional tests, Table 11; achieved objectives, Table 13; tool limitations, Table 14; Future Work and Conclusion. The in-house assessment and CLP monitoring project were separate projects, not one jointly validated system.</p></div>`},
  ml:{label:'Machine learning / Traffic classification',html:`
    <div class="case-body"><h2 id="case-title">DDoS traffic classification</h2><p class="case-lead">DDoS traffic classification using preprocessing, feature engineering, and model tuning across Random Forest, SVM, and XGBoost.</p><div class="case-scope"><span>Network traffic</span><span>Feature engineering</span><span>Precision &amp; recall</span><span>False-positive review</span></div><h3>The reported result</h3><p>My CV reports more than 95% classification accuracy and evaluation of precision, recall, and false-positive performance. The available summary does not provide the dataset split, full confusion matrix, or per-model scores, so those details are not claimed here.</p><div class="demo-box"><span class="eyebrow">A separate, hypothetical example</span><div aria-live="polite" aria-atomic="true"><strong class="demo-number" id="accuracy-number">95%</strong><span id="accuracy-label">overall accuracy</span><p id="accuracy-description">A classifier labels 950 of 1,000 flows correctly. Would that be enough to trust its attack detection?</p></div><button class="button primary" id="accuracy-reveal" type="button" aria-expanded="false" aria-controls="accuracy-matrix">Inspect the missed cases</button><div class="matrix" id="accuracy-matrix" hidden><div><strong>950</strong>normal flows, correctly labelled</div><div><strong>50</strong>attack flows, all missed</div></div><p class="demo-caption">This is an illustrative baseline that predicts “normal” for every flow. It is not a result from my model.</p></div><h3>The decision behind the number</h3><p>Accuracy needs the context of class balance, missed attacks, and false alarms. The engineering story includes which data was used, how it was split, and how each model behaved on cases that matter.</p><p class="source-note">Source for the project summary: Ahmed Ali Ahmed’s CV, Machine Learning DDoS Traffic Classification project, May–June 2024. The interactive numbers above are a separate mathematical example.</p></div>`}
};

function openCase(key,trigger){
  const item=caseStudies[key];if(!item)return;
  lastTrigger=trigger;
  $('#case-label').textContent=item.label;
  $('#case-content').innerHTML=item.html;
  const evidenceSlot=$('#case-content [data-case-evidence]');
  const evidenceSource=document.querySelector(`[data-evidence-gallery="${key}"]`);
  if(evidenceSlot && evidenceSource){
    const gallery=evidenceSource.cloneNode(true);
    gallery.removeAttribute('data-evidence-gallery');
    gallery.hidden=false;
    gallery.classList.remove('evidence-paged');
    gallery.querySelector('.evidence-browser')?.remove();
    gallery.querySelectorAll('[data-evidence="wazuh"],[data-evidence="topology"]').forEach(button=>button.closest('figure')?.remove());
    gallery.querySelectorAll('[data-evidence-slide]').forEach(figure=>{figure.hidden=false;figure.removeAttribute('id');figure.querySelectorAll('[id]').forEach(node=>node.removeAttribute('id'));figure.removeAttribute('aria-labelledby');});
    evidenceSlot.replaceWith(gallery);
  }
  if(!dialog.open)dialog.showModal();
  dialog.scrollTop=0;
  document.body.style.overflow='hidden';
  window.portfolioMotion?.openDialog(dialog,trigger);
  const routine=$('#show-routine');
  if(routine)routine.addEventListener('change',()=>document.querySelectorAll('[data-routine]').forEach(row=>row.hidden=!routine.checked));
  const accuracy=$('#accuracy-reveal');
  if(accuracy)accuracy.addEventListener('click',()=>{
    const revealed=accuracy.getAttribute('aria-expanded')!=='true';
    accuracy.setAttribute('aria-expanded',String(revealed));
    $('#accuracy-number').textContent=revealed?'0%':'95%';
    $('#accuracy-label').textContent=revealed?'attack recall':'overall accuracy';
    $('#accuracy-description').textContent=revealed?'A model can be 95% accurate while missing every attack in this hypothetical dataset.':'A classifier labels 950 of 1,000 flows correctly. Would that be enough to trust its attack detection?';
    $('#accuracy-matrix').hidden=!revealed;
    accuracy.textContent=revealed?'Return to the headline':'Inspect the missed cases';
  });
}
document.querySelectorAll('[data-case]').forEach(button=>button.addEventListener('click',event=>openCase(button.dataset.case,event.currentTarget)));
function closeCase(){
  const finish=()=>{if(dialog.open)dialog.close();};
  if(window.portfolioMotion)window.portfolioMotion.closeDialog(dialog,finish);else finish();
}
$('.dialog-close').addEventListener('click',closeCase);
dialog.addEventListener('cancel',event=>{event.preventDefault();closeCase();});
dialog.addEventListener('close',()=>{window.portfolioMotion?.endDialog();document.body.style.overflow='';if(lastTrigger)lastTrigger.focus({preventScroll:true});});
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeCase();}});
