# Section 12 — Sources, Methodology, and How to Keep This Guide Current

## 12.1 Methodology

This guide was assembled in September 2026 from primary statistical sources (BLS, NY Fed, CRA), peer-reviewed and working-paper research (Stanford Digital Economy Lab), large-sample labor-market analytics (Indeed Hiring Lab, Levels.fyi), industry workforce studies (SIA/Oxford Economics, ISC2), and practitioner reporting (The Pragmatic Engineer). Where sources conflict — for example, BLS's ten-year occupational projections versus real-time posting data — the guide reports both and states which it weights more heavily and why (generally: real-time data for the 2026–2028 outlook, structural projections for 2031 and beyond).

Scores in the scorecards (Sections 3–5, 10) are the author's judgments, calibrated against the data below and against the three-scenario framework in Section 1. They are meant to be *comparative* across careers, not absolute. Compensation figures combine BLS medians (all experience levels, all employers), Levels.fyi self-reported data (skewed toward large tech employers), and industry reports, and are presented as ranges for that reason.

Every major *statistical* claim in the guide — employment levels, growth projections, unemployment rates, workforce gaps, median pay — traces to one of the primary sources in Section 12.2. Supporting figures drawn from secondary reporting (industry surveys, analyst notes, company disclosures, financial press) are listed in Section 12.3 with the caveat that they were cited via primary reporting rather than independently verified from the original dataset. Judgments, scores, scenario probabilities, and forward-looking comp bands are labeled as the author's estimates and should be read as such.

**Version 2.1 changes (September 2026, after the August 27, 2026 BLS release):** re-based every BLS figure on the 2025–35 employment projections and May 2025 wages. The material changes: information security analysts +29% → **+21%** (the guide now explains the downgrade in Section 3.2 and keeps D1 = 5 on the strength of the unfilled-demand data); computer hardware engineers $155,020 → **$161,740** and +7% → **+9%** (the only Tier 1 occupation revised *upward*); data scientists +34% → **+35%** on a larger base (275,600); computer programmers now quantified at **−7%**; web developers +5% / $92,650; the computer-and-mathematical group as a whole trimmed from +10.1% to **+7.3%** — reported honestly in Section 1.4 as consistent with the "seniority-biased complement" thesis. Added the NY Fed August 2026 figures (CS 7.0%, CE 7.8% recent-grad unemployment), the National Student Clearinghouse spring 2026 enrollment decline (−8.4% CIS undergraduate), the Indeed Hiring Lab August 2026 software-postings index (74.4, up ~22% from the May 2025 low of 61.1), the H-1B $100k fee litigation status (vacated July 24, 2026; proclamation expires September 20, 2026 unless extended), and a new block in Section 9.5 on the F-1 duration-of-status final rule effective September 15, 2026. No career crossed a tier boundary. New sources are listed as items 6a, 6b, 12a, 25a, and 26a–26c below.

