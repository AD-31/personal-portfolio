# Process evidence and local review

19 October 2026. Local implementation only; no hosting or repository publication.

The process contracts below were checked against the original CLP PDF, the original in-house DOCX figures, the original extracted screenshots, and the CV. The scene geometry, elapsed time and movement are explanatory. No moving token is a captured replay. Existing figure bytes, captions and evidence provenance remain unchanged.

## Evidence checked

- CLP: Figure 32 / p.54 (decoder configuration), Figure 59 / p.85 (expanded runtime alert), Figure 56 / p.83 (Tetragon log collection), Figure 43 and accompanying text / p.73 (server, indexer and dashboard roles). Deployment is also documented on pp.44–46.
- Assessment: Figure 1 / p.31 (topology), Figure 23 / p.48 (DMZ scan), Figure 39 / p.59 (eight ROOT memberships), Figure 40 / p.60 (three independent domain permission edges). Figure 26 / p.49 and Figure 27 / p.50 remain separate directory/backup checks and are not traversed by the DMZ marker. DOCX page references follow the original list of figures.
- CV: May–June 2024 ML project. It reports preprocessing, feature engineering, tuning Random Forest/SVM/XGBoost, overall accuracy above 95%, and precision/recall/false-positive evaluation. No underlying ML file was available.

## Exact Wazuh mapping and limits

`full_log` contains a JSON `process_exec` record with `process.binary` equal to `/usr/bin/sh`; this is not a separate flattened field proven by the screenshot. Observed fields include `input.type=log`, `location=/var/log/tetragon/tetragon.log`, `manager.name=elastic-siem`, `predecoder.hostname=mvp-001`, `predecoder.program_name=tetragon-events`, and `decoder.name=tetragon-base`. The configuration names parent `tetragon-base`, matches `^tetragon-events$`, and names child `tetragon-json` with `JSON_Decoder`. The child configuration is not relabeled as the observed decoder name.

Figure 59 shows `rule.id=732011`, `rule.level=13`, `rule.frequency=2`, `rule.firedtimes=1`, `rule.mitre.id=T1053.003`, `rule.mitre.technique=Cron`, and the tactics Execution, Persistence and Privilege Escalation. Its description requests review of recent SSH success followed by cron persistence modification. The full XML conditions/correlation window are not shown in the inspected evidence. The animated record therefore represents the event attached to that recorded correlation alert; it does not assert that a single event alone proves the correlation or an incident. Rule 118007 in Figure 28 is a separate SSH rule and is not used as 732011 configuration. MISP remains independent context; no IOC match is attached to this record.

## Wazuh event record

48 seconds per pass. Follow one Linux event through collection, decoding, a documented correlation alert, indexing and review. Machinery, transport and internal transformations are illustrative. No IOC match or confirmed incident is claimed.

| Stage | Input | Tool | Transformation | Output | Source |
| --- | --- | --- | --- | --- | --- |
| Record Linux runtime activity | Linux activity on mvp-001 | Tetragon | The visible full_log contains process_exec and /usr/bin/sh. This token is an event record, never a network packet. | Runtime log record | CLP · Figure 59 · p.85 |
| Collect the runtime record | /var/log/tetragon/tetragon.log | Wazuh log collection | Figure 56 configures collection from the Tetragon log; Figure 59 records input.type=log and the same location. Movement illustrates the logical handoff, not a captured transport. | Collected event record | CLP · Figures 56 / 59 · pp.83 / 85 |
| Receive the record | Collected Tetragon record | Wazuh manager | The document names elastic-siem as manager. The collection tray represents a software stage, not physical Wazuh hardware. | Record ready for decoding | CLP · Figure 59 · p.85 |
| Decode the Tetragon JSON | tetragon-events message | tetragon-base / tetragon-json | Figure 32 configures program_name ^tetragon-events$, child tetragon-json and JSON_Decoder. Figure 59 reports decoder.name=tetragon-base; the child name is configuration, not an observed event field. | Structured context for rules | CLP · Figure 32 · p.54; Figure 59 · p.85 |
| Observe rule 732011 | Decoded event and prior context | Wazuh correlation rule | The alert describes recent SSH success followed by cron persistence modification. Figure 59 shows frequency 2 and level 13, but not the full rule XML or correlation window. | Documented rule 732011 match | CLP · Figure 59 · p.85 |
| Form the structured alert | Recorded correlation result | Wazuh alert processing | The document retains source context and maps rule.mitre.id to T1053.003, technique Cron. An alert still needs investigation. | Structured alert | CLP · Figure 59 · p.85 |
| Make the alert searchable | Structured alert | Wazuh indexer | Figure 43 and its explanation assign alert storage to the indexer. The internal write is illustrative: the source does not show an index name, latency, or a storage trace for this record. | Searchable alert document | CLP · Figure 43 · p.73; Figure 59 · p.85 |
| Select the alert in the dashboard | Searchable alert document | Wazuh dashboard | The same record becomes a selected row and an expanded document. The simplified row explains Figure 59; it is not a live dashboard. | Alert selected for review | CLP · Figure 59 · p.85 |
| Review before concluding | Selected alert and context | Analyst | The rule requests review of login source, cron entry, target user, scheduled payload and authorization. MISP is separate context; this event does not prove an IOC match. | Reviewable alert; incident unconfirmed | CLP · Figure 59 · p.85 |
## LAN to DMZ service check

