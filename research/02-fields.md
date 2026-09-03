# Research Notes 02 — Field-by-field data (BLS, comp, demand signals)
(Collected 2026-09-03)

## BLS occupation pages (projection cycle shown per page; BLS is transitioning to 2025–35 for some pages)
| Occupation (SOC) | Jobs base yr | Growth | Openings/yr | Median pay | Source |
|---|---|---|---|---|---|
| Software developers, QA & testers (15-1252/53) | 1,905,400 (2025) | **+10% 2025–35** (+185,400) | 106,100 | $134,040 (2025); devs alone $135,980; QA $104,300 | https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm |
| Information security analysts (15-1212) | 182,800 (2024) | **+29% 2024–34** (+52,100) | 16,000 | $124,910; 10th pct $69,660; 90th $186,420 | https://www.bls.gov/ooh/computer-and-information-technology/information-security-analysts.htm |
| Data scientists (15-2051) | 245,900 (2024) | **+34% 2024–34** (+82,500) | 23,400 | $112,590; 90th $194,410 | https://www.bls.gov/ooh/math/data-scientists.htm |
| Computer hardware engineers (17-2061) | 76,800 (2024) | **+7% 2024–34** (+5,600) | 4,700 | **$155,020**; 90th $223,820; semis mfg $162,460; R&D $179,190 | https://www.bls.gov/ooh/architecture-and-engineering/computer-hardware-engineers.htm |
| Computer & info research scientists | — | ~+20% (widely cited) | — | $140,910 (Master's typical) | BLS OOH |
| Computer network architects | — | — | — | $130,390 | BLS OOH |
| Database admins & architects | — | — | — | $123,100 | BLS OOH |
| Computer systems analysts | — | — | — | $103,790 | BLS OOH |
| Computer programmers | — | negative (~−6 to −10%) | — | $98,670 | BLS OOH |
| Web developers & digital designers | — | ~+8% | — | $95,380 | BLS OOH |
| Computer support specialists | — | ~+5% | — | $61,550 | BLS OOH |
| Electrical & electronics engineers | — | ~+7% | — | $118,780 | BLS OOH |
| Computer & information systems managers | — | — | — | $171,200 | BLS OOH |
| Aerospace engineers | — | — | — | $134,830 | BLS OOH |
- Note: "computer occupations" group +9%, all occupations +3% (2024–34).
- Info sec analysts: top industries: computer systems design 22%, finance/insurance 16%; BLS cites AI adoption and e-commerce as growth drivers.
- Hardware engineers: 21% in semiconductor mfg, 17% R&D, 7% federal gov.

## Compensation (private-sector data)
- Levels.fyi: median SWE US total comp $195k; ML engineer median $279k; ML/AI-focus SWE $248k; MLOps $149.6k. https://www.levels.fyi/t/software-engineer/title/machine-learning-engineer
- Levels.fyi entry-level SWE US: median TC **$143,572**; 25th $100k; 75th $188k; 90th $222k. https://www.levels.fyi/t/software-engineer/levels/entry-level/locations/united-states
- Google MLE L3 ~$199k → L7 $743k; Meta E3 MLE $187k → E7 $1.45M.
- WSJ/Levels.fyi Aug 2025: many 0–1 yr MLE jobs pay >$200k (Roblox etc.).
- Pragmatic Engineer 2026: AI eng openings at top companies +60% YoY vs SWE +7%; AI eng comp > SWE comp; 80th pct senior base $300k+ in US. AI labs: Anthropic 51% of interviewing.io coaching requests combined w/ OpenAI; Anthropic 2-yr retention 80%, DeepMind 78%, OpenAI 67%.
- **New grads = 1 in 10 eng hires at 28 large US tech cos in 2025, down from ~3 in 10 in 2023.** Intern intake falling even as SWE hiring recovers (first time lines diverge). Elite-university share of new-grad hires rising. Source: PE part 2 https://newsletter.pragmaticengineer.com/p/the-job-market-in-2026-part-2
- Title trends (SignalFire): AI engineer ↑↑; Forward Deployed Engineer ↑↑; sales engineer ↑; native mobile ↓; **frontend-only engineer disappearing fastest**.
- FDE: postings +800% Jan–Sep 2025 (FT); ~+1,165% YoY per another count; OpenAI/Anthropic FDE TC $350–550k mid-senior. https://thenewstack.io/forward-deployed-engineers-ai/
- Robotics engineers 2026 (KORE1): mid $150–205k, senior $205–300k; humanoid/foundation-model robotics premium. https://www.kore1.com/hire-robotics-engineers-2026/
- Quantum (Quantum Insider May 2026): applications roles $120–180k; algorithm research $150–250k; senior >$200k; global pure-play quantum workforce ~16,500 (small!). https://thequantuminsider.com/2026/05/29/quantum-computing-jobs-and-salaries-in-2026/
- Defense tech: Anduril +1000 employees in 9 months; cleared autonomy engineers $185–320k; defense startups 5.2 open roles/company vs 3.5 for software cos. Palantir new-grad defense roles require clearance eligibility (US citizenship). https://www.paraform.com/blog/defense-tech-startup-hiring-anduril-era-teams

## Semiconductors
- SIA/Oxford Economics "Chipping Away" (Jul 2023): industry workforce +~115k jobs by 2030 (345k→460k); **~67,000 (58% of new jobs) risk going unfilled**; of gap: 39% technicians (26,400), ~35% engineers (27,300 — computer scientists & engineers), 26% others. https://www.semiconductors.org/chipping-away-assessing-and-addressing-the-labor-market-gap-facing-the-u-s-semiconductor-industry/
- CHIPS Act $39B mfg incentives + $11B R&D; fabs: TSMC Arizona, Intel Ohio/Arizona, Samsung Taylor TX, Micron Idaho/NY, GlobalFoundries NY, TI Texas.
- AMTEC 2026: US semi mfg workforce peaked ~401k early 2023 then declined somewhat (cyclical). https://www.amtec.co/blog/semiconductor-workforce-report
- Pragmatic Engineer: Cadence entered top-20 for SWE openings; Micron/Qualcomm/AMD have many more SWE openings than last year.
- NVIDIA market cap dominance; AI accelerators (NVIDIA, AMD, Google TPU, AWS Trainium, Microsoft Maia, Meta MTIA, OpenAI/Broadcom chip) → demand for RTL design, verification (DV), physical design, performance modeling, compiler/kernel engineers (CUDA, Triton), firmware.

## Cybersecurity
- ISC2 2024: 5.5M global workforce, 4.8M gap; ISC2 2025 (Dec 2025): 49% of enterprises still have security hiring freezes — nuance: demand exists but budgets tight; entry-level harder than headlines suggest. https://www.isc2.org/Insights/2025/12/2025-ISC2-Cybersecurity-Workforce-Study
- CyberSeek: ~514k US cyber job postings; US gap variously ~500–750k.
- Wiz (cloud security) grew SWE headcount +84% in 2yrs; Google acquired Wiz ($32B, 2025).
- Hot sub-areas: cloud security, identity, AI security/red-teaming, detection engineering, product security/AppSec, OT/ICS security, GRC (less technical).

## Data centers / AI infrastructure / power
- IEEE Spectrum Jan 2026: US data center power demand to 106 GW by 2035 (BNEF); severe shortage of electrical, mechanical, civil engineers; BLS ~17,500 more EEs needed; 340k unfilled data center positions by end 2026 (Introl estimate). https://spectrum.ieee.org/ai-data-centers-engineers-jobs
- Stargate Abilene 1.2 GW; developers want 1 GW/quarter build pace.
- CE-relevant: power electronics, thermal/liquid cooling, networking (400G/800G, InfiniBand, optical), datacenter systems engineering (SMU MS DSE).

## CS enrollment supply (CRA Taulbee, Jun 2026, data for 2024–25 AY)
Source: https://cra.org/crn/2026/06/cra-update-new-cra-taulbee-survey-findings-show-record-degree-production-alongside-a-cooling-enrollment-pipeline/
- CS bachelor's degrees at PhD-granting depts: record 41,858 (2025), +13% YoY.
- **New CS majors down 13%** (to 33,490); total CS enrollment −4% (169,528). → degree counts will plateau/decline ~2028–2030.
- Yahoo/NSC: undergrad CS enrollment at 4-yr institutions −8.1% (steepest one-year drop of any major).
- CS master's enrollment −26% (63% of new admits from outside N. America → visa barriers). PhD new enrollment −15%; PhDs to industry 61%.
- CERP Pulse 2025: declines linked to labor market fears, AI concerns, shifts to cybersecurity/AI/CE specialized degrees.
- **Implication for 2027 entrant: graduates in 2031 will face a materially smaller competing cohort than 2024–2026 grads (a classic cobweb cycle — cf. 2002–2008 post-dotcom).**

## Immigration/policy
- Sep 21 2025 proclamation: $100k fee on new H-1B petitions for beneficiaries outside the US; Nov 2025 USCIS guidance exempts most change-of-status (F-1→H-1B) filings. Aug 2026: administration considering $100k fee on OPT. https://www.forbes.com/sites/stuartanderson/2026/08/03/new-immigration-plan-considered-to-stop-students-from-working-in-us/
- Net effect for US-citizen students: reduced international competition for entry roles; for international students: high uncertainty.
- Security clearance requires US citizenship → defense/aerospace/intel sector is a citizen-only moat.