**Version 2.0 changes (September 2026):** a full self-review (see the repository's REVIEW.md) corrected scorecard inconsistencies between Sections 3–5 and 10, rewrote the tiering rule in Section 2.2 so it matches the actual tier assignments, renamed compensation "tiers" to "modes" to avoid collision with career tiers, updated the H-1B section for the December 2025 weighted-selection final rule, corrected the international-student share of bachelor's graduates, and added roughly ten thousand words of new material (general SWE profile, specialized-major verdicts, co-ops, networking, paying for the degree, clearance mechanics, falsifiable predictions, a worked example, expanded FAQ, glossary, and checklists).

---

## 12.2 Primary Sources

### Government statistics and projections

1. **US Bureau of Labor Statistics — Occupational Outlook Handbook, Computer and Information Technology.** Employment, projected growth 2025–35 (released August 27, 2026; earlier drafts of this guide used the 2024–34 vintage), May 2025 median pay ($109,470 for the group; ~280,000 openings per year) for software developers, information security analysts, computer programmers, web developers, support specialists, network architects, database administrators, systems analysts, and IS managers.
   https://www.bls.gov/ooh/computer-and-information-technology/
2. **BLS OOH — Software Developers, Quality Assurance Analysts, and Testers.** 1,905,400 employed (2025); +10% 2025–35 (+185,400); ~106,100 annual openings; median $134,040 (developers $135,980; QA $104,300).
   https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm
3. **BLS OOH — Information Security Analysts.** 192,900 employed (2025); +21% 2025–35 (+40,600); ~14,100 openings/yr; median $129,180 (May 2025). Prior vintage: +29% 2024–34.
   https://www.bls.gov/ooh/computer-and-information-technology/information-security-analysts.htm
4. **BLS OOH — Data Scientists.** 275,600 employed (2025); +35% 2025–35 (+95,400); ~24,800 openings/yr; median $120,230 (May 2025).
   https://www.bls.gov/ooh/math/data-scientists.htm
5. **BLS OOH — Computer Hardware Engineers.** 76,100 employed (2025); +9% 2025–35 (+6,900); median $161,740 (May 2025). Prior vintage: +7%, $155,020 (semiconductor manufacturing $162,460; R&D $179,190 in the May 2024 detail).
   https://www.bls.gov/ooh/architecture-and-engineering/computer-hardware-engineers.htm
6. **BLS Monthly Labor Review — Industry and Occupational Employment Projections Overview (2026).** Total US employment +3.1% 2024–34.
   https://www.bls.gov/opub/mlr/2026/article/industry-and-occupational-employment-projections-overview.htm
6a. **BLS — Employment Projections 2025–35 news release (August 27, 2026).** Total employment +3.5% (+5.9M); computer & mathematical group +7.3% (5th-fastest group, down from +10.1%); office & administrative support −4.0% (AI/automation cited); utilities +9.8%; "computing infrastructure providers, data processing, web hosting" industry +25.1%; federal government −3.4%. Also: computer programmers −7%; web developers & digital designers +5% ($92,650); computer & information research scientists +21.8%.
   https://www.bls.gov/news.release/ecopro.nr0.htm
6b. **BLS — AI Exposure Categories (new data product, 2026).** Every occupation classified Low / Moderate / High / Very high on a blend of three theoretical exposure measures and two observed-usage measures (Anthropic Economic Index, Microsoft Copilot). BLS states explicitly that exposure is not a job-loss forecast. This guide cites the methodology, not individual categories.
   https://www.bls.gov/emp/publications/ai-exposure-categories.htm

### Recent-graduate labor market

7. **Federal Reserve Bank of New York — The Labor Market for Recent College Graduates.** Unemployment and underemployment by major; computer science and computer engineering among the highest recent-grad unemployment rates, underemployment ~19% (CS). August 6, 2026 release: CS 7.0%, CE 7.8% (all recent grads 5.3–5.8%), reported via Investopedia August 27, 2026.
   https://www.newyorkfed.org/research/college-labor-market
8. **Forbes (Nietzel, Feb 2026) — Unemployment and Underemployment Rates Among Recent College Graduates.** Summary of the NY Fed data.
   https://www.forbes.com/sites/michaeltnietzel/2026/02/23/unemployment-and-underemployment-rates-among-recent-college-graduates/

### AI and entry-level employment

9. **Brynjolfsson, Chandar & Chen — "Canaries in the Coal Mine? Six Facts about the Recent Employment Effects of Artificial Intelligence" (Stanford Digital Economy Lab, 2025, updated 2026).** Employment of 22–25-year-olds in the most AI-exposed occupations ~19% below trend; effect driven by hiring, not layoffs; concentrated where AI *automates* rather than *augments*.
   https://digitaleconomy.stanford.edu/publication/canaries-in-the-coal-mine-six-facts-about-the-recent-employment-effects-of-artificial-intelligence/
10. **Fortune (Jun 2026) — What is AI's impact on entry-level jobs?** Follow-up reporting on the Canaries dataset; most AI-exposed occupations contracted 0.2% YoY vs +0.1% for least-exposed as of April 2026.
    https://fortune.com/2026/06/27/what-is-ai-impact-entry-level-jobs-stanford-adp-canaries-brynjolfsson-richardson/
11. **World Economic Forum — "Artificial Intelligence and the Future of Entry-Level Work" (2026).**
    https://reports.weforum.org/docs/WEF_Artificial_Intelligence_and_the_Future_of_Entry_Level_Work_2026.pdf
12. **Indeed Hiring Lab (Jul 2026) — "AI and Job Postings: From Destruction to Creation."** Software postings +15% since Feb 2025 trough; 71% of the increase in senior roles; 37% of the net increase in AI-titled roles; postings still ~27.5% below Feb 2020.
12a. **Indeed Hiring Lab — US Labor Market Snapshot (August 24, 2026).** Software-development postings index 74.4 (Feb 2020 = 100), up ~22% from the May 2025 low of 61.1; AI-mentioning share of all postings 6.3%.
    https://hiringlab.indeed.com/2026/08/24/us-labor-market-snapshot-august-2026/
    https://hiringlab.indeed.com/2026/07/08/ai-and-job-postings-from-destruction-to-creation/

### Practitioner and industry labor-market reporting

13. **The Pragmatic Engineer — "State of the Software Engineering Job Market in 2026" (Part 1).** AI engineering openings +60% YoY vs SWE +7%; AI-engineer comp premium; frontier-lab retention statistics.
    https://newsletter.pragmaticengineer.com/p/state-of-the-job-market-2026
14. **The Pragmatic Engineer — "The Job Market in 2026, Part 2."** New grads 1-in-10 engineering hires at 28 large US tech companies (down from ~3-in-10 in 2023); intern intake falling while overall SWE hiring recovers; frontend-only titles disappearing; forward-deployed-engineer surge.
    https://newsletter.pragmaticengineer.com/p/the-job-market-in-2026-part-2
15. **Levels.fyi — Machine Learning Engineer compensation (US).** MLE median TC $279k; SWE median $195k; ML-focused SWE $248k.
    https://www.levels.fyi/t/software-engineer/title/machine-learning-engineer
16. **Levels.fyi — Entry-Level Software Engineer, United States.** Median TC $143,572; 25th pct $100k; 75th $188k; 90th $222k.
    https://www.levels.fyi/t/software-engineer/levels/entry-level/locations/united-states
17. **The New Stack — Forward Deployed Engineers and AI.** FDE postings +800% Jan–Sep 2025; frontier-lab FDE comp $350–550k mid-senior.
    https://thenewstack.io/forward-deployed-engineers-ai/
18. **KORE1 — Hiring Robotics Engineers in 2026.** Robotics comp bands: mid $150–205k, senior $205–300k.
    https://www.kore1.com/hire-robotics-engineers-2026/
19. **The Quantum Insider (May 2026) — Quantum Computing Jobs and Salaries in 2026.** Applications roles $120–180k; algorithm research $150–250k; global pure-play workforce ~16,500.
    https://thequantuminsider.com/2026/05/29/quantum-computing-jobs-and-salaries-in-2026/
20. **Paraform — Defense-Tech Startup Hiring in the Anduril Era.** Cleared autonomy engineers $185–320k; 5.2 open roles per defense startup vs 3.5 for software companies; clearance eligibility requirements.
    https://www.paraform.com/blog/defense-tech-startup-hiring-anduril-era-teams

### Semiconductors and infrastructure

21. **Semiconductor Industry Association / Oxford Economics — "Chipping Away: Assessing and Addressing the Labor Market Gap Facing the U.S. Semiconductor Industry" (Jul 2023).** Industry workforce 345k → 460k by 2030; ~67,000 new jobs (58%) at risk of going unfilled; ~27,300 of the gap are engineers/computer scientists.
    https://www.semiconductors.org/chipping-away-assessing-and-addressing-the-labor-market-gap-facing-the-u-s-semiconductor-industry/
22. **AMTEC — Semiconductor Workforce Report (2026).** US semiconductor manufacturing employment peaked ~401k in early 2023, then softened cyclically.
    https://www.amtec.co/blog/semiconductor-workforce-report
23. **IEEE Spectrum (Jan 2026) — AI Data Centers Need Engineers.** US data-center power demand to 106 GW by 2035 (BloombergNEF); acute shortages of electrical, mechanical, and civil engineers; ~340k unfilled data-center positions by end-2026 (Introl estimate).
    https://spectrum.ieee.org/ai-data-centers-engineers-jobs

### Cybersecurity workforce

24. **ISC2 — 2025 Cybersecurity Workforce Study (Dec 2025).** ~5.5M global workforce, ~4.8M gap; 49% of enterprises report hiring freezes — demand exists, budgets are tight, and entry-level is harder than headlines suggest.
    https://www.isc2.org/Insights/2025/12/2025-ISC2-Cybersecurity-Workforce-Study

### Education pipeline

25. **Computing Research Association — CRA Taulbee Survey Update (Jun 2026).** Record CS degree production (41,858 bachelor's) alongside a cooling pipeline: new CS majors −13%, total undergraduate CS enrollment −4%, master's enrollment −26%.
    https://cra.org/crn/2026/06/cra-update-new-cra-taulbee-survey-findings-show-record-degree-production-alongside-a-cooling-enrollment-pipeline/
25a. **National Student Clearinghouse Research Center — "Computer Science Enrollment Is Cooling" (Spring 2026 final data).** Undergraduate computer-and-information-sciences enrollment −8.4% year over year; first-year CIS enrollment −11.2%; broadest-based (all institutions, not just PhD-granting) enrollment measure available.
    https://www.studentclearinghouse.org/nscblog/computer-science-enrollment-is-cooling/

### Immigration

26. **Forbes (Anderson, Aug 2026) — New Immigration Plan Considered to Stop Students from Working in US.** Reporting on proposed OPT fees/restrictions; context on the September 2025 $100k H-1B proclamation and November 2025 USCIS change-of-status guidance.
    https://www.forbes.com/sites/stuartanderson/2026/08/03/new-immigration-plan-considered-to-stop-students-from-working-in-us/
26a. **DHS / ICE — Final rule, "Establishing a Fixed Time Period of Admission and an Extension of Stay Procedure for Nonimmigrant Academic Students, Exchange Visitors, and Representatives of Foreign Information Media"** (published July 17, 2026; effective September 15, 2026). Ends "duration of status"; four-year admission cap; 30-day grace period; first-year restrictions on changing major/level/transfer; extension-of-stay requirement for OPT. Proposed rule: Federal Register 2025-16554 (August 28, 2025).
    https://www.federalregister.gov/documents/2025/08/28/2025-16554
26b. **Yale Office of International Students & Scholars — "Elimination of Duration of Status: Summary and FAQs" (July 22, 2026).** Plain-language university summary of the final rule used for the practical implications in Section 9.5.
    https://oiss.yale.edu/immigration/elimination-of-duration-of-status-summary-faqs
26c. **Klasko Immigration Law Partners — "$100,000 H-1B Fee Blocked Again" (August 7, 2026).** Litigation timeline: D. Mass. vacatur June 8, 2026; First Circuit denial of stay July 24, 2026; proclamation expiry September 20, 2026; FY2027 cap reached June 30, 2026 under the wage-weighted rule.
    https://www.klaskolaw.com/august-2026-100000-h-1b-fee-blocked-again/

---

## 12.3 Secondary Sources Cited via Primary Reporting

The following are referenced in the text, usually through one of the primary sources above or through mainstream financial and technology press. The reader should treat specific figures from these as indicative and verify against the original if a decision hinges on them.

### Labor-market analytics and trackers

- **Live Data Technologies** — workforce-flow data on new-grad hiring shares and job-switching; cited via The Pragmatic Engineer and press reporting. https://www.livedatatechnologies.com/
- **SignalFire — State of Talent Report (2025).** New-grad share of Big Tech hires ~7%, down ~25% from 2023; startup new-grad hiring down ~11%. https://www.signalfire.com/blog/signalfire-state-of-talent-report-2025
- **Layoffs.fyi** — running tally of tech layoffs 2022–26. https://layoffs.fyi/
- **TrueUp — Tech job trends** (open roles across tech companies; AI-role share). https://www.trueup.io/job-trend
- **Workforce.ai / AI-titled posting share** — cited via Indeed Hiring Lab and The Pragmatic Engineer.
- **CyberSeek (NIST NICE / CompTIA / Lightcast)** — US cybersecurity supply/demand heatmap; ~470k openings, ~83 workers per 100 openings. https://www.cyberseek.org/
- **Gergely Orosz, The Pragmatic Engineer — "The Trimodal Nature of Software Engineering Salaries"** — origin of the three-mode compensation model used in Section 9.2. https://newsletter.pragmaticengineer.com/p/trimodal-nature-of-software-engineering

### Consulting, analyst, and industry studies

- **McKinsey Global Institute — generative-AI productivity and work-activity automation estimates (2023–25).** https://www.mckinsey.com/mgi
- **BloombergNEF — US data-center power demand projections** (106 GW by 2035); cited via IEEE Spectrum (source 23). https://about.bnef.com/
- **Introl — data-center workforce estimate (~340k unfilled positions by end-2026);** cited via IEEE Spectrum (source 23).
- **IBM — Cost of a Data Breach Report (2025).** Global average breach cost ~$4.4M; US ~$10M. https://www.ibm.com/reports/data-breach
- **Deloitte / SEMI — semiconductor workforce studies** complementing SIA/Oxford (source 21). https://www.semi.org/

### Government and regulatory documents

- **Department of Homeland Security — "Weighted Selection Process for Registrants and Petitioners Seeking to File Cap-Subject H-1B Petitions," Final Rule, Federal Register, December 29, 2025; effective February 27, 2026.** Registrations entered once per OEWS wage level (I–IV). https://www.federalregister.gov/documents/2025/12/29/2025-23853/
- **USCIS — H-1B Electronic Registration Process (FY2027 cap season page, updated July 2026)** confirming weighted selection in use. https://www.uscis.gov/working-in-the-united-states/temporary-workers/h-1b-specialty-occupations/h-1b-electronic-registration-process
- **Presidential Proclamation — Restriction on Entry of Certain Nonimmigrant Workers ($100,000 H-1B fee), September 19, 2025,** and USCIS implementing guidance (October–November 2025). https://www.whitehouse.gov/presidential-actions/
- **Public Law 119-21 (July 2025) — restoration of immediate expensing for domestic R&D (Section 174A).** https://www.congress.gov/
- **DCSA — Continuous Vetting and Trusted Workforce 2.0** program pages. https://www.dcsa.mil/Personnel-Security/
- **DoD CHIPS / NIST CHIPS for America** award announcements 2024–26. https://www.nist.gov/chips

### Financial press (AI-lab funding, IPOs, capex)

- **Reuters, TechCrunch, Bloomberg — Anthropic Series (May 2026, ~$65B at ~$965B post-money) and OpenAI round (March 2026, ~$122B); confidential IPO filings by both (June 2026).** Verified across at least two outlets each at time of writing; figures are as reported, not audited.
- **Wall Street Journal, Financial Times — Big Tech AI capital-expenditure reporting (2025–26)** underlying the infrastructure-demand claims in Sections 1 and 3.

---

## 12.4 Programs and Institutions Referenced (for the reader's follow-up)

These are named in Sections 7–9 as action items; the reader should verify current terms directly.

- **DoD SMART Scholarship-for-Service** — smartscholarship.org
- **CyberCorps Scholarship for Service (NSF/OPM)** — sfs.opm.gov
- **NSF Graduate Research Fellowship Program** — nsfgrfp.org
- **GEM Fellowship** — gemfellowship.org
- **Google Summer of Code** — summerofcode.withgoogle.com
- **MLH Fellowship** — fellowship.mlh.io
- **Tiny Tapeout** — tinytapeout.com
- **CTFtime** (CTF calendar and rankings) — ctftime.org
- **picoCTF** (beginner CTF) — picoctf.org
- **ICPC** — icpc.global
- **CHIPS for America (NIST)** — nist.gov/chips
- **USCIS — Optional Practical Training** — uscis.gov/opt
- **DCSA — Security clearance process** — dcsa.mil

---

## 12.5 How to Keep This Guide Current

The reader is enrolling in 2027 and graduating in 2031; this guide will age. Re-check these indicators each year, in this order of importance:

1. **The NY Fed recent-grad table** (annual, February) — is CS/CE recent-grad unemployment converging back toward the all-majors average? If it falls below ~4.5%, the cobweb correction has arrived.
2. **Indeed Hiring Lab software postings** (monthly) — is the level recovering toward the Feb 2020 baseline? What share of new postings are AI-titled and senior?
3. **The Pragmatic Engineer's annual job-market report** (January) — new-grad share of hires is the single best leading indicator for your own graduation cycle.
4. **CRA Taulbee** (June) and the **National Student Clearinghouse spring enrollment report** (May/June) — enrollment trends determine your competition in 2031. Taulbee covers PhD-granting departments; the Clearinghouse covers every institution. Watch for the NSC first-year CIS number turning positive: that is the leading edge of the *next* oversupply.
5. **BLS OOH updates** (late August, now revised annually) — structural, slow-moving. Compare each new vintage's computer-group growth rate against the previous one (2024–34: +10.1%; 2025–35: +7.3%); a second consecutive cut of three points or more would mean the BLS is pricing in AI substitution faster than this guide assumes. Also check whether any Tier 1 occupation moves into the BLS "Very high" AI-exposure category *and* shows a downgraded projection in the same year — that combination is the signal, exposure alone is not.
6. **Immigration policy** (continuous) — international students should track OPT/H-1B developments through their university's international office and reputable immigration-law reporting.
7. **Your target field's specific indicators** — semis: CHIPS fab openings and SIA workforce updates; security: ISC2 annual study; AI: frontier-lab hiring pages and AI-infra capex announcements; defense: NDAA budget and defense-tech funding rounds; robotics: humanoid/autonomy deployments and funding.

If three or more of indicators 1–4 move sharply against the guide's central scenario for two consecutive years, revisit the tiering. Otherwise, the structural argument stands: **choose careers where software meets something hard.**