31 seconds per pass. Separate passes explain ports 80, 443 and 5432 observed open at 172.16.40.10. Arrows show illustrative probe/response directions, not a packet capture. The server farm remains separate and inactive.

| Stage | Input | Tool | Transformation | Output | Source |
| --- | --- | --- | --- | --- | --- |
| Begin at the LAN vantage | Kali 172.16.10.100 | Nmap on Kali | Figure 23 tests 172.16.40.10. Each pass isolates one listed port; the original scan tested all three. | DMZ-directed service probe | In-house · Figures 1 / 23 · pp.31 / 48 |
| Cross the routed boundary | Probe from the LAN | pfSense | Figure 1 connects LAN 172.16.10.0/24 and DMZ 172.16.40.0/24 through pfSense. The route is explanatory, not captured traffic. | Probe on the DMZ route | In-house · Figure 1 · p.31 |
| Reach the tested service | Targeted service probe | DMZ host 172.16.40.10 | The scan provides the observed service state. No firewall block or compromise is invented. | Observed service response | In-house · Figure 23 · p.48 |
| Return toward the boundary | Response from the DMZ | DMZ host / pfSense | The amber arrow reverses toward pfSense. This explains the reported open state, not a recorded TCP exchange or payload. | Response at pfSense | In-house · Figure 23 · p.48 |
| Return to the assessment position | Response at the boundary | Nmap on Kali | The returning arrow reaches Kali. Reachability establishes exposure, not successful lateral movement. | Open-port observation | In-house · Figure 23 · p.48 |
| Review observed service exposure | Completed service check | Assessor | Figure 23 records these service states. Directory and backup scans are separate checks, never the same marker or an attack chain. | Documented service exposure | In-house · Figure 23 · p.48 |

Observed responses: `80/tcp open http` — nginx; `443/tcp open ssl/http` — nginx; `5432/tcp open postgresql` — PostgreSQL DB 9.6.0 or later. Each 31-second pass isolates one port; the original scan checked all three. No SYN/ACK payload, packet capture, firewall block or compromise is fabricated.
## Directory relationship traversal

44 seconds per pass. A key traces three selected ROOT memberships and the independently recorded domain rights. Figure 39 lists eight memberships; these are three of them. Every group-to-domain edge is independent, not a chain between groups.

| Stage | Input | Tool | Transformation | Output | Source |
| --- | --- | --- | --- | --- | --- |
| Locate the lab account | ROOT@POLYTECHNIC-MSP.ORG | BloodHound | Figure 39 records eight memberships. The scene selects three privileged groups without claiming they are the only memberships. | Account selected | In-house · Figure 39 · p.59 |
| Trace Enterprise Admins membership | ROOT account | BloodHound MemberOf | The key traverses the documented account-to-group relationship. No packet or credential use is shown. | Enterprise Admins membership | In-house · Figure 39 · p.59 |
| Inspect GenericAll independently | Enterprise Admins | BloodHound permission graph | Figure 40 separately records GenericAll from Enterprise Admins to POLYTECHNIC-MSP.ORG. It is not proof that the account exploited the right. | Documented GenericAll edge | In-house · Figure 40 · p.60 |
| Trace Administrators membership | ROOT account, separate branch | BloodHound MemberOf | Restart this branch at ROOT. The source does not connect Enterprise Admins to Administrators. | Administrators membership | In-house · Figure 39 · p.59 |
| Inspect Administrators domain rights | Administrators | BloodHound permission graph | Figure 40 records AllExtendedRights from Administrators to the domain. The key denotes a permission, not executed privilege escalation. | Documented AllExtendedRights edge | In-house · Figure 40 · p.60 |
| Trace Domain Admins membership | ROOT account, separate branch | BloodHound MemberOf | Begin again at ROOT. This is not lateral movement between the privileged groups. | Domain Admins membership | In-house · Figure 39 · p.59 |
| Inspect Domain Admins domain rights | Domain Admins | BloodHound permission graph | Figure 40 independently records AllExtendedRights from Domain Admins to POLYTECHNIC-MSP.ORG. | Documented AllExtendedRights edge | In-house · Figure 40 · p.60 |
| Review the relationship model | Membership and permission observations | Assessor | Figures 39 and 40 are separate observations. They identify relationships to inspect; neither is an exploit replay or proof of takeover. | Inspectable privilege paths | In-house · Figures 39–40 · pp.59–60 |

## ML candidate workflow

30 seconds per pass; one alternative per pass, 90 seconds to illustrate all three. A sample token represents the workflow, not an observed prediction. Evaluation describes model performance, not a known result for this token.

| Stage | Input | Tool | Transformation | Output | Source |
| --- | --- | --- | --- | --- | --- |
| Traffic sample | Reported network traffic | Data preparation workflow; implementation unavailable | An abstract token identifies the same sample through preparation. No dataset, split or ground-truth class is supplied. | Sample awaiting preparation | CV, May–June 2024 project |
| Preprocessing | Traffic sample | Preprocessing; library and operations unspecified | A prepared representation replaces the raw token. Cleaning, scaling and sampling operations are not invented. | Prepared sample | CV, May–June 2024 project |
| Feature engineering | Prepared sample | Feature engineering; implementation unspecified | Unnamed marks represent modeling inputs. No feature names or values are supplied. | Abstract feature representation | CV, May–June 2024 project |
| Alternative candidate | Feature representation | Random Forest OR SVM OR XGBoost | One separate branch stands for a candidate in the reported training/tuning workflow. The three outputs are never combined. | Candidate workflow for evaluation; no sample prediction | CV, May–June 2024 project |
| Evaluation | Candidate workflow | Evaluation/review; implementation unspecified | The CV reports evaluation of accuracy, precision, recall and false-positive performance. No per-model score or confusion matrix is supplied. | Performance to review, without fabricated values | CV, May–June 2024 project |
| Review and reset | Reported evaluation | Project review | The CV reports overall accuracy above 95%; it does not identify individual model scores or a winning deployed model. The marker resets for the next alternative. | Reviewable workflow, not a live detector | CV, May–June 2024 project |

## Deliberately illustrative stages

- All machinery, spatial separation, depths, marker shapes, stage durations and transport paths. Native perspective projection and depth sorting make the model genuinely rotatable; they do not assert physical hardware inventory.
- Wazuh internal record handoffs, parsing visualization, rule matching visualization, index write and simplified selected dashboard row. Source facts remain exact; no unseen field extraction, rule condition or measured storage behavior is asserted.
- Network probe/response motion for scan results, including the path through the topology. This is not a packet capture, a firewall policy verdict, or successful lateral movement.
- Directory traversal order and key motion. The actual relationships are recorded separately in Figures 39 and 40. No group-to-group chain, credential use or exploit is shown.
- Every ML sample representation and transition. No dataset row, feature value, true/predicted class, per-model score, ensemble or deployed detector is invented.

## Local review and verification

Open [the existing portfolio](dist/index.html), or serve `dist/` with `python -m http.server 8000 --bind 127.0.0.1 --directory dist` and open http://127.0.0.1:8000/. Nothing has been deployed.

Native render previews and executable DOM/canvas checks are in `.sites-runtime/process-review/`. Run `node .sites-runtime/process-review/verify.cjs` with its existing local QA dependencies. These checks use the actual rendering code, a simulated DOM, pointer/keyboard events and native canvas output. They do not constitute full-browser layout or physical-device verification; no browser surface was available.
